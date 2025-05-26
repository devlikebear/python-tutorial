# Chapter 3: 정규표현식 (Regular Expressions)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 정규표현식의 기본 문법과 패턴을 이해하기
- re 모듈의 다양한 함수 활용하기
- 메타 문자와 특수 문자 사용하기
- 그룹화와 캡처를 통한 고급 패턴 매칭
- 실무에서 자주 사용되는 정규표현식 패턴 작성하기
- 텍스트 검색, 추출, 치환 작업 자동화하기

## 1. 정규표현식 기초

### 1.1 정규표현식이란?

정규표현식(Regular Expression, RegEx)은 문자열에서 특정 패턴을 찾거나 매칭하기 위한 강력한 도구입니다. 복잡한 문자열 처리 작업을 간단하고 효율적으로 수행할 수 있게 해줍니다.

```python
import re

print("=== 정규표현식 기본 개념 ===")

# 간단한 패턴 매칭 예제
text = "Python은 2024년 현재 가장 인기 있는 프로그래밍 언어입니다."

# 'Python' 문자열 찾기
pattern = "Python"
match = re.search(pattern, text)

if match:
    print(f"'{pattern}' 패턴을 찾았습니다!")
    print(f"위치: {match.start()} ~ {match.end()}")
    print(f"매칭된 문자열: '{match.group()}'")
else:
    print(f"'{pattern}' 패턴을 찾지 못했습니다.")

# 숫자 패턴 찾기
number_pattern = r"\d+"  # \d는 숫자, +는 1개 이상
number_match = re.search(number_pattern, text)

if number_match:
    print(f"\n숫자 패턴 발견: {number_match.group()}")

# 모든 한글 문자 찾기
korean_pattern = r"[가-힣]+"
korean_matches = re.findall(korean_pattern, text)
print(f"\n한글 단어들: {korean_matches}")
```

### 1.2 기본 문법과 메타 문자

```python
print("\n=== 정규표현식 기본 문법 ===")

# 기본 메타 문자들
test_strings = [
    "hello world",
    "Hello World",
    "HELLO WORLD",
    "hello123",
    "test@email.com",
    "010-1234-5678",
    "2024-01-15",
    "   spaces   "
]

patterns = {
    r"hello": "정확한 문자열 매칭",
    r"hello|hi": "OR 연산 (hello 또는 hi)",
    r"^hello": "문자열 시작이 hello",
    r"world$": "문자열 끝이 world",
    r"h.llo": ". (임의의 한 문자)",
    r"hello*": "* (0개 이상 반복)",
    r"hello+": "+ (1개 이상 반복)",
    r"hello?": "? (0개 또는 1개)",
    r"hello{2}": "{n} (정확히 n번)",
    r"[aeiou]": "[] (문자 클래스)",
    r"[^aeiou]": "[^] (부정 문자 클래스)",
    r"\d": "\\d (숫자)",
    r"\w": "\\w (단어 문자: 알파벳, 숫자, _)",
    r"\s": "\\s (공백 문자)"
}

for pattern, description in patterns.items():
    print(f"\n패턴: {pattern} - {description}")
    for text in test_strings:
        match = re.search(pattern, text)
        if match:
            print(f"  '{text}' -> 매칭: '{match.group()}'")
```

### 1.3 문자 클래스와 범위

