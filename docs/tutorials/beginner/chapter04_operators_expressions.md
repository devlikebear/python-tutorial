# Chapter 4: 연산자와 표현식 마스터하기

## 📚 이 챕터에서 배울 내용
- 산술 연산자로 다양한 수치 계산 수행하기
- 비교 연산자로 값들을 비교하고 조건 만들기
- 논리 연산자를 활용한 복합 조건 구성하기
- 할당 연산자로 효율적인 값 할당하기
- 연산자 우선순위와 결합성 이해하기
- 실무에서 자주 사용하는 연산 패턴 익히기

---

## 🧮 산술 연산자: 수학 계산의 기초

### 💡 기본 산술 연산자 완전 정복

```python
# 기본 산술 연산 - 실생활 예제와 함께
price = 15000      # 상품 가격
quantity = 3       # 구매 수량
discount = 2000    # 할인 금액

print("=== 쇼핑몰 계산 예제 ===")
print(f"상품 가격: {price:,}원")
print(f"구매 수량: {quantity}개")
print(f"할인 금액: {discount:,}원")

# 각 연산자별 계산
total_before = price * quantity           # 곱셈: 할인 전 총액
total_after = total_before - discount     # 뺄셈: 할인 후 총액
per_item_after = total_after / quantity   # 나눗셈: 개당 실제 가격

print(f"\n=== 계산 결과 ===")
print(f"할인 전 총액: {price} × {quantity} = {total_before:,}원")
print(f"할인 후 총액: {total_before:,} - {discount:,} = {total_after:,}원")
print(f"개당 실제 가격: {total_after:,} ÷ {quantity} = {per_item_after:,.0f}원")
```

### 🔢 나눗셈 연산자의 비밀

```python
# 나눗셈의 세 가지 형태
dividend = 17      # 피제수
divisor = 5        # 제수

print("=== 나눗셈 연산자 비교 ===")
print(f"일반 나눗셈 ({dividend} / {divisor}): {dividend / divisor}")           # 3.4 (실수)
print(f"정수 나눗셈 ({dividend} // {divisor}): {dividend // divisor}")         # 3 (몫)
print(f"나머지 연산 ({dividend} % {divisor}): {dividend % divisor}")           # 2 (나머지)

# 나눗셈의 검증 공식: 피제수 = 제수 × 몫 + 나머지
quotient = dividend // divisor
remainder = dividend % divisor
verification = divisor * quotient + remainder
print(f"\n검증: {divisor} × {quotient} + {remainder} = {verification}")

# 실생활 응용: 동전 교환
print("\n=== 동전 교환 계산기 ===")
total_money = 1247  # 원
coin_500 = total_money // 500
remaining = total_money % 500
coin_100 = remaining // 100
remaining = remaining % 100
coin_50 = remaining // 50
remaining = remaining % 50
coin_10 = remaining // 10
coin_1 = remaining % 10

print(f"{total_money}원을 동전으로 교환:")
print(f"500원: {coin_500}개")
print(f"100원: {coin_100}개")
print(f"50원: {coin_50}개")
print(f"10원: {coin_10}개")
print(f"1원: {coin_1}개")
```

### ⚡ 거듭제곱과 고급 계산

```python
import math

print("=== 거듭제곱 연산 ===")
base = 2
exponent = 10
result = base ** exponent
print(f"{base}의 {exponent}제곱: {base}^{exponent} = {result:,}")

# 실생활 응용: 복리 계산
print("\n=== 복리 계산기 ===")
principal = 1000000    # 원금 100만원
annual_rate = 0.05     # 연 5%
years = 3              # 3년
compound_freq = 12     # 월복리

# 복리 공식: A = P(1 + r/n)^(nt)
final_amount = principal * (1 + annual_rate/compound_freq) ** (compound_freq * years)
interest_earned = final_amount - principal

print(f"원금: {principal:,}원")
print(f"연이율: {annual_rate*100}%")
print(f"기간: {years}년 (월복리)")
print(f"최종 금액: {final_amount:,.0f}원")
print(f"이자 수익: {interest_earned:,.0f}원")
print(f"수익률: {(interest_earned/principal)*100:.2f}%")

# 제곱근과 n제곱근
print("\n=== 제곱근 계산 ===")
number = 16
sqrt_result = math.sqrt(number)
print(f"√{number} = {sqrt_result}")

# n제곱근: x^(1/n)
cube_root = 27 ** (1/3)  # 세제곱근
print(f"∛27 = {cube_root:.1f}")

# 실생활 응용: 정사각형 한 변의 길이
area = 144  # 넓이 144㎡
side_length = math.sqrt(area)
print(f"넓이 {area}㎡인 정사각형의 한 변: {side_length}m")
```

