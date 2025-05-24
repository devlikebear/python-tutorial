# Chapter 8: 예외 처리 고급

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 예외 계층 구조를 이해하고 적절한 예외를 선택하여 처리하기
- 커스텀 예외 클래스를 생성하고 활용하기
- try-except-else-finally 구조를 완전히 이해하고 적절히 사용하기
- 예외 체이닝과 컨텍스트를 활용하기
- assert 문을 효과적으로 사용하기
- 로깅 시스템을 구축하고 예외와 함께 활용하기
- 실무에서 견고한 에러 처리 패턴 구현하기

## 1. 예외 계층 구조

### 1.1 파이썬 예외 계층

```python
print("=== 파이썬 예외 계층 구조 ===")

# 기본 예외 계층을 보여주는 함수
def show_exception_hierarchy():
    """주요 예외 클래스들의 계층 구조를 보여줍니다"""
    
    print("BaseException")
    print("├── SystemExit")
    print("├── KeyboardInterrupt")
    print("├── GeneratorExit")
    print("└── Exception")
    print("    ├── StopIteration")
    print("    ├── ArithmeticError")
    print("    │   ├── ZeroDivisionError")
    print("    │   ├── OverflowError")
    print("    │   └── FloatingPointError")
    print("    ├── LookupError")
    print("    │   ├── IndexError")
    print("    │   └── KeyError")
    print("    ├── ValueError")
    print("    ├── TypeError")
    print("    ├── OSError")
    print("    │   ├── FileNotFoundError")
    print("    │   ├── PermissionError")
    print("    │   └── ConnectionError")
    print("    └── RuntimeError")

show_exception_hierarchy()

# 예외 상속 관계 확인
def check_exception_inheritance():
    """예외들 간의 상속 관계를 확인합니다"""
    
    print(f"\n1. 예외 상속 관계 확인:")
    
    # isinstance로 상속 관계 확인
    print(f"FileNotFoundError는 OSError의 하위클래스인가? {issubclass(FileNotFoundError, OSError)}")
    print(f"OSError는 Exception의 하위클래스인가? {issubclass(OSError, Exception)}")
    print(f"Exception은 BaseException의 하위클래스인가? {issubclass(Exception, BaseException)}")
    
    # 실제 예외 객체로 확인
    try:
        with open("nonexistent_file.txt", "r") as f:
            content = f.read()
    except Exception as e:
        print(f"\n2. 실제 예외 분석:")
        print(f"예외 타입: {type(e).__name__}")
        print(f"예외 메시지: {e}")
        print(f"MRO (Method Resolution Order): {[cls.__name__ for cls in type(e).__mro__]}")
        
        # 다양한 예외 타입으로 검사
        print(f"\n3. 예외 타입 검사:")
        print(f"isinstance(e, FileNotFoundError): {isinstance(e, FileNotFoundError)}")
        print(f"isinstance(e, OSError): {isinstance(e, OSError)}")
        print(f"isinstance(e, Exception): {isinstance(e, Exception)}")
        print(f"isinstance(e, BaseException): {isinstance(e, BaseException)}")

check_exception_inheritance()
```

### 1.2 적절한 예외 선택하기

```python
print("\n=== 적절한 예외 선택하기 ===")

def demonstrate_exception_selection():
    """상황에 맞는 적절한 예외를 선택하는 방법을 보여줍니다"""
    
    print("1. 구체적인 예외 vs 일반적인 예외:")
    
    # 좋은 예: 구체적인 예외 처리
    def good_exception_handling():
        """구체적인 예외를 처리하는 좋은 예제"""
        try:
            data = {"name": "Alice", "age": 30}
            print(data["height"])  # KeyError 발생
        except KeyError as e:
            print(f"필수 키가 없습니다: {e}")
            # 기본값으로 처리
            height = data.get("height", "정보 없음")
            print(f"키: {height}")
        except TypeError as e:
            print(f"데이터 타입 오류: {e}")
        except Exception as e:
            print(f"예상치 못한 오류: {e}")
    
    # 나쁜 예: 너무 일반적인 예외 처리
    def bad_exception_handling():
        """너무 일반적인 예외 처리의 나쁜 예제"""
        try:
            data = {"name": "Alice", "age": 30}
            print(data["height"])
        except Exception as e:  # 너무 일반적!
            print(f"뭔가 잘못되었습니다: {e}")
            # 어떤 문제인지 알기 어려움
    
    print("  좋은 예제 실행:")
    good_exception_handling()
    
    print(f"\n  나쁜 예제 실행:")
    bad_exception_handling()

demonstrate_exception_selection()

def exception_handling_best_practices():
    """예외 처리 모범 사례"""
    
    print(f"\n2. 예외 처리 모범 사례:")
    
    def safe_division(a, b):
        """안전한 나눗셈 함수"""
        try:
            if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
                raise TypeError("숫자만 입력 가능합니다")
            
            if b == 0:
                raise ValueError("0으로 나눌 수 없습니다")
            
            return a / b
            
        except TypeError as e:
            print(f"타입 오류: {e}")
            return None
        except ValueError as e:
            print(f"값 오류: {e}")
            return None
        except Exception as e:
            print(f"예상치 못한 오류: {e}")
            return None
    
    # 테스트
    test_cases = [
        (10, 2),      # 정상 케이스
        (10, 0),      # ZeroDivisionError → ValueError
        ("10", 2),    # TypeError
        (10, "2"),    # TypeError
    ]
    
    for a, b in test_cases:
        result = safe_division(a, b)
        print(f"  safe_division({a}, {b}) = {result}")

exception_handling_best_practices()
```

