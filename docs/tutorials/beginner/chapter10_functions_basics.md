# Chapter 10: 함수로 코드의 마법사 되기

## 📚 이 챕터에서 배울 내용
- 함수의 진정한 힘과 코딩 생산성 혁신하기
- 재사용 가능한 코드 블록으로 효율성 극대화하기
- 매개변수와 반환값으로 유연한 프로그램 설계하기
- 스코프와 네임스페이스의 비밀 마스터하기
- 람다 함수로 간결하고 우아한 코드 작성하기
- 실무에서 바로 쓸 수 있는 함수 라이브러리 구축하기

---

## 🎯 함수: 코딩의 게임 체인저

### 💡 함수 없는 세상 vs 함수가 있는 세상

함수는 프로그래밍에서 **가장 중요한 개념** 중 하나입니다. 마치 현실에서 도구를 사용하는 것처럼, 함수는 코딩의 강력한 도구입니다!

```python
print("=== 🌍 함수 없는 세상: 코드 지옥 ===")

# 😱 함수 없이 학생 성적 처리 (악몽의 시작)
# 학생 1 성적 처리
student1_korean = 85
student1_english = 92
student1_math = 78
student1_science = 88

student1_total = student1_korean + student1_english + student1_math + student1_science
student1_average = student1_total / 4

if student1_average >= 90:
    student1_grade = "A"
elif student1_average >= 80:
    student1_grade = "B"
elif student1_average >= 70:
    student1_grade = "C"
else:
    student1_grade = "D"

print(f"학생1: 총점 {student1_total}, 평균 {student1_average:.1f}, 등급 {student1_grade}")

# 학생 2 성적 처리 (복사-붙여넣기 지옥)
student2_korean = 76
student2_english = 88
student2_math = 84
student2_science = 90

student2_total = student2_korean + student2_english + student2_math + student2_science
student2_average = student2_total / 4

if student2_average >= 90:
    student2_grade = "A"
elif student2_average >= 80:
    student2_grade = "B"
elif student2_average >= 70:
    student2_grade = "C"
else:
    student2_grade = "D"

print(f"학생2: 총점 {student2_total}, 평균 {student2_average:.1f}, 등급 {student2_grade}")

# 😭 이런 식으로 100명의 학생을 처리한다면...?

print("\n=== ✨ 함수가 있는 세상: 코딩 천국 ===")

def calculate_grade(korean, english, math, science):
    """학생 성적을 처리하는 마법의 함수"""
    total = korean + english + math + science
    average = total / 4
    
    if average >= 90:
        grade = "A"
    elif average >= 80:
        grade = "B"
    elif average >= 70:
        grade = "C"
    else:
        grade = "D"
    
    return total, average, grade

def print_student_result(student_name, korean, english, math, science):
    """학생 결과를 예쁘게 출력하는 함수"""
    total, average, grade = calculate_grade(korean, english, math, science)
    print(f"🎓 {student_name}: 총점 {total}, 평균 {average:.1f}, 등급 {grade}")

# 🎉 이제 간단하게!
students_data = [
    ("김철수", 85, 92, 78, 88),
    ("이영희", 76, 88, 84, 90),
    ("박민수", 95, 87, 91, 89),
    ("최지영", 82, 79, 86, 93),
    ("정다은", 90, 94, 88, 92)
]

print("📊 전체 학생 성적 결과:")
for student_data in students_data:
    print_student_result(*student_data)

# 🚀 추가 분석도 쉽게!
all_averages = []
for name, korean, english, math, science in students_data:
    _, average, _ = calculate_grade(korean, english, math, science)
    all_averages.append(average)

class_average = sum(all_averages) / len(all_averages)
print(f"\n📈 학급 평균: {class_average:.1f}점")
```

> 🌟 **핵심 포인트**: 함수는 **코드 중복을 제거**하고 **가독성을 향상**시키며 **유지보수를 쉽게** 만드는 마법의 도구입니다!

### 🏗️ 함수의 놀라운 장점들

| 장점 | 설명 | 예시 |
|------|------|------|
| **재사용성** | 한 번 작성하면 여러 번 사용 | `calculate_tax()` 함수를 모든 상품에 적용 |
| **가독성** | 코드의 의도가 명확해짐 | `is_valid_email()` - 이름만 봐도 기능 파악 |
| **유지보수** | 수정이 필요할 때 한 곳만 변경 | 세율 변경 시 함수 하나만 수정 |
| **모듈화** | 복잡한 문제를 작은 단위로 분해 | 게임을 여러 함수로 나누어 개발 |
| **테스트** | 개별 기능을 독립적으로 테스트 | 각 함수별로 단위 테스트 가능 |

