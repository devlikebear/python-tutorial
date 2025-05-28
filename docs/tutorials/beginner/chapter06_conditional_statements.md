# Chapter 6: 조건문으로 똑똑한 프로그램 만들기

## 📚 이 챕터에서 배울 내용
- if, elif, else로 프로그램이 스스로 판단하게 만들기
- 다양한 조건 표현식으로 정교한 로직 구성하기
- 중첩 조건문으로 복잡한 상황 처리하기
- 논리 연산자로 여러 조건을 조합하기
- 실무에서 바로 쓸 수 있는 조건문 패턴 마스터하기

---

## 🤔 조건문이란? 프로그램의 두뇌 만들기

### 💡 일상 속 조건문의 예

우리는 매일 수많은 조건부 판단을 합니다:
- "비가 오면 우산을 가져간다"
- "시험 점수가 80점 이상이면 합격이다"
- "나이가 18세 이상이면 성인이다"

Python의 조건문은 바로 이런 **"만약 ~라면 ~한다"**의 논리를 코드로 표현하는 방법입니다!

```python
# 실생활 조건문을 Python으로!
weather = "비"

if weather == "비":
    print("☔ 우산을 챙기세요!")
    print("🚗 대중교통을 이용하는 것이 좋겠어요.")
else:
    print("☀️ 좋은 날씨네요!")
    print("🚶‍♂️ 산책하기 좋은 날입니다.")

print("🏠 안전하게 다녀오세요!")
```

> 🌟 **핵심 포인트**: 조건문은 프로그램이 상황에 따라 **다른 행동**을 할 수 있게 해주는 마법의 도구입니다!

### 🏗️ 조건문의 기본 구조

```python
if 조건식:
    # 조건이 참(True)일 때 실행
    print("조건이 맞습니다!")
elif 다른_조건식:  # 추가 조건 (선택사항)
    print("다른 조건이 맞습니다!")
else:  # 모든 조건이 거짓일 때 (선택사항)
    print("어떤 조건도 맞지 않습니다!")
```

### ⚠️ 문법 주의사항

| 요소 | 설명 | 예시 |
|------|------|------|
| **콜론(:)** | if, elif, else 뒤에 반드시 필요 | `if age >= 18:` |
| **들여쓰기** | 조건문 내부 코드는 4칸 공백 | `    print("성인")` |
| **블록** | 같은 들여쓰기 = 같은 블록 | 모든 내부 코드 동일 들여쓰기 |

---

## 🎯 기본 if문: 첫 번째 조건 판단

### 💫 단순 if문으로 시작하기

```python
print("=== 🎓 대학 입학 자격 검사 ===")

# 수능 점수 입력
score = int(input("📝 수능 점수를 입력하세요: "))

# 기본 조건 확인
if score >= 300:
    print("🎉 축하합니다! 대학 입학 자격을 충족했습니다!")
    print("📚 원하는 대학에 지원해보세요!")
    print("💪 열심히 공부한 결과네요!")

print("📊 점수 확인이 완료되었습니다.")
print(f"입력하신 점수: {score}점")
```

### 🔄 if-else문: 양자택일의 지혜

```python
print("=== 🌡️ 스마트 온도 조절 시스템 ===")

temperature = float(input("현재 온도를 입력하세요 (°C): "))

if temperature > 28:
    print("🔥 더운 날씨입니다!")
    print("❄️ 에어컨을 켜는 것을 권장합니다.")
    print("💧 충분한 수분 섭취를 하세요.")
    action = "에어컨 가동"
else:
    print("😊 쾌적한 날씨입니다!")
    print("🌿 자연 바람으로도 충분해요.")
    print("🚶‍♂️ 야외 활동하기 좋은 날씨네요.")
    action = "자연 환기"

print(f"\n📋 권장 조치: {action}")
print(f"🌡️ 현재 온도: {temperature}°C")
```

### 🎨 다양한 조건 표현식 마스터하기

