# Chapter 13: 웹 스크래핑과 API 활용

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- HTTP 프로토콜과 requests 라이브러리 활용하기
- BeautifulSoup을 사용한 웹 스크래핑 구현하기
- 동적 콘텐츠 처리와 Selenium 활용하기
- REST API 호출과 데이터 처리하기
- API 인증과 보안 구현하기
- 비동기 HTTP 요청으로 성능 최적화하기
- 웹 크롤링 에티켓과 모범 사례 적용하기

## 1. HTTP 기초와 requests 라이브러리

### 1.1 HTTP 프로토콜 이해

```python
print("=== HTTP 기초와 requests 라이브러리 ===")

import requests
import json
from urllib.parse import urljoin, urlparse
import time
from datetime import datetime

def demonstrate_http_basics():
    """HTTP 기본 개념과 requests 사용법"""
    
    print("1. HTTP 기본 개념:")
    print("  - HTTP (HyperText Transfer Protocol): 웹에서 데이터를 주고받는 프로토콜")
    print("  - 요청(Request)과 응답(Response) 구조")
    print("  - 상태 코드: 200(성공), 404(Not Found), 500(서버 오류) 등")
    print("  - 헤더: Content-Type, User-Agent, Authorization 등")
    print("  - HTTP 메서드: GET, POST, PUT, DELETE, PATCH")
    print()

    print("2. requests 라이브러리 기본 사용법:")
    
    # 간단한 GET 요청
    try:
        response = requests.get('https://httpbin.org/get', timeout=10)
        print(f"  상태 코드: {response.status_code}")
        print(f"  응답 헤더 Content-Type: {response.headers.get('content-type')}")
        print(f"  응답 시간: {response.elapsed.total_seconds():.2f}초")
        
        # JSON 응답 처리
        if response.headers.get('content-type', '').startswith('application/json'):
            data = response.json()
            print(f"  요청 URL: {data.get('url')}")
            print(f"  사용자 에이전트: {data.get('headers', {}).get('User-Agent', '')[:50]}...")
        
    except requests.exceptions.RequestException as e:
        print(f"  요청 실패: {e}")

demonstrate_http_basics()

class HTTPClient:
    """HTTP 클라이언트 클래스"""
    
    def __init__(self, base_url=None, timeout=30):
        self.base_url = base_url
        self.timeout = timeout
        self.session = requests.Session()
        
        # 기본 헤더 설정
        self.session.headers.update({
            'User-Agent': 'Python-Tutorial-Bot/1.0',
            'Accept': 'application/json, text/html, */*',
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
        })
    
    def get(self, url, params=None, **kwargs):
        """GET 요청"""
        full_url = urljoin(self.base_url, url) if self.base_url else url
        
        try:
            response = self.session.get(
                full_url, 
                params=params, 
                timeout=self.timeout,
                **kwargs
            )
            response.raise_for_status()  # 4xx, 5xx 에러 시 예외 발생
            return response
        
        except requests.exceptions.RequestException as e:
            print(f"GET 요청 실패 ({full_url}): {e}")
            return None
    
    def post(self, url, data=None, json_data=None, **kwargs):
        """POST 요청"""
        full_url = urljoin(self.base_url, url) if self.base_url else url
        
        try:
            response = self.session.post(
                full_url,
                data=data,
                json=json_data,
                timeout=self.timeout,
                **kwargs
            )
            response.raise_for_status()
            return response
        
        except requests.exceptions.RequestException as e:
            print(f"POST 요청 실패 ({full_url}): {e}")
            return None
    
    def download_file(self, url, filename, chunk_size=8192):
        """파일 다운로드"""
        response = self.get(url, stream=True)
        if not response:
            return False
        
        try:
            total_size = int(response.headers.get('content-length', 0))
            downloaded = 0
            
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=chunk_size):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        
                        if total_size > 0:
                            progress = (downloaded / total_size) * 100
                            print(f"    다운로드 진행: {progress:.1f}%", end='\r')
            
            print(f"\n    파일 다운로드 완료: {filename} ({downloaded:,} bytes)")
            return True
            
        except Exception as e:
            print(f"    파일 다운로드 실패: {e}")
            return False
    
    def close(self):
        """세션 종료"""
        self.session.close()

def demonstrate_http_client():
    """HTTP 클라이언트 시연"""
    
    print(f"\n3. HTTP 클라이언트 활용:")
    
    client = HTTPClient(base_url='https://httpbin.org')
    
    # GET 요청 with 파라미터
    print("  GET 요청 (파라미터 포함):")
    response = client.get('/get', params={
        'name': '파이썬',
        'level': 'intermediate',
        'chapter': 13
    })
    
    if response:
        data = response.json()
        print(f"    요청 URL: {data.get('url')}")
        print(f"    파라미터: {data.get('args')}")
    
    # POST 요청 with JSON
    print(f"\n  POST 요청 (JSON 데이터):")
    post_data = {
        'user': 'student',
        'action': 'learn_web_scraping',
        'timestamp': datetime.now().isoformat()
    }
    
    response = client.post('/post', json_data=post_data)
    if response:
        data = response.json()
        print(f"    전송된 JSON: {data.get('json')}")
    
    client.close()

demonstrate_http_client()
```

### 1.2 세션과 쿠키 관리

```python
print("\n=== 세션과 쿠키 관리 ===")

class SessionManager:
    """세션과 쿠키 관리 클래스"""
    
    def __init__(self):
        self.session = requests.Session()
        self.login_status = False
    
    def set_cookies(self, cookies_dict):
        """쿠키 설정"""
        for name, value in cookies_dict.items():
            self.session.cookies.set(name, value)
    
    def get_cookies(self):
        """현재 쿠키 조회"""
        return dict(self.session.cookies)
    
    def simulate_login(self, username, password):
        """로그인 시뮬레이션"""
        print(f"4. 세션 기반 로그인 시뮬레이션:")
        
        # 로그인 페이지 접근 (쿠키 받기)
        response = self.session.get('https://httpbin.org/cookies/set/session_id/abc123')
        print(f"  로그인 페이지 접근: {response.status_code}")
        
        # 로그인 데이터 전송
        login_data = {
            'username': username,
            'password': password,
            'remember_me': True
        }
        
        response = self.session.post('https://httpbin.org/post', data=login_data)
        
        if response.status_code == 200:
            self.login_status = True
            print(f"  로그인 성공: {username}")
            print(f"  현재 쿠키: {self.get_cookies()}")
        else:
            print(f"  로그인 실패")
        
        return self.login_status
    
    def make_authenticated_request(self, url):
        """인증된 요청"""
        if not self.login_status:
            print("  인증되지 않은 상태입니다.")
            return None
        
        response = self.session.get(url)
        return response
    
    def logout(self):
        """로그아웃"""
        self.session.cookies.clear()
        self.login_status = False
        print("  로그아웃 완료")

def demonstrate_session_management():
    """세션 관리 시연"""
    
    session_mgr = SessionManager()
    
    # 로그인 시도
    session_mgr.simulate_login('python_student', 'secure_password')
    
    # 인증된 요청
    print(f"\n  인증된 요청:")
    response = session_mgr.make_authenticated_request('https://httpbin.org/cookies')
    if response:
        data = response.json()
        print(f"    서버에서 받은 쿠키: {data.get('cookies')}")
    
    # 로그아웃
    session_mgr.logout()

demonstrate_session_management()
```

