# Chapter 4: 연산자와 표현식

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 다양한 산술 연산자를 사용하여 수치 계산을 수행한다
- 비교 연산자로 값들을 비교하고 조건을 만든다
- 논리 연산자를 활용하여 복합 조건을 구성한다
- 할당 연산자를 사용하여 효율적으로 값을 할당한다
- 연산자 우선순위를 이해하고 올바른 표현식을 작성한다
- 비트 연산자의 기본 개념을 이해한다

## 1. 산술 연산자 (Arithmetic Operators)

### 1.1 기본 산술 연산자
Python에서 제공하는 주요 산술 연산자들입니다.

```python
# 기본 산술 연산
a = 10
b = 3

print(f"덧셈: {a} + {b} = {a + b}")        # 13
print(f"뺄셈: {a} - {b} = {a - b}")        # 7
print(f"곱셈: {a} * {b} = {a * b}")        # 30
print(f"나눗셈: {a} / {b} = {a / b}")      # 3.333...
print(f"정수 나눗셈: {a} // {b} = {a // b}")  # 3
print(f"나머지: {a} % {b} = {a % b}")      # 1
print(f"거듭제곱: {a} ** {b} = {a ** b}")  # 1000
```

### 1.2 나눗셈 연산자의 차이점
```python
# 일반 나눗셈 vs 정수 나눗셈
dividend = 17
divisor = 5

regular_division = dividend / divisor       # 3.4 (실수 결과)
floor_division = dividend // divisor        # 3 (정수 결과, 내림)
remainder = dividend % divisor              # 2 (나머지)

print(f"{dividend} ÷ {divisor} = {regular_division}")
print(f"{dividend} // {divisor} = {floor_division}")
print(f"{dividend} % {divisor} = {remainder}")

# 검증: 나누어떨어지는 공식
# dividend = divisor * quotient + remainder
result = divisor * floor_division + remainder
print(f"검증: {divisor} * {floor_division} + {remainder} = {result}")

# 음수에서의 정수 나눗셈
print(f"-17 // 5 = {-17 // 5}")   # -4 (음의 무한대 방향으로 내림)
print(f"-17 % 5 = {-17 % 5}")     # 3
print(f"17 // -5 = {17 // -5}")   # -4
print(f"17 % -5 = {17 % -5}")     # -3
```

### 1.3 거듭제곱과 루트 계산
```python
import math

# 거듭제곱
base = 2
exponent = 10
result = base ** exponent
print(f"{base}^{exponent} = {result}")  # 1024

# 제곱근 (math 모듈 사용)
number = 16
sqrt_result = math.sqrt(number)
print(f"√{number} = {sqrt_result}")   # 4.0

# n제곱근 (거듭제곱의 역연산)
# n제곱근 = x^(1/n)
cube_root = 27 ** (1/3)  # 세제곱근
print(f"∛27 = {cube_root}")  # 3.0

# 복잡한 계산 예제
def quadratic_formula(a, b, c):
    """이차방정식의 해를 구하는 함수"""
    discriminant = b**2 - 4*a*c
    if discriminant < 0:
        return "실근이 없습니다"
    elif discriminant == 0:
        x = -b / (2*a)
        return f"중근: x = {x}"
    else:
        x1 = (-b + math.sqrt(discriminant)) / (2*a)
        x2 = (-b - math.sqrt(discriminant)) / (2*a)
        return f"두 실근: x1 = {x1}, x2 = {x2}"

# 이차방정식 x² - 5x + 6 = 0
print(quadratic_formula(1, -5, 6))  # 두 실근: x1 = 3.0, x2 = 2.0
```

### 1.4 실용적인 산술 연산 예제
```python
# 복리 계산기
def compound_interest(principal, rate, time, compound_freq):
    """복리 이자 계산"""
    amount = principal * (1 + rate/compound_freq) ** (compound_freq * time)
    interest = amount - principal
    return amount, interest

# 연 5% 이자, 3년간, 월복리
principal = 1000000  # 원금 100만원
rate = 0.05         # 연 5%
time = 3            # 3년
compound_freq = 12  # 월복리

final_amount, earned_interest = compound_interest(principal, rate, time, compound_freq)
print(f"원금: {principal:,}원")
print(f"최종 금액: {final_amount:,.0f}원")
print(f"이자 수익: {earned_interest:,.0f}원")

# BMI 계산기
def calculate_bmi(weight, height):
    """BMI(체질량지수) 계산"""
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        category = "저체중"
    elif bmi < 25:
        category = "정상체중"
    elif bmi < 30:
        category = "과체중"
    else:
        category = "비만"
    
    return bmi, category

weight = 70  # kg
height = 1.75  # m
bmi, category = calculate_bmi(weight, height)
print(f"BMI: {bmi:.2f} ({category})")

# 거리와 속도 계산
def time_to_destination(distance, speed):
    """목적지까지의 소요 시간 계산"""
    hours = distance // speed
    minutes = (distance % speed) / speed * 60
    return int(hours), int(minutes)

distance = 157  # km
speed = 80     # km/h
hours, minutes = time_to_destination(distance, speed)
print(f"{distance}km를 {speed}km/h로 이동 시 소요시간: {hours}시간 {minutes}분")
```

## 2. 비교 연산자 (Comparison Operators)

### 2.1 기본 비교 연산자
```python
# 숫자 비교
a = 10
b = 20
c = 10

print(f"{a} == {b}: {a == b}")  # False (같음)
print(f"{a} != {b}: {a != b}")  # True (다름)
print(f"{a} < {b}: {a < b}")    # True (작음)
print(f"{a} <= {c}: {a <= c}")  # True (작거나 같음)
print(f"{b} > {a}: {b > a}")    # True (큼)
print(f"{b} >= {c}: {b >= c}")  # True (크거나 같음)

# 문자열 비교 (사전순)
name1 = "Alice"
name2 = "Bob"
name3 = "alice"

print(f"'{name1}' == '{name2}': {name1 == name2}")  # False
print(f"'{name1}' < '{name2}': {name1 < name2}")    # True (사전순)
print(f"'{name1}' == '{name3}': {name1 == name3}")  # False (대소문자 구분)
print(f"'{name1}'.lower() == '{name3}': {name1.lower() == name3}")  # True
```

