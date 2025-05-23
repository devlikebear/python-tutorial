# Chapter 3: 문자열 다루기

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 문자열 인덱싱과 슬라이싱을 사용하여 문자열의 일부를 추출한다
- 다양한 문자열 메서드를 활용하여 문자열을 조작한다
- 문자열 포맷팅을 통해 동적인 텍스트를 생성한다
- 이스케이프 문자와 raw 문자열을 올바르게 사용한다
- 문자열 검증 메서드로 문자열의 특성을 확인한다

## 1. 문자열 인덱싱 (String Indexing)

### 1.1 인덱스 개념
문자열의 각 문자는 **위치 번호(인덱스)**를 가집니다. Python에서는 0부터 시작합니다.

```python
text = "Python"
#       012345  (양수 인덱스)
#      -654321  (음수 인덱스)

# 양수 인덱스로 접근
print(text[0])    # P (첫 번째 문자)
print(text[1])    # y (두 번째 문자)
print(text[5])    # n (마지막 문자)

# 음수 인덱스로 접근 (뒤에서부터)
print(text[-1])   # n (마지막 문자)
print(text[-2])   # o (뒤에서 두 번째)
print(text[-6])   # P (첫 번째 문자)
```

### 1.2 문자열 길이와 인덱스
```python
message = "안녕하세요"
print(len(message))      # 5 (문자열 길이)

# 유효한 인덱스 범위: 0 ~ len(message)-1
print(message[0])        # 안
print(message[4])        # 요
# print(message[5])      # 오류! IndexError

# 마지막 문자 안전하게 접근
last_char = message[len(message) - 1]  # 요
last_char = message[-1]                # 더 간단한 방법
print(last_char)
```

### 1.3 문자열 순회
```python
word = "Hello"

# 인덱스를 사용한 순회
for i in range(len(word)):
    print(f"인덱스 {i}: {word[i]}")

# 직접 문자 순회 (더 pythonic)
for char in word:
    print(char)

# 인덱스와 문자를 함께 순회
for i, char in enumerate(word):
    print(f"인덱스 {i}: {char}")
```

## 2. 문자열 슬라이싱 (String Slicing)

### 2.1 기본 슬라이싱 문법
슬라이싱은 `문자열[시작:끝:간격]` 형식으로 문자열의 일부분을 추출합니다.

```python
text = "Python Programming"
#       0123456789012345678

# 기본 슬라이싱
print(text[0:6])     # Python (0부터 5까지)
print(text[7:18])    # Programming (7부터 17까지)
print(text[7:])      # Programming (7부터 끝까지)
print(text[:6])      # Python (처음부터 5까지)
print(text[:])       # Python Programming (전체)

# 음수 인덱스 사용
print(text[-11:])    # Programming (뒤에서 11번째부터 끝까지)
print(text[:-12])    # Python (처음부터 뒤에서 12번째 전까지)
```

### 2.2 간격(Step)을 이용한 슬라이싱
```python
numbers = "0123456789"

# 간격 지정
print(numbers[::2])     # 02468 (2칸씩 건너뛰기)
print(numbers[1::2])    # 13579 (1부터 2칸씩)
print(numbers[::3])     # 0369 (3칸씩 건너뛰기)

# 역순 출력
print(numbers[::-1])    # 9876543210 (전체를 역순으로)
print(numbers[5:1:-1])  # 5432 (5부터 2까지 역순으로)

# 실용적인 예제
email = "user@example.com"
username = email[:email.index('@')]     # user
domain = email[email.index('@')+1:]     # example.com
print(f"사용자명: {username}, 도메인: {domain}")
```

### 2.3 슬라이싱 활용 예제
```python
# 문자열 뒤집기
def reverse_string(s):
    return s[::-1]

# 팰린드롬 검사
def is_palindrome(s):
    s = s.lower().replace(" ", "")  # 소문자로 변환, 공백 제거
    return s == s[::-1]

# 파일 확장자 추출
def get_file_extension(filename):
    dot_index = filename.rfind('.')  # 마지막 점의 위치
    if dot_index != -1:
        return filename[dot_index+1:]
    return ""

# 테스트
print(reverse_string("Hello"))           # olleH
print(is_palindrome("A man a plan a canal Panama"))  # True
print(get_file_extension("document.pdf"))            # pdf
```

