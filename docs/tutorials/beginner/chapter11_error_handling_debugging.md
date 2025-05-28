# Chapter 11: 에러 처리와 디버깅 - 프로그래밍의 안전장치 마스터하기

## 📚 이 챕터에서 배울 내용
- 🚨 에러의 종류와 원인을 파악하여 예방하기
- 🛡️ try-except로 견고한 프로그램 만들기
- 🔧 디버깅 기법으로 버그 사냥꾼 되기
- 📝 로깅으로 프로그램의 발자취 추적하기
- 🎯 사용자 정의 예외로 전문가급 코드 작성하기
- 💪 실무에서 바로 쓸 수 있는 에러 처리 패턴 익히기

---

## 🔍 에러의 종류: 프로그래밍 세계의 다양한 문제들

### 💥 문법 에러 (Syntax Error): 코딩 문법 위반

```python
print("=== 🚨 문법 에러: 파이썬 문법 경찰에 걸린 경우 ===")

# 이런 코드들은 실행조차 되지 않습니다!
# print("Hello World"     # ❌ 괄호 누락
# if True              # ❌ 콜론 누락
#     print("Hello")
# def my_function(     # ❌ 괄호 미완성
# for i in range(5)    # ❌ 콜론 누락
#     print(i)

print("✅ 문법 에러는 코드 실행 전에 발견되므로 비교적 쉽게 수정할 수 있습니다!")
print("💡 IDE나 에디터가 빨간 밑줄로 알려주는 경우가 많아요.")
```

### 🏃‍♂️ 런타임 에러 (Runtime Error): 실행 중 발생하는 문제들

```python
print("=== 💥 런타임 에러: 실행 중에 터지는 지뢰들 ===")

def error_showcase():
    """다양한 런타임 에러를 안전하게 체험해보기"""
    
    error_examples = [
        {
            "name": "NameError",
            "description": "존재하지 않는 변수 사용",
            "emoji": "👻",
            "example": lambda: print(ghost_variable)
        },
        {
            "name": "TypeError", 
            "description": "잘못된 타입끼리 연산",
            "emoji": "🔧",
            "example": lambda: "문자열" + 123
        },
        {
            "name": "ValueError",
            "description": "올바르지 않은 값 사용", 
            "emoji": "💸",
            "example": lambda: int("안녕하세요")
        },
        {
            "name": "ZeroDivisionError",
            "description": "0으로 나누기 시도",
            "emoji": "➗",
            "example": lambda: 10 / 0
        },
        {
            "name": "IndexError",
            "description": "존재하지 않는 인덱스 접근",
            "emoji": "📍",
            "example": lambda: [1, 2, 3][999]
        },
        {
            "name": "KeyError",
            "description": "존재하지 않는 딕셔너리 키 접근",
            "emoji": "🔑",
            "example": lambda: {"a": 1}["z"]
        },
        {
            "name": "FileNotFoundError",
            "description": "존재하지 않는 파일 열기",
            "emoji": "📁",
            "example": lambda: open("없는파일.txt")
        },
        {
            "name": "AttributeError",
            "description": "존재하지 않는 속성/메서드 접근",
            "emoji": "🎯",
            "example": lambda: "문자열".없는메서드()
        }
    ]
    
    for error_info in error_examples:
        try:
            print(f"\n{error_info['emoji']} {error_info['name']} 테스트:")
            print(f"   설명: {error_info['description']}")
            result = error_info['example']()
            print(f"   결과: {result}")
        except Exception as e:
            print(f"   ❌ 예상된 에러 발생: {type(e).__name__}: {e}")

# 에러 쇼케이스 실행
error_showcase()

# 실생활 에러 시나리오
print(f"\n=== 🏪 실생활 속 에러 상황들 ===")

def shopping_cart_errors():
    """쇼핑몰에서 발생할 수 있는 다양한 에러들"""
    
    # 상품 데이터베이스 (시뮬레이션)
    products = {
        "apple": {"name": "사과", "price": 3000, "stock": 10},
        "banana": {"name": "바나나", "price": 2000, "stock": 5},
        "orange": {"name": "오렌지", "price": 4000, "stock": 0}
    }
    
    # 다양한 에러 상황 시뮬레이션
    error_scenarios = [
        ("apple", "5"),      # 정상 케이스
        ("grape", "3"),      # KeyError: 없는 상품
        ("banana", "abc"),   # ValueError: 잘못된 수량
        ("orange", "1"),     # 재고 부족 (비즈니스 로직 에러)
        ("apple", "0"),      # ValueError: 0개 주문
    ]
    
    for product_id, quantity_str in error_scenarios:
        try:
            print(f"\n🛒 주문 시도: {product_id} {quantity_str}개")
            
            # 1. 상품 존재 확인
            if product_id not in products:
                raise KeyError(f"상품 '{product_id}'를 찾을 수 없습니다")
            
            product = products[product_id]
            
            # 2. 수량 검증
            try:
                quantity = int(quantity_str)
            except ValueError:
                raise ValueError(f"수량은 숫자여야 합니다: '{quantity_str}'")
            
            if quantity <= 0:
                raise ValueError("수량은 1개 이상이어야 합니다")
            
            # 3. 재고 확인
            if quantity > product["stock"]:
                raise RuntimeError(f"재고 부족: 요청 {quantity}개, 재고 {product['stock']}개")
            
            # 4. 주문 처리
            total_price = product["price"] * quantity
            products[product_id]["stock"] -= quantity
            
            print(f"   ✅ 주문 성공!")
            print(f"      상품: {product['name']}")
            print(f"      수량: {quantity}개")
            print(f"      총액: {total_price:,}원")
            print(f"      남은 재고: {products[product_id]['stock']}개")
            
        except KeyError as e:
            print(f"   ❌ 상품 오류: {e}")
        except ValueError as e:
            print(f"   ❌ 입력 오류: {e}")
        except RuntimeError as e:
            print(f"   ❌ 재고 오류: {e}")
        except Exception as e:
            print(f"   💥 예상치 못한 오류: {type(e).__name__}: {e}")

shopping_cart_errors()
```

---

## 🛡️ try-except: 에러 처리의 기본 무기

### 🎯 기본 try-except 패턴

에러 처리는 마치 **우산을 챙기는 것**과 같습니다. 비가 올지 안 올지 모르지만, 만약을 위해 준비하는 거죠!

```python
print("=== ☂️ 에러 처리: 프로그래밍의 우산 ===")

def weather_check_without_umbrella():
    """🌧️ 우산 없이 외출 (에러 처리 없음)"""
    print("🚶‍♂️ 우산 없이 외출합니다...")
    
    # 갑자기 비가 온다면? → 프로그램 크래시!
    weather = "rainy"  # 시뮬레이션
    
    if weather == "rainy":
        raise RuntimeError("💧 갑자기 비가 와서 흠뻑 젖었습니다!")
    
    print("☀️ 날씨가 좋아서 즐거운 외출이었습니다!")

def weather_check_with_umbrella():
    """☂️ 우산 챙기고 외출 (에러 처리 있음)"""
    print("🚶‍♂️ 우산을 챙기고 외출합니다...")
    
    try:
        # 날씨 확인 (에러가 발생할 수 있는 코드)
        weather = "rainy"  # 시뮬레이션
        
        if weather == "rainy":
            raise RuntimeError("💧 갑자기 비가 왔습니다!")
        
        print("☀️ 날씨가 좋아서 즐거운 외출이었습니다!")
        
    except RuntimeError as e:
        print(f"🌧️ 비가 왔지만 괜찮습니다: {e}")
        print("☂️ 우산을 펼쳐서 비를 피했습니다!")
        print("🏠 안전하게 집에 도착했습니다!")

print("🌦️ 날씨 체크 시뮬레이션:")
try:
    weather_check_without_umbrella()
except Exception as e:
    print(f"💥 우산 없는 외출 실패: {e}")

print("\n" + "="*50)
weather_check_with_umbrella()

# 실용적인 try-except 예제
print(f"\n=== 💻 실용적인 에러 처리 예제들 ===")

def safe_number_input(prompt="숫자를 입력하세요: "):
    """안전한 숫자 입력 함수"""
    max_attempts = 3
    
    for attempt in range(max_attempts):
        try:
            user_input = input(f"{prompt} (시도 {attempt + 1}/{max_attempts}): ")
            
            # 빈 입력 체크
            if not user_input.strip():
                raise ValueError("빈 값은 입력할 수 없습니다")
            
            # 숫자 변환 시도
            number = float(user_input)
            
            print(f"✅ 입력 성공: {number}")
            return number
            
        except ValueError as e:
            if "could not convert" in str(e):
                print(f"❌ 숫자가 아닙니다: '{user_input}'")
            else:
                print(f"❌ 입력 오류: {e}")
            
            if attempt == max_attempts - 1:
                print("🚫 최대 시도 횟수를 초과했습니다.")
                return None
        except KeyboardInterrupt:
            print("\n🛑 사용자가 입력을 취소했습니다.")
            return None

def safe_division_calculator():
    """안전한 나눗셈 계산기"""
    print("🧮 안전한 나눗셈 계산기")
    
    try:
        # 첫 번째 숫자 입력
        print("\n첫 번째 숫자를 입력해주세요:")
        num1 = safe_number_input("첫 번째 숫자")
        if num1 is None:
            return
        
        # 두 번째 숫자 입력
        print("\n두 번째 숫자를 입력해주세요:")
        num2 = safe_number_input("두 번째 숫자")
        if num2 is None:
            return
        
        # 나눗셈 수행
        if num2 == 0:
            print("❌ 0으로 나눌 수 없습니다!")
            print("💡 팁: 두 번째 숫자를 0이 아닌 값으로 입력해주세요.")
            return
        
        result = num1 / num2
        print(f"\n✅ 계산 결과:")
        print(f"   {num1} ÷ {num2} = {result:.4f}")
        
        # 추가 정보 제공
        if result > 1:
            print(f"   💡 {num1}이(가) {num2}보다 큽니다.")
        elif result < 1:
            print(f"   💡 {num1}이(가) {num2}보다 작습니다.")
        else:
            print(f"   💡 {num1}과(와) {num2}가 같습니다.")
            
    except Exception as e:
        print(f"💥 예상치 못한 오류가 발생했습니다: {e}")
        print("🔧 프로그램을 다시 시작해주세요.")

# 계산기 테스트 (실제 실행은 주석 처리)
# safe_division_calculator()

# 파일 처리 에러 예제
def safe_file_operations():
    """안전한 파일 처리 예제"""
    
    file_operations = [
        ("읽기", "existing_file.txt"),
        ("읽기", "nonexistent_file.txt"),
        ("쓰기", "output.txt"),
        ("쓰기", "/root/forbidden.txt")  # 권한 없는 경로
    ]
    
    for operation, filename in file_operations:
        try:
            print(f"\n📁 파일 {operation} 시도: {filename}")
            
            if operation == "읽기":
                try:
                    with open(filename, 'r', encoding='utf-8') as f:
                        content = f.read()
                    print(f"   ✅ 파일 읽기 성공: {len(content)}자")
                except FileNotFoundError:
                    print(f"   ❌ 파일을 찾을 수 없습니다: {filename}")
                    print(f"   💡 파일 경로를 확인해주세요.")
                
            elif operation == "쓰기":
                try:
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write("테스트 내용입니다.")
                    print(f"   ✅ 파일 쓰기 성공: {filename}")
                except PermissionError:
                    print(f"   ❌ 파일 쓰기 권한이 없습니다: {filename}")
                    print(f"   💡 다른 경로를 시도해보세요.")
                except Exception as e:
                    print(f"   ❌ 파일 쓰기 실패: {e}")
                    
        except Exception as e:
            print(f"   💥 예상치 못한 오류: {e}")

print(f"\n📁 안전한 파일 처리 시뮬레이션:")
safe_file_operations()
```

### 🎨 구체적인 예외 처리: 정확한 진단과 치료