## 2. 웹 스크래핑 기초 (BeautifulSoup)

### 2.1 HTML 파싱과 요소 선택

```python
print("\n=== 웹 스크래핑 기초 (BeautifulSoup) ===")

from bs4 import BeautifulSoup
import re

# BeautifulSoup이 없는 경우를 위한 시뮬레이션
class MockBeautifulSoup:
    """BeautifulSoup 시뮬레이션 클래스"""
    
    def __init__(self, html_content):
        self.html = html_content
        self.elements = self._parse_html(html_content)
    
    def _parse_html(self, html):
        """간단한 HTML 파싱 시뮬레이션"""
        # 실제로는 BeautifulSoup을 사용해야 합니다
        return {
            'title': self._extract_text(html, r'<title>(.*?)</title>'),
            'links': self._extract_links(html),
            'paragraphs': self._extract_text_all(html, r'<p[^>]*>(.*?)</p>'),
            'headers': self._extract_headers(html)
        }
    
    def _extract_text(self, html, pattern):
        """텍스트 추출"""
        match = re.search(pattern, html, re.IGNORECASE | re.DOTALL)
        return match.group(1).strip() if match else None
    
    def _extract_text_all(self, html, pattern):
        """모든 매칭 텍스트 추출"""
        matches = re.findall(pattern, html, re.IGNORECASE | re.DOTALL)
        return [text.strip() for text in matches]
    
    def _extract_links(self, html):
        """링크 추출"""
        pattern = r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>'
        matches = re.findall(pattern, html, re.IGNORECASE | re.DOTALL)
        return [{'url': url, 'text': text.strip()} for url, text in matches]
    
    def _extract_headers(self, html):
        """헤더 추출 (h1-h6)"""
        headers = []
        for i in range(1, 7):
            pattern = f'<h{i}[^>]*>(.*?)</h{i}>'
            matches = re.findall(pattern, html, re.IGNORECASE | re.DOTALL)
            for match in matches:
                headers.append({
                    'level': i,
                    'text': match.strip()
                })
        return headers
    
    def find(self, tag, **kwargs):
        """요소 찾기 (첫 번째)"""
        if tag == 'title':
            return type('Element', (), {'text': self.elements['title']})()
        return None
    
    def find_all(self, tag, **kwargs):
        """모든 요소 찾기"""
        results = []
        if tag == 'a':
            for link in self.elements['links']:
                element = type('Element', (), {
                    'get': lambda attr: link['url'] if attr == 'href' else None,
                    'text': link['text']
                })()
                results.append(element)
        elif tag == 'p':
            for text in self.elements['paragraphs']:
                element = type('Element', (), {'text': text})()
                results.append(element)
        return results

class WebScraper:
    """웹 스크래핑 클래스"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; WebScraper/1.0)'
        })
    
    def get_page(self, url):
        """웹 페이지 가져오기"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            response.encoding = response.apparent_encoding
            return response.text
        except requests.exceptions.RequestException as e:
            print(f"페이지 가져오기 실패: {e}")
            return None
    
    def parse_html(self, html_content):
        """HTML 파싱"""
        try:
            # 실제로는 BeautifulSoup을 사용
            # soup = BeautifulSoup(html_content, 'html.parser')
            soup = MockBeautifulSoup(html_content)
            return soup
        except Exception as e:
            print(f"HTML 파싱 실패: {e}")
            return None
    
    def extract_data(self, soup, selectors):
        """데이터 추출"""
        data = {}
        
        for key, selector in selectors.items():
            try:
                if key == 'title':
                    element = soup.find('title')
                    data[key] = element.text if element else None
                
                elif key == 'links':
                    elements = soup.find_all('a')
                    data[key] = []
                    for element in elements:
                        link_data = {
                            'url': element.get('href') if hasattr(element, 'get') else None,
                            'text': element.text if hasattr(element, 'text') else str(element)
                        }
                        data[key].append(link_data)
                
                elif key == 'paragraphs':
                    elements = soup.find_all('p')
                    data[key] = [element.text for element in elements if hasattr(element, 'text')]
                
            except Exception as e:
                print(f"데이터 추출 실패 ({key}): {e}")
                data[key] = None
        
        return data

def demonstrate_web_scraping():
    """웹 스크래핑 시연"""
    
    print("5. 웹 스크래핑 기본 사용법:")
    
    # 샘플 HTML (실제로는 웹사이트에서 가져옴)
    sample_html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Python 튜토리얼 예제 페이지</title>
    </head>
    <body>
        <h1>웹 스크래핑 학습</h1>
        <p>이것은 첫 번째 단락입니다.</p>
        <p>두 번째 단락에는 <a href="https://python.org">Python 공식 사이트</a> 링크가 있습니다.</p>
        <div class="content">
            <h2>유용한 링크들</h2>
            <ul>
                <li><a href="https://docs.python.org">Python 문서</a></li>
                <li><a href="https://github.com">GitHub</a></li>
                <li><a href="https://stackoverflow.com">Stack Overflow</a></li>
            </ul>
        </div>
        <p>마지막 단락입니다.</p>
    </body>
    </html>
    """
    
    scraper = WebScraper()
    soup = scraper.parse_html(sample_html)
    
    if soup:
        # 데이터 추출 설정
        selectors = {
            'title': 'title',
            'links': 'a',
            'paragraphs': 'p'
        }
        
        data = scraper.extract_data(soup, selectors)
        
        print(f"  페이지 제목: {data.get('title')}")
        print(f"  단락 수: {len(data.get('paragraphs', []))}")
        print(f"  링크 수: {len(data.get('links', []))}")
        
        # 링크 정보 출력
        print(f"\n  발견된 링크들:")
        for i, link in enumerate(data.get('links', [])[:3], 1):  # 최대 3개만 표시
            print(f"    {i}. {link.get('text', '')} -> {link.get('url', '')}")

demonstrate_web_scraping()
```

### 2.2 고급 스크래핑 기법

