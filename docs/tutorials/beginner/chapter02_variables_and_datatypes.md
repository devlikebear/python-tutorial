# Chapter 2: 변수와 기본 데이터 타입

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 변수의 개념을 이해하고 올바르게 사용한다
- Python의 기본 데이터 타입을 구분하고 활용한다
- 타입 확인과 형변환을 수행한다
- 변수 명명 규칙을 준수한다
- 동적 타이핑의 개념을 이해한다

## 1. 변수란 무엇인가?

### 1.1 변수의 개념
변수(Variable)는 **데이터를 저장하는 메모리 공간에 붙인 이름**입니다. 마치 물건을 담는 상자에 라벨을 붙이는 것과 같습니다.

```python
# 변수 생성 및 값 할당
name = "김민수"        # 문자열을 담는 변수
age = 25              # 숫자를 담는 변수
is_student = True     # 참/거짓을 담는 변수

print(name)           # 김민수
print(age)            # 25
print(is_student)     # True
```

### 1.2 변수 할당 (Assignment)
```python
# 등호(=)를 사용하여 값을 할당
x = 10                # x라는 변수에 10 저장
message = "안녕하세요"  # message라는 변수에 문자열 저장

# 변수의 값 변경 가능
x = 20                # x의 값을 20으로 변경
print(x)              # 20
```

### 1.3 여러 변수에 동시 할당
```python
# 여러 변수에 같은 값 할당
a = b = c = 100
print(a, b, c)        # 100 100 100

# 여러 변수에 다른 값 할당
x, y, z = 1, 2, 3
print(x, y, z)        # 1 2 3

# 변수 값 교환
a, b = 10, 20
a, b = b, a           # 값 교환
print(a, b)           # 20 10
```

## 2. Python의 기본 데이터 타입

### 2.1 정수형 (int)
소수점이 없는 **정수**를 나타냅니다.

```python
# 정수형 변수들
positive_num = 42         # 양수
negative_num = -15        # 음수
zero = 0                  # 0

# 큰 수도 처리 가능
big_number = 1234567890123456789
print(big_number)         # 1234567890123456789

# 다양한 진법으로 표현
binary = 0b1010           # 2진법 (10진법으로 10)
octal = 0o12              # 8진법 (10진법으로 10)
hexadecimal = 0xA         # 16진법 (10진법으로 10)
print(binary, octal, hexadecimal)  # 10 10 10
```

### 2.2 실수형 (float)
소수점이 있는 **실수**를 나타냅니다.

```python
# 실수형 변수들
pi = 3.14159
temperature = -5.5
height = 175.0            # 정수도 실수로 표현 가능

# 지수 표현
scientific = 1.23e4       # 1.23 × 10^4 = 12300.0
small_num = 2.5e-3        # 2.5 × 10^-3 = 0.0025
print(scientific)         # 12300.0
print(small_num)          # 0.0025

# 특수 값들
infinity = float('inf')   # 무한대
neg_infinity = float('-inf')  # 음의 무한대
not_a_number = float('nan')   # Not a Number
```

### 2.3 문자열 (str)
**텍스트 데이터**를 나타냅니다.

```python
# 다양한 방법으로 문자열 생성
single_quote = '안녕하세요'
double_quote = "Hello, World!"
triple_quote = """여러 줄
문자열도
가능합니다"""

# 빈 문자열
empty_string = ""
empty_string2 = ''

# 문자열 안에 따옴표 포함
quote_inside = "그는 '안녕'이라고 말했다"
quote_inside2 = '그는 "안녕"이라고 말했다'

print(single_quote)       # 안녕하세요
print(triple_quote)
```

#### 이스케이프 문자
```python
# 특수 문자 표현
newline = "첫 번째 줄\n두 번째 줄"       # \n: 줄바꿈
tab = "이름:\t김민수"                   # \t: 탭
backslash = "경로: C:\\Users\\kim"      # \\: 백슬래시
quote = "그는 \"안녕\"이라고 말했다"      # \": 큰따옴표

print(newline)
print(tab)
print(backslash)
print(quote)
```

