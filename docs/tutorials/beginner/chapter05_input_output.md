# Chapter 5: 입력과 출력 완전 정복하기

## 📚 이 챕터에서 배울 내용
- print() 함수의 숨겨진 강력한 기능들 마스터하기
- input() 함수로 사용자와 자연스러운 대화 만들기
- 입력 데이터 검증과 안전한 타입 변환 기법
- 전문적인 출력 포맷팅으로 멋진 화면 구성하기
- 실무급 대화형 프로그램 개발 노하우

---

## 🎨 출력의 예술: print() 함수 완전 정복

### 💡 print()가 단순한 출력 함수라고 생각하셨나요?

Python의 `print()` 함수는 생각보다 훨씬 강력합니다! 단순히 텍스트를 화면에 보여주는 것을 넘어서, 아름다운 사용자 인터페이스를 만들 수 있는 도구입니다.

```python
# 기본 출력의 다양한 모습
print("=== Python 출력의 세계에 오신 것을 환영합니다! ===")

# 다양한 데이터 타입을 한 번에!
name = "김개발"
age = 25
height = 175.5
is_programmer = True
skills = ["Python", "JavaScript", "React"]

print(f"👤 이름: {name}")
print(f"🎂 나이: {age}세")
print(f"📏 키: {height}cm")
print(f"💻 개발자 여부: {is_programmer}")
print(f"🛠️ 보유 스킬: {skills}")
```

> 🌟 **놀라운 사실**: print() 함수는 어떤 Python 객체든 자동으로 문자열로 변환해서 출력할 수 있습니다!

### 🎯 여러 값을 한 번에 출력하는 마법

```python
print("=== 스마트한 다중 출력 ===")

# 기본 방식 - 공백으로 구분
name, age, city = "이코딩", 30, "서울"
print("이름:", name, "나이:", age, "도시:", city)

# 계산과 함께 출력하기
price = 25000
quantity = 3
discount = 0.1

print("상품 가격:", price, "수량:", quantity)
print("할인율:", discount * 100, "%")
print("최종 금액:", price * quantity * (1 - discount), "원")

# 실시간 데이터 출력 (시뮬레이션)
import random
temperature = round(random.uniform(20, 30), 1)
humidity = random.randint(40, 70)
print("🌡️ 현재 온도:", temperature, "°C", "💧 습도:", humidity, "%")
```

### 🎨 print() 함수의 숨겨진 슈퍼파워들

#### 🔗 sep 매개변수: 구분자의 마법사

```python
print("=== 구분자(sep)로 만드는 아름다운 출력 ===")

# 기본 구분자는 공백
fruits = ["사과", "바나나", "체리", "포도"]
print("과일 목록:", *fruits)

# 다양한 구분자로 스타일링
print("📋 메뉴:", *fruits, sep=" | ")
print("🏷️ 태그:", *fruits, sep=" #")
print("📁 경로:", "home", "user", "documents", "project", sep="/")

# 실용적인 활용 예제
print("\n=== 실생활 활용 ===")

# 날짜 포맷팅
year, month, day = 2024, 12, 25
print("📅 생일:", year, month, day, sep="-")
print("📅 미국식:", month, day, year, sep="/")

# 전화번호 포맷팅
area, exchange, number = "010", "1234", "5678"
print("📞 연락처:", area, exchange, number, sep="-")

# CSV 형태 데이터
print("📊 데이터:", "이름", "나이", "점수", sep=",")
print("📊 데이터:", "김민수", 25, 95, sep=",")

# 아스키 아트 만들기
print("⭐", "⭐", "⭐", "⭐", "⭐", sep="")
print("🎵", "🎶", "🎵", "🎶", "🎵", sep=" ~ ")
```

#### 🔚 end 매개변수: 줄바꿈의 마술사