### 🎨 실생활 속 함수들

```python
print("=== 🏠 일상 속 함수의 개념 ===")

# 실생활의 함수들을 코드로 표현
def make_coffee(coffee_type="아메리카노", sugar=0, milk=False):
    """커피를 만드는 함수 (실생활 비유)"""
    print(f"☕ {coffee_type} 제조 시작!")
    
    steps = ["원두 갈기", "물 끓이기", "커피 추출"]
    
    if sugar > 0:
        steps.append(f"설탕 {sugar}스푼 추가")
    
    if milk:
        steps.append("우유 추가")
    
    for i, step in enumerate(steps, 1):
        print(f"   {i}. {step}")
    
    return f"맛있는 {coffee_type} 완성! ☕"

def calculate_delivery_fee(distance, weight, is_express=False):
    """배송비 계산 함수"""
    base_fee = 3000
    distance_fee = distance * 500
    weight_fee = max(0, (weight - 1) * 1000)  # 1kg 초과분
    
    total_fee = base_fee + distance_fee + weight_fee
    
    if is_express:
        total_fee *= 1.5
        service_type = "특급"
    else:
        service_type = "일반"
    
    return {
        "service_type": service_type,
        "base_fee": base_fee,
        "distance_fee": distance_fee,
        "weight_fee": weight_fee,
        "total_fee": int(total_fee)
    }

def format_phone_number(number):
    """전화번호를 예쁘게 포맷팅하는 함수"""
    # 숫자만 추출
    digits = ''.join(filter(str.isdigit, number))
    
    if len(digits) == 11 and digits.startswith('010'):
        return f"{digits[:3]}-{digits[3:7]}-{digits[7:]}"
    elif len(digits) == 10:
        return f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
    else:
        return "올바르지 않은 전화번호"

# 실생활 함수들 테스트
print("☕ 커피 주문 시스템:")
result1 = make_coffee("카페라떼", sugar=1, milk=True)
print(f"   결과: {result1}\n")

result2 = make_coffee("에스프레소")
print(f"   결과: {result2}\n")

print("🚚 배송비 계산 시스템:")
delivery_info = calculate_delivery_fee(distance=5, weight=2.5, is_express=True)
print(f"   서비스: {delivery_info['service_type']}")
print(f"   기본료: {delivery_info['base_fee']:,}원")
print(f"   거리비: {delivery_info['distance_fee']:,}원")
print(f"   중량비: {delivery_info['weight_fee']:,}원")
print(f"   총 배송비: {delivery_info['total_fee']:,}원\n")

print("📱 전화번호 포맷팅:")
phone_numbers = ["01012345678", "010-1234-5678", "02-123-4567", "invalid"]
for phone in phone_numbers:
    formatted = format_phone_number(phone)
    print(f"   {phone} → {formatted}")
```

---

## 🛠️ 함수 정의와 호출: 마법 주문 만들기

### 🎯 기본 함수 문법: 첫 번째 마법 주문

```python
print("=== 🎯 함수 정의의 기본 문법 ===")

# 가장 간단한 함수
def say_hello():
    """인사하는 함수 - 매개변수 없음, 반환값 없음"""
    print("안녕하세요! 👋")

# 함수 호출
say_hello()

# 함수 정보 확인
print(f"함수 이름: {say_hello.__name__}")
print(f"함수 설명: {say_hello.__doc__}")

print("\n" + "="*40)

# 조금 더 실용적인 함수들
def print_banner(title):
    """제목을 예쁜 배너로 출력하는 함수"""
    border = "=" * (len(title) + 4)
    print(border)
    print(f"  {title}")
    print(border)

def get_current_time():
    """현재 시간을 문자열로 반환하는 함수"""
    import datetime
    now = datetime.datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")

def create_user_profile(name, age, city="서울"):
    """사용자 프로필을 생성하는 함수"""
    profile = {
        "name": name,
        "age": age,
        "city": city,
        "created_at": get_current_time(),
        "id": f"user_{name.lower()}_{age}"
    }
    return profile

# 함수들 활용 예제
print_banner("함수 활용 예제")

current_time = get_current_time()
print(f"현재 시간: {current_time}")

user1 = create_user_profile("김개발", 28, "부산")
user2 = create_user_profile("이코딩", 25)  # 기본값 사용

print(f"\n👤 사용자 1: {user1}")
print(f"👤 사용자 2: {user2}")
```

