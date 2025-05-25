# Chapter 8: 예외 처리 고급

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- Python 예외 계층 구조를 이해하고 활용하기
- 커스텀 예외 클래스를 설계하고 구현하기
- 컨텍스트 매니저를 활용한 리소스 관리하기
- 로깅 시스템과 예외 처리 통합하기
- 예외 체이닝과 원인 추적하기
- 성능 고려사항과 최적화 기법 적용하기
- 실무에서의 견고한 예외 처리 패턴 구현하기

## 1. Python 예외 계층 구조 이해

### 1.1 기본 예외 계층

```python
print("=== Python 예외 계층 구조 이해 ===")

import traceback
import sys
from datetime import datetime

def demonstrate_exception_hierarchy():
    """Python 예외 계층 구조 시연"""
    
    print("1. Python 예외 계층 구조:")
    print("   BaseException")
    print("    ├── SystemExit")
    print("    ├── KeyboardInterrupt")
    print("    ├── GeneratorExit")
    print("    └── Exception")
    print("         ├── StopIteration")
    print("         ├── StopAsyncIteration")
    print("         ├── ArithmeticError")
    print("         │    ├── ZeroDivisionError")
    print("         │    ├── OverflowError")
    print("         │    └── FloatingPointError")
    print("         ├── LookupError")
    print("         │    ├── IndexError")
    print("         │    └── KeyError")
    print("         ├── OSError")
    print("         │    ├── FileNotFoundError")
    print("         │    ├── PermissionError")
    print("         │    └── TimeoutError")
    print("         ├── ValueError")
    print("         ├── TypeError")
    print("         ├── AttributeError")
    print("         └── RuntimeError")
    print()

def demonstrate_exception_types():
    """다양한 예외 타입 시연"""
    
    print("2. 예외 타입별 특성:")
    
    exception_examples = [
        ("ArithmeticError", lambda: 1 / 0, "수학 연산 관련 오류"),
        ("LookupError", lambda: [1, 2, 3][10], "인덱스/키 관련 오류"),
        ("ValueError", lambda: int("invalid"), "잘못된 값 관련 오류"),
        ("TypeError", lambda: "string" + 123, "타입 관련 오류"),
        ("AttributeError", lambda: "string".nonexistent_method(), "속성 관련 오류")
    ]
    
    for category, func, description in exception_examples:
        try:
            func()
        except Exception as e:
            print(f"   {category}: {type(e).__name__}")
            print(f"     - 설명: {description}")
            print(f"     - 메시지: {str(e)}")
            print(f"     - MRO: {[cls.__name__ for cls in type(e).__mro__]}")
            print()

demonstrate_exception_hierarchy()
demonstrate_exception_types()

class ExceptionAnalyzer:
    """예외 분석 도구"""
    
    def __init__(self):
        self.exception_log = []
    
    def analyze_exception(self, exception):
        """예외 상세 분석"""
        analysis = {
            'timestamp': datetime.now().isoformat(),
            'type': type(exception).__name__,
            'message': str(exception),
            'args': exception.args,
            'mro': [cls.__name__ for cls in type(exception).__mro__],
            'module': type(exception).__module__,
            'traceback_info': self._get_traceback_info()
        }
        
        self.exception_log.append(analysis)
        return analysis
    
    def _get_traceback_info(self):
        """트레이스백 정보 추출"""
        exc_type, exc_value, exc_traceback = sys.exc_info()
        if exc_traceback:
            tb_lines = traceback.format_tb(exc_traceback)
            return {
                'frames': len(tb_lines),
                'last_frame': tb_lines[-1].strip() if tb_lines else None
            }
        return None
    
    def get_exception_stats(self):
        """예외 통계 반환"""
        if not self.exception_log:
            return "예외가 없습니다."
        
        exception_counts = {}
        for log in self.exception_log:
            exc_type = log['type']
            exception_counts[exc_type] = exception_counts.get(exc_type, 0) + 1
        
        return {
            'total_exceptions': len(self.exception_log),
            'unique_types': len(exception_counts),
            'type_distribution': exception_counts,
            'most_common': max(exception_counts.items(), key=lambda x: x[1])
        }

def demonstrate_exception_analysis():
    """예외 분석 시연"""
    
    print("3. 예외 분석 도구 활용:")
    
    analyzer = ExceptionAnalyzer()
    
    # 다양한 예외 발생시켜 분석
    test_cases = [
        lambda: 1 / 0,
        lambda: [1, 2][5],
        lambda: int("not_a_number"),
        lambda: {"a": 1}["b"]
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        try:
            test_case()
        except Exception as e:
            analysis = analyzer.analyze_exception(e)
            print(f"   예외 {i}: {analysis['type']}")
            print(f"     메시지: {analysis['message']}")
            print(f"     상속 계층: {' -> '.join(analysis['mro'])}")
    
    # 통계 출력
    stats = analyzer.get_exception_stats()
    print(f"\n   예외 통계:")
    print(f"     총 예외 수: {stats['total_exceptions']}")
    print(f"     고유 타입 수: {stats['unique_types']}")
    if stats['most_common']:
        pattern, count = stats['most_common']
        print(f"     가장 빈번한 패턴: {pattern} ({count}회)")

demonstrate_exception_analysis()
```

### 1.2 예외 포착 전략