### 2.2 연쇄 비교 (Chained Comparisons)
```python
# Python의 특별한 기능: 연쇄 비교
x = 15

# 수학적 표현과 같은 방식
print(f"10 < {x} < 20: {10 < x < 20}")  # True
print(f"0 <= {x} <= 10: {0 <= x <= 10}")  # False

# 여러 조건을 한 번에 검사
score = 85
print(f"0 <= {score} <= 100: {0 <= score <= 100}")  # True (유효한 점수)

# 등급 판정 시스템
def get_grade(score):
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

# 테스트
scores = [95, 87, 76, 63, 45]
for score in scores:
    grade = get_grade(score)
    print(f"점수 {score}: {grade}등급")
```

### 2.3 특수한 비교 상황들
```python
# 부동소수점 비교의 주의사항
result1 = 0.1 + 0.2
result2 = 0.3

print(f"0.1 + 0.2 = {result1}")
print(f"0.3 = {result2}")
print(f"0.1 + 0.2 == 0.3: {result1 == result2}")  # False!

# 해결 방법: 근사 비교
def almost_equal(a, b, tolerance=1e-9):
    return abs(a - b) < tolerance

print(f"근사 비교: {almost_equal(result1, result2)}")  # True

# None과의 비교
value = None
print(f"value is None: {value is None}")      # True (권장)
print(f"value == None: {value == None}")      # True (비권장)

# 리스트 비교
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1

print(f"list1 == list2: {list1 == list2}")    # True (내용 비교)
print(f"list1 is list2: {list1 is list2}")    # False (객체 비교)
print(f"list1 is list3: {list1 is list3}")    # True (같은 객체)
```

### 2.4 비교 연산자 활용 예제
```python
# 나이 검증 시스템
def validate_age(age):
    """나이 유효성 검사"""
    if not isinstance(age, (int, float)):
        return False, "나이는 숫자여야 합니다"
    
    if age < 0:
        return False, "나이는 음수일 수 없습니다"
    elif age > 150:
        return False, "나이가 너무 큽니다"
    else:
        return True, "유효한 나이입니다"

# 테스트
ages = [25, -5, 200, "30", 0, 100]
for age in ages:
    is_valid, message = validate_age(age)
    print(f"나이 {age}: {message}")

# 비밀번호 강도 검사
def check_password_strength(password):
    """비밀번호 강도 검사"""
    score = 0
    feedback = []
    
    # 길이 검사
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("8자 이상이어야 합니다")
    
    # 대문자 포함
    if any(c.isupper() for c in password):
        score += 1
    else:
        feedback.append("대문자를 포함해야 합니다")
    
    # 소문자 포함
    if any(c.islower() for c in password):
        score += 1
    else:
        feedback.append("소문자를 포함해야 합니다")
    
    # 숫자 포함
    if any(c.isdigit() for c in password):
        score += 1
    else:
        feedback.append("숫자를 포함해야 합니다")
    
    # 특수문자 포함
    special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if any(c in special_chars for c in password):
        score += 1
    else:
        feedback.append("특수문자를 포함해야 합니다")
    
    # 강도 판정
    if score == 5:
        strength = "매우 강함"
    elif score >= 4:
        strength = "강함"
    elif score >= 3:
        strength = "보통"
    elif score >= 2:
        strength = "약함"
    else:
        strength = "매우 약함"
    
    return score, strength, feedback

# 테스트
passwords = ["password", "Password123", "MyP@ssw0rd!", "123", "Aa1!"]
for pwd in passwords:
    score, strength, feedback = check_password_strength(pwd)
    print(f"'{pwd}': {strength} ({score}/5)")
    if feedback:
        print(f"  개선사항: {', '.join(feedback)}")
```

## 3. 논리 연산자 (Logical Operators)

### 3.1 기본 논리 연산자
```python
# 논리 연산자: and, or, not
x = True
y = False

print(f"x and y: {x and y}")    # False
print(f"x or y: {x or y}")      # True
print(f"not x: {not x}")        # False
print(f"not y: {not y}")        # True

# 실제 조건에서의 사용
age = 25
has_license = True
has_car = False

# 운전 가능 조건
can_drive = age >= 18 and has_license
print(f"운전 가능: {can_drive}")  # True

# 카풀 가능 조건
can_carpool = can_drive and has_car
print(f"카풀 가능: {can_carpool}")  # False

# 대중교통 이용 조건
use_public_transport = not has_car or not has_license
print(f"대중교통 이용: {use_public_transport}")  # True
```

### 3.2 논리 연산자의 단축 평가 (Short-circuit Evaluation)
```python
# and 연산의 단축 평가
def expensive_function():
    print("복잡한 계산 실행 중...")
    return True

condition1 = False
condition2 = expensive_function()

# False and anything은 항상 False이므로 
# expensive_function()이 실행되지 않음
result = condition1 and expensive_function()  
print(f"결과: {result}")  # "복잡한 계산 실행 중..." 출력 없음

# or 연산의 단축 평가
condition1 = True
# True or anything은 항상 True이므로
# expensive_function()이 실행되지 않음
result = condition1 or expensive_function()
print(f"결과: {result}")  # "복잡한 계산 실행 중..." 출력 없음

# 실용적인 예제: 안전한 나눗셈
def safe_divide(a, b):
    # b가 0이 아닐 때만 나눗셈 실행
    if b != 0 and a / b > 10:
        return "큰 수"
    elif b != 0:
        return a / b
    else:
        return "0으로 나눌 수 없음"

print(safe_divide(20, 2))  # 10.0
print(safe_divide(100, 5))  # 큰 수
print(safe_divide(10, 0))   # 0으로 나눌 수 없음
```