```python
print("=== 🏥 에러 진단과 치료: 구체적인 예외 처리 ===")

def medical_diagnosis_style_error_handling():
    """의료진단 스타일의 에러 처리"""
    
    # 다양한 "환자" 데이터 (에러가 발생할 수 있는 입력들)
    patients = [
        {"name": "정상환자", "data": "25"},
        {"name": "문자환자", "data": "스물다섯"},
        {"name": "빈값환자", "data": ""},
        {"name": "소수환자", "data": "25.5"},
        {"name": "음수환자", "data": "-10"},
        {"name": "거대환자", "data": "999999999999999999999"}
    ]
    
    for patient in patients:
        print(f"\n🏥 환자 진료: {patient['name']}")
        print(f"   입력 데이터: '{patient['data']}'")
        
        try:
            # 1차 진단: 데이터 타입 검사
            if not isinstance(patient['data'], str):
                raise TypeError("데이터가 문자열이 아닙니다")
            
            # 2차 진단: 빈 값 검사
            if not patient['data'].strip():
                raise ValueError("빈 데이터입니다")
            
            # 3차 진단: 숫자 변환 검사
            age = int(patient['data'])
            
            # 4차 진단: 범위 검사
            if age < 0:
                raise ValueError("나이는 음수일 수 없습니다")
            
            if age > 150:
                raise ValueError("나이가 너무 큽니다 (150세 초과)")
            
            # 5차 진단: 비즈니스 로직 검사
            if age < 18:
                category = "미성년자"
                emoji = "👶"
            elif age < 65:
                category = "성인"
                emoji = "👨"
            else:
                category = "노인"
                emoji = "👴"
            
            print(f"   ✅ 진단 완료: {age}세 {category} {emoji}")
            
        except ValueError as e:
            if "invalid literal" in str(e):
                print(f"   🩺 진단: 숫자 형식 오류")
                print(f"   💊 처방: 올바른 숫자를 입력해주세요")
            else:
                print(f"   🩺 진단: 값 범위 오류")
                print(f"   💊 처방: {e}")
                
        except TypeError as e:
            print(f"   🩺 진단: 데이터 타입 오류")
            print(f"   💊 처방: 문자열 형태로 입력해주세요")
            
        except OverflowError as e:
            print(f"   🩺 진단: 숫자 크기 초과")
            print(f"   💊 처방: 더 작은 숫자를 입력해주세요")
            
        except Exception as e:
            print(f"   🚨 응급상황: 예상치 못한 증상")
            print(f"   🏥 전문의 상담 필요: {type(e).__name__}: {e}")

medical_diagnosis_style_error_handling()

# 여러 예외를 한 번에 처리하는 방법
def multiple_exception_handling():
    """여러 예외를 효율적으로 처리하는 방법들"""
    
    print(f"\n=== 🎯 여러 예외 동시 처리 기법 ===")
    
    test_inputs = [
        "123",          # 정상
        "12.34",        # 소수점 (ValueError)
        "hello",        # 문자 (ValueError)
        "",             # 빈 문자열 (ValueError)
        None,           # None 타입 (TypeError)
    ]
    
    for i, test_input in enumerate(test_inputs, 1):
        print(f"\n🧪 테스트 {i}: {repr(test_input)}")
        
        try:
            # 여러 연산을 수행하여 다양한 에러 유발 가능
            result = int(test_input) * 2
            square_root = result ** 0.5
            
            print(f"   ✅ 성공: {test_input} → {result} → √{result:.2f}")
            
        except (ValueError, TypeError) as e:
            # 관련된 여러 예외를 함께 처리
            print(f"   ❌ 입력 관련 오류: {type(e).__name__}")
            print(f"   💡 해결책: 올바른 정수를 입력해주세요")
            
        except (OverflowError, MemoryError) as e:
            # 시스템 리소스 관련 예외들
            print(f"   ⚠️ 시스템 리소스 오류: {type(e).__name__}")
            print(f"   💡 해결책: 더 작은 숫자를 사용해주세요")
            
        except Exception as e:
            # 예상치 못한 모든 예외
            print(f"   💥 예상치 못한 오류: {type(e).__name__}: {e}")
            print(f"   🔧 개발자에게 문의해주세요")

multiple_exception_handling()
```

## 🎭 else와 finally: 에러 처리의 완성

### 🎯 else절: 성공했을 때의 보상

else절은 마치 **시험을 잘 봤을 때 받는 상**과 같습니다. 에러가 없을 때만 실행되는 특별한 코드죠!

```python
print("=== 🏆 else절: 성공의 달콤한 보상 ===")

def exam_grading_system():
    """시험 채점 시스템 - else절 활용"""
    
    students_answers = [
        {"name": "김철수", "answer": "85"},
        {"name": "이영희", "answer": "구십점"},  # 문자 입력
        {"name": "박민수", "answer": "0"},      # 0점
        {"name": "최지영", "answer": "95"},
        {"name": "정다은", "answer": ""},       # 빈 답안
    ]
    
    for student in students_answers:
        print(f"\n📝 {student['name']}의 답안 채점: '{student['answer']}'")
        
        try:
            # 점수 검증 단계
            if not student['answer'].strip():
                raise ValueError("답안이 비어있습니다")
            
            score = int(student['answer'])
            
            if score < 0 or score > 100:
                raise ValueError("점수는 0~100 사이여야 합니다")
            
        except ValueError as e:
            print(f"   ❌ 채점 실패: {e}")
            print(f"   📋 조치: 재시험 대상자로 분류")
            
        else:
            # 에러가 없을 때만 실행되는 성공 처리
            print(f"   ✅ 채점 성공: {score}점")
            
            # 등급 계산 (성공했을 때만)
            if score >= 90:
                grade = "A"
                emoji = "🏆"
                message = "우수한 성적입니다!"
            elif score >= 80:
                grade = "B"
                emoji = "🥈"
                message = "좋은 성적입니다!"
            elif score >= 70:
                grade = "C"
                emoji = "🥉"
                message = "보통 성적입니다."
            elif score >= 60:
                grade = "D"
                emoji = "📚"
                message = "더 노력이 필요합니다."
            else:
                grade = "F"
                emoji = "😢"
                message = "재시험이 필요합니다."
            
            print(f"   {emoji} 등급: {grade} - {message}")
            
            # 추가 혜택 (A등급만)
            if grade == "A":
                print(f"   🎁 특별 혜택: 장학금 대상자!")

exam_grading_system()

# 온라인 쇼핑몰 주문 처리 시스템
def online_shopping_system():
    """온라인 쇼핑몰 주문 처리 - else절 활용"""
    
    orders = [
        {"product": "노트북", "quantity": "2", "coupon": "SAVE20"},
        {"product": "마우스", "quantity": "abc", "coupon": ""},      # 잘못된 수량
        {"product": "키보드", "quantity": "1", "coupon": "INVALID"}, # 잘못된 쿠폰
        {"product": "모니터", "quantity": "3", "coupon": "SAVE10"},
    ]
    
    product_prices = {
        "노트북": 1200000,
        "마우스": 30000,
        "키보드": 80000,
        "모니터": 300000
    }
    
    valid_coupons = {
        "SAVE10": 0.1,
        "SAVE20": 0.2,
        "SAVE30": 0.3
    }
    
    for order in orders:
        print(f"\n🛒 주문 처리: {order['product']} {order['quantity']}개")
        
        try:
            # 주문 검증 단계
            product = order['product']
            
            if product not in product_prices:
                raise ValueError(f"상품 '{product}'를 찾을 수 없습니다")
            
            quantity = int(order['quantity'])
            
            if quantity <= 0:
                raise ValueError("수량은 1개 이상이어야 합니다")
            
            if quantity > 10:
                raise ValueError("한 번에 최대 10개까지만 주문 가능합니다")
            
        except ValueError as e:
            print(f"   ❌ 주문 실패: {e}")
            print(f"   📞 고객센터 문의가 필요합니다")
            
        else:
            # 주문이 성공적으로 검증되었을 때만 실행
            base_price = product_prices[product] * quantity
            print(f"   ✅ 주문 검증 완료!")
            print(f"   💰 기본 금액: {base_price:,}원")
            
            # 쿠폰 적용 (주문이 유효할 때만)
            coupon = order['coupon']
            final_price = base_price
            
            if coupon and coupon in valid_coupons:
                discount_rate = valid_coupons[coupon]
                discount_amount = base_price * discount_rate
                final_price = base_price - discount_amount
                
                print(f"   🎫 쿠폰 적용: {coupon} ({discount_rate*100:.0f}% 할인)")
                print(f"   💸 할인 금액: {discount_amount:,}원")
            elif coupon:
                print(f"   ⚠️ 유효하지 않은 쿠폰: {coupon}")
            
            print(f"   🏷️ 최종 금액: {final_price:,}원")
            
            # VIP 혜택 (고액 주문시)
            if final_price >= 500000:
                print(f"   👑 VIP 혜택: 무료배송 + 포인트 5% 적립!")

print(f"\n🛍️ 온라인 쇼핑몰 주문 처리 시스템:")
online_shopping_system()
```

### 🧹 finally절: 무조건 실행되는 정리 작업

finally절은 마치 **집에 돌아와서 반드시 하는 일**과 같습니다. 성공하든 실패하든 꼭 해야 하는 정리 작업이죠!