```python
print("\n=== 문자 클래스와 범위 ===")

# 다양한 문자 클래스 예제
text_samples = [
    "abc123XYZ",
    "Hello World!",
    "test@domain.com",
    "2024-12-25",
    "가나다ABC123",
    "특수문자!@#$%"
]

character_classes = {
    r"[a-z]": "소문자",
    r"[A-Z]": "대문자", 
    r"[0-9]": "숫자",
    r"[a-zA-Z]": "모든 영문자",
    r"[a-zA-Z0-9]": "영문자와 숫자",
    r"[가-힣]": "한글",
    r"[!@#$%^&*]": "특수문자",
    r"[^0-9]": "숫자가 아닌 문자",
    r"\w": "단어 문자 (알파벳, 숫자, _)",
    r"\W": "단어 문자가 아닌 문자",
    r"\d": "숫자",
    r"\D": "숫자가 아닌 문자",
    r"\s": "공백",
    r"\S": "공백이 아닌 문자"
}

for pattern, description in character_classes.items():
    print(f"\n{description} 패턴: {pattern}")
    for text in text_samples:
        matches = re.findall(pattern, text)
        if matches:
            print(f"  '{text}' -> {matches}")

# 실용적인 문자 클래스 예제
print("\n=== 실용적인 예제 ===")

# 이메일에서 도메인 추출
email = "user@example.com"
domain_pattern = r"@([a-zA-Z0-9.-]+)"
domain_match = re.search(domain_pattern, email)
if domain_match:
    print(f"이메일 도메인: {domain_match.group(1)}")

# 한국 전화번호 패턴
phone_numbers = ["010-1234-5678", "02-123-4567", "031-123-4567"]
phone_pattern = r"\d{2,3}-\d{3,4}-\d{4}"

for phone in phone_numbers:
    if re.match(phone_pattern, phone):
        print(f"유효한 전화번호: {phone}")
```

## 2. re 모듈 주요 함수

### 2.1 기본 매칭 함수들

```python
print("\n=== re 모듈 주요 함수들 ===")

sample_text = """
Python 3.12는 2024년에 출시되었습니다.
이메일: admin@python.org, support@example.com
전화번호: 010-1234-5678, 02-987-6543
웹사이트: https://python.org, http://example.com
"""

# re.search() - 첫 번째 매칭 찾기
print("1. re.search() - 첫 번째 매칭")
email_pattern = r"\w+@\w+\.\w+"
first_email = re.search(email_pattern, sample_text)
if first_email:
    print(f"첫 번째 이메일: {first_email.group()}")

# re.match() - 문자열 시작부터 매칭
print("\n2. re.match() - 문자열 시작부터 매칭")
start_match = re.match(r"Python", sample_text.strip())
if start_match:
    print(f"시작 매칭: {start_match.group()}")

# re.findall() - 모든 매칭 찾기
print("\n3. re.findall() - 모든 매칭 찾기")
all_emails = re.findall(email_pattern, sample_text)
print(f"모든 이메일: {all_emails}")

all_numbers = re.findall(r"\d+", sample_text)
print(f"모든 숫자: {all_numbers}")

# re.finditer() - 매칭 객체들의 이터레이터
print("\n4. re.finditer() - 매칭 객체 이터레이터")
for match in re.finditer(email_pattern, sample_text):
    print(f"이메일: {match.group()}, 위치: {match.start()}-{match.end()}")

# re.split() - 패턴으로 분할
print("\n5. re.split() - 패턴으로 분할")
text_to_split = "apple,banana;orange:grape"
fruits = re.split(r"[,;:]", text_to_split)
print(f"과일들: {fruits}")

# 복잡한 분할 예제
sentences = "첫 번째 문장입니다. 두 번째 문장이에요! 세 번째 문장인가요?"
sentence_list = re.split(r"[.!?]+", sentences)
sentence_list = [s.strip() for s in sentence_list if s.strip()]
print(f"문장들: {sentence_list}")

# re.sub() - 패턴 치환
print("\n6. re.sub() - 패턴 치환")
phone_text = "연락처: 010-1234-5678, 사무실: 02-987-6543"
masked_phones = re.sub(r"\d{3,4}-\d{4}", "***-****", phone_text)
print(f"전화번호 마스킹: {masked_phones}")

# 고급 치환 - 함수 사용
def mask_email(match):
    email = match.group()
    username, domain = email.split('@')
    masked_username = username[0] + '*' * (len(username) - 1)
    return f"{masked_username}@{domain}"

text_with_emails = "연락처: john@example.com, jane@test.org"
masked_emails = re.sub(email_pattern, mask_email, text_with_emails)
print(f"이메일 마스킹: {masked_emails}")
```

### 2.2 컴파일된 패턴 객체

