# Chapter 5: 입력과 출력 (Input and Output)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- `print()` 함수를 사용하여 다양한 형태로 출력하기
- `input()` 함수를 사용하여 사용자로부터 입력받기
- 입력받은 데이터의 타입을 적절히 변환하기
- 출력 포맷팅을 통해 가독성 높은 출력 만들기
- 간단한 대화형 프로그램 작성하기

## 1. 출력하기 - print() 함수

### 1.1 기본 출력

`print()` 함수는 파이썬에서 화면에 텍스트를 출력하는 가장 기본적인 함수입니다.

```python
# 기본 출력
print("Hello, World!")
print('안녕하세요!')

# 숫자 출력
print(42)
print(3.14159)

# 변수 출력
name = "Alice"
age = 25
print(name)
print(age)
```

**실행 결과:**
```
Hello, World!
안녕하세요!
42
3.14159
Alice
25
```

### 1.2 여러 값을 한 번에 출력하기

`print()` 함수는 여러 개의 값을 콤마로 구분하여 한 번에 출력할 수 있습니다.

```python
name = "Bob"
age = 30
city = "Seoul"

# 여러 값을 한 번에 출력
print("Name:", name, "Age:", age, "City:", city)
print(1, 2, 3, 4, 5)

# 서로 다른 타입의 값들
print("The answer is", 42, "and the value is", 3.14)
```

**실행 결과:**
```
Name: Bob Age: 30 City: Seoul
1 2 3 4 5
The answer is 42 and the value is 3.14
```

### 1.3 print() 함수의 매개변수

#### sep 매개변수 (구분자)

기본적으로 `print()` 함수는 값들 사이에 공백을 넣습니다. `sep` 매개변수로 이를 변경할 수 있습니다.

```python
print("apple", "banana", "cherry")  # 기본 (공백)
print("apple", "banana", "cherry", sep=", ")  # 콤마와 공백
print("apple", "banana", "cherry", sep="-")   # 하이픈
print("apple", "banana", "cherry", sep="")    # 구분자 없음
print(2023, 12, 25, sep="/")  # 날짜 형식
```

**실행 결과:**
```
apple banana cherry
apple, banana, cherry
apple-banana-cherry
applebananacherry
2023/12/25
```

#### end 매개변수 (끝 문자)

기본적으로 `print()` 함수는 출력 후 줄바꿈을 합니다. `end` 매개변수로 이를 변경할 수 있습니다.

```python
print("Hello", end=" ")
print("World", end="!")
print()  # 줄바꿈

print("Loading", end="")
print(".", end="")
print(".", end="")
print(".", end="")
print(" Done!")
```

**실행 결과:**
```
Hello World!
Loading... Done!
```

### 1.4 특수 문자

문자열에서 특수한 의미를 가지는 문자들을 출력할 수 있습니다.

```python
# 줄바꿈
print("First line\nSecond line\nThird line")

# 탭
print("Name:\tJohn\nAge:\t25\nCity:\tTokyo")

# 따옴표
print("He said, \"Hello, World!\"")
print('She replied, \'Hi there!\'')

# 백슬래시
print("File path: C:\\Users\\Documents")

# 캐리지 리턴 (같은 줄에서 처음으로 돌아감)
print("Hello World", end="")
print("\rHi", end="")
print()
```

**실행 결과:**
```
First line
Second line
Third line
Name:	John
Age:	25
City:	Tokyo
He said, "Hello, World!"
She replied, 'Hi there!'
File path: C:\Users\Documents
Hi
```

## 2. 입력받기 - input() 함수

### 2.1 기본 입력

`input()` 함수를 사용하면 사용자로부터 텍스트를 입력받을 수 있습니다.

```python
# 기본 입력
name = input("What's your name? ")
print("Hello,", name)

# 메시지 없이 입력받기
age = input()
print("You entered:", age)
```

**실행 예시:**
```
What's your name? Alice
Hello, Alice
30
You entered: 30
```

### 2.2 input() 함수의 특징

**중요:** `input()` 함수는 항상 문자열(string)을 반환합니다!