```python
print("=== 🧹 finally절: 반드시 해야 하는 정리 작업 ===")

def restaurant_service_simulation():
    """레스토랑 서비스 시뮬레이션 - finally절 활용"""
    
    customers = [
        {"name": "김고객", "order": "스테이크", "payment": "50000"},
        {"name": "이고객", "order": "파스타", "payment": "abc"},      # 잘못된 결제
        {"name": "박고객", "order": "없는메뉴", "payment": "30000"},   # 없는 메뉴
        {"name": "최고객", "order": "피자", "payment": "25000"},
    ]
    
    menu_prices = {
        "스테이크": 45000,
        "파스타": 18000,
        "피자": 22000,
        "샐러드": 15000
    }
    
    for customer in customers:
        print(f"\n🍽️ 고객 서비스: {customer['name']}")
        table_prepared = False
        order_taken = False
        
        try:
            # 1단계: 테이블 준비
            print(f"   🪑 테이블 준비 중...")
            table_prepared = True
            print(f"   ✅ 테이블 준비 완료")
            
            # 2단계: 주문 받기
            order = customer['order']
            print(f"   📝 주문 접수: {order}")
            
            if order not in menu_prices:
                raise ValueError(f"메뉴 '{order}'는 없습니다")
            
            order_taken = True
            print(f"   ✅ 주문 접수 완료")
            
            # 3단계: 결제 처리
            payment_str = customer['payment']
            payment = int(payment_str)
            required_amount = menu_prices[order]
            
            if payment < required_amount:
                raise ValueError(f"결제 금액 부족: {payment:,}원 (필요: {required_amount:,}원)")
            
            print(f"   💳 결제 완료: {payment:,}원")
            
            # 4단계: 음식 서빙
            print(f"   🍽️ {order} 서빙 완료!")
            
            # 거스름돈 계산
            change = payment - required_amount
            if change > 0:
                print(f"   💰 거스름돈: {change:,}원")
            
        except ValueError as e:
            print(f"   ❌ 서비스 실패: {e}")
            print(f"   🙏 죄송합니다. 다른 메뉴를 추천드릴게요.")
            
        except Exception as e:
            print(f"   💥 예상치 못한 문제: {e}")
            print(f"   👨‍💼 매니저를 호출하겠습니다.")
            
        finally:
            # 성공하든 실패하든 반드시 실행되는 정리 작업
            print(f"   🧹 정리 작업 시작...")
            
            if table_prepared:
                print(f"   🧽 테이블 청소 완료")
            
            if order_taken:
                print(f"   📋 주문서 정리 완료")
            
            print(f"   📝 작업 보고서 생성 완료")

restaurant_service_simulation()

# 파일 처리 시스템 - 리소스 관리
class FileManager:
    """파일 관리자 클래스 - finally를 활용한 리소스 관리"""
    
    def __init__(self, filename):
        self.filename = filename
        self.file_handle = None
        self.is_open = False
    
    def open_file(self):
        """파일 열기"""
        print(f"   📂 파일 열기: {self.filename}")
        # 실제로는 파일을 열지만, 여기서는 시뮬레이션
        self.is_open = True
        print(f"   ✅ 파일 열기 성공")
    
    def close_file(self):
        """파일 닫기"""
        if self.is_open:
            print(f"   🔒 파일 닫기: {self.filename}")
            self.is_open = False
            print(f"   ✅ 파일 닫기 완료")

def file_processing_with_finally():
    """finally를 활용한 안전한 파일 처리"""
    
    file_operations = [
        {"name": "report.txt", "operation": "read", "simulate_error": False},
        {"name": "data.csv", "operation": "write", "simulate_error": True},
        {"name": "config.json", "operation": "read", "simulate_error": False},
    ]
    
    for file_info in file_operations:
        print(f"\n📁 파일 처리: {file_info['name']}")
        
        file_manager = FileManager(file_info['name'])
        
        try:
            # 파일 열기
            file_manager.open_file()
            
            # 파일 작업 수행
            operation = file_info['operation']
            print(f"   ⚙️ {operation} 작업 수행 중...")
            
            # 에러 시뮬레이션
            if file_info['simulate_error']:
                raise PermissionError(f"파일 {operation} 권한이 없습니다")
            
            print(f"   ✅ {operation} 작업 완료!")
            
            # 추가 처리 (성공시에만)
            if operation == "read":
                print(f"   📊 데이터 분석 결과: 100줄 처리됨")
            elif operation == "write":
                print(f"   💾 데이터 저장 완료: 50KB 작성됨")
                
        except PermissionError as e:
            print(f"   ❌ 권한 오류: {e}")
            print(f"   🔧 관리자에게 문의하세요")
            
        except Exception as e:
            print(f"   💥 예상치 못한 오류: {e}")
            
        finally:
            # 파일이 열려있다면 반드시 닫기
            print(f"   🧹 리소스 정리 중...")
            file_manager.close_file()
            print(f"   ✅ 리소스 정리 완료")

print(f"\n📁 파일 처리 시스템 (finally 활용):")
file_processing_with_finally()

# 네트워크 연결 관리 시뮬레이션
def network_connection_manager():
    """네트워크 연결 관리 - finally 활용"""
    
    servers = [
        {"name": "웹서버", "address": "192.168.1.100", "status": "online"},
        {"name": "DB서버", "address": "192.168.1.200", "status": "offline"},
        {"name": "API서버", "address": "192.168.1.300", "status": "online"},
    ]
    
    for server in servers:
        print(f"\n🌐 서버 연결: {server['name']} ({server['address']})")
        
        connection_established = False
        data_transferred = False
        
        try:
            # 연결 시도
            print(f"   🔌 연결 시도 중...")
            
            if server['status'] == 'offline':
                raise ConnectionError(f"서버가 오프라인 상태입니다")
            
            connection_established = True
            print(f"   ✅ 연결 성공!")
            
            # 데이터 전송
            print(f"   📡 데이터 전송 중...")
            
            # 랜덤하게 전송 실패 시뮬레이션
            import random
            if random.random() < 0.3:  # 30% 확률로 전송 실패
                raise TimeoutError("데이터 전송 시간 초과")
            
            data_transferred = True
            print(f"   ✅ 데이터 전송 완료!")
            
        except (ConnectionError, TimeoutError) as e:
            print(f"    ✗ {e}")
            print(f"    🔄 나중에 다시 시도하세요")
            
        except Exception as e:
            print(f"    ✗ 예상치 못한 오류: {e}")
            
        finally:
            # 연결 정리 작업 (성공/실패 관계없이)
            print(f"    🧹 연결 정리 중...")
            
            if data_transferred:
                print(f"    📊 전송 로그 저장 완료")
            
            if connection_established:
                print(f"    🔌 연결 해제 완료")
            
            print(f"    📝 작업 보고서 생성 완료")

print(f"\n🌐 네트워크 연결 관리 시스템:")
network_connection_manager()
```

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 파이썬의 다양한 에러 타입과 원인 이해하기
- try-except 문을 사용한 예외 처리 방법 익히기
- finally와 else 절의 활용법 이해하기
- 사용자 정의 예외 만들기
- 효과적인 디버깅 기법과 도구 활용하기
- 로깅을 통한 프로그램의 발자취 추적하기
- 안전하고 견고한 프로그램 작성하기

## 1. 에러와 예외의 기본 개념

### 1.1 에러의 종류

```python
# 1. 문법 에러 (Syntax Error) - 코드 실행 전에 발생
# print("Hello World"  # SyntaxError: 괄호 누락

# 2. 런타임 에러 (Runtime Error) - 실행 중에 발생
def demonstrate_runtime_errors():
    """다양한 런타임 에러 예제"""
    
    # NameError: 정의되지 않은 변수 사용
    try:
        print(undefined_variable)
    except NameError as e:
        print(f"NameError: {e}")
    
    # TypeError: 잘못된 타입 연산
    try:
        result = "hello" + 5
    except TypeError as e:
        print(f"TypeError: {e}")
    
    # ValueError: 잘못된 값
    try:
        number = int("hello")
    except ValueError as e:
        print(f"ValueError: {e}")
    
    # ZeroDivisionError: 0으로 나누기
    try:
        result = 10 / 0
    except ZeroDivisionError as e:
        print(f"ZeroDivisionError: {e}")
    
    # IndexError: 잘못된 인덱스
    try:
        my_list = [1, 2, 3]
        print(my_list[10])
    except IndexError as e:
        print(f"IndexError: {e}")
    
    # KeyError: 존재하지 않는 키
    try:
        my_dict = {"a": 1, "b": 2}
        print(my_dict["c"])
    except KeyError as e:
        print(f"KeyError: {e}")

# 에러 예제 실행
demonstrate_runtime_errors()
```

### 1.2 예외 처리가 필요한 이유

```python
# 예외 처리 없이 작성한 코드 (문제 있음)
def unsafe_calculator(a, b, operation):
    """안전하지 않은 계산기"""
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        return a / b  # 0으로 나누면 프로그램 중단!

# 예외 처리가 있는 안전한 코드
def safe_calculator(a, b, operation):
    """안전한 계산기"""
    try:
        if operation == "add":
            return a + b
        elif operation == "subtract":
            return a - b
        elif operation == "multiply":
            return a * b
        elif operation == "divide":
            if b == 0:
                return "0으로 나눌 수 없습니다"
            return a / b
        else:
            return "지원하지 않는 연산입니다"
    except TypeError:
        return "올바른 숫자를 입력해주세요"
    except Exception as e:
        return f"예상치 못한 오류가 발생했습니다: {e}"

# 테스트
print("=== 안전한 계산기 테스트 ===")
print(safe_calculator(10, 2, "divide"))  # 정상 작동
print(safe_calculator(10, 0, "divide"))  # 0으로 나누기 처리
print(safe_calculator("10", 2, "add"))   # 타입 에러 처리
print(safe_calculator(10, 2, "power"))   # 지원하지 않는 연산
```

## 2. try-except 문 기본 사용법

### 2.1 기본 try-except 구조

```python
# 기본 문법
def basic_exception_handling():
    """기본적인 예외 처리 예제"""
    
    # 1. 기본 try-except
    try:
        number = int(input("숫자를 입력하세요: "))
        result = 100 / number
        print(f"결과: {result}")
    except:
        print("오류가 발생했습니다!")
    
    print("프로그램이 계속 실행됩니다.")

# 더 구체적인 예외 처리
def specific_exception_handling():
    """구체적인 예외 처리 예제"""
    
    try:
        # 사용자 입력 받기
        user_input = input("숫자를 입력하세요: ")
        number = int(user_input)
        result = 100 / number
        print(f"100 ÷ {number} = {result}")
        
    except ValueError:
        print("올바른 숫자를 입력해주세요!")
    except ZeroDivisionError:
        print("0으로 나눌 수 없습니다!")
    except Exception as e:
        print(f"예상치 못한 오류: {e}")

# 예외 정보 활용
def detailed_exception_handling():
    """예외 정보를 활용한 처리"""
    
    numbers = ["10", "20", "hello", "0", "30"]
    
    for item in numbers:
        try:
            number = int(item)
            result = 100 / number
            print(f"✓ {item}: 100 ÷ {number} = {result:.2f}")
            
        except ValueError as e:
            print(f"✗ {item}: 숫자가 아닙니다 - {e}")
        except ZeroDivisionError as e:
            print(f"✗ {item}: 0으로 나눌 수 없습니다 - {e}")

# 테스트 실행
print("=== 상세한 예외 처리 테스트 ===")
detailed_exception_handling()
```

### 2.2 여러 예외 처리하기

```python
# 여러 예외를 한 번에 처리
def multiple_exception_handling():
    """여러 예외를 처리하는 방법들"""
    
    test_data = [
        "123",      # 정상
        "12.34",    # 소수점 (ValueError)
        "hello",    # 문자 (ValueError)
        "",         # 빈 문자열 (ValueError)
        "12.5",     # ValueError (소수점)
    ]
    
    for data in test_data:
        try:
            # 여러 연산 수행
            number = int(data)
            result1 = 100 / number
            result2 = number ** 0.5
            
            print(f"✓ {data}: 100÷{number}={result1:.2f}, √{number}={result2:.2f}")
            
        except (ValueError, TypeError) as e:
            # 여러 예외를 함께 처리
            print(f"✗ {data}: 입력값 오류 - {e}")
            
        except (OverflowError, MemoryError) as e:
            # 시스템 리소스 관련 예외들
            print(f"⚠️ 시스템 리소스 오류: {type(e).__name__}")
            print(f"💡 해결책: 더 작은 숫자를 사용해주세요")
            
        except Exception as e:
            # 예상치 못한 모든 예외
            print(f"💥 예상치 못한 오류: {type(e).__name__}: {e}")
            print(f"🔧 개발자에게 문의해주세요")

print("=== 여러 예외 처리 테스트 ===")
multiple_exception_handling()
```

## 3. else와 finally 절

### 3.1 else 절 사용법

```python
def demonstrate_else_clause():
    """else 절 사용 예제"""
    
    test_cases = ["10", "hello", "0", "5"]
    
    for test_input in test_cases:
        print(f"\n테스트 입력: '{test_input}'")
        
        try:
            number = int(test_input)
            result = 100 / number
            
        except ValueError:
            print("  ✗ 숫자가 아닙니다")
        except ZeroDivisionError:
            print("  ✗ 0으로 나눌 수 없습니다")
        else:
            # 예외가 발생하지 않았을 때만 실행
            print(f"  ✓ 성공: 100 ÷ {number} = {result}")
            print(f"  ✓ 추가 처리: {number}의 제곱은 {number**2}")

# 파일 처리에서 else 활용
def file_processing_with_else():
    """파일 처리에서 else 절 활용"""
    
    file_data = [
        ("valid_data.txt", "123\n456\n789"),
        ("invalid_data.txt", "123\nhello\n789"),
        ("", "")  # 빈 파일명
    ]
    
    for filename, content in file_data:
        print(f"\n파일 처리: {filename}")
        
        try:
            if not filename:
                raise ValueError("파일명이 비어있습니다")
            
            # 파일 내용 처리 시뮬레이션
            lines = content.strip().split('\n') if content else []
            numbers = [int(line) for line in lines if line]
            
        except ValueError as e:
            print(f"  ✗ 오류: {e}")
        except Exception as e:
            print(f"  ✗ 예상치 못한 오류: {e}")
        else:
            # 성공적으로 처리된 경우에만 실행
            print(f"  ✓ 파일 처리 성공!")
            print(f"  ✓ 읽은 숫자들: {numbers}")
            if numbers:
                print(f"  ✓ 합계: {sum(numbers)}")
                print(f"  ✓ 평균: {sum(numbers)/len(numbers):.2f}")

print("=== else 절 테스트 ===")
demonstrate_else_clause()
print("\n=== 파일 처리 else 절 테스트 ===")
file_processing_with_else()
```

### 3.2 finally 절 사용법