### 3.3 복합 논리 표현식
```python
# 학점 계산 시스템
def calculate_grade(midterm, final, attendance):
    """
    중간고사, 기말고사, 출석률을 기반으로 학점 계산
    조건:
    - A: 두 시험 모두 90점 이상이고 출석률 95% 이상
    - B: 두 시험 평균 80점 이상이고 출석률 90% 이상
    - C: 두 시험 평균 70점 이상이고 출석률 80% 이상
    - D: 두 시험 평균 60점 이상이고 출석률 70% 이상
    - F: 그 외
    """
    average = (midterm + final) / 2
    
    if midterm >= 90 and final >= 90 and attendance >= 95:
        return 'A'
    elif average >= 80 and attendance >= 90:
        return 'B'
    elif average >= 70 and attendance >= 80:
        return 'C'
    elif average >= 60 and attendance >= 70:
        return 'D'
    else:
        return 'F'

# 학생들 성적 처리
students = [
    ("김철수", 95, 92, 98),
    ("이영희", 85, 88, 92),
    ("박민수", 75, 70, 85),
    ("최소영", 65, 68, 75),
    ("정대한", 55, 60, 65)
]

print("학점 결과:")
for name, midterm, final, attendance in students:
    grade = calculate_grade(midterm, final, attendance)
    average = (midterm + final) / 2
    print(f"{name}: 평균 {average:.1f}점, 출석률 {attendance}% → {grade}학점")

# 회원 등급 시스템
def determine_membership_level(purchases, years, amount_spent):
    """
    구매 횟수, 회원 기간, 총 구매 금액에 따른 등급 결정
    """
    # VIP: 3년 이상 & (구매 50회 이상 or 100만원 이상)
    if years >= 3 and (purchases >= 50 or amount_spent >= 1000000):
        return "VIP"
    # Gold: 2년 이상 & (구매 30회 이상 or 50만원 이상)
    elif years >= 2 and (purchases >= 30 or amount_spent >= 500000):
        return "Gold"
    # Silver: 1년 이상 & (구매 10회 이상 or 20만원 이상)
    elif years >= 1 and (purchases >= 10 or amount_spent >= 200000):
        return "Silver"
    else:
        return "Bronze"

# 테스트
members = [
    ("고객A", 60, 4, 1200000),
    ("고객B", 35, 3, 800000),
    ("고객C", 25, 2, 600000),
    ("고객D", 15, 1, 300000),
    ("고객E", 5, 0.5, 100000)
]

print("\n회원 등급:")
for name, purchases, years, amount in members:
    level = determine_membership_level(purchases, years, amount)
    print(f"{name}: 구매 {purchases}회, {years}년, {amount:,}원 → {level}")
```

### 3.4 드모르간 법칙 (De Morgan's Laws)
```python
# 드모르간 법칙: not (A and B) == (not A) or (not B)
#              not (A or B) == (not A) and (not B)

A = True
B = False

# 법칙 1: not (A and B) == (not A) or (not B)
left_side = not (A and B)
right_side = (not A) or (not B)
print(f"not ({A} and {B}) = {left_side}")
print(f"(not {A}) or (not {B}) = {right_side}")
print(f"두 결과가 같은가? {left_side == right_side}")

# 법칙 2: not (A or B) == (not A) and (not B)
left_side = not (A or B)
right_side = (not A) and (not B)
print(f"\nnot ({A} or {B}) = {left_side}")
print(f"(not {A}) and (not {B}) = {right_side}")
print(f"두 결과가 같은가? {left_side == right_side}")

# 실용적인 예: 접근 권한 시스템
def check_access_original(is_admin, is_member, is_banned):
    """원래 조건: 관리자이거나 회원이면서 차단되지 않은 경우"""
    return (is_admin or is_member) and not is_banned

def check_access_demorgan(is_admin, is_member, is_banned):
    """드모르간 법칙 적용: 차단되지 않았고 (관리자이거나 회원)"""
    # not banned and (admin or member)
    return not is_banned and (is_admin or is_member)

# 테스트
test_cases = [
    (True, True, False),   # 관리자, 회원, 차단안됨
    (False, True, False),  # 일반회원, 차단안됨
    (True, False, True),   # 관리자, 차단됨
    (False, False, False)  # 비회원, 차단안됨
]

for is_admin, is_member, is_banned in test_cases:
    result1 = check_access_original(is_admin, is_member, is_banned)
    result2 = check_access_demorgan(is_admin, is_member, is_banned)
    print(f"관리자: {is_admin}, 회원: {is_member}, 차단: {is_banned}")
    print(f"  접근 가능: {result1} (결과 일치: {result1 == result2})")
```

## 4. 할당 연산자 (Assignment Operators)

### 4.1 기본 할당과 복합 할당 연산자
```python
# 기본 할당
x = 10
print(f"x = {x}")

# 복합 할당 연산자들
x += 5   # x = x + 5
print(f"x += 5: {x}")   # 15

x -= 3   # x = x - 3
print(f"x -= 3: {x}")   # 12

x *= 2   # x = x * 2
print(f"x *= 2: {x}")   # 24

x /= 4   # x = x / 4
print(f"x /= 4: {x}")   # 6.0

x //= 2  # x = x // 2
print(f"x //= 2: {x}")  # 3.0

x %= 2   # x = x % 2
print(f"x %= 2: {x}")   # 1.0

x **= 3  # x = x ** 3
print(f"x **= 3: {x}")  # 1.0

# 문자열에서의 복합 할당
message = "Hello"
message += " World"
print(f"문자열 덧셈: {message}")  # Hello World

message *= 2
print(f"문자열 곱셈: {message}")  # Hello WorldHello World
```

