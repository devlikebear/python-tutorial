# Chapter 2: 변수와 기본 데이터 타입

## 📚 이 챕터에서 배울 내용
- 변수의 개념과 올바른 사용법 이해하기
- Python의 기본 데이터 타입 구분하고 활용하기
- 타입 확인과 형변환 수행하기
- 변수 명명 규칙과 베스트 프랙티스 익히기
- 동적 타이핑의 개념과 장단점 이해하기

---

## 🎯 변수란 무엇인가요?

### 💡 변수의 개념
변수(Variable)는 **데이터를 저장하는 메모리 공간에 붙인 이름**입니다. 마치 물건을 담는 상자에 라벨을 붙이는 것과 같습니다.

> 🏠 **실생활 비유**: 변수는 집 주소와 같습니다. "김민수의 집"이라는 이름(변수명)으로 특정 주소(메모리 위치)에 있는 집(데이터)을 찾을 수 있습니다.

### 🔧 변수 생성과 할당

```python
# Variable creation and assignment
name = "김민수"        # String variable
age = 25              # Integer variable
is_student = True     # Boolean variable

print(name)           # 김민수
print(age)            # 25
print(is_student)     # True
```

### 🔄 변수 값 변경하기

```python
# Variables can be changed
x = 10                # x is 10
print(f"x의 초기값: {x}")

x = 20                # x is now 20
print(f"x의 변경된 값: {x}")

x = "Hello"           # x is now a string!
print(f"x의 새로운 값: {x}")
```

> 💡 **Python의 특징**: Python은 동적 타이핑을 지원하므로 같은 변수에 다른 타입의 값을 할당할 수 있습니다.

### 🎯 여러 변수 동시 할당

```python
# Multiple assignment
a = b = c = 100
print(f"a={a}, b={b}, c={c}")        # a=100, b=100, c=100

# Unpacking assignment
x, y, z = 1, 2, 3
print(f"x={x}, y={y}, z={z}")        # x=1, y=2, z=3

# Variable swapping (Python magic!)
a, b = 10, 20
print(f"교환 전: a={a}, b={b}")
a, b = b, a                          # Swap values
print(f"교환 후: a={a}, b={b}")
```

---

## 🔢 Python의 기본 데이터 타입

### 1. 정수형 (int) - 소수점이 없는 숫자

```python
# Integer examples
positive_num = 42         # Positive integer
negative_num = -15        # Negative integer
zero = 0                  # Zero

# Python can handle very large numbers
big_number = 1234567890123456789
print(f"큰 수: {big_number}")

# Different number systems
binary = 0b1010           # Binary (decimal: 10)
octal = 0o12              # Octal (decimal: 10)
hexadecimal = 0xA         # Hexadecimal (decimal: 10)
print(f"2진법: {binary}, 8진법: {octal}, 16진법: {hexadecimal}")
```

#### 🌟 실생활 활용 예시
```python
# Real-world integer usage
student_count = 30        # Number of students
year = 2024              # Current year
temperature = -5         # Temperature in Celsius
score = 95               # Test score
```

### 2. 실수형 (float) - 소수점이 있는 숫자

```python
# Float examples
pi = 3.14159
temperature = -5.5
height = 175.0            # Integer can be written as float

# Scientific notation
scientific = 1.23e4       # 1.23 × 10^4 = 12300.0
small_num = 2.5e-3        # 2.5 × 10^-3 = 0.0025
print(f"과학적 표기법: {scientific}, {small_num}")

# Special float values
infinity = float('inf')   # Infinity
neg_infinity = float('-inf')  # Negative infinity
not_a_number = float('nan')   # Not a Number
```

#### ⚠️ 실수 연산 주의사항
```python
# Floating point precision issues
result = 0.1 + 0.2
print(f"0.1 + 0.2 = {result}")  # 0.30000000000000004

# Solution: use round() for display
print(f"반올림: {round(result, 2)}")  # 0.3
```

### 3. 문자열 (str) - 텍스트 데이터