### 2.4 불린 (bool)
**참(True) 또는 거짓(False)** 값을 나타냅니다.

```python
# 불린 값
is_raining = True
is_sunny = False

# 비교 연산의 결과
age = 20
is_adult = age >= 18      # True
is_child = age < 10       # False

print(is_adult)           # True
print(is_child)           # False

# 다른 타입을 불린으로 변환
print(bool(1))            # True (0이 아닌 숫자)
print(bool(0))            # False (0)
print(bool("hello"))      # True (빈 문자열이 아님)
print(bool(""))           # False (빈 문자열)
print(bool([1, 2, 3]))    # True (빈 리스트가 아님)
print(bool([]))           # False (빈 리스트)
```

## 3. 타입 확인과 변환

### 3.1 타입 확인하기
```python
# type() 함수로 타입 확인
name = "김민수"
age = 25
height = 175.5
is_student = True

print(type(name))         # <class 'str'>
print(type(age))          # <class 'int'>
print(type(height))       # <class 'float'>
print(type(is_student))   # <class 'bool'>

# isinstance() 함수로 타입 검사
print(isinstance(age, int))        # True
print(isinstance(height, float))   # True
print(isinstance(name, str))       # True
```

### 3.2 타입 변환 (Type Conversion)

#### 명시적 타입 변환
```python
# 문자열을 숫자로 변환
str_number = "123"
int_number = int(str_number)      # 123 (정수)
float_number = float(str_number)  # 123.0 (실수)

print(int_number)         # 123
print(float_number)       # 123.0

# 숫자를 문자열로 변환
age = 25
age_str = str(age)        # "25"
print("나이: " + age_str)  # 나이: 25

# 실수를 정수로 변환 (소수점 버림)
pi = 3.14159
pi_int = int(pi)          # 3
print(pi_int)             # 3
```

#### 변환 시 주의사항
```python
# 잘못된 변환 시 오류 발생
try:
    invalid = int("hello")  # 오류!
except ValueError as e:
    print(f"변환 오류: {e}")

# 안전한 변환 방법
def safe_int_conversion(value):
    try:
        return int(value)
    except ValueError:
        return None

result = safe_int_conversion("123")   # 123
result2 = safe_int_conversion("abc")  # None
print(result, result2)
```

## 4. 변수 명명 규칙

### 4.1 필수 규칙
```python
# ✅ 올바른 변수명
name = "김민수"
age = 25
student_name = "이영희"
MAX_SIZE = 100
_private_var = "비공개"

# ❌ 잘못된 변수명 (오류 발생)
# 2name = "김민수"        # 숫자로 시작 불가
# my-name = "김민수"      # 하이픈 사용 불가  
# class = "A반"           # 예약어 사용 불가
```

### 4.2 권장 규칙 (PEP 8 스타일 가이드)
```python
# ✅ 좋은 변수명 (스네이크 케이스)
user_name = "김민수"
birth_year = 1998
is_valid = True
max_retry_count = 3

# ❌ 권장하지 않는 변수명
userName = "김민수"       # 카멜 케이스 (함수/클래스용)
BIRTH_YEAR = 1998        # 대문자 (상수용)
n = "김민수"             # 의미 불분명
x1 = "김민수"            # 의미 불분명
```

### 4.3 의미 있는 변수명 사용
```python
# ❌ 나쁜 예
a = 25
b = "김민수" 
c = True

# ✅ 좋은 예
student_age = 25
student_name = "김민수"
is_enrolled = True

# 계산 예시
# ❌ 나쁜 예
r = 5
result = 3.14159 * r * r

# ✅ 좋은 예
radius = 5
pi = 3.14159
circle_area = pi * radius * radius
```

## 5. 동적 타이핑 (Dynamic Typing)

### 5.1 동적 타이핑이란?
Python은 **실행 시간에 변수의 타입이 결정**되는 동적 타이핑 언어입니다.