## 3. 문자열 메서드 (String Methods)

### 3.1 대소문자 변환 메서드
```python
text = "Hello World"

# 대소문자 변환
print(text.upper())         # HELLO WORLD
print(text.lower())         # hello world
print(text.capitalize())    # Hello world (첫 글자만 대문자)
print(text.title())         # Hello World (각 단어 첫 글자 대문자)
print(text.swapcase())      # hELLO wORLD (대소문자 반전)

# 케이스 확인
print(text.isupper())       # False
print(text.islower())       # False
print(text.istitle())       # True
```

### 3.2 공백 처리 메서드
```python
text = "   Hello World   "

# 공백 제거
print(f"'{text.strip()}'")      # 'Hello World' (양쪽 공백 제거)
print(f"'{text.lstrip()}'")     # 'Hello World   ' (왼쪽 공백 제거)
print(f"'{text.rstrip()}'")     # '   Hello World' (오른쪽 공백 제거)

# 특정 문자 제거
data = "...Hello World..."
print(data.strip('.'))          # Hello World

# 문자열 정렬
print(text.strip().center(20, '*'))  # ****Hello World****
print(text.strip().ljust(20, '-'))   # Hello World--------
print(text.strip().rjust(20, '-'))   # --------Hello World
```

### 3.3 검색과 확인 메서드
```python
sentence = "Python is easy to learn"

# 검색 메서드
print(sentence.find('is'))          # 7 (첫 번째 위치)
print(sentence.find('Java'))        # -1 (없으면 -1 반환)
print(sentence.index('is'))         # 7 (첫 번째 위치)
# print(sentence.index('Java'))     # 오류! ValueError

print(sentence.rfind('e'))          # 18 (뒤에서부터 검색)
print(sentence.count('a'))          # 3 (개수 세기)

# 시작/끝 확인
print(sentence.startswith('Python'))  # True
print(sentence.endswith('learn'))     # True
print(sentence.startswith('Java'))    # False

# 포함 확인 ('in' 연산자)
print('Python' in sentence)          # True
print('Java' in sentence)            # False
```

### 3.4 분할과 결합 메서드
```python
# split() - 문자열을 리스트로 분할
sentence = "Python,Java,JavaScript,C++"
languages = sentence.split(',')
print(languages)  # ['Python', 'Java', 'JavaScript', 'C++']

text = "Hello World Python"
words = text.split()  # 공백으로 분할 (기본값)
print(words)  # ['Hello', 'World', 'Python']

# 분할 개수 제한
data = "apple-banana-cherry-date"
fruits = data.split('-', 2)  # 최대 2번 분할
print(fruits)  # ['apple', 'banana', 'cherry-date']

# join() - 리스트를 문자열로 결합
words = ['Python', 'is', 'awesome']
sentence = ' '.join(words)
print(sentence)  # Python is awesome

numbers = ['1', '2', '3', '4', '5']
csv_data = ','.join(numbers)
print(csv_data)  # 1,2,3,4,5

# 실용적인 예제: 경로 결합
path_parts = ['home', 'user', 'documents', 'file.txt']
file_path = '/'.join(path_parts)
print(file_path)  # home/user/documents/file.txt
```

### 3.5 치환 메서드
```python
text = "Hello World Hello Python"

# replace() - 문자열 치환
new_text = text.replace('Hello', 'Hi')
print(new_text)  # Hi World Hi Python

# 치환 횟수 제한
new_text = text.replace('Hello', 'Hi', 1)  # 첫 번째 것만 치환
print(new_text)  # Hi World Hello Python

# 여러 번 치환하기
message = "I love cats and cats love me"
message = message.replace('cats', 'dogs')
print(message)  # I love dogs and dogs love me

# 복잡한 치환 예제
def clean_phone_number(phone):
    # 전화번호에서 불필요한 문자 제거
    phone = phone.replace('-', '')
    phone = phone.replace(' ', '')
    phone = phone.replace('(', '')
    phone = phone.replace(')', '')
    return phone

phone = "(010) 1234-5678"
clean_phone = clean_phone_number(phone)
print(clean_phone)  # 01012345678
```