## 2. 커스텀 예외 클래스

### 2.1 기본 커스텀 예외

```python
print("\n=== 커스텀 예외 클래스 ===")

# 기본 커스텀 예외 클래스들
class ValidationError(Exception):
    """데이터 검증 오류를 나타내는 커스텀 예외"""
    pass

class ConfigurationError(Exception):
    """설정 오류를 나타내는 커스텀 예외"""
    def __init__(self, message, config_file=None):
        super().__init__(message)
        self.config_file = config_file
        self.timestamp = __import__('datetime').datetime.now()
    
    def __str__(self):
        base_message = super().__str__()
        if self.config_file:
            return f"{base_message} (파일: {self.config_file})"
        return base_message

class BusinessLogicError(Exception):
    """비즈니스 로직 오류를 나타내는 커스텀 예외"""
    def __init__(self, message, error_code=None, context=None):
        super().__init__(message)
        self.error_code = error_code
        self.context = context or {}
        self.timestamp = __import__('datetime').datetime.now()

def demonstrate_custom_exceptions():
    """커스텀 예외 사용 예제"""
    
    print("1. 기본 커스텀 예외:")
    
    def validate_age(age):
        """나이 검증 함수"""
        if not isinstance(age, int):
            raise ValidationError(f"나이는 정수여야 합니다. 입력값: {age} ({type(age).__name__})")
        
        if age < 0:
            raise ValidationError(f"나이는 음수일 수 없습니다. 입력값: {age}")
        
        if age > 150:
            raise ValidationError(f"나이가 비현실적입니다. 입력값: {age}")
        
        return True
    
    # 테스트
    test_ages = [25, -5, "thirty", 200, 30.5]
    
    for age in test_ages:
        try:
            validate_age(age)
            print(f"  ✓ 나이 {age}는 유효합니다")
        except ValidationError as e:
            print(f"  ✗ 검증 오류: {e}")

demonstrate_custom_exceptions()

def demonstrate_enhanced_custom_exceptions():
    """향상된 커스텀 예외 예제"""
    
    print(f"\n2. 향상된 커스텀 예외:")
    
    def load_config(config_file):
        """설정 파일 로드 함수"""
        import os
        
        if not os.path.exists(config_file):
            raise ConfigurationError(
                f"설정 파일을 찾을 수 없습니다", 
                config_file=config_file
            )
        
        # 가상의 설정 로드 (실제로는 파일을 읽음)
        if config_file.endswith('.invalid'):
            raise ConfigurationError(
                "잘못된 설정 파일 형식입니다", 
                config_file=config_file
            )
        
        return {"database_url": "localhost", "debug": True}
    
    def process_payment(amount, account_balance):
        """결제 처리 함수"""
        if amount <= 0:
            raise BusinessLogicError(
                "결제 금액은 0보다 커야 합니다",
                error_code="INVALID_AMOUNT",
                context={"amount": amount}
            )
        
        if amount > account_balance:
            raise BusinessLogicError(
                "잔액이 부족합니다",
                error_code="INSUFFICIENT_FUNDS",
                context={
                    "amount": amount,
                    "balance": account_balance,
                    "shortage": amount - account_balance
                }
            )
        
        return account_balance - amount
    
    # 설정 파일 테스트
    print("  설정 파일 테스트:")
    config_files = ["config.json", "nonexistent.json", "config.invalid"]
    
    for config_file in config_files:
        try:
            config = load_config(config_file)
            print(f"    ✓ {config_file} 로드 성공: {config}")
        except ConfigurationError as e:
            print(f"    ✗ 설정 오류: {e}")
            print(f"      발생 시간: {e.timestamp}")
    
    # 결제 처리 테스트
    print(f"\n  결제 처리 테스트:")
    payment_tests = [
        (100, 200),    # 정상
        (-50, 200),    # 잘못된 금액
        (300, 200),    # 잔액 부족
    ]
    
    for amount, balance in payment_tests:
        try:
            new_balance = process_payment(amount, balance)
            print(f"    ✓ 결제 성공: {amount}원, 잔액: {new_balance}원")
        except BusinessLogicError as e:
            print(f"    ✗ 결제 실패: {e}")
            print(f"      오류 코드: {e.error_code}")
            print(f"      컨텍스트: {e.context}")

demonstrate_enhanced_custom_exceptions()
```

### 2.2 예외 계층 구조 설계

