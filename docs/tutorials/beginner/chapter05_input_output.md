# Chapter 5: 입력과 출력 마스터하기

## 📚 이 챕터에서 배울 내용
- print() 함수로 다양한 형태의 출력 만들기
- input() 함수로 사용자와 상호작용하기
- 입력 데이터의 타입 변환과 검증하기
- 출력 포맷팅으로 전문적인 화면 구성하기
- 실용적인 대화형 프로그램 개발하기

---

## 🖨️ 출력의 예술: print() 함수 완전 정복

### 💡 기본 출력의 이해

```python
# 다양한 데이터 타입 출력
print("=== 기본 출력 예제 ===")
print("안녕하세요, Python!")        # 문자열
print(42)                          # 정수
print(3.14159)                     # 실수
print(True)                        # 불린
print([1, 2, 3])                   # 리스트

# 변수 출력
name = "김민수"
age = 25
height = 175.5

print("이름:", name)
print("나이:", age)
print("키:", height)
```

> 💡 **팁**: print() 함수는 어떤 데이터 타입이든 문자열로 변환하여 출력합니다!

### 🎯 여러 값을 한 번에 출력하기

```python
# 기본 여러 값 출력
name = "이영희"
age = 28
city = "서울"
job = "개발자"

print("=== 프로필 정보 ===")
print("이름:", name, "나이:", age, "거주지:", city, "직업:", job)

# 계산 결과와 함께 출력
price = 15000
quantity = 3
total = price * quantity
print("상품 가격:", price, "수량:", quantity, "총액:", total)

# 다양한 타입 혼합 출력
print("오늘 온도는", 25.5, "도이고, 습도는", 60, "%입니다.")
```

### 🎨 print() 함수의 고급 매개변수

#### 🔗 sep 매개변수: 구분자 마음대로 바꾸기

```python
print("=== 구분자(sep) 활용 ===")

# 기본 구분자 (공백)
print("사과", "바나나", "체리")

# 다양한 구분자 사용
print("사과", "바나나", "체리", sep=", ")      # 콤마와 공백
print("사과", "바나나", "체리", sep=" | ")     # 파이프 기호
print("사과", "바나나", "체리", sep="-")       # 하이픈
print("사과", "바나나", "체리", sep="")        # 구분자 없음

# 실용적인 예제
year, month, day = 2024, 12, 25
print(year, month, day, sep="/")              # 2024/12/25
print(year, month, day, sep="-")              # 2024-12-25

# 전화번호 형식
print("010", "1234", "5678", sep="-")         # 010-1234-5678

# 파일 경로 만들기
print("home", "user", "documents", "file.txt", sep="/")  # home/user/documents/file.txt
```

#### 🔚 end 매개변수: 줄바꿈 제어하기

```python
print("=== 끝 문자(end) 활용 ===")

# 기본 동작 (줄바꿈)
print("첫 번째 줄")
print("두 번째 줄")

print("\n--- end 매개변수 사용 ---")
# 줄바꿈 없이 출력
print("안녕", end=" ")
print("하세요", end="!")
print()  # 빈 줄바꿈

# 로딩 애니메이션 효과
print("로딩 중", end="")
for i in range(5):
    print(".", end="")
print(" 완료!")

# 진행률 표시
print("진행률: ", end="")
for i in range(0, 101, 20):
    print(f"{i}%", end=" → " if i < 100 else "\n")
```

### 🌟 특수 문자와 이스케이프 시퀀스

```python
print("=== 특수 문자 활용 ===")

# 줄바꿈 (\n)
print("첫 번째 줄\n두 번째 줄\n세 번째 줄")

# 탭 문자 (\t) - 표 형태 출력
print("이름\t나이\t직업")
print("김민수\t25\t개발자")
print("이영희\t28\t디자이너")
print("박철수\t32\t기획자")

# 따옴표 출력
print("그는 \"안녕하세요\"라고 말했습니다.")
print('그녀는 \'반갑습니다\'라고 답했습니다.')

# 백슬래시 출력
print("파일 경로: C:\\Users\\Documents\\file.txt")

# 실용적인 예제: 영수증 출력
print("=" * 30)
print("        🧾 영수증")
print("=" * 30)
print("상품명\t\t가격")
print("-" * 30)
print("아메리카노\t\t4,500원")
print("카페라떼\t\t5,000원")
print("크로와상\t\t3,500원")
print("-" * 30)
print("총액\t\t\t13,000원")
print("=" * 30)
```