```python
print("=== 🔍 다양한 조건 검사 예제 ===")

# 1. 숫자 비교
age = 25
if age >= 20:
    print(f"✅ {age}세는 성인입니다.")

# 2. 문자열 정확히 일치
username = "admin"
if username == "admin":
    print("🔑 관리자 권한으로 로그인했습니다.")

# 3. 문자열 포함 여부
email = "user@gmail.com"
if "@gmail.com" in email:
    print("📧 Gmail 계정을 사용하고 계시네요!")

# 4. 리스트 길이 확인
shopping_cart = ["사과", "바나나", "우유", "빵"]
if len(shopping_cart) > 3:
    print(f"🛒 장바구니에 {len(shopping_cart)}개 상품이 있습니다. 할인 혜택을 받으세요!")

# 5. 불린 값 직접 확인
is_premium_member = True
if is_premium_member:
    print("⭐ 프리미엄 회원 혜택을 이용하실 수 있습니다!")

# 6. 빈 값 확인
user_input = ""
if not user_input:  # 빈 문자열은 False
    print("⚠️ 입력값이 비어있습니다!")

# 7. 리스트 멤버십 확인
favorite_colors = ["빨강", "파랑", "초록"]
user_color = "파랑"
if user_color in favorite_colors:
    print(f"🎨 {user_color}은 인기 있는 색상입니다!")
```

---

## 🌈 elif문: 다중 조건의 마법사

### 💡 elif가 필요한 이유

여러 조건을 체크할 때 if문만 사용하면 비효율적입니다:

```python
# ❌ 비효율적인 방법
score = 85

if score >= 90:
    grade = "A"
if score >= 80 and score < 90:  # 복잡하고 중복적
    grade = "B"
if score >= 70 and score < 80:
    grade = "C"
# ... 계속 복잡해짐

# ✅ elif를 사용한 깔끔한 방법
if score >= 90:
    grade = "A"
elif score >= 80:  # 이미 90 이상은 위에서 처리됨
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
```

### 🎓 성적 관리 시스템

```python
print("=== 📊 스마트 성적 관리 시스템 ===")

student_name = input("👤 학생 이름: ")
score = int(input("📝 점수 입력 (0-100): "))

# 성적 등급 계산
if score >= 95:
    grade = "A+"
    comment = "🏆 최우수! 완벽한 성과입니다!"
    scholarship = "전액 장학금 대상"
elif score >= 90:
    grade = "A"
    comment = "🌟 우수! 훌륭한 성과입니다!"
    scholarship = "부분 장학금 대상"
elif score >= 85:
    grade = "B+"
    comment = "👍 양호! 조금만 더 노력하면 A등급!"
    scholarship = "성적 장려금 대상"
elif score >= 80:
    grade = "B"
    comment = "😊 보통! 꾸준히 노력하고 있어요!"
    scholarship = "해당 없음"
elif score >= 70:
    grade = "C"
    comment = "📚 더 노력이 필요해요!"
    scholarship = "해당 없음"
elif score >= 60:
    grade = "D"
    comment = "⚠️ 기초 실력 보강이 필요합니다!"
    scholarship = "학습 지원 프로그램 추천"
else:
    grade = "F"
    comment = "❌ 재시험이 필요합니다!"
    scholarship = "보충 수업 필수"

# 결과 출력
print(f"\n📋 {student_name}님의 성적표")
print("=" * 40)
print(f"📊 점수: {score}점")
print(f"🎯 등급: {grade}")
print(f"💬 평가: {comment}")
print(f"🎁 혜택: {scholarship}")
print("=" * 40)
```

### 🌍 계절 판별 시스템

```python
print("=== 🌸 지능형 계절 판별 시스템 ===")

month = int(input("📅 월을 입력하세요 (1-12): "))

if month in [12, 1, 2]:
    season = "겨울 ❄️"
    activity = "스키, 눈사람 만들기"
    clothing = "패딩, 목도리, 장갑"
    temperature = "영하 ~ 5°C"
elif month in [3, 4, 5]:
    season = "봄 🌸"
    activity = "벚꽃 구경, 피크닉"
    clothing = "가디건, 얇은 재킷"
    temperature = "10°C ~ 20°C"
elif month in [6, 7, 8]:
    season = "여름 ☀️"
    activity = "수영, 해수욕, 캠핑"
    clothing = "반팔, 반바지, 선글라스"
    temperature = "25°C ~ 35°C"
elif month in [9, 10, 11]:
    season = "가을 🍂"
    activity = "단풍 구경, 등산"
    clothing = "긴팔, 얇은 코트"
    temperature = "15°C ~ 25°C"
else:
    season = "잘못된 입력"
    activity = "올바른 월(1-12)을 입력해주세요"
    clothing = "-"
    temperature = "-"

if month >= 1 and month <= 12:
    print(f"\n🗓️ {month}월 정보")
    print("=" * 30)
    print(f"🌿 계절: {season}")
    print(f"🎯 추천 활동: {activity}")
    print(f"👕 권장 복장: {clothing}")
    print(f"🌡️ 평균 기온: {temperature}")
else:
    print("❌ 1부터 12 사이의 월을 입력해주세요!")
```