```python
# String creation methods
single_quote = '안녕하세요'
double_quote = "Hello, World!"
triple_quote = """여러 줄
문자열도
가능합니다"""

# Empty strings
empty_string = ""
empty_string2 = ''

# Quotes inside strings
quote_inside = "그는 '안녕'이라고 말했다"
quote_inside2 = '그는 "안녕"이라고 말했다'
```

#### 🔤 이스케이프 문자 (Escape Characters)
```python
# Special characters
newline = "첫 번째 줄\n두 번째 줄"       # \n: newline
tab = "이름:\t김민수"                   # \t: tab
backslash = "경로: C:\\Users\\kim"      # \\: backslash
quote = "그는 \"안녕\"이라고 말했다"      # \": double quote

print(newline)
print(tab)
print(backslash)
print(quote)
```

#### 🌟 문자열 실생활 활용
```python
# Real-world string usage
user_name = "김민수"
email = "minsu@example.com"
address = "서울시 강남구 테헤란로 123"
phone = "010-1234-5678"

# String formatting
greeting = f"안녕하세요, {user_name}님!"
contact_info = f"연락처: {phone}, 이메일: {email}"
print(greeting)
print(contact_info)
```

### 4. 불린 (bool) - 참/거짓 값

```python
# Boolean values
is_raining = True
is_sunny = False

# Boolean from comparisons
age = 20
is_adult = age >= 18      # True
is_child = age < 10       # False
is_teenager = 13 <= age <= 19  # False

print(f"성인인가요? {is_adult}")
print(f"어린이인가요? {is_child}")
print(f"청소년인가요? {is_teenager}")
```

#### 🔄 다른 타입을 불린으로 변환
```python
# Truthy and Falsy values
print("=== Truthy values ===")
print(bool(1))            # True (non-zero number)
print(bool("hello"))      # True (non-empty string)
print(bool([1, 2, 3]))    # True (non-empty list)
print(bool({"key": "value"}))  # True (non-empty dict)

print("\n=== Falsy values ===")
print(bool(0))            # False (zero)
print(bool(""))           # False (empty string)
print(bool([]))           # False (empty list)
print(bool({}))           # False (empty dict)
print(bool(None))         # False (None)
```

---

## 🔍 타입 확인과 변환

### 📊 타입 확인하기

```python
# Type checking
name = "김민수"
age = 25
height = 175.5
is_student = True

print("=== type() 함수 사용 ===")
print(f"name의 타입: {type(name)}")         # <class 'str'>
print(f"age의 타입: {type(age)}")           # <class 'int'>
print(f"height의 타입: {type(height)}")     # <class 'float'>
print(f"is_student의 타입: {type(is_student)}")  # <class 'bool'>

print("\n=== isinstance() 함수 사용 ===")
print(f"age는 정수인가? {isinstance(age, int)}")        # True
print(f"height는 실수인가? {isinstance(height, float)}")   # True
print(f"name은 문자열인가? {isinstance(name, str)}")       # True
```

### 🔄 타입 변환 (Type Conversion)

#### 명시적 타입 변환
```python
# String to number conversion
str_number = "123"
int_number = int(str_number)      # 123 (integer)
float_number = float(str_number)  # 123.0 (float)

print(f"원본: {str_number} (타입: {type(str_number)})")
print(f"정수 변환: {int_number} (타입: {type(int_number)})")
print(f"실수 변환: {float_number} (타입: {type(float_number)})")

# Number to string conversion
age = 25
age_str = str(age)        # "25"
print(f"나이: {age_str} (타입: {type(age_str)})")

# Float to integer (truncation)
pi = 3.14159
pi_int = int(pi)          # 3 (decimal part removed)
print(f"π를 정수로: {pi_int}")
```

#### ⚠️ 변환 시 주의사항
```python
# Conversion errors
try:
    invalid_conversion = int("hello")  # ValueError!
except ValueError as e:
    print(f"변환 오류: {e}")

try:
    invalid_conversion = int("3.14")   # ValueError!
except ValueError as e:
    print(f"변환 오류: {e}")
    print("해결책: float()로 먼저 변환 후 int()로 변환")
    correct_conversion = int(float("3.14"))
    print(f"올바른 변환: {correct_conversion}")
```