### 4.2 리스트와 복합 할당
```python
# 리스트에서의 복합 할당
numbers = [1, 2, 3]
print(f"원본 리스트: {numbers}")

numbers += [4, 5]  # extend와 같은 효과
print(f"numbers += [4, 5]: {numbers}")  # [1, 2, 3, 4, 5]

numbers *= 2  # 리스트 반복
print(f"numbers *= 2: {numbers}")  # [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

# 주의: += 와 append의 차이
list1 = [1, 2, 3]
list2 = [1, 2, 3]

list1 += [4, 5]      # [1, 2, 3, 4, 5]
list2.append([4, 5]) # [1, 2, 3, [4, 5]]

print(f"list1 += [4, 5]: {list1}")
print(f"list2.append([4, 5]): {list2}")

# 실용적인 예제: 점수 누적 계산기
class ScoreTracker:
    def __init__(self):
        self.total_score = 0
        self.game_count = 0
        self.scores = []
    
    def add_score(self, score):
        self.total_score += score
        self.game_count += 1
        self.scores += [score]  # 또는 self.scores.append(score)
    
    def get_average(self):
        if self.game_count == 0:
            return 0
        return self.total_score / self.game_count
    
    def apply_bonus(self, multiplier):
        self.total_score *= multiplier
        # 각 점수에도 보너스 적용
        self.scores = [score * multiplier for score in self.scores]

# 사용 예제
tracker = ScoreTracker()
game_scores = [85, 92, 78, 96, 88]

for i, score in enumerate(game_scores, 1):
    tracker.add_score(score)
    print(f"게임 {i}: {score}점, 누적 평균: {tracker.get_average():.1f}점")

print(f"\n보너스 적용 전 총점: {tracker.total_score}")
tracker.apply_bonus(1.1)  # 10% 보너스
print(f"보너스 적용 후 총점: {tracker.total_score:.1f}")
```

### 4.3 월리스 연산자 (Walrus Operator) - Python 3.8+
```python
# := 연산자를 사용한 할당과 동시에 조건 검사
# Python 3.8 이상에서 사용 가능

# 기존 방식
def process_data_old():
    data = input("데이터를 입력하세요 (종료하려면 'quit'): ")
    while data != 'quit':
        print(f"처리 중: {data}")
        data = input("데이터를 입력하세요 (종료하려면 'quit'): ")

# 월리스 연산자 사용
def process_data_new():
    while (data := input("데이터를 입력하세요 (종료하려면 'quit'): ")) != 'quit':
        print(f"처리 중: {data}")

# 조건문에서 활용
numbers = [1, 4, 9, 16, 25, 36]

# 기존 방식
print("제곱근이 정수인 수들:")
import math
for num in numbers:
    sqrt_val = math.sqrt(num)
    if sqrt_val == int(sqrt_val):
        print(f"{num}의 제곱근: {int(sqrt_val)}")

# 월리스 연산자 사용
print("\n월리스 연산자 사용:")
for num in numbers:
    if (sqrt_val := math.sqrt(num)) == int(sqrt_val):
        print(f"{num}의 제곱근: {int(sqrt_val)}")

# 리스트 컴프리헨션에서 활용
# 홀수의 제곱만 필터링
original_numbers = range(1, 11)
odd_squares = [square for n in original_numbers 
               if (square := n**2) % 2 == 1]
print(f"홀수 제곱들: {odd_squares}")
```

### 4.4 할당 연산자 활용 패턴
```python
# 카운터 패턴
def count_characters(text):
    """문자별 개수 세기"""
    char_count = {}
    for char in text.lower():
        if char.isalpha():
            # 딕셔너리의 get 메서드와 복합 할당
            char_count[char] = char_count.get(char, 0)
            char_count[char] += 1
    return char_count

text = "Hello World Programming"
result = count_characters(text)
print("문자 개수:")
for char, count in sorted(result.items()):
    print(f"'{char}': {count}")

# 누적 계산 패턴
def calculate_factorial(n):
    """팩토리얼 계산 (반복문 사용)"""
    if n < 0:
        return None
    
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# 테스트
for i in range(6):
    factorial = calculate_factorial(i)
    print(f"{i}! = {factorial}")

# 진행률 표시 패턴
def process_with_progress(items):
    """진행률을 표시하며 작업 처리"""
    total = len(items)
    processed = 0
    
    for item in items:
        # 작업 시뮬레이션
        import time
        time.sleep(0.1)
        
        processed += 1
        progress = (processed / total) * 100
        
        # 진행률 표시 (간단한 진행 바)
        bar_length = 20
        filled = int(bar_length * processed / total)
        bar = '█' * filled + '░' * (bar_length - filled)
        
        print(f"\r[{bar}] {progress:.1f}% ({processed}/{total})", end='')
    
    print()  # 줄바꿈

# 테스트 (실제 실행시 주석 해제)
# items = ['작업1', '작업2', '작업3', '작업4', '작업5']
# process_with_progress(items)

# 조건부 할당 패턴
def get_user_config(user_preferences, defaults):
    """사용자 설정과 기본값을 합친 설정 생성"""
    config = defaults.copy()
    
    # 사용자가 설정한 값이 있으면 덮어쓰기
    for key, value in user_preferences.items():
        if value is not None:  # None이 아닌 값만 적용
            config[key] = value
    
    return config

# 기본 설정
default_settings = {
    'theme': 'light',
    'font_size': 12,
    'auto_save': True,
    'language': 'ko'
}

# 사용자 설정
user_settings = {
    'theme': 'dark',
    'font_size': None,  # 기본값 사용
    'notification': True  # 새로운 설정
}

final_config = get_user_config(user_settings, default_settings)
print("최종 설정:")
for key, value in final_config.items():
    print(f"  {key}: {value}")
```

## 5. 연산자 우선순위와 결합성

### 5.1 연산자 우선순위 표
```python
# 연산자 우선순위 (높은 순서대로)
# 1. () - 괄호
# 2. ** - 거듭제곱 (우결합성)
# 3. +x, -x, ~x - 단항 연산자
# 4. *, /, //, % - 곱셈, 나눗셈 계열
# 5. +, - - 덧셈, 뺄셈
# 6. ==, !=, <, <=, >, >=, is, is not, in, not in - 비교 연산자
# 7. not - 논리 NOT
# 8. and - 논리 AND  
# 9. or - 논리 OR

# 예제로 우선순위 확인
result1 = 2 + 3 * 4      # 14 (곱셈이 덧셈보다 우선)
result2 = (2 + 3) * 4    # 20 (괄호가 최우선)
result3 = 2 ** 3 ** 2    # 512 (거듭제곱은 우결합: 2^(3^2))
result4 = (2 ** 3) ** 2  # 64

print(f"2 + 3 * 4 = {result1}")
print(f"(2 + 3) * 4 = {result2}")
print(f"2 ** 3 ** 2 = {result3}")
print(f"(2 ** 3) ** 2 = {result4}")

# 복잡한 표현식
x = 10
y = 5
z = 2

complex_result = x + y * z ** 2 - 3
# 계산 순서: z ** 2 (4) → y * 4 (20) → x + 20 (30) → 30 - 3 (27)
print(f"x + y * z ** 2 - 3 = {complex_result}")

# 논리 연산자 우선순위
a = True
b = False
c = True

result = a or b and c  # and가 or보다 우선: a or (b and c)
print(f"True or False and True = {result}")  # True

result = (a or b) and c  # 괄호로 순서 변경
print(f"(True or False) and True = {result}")  # True
```