```python
print("=== 끝 문자(end)로 만드는 동적 출력 ===")

# 기본 동작 확인
print("첫 번째 줄")
print("두 번째 줄")

print("\n--- 한 줄에 이어서 출력하기 ---")
print("안녕", end=" ")
print("하세요", end="! ")
print("Python", end=" 세계에 ")
print("오신 것을", end=" 환영합니다!")
print()  # 마지막에 줄바꿈

# 로딩 애니메이션 시뮬레이션
print("\n🔄 로딩 중", end="")
import time
for i in range(5):
    time.sleep(0.5)  # 0.5초 대기
    print(".", end="", flush=True)  # flush=True로 즉시 출력
print(" ✅ 완료!")

# 진행률 표시기
print("\n📊 작업 진행률:")
for progress in range(0, 101, 25):
    print(f"{progress}%", end=" → " if progress < 100 else " 🎉 완료!\n")

# 카운트다운
print("\n⏰ 카운트다운:", end=" ")
for i in range(5, 0, -1):
    print(i, end="... ")
    time.sleep(1)
print("🚀 발사!")
```

### 🌈 특수 문자로 만드는 아름다운 출력

```python
print("=== 특수 문자의 마법 ===")

# 줄바꿈(\n)으로 구조 만들기
print("🏢 회사 조직도")
print("CEO\n├── CTO\n│   ├── 개발팀장\n│   └── 인프라팀장\n└── CMO\n    └── 마케팅팀장")

# 탭(\t)으로 깔끔한 표 만들기
print("\n📊 월별 매출 현황")
print("월\t매출\t\t전년 대비")
print("-" * 30)
print("1월\t1,200만원\t\t+15%")
print("2월\t1,350만원\t\t+22%")
print("3월\t1,180만원\t\t+8%")

# 따옴표 출력하기
print("\n💬 대화 시뮬레이션")
print("고객: \"이 제품의 가격이 얼마인가요?\"")
print("직원: '정가는 50,000원이지만, 오늘 특가로 40,000원입니다!'")

# 백슬래시 출력 (파일 경로)
print("\n📁 시스템 경로")
print("Windows: C:\\Users\\김개발\\Documents\\Python\\")
print("Mac/Linux: /Users/김개발/Documents/Python/")

# 실전 예제: 멋진 영수증 만들기
print("\n" + "=" * 40)
print("           🏪 파이썬 마트")
print("=" * 40)
print("구매일시: 2024-12-25 14:30:25")
print("-" * 40)
print("상품명\t\t수량\t단가\t금액")
print("-" * 40)
print("🍎 사과\t\t2개\t2,000\t4,000원")
print("🍌 바나나\t\t1송이\t3,500\t3,500원")
print("🥛 우유\t\t1개\t2,800\t2,800원")
print("-" * 40)
print("소계\t\t\t\t10,300원")
print("할인\t\t\t\t-1,030원")
print("=" * 40)
print("💰 총 결제금액\t\t\t9,270원")
print("💳 결제방법: 신용카드")
print("=" * 40)
print("      🙏 이용해 주셔서 감사합니다!")
```

---

## 📥 입력의 마법: input() 함수로 대화하기

### 💡 사용자와 자연스럽게 대화하는 방법

`input()` 함수는 단순히 데이터를 받는 것이 아니라, 사용자와 **대화**를 만드는 도구입니다. 친근하고 직관적인 메시지로 사용자 경험을 향상시킬 수 있습니다.

```python
print("=== 친근한 사용자 인터페이스 만들기 ===")

# 기본적이지만 친근한 입력
print("🎉 Python 학습자 등록 시스템에 오신 것을 환영합니다!")
name = input("👤 성함을 알려주세요: ")
print(f"안녕하세요, {name}님! 반갑습니다! 🤗")

# 단계별 정보 수집
age = input("🎂 나이를 입력해주세요: ")
city = input("🏙️ 어느 도시에 거주하시나요: ")
experience = input("💻 프로그래밍 경험이 있으신가요? (있음/없음): ")

# 수집된 정보로 개인화된 응답
print(f"\n📋 {name}님의 프로필이 생성되었습니다!")
print(f"   나이: {age}세")
print(f"   거주지: {city}")
print(f"   프로그래밍 경험: {experience}")

if experience == "없음":
    print("🌱 프로그래밍이 처음이시군요! 천천히 함께 배워봅시다!")
else:
    print("🚀 경험이 있으시니 더 빠르게 진행할 수 있겠네요!")
```

### ⚠️ input() 함수의 핵심 비밀