```python
def demonstrate_finally_clause():
    """finally 절 사용 예제"""
    
    test_cases = ["10", "hello", "0"]
    
    for test_input in test_cases:
        print(f"\n테스트 입력: '{test_input}'")
        
        try:
            print("  → try 블록 시작")
            number = int(test_input)
            result = 100 / number
            print(f"  → 계산 성공: {result}")
            
        except ValueError:
            print("  → except: 숫자 변환 실패")
        except ZeroDivisionError:
            print("  → except: 0으로 나누기 실패")
        else:
            print("  → else: 예외 없이 성공")
        finally:
            print("  → finally: 항상 실행되는 정리 작업")

# 리소스 관리에서 finally 활용
class DatabaseConnection:
    """데이터베이스 연결 시뮬레이션 클래스"""
    
    def __init__(self, db_name):
        self.db_name = db_name
        self.is_connected = False
    
    def connect(self):
        print(f"  📡 {self.db_name} 데이터베이스에 연결 중...")
        self.is_connected = True
        print("  ✓ 연결 성공")
    
    def execute_query(self, query):
        if not self.is_connected:
            raise ConnectionError("데이터베이스에 연결되지 않았습니다")
        
        if "DROP" in query.upper():
            raise PermissionError("DROP 명령은 허용되지 않습니다")
        
        print(f"  🔍 쿼리 실행: {query}")
        return f"쿼리 '{query}' 실행 결과"
    
    def disconnect(self):
        if self.is_connected:
            print(f"  🔌 {self.db_name} 연결 해제")
            self.is_connected = False

def database_operation(db_name, query):
    """데이터베이스 작업 함수"""
    db = DatabaseConnection(db_name)
    
    try:
        db.connect()
        result = db.execute_query(query)
        print(f"  ✓ 성공: {result}")
        return result
        
    except ConnectionError as e:
        print(f"  ✗ 연결 오류: {e}")
    except PermissionError as e:
        print(f"  ✗ 권한 오류: {e}")
    except Exception as e:
        print(f"  ✗ 기타 오류: {e}")
    finally:
        # 예외 발생 여부와 관계없이 항상 연결 해제
        db.disconnect()
        print("  🧹 리소스 정리 완료")

# 테스트
print("=== finally 절 테스트 ===")
demonstrate_finally_clause()

print("\n=== 리소스 관리 finally 테스트 ===")
queries = [
    ("UserDB", "SELECT * FROM users"),
    ("UserDB", "DROP TABLE users"),  # 권한 오류
    ("", "SELECT * FROM products")    # 빈 DB명
]

for db_name, query in queries:
    print(f"\n데이터베이스 작업: {db_name} - {query}")
    database_operation(db_name, query)
```

## 4. 사용자 정의 예외

### 4.1 커스텀 예외 클래스 만들기

```python
# 기본 사용자 정의 예외
class CustomError(Exception):
    """기본 사용자 정의 예외"""
    pass

class ValidationError(Exception):
    """유효성 검사 예외"""
    def __init__(self, message, field_name=None):
        super().__init__(message)
        self.field_name = field_name
    
    def __str__(self):
        if self.field_name:
            return f"[{self.field_name}] {super().__str__()}"
        return super().__str__()

class BusinessLogicError(Exception):
    """비즈니스 로직 예외"""
    def __init__(self, message, error_code=None):
        super().__init__(message)
        self.error_code = error_code
    
    def __str__(self):
        if self.error_code:
            return f"[코드: {self.error_code}] {super().__str__()}"
        return super().__str__()

# 사용자 정의 예외 활용 예제
class UserAccount:
    """사용자 계정 클래스"""
    
    def __init__(self, username, email, age):
        self.username = self._validate_username(username)
        self.email = self._validate_email(email)
        self.age = self._validate_age(age)
        self.balance = 0
    
    def _validate_username(self, username):
        if not username:
            raise ValidationError("사용자명은 필수입니다", "username")
        if len(username) < 3:
            raise ValidationError("사용자명은 3자 이상이어야 합니다", "username")
        if not username.isalnum():
            raise ValidationError("사용자명은 영문자와 숫자만 허용됩니다", "username")
        return username
    
    def _validate_email(self, email):
        if not email:
            raise ValidationError("이메일은 필수입니다", "email")
        if "@" not in email or "." not in email:
            raise ValidationError("올바른 이메일 형식이 아닙니다", "email")
        return email
    
    def _validate_age(self, age):
        if not isinstance(age, int):
            raise ValidationError("나이는 정수여야 합니다", "age")
        if age < 0:
            raise ValidationError("나이는 0 이상이어야 합니다", "age")
        if age > 150:
            raise ValidationError("나이는 150 이하여야 합니다", "age")
        return age
    
    def deposit(self, amount):
        if amount <= 0:
            raise BusinessLogicError("입금액은 0보다 커야 합니다", "INVALID_AMOUNT")
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise BusinessLogicError("출금액은 0보다 커야 합니다", "INVALID_AMOUNT")
        if amount > self.balance:
            raise BusinessLogicError("잔액이 부족합니다", "INSUFFICIENT_FUNDS")
        self.balance -= amount
        return self.balance

# 사용자 정의 예외 테스트
def test_custom_exceptions():
    """사용자 정의 예외 테스트"""
    
    # 유효한 계정 생성
    print("=== 사용자 정의 예외 테스트 ===")
    
    try:
        user = UserAccount("john123", "john@email.com", 25)
        print(f"✓ 계정 생성 성공: {user.username}")
        
        # 정상 거래
        user.deposit(1000)
        print(f"✓ 입금 성공, 잔액: {user.balance}")
        
        user.withdraw(300)
        print(f"✓ 출금 성공, 잔액: {user.balance}")
        
    except ValidationError as e:
        print(f"✗ 유효성 검사 실패: {e}")
    except BusinessLogicError as e:
        print(f"✗ 비즈니스 로직 오류: {e}")
    
    # 잘못된 계정 생성 테스트
    invalid_users = [
        ("", "john@email.com", 25),           # 빈 사용자명
        ("jo", "john@email.com", 25),         # 짧은 사용자명
        ("john!", "john@email.com", 25),      # 특수문자 포함
        ("john123", "invalid-email", 25),     # 잘못된 이메일
        ("john123", "john@email.com", -5),    # 음수 나이
        ("john123", "john@email.com", 200),   # 너무 큰 나이
    ]
    
    for username, email, age in invalid_users:
        try:
            user = UserAccount(username, email, age)
            print(f"✓ 계정 생성: {username}")
        except ValidationError as e:
            print(f"✗ {username}: {e}")
        except Exception as e:
            print(f"✗ {username}: 예상치 못한 오류 - {e}")

test_custom_exceptions()
```

### 4.2 예외 체인과 컨텍스트

```python
# 예외 체인 (Exception Chaining)
def divide_numbers(a, b):
    """숫자 나누기 함수"""
    try:
        return a / b
    except ZeroDivisionError as e:
        # 원본 예외를 유지하면서 새로운 예외 발생
        raise BusinessLogicError("계산 중 오류가 발생했습니다") from e

def process_user_input():
    """사용자 입력 처리 함수"""
    try:
        user_input = "10 0"  # 시뮬레이션
        numbers = user_input.split()
        a, b = int(numbers[0]), int(numbers[1])
        result = divide_numbers(a, b)
        return result
    except (ValueError, IndexError) as e:
        raise ValidationError("입력 형식이 올바르지 않습니다") from e
    except BusinessLogicError:
        # 이미 적절한 예외이므로 그대로 전파
        raise

# 예외 체인 테스트
def test_exception_chaining():
    """예외 체인 테스트"""
    print("\n=== 예외 체인 테스트 ===")
    
    try:
        result = process_user_input()
        print(f"결과: {result}")
    except ValidationError as e:
        print(f"✗ 유효성 오류: {e}")
        if e.__cause__:
            print(f"  원인: {type(e.__cause__).__name__}: {e.__cause__}")
    except BusinessLogicError as e:
        print(f"✗ 비즈니스 로직 오류: {e}")
        if e.__cause__:
            print(f"  원인: {type(e.__cause__).__name__}: {e.__cause__}")

test_exception_chaining()
```

## 5. 디버깅 기법

### 5.1 print를 이용한 디버깅

```python
def debug_with_print():
    """print를 사용한 디버깅 예제"""
    
    def calculate_average(numbers):
        """평균 계산 함수 (디버그 버전)"""
        print(f"[DEBUG] 입력받은 숫자들: {numbers}")
        print(f"[DEBUG] 입력 타입: {type(numbers)}")
        
        if not numbers:
            print("[DEBUG] 빈 리스트입니다")
            return 0
        
        total = 0
        for i, num in enumerate(numbers):
            print(f"[DEBUG] {i}번째 숫자: {num} (타입: {type(num)})")
            total += num
            print(f"[DEBUG] 현재 합계: {total}")
        
        average = total / len(numbers)
        print(f"[DEBUG] 최종 평균: {average}")
        return average
    
    # 테스트 데이터
    test_cases = [
        [1, 2, 3, 4, 5],
        [],
        [10.5, 20.5, 30.0],
        ["10", 20, 30]  # 의도적 타입 혼재
    ]
    
    for i, test_data in enumerate(test_cases, 1):
        print(f"\n--- 테스트 케이스 {i} ---")
        try:
            result = calculate_average(test_data)
            print(f"✓ 결과: {result}")
        except Exception as e:
            print(f"✗ 오류 발생: {type(e).__name__}: {e}")

# 조건부 디버그 출력
DEBUG_MODE = True

def debug_print(*args, **kwargs):
    """조건부 디버그 출력 함수"""
    if DEBUG_MODE:
        print("[DEBUG]", *args, **kwargs)

def improved_function():
    """개선된 디버깅 함수"""
    
    def process_data(data):
        debug_print(f"데이터 처리 시작: {data}")
        
        try:
            # 데이터 검증
            if not isinstance(data, list):
                debug_print(f"리스트가 아닌 타입: {type(data)}")
                data = [data]
            
            # 숫자 변환
            numbers = []
            for item in data:
                debug_print(f"항목 처리: {item}")
                if isinstance(item, str):
                    try:
                        converted = float(item)
                        debug_print(f"문자열 '{item}'을 {converted}로 변환")
                        numbers.append(converted)
                    except ValueError:
                        debug_print(f"변환 실패: '{item}'")
                        continue
                elif isinstance(item, (int, float)):
                    numbers.append(item)
                    debug_print(f"숫자 추가: {item}")
            
            debug_print(f"최종 숫자 리스트: {numbers}")
            return sum(numbers) / len(numbers) if numbers else 0
            
        except Exception as e:
            debug_print(f"예외 발생: {e}")
            raise

    # 테스트
    test_data = ["10", 20, "hello", 30.5, "40"]
    result = process_data(test_data)
    print(f"최종 결과: {result}")

print("=== Print 디버깅 테스트 ===")
debug_with_print()
print("\n=== 조건부 디버깅 테스트 ===")
improved_function()
```

### 5.2 assert를 이용한 디버깅

```python
def debug_with_assert():
    """assert를 사용한 디버깅"""
    
    def validate_user_age(age):
        """나이 유효성 검사 함수"""
        # 전제 조건 검사
        assert isinstance(age, int), f"나이는 정수여야 합니다. 받은 타입: {type(age)}"
        assert age >= 0, f"나이는 0 이상이어야 합니다. 받은 값: {age}"
        assert age <= 150, f"나이는 150 이하여야 합니다. 받은 값: {age}"
        
        return True
    
    def calculate_life_stage(age):
        """인생 단계 계산 함수"""
        validate_user_age(age)
        
        if age < 13:
            stage = "child"
        elif age < 20:
            stage = "teenager"
        elif age < 60:
            stage = "adult"
        else:
            stage = "senior"
        
        # 후제 조건 검사
        assert stage in ["child", "teenager", "adult", "senior"], \
               f"예상치 못한 단계: {stage}"
        
        return stage
    
    # 테스트 케이스
    test_ages = [5, 15, 30, 70, -1, 200, "25"]
    
    for age in test_ages:
        try:
            stage = calculate_life_stage(age)
            print(f"✓ 나이 {age}: {stage}")
        except AssertionError as e:
            print(f"✗ 나이 {age}: 검증 실패 - {e}")
        except Exception as e:
            print(f"✗ 나이 {age}: 오류 - {type(e).__name__}: {e}")

# 디버그 모드에서만 assert 활성화
def debug_mode_assert():
    """디버그 모드 assert 예제"""
    
    def complex_calculation(x, y, operation):
        """복잡한 계산 함수"""
        # 디버그 모드에서만 실행되는 검증
        assert isinstance(x, (int, float)), "x는 숫자여야 합니다"
        assert isinstance(y, (int, float)), "y는 숫자여야 합니다"
        assert operation in ["add", "subtract", "multiply", "divide"], \
               f"지원하지 않는 연산: {operation}"
        
        if operation == "add":
            result = x + y
        elif operation == "subtract":
            result = x - y
        elif operation == "multiply":
            result = x * y
        elif operation == "divide":
            assert y != 0, "0으로 나눌 수 없습니다"
            result = x / y
        
        # 결과 검증
        assert isinstance(result, (int, float)), "결과가 숫자가 아닙니다"
        
        return result
    
    # 테스트
    operations = [
        (10, 5, "add"),
        (10, 5, "divide"),
        (10, 0, "divide"),  # assert 실패
        (10, "5", "multiply")  # assert 실패
    ]
    
    for x, y, op in operations:
        try:
            result = complex_calculation(x, y, op)
            print(f"✓ {x} {op} {y} = {result}")
        except AssertionError as e:
            print(f"✗ {x} {op} {y}: {e}")
        except Exception as e:
            print(f"✗ {x} {op} {y}: {type(e).__name__}: {e}")

print("\n=== Assert 디버깅 테스트 ===")
debug_with_assert()
print("\n=== 디버그 모드 Assert 테스트 ===")
debug_mode_assert()
```