---

## ⚖️ 비교 연산자: 값들을 비교하기

### 🎯 기본 비교 연산자

```python
# 숫자 비교
student_score = 85
passing_score = 60
perfect_score = 100

print("=== 학생 성적 평가 시스템 ===")
print(f"학생 점수: {student_score}점")
print(f"합격 기준: {passing_score}점")

print(f"\n=== 비교 결과 ===")
print(f"합격 여부 ({student_score} >= {passing_score}): {student_score >= passing_score}")
print(f"만점 여부 ({student_score} == {perfect_score}): {student_score == perfect_score}")
print(f"불합격 여부 ({student_score} < {passing_score}): {student_score < passing_score}")

# 문자열 비교 (사전순)
print("\n=== 문자열 비교 (사전순) ===")
name1 = "Alice"
name2 = "Bob"
name3 = "alice"

print(f"'{name1}' < '{name2}': {name1 < name2}")  # True (A가 B보다 앞)
print(f"'{name1}' == '{name3}': {name1 == name3}")  # False (대소문자 구분)
print(f"대소문자 무시 비교: {name1.lower() == name3.lower()}")  # True

# 실생활 응용: 나이 그룹 분류
age = 25
print(f"\n=== 나이 그룹 분류 (나이: {age}세) ===")
print(f"미성년자 (< 18): {age < 18}")
print(f"청년 (18-30): {18 <= age <= 30}")
print(f"중년 (31-50): {31 <= age <= 50}")
print(f"장년 (> 50): {age > 50}")
```

### 🔗 연쇄 비교: Python의 특별한 기능

```python
# 수학적 표현과 같은 방식
temperature = 25
humidity = 60
score = 85

print("=== 연쇄 비교의 힘 ===")
print(f"적정 온도 (20°C ≤ {temperature}°C ≤ 30°C): {20 <= temperature <= 30}")
print(f"적정 습도 (40% ≤ {humidity}% ≤ 70%): {40 <= humidity <= 70}")
print(f"우수 성적 (80점 ≤ {score}점 ≤ 100점): {80 <= score <= 100}")

# 실용적인 함수 예제
def get_grade(score):
    """점수에 따른 등급 반환"""
    if 90 <= score <= 100:
        return 'A'
    elif 80 <= score < 90:
        return 'B'
    elif 70 <= score < 80:
        return 'C'
    elif 60 <= score < 70:
        return 'D'
    else:
        return 'F'

def check_weather_comfort(temp, humidity):
    """날씨 쾌적도 검사"""
    if 20 <= temp <= 26 and 40 <= humidity <= 60:
        return "매우 쾌적"
    elif 18 <= temp <= 28 and 30 <= humidity <= 70:
        return "쾌적"
    else:
        return "불쾌적"

# 테스트
test_scores = [95, 87, 73, 65, 45]
for score in test_scores:
    grade = get_grade(score)
    print(f"점수 {score}점 → 등급 {grade}")

print(f"\n현재 날씨 쾌적도: {check_weather_comfort(25, 55)}")
```

---

## 🧠 논리 연산자: 조건들을 조합하기

### 💡 기본 논리 연산자