### 5.2 헷갈리기 쉬운 우선순위 예제
```python
# 비교 연산자와 논리 연산자
age = 25
has_license = True

# 잘못된 해석을 방지하기 위한 괄호 사용
can_drive = (age >= 18) and has_license  # 명확함
can_drive_unclear = age >= 18 and has_license  # 의미는 같지만 덜 명확

print(f"운전 가능 (명확): {can_drive}")
print(f"운전 가능 (모호): {can_drive_unclear}")

# 문자열 연산과 비교
text = "Hello"
result1 = text + " World" == "Hello World"  # True (+ 후 ==)
result2 = (text + " World") == "Hello World"  # 명확한 표현

print(f"문자열 비교 결과: {result1}")

# 복잡한 조건식 - 가독성을 위한 괄호 사용
score = 85
attendance = 90
homework = 80

# 복잡한 조건
passing_grade = score >= 70 and attendance >= 80 and homework >= 75
# 더 명확한 표현
passing_grade_clear = (score >= 70) and (attendance >= 80) and (homework >= 75)

print(f"합격 여부: {passing_grade}")

# 실용적인 예: 할인 조건 계산
def calculate_discount(price, is_member, quantity, is_weekend):
    """
    할인율 계산
    - 회원: 10% 할인
    - 대량 구매 (10개 이상): 5% 추가 할인  
    - 주말: 3% 추가 할인
    """
    discount = 0
    
    # 기본 회원 할인
    if is_member:
        discount += 0.10
    
    # 대량 구매 할인
    if quantity >= 10:
        discount += 0.05
    
    # 주말 할인
    if is_weekend:
        discount += 0.03
    
    # 최대 할인율 제한 (20%)
    discount = min(discount, 0.20)
    
    final_price = price * (1 - discount)
    return final_price, discount * 100

# 테스트
test_cases = [
    (100, True, 15, True),   # 회원, 대량, 주말
    (100, False, 5, False),  # 비회원, 소량, 평일
    (100, True, 8, False),   # 회원, 소량, 평일
    (100, False, 12, True)   # 비회원, 대량, 주말
]

for price, is_member, quantity, is_weekend in test_cases:
    final_price, discount = calculate_discount(price, is_member, quantity, is_weekend)
    print(f"가격: {price}원, 회원: {is_member}, 수량: {quantity}, 주말: {is_weekend}")
    print(f"  → 할인율: {discount}%, 최종가격: {final_price:.0f}원\n")
```

### 5.3 연산자 결합성 (Associativity)
```python
# 좌결합성 (Left-to-right)
result = 100 - 50 - 20  # (100 - 50) - 20 = 30
print(f"100 - 50 - 20 = {result}")

result = 100 / 5 / 2    # (100 / 5) / 2 = 10.0
print(f"100 / 5 / 2 = {result}")

# 우결합성 (Right-to-left) - 거듭제곱만 해당
result = 2 ** 3 ** 2    # 2 ** (3 ** 2) = 2 ** 9 = 512
print(f"2 ** 3 ** 2 = {result}")

# 할당 연산자도 우결합성
x = y = z = 10  # z = 10, y = z, x = y 순서로 실행
print(f"x = y = z = 10: x={x}, y={y}, z={z}")

# 연쇄 할당에서 주의할 점
a = b = [1, 2, 3]  # 같은 리스트를 참조
a.append(4)
print(f"a = {a}")  # [1, 2, 3, 4]
print(f"b = {b}")  # [1, 2, 3, 4] - 같이 변경됨!

# 올바른 방법
c = [1, 2, 3]
d = [1, 2, 3]  # 별도의 리스트 생성
c.append(4)
print(f"c = {c}")  # [1, 2, 3, 4]
print(f"d = {d}")  # [1, 2, 3] - 독립적
```

## 6. 비트 연산자 (Bitwise Operators)

### 6.1 기본 비트 연산자
```python
# 비트 연산자 소개
a = 12  # 이진수: 1100
b = 10  # 이진수: 1010

print(f"a = {a} (이진수: {bin(a)})")
print(f"b = {b} (이진수: {bin(b)})")

# AND 연산 (&)
result = a & b  # 1100 & 1010 = 1000 (8)
print(f"a & b = {result} (이진수: {bin(result)})")

# OR 연산 (|)  
result = a | b  # 1100 | 1010 = 1110 (14)
print(f"a | b = {result} (이진수: {bin(result)})")

# XOR 연산 (^)
result = a ^ b  # 1100 ^ 1010 = 0110 (6)
print(f"a ^ b = {result} (이진수: {bin(result)})")

# NOT 연산 (~) - 보수
result = ~a     # ~1100 = ...11110011 (음수로 표현)
print(f"~a = {result}")

# 왼쪽 시프트 (<<)
result = a << 2  # 1100 → 110000 (48)
print(f"a << 2 = {result} (이진수: {bin(result)})")

# 오른쪽 시프트 (>>)
result = a >> 2  # 1100 → 11 (3)
print(f"a >> 2 = {result} (이진수: {bin(result)})")
```