---

## 📥 입력의 마법: input() 함수 완전 활용

### 💡 기본 입력 받기

```python
print("=== 기본 입력 예제 ===")

# 메시지와 함께 입력 받기
name = input("이름을 입력하세요: ")
print(f"안녕하세요, {name}님!")

# 여러 정보 입력받기
age = input("나이를 입력하세요: ")
city = input("거주 도시를 입력하세요: ")
hobby = input("취미를 입력하세요: ")

print(f"\n=== {name}님의 프로필 ===")
print(f"나이: {age}세")
print(f"거주지: {city}")
print(f"취미: {hobby}")
```

### ⚠️ input() 함수의 중요한 특징

```python
print("=== input() 함수의 특징 ===")

# 모든 입력은 문자열로 받아집니다!
user_input = input("숫자를 입력하세요: ")
print(f"입력값: {user_input}")
print(f"데이터 타입: {type(user_input)}")

# 숫자를 입력해도 문자열이므로 계산 불가
# result = user_input + 10  # 오류 발생!

# 올바른 방법: 타입 변환 필요
number = int(user_input)
result = number + 10
print(f"계산 결과: {result}")
```

### 🔄 입력 데이터 타입 변환

#### 🔢 정수 변환

```python
print("=== 정수 입력 처리 ===")

# 기본 정수 변환
age_str = input("나이를 입력하세요: ")
age = int(age_str)
print(f"내년 나이: {age + 1}세")

# 한 줄로 처리
birth_year = int(input("태어난 해를 입력하세요: "))
current_year = 2024
age_calculated = current_year - birth_year
print(f"계산된 나이: {age_calculated}세")

# 여러 숫자 입력받기
print("두 수를 입력하세요:")
num1 = int(input("첫 번째 수: "))
num2 = int(input("두 번째 수: "))

print(f"\n=== 계산 결과 ===")
print(f"{num1} + {num2} = {num1 + num2}")
print(f"{num1} - {num2} = {num1 - num2}")
print(f"{num1} × {num2} = {num1 * num2}")
print(f"{num1} ÷ {num2} = {num1 / num2:.2f}")
```

#### 🔢 실수 변환

```python
print("=== 실수 입력 처리 ===")

# 키와 몸무게로 BMI 계산
height = float(input("키를 입력하세요 (cm): "))
weight = float(input("몸무게를 입력하세요 (kg): "))

# BMI 계산 (키를 미터로 변환)
height_m = height / 100
bmi = weight / (height_m ** 2)

print(f"\n=== BMI 계산 결과 ===")
print(f"키: {height}cm")
print(f"몸무게: {weight}kg")
print(f"BMI: {bmi:.2f}")

# BMI 판정
if bmi < 18.5:
    category = "저체중"
elif bmi < 25:
    category = "정상체중"
elif bmi < 30:
    category = "과체중"
else:
    category = "비만"

print(f"판정: {category}")
```

#### ✅ 불린 변환

```python
print("=== 불린 입력 처리 ===")

# 예/아니오 입력 처리
answer = input("회원이신가요? (y/n): ").lower()
is_member = answer in ['y', 'yes', '예', '네']

if is_member:
    print("회원 할인 10%가 적용됩니다!")
else:
    print("회원가입하시면 할인 혜택을 받으실 수 있습니다.")

# 여러 조건 확인
print("\n=== 설문조사 ===")
like_python = input("Python을 좋아하시나요? (y/n): ").lower() in ['y', 'yes']
want_learn = input("더 배우고 싶으신가요? (y/n): ").lower() in ['y', 'yes']

if like_python and want_learn:
    print("🎉 훌륭합니다! 계속 학습해보세요!")
elif like_python:
    print("😊 Python을 좋아하시는군요!")
elif want_learn:
    print("💪 배우려는 의지가 있으시네요!")
else:
    print("🤔 천천히 시작해보세요!")
```

### 🛡️ 안전한 입력 처리