### 🍕 스마트 주문 시스템

```python
print("=== 🍕 파이썬 피자 주문 시스템 ===")
print("🍕 메뉴")
print("1. 마르게리타 - 15,000원")
print("2. 페퍼로니 - 18,000원") 
print("3. 하와이안 - 20,000원")
print("4. 슈프림 - 25,000원")
print("5. 시카고 딥디쉬 - 30,000원")

choice = input("\n🔢 메뉴 번호를 선택하세요 (1-5): ")

if choice == "1":
    pizza = "마르게리타"
    price = 15000
    description = "🧀 신선한 모짜렐라와 바질의 클래식한 조합"
    cooking_time = "15분"
elif choice == "2":
    pizza = "페퍼로니"
    price = 18000
    description = "🌶️ 매콤한 페퍼로니가 가득한 인기 메뉴"
    cooking_time = "18분"
elif choice == "3":
    pizza = "하와이안"
    price = 20000
    description = "🍍 파인애플과 햄의 달콤짭짤한 하모니"
    cooking_time = "20분"
elif choice == "4":
    pizza = "슈프림"
    price = 25000
    description = "🥓 다양한 토핑이 올라간 풍성한 피자"
    cooking_time = "25분"
elif choice == "5":
    pizza = "시카고 딥디쉬"
    price = 30000
    description = "🏙️ 두꺼운 도우의 시카고 스타일 피자"
    cooking_time = "35분"
else:
    pizza = None
    price = 0
    description = "잘못된 선택입니다."
    cooking_time = "0분"

if pizza:
    print(f"\n📋 주문 확인")
    print("=" * 40)
    print(f"🍕 선택한 피자: {pizza}")
    print(f"💰 가격: {price:,}원")
    print(f"📝 설명: {description}")
    print(f"⏰ 예상 조리 시간: {cooking_time}")
    print("=" * 40)
    
    # 할인 혜택 확인
    if price >= 25000:
        discount = price * 0.1
        final_price = price - discount
        print(f"🎁 25,000원 이상 주문 시 10% 할인!")
        print(f"💸 할인 금액: {discount:,.0f}원")
        print(f"💳 최종 결제 금액: {final_price:,.0f}원")
    else:
        print("💡 25,000원 이상 주문 시 10% 할인 혜택이 있어요!")
        
    print("\n🚚 주문이 접수되었습니다. 맛있게 드세요!")
else:
    print("❌ 올바른 메뉴 번호(1-5)를 선택해주세요!")
```

---

## 🏗️ 중첩 조건문: 복잡한 로직의 마스터

### 💡 중첩 조건문이 필요한 상황

실제 세상의 조건들은 종종 여러 단계로 나뉩니다:
- "18세 이상이면서 동시에 학생이면 학생 할인"
- "비가 오는데 우산이 없으면 실내에 머물기"
- "VIP 회원이면서 구매 금액이 10만원 이상이면 무료배송"

```python
print("=== 🎬 영화관 입장 시스템 ===")

age = int(input("👤 나이를 입력하세요: "))
is_student = input("🎓 학생이신가요? (y/n): ").lower() == 'y'
movie_rating = input("🎭 관람하려는 영화 등급 (전체/12세/15세/청불): ")

print(f"\n🎫 입장 심사 결과")
print("=" * 30)

if age >= 18:
    print("✅ 성인 인증 완료")
    
    if movie_rating == "청불":
        print("🔞 청소년 관람불가 영화 관람 가능")
        ticket_price = 12000
    else:
        print("🎬 모든 등급 영화 관람 가능")
        ticket_price = 12000
    
    # 학생 할인 적용
    if is_student:
        print("🎓 학생 할인 20% 적용")
        ticket_price = int(ticket_price * 0.8)
        
elif age >= 15:
    print("✅ 청소년 인증 완료")
    
    if movie_rating == "청불":
        print("❌ 청소년 관람불가 영화는 관람할 수 없습니다")
        ticket_price = 0
    else:
        print("🎬 15세 이상 관람가 영화 관람 가능")
        ticket_price = 10000
        
elif age >= 12:
    print("✅ 어린이 인증 완료")
    
    if movie_rating in ["청불", "15세"]:
        print("❌ 연령 제한으로 관람할 수 없습니다")
        ticket_price = 0
    else:
        print("🎬 12세 이상 관람가 영화 관람 가능")
        ticket_price = 8000
        
else:
    print("✅ 유아 인증 완료")
    
    if movie_rating == "전체":
        print("🎬 전체 관람가 영화만 관람 가능")
        ticket_price = 6000
    else:
        print("❌ 연령 제한으로 관람할 수 없습니다")
        ticket_price = 0

# 최종 결과
if ticket_price > 0:
    print(f"\n💳 티켓 가격: {ticket_price:,}원")
    print("🍿 즐거운 영화 관람 되세요!")
else:
    print("\n❌ 입장이 불가능합니다.")
    print("📅 다른 영화를 선택해주세요.")
```