```python
print("\n=== 고급 스크래핑 기법 ===")

import time
import random
from urllib.robotparser import RobotFileParser
from urllib.parse import urljoin, urlparse

class AdvancedScraper:
    """고급 웹 스크래핑 클래스"""
    
    def __init__(self, delay_range=(1, 3), respect_robots=True):
        self.session = requests.Session()
        self.delay_range = delay_range
        self.respect_robots = respect_robots
        self.robots_cache = {}
        
        # 다양한 User-Agent 풀
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ]
    
    def _random_delay(self):
        """랜덤 지연"""
        delay = random.uniform(*self.delay_range)
        time.sleep(delay)
    
    def _rotate_user_agent(self):
        """User-Agent 로테이션"""
        user_agent = random.choice(self.user_agents)
        self.session.headers.update({'User-Agent': user_agent})
    
    def _check_robots_txt(self, url):
        """robots.txt 확인"""
        if not self.respect_robots:
            return True
        
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        if base_url not in self.robots_cache:
            try:
                rp = RobotFileParser()
                rp.set_url(urljoin(base_url, '/robots.txt'))
                rp.read()
                self.robots_cache[base_url] = rp
            except:
                self.robots_cache[base_url] = None
        
        rp = self.robots_cache[base_url]
        if rp:
            return rp.can_fetch('*', url)
        return True
    
    def scrape_with_retry(self, url, max_retries=3):
        """재시도 기능이 있는 스크래핑"""
        
        print(f"6. 고급 스크래핑 기법 시연:")
        
        if not self._check_robots_txt(url):
            print(f"  robots.txt에 의해 차단된 URL: {url}")
            return None
        
        for attempt in range(max_retries):
            try:
                # User-Agent 로테이션
                self._rotate_user_agent()
                
                # 요청 전 지연
                if attempt > 0:
                    print(f"  재시도 {attempt + 1}/{max_retries}")
                    self._random_delay()
                
                response = self.session.get(url, timeout=10)
                response.raise_for_status()
                
                print(f"  성공적으로 페이지 가져옴: {url}")
                print(f"  사용된 User-Agent: {self.session.headers.get('User-Agent')[:50]}...")
                
                return response.text
                
            except requests.exceptions.RequestException as e:
                print(f"  시도 {attempt + 1} 실패: {e}")
                if attempt == max_retries - 1:
                    print(f"  최대 재시도 횟수 초과")
                    return None
        
        return None
    
    def extract_with_fallback(self, html, primary_selector, fallback_selectors):
        """폴백 선택자를 사용한 추출"""
        soup = MockBeautifulSoup(html)
        
        # 주요 선택자 시도
        try:
            if primary_selector == 'title':
                result = soup.elements.get('title')
                if result:
                    return result
        except:
            pass
        
        # 폴백 선택자들 시도
        for selector in fallback_selectors:
            try:
                if selector == 'h1':
                    headers = soup.elements.get('headers', [])
                    h1_headers = [h for h in headers if h.get('level') == 1]
                    if h1_headers:
                        return h1_headers[0]['text']
                elif selector == 'first_paragraph':
                    paragraphs = soup.elements.get('paragraphs', [])
                    if paragraphs:
                        return paragraphs[0]
            except:
                continue
        
        return None

def demonstrate_advanced_scraping():
    """고급 스크래핑 시연"""
    
    scraper = AdvancedScraper(delay_range=(0.5, 1.0))
    
    # 시뮬레이션용 HTML
    sample_html = """
    <html>
    <head><title>고급 스크래핑 예제</title></head>
    <body>
        <h1>메인 제목</h1>
        <p>첫 번째 단락입니다.</p>
    </body>
    </html>
    """
    
    # 폴백 선택자를 사용한 제목 추출
    title = scraper.extract_with_fallback(
        sample_html,
        primary_selector='title',
        fallback_selectors=['h1', 'first_paragraph']
    )
    
    print(f"  추출된 제목: {title}")
    
    # robots.txt 체크 시뮬레이션
    test_url = "https://httpbin.org/html"
    allowed = scraper._check_robots_txt(test_url)
    print(f"  robots.txt 허용 여부: {allowed}")

demonstrate_advanced_scraping()
```

## 3. 동적 콘텐츠 처리

### 3.1 JavaScript 렌더링 처리

```python
print("\n=== 동적 콘텐츠 처리 ===")

# Selenium이 없는 경우를 위한 시뮬레이션
class MockWebDriver:
    """Selenium WebDriver 시뮬레이션"""
    
    def __init__(self, headless=True):
        self.headless = headless
        self.current_url = None
        self.page_source = None
        print(f"  Mock WebDriver 초기화 (headless={headless})")
    
    def get(self, url):
        """페이지 로드"""
        self.current_url = url
        print(f"  페이지 로드: {url}")
        
        # 동적 콘텐츠 시뮬레이션
        self.page_source = f"""
        <html>
        <head><title>동적 페이지 예제</title></head>
        <body>
            <div id="content">
                <h1>JavaScript로 로드된 제목</h1>
                <div class="dynamic-data">
                    <p>AJAX로 로드된 데이터</p>
                    <ul id="dynamic-list">
                        <li>항목 1</li>
                        <li>항목 2</li>
                        <li>항목 3</li>
                    </ul>
                </div>
            </div>
            <script>
                // 이 부분은 실제로는 JavaScript로 DOM을 수정함
                console.log('페이지 로드 완료');
            </script>
        </body>
        </html>
        """
        time.sleep(1)  # 로딩 시뮬레이션
    
    def find_element(self, by, value):
        """요소 찾기"""
        element = MockWebElement(value)
        return element
    
    def find_elements(self, by, value):
        """요소들 찾기"""
        # 시뮬레이션: 3개 요소 반환
        return [MockWebElement(f"{value}_{i}") for i in range(3)]
    
    def execute_script(self, script):
        """JavaScript 실행"""
        print(f"  JavaScript 실행: {script[:50]}...")
        return "실행 완료"
    
    def quit(self):
        """브라우저 종료"""
        print("  Mock WebDriver 종료")

class MockWebElement:
    """Selenium WebElement 시뮬레이션"""
    
    def __init__(self, identifier):
        self.identifier = identifier
        self.text = f"텍스트 내용 ({identifier})"
    
    def click(self):
        print(f"  요소 클릭: {self.identifier}")
    
    def send_keys(self, text):
        print(f"  텍스트 입력: {text}")
    
    def get_attribute(self, name):
        return f"attribute_{name}"

class DynamicContentScraper:
    """동적 콘텐츠 스크래핑 클래스"""
    
    def __init__(self, headless=True, wait_timeout=10):
        self.headless = headless
        self.wait_timeout = wait_timeout
        self.driver = None
    
    def start_browser(self):
        """브라우저 시작"""
        print("7. 동적 콘텐츠 스크래핑:")
        
        try:
            # 실제로는 Selenium을 사용
            # from selenium import webdriver
            # options = webdriver.ChromeOptions()
            # if self.headless:
            #     options.add_argument('--headless')
            # self.driver = webdriver.Chrome(options=options)
            
            self.driver = MockWebDriver(self.headless)
            print("  브라우저 시작 완료")
            return True
            
        except Exception as e:
            print(f"  브라우저 시작 실패: {e}")
            return False
    
    def wait_for_element(self, selector, timeout=None):
        """요소 대기"""
        timeout = timeout or self.wait_timeout
        print(f"  요소 대기: {selector} (최대 {timeout}초)")
        
        # 실제로는 WebDriverWait를 사용
        time.sleep(1)  # 시뮬레이션
        return True
    
    def scrape_spa_page(self, url):
        """SPA(Single Page Application) 스크래핑"""
        if not self.driver:
            print("  브라우저가 시작되지 않았습니다.")
            return None
        
        try:
            # 페이지 로드
            self.driver.get(url)
            
            # 동적 콘텐츠 로드 대기
            self.wait_for_element('#content')
            
            # JavaScript 실행 후 데이터 추출
            self.driver.execute_script("""
                // 추가 데이터 로드 시뮬레이션
                var list = document.getElementById('dynamic-list');
                if (list) {
                    var newItem = document.createElement('li');
                    newItem.textContent = 'JavaScript로 추가된 항목';
                    list.appendChild(newItem);
                }
            """)
            
            # 페이지 소스 가져오기
            html_content = self.driver.page_source
            
            # BeautifulSoup으로 파싱
            soup = MockBeautifulSoup(html_content)
            
            return {
                'title': soup.elements.get('title'),
                'dynamic_data': len(soup.elements.get('paragraphs', [])),
                'list_items': 4  # 시뮬레이션
            }
            
        except Exception as e:
            print(f"  SPA 스크래핑 실패: {e}")
            return None
    
    def handle_pagination(self, base_url, max_pages=5):
        """페이지네이션 처리"""
        print(f"\n8. 페이지네이션 처리:")
        
        all_data = []
        
        for page in range(1, max_pages + 1):
            try:
                url = f"{base_url}?page={page}"
                print(f"  페이지 {page} 처리 중...")
                
                if self.driver:
                    self.driver.get(url)
                    
                    # 페이지 로드 대기
                    time.sleep(1)
                    
                    # 데이터 추출 시뮬레이션
                    page_data = {
                        'page': page,
                        'items': [f"아이템 {page}_{i}" for i in range(1, 6)],
                        'total_items': 5
                    }
                    
                    all_data.extend(page_data['items'])
                    print(f"    페이지 {page}: {page_data['total_items']}개 아이템 수집")
                    
                    # 다음 페이지 버튼 확인
                    if page == max_pages:
                        print(f"    최대 페이지({max_pages})에 도달")
                        break
                
            except Exception as e:
                print(f"  페이지 {page} 처리 실패: {e}")
                break
        
        print(f"  총 수집된 아이템: {len(all_data)}개")
        return all_data
    
    def close_browser(self):
        """브라우저 종료"""
        if self.driver:
            self.driver.quit()
            self.driver = None

def demonstrate_dynamic_scraping():
    """동적 스크래핑 시연"""
    
    scraper = DynamicContentScraper(headless=True)
    
    if scraper.start_browser():
        # SPA 페이지 스크래핑
        result = scraper.scrape_spa_page("https://example-spa.com")
        if result:
            print(f"  스크래핑 결과: {result}")
        
        # 페이지네이션 처리
        pagination_data = scraper.handle_pagination("https://example.com/data", max_pages=3)
        
        scraper.close_browser()

demonstrate_dynamic_scraping()
```