```python
print("\n=== 예외 포착 전략 ===")

class SmartExceptionHandler:
    """지능형 예외 처리기"""
    
    def __init__(self, strict_mode=False):
        self.strict_mode = strict_mode
        self.handled_exceptions = []
    
    def handle_with_specificity(self, operation, *args, **kwargs):
        """구체적인 예외별 처리"""
        
        try:
            return operation(*args, **kwargs)
            
        except FileNotFoundError as e:
            self._log_exception(e, "파일 관련")
            if self.strict_mode:
                raise
            return self._create_default_file()
            
        except PermissionError as e:
            self._log_exception(e, "권한 관련")
            if self.strict_mode:
                raise
            return self._request_elevated_access()
            
        except ValueError as e:
            self._log_exception(e, "값 관련")
            if self.strict_mode:
                raise
            return self._sanitize_input(*args, **kwargs)
            
        except (ConnectionError, TimeoutError) as e:
            self._log_exception(e, "네트워크 관련")
            if self.strict_mode:
                raise
            return self._retry_with_backoff(operation, *args, **kwargs)
            
        except Exception as e:
            self._log_exception(e, "일반")
            if self.strict_mode:
                raise
            return self._generic_fallback()
    
    def _log_exception(self, exception, category):
        """예외 로깅"""
        log_data = {
            'timestamp': datetime.now().isoformat(),
            'category': category,
            'type': type(exception).__name__,
            'message': str(exception),
            'handled': not self.strict_mode
        }
        
        self.handled_exceptions.append(log_data)
        print(f"   [{category}] {type(exception).__name__}: {exception}")
    
    def _create_default_file(self):
        """기본 파일 생성"""
        print("     → 기본 설정 파일을 생성합니다.")
        return "default_content"
    
    def _request_elevated_access(self):
        """권한 상승 요청"""
        print("     → 관리자 권한을 요청합니다.")
        return "permission_requested"
    
    def _sanitize_input(self, *args, **kwargs):
        """입력 값 정제"""
        print("     → 입력 값을 정제하여 재시도합니다.")
        return "sanitized_result"
    
    def _retry_with_backoff(self, operation, *args, **kwargs):
        """백오프를 사용한 재시도"""
        print("     → 네트워크 연결을 재시도합니다.")
        return "retry_result"
    
    def _generic_fallback(self):
        """일반적인 폴백"""
        print("     → 안전한 기본값을 반환합니다.")
        return "fallback_result"

def demonstrate_exception_handling_strategies():
    """예외 처리 전략 시연"""
    
    print("4. 구체적인 예외 처리 전략:")
    
    handler = SmartExceptionHandler(strict_mode=False)
    
    # 시뮬레이션 함수들
    def file_operation():
        raise FileNotFoundError("설정 파일을 찾을 수 없습니다")
    
    def value_operation():
        raise ValueError("잘못된 형식의 데이터입니다")
    
    def network_operation():
        raise ConnectionError("서버에 연결할 수 없습니다")
    
    operations = [
        ("파일 작업", file_operation),
        ("값 검증", value_operation),
        ("네트워크 요청", network_operation)
    ]
    
    for name, operation in operations:
        print(f"\n   {name} 실행:")
        result = handler.handle_with_specificity(operation)
        print(f"     결과: {result}")
    
    # 처리된 예외 요약
    print(f"\n   처리된 예외 총 {len(handler.handled_exceptions)}개:")
    for log in handler.handled_exceptions:
        print(f"     - {log['category']}: {log['type']}")

demonstrate_exception_handling_strategies()
```

## 2. 커스텀 예외 클래스 설계

### 2.1 기본 커스텀 예외