```python
print("\n=== 예외 계층 구조 설계 ===")

# 애플리케이션별 예외 계층 구조
class AppError(Exception):
    """애플리케이션 기본 예외 클래스"""
    pass

class DataError(AppError):
    """데이터 관련 오류"""
    pass

class ValidationError(DataError):
    """데이터 검증 오류"""
    pass

class DatabaseError(DataError):
    """데이터베이스 관련 오류"""
    pass

class ConnectionError(DatabaseError):
    """데이터베이스 연결 오류"""
    pass

class QueryError(DatabaseError):
    """쿼리 실행 오류"""
    pass

class AuthenticationError(AppError):
    """인증 관련 오류"""
    pass

class AuthorizationError(AppError):
    """권한 관련 오류"""
    pass

class ExternalServiceError(AppError):
    """외부 서비스 관련 오류"""
    pass

def demonstrate_exception_hierarchy():
    """예외 계층 구조 활용 예제"""
    
    print("1. 예외 계층 구조:")
    exceptions = [
        ValidationError("잘못된 이메일 형식"),
        ConnectionError("데이터베이스 연결 실패"),
        QueryError("SQL 구문 오류"),
        AuthenticationError("잘못된 비밀번호"),
        AuthorizationError("접근 권한 없음"),
        ExternalServiceError("API 서버 응답 없음")
    ]
    
    for exc in exceptions:
        print(f"  {type(exc).__name__}: {exc}")
        print(f"    DataError인가? {isinstance(exc, DataError)}")
        print(f"    AppError인가? {isinstance(exc, AppError)}")
        print()

demonstrate_exception_hierarchy()

def exception_handler_demo():
    """계층적 예외 처리 예제"""
    
    print("2. 계층적 예외 처리:")
    
    def simulate_operations():
        """다양한 예외를 발생시키는 시뮬레이션"""
        import random
        
        operations = [
            lambda: (_ for _ in ()).throw(ValidationError("이메일 형식 오류")),
            lambda: (_ for _ in ()).throw(ConnectionError("DB 연결 실패")),
            lambda: (_ for _ in ()).throw(AuthenticationError("로그인 실패")),
            lambda: (_ for _ in ()).throw(ExternalServiceError("API 오류")),
            lambda: print("    ✓ 작업 성공!")
        ]
        
        operation = random.choice(operations)
        next(operation())
    
    # 계층적 예외 처리
    for i in range(5):
        try:
            print(f"  작업 {i+1} 실행:")
            simulate_operations()
            
        except DatabaseError as e:
            print(f"    데이터베이스 오류 처리: {e}")
            print("    → 데이터베이스 재연결 시도")
            
        except AuthenticationError as e:
            print(f"    인증 오류 처리: {e}")
            print("    → 로그인 페이지로 리다이렉트")
            
        except ExternalServiceError as e:
            print(f"    외부 서비스 오류 처리: {e}")
            print("    → 캐시된 데이터 사용")
            
        except DataError as e:
            print(f"    데이터 오류 처리: {e}")
            print("    → 기본값으로 대체")
            
        except AppError as e:
            print(f"    일반 애플리케이션 오류: {e}")
            print("    → 오류 로그 기록")

exception_handler_demo()
```

## 3. 고급 예외 처리 패턴

### 3.1 try-except-else-finally 완전 활용

```python
print("\n=== try-except-else-finally 완전 활용 ===")

def demonstrate_complete_exception_handling():
    """완전한 예외 처리 구조 예제"""
    
    print("1. 완전한 예외 처리 구조:")
    
    def safe_file_operation(filename, content=None):
        """안전한 파일 조작 함수"""
        file_handle = None
        
        try:
            print(f"    파일 '{filename}' 열기 시도...")
            
            if content is None:
                # 파일 읽기
                file_handle = open(filename, 'r', encoding='utf-8')
                data = file_handle.read()
                print(f"    파일 읽기 성공: {len(data)}자")
                return data
            else:
                # 파일 쓰기
                file_handle = open(filename, 'w', encoding='utf-8')
                file_handle.write(content)
                print(f"    파일 쓰기 성공: {len(content)}자")
                return True
                
        except FileNotFoundError:
            print(f"    ✗ 파일을 찾을 수 없습니다: {filename}")
            return None
            
        except PermissionError:
            print(f"    ✗ 파일 접근 권한이 없습니다: {filename}")
            return None
            
        except UnicodeDecodeError:
            print(f"    ✗ 파일 인코딩 오류: {filename}")
            return None
            
        except Exception as e:
            print(f"    ✗ 예상치 못한 오류: {e}")
            return None
            
        else:
            # 예외가 발생하지 않은 경우에만 실행
            print(f"    ✓ 파일 작업 완료")
            
        finally:
            # 항상 실행되는 정리 코드
            if file_handle and not file_handle.closed:
                file_handle.close()
                print(f"    파일 핸들 정리 완료")
    
    # 테스트 케이스들
    test_cases = [
        ("temp_test.txt", "테스트 내용입니다."),  # 쓰기
        ("temp_test.txt", None),                  # 읽기
        ("nonexistent.txt", None),                # 존재하지 않는 파일
    ]
    
    for filename, content in test_cases:
        print(f"\n  테스트: {filename}")
        result = safe_file_operation(filename, content)
        print(f"  결과: {result}\n")

demonstrate_complete_exception_handling()

def resource_management_patterns():
    """리소스 관리 패턴 예제"""
    
    print("2. 리소스 관리 패턴:")
    
    # 패턴 1: 전통적인 try-finally
    def traditional_resource_management():
        """전통적인 리소스 관리"""
        print("  전통적인 방식:")
        
        resource = None
        try:
            print("    리소스 획득")
            resource = {"connection": "database", "status": "active"}
            
            # 작업 수행
            print("    작업 수행 중...")
            if resource["status"] == "active":
                print("    ✓ 작업 완료")
                
        except Exception as e:
            print(f"    ✗ 작업 중 오류: {e}")
            
        finally:
            if resource:
                print("    리소스 해제")
                resource["status"] = "closed"
    
    # 패턴 2: with 문을 사용한 컨텍스트 매니저
    class ResourceManager:
        """커스텀 리소스 매니저"""
        
        def __init__(self, resource_name):
            self.resource_name = resource_name
            self.resource = None
        
        def __enter__(self):
            print(f"    리소스 '{self.resource_name}' 획득")
            self.resource = {"name": self.resource_name, "status": "active"}
            return self.resource
        
        def __exit__(self, exc_type, exc_val, exc_tb):
            if self.resource:
                print(f"    리소스 '{self.resource_name}' 해제")
                self.resource["status"] = "closed"
            
            if exc_type:
                print(f"    예외 처리: {exc_type.__name__}: {exc_val}")
                return False  # 예외를 다시 발생시킴
            
            return True
    
    def context_manager_resource_management():
        """컨텍스트 매니저를 사용한 리소스 관리"""
        print(f"\n  컨텍스트 매니저 방식:")
        
        try:
            with ResourceManager("database_connection") as resource:
                print("    작업 수행 중...")
                if resource["status"] == "active":
                    print("    ✓ 작업 완료")
                    
        except Exception as e:
            print(f"    ✗ 작업 중 오류: {e}")
    
    traditional_resource_management()
    context_manager_resource_management()

resource_management_patterns()
```