```python
print("\n=== 컴파일된 패턴 객체 ===")

# 패턴을 미리 컴파일하면 성능 향상
email_regex = re.compile(r"([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})")
phone_regex = re.compile(r"(\d{2,3})-(\d{3,4})-(\d{4})")
url_regex = re.compile(r"(https?://)([a-zA-Z0-9.-]+)(/[a-zA-Z0-9./?=&_-]*)?")

# 여러 텍스트에서 반복 사용
texts = [
    "Contact: user@domain.com, phone: 010-1234-5678",
    "Website: https://example.com, email: admin@site.org",
    "Office: 02-123-4567, https://company.co.kr"
]

print("컴파일된 패턴으로 매칭:")
for i, text in enumerate(texts, 1):
    print(f"\n텍스트 {i}: {text}")
    
    # 이메일 추출
    email_matches = email_regex.findall(text)
    for username, domain in email_matches:
        print(f"  이메일: {username}@{domain}")
    
    # 전화번호 추출
    phone_matches = phone_regex.findall(text)
    for area, middle, last in phone_matches:
        print(f"  전화번호: {area}-{middle}-{last}")
    
    # URL 추출
    url_matches = url_regex.findall(text)
    for protocol, domain, path in url_matches:
        print(f"  URL: {protocol}{domain}{path}")

# 플래그 사용
print("\n=== 정규표현식 플래그 ===")

case_sensitive_text = "Python python PYTHON"

# 대소문자 구분 없이 매칭
case_insensitive = re.compile(r"python", re.IGNORECASE)
all_pythons = case_insensitive.findall(case_sensitive_text)
print(f"대소문자 무시하고 찾기: {all_pythons}")

# 여러 줄 모드
multiline_text = """첫 번째 줄
두 번째 줄
세 번째 줄"""

# ^ 패턴이 각 줄의 시작에 매칭
line_starts = re.findall(r"^.+", multiline_text, re.MULTILINE)
print(f"각 줄의 시작: {line_starts}")

# DOTALL 플래그 - . 이 개행문자도 매칭
dotall_pattern = re.compile(r"첫.*세", re.DOTALL)
multiline_match = dotall_pattern.search(multiline_text)
if multiline_match:
    print(f"여러 줄 매칭: {repr(multiline_match.group())}")
```

## 3. 그룹화와 캡처

### 3.1 기본 그룹화

```python
print("\n=== 그룹화와 캡처 ===")

# 기본 그룹화
log_entry = "2024-01-15 14:30:25 [INFO] User login successful"

# 날짜, 시간, 로그 레벨, 메시지 추출
log_pattern = r"(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) \[(\w+)\] (.+)"
log_match = re.match(log_pattern, log_entry)

if log_match:
    print("로그 분석 결과:")
    print(f"  전체 매칭: {log_match.group(0)}")  # group(0)은 전체 매칭
    print(f"  날짜: {log_match.group(1)}")
    print(f"  시간: {log_match.group(2)}")
    print(f"  레벨: {log_match.group(3)}")
    print(f"  메시지: {log_match.group(4)}")
    
    # 튜플로 모든 그룹 가져오기
    all_groups = log_match.groups()
    print(f"  모든 그룹: {all_groups}")

# 이메일 주소 분석
email_addresses = [
    "john.doe@company.com",
    "jane_smith@university.edu",
    "admin@sub.domain.org"
]

email_pattern = r"([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})"

print("\n이메일 주소 분석:")
for email in email_addresses:
    match = re.match(email_pattern, email)
    if match:
        username, domain, tld = match.groups()
        print(f"  {email}")
        print(f"    사용자명: {username}")
        print(f"    도메인: {domain}")
        print(f"    최상위 도메인: {tld}")
```

### 3.2 명명된 그룹 (Named Groups)