```python
print("\n=== 커스텀 예외 클래스 설계 ===")

class ApplicationError(Exception):
    """애플리케이션 기본 예외 클래스"""
    
    def __init__(self, message, error_code=None, details=None):
        super().__init__(message)
        self.error_code = error_code
        self.details = details or {}
        self.timestamp = datetime.now()
    
    def __str__(self):
        base_msg = super().__str__()
        if self.error_code:
            return f"[{self.error_code}] {base_msg}"
        return base_msg
    
    def __repr__(self):
        return f"{self.__class__.__name__}('{self}', error_code={self.error_code})"
    
    def to_dict(self):
        """예외 정보를 딕셔너리로 변환"""
        return {
            'type': self.__class__.__name__,
            'message': str(self),
            'error_code': self.error_code,
            'details': self.details,
            'timestamp': self.timestamp.isoformat()
        }

class ValidationError(ApplicationError):
    """검증 관련 예외"""
    
    def __init__(self, field, value, message=None):
        self.field = field
        self.value = value
        default_message = f"필드 '{field}'의 값 '{value}'이(가) 유효하지 않습니다"
        super().__init__(
            message or default_message,
            error_code="VALIDATION_ERROR",
            details={'field': field, 'value': value}
        )

class BusinessLogicError(ApplicationError):
    """비즈니스 로직 관련 예외"""
    
    def __init__(self, operation, reason, suggestions=None):
        self.operation = operation
        self.reason = reason
        self.suggestions = suggestions or []
        
        message = f"작업 '{operation}'을(를) 수행할 수 없습니다: {reason}"
        super().__init__(
            message,
            error_code="BUSINESS_LOGIC_ERROR",
            details={
                'operation': operation,
                'reason': reason,
                'suggestions': self.suggestions
            }
        )

class DataAccessError(ApplicationError):
    """데이터 접근 관련 예외"""
    
    def __init__(self, resource, action, original_error=None):
        self.resource = resource
        self.action = action
        self.original_error = original_error
        
        message = f"리소스 '{resource}'에 대한 '{action}' 작업이 실패했습니다"
        if original_error:
            message += f": {original_error}"
        
        super().__init__(
            message,
            error_code="DATA_ACCESS_ERROR",
            details={
                'resource': resource,
                'action': action,
                'original_error': str(original_error) if original_error else None
            }
        )

def demonstrate_custom_exceptions():
    """커스텀 예외 시연"""
    
    print("5. 커스텀 예외 클래스 활용:")
    
    # 검증 예외
    try:
        age = -5
        if age < 0:
            raise ValidationError('age', age, '나이는 0 이상이어야 합니다')
    except ValidationError as e:
        print(f"   검증 오류: {e}")
        print(f"     세부 정보: {e.details}")
    
    # 비즈니스 로직 예외
    try:
        account_balance = 100
        withdraw_amount = 500
        if withdraw_amount > account_balance:
            raise BusinessLogicError(
                operation='출금',
                reason='잔액 부족',
                suggestions=['잔액을 확인하세요', '입금을 먼저 하세요']
            )
    except BusinessLogicError as e:
        print(f"\n   비즈니스 로직 오류: {e}")
        print(f"     제안사항: {', '.join(e.suggestions)}")
    
    # 데이터 접근 예외
    try:
        raise DataAccessError(
            resource='user_database',
            action='read',
            original_error=ConnectionError("데이터베이스 연결 실패")
        )
    except DataAccessError as e:
        print(f"\n   데이터 접근 오류: {e}")
        print(f"     JSON 형태: {e.to_dict()}")

demonstrate_custom_exceptions()
```

### 2.2 예외 체이닝과 원인 추적

```python
print("\n=== 예외 체이닝과 원인 추적 ===")

class ExceptionChainManager:
    """예외 체이닝 관리자"""
    
    def __init__(self):
        self.chain_history = []
    
    def raise_from(self, new_exception, original_exception):
        """명시적 예외 체이닝"""
        self.chain_history.append({
            'original': original_exception,
            'new': new_exception,
            'timestamp': datetime.now()
        })
        
        # Python 3의 raise ... from ... 구문 시뮬레이션
        new_exception.__cause__ = original_exception
        raise new_exception
    
    def raise_during(self, new_exception):
        """컨텍스트 내에서 발생한 예외 체이닝"""
        # Python의 암시적 체이닝 시뮬레이션
        exc_type, exc_value, exc_traceback = sys.exc_info()
        if exc_value:
            new_exception.__context__ = exc_value
        raise new_exception
    
    def analyze_chain(self, exception):
        """예외 체인 분석"""
        chain = []
        current = exception
        
        while current:
            chain.append({
                'type': type(current).__name__,
                'message': str(current),
                'is_cause': hasattr(current, '__cause__') and current.__cause__ is not None,
                'is_context': hasattr(current, '__context__') and current.__context__ is not None
            })
            
            # 다음 예외 찾기 (cause가 우선, 없으면 context)
            current = getattr(current, '__cause__', None) or getattr(current, '__context__', None)
        
        return chain

class LayeredService:
    """계층화된 서비스 예제"""
    
    def __init__(self):
        self.chain_manager = ExceptionChainManager()
    
    def database_layer(self, query):
        """데이터베이스 계층"""
        try:
            if "invalid" in query:
                raise ConnectionError("데이터베이스 연결 실패")
            return f"DB Result for: {query}"
        except ConnectionError as e:
            # 데이터베이스 예외를 서비스 예외로 변환
            self.chain_manager.raise_from(
                DataAccessError("database", "query", e),
                e
            )
    
    def business_layer(self, request):
        """비즈니스 로직 계층"""
        try:
            if not request.get('valid', True):
                raise ValidationError('request', request, '유효하지 않은 요청')
            
            # 데이터베이스 호출
            return self.database_layer(request.get('query', 'valid_query'))
            
        except (ValidationError, DataAccessError) as e:
            # 비즈니스 로직 예외로 래핑
            try:
                raise BusinessLogicError(
                    operation='process_request',
                    reason=f"요청 처리 실패: {e}"
                )
            except BusinessLogicError:
                # 기존 예외를 컨텍스트로 유지
                self.chain_manager.raise_during(
                    ApplicationError("서비스 처리 중 오류가 발생했습니다")
                )
    
    def api_layer(self, user_request):
        """API 계층"""
        try:
            return self.business_layer(user_request)
        except Exception as e:
            print(f"6. 예외 체이닝 분석:")
            
            # 예외 체인 분석
            chain = self.chain_manager.analyze_chain(e)
            
            print(f"   발생한 예외 체인 ({len(chain)}단계):")
            for i, exc_info in enumerate(chain):
                indent = "  " * (i + 2)
                chain_type = "원인" if exc_info['is_cause'] else "컨텍스트" if exc_info['is_context'] else "최종"
                print(f"{indent}[{chain_type}] {exc_info['type']}: {exc_info['message']}")
            
            # 최종 예외로 변환
            raise ApplicationError(
                "API 요청 처리 실패",
                error_code="API_ERROR"
            ) from e

def demonstrate_exception_chaining():
    """예외 체이닝 시연"""
    
    service = LayeredService()
    
    # 정상 요청
    try:
        result = service.api_layer({'query': 'SELECT * FROM users', 'valid': True})
        print(f"   정상 결과: {result}")
    except Exception as e:
        print(f"   실패: {type(e).__name__}: {e}")
    
    print()
    
    # 오류 발생 요청
    try:
        service.api_layer({'query': 'invalid_query', 'valid': False})
    except ApplicationError as e:
        print(f"\n   최종 예외: {e}")
        print(f"   예외 코드: {e.error_code}")

demonstrate_exception_chaining()
```