### 6.2 비트 연산자의 실용적 활용
```python
# 권한 시스템 (비트 플래그)
# 각 권한을 비트로 표현
READ_PERMISSION = 1    # 001
WRITE_PERMISSION = 2   # 010  
EXECUTE_PERMISSION = 4 # 100

def has_permission(user_permissions, required_permission):
    """사용자가 특정 권한을 가지고 있는지 확인"""
    return (user_permissions & required_permission) != 0

def add_permission(user_permissions, new_permission):
    """권한 추가"""
    return user_permissions | new_permission

def remove_permission(user_permissions, permission_to_remove):
    """권한 제거"""
    return user_permissions & ~permission_to_remove

# 사용자 권한 설정
user_kim = READ_PERMISSION | WRITE_PERMISSION  # 읽기 + 쓰기 (3)
user_lee = READ_PERMISSION | EXECUTE_PERMISSION  # 읽기 + 실행 (5)

print(f"김씨 권한: {user_kim} (이진수: {bin(user_kim)})")
print(f"이씨 권한: {user_lee} (이진수: {bin(user_lee)})")

# 권한 확인
print(f"김씨 읽기 권한: {has_permission(user_kim, READ_PERMISSION)}")
print(f"김씨 실행 권한: {has_permission(user_kim, EXECUTE_PERMISSION)}")

# 권한 추가/제거
user_kim = add_permission(user_kim, EXECUTE_PERMISSION)
print(f"김씨 실행 권한 추가 후: {user_kim} (이진수: {bin(user_kim)})")

user_kim = remove_permission(user_kim, WRITE_PERMISSION)
print(f"김씨 쓰기 권한 제거 후: {user_kim} (이진수: {bin(user_kim)})")

# 빠른 수학 연산
def multiply_by_power_of_2(number, power):
    """2의 거듭제곱으로 곱하기 (왼쪽 시프트 활용)"""
    return number << power

def divide_by_power_of_2(number, power):
    """2의 거듭제곱으로 나누기 (오른쪽 시프트 활용)"""
    return number >> power

def is_even(number):
    """짝수 판별 (비트 AND 활용)"""
    return (number & 1) == 0

def is_power_of_2(number):
    """2의 거듭제곱인지 확인"""
    return number > 0 and (number & (number - 1)) == 0

# 테스트
print(f"\n수학 연산 예제:")
print(f"5 * 8 = 5 << 3 = {multiply_by_power_of_2(5, 3)}")
print(f"32 / 4 = 32 >> 2 = {divide_by_power_of_2(32, 2)}")

numbers = [1, 2, 3, 4, 8, 15, 16, 32]
for num in numbers:
    even = "짝수" if is_even(num) else "홀수"
    power_of_2 = "2의 거듭제곱" if is_power_of_2(num) else "일반 수"
    print(f"{num}: {even}, {power_of_2}")
```

### 6.3 비트 마스크 활용
```python
# 색상 표현 (RGB - 24비트)
def create_color(red, green, blue):
    """RGB 값으로 24비트 색상 생성"""
    # 각 색상은 0-255 범위 (8비트)
    return (red << 16) | (green << 8) | blue

def extract_rgb(color):
    """24비트 색상에서 RGB 값 추출"""
    red = (color >> 16) & 0xFF    # 상위 8비트
    green = (color >> 8) & 0xFF   # 중간 8비트  
    blue = color & 0xFF           # 하위 8비트
    return red, green, blue

# 색상 생성 및 추출
white = create_color(255, 255, 255)
red = create_color(255, 0, 0)
blue = create_color(0, 0, 255)

print(f"흰색: {white} (16진수: {hex(white)})")
print(f"빨간색: {red} (16진수: {hex(red)})")
print(f"파란색: {blue} (16진수: {hex(blue)})")

# RGB 값 추출
r, g, b = extract_rgb(white)
print(f"흰색 RGB: ({r}, {g}, {b})")

# 상태 플래그 시스템
class TaskStatus:
    PENDING = 1      # 대기중
    RUNNING = 2      # 실행중
    COMPLETED = 4    # 완료
    FAILED = 8       # 실패
    CANCELLED = 16   # 취소됨

def get_status_name(status):
    """상태 코드를 문자열로 변환"""
    status_names = {
        TaskStatus.PENDING: "대기중",
        TaskStatus.RUNNING: "실행중", 
        TaskStatus.COMPLETED: "완료",
        TaskStatus.FAILED: "실패",
        TaskStatus.CANCELLED: "취소됨"
    }
    return status_names.get(status, "알 수 없음")

# 복합 상태 (여러 작업의 상태를 하나의 값으로)
def combine_statuses(status_list):
    """여러 상태를 하나로 결합"""
    combined = 0
    for status in status_list:
        combined |= status
    return combined

def has_any_status(combined_status, check_status):
    """특정 상태가 포함되어 있는지 확인"""
    return (combined_status & check_status) != 0

# 예제: 배치 작업 시스템
batch_jobs = [
    TaskStatus.COMPLETED,
    TaskStatus.RUNNING,
    TaskStatus.PENDING,
    TaskStatus.FAILED
]

combined = combine_statuses(batch_jobs)
print(f"\n배치 작업 상태:")
print(f"결합된 상태 값: {combined} (이진수: {bin(combined)})")

# 각 상태 확인
for status in [TaskStatus.PENDING, TaskStatus.RUNNING, TaskStatus.COMPLETED, TaskStatus.FAILED]:
    has_status = has_any_status(combined, status)
    status_name = get_status_name(status)
    print(f"{status_name} 작업 존재: {has_status}")
```

## 7. 실습 예제

### 7.1 계산기 프로그램
```python
class SimpleCalculator:
    """간단한 계산기 클래스"""
    
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self._save_history('add', a, b, result)
        return result
    
    def subtract(self, a, b):
        result = a - b
        self._save_history('subtract', a, b, result)
        return result
    
    def multiply(self, a, b):
        result = a * b
        self._save_history('multiply', a, b, result)
        return result
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("0으로 나눌 수 없습니다")
        result = a / b
        self._save_history('divide', a, b, result)
        return result
    
    def power(self, a, b):
        result = a ** b
        self._save_history('power', a, b, result)
        return result
    
    def modulo(self, a, b):
        if b == 0:
            raise ValueError("0으로 나눌 수 없습니다")
        result = a % b
        self._save_history('modulo', a, b, result)
        return result
    
    def _save_history(self, operation, a, b, result):
        """계산 이력 저장"""
        operation_symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/',
            'power': '**',
            'modulo': '%'
        }
        symbol = operation_symbols[operation]
        self.history.append(f"{a} {symbol} {b} = {result}")
    
    def show_history(self):
        """계산 이력 출력"""
        if not self.history:
            print("계산 이력이 없습니다.")
        else:
            print("=== 계산 이력 ===")
            for i, record in enumerate(self.history, 1):
                print(f"{i}. {record}")
    
    def clear_history(self):
        """이력 지우기"""
        self.history.clear()
        print("계산 이력이 지워졌습니다.")

# 계산기 테스트
calc = SimpleCalculator()

# 다양한 계산 수행
print("계산기 테스트:")
print(f"10 + 5 = {calc.add(10, 5)}")
print(f"10 - 3 = {calc.subtract(10, 3)}")
print(f"4 * 7 = {calc.multiply(4, 7)}")
print(f"15 / 3 = {calc.divide(15, 3)}")
print(f"2 ** 8 = {calc.power(2, 8)}")
print(f"17 % 5 = {calc.modulo(17, 5)}")

# 이력 확인
calc.show_history()
```