### 🏪 스마트 쇼핑몰 할인 시스템

```python
print("=== 🛒 스마트 쇼핑몰 할인 시스템 ===")

# 고객 정보 입력
is_member = input("🎫 회원이신가요? (y/n): ").lower() == 'y'
purchase_amount = int(input("💰 구매 금액을 입력하세요: "))
is_first_purchase = input("🎁 첫 구매인가요? (y/n): ").lower() == 'y'

print(f"\n🧾 할인 혜택 계산")
print("=" * 35)

total_discount = 0
discount_reasons = []

# 회원 할인
if is_member:
    print("✅ 회원 할인 적용 가능")
    
    if purchase_amount >= 100000:
        member_discount = purchase_amount * 0.15  # 15% 할인
        print("🌟 VIP 회원 할인 15% 적용")
        discount_reasons.append("VIP 회원 할인 15%")
    elif purchase_amount >= 50000:
        member_discount = purchase_amount * 0.10  # 10% 할인
        print("⭐ 일반 회원 할인 10% 적용")
        discount_reasons.append("일반 회원 할인 10%")
    else:
        member_discount = purchase_amount * 0.05  # 5% 할인
        print("💫 기본 회원 할인 5% 적용")
        discount_reasons.append("기본 회원 할인 5%")
    
    total_discount += member_discount
    
else:
    print("ℹ️ 비회원 구매")
    member_discount = 0

# 첫 구매 할인
if is_first_purchase:
    first_purchase_discount = min(purchase_amount * 0.1, 10000)  # 최대 1만원
    print(f"🎉 첫 구매 할인 {first_purchase_discount:,.0f}원 적용")
    total_discount += first_purchase_discount
    discount_reasons.append(f"첫 구매 할인 {first_purchase_discount:,.0f}원")

# 대량 구매 할인
if purchase_amount >= 200000:
    bulk_discount = 20000  # 2만원 추가 할인
    print("📦 대량 구매 할인 20,000원 추가 적용")
    total_discount += bulk_discount
    discount_reasons.append("대량 구매 할인 20,000원")

# 무료배송 확인
if is_member and purchase_amount >= 30000:
    free_shipping = True
    shipping_cost = 0
    print("🚚 회원 무료배송 적용")
elif purchase_amount >= 50000:
    free_shipping = True
    shipping_cost = 0
    print("🚚 5만원 이상 무료배송 적용")
else:
    free_shipping = False
    shipping_cost = 3000
    print("📦 배송비 3,000원")

# 최종 계산
final_amount = purchase_amount - total_discount + shipping_cost

print(f"\n💳 최종 결제 내역")
print("=" * 35)
print(f"🛍️ 상품 금액: {purchase_amount:,}원")

if discount_reasons:
    print("🎁 적용된 할인:")
    for reason in discount_reasons:
        print(f"   • {reason}")
    print(f"💸 총 할인 금액: -{total_discount:,.0f}원")

if not free_shipping:
    print(f"📦 배송비: +{shipping_cost:,}원")

print("=" * 35)
print(f"💰 최종 결제 금액: {final_amount:,}원")

if total_discount > 0:
    savings_rate = (total_discount / purchase_amount) * 100
    print(f"🎉 {total_discount:,.0f}원 절약! ({savings_rate:.1f}% 할인)")
```

---

## 🧠 논리 연산자와 조건문의 조합

### 🔗 and, or, not 연산자 마스터하기

