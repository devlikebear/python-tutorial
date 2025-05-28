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