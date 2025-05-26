# Chapter 11: 에러 처리와 디버깅 (Error Handling and Debugging)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 파이썬의 다양한 에러 타입과 원인 이해하기
- try-except 문을 사용한 예외 처리 방법 익히기
- finally와 else 절의 활용법 이해하기
- 사용자 정의 예외 만들기
- 효과적인 디버깅 기법과 도구 활용하기
- 로깅을 통한 프로그램 상태 추적하기
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
        "hello",    # ValueError
        "0",        # ZeroDivisionError
        "",         # ValueError (빈 문자열)
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
            
        except ZeroDivisionError as e:
            print(f"✗ {data}: 나누기 오류 - {e}")
            
        except Exception as e:
            print(f"✗ {data}: 기타 오류 - {type(e).__name__}: {e}")

# 순차적 예외 처리
def sequential_exception_handling():
    """순차적으로 다른 예외를 처리"""
    
    file_names = ["existing_file.txt", "nonexistent.txt", ""]
    
    for filename in file_names:
        try:
            if not filename:
                raise ValueError("파일명이 비어있습니다")
                
            # 파일 열기 시뮬레이션
            if filename == "nonexistent.txt":
                raise FileNotFoundError(f"파일을 찾을 수 없습니다: {filename}")
                
            print(f"✓ {filename}: 파일을 성공적으로 처리했습니다")
            
        except ValueError as e:
            print(f"✗ 값 오류: {e}")
        except FileNotFoundError as e:
            print(f"✗ 파일 오류: {e}")
        except PermissionError as e:
            print(f"✗ 권한 오류: {e}")
        except Exception as e:
            print(f"✗ 기타 오류: {e}")

print("=== 여러 예외 처리 테스트 ===")
multiple_exception_handling()
print("\n=== 순차적 예외 처리 테스트 ===")
sequential_exception_handling()
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