### 5.3 로깅을 이용한 디버깅

```python
import logging
from datetime import datetime

# 로깅 설정
def setup_logging():
    """로깅 설정 함수"""
    # 기본 설정
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(),  # 콘솔 출력
        ]
    )

def logging_debug_example():
    """로깅을 사용한 디버깅 예제"""
    
    # 로거 생성
    logger = logging.getLogger('CalculatorApp')
    
    class AdvancedCalculator:
        def __init__(self):
            self.logger = logging.getLogger('CalculatorApp.Calculator')
            self.history = []
        
        def calculate(self, expression):
            """수식 계산 함수"""
            self.logger.info(f"계산 요청: {expression}")
            
            try:
                # 입력 검증
                if not expression or not isinstance(expression, str):
                    self.logger.warning(f"잘못된 입력: {expression}")
                    raise ValueError("올바른 수식을 입력해주세요")
                
                # 보안 검사 (간단한 예제)
                dangerous_chars = ['import', 'exec', 'eval', '__']
                for char in dangerous_chars:
                    if char in expression.lower():
                        self.logger.error(f"보안 위험 감지: {char} in {expression}")
                        raise SecurityError("위험한 문자가 포함되어 있습니다")
                
                # 계산 실행
                self.logger.debug(f"수식 평가 시작: {expression}")
                result = eval(expression)  # 실제로는 안전한 파서 사용 권장
                self.logger.debug(f"계산 결과: {result}")
                
                # 히스토리 저장
                calculation = {
                    'expression': expression,
                    'result': result,
                    'timestamp': datetime.now()
                }
                self.history.append(calculation)
                self.logger.info(f"히스토리 저장: {expression} = {result}")
                
                return result
                
            except ZeroDivisionError:
                self.logger.error("0으로 나누기 오류 발생")
                raise
            except SyntaxError as e:
                self.logger.error(f"수식 구문 오류: {e}")
                raise ValueError("올바르지 않은 수식입니다")
            except Exception as e:
                self.logger.critical(f"예상치 못한 오류: {e}")
                raise
        
        def get_history(self):
            """히스토리 조회"""
            self.logger.debug(f"히스토리 조회: {len(self.history)}개 항목")
            return self.history
    
    # 테스트
    calculator = AdvancedCalculator()
    test_expressions = [
        "2 + 3",
        "10 / 2",
        "10 / 0",  # 오류
        "2 * 3 + 4",
        "invalid expression",  # 구문 오류
        "import os"  # 보안 위험
    ]
    
    for expr in test_expressions:
        try:
            result = calculator.calculate(expr)
            logger.info(f"성공: {expr} = {result}")
        except Exception as e:
            logger.error(f"실패: {expr} - {e}")
    
    # 히스토리 출력
    history = calculator.get_history()
    logger.info(f"총 {len(history)}개의 성공한 계산")

# 보안 예외 클래스
class SecurityError(Exception):
    pass

# 로깅 레벨별 예제
def logging_levels_example():
    """로깅 레벨별 사용 예제"""
    
    logger = logging.getLogger('UserService')
    
    def process_user_registration(username, email, password):
        """사용자 등록 처리"""
        logger.debug(f"사용자 등록 처리 시작: {username}")
        
        # INFO: 일반적인 작업 진행 상황
        logger.info(f"새 사용자 등록 시도: {username}")
        
        # WARNING: 주의할 점
        if len(password) < 8:
            logger.warning(f"약한 비밀번호 사용: {username}")
        
        # ERROR: 복구 가능한 오류
        if "@" not in email:
            logger.error(f"잘못된 이메일 형식: {email}")
            return False
        
        # CRITICAL: 심각한 오류
        if username in ["admin", "root", "system"]:
            logger.critical(f"예약된 사용자명 사용 시도: {username}")
            return False
        
        logger.info(f"사용자 등록 성공: {username}")
        return True
    
    # 테스트
    users = [
        ("john", "john@email.com", "password123"),
        ("jane", "jane@email.com", "123"),  # 약한 비밀번호
        ("bob", "invalid-email", "strongpass"),  # 잘못된 이메일
        ("admin", "admin@email.com", "adminpass")  # 예약된 이름
    ]
    
    for username, email, password in users:
        success = process_user_registration(username, email, password)
        if success:
            logger.info(f"✓ {username} 등록 완료")
        else:
            logger.error(f"✗ {username} 등록 실패")

# 테스트 실행
print("=== 로깅 디버깅 테스트 ===")
setup_logging()
logging_debug_example()
print("\n=== 로깅 레벨별 테스트 ===")
logging_levels_example()
```

## 6. 실용적인 에러 처리 패턴

### 6.1 입력 검증과 에러 처리

```python
def input_validation_patterns():
    """입력 검증 패턴 예제"""
    
    def validate_and_convert_input(user_input, expected_type, min_val=None, max_val=None):
        """범용 입력 검증 함수"""
        try:
            # 타입 변환
            if expected_type == int:
                value = int(user_input)
            elif expected_type == float:
                value = float(user_input)
            elif expected_type == str:
                value = str(user_input).strip()
                if not value:
                    raise ValueError("빈 문자열은 허용되지 않습니다")
            else:
                raise ValueError(f"지원하지 않는 타입: {expected_type}")
            
            # 범위 검증
            if min_val is not None and value < min_val:
                raise ValueError(f"값이 최솟값 {min_val}보다 작습니다: {value}")
            if max_val is not None and value > max_val:
                raise ValueError(f"값이 최댓값 {max_val}보다 큽니다: {value}")
            
            return value
            
        except ValueError as e:
            if "invalid literal" in str(e):
                raise ValueError(f"'{user_input}'을 {expected_type.__name__}로 변환할 수 없습니다")
            raise
    
    # 사용자 정보 입력 예제
    def get_user_info():
        """사용자 정보 입력 받기"""
        user_inputs = [
            ("25", int, 0, 120),        # 나이
            ("75.5", float, 0, 300),    # 체중
            ("John Doe", str, None, None),  # 이름
            ("-5", int, 0, 120),        # 잘못된 나이
            ("hello", int, 0, 120),     # 잘못된 타입
            ("", str, None, None)       # 빈 문자열
        ]
        
        field_names = ["나이", "체중", "이름", "나이(음수)", "나이(문자)", "이름(빈값)"]
        
        results = {}
        for (user_input, expected_type, min_val, max_val), field_name in zip(user_inputs, field_names):
            try:
                value = validate_and_convert_input(user_input, expected_type, min_val, max_val)
                results[field_name] = value
                print(f"✓ {field_name}: '{user_input}' → {value}")
            except ValueError as e:
                print(f"✗ {field_name}: {e}")
        
        return results
    
    return get_user_info()

# 파일 처리 에러 패턴
def file_processing_patterns():
    """파일 처리 에러 패턴"""
    
    def safe_file_operation(filename, operation="read", content=None):
        """안전한 파일 작업 함수"""
        try:
            if operation == "read":
                # 파일 존재 확인
                import os
                if not os.path.exists(filename):
                    raise FileNotFoundError(f"파일을 찾을 수 없습니다: {filename}")
                
                # 파일 읽기
                with open(filename, 'r', encoding='utf-8') as file:
                    content = file.read()
                    print(f"✓ 파일 읽기 성공: {len(content)}자")
                    return content
                    
            elif operation == "write":
                if content is None:
                    raise ValueError("쓸 내용이 제공되지 않았습니다")
                
                # 파일 쓰기
                with open(filename, 'w', encoding='utf-8') as file:
                    file.write(content)
                    print(f"✓ 파일 쓰기 성공: {len(content)}자")
                    return True
                    
        except FileNotFoundError as e:
            print(f"✗ 파일 없음: {e}")
            return None
        except PermissionError as e:
            print(f"✗ 권한 오류: {e}")
            return None
        except UnicodeDecodeError as e:
            print(f"✗ 인코딩 오류: {e}")
            return None
        except Exception as e:
            print(f"✗ 예상치 못한 오류: {type(e).__name__}: {e}")
            return None
    
    # 테스트
    test_operations = [
        ("existing_file.txt", "read", None),
        ("nonexistent.txt", "read", None),
        ("output.txt", "write", "안녕하세요!\n테스트 내용입니다."),
        ("/root/protected.txt", "write", "권한 테스트")  # 권한 오류 (시뮬레이션)
    ]
    
    for filename, operation, content in test_operations:
        print(f"\n파일 작업: {filename} ({operation})")
        result = safe_file_operation(filename, operation, content)

# 네트워크 요청 에러 패턴
def network_request_patterns():
    """네트워크 요청 에러 패턴 (시뮬레이션)"""
    
    import time
    import random
    
    class NetworkError(Exception):
        pass
    
    class TimeoutError(NetworkError):
        pass
    
    class ConnectionError(NetworkError):
        pass
    
    def simulate_network_request(url, timeout=5, max_retries=3):
        """네트워크 요청 시뮬레이션"""
        
        for attempt in range(max_retries):
            try:
                print(f"  시도 {attempt + 1}/{max_retries}: {url}")
                
                # 랜덤하게 다양한 상황 시뮬레이션
                rand = random.random()
                if rand < 0.3:  # 30% 확률로 연결 오류
                    raise ConnectionError("서버에 연결할 수 없습니다")
                elif rand < 0.5:  # 20% 확률로 타임아웃
                    raise TimeoutError("요청 시간이 초과되었습니다")
                elif rand < 0.7:  # 20% 확률로 일반적인 네트워크 오류
                    raise NetworkError("네트워크 오류가 발생했습니다")
                
                # 성공
                time.sleep(0.1)  # 실제 요청 시뮬레이션
                return f"성공: {url}에서 데이터를 받았습니다"
                
            except (ConnectionError, TimeoutError) as e:
                print(f"    ✗ {e}")
                if attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2  # 재시도 간격 증가
                    print(f"    ⏳ {wait_time}초 후 재시도...")
                    time.sleep(0.1)  # 실제로는 time.sleep(wait_time)
                else:
                    print(f"    ✗ 최대 재시도 횟수 초과")
                    raise
            except NetworkError as e:
                print(f"    ✗ 복구 불가능한 오류: {e}")
                raise
            except Exception as e:
                print(f"    ✗ 예상치 못한 오류: {e}")
                raise
    
    # 테스트
    urls = [
        "https://api.example.com/data",
        "https://api.example.com/users",
        "https://api.example.com/products"
    ]
    
    for url in urls:
        try:
            result = simulate_network_request(url)
            print(f"✓ {result}")
        except Exception as e:
            print(f"✗ 최종 실패: {e}")

print("=== 입력 검증 패턴 테스트 ===")
input_validation_patterns()

print("\n=== 파일 처리 패턴 테스트 ===")
file_processing_patterns()

print("\n=== 네트워크 요청 패턴 테스트 ===")
network_request_patterns()
```

## 7. 연습 문제

### 연습 1: 안전한 사용자 입력 처리기
다양한 타입의 사용자 입력을 안전하게 처리하는 함수를 작성하세요.

### 연습 2: 로그 파일 분석기
로그 파일을 읽어서 에러 패턴을 분석하는 프로그램을 작성하세요.

### 연습 3: 견고한 API 클라이언트
네트워크 오류와 재시도 로직을 포함한 API 클라이언트를 작성하세요.

### 연습 4: 데이터 검증 시스템
복잡한 데이터 구조의 유효성을 검사하는 시스템을 만드세요.

## 정리