## 3. 컨텍스트 매니저와 예외 처리

### 3.1 컨텍스트 매니저 기본

```python
print("\n=== 컨텍스트 매니저와 예외 처리 ===")

import contextlib
from contextlib import contextmanager

class ResourceManager:
    """리소스 관리 컨텍스트 매니저"""
    
    def __init__(self, resource_name, timeout=10):
        self.resource_name = resource_name
        self.timeout = timeout
        self.resource = None
        self.acquired = False
        self.exceptions_occurred = []
    
    def __enter__(self):
        """리소스 획득"""
        print(f"   리소스 '{self.resource_name}' 획득 시도...")
        
        try:
            # 리소스 초기화 시뮬레이션
            if self.resource_name == "failing_resource":
                raise RuntimeError("리소스 초기화 실패")
            
            self.resource = f"Resource-{self.resource_name}-Handle"
            self.acquired = True
            print(f"   ✓ 리소스 '{self.resource_name}' 획득 성공")
            return self.resource
            
        except Exception as e:
            print(f"   ✗ 리소스 획득 실패: {e}")
            self.exceptions_occurred.append(e)
            raise
    
    def __exit__(self, exc_type, exc_value, traceback):
        """리소스 해제"""
        print(f"   리소스 '{self.resource_name}' 해제 중...")
        
        if exc_type:
            print(f"   예외 발생: {exc_type.__name__}: {exc_value}")
            self.exceptions_occurred.append(exc_value)
        
        try:
            if self.acquired:
                # 리소스 정리 시뮬레이션
                if self.resource_name == "cleanup_failing_resource":
                    raise RuntimeError("리소스 정리 실패")
                
                self.resource = None
                self.acquired = False
                print(f"   ✓ 리소스 '{self.resource_name}' 해제 완료")
            
        except Exception as cleanup_error:
            print(f"   ✗ 리소스 해제 실패: {cleanup_error}")
            self.exceptions_occurred.append(cleanup_error)
            
            # 정리 중 예외가 발생해도 원래 예외를 유지
            if exc_type is None:
                # 원래 예외가 없었다면 정리 예외를 발생
                raise cleanup_error
            else:
                # 원래 예외가 있었다면 그것을 우선시 (정리 예외는 로그만)
                print(f"   주의: 정리 중 추가 예외 발생, 원래 예외를 유지합니다")
        
        # False를 반환하여 예외를 재발생시킴 (예외 억제 안함)
        return False

class DatabaseConnection:
    """데이터베이스 연결 시뮬레이션"""
    
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connected = False
        self.transaction_active = False
    
    def connect(self):
        """연결"""
        if "invalid" in self.connection_string:
            raise ConnectionError("잘못된 연결 문자열")
        self.connected = True
        print(f"     데이터베이스 연결됨: {self.connection_string}")
    
    def begin_transaction(self):
        """트랜잭션 시작"""
        if not self.connected:
            raise RuntimeError("연결되지 않음")
        self.transaction_active = True
        print(f"     트랜잭션 시작")
    
    def commit(self):
        """커밋"""
        if not self.transaction_active:
            raise RuntimeError("활성 트랜잭션이 없음")
        self.transaction_active = False
        print(f"     트랜잭션 커밋됨")
    
    def rollback(self):
        """롤백"""
        if self.transaction_active:
            self.transaction_active = False
            print(f"     트랜잭션 롤백됨")
    
    def close(self):
        """연결 종료"""
        if self.transaction_active:
            self.rollback()
        if self.connected:
            self.connected = False
            print(f"     데이터베이스 연결 종료됨")

@contextmanager
def database_transaction(connection_string):
    """데이터베이스 트랜잭션 컨텍스트 매니저"""
    
    db = DatabaseConnection(connection_string)
    
    try:
        # 설정
        db.connect()
        db.begin_transaction()
        
        yield db
        
        # 성공 시 커밋
        db.commit()
        
    except Exception as e:
        # 실패 시 롤백
        print(f"     오류 발생, 롤백 수행: {e}")
        try:
            db.rollback()
        except Exception as rollback_error:
            print(f"     롤백 실패: {rollback_error}")
        raise
        
    finally:
        # 항상 연결 종료
        try:
            db.close()
        except Exception as close_error:
            print(f"     연결 종료 실패: {close_error}")

def demonstrate_context_managers():
    """컨텍스트 매니저 시연"""
    
    print("7. 컨텍스트 매니저 기본 사용법:")
    
    # 성공 케이스
    try:
        with ResourceManager("file_handler") as resource:
            print(f"     작업 수행 중: {resource}")
            # 정상 작업
    except Exception as e:
        print(f"   오류: {e}")
    
    print()
    
    # 예외 발생 케이스
    try:
        with ResourceManager("database_connection") as resource:
            print(f"     작업 수행 중: {resource}")
            raise ValueError("비즈니스 로직 오류")
    except ValueError as e:
        print(f"   처리된 오류: {e}")
    
    print()
    
    # 데이터베이스 트랜잭션 성공
    print("8. 데이터베이스 트랜잭션 컨텍스트 매니저:")
    try:
        with database_transaction("postgresql://localhost:5432/mydb") as db:
            print(f"     SQL 실행: INSERT INTO users...")
            print(f"     SQL 실행: UPDATE profiles...")
            # 성공적으로 완료
    except Exception as e:
        print(f"   트랜잭션 실패: {e}")
    
    print()
    
    # 데이터베이스 트랜잭션 실패
    try:
        with database_transaction("postgresql://localhost:5432/mydb") as db:
            print(f"     SQL 실행: INSERT INTO users...")
            raise RuntimeError("SQL 실행 오류")
    except RuntimeError as e:
        print(f"   트랜잭션 실패 처리됨: {e}")

demonstrate_context_managers()
```