## 4. 문자열 포맷팅 (String Formatting)

### 4.1 f-string (권장 방법)
```python
name = "김민수"
age = 25
height = 175.5

# 기본 f-string
print(f"이름: {name}, 나이: {age}세")

# 수식 계산
print(f"태어난 해: {2024 - age}년")

# 포맷 지정
print(f"키: {height:.1f}cm")      # 소수점 1자리
print(f"나이: {age:02d}세")       # 2자리 수, 앞에 0 채우기

# 정렬
print(f"|{name:>10}|")           # 오른쪽 정렬 (10자리)
print(f"|{name:<10}|")           # 왼쪽 정렬 (10자리)
print(f"|{name:^10}|")           # 가운데 정렬 (10자리)

# 천 단위 구분자
price = 1234567
print(f"가격: {price:,}원")       # 가격: 1,234,567원
```

### 4.2 format() 메서드
```python
# 기본 사용법
template = "이름: {}, 나이: {}세"
print(template.format("이영희", 30))

# 인덱스 지정
template = "이름: {0}, 나이: {1}세, 다시 이름: {0}"
print(template.format("이영희", 30))

# 키워드 인수
template = "이름: {name}, 나이: {age}세"
print(template.format(name="이영희", age=30))

# 포맷 지정
print("원주율: {:.3f}".format(3.14159))  # 소수점 3자리
print("백분율: {:.1%}".format(0.85))     # 퍼센트 형식
```

### 4.3 % 포맷팅 (레거시)
```python
# 기본 사용법 (권장하지 않음, 호환성을 위해 알아두기)
name = "김철수"
age = 28
print("이름: %s, 나이: %d세" % (name, age))

# 포맷 지정
pi = 3.14159
print("원주율: %.2f" % pi)  # 소수점 2자리
```

### 4.4 고급 포맷팅 예제
```python
# 테이블 형태 출력
students = [
    ("김민수", 25, 85.5),
    ("이영희", 23, 92.0),
    ("박철수", 26, 78.5)
]

print("이름      나이  점수")
print("-" * 20)
for name, age, score in students:
    print(f"{name:<8} {age:>3} {score:>5.1f}")

# 진행률 표시
def show_progress(current, total):
    percentage = current / total
    bar_length = 20
    filled = int(bar_length * percentage)
    bar = '█' * filled + '░' * (bar_length - filled)
    return f"[{bar}] {percentage:.1%} ({current}/{total})"

print(show_progress(7, 10))  # [██████████████░░░░░░] 70.0% (7/10)

# 로그 포맷
import datetime

def log_message(level, message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"[{timestamp}] {level:<5} {message}"

print(log_message("INFO", "프로그램이 시작되었습니다"))
print(log_message("ERROR", "파일을 찾을 수 없습니다"))
```

## 5. 이스케이프 문자와 Raw 문자열

### 5.1 이스케이프 문자
```python
# 기본 이스케이프 문자
print("첫 번째 줄\n두 번째 줄")        # \n: 줄바꿈
print("이름:\t김민수")                 # \t: 탭
print("그는 \"안녕\"이라고 말했다")      # \": 따옴표
print("파일 경로: C:\\Users\\kim")      # \\: 백슬래시

# 기타 이스케이프 문자
print("벨 소리: \a")                   # \a: 경고음
print("백스페이스: Hello\b!")          # \b: 백스페이스
print("캐리지 리턴: Hello\rHi")        # \r: 커서를 줄 시작으로
print("세로 탭: Line1\vLine2")         # \v: 수직 탭

# 유니코드 문자
print("하트: \u2665")                  # ♥
print("스마일: \u263A")                # ☺
print("한글: \uD55C\uAE00")           # 한글
```