```python
print("\n=== 명명된 그룹 ===")

# 명명된 그룹 사용
phone_pattern = r"(?P<area>\d{2,3})-(?P<exchange>\d{3,4})-(?P<number>\d{4})"
phone_number = "010-1234-5678"

phone_match = re.match(phone_pattern, phone_number)
if phone_match:
    print("전화번호 분석 (명명된 그룹):")
    print(f"  지역번호: {phone_match.group('area')}")
    print(f"  교환번호: {phone_match.group('exchange')}")
    print(f"  번호: {phone_match.group('number')}")
    
    # groupdict()로 딕셔너리 형태로 가져오기
    phone_dict = phone_match.groupdict()
    print(f"  딕셔너리: {phone_dict}")

# URL 분석
url_pattern = r"(?P<protocol>https?)://(?P<domain>[a-zA-Z0-9.-]+)(?P<path>/[a-zA-Z0-9./?=&_-]*)?"
urls = [
    "https://www.python.org/docs/",
    "http://example.com",
    "https://github.com/python/cpython"
]

print("\nURL 분석:")
for url in urls:
    match = re.match(url_pattern, url)
    if match:
        print(f"  {url}")
        url_parts = match.groupdict()
        for key, value in url_parts.items():
            if value:  # None이 아닌 경우만 출력
                print(f"    {key}: {value}")

# 복잡한 패턴 - 한국어 주소
address_pattern = r"(?P<city>[가-힣]+시)\s+(?P<district>[가-힣]+구)\s+(?P<dong>[가-힣]+동)\s+(?P<detail>.*)"
addresses = [
    "서울시 강남구 역삼동 123-45",
    "부산시 해운대구 우동 567-89 테크노빌딩 10층"
]

print("\n주소 분석:")
for address in addresses:
    match = re.match(address_pattern, address)
    if match:
        print(f"  {address}")
        addr_parts = match.groupdict()
        for key, value in addr_parts.items():
            print(f"    {key}: {value}")
```

### 3.3 비캡처 그룹과 룩어헤드/룩비하인드

```python
print("\n=== 고급 그룹 기법 ===")

# 비캡처 그룹 (?:...)
text_with_units = "5kg, 10m, 3.5cm, 100g"

# 캡처 그룹 사용
capture_pattern = r"(\d+(?:\.\d+)?)(kg|g|m|cm)"
capture_matches = re.findall(capture_pattern, text_with_units)
print("캡처 그룹 결과:", capture_matches)

# 비캡처 그룹 사용
non_capture_pattern = r"\d+(?:\.\d+)?(?:kg|g|m|cm)"
non_capture_matches = re.findall(non_capture_pattern, text_with_units)
print("비캡처 그룹 결과:", non_capture_matches)

# 긍정적 룩어헤드 (?=...)
print("\n긍정적 룩어헤드:")
password_text = "password123, secretword, mypass456"

# 숫자가 뒤따르는 단어만 찾기
lookahead_pattern = r"\w+(?=\d)"
words_before_numbers = re.findall(lookahead_pattern, password_text)
print(f"숫자 앞의 단어들: {words_before_numbers}")

# 부정적 룩어헤드 (?!...)
negative_lookahead_pattern = r"\w+(?!\d)"
words_not_before_numbers = re.findall(negative_lookahead_pattern, password_text)
print(f"숫자 앞이 아닌 단어들: {words_not_before_numbers}")

# 긍정적 룩비하인드 (?<=...)
print("\n긍정적 룩비하인드:")
price_text = "$100, €200, ¥300, 400원"

# 통화 기호 뒤의 숫자만 찾기
lookbehind_pattern = r"(?<=[$€¥])\d+"
currency_numbers = re.findall(lookbehind_pattern, price_text)
print(f"통화 기호 뒤의 숫자들: {currency_numbers}")

# 복합 예제 - 비밀번호 검증
print("\n비밀번호 검증 예제:")
passwords = [
    "weak",           # 너무 짧음
    "password123",    # 일반적인 단어 포함
    "MyP@ssw0rd",     # 강한 비밀번호
    "12345678",       # 숫자만
    "ABCDabcd",       # 특수문자 없음
    "Str0ng!P@ss"     # 강한 비밀번호
]

# 강한 비밀번호 조건:
# - 8자 이상
# - 대문자 포함
# - 소문자 포함  
# - 숫자 포함
# - 특수문자 포함
strong_password_pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"

for password in passwords:
    if re.match(strong_password_pattern, password):
        print(f"  ✓ {password} - 강한 비밀번호")
    else:
        print(f"  ✗ {password} - 약한 비밀번호")
```