### 🎪 매개변수의 다양한 얼굴들

```python
print("=== 🎪 매개변수 마스터 클래스 ===")

# 1. 위치 매개변수 (Positional Parameters)
def introduce_person(name, age, job):
    """위치 매개변수 - 순서가 중요!"""
    return f"안녕하세요! 저는 {name}이고, {age}세이며, {job}을 하고 있습니다."

print("1️⃣ 위치 매개변수:")
intro1 = introduce_person("김철수", 30, "개발자")
print(f"   {intro1}")

# 순서 바뀌면 이상해짐
intro2 = introduce_person("개발자", "김철수", 30)  # 잘못된 순서
print(f"   {intro2} ← 순서 중요!")

# 2. 키워드 매개변수 (Keyword Parameters)
print(f"\n2️⃣ 키워드 매개변수:")
intro3 = introduce_person(job="디자이너", name="이영희", age=25)  # 순서 무관
print(f"   {intro3}")

# 3. 기본값 매개변수 (Default Parameters)
def order_coffee(coffee_type, size="medium", hot=True, extra_shot=0):
    """기본값이 있는 매개변수들"""
    temperature = "뜨거운" if hot else "차가운"
    shot_info = f" (+{extra_shot}샷)" if extra_shot > 0 else ""
    
    return f"{temperature} {coffee_type} ({size} 사이즈){shot_info}"

print(f"\n3️⃣ 기본값 매개변수:")
order1 = order_coffee("아메리카노")  # 기본값 사용
order2 = order_coffee("라떼", size="large", extra_shot=1)
order3 = order_coffee("프라푸치노", hot=False, size="small")

print(f"   주문1: {order1}")
print(f"   주문2: {order2}")
print(f"   주문3: {order3}")

# 4. 가변 위치 매개변수 (*args)
def calculate_sum(*numbers):
    """개수가 정해지지 않은 숫자들의 합계"""
    total = sum(numbers)
    count = len(numbers)
    return f"{count}개 숫자의 합: {total}"

print(f"\n4️⃣ 가변 위치 매개변수 (*args):")
sum1 = calculate_sum(1, 2, 3)
sum2 = calculate_sum(10, 20, 30, 40, 50)
sum3 = calculate_sum(100)

print(f"   {sum1}")
print(f"   {sum2}")
print(f"   {sum3}")

# 5. 가변 키워드 매개변수 (**kwargs)
def create_product(**product_info):
    """제품 정보를 받아서 딕셔너리로 정리"""
    product = {
        "id": f"PROD_{len(product_info)}",
        "created_at": get_current_time()
    }
    product.update(product_info)
    return product

print(f"\n5️⃣ 가변 키워드 매개변수 (**kwargs):")
product1 = create_product(name="노트북", price=1200000, brand="TechCorp")
product2 = create_product(name="마우스", price=30000, color="black", wireless=True)

print(f"   제품1: {product1}")
print(f"   제품2: {product2}")

# 6. 모든 매개변수 타입 조합
def ultimate_function(required_param, default_param="기본값", *args, **kwargs):
    """모든 매개변수 타입을 조합한 궁극의 함수"""
    result = {
        "required": required_param,
        "default": default_param,
        "args": args,
        "kwargs": kwargs
    }
    return result

print(f"\n6️⃣ 궁극의 함수 (모든 매개변수 타입 조합):")
ultimate_result = ultimate_function(
    "필수값", 
    "변경된 기본값", 
    1, 2, 3,  # *args
    name="김개발", age=30, city="서울"  # **kwargs
)

print(f"   결과: {ultimate_result}")
```

### 🎁 반환값: 함수의 선물