### 5.2 Raw 문자열
Raw 문자열은 이스케이프 문자를 무시하고 문자 그대로 처리합니다.

```python
# 일반 문자열 vs Raw 문자열
normal_string = "C:\new\text.txt"
raw_string = r"C:\new\text.txt"

print("일반:", normal_string)  # C:
print("Raw:", raw_string)     # C:\new\text.txt

# 정규표현식에서 유용
import re

# 일반 문자열 (복잡함)
pattern1 = "\\d+\\.\\d+"  # 숫자.숫자 패턴
# Raw 문자열 (간단함)
pattern2 = r"\d+\.\d+"    # 같은 의미

text = "가격은 123.45원입니다"
match = re.search(pattern2, text)
if match:
    print(f"찾은 숫자: {match.group()}")  # 123.45

# 파일 경로 처리
file_path = r"C:\Users\Documents\data.txt"
print(f"파일 경로: {file_path}")
```

### 5.3 삼중 따옴표 문자열
```python
# 여러 줄 문자열
multi_line = """첫 번째 줄
두 번째 줄
    들여쓰기가 있는 줄
마지막 줄"""

print(multi_line)

# 문서화 문자열 (docstring)
def calculate_area(radius):
    """
    원의 넓이를 계산합니다.
    
    Args:
        radius (float): 원의 반지름
        
    Returns:
        float: 원의 넓이
    """
    return 3.14159 * radius ** 2

# HTML/SQL 등 긴 텍스트
html_template = """
<!DOCTYPE html>
<html>
<head>
    <title>{title}</title>
</head>
<body>
    <h1>{heading}</h1>
    <p>{content}</p>
</body>
</html>
"""

webpage = html_template.format(
    title="내 웹페이지",
    heading="환영합니다",
    content="Python 문자열 학습 중입니다."
)
```

## 6. 문자열 검증 메서드

### 6.1 문자 타입 확인
```python
# 숫자 확인
print("123".isdigit())      # True  (모든 문자가 숫자)
print("12.3".isdigit())     # False (소수점 포함)
print("-123".isdigit())     # False (음수 기호 포함)

print("123".isdecimal())    # True  (십진수)
print("½".isdecimal())      # False (분수)

print("123".isnumeric())    # True  (숫자형)
print("½".isnumeric())      # True  (분수도 숫자형)
print("Ⅴ".isnumeric())      # True  (로마 숫자)

# 알파벳 확인
print("Hello".isalpha())    # True  (모든 문자가 알파벳)
print("Hello123".isalpha()) # False (숫자 포함)
print("안녕".isalpha())     # True  (한글도 알파벳으로 인식)

# 알파벳과 숫자 조합 확인
print("Hello123".isalnum()) # True  (알파벳 + 숫자)
print("Hello 123".isalnum()) # False (공백 포함)
```

### 6.2 공백 및 특수 문자 확인
```python
# 공백 확인
print(" ".isspace())        # True  (공백)
print("\t\n".isspace())     # True  (탭, 개행)
print("".isspace())         # False (빈 문자열)

# 출력 가능한 문자 확인
print("Hello".isprintable()) # True
print("Hello\n".isprintable()) # False (개행 문자 포함)

# 식별자 확인 (변수명으로 사용 가능한지)
print("variable_name".isidentifier())  # True
print("2nd_variable".isidentifier())   # False (숫자로 시작)
print("class".isidentifier())          # True (하지만 예약어)
```