```python
# 같은 변수에 다른 타입 할당 가능
data = 42           # 정수
print(type(data))   # <class 'int'>

data = "Hello"      # 문자열로 변경
print(type(data))   # <class 'str'>

data = 3.14         # 실수로 변경
print(type(data))   # <class 'float'>

data = True         # 불린으로 변경
print(type(data))   # <class 'bool'>
```

### 5.2 동적 타이핑의 장단점

#### 장점
```python
# 유연한 프로그래밍 가능
def process_data(value):
    if isinstance(value, int):
        return value * 2
    elif isinstance(value, str):
        return value.upper()
    elif isinstance(value, list):
        return len(value)
    else:
        return "Unknown type"

print(process_data(5))        # 10
print(process_data("hello"))  # HELLO
print(process_data([1,2,3]))  # 3
```

#### 주의할 점
```python
# 타입 관련 오류 발생 가능
age = "25"  # 문자열로 저장
birth_year = 2024 - age  # 오류! 문자열과 숫자는 연산 불가

# 올바른 방법
age = int("25")  # 정수로 변환
birth_year = 2024 - age  # 1999
print(birth_year)
```

## 6. 실습 예제

### 6.1 개인 정보 프로그램
```python
# Personal Information Program

# 개인 정보 수집
print("=== 개인 정보 입력 ===")
name = input("이름: ")
age = int(input("나이: "))  # 문자열을 정수로 변환
height = float(input("키 (cm): "))  # 문자열을 실수로 변환
is_student = input("학생인가요? (y/n): ").lower() == 'y'

# 계산
birth_year = 2024 - age
height_m = height / 100  # 미터 단위로 변환

# 정보 출력
print("\n=== 입력된 정보 ===")
print(f"이름: {name} (타입: {type(name).__name__})")
print(f"나이: {age}세 (타입: {type(age).__name__})")
print(f"키: {height}cm = {height_m:.2f}m (타입: {type(height).__name__})")
print(f"출생연도: 약 {birth_year}년")
print(f"학생 여부: {is_student} (타입: {type(is_student).__name__})")
```

### 6.2 계산기 프로그램
```python
# Simple Calculator Program

print("=== 간단한 계산기 ===")

# 사용자 입력
num1 = float(input("첫 번째 숫자: "))
operator = input("연산자 (+, -, *, /): ")
num2 = float(input("두 번째 숫자: "))

# 계산 수행
if operator == '+':
    result = num1 + num2
elif operator == '-':
    result = num1 - num2
elif operator == '*':
    result = num1 * num2
elif operator == '/':
    if num2 != 0:
        result = num1 / num2
    else:
        result = "0으로 나눌 수 없습니다"
else:
    result = "잘못된 연산자입니다"

# 결과 출력
print(f"\n결과: {num1} {operator} {num2} = {result}")
print(f"결과의 타입: {type(result).__name__}")
```

## 7. 상수와 관례

### 7.1 상수 (Constants)
Python에는 진정한 상수가 없지만, **대문자로 이름을 지어 상수임을 표시**합니다.

```python
# 상수 정의 (관례적으로 대문자 사용)
PI = 3.14159
MAX_STUDENTS = 30
DEFAULT_NAME = "Unknown"

# 상수 사용
radius = 5
circle_area = PI * radius ** 2
print(f"원의 넓이: {circle_area}")

# 상수는 변경하지 않는 것이 원칙 (하지만 가능함)
# PI = 3.14  # 권장하지 않음
```

### 7.2 None 타입
```python
# None: 값이 없음을 나타내는 특별한 값
result = None
print(type(result))  # <class 'NoneType'>

# None과 비교
if result is None:
    print("결과가 없습니다")

# 함수에서 값을 반환하지 않을 때 None이 반환됨
def greet(name):
    print(f"안녕하세요, {name}님!")
    # return 문이 없으면 None 반환

returned_value = greet("김민수")
print(returned_value)  # None
```

## 8. 일반적인 오류와 해결법