### 3.2 예외 체이닝과 컨텍스트

```python
print("\n=== 예외 체이닝과 컨텍스트 ===")

def demonstrate_exception_chaining():
    """예외 체이닝 예제"""
    
    print("1. 예외 체이닝:")
    
    def process_user_data(user_data):
        """사용자 데이터 처리 함수"""
        try:
            # 데이터 검증
            if "email" not in user_data:
                raise ValidationError("이메일이 필요합니다")
            
            # 데이터베이스 저장 시뮬레이션
            if "@" not in user_data["email"]:
                raise ValueError("잘못된 이메일 형식")
                
            print(f"    ✓ 사용자 데이터 처리 완료: {user_data['email']}")
            return True
            
        except ValueError as e:
            # 원본 예외를 체이닝하여 새로운 예외 발생
            raise BusinessLogicError(
                f"사용자 데이터 처리 실패: {e}"
            ) from e
    
    def save_to_database(data):
        """데이터베이스 저장 함수"""
        try:
            return process_user_data(data)
            
        except BusinessLogicError as e:
            # 한 단계 더 체이닝
            raise DatabaseError(
                f"데이터베이스 저장 실패: {e}"
            ) from e
    
    # 테스트
    test_data = [
        {"email": "user@example.com"},      # 정상
        {"name": "John"},                   # 이메일 없음
        {"email": "invalid-email"},         # 잘못된 형식
    ]
    
    for data in test_data:
        try:
            save_to_database(data)
            
        except Exception as e:
            print(f"  ✗ 오류 발생: {e}")
            
            # 예외 체인 추적
            current = e
            level = 0
            while current:
                print(f"    {'  ' * level}└─ {type(current).__name__}: {current}")
                current = current.__cause__
                level += 1
            print()

demonstrate_exception_chaining()

def demonstrate_exception_context():
    """예외 컨텍스트와 정보 보존"""
    
    print("2. 예외 컨텍스트와 정보 보존:")
    
    def enhanced_error_info():
        """향상된 오류 정보를 제공하는 함수"""
        import traceback
        import sys
        
        def risky_operation():
            """위험한 작업을 수행하는 함수"""
            data = [1, 2, 3]
            return data[5]  # IndexError 발생
        
        def wrapper_function():
            """래퍼 함수"""
            try:
                return risky_operation()
            except IndexError as e:
                # 추가 컨텍스트와 함께 재발생
                raise IndexError(
                    f"배열 접근 오류 (크기: 3, 인덱스: 5): {e}"
                ) from e
        
        try:
            wrapper_function()
            
        except Exception as e:
            print(f"  예외 정보:")
            print(f"    타입: {type(e).__name__}")
            print(f"    메시지: {e}")
            print(f"    원인: {e.__cause__}")
            print(f"    컨텍스트: {e.__context__}")
            
            print(f"\n  전체 트레이스백:")
            traceback.print_exc()
    
    enhanced_error_info()

demonstrate_exception_context()
```

## 4. assert 문 활용

### 4.1 assert 문 기본 사용법