### 3.2 고급 컨텍스트 매니저 패턴

```python
print("\n=== 고급 컨텍스트 매니저 패턴 ===")

class MultiResourceManager:
    """다중 리소스 관리자"""
    
    def __init__(self):
        self.resources = []
        self.acquired_resources = []
    
    def add_resource(self, resource_factory, *args, **kwargs):
        """리소스 팩토리 추가"""
        self.resources.append((resource_factory, args, kwargs))
    
    def __enter__(self):
        """모든 리소스 획득"""
        print("   다중 리소스 획득 시작...")
        
        try:
            for i, (factory, args, kwargs) in enumerate(self.resources):
                print(f"     리소스 {i+1} 획득 중...")
                resource = factory(*args, **kwargs)
                
                if hasattr(resource, '__enter__'):
                    acquired = resource.__enter__()
                    self.acquired_resources.append((resource, acquired))
                else:
                    self.acquired_resources.append((resource, resource))
                    
                print(f"     리소스 {i+1} 획득 완료")
            
            print("   모든 리소스 획득 완료")
            return [res[1] for res in self.acquired_resources]
            
        except Exception as e:
            print(f"   리소스 획득 실패: {e}")
            self._cleanup_acquired_resources()
            raise
    
    def __exit__(self, exc_type, exc_value, traceback):
        """모든 리소스 해제"""
        print("   다중 리소스 해제 시작...")
        
        cleanup_errors = []
        
        # 역순으로 해제
        for resource, acquired in reversed(self.acquired_resources):
            try:
                if hasattr(resource, '__exit__'):
                    resource.__exit__(exc_type, exc_value, traceback)
                else:
                    # 간단한 정리 로직
                    if hasattr(resource, 'close'):
                        resource.close()
                print(f"     리소스 해제 완료: {type(resource).__name__}")
                
            except Exception as cleanup_error:
                print(f"     리소스 해제 실패: {cleanup_error}")
                cleanup_errors.append(cleanup_error)
        
        self.acquired_resources.clear()
        
        if cleanup_errors and exc_type is None:
            # 원래 예외가 없었다면 정리 예외 발생
            raise cleanup_errors[0]
        
        print("   다중 리소스 해제 완료")
        return False
    
    def _cleanup_acquired_resources(self):
        """부분적으로 획득된 리소스 정리"""
        for resource, acquired in reversed(self.acquired_resources):
            try:
                if hasattr(resource, '__exit__'):
                    resource.__exit__(None, None, None)
            except Exception as e:
                print(f"     정리 중 오류: {e}")
        self.acquired_resources.clear()

@contextmanager
def error_handling_context(error_handler=None, recovery_action=None):
    """오류 처리 컨텍스트"""
    
    try:
        print("     오류 처리 컨텍스트 시작")
        yield
        print("     오류 처리 컨텍스트 정상 완료")
        
    except Exception as e:
        print(f"     오류 감지: {type(e).__name__}: {e}")
        
        if error_handler:
            try:
                result = error_handler(e)
                print(f"     오류 핸들러 결과: {result}")
            except Exception as handler_error:
                print(f"     오류 핸들러 실패: {handler_error}")
        
        if recovery_action:
            try:
                recovery_result = recovery_action(e)
                print(f"     복구 액션 결과: {recovery_result}")
                return  # 복구 성공 시 예외 억제
            except Exception as recovery_error:
                print(f"     복구 액션 실패: {recovery_error}")
        
        # 예외 재발생
        raise

class RetryContext:
    """재시도 컨텍스트 매니저"""
    
    def __init__(self, max_attempts=3, delay=1, backoff_factor=2, 
                 retry_exceptions=(Exception,)):
        self.max_attempts = max_attempts
        self.delay = delay
        self.backoff_factor = backoff_factor
        self.retry_exceptions = retry_exceptions
        self.attempt = 0
        self.last_exception = None
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type and issubclass(exc_type, self.retry_exceptions):
            self.attempt += 1
            self.last_exception = exc_value
            
            if self.attempt < self.max_attempts:
                import time
                current_delay = self.delay * (self.backoff_factor ** (self.attempt - 1))
                print(f"     재시도 {self.attempt}/{self.max_attempts}, {current_delay}초 대기...")
                time.sleep(current_delay)
                return True  # 예외 억제 (재시도)
            else:
                print(f"     최대 재시도 횟수 초과")
                return False  # 예외 재발생
        
        return False  # 다른 예외는 재발생

def demonstrate_advanced_context_managers():
    """고급 컨텍스트 매니저 시연"""
    
    print("9. 다중 리소스 관리자:")
    
    # Mock 리소스들
    class MockFileResource:
        def __init__(self, filename):
            self.filename = filename
        
        def __enter__(self):
            print(f"       파일 열기: {self.filename}")
            return self
        
        def __exit__(self, *args):
            print(f"       파일 닫기: {self.filename}")
    
    class MockNetworkResource:
        def __init__(self, host):
            self.host = host
        
        def __enter__(self):
            print(f"       네트워크 연결: {self.host}")
            return self
        
        def __exit__(self, *args):
            print(f"       네트워크 연결 해제: {self.host}")
    
    # 다중 리소스 사용
    try:
        multi_manager = MultiResourceManager()
        multi_manager.add_resource(MockFileResource, "config.txt")
        multi_manager.add_resource(MockNetworkResource, "api.example.com")
        
        with multi_manager as resources:
            file_res, network_res = resources
            print(f"     모든 리소스 사용 가능")
            # 작업 수행
            
    except Exception as e:
        print(f"   다중 리소스 오류: {e}")
    
    print()
    
    # 오류 처리 컨텍스트
    print("10. 오류 처리 컨텍스트:")
    
    def custom_error_handler(error):
        return f"오류 로깅 완료: {error}"
    
    def recovery_action(error):
        if isinstance(error, ValueError):
            return "기본값으로 복구"
        raise error  # 복구 불가능
    
    try:
        with error_handling_context(custom_error_handler, recovery_action):
            print("     정상 작업 수행")
            raise ValueError("복구 가능한 오류")
    except Exception as e:
        print(f"   최종 오류: {e}")
    
    print()
    
    # 재시도 컨텍스트
    print("11. 재시도 컨텍스트:")
    
    attempt_count = 0
    while True:
        try:
            with RetryContext(max_attempts=3, delay=0.1) as retry_ctx:
                attempt_count += 1
                print(f"     작업 시도 #{attempt_count}")
                
                if attempt_count < 3:
                    result = unreliable_service(success_rate=0.3)  # 높은 실패율
                    print(f"     호출 {attempt_count}: 성공")
                    break
                else:
                    result = slow_operation(delay_factor=attempt_count-4)
                    print(f"     호출 {attempt_count}: {result}")
                    break
                    
        except Exception as e:
            print(f"     호출 {attempt_count}: 실패 - {type(e).__name__}")
            break

demonstrate_advanced_context_managers()
```