이 챕터에서 학습한 내용:

1. **에러와 예외**: 문법 에러와 런타임 에러의 차이점과 종류
2. **try-except 문**: 기본 예외 처리와 다양한 활용법
3. **else와 finally**: 예외 처리 흐름 제어와 리소스 정리
4. **사용자 정의 예외**: 커스텀 예외 클래스와 예외 체인
5. **디버깅 기법**: print, assert, 로깅을 활용한 디버깅
6. **실용적 패턴**: 입력 검증, 파일 처리, 네트워크 요청 등

다음 챕터에서는 파일 입출력을 학습하여 데이터 저장과 읽기 방법을 배워보겠습니다.

### 핵심 포인트
- 예외 처리는 프로그램의 안정성을 위해 필수적입니다
- 구체적인 예외 타입을 사용하여 정확한 처리를 하세요
- finally 블록으로 리소스 정리를 보장하세요
- 적절한 로깅으로 디버깅과 모니터링을 효과적으로 하세요
- 사용자 정의 예외로 의미있는 에러 메시지를 제공하세요 

---

## 🎨 사용자 정의 예외: 나만의 에러 만들기

### 💡 왜 사용자 정의 예외가 필요할까?

사용자 정의 예외는 마치 **맞춤형 경고 시스템**과 같습니다. 일반적인 에러 메시지보다 더 구체적이고 의미 있는 정보를 제공할 수 있어요!

```python
print("=== 🎨 사용자 정의 예외: 맞춤형 에러 시스템 ===")

# 기본 사용자 정의 예외들
class GameError(Exception):
    """게임 관련 기본 예외"""
    pass

class PlayerNotFoundError(GameError):
    """플레이어를 찾을 수 없을 때"""
    def __init__(self, player_name):
        self.player_name = player_name
        super().__init__(f"플레이어 '{player_name}'를 찾을 수 없습니다")

class InsufficientFundsError(GameError):
    """자금이 부족할 때"""
    def __init__(self, required, available):
        self.required = required
        self.available = available
        super().__init__(f"자금 부족: 필요 {required:,}원, 보유 {available:,}원")

class InvalidLevelError(GameError):
    """잘못된 레벨일 때"""
    def __init__(self, level, min_level, max_level):
        self.level = level
        self.min_level = min_level
        self.max_level = max_level
        super().__init__(f"레벨 {level}은 유효하지 않습니다 (범위: {min_level}-{max_level})")

# 게임 시스템 시뮬레이션
class RPGGame:
    """RPG 게임 시스템"""
    
    def __init__(self):
        self.players = {
            "hero123": {"name": "용사", "level": 15, "gold": 50000},
            "mage456": {"name": "마법사", "level": 8, "gold": 25000},
            "archer789": {"name": "궁수", "level": 12, "gold": 35000}
        }
        
        self.items = {
            "sword": {"name": "전설의 검", "price": 100000, "min_level": 20},
            "staff": {"name": "마법 지팡이", "price": 30000, "min_level": 10},
            "bow": {"name": "엘프의 활", "price": 45000, "min_level": 15}
        }
    
    def buy_item(self, player_id, item_id):
        """아이템 구매 시스템"""
        print(f"\n🛒 아이템 구매 시도: {player_id} → {item_id}")
        
        try:
            # 플레이어 확인
            if player_id not in self.players:
                raise PlayerNotFoundError(player_id)
            
            player = self.players[player_id]
            
            # 아이템 확인
            if item_id not in self.items:
                raise GameError(f"아이템 '{item_id}'를 찾을 수 없습니다")
            
            item = self.items[item_id]
            
            # 레벨 확인
            if player["level"] < item["min_level"]:
                raise InvalidLevelError(
                    player["level"], 
                    item["min_level"], 
                    100
                )
            
            # 자금 확인
            if player["gold"] < item["price"]:
                raise InsufficientFundsError(item["price"], player["gold"])
            
            # 구매 성공
            player["gold"] -= item["price"]
            print(f"   ✅ 구매 성공!")
            print(f"   🎁 {player['name']}이(가) {item['name']}을(를) 구매했습니다!")
            print(f"   💰 남은 골드: {player['gold']:,}원")
            
        except PlayerNotFoundError as e:
            print(f"   ❌ 플레이어 오류: {e}")
            print(f"   💡 회원가입을 먼저 해주세요")
            
        except InvalidLevelError as e:
            print(f"   ❌ 레벨 오류: {e}")
            print(f"   💡 레벨업을 먼저 해주세요")
            
        except InsufficientFundsError as e:
            print(f"   ❌ 자금 오류: {e}")
            print(f"   💡 퀘스트를 완료하여 골드를 모아주세요")
            
        except GameError as e:
            print(f"   ❌ 게임 오류: {e}")
            
        except Exception as e:
            print(f"   💥 시스템 오류: {e}")

# 게임 테스트
game = RPGGame()

test_purchases = [
    ("hero123", "staff"),      # 성공
    ("mage456", "sword"),      # 레벨 부족
    ("archer789", "bow"),      # 자금 부족
    ("noob000", "bow"),       # 플레이어 없음
    ("hero123", "shield"),    # 아이템 없음
]

for player_id, item_id in test_purchases:
    game.buy_item(player_id, item_id)

# 은행 시스템 예제
class BankError(Exception):
    """은행 관련 기본 예외"""
    pass

class AccountNotFoundError(BankError):
    """계좌를 찾을 수 없을 때"""
    def __init__(self, account_number):
        self.account_number = account_number
        super().__init__(f"계좌번호 {account_number}를 찾을 수 없습니다")

class InsufficientBalanceError(BankError):
    """잔액 부족"""
    def __init__(self, requested, available):
        self.requested = requested
        self.available = available
        super().__init__(f"잔액 부족: 요청 {requested:,}원, 잔액 {available:,}원")

class DailyLimitExceededError(BankError):
    """일일 한도 초과"""
    def __init__(self, amount, daily_limit):
        self.amount = amount
        self.daily_limit = daily_limit
        super().__init__(f"일일 한도 초과: 요청 {amount:,}원, 한도 {daily_limit:,}원")

class BankingSystem:
    """은행 시스템"""
    
    def __init__(self):
        self.accounts = {
            "123-456-789": {"name": "김철수", "balance": 1000000, "daily_used": 0},
            "987-654-321": {"name": "이영희", "balance": 500000, "daily_used": 200000},
            "555-666-777": {"name": "박민수", "balance": 50000, "daily_used": 0}
        }
        self.daily_limit = 1000000  # 일일 한도 100만원
    
    def withdraw(self, account_number, amount):
        """출금 처리"""
        print(f"\n💳 출금 요청: {account_number} → {amount:,}원")
        
        try:
            # 계좌 확인
            if account_number not in self.accounts:
                raise AccountNotFoundError(account_number)
            
            account = self.accounts[account_number]
            
            # 금액 검증
            if amount <= 0:
                raise BankError("출금 금액은 0보다 커야 합니다")
            
            # 잔액 확인
            if amount > account["balance"]:
                raise InsufficientBalanceError(amount, account["balance"])
            
            # 일일 한도 확인
            if account["daily_used"] + amount > self.daily_limit:
                remaining_limit = self.daily_limit - account["daily_used"]
                raise DailyLimitExceededError(amount, remaining_limit)
            
            # 출금 성공
            account["balance"] -= amount
            account["daily_used"] += amount
            
            print(f"   ✅ 출금 완료!")
            print(f"   👤 고객: {account['name']}")
            print(f"   💰 출금액: {amount:,}원")
            print(f"   💳 잔액: {account['balance']:,}원")
            print(f"   📊 오늘 사용액: {account['daily_used']:,}원")
            
        except AccountNotFoundError as e:
            print(f"   ❌ 계좌 오류: {e}")
            print(f"   💡 계좌번호를 다시 확인해주세요")
            
        except InsufficientBalanceError as e:
            print(f"   ❌ 잔액 부족: {e}")
            print(f"   💡 입금 후 다시 시도해주세요")
            
        except DailyLimitExceededError as e:
            print(f"   ❌ 한도 초과: {e}")
            print(f"   💡 내일 다시 시도하거나 한도를 늘려주세요")
            
        except BankError as e:
            print(f"   ❌ 은행 오류: {e}")
            
        except Exception as e:
            print(f"   💥 시스템 오류: {e}")

# 은행 시스템 테스트
print(f"\n🏦 은행 시스템 테스트:")
bank = BankingSystem()

test_withdrawals = [
    ("123-456-789", 100000),   # 성공
    ("987-654-321", 900000),   # 일일 한도 초과
    ("555-666-777", 100000),   # 잔액 부족
    ("000-000-000", 50000),    # 계좌 없음
    ("123-456-789", -10000),   # 음수 금액
]

for account, amount in test_withdrawals:
    bank.withdraw(account, amount)
```

---

## 🔍 디버깅: 코드 탐정이 되어보자!

### 💡 디버깅은 현실 속 문제 해결과 똑같아요!

디버깅은 마치 **의사가 환자를 진단**하거나 **탐정이 사건을 수사**하는 것과 같습니다. 증상을 관찰하고, 원인을 찾고, 해결책을 적용하는 과정이죠!

```python
print("=== 🔍 디버깅: 코드 의사가 되어보자! ===")

def buggy_shopping_cart():
    """버그가 있는 쇼핑카트 시스템 - 디버깅 연습용"""
    
    # 🛒 쇼핑카트 시뮬레이션
    cart = []
    products = {
        "사과": 3000,
        "바나나": 2000,
        "오렌지": 4000,
        "포도": 5000
    }
    
    print("🛒 온라인 쇼핑몰에 오신 것을 환영합니다!")
    print(f"📦 상품 목록: {list(products.keys())}")
    
    # 고객 주문 시뮬레이션
    orders = [
        {"product": "사과", "quantity": 2},
        {"product": "바나나", "quantity": 3},
        {"product": "딸기", "quantity": 1},  # 🐛 없는 상품!
        {"product": "오렌지", "quantity": "많이"},  # 🐛 잘못된 수량!
        {"product": "포도", "quantity": 1}
    ]
    
    total_price = 0
    
    for order in orders:
        product = order["product"]
        quantity = order["quantity"]
        
        print(f"\n📝 주문 처리: {product} {quantity}개")
        
        try:
            # 🔍 디버깅 포인트 1: 상품 존재 확인
            if product not in products:
                print(f"   ❌ 오류: '{product}'는 판매하지 않는 상품입니다")
                print(f"   💡 디버깅 힌트: 상품명을 확인해보세요")
                continue
            
            # 🔍 디버깅 포인트 2: 수량 타입 확인
            if not isinstance(quantity, int):
                print(f"   ❌ 오류: 수량은 숫자여야 합니다 (입력값: {quantity})")
                print(f"   💡 디버깅 힌트: 수량 데이터 타입을 확인해보세요")
                continue
            
            # 🔍 디버깅 포인트 3: 수량 범위 확인
            if quantity <= 0:
                print(f"   ❌ 오류: 수량은 1개 이상이어야 합니다")
                print(f"   💡 디버깅 힌트: 수량 값의 범위를 확인해보세요")
                continue
            
            # 정상 처리
            price = products[product]
            subtotal = price * quantity
            total_price += subtotal
            
            cart.append({
                "product": product,
                "quantity": quantity,
                "price": price,
                "subtotal": subtotal
            })
            
            print(f"   ✅ 성공: {product} {quantity}개 = {subtotal:,}원")
            
        except Exception as e:
            print(f"   💥 예상치 못한 오류: {e}")
            print(f"   🔧 개발팀에 문의하세요")
    
    # 최종 결과
    print(f"\n🧾 주문 요약:")
    if cart:
        for item in cart:
            print(f"   {item['product']}: {item['quantity']}개 × {item['price']:,}원 = {item['subtotal']:,}원")
        print(f"   💰 총 금액: {total_price:,}원")
    else:
        print(f"   🛒 장바구니가 비어있습니다")

buggy_shopping_cart()
```

### 🕵️ print() 디버깅: 가장 기본적인 탐정 도구

print() 함수는 **디버깅의 가장 기본적인 도구**입니다. 마치 의사가 환자에게 "어디가 아픈가요?"라고 묻는 것처럼, 코드에게 "지금 뭘 하고 있나요?"라고 묻는 거죠!

