# Chapter 6: 조건문 (Conditional Statements)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- if, elif, else를 사용하여 조건부 실행 구현하기
- 다양한 조건 표현식 작성하기
- 중첩 조건문을 활용하여 복잡한 로직 구현하기
- 논리 연산자를 조건문과 함께 사용하기
- 실용적인 조건문 기반 프로그램 작성하기

## 1. 조건문의 기본 개념

### 1.1 조건문이란?

조건문은 특정 조건이 참(True) 또는 거짓(False)인지에 따라 프로그램의 실행 흐름을 제어하는 구문입니다. 프로그램이 상황에 따라 다른 동작을 할 수 있게 해주는 핵심 요소입니다.

```python
# 간단한 예시
age = 18

if age >= 18:
    print("성인입니다.")
else:
    print("미성년자입니다.")
```

### 1.2 조건문의 구조

Python의 조건문은 다음과 같은 구조를 가집니다:

```python
if 조건식:
    # 조건이 참일 때 실행할 코드
    실행문1
    실행문2
elif 다른_조건식:  # 선택사항
    # 다른 조건이 참일 때 실행할 코드
    실행문3
else:  # 선택사항
    # 모든 조건이 거짓일 때 실행할 코드
    실행문4
```

**중요한 문법 요소:**
- `if`, `elif`, `else` 뒤에는 반드시 콜론(`:`)이 와야 합니다
- 조건문 안의 코드는 들여쓰기(indentation)로 구분합니다 (보통 4칸 공백)
- 들여쓰기가 같은 코드들은 같은 블록으로 취급됩니다

## 2. 기본 if문

### 2.1 단순 if문

```python
# 기본 if문
score = 85

if score >= 80:
    print("합격입니다!")
    print("축하합니다.")

print("점수 확인이 완료되었습니다.")
```

**실행 결과:**
```
합격입니다!
축하합니다.
점수 확인이 완료되었습니다.
```

### 2.2 if-else문

```python
# if-else 구조
temperature = 25

if temperature > 30:
    print("더운 날씨입니다. 에어컨을 켜세요.")
else:
    print("적당한 날씨입니다.")

print(f"현재 온도: {temperature}도")
```

**실행 결과:**
```
적당한 날씨입니다.
현재 온도: 25도
```

### 2.3 다양한 조건 표현식

```python
# 숫자 비교
num = 10
if num > 0:
    print("양수입니다.")

# 문자열 비교
name = "Alice"
if name == "Alice":
    print("안녕하세요, Alice님!")

# 문자열 포함 확인
text = "Python Programming"
if "Python" in text:
    print("Python에 관한 내용입니다.")

# 리스트 길이 확인
items = [1, 2, 3, 4, 5]
if len(items) > 3:
    print("아이템이 많습니다.")

# 불린 값 확인
is_student = True
if is_student:
    print("학생입니다.")
```

## 3. elif문 (다중 조건)

### 3.1 기본 elif 사용법

`elif`는 "else if"의 줄임말로, 여러 조건을 순차적으로 확인할 때 사용합니다.

```python
score = 78

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"점수: {score}, 등급: {grade}")
```

**실행 결과:**
```
점수: 78, 등급: C
```

### 3.2 실용적인 elif 예제

```python
# 계절 판별기
month = 7

if month in [12, 1, 2]:
    season = "겨울"
elif month in [3, 4, 5]:
    season = "봄"
elif month in [6, 7, 8]:
    season = "여름"
elif month in [9, 10, 11]:
    season = "가을"
else:
    season = "잘못된 월"

print(f"{month}월은 {season}입니다.")
```

**실행 결과:**
```
7월은 여름입니다.
```

### 3.3 사용자 입력과 조건문