## 4. 로깅과 예외 처리 통합

### 4.1 예외 로깅 시스템

```python
print("\n=== 로깅과 예외 처리 통합 ===")

import logging
import json
from datetime import datetime
import traceback

class ExceptionLogger:
    """예외 전용 로거"""
    
    def __init__(self, name="exception_logger", level=logging.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)
        
        # 콘솔 핸들러 설정
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
    
    def log_exception(self, exception, context=None, extra_data=None):
        """예외 상세 로깅"""
        
        log_data = {
            'timestamp': datetime.now().isoformat(),
            'category': 'general',
            'type': type(exception).__name__,
            'message': str(exception),
            'handled': True
        }
        
        if context:
            log_data['context'] = context
        
        if extra_data:
            log_data.update(extra_data)
        
        self.logger.log(logging.INFO, json.dumps(log_data, indent=2, ensure_ascii=False))
        
        return log_data
    
    def log_with_context(self, level, message, exception=None, **context):
        """컨텍스트와 함께 로깅"""
        
        log_entry = {
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'context': context
        }
        
        if exception:
            log_entry.update(self.log_exception(exception))
        
        self.logger.log(level, json.dumps(log_entry, indent=2, ensure_ascii=False))

class LoggingExceptionHandler:
    """로깅 기능이 포함된 예외 처리기"""
    
    def __init__(self, logger_name="app_logger"):
        self.exception_logger = ExceptionLogger(logger_name)
        self.handled_count = 0
        self.error_patterns = {}
    
    def handle_exception(self, func):
        """함수 데코레이터로 예외 처리"""
        
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
                
            except Exception as e:
                self.handled_count += 1
                
                # 컨텍스트 정보 수집
                context = {
                    'function_name': func.__name__,
                    'function_module': func.__module__,
                    'args_count': len(args),
                    'kwargs_keys': list(kwargs.keys()),
                    'handled_count': self.handled_count
                }
                
                # 예외 패턴 추적
                pattern_key = f"{type(e).__name__}:{func.__name__}"
                self.error_patterns[pattern_key] = self.error_patterns.get(pattern_key, 0) + 1
                
                # 로깅
                self.exception_logger.log_exception(
                    e, 
                    context=context,
                    extra_data={'error_patterns': self.error_patterns}
                )
                
                # 예외 재발생 (로깅 후)
                raise
        
        return wrapper
    
    def get_error_statistics(self):
        """오류 통계 반환"""
        return {
            'total_handled': self.handled_count,
            'unique_patterns': len(self.error_patterns),
            'pattern_distribution': self.error_patterns,
            'most_common_pattern': max(self.error_patterns.items(), key=lambda x: x[1]) if self.error_patterns else None
        }

def demonstrate_exception_logging():
    """예외 로깅 시연"""
    
    print("12. 예외 로깅 시스템:")
    
    handler = LoggingExceptionHandler("demo_logger")
    
    @handler.handle_exception
    def unreliable_service(success_rate=0.5):
        """불안정한 서비스 시뮬레이션"""
        import random
        
        # 실행 시간 시뮬레이션
        time.sleep(random.uniform(0.01, 0.05))
        
        if random.random() > success_rate:
            raise ConnectionError("서비스 일시적 오류")
        
        return "서비스 성공"
    
    @handler.handle_exception
    def slow_operation(delay_factor=1):
        """느린 작업 시뮬레이션"""
        time.sleep(0.01 * delay_factor)
        return f"작업 완료 (지연 계수: {delay_factor})"
    
    # 테스트 실행
    print("   서비스 호출 테스트:")
    
    for i in range(10):
        try:
            result = unreliable_service(success_rate=0.3)  # 높은 실패율
            print(f"     호출 {i+1}: 성공")
        except Exception as e:
            print(f"     호출 {i+1}: 실패 - {type(e).__name__}")
    
    # 통계 출력
    stats = handler.get_error_statistics()
    print(f"\n   예외 통계:")
    print(f"     총 처리 수: {stats['total_handled']}")
    print(f"     고유 패턴 수: {stats['unique_patterns']}")
    
    print(f"\n   함수별 통계:")
    for func_name, stats in stats['function_stats'].items():
        print(f"     {func_name}:")
        print(f"       호출 수: {stats['call_count']}")
        print(f"       평균 실행 시간: {stats['avg_time']:.4f}초")
        print(f"       예외 수: {stats['exception_count']}")

demonstrate_exception_logging()
```