## 4. 실용적인 정규표현식 패턴

### 4.1 데이터 검증 패턴

```python
print("\n=== 데이터 검증 패턴 ===")

class DataValidator:
    """정규표현식을 사용한 데이터 검증 클래스"""
    
    def __init__(self):
        # 미리 컴파일된 패턴들
        self.patterns = {
            'email': re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
            'phone_kr': re.compile(r'^(\d{2,3})-(\d{3,4})-(\d{4})$'),
            'phone_mobile': re.compile(r'^01[016789]-\d{3,4}-\d{4}$'),
            'credit_card': re.compile(r'^\d{4}-\d{4}-\d{4}-\d{4}$'),
            'zipcode_kr': re.compile(r'^\d{5}$'),
            'ipv4': re.compile(r'^(\d{1,3}\.){3}\d{1,3}$'),
            'url': re.compile(r'^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$'),
            'korean_name': re.compile(r'^[가-힣]{2,5}$'),
            'username': re.compile(r'^[a-zA-Z0-9_]{3,20}$'),
            'strong_password': re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$')
        }
    
    def validate(self, data_type, value):
        """데이터 타입에 따른 검증"""
        if data_type not in self.patterns:
            return False, f"알 수 없는 데이터 타입: {data_type}"
        
        pattern = self.patterns[data_type]
        if pattern.match(value):
            return True, "유효한 형식입니다."
        else:
            return False, f"유효하지 않은 {data_type} 형식입니다."
    
    def extract_info(self, data_type, value):
        """값에서 정보 추출"""
        if data_type == 'email':
            match = self.patterns['email'].match(value)
            if match:
                username, domain = value.split('@')
                return {'username': username, 'domain': domain}
        
        elif data_type == 'phone_kr':
            match = self.patterns['phone_kr'].match(value)
            if match:
                area, exchange, number = match.groups()
                return {'area': area, 'exchange': exchange, 'number': number}
        
        return None

# 검증기 사용 예제
validator = DataValidator()

test_data = [
    ('email', 'user@example.com'),
    ('email', 'invalid-email'),
    ('phone_kr', '02-123-4567'),
    ('phone_mobile', '010-1234-5678'),
    ('phone_mobile', '010-12-345'),
    ('credit_card', '1234-5678-9012-3456'),
    ('ipv4', '192.168.1.1'),
    ('ipv4', '256.256.256.256'),
    ('korean_name', '홍길동'),
    ('korean_name', 'hong'),
    ('strong_password', 'MyStr0ng!P@ss'),
    ('strong_password', 'weak')
]

print("데이터 검증 결과:")
for data_type, value in test_data:
    is_valid, message = validator.validate(data_type, value)
    status = "✓" if is_valid else "✗"
    print(f"  {status} {data_type}: '{value}' - {message}")
    
    # 유효한 경우 정보 추출
    if is_valid and data_type in ['email', 'phone_kr']:
        info = validator.extract_info(data_type, value)
        if info:
            print(f"    추출된 정보: {info}")
```

### 4.2 텍스트 처리와 정리