```python
# 사용자가 숫자를 입력해도 문자열로 받아집니다
user_input = input("Enter a number: ")
print("You entered:", user_input)
print("Type of input:", type(user_input))

# 문자열이므로 수학적 계산이 불가능
# number = user_input + 10  # 오류 발생!
```

**실행 예시:**
```
Enter a number: 25
You entered: 25
Type of input: <class 'str'>
```

### 2.3 입력 데이터 타입 변환

사용자로부터 받은 입력을 원하는 데이터 타입으로 변환해야 합니다.

#### 정수로 변환

```python
# 정수 입력받기
age_str = input("Enter your age: ")
age = int(age_str)  # 문자열을 정수로 변환

print("Your age is:", age)
print("Next year you will be:", age + 1)

# 한 줄로 줄여서 쓰기
age = int(input("Enter your age: "))
```

#### 실수로 변환

```python
# 실수 입력받기
height = float(input("Enter your height (cm): "))
print("Your height is:", height, "cm")
print("Your height in meters:", height / 100, "m")
```

#### 불린으로 변환

```python
# 불린 입력 처리 (주의: 직접 bool() 사용은 비추천)
answer = input("Do you like Python? (yes/no): ")
likes_python = answer.lower() == "yes"
print("Likes Python:", likes_python)
```

### 2.4 타입 변환 시 주의사항

잘못된 입력이 들어왔을 때 오류가 발생할 수 있습니다.

```python
# 주의: 숫자가 아닌 문자열을 int()로 변환하려 하면 오류 발생
try:
    number = int(input("Enter a number: "))
    print("Number:", number)
except ValueError:
    print("That's not a valid number!")
```

## 3. 출력 포맷팅

### 3.1 문자열 연결

```python
name = "Charlie"
age = 28

# 문자열 연결
message = "My name is " + name + " and I am " + str(age) + " years old."
print(message)
```

### 3.2 f-string (추천 방법)

Python 3.6 이상에서 사용 가능한 가장 현대적이고 읽기 쉬운 방법입니다.

```python
name = "Diana"
age = 22
height = 165.5

# f-string 사용
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} cm")

# 표현식도 사용 가능
print(f"Next year, {name} will be {age + 1} years old.")
print(f"Height in meters: {height / 100:.2f} m")
```

**실행 결과:**
```
Name: Diana
Age: 22
Height: 165.5 cm
Next year, Diana will be 23 years old.
Height in meters: 1.65 m
```

### 3.3 format() 메서드

```python
name = "Eve"
age = 35
salary = 50000

# format() 메서드 사용
print("Name: {}, Age: {}, Salary: ${:,}".format(name, age, salary))

# 인덱스 지정
print("Age: {1}, Name: {0}".format(name, age))

# 키워드 인수
print("Name: {n}, Age: {a}".format(n=name, a=age))
```

### 3.4 % 포맷팅 (구식 방법)

```python
name = "Frank"
age = 40

# % 포맷팅
print("Name: %s, Age: %d" % (name, age))
```

## 4. 실용적인 예제들

### 4.1 간단한 계산기

```python
print("=== Simple Calculator ===")
num1 = float(input("Enter first number: "))
operator = input("Enter operator (+, -, *, /): ")
num2 = float(input("Enter second number: "))

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Error: Division by zero!"
else:
    result = "Error: Invalid operator!"

print(f"Result: {num1} {operator} {num2} = {result}")
```

### 4.2 사용자 정보 수집

```python
print("=== User Registration ===")

# 사용자 정보 입력받기
first_name = input("First name: ")
last_name = input("Last name: ")
age = int(input("Age: "))
email = input("Email: ")
city = input("City: ")

# 정보 출력
print("\n=== User Information ===")
print(f"Full Name: {first_name} {last_name}")
print(f"Age: {age}")
print(f"Email: {email}")
print(f"City: {city}")

# 추가 계산
birth_year = 2024 - age
print(f"Approximate birth year: {birth_year}")
```

### 4.3 온도 변환기