## 4. REST API 활용

### 4.1 API 호출과 응답 처리

```python
print("\n=== REST API 활용 ===")

import json
from datetime import datetime, timedelta
import hashlib
import hmac
import base64

class APIClient:
    """REST API 클라이언트"""
    
    def __init__(self, base_url, api_key=None, timeout=30):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.timeout = timeout
        self.session = requests.Session()
        
        # 기본 헤더 설정
        if api_key:
            self.session.headers.update({
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            })
    
    def _make_request(self, method, endpoint, **kwargs):
        """공통 요청 메서드"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = self.session.request(
                method, url, timeout=self.timeout, **kwargs
            )
            response.raise_for_status()
            return response
        
        except requests.exceptions.RequestException as e:
            print(f"API 요청 실패 ({method} {endpoint}): {e}")
            return None
    
    def get(self, endpoint, params=None):
        """GET 요청"""
        return self._make_request('GET', endpoint, params=params)
    
    def post(self, endpoint, data=None, json_data=None):
        """POST 요청"""
        return self._make_request('POST', endpoint, data=data, json=json_data)
    
    def put(self, endpoint, data=None, json_data=None):
        """PUT 요청"""
        return self._make_request('PUT', endpoint, data=data, json=json_data)
    
    def delete(self, endpoint):
        """DELETE 요청"""
        return self._make_request('DELETE', endpoint)
    
    def paginated_get(self, endpoint, params=None, page_param='page', 
                     per_page_param='per_page', per_page=20, max_pages=None):
        """페이지네이션된 GET 요청"""
        all_data = []
        page = 1
        
        while True:
            current_params = params.copy() if params else {}
            current_params.update({
                page_param: page,
                per_page_param: per_page
            })
            
            response = self.get(endpoint, params=current_params)
            if not response:
                break
            
            try:
                data = response.json()
                
                # 데이터 구조에 따라 조정 필요
                if isinstance(data, list):
                    items = data
                elif isinstance(data, dict):
                    items = data.get('data', data.get('items', data.get('results', [])))
                else:
                    break
                
                if not items:
                    break
                
                all_data.extend(items)
                
                print(f"  페이지 {page}: {len(items)}개 항목 수집")
                
                # 마지막 페이지 체크
                if len(items) < per_page:
                    break
                
                if max_pages and page >= max_pages:
                    break
                
                page += 1
                
            except (ValueError, KeyError) as e:
                print(f"응답 파싱 실패: {e}")
                break
        
        return all_data

class GitHubAPIClient(APIClient):
    """GitHub API 클라이언트 예제"""
    
    def __init__(self, token=None):
        super().__init__('https://api.github.com', api_key=token)
    
    def get_user_info(self, username):
        """사용자 정보 조회"""
        response = self.get(f'/users/{username}')
        return response.json() if response else None
    
    def get_user_repos(self, username, sort='updated', per_page=10):
        """사용자 저장소 조회"""
        params = {
            'sort': sort,
            'direction': 'desc'
        }
        
        repos = self.paginated_get(
            f'/users/{username}/repos',
            params=params,
            per_page=per_page,
            max_pages=1  # 첫 페이지만
        )
        
        return repos
    
    def search_repositories(self, query, sort='stars', per_page=10):
        """저장소 검색"""
        params = {
            'q': query,
            'sort': sort,
            'order': 'desc'
        }
        
        response = self.get('/search/repositories', params=params)
        if response:
            data = response.json()
            return data.get('items', [])[:per_page]
        return []

def demonstrate_api_usage():
    """API 사용 시연"""
    
    print("9. REST API 기본 사용법:")
    
    # HTTPBin API 테스트
    api_client = APIClient('https://httpbin.org')
    
    # GET 요청
    response = api_client.get('/get', params={'test': 'value'})
    if response:
        data = response.json()
        print(f"  GET 요청 성공: {data.get('args')}")
    
    # POST 요청
    post_data = {
        'name': 'Python Student',
        'skill': 'Web Scraping',
        'timestamp': datetime.now().isoformat()
    }
    
    response = api_client.post('/post', json_data=post_data)
    if response:
        data = response.json()
        print(f"  POST 요청 성공: 데이터 전송됨")
    
    print(f"\n10. GitHub API 시뮬레이션:")
    
    # GitHub API 시뮬레이션
    github_client = GitHubAPIClient()
    
    # 실제 API 호출 대신 시뮬레이션 데이터
    simulated_user = {
        'login': 'example-user',
        'name': 'Example User',
        'public_repos': 42,
        'followers': 123,
        'following': 87
    }
    
    print(f"  사용자 정보: {simulated_user['name']}")
    print(f"  공개 저장소: {simulated_user['public_repos']}개")
    print(f"  팔로워: {simulated_user['followers']}명")
    
    # 저장소 시뮬레이션
    simulated_repos = [
        {'name': 'awesome-project', 'stars': 256, 'language': 'Python'},
        {'name': 'web-scraper', 'stars': 89, 'language': 'Python'},
        {'name': 'data-analysis', 'stars': 45, 'language': 'R'}
    ]
    
    print(f"  인기 저장소:")
    for repo in simulated_repos:
        print(f"    {repo['name']}: {repo['stars']}⭐ ({repo['language']})")

demonstrate_api_usage()
```