```python
print("\n=== assert 문 활용 ===")

def demonstrate_assert_usage():
    """assert 문 사용 예제"""
    
    print("1. assert 문 기본 사용법:")
    
    def calculate_area(length, width):
        """직사각형 넓이 계산 (사전 조건 검사 포함)"""
        
        # 사전 조건 검사
        assert isinstance(length, (int, float)), f"길이는 숫자여야 합니다: {type(length)}"
        assert isinstance(width, (int, float)), f"너비는 숫자여야 합니다: {type(width)}"
        assert length > 0, f"길이는 양수여야 합니다: {length}"
        assert width > 0, f"너비는 양수여야 합니다: {width}"
        
        area = length * width
        
        # 사후 조건 검사
        assert area > 0, f"넓이는 양수여야 합니다: {area}"
        
        return area
    
    # 테스트 케이스
    test_cases = [
        (5, 3),      # 정상
        (-2, 3),     # 음수 길이
        (5, "3"),    # 잘못된 타입
        (0, 5),      # 0 길이
    ]
    
    for length, width in test_cases:
        try:
            area = calculate_area(length, width)
            print(f"  ✓ calculate_area({length}, {width}) = {area}")
        except AssertionError as e:
            print(f"  ✗ Assertion 실패: {e}")
        except Exception as e:
            print(f"  ✗ 예상치 못한 오류: {e}")

demonstrate_assert_usage()

def demonstrate_assert_patterns():
    """assert 문 활용 패턴"""
    
    print(f"\n2. assert 문 활용 패턴:")
    
    def validate_config(config):
        """설정 검증 함수"""
        
        # 타입 검증
        assert isinstance(config, dict), "설정은 딕셔너리여야 합니다"
        
        # 필수 키 검증
        required_keys = ["database_url", "secret_key", "debug"]
        for key in required_keys:
            assert key in config, f"필수 설정 키가 누락되었습니다: {key}"
        
        # 값 검증
        assert config["database_url"].startswith(("http://", "https://", "postgres://", "mysql://")), \
               "database_url은 유효한 URL이어야 합니다"
        
        assert len(config["secret_key"]) >= 32, \
               f"secret_key는 최소 32자 이상이어야 합니다 (현재: {len(config['secret_key'])}자)"
        
        assert isinstance(config["debug"], bool), \
               "debug는 불린 값이어야 합니다"
        
        return True
    
    # 테스트 설정들
    configs = [
        {  # 올바른 설정
            "database_url": "postgresql://user:pass@localhost/db",
            "secret_key": "this_is_a_very_long_secret_key_12345",
            "debug": True
        },
        {  # 누락된 키
            "database_url": "postgresql://user:pass@localhost/db",
            "debug": True
        },
        {  # 잘못된 URL
            "database_url": "invalid_url",
            "secret_key": "this_is_a_very_long_secret_key_12345",
            "debug": True
        },
        {  # 짧은 시크릿 키
            "database_url": "postgresql://user:pass@localhost/db",
            "secret_key": "short",
            "debug": True
        }
    ]
    
    for i, config in enumerate(configs, 1):
        try:
            validate_config(config)
            print(f"  ✓ 설정 {i}: 검증 통과")
        except AssertionError as e:
            print(f"  ✗ 설정 {i}: {e}")

demonstrate_assert_patterns()

def demonstrate_assert_vs_exceptions():
    """assert vs 예외 처리 비교"""
    
    print(f"\n3. assert vs 예외 처리:")
    
    def with_assert(age):
        """assert를 사용한 버전 (개발 시 디버깅용)"""
        assert isinstance(age, int), "나이는 정수여야 합니다"
        assert 0 <= age <= 150, "나이는 0-150 사이여야 합니다"
        
        if age < 18:
            return "미성년자"
        elif age < 65:
            return "성인"
        else:
            return "노인"
    
    def with_exceptions(age):
        """예외 처리를 사용한 버전 (프로덕션용)"""
        if not isinstance(age, int):
            raise TypeError("나이는 정수여야 합니다")
        
        if not (0 <= age <= 150):
            raise ValueError("나이는 0-150 사이여야 합니다")
        
        if age < 18:
            return "미성년자"
        elif age < 65:
            return "성인"
        else:
            return "노인"
    
    test_ages = [25, -5, "30", 200]
    
    print("  assert 버전:")
    for age in test_ages:
        try:
            result = with_assert(age)
            print(f"    ✓ {age}: {result}")
        except AssertionError as e:
            print(f"    ✗ {age}: AssertionError - {e}")
        except Exception as e:
            print(f"    ✗ {age}: {type(e).__name__} - {e}")
    
    print(f"\n  예외 처리 버전:")
    for age in test_ages:
        try:
            result = with_exceptions(age)
            print(f"    ✓ {age}: {result}")
        except (TypeError, ValueError) as e:
            print(f"    ✗ {age}: {type(e).__name__} - {e}")
        except Exception as e:
            print(f"    ✗ {age}: {type(e).__name__} - {e}")

demonstrate_assert_vs_exceptions()
```

## 5. 로깅 시스템 기초

### 5.1 기본 로깅 설정

```python
print("\n=== 로깅 시스템 기초 ===")

import logging
import sys
from datetime import datetime

def setup_basic_logging():
    """기본 로깅 설정"""
    
    print("1. 기본 로깅 설정:")
    
    # 기본 로깅 설정
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),
        ]
    )
    
    # 로거 생성
    logger = logging.getLogger(__name__)
    
    # 로그 레벨별 테스트
    logger.debug("디버그 메시지 - 상세한 진단 정보")
    logger.info("정보 메시지 - 일반적인 작업 흐름")
    logger.warning("경고 메시지 - 잠재적 문제")
    logger.error("오류 메시지 - 심각한 문제")
    logger.critical("치명적 오류 - 프로그램 중단 가능")

setup_basic_logging()

def demonstrate_logging_with_exceptions():
    """예외와 함께 로깅 사용"""
    
    print(f"\n2. 예외와 함께 로깅:")
    
    # 새로운 로거 생성
    logger = logging.getLogger("exception_demo")
    
    def risky_operation(data):
        """위험한 작업을 수행하는 함수"""
        logger.info(f"작업 시작: {data}")
        
        try:
            if not isinstance(data, dict):
                raise TypeError(f"딕셔너리가 필요합니다: {type(data)}")
            
            if "value" not in data:
                raise KeyError("'value' 키가 필요합니다")
            
            result = 100 / data["value"]
            logger.info(f"작업 완료: {result}")
            return result
            
        except TypeError as e:
            logger.error(f"타입 오류: {e}", exc_info=True)
            raise
            
        except KeyError as e:
            logger.error(f"키 오류: {e}")
            raise
            
        except ZeroDivisionError as e:
            logger.critical(f"0으로 나누기 오류: {e}")
            raise
            
        except Exception as e:
            logger.exception(f"예상치 못한 오류: {e}")  # 자동으로 exc_info=True
            raise
    
    # 테스트 데이터
    test_data = [
        {"value": 10},      # 정상
        {"name": "test"},   # 키 없음
        {"value": 0},       # 0으로 나누기
        "invalid",          # 잘못된 타입
    ]
    
    for data in test_data:
        try:
            risky_operation(data)
        except Exception:
            pass  # 로깅으로 충분히 기록됨

demonstrate_logging_with_exceptions()
```