```python
print("=== 안전한 입력 처리 ===")

# 숫자 입력 검증
def get_safe_number(prompt):
    """안전하게 숫자를 입력받는 함수"""
    while True:
        try:
            value = float(input(prompt))
            return value
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")

# 나이 입력 (범위 검증 포함)
def get_age():
    """나이를 안전하게 입력받는 함수"""
    while True:
        try:
            age = int(input("나이를 입력하세요 (1-120): "))
            if 1 <= age <= 120:
                return age
            else:
                print("❌ 나이는 1세부터 120세까지 입력 가능합니다!")
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")

# 사용 예제
print("안전한 계산기")
num1 = get_safe_number("첫 번째 수: ")
num2 = get_safe_number("두 번째 수: ")
print(f"결과: {num1} + {num2} = {num1 + num2}")

age = get_age()
print(f"입력된 나이: {age}세")
```

---

## 🎯 실습: 종합 프로젝트

### 📝 실습 과제: 개인 정보 관리 시스템

```python
# Personal Information Management System
def personal_info_system():
    """개인 정보 관리 시스템"""
    
    print("=" * 50)
    print("           👤 개인 정보 관리 시스템")
    print("=" * 50)
    
    # 기본 정보 입력
    print("\n📝 기본 정보를 입력해주세요:")
    name = input("이름: ")
    
    # 나이 입력 (검증 포함)
    while True:
        try:
            age = int(input("나이: "))
            if 1 <= age <= 120:
                break
            else:
                print("❌ 나이는 1세부터 120세까지 입력해주세요!")
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")
    
    # 신체 정보 입력
    print("\n📏 신체 정보를 입력해주세요:")
    while True:
        try:
            height = float(input("키 (cm): "))
            weight = float(input("몸무게 (kg): "))
            if height > 0 and weight > 0:
                break
            else:
                print("❌ 양수를 입력해주세요!")
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")
    
    # 추가 정보
    city = input("거주 도시: ")
    job = input("직업: ")
    hobby = input("취미: ")
    
    # BMI 계산
    height_m = height / 100
    bmi = weight / (height_m ** 2)
    
    if bmi < 18.5:
        bmi_category = "저체중"
    elif bmi < 25:
        bmi_category = "정상체중"
    elif bmi < 30:
        bmi_category = "과체중"
    else:
        bmi_category = "비만"
    
    # 나이 그룹 분류
    if age < 20:
        age_group = "청소년"
    elif age < 30:
        age_group = "20대"
    elif age < 40:
        age_group = "30대"
    elif age < 50:
        age_group = "40대"
    elif age < 60:
        age_group = "50대"
    else:
        age_group = "시니어"
    
    # 결과 출력
    print("\n" + "=" * 50)
    print(f"           📊 {name}님의 프로필")
    print("=" * 50)
    
    print(f"👤 기본 정보:")
    print(f"   이름: {name}")
    print(f"   나이: {age}세 ({age_group})")
    print(f"   거주지: {city}")
    print(f"   직업: {job}")
    print(f"   취미: {hobby}")
    
    print(f"\n📏 신체 정보:")
    print(f"   키: {height}cm")
    print(f"   몸무게: {weight}kg")
    print(f"   BMI: {bmi:.2f} ({bmi_category})")
    
    # 건강 조언
    print(f"\n💡 건강 조언:")
    if bmi_category == "정상체중":
        print("   🎉 건강한 체중을 유지하고 계시네요!")
    elif bmi_category == "저체중":
        print("   🍎 균형 잡힌 식사로 건강한 체중 증가를 권장합니다.")
    elif bmi_category == "과체중":
        print("   🏃‍♂️ 규칙적인 운동과 식단 관리를 권장합니다.")
    else:
        print("   ⚠️ 전문의와 상담하여 체중 관리 계획을 세우시기 바랍니다.")
    
    print("=" * 50)
    print("           정보 입력이 완료되었습니다!")
    print("=" * 50)

# 프로그램 실행
if __name__ == "__main__":
    personal_info_system()
```

### 🎮 실습 과제: 간단한 게임