### 7.2 점수 등급 시스템
```python
def comprehensive_grading_system():
    """종합적인 점수 등급 시스템"""
    
    def calculate_weighted_score(scores, weights):
        """가중 평균 계산"""
        if len(scores) != len(weights):
            raise ValueError("점수와 가중치 개수가 일치하지 않습니다")
        
        total_weighted = sum(score * weight for score, weight in zip(scores, weights))
        total_weights = sum(weights)
        return total_weighted / total_weights if total_weights > 0 else 0
    
    def get_letter_grade(score):
        """숫자 점수를 문자 등급으로 변환"""
        if score >= 97:
            return 'A+'
        elif score >= 93:
            return 'A'
        elif score >= 90:
            return 'A-'
        elif score >= 87:
            return 'B+'
        elif score >= 83:
            return 'B'
        elif score >= 80:
            return 'B-'
        elif score >= 77:
            return 'C+'
        elif score >= 73:
            return 'C'
        elif score >= 70:
            return 'C-'
        elif score >= 67:
            return 'D+'
        elif score >= 63:
            return 'D'
        elif score >= 60:
            return 'D-'
        else:
            return 'F'
    
    def calculate_gpa(letter_grade):
        """문자 등급을 GPA로 변환"""
        gpa_table = {
            'A+': 4.5, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        }
        return gpa_table.get(letter_grade, 0.0)
    
    def check_graduation_requirements(gpa, credits, major_credits):
        """졸업 요건 확인"""
        requirements = {
            'min_gpa': 2.0,
            'min_total_credits': 130,
            'min_major_credits': 60
        }
        
        results = {}
        results['gpa_met'] = gpa >= requirements['min_gpa']
        results['credits_met'] = credits >= requirements['min_total_credits']
        results['major_credits_met'] = major_credits >= requirements['min_major_credits']
        results['can_graduate'] = all(results.values())
        
        return results, requirements
    
    # 학생 데이터
    students = [
        {
            'name': '김민수',
            'scores': [85, 92, 78, 88],
            'weights': [0.3, 0.3, 0.2, 0.2],  # 중간, 기말, 과제, 출석
            'credits': 135,
            'major_credits': 65
        },
        {
            'name': '이영희', 
            'scores': [95, 88, 92, 96],
            'weights': [0.3, 0.3, 0.2, 0.2],
            'credits': 128,
            'major_credits': 58
        },
        {
            'name': '박철수',
            'scores': [75, 72, 80, 85],
            'weights': [0.3, 0.3, 0.2, 0.2],
            'credits': 140,
            'major_credits': 70
        }
    ]
    
    print("=== 종합 성적 관리 시스템 ===\n")
    
    for student in students:
        name = student['name']
        scores = student['scores']
        weights = student['weights']
        credits = student['credits']
        major_credits = student['major_credits']
        
        # 가중 평균 계산
        weighted_score = calculate_weighted_score(scores, weights)
        letter_grade = get_letter_grade(weighted_score)
        gpa = calculate_gpa(letter_grade)
        
        # 졸업 요건 확인
        grad_results, requirements = check_graduation_requirements(
            gpa, credits, major_credits
        )
        
        print(f"학생: {name}")
        print(f"  점수 내역: {scores}")
        print(f"  가중치: {weights}")
        print(f"  가중 평균: {weighted_score:.2f}점")
        print(f"  문자 등급: {letter_grade}")
        print(f"  평점(GPA): {gpa:.2f}")
        print(f"  총 학점: {credits} (필요: {requirements['min_total_credits']})")
        print(f"  전공 학점: {major_credits} (필요: {requirements['min_major_credits']})")
        print(f"  졸업 가능: {'✓' if grad_results['can_graduate'] else '✗'}")
        
        if not grad_results['can_graduate']:
            print("  미충족 요건:")
            if not grad_results['gpa_met']:
                print(f"    - GPA 부족 (현재: {gpa:.2f}, 필요: {requirements['min_gpa']})")
            if not grad_results['credits_met']:
                shortage = requirements['min_total_credits'] - credits
                print(f"    - 총 학점 부족 ({shortage}학점 추가 필요)")
            if not grad_results['major_credits_met']:
                shortage = requirements['min_major_credits'] - major_credits
                print(f"    - 전공 학점 부족 ({shortage}학점 추가 필요)")
        print()

# 실행
comprehensive_grading_system()
```