```python
print("=== 🕵️ print() 디버깅 마스터 클래스 ===")

def debug_student_grade_system():
    """학생 성적 시스템 - print 디버깅 활용"""
    
    students = [
        {"name": "김철수", "scores": [85, 92, 78]},
        {"name": "이영희", "scores": [90, 88, 95]},
        {"name": "박민수", "scores": [76, 82, 79]},
        {"name": "최지영", "scores": [88, 91, 87]}
    ]
    
    print("📊 학생 성적 처리 시스템 (디버깅 버전)")
    print("=" * 40)
    
    for i, student in enumerate(students):
        print(f"\n🔍 DEBUG: 학생 {i+1} 처리 시작")
        print(f"🔍 DEBUG: 학생 데이터 = {student}")
        
        name = student["name"]
        scores = student["scores"]
        
        print(f"🔍 DEBUG: 이름 = {name}")
        print(f"🔍 DEBUG: 점수 목록 = {scores}")
        print(f"🔍 DEBUG: 점수 개수 = {len(scores)}")
        
        # 평균 계산
        total = sum(scores)
        print(f"🔍 DEBUG: 총점 = {total}")
        
        average = total / len(scores)
        print(f"🔍 DEBUG: 평균 = {average}")
        
        # 등급 계산
        if average >= 90:
            grade = "A"
        elif average >= 80:
            grade = "B"
        elif average >= 70:
            grade = "C"
        else:
            grade = "D"
        
        print(f"🔍 DEBUG: 등급 = {grade}")
        
        # 최종 결과
        print(f"📋 결과: {name} - 평균 {average:.1f}점, 등급 {grade}")
        print(f"🔍 DEBUG: 학생 {i+1} 처리 완료\n")

debug_student_grade_system()

# 조건부 디버깅 - 필요할 때만 디버그 정보 출력
DEBUG_MODE = True  # 디버그 모드 on/off

def debug_print(message, level="INFO"):
    """조건부 디버그 출력 함수"""
    if DEBUG_MODE:
        print(f"🔍 [{level}] {message}")

def smart_calculator_with_debug(a, b, operation):
    """스마트 계산기 - 조건부 디버깅"""
    
    debug_print(f"계산기 호출: a={a}, b={b}, operation={operation}")
    
    try:
        debug_print("입력값 타입 검사 시작")
        
        # 타입 검사
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            debug_print("타입 오류 발견!", "ERROR")
            raise TypeError("숫자만 입력 가능합니다")
        
        debug_print("타입 검사 통과")
        debug_print(f"연산 수행: {a} {operation} {b}")
        
        # 연산 수행
        if operation == "+":
            result = a + b
        elif operation == "-":
            result = a - b
        elif operation == "*":
            result = a * b
        elif operation == "/":
            if b == 0:
                debug_print("0으로 나누기 시도 감지!", "ERROR")
                raise ZeroDivisionError("0으로 나눌 수 없습니다")
            result = a / b
        else:
            debug_print(f"지원하지 않는 연산: {operation}", "ERROR")
            raise ValueError(f"지원하지 않는 연산: {operation}")
        
        debug_print(f"연산 결과: {result}")
        return result
        
    except Exception as e:
        debug_print(f"예외 발생: {e}", "ERROR")
        raise

print(f"\n🧮 스마트 계산기 테스트 (디버그 모드):")
test_cases = [
    (10, 5, "+"),
    (10, 0, "/"),
    ("10", 5, "+"),
    (10, 5, "^")
]

for a, b, op in test_cases:
    try:
        result = smart_calculator_with_debug(a, b, op)
        print(f"✅ {a} {op} {b} = {result}")
    except Exception as e:
        print(f"❌ {a} {op} {b} → 오류: {e}")
    print()
```

### 🔧 assert문: 코드의 안전장치

assert문은 마치 **자동차의 안전벨트**와 같습니다. 예상한 조건이 맞는지 확인하고, 틀리면 즉시 알려주는 안전장치죠!

```python
print("=== 🔧 assert문: 코드의 안전장치 ===")

def validate_user_age(age):
    """사용자 나이 검증 - assert 활용"""
    
    print(f"👤 나이 검증: {age}")
    
    # assert로 조건 검사
    assert isinstance(age, int), f"나이는 정수여야 합니다 (입력: {type(age).__name__})"
    assert age >= 0, f"나이는 0 이상이어야 합니다 (입력: {age})"
    assert age <= 150, f"나이는 150 이하여야 합니다 (입력: {age})"
    
    print(f"✅ 나이 검증 통과: {age}세")
    
    # 연령대 분류
    if age < 13:
        category = "어린이"
    elif age < 20:
        category = "청소년"
    elif age < 65:
        category = "성인"
    else:
        category = "시니어"
    
    return category

def bank_account_system():
    """은행 계좌 시스템 - assert로 안전성 확보"""
    
    class BankAccount:
        def __init__(self, account_number, initial_balance=0):
            # 계좌 생성 시 조건 검사
            assert isinstance(account_number, str), "계좌번호는 문자열이어야 합니다"
            assert len(account_number) >= 10, "계좌번호는 10자리 이상이어야 합니다"
            assert initial_balance >= 0, "초기 잔액은 0 이상이어야 합니다"
            
            self.account_number = account_number
            self.balance = initial_balance
            print(f"🏦 계좌 생성: {account_number} (잔액: {initial_balance:,}원)")
        
        def deposit(self, amount):
            """입금"""
            print(f"💰 입금 시도: {amount:,}원")
            
            # 입금 조건 검사
            assert isinstance(amount, (int, float)), "입금액은 숫자여야 합니다"
            assert amount > 0, "입금액은 0보다 커야 합니다"
            
            self.balance += amount
            print(f"✅ 입금 완료! 현재 잔액: {self.balance:,}원")
        
        def withdraw(self, amount):
            """출금"""
            print(f"💸 출금 시도: {amount:,}원")
            
            # 출금 조건 검사
            assert isinstance(amount, (int, float)), "출금액은 숫자여야 합니다"
            assert amount > 0, "출금액은 0보다 커야 합니다"
            assert amount <= self.balance, f"잔액 부족! (잔액: {self.balance:,}원)"
            
            self.balance -= amount
            print(f"✅ 출금 완료! 현재 잔액: {self.balance:,}원")
    
    # 테스트 케이스
    test_cases = [
        # (계좌번호, 초기잔액, 거래내역)
        ("1234567890", 100000, [("deposit", 50000), ("withdraw", 30000)]),
        ("123", 50000, []),  # 잘못된 계좌번호
        ("9876543210", -1000, []),  # 잘못된 초기잔액
        ("5555555555", 100000, [("withdraw", 200000)]),  # 잔액 초과 출금
    ]
    
    for account_num, initial, transactions in test_cases:
        print(f"\n🏦 계좌 테스트: {account_num}")
        try:
            account = BankAccount(account_num, initial)
            
            for transaction_type, amount in transactions:
                if transaction_type == "deposit":
                    account.deposit(amount)
                elif transaction_type == "withdraw":
                    account.withdraw(amount)
                    
        except AssertionError as e:
            print(f"❌ 검증 실패: {e}")
        except Exception as e:
            print(f"💥 예상치 못한 오류: {e}")

# 나이 검증 테스트
print("👤 나이 검증 시스템:")
age_test_cases = [25, "25", -5, 200, 16]

for age in age_test_cases:
    try:
        category = validate_user_age(age)
        print(f"   분류: {category}\n")
    except AssertionError as e:
        print(f"   ❌ 검증 실패: {e}\n")

# 은행 계좌 시스템 테스트
bank_account_system()
```

### 📊 로깅: 프로그램의 일기장

로깅은 프로그램이 **일기를 쓰는 것**과 같습니다. 무슨 일이 일어났는지, 언제 일어났는지, 어떤 문제가 있었는지 모두 기록해두는 거죠!

```python
print("=== 📊 로깅: 프로그램의 일기장 ===")

import logging
from datetime import datetime

# 로깅 설정
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logger = logging.getLogger(__name__)

def online_store_with_logging():
    """온라인 쇼핑몰 - 로깅 활용"""
    
    logger.info("🛒 온라인 쇼핑몰 시스템 시작")
    
    # 상품 데이터
    products = {
        "LAPTOP001": {"name": "고성능 노트북", "price": 1200000, "stock": 5},
        "MOUSE001": {"name": "무선 마우스", "price": 30000, "stock": 20},
        "KEYBOARD001": {"name": "기계식 키보드", "price": 80000, "stock": 0},  # 재고 없음
    }
    
    logger.info(f"📦 상품 데이터 로드 완료: {len(products)}개 상품")
    
    # 주문 처리
    orders = [
        {"product_id": "LAPTOP001", "quantity": 2, "customer": "김고객"},
        {"product_id": "MOUSE001", "quantity": 3, "customer": "이고객"},
        {"product_id": "KEYBOARD001", "quantity": 1, "customer": "박고객"},  # 재고 부족
        {"product_id": "TABLET001", "quantity": 1, "customer": "최고객"},   # 없는 상품
    ]
    
    successful_orders = []
    failed_orders = []
    
    for order in orders:
        order_id = f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}"
        logger.info(f"📝 주문 처리 시작: {order_id}")
        logger.debug(f"주문 상세: {order}")
        
        try:
            product_id = order["product_id"]
            quantity = order["quantity"]
            customer = order["customer"]
            
            # 상품 존재 확인
            if product_id not in products:
                logger.warning(f"⚠️ 존재하지 않는 상품: {product_id}")
                failed_orders.append({**order, "reason": "상품 없음"})
                continue
            
            product = products[product_id]
            logger.debug(f"상품 정보: {product}")
            
            # 재고 확인
            if product["stock"] < quantity:
                logger.warning(f"⚠️ 재고 부족: {product['name']} (요청: {quantity}, 재고: {product['stock']})")
                failed_orders.append({**order, "reason": "재고 부족"})
                continue
            
            # 주문 처리
            total_price = product["price"] * quantity
            product["stock"] -= quantity
            
            order_info = {
                "order_id": order_id,
                "customer": customer,
                "product": product["name"],
                "quantity": quantity,
                "total_price": total_price
            }
            
            successful_orders.append(order_info)
            
            logger.info(f"✅ 주문 성공: {customer} - {product['name']} {quantity}개 (총 {total_price:,}원)")
            logger.debug(f"남은 재고: {product['stock']}개")
            
        except Exception as e:
            logger.error(f"💥 주문 처리 중 오류: {e}")
            failed_orders.append({**order, "reason": f"시스템 오류: {e}"})
    
    # 결과 요약
    logger.info("📊 주문 처리 완료")
    logger.info(f"성공한 주문: {len(successful_orders)}건")
    logger.info(f"실패한 주문: {len(failed_orders)}건")
    
    if successful_orders:
        total_revenue = sum(order["total_price"] for order in successful_orders)
        logger.info(f"💰 총 매출: {total_revenue:,}원")
    
    if failed_orders:
        logger.warning("❌ 실패한 주문 목록:")
        for order in failed_orders:
            logger.warning(f"   {order['customer']}: {order['reason']}")
    
    return successful_orders, failed_orders

def user_authentication_with_logging():
    """사용자 인증 시스템 - 다양한 로그 레벨 활용"""
    
    logger.info("🔐 사용자 인증 시스템 시작")
    
    # 사용자 데이터베이스 (시뮬레이션)
    users_db = {
        "admin": {"password": "admin123", "role": "administrator"},
        "user1": {"password": "user123", "role": "user"},
        "user2": {"password": "user456", "role": "user"},
    }
    
    # 로그인 시도 시뮬레이션
    login_attempts = [
        {"username": "admin", "password": "admin123"},      # 성공
        {"username": "user1", "password": "wrong"},         # 잘못된 비밀번호
        {"username": "hacker", "password": "hack123"},      # 존재하지 않는 사용자
        {"username": "user2", "password": "user456"},       # 성공
        {"username": "admin", "password": "wrong"},         # 관리자 계정 해킹 시도
    ]
    
    successful_logins = []
    failed_logins = []
    
    for attempt in login_attempts:
        username = attempt["username"]
        password = attempt["password"]
        
        logger.debug(f"로그인 시도: 사용자 '{username}'")
        
        try:
            # 사용자 존재 확인
            if username not in users_db:
                logger.warning(f"⚠️ 존재하지 않는 사용자: {username}")
                failed_logins.append({**attempt, "reason": "사용자 없음"})
                continue
            
            # 비밀번호 확인
            if users_db[username]["password"] != password:
                logger.warning(f"⚠️ 잘못된 비밀번호: {username}")
                
                # 관리자 계정 해킹 시도는 더 심각하게 로깅
                if username == "admin":
                    logger.critical(f"🚨 관리자 계정 해킹 시도 감지! 사용자: {username}")
                
                failed_logins.append({**attempt, "reason": "잘못된 비밀번호"})
                continue
            
            # 로그인 성공
            user_role = users_db[username]["role"]
            logger.info(f"✅ 로그인 성공: {username} (역할: {user_role})")
            
            successful_logins.append({
                "username": username,
                "role": user_role,
                "login_time": datetime.now().isoformat()
            })
            
        except Exception as e:
            logger.error(f"💥 인증 처리 중 오류: {e}")
            failed_logins.append({**attempt, "reason": f"시스템 오류: {e}"})
    
    # 보안 요약
    logger.info("🔐 인증 세션 완료")
    logger.info(f"성공한 로그인: {len(successful_logins)}건")
    logger.info(f"실패한 로그인: {len(failed_logins)}건")
    
    if len(failed_logins) > len(successful_logins):
        logger.warning("🚨 의심스러운 활동: 실패한 로그인이 성공한 로그인보다 많음")
    
    return successful_logins, failed_logins

# 로깅 시스템 테스트
print("🛒 온라인 쇼핑몰 로깅 테스트:")
print("=" * 40)
successful, failed = online_store_with_logging()

print(f"\n🔐 사용자 인증 로깅 테스트:")
print("=" * 40)
auth_success, auth_failed = user_authentication_with_logging()
```