```python
# Number Guessing Game
import random

def number_guessing_game():
    """숫자 맞추기 게임"""
    
    print("=" * 50)
    print("           🎯 숫자 맞추기 게임")
    print("=" * 50)
    print("1부터 100 사이의 숫자를 맞춰보세요!")
    print("힌트를 드릴게요. 최대 7번의 기회가 있습니다.")
    print("-" * 50)
    
    # 정답 숫자 생성
    answer = random.randint(1, 100)
    attempts = 0
    max_attempts = 7
    
    while attempts < max_attempts:
        attempts += 1
        remaining = max_attempts - attempts + 1
        
        # 사용자 입력
        try:
            guess = int(input(f"\n시도 {attempts}/{max_attempts} - 숫자를 입력하세요 (1-100): "))
        except ValueError:
            print("❌ 올바른 숫자를 입력해주세요!")
            attempts -= 1  # 잘못된 입력은 시도 횟수에 포함하지 않음
            continue
        
        # 범위 확인
        if guess < 1 or guess > 100:
            print("❌ 1부터 100 사이의 숫자를 입력해주세요!")
            attempts -= 1
            continue
        
        # 정답 확인
        if guess == answer:
            print(f"\n🎉 정답입니다! {answer}을(를) {attempts}번 만에 맞추셨네요!")
            
            # 성과 평가
            if attempts <= 3:
                print("🏆 대단합니다! 천재적인 직감이네요!")
            elif attempts <= 5:
                print("👏 훌륭합니다! 좋은 추리력이에요!")
            else:
                print("😊 성공하셨네요! 포기하지 않는 끈기가 멋져요!")
            break
            
        elif guess < answer:
            print(f"📈 더 큰 수입니다! (남은 기회: {remaining}번)")
        else:
            print(f"📉 더 작은 수입니다! (남은 기회: {remaining}번)")
        
        # 힌트 제공
        if attempts == 3:
            if answer % 2 == 0:
                print("💡 힌트: 짝수입니다!")
            else:
                print("💡 힌트: 홀수입니다!")
        elif attempts == 5:
            if answer <= 50:
                print("💡 힌트: 50 이하의 수입니다!")
            else:
                print("💡 힌트: 50 초과의 수입니다!")
    
    else:
        print(f"\n😢 아쉽습니다! 정답은 {answer}이었습니다.")
        print("다시 도전해보세요!")
    
    # 재시작 여부
    play_again = input("\n다시 플레이하시겠습니까? (y/n): ").lower()
    if play_again in ['y', 'yes', '예', '네']:
        number_guessing_game()
    else:
        print("게임을 종료합니다. 즐거우셨나요? 😊")

# 게임 실행
if __name__ == "__main__":
    number_guessing_game()
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- print() 함수의 다양한 활용법 (sep, end 매개변수)
- input() 함수로 사용자 입력 받기
- 입력 데이터의 타입 변환과 검증
- 특수 문자와 이스케이프 시퀀스 활용
- 안전한 입력 처리 방법

✅ **핵심 개념**
- **출력**: `print(값1, 값2, sep="구분자", end="끝문자")`
- **입력**: `input("메시지")` (항상 문자열 반환)
- **타입 변환**: `int()`, `float()`, `str()`
- **예외 처리**: `try-except`로 안전한 입력

✅ **실무 팁**
- 사용자 입력은 항상 검증하기
- 의미 있는 프롬프트 메시지 제공하기
- 에러 상황에 대한 친절한 안내 메시지
- 입력 범위와 형식 제한하기

🎯 **다음 챕터 예고**
다음 챕터에서는 조건문(if, elif, else)을 배워보겠습니다. 프로그램이 상황에 따라 다른 동작을 하도록 만드는 방법을 마스터해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: input()으로 받은 숫자가 계산이 안 되는 이유는?**
A: input()은 항상 문자열을 반환합니다. 숫자 계산을 하려면 int()나 float()로 변환해야 합니다.

**Q: 사용자가 잘못된 값을 입력하면 어떻게 처리하나요?**
A: try-except 문을 사용하여 예외를 처리하고, while 루프로 올바른 값을 입력할 때까지 반복하세요.

**Q: print()에서 줄바꿈을 하지 않으려면?**
A: end="" 매개변수를 사용하면 줄바꿈 없이 출력할 수 있습니다.

**Q: 여러 값을 한 번에 입력받을 수 있나요?**
A: input().split()을 사용하여 공백으로 구분된 여러 값을 받을 수 있습니다. 예: `a, b = input().split()`