```python
print("\n=== 텍스트 처리와 정리 ===")

class TextProcessor:
    """정규표현식을 사용한 텍스트 처리 클래스"""
    
    def __init__(self):
        # 다양한 정리 패턴들
        self.cleanup_patterns = {
            'extra_spaces': re.compile(r'\s+'),
            'html_tags': re.compile(r'<[^>]+>'),
            'special_chars': re.compile(r'[^\w\s가-힣]'),
            'numbers': re.compile(r'\d+'),
            'urls': re.compile(r'https?://[^\s]+'),
            'emails': re.compile(r'\S+@\S+\.\S+'),
            'phone_numbers': re.compile(r'\d{2,3}-\d{3,4}-\d{4}'),
            'hashtags': re.compile(r'#\w+'),
            'mentions': re.compile(r'@\w+')
        }
    
    def clean_text(self, text, operations=None):
        """텍스트 정리"""
        if operations is None:
            operations = ['extra_spaces']
        
        result = text
        for operation in operations:
            if operation == 'extra_spaces':
                result = self.cleanup_patterns['extra_spaces'].sub(' ', result)
                result = result.strip()
            elif operation == 'remove_html':
                result = self.cleanup_patterns['html_tags'].sub('', result)
            elif operation == 'remove_special':
                result = self.cleanup_patterns['special_chars'].sub(' ', result)
            elif operation == 'remove_numbers':
                result = self.cleanup_patterns['numbers'].sub('', result)
            elif operation == 'remove_urls':
                result = self.cleanup_patterns['urls'].sub('', result)
        
        return result
    
    def extract_entities(self, text):
        """텍스트에서 엔티티 추출"""
        entities = {}
        
        entities['urls'] = self.cleanup_patterns['urls'].findall(text)
        entities['emails'] = self.cleanup_patterns['emails'].findall(text)
        entities['phones'] = self.cleanup_patterns['phone_numbers'].findall(text)
        entities['hashtags'] = self.cleanup_patterns['hashtags'].findall(text)
        entities['mentions'] = self.cleanup_patterns['mentions'].findall(text)
        
        return entities
    
    def mask_sensitive_info(self, text):
        """민감한 정보 마스킹"""
        # 이메일 마스킹
        def mask_email(match):
            email = match.group()
            username, domain = email.split('@')
            masked_username = username[0] + '*' * (len(username) - 1)
            return f"{masked_username}@{domain}"
        
        # 전화번호 마스킹
        def mask_phone(match):
            return re.sub(r'\d', '*', match.group())
        
        result = self.cleanup_patterns['emails'].sub(mask_email, text)
        result = self.cleanup_patterns['phone_numbers'].sub(mask_phone, result)
        
        return result
    
    def word_frequency(self, text):
        """단어 빈도 분석"""
        # 텍스트 정리
        clean_text = self.clean_text(text, ['remove_special', 'extra_spaces'])
        clean_text = clean_text.lower()
        
        # 단어 추출 (한글과 영문)
        words = re.findall(r'[가-힣]+|[a-zA-Z]+', clean_text)
        
        # 빈도 계산
        from collections import Counter
        return Counter(words)

# 텍스트 처리기 사용 예제
processor = TextProcessor()

sample_texts = [
    """
    <p>안녕하세요!   저는   홍길동입니다.</p>
    연락처: hong@email.com, 010-1234-5678
    웹사이트: https://example.com
    #python #programming @developer
    """,
    
    """
    여러    공백이    있는    텍스트입니다!!!
    특수문자@#$%가 많이 있네요...
    숫자123도 456있습니다.
    """,
    
    """
    소셜미디어 텍스트 예제입니다. #데이터분석 #머신러닝
    @친구1 @친구2 안녕하세요!
    저의 블로그: https://myblog.com
    이메일로 연락주세요: contact@domain.org
    """
]

print("텍스트 처리 예제:")
for i, text in enumerate(sample_texts, 1):
    print(f"\n--- 텍스트 {i} ---")
    print(f"원본: {repr(text.strip())}")
    
    # 기본 정리
    cleaned = processor.clean_text(text, ['extra_spaces', 'remove_html'])
    print(f"정리됨: {repr(cleaned)}")
    
    # 엔티티 추출
    entities = processor.extract_entities(text)
    for entity_type, entity_list in entities.items():
        if entity_list:
            print(f"{entity_type}: {entity_list}")
    
    # 민감 정보 마스킹
    masked = processor.mask_sensitive_info(text)
    print(f"마스킹: {repr(masked.strip())}")
    
    # 단어 빈도 (한글 텍스트가 있는 경우만)
    if any(re.search(r'[가-힣]', text)):
        word_freq = processor.word_frequency(text)
        if word_freq:
            print(f"단어 빈도: {dict(word_freq.most_common(5))}")
```