---

## 🎯 실습: 종합 에러 처리 시스템

### 📝 실습 과제: 안전한 파일 관리 시스템

```python
print("=== 📝 종합 실습: 안전한 파일 관리 시스템 ===")

import os
import json
import logging
from datetime import datetime

class SafeFileManager:
    """안전한 파일 관리 시스템"""
    
    def __init__(self, base_directory="./safe_files"):
        self.base_directory = base_directory
        self.setup_logging()
        self.ensure_directory_exists()
    
    def setup_logging(self):
        """로깅 설정"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger("SafeFileManager")
        self.logger.info("📁 파일 관리 시스템 초기화")
    
    def ensure_directory_exists(self):
        """기본 디렉토리 생성"""
        try:
            if not os.path.exists(self.base_directory):
                os.makedirs(self.base_directory)
                self.logger.info(f"📂 디렉토리 생성: {self.base_directory}")
            else:
                self.logger.info(f"📂 디렉토리 확인: {self.base_directory}")
        except Exception as e:
            self.logger.error(f"❌ 디렉토리 생성 실패: {e}")
            raise
    
    def validate_filename(self, filename):
        """파일명 검증"""
        assert isinstance(filename, str), "파일명은 문자열이어야 합니다"
        assert len(filename.strip()) > 0, "파일명은 비어있을 수 없습니다"
        assert not any(char in filename for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|']), \
               "파일명에 특수문자가 포함될 수 없습니다"
        
        self.logger.debug(f"✅ 파일명 검증 통과: {filename}")
    
    def save_data(self, filename, data, file_format="json"):
        """데이터를 안전하게 파일에 저장"""
        
        self.logger.info(f"💾 파일 저장 시작: {filename}")
        
        try:
            # 파일명 검증
            self.validate_filename(filename)
            
            # 전체 경로 생성
            if not filename.endswith(f".{file_format}"):
                filename += f".{file_format}"
            
            filepath = os.path.join(self.base_directory, filename)
            self.logger.debug(f"파일 경로: {filepath}")
            
            # 데이터 저장
            with open(filepath, 'w', encoding='utf-8') as file:
                if file_format == "json":
                    json.dump(data, file, ensure_ascii=False, indent=2)
                else:
                    file.write(str(data))
            
            self.logger.info(f"✅ 파일 저장 성공: {filename}")
            return True
            
        except AssertionError as e:
            self.logger.warning(f"⚠️ 파일명 검증 실패: {e}")
            return False
        except PermissionError as e:
            self.logger.error(f"❌ 권한 오류: {e}")
            return False
        except Exception as e:
            self.logger.error(f"💥 예상치 못한 오류: {e}")
            return False
        finally:
            self.logger.debug("파일 저장 작업 완료")
    
    def load_data(self, filename, file_format="json"):
        """파일에서 데이터를 안전하게 로드"""
        
        self.logger.info(f"📖 파일 로드 시작: {filename}")
        
        try:
            # 파일명 검증
            self.validate_filename(filename)
            
            # 전체 경로 생성
            if not filename.endswith(f".{file_format}"):
                filename += f".{file_format}"
            
            filepath = os.path.join(self.base_directory, filename)
            
            # 파일 존재 확인
            if not os.path.exists(filepath):
                raise FileNotFoundError(f"파일을 찾을 수 없습니다: {filename}")
            
            # 데이터 로드
            with open(filepath, 'r', encoding='utf-8') as file:
                if file_format == "json":
                    data = json.load(file)
                else:
                    data = file.read()
            
            self.logger.info(f"✅ 파일 로드 성공: {filename}")
            return data
            
        except AssertionError as e:
            self.logger.warning(f"⚠️ 파일명 검증 실패: {e}")
            return None
        except FileNotFoundError as e:
            self.logger.warning(f"⚠️ 파일 없음: {e}")
            return None
        except json.JSONDecodeError as e:
            self.logger.error(f"❌ JSON 파싱 오류: {e}")
            return None
        except Exception as e:
            self.logger.error(f"💥 예상치 못한 오류: {e}")
            return None
        finally:
            self.logger.debug("파일 로드 작업 완료")
    
    def delete_file(self, filename):
        """파일을 안전하게 삭제"""
        
        self.logger.info(f"🗑️ 파일 삭제 시작: {filename}")
        
        try:
            # 파일명 검증
            self.validate_filename(filename)
            
            filepath = os.path.join(self.base_directory, filename)
            
            # 파일 존재 확인
            if not os.path.exists(filepath):
                self.logger.warning(f"⚠️ 삭제할 파일이 없습니다: {filename}")
                return False
            
            # 파일 삭제
            os.remove(filepath)
            self.logger.info(f"✅ 파일 삭제 성공: {filename}")
            return True
            
        except AssertionError as e:
            self.logger.warning(f"⚠️ 파일명 검증 실패: {e}")
            return False
        except PermissionError as e:
            self.logger.error(f"❌ 권한 오류: {e}")
            return False
        except Exception as e:
            self.logger.error(f"💥 예상치 못한 오류: {e}")
            return False
        finally:
            self.logger.debug("파일 삭제 작업 완료")
    
    def list_files(self):
        """디렉토리의 파일 목록 조회"""
        
        self.logger.info("📋 파일 목록 조회")
        
        try:
            files = os.listdir(self.base_directory)
            self.logger.info(f"✅ 파일 목록 조회 성공: {len(files)}개 파일")
            return files
            
        except Exception as e:
            self.logger.error(f"💥 파일 목록 조회 실패: {e}")
            return []

# 파일 관리 시스템 테스트
def test_file_manager():
    """파일 관리 시스템 종합 테스트"""
    
    print("🧪 파일 관리 시스템 테스트 시작")
    print("=" * 40)
    
    # 파일 관리자 생성
    fm = SafeFileManager()
    
    # 테스트 데이터
    test_data = {
        "students": [
            {"name": "김철수", "age": 20, "grade": "A"},
            {"name": "이영희", "age": 19, "grade": "B"},
            {"name": "박민수", "age": 21, "grade": "A"}
        ],
        "created_at": datetime.now().isoformat(),
        "version": "1.0"
    }
    
    # 1. 정상 파일 저장
    print("\n1️⃣ 정상 파일 저장 테스트:")
    success = fm.save_data("student_data", test_data)
    print(f"   결과: {'성공' if success else '실패'}")
    
    # 2. 잘못된 파일명으로 저장 시도
    print("\n2️⃣ 잘못된 파일명 테스트:")
    invalid_names = ["", "file/name", "file*name", "file?name"]
    for name in invalid_names:
        success = fm.save_data(name, test_data)
        print(f"   '{name}': {'성공' if success else '실패'}")
    
    # 3. 파일 로드
    print("\n3️⃣ 파일 로드 테스트:")
    loaded_data = fm.load_data("student_data")
    if loaded_data:
        print(f"   ✅ 로드 성공: {len(loaded_data['students'])}명의 학생 데이터")
    else:
        print(f"   ❌ 로드 실패")
    
    # 4. 존재하지 않는 파일 로드
    print("\n4️⃣ 존재하지 않는 파일 로드 테스트:")
    missing_data = fm.load_data("nonexistent_file")
    print(f"   결과: {'데이터 있음' if missing_data else '데이터 없음 (정상)'}")
    
    # 5. 파일 목록 조회
    print("\n5️⃣ 파일 목록 조회:")
    files = fm.list_files()
    print(f"   파일 개수: {len(files)}")
    for file in files:
        print(f"   📄 {file}")
    
    # 6. 파일 삭제
    print("\n6️⃣ 파일 삭제 테스트:")
    success = fm.delete_file("student_data.json")
    print(f"   결과: {'성공' if success else '실패'}")
    
    print("\n🎉 파일 관리 시스템 테스트 완료!")

# 테스트 실행
test_file_manager()
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- 에러와 예외의 차이점과 다양한 예외 타입 이해하기
- try-except-else-finally 구문으로 안전한 프로그램 만들기
- print() 디버깅과 조건부 디버깅으로 문제 추적하기
- assert문으로 코드의 안전장치 만들기
- 로깅으로 프로그램의 실행 과정 기록하기
- 실무에서 바로 쓸 수 있는 에러 처리 패턴 익히기

✅ **핵심 개념**
- **예외 처리**: 프로그램이 중단되지 않도록 오류를 우아하게 처리
- **try-except**: 오류가 발생할 수 있는 코드를 안전하게 실행
- **finally**: 성공/실패와 관계없이 반드시 실행되는 정리 작업
- **assert**: 개발 중 조건 검사와 디버깅을 위한 안전장치
- **logging**: 프로그램의 실행 과정과 문제를 체계적으로 기록

✅ **실무 팁**
- 구체적인 예외 타입을 사용하여 정확한 오류 처리하기
- finally절로 리소스 정리 작업 보장하기
- 로깅 레벨(DEBUG, INFO, WARNING, ERROR, CRITICAL)을 적절히 활용하기
- assert는 개발 중에만 사용하고 프로덕션에서는 비활성화하기
- 사용자에게는 친화적인 메시지, 개발자에게는 상세한 로그 제공하기

🎯 **다음 챕터 예고**
다음 챕터에서는 파일 입출력(File I/O)을 배워보겠습니다. 텍스트 파일, CSV, JSON 등 다양한 형태의 데이터를 읽고 쓰는 방법을 익혀보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: try-except를 너무 많이 사용하면 성능에 문제가 있나요?**
A: 예외가 발생하지 않는 경우 성능 영향은 미미합니다. 하지만 예외 발생 시에는 비용이 크므로, 예상 가능한 조건은 if문으로 미리 검사하는 것이 좋습니다.

**Q: except Exception을 사용해도 되나요?**
A: 가능하지만 권장하지 않습니다. 구체적인 예외 타입을 사용하면 더 정확한 오류 처리가 가능하고, 예상치 못한 오류를 놓치지 않을 수 있습니다.

**Q: assert와 if-raise의 차이점은 무엇인가요?**
A: assert는 개발/디버깅 용도로 Python 최적화 모드(-O)에서는 무시됩니다. 프로덕션 코드의 검증에는 if-raise를 사용하세요.

**Q: 로깅과 print의 차이점은?**
A: print는 단순 출력이고, 로깅은 레벨별 분류, 파일 저장, 포맷팅 등 체계적인 기록 관리가 가능합니다. 실무에서는 로깅을 권장합니다.

**Q: finally절은 언제 사용하나요?**
A: 파일 닫기, 네트워크 연결 해제, 리소스 정리 등 성공/실패와 관계없이 반드시 실행되어야 하는 작업에 사용합니다.