### 4.2 성능 모니터링과 예외 추적

```python
print("\n=== 성능 모니터링과 예외 추적 ===")

import time
from functools import wraps
from collections import defaultdict, deque
from threading import Lock

class PerformanceMonitor:
    """성능 모니터링 시스템"""
    
    def __init__(self, max_history=1000):
        self.max_history = max_history
        self.call_history = deque(maxlen=max_history)
        self.exception_history = deque(maxlen=max_history)
        self.function_stats = defaultdict(lambda: {
            'call_count': 0,
            'total_time': 0,
            'exception_count': 0,
            'last_exception': None,
            'avg_time': 0
        })
        self.lock = Lock()
    
    def monitor(self, func):
        """성능 모니터링 데코레이터"""
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            func_name = f"{func.__module__}.{func.__name__}"
            start_time = time.time()
            
            try:
                result = func(*args, **kwargs)
                success = True
                exception = None
                
            except Exception as e:
                success = False
                exception = e
                result = None
                
                # 예외 정보 기록
                with self.lock:
                    self.exception_history.append({
                        'timestamp': time.time(),
                        'function': func_name,
                        'exception_type': type(e).__name__,
                        'exception_message': str(e),
                        'args_count': len(args),
                        'kwargs_keys': list(kwargs.keys())
                    })
                
                raise
            
            finally:
                end_time = time.time()
                execution_time = end_time - start_time
                
                # 성능 통계 업데이트
                with self.lock:
                    stats = self.function_stats[func_name]
                    stats['call_count'] += 1
                    stats['total_time'] += execution_time
                    stats['avg_time'] = stats['total_time'] / stats['call_count']
                    
                    if not success:
                        stats['exception_count'] += 1
                        stats['last_exception'] = {
                            'type': type(exception).__name__,
                            'message': str(exception),
                            'timestamp': end_time
                        }
                    
                    # 호출 기록
                    self.call_history.append({
                        'timestamp': end_time,
                        'function': func_name,
                        'execution_time': execution_time,
                        'success': success,
                        'args_count': len(args),
                        'kwargs_count': len(kwargs)
                    })
            
            return result
        
        return wrapper
    
    def get_performance_report(self):
        """성능 리포트 생성"""
        
        with self.lock:
            report = {
                'summary': {
                    'total_calls': len(self.call_history),
                    'total_exceptions': len(self.exception_history),
                    'monitored_functions': len(self.function_stats)
                },
                'function_stats': dict(self.function_stats),
                'recent_exceptions': list(self.exception_history)[-5:],  # 최근 5개
                'slowest_calls': []
            }
            
            # 가장 느린 호출들
            sorted_calls = sorted(
                self.call_history, 
                key=lambda x: x['execution_time'], 
                reverse=True
            )
            report['slowest_calls'] = sorted_calls[:5]
            
            return report
    
    def get_exception_patterns(self):
        """예외 패턴 분석"""
        
        patterns = defaultdict(int)
        function_exceptions = defaultdict(int)
        
        with self.lock:
            for exc_record in self.exception_history:
                patterns[exc_record['exception_type']] += 1
                function_exceptions[exc_record['function']] += 1
        
        return {
            'exception_types': dict(patterns),
            'function_exceptions': dict(function_exceptions)
        }

class CircuitBreaker:
    """서킷 브레이커 패턴 구현"""
    
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
    
    def __call__(self, func):
        """서킷 브레이커 데코레이터"""
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            if self.state == 'OPEN':
                if time.time() - self.last_failure_time > self.timeout:
                    self.state = 'HALF_OPEN'
                    print(f"     서킷 브레이커 HALF_OPEN: {func.__name__}")
                else:
                    raise RuntimeError(f"서킷 브레이커 OPEN: {func.__name__}")
            
            try:
                result = func(*args, **kwargs)
                
                # 성공 시 리셋
                if self.state == 'HALF_OPEN':
                    self.state = 'CLOSED'
                    self.failure_count = 0
                    print(f"     서킷 브레이커 CLOSED: {func.__name__}")
                
                return result
                
            except Exception as e:
                self.failure_count += 1
                self.last_failure_time = time.time()
                
                if self.failure_count >= self.failure_threshold:
                    self.state = 'OPEN'
                    print(f"     서킷 브레이커 OPEN: {func.__name__} (실패 {self.failure_count}회)")
                
                raise
        
        return wrapper

def demonstrate_performance_monitoring():
    """성능 모니터링 시연"""
    
    print("13. 성능 모니터링과 예외 추적:")
    
    monitor = PerformanceMonitor(max_history=100)
    circuit_breaker = CircuitBreaker(failure_threshold=3, timeout=5)
    
    @monitor.monitor
    @circuit_breaker
    def unreliable_service(success_rate=0.5):
        """불안정한 서비스 시뮬레이션"""
        import random
        
        # 실행 시간 시뮬레이션
        time.sleep(random.uniform(0.01, 0.05))
        
        if random.random() > success_rate:
            raise ConnectionError("서비스 일시적 오류")
        
        return "서비스 성공"
    
    @monitor.monitor
    def slow_operation(delay_factor=1):
        """느린 작업 시뮬레이션"""
        time.sleep(0.01 * delay_factor)
        return f"작업 완료 (지연 계수: {delay_factor})"
    
    # 테스트 실행
    print("   서비스 호출 테스트:")
    
    for i in range(10):
        try:
            result = unreliable_service(success_rate=0.3)  # 높은 실패율
            print(f"     호출 {i+1}: 성공")
        except Exception as e:
            print(f"     호출 {i+1}: 실패 - {type(e).__name__}")
    
    # 통계 출력
    report = monitor.get_performance_report()
    print(f"\n   성능 리포트:")
    print(f"     총 호출 수: {report['summary']['total_calls']}")
    print(f"     총 예외 수: {report['summary']['total_exceptions']}")
    
    print(f"\n   함수별 통계:")
    for func_name, stats in report['function_stats'].items():
        print(f"     {func_name}:")
        print(f"       호출 수: {stats['call_count']}")
        print(f"       평균 실행 시간: {stats['avg_time']:.4f}초")
        print(f"       예외 수: {stats['exception_count']}")

demonstrate_performance_monitoring()
```