```python
# 회원가입 조건 검사 시스템
age = 20
has_email = True
agreed_terms = True
has_phone = False

print("=== 회원가입 조건 검사 ===")
print(f"나이: {age}세")
print(f"이메일 보유: {has_email}")
print(f"약관 동의: {agreed_terms}")
print(f"전화번호 보유: {has_phone}")

# AND 연산자 (모든 조건이 True여야 함)
basic_requirement = age >= 18 and has_email and agreed_terms
print(f"\n기본 가입 조건 (나이 ≥ 18 AND 이메일 AND 약관동의): {basic_requirement}")

# OR 연산자 (하나 이상의 조건이 True면 됨)
contact_method = has_email or has_phone
print(f"연락 수단 보유 (이메일 OR 전화번호): {contact_method}")

# NOT 연산자 (조건을 반대로)
is_minor = not (age >= 18)
print(f"미성년자 여부 (NOT 성인): {is_minor}")

# 복합 조건
can_register = (age >= 18) and (has_email or has_phone) and agreed_terms
print(f"최종 가입 가능 여부: {can_register}")
```

### 🎯 실생활 논리 연산 예제

```python
# 영화 관람 등급 시스템
def can_watch_movie(age, movie_rating, has_guardian=False):
    """영화 관람 가능 여부 판단"""
    if movie_rating == "전체관람가":
        return True
    elif movie_rating == "12세이상":
        return age >= 12
    elif movie_rating == "15세이상":
        return age >= 15
    elif movie_rating == "청소년관람불가":
        return age >= 18
    elif movie_rating == "제한상영가":
        return age >= 18 and has_guardian
    else:
        return False

# 할인 조건 시스템
def calculate_discount(age, is_student, is_member, purchase_amount):
    """할인율 계산"""
    discount_rate = 0
    
    # 나이 할인
    if age >= 65 or age <= 12:
        discount_rate += 0.1  # 10% 할인
    
    # 학생 할인
    if is_student:
        discount_rate += 0.05  # 5% 할인
    
    # 멤버십 할인
    if is_member:
        discount_rate += 0.03  # 3% 할인
    
    # 대량 구매 할인
    if purchase_amount >= 100000:
        discount_rate += 0.05  # 5% 할인
    
    # 최대 할인율 제한
    discount_rate = min(discount_rate, 0.2)  # 최대 20%
    
    return discount_rate

# 테스트
print("\n=== 영화 관람 등급 테스트 ===")
test_cases = [
    (10, "전체관람가"),
    (14, "12세이상"),
    (16, "15세이상"),
    (17, "청소년관람불가"),
    (20, "제한상영가", True)
]

for case in test_cases:
    if len(case) == 3:
        age, rating, guardian = case
        result = can_watch_movie(age, rating, guardian)
    else:
        age, rating = case
        result = can_watch_movie(age, rating)
    print(f"나이 {age}세, '{rating}' 영화: {'관람 가능' if result else '관람 불가'}")

print("\n=== 할인율 계산 테스트 ===")
customer_info = [
    (70, False, True, 50000),   # 시니어, 멤버
    (20, True, False, 150000),  # 학생, 대량구매
    (25, False, True, 80000),   # 일반 멤버
    (8, False, False, 30000)    # 어린이
]

for age, is_student, is_member, amount in customer_info:
    discount = calculate_discount(age, is_student, is_member, amount)
    final_amount = amount * (1 - discount)
    print(f"나이 {age}세, 학생: {is_student}, 멤버: {is_member}, 구매액: {amount:,}원")
    print(f"→ 할인율: {discount*100:.0f}%, 최종 금액: {final_amount:,.0f}원\n")
```

---

## 🔄 할당 연산자: 효율적인 값 할당

### 💡 기본 할당과 복합 할당

```python
# 게임 점수 시스템
player_score = 0
bonus_points = 50
penalty_points = 20
multiplier = 2

print("=== 게임 점수 관리 시스템 ===")
print(f"초기 점수: {player_score}")

# 기본 할당
player_score = 100
print(f"기본 점수 설정: {player_score}")

# 복합 할당 연산자들
player_score += bonus_points    # player_score = player_score + bonus_points
print(f"보너스 획득 (+{bonus_points}): {player_score}")

player_score -= penalty_points  # player_score = player_score - penalty_points
print(f"페널티 적용 (-{penalty_points}): {player_score}")

player_score *= multiplier      # player_score = player_score * multiplier
print(f"점수 배율 적용 (×{multiplier}): {player_score}")

player_score //= 3              # player_score = player_score // 3
print(f"레벨 조정 (÷3): {player_score}")

player_score %= 100             # player_score = player_score % 100
print(f"점수 정규화 (%100): {player_score}")

player_score **= 2              # player_score = player_score ** 2
print(f"특별 보너스 (제곱): {player_score}")
```