### 5.2 고급 로깅 패턴

```python
print("\n=== 고급 로깅 패턴 ===")

def create_advanced_logger():
    """고급 로거 설정"""
    
    print("3. 고급 로거 설정:")
    
    # 커스텀 포맷터
    class CustomFormatter(logging.Formatter):
        """컬러와 상세 정보를 포함한 커스텀 포맷터"""
        
        COLORS = {
            'DEBUG': '\033[36m',    # 청록색
            'INFO': '\033[32m',     # 녹색
            'WARNING': '\033[33m',  # 노란색
            'ERROR': '\033[31m',    # 빨간색
            'CRITICAL': '\033[35m', # 마젠타
            'RESET': '\033[0m'      # 리셋
        }
        
        def format(self, record):
            # 기본 포맷팅
            log_color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
            reset_color = self.COLORS['RESET']
            
            # 포맷 설정
            format_str = (
                f"{log_color}%(asctime)s{reset_color} | "
                f"{log_color}%(levelname)-8s{reset_color} | "
                f"%(name)s:%(lineno)d | %(message)s"
            )
            
            formatter = logging.Formatter(format_str)
            return formatter.format(record)
    
    # 로거 생성 및 설정
    logger = logging.getLogger("advanced_demo")
    logger.setLevel(logging.DEBUG)
    
    # 기존 핸들러 제거
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
    
    # 콘솔 핸들러
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(CustomFormatter())
    logger.addHandler(console_handler)
    
    return logger

def demonstrate_structured_logging():
    """구조화된 로깅 예제"""
    
    logger = create_advanced_logger()
    
    print("  구조화된 로깅 예제:")
    
    def process_user_request(user_id, action, params=None):
        """사용자 요청 처리 함수"""
        
        # 컨텍스트 정보를 포함한 로깅
        extra_info = {
            'user_id': user_id,
            'action': action,
            'params': params or {},
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"사용자 요청 시작 - 사용자: {user_id}, 액션: {action}")
        
        try:
            # 가상의 비즈니스 로직
            if action == "delete" and user_id == "admin":
                raise PermissionError("관리자는 삭제할 수 없습니다")
            
            if action not in ["create", "read", "update", "delete"]:
                raise ValueError(f"지원하지 않는 액션: {action}")
            
            # 성공 로깅
            logger.info(f"요청 처리 완료 - 사용자: {user_id}, 액션: {action}")
            return {"status": "success", "action": action}
            
        except PermissionError as e:
            logger.warning(f"권한 오류 - 사용자: {user_id}, 오류: {e}")
            return {"status": "error", "error": "permission_denied"}
            
        except ValueError as e:
            logger.error(f"잘못된 요청 - 사용자: {user_id}, 오류: {e}")
            return {"status": "error", "error": "invalid_action"}
            
        except Exception as e:
            logger.exception(f"예상치 못한 오류 - 사용자: {user_id}")
            return {"status": "error", "error": "internal_error"}
    
    # 테스트 요청들
    requests = [
        ("user1", "create", {"name": "test"}),
        ("user2", "invalid_action", {}),
        ("admin", "delete", {"id": 123}),
        ("user3", "read", {"id": 456}),
    ]
    
    for user_id, action, params in requests:
        result = process_user_request(user_id, action, params)
        print(f"    결과: {result}")

demonstrate_structured_logging()

def demonstrate_logging_decorators():
    """로깅 데코레이터 예제"""
    
    print(f"\n4. 로깅 데코레이터:")
    
    def log_function_calls(logger_name=None):
        """함수 호출을 로깅하는 데코레이터"""
        
        def decorator(func):
            logger = logging.getLogger(logger_name or func.__module__)
            
            def wrapper(*args, **kwargs):
                # 함수 호출 시작 로깅
                args_repr = [repr(a) for a in args]
                kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
                signature = ", ".join(args_repr + kwargs_repr)
                
                logger.info(f"함수 호출: {func.__name__}({signature})")
                
                try:
                    result = func(*args, **kwargs)
                    logger.info(f"함수 완료: {func.__name__} -> {result!r}")
                    return result
                    
                except Exception as e:
                    logger.error(f"함수 오류: {func.__name__} -> {type(e).__name__}: {e}")
                    raise
            
            return wrapper
        return decorator
    
    # 데코레이터 적용
    @log_function_calls("math_operations")
    def divide(a, b):
        """나눗셈 함수"""
        if b == 0:
            raise ValueError("0으로 나눌 수 없습니다")
        return a / b
    
    @log_function_calls("string_operations")
    def format_name(first_name, last_name, title=""):
        """이름 포맷팅 함수"""
        if not first_name or not last_name:
            raise ValueError("이름이 필요합니다")
        
        if title:
            return f"{title} {first_name} {last_name}"
        return f"{first_name} {last_name}"
    
    # 테스트
    test_cases = [
        (lambda: divide(10, 2), "정상 나눗셈"),
        (lambda: divide(10, 0), "0으로 나누기"),
        (lambda: format_name("홍", "길동", "Mr."), "정상 이름 포맷"),
        (lambda: format_name("", "길동"), "빈 이름"),
    ]
    
    for test_func, description in test_cases:
        try:
            result = test_func()
            print(f"    ✓ {description}: {result}")
        except Exception as e:
            print(f"    ✗ {description}: {type(e).__name__}")

demonstrate_logging_decorators()
```