```python
print("=== 🎯 대학 입학 자격 심사 시스템 ===")

# 지원자 정보 입력
korean = int(input("📚 국어 점수: "))
math = int(input("🔢 수학 점수: "))
english = int(input("🌍 영어 점수: "))
science = int(input("🔬 과학 점수: "))

total_score = korean + math + english + science
average = total_score / 4

print(f"\n📊 성적 분석")
print("=" * 30)
print(f"총점: {total_score}점")
print(f"평균: {average:.1f}점")

# 복합 조건으로 합격 여부 판단
if average >= 80 and korean >= 70 and math >= 70:
    print("🎉 1차 합격! 우수한 성적입니다!")
    
    # 추가 조건 확인
    if english >= 85 or science >= 85:
        print("⭐ 특별 장학생 후보입니다!")
        scholarship = "특별 장학금"
    elif average >= 90:
        print("🌟 우등 장학생 후보입니다!")
        scholarship = "우등 장학금"
    else:
        print("💫 일반 합격입니다!")
        scholarship = "해당 없음"
        
elif average >= 70 and not (korean < 60 or math < 60):
    print("✅ 조건부 합격! 보충 수업 이수 필요")
    scholarship = "해당 없음"
    
elif total_score >= 280:
    print("⚠️ 재심사 대상 - 개별 과목 점수 확인 필요")
    scholarship = "해당 없음"
    
else:
    print("❌ 불합격 - 재시험 기회 제공")
    scholarship = "해당 없음"

print(f"🎁 장학금: {scholarship}")
```

### 🌦️ 스마트 날씨 추천 시스템

```python
print("=== 🌤️ AI 날씨 기반 활동 추천 시스템 ===")

# 날씨 정보 입력
temperature = int(input("🌡️ 현재 온도 (°C): "))
is_raining = input("☔ 비가 오나요? (y/n): ").lower() == 'y'
wind_speed = int(input("💨 풍속 (km/h): "))
humidity = int(input("💧 습도 (%): "))

print(f"\n🎯 맞춤형 활동 추천")
print("=" * 40)

# 복합 조건으로 활동 추천
if not is_raining and 20 <= temperature <= 25 and wind_speed < 15:
    print("🌟 완벽한 야외 활동 날씨!")
    activities = ["🚴‍♂️ 자전거 타기", "🏃‍♀️ 조깅", "🧺 피크닉", "⚽ 축구"]
    
elif not is_raining and temperature > 25 and humidity < 70:
    print("☀️ 더운 날씨 - 시원한 활동 추천")
    activities = ["🏊‍♂️ 수영", "🍦 아이스크림 먹기", "🏖️ 해수욕", "💦 물놀이"]
    
elif not is_raining and temperature < 10:
    print("❄️ 추운 날씨 - 따뜻한 실내 활동 추천")
    activities = ["☕ 카페 가기", "🎬 영화 보기", "📚 독서", "🎮 게임"]
    
elif is_raining and wind_speed < 20:
    print("🌧️ 비오는 날 - 실내 활동 추천")
    activities = ["🏠 집에서 요리", "🎨 그림 그리기", "📺 드라마 보기", "🧩 퍼즐"]
    
elif wind_speed >= 20:
    print("💨 바람이 강한 날 - 안전한 실내 활동")
    activities = ["🏢 쇼핑몰 가기", "🎳 볼링", "🎪 실내 놀이시설", "📖 도서관"]
    
else:
    print("🤔 애매한 날씨 - 상황에 맞는 활동 선택")
    activities = ["🚶‍♂️ 가벼운 산책", "🛒 쇼핑", "👥 친구 만나기", "🍽️ 맛집 탐방"]

print("추천 활동:")
for i, activity in enumerate(activities, 1):
    print(f"  {i}. {activity}")

# 옷차림 추천
print(f"\n👕 옷차림 추천:")
if temperature >= 28:
    clothing = "반팔, 반바지, 선글라스"
elif temperature >= 20:
    clothing = "긴팔, 얇은 겉옷"
elif temperature >= 10:
    clothing = "스웨터, 재킷"
else:
    clothing = "코트, 목도리, 장갑"

if is_raining:
    clothing += ", 우산/우비"

if wind_speed >= 15:
    clothing += ", 바람막이"

print(f"   {clothing}")
```

---

## 🎯 실습: 종합 게임 시스템

### 🎮 RPG 캐릭터 생성 및 전투 시스템