```python
print("=== 🎁 반환값 마스터 클래스 ===")

# 1. 단일 값 반환
def calculate_circle_area(radius):
    """원의 넓이를 계산하여 반환"""
    import math
    area = math.pi * radius ** 2
    return area

# 2. 여러 값 반환 (튜플)
def analyze_text(text):
    """텍스트를 분석하여 여러 정보를 반환"""
    word_count = len(text.split())
    char_count = len(text)
    char_count_no_space = len(text.replace(" ", ""))
    
    return word_count, char_count, char_count_no_space

# 3. 딕셔너리 반환
def get_weather_info(city):
    """날씨 정보를 딕셔너리로 반환 (시뮬레이션)"""
    import random
    
    weather_conditions = ["맑음", "흐림", "비", "눈", "안개"]
    
    return {
        "city": city,
        "temperature": random.randint(-10, 35),
        "condition": random.choice(weather_conditions),
        "humidity": random.randint(30, 90),
        "timestamp": get_current_time()
    }

# 4. 조건부 반환
def validate_password(password):
    """비밀번호 유효성 검사 - 조건에 따라 다른 값 반환"""
    if len(password) < 8:
        return False, "비밀번호는 8자 이상이어야 합니다."
    
    if not any(c.isupper() for c in password):
        return False, "대문자가 포함되어야 합니다."
    
    if not any(c.islower() for c in password):
        return False, "소문자가 포함되어야 합니다."
    
    if not any(c.isdigit() for c in password):
        return False, "숫자가 포함되어야 합니다."
    
    return True, "안전한 비밀번호입니다!"

# 5. 함수를 반환하는 함수 (고급)
def create_multiplier(factor):
    """특정 수를 곱하는 함수를 생성하는 함수"""
    def multiplier(number):
        return number * factor
    return multiplier

# 반환값 활용 예제
print("🔍 반환값 활용 예제:")

# 단일 값 반환
area = calculate_circle_area(5)
print(f"반지름 5인 원의 넓이: {area:.2f}")

# 여러 값 반환 (언패킹)
sample_text = "Python은 정말 재미있는 프로그래밍 언어입니다!"
words, chars, chars_no_space = analyze_text(sample_text)
print(f"텍스트 분석: {words}단어, {chars}문자, {chars_no_space}문자(공백제외)")

# 딕셔너리 반환
weather = get_weather_info("서울")
print(f"날씨 정보: {weather['city']} {weather['temperature']}°C, {weather['condition']}")

# 조건부 반환
passwords = ["weak", "StrongPass123", "noUPPER123", "NOLOWER123"]
print(f"\n🔐 비밀번호 검증:")
for pwd in passwords:
    is_valid, message = validate_password(pwd)
    status = "✅" if is_valid else "❌"
    print(f"   {status} '{pwd}': {message}")

# 함수를 반환하는 함수
print(f"\n🔢 동적 함수 생성:")
double = create_multiplier(2)
triple = create_multiplier(3)

print(f"   double(5) = {double(5)}")
print(f"   triple(4) = {triple(4)}")
```

---

## 🌍 스코프와 네임스페이스: 변수의 영역

### 💡 스코프의 개념: 변수의 생활 영역

```python
print("=== 🌍 스코프(Scope) 이해하기 ===")

# 전역 변수 (Global Variable)
global_message = "전역에서 접근 가능한 메시지"
global_counter = 0

def demonstrate_scope():
    """스코프를 설명하는 함수"""
    # 지역 변수 (Local Variable)
    local_message = "함수 내부에서만 접근 가능한 메시지"
    
    print(f"함수 내부에서:")
    print(f"  전역 변수: {global_message}")
    print(f"  지역 변수: {local_message}")

def modify_global_wrong():
    """전역 변수 수정 시도 (잘못된 방법)"""
    global_counter = 100  # 새로운 지역 변수 생성!
    print(f"함수 내부 counter: {global_counter}")

def modify_global_correct():
    """전역 변수 수정 (올바른 방법)"""
    global global_counter
    global_counter = 200  # 실제 전역 변수 수정
    print(f"global 키워드 사용 후 counter: {global_counter}")

# 스코프 테스트
print("🔍 스코프 테스트:")
demonstrate_scope()

print(f"\n전역 counter 초기값: {global_counter}")
modify_global_wrong()
print(f"잘못된 수정 후 전역 counter: {global_counter}")  # 변경되지 않음!

modify_global_correct()
print(f"올바른 수정 후 전역 counter: {global_counter}")  # 변경됨!

# 지역 변수는 함수 외부에서 접근 불가
try:
    print(local_message)  # 오류 발생!
except NameError as e:
    print(f"❌ 오류: {e}")
```

### 🏠 중첩 함수와 nonlocal