```python
print("=== input() 함수의 중요한 특징 ===")

# 🔍 모든 입력은 문자열(str)입니다!
user_input = input("🔢 좋아하는 숫자를 입력하세요: ")
print(f"입력하신 값: '{user_input}'")
print(f"데이터 타입: {type(user_input)}")
print(f"길이: {len(user_input)}글자")

# ❌ 이렇게 하면 오류가 발생합니다!
try:
    # result = user_input + 10  # TypeError 발생!
    pass
except TypeError as e:
    print(f"❌ 오류: {e}")

# ✅ 올바른 방법: 타입 변환 후 사용
try:
    number = int(user_input)
    result = number + 10
    print(f"✅ 계산 결과: {user_input} + 10 = {result}")
except ValueError:
    print("❌ 숫자가 아닌 값을 입력하셨습니다!")
```

### 🔄 안전한 입력 데이터 변환 기법

#### 🔢 정수 변환 마스터하기

```python
print("=== 안전한 정수 입력 처리 ===")

def get_safe_integer(prompt, min_value=None, max_value=None):
    """안전하게 정수를 입력받는 함수"""
    while True:
        try:
            value = int(input(prompt))
            
            # 범위 검사
            if min_value is not None and value < min_value:
                print(f"❌ {min_value} 이상의 값을 입력해주세요!")
                continue
            if max_value is not None and value > max_value:
                print(f"❌ {max_value} 이하의 값을 입력해주세요!")
                continue
                
            return value
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")

# 실제 사용 예제
print("🎮 게임 캐릭터 생성")
age = get_safe_integer("🎂 캐릭터 나이 (1-100): ", 1, 100)
level = get_safe_integer("⭐ 시작 레벨 (1-10): ", 1, 10)

print(f"\n✅ 캐릭터 생성 완료!")
print(f"   나이: {age}세")
print(f"   레벨: {level}")
```

#### 💰 실수 변환과 검증

```python
print("=== 실수 입력 처리 및 검증 ===")

def get_safe_float(prompt, min_value=None, max_value=None):
    """안전하게 실수를 입력받는 함수"""
    while True:
        try:
            value = float(input(prompt))
            
            if min_value is not None and value < min_value:
                print(f"❌ {min_value} 이상의 값을 입력해주세요!")
                continue
            if max_value is not None and value > max_value:
                print(f"❌ {max_value} 이하의 값을 입력해주세요!")
                continue
                
            return value
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")

# 실용적인 예제: 쇼핑몰 주문 시스템
print("🛒 온라인 쇼핑몰 주문")
product_name = input("📦 상품명: ")
price = get_safe_float("💰 상품 가격 (원): ", 0)
quantity = get_safe_integer("📊 수량: ", 1)

subtotal = price * quantity
print(f"\n📋 주문 내역")
print(f"상품: {product_name}")
print(f"단가: {price:,.0f}원")
print(f"수량: {quantity}개")
print(f"소계: {subtotal:,.0f}원")

# 할인 적용
discount_rate = get_safe_float("🎁 할인율 (0-50%): ", 0, 50) / 100
discount_amount = subtotal * discount_rate
final_amount = subtotal - discount_amount

print(f"할인: -{discount_amount:,.0f}원 ({discount_rate*100:.0f}%)")
print(f"💳 최종 결제금액: {final_amount:,.0f}원")
```

#### ✅ 불린 값과 선택 입력