### 4.2 API 인증과 보안

```python
print("\n=== API 인증과 보안 ===")

class AuthenticatedAPIClient:
    """인증이 포함된 API 클라이언트"""
    
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.access_token = None
        self.refresh_token = None
        self.token_expires_at = None
    
    def oauth2_login(self, client_id, client_secret, username, password):
        """OAuth2 로그인 시뮬레이션"""
        print("11. OAuth2 인증 시뮬레이션:")
        
        # 실제로는 OAuth2 플로우를 따름
        login_data = {
            'grant_type': 'password',
            'client_id': client_id,
            'client_secret': client_secret,
            'username': username,
            'password': password
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/oauth/token",
                data=login_data
            )
            
            # 시뮬레이션: 성공 응답
            token_data = {
                'access_token': 'simulated_access_token_12345',
                'refresh_token': 'simulated_refresh_token_67890',
                'expires_in': 3600,
                'token_type': 'Bearer'
            }
            
            self.access_token = token_data['access_token']
            self.refresh_token = token_data['refresh_token']
            self.token_expires_at = datetime.now() + timedelta(seconds=token_data['expires_in'])
            
            # Authorization 헤더 설정
            self.session.headers.update({
                'Authorization': f"Bearer {self.access_token}"
            })
            
            print(f"  로그인 성공")
            print(f"  토큰 만료 시간: {self.token_expires_at}")
            return True
            
        except Exception as e:
            print(f"  로그인 실패: {e}")
            return False
    
    def api_key_auth(self, api_key, api_secret=None):
        """API 키 인증"""
        print(f"\n12. API 키 인증:")
        
        if api_secret:
            # HMAC 서명을 사용한 인증
            timestamp = str(int(datetime.now().timestamp()))
            message = f"{timestamp}{api_key}"
            signature = hmac.new(
                api_secret.encode(),
                message.encode(),
                hashlib.sha256
            ).hexdigest()
            
            self.session.headers.update({
                'X-API-Key': api_key,
                'X-Timestamp': timestamp,
                'X-Signature': signature
            })
            
            print(f"  HMAC 서명 기반 인증 설정")
            print(f"  서명: {signature[:20]}...")
        else:
            # 단순 API 키 인증
            self.session.headers.update({
                'X-API-Key': api_key
            })
            print(f"  API 키 인증 설정")
    
    def refresh_access_token(self):
        """액세스 토큰 갱신"""
        if not self.refresh_token:
            print("  리프레시 토큰이 없습니다.")
            return False
        
        try:
            refresh_data = {
                'grant_type': 'refresh_token',
                'refresh_token': self.refresh_token
            }
            
            # 시뮬레이션: 토큰 갱신
            new_token_data = {
                'access_token': 'new_simulated_access_token_54321',
                'expires_in': 3600
            }
            
            self.access_token = new_token_data['access_token']
            self.token_expires_at = datetime.now() + timedelta(seconds=new_token_data['expires_in'])
            
            self.session.headers.update({
                'Authorization': f"Bearer {self.access_token}"
            })
            
            print(f"  토큰 갱신 성공")
            return True
            
        except Exception as e:
            print(f"  토큰 갱신 실패: {e}")
            return False
    
    def make_secure_request(self, method, endpoint, **kwargs):
        """보안 요청"""
        # 토큰 만료 체크
        if self.token_expires_at and datetime.now() >= self.token_expires_at:
            print("  토큰이 만료되어 갱신합니다...")
            if not self.refresh_access_token():
                print("  토큰 갱신 실패")
                return None
        
        # 요청 실행
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            response = self.session.request(method, url, **kwargs)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            print(f"  보안 요청 실패: {e}")
            return None

def demonstrate_api_authentication():
    """API 인증 시연"""
    
    auth_client = AuthenticatedAPIClient('https://api.example.com')
    
    # OAuth2 로그인 시뮬레이션
    success = auth_client.oauth2_login(
        client_id='my_app_client_id',
        client_secret='my_app_client_secret',
        username='test_user',
        password='secure_password'
    )
    
    if success:
        # 인증된 요청 시뮬레이션
        print(f"\n  인증된 API 요청 시뮬레이션:")
        print(f"    현재 액세스 토큰: {auth_client.access_token[:20]}...")
    
    # API 키 인증 예제
    auth_client.api_key_auth(
        api_key='my_api_key_12345',
        api_secret='my_api_secret_67890'
    )

demonstrate_api_authentication()
```

## 5. 비동기 HTTP 요청

### 5.1 aiohttp를 사용한 비동기 스크래핑