```python
print("=== 🏠 중첩 함수와 nonlocal ===")

def outer_function(x):
    """외부 함수"""
    outer_variable = f"외부 함수의 변수: {x}"
    
    def inner_function(y):
        """내부 함수 - 외부 함수의 변수에 접근 가능"""
        inner_variable = f"내부 함수의 변수: {y}"
        
        print(f"  내부 함수에서:")
        print(f"    {outer_variable}")  # 외부 함수 변수 접근
        print(f"    {inner_variable}")
        
        return x + y
    
    result = inner_function(10)
    print(f"  외부 함수에서: 결과 = {result}")
    return result

def create_counter():
    """카운터 함수를 생성하는 함수 (클로저 예제)"""
    count = 0
    
    def increment():
        nonlocal count  # 외부 함수의 변수 수정
        count += 1
        return count
    
    def decrement():
        nonlocal count
        count -= 1
        return count
    
    def get_count():
        return count
    
    # 함수들을 딕셔너리로 반환
    return {
        "increment": increment,
        "decrement": decrement,
        "get_count": get_count
    }

def bank_account(initial_balance):
    """은행 계좌 시뮬레이션 (실용적인 클로저 예제)"""
    balance = initial_balance
    transaction_history = []
    
    def deposit(amount):
        nonlocal balance
        if amount > 0:
            balance += amount
            transaction_history.append(f"입금: +{amount:,}원")
            return f"입금 완료! 현재 잔액: {balance:,}원"
        return "입금액은 0보다 커야 합니다."
    
    def withdraw(amount):
        nonlocal balance
        if amount > balance:
            return f"잔액 부족! 현재 잔액: {balance:,}원"
        if amount > 0:
            balance -= amount
            transaction_history.append(f"출금: -{amount:,}원")
            return f"출금 완료! 현재 잔액: {balance:,}원"
        return "출금액은 0보다 커야 합니다."
    
    def get_balance():
        return f"현재 잔액: {balance:,}원"
    
    def get_history():
        return transaction_history.copy()
    
    return {
        "deposit": deposit,
        "withdraw": withdraw,
        "balance": get_balance,
        "history": get_history
    }

# 중첩 함수 테스트
print("🔍 중첩 함수 테스트:")
outer_function(5)

print(f"\n🔢 카운터 함수 테스트:")
counter = create_counter()
print(f"초기값: {counter['get_count']()}")
print(f"증가: {counter['increment']()}")
print(f"증가: {counter['increment']()}")
print(f"감소: {counter['decrement']()}")
print(f"현재값: {counter['get_count']()}")

print(f"\n🏦 은행 계좌 시뮬레이션:")
account = bank_account(100000)
print(f"계좌 개설: {account['balance']()}")
print(f"입금: {account['deposit'](50000)}")
print(f"출금: {account['withdraw'](30000)}")
print(f"출금 시도: {account['withdraw'](200000)}")  # 잔액 부족
print(f"거래 내역: {account['history']()}")
```

### 🎯 스코프 규칙: LEGB 원칙

```python
print("=== 🎯 LEGB 원칙 (Local → Enclosing → Global → Built-in) ===")

# Built-in: Python 내장 함수/변수
print(f"Built-in 함수 예: {len('hello')}, {max([1,2,3])}")

# Global: 전역 변수
global_var = "전역 변수"

def outer():
    # Enclosing: 외부 함수의 지역 변수
    enclosing_var = "외부 함수 변수"
    
    def inner():
        # Local: 현재 함수의 지역 변수
        local_var = "지역 변수"
        
        print("LEGB 순서로 변수 찾기:")
        print(f"  Local: {local_var}")
        print(f"  Enclosing: {enclosing_var}")
        print(f"  Global: {global_var}")
        print(f"  Built-in: {len}")  # len은 내장 함수
    
    inner()

# 변수 이름이 같을 때의 우선순위
name = "전역의 name"

def test_priority():
    name = "함수의 name"  # 지역 변수가 전역 변수를 가림
    print(f"함수 내부에서 name: {name}")

print("🔍 LEGB 원칙 테스트:")
outer()

print(f"\n우선순위 테스트:")
print(f"전역에서 name: {name}")
test_priority()
print(f"함수 호출 후 전역 name: {name}")  # 전역 변수는 변경되지 않음
```

---

## ⚡ 람다 함수: 한 줄의 마법

### 💫 람다 함수의 기본 개념