```python
print("=== 불린 값과 선택 입력 처리 ===")

def get_yes_no(prompt):
    """예/아니오 입력을 받는 함수"""
    while True:
        answer = input(f"{prompt} (y/n): ").lower().strip()
        if answer in ['y', 'yes', '예', '네']:
            return True
        elif answer in ['n', 'no', '아니오', '아니요']:
            return False
        else:
            print("❌ 'y' 또는 'n'으로 답해주세요!")

def get_choice(prompt, choices):
    """선택지에서 하나를 고르는 함수"""
    print(prompt)
    for i, choice in enumerate(choices, 1):
        print(f"  {i}. {choice}")
    
    while True:
        try:
            choice_num = int(input("선택 (번호 입력): "))
            if 1 <= choice_num <= len(choices):
                return choices[choice_num - 1]
            else:
                print(f"❌ 1부터 {len(choices)} 사이의 번호를 입력해주세요!")
        except ValueError:
            print("❌ 올바른 번호를 입력해주세요!")

# 실제 활용 예제: 카페 주문 시스템
print("☕ 파이썬 카페 주문 시스템")
print("=" * 30)

# 음료 선택
drinks = ["아메리카노", "카페라떼", "카푸치노", "에스프레소"]
selected_drink = get_choice("🥤 음료를 선택해주세요:", drinks)

# 사이즈 선택
sizes = ["Small", "Medium", "Large"]
selected_size = get_choice("📏 사이즈를 선택해주세요:", sizes)

# 추가 옵션
extra_shot = get_yes_no("☕ 샷 추가하시겠습니까?")
takeout = get_yes_no("🥤 테이크아웃 하시겠습니까?")

# 주문 확인
print(f"\n📋 주문 확인")
print(f"음료: {selected_drink} ({selected_size})")
print(f"샷 추가: {'예' if extra_shot else '아니오'}")
print(f"포장: {'테이크아웃' if takeout else '매장 이용'}")

confirm = get_yes_no("주문을 확정하시겠습니까?")
if confirm:
    print("✅ 주문이 접수되었습니다! 잠시만 기다려주세요 ☕")
else:
    print("❌ 주문이 취소되었습니다.")
```

---

## 🎯 실습: 종합 회원가입 시스템

### 📝 실습 과제
지금까지 배운 입력과 출력 기능을 모두 활용하여 실무급 회원가입 시스템을 만들어보세요.