### 🎯 실생활 할당 연산 예제

```python
# 은행 계좌 관리 시스템
class BankAccount:
    def __init__(self, initial_balance=0):
        self.balance = initial_balance
        self.transaction_count = 0
    
    def deposit(self, amount):
        """입금"""
        self.balance += amount
        self.transaction_count += 1
        print(f"입금: +{amount:,}원, 잔액: {self.balance:,}원")
    
    def withdraw(self, amount):
        """출금"""
        if self.balance >= amount:
            self.balance -= amount
            self.transaction_count += 1
            print(f"출금: -{amount:,}원, 잔액: {self.balance:,}원")
        else:
            print(f"잔액 부족! 현재 잔액: {self.balance:,}원")
    
    def apply_interest(self, rate):
        """이자 적용"""
        interest = self.balance * rate
        self.balance += interest
        print(f"이자 적용 ({rate*100}%): +{interest:,.0f}원, 잔액: {self.balance:,.0f}원")
    
    def apply_fee(self, fee_rate):
        """수수료 적용"""
        fee = self.balance * fee_rate
        self.balance -= fee
        print(f"수수료 차감 ({fee_rate*100}%): -{fee:,.0f}원, 잔액: {self.balance:,.0f}원")

# 계좌 운용 시뮬레이션
print("=== 은행 계좌 관리 시뮬레이션 ===")
account = BankAccount(1000000)  # 초기 잔액 100만원
print(f"초기 잔액: {account.balance:,}원")

account.deposit(500000)         # 50만원 입금
account.withdraw(200000)        # 20만원 출금
account.apply_interest(0.02)    # 2% 이자
account.apply_fee(0.001)        # 0.1% 수수료

print(f"\n최종 잔액: {account.balance:,.0f}원")
print(f"총 거래 횟수: {account.transaction_count}회")

# 쇼핑몰 장바구니 시스템
print("\n=== 쇼핑몰 장바구니 시스템 ===")
cart_total = 0
item_count = 0

# 상품 추가
items = [
    ("노트북", 1200000),
    ("마우스", 50000),
    ("키보드", 80000),
    ("모니터", 300000)
]

for item_name, price in items:
    cart_total += price
    item_count += 1
    print(f"{item_name} 추가: {price:,}원 (총액: {cart_total:,}원)")

# 할인 적용
discount_rate = 0.1  # 10% 할인
discount_amount = cart_total * discount_rate
cart_total -= discount_amount
print(f"\n할인 적용 (-{discount_rate*100}%): -{discount_amount:,}원")

# 배송비 추가
shipping_fee = 3000 if cart_total < 50000 else 0
cart_total += shipping_fee
print(f"배송비: +{shipping_fee:,}원")

print(f"\n최종 결제 금액: {cart_total:,}원 ({item_count}개 상품)")
```

---

## ⚡ 연산자 우선순위와 결합성

### 📊 연산자 우선순위 표

Python에서 연산자들은 다음 순서로 우선순위가 정해집니다 (높은 순서부터):

| 우선순위 | 연산자 | 설명 | 결합성 |
|----------|--------|------|--------|
| 1 | `()` | 괄호 | 좌→우 |
| 2 | `**` | 거듭제곱 | 우→좌 |
| 3 | `+x`, `-x`, `~x` | 단항 연산자 | 우→좌 |
| 4 | `*`, `/`, `//`, `%` | 곱셈, 나눗셈 | 좌→우 |
| 5 | `+`, `-` | 덧셈, 뺄셈 | 좌→우 |
| 6 | `<<`, `>>` | 비트 시프트 | 좌→우 |
| 7 | `&` | 비트 AND | 좌→우 |
| 8 | `^` | 비트 XOR | 좌→우 |
| 9 | `|` | 비트 OR | 좌→우 |
| 10 | `==`, `!=`, `<`, `<=`, `>`, `>=`, `is`, `in` | 비교 연산자 | 좌→우 |
| 11 | `not` | 논리 NOT | 우→좌 |
| 12 | `and` | 논리 AND | 좌→우 |
| 13 | `or` | 논리 OR | 좌→우 |