```python
print("=== Temperature Converter ===")
print("1. Celsius to Fahrenheit")
print("2. Fahrenheit to Celsius")

choice = input("Choose conversion (1 or 2): ")

if choice == "1":
    celsius = float(input("Enter temperature in Celsius: "))
    fahrenheit = (celsius * 9/5) + 32
    print(f"{celsius}°C = {fahrenheit:.1f}°F")
elif choice == "2":
    fahrenheit = float(input("Enter temperature in Fahrenheit: "))
    celsius = (fahrenheit - 32) * 5/9
    print(f"{fahrenheit}°F = {celsius:.1f}°C")
else:
    print("Invalid choice!")
```

### 4.4 쇼핑 목록 만들기

```python
print("=== Shopping List Creator ===")

item1 = input("Enter first item: ")
item2 = input("Enter second item: ")
item3 = input("Enter third item: ")

print("\n=== Your Shopping List ===")
print(f"1. {item1}")
print(f"2. {item2}")
print(f"3. {item3}")

print("\nFormatted for printing:")
print("-" * 25)
print("|     Shopping List     |")
print("-" * 25)
print(f"| 1. {item1:<16} |")
print(f"| 2. {item2:<16} |")
print(f"| 3. {item3:<16} |")
print("-" * 25)
```

## 5. 팁과 주의사항

### 5.1 사용자 친화적인 프로그램 만들기

```python
# 좋은 예: 명확한 안내 메시지
name = input("Please enter your full name: ")
age = int(input("Please enter your age (numbers only): "))

# 입력 확인
print(f"\nYou entered: {name}, age {age}")
confirm = input("Is this correct? (yes/no): ")

if confirm.lower() == "yes":
    print("Information saved!")
else:
    print("Please restart and enter your information again.")
```

### 5.2 입력 검증

```python
# 나이 입력 검증
while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0:
            print("Age cannot be negative!")
        elif age > 150:
            print("Age seems too high!")
        else:
            break
    except ValueError:
        print("Please enter a valid number!")

print(f"Your age is: {age}")
```

### 5.3 여러 줄 입력받기

```python
print("Tell me about yourself (press Enter twice to finish):")
lines = []
while True:
    line = input()
    if line == "":
        break
    lines.append(line)

print("\nWhat you wrote:")
for line in lines:
    print(f"  {line}")
```

## 6. 연습 문제

### 연습 1: 개인 정보 카드
사용자로부터 이름, 나이, 취미를 입력받아 다음과 같은 형식으로 출력하는 프로그램을 작성하세요.

```
==============================
        Personal Card
==============================
Name: John Doe
Age: 25 years old
Hobby: Reading
==============================
```

### 연습 2: BMI 계산기
사용자로부터 키(cm)와 몸무게(kg)를 입력받아 BMI를 계산하고 결과를 출력하는 프로그램을 작성하세요.
- BMI = 몸무게(kg) / (키(m))²
- 결과는 소수점 둘째 자리까지 표시

### 연습 3: 영수증 만들기
사용자로부터 상품명과 가격을 3개 입력받아 다음과 같은 영수증을 출력하는 프로그램을 작성하세요.

```
========== RECEIPT ==========
Item 1: Apple        $2.50
Item 2: Bread        $3.00
Item 3: Milk         $4.50
-----------------------------
Total:              $10.00
=============================
```

## 정리

이 챕터에서 학습한 내용:

1. **print() 함수**: 기본 출력, 여러 값 출력, sep과 end 매개변수
2. **input() 함수**: 사용자 입력받기, 항상 문자열 반환
3. **타입 변환**: int(), float(), str() 함수 사용
4. **출력 포맷팅**: f-string, format() 메서드, % 포맷팅
5. **실용적 예제**: 계산기, 사용자 정보 수집, 온도 변환기 등

다음 챕터에서는 조건문(if문)을 학습하여 프로그램이 상황에 따라 다른 동작을 하도록 만들어보겠습니다.

### 핵심 포인트
- `input()`은 항상 문자열을 반환하므로 필요시 타입 변환이 필수
- f-string을 사용하면 가독성 높은 출력 포맷팅 가능
- 사용자 친화적인 프로그램을 위해 명확한 안내 메시지 제공
- 잘못된 입력에 대한 처리 방법 고려