## 6. 실용적 예외 처리 패턴

### 6.1 재시도 패턴

```python
print("\n=== 실용적 예외 처리 패턴 ===")

import time
import random

def demonstrate_retry_pattern():
    """재시도 패턴 구현"""
    
    print("1. 재시도 패턴:")
    
    def retry_on_failure(max_attempts=3, delay=1, backoff=2):
        """실패 시 재시도하는 데코레이터"""
        
        def decorator(func):
            def wrapper(*args, **kwargs):
                last_exception = None
                
                for attempt in range(max_attempts):
                    try:
                        return func(*args, **kwargs)
                        
                    except Exception as e:
                        last_exception = e
                        
                        if attempt < max_attempts - 1:  # 마지막 시도가 아니면
                            wait_time = delay * (backoff ** attempt)
                            print(f"    시도 {attempt + 1} 실패: {e}")
                            print(f"    {wait_time}초 후 재시도...")
                            time.sleep(wait_time)
                        else:
                            print(f"    모든 시도 실패: {e}")
                
                # 모든 시도가 실패한 경우
                raise last_exception
            
            return wrapper
        return decorator
    
    @retry_on_failure(max_attempts=3, delay=0.5, backoff=2)
    def unreliable_network_call(endpoint):
        """불안정한 네트워크 호출 시뮬레이션"""
        
        # 70% 확률로 실패
        if random.random() < 0.7:
            raise ConnectionError(f"네트워크 연결 실패: {endpoint}")
        
        return f"성공적으로 {endpoint}에 연결됨"
    
    # 테스트
    endpoints = ["api.example.com", "db.example.com"]
    
    for endpoint in endpoints:
        try:
            result = unreliable_network_call(endpoint)
            print(f"  ✓ {result}")
        except ConnectionError as e:
            print(f"  ✗ 최종 실패: {e}")
        print()

demonstrate_retry_pattern()

def demonstrate_circuit_breaker():
    """회로 차단기 패턴"""
    
    print("2. 회로 차단기 패턴:")
    
    class CircuitBreaker:
        """회로 차단기 구현"""
        
        def __init__(self, failure_threshold=5, timeout=60):
            self.failure_threshold = failure_threshold
            self.timeout = timeout
            self.failure_count = 0
            self.last_failure_time = None
            self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
        
        def __call__(self, func):
            def wrapper(*args, **kwargs):
                if self.state == "OPEN":
                    if time.time() - self.last_failure_time > self.timeout:
                        self.state = "HALF_OPEN"
                        print(f"    회로 차단기 HALF_OPEN 상태로 전환")
                    else:
                        raise Exception("회로 차단기가 OPEN 상태입니다")
                
                try:
                    result = func(*args, **kwargs)
                    
                    # 성공하면 카운터 리셋
                    if self.state == "HALF_OPEN":
                        self.state = "CLOSED"
                        print(f"    회로 차단기 CLOSED 상태로 복구")
                    
                    self.failure_count = 0
                    return result
                    
                except Exception as e:
                    self.failure_count += 1
                    self.last_failure_time = time.time()
                    
                    if self.failure_count >= self.failure_threshold:
                        self.state = "OPEN"
                        print(f"    회로 차단기 OPEN 상태로 전환 (실패 횟수: {self.failure_count})")
                    
                    raise
            
            return wrapper
    
    @CircuitBreaker(failure_threshold=3, timeout=2)
    def external_service_call(service_name):
        """외부 서비스 호출 시뮬레이션"""
        
        # 80% 확률로 실패
        if random.random() < 0.8:
            raise Exception(f"{service_name} 서비스 응답 없음")
        
        return f"{service_name} 서비스 호출 성공"
    
    # 테스트
    for i in range(8):
        try:
            result = external_service_call("payment")
            print(f"  호출 {i+1}: ✓ {result}")
        except Exception as e:
            print(f"  호출 {i+1}: ✗ {e}")
        
        time.sleep(0.1)

demonstrate_circuit_breaker()
```

### 6.2 예외 수집과 분석