### 🎯 우선순위 실습 예제

```python
print("=== 연산자 우선순위 테스트 ===")

# 산술 연산자 우선순위
result1 = 2 + 3 * 4        # 곱셈이 먼저: 2 + 12 = 14
result2 = (2 + 3) * 4      # 괄호가 먼저: 5 * 4 = 20
print(f"2 + 3 * 4 = {result1}")
print(f"(2 + 3) * 4 = {result2}")

# 거듭제곱의 우선순위 (우결합성)
result3 = 2 ** 3 ** 2      # 오른쪽부터: 2 ** (3 ** 2) = 2 ** 9 = 512
result4 = (2 ** 3) ** 2    # 왼쪽부터: (2 ** 3) ** 2 = 8 ** 2 = 64
print(f"2 ** 3 ** 2 = {result3}")
print(f"(2 ** 3) ** 2 = {result4}")

# 비교와 논리 연산자
age = 25
income = 3000000
has_job = True

# 복잡한 조건식
condition1 = age >= 18 and income > 2000000 or has_job
condition2 = age >= 18 and (income > 2000000 or has_job)
print(f"\nage >= 18 and income > 2000000 or has_job = {condition1}")
print(f"age >= 18 and (income > 2000000 or has_job) = {condition2}")

# 실무에서 자주 실수하는 경우
x = 5
y = 10
z = 15

# 잘못된 조건 (의도와 다를 수 있음)
wrong_condition = x < y and y < z or z < x
print(f"\nx < y and y < z or z < x = {wrong_condition}")

# 명확한 조건 (괄호 사용)
clear_condition = (x < y and y < z) or (z < x)
print(f"(x < y and y < z) or (z < x) = {clear_condition}")
```

### 🛡️ 안전한 코딩을 위한 팁

```python
# 복잡한 수식에서는 괄호를 적극 활용하세요
def calculate_loan_payment(principal, annual_rate, years):
    """대출 월 상환금 계산 (복리)"""
    monthly_rate = annual_rate / 12
    num_payments = years * 12
    
    # 복잡한 수식 - 괄호로 명확하게 구분
    monthly_payment = principal * (
        (monthly_rate * (1 + monthly_rate) ** num_payments) /
        ((1 + monthly_rate) ** num_payments - 1)
    )
    
    return monthly_payment

# 조건문에서도 괄호로 의도를 명확히
def check_eligibility(age, income, credit_score, employment_years):
    """대출 자격 검사"""
    
    # 기본 조건들을 명확히 구분
    age_requirement = (18 <= age <= 65)
    income_requirement = (income >= 2000000)
    credit_requirement = (credit_score >= 600)
    employment_requirement = (employment_years >= 1)
    
    # 최종 조건 조합
    is_eligible = (
        age_requirement and 
        income_requirement and 
        (credit_requirement or employment_requirement >= 3)
    )
    
    return is_eligible, {
        'age_ok': age_requirement,
        'income_ok': income_requirement,
        'credit_ok': credit_requirement,
        'employment_ok': employment_requirement
    }

# 테스트
loan_amount = 50000000  # 5천만원
annual_rate = 0.035     # 연 3.5%
loan_years = 20         # 20년

monthly_payment = calculate_loan_payment(loan_amount, annual_rate, loan_years)
print(f"\n=== 대출 계산 결과 ===")
print(f"대출 원금: {loan_amount:,}원")
print(f"연이율: {annual_rate*100}%")
print(f"대출 기간: {loan_years}년")
print(f"월 상환금: {monthly_payment:,.0f}원")

# 자격 검사
eligible, details = check_eligibility(30, 4000000, 650, 2)
print(f"\n=== 대출 자격 검사 ===")
print(f"자격 여부: {'통과' if eligible else '불통과'}")
for key, value in details.items():
    print(f"{key}: {'✓' if value else '✗'}")
```

---

## 🎯 실습: 종합 계산기 프로그램