### 6.3 실용적인 검증 함수들
```python
def validate_email(email):
    """간단한 이메일 검증"""
    if '@' not in email:
        return False
    parts = email.split('@')
    if len(parts) != 2:
        return False
    username, domain = parts
    if not username or not domain:
        return False
    if '.' not in domain:
        return False
    return True

def validate_phone_korean(phone):
    """한국 전화번호 검증 (010-XXXX-XXXX 형식)"""
    # 하이픈 제거 후 검증
    clean_phone = phone.replace('-', '')
    if len(clean_phone) != 11:
        return False
    if not clean_phone.isdigit():
        return False
    if not clean_phone.startswith('010'):
        return False
    return True

def validate_password(password):
    """비밀번호 강도 검증"""
    if len(password) < 8:
        return False, "비밀번호는 최소 8자 이상이어야 합니다"
    
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    
    if not (has_upper and has_lower and has_digit and has_special):
        return False, "대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다"
    
    return True, "안전한 비밀번호입니다"

# 테스트
print(validate_email("user@example.com"))    # True
print(validate_phone_korean("010-1234-5678")) # True
print(validate_password("MyPass123!"))        # (True, '안전한 비밀번호입니다')
```

## 7. 실습 예제

### 7.1 문자열 분석기
```python
def analyze_text(text):
    """텍스트를 분석하여 다양한 통계를 제공"""
    # 기본 통계
    char_count = len(text)
    word_count = len(text.split())
    line_count = text.count('\n') + 1
    
    # 문자 타입별 개수
    letters = sum(1 for c in text if c.isalpha())
    digits = sum(1 for c in text if c.isdigit())
    spaces = sum(1 for c in text if c.isspace())
    special = char_count - letters - digits - spaces
    
    # 가장 자주 사용된 단어
    words = text.lower().split()
    word_freq = {}
    for word in words:
        # 구두점 제거
        clean_word = ''.join(c for c in word if c.isalnum())
        if clean_word:
            word_freq[clean_word] = word_freq.get(clean_word, 0) + 1
    
    most_common = max(word_freq.items(), key=lambda x: x[1]) if word_freq else ("", 0)
    
    # 결과 출력
    print("=== 텍스트 분석 결과 ===")
    print(f"전체 문자 수: {char_count}")
    print(f"단어 수: {word_count}")
    print(f"줄 수: {line_count}")
    print(f"알파벳: {letters}, 숫자: {digits}, 공백: {spaces}, 특수문자: {special}")
    print(f"가장 자주 사용된 단어: '{most_common[0]}' ({most_common[1]}회)")

# 테스트
sample_text = """
Python은 배우기 쉽고 강력한 프로그래밍 언어입니다.
Python을 사용하면 웹 개발, 데이터 분석, AI 등 다양한 분야에서 활용할 수 있습니다.
Python Python Python!
"""

analyze_text(sample_text)
```

### 7.2 간단한 텍스트 에디터 기능
```python
class SimpleTextEditor:
    def __init__(self):
        self.content = ""
    
    def add_text(self, text):
        """텍스트 추가"""
        self.content += text
    
    def find_and_replace(self, find_text, replace_text):
        """찾기 및 바꾸기"""
        count = self.content.count(find_text)
        self.content = self.content.replace(find_text, replace_text)
        return count
    
    def word_count(self):
        """단어 개수 세기"""
        return len(self.content.split())
    
    def get_lines(self):
        """줄별로 분리"""
        return self.content.split('\n')
    
    def format_text(self, style):
        """텍스트 포맷팅"""
        if style == "upper":
            self.content = self.content.upper()
        elif style == "lower":
            self.content = self.content.lower()
        elif style == "title":
            self.content = self.content.title()
    
    def remove_extra_spaces(self):
        """여분의 공백 제거"""
        lines = []
        for line in self.content.split('\n'):
            # 각 줄의 양쪽 공백 제거 후, 연속된 공백을 하나로
            clean_line = ' '.join(line.split())
            lines.append(clean_line)
        self.content = '\n'.join(lines)
    
    def get_statistics(self):
        """통계 정보"""
        return {
            'characters': len(self.content),
            'words': len(self.content.split()),
            'lines': len(self.content.split('\n')),
            'paragraphs': len([p for p in self.content.split('\n\n') if p.strip()])
        }
    
    def display(self):
        """내용 출력"""
        print("=== 문서 내용 ===")
        print(self.content)
        print("\n=== 통계 ===")
        stats = self.get_statistics()
        for key, value in stats.items():
            print(f"{key}: {value}")

# 테스트
editor = SimpleTextEditor()
editor.add_text("Python은   정말  좋은   언어입니다.\n")
editor.add_text("python을   배우면   많은  것을   할   수   있어요!")

print("원본:")
editor.display()

editor.remove_extra_spaces()
print("\n공백 정리 후:")
editor.display()

replaced_count = editor.find_and_replace("python", "Python")
print(f"\n'python'을 'Python'으로 {replaced_count}개 교체했습니다.")
editor.display()
```