---

## 📝 변수 명명 규칙과 베스트 프랙티스

### ✅ 올바른 변수명
```python
# Valid variable names
name = "김민수"
age = 25
user_name = "minsu"
user_age = 20
is_student = True
total_score = 95
PI = 3.14159          # Constant (convention)
_private_var = "private"
name2 = "second name"
```

### ❌ 잘못된 변수명
```python
# Invalid variable names (these will cause errors)
# 2name = "error"      # Cannot start with number
# user-name = "error"  # Cannot use hyphen
# class = "error"      # Cannot use reserved keywords
# user name = "error"  # Cannot contain spaces
```

### 🌟 변수 명명 베스트 프랙티스

```python
# Good naming practices
student_count = 30           # Descriptive and clear
total_price = 15000         # Clear purpose
is_logged_in = True         # Boolean with is_ prefix
MAX_RETRY_COUNT = 3         # Constant in UPPER_CASE

# Poor naming practices (avoid these)
x = 30                      # Not descriptive
data = 15000               # Too generic
flag = True                # Unclear purpose
n = 3                      # Single letter (except for loops)
```

#### 📋 명명 규칙 가이드
| 타입 | 규칙 | 예시 |
|------|------|------|
| 변수 | snake_case | `user_name`, `total_score` |
| 상수 | UPPER_CASE | `PI`, `MAX_SIZE` |
| 불린 | is_, has_, can_ 접두사 | `is_valid`, `has_permission` |
| 임시변수 | 짧고 명확하게 | `i`, `j` (반복문), `temp` |

---

## 🎯 실습: 개인정보 관리 프로그램

### 📝 실습 과제
사용자의 개인정보를 입력받아 다양한 데이터 타입으로 저장하고 처리하는 프로그램을 만들어보세요.

```python
# Personal Information Management Program
print("=" * 40)
print("      개인정보 관리 프로그램")
print("=" * 40)

# Input personal information
name = input("이름을 입력하세요: ")
age_str = input("나이를 입력하세요: ")
height_str = input("키를 입력하세요 (cm): ")
is_student_str = input("학생이신가요? (y/n): ")

# Type conversion
age = int(age_str)
height = float(height_str)
is_student = is_student_str.lower() == 'y'

# Calculate additional information
birth_year = 2024 - age
height_m = height / 100  # Convert cm to meters
adult_status = "성인" if age >= 18 else "미성년자"

# Display results
print("\n" + "=" * 40)
print("      개인정보 요약")
print("=" * 40)
print(f"👤 이름: {name} ({type(name).__name__})")
print(f"🎂 나이: {age}세 ({type(age).__name__})")
print(f"📅 출생년도: {birth_year}년")
print(f"📏 키: {height}cm ({height_m:.2f}m) ({type(height).__name__})")
print(f"🎓 학생 여부: {is_student} ({type(is_student).__name__})")
print(f"👨‍💼 성인 여부: {adult_status}")
print("=" * 40)

# Type information
print("\n📊 데이터 타입 정보:")
print(f"name: {type(name)}")
print(f"age: {type(age)}")
print(f"height: {type(height)}")
print(f"is_student: {type(is_student)}")
```

### 🎮 실행 예시
```
========================================
      개인정보 관리 프로그램
========================================
이름을 입력하세요: 김민수
나이를 입력하세요: 20
키를 입력하세요 (cm): 175.5
학생이신가요? (y/n): y

========================================
      개인정보 요약
========================================
👤 이름: 김민수 (str)
🎂 나이: 20세 (int)
📅 출생년도: 2004년
📏 키: 175.5cm (1.76m) (float)
🎓 학생 여부: True (bool)
👨‍💼 성인 여부: 성인
========================================

📊 데이터 타입 정보:
name: <class 'str'>
age: <class 'int'>
height: <class 'float'>
is_student: <class 'bool'>
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 계산기 프로그램
```python
# Simple Calculator
print("=== 간단한 계산기 ===")
num1 = float(input("첫 번째 숫자: "))
num2 = float(input("두 번째 숫자: "))