## 5. 연습 문제

### 연습 1: 견고한 파일 처리 시스템
파일 I/O 작업에 대한 포괄적인 예외 처리 시스템을 구현하세요:
- 다양한 파일 관련 예외 처리
- 자동 백업 및 복구 기능
- 트랜잭션 기반 파일 업데이트
- 동시 접근 제어

### 연습 2: API 클라이언트 예외 처리
외부 API 호출을 위한 견고한 클라이언트를 구현하세요:
- 네트워크 예외 처리 및 재시도
- 서킷 브레이커 패턴 적용
- 응답 검증 및 오류 변환
- 비동기 호출 지원

### 연습 3: 데이터 검증 프레임워크
커스텀 예외를 활용한 데이터 검증 프레임워크를 구현하세요:
- 필드별 검증 규칙 정의
- 계층적 예외 구조
- 다국어 오류 메시지 지원
- 검증 결과 리포팅

### 연습 4: 로그 분석 시스템
예외 로그를 분석하고 패턴을 찾는 시스템을 구현하세요:
- 로그 파싱 및 구조화
- 예외 패턴 탐지
- 알림 시스템 연동
- 대시보드 데이터 생성

## 정리

이 챕터에서 학습한 내용:

1. **예외 계층 구조**: Python의 예외 상속 체계와 적절한 예외 선택
2. **커스텀 예외**: 애플리케이션별 예외 클래스 설계와 구현
3. **예외 체이닝**: 원인과 컨텍스트를 유지하는 예외 처리
4. **컨텍스트 매니저**: 리소스 관리와 예외 안전성
5. **로깅 통합**: 예외 정보의 체계적 기록과 분석
6. **성능 모니터링**: 예외가 성능에 미치는 영향 추적
7. **고급 패턴**: 서킷 브레이커, 재시도, 다중 리소스 관리

다음 챕터에서는 GUI 프로그래밍 기초에 대해 학습하여 사용자 인터페이스 개발 방법을 배우겠습니다.

### 핵심 포인트
- 예외는 프로그램의 흐름을 나타내는 중요한 정보입니다
- 적절한 추상화 수준에서 예외를 처리하세요
- 리소스는 항상 안전하게 관리되어야 합니다
- 로깅과 모니터링을 통해 시스템 상태를 파악하세요
- 사용자 친화적인 오류 메시지를 제공하세요
- 성능과 견고성의 균형을 맞추세요 