### 4.3 로그 분석과 파싱

```python
print("\n=== 로그 분석과 파싱 ===")

class LogAnalyzer:
    """로그 파일 분석을 위한 클래스"""
    
    def __init__(self):
        # 다양한 로그 형식 패턴
        self.log_patterns = {
            'apache_combined': re.compile(
                r'(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<timestamp>[^\]]+)\] '
                r'"(?P<method>\w+) (?P<path>[^\s]+) HTTP/1\.[01]" '
                r'(?P<status>\d+) (?P<size>\d+|-) "(?P<referer>[^"]*)" "(?P<user_agent>[^"]*)"'
            ),
            'nginx_access': re.compile(
                r'(?P<ip>\d+\.\d+\.\d+\.\d+) - (?P<user>[^\s]+) \[(?P<timestamp>[^\]]+)\] '
                r'"(?P<request>[^"]+)" (?P<status>\d+) (?P<size>\d+) '
                r'"(?P<referer>[^"]*)" "(?P<user_agent>[^"]*)"'
            ),
            'python_logging': re.compile(
                r'(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) - '
                r'(?P<name>[^\s]+) - (?P<level>\w+) - (?P<message>.*)'
            ),
            'syslog': re.compile(
                r'(?P<timestamp>\w{3}\s+\d{1,2} \d{2}:\d{2}:\d{2}) '
                r'(?P<hostname>[^\s]+) (?P<program>[^\s]+): (?P<message>.*)'
            )
        }
    
    def parse_log_line(self, line, log_format='apache_combined'):
        """로그 라인 파싱"""
        if log_format not in self.log_patterns:
            return None
        
        pattern = self.log_patterns[log_format]
        match = pattern.match(line)
        
        if match:
            return match.groupdict()
        return None
    
    def analyze_access_logs(self, log_lines):
        """액세스 로그 분석"""
        stats = {
            'total_requests': 0,
            'status_codes': {},
            'top_ips': {},
            'top_paths': {},
            'user_agents': {},
            'error_logs': []
        }
        
        for line in log_lines:
            parsed = self.parse_log_line(line.strip())
            if not parsed:
                continue
            
            stats['total_requests'] += 1
            
            # 상태 코드 통계
            status = parsed.get('status', '000')
            stats['status_codes'][status] = stats['status_codes'].get(status, 0) + 1
            
            # IP 주소 통계
            ip = parsed.get('ip', 'unknown')
            stats['top_ips'][ip] = stats['top_ips'].get(ip, 0) + 1
            
            # 경로 통계
            path = parsed.get('path', 'unknown')
            stats['top_paths'][path] = stats['top_paths'].get(path, 0) + 1
            
            # User Agent 통계
            ua = parsed.get('user_agent', 'unknown')
            stats['user_agents'][ua] = stats['user_agents'].get(ua, 0) + 1
            
            # 에러 로그 수집 (4xx, 5xx)
            if status.startswith(('4', '5')):
                stats['error_logs'].append(parsed)
        
        return stats
    
    def find_security_issues(self, log_lines):
        """보안 이슈 탐지"""
        security_patterns = {
            'sql_injection': re.compile(r"(union|select|insert|delete|drop|script)", re.IGNORECASE),
            'xss_attempt': re.compile(r"(<script|javascript:|<iframe)", re.IGNORECASE),
            'path_traversal': re.compile(r"\.\./"),
            'brute_force': re.compile(r"(admin|login|wp-admin)", re.IGNORECASE)
        }
        
        security_issues = []
        
        for line in log_lines:
            parsed = self.parse_log_line(line.strip())
            if not parsed:
                continue
            
            path = parsed.get('path', '')
            user_agent = parsed.get('user_agent', '')
            
            for issue_type, pattern in security_patterns.items():
                if pattern.search(path) or pattern.search(user_agent):
                    security_issues.append({
                        'type': issue_type,
                        'ip': parsed.get('ip'),
                        'path': path,
                        'timestamp': parsed.get('timestamp'),
                        'user_agent': user_agent
                    })
        
        return security_issues

# 로그 분석기 사용 예제
analyzer = LogAnalyzer()

# 샘플 로그 데이터
sample_logs = [
    '192.168.1.100 - - [01/Jan/2024:12:00:00 +0000] "GET /index.html HTTP/1.1" 200 1234 "-" "Mozilla/5.0"',
    '192.168.1.101 - - [01/Jan/2024:12:01:00 +0000] "POST /login HTTP/1.1" 302 0 "http://example.com/" "Mozilla/5.0"',
    '192.168.1.102 - - [01/Jan/2024:12:02:00 +0000] "GET /admin HTTP/1.1" 404 500 "-" "curl/7.68.0"',
    '10.0.0.1 - - [01/Jan/2024:12:03:00 +0000] "GET /api/users?id=1 UNION SELECT * FROM users-- HTTP/1.1" 400 0 "-" "sqlmap/1.0"',
    '192.168.1.100 - - [01/Jan/2024:12:04:00 +0000] "GET /search?q=<script>alert(1)</script> HTTP/1.1" 200 800 "-" "Mozilla/5.0"'
]

print("로그 분석 결과:")

# 기본 분석
stats = analyzer.analyze_access_logs(sample_logs)
print(f"\n총 요청 수: {stats['total_requests']}")
print(f"상태 코드 분포: {stats['status_codes']}")
print(f"상위 IP: {sorted(stats['top_ips'].items(), key=lambda x: x[1], reverse=True)[:3]}")

# 보안 이슈 탐지
security_issues = analyzer.find_security_issues(sample_logs)
print(f"\n보안 이슈 {len(security_issues)}개 발견:")
for issue in security_issues:
    print(f"  {issue['type']}: {issue['ip']} -> {issue['path']}")

# 개별 로그 라인 파싱 예제
print("\n개별 로그 파싱:")
for i, log_line in enumerate(sample_logs[:3], 1):
    print(f"\n로그 {i}: {log_line}")
    parsed = analyzer.parse_log_line(log_line)
    if parsed:
        for key, value in parsed.items():
            print(f"  {key}: {value}")
```