### 8.1 타입 관련 오류
```python
# TypeError: 서로 다른 타입 간 연산
age = "25"
birth_year = 2024 - age  # 오류!
# TypeError: unsupported operand type(s) for -: 'int' and 'str'

# 해결법: 타입 변환
age = int("25")
birth_year = 2024 - age  # 정상 작동
```

### 8.2 변수명 오류
```python
# NameError: 정의되지 않은 변수 사용
print(username)  # 오류! username이 정의되지 않음
# NameError: name 'username' is not defined

# 해결법: 변수 먼저 정의
username = "김민수"
print(username)  # 정상 작동
```

### 8.3 변환 오류
```python
# ValueError: 잘못된 형식의 문자열 변환
number = int("hello")  # 오류!
# ValueError: invalid literal for int() with base 10: 'hello'

# 해결법: 예외 처리 또는 유효성 검사
text = "hello"
if text.isdigit():
    number = int(text)
else:
    print("숫자가 아닙니다")
```

## 9. 실습 과제

### 과제 1: 온도 변환기
화씨와 섭씨 온도를 서로 변환하는 프로그램을 작성하세요.

**요구사항:**
- 사용자로부터 온도값과 단위(C 또는 F)를 입력받기
- 적절한 공식을 사용하여 변환
- 결과를 소수점 둘째 자리까지 출력
- 변환 공식: °F = (°C × 9/5) + 32, °C = (°F - 32) × 5/9

### 과제 2: BMI 계산기
사용자의 키와 몸무게를 입력받아 BMI를 계산하고 건강 상태를 알려주는 프로그램을 작성하세요.

**요구사항:**
- 키(cm)와 몸무게(kg) 입력받기
- BMI 계산 (BMI = 몸무게 / (키(m))²)
- BMI 지수에 따른 건강 상태 출력
  - 18.5 미만: 저체중
  - 18.5~24.9: 정상체중
  - 25~29.9: 과체중
  - 30 이상: 비만

### 과제 3: 변수 타입 분석기
사용자가 입력한 값의 타입을 분석하고 가능한 모든 타입으로 변환해보는 프로그램을 작성하세요.

**요구사항:**
- 사용자 입력 받기
- 원본 타입 확인
- int, float, bool로 변환 시도 (가능한 경우)
- 각 변환 결과와 성공/실패 여부 출력

## 10. 다음 챕터 미리보기

Chapter 3에서는 다음 내용을 학습합니다:
- **문자열 인덱싱과 슬라이싱**: 문자열의 특정 부분 추출
- **문자열 메서드**: split, join, replace, strip, find 등
- **문자열 포맷팅**: f-string, format() 메서드 활용
- **이스케이프 문자와 raw 문자열**
- **문자열 검증 메서드**: isdigit, isalpha, isalnum 등

## 11. 핵심 정리

✅ **변수와 할당**
- 변수는 데이터를 저장하는 메모리 공간의 이름
- `=` 연산자로 값 할당
- 여러 변수 동시 할당 가능

✅ **기본 데이터 타입**
- `int`: 정수형 (42, -15, 0)
- `float`: 실수형 (3.14, -5.5)
- `str`: 문자열 ("Hello", '안녕')
- `bool`: 불린 (True, False)

✅ **타입 확인과 변환**
- `type()`: 타입 확인
- `int()`, `float()`, `str()`: 타입 변환
- 변환 시 ValueError 주의

✅ **변수 명명 규칙**
- 문자, 숫자, 언더스코어 사용 가능
- 숫자로 시작 불가
- 예약어 사용 불가
- 스네이크 케이스 권장

✅ **동적 타이핑**
- 실행 시간에 타입 결정
- 같은 변수에 다른 타입 할당 가능
- 유연하지만 주의 필요

---

**🎉 축하합니다!** Chapter 2를 완료했습니다. 이제 Python의 기본 데이터 타입과 변수를 자유자재로 다룰 수 있습니다. Chapter 3에서는 문자열을 더 깊이 있게 다뤄보겠습니다. 