```python
print("\n=== 비동기 HTTP 요청 ===")

import asyncio
import concurrent.futures
from concurrent.futures import ThreadPoolExecutor

# aiohttp가 없는 경우를 위한 시뮬레이션
class AsyncHTTPSimulator:
    """비동기 HTTP 시뮬레이터"""
    
    def __init__(self):
        self.session = None
    
    async def create_session(self):
        """세션 생성 시뮬레이션"""
        print("  비동기 세션 생성")
        await asyncio.sleep(0.1)  # 시뮬레이션 지연
        self.session = "simulated_session"
    
    async def get(self, url):
        """비동기 GET 요청 시뮬레이션"""
        # 실제 네트워크 지연 시뮬레이션
        await asyncio.sleep(0.5 + len(url) % 3 * 0.1)
        
        return {
            'url': url,
            'status': 200,
            'content': f"Content from {url}",
            'headers': {'content-type': 'text/html'}
        }
    
    async def close(self):
        """세션 종료"""
        print("  비동기 세션 종료")
        await asyncio.sleep(0.1)

class AsyncWebScraper:
    """비동기 웹 스크래퍼"""
    
    def __init__(self, max_concurrent=10):
        self.max_concurrent = max_concurrent
        self.http_client = AsyncHTTPSimulator()
        self.semaphore = asyncio.Semaphore(max_concurrent)
    
    async def fetch_page(self, url):
        """단일 페이지 가져오기"""
        async with self.semaphore:  # 동시 요청 수 제한
            try:
                response = await self.http_client.get(url)
                return {
                    'url': url,
                    'status': 'success',
                    'data': response
                }
            except Exception as e:
                return {
                    'url': url,
                    'status': 'error',
                    'error': str(e)
                }
    
    async def fetch_multiple_pages(self, urls):
        """여러 페이지 동시 가져오기"""
        print("13. 비동기 웹 스크래핑:")
        print(f"  {len(urls)}개 URL을 동시에 처리합니다 (최대 {self.max_concurrent}개 동시 요청)")
        
        start_time = asyncio.get_event_loop().time()
        
        # 세션 생성
        await self.http_client.create_session()
        
        # 모든 URL을 비동기로 처리
        tasks = [self.fetch_page(url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        end_time = asyncio.get_event_loop().time()
        
        # 결과 분석
        successful = [r for r in results if isinstance(r, dict) and r.get('status') == 'success']
        failed = [r for r in results if isinstance(r, dict) and r.get('status') == 'error']
        
        print(f"  총 처리 시간: {end_time - start_time:.2f}초")
        print(f"  성공: {len(successful)}개, 실패: {len(failed)}개")
        
        # 세션 종료
        await self.http_client.close()
        
        return results
    
    async def scrape_with_rate_limiting(self, urls, requests_per_second=2):
        """속도 제한이 있는 스크래핑"""
        print(f"\n14. 속도 제한 스크래핑 (초당 {requests_per_second}개 요청):")
        
        interval = 1.0 / requests_per_second
        results = []
        
        await self.http_client.create_session()
        
        for i, url in enumerate(urls):
            if i > 0:
                await asyncio.sleep(interval)
            
            result = await self.fetch_page(url)
            results.append(result)
            print(f"  진행: {i+1}/{len(urls)} - {url}")
        
        await self.http_client.close()
        
        return results

async def demonstrate_async_scraping():
    """비동기 스크래핑 시연"""
    
    scraper = AsyncWebScraper(max_concurrent=5)
    
    # 테스트 URL 목록
    test_urls = [
        'https://example.com/page1',
        'https://example.com/page2',
        'https://example.com/page3',
        'https://example.com/page4',
        'https://example.com/page5',
        'https://example.com/page6',
        'https://example.com/page7',
        'https://example.com/page8'
    ]
    
    # 동시 스크래핑
    results = await scraper.fetch_multiple_pages(test_urls[:5])
    
    # 속도 제한 스크래핑
    limited_results = await scraper.scrape_with_rate_limiting(test_urls[:3], requests_per_second=1)

# 비동기 함수 실행
try:
    asyncio.run(demonstrate_async_scraping())
except Exception as e:
    print(f"비동기 실행 오류: {e}")
```

### 5.2 동기-비동기 하이브리드 접근

```python
print("\n=== 동기-비동기 하이브리드 접근 ===")

class HybridScraper:
    """동기/비동기 하이브리드 스크래퍼"""
    
    def __init__(self, max_workers=4):
        self.max_workers = max_workers
        self.session = requests.Session()
    
    def fetch_single_url(self, url):
        """동기 방식으로 단일 URL 처리"""
        try:
            response = self.session.get(url, timeout=10)
            return {
                'url': url,
                'status_code': response.status_code,
                'content_length': len(response.content),
                'success': True
            }
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'success': False
            }
    
    def parallel_scraping_with_threads(self, urls):
        """스레드풀을 사용한 병렬 스크래핑"""
        print("15. 스레드풀 기반 병렬 스크래핑:")
        
        start_time = time.time()
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # 모든 URL을 스레드풀에 제출
            future_to_url = {
                executor.submit(self.fetch_single_url, url): url 
                for url in urls
            }
            
            results = []
            
            # 완료된 작업들 수집
            for future in concurrent.futures.as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    result = future.result()
                    results.append(result)
                    
                    status = "성공" if result['success'] else "실패"
                    print(f"  {url}: {status}")
                    
                except Exception as e:
                    print(f"  {url}: 예외 발생 - {e}")
                    results.append({
                        'url': url,
                        'error': str(e),
                        'success': False
                    })
        
        end_time = time.time()
        
        successful = [r for r in results if r.get('success')]
        failed = [r for r in results if not r.get('success')]
        
        print(f"  총 처리 시간: {end_time - start_time:.2f}초")
        print(f"  성공: {len(successful)}개, 실패: {len(failed)}개")
        
        return results
    
    def adaptive_scraping(self, urls, fast_threshold=100):
        """적응형 스크래핑 (빠른 응답은 동기, 느린 응답은 비동기)"""
        print(f"\n16. 적응형 스크래핑:")
        
        fast_urls = []
        slow_urls = []
        
        # URL 분류 (실제로는 이전 성능 데이터 기반)
        for i, url in enumerate(urls):
            # 시뮬레이션: 짧은 URL은 빠르다고 가정
            if len(url) < fast_threshold:
                fast_urls.append(url)
            else:
                slow_urls.append(url)
        
        print(f"  빠른 처리 URL: {len(fast_urls)}개")
        print(f"  느린 처리 URL: {len(slow_urls)}개")
        
        results = []
        
        # 빠른 URL들은 동기적으로 처리
        if fast_urls:
            print(f"  빠른 URL들을 동기적으로 처리...")
            for url in fast_urls:
                result = self.fetch_single_url(url)
                results.append(result)
        
        # 느린 URL들은 병렬로 처리
        if slow_urls:
            print(f"  느린 URL들을 병렬로 처리...")
            parallel_results = self.parallel_scraping_with_threads(slow_urls)
            results.extend(parallel_results)
        
        return results

def demonstrate_hybrid_scraping():
    """하이브리드 스크래핑 시연"""
    
    scraper = HybridScraper(max_workers=3)
    
    # 테스트 URL (실제로는 외부 API 호출)
    test_urls = [
        'https://httpbin.org/delay/1',  # 1초 지연
        'https://httpbin.org/delay/2',  # 2초 지연
        'https://httpbin.org/get',      # 빠른 응답
        'https://httpbin.org/json',     # 빠른 응답
        'https://httpbin.org/delay/1'   # 1초 지연
    ]
    
    # 시뮬레이션을 위해 간단한 URL 사용
    simple_urls = [
        'https://example.com/fast1',
        'https://example.com/fast2',
        'https://very-long-domain-name-that-simulates-slow-response.com/slow1',
        'https://another-very-long-domain-name-for-slow-response.com/slow2'
    ]
    
    # 스레드풀 병렬 스크래핑 시뮬레이션
    print("  스레드풀 병렬 처리 시뮬레이션:")
    simulated_results = []
    for url in simple_urls:
        result = {
            'url': url,
            'status_code': 200,
            'content_length': 1024,
            'success': True
        }
        simulated_results.append(result)
        print(f"    {url}: 성공")
    
    print(f"    총 {len(simulated_results)}개 URL 처리 완료")
    
    # 적응형 스크래핑 시뮬레이션
    adaptive_results = scraper.adaptive_scraping(simple_urls)

demonstrate_hybrid_scraping()
```

## 6. 웹 크롤링 에티켓과 모범 사례

### 6.1 크롤링 에티켓