### 7.3 시간 계산기
```python
class TimeCalculator:
    """시간 계산을 위한 클래스"""
    
    def __init__(self, hours=0, minutes=0, seconds=0):
        self.total_seconds = hours * 3600 + minutes * 60 + seconds
    
    def __str__(self):
        hours = self.total_seconds // 3600
        minutes = (self.total_seconds % 3600) // 60
        seconds = self.total_seconds % 60
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    
    def __add__(self, other):
        """시간 더하기"""
        if isinstance(other, TimeCalculator):
            result = TimeCalculator()
            result.total_seconds = self.total_seconds + other.total_seconds
            return result
        return NotImplemented
    
    def __sub__(self, other):
        """시간 빼기"""
        if isinstance(other, TimeCalculator):
            result = TimeCalculator()
            result.total_seconds = max(0, self.total_seconds - other.total_seconds)
            return result
        return NotImplemented
    
    def __mul__(self, factor):
        """시간에 배수 곱하기"""
        if isinstance(factor, (int, float)):
            result = TimeCalculator()
            result.total_seconds = int(self.total_seconds * factor)
            return result
        return NotImplemented
    
    def __lt__(self, other):
        if isinstance(other, TimeCalculator):
            return self.total_seconds < other.total_seconds
        return NotImplemented
    
    def __le__(self, other):
        if isinstance(other, TimeCalculator):
            return self.total_seconds <= other.total_seconds
        return NotImplemented
    
    def __gt__(self, other):
        if isinstance(other, TimeCalculator):
            return self.total_seconds > other.total_seconds
        return NotImplemented
    
    def __ge__(self, other):
        if isinstance(other, TimeCalculator):
            return self.total_seconds >= other.total_seconds
        return NotImplemented
    
    def __eq__(self, other):
        if isinstance(other, TimeCalculator):
            return self.total_seconds == other.total_seconds
        return NotImplemented
    
    def to_minutes(self):
        """총 분으로 변환"""
        return self.total_seconds / 60
    
    def to_hours(self):
        """총 시간으로 변환"""
        return self.total_seconds / 3600

# 근무시간 계산 시스템
def work_time_calculator():
    """근무시간 계산 시스템"""
    
    # 일일 근무 시간
    daily_hours = [
        TimeCalculator(8, 30, 0),   # 월요일
        TimeCalculator(7, 45, 0),   # 화요일
        TimeCalculator(9, 15, 0),   # 수요일
        TimeCalculator(8, 0, 0),    # 목요일
        TimeCalculator(6, 30, 0)    # 금요일
    ]
    
    days = ['월', '화', '수', '목', '금']
    
    print("=== 주간 근무시간 계산 ===")
    
    # 일일 근무시간 출력
    total_time = TimeCalculator()
    for day, hours in zip(days, daily_hours):
        print(f"{day}요일: {hours}")
        total_time += hours
    
    print(f"\n총 근무시간: {total_time}")
    print(f"평균 일일 근무시간: {total_time * (1/5)}")
    
    # 초과근무 계산 (일 8시간 기준)
    standard_daily = TimeCalculator(8, 0, 0)
    standard_weekly = standard_daily * 5
    
    if total_time > standard_weekly:
        overtime = total_time - standard_weekly
        print(f"주간 초과근무: {overtime}")
    else:
        shortage = standard_weekly - total_time
        print(f"주간 부족근무: {shortage}")
    
    # 휴게시간 계산 (일 1시간씩)
    break_time = TimeCalculator(1, 0, 0) * 5
    actual_work_time = total_time - break_time
    
    print(f"휴게시간 제외 실근무시간: {actual_work_time}")
    
    # 시급 계산
    hourly_wage = 15000  # 시급 15,000원
    total_pay = int(actual_work_time.to_hours() * hourly_wage)
    
    print(f"주급 (시급 {hourly_wage:,}원): {total_pay:,}원")

# 실행
work_time_calculator()
```

## 8. 실습 과제

### 과제 1: 학점 계산기
다음 요구사항을 만족하는 학점 계산기를 작성하세요.

**요구사항:**
- 여러 과목의 점수와 학점을 입력받기
- 평점 평균(GPA) 계산 (4.5 만점)
- 총 이수 학점 계산  
- 성적 통계 (최고점, 최저점, 평균) 제공

### 과제 2: 단위 변환기
길이, 무게, 온도 등을 다양한 단위로 변환하는 프로그램을 작성하세요.

**요구사항:**
- 길이: mm, cm, m, km, inch, feet, yard, mile
- 무게: mg, g, kg, ton, oz, lb
- 온도: 섭씨, 화씨, 켈빈
- 사용자 친화적인 메뉴 시스템

### 과제 3: 비트 플래그 권한 시스템
비트 연산자를 활용한 사용자 권한 관리 시스템을 작성하세요.

**요구사항:**
- 읽기, 쓰기, 실행, 삭제, 관리자 권한 정의
- 권한 추가/제거 기능
- 권한 확인 기능
- 사용자별 권한 관리

**예시:**
```
사용자 권한: 읽기 + 쓰기
권한 확인: 읽기 권한 있음 ✓
권한 추가: 실행 권한 추가됨
최종 권한: 읽기 + 쓰기 + 실행
```

## 9. 다음 챕터 미리보기

Chapter 5에서는 다음 내용을 학습합니다:
- **입력 함수**: `input()`, 입력 검증, 타입 변환
- **출력 함수**: `print()` 고급 활용, 출력 형식 지정
- **파일 입출력**: 텍스트 파일 읽기/쓰기 기초
- **포맷팅**: 다양한 출력 형식과 정렬
- **사용자 인터페이스**: 간단한 대화형 프로그램 제작

## 10. 핵심 정리

✅ **산술 연산자**
- 기본: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- 나눗셈: `/` (실수), `//` (정수), `%` (나머지)
- 거듭제곱: `**` (우결합성)

✅ **비교 연산자**
- `==`, `!=`, `<`, `<=`, `>`, `>=`
- 연쇄 비교: `10 < x < 20`
- 객체 비교: `is`, `is not`

✅ **논리 연산자**
- `and`, `or`, `not`
- 단축 평가 (Short-circuit evaluation)
- 드모르간 법칙 활용

✅ **할당 연산자**
- 복합 할당: `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`
- 월리스 연산자: `:=` (Python 3.8+)

✅ **연산자 우선순위**
- 괄호 → 거듭제곱 → 곱셈/나눗셈 → 덧셈/뺄셈 → 비교 → 논리
- 명확성을 위한 괄호 사용 권장

✅ **비트 연산자**
- `&` (AND), `|` (OR), `^` (XOR), `~` (NOT)
- `<<` (왼쪽 시프트), `>>` (오른쪽 시프트)
- 권한 시스템, 플래그 관리에 활용

---

**🎉 축하합니다!** Chapter 4를 완료했습니다. 이제 Python의 다양한 연산자들을 활용하여 복잡한 계산과 논리 처리를 할 수 있게 되었습니다. Chapter 5에서는 사용자와의 상호작용을 위한 입력과 출력을 학습해보겠습니다.
</rewritten_file> 