```python
# 간단한 메뉴 시스템
print("=== 음료 주문 시스템 ===")
print("1. 커피 - 3000원")
print("2. 차 - 2500원")
print("3. 주스 - 4000원")

choice = input("메뉴를 선택하세요 (1-3): ")

if choice == "1":
    print("커피를 주문하셨습니다. 3000원입니다.")
elif choice == "2":
    print("차를 주문하셨습니다. 2500원입니다.")
elif choice == "3":
    print("주스를 주문하셨습니다. 4000원입니다.")
else:
    print("잘못된 선택입니다.")
```

## 4. 중첩 조건문 (Nested Conditionals)

### 4.1 기본 중첩 구조

조건문 안에 또 다른 조건문을 넣을 수 있습니다.

```python
age = 25
has_license = True

if age >= 18:
    print("성인입니다.")
    if has_license:
        print("운전할 수 있습니다.")
    else:
        print("운전면허를 취득하세요.")
else:
    print("미성년자는 운전할 수 없습니다.")
```

**실행 결과:**
```
성인입니다.
운전할 수 있습니다.
```

### 4.2 복잡한 중첩 예제

```python
# 학생 성적 및 출석 관리 시스템
score = 85
attendance = 90  # 출석률 (%)

print("=== 성적 평가 시스템 ===")

if score >= 60:  # 합격 기준점
    print("기본 합격 조건을 만족합니다.")
    
    if attendance >= 80:
        print("출석률도 양호합니다.")
        
        if score >= 90:
            print("최종 평가: 우수")
        elif score >= 80:
            print("최종 평가: 양호")
        else:
            print("최종 평가: 보통")
    else:
        print("출석률이 부족합니다. (80% 미만)")
        print("최종 평가: 재수강 권장")
else:
    print("기본 합격 조건을 만족하지 않습니다.")
    print("최종 평가: 불합격")
```

### 4.3 중첩 조건문 주의사항

```python
# 좋지 않은 예 - 너무 깊은 중첩
number = 15

if number > 0:
    if number < 100:
        if number % 2 == 0:
            if number % 10 == 0:
                print("10의 배수인 짝수")
            else:
                print("짝수")
        else:
            print("홀수")
    else:
        print("100 이상")
else:
    print("음수 또는 0")

# 더 나은 방법 - 논리 연산자 활용
number = 15

if number <= 0:
    print("음수 또는 0")
elif number >= 100:
    print("100 이상")
elif number % 2 == 0 and number % 10 == 0:
    print("10의 배수인 짝수")
elif number % 2 == 0:
    print("짝수")
else:
    print("홀수")
```

## 5. 논리 연산자와 조건문

### 5.1 and 연산자

모든 조건이 참이어야 전체가 참이 됩니다.

```python
age = 25
income = 30000000  # 연봉 3000만원
credit_score = 750

# 대출 승인 조건
if age >= 20 and income >= 25000000 and credit_score >= 700:
    print("대출이 승인되었습니다.")
else:
    print("대출 조건을 만족하지 않습니다.")

# 각 조건 세부 확인
if age < 20:
    print("- 나이 조건 미달 (20세 이상 필요)")
if income < 25000000:
    print("- 소득 조건 미달 (연 2500만원 이상 필요)")
if credit_score < 700:
    print("- 신용점수 미달 (700점 이상 필요)")
```

### 5.2 or 연산자

조건 중 하나만 참이면 전체가 참이 됩니다.

```python
weather = "rainy"
temperature = 5

# 외출하지 않을 조건
if weather == "rainy" or weather == "snowy" or temperature < 0:
    print("집에 있는 것이 좋겠습니다.")
    if weather == "rainy":
        print("비가 와서")
    elif weather == "snowy":
        print("눈이 와서")
    elif temperature < 0:
        print("너무 추워서")
else:
    print("외출하기 좋은 날씨입니다.")
```

### 5.3 not 연산자

조건의 참/거짓을 반대로 만듭니다.

```python
is_weekend = False
is_holiday = False

if not is_weekend and not is_holiday:
    print("평일입니다. 업무 시간입니다.")
else:
    print("쉬는 날입니다.")

# 더 간단한 표현
if not (is_weekend or is_holiday):
    print("평일입니다. 업무 시간입니다.")
else:
    print("쉬는 날입니다.")
```