```python
print("\n=== 웹 크롤링 에티켓과 모범 사례 ===")

import time
import random
from urllib.robotparser import RobotFileParser
from collections import defaultdict

class EthicalScraper:
    """윤리적 스크래핑 클래스"""
    
    def __init__(self, user_agent="EthicalBot/1.0", respect_robots=True):
        self.user_agent = user_agent
        self.respect_robots = respect_robots
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': user_agent})
        
        # 요청 제한
        self.request_history = defaultdict(list)
        self.min_delay = 1.0  # 최소 1초 지연
        self.max_requests_per_minute = 30
        
        # robots.txt 캐시
        self.robots_cache = {}
    
    def check_robots_txt(self, url):
        """robots.txt 확인"""
        print("17. robots.txt 준수:")
        
        if not self.respect_robots:
            return True
        
        try:
            parsed_url = urlparse(url)
            base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
            
            if base_url not in self.robots_cache:
                robots_url = urljoin(base_url, '/robots.txt')
                print(f"  robots.txt 확인: {robots_url}")
                
                # 시뮬레이션: robots.txt 내용
                simulated_robots = """
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/
Crawl-delay: 1

User-agent: EthicalBot
Allow: /
Crawl-delay: 2
                """.strip()
                
                print(f"  robots.txt 내용 (시뮬레이션):")
                for line in simulated_robots.split('\n')[:6]:
                    print(f"    {line}")
                
                # 실제로는 RobotFileParser 사용
                # rp = RobotFileParser()
                # rp.set_url(robots_url)
                # rp.read()
                # self.robots_cache[base_url] = rp
                
                # 시뮬레이션: 허용된 경로 체크
                if '/admin/' in url or '/private/' in url:
                    print(f"  차단된 경로: {url}")
                    return False
                else:
                    print(f"  허용된 경로: {url}")
                    return True
            
        except Exception as e:
            print(f"  robots.txt 확인 실패: {e}")
            return True  # 확인 실패 시 허용
        
        return True
    
    def rate_limit_check(self, domain):
        """요청 제한 확인"""
        current_time = time.time()
        
        # 1분 이내의 요청 기록만 유지
        self.request_history[domain] = [
            req_time for req_time in self.request_history[domain]
            if current_time - req_time < 60
        ]
        
        # 분당 요청 수 확인
        if len(self.request_history[domain]) >= self.max_requests_per_minute:
            wait_time = 60 - (current_time - self.request_history[domain][0])
            print(f"  요청 제한 도달. {wait_time:.1f}초 대기 필요")
            return False
        
        # 마지막 요청으로부터 최소 지연 시간 확인
        if self.request_history[domain]:
            last_request = self.request_history[domain][-1]
            time_since_last = current_time - last_request
            
            if time_since_last < self.min_delay:
                wait_time = self.min_delay - time_since_last
                print(f"  최소 지연 시간 미충족. {wait_time:.1f}초 대기")
                time.sleep(wait_time)
        
        return True
    
    def polite_request(self, url):
        """정중한 요청"""
        print(f"\n18. 정중한 크롤링:")
        
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        # robots.txt 확인
        if not self.check_robots_txt(url):
            return None
        
        # 요청 제한 확인
        if not self.rate_limit_check(domain):
            return None
        
        try:
            # 요청 실행
            print(f"  요청 실행: {url}")
            response = self.session.get(url, timeout=10)
            
            # 요청 기록
            self.request_history[domain].append(time.time())
            
            # 서버 부하 확인
            if response.status_code == 429:  # Too Many Requests
                retry_after = response.headers.get('Retry-After', 60)
                print(f"  서버 과부하 감지. {retry_after}초 후 재시도")
                time.sleep(int(retry_after))
                return None
            
            print(f"  응답 수신: {response.status_code}")
            return response
            
        except Exception as e:
            print(f"  요청 실패: {e}")
            return None
    
    def bulk_scraping_with_ethics(self, urls):
        """윤리적 대량 스크래핑"""
        print(f"\n19. 윤리적 대량 스크래핑:")
        print(f"  총 {len(urls)}개 URL 처리 예정")
        
        results = []
        
        for i, url in enumerate(urls):
            print(f"  진행: {i+1}/{len(urls)}")
            
            response = self.polite_request(url)
            
            if response:
                results.append({
                    'url': url,
                    'status': 'success',
                    'status_code': response.status_code
                })
            else:
                results.append({
                    'url': url,
                    'status': 'skipped'
                })
            
            # 배치 간 휴식
            if (i + 1) % 10 == 0:
                print(f"  배치 완료. 5초 휴식...")
                time.sleep(5)
        
        successful = [r for r in results if r['status'] == 'success']
        print(f"  완료: 성공 {len(successful)}개, 건너뜀 {len(results) - len(successful)}개")
        
        return results

def demonstrate_ethical_scraping():
    """윤리적 스크래핑 시연"""
    
    scraper = EthicalScraper(
        user_agent="PythonTutorial-EthicalBot/1.0 (+https://example.com/bot-info)",
        respect_robots=True
    )
    
    # 테스트 URL들
    test_urls = [
        'https://example.com/public/page1',
        'https://example.com/public/page2',
        'https://example.com/admin/secret',  # robots.txt에서 차단
        'https://example.com/public/page3'
    ]
    
    # 윤리적 스크래핑 실행
    results = scraper.bulk_scraping_with_ethics(test_urls[:2])  # 처음 2개만 테스트

demonstrate_ethical_scraping()
```

### 6.2 에러 처리와 복구 전략