```python
print("\n=== 예외 수집과 분석 ===")

def demonstrate_exception_aggregation():
    """예외 수집과 분석"""
    
    print("3. 예외 수집과 분석:")
    
    class ExceptionCollector:
        """예외를 수집하고 분석하는 클래스"""
        
        def __init__(self):
            self.exceptions = []
            self.exception_counts = {}
        
        def collect_exception(self, exception, context=None):
            """예외 수집"""
            exception_info = {
                'type': type(exception).__name__,
                'message': str(exception),
                'context': context or {},
                'timestamp': time.time()
            }
            
            self.exceptions.append(exception_info)
            
            # 예외 타입별 카운트
            exc_type = type(exception).__name__
            self.exception_counts[exc_type] = self.exception_counts.get(exc_type, 0) + 1
        
        def analyze_exceptions(self):
            """예외 분석 결과 반환"""
            total_exceptions = len(self.exceptions)
            
            if total_exceptions == 0:
                return {"total": 0, "analysis": "예외가 없습니다"}
            
            # 가장 빈번한 예외
            most_common = max(self.exception_counts.items(), key=lambda x: x[1])
            
            # 최근 예외들
            recent_exceptions = sorted(
                self.exceptions, 
                key=lambda x: x['timestamp'], 
                reverse=True
            )[:5]
            
            return {
                "total": total_exceptions,
                "exception_types": dict(self.exception_counts),
                "most_common": {"type": most_common[0], "count": most_common[1]},
                "recent": recent_exceptions
            }
        
        def __enter__(self):
            return self
        
        def __exit__(self, exc_type, exc_val, exc_tb):
            if exc_type:
                self.collect_exception(exc_val, {"handled_by": "context_manager"})
            return True  # 예외를 억제
    
    def batch_operation(collector):
        """여러 작업을 수행하는 배치 함수"""
        operations = [
            lambda: 10 / 0,  # ZeroDivisionError
            lambda: [1, 2, 3][5],  # IndexError
            lambda: {"a": 1}["b"],  # KeyError
            lambda: int("abc"),  # ValueError
            lambda: open("nonexistent.txt"),  # FileNotFoundError
            lambda: 10 / 0,  # 또 다른 ZeroDivisionError
        ]
        
        for i, operation in enumerate(operations):
            try:
                result = operation()
                print(f"    작업 {i+1}: 성공")
            except Exception as e:
                collector.collect_exception(e, {"operation_id": i+1})
                print(f"    작업 {i+1}: 실패 - {type(e).__name__}")
    
    # 예외 수집기 사용
    with ExceptionCollector() as collector:
        batch_operation(collector)
        
        # 분석 결과 출력
        analysis = collector.analyze_exceptions()
        
        print(f"\n  예외 분석 결과:")
        print(f"    총 예외 수: {analysis['total']}")
        print(f"    예외 타입별 수: {analysis['exception_types']}")
        print(f"    가장 빈번한 예외: {analysis['most_common']['type']} ({analysis['most_common']['count']}회)")
        
        print(f"\n    최근 예외들:")
        for exc in analysis['recent']:
            print(f"      {exc['type']}: {exc['message']} (작업 ID: {exc['context'].get('operation_id', 'N/A')})")

demonstrate_exception_aggregation()
```

## 7. 연습 문제

### 연습 1: 견고한 파일 처리 시스템
여러 파일을 안전하게 처리하는 시스템을 구현하세요. 파일 읽기/쓰기 실패, 권한 오류, 인코딩 오류 등을 모두 처리해야 합니다.

### 연습 2: API 클라이언트 구현
외부 API를 호출하는 클라이언트를 구현하세요. 네트워크 오류, 타임아웃, 인증 실패, 응답 파싱 오류 등을 처리하고 재시도 로직을 포함해야 합니다.

### 연습 3: 데이터 검증 프레임워크
사용자 입력 데이터를 검증하는 프레임워크를 만드세요. 커스텀 예외 클래스, 체이닝, 상세한 오류 메시지를 포함해야 합니다.

### 연습 4: 로그 분석 도구
로그 파일을 분석하여 오류 패턴을 찾는 도구를 구현하세요. 예외 발생 빈도, 시간대별 분석, 알림 기능을 포함해야 합니다.

## 정리

이 챕터에서 학습한 내용:

1. **예외 계층 구조**: BaseException부터 구체적인 예외까지의 상속 관계 이해
2. **커스텀 예외**: 도메인별 예외 클래스 설계와 구현
3. **고급 예외 처리**: try-except-else-finally 완전 활용과 예외 체이닝
4. **assert 문**: 개발 시 조건 검사와 디버깅 활용
5. **로깅 시스템**: 구조화된 로깅과 예외와의 통합
6. **실용적 패턴**: 재시도, 회로 차단기, 예외 수집과 분석

다음 챕터에서는 이터레이터와 제너레이터를 학습하여 메모리 효율적인 데이터 처리 방법을 배우겠습니다.

### 핵심 포인트
- 적절한 예외 타입을 선택하여 구체적으로 처리하세요
- 커스텀 예외로 도메인 로직을 명확하게 표현하세요
- 예외 체이닝으로 원인을 추적할 수 있게 하세요
- assert는 개발 시에만, 예외 처리는 프로덕션에서 사용하세요
- 로깅과 예외 처리를 통합하여 디버깅을 용이하게 하세요
- 재시도와 회로 차단기 패턴으로 견고한 시스템을 구축하세요 