## 5. 연습 문제

### 연습 1: 신용카드 번호 검증기
다양한 신용카드 회사의 번호 형식을 검증하는 함수를 작성하세요.

### 연습 2: HTML 태그 제거기
HTML 문서에서 모든 태그를 제거하고 텍스트만 추출하는 프로그램을 만드세요.

### 연습 3: 비밀번호 강도 검사기
비밀번호의 강도를 검사하고 개선 사항을 제안하는 시스템을 구현하세요.

### 연습 4: 로그 모니터링 시스템
실시간으로 로그 파일을 모니터링하여 특정 패턴을 감지하는 프로그램을 작성하세요.

## 정리

이 챕터에서 학습한 내용:

1. **정규표현식 기초**: 기본 문법과 메타 문자 사용법
2. **re 모듈**: search, match, findall, sub 등의 함수 활용
3. **그룹화**: 패턴 그룹화와 명명된 그룹 사용법
4. **고급 기법**: 룩어헤드/룩비하인드, 비캡처 그룹
5. **실용 패턴**: 데이터 검증, 텍스트 처리, 로그 분석

다음 챕터에서는 객체지향 프로그래밍의 기초를 학습하겠습니다.

### 핵심 포인트
- 정규표현식은 강력하지만 복잡해질 수 있으므로 가독성을 고려해야 합니다
- 패턴을 미리 컴파일하면 성능을 향상시킬 수 있습니다
- 명명된 그룹을 사용하면 코드의 가독성이 크게 개선됩니다
- 실무에서는 검증, 파싱, 치환 작업에 자주 사용됩니다
- 보안 측면에서 사용자 입력을 검증할 때 매우 유용합니다 