```python
print("\n=== 에러 처리와 복구 전략 ===")

class RobustScraper:
    """견고한 스크래핑 클래스"""
    
    def __init__(self):
        self.session = requests.Session()
        self.retry_config = {
            'max_retries': 3,
            'backoff_factor': 2,
            'retry_status_codes': [500, 502, 503, 504, 429]
        }
    
    def exponential_backoff(self, attempt):
        """지수 백오프 계산"""
        delay = self.retry_config['backoff_factor'] ** attempt
        jitter = random.uniform(0, 0.1) * delay  # 지터 추가
        return delay + jitter
    
    def robust_request(self, url, max_retries=None):
        """견고한 요청 (재시도 포함)"""
        print(f"20. 견고한 요청 처리:")
        
        max_retries = max_retries or self.retry_config['max_retries']
        
        for attempt in range(max_retries + 1):
            try:
                print(f"  시도 {attempt + 1}/{max_retries + 1}: {url}")
                
                response = self.session.get(url, timeout=10)
                
                # 재시도가 필요한 상태 코드 확인
                if response.status_code in self.retry_config['retry_status_codes']:
                    if attempt < max_retries:
                        delay = self.exponential_backoff(attempt)
                        print(f"    상태 코드 {response.status_code}: {delay:.1f}초 후 재시도")
                        time.sleep(delay)
                        continue
                    else:
                        print(f"    최대 재시도 횟수 초과 (상태 코드: {response.status_code})")
                        return None
                
                # 성공적인 응답
                response.raise_for_status()
                print(f"    성공: {response.status_code}")
                return response
                
            except requests.exceptions.Timeout:
                if attempt < max_retries:
                    delay = self.exponential_backoff(attempt)
                    print(f"    타임아웃: {delay:.1f}초 후 재시도")
                    time.sleep(delay)
                else:
                    print(f"    타임아웃: 최대 재시도 횟수 초과")
                    return None
                    
            except requests.exceptions.ConnectionError as e:
                if attempt < max_retries:
                    delay = self.exponential_backoff(attempt)
                    print(f"    연결 오류: {delay:.1f}초 후 재시도")
                    time.sleep(delay)
                else:
                    print(f"    연결 오류: 최대 재시도 횟수 초과 - {e}")
                    return None
                    
            except requests.exceptions.RequestException as e:
                print(f"    요청 실패: {e}")
                return None
        
        return None
    
    def circuit_breaker_scraping(self, urls, failure_threshold=0.5):
        """서킷 브레이커 패턴을 사용한 스크래핑"""
        print(f"\n21. 서킷 브레이커 패턴:")
        
        results = []
        failures = 0
        total_attempts = 0
        circuit_open = False
        
        for url in urls:
            total_attempts += 1
            
            # 서킷 브레이커 상태 확인
            if circuit_open:
                failure_rate = failures / total_attempts
                if failure_rate > failure_threshold:
                    print(f"  서킷 열림: 실패율 {failure_rate:.1%} (임계값: {failure_threshold:.1%})")
                    results.append({
                        'url': url,
                        'status': 'circuit_open',
                        'error': 'Circuit breaker is open'
                    })
                    continue
                else:
                    print(f"  서킷 닫힘: 실패율이 임계값 이하")
                    circuit_open = False
            
            # 요청 시도
            response = self.robust_request(url, max_retries=1)
            
            if response:
                results.append({
                    'url': url,
                    'status': 'success',
                    'status_code': response.status_code
                })
            else:
                failures += 1
                failure_rate = failures / total_attempts
                
                if failure_rate > failure_threshold:
                    circuit_open = True
                
                results.append({
                    'url': url,
                    'status': 'failed',
                    'error': 'Request failed'
                })
        
        successful = [r for r in results if r['status'] == 'success']
        failed = [r for r in results if r['status'] == 'failed']
        skipped = [r for r in results if r['status'] == 'circuit_open']
        
        print(f"  최종 결과: 성공 {len(successful)}개, 실패 {len(failed)}개, 건너뜀 {len(skipped)}개")
        
        return results

def demonstrate_robust_scraping():
    """견고한 스크래핑 시연"""
    
    scraper = RobustScraper()
    
    # 다양한 상황 시뮬레이션 URL
    test_scenarios = [
        'https://httpbin.org/status/200',  # 성공
        'https://httpbin.org/status/500',  # 서버 오류 (재시도)
        'https://httpbin.org/status/404',  # 클라이언트 오류 (재시도 안함)
        'https://invalid-domain-that-does-not-exist.com',  # 연결 오류
    ]
    
    # 시뮬레이션을 위해 간단한 URL 사용
    simple_test_urls = [
        'https://example.com/success',
        'https://example.com/server-error',
        'https://example.com/not-found',
        'https://invalid-domain.test'
    ]
    
    print("  견고한 요청 시뮬레이션:")
    for url in simple_test_urls[:2]:
        if 'server-error' in url:
            print(f"    {url}: 서버 오류 시뮬레이션 (재시도 필요)")
        else:
            print(f"    {url}: 성공 시뮬레이션")
    
    # 서킷 브레이커 시뮬레이션
    circuit_test_urls = [
        'https://example.com/good1',
        'https://example.com/bad1',
        'https://example.com/bad2',
        'https://example.com/good2',
        'https://example.com/bad3'
    ]
    
    print(f"\n  서킷 브레이커 시뮬레이션:")
    simulated_results = []
    failures = 0
    
    for i, url in enumerate(circuit_test_urls):
        is_bad = 'bad' in url
        
        if is_bad:
            failures += 1
            status = 'failed'
            print(f"    {url}: 실패 시뮬레이션")
        else:
            status = 'success'
            print(f"    {url}: 성공 시뮬레이션")
        
        failure_rate = failures / (i + 1)
        if failure_rate > 0.5 and i >= 2:
            print(f"      서킷 열림 (실패율: {failure_rate:.1%})")
        
        simulated_results.append({
            'url': url,
            'status': status
        })
    
    successful = [r for r in simulated_results if r['status'] == 'success']
    failed = [r for r in simulated_results if r['status'] == 'failed']
    print(f"    결과: 성공 {len(successful)}개, 실패 {len(failed)}개")

demonstrate_robust_scraping()
```

## 7. 연습 문제

### 연습 1: 뉴스 사이트 스크래퍼
여러 뉴스 사이트에서 헤드라인을 수집하는 스크래퍼를 구현하세요:
- 다양한 뉴스 사이트 지원
- 중복 제거 및 데이터 정규화
- 크롤링 에티켓 준수
- 결과를 데이터베이스에 저장

### 연습 2: API 데이터 수집기
여러 공개 API를 활용하여 데이터를 수집하고 분석하는 시스템을 구현하세요:
- API 키 관리 및 인증
- 비동기 요청으로 성능 최적화
- 에러 처리 및 재시도 로직
- 수집된 데이터 시각화

### 연습 3: 전자상거래 가격 모니터링
여러 쇼핑몰의 상품 가격을 모니터링하는 시스템을 구현하세요:
- 동적 콘텐츠 처리 (Selenium)
- 가격 변동 알림
- 데이터 저장 및 히스토리 관리
- 스케줄링을 통한 자동 실행

### 연습 4: 소셜 미디어 분석 도구
공개 API를 사용하여 소셜 미디어 데이터를 분석하는 도구를 구현하세요:
- OAuth 인증 구현
- 실시간 데이터 수집
- 텍스트 분석 및 감정 분석
- 대시보드를 통한 결과 시각화

## 정리

이 챕터에서 학습한 내용:

1. **HTTP 기초**: requests 라이브러리, 세션 관리, 쿠키 처리
2. **웹 스크래핑**: BeautifulSoup, HTML 파싱, 데이터 추출
3. **고급 기법**: User-Agent 로테이션, 재시도 로직, 폴백 처리
4. **동적 콘텐츠**: JavaScript 렌더링, SPA 처리, 페이지네이션
5. **REST API**: HTTP 메서드, 인증, 페이지네이션 처리
6. **비동기 처리**: aiohttp, 동시 요청, 성능 최적화
7. **에티켓과 모범 사례**: robots.txt, 요청 제한, 서킷 브레이커

다음 챕터에서는 GUI 프로그래밍 기초에 대해 학습하여 사용자 인터페이스 개발 방법을 배우겠습니다.

### 핵심 포인트
- 웹 스크래핑은 강력한 도구이지만 윤리적으로 사용해야 합니다
- robots.txt를 존중하고 서버에 부담을 주지 않도록 주의하세요
- 에러 처리와 재시도 로직을 구현하여 견고한 시스템을 만드세요
- 비동기 처리로 성능을 향상시킬 수 있습니다
- API 사용 시 인증과 보안을 반드시 고려하세요
- 법적 문제와 이용약관을 항상 확인하세요 