```python
print("=== ⚡ 람다 함수: 간결함의 미학 ===")

# 일반 함수 vs 람다 함수 비교
def square_normal(x):
    """일반 함수로 제곱 계산"""
    return x ** 2

square_lambda = lambda x: x ** 2  # 람다 함수로 제곱 계산

print("🔍 일반 함수 vs 람다 함수:")
print(f"일반 함수: square_normal(5) = {square_normal(5)}")
print(f"람다 함수: square_lambda(5) = {square_lambda(5)}")

# 다양한 람다 함수 예제
add = lambda x, y: x + y
multiply = lambda x, y, z: x * y * z
is_even = lambda n: n % 2 == 0
get_full_name = lambda first, last: f"{first} {last}"

print(f"\n📝 다양한 람다 함수 예제:")
print(f"덧셈: add(3, 7) = {add(3, 7)}")
print(f"곱셈: multiply(2, 3, 4) = {multiply(2, 3, 4)}")
print(f"짝수 판별: is_even(8) = {is_even(8)}")
print(f"이름 조합: get_full_name('김', '철수') = {get_full_name('김', '철수')}")
```

### 🎪 고차 함수와 람다의 환상적인 조합

```python
print("=== 🎪 고차 함수와 람다의 마법 조합 ===")

# 1. map() - 모든 요소에 함수 적용
numbers = [1, 2, 3, 4, 5]

# 일반적인 방법
squares_normal = []
for num in numbers:
    squares_normal.append(num ** 2)

# map + 람다로 간결하게
squares_lambda = list(map(lambda x: x ** 2, numbers))

print(f"원본 리스트: {numbers}")
print(f"제곱 (일반): {squares_normal}")
print(f"제곱 (람다): {squares_lambda}")

# 실용적인 map 예제들
names = ["kim", "lee", "park", "choi"]
temperatures_f = [32, 68, 86, 104]  # 화씨 온도

capitalized_names = list(map(lambda name: name.capitalize(), names))
temperatures_c = list(map(lambda f: (f - 32) * 5/9, temperatures_f))

print(f"\n이름 대문자화: {names} → {capitalized_names}")
print(f"화씨→섭씨 변환: {temperatures_f} → {[f'{t:.1f}°C' for t in temperatures_c]}")

# 2. filter() - 조건에 맞는 요소만 선택
ages = [15, 22, 8, 30, 17, 45, 12, 35]

# 성인만 필터링
adults = list(filter(lambda age: age >= 18, ages))
minors = list(filter(lambda age: age < 18, ages))

print(f"\n나이 리스트: {ages}")
print(f"성인 (18세 이상): {adults}")
print(f"미성년자 (18세 미만): {minors}")

# 실용적인 filter 예제
products = [
    {"name": "노트북", "price": 1200000, "category": "전자제품"},
    {"name": "마우스", "price": 30000, "category": "전자제품"},
    {"name": "책", "price": 15000, "category": "도서"},
    {"name": "키보드", "price": 80000, "category": "전자제품"},
    {"name": "의자", "price": 200000, "category": "가구"}
]

# 50만원 이상 고가 제품
expensive_products = list(filter(lambda p: p["price"] >= 500000, products))
electronics = list(filter(lambda p: p["category"] == "전자제품", products))

print(f"\n💰 고가 제품 (50만원 이상):")
for product in expensive_products:
    print(f"   {product['name']}: {product['price']:,}원")

print(f"\n📱 전자제품:")
for product in electronics:
    print(f"   {product['name']}: {product['price']:,}원")

# 3. sorted() - 정렬에 람다 활용
students = [
    {"name": "김철수", "score": 85},
    {"name": "이영희", "score": 92},
    {"name": "박민수", "score": 78},
    {"name": "최지영", "score": 96}
]

# 점수순 정렬
students_by_score = sorted(students, key=lambda s: s["score"], reverse=True)
students_by_name = sorted(students, key=lambda s: s["name"])

print(f"\n🏆 성적순 정렬:")
for i, student in enumerate(students_by_score, 1):
    print(f"   {i}등: {student['name']} ({student['score']}점)")

print(f"\n📝 이름순 정렬:")
for student in students_by_name:
    print(f"   {student['name']}: {student['score']}점")

# 4. reduce() - 누적 계산 (functools 모듈 필요)
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 모든 수의 곱
product = reduce(lambda x, y: x * y, numbers)
# 최댓값 찾기
maximum = reduce(lambda x, y: x if x > y else y, numbers)

print(f"\n🔢 reduce 활용:")
print(f"리스트: {numbers}")
print(f"모든 수의 곱: {product}")
print(f"최댓값: {maximum}")

# 실용적인 reduce 예제 - 장바구니 총액
cart_items = [
    {"name": "사과", "price": 3000, "quantity": 2},
    {"name": "바나나", "price": 2000, "quantity": 3},
    {"name": "오렌지", "price": 4000, "quantity": 1}
]

total_amount = reduce(
    lambda total, item: total + (item["price"] * item["quantity"]),
    cart_items,
    0  # 초기값
)

print(f"\n🛒 장바구니 총액 계산:")
for item in cart_items:
    subtotal = item["price"] * item["quantity"]
    print(f"   {item['name']}: {item['price']:,}원 × {item['quantity']}개 = {subtotal:,}원")
print(f"   총액: {total_amount:,}원")
```