### 5.4 복합 논리 조건

```python
# 회원 등급 시스템
purchase_amount = 50000
membership_years = 3
is_premium_member = True

# VIP 회원 조건
if (purchase_amount >= 100000 or membership_years >= 5) and is_premium_member:
    discount_rate = 0.2  # 20% 할인
    print("VIP 회원입니다. 20% 할인이 적용됩니다.")
elif purchase_amount >= 30000 or membership_years >= 2:
    discount_rate = 0.1  # 10% 할인
    print("우수 회원입니다. 10% 할인이 적용됩니다.")
else:
    discount_rate = 0.05  # 5% 할인
    print("일반 회원입니다. 5% 할인이 적용됩니다.")

final_price = purchase_amount * (1 - discount_rate)
print(f"최종 결제 금액: {final_price:,.0f}원")
```

## 6. 조건문의 활용 패턴

### 6.1 범위 확인

```python
# 온도에 따른 옷차림 추천
temperature = 22

if temperature >= 30:
    clothing = "반팔, 반바지"
elif temperature >= 25:
    clothing = "반팔, 긴바지"
elif temperature >= 20:
    clothing = "긴팔, 긴바지"
elif temperature >= 15:
    clothing = "얇은 겉옷"
elif temperature >= 10:
    clothing = "두꺼운 겉옷"
elif temperature >= 0:
    clothing = "코트, 목도리"
else:
    clothing = "패딩, 모자, 장갑"

print(f"온도: {temperature}도")
print(f"추천 옷차림: {clothing}")
```

### 6.2 타입 확인

```python
def analyze_input(value):
    """입력값의 타입을 분석하는 함수"""
    
    if isinstance(value, str):
        if value.isdigit():
            print(f"'{value}'는 숫자로 구성된 문자열입니다.")
        elif value.isalpha():
            print(f"'{value}'는 알파벳으로 구성된 문자열입니다.")
        else:
            print(f"'{value}'는 혼합된 문자열입니다.")
    elif isinstance(value, int):
        if value > 0:
            print(f"{value}는 양의 정수입니다.")
        elif value < 0:
            print(f"{value}는 음의 정수입니다.")
        else:
            print(f"{value}는 0입니다.")
    elif isinstance(value, float):
        print(f"{value}는 실수입니다.")
    elif isinstance(value, bool):
        print(f"{value}는 불린값입니다.")
    else:
        print(f"{value}는 알 수 없는 타입입니다.")

# 테스트
test_values = ["123", "hello", "abc123", 42, -5, 0, 3.14, True]
for val in test_values:
    analyze_input(val)
    print()
```

### 6.3 유효성 검사

```python
def validate_password(password):
    """비밀번호 유효성 검사"""
    
    errors = []
    
    # 길이 확인
    if len(password) < 8:
        errors.append("비밀번호는 최소 8자 이상이어야 합니다.")
    
    # 대문자 포함 확인
    if not any(c.isupper() for c in password):
        errors.append("대문자를 최소 1개 포함해야 합니다.")
    
    # 소문자 포함 확인
    if not any(c.islower() for c in password):
        errors.append("소문자를 최소 1개 포함해야 합니다.")
    
    # 숫자 포함 확인
    if not any(c.isdigit() for c in password):
        errors.append("숫자를 최소 1개 포함해야 합니다.")
    
    # 특수문자 포함 확인
    special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if not any(c in special_chars for c in password):
        errors.append("특수문자를 최소 1개 포함해야 합니다.")
    
    # 결과 반환
    if errors:
        print("비밀번호가 요구사항을 만족하지 않습니다:")
        for error in errors:
            print(f"- {error}")
        return False
    else:
        print("유효한 비밀번호입니다.")
        return True

# 테스트
test_passwords = ["123", "password", "Password123", "Password123!"]
for pwd in test_passwords:
    print(f"비밀번호: '{pwd}'")
    validate_password(pwd)
    print()
```