print(f"\n=== 계산 결과 ===")
print(f"{num1} + {num2} = {num1 + num2}")
print(f"{num1} - {num2} = {num1 - num2}")
print(f"{num1} * {num2} = {num1 * num2}")
if num2 != 0:
    print(f"{num1} / {num2} = {num1 / num2:.2f}")
else:
    print("0으로 나눌 수 없습니다!")
```

### 🚀 심화 과제: 데이터 타입 변환기
다양한 데이터 타입 간의 변환을 수행하는 프로그램을 만들어보세요:
1. 문자열을 숫자로 변환
2. 숫자를 문자열로 변환
3. 불린 값의 다양한 표현 처리
4. 에러 처리 포함

---

## 🧠 동적 타이핑 이해하기

### 💡 동적 타이핑이란?
Python은 **동적 타이핑(Dynamic Typing)** 언어입니다. 이는 변수의 타입이 실행 시간에 결정된다는 의미입니다.

```python
# Dynamic typing example
variable = 42           # integer
print(f"값: {variable}, 타입: {type(variable)}")

variable = "Hello"      # now string
print(f"값: {variable}, 타입: {type(variable)}")

variable = [1, 2, 3]    # now list
print(f"값: {variable}, 타입: {type(variable)}")

variable = True         # now boolean
print(f"값: {variable}, 타입: {type(variable)}")
```

### ⚖️ 동적 타이핑의 장단점

#### ✅ 장점
- **유연성**: 같은 변수에 다른 타입 할당 가능
- **간편성**: 타입 선언 불필요
- **빠른 개발**: 프로토타이핑에 유리

#### ❌ 단점
- **런타임 에러**: 타입 관련 오류가 실행 시에 발견
- **성능**: 타입 체크 오버헤드
- **가독성**: 변수 타입이 명확하지 않을 수 있음

```python
# Type-related runtime error example
def add_numbers(a, b):
    return a + b

result1 = add_numbers(5, 3)        # Works: 8
result2 = add_numbers("Hello", " World")  # Works: "Hello World"
# result3 = add_numbers(5, "Hello")  # TypeError at runtime!
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- 변수의 개념과 할당 방법
- Python의 4가지 기본 데이터 타입 (int, float, str, bool)
- 타입 확인과 변환 방법
- 변수 명명 규칙과 베스트 프랙티스
- 동적 타이핑의 개념과 특징

✅ **핵심 개념**
- `type()`: 타입 확인
- `isinstance()`: 타입 검사
- `int()`, `float()`, `str()`, `bool()`: 타입 변환
- 동적 타이핑: 실행 시간에 타입 결정

✅ **실무 팁**
- 의미 있는 변수명 사용하기
- 타입 변환 시 에러 처리하기
- 불린 변수에는 `is_`, `has_` 접두사 사용하기

🎯 **다음 챕터 예고**
다음 챕터에서는 문자열을 더 깊이 다뤄보겠습니다. 문자열 인덱싱, 슬라이싱, 다양한 메서드들을 배워서 텍스트 데이터를 자유자재로 조작해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: 변수명에 한글을 사용해도 되나요?**
A: 기술적으로는 가능하지만, 영어 사용을 권장합니다. 코드의 국제적 호환성과 가독성을 위해서입니다.

**Q: 정수와 실수를 연산하면 어떻게 되나요?**
A: 결과는 실수(float)가 됩니다. 예: `5 + 3.0 = 8.0`

**Q: 문자열 "123"과 숫자 123의 차이점은 무엇인가요?**
A: 문자열 "123"은 텍스트 데이터로 연산이 불가능하고, 숫자 123은 수학적 연산이 가능합니다.

**Q: 변수를 삭제할 수 있나요?**
A: `del` 키워드를 사용하여 변수를 삭제할 수 있습니다. 예: `del variable_name`

**Q: Python에서 상수는 어떻게 만드나요?**
A: Python에는 진정한 상수가 없지만, 관례적으로 대문자와 언더스코어를 사용합니다. 예: `PI = 3.14159` 