### 📝 실습 과제
다양한 연산자를 활용한 종합 계산기를 만들어보세요.

```python
# Comprehensive Calculator Program
import math

def display_menu():
    """계산기 메뉴 출력"""
    print("\n" + "=" * 40)
    print("        🧮 종합 계산기")
    print("=" * 40)
    print("1. 기본 계산 (사칙연산)")
    print("2. 고급 계산 (거듭제곱, 제곱근)")
    print("3. 비교 연산")
    print("4. 논리 연산")
    print("5. 실생활 계산기")
    print("6. 종료")
    print("=" * 40)

def basic_calculator():
    """기본 사칙연산 계산기"""
    print("\n=== 기본 계산기 ===")
    try:
        num1 = float(input("첫 번째 숫자: "))
        operator = input("연산자 (+, -, *, /, //, %, **): ")
        num2 = float(input("두 번째 숫자: "))
        
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
                print("❌ 0으로 나눌 수 없습니다!")
                return
        elif operator == '//':
            if num2 != 0:
                result = num1 // num2
            else:
                print("❌ 0으로 나눌 수 없습니다!")
                return
        elif operator == '%':
            if num2 != 0:
                result = num1 % num2
            else:
                print("❌ 0으로 나눌 수 없습니다!")
                return
        elif operator == '**':
            result = num1 ** num2
        else:
            print("❌ 지원하지 않는 연산자입니다!")
            return
        
        print(f"결과: {num1} {operator} {num2} = {result}")
        
    except ValueError:
        print("❌ 올바른 숫자를 입력해주세요!")

def advanced_calculator():
    """고급 계산기"""
    print("\n=== 고급 계산기 ===")
    print("1. 제곱근")
    print("2. 거듭제곱")
    print("3. 로그")
    print("4. 삼각함수")
    
    choice = input("선택: ")
    
    try:
        if choice == '1':
            num = float(input("숫자 입력: "))
            if num >= 0:
                result = math.sqrt(num)
                print(f"√{num} = {result}")
            else:
                print("❌ 음수의 제곱근은 계산할 수 없습니다!")
        
        elif choice == '2':
            base = float(input("밑: "))
            exponent = float(input("지수: "))
            result = base ** exponent
            print(f"{base}^{exponent} = {result}")
        
        elif choice == '3':
            num = float(input("숫자 입력: "))
            if num > 0:
                result = math.log10(num)
                print(f"log₁₀({num}) = {result}")
            else:
                print("❌ 양수만 입력 가능합니다!")
        
        elif choice == '4':
            angle = float(input("각도 입력 (도): "))
            radian = math.radians(angle)
            sin_val = math.sin(radian)
            cos_val = math.cos(radian)
            tan_val = math.tan(radian)
            print(f"sin({angle}°) = {sin_val:.4f}")
            print(f"cos({angle}°) = {cos_val:.4f}")
            print(f"tan({angle}°) = {tan_val:.4f}")
        
        else:
            print("❌ 잘못된 선택입니다!")
            
    except ValueError:
        print("❌ 올바른 숫자를 입력해주세요!")

def comparison_calculator():
    """비교 연산 계산기"""
    print("\n=== 비교 연산 계산기 ===")
    try:
        num1 = float(input("첫 번째 숫자: "))
        num2 = float(input("두 번째 숫자: "))
        
        print(f"\n=== 비교 결과 ===")
        print(f"{num1} == {num2}: {num1 == num2}")
        print(f"{num1} != {num2}: {num1 != num2}")
        print(f"{num1} > {num2}: {num1 > num2}")
        print(f"{num1} >= {num2}: {num1 >= num2}")
        print(f"{num1} < {num2}: {num1 < num2}")
        print(f"{num1} <= {num2}: {num1 <= num2}")
        
    except ValueError:
        print("❌ 올바른 숫자를 입력해주세요!")

def logical_calculator():
    """논리 연산 계산기"""
    print("\n=== 논리 연산 계산기 ===")
    print("True는 1, False는 0으로 입력하세요")
    
    try:
        val1 = bool(int(input("첫 번째 값 (0 또는 1): ")))
        val2 = bool(int(input("두 번째 값 (0 또는 1): ")))
        
        print(f"\n=== 논리 연산 결과 ===")
        print(f"{val1} and {val2}: {val1 and val2}")
        print(f"{val1} or {val2}: {val1 or val2}")
        print(f"not {val1}: {not val1}")
        print(f"not {val2}: {not val2}")
        
    except ValueError:
        print("❌ 0 또는 1만 입력해주세요!")

def practical_calculator():
    """실생활 계산기"""
    print("\n=== 실생활 계산기 ===")
    print("1. BMI 계산")
    print("2. 복리 계산")
    print("3. 할인가 계산")
    print("4. 팁 계산")
    
    choice = input("선택: ")
    
    try:
        if choice == '1':
            height = float(input("키 (cm): ")) / 100  # m로 변환
            weight = float(input("몸무게 (kg): "))
            bmi = weight / (height ** 2)
            
            if bmi < 18.5:
                category = "저체중"
            elif 18.5 <= bmi < 25:
                category = "정상"
            elif 25 <= bmi < 30:
                category = "과체중"
            else:
                category = "비만"
            
            print(f"BMI: {bmi:.1f} ({category})")
        
        elif choice == '2':
            principal = float(input("원금 (원): "))
            rate = float(input("연이율 (%): ")) / 100
            years = int(input("기간 (년): "))
            
            final_amount = principal * (1 + rate) ** years
            interest = final_amount - principal
            
            print(f"최종 금액: {final_amount:,.0f}원")
            print(f"이자 수익: {interest:,.0f}원")
        
        elif choice == '3':
            original_price = float(input("원가 (원): "))
            discount_rate = float(input("할인율 (%): ")) / 100
            
            discount_amount = original_price * discount_rate
            final_price = original_price - discount_amount
            
            print(f"할인 금액: {discount_amount:,.0f}원")
            print(f"최종 가격: {final_price:,.0f}원")
        
        elif choice == '4':
            bill_amount = float(input("계산서 금액 (원): "))
            tip_rate = float(input("팁 비율 (%): ")) / 100
            people_count = int(input("인원 수: "))
            
            tip_amount = bill_amount * tip_rate
            total_amount = bill_amount + tip_amount
            per_person = total_amount / people_count
            
            print(f"팁 금액: {tip_amount:,.0f}원")
            print(f"총 금액: {total_amount:,.0f}원")
            print(f"1인당 금액: {per_person:,.0f}원")
        
        else:
            print("❌ 잘못된 선택입니다!")
            
    except ValueError:
        print("❌ 올바른 값을 입력해주세요!")

def main():
    """메인 프로그램"""
    while True:
        display_menu()
        choice = input("메뉴 선택: ")
        
        if choice == '1':
            basic_calculator()
        elif choice == '2':
            advanced_calculator()
        elif choice == '3':
            comparison_calculator()
        elif choice == '4':
            logical_calculator()
        elif choice == '5':
            practical_calculator()
        elif choice == '6':
            print("계산기를 종료합니다. 👋")
            break
        else:
            print("❌ 잘못된 선택입니다!")

# 프로그램 실행
if __name__ == "__main__":
    main()
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 성적 관리 시스템
```python
def grade_management_system():
    """학생 성적 관리 시스템"""
    print("=== 성적 관리 시스템 ===")
    
    # 학생 정보 입력
    student_name = input("학생 이름: ")
    korean = float(input("국어 점수: "))
    english = float(input("영어 점수: "))
    math = float(input("수학 점수: "))
    
    # 계산
    total = korean + english + math
    average = total / 3
    
    # 등급 계산
    if average >= 90:
        grade = 'A'
    elif average >= 80:
        grade = 'B'
    elif average >= 70:
        grade = 'C'
    elif average >= 60:
        grade = 'D'
    else:
        grade = 'F'
    
    # 합격 여부
    is_passed = average >= 60 and korean >= 40 and english >= 40 and math >= 40
    
    # 결과 출력
    print(f"\n=== {student_name} 학생 성적표 ===")
    print(f"국어: {korean}점")
    print(f"영어: {english}점")
    print(f"수학: {math}점")
    print(f"총점: {total}점")
    print(f"평균: {average:.1f}점")
    print(f"등급: {grade}")
    print(f"합격 여부: {'합격' if is_passed else '불합격'}")