## 7. 삼항 연산자 (Ternary Operator)

### 7.1 기본 문법

간단한 조건문은 한 줄로 표현할 수 있습니다.

```python
# 일반적인 if-else
age = 20
if age >= 18:
    status = "성인"
else:
    status = "미성년자"

# 삼항 연산자로 동일한 표현
age = 20
status = "성인" if age >= 18 else "미성년자"
print(status)
```

### 7.2 삼항 연산자 활용 예제

```python
# 절댓값 계산
number = -5
abs_value = number if number >= 0 else -number
print(f"{number}의 절댓값: {abs_value}")

# 최댓값/최솟값
a, b = 10, 20
max_value = a if a > b else b
min_value = a if a < b else b
print(f"최댓값: {max_value}, 최솟값: {min_value}")

# 문자열 처리
name = ""
display_name = name if name else "익명"
print(f"사용자: {display_name}")

# 리스트에서 활용
numbers = [1, -2, 3, -4, 5]
positive_numbers = [n if n > 0 else 0 for n in numbers]
print(f"양수만: {positive_numbers}")
```

### 7.3 삼항 연산자 주의사항

```python
# 가독성이 떨어지는 예 (권장하지 않음)
score = 85
result = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"

# 더 명확한 방법
if score >= 90:
    result = "A"
elif score >= 80:
    result = "B"
elif score >= 70:
    result = "C"
else:
    result = "F"
```

## 8. 실용적인 예제들

### 8.1 숫자 맞추기 게임

```python
import random

print("=== 숫자 맞추기 게임 ===")
secret_number = random.randint(1, 100)
max_attempts = 7
attempts = 0

print(f"1부터 100 사이의 숫자를 맞춰보세요! ({max_attempts}번의 기회)")

while attempts < max_attempts:
    try:
        guess = int(input(f"시도 {attempts + 1}: 숫자를 입력하세요: "))
        attempts += 1
        
        if guess == secret_number:
            print(f"정답입니다! {attempts}번 만에 맞췄습니다.")
            break
        elif guess < secret_number:
            print("더 큰 숫자입니다.")
        else:
            print("더 작은 숫자입니다.")
        
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"남은 기회: {remaining}번")
        else:
            print(f"게임 오버! 정답은 {secret_number}였습니다.")
    
    except ValueError:
        print("숫자만 입력해주세요.")
```

### 8.2 간단한 ATM 시스템

```python
# 간단한 ATM 시뮬레이션
balance = 50000  # 초기 잔액
pin = "1234"

print("=== ATM 시스템 ===")
entered_pin = input("PIN을 입력하세요: ")

if entered_pin != pin:
    print("PIN이 틀렸습니다. 접근이 거부되었습니다.")
else:
    print("PIN이 확인되었습니다.")
    
    while True:
        print("\n=== 메뉴 ===")
        print("1. 잔액 조회")
        print("2. 입금")
        print("3. 출금")
        print("4. 종료")
        
        choice = input("선택하세요 (1-4): ")
        
        if choice == "1":
            print(f"현재 잔액: {balance:,}원")
        
        elif choice == "2":
            try:
                amount = int(input("입금할 금액을 입력하세요: "))
                if amount > 0:
                    balance += amount
                    print(f"{amount:,}원이 입금되었습니다.")
                    print(f"현재 잔액: {balance:,}원")
                else:
                    print("양수만 입력해주세요.")
            except ValueError:
                print("올바른 숫자를 입력해주세요.")
        
        elif choice == "3":
            try:
                amount = int(input("출금할 금액을 입력하세요: "))
                if amount <= 0:
                    print("양수만 입력해주세요.")
                elif amount > balance:
                    print("잔액이 부족합니다.")
                    print(f"현재 잔액: {balance:,}원")
                else:
                    balance -= amount
                    print(f"{amount:,}원이 출금되었습니다.")
                    print(f"현재 잔액: {balance:,}원")
            except ValueError:
                print("올바른 숫자를 입력해주세요.")
        
        elif choice == "4":
            print("이용해 주셔서 감사합니다.")
            break
        
        else:
            print("올바른 메뉴를 선택해주세요.")
```