```python
# Comprehensive User Registration System
import re
from datetime import datetime

def display_welcome():
    """환영 메시지 출력"""
    print("=" * 50)
    print("        🎉 파이썬 학습 플랫폼")
    print("           회원가입 시스템")
    print("=" * 50)
    print("새로운 학습 여정을 시작해보세요! 🚀")
    print()

def get_username():
    """사용자명 입력 및 검증"""
    while True:
        username = input("👤 사용자명 (3-20자, 영문/숫자): ").strip()
        
        if len(username) < 3:
            print("❌ 사용자명은 3자 이상이어야 합니다!")
        elif len(username) > 20:
            print("❌ 사용자명은 20자 이하여야 합니다!")
        elif not username.isalnum():
            print("❌ 사용자명은 영문과 숫자만 사용 가능합니다!")
        else:
            return username

def get_email():
    """이메일 입력 및 검증"""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    while True:
        email = input("📧 이메일 주소: ").strip().lower()
        
        if re.match(email_pattern, email):
            return email
        else:
            print("❌ 올바른 이메일 형식을 입력해주세요! (예: user@example.com)")

def get_password():
    """비밀번호 입력 및 검증"""
    while True:
        password = input("🔒 비밀번호 (8자 이상): ")
        
        if len(password) < 8:
            print("❌ 비밀번호는 8자 이상이어야 합니다!")
            continue
        
        # 비밀번호 강도 검사
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        
        strength_score = sum([has_upper, has_lower, has_digit])
        
        if strength_score < 2:
            print("❌ 비밀번호는 대문자, 소문자, 숫자 중 최소 2가지를 포함해야 합니다!")
            continue
        
        # 비밀번호 확인
        confirm_password = input("🔒 비밀번호 확인: ")
        if password != confirm_password:
            print("❌ 비밀번호가 일치하지 않습니다!")
            continue
        
        return password

def get_birth_date():
    """생년월일 입력 및 검증"""
    while True:
        try:
            birth_str = input("🎂 생년월일 (YYYY-MM-DD): ")
            birth_date = datetime.strptime(birth_str, "%Y-%m-%d")
            
            # 나이 계산
            today = datetime.now()
            age = today.year - birth_date.year
            if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
                age -= 1
            
            if age < 14:
                print("❌ 14세 이상만 가입 가능합니다!")
                continue
            elif age > 120:
                print("❌ 올바른 생년월일을 입력해주세요!")
                continue
            
            return birth_date, age
        
        except ValueError:
            print("❌ 올바른 날짜 형식을 입력해주세요! (예: 1990-01-01)")

def get_interests():
    """관심 분야 선택"""
    interests_list = [
        "웹 개발", "데이터 사이언스", "인공지능", "모바일 앱 개발",
        "게임 개발", "사이버 보안", "클라우드", "DevOps"
    ]
    
    print("\n🎯 관심 분야를 선택해주세요 (여러 개 선택 가능):")
    for i, interest in enumerate(interests_list, 1):
        print(f"  {i}. {interest}")
    
    selected_interests = []
    while True:
        choice = input("\n선택할 번호 입력 (완료하려면 'done' 입력): ").strip()
        
        if choice.lower() == 'done':
            if selected_interests:
                return selected_interests
            else:
                print("❌ 최소 하나의 관심 분야를 선택해주세요!")
                continue
        
        try:
            choice_num = int(choice)
            if 1 <= choice_num <= len(interests_list):
                interest = interests_list[choice_num - 1]
                if interest not in selected_interests:
                    selected_interests.append(interest)
                    print(f"✅ '{interest}' 추가됨")
                else:
                    print(f"⚠️ '{interest}'는 이미 선택되었습니다!")
            else:
                print(f"❌ 1부터 {len(interests_list)} 사이의 번호를 입력해주세요!")
        except ValueError:
            print("❌ 올바른 번호를 입력하거나 'done'을 입력해주세요!")

def display_summary(user_data):
    """가입 정보 요약 출력"""
    print("\n" + "=" * 50)
    print("           📋 가입 정보 확인")
    print("=" * 50)
    print(f"👤 사용자명: {user_data['username']}")
    print(f"📧 이메일: {user_data['email']}")
    print(f"🎂 생년월일: {user_data['birth_date'].strftime('%Y년 %m월 %d일')}")
    print(f"📅 나이: {user_data['age']}세")
    print(f"🎯 관심 분야:")
    for interest in user_data['interests']:
        print(f"   • {interest}")
    print("=" * 50)

def main():
    """메인 회원가입 프로세스"""
    display_welcome()
    
    # 단계별 정보 수집
    print("📝 1단계: 기본 정보 입력")
    username = get_username()
    email = get_email()
    
    print(f"\n✅ 안녕하세요, {username}님!")
    
    print("\n🔐 2단계: 보안 설정")
    password = get_password()
    
    print("\n📅 3단계: 개인 정보")
    birth_date, age = get_birth_date()
    
    print("\n🎯 4단계: 관심 분야 설정")
    interests = get_interests()
    
    # 정보 수집 완료
    user_data = {
        'username': username,
        'email': email,
        'password': password,  # 실제로는 해시화해야 함
        'birth_date': birth_date,
        'age': age,
        'interests': interests,
        'registration_date': datetime.now()
    }
    
    # 최종 확인
    display_summary(user_data)
    
    while True:
        confirm = input("\n✅ 위 정보로 가입하시겠습니까? (y/n): ").lower().strip()
        if confirm in ['y', 'yes', '예', '네']:
            print("\n🎉 회원가입이 완료되었습니다!")
            print(f"환영합니다, {username}님! 즐거운 학습 되세요! 🚀")
            
            # 가입 완료 영수증
            print("\n" + "=" * 50)
            print("           🎫 가입 완료 영수증")
            print("=" * 50)
            print(f"가입일시: {user_data['registration_date'].strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"회원번호: PY{user_data['registration_date'].strftime('%Y%m%d')}{hash(username) % 10000:04d}")
            print("=" * 50)
            break
        elif confirm in ['n', 'no', '아니오', '아니요']:
            print("❌ 가입이 취소되었습니다.")
            break
        else:
            print("❌ 'y' 또는 'n'으로 답해주세요!")

# 프로그램 실행
if __name__ == "__main__":
    main()
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 개인 예산 관리 시스템
```python
def budget_manager():
    """개인 예산 관리 시스템"""
    print("💰 개인 예산 관리 시스템")
    print("=" * 30)
    
    # 월 수입 입력
    monthly_income = get_safe_float("💵 월 수입을 입력하세요: ", 0)
    
    # 지출 카테고리별 예산 설정
    categories = ["식비", "교통비", "주거비", "통신비", "여가비", "기타"]
    budget = {}
    total_budget = 0
    
    print("\n📊 카테고리별 예산을 설정해주세요:")
    for category in categories:
        amount = get_safe_float(f"{category}: ", 0)
        budget[category] = amount
        total_budget += amount
    
    # 예산 분석
    remaining = monthly_income - total_budget
    
    print(f"\n📋 예산 분석 결과")
    print(f"월 수입: {monthly_income:,.0f}원")
    print(f"총 예산: {total_budget:,.0f}원")
    print(f"잔여 금액: {remaining:,.0f}원")
    
    if remaining < 0:
        print("⚠️ 예산이 수입을 초과했습니다!")
    else:
        print("✅ 건전한 예산 계획입니다!")