```python
import random

print("=== ⚔️ Python RPG 게임 ===")
print("🏰 모험의 세계에 오신 것을 환영합니다!")

# 캐릭터 생성
print("\n👤 캐릭터 생성")
print("=" * 25)
character_name = input("🎭 캐릭터 이름: ")

print("\n🎯 직업을 선택하세요:")
print("1. ⚔️ 전사 (높은 체력, 강한 공격)")
print("2. 🏹 궁수 (빠른 속도, 정확한 공격)")
print("3. 🔮 마법사 (강력한 마법, 낮은 체력)")

job_choice = input("직업 선택 (1-3): ")

if job_choice == "1":
    job = "전사"
    hp = 120
    attack = 25
    defense = 15
    speed = 10
    special_skill = "강타"
elif job_choice == "2":
    job = "궁수"
    hp = 90
    attack = 20
    defense = 10
    speed = 20
    special_skill = "연속 사격"
elif job_choice == "3":
    job = "마법사"
    hp = 70
    attack = 30
    defense = 5
    speed = 15
    special_skill = "파이어볼"
else:
    print("❌ 잘못된 선택! 기본 전사로 설정됩니다.")
    job = "전사"
    hp = 120
    attack = 25
    defense = 15
    speed = 10
    special_skill = "강타"

max_hp = hp

print(f"\n✅ {character_name} ({job}) 생성 완료!")
print(f"❤️ 체력: {hp}")
print(f"⚔️ 공격력: {attack}")
print(f"🛡️ 방어력: {defense}")
print(f"💨 속도: {speed}")
print(f"✨ 특수 기술: {special_skill}")

# 몬스터 조우
print(f"\n🌲 {character_name}이 숲을 탐험하던 중...")
print("👹 야생 고블린이 나타났다!")

monster_hp = 80
monster_attack = 15
monster_defense = 8
monster_max_hp = monster_hp

print(f"\n⚔️ 전투 시작!")
print("=" * 30)

turn = 1
while hp > 0 and monster_hp > 0:
    print(f"\n🔄 턴 {turn}")
    print(f"👤 {character_name}: {hp}/{max_hp} HP")
    print(f"👹 고블린: {monster_hp}/{monster_max_hp} HP")
    
    print("\n🎯 행동을 선택하세요:")
    print("1. ⚔️ 일반 공격")
    print("2. ✨ 특수 기술")
    print("3. 🛡️ 방어")
    print("4. 💊 회복 포션 사용")
    
    action = input("행동 선택 (1-4): ")
    
    # 플레이어 턴
    if action == "1":
        damage = max(1, attack - monster_defense + random.randint(-3, 3))
        monster_hp -= damage
        print(f"⚔️ {character_name}의 일반 공격! {damage} 데미지!")
        
    elif action == "2":
        if random.random() < 0.7:  # 70% 성공률
            if job == "전사":
                damage = max(1, attack * 1.5 - monster_defense)
                monster_hp -= damage
                print(f"💥 강타 성공! {damage} 데미지!")
            elif job == "궁수":
                damage = max(1, attack * 0.7 - monster_defense) * 2
                monster_hp -= damage
                print(f"🏹 연속 사격 성공! {damage} 데미지!")
            else:  # 마법사
                damage = max(1, attack * 2)
                monster_hp -= damage
                print(f"🔥 파이어볼 성공! {damage} 데미지!")
        else:
            print(f"❌ {special_skill} 실패!")
            
    elif action == "3":
        print("🛡️ 방어 자세! 받는 데미지가 절반으로 줄어듭니다.")
        defending = True
    else:
        if hp < max_hp:
            heal = random.randint(20, 35)
            hp = min(max_hp, hp + heal)
            print(f"💊 회복 포션 사용! {heal} HP 회복!")
        else:
            print("❌ 이미 체력이 가득합니다!")
    
    # 몬스터가 살아있으면 반격
    if monster_hp > 0:
        monster_damage = max(1, monster_attack - defense + random.randint(-2, 2))
        
        if action == "3":  # 방어했을 때
            monster_damage //= 2
            print(f"👹 고블린의 공격! 방어로 {monster_damage} 데미지만 받음!")
        else:
            print(f"👹 고블린의 공격! {monster_damage} 데미지!")
        
        hp -= monster_damage
    
    turn += 1

# 전투 결과
print("\n" + "=" * 30)
if hp > 0:
    print("🎉 승리! 고블린을 물리쳤습니다!")
    exp_gained = random.randint(50, 100)
    gold_gained = random.randint(20, 50)
    print(f"✨ 경험치 {exp_gained} 획득!")
    print(f"💰 골드 {gold_gained} 획득!")
    
    if random.random() < 0.3:  # 30% 확률로 아이템 드롭
        items = ["🗡️ 낡은 검", "🛡️ 가죽 갑옷", "💎 마나 크리스탈", "🧪 체력 포션"]
        found_item = random.choice(items)
        print(f"🎁 아이템 발견: {found_item}")
else:
    print("💀 패배... 모험이 끝났습니다.")
    print("🔄 다시 도전해보세요!")

print(f"\n👋 {character_name}의 모험이 계속됩니다...")
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 스마트 홈 제어 시스템
```python
def smart_home_controller():
    """스마트 홈 자동 제어 시스템"""
    print("🏠 스마트 홈 제어 시스템")
    print("=" * 30)
    
    # 센서 데이터 입력
    temperature = int(input("🌡️ 실내 온도: "))
    humidity = int(input("💧 습도 (%): "))
    light_level = int(input("💡 조도 (0-100): "))
    is_home = input("🏠 집에 있나요? (y/n): ").lower() == 'y'
    time_hour = int(input("🕐 현재 시간 (0-23): "))
    
    # 자동 제어 로직 구현
    # (온도, 습도, 조도, 재실 여부, 시간에 따른 기기 제어)
    