### 8.3 학점 계산기

```python
def calculate_grade(scores):
    """점수 리스트를 받아 학점을 계산하는 함수"""
    
    if not scores:
        return "점수가 없습니다."
    
    # 평균 계산
    average = sum(scores) / len(scores)
    
    # 학점 결정
    if average >= 95:
        grade = "A+"
    elif average >= 90:
        grade = "A"
    elif average >= 85:
        grade = "B+"
    elif average >= 80:
        grade = "B"
    elif average >= 75:
        grade = "C+"
    elif average >= 70:
        grade = "C"
    elif average >= 65:
        grade = "D+"
    elif average >= 60:
        grade = "D"
    else:
        grade = "F"
    
    return average, grade

# 메인 프로그램
print("=== 학점 계산기 ===")
scores = []

while True:
    try:
        score = input("점수를 입력하세요 (완료하려면 'q' 입력): ")
        
        if score.lower() == 'q':
            break
        
        score = float(score)
        
        if 0 <= score <= 100:
            scores.append(score)
            print(f"점수 {score}이(가) 추가되었습니다.")
        else:
            print("점수는 0과 100 사이여야 합니다.")
            
    except ValueError:
        print("올바른 숫자를 입력해주세요.")

if scores:
    average, grade = calculate_grade(scores)
    print(f"\n=== 결과 ===")
    print(f"입력된 점수: {scores}")
    print(f"평균 점수: {average:.2f}")
    print(f"학점: {grade}")
else:
    print("입력된 점수가 없습니다.")
```

## 9. 연습 문제

### 연습 1: 윤년 판별기
사용자로부터 연도를 입력받아 윤년인지 판별하는 프로그램을 작성하세요.
- 윤년 조건: 4의 배수이면서 100의 배수가 아니거나, 400의 배수

### 연습 2: 주차 요금 계산기
주차 시간을 입력받아 요금을 계산하는 프로그램을 작성하세요.
- 기본 요금: 30분까지 1000원
- 추가 요금: 10분당 500원
- 최대 요금: 10000원

### 연습 3: 간단한 쇼핑몰 할인 시스템
구매 금액과 회원 등급을 입력받아 최종 결제 금액을 계산하는 프로그램을 작성하세요.
- 일반 회원: 3만원 이상 5% 할인
- VIP 회원: 2만원 이상 10% 할인, 5만원 이상 15% 할인
- VVIP 회원: 1만원 이상 15% 할인, 5만원 이상 20% 할인

## 정리

이 챕터에서 학습한 내용:

1. **if문 기본 구조**: if, elif, else의 사용법
2. **조건 표현식**: 다양한 비교 및 논리 연산자 활용
3. **중첩 조건문**: 복잡한 로직을 위한 조건문 중첩
4. **논리 연산자**: and, or, not을 활용한 복합 조건
5. **실용적 패턴**: 범위 확인, 타입 확인, 유효성 검사
6. **삼항 연산자**: 간단한 조건부 할당
7. **실제 응용**: 게임, ATM, 학점 계산기 등

다음 챕터에서는 반복문(for, while)을 학습하여 반복적인 작업을 효율적으로 처리하는 방법을 배워보겠습니다.

### 핵심 포인트
- 조건문은 프로그램의 흐름을 제어하는 핵심 요소
- 들여쓰기가 매우 중요하며, 일관성 있게 사용해야 함
- 복잡한 조건은 논리 연산자로 간단히 표현 가능
- 중첩이 너무 깊어지면 코드 가독성이 떨어짐
- 조건의 순서가 결과에 영향을 미칠 수 있음 