# budget_manager()  # 주석 해제하여 실행
```

### 🚀 심화 과제: 퀴즈 게임 시스템
```python
def quiz_game():
    """대화형 퀴즈 게임"""
    questions = [
        {
            "question": "Python의 창시자는 누구인가요?",
            "choices": ["귀도 반 로섬", "제임스 고슬링", "브렌던 아이크", "리누스 토르발스"],
            "answer": 0
        },
        {
            "question": "Python에서 주석을 나타내는 기호는?",
            "choices": ["//", "#", "/*", "--"],
            "answer": 1
        },
        {
            "question": "Python의 기본 데이터 타입이 아닌 것은?",
            "choices": ["int", "str", "bool", "char"],
            "answer": 3
        }
    ]
    
    print("🧠 Python 퀴즈 게임")
    print("=" * 25)
    
    score = 0
    for i, q in enumerate(questions, 1):
        print(f"\n❓ 문제 {i}: {q['question']}")
        for j, choice in enumerate(q['choices'], 1):
            print(f"  {j}. {choice}")
        
        answer = get_safe_integer("정답 번호: ", 1, 4) - 1
        
        if answer == q['answer']:
            print("✅ 정답입니다!")
            score += 1
        else:
            print(f"❌ 틀렸습니다. 정답: {q['choices'][q['answer']]}")
    
    print(f"\n🎯 최종 점수: {score}/{len(questions)}")
    if score == len(questions):
        print("🏆 완벽합니다!")
    elif score >= len(questions) * 0.7:
        print("👍 잘했습니다!")
    else:
        print("📚 더 공부해보세요!")

# quiz_game()  # 주석 해제하여 실행
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- print() 함수의 고급 매개변수 (sep, end) 활용
- input() 함수로 안전한 사용자 입력 처리
- 입력 데이터의 타입 변환과 검증 기법
- 특수 문자를 활용한 아름다운 출력 포맷팅
- 실무급 대화형 프로그램 개발 패턴

✅ **핵심 개념**
- **print()**: `sep`, `end`, `flush` 매개변수
- **input()**: 항상 문자열 반환, 타입 변환 필요
- **검증**: 사용자 입력의 유효성 검사
- **예외 처리**: `try-except`로 안전한 입력 처리

✅ **실무 팁**
- 사용자 친화적인 메시지 작성하기
- 입력 검증으로 프로그램 안정성 확보하기
- 시각적 요소로 사용자 경험 향상시키기
- 단계별 진행으로 복잡한 입력 과정 단순화하기

🎯 **다음 챕터 예고**
다음 챕터에서는 조건문(if, elif, else)을 배워보겠습니다. 프로그램이 상황에 따라 다른 동작을 하도록 만드는 핵심 기능을 마스터해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: input()으로 받은 숫자를 바로 계산에 사용할 수 없나요?**
A: input()은 항상 문자열을 반환하므로 int()나 float()로 변환해야 합니다. 예: `age = int(input("나이: "))`

**Q: print()에서 여러 값을 출력할 때 구분자를 없애려면?**
A: `sep=""` 매개변수를 사용하세요. 예: `print("a", "b", "c", sep="")`

**Q: 사용자가 잘못된 값을 입력했을 때 어떻게 처리하나요?**
A: `try-except` 구문을 사용하여 예외를 처리하고, while 루프로 올바른 값을 입력받을 때까지 반복하세요.

**Q: 비밀번호 입력 시 화면에 표시되지 않게 하려면?**
A: `getpass` 모듈의 `getpass()` 함수를 사용하세요. 예: `import getpass; password = getpass.getpass("비밀번호: ")`

**Q: 한 줄에 여러 값을 입력받으려면?**
A: `split()` 메서드를 사용하세요. 예: `a, b = input("두 수: ").split()`