# smart_home_controller()  # 주석 해제하여 실행
```

### 🚀 심화 과제: 학점 계산기
```python
def gpa_calculator():
    """종합 학점 계산기"""
    print("📊 학점 계산기")
    print("=" * 20)
    
    subjects = []
    total_credits = 0
    total_points = 0
    
    while True:
        subject = input("📚 과목명 (종료하려면 'done'): ")
        if subject.lower() == 'done':
            break
            
        credits = int(input("💯 학점: "))
        score = int(input("📝 점수: "))
        
        # 점수를 학점으로 변환하는 로직 구현
        # A+, A, B+, B, C+, C, D+, D, F 등급 계산
        
# gpa_calculator()  # 주석 해제하여 실행
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- if, elif, else를 활용한 조건부 실행
- 다양한 조건 표현식과 비교 연산자
- 중첩 조건문으로 복잡한 로직 구현
- and, or, not 논리 연산자 활용
- 실무급 조건문 패턴과 베스트 프랙티스

✅ **핵심 개념**
- **조건문**: 프로그램의 흐름을 제어하는 핵심 도구
- **elif**: 다중 조건을 효율적으로 처리
- **중첩**: 복잡한 조건을 단계별로 처리
- **논리 연산자**: 여러 조건을 조합하여 정교한 판단

✅ **실무 팁**
- 조건의 순서가 중요 (위에서부터 순차 검사)
- 복잡한 조건은 중첩보다 논리 연산자 활용
- 가독성을 위해 조건을 명확하게 작성
- 예외 상황(else)을 항상 고려하기

🎯 **다음 챕터 예고**
다음 챕터에서는 반복문(for, while)을 배워보겠습니다. 같은 작업을 여러 번 수행하는 효율적인 방법을 마스터해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: if문에서 조건이 여러 개일 때 어떤 순서로 써야 하나요?**
A: 가장 구체적이고 제한적인 조건부터 먼저 쓰세요. Python은 위에서부터 순서대로 검사하므로 순서가 중요합니다.

**Q: elif와 여러 개의 if문의 차이점은 무엇인가요?**
A: elif는 이전 조건이 거짓일 때만 검사하지만, 여러 if문은 모든 조건을 독립적으로 검사합니다.

**Q: 조건문 안에 또 다른 조건문을 넣을 수 있나요?**
A: 네! 중첩 조건문이라고 하며, 복잡한 로직을 구현할 때 유용합니다. 단, 너무 깊게 중첩하면 가독성이 떨어집니다.

**Q: and와 or를 함께 사용할 때 우선순위는?**
A: and가 or보다 우선순위가 높습니다. 명확하게 하려면 괄호를 사용하세요: `(A or B) and C`

**Q: 조건문에서 문자열 비교는 어떻게 하나요?**
A: `==`로 정확히 일치하는지, `in`으로 포함되는지, `startswith()`/`endswith()`로 시작/끝나는지 확인할 수 있습니다. 