# grade_management_system()  # 주석 해제하여 실행
```

### 🚀 심화 과제: 투자 수익률 계산기
```python
def investment_calculator():
    """투자 수익률 계산기"""
    print("=== 투자 수익률 계산기 ===")
    
    # 투자 정보 입력
    initial_investment = float(input("초기 투자금 (원): "))
    monthly_investment = float(input("월 적립금 (원): "))
    annual_return = float(input("예상 연수익률 (%): ")) / 100
    investment_years = int(input("투자 기간 (년): "))
    
    # 월 수익률 계산
    monthly_return = annual_return / 12
    total_months = investment_years * 12
    
    # 복리 계산 (초기 투자금)
    initial_final = initial_investment * (1 + annual_return) ** investment_years
    
    # 적립식 투자 계산
    if monthly_return > 0:
        monthly_final = monthly_investment * (
            ((1 + monthly_return) ** total_months - 1) / monthly_return
        )
    else:
        monthly_final = monthly_investment * total_months
    
    # 총 결과
    total_invested = initial_investment + (monthly_investment * total_months)
    total_final = initial_final + monthly_final
    total_profit = total_final - total_invested
    profit_rate = (total_profit / total_invested) * 100
    
    # 결과 출력
    print(f"\n=== 투자 결과 예측 ===")
    print(f"총 투자금: {total_invested:,.0f}원")
    print(f"예상 최종 금액: {total_final:,.0f}원")
    print(f"예상 수익: {total_profit:,.0f}원")
    print(f"수익률: {profit_rate:.1f}%")