## 8. 실습 과제

### 과제 1: 단어 게임
사용자가 입력한 문장에서 특정 조건을 만족하는 단어들을 찾는 프로그램을 작성하세요.

**요구사항:**
- 사용자로부터 문장 입력받기
- 5글자 이상인 단어 찾기
- 모음(a,e,i,o,u)으로 시작하는 단어 찾기
- 대문자로 시작하는 단어 찾기
- 각 조건별 결과를 출력

### 과제 2: 이름 포맷터
다양한 형식으로 입력된 이름을 표준 형식으로 변환하는 프로그램을 작성하세요.

**요구사항:**
- 입력 예시: "kim, min su", "KIM MIN SU", "kim_min_su" 등
- 출력 형식: "Kim Min Su" (각 단어의 첫 글자만 대문자)
- 불필요한 공백, 언더스코어, 쉼표 제거
- 연속된 공백을 하나로 통합

### 과제 3: 간단한 암호화
시저 암호(Caesar Cipher)를 구현하는 프로그램을 작성하세요.

**요구사항:**
- 알파벳만 암호화 (대소문자 구분)
- 숫자, 공백, 특수문자는 그대로 유지
- 암호화와 복호화 기능 모두 구현
- 사용자가 이동할 문자 수(shift) 지정 가능

**예시:**
- 입력: "Hello World!", shift: 3
- 출력: "Khoor Zruog!"

## 9. 다음 챕터 미리보기

Chapter 4에서는 다음 내용을 학습합니다:
- **산술 연산자**: +, -, *, /, //, %, **
- **비교 연산자**: ==, !=, <, >, <=, >=
- **논리 연산자**: and, or, not
- **할당 연산자**: +=, -=, *=, /= 등
- **연산자 우선순위**와 **결합성**
- **비트 연산자** 기초

## 10. 핵심 정리

✅ **문자열 인덱싱과 슬라이싱**
- 인덱싱: `문자열[인덱스]` (0부터 시작, 음수 가능)
- 슬라이싱: `문자열[시작:끝:간격]`
- 역순: `문자열[::-1]`

✅ **주요 문자열 메서드**
- 대소문자: `upper()`, `lower()`, `title()`, `capitalize()`
- 공백 처리: `strip()`, `lstrip()`, `rstrip()`
- 검색: `find()`, `index()`, `count()`, `startswith()`, `endswith()`
- 분할/결합: `split()`, `join()`
- 치환: `replace()`

✅ **문자열 포맷팅**
- f-string: `f"Hello {name}"` (권장)
- format(): `"Hello {}".format(name)`
- % 포맷: `"Hello %s" % name` (레거시)

✅ **이스케이프와 Raw 문자열**
- 이스케이프: `\n`, `\t`, `\"`, `\\`
- Raw 문자열: `r"C:\new\text.txt"`
- 삼중 따옴표: 여러 줄 문자열

✅ **문자열 검증**
- 타입 확인: `isdigit()`, `isalpha()`, `isalnum()`
- 공백 확인: `isspace()`
- 식별자 확인: `isidentifier()`

---

**🎉 축하합니다!** Chapter 3을 완료했습니다. 이제 문자열을 자유자재로 다룰 수 있는 능력을 갖추었습니다. Chapter 4에서는 다양한 연산자들을 학습하여 더 복잡한 계산과 논리를 구현해보겠습니다. 