### 🎨 람다 함수의 고급 활용

```python
print("=== 🎨 람다 함수 고급 활용 ===")

# 1. 조건부 람다 (삼항 연산자)
grade_calculator = lambda score: "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"

scores = [95, 87, 76, 92, 68]
grades = list(map(grade_calculator, scores))

print(f"점수와 등급:")
for score, grade in zip(scores, grades):
    print(f"   {score}점 → {grade}등급")

# 2. 람다로 함수 팩토리 만들기
def create_operation(operation):
    """연산 함수를 생성하는 팩토리"""
    operations = {
        "add": lambda x, y: x + y,
        "subtract": lambda x, y: x - y,
        "multiply": lambda x, y: x * y,
        "divide": lambda x, y: x / y if y != 0 else "0으로 나눌 수 없음"
    }
    return operations.get(operation, lambda x, y: "지원하지 않는 연산")

# 동적으로 연산 함수 생성
add_func = create_operation("add")
multiply_func = create_operation("multiply")

print(f"\n🔧 동적 함수 생성:")
print(f"덧셈: {add_func(10, 5)}")
print(f"곱셈: {multiply_func(10, 5)}")

# 3. 복잡한 데이터 처리 파이프라인
sales_data = [
    {"product": "노트북", "price": 1200000, "quantity": 2, "discount": 0.1},
    {"product": "마우스", "price": 30000, "quantity": 5, "discount": 0.05},
    {"product": "키보드", "price": 80000, "quantity": 3, "discount": 0.15},
    {"product": "모니터", "price": 300000, "quantity": 1, "discount": 0.2}
]

# 파이프라인: 할인 적용 → 총액 계산 → 고액 주문만 필터링 → 정렬
processed_data = sorted(
    filter(
        lambda item: item["total"] >= 200000,  # 20만원 이상만
        map(
            lambda item: {
                **item,  # 기존 데이터 유지
                "discounted_price": item["price"] * (1 - item["discount"]),
                "total": item["price"] * (1 - item["discount"]) * item["quantity"]
            },
            sales_data
        )
    ),
    key=lambda item: item["total"],
    reverse=True
)

print(f"\n💼 매출 데이터 처리 파이프라인:")
print(f"조건: 할인 적용 후 총액 20만원 이상, 총액 내림차순")
for item in processed_data:
    print(f"   {item['product']}: "
          f"원가 {item['price']:,}원 → "
          f"할인가 {item['discounted_price']:,.0f}원 × {item['quantity']}개 = "
          f"총 {item['total']:,.0f}원")

# 4. 이벤트 핸들러 시뮬레이션
event_handlers = {
    "click": lambda element: f"'{element}' 클릭됨!",
    "hover": lambda element: f"'{element}'에 마우스 올림",
    "focus": lambda element: f"'{element}'에 포커스",
    "blur": lambda element: f"'{element}'에서 포커스 해제"
}

def simulate_events():
    """이벤트 시뮬레이션"""
    events = [
        ("click", "로그인 버튼"),
        ("hover", "메뉴 아이템"),
        ("focus", "이메일 입력창"),
        ("blur", "이메일 입력창")
    ]
    
    for event_type, element in events:
        handler = event_handlers.get(event_type, lambda e: f"알 수 없는 이벤트: {e}")
        result = handler(element)
        print(f"   {result}")

print(f"\n🖱️ 이벤트 핸들러 시뮬레이션:")
simulate_events()