# investment_calculator()  # 주석 해제하여 실행
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- 산술 연산자로 다양한 수치 계산 수행
- 비교 연산자로 값들을 비교하고 조건 생성
- 논리 연산자를 활용한 복합 조건 구성
- 할당 연산자로 효율적인 값 할당
- 연산자 우선순위와 결합성 이해

✅ **핵심 개념**
- **산술 연산자**: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- **비교 연산자**: `==`, `!=`, `<`, `<=`, `>`, `>=`
- **논리 연산자**: `and`, `or`, `not`
- **할당 연산자**: `=`, `+=`, `-=`, `*=`, `/=`
- **연산자 우선순위**: 괄호 > 거듭제곱 > 곱셈/나눗셈 > 덧셈/뺄셈

✅ **실무 팁**
- 복잡한 수식에서는 괄호를 적극 활용하기
- 나눗셈 시 0으로 나누는 경우 예외 처리하기
- 논리 연산에서 단락 평가(Short-circuit) 활용하기
- 복합 할당 연산자로 코드 간소화하기

🎯 **다음 챕터 예고**
다음 챕터에서는 입력과 출력을 더 깊이 다뤄보겠습니다. 사용자와의 상호작용을 통해 더 동적이고 실용적인 프로그램을 만들어보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: `/`와 `//`의 차이점은 무엇인가요?**
A: `/`는 실수 나눗셈(결과가 float), `//`는 정수 나눗셈(몫만 반환)입니다. 예: `7/2 = 3.5`, `7//2 = 3`

**Q: `and`와 `or` 연산에서 단락 평가란 무엇인가요?**
A: 첫 번째 조건만으로 결과가 확정되면 두 번째 조건을 평가하지 않는 것입니다. `False and ...`는 뒤를 보지 않고 False를 반환합니다.

**Q: 연산자 우선순위를 외워야 하나요?**
A: 기본적인 것들(사칙연산 등)은 알아두되, 복잡한 경우에는 괄호를 사용하는 것이 좋습니다.

**Q: `**` 연산자가 우결합성이라는 것은 무엇인가요?**
A: `2**3**2`는 `2**(3**2)`로 계산됩니다. 즉, 오른쪽부터 계산합니다.

**Q: 실수 연산에서 정확하지 않은 결과가 나오는 이유는?**
A: 컴퓨터의 부동소수점 표현 방식 때문입니다. 정확한 계산이 필요하면 `decimal` 모듈을 사용하세요.