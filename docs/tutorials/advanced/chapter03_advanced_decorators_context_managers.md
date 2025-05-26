# Chapter 3: 고급 데코레이터와 컨텍스트 매니저

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 클래스 기반 데코레이터를 설계하고 구현하기
- 매개변수가 있는 데코레이터, functools.wraps, 컨텍스트 매니저 고급 활용, contextlib 모듈, 중첩 컨텍스트 매니저 등을 다룹니다.

## 1. 클래스 기반 데코레이터

### 1.1 기본 클래스 데코레이터

```python
print("=== 클래스 기반 데코레이터 ===")

class CallCounter:
    """함수 호출 횟수를 추적하는 클래스 데코레이터"""
    
    def __init__(self, func):
        self.func = func
        self.count = 0
        self.call_history = []
        # 원본 함수의 메타데이터 보존
        self.__name__ = func.__name__
        self.__doc__ = func.__doc__
        self.__dict__.update(func.__dict__)
    
    def __call__(self, *args, **kwargs):
        """데코레이터가 적용된 함수가 호출될 때 실행"""
        self.count += 1
        
        # 호출 정보 기록
        import time
        call_info = {
            'call_number': self.count,
            'timestamp': time.time(),
            'args': args,
            'kwargs': kwargs
        }
        self.call_history.append(call_info)
        
        print(f"   함수 '{self.func.__name__}' 호출됨 (총 {self.count}회)")
        
        # 원본 함수 실행
        result = self.func(*args, **kwargs)
        
        # 결과 기록
        call_info['result'] = result
        call_info['execution_time'] = time.time() - call_info['timestamp']
        
        return result
    
    def get_stats(self):
        """호출 통계 반환"""
        return {
            'total_calls': self.count,
            'average_execution_time': sum(call['execution_time'] 
                                        for call in self.call_history) / len(self.call_history) 
                                        if self.call_history else 0,
            'call_history': self.call_history.copy()
        }
    
    def reset_stats(self):
        """통계 초기화"""
        self.count = 0
        self.call_history.clear()

class TimingDecorator:
    """실행 시간을 측정하는 고급 클래스 데코레이터"""
    
    def __init__(self, precision=4, unit='seconds'):
        self.precision = precision
        self.unit = unit
        self.total_time = 0
        self.call_count = 0
        self.min_time = float('inf')
        self.max_time = 0
    
    def __call__(self, func):
        """실제 데코레이터 적용"""
        import functools
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            import time
            
            start_time = time.perf_counter()
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                end_time = time.perf_counter()
                execution_time = end_time - start_time
                
                # 통계 업데이트
                self.total_time += execution_time
                self.call_count += 1
                self.min_time = min(self.min_time, execution_time)
                self.max_time = max(self.max_time, execution_time)
                
                # 시간 단위 변환
                if self.unit == 'milliseconds':
                    display_time = execution_time * 1000
                    unit_symbol = 'ms'
                elif self.unit == 'microseconds':
                    display_time = execution_time * 1000000
                    unit_symbol = 'μs'
                else:
                    display_time = execution_time
                    unit_symbol = 's'
                
                print(f"   {func.__name__}: {display_time:.{self.precision}f}{unit_symbol}")
        
        # 통계 메서드 추가
        wrapper.get_timing_stats = self.get_timing_stats
        wrapper.reset_timing_stats = self.reset_timing_stats
        
        return wrapper
    
    def get_timing_stats(self):
        """타이밍 통계 반환"""
        if self.call_count == 0:
            return {'no_calls': True}
        
        return {
            'total_calls': self.call_count,
            'total_time': self.total_time,
            'average_time': self.total_time / self.call_count,
            'min_time': self.min_time if self.min_time != float('inf') else 0,
            'max_time': self.max_time,
            'unit': self.unit
        }
    
    def reset_timing_stats(self):
        """타이밍 통계 초기화"""
        self.total_time = 0
        self.call_count = 0
        self.min_time = float('inf')
        self.max_time = 0

class RetryDecorator:
    """재시도 로직을 구현하는 클래스 데코레이터"""
    
    def __init__(self, max_attempts=3, delay=1.0, backoff_factor=2.0, 
                 exceptions=(Exception,)):
        self.max_attempts = max_attempts
        self.delay = delay
        self.backoff_factor = backoff_factor
        self.exceptions = exceptions
        self.attempt_history = []
    
    def __call__(self, func):
        import functools
        import time
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            current_delay = self.delay
            
            for attempt in range(1, self.max_attempts + 1):
                try:
                    start_time = time.time()
                    result = func(*args, **kwargs)
                    
                    # 성공 기록
                    self.attempt_history.append({
                        'attempt': attempt,
                        'success': True,
                        'execution_time': time.time() - start_time,
                        'timestamp': time.time()
                    })
                    
                    if attempt > 1:
                        print(f"   {func.__name__}: {attempt}번째 시도에서 성공")
                    
                    return result
                    
                except self.exceptions as e:
                    # 실패 기록
                    self.attempt_history.append({
                        'attempt': attempt,
                        'success': False,
                        'error': str(e),
                        'error_type': type(e).__name__,
                        'timestamp': time.time()
                    })
                    
                    if attempt == self.max_attempts:
                        print(f"   {func.__name__}: 모든 시도 실패 ({self.max_attempts}회)")
                        raise
                    else:
                        print(f"   {func.__name__}: {attempt}번째 시도 실패, {current_delay}초 후 재시도...")
                        time.sleep(current_delay)
                        current_delay *= self.backoff_factor
        
        # 통계 메서드 추가
        wrapper.get_retry_stats = lambda: self.get_retry_stats()
        wrapper.reset_retry_stats = lambda: self.reset_retry_stats()
        
        return wrapper
    
    def get_retry_stats(self):
        """재시도 통계 반환"""
        if not self.attempt_history:
            return {'no_attempts': True}
        
        total_attempts = len(self.attempt_history)
        successful_calls = len([h for h in self.attempt_history if h['success']])
        failed_calls = total_attempts - successful_calls
        
        return {
            'total_attempts': total_attempts,
            'successful_calls': successful_calls,
            'failed_calls': failed_calls,
            'success_rate': successful_calls / total_attempts * 100,
            'attempt_history': self.attempt_history.copy()
        }
    
    def reset_retry_stats(self):
        """재시도 통계 초기화"""
        self.attempt_history.clear()

def demonstrate_class_decorators():
    """클래스 기반 데코레이터 시연"""
    print("\n1. 호출 카운터 데코레이터:")
    
    @CallCounter
    def fibonacci(n):
        """피보나치 수 계산"""
        if n <= 1:
            return n
        return fibonacci(n-1) + fibonacci(n-2)
    
    # 함수 호출
    result = fibonacci(5)
    print(f"   fibonacci(5) = {result}")
    
    # 통계 확인
    stats = fibonacci.get_stats()
    print(f"   총 호출 횟수: {stats['total_calls']}")
    print(f"   평균 실행 시간: {stats['average_execution_time']:.6f}초")
    
    print("\n2. 타이밍 데코레이터:")
    
    @TimingDecorator(precision=2, unit='milliseconds')
    def matrix_multiply(size):
        """매트릭스 곱셈 시뮬레이션"""
        import random
        matrix_a = [[random.random() for _ in range(size)] for _ in range(size)]
        matrix_b = [[random.random() for _ in range(size)] for _ in range(size)]
        
        result = [[0 for _ in range(size)] for _ in range(size)]
        for i in range(size):
            for j in range(size):
                for k in range(size):
                    result[i][j] += matrix_a[i][k] * matrix_b[k][j]
        
        return result
    
    # 여러 번 실행
    for size in [10, 20, 30]:
        matrix_multiply(size)
    
    # 타이밍 통계 확인
    timing_stats = matrix_multiply.get_timing_stats()
    print(f"   평균 실행 시간: {timing_stats['average_time']*1000:.2f}ms")
    print(f"   최소/최대 시간: {timing_stats['min_time']*1000:.2f}ms / {timing_stats['max_time']*1000:.2f}ms")
    
    print("\n3. 재시도 데코레이터:")
    
    @RetryDecorator(max_attempts=3, delay=0.1, exceptions=(ValueError, RuntimeError))
    def unreliable_function(success_rate=0.3):
        """때때로 실패하는 함수"""
        import random
        if random.random() < success_rate:
            return "성공!"
        else:
            raise ValueError("랜덤 실패")
    
    try:
        result = unreliable_function(0.6)
        print(f"   결과: {result}")
    except ValueError as e:
        print(f"   최종 실패: {e}")
    
    # 재시도 통계 확인
    retry_stats = unreliable_function.get_retry_stats()
    print(f"   성공률: {retry_stats['success_rate']:.1f}%")

demonstrate_class_decorators()
```

### 1.2 매개변수가 있는 클래스 데코레이터

```python
print("\n=== 매개변수가 있는 클래스 데코레이터 ===")

class CacheDecorator:
    """캐싱 기능을 제공하는 고급 데코레이터"""
    
    def __init__(self, max_size=128, ttl=None, cache_key_func=None):
        self.max_size = max_size
        self.ttl = ttl  # Time To Live (초)
        self.cache_key_func = cache_key_func or self._default_key_func
        self.cache = {}
        self.access_order = []  # LRU 구현용
        self.access_times = {}  # TTL 구현용
        self.hit_count = 0
        self.miss_count = 0
    
    def _default_key_func(self, func, args, kwargs):
        """기본 캐시 키 생성 함수"""
        return f"{func.__name__}:{hash((args, tuple(sorted(kwargs.items()))))}"
    
    def _is_expired(self, key):
        """캐시 항목이 만료되었는지 확인"""
        if self.ttl is None:
            return False
        
        import time
        access_time = self.access_times.get(key)
        return access_time is None or (time.time() - access_time) > self.ttl
    
    def _evict_lru(self):
        """LRU 정책에 따라 가장 오래된 항목 제거"""
        if self.access_order:
            oldest_key = self.access_order.pop(0)
            self.cache.pop(oldest_key, None)
            self.access_times.pop(oldest_key, None)
    
    def _update_access(self, key):
        """접근 순서 업데이트"""
        import time
        
        if key in self.access_order:
            self.access_order.remove(key)
        self.access_order.append(key)
        self.access_times[key] = time.time()
    
    def __call__(self, func):
        import functools
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 캐시 키 생성
            cache_key = self.cache_key_func(func, args, kwargs)
            
            # 캐시 만료 확인
            if cache_key in self.cache and self._is_expired(cache_key):
                self.cache.pop(cache_key, None)
                self.access_times.pop(cache_key, None)
                if cache_key in self.access_order:
                    self.access_order.remove(cache_key)
            
            # 캐시 히트 확인
            if cache_key in self.cache:
                self.hit_count += 1
                self._update_access(cache_key)
                print(f"   캐시 히트: {func.__name__}")
                return self.cache[cache_key]
            
            # 캐시 미스 - 함수 실행
            self.miss_count += 1
            print(f"   캐시 미스: {func.__name__}")
            result = func(*args, **kwargs)
            
            # 캐시 크기 제한 확인
            if len(self.cache) >= self.max_size:
                self._evict_lru()
            
            # 결과 캐시
            self.cache[cache_key] = result
            self._update_access(cache_key)
            
            return result
        
        # 캐시 관리 메서드 추가
        wrapper.cache_info = lambda: self.get_cache_info()
        wrapper.cache_clear = lambda: self.clear_cache()
        wrapper.cache_size = lambda: len(self.cache)
        
        return wrapper
    
    def get_cache_info(self):
        """캐시 정보 반환"""
        total_calls = self.hit_count + self.miss_count
        hit_rate = (self.hit_count / total_calls * 100) if total_calls > 0 else 0
        
        return {
            'hits': self.hit_count,
            'misses': self.miss_count,
            'hit_rate': hit_rate,
            'current_size': len(self.cache),
            'max_size': self.max_size,
            'ttl': self.ttl
        }
    
    def clear_cache(self):
        """캐시 초기화"""
        self.cache.clear()
        self.access_order.clear()
        self.access_times.clear()
        self.hit_count = 0
        self.miss_count = 0

class ValidationDecorator:
    """입력 검증 데코레이터"""
    
    def __init__(self, **validators):
        self.validators = validators
        self.validation_history = []
    
    def __call__(self, func):
        import functools
        import inspect
        
        # 함수 시그니처 분석
        sig = inspect.signature(func)
        param_names = list(sig.parameters.keys())
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            import time
            
            # 위치 인수를 키워드 인수로 변환
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()
            
            validation_results = []
            
            # 각 매개변수 검증
            for param_name, validator in self.validators.items():
                if param_name in bound_args.arguments:
                    value = bound_args.arguments[param_name]
                    
                    try:
                        if callable(validator):
                            is_valid = validator(value)
                            error_msg = None
                        else:
                            # 딕셔너리 형태의 검증 규칙
                            is_valid = True
                            error_msg = None
                            
                            if 'type' in validator:
                                if not isinstance(value, validator['type']):
                                    is_valid = False
                                    error_msg = f"Expected {validator['type'].__name__}, got {type(value).__name__}"
                            
                            if is_valid and 'min' in validator:
                                if value < validator['min']:
                                    is_valid = False
                                    error_msg = f"Value {value} is less than minimum {validator['min']}"
                            
                            if is_valid and 'max' in validator:
                                if value > validator['max']:
                                    is_valid = False
                                    error_msg = f"Value {value} exceeds maximum {validator['max']}"
                            
                            if is_valid and 'pattern' in validator:
                                import re
                                if not re.match(validator['pattern'], str(value)):
                                    is_valid = False
                                    error_msg = f"Value {value} doesn't match pattern {validator['pattern']}"
                        
                        validation_results.append({
                            'param': param_name,
                            'value': value,
                            'valid': is_valid,
                            'error': error_msg
                        })
                        
                        if not is_valid:
                            error_message = error_msg or f"Validation failed for parameter '{param_name}'"
                            self.validation_history.append({
                                'timestamp': time.time(),
                                'function': func.__name__,
                                'param': param_name,
                                'value': value,
                                'error': error_message
                            })
                            raise ValueError(error_message)
                    
                    except Exception as e:
                        validation_results.append({
                            'param': param_name,
                            'value': value,
                            'valid': False,
                            'error': str(e)
                        })
                        raise
            
            # 모든 검증 통과 시 함수 실행
            return func(*args, **kwargs)
        
        # 검증 통계 메서드 추가
        wrapper.get_validation_history = lambda: self.validation_history.copy()
        wrapper.clear_validation_history = lambda: self.validation_history.clear()
        
        return wrapper

class RateLimitDecorator:
    """API 호출 제한 데코레이터"""
    
    def __init__(self, max_calls=100, time_window=60, per_user=False):
        self.max_calls = max_calls
        self.time_window = time_window  # 초 단위
        self.per_user = per_user
        self.call_history = {} if per_user else []
        self.blocked_calls = 0
    
    def _get_user_key(self, args, kwargs):
        """사용자 식별키 생성"""
        if 'user_id' in kwargs:
            return kwargs['user_id']
        elif args and hasattr(args[0], 'user_id'):
            return args[0].user_id
        else:
            return 'default'
    
    def _clean_old_calls(self, call_list, current_time):
        """시간 윈도우 밖의 오래된 호출 기록 제거"""
        cutoff_time = current_time - self.time_window
        return [call_time for call_time in call_list if call_time > cutoff_time]
    
    def __call__(self, func):
        import functools
        import time
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            current_time = time.time()
            
            if self.per_user:
                user_key = self._get_user_key(args, kwargs)
                
                if user_key not in self.call_history:
                    self.call_history[user_key] = []
                
                # 사용자별 호출 기록 정리
                self.call_history[user_key] = self._clean_old_calls(
                    self.call_history[user_key], current_time
                )
                
                user_calls = self.call_history[user_key]
                
                if len(user_calls) >= self.max_calls:
                    self.blocked_calls += 1
                    remaining_time = self.time_window - (current_time - user_calls[0])
                    raise RuntimeError(
                        f"Rate limit exceeded for user {user_key}. "
                        f"Try again in {remaining_time:.1f} seconds"
                    )
                
                # 호출 기록 추가
                user_calls.append(current_time)
            else:
                # 전역 호출 제한
                self.call_history = self._clean_old_calls(self.call_history, current_time)
                
                if len(self.call_history) >= self.max_calls:
                    self.blocked_calls += 1
                    remaining_time = self.time_window - (current_time - self.call_history[0])
                    raise RuntimeError(
                        f"Global rate limit exceeded. "
                        f"Try again in {remaining_time:.1f} seconds"
                    )
                
                # 호출 기록 추가
                self.call_history.append(current_time)
            
            print(f"   API 호출 허용: {func.__name__}")
            return func(*args, **kwargs)
        
        # 제한 정보 메서드 추가
        wrapper.get_rate_limit_info = lambda: self.get_rate_limit_info()
        wrapper.reset_rate_limit = lambda: self.reset_rate_limit()
        
        return wrapper
    
    def get_rate_limit_info(self):
        """제한 정보 반환"""
        if self.per_user:
            total_calls = sum(len(calls) for calls in self.call_history.values())
            return {
                'max_calls': self.max_calls,
                'time_window': self.time_window,
                'per_user': True,
                'current_users': len(self.call_history),
                'total_active_calls': total_calls,
                'blocked_calls': self.blocked_calls
            }
        else:
            return {
                'max_calls': self.max_calls,
                'time_window': self.time_window,
                'per_user': False,
                'current_calls': len(self.call_history),
                'blocked_calls': self.blocked_calls
            }
    
    def reset_rate_limit(self):
        """제한 초기화"""
        if self.per_user:
            self.call_history.clear()
        else:
            self.call_history.clear()
        self.blocked_calls = 0

def demonstrate_parametrized_decorators():
    """매개변수가 있는 데코레이터 시연"""
    print("\n1. 고급 캐시 데코레이터:")
    
    @CacheDecorator(max_size=5, ttl=2)
    def expensive_calculation(x, y):
        """시간이 오래 걸리는 계산"""
        import time
        time.sleep(0.1)  # 시뮬레이션
        return x ** y
    
    # 캐시 테스트
    print(f"   계산 결과: {expensive_calculation(2, 10)}")
    print(f"   계산 결과: {expensive_calculation(2, 10)}")  # 캐시 히트
    print(f"   계산 결과: {expensive_calculation(3, 5)}")
    
    cache_info = expensive_calculation.cache_info()
    print(f"   캐시 히트율: {cache_info['hit_rate']:.1f}%")
    
    print("\n2. 검증 데코레이터:")
    
    @ValidationDecorator(
        age={'type': int, 'min': 0, 'max': 150},
        name={'type': str, 'pattern': r'^[A-Za-z\s]+$'},
        email=lambda x: '@' in x and '.' in x
    )
    def register_user(name, age, email):
        """사용자 등록"""
        return f"사용자 등록: {name} ({age}세, {email})"
    
    try:
        result = register_user("Alice Smith", 25, "alice@example.com")
        print(f"   성공: {result}")
        
        result = register_user("Bob123", 30, "bob@example.com")  # 이름 검증 실패
    except ValueError as e:
        print(f"   검증 실패: {e}")
    
    print("\n3. 호출 제한 데코레이터:")
    
    @RateLimitDecorator(max_calls=3, time_window=5)
    def api_call(data):
        """API 호출 시뮬레이션"""
        return f"API 응답: {data}"
    
    # 호출 제한 테스트
    try:
        for i in range(5):
            result = api_call(f"request_{i}")
            print(f"   {result}")
    except RuntimeError as e:
        print(f"   제한 초과: {e}")
    
    limit_info = api_call.get_rate_limit_info()
    print(f"   현재 호출 수: {limit_info['current_calls']}/{limit_info['max_calls']}")

demonstrate_parametrized_decorators()
```

## 2. functools.wraps와 메타데이터 보존

### 2.1 메타데이터 보존의 중요성

```python
print("\n=== functools.wraps와 메타데이터 보존 ===")

import functools
import inspect

def without_wraps(func):
    """wraps를 사용하지 않는 데코레이터"""
    def wrapper(*args, **kwargs):
        print(f"   호출: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def with_wraps(func):
    """wraps를 사용하는 데코레이터"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"   호출: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

class MetadataPreservingDecorator:
    """메타데이터를 완전히 보존하는 고급 데코레이터"""
    
    def __init__(self, preserve_signature=True, preserve_annotations=True):
        self.preserve_signature = preserve_signature
        self.preserve_annotations = preserve_annotations
        self.call_count = 0
    
    def __call__(self, func):
        if self.preserve_signature:
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                self.call_count += 1
                print(f"   고급 데코레이터: {func.__name__} (호출 #{self.call_count})")
                
                # 인수 검증 (시그니처 보존 시)
                sig = inspect.signature(func)
                try:
                    bound_args = sig.bind(*args, **kwargs)
                    bound_args.apply_defaults()
                    print(f"     인수: {dict(bound_args.arguments)}")
                except TypeError as e:
                    print(f"     인수 오류: {e}")
                    raise
                
                return func(*args, **kwargs)
            
            # 추가 메타데이터 보존
            if self.preserve_annotations:
                wrapper.__annotations__ = getattr(func, '__annotations__', {})
            
            # 커스텀 속성 보존
            for attr in ['__module__', '__qualname__', '__dict__']:
                if hasattr(func, attr):
                    try:
                        setattr(wrapper, attr, getattr(func, attr))
                    except (AttributeError, TypeError):
                        pass
            
            # 시그니처 보존
            wrapper.__signature__ = inspect.signature(func)
            
            return wrapper
        else:
            # 시그니처 보존하지 않는 버전
            def simple_wrapper(*args, **kwargs):
                self.call_count += 1
                print(f"   단순 데코레이터: {func.__name__} (호출 #{self.call_count})")
                return func(*args, **kwargs)
            
            return simple_wrapper

def demonstrate_metadata_preservation():
    """메타데이터 보존 시연"""
    print("\n1. wraps 없이 데코레이팅:")
    
    @without_wraps
    def original_function(x: int, y: str = "default") -> str:
        """원본 함수의 독스트링"""
        return f"{y}: {x}"
    
    print(f"   함수명: {original_function.__name__}")
    print(f"   독스트링: {original_function.__doc__}")
    print(f"   모듈: {original_function.__module__}")
    
    print("\n2. wraps 사용:")
    
    @with_wraps
    def preserved_function(x: int, y: str = "default") -> str:
        """보존된 함수의 독스트링"""
        return f"{y}: {x}"
    
    print(f"   함수명: {preserved_function.__name__}")
    print(f"   독스트링: {preserved_function.__doc__}")
    print(f"   어노테이션: {preserved_function.__annotations__}")
    
    print("\n3. 고급 메타데이터 보존:")
    
    @MetadataPreservingDecorator(preserve_signature=True, preserve_annotations=True)
    def advanced_function(x: int, y: str = "default", *, z: bool = False) -> dict:
        """고급 함수의 독스트링
        
        Args:
            x: 정수 매개변수
            y: 문자열 매개변수
            z: 불린 키워드 전용 매개변수
            
        Returns:
            결과 딕셔너리
        """
        return {"x": x, "y": y, "z": z}
    
    print(f"   함수명: {advanced_function.__name__}")
    print(f"   시그니처: {inspect.signature(advanced_function)}")
    print(f"   어노테이션: {advanced_function.__annotations__}")
    
    # 함수 호출 테스트
    result = advanced_function(42, "test", z=True)
    print(f"   호출 결과: {result}")
    
    # 잘못된 인수로 호출 시도
    try:
        advanced_function("wrong_type")
    except TypeError as e:
        print(f"   타입 오류 정상 감지: {e}")

demonstrate_metadata_preservation()
```

### 2.2 고급 메타데이터 조작

```python
print("\n=== 고급 메타데이터 조작 ===")

class SignatureModifyingDecorator:
    """함수 시그니처를 수정하는 데코레이터"""
    
    def __init__(self, add_params=None, remove_params=None, modify_return=None):
        self.add_params = add_params or {}
        self.remove_params = remove_params or []
        self.modify_return = modify_return
    
    def __call__(self, func):
        import inspect
        
        # 원본 시그니처 분석
        original_sig = inspect.signature(func)
        
        # 새로운 매개변수 리스트 생성
        new_params = []
        
        # 기존 매개변수 처리
        for name, param in original_sig.parameters.items():
            if name not in self.remove_params:
                new_params.append(param)
        
        # 새로운 매개변수 추가
        for name, param_info in self.add_params.items():
            param = inspect.Parameter(
                name=name,
                kind=param_info.get('kind', inspect.Parameter.POSITIONAL_OR_KEYWORD),
                default=param_info.get('default', inspect.Parameter.empty),
                annotation=param_info.get('annotation', inspect.Parameter.empty)
            )
            new_params.append(param)
        
        # 반환 타입 수정
        return_annotation = self.modify_return or original_sig.return_annotation
        
        # 새로운 시그니처 생성
        new_signature = inspect.Signature(
            parameters=new_params,
            return_annotation=return_annotation
        )
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 추가된 매개변수 처리
            processed_kwargs = kwargs.copy()
            for param_name in self.add_params:
                if param_name in processed_kwargs:
                    value = processed_kwargs.pop(param_name)
                    print(f"   추가 매개변수 처리: {param_name} = {value}")
            
            # 제거된 매개변수가 전달되면 경고
            for param_name in self.remove_params:
                if param_name in processed_kwargs:
                    print(f"   경고: 제거된 매개변수 무시됨: {param_name}")
                    processed_kwargs.pop(param_name)
            
            return func(*args, **processed_kwargs)
        
        # 수정된 시그니처 적용
        wrapper.__signature__ = new_signature
        
        return wrapper

class DocstringModifyingDecorator:
    """독스트링을 수정하는 데코레이터"""
    
    def __init__(self, append_text=None, prepend_text=None, replace_text=None):
        self.append_text = append_text
        self.prepend_text = prepend_text
        self.replace_text = replace_text
    
    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        
        # 독스트링 수정
        original_doc = func.__doc__ or ""
        
        if self.replace_text:
            new_doc = self.replace_text
        else:
            new_doc = original_doc
            if self.prepend_text:
                new_doc = self.prepend_text + "\n\n" + new_doc
            if self.append_text:
                new_doc = new_doc + "\n\n" + self.append_text
        
        wrapper.__doc__ = new_doc
        
        return wrapper

class AttributeInjectingDecorator:
    """함수에 추가 속성을 주입하는 데코레이터"""
    
    def __init__(self, **attributes):
        self.attributes = attributes
    
    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 속성 값이 호출 가능하면 실행
            for name, value in self.attributes.items():
                if callable(value):
                    setattr(wrapper, name, value())
                else:
                    setattr(wrapper, name, value)
            
            return func(*args, **kwargs)
        
        # 초기 속성 설정
        for name, value in self.attributes.items():
            if callable(value):
                setattr(wrapper, name, value())
            else:
                setattr(wrapper, name, value)
        
        return wrapper

def demonstrate_advanced_metadata_manipulation():
    """고급 메타데이터 조작 시연"""
    print("\n1. 시그니처 수정 데코레이터:")
    
    @SignatureModifyingDecorator(
        add_params={
            'debug': {'default': False, 'annotation': bool, 'kind': inspect.Parameter.KEYWORD_ONLY},
            'timeout': {'default': 30, 'annotation': int}
        },
        remove_params=['deprecated_param'],
        modify_return=dict
    )
    def api_function(data: str, deprecated_param: int = 0) -> str:
        """API 함수"""
        return f"처리된 데이터: {data}"
    
    print(f"   수정된 시그니처: {inspect.signature(api_function)}")
    
    # 새로운 매개변수로 호출
    result = api_function("test", debug=True, timeout=60)
    print(f"   결과: {result}")
    
    print("\n2. 독스트링 수정 데코레이터:")
    
    @DocstringModifyingDecorator(
        prepend_text="[DEPRECATED] 이 함수는 곧 제거될 예정입니다.",
        append_text="대신 new_function()을 사용하세요."
    )
    def old_function():
        """기존 함수의 독스트링"""
        return "기존 기능"
    
    print(f"   수정된 독스트링:\n{old_function.__doc__}")
    
    print("\n3. 속성 주입 데코레이터:")
    
    @AttributeInjectingDecorator(
        version="1.0.0",
        created_at=lambda: __import__('time').time(),
        call_count=0,
        metadata={"author": "Python Developer", "category": "utility"}
    )
    def utility_function(x):
        """유틸리티 함수"""
        utility_function.call_count += 1
        return x * 2
    
    print(f"   버전: {utility_function.version}")
    print(f"   생성 시간: {utility_function.created_at}")
    print(f"   메타데이터: {utility_function.metadata}")
    
    # 함수 호출
    result = utility_function(5)
    print(f"   결과: {result}, 호출 횟수: {utility_function.call_count}")

demonstrate_advanced_metadata_manipulation()
```

## 3. 컨텍스트 매니저 고급 활용

### 3.1 커스텀 컨텍스트 매니저

```python
print("\n=== 커스텀 컨텍스트 매니저 ===")

class DatabaseTransaction:
    """데이터베이스 트랜잭션 컨텍스트 매니저"""
    
    def __init__(self, connection_string, auto_commit=True):
        self.connection_string = connection_string
        self.auto_commit = auto_commit
        self.connection = None
        self.transaction = None
        self.rollback_occurred = False
        self.start_time = None
        self.operation_count = 0
    
    def __enter__(self):
        """컨텍스트 진입 시 실행"""
        import time
        self.start_time = time.time()
        
        print(f"   데이터베이스 연결 시작: {self.connection_string}")
        
        # 실제로는 데이터베이스 연결을 생성
        self.connection = f"Connection-{id(self)}"
        
        print(f"   트랜잭션 시작: {self.connection}")
        self.transaction = f"Transaction-{id(self)}"
        
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        """컨텍스트 종료 시 실행"""
        import time
        
        try:
            if exc_type is None:
                # 예외가 없으면 커밋
                if self.auto_commit:
                    self.commit()
                else:
                    print(f"   수동 커밋 모드: 트랜잭션 보류 중")
            else:
                # 예외가 발생하면 롤백
                self.rollback()
                print(f"   예외로 인한 롤백: {exc_type.__name__}: {exc_value}")
                
                # 특정 예외는 억제
                if exc_type == ValueError and "ignore" in str(exc_value):
                    print(f"   예외 억제됨")
                    return True  # 예외 억제
        
        finally:
            # 연결 정리
            end_time = time.time()
            duration = end_time - self.start_time
            
            print(f"   데이터베이스 연결 종료")
            print(f"   트랜잭션 지속 시간: {duration:.3f}초")
            print(f"   수행된 작업 수: {self.operation_count}")
            
            self.connection = None
            self.transaction = None
    
    def execute(self, query, params=None):
        """쿼리 실행 시뮬레이션"""
        if not self.connection:
            raise RuntimeError("트랜잭션이 활성화되어 있지 않습니다")
        
        self.operation_count += 1
        print(f"     쿼리 실행: {query}")
        if params:
            print(f"     매개변수: {params}")
        
        return f"Result-{self.operation_count}"
    
    def commit(self):
        """트랜잭션 커밋"""
        if self.transaction:
            print(f"   트랜잭션 커밋: {self.transaction}")
    
    def rollback(self):
        """트랜잭션 롤백"""
        if self.transaction:
            print(f"   트랜잭션 롤백: {self.transaction}")
            self.rollback_occurred = True

class ResourceManager:
    """리소스 관리 컨텍스트 매니저"""
    
    def __init__(self, resource_name, acquisition_timeout=5):
        self.resource_name = resource_name
        self.acquisition_timeout = acquisition_timeout
        self.resource = None
        self.acquired_at = None
        self.released_at = None
    
    def __enter__(self):
        import time
        import random
        
        print(f"   리소스 획득 시도: {self.resource_name}")
        
        # 리소스 획득 시뮬레이션
        start_time = time.time()
        while time.time() - start_time < self.acquisition_timeout:
            if random.random() > 0.3:  # 70% 확률로 성공
                self.resource = f"Resource-{self.resource_name}-{int(time.time())}"
                self.acquired_at = time.time()
                print(f"   리소스 획득 성공: {self.resource}")
                return self.resource
            
            print(f"   리소스 대기 중...")
            time.sleep(0.1)
        
        raise TimeoutError(f"리소스 획득 타임아웃: {self.resource_name}")
    
    def __exit__(self, exc_type, exc_value, traceback):
        import time
        
        if self.resource:
            self.released_at = time.time()
            usage_duration = self.released_at - self.acquired_at
            
            print(f"   리소스 해제: {self.resource}")
            print(f"   사용 시간: {usage_duration:.3f}초")
            
            self.resource = None

class TimingContext:
    """실행 시간 측정 컨텍스트 매니저"""
    
    def __init__(self, operation_name, enable_profiling=False):
        self.operation_name = operation_name
        self.enable_profiling = enable_profiling
        self.start_time = None
        self.end_time = None
        self.profiler = None
        self.memory_usage = {}
    
    def __enter__(self):
        import time
        
        self.start_time = time.perf_counter()
        print(f"   타이밍 시작: {self.operation_name}")
        
        if self.enable_profiling:
            # 메모리 사용량 모니터링 시작
            import tracemalloc
            tracemalloc.start()
            self.memory_usage['start'] = tracemalloc.get_traced_memory()
            print(f"     메모리 프로파일링 활성화")
        
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        import time
        
        self.end_time = time.perf_counter()
        duration = self.end_time - self.start_time
        
        print(f"   타이밍 완료: {self.operation_name}")
        print(f"   실행 시간: {duration:.6f}초")
        
        if self.enable_profiling:
            import tracemalloc
            self.memory_usage['end'] = tracemalloc.get_traced_memory()
            tracemalloc.stop()
            
            current, peak = self.memory_usage['end']
            start_current, start_peak = self.memory_usage['start']
            
            print(f"   메모리 사용량 변화: {(current - start_current) / 1024:.2f} KB")
            print(f"   최대 메모리 사용량: {peak / 1024:.2f} KB")
    
    def get_duration(self):
        """실행 시간 반환"""
        if self.start_time and self.end_time:
            return self.end_time - self.start_time
        return None

def demonstrate_custom_context_managers():
    """커스텀 컨텍스트 매니저 시연"""
    print("\n1. 데이터베이스 트랜잭션:")
    
    # 정상적인 트랜잭션
    with DatabaseTransaction("postgresql://localhost:5432/mydb") as db:
        db.execute("INSERT INTO users (name) VALUES (?)", ["Alice"])
        db.execute("UPDATE users SET status = ? WHERE name = ?", ["active", "Alice"])
    
    print("\n   예외 발생 시:")
    try:
        with DatabaseTransaction("postgresql://localhost:5432/mydb") as db:
            db.execute("INSERT INTO users (name) VALUES (?)", ["Bob"])
            raise ValueError("데이터 검증 실패")
    except ValueError as e:
        print(f"   처리된 예외: {e}")
    
    print("\n2. 리소스 관리:")
    
    try:
        with ResourceManager("database_connection", acquisition_timeout=1) as resource:
            print(f"   리소스 사용 중: {resource}")
            import time
            time.sleep(0.2)  # 리소스 사용 시뮬레이션
    except TimeoutError as e:
        print(f"   리소스 획득 실패: {e}")
    
    print("\n3. 실행 시간 측정:")
    
    with TimingContext("복잡한 계산", enable_profiling=True) as timer:
        # 복잡한 계산 시뮬레이션
        result = sum(i**2 for i in range(10000))
        data = [i for i in range(1000)]  # 메모리 사용
    
    duration = timer.get_duration()
    print(f"   측정된 시간: {duration:.6f}초")

demonstrate_custom_context_managers()
```

### 3.2 contextlib 모듈 고급 활용

```python
print("\n=== contextlib 모듈 고급 활용 ===")

import contextlib
import functools
from contextlib import contextmanager, ExitStack, suppress, redirect_stdout, redirect_stderr
import io
import sys

@contextmanager
def temporary_directory():
    """임시 디렉토리 컨텍스트 매니저"""
    import tempfile
    import shutil
    import os
    
    temp_dir = tempfile.mkdtemp()
    print(f"   임시 디렉토리 생성: {temp_dir}")
    
    try:
        yield temp_dir
    finally:
        # 정리 작업
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
            print(f"   임시 디렉토리 삭제: {temp_dir}")

@contextmanager
def environment_variable(name, value):
    """환경 변수 임시 설정 컨텍스트 매니저"""
    import os
    
    old_value = os.environ.get(name)
    os.environ[name] = value
    print(f"   환경 변수 설정: {name} = {value}")
    
    try:
        yield
    finally:
        if old_value is None:
            os.environ.pop(name, None)
            print(f"   환경 변수 제거: {name}")
        else:
            os.environ[name] = old_value
            print(f"   환경 변수 복원: {name} = {old_value}")

@contextmanager
def config_override(**config_changes):
    """설정 임시 변경 컨텍스트 매니저"""
    # 가상의 전역 설정 객체
    global_config = {
        'debug': False,
        'timeout': 30,
        'max_retries': 3
    }
    
    # 현재 설정 백업
    backup = global_config.copy()
    print(f"   설정 백업: {backup}")
    
    # 새 설정 적용
    global_config.update(config_changes)
    print(f"   설정 변경: {config_changes}")
    
    try:
        yield global_config
    finally:
        # 설정 복원
        global_config.clear()
        global_config.update(backup)
        print(f"   설정 복원: {backup}")

class ManagedResource:
    """contextlib과 함께 사용할 리소스 클래스"""
    
    def __init__(self, name):
        self.name = name
        self.is_open = False
    
    def open(self):
        """리소스 열기"""
        self.is_open = True
        print(f"     리소스 열림: {self.name}")
        return self
    
    def close(self):
        """리소스 닫기"""
        if self.is_open:
            self.is_open = False
            print(f"     리소스 닫힘: {self.name}")
    
    def read(self):
        """리소스 읽기"""
        if not self.is_open:
            raise RuntimeError(f"리소스가 닫혀있음: {self.name}")
        return f"데이터from-{self.name}"

@contextmanager
def managed_resource(name):
    """리소스를 관리하는 컨텍스트 매니저"""
    resource = ManagedResource(name)
    try:
        yield resource.open()
    finally:
        resource.close()

def demonstrate_contextlib_advanced():
    """contextlib 고급 기능 시연"""
    print("\n1. @contextmanager 데코레이터:")
    
    with temporary_directory() as temp_dir:
        import os
        test_file = os.path.join(temp_dir, "test.txt")
        with open(test_file, 'w') as f:
            f.write("임시 파일 내용")
        print(f"   파일 생성: {test_file}")
    
    print("\n2. 환경 변수 관리:")
    
    import os
    print(f"   현재 DEBUG 값: {os.environ.get('DEBUG', 'None')}")
    
    with environment_variable('DEBUG', 'true'):
        print(f"   컨텍스트 내 DEBUG 값: {os.environ.get('DEBUG')}")
        
        with environment_variable('TEMP_VAR', 'temporary'):
            print(f"   TEMP_VAR 값: {os.environ.get('TEMP_VAR')}")
    
    print(f"   복원된 DEBUG 값: {os.environ.get('DEBUG', 'None')}")
    
    print("\n3. ExitStack 활용:")
    
    with ExitStack() as stack:
        # 여러 컨텍스트 매니저를 동적으로 추가
        resources = []
        
        for i in range(3):
            resource = stack.enter_context(managed_resource(f"resource_{i}"))
            resources.append(resource)
        
        # 조건부 컨텍스트 매니저 추가
        if len(resources) > 2:
            config = stack.enter_context(config_override(debug=True, timeout=60))
            print(f"   조건부 설정: {config}")
        
        # 모든 리소스 사용
        for resource in resources:
            data = resource.read()
            print(f"   읽은 데이터: {data}")
    
    print("\n4. 예외 억제 (suppress):")
    
    with suppress(ValueError, TypeError):
        print("   잠재적 예외 발생 코드 실행")
        raise ValueError("이 예외는 억제됩니다")
        print("   이 라인은 실행되지 않습니다")
    
    print("   예외가 억제되어 계속 실행됩니다")
    
    print("\n5. 출력 리다이렉션:")
    
    # stdout 리다이렉션
    output_buffer = io.StringIO()
    with redirect_stdout(output_buffer):
        print("이 출력은 버퍼로 리다이렉션됩니다")
        print("여러 줄의 출력")
    
    captured_output = output_buffer.getvalue()
    print(f"   캡처된 출력: {repr(captured_output)}")
    
    # stderr 리다이렉션
    error_buffer = io.StringIO()
    with redirect_stderr(error_buffer):
        sys.stderr.write("에러 메시지\n")
        sys.stderr.write("또 다른 에러\n")
    
    captured_errors = error_buffer.getvalue()
    print(f"   캡처된 에러: {repr(captured_errors)}")

demonstrate_contextlib_advanced()
```

## 4. 중첩 컨텍스트 매니저

### 4.1 복합 컨텍스트 매니저

```python
print("\n=== 중첩 컨텍스트 매니저 ===")

class CompositeContextManager:
    """여러 컨텍스트 매니저를 조합하는 복합 매니저"""
    
    def __init__(self, *context_managers):
        self.context_managers = context_managers
        self.entered_managers = []
        self.results = []
    
    def __enter__(self):
        """모든 컨텍스트 매니저 진입"""
        print(f"   복합 컨텍스트 매니저 진입 ({len(self.context_managers)}개)")
        
        try:
            for i, cm in enumerate(self.context_managers):
                print(f"     컨텍스트 {i+1} 진입: {type(cm).__name__}")
                result = cm.__enter__()
                self.entered_managers.append(cm)
                self.results.append(result)
        except Exception:
            # 실패 시 이미 진입한 컨텍스트들 정리
            self._cleanup_entered()
            raise
        
        return self.results if len(self.results) > 1 else (self.results[0] if self.results else None)
    
    def __exit__(self, exc_type, exc_value, traceback):
        """모든 컨텍스트 매니저 종료 (역순)"""
        print(f"   복합 컨텍스트 매니저 종료")
        
        exception_occurred = exc_type is not None
        suppressed_exceptions = []
        
        # 역순으로 종료
        for i, cm in enumerate(reversed(self.entered_managers)):
            try:
                print(f"     컨텍스트 {len(self.entered_managers)-i} 종료: {type(cm).__name__}")
                result = cm.__exit__(exc_type, exc_value, traceback)
                
                # 예외 억제 처리
                if result and exception_occurred:
                    suppressed_exceptions.append(cm)
                    print(f"       예외 억제됨: {type(cm).__name__}")
            
            except Exception as cleanup_exc:
                print(f"       정리 중 예외 발생: {cleanup_exc}")
                # 정리 중 예외는 로그만 남기고 계속 진행
        
        # 모든 예외가 억제되었다면 True 반환
        return len(suppressed_exceptions) > 0 and exception_occurred
    
    def _cleanup_entered(self):
        """진입했던 컨텍스트들 정리"""
        for cm in reversed(self.entered_managers):
            try:
                cm.__exit__(None, None, None)
            except Exception as e:
                print(f"       정리 실패: {e}")

class TransactionManager:
    """트랜잭션 관리 컨텍스트 매니저"""
    
    def __init__(self, name, auto_rollback=True):
        self.name = name
        self.auto_rollback = auto_rollback
        self.committed = False
        self.rolled_back = False
    
    def __enter__(self):
        print(f"     트랜잭션 시작: {self.name}")
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None and not self.committed and not self.rolled_back:
            self.commit()
        elif exc_type is not None and self.auto_rollback and not self.rolled_back:
            self.rollback()
        
        print(f"     트랜잭션 종료: {self.name}")
    
    def commit(self):
        """트랜잭션 커밋"""
        self.committed = True
        print(f"       {self.name} 커밋됨")
    
    def rollback(self):
        """트랜잭션 롤백"""
        self.rolled_back = True
        print(f"       {self.name} 롤백됨")

class ConnectionPool:
    """연결 풀 컨텍스트 매니저"""
    
    def __init__(self, pool_name, max_connections=5):
        self.pool_name = pool_name
        self.max_connections = max_connections
        self.active_connections = 0
        self.connection_id = None
    
    def __enter__(self):
        if self.active_connections >= self.max_connections:
            raise RuntimeError(f"연결 풀 한계 초과: {self.pool_name}")
        
        self.active_connections += 1
        self.connection_id = f"{self.pool_name}-conn-{self.active_connections}"
        print(f"     연결 획득: {self.connection_id}")
        return self.connection_id
    
    def __exit__(self, exc_type, exc_value, traceback):
        if self.connection_id:
            print(f"     연결 반환: {self.connection_id}")
            self.active_connections -= 1
            self.connection_id = None

class LockManager:
    """락 관리 컨텍스트 매니저"""
    
    def __init__(self, lock_name, timeout=5):
        self.lock_name = lock_name
        self.timeout = timeout
        self.acquired = False
    
    def __enter__(self):
        import time
        import random
        
        print(f"     락 획득 시도: {self.lock_name}")
        
        # 락 획득 시뮬레이션
        start_time = time.time()
        while time.time() - start_time < self.timeout:
            if random.random() > 0.2:  # 80% 확률로 성공
                self.acquired = True
                print(f"     락 획득 성공: {self.lock_name}")
                return self
            time.sleep(0.1)
        
        raise TimeoutError(f"락 획득 타임아웃: {self.lock_name}")
    
    def __exit__(self, exc_type, exc_value, traceback):
        if self.acquired:
            print(f"     락 해제: {self.lock_name}")
            self.acquired = False

@contextmanager
def nested_operation(operation_name, *sub_operations):
    """중첩된 작업을 관리하는 컨텍스트 매니저"""
    print(f"   중첩 작업 시작: {operation_name}")
    
    results = {}
    completed_operations = []
    
    try:
        for sub_op in sub_operations:
            print(f"     하위 작업: {sub_op}")
            # 실제로는 복잡한 작업 수행
            import time
            time.sleep(0.05)  # 작업 시뮬레이션
            
            results[sub_op] = f"result_of_{sub_op}"
            completed_operations.append(sub_op)
        
        yield results
        
        print(f"   중첩 작업 완료: {operation_name}")
        
    except Exception as e:
        print(f"   중첩 작업 실패: {operation_name} - {e}")
        
        # 완료된 작업들 롤백
        for op in reversed(completed_operations):
            print(f"     롤백: {op}")
        
        raise

def demonstrate_nested_context_managers():
    """중첩 컨텍스트 매니저 시연"""
    print("\n1. 복합 컨텍스트 매니저:")
    
    # 여러 컨텍스트 매니저 조합
    try:
        with CompositeContextManager(
            TransactionManager("main_tx"),
            ConnectionPool("db_pool", max_connections=3),
            LockManager("data_lock", timeout=2)
        ) as (tx, conn, lock):
            
            print(f"   모든 리소스 획득 완료")
            print(f"   트랜잭션: {tx.name}")
            print(f"   연결: {conn}")
            print(f"   락: {lock.lock_name}")
            
            # 작업 수행
            tx.commit()
    
    except Exception as e:
        print(f"   복합 컨텍스트 실패: {e}")
    
    print("\n2. 깊은 중첩 구조:")
    
    with nested_operation("데이터_처리", "데이터_로드", "데이터_검증", "데이터_변환") as results:
        print(f"     중간 결과: {results}")
        
        with nested_operation("분석_작업", "통계_계산", "그래프_생성") as analysis_results:
            print(f"     분석 결과: {analysis_results}")
            
            # 최종 작업
            final_result = {**results, **analysis_results}
            print(f"   최종 결과: {final_result}")
    
    print("\n3. 조건부 중첩 컨텍스트:")
    
    def complex_data_processing(use_transaction=True, use_lock=True, use_pool=True):
        """조건부로 컨텍스트 매니저 사용"""
        context_managers = []
        
        if use_transaction:
            context_managers.append(TransactionManager("conditional_tx"))
        
        if use_pool:
            context_managers.append(ConnectionPool("conditional_pool"))
        
        if use_lock:
            context_managers.append(LockManager("conditional_lock"))
        
        if context_managers:
            return CompositeContextManager(*context_managers)
        else:
            return contextlib.nullcontext()
    
    # 모든 컨텍스트 사용
    with complex_data_processing(True, True, True) as resources:
        print(f"   모든 컨텍스트 활성화: {type(resources)}")
    
    # 일부 컨텍스트만 사용
    with complex_data_processing(True, False, True) as resources:
        print(f"   일부 컨텍스트 활성화: {type(resources)}")
    
    # 컨텍스트 없이 사용
    with complex_data_processing(False, False, False) as resources:
        print(f"   컨텍스트 없음: {resources}")

demonstrate_nested_context_managers()
```

### 4.2 비동기 컨텍스트 매니저

```python
print("\n=== 비동기 컨텍스트 매니저 ===")

import asyncio
from contextlib import asynccontextmanager

class AsyncResourceManager:
    """비동기 리소스 관리자"""
    
    def __init__(self, resource_name, connection_delay=0.1):
        self.resource_name = resource_name
        self.connection_delay = connection_delay
        self.connected = False
        self.connection = None
    
    async def __aenter__(self):
        """비동기 컨텍스트 진입"""
        print(f"   비동기 연결 시작: {self.resource_name}")
        
        # 비동기 연결 시뮬레이션
        await asyncio.sleep(self.connection_delay)
        
        self.connected = True
        self.connection = f"AsyncConnection-{self.resource_name}-{id(self)}"
        print(f"   연결 완료: {self.connection}")
        
        return self
    
    async def __aexit__(self, exc_type, exc_value, traceback):
        """비동기 컨텍스트 종료"""
        print(f"   비동기 연결 종료: {self.connection}")
        
        # 비동기 정리 작업
        await asyncio.sleep(0.05)
        
        self.connected = False
        self.connection = None
        print(f"   정리 완료: {self.resource_name}")
    
    async def execute(self, command):
        """비동기 명령 실행"""
        if not self.connected:
            raise RuntimeError("연결되지 않음")
        
        print(f"     명령 실행: {command}")
        await asyncio.sleep(0.02)  # 실행 시뮬레이션
        return f"Result: {command}"

@asynccontextmanager
async def async_transaction(transaction_name):
    """비동기 트랜잭션 컨텍스트 매니저"""
    print(f"   비동기 트랜잭션 시작: {transaction_name}")
    
    transaction_id = f"AsyncTx-{transaction_name}-{id(asyncio.current_task())}"
    
    try:
        yield transaction_id
        # 성공 시 커밋
        await asyncio.sleep(0.01)  # 커밋 시뮬레이션
        print(f"   트랜잭션 커밋: {transaction_id}")
    
    except Exception as e:
        # 실패 시 롤백
        await asyncio.sleep(0.01)  # 롤백 시뮬레이션
        print(f"   트랜잭션 롤백: {transaction_id} - {e}")
        raise
    
    finally:
        print(f"   트랜잭션 정리: {transaction_id}")

@asynccontextmanager
async def async_batch_processor(batch_size=10):
    """비동기 배치 처리 컨텍스트 매니저"""
    print(f"   배치 처리기 시작 (크기: {batch_size})")
    
    batch_items = []
    processed_count = 0
    
    async def process_batch():
        nonlocal processed_count
        if batch_items:
            print(f"     배치 처리: {len(batch_items)}개 항목")
            # 실제 배치 처리 시뮬레이션
            await asyncio.sleep(0.1)
            processed_count += len(batch_items)
            batch_items.clear()
    
    try:
        processor = {
            'add_item': lambda item: batch_items.append(item),
            'process_batch': process_batch,
            'get_count': lambda: processed_count
        }
        
        yield processor
        
        # 마지막 배치 처리
        if batch_items:
            await process_batch()
        
        print(f"   배치 처리 완료: 총 {processed_count}개 항목")
    
    except Exception as e:
        print(f"   배치 처리 오류: {e}")
        raise

class AsyncCompositeManager:
    """비동기 복합 컨텍스트 매니저"""
    
    def __init__(self, *async_context_managers):
        self.async_cms = async_context_managers
        self.entered_cms = []
        self.results = []
    
    async def __aenter__(self):
        """모든 비동기 컨텍스트 매니저 진입"""
        print(f"   비동기 복합 매니저 진입 ({len(self.async_cms)}개)")
        
        try:
            for i, acm in enumerate(self.async_cms):
                print(f"     비동기 컨텍스트 {i+1} 진입")
                result = await acm.__aenter__()
                self.entered_cms.append(acm)
                self.results.append(result)
        
        except Exception:
            await self._cleanup_entered()
            raise
        
        return self.results
    
    async def __aexit__(self, exc_type, exc_value, traceback):
        """모든 비동기 컨텍스트 매니저 종료"""
        print(f"   비동기 복합 매니저 종료")
        
        exceptions = []
        
        # 역순으로 종료
        for i, acm in enumerate(reversed(self.entered_cms)):
            try:
                print(f"     비동기 컨텍스트 {len(self.entered_cms)-i} 종료")
                await acm.__aexit__(exc_type, exc_value, traceback)
            except Exception as e:
                exceptions.append(e)
                print(f"       종료 중 예외: {e}")
        
        # 종료 중 예외가 있었다면 첫 번째 예외 재발생
        if exceptions:
            raise exceptions[0]
    
    async def _cleanup_entered(self):
        """진입된 컨텍스트들 정리"""
        for acm in reversed(self.entered_cms):
            try:
                await acm.__aexit__(None, None, None)
            except Exception as e:
                print(f"       정리 실패: {e}")

async def demonstrate_async_context_managers():
    """비동기 컨텍스트 매니저 시연"""
    print("\n1. 기본 비동기 컨텍스트 매니저:")
    
    async with AsyncResourceManager("database") as db:
        result1 = await db.execute("SELECT * FROM users")
        result2 = await db.execute("INSERT INTO logs ...")
        print(f"   실행 결과: {result1}, {result2}")
    
    print("\n2. 비동기 트랜잭션:")
    
    try:
        async with async_transaction("user_update") as tx_id:
            print(f"   트랜잭션 ID: {tx_id}")
            # 작업 수행
            await asyncio.sleep(0.05)
            print(f"   작업 완료")
    
    except Exception as e:
        print(f"   트랜잭션 예외: {e}")
    
    print("\n3. 비동기 배치 처리:")
    
    async with async_batch_processor(batch_size=5) as processor:
        # 항목들 추가
        for i in range(12):
            processor['add_item'](f"item_{i}")
            
            # 배치 크기에 도달하면 처리
            if (i + 1) % 5 == 0:
                await processor['process_batch']()
        
        print(f"   중간 처리 개수: {processor['get_count']()}")
    
    print("\n4. 비동기 복합 매니저:")
    
    async with AsyncCompositeManager(
        AsyncResourceManager("database", 0.05),
        async_transaction("bulk_operation"),
        async_batch_processor(3)
    ) as (db, tx, batch):
        
        print(f"   모든 비동기 리소스 준비 완료")
        print(f"   DB: {db.connection}")
        print(f"   TX: {tx}")
        
        # 복합 작업 수행
        for i in range(7):
            batch['add_item'](f"async_item_{i}")
            if i % 3 == 2:
                await batch['process_batch']()
        
        result = await db.execute("COMMIT BATCH")
        print(f"   복합 작업 결과: {result}")

# 비동기 함수 실행
async def run_async_demos():
    """비동기 데모 실행"""
    await demonstrate_async_context_managers()

# 이벤트 루프에서 실행
try:
    asyncio.run(run_async_demos())
except RuntimeError:
    # 이미 실행 중인 이벤트 루프가 있는 경우
    import nest_asyncio
    nest_asyncio.apply()
    asyncio.run(run_async_demos())
except ImportError:
    # nest_asyncio가 없는 경우 간단한 동기 시뮬레이션
    print("   비동기 데모는 실제 환경에서 실행하세요")
```

## 5. 실무 패턴과 고급 활용

### 5.1 성능 최적화 패턴

```python
print("\n=== 성능 최적화 패턴 ===")

import time
import functools
import threading
from collections import defaultdict

class PerformanceDecorator:
    """종합적인 성능 분석 데코레이터"""
    
    def __init__(self, enable_profiling=True, enable_caching=True, cache_size=128):
        self.enable_profiling = enable_profiling
        self.enable_caching = enable_caching
        self.cache_size = cache_size
        
        # 성능 통계
        self.call_stats = defaultdict(lambda: {
            'count': 0,
            'total_time': 0,
            'min_time': float('inf'),
            'max_time': 0,
            'avg_time': 0
        })
        
        # 캐시
        self.cache = {} if enable_caching else None
        self.cache_hits = 0
        self.cache_misses = 0
        
        # 스레드 안전성
        self.lock = threading.RLock()
    
    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            func_name = func.__name__
            
            # 캐시 확인
            if self.enable_caching:
                cache_key = self._generate_cache_key(func, args, kwargs)
                
                with self.lock:
                    if cache_key in self.cache:
                        self.cache_hits += 1
                        print(f"   캐시 히트: {func_name}")
                        return self.cache[cache_key]
                    else:
                        self.cache_misses += 1
            
            # 성능 측정 시작
            start_time = time.perf_counter() if self.enable_profiling else None
            start_memory = self._get_memory_usage() if self.enable_profiling else None
            
            try:
                # 함수 실행
                result = func(*args, **kwargs)
                
                # 캐시 저장
                if self.enable_caching:
                    with self.lock:
                        if len(self.cache) >= self.cache_size:
                            # LRU 방식으로 가장 오래된 항목 제거
                            oldest_key = next(iter(self.cache))
                            del self.cache[oldest_key]
                        
                        self.cache[cache_key] = result
                
                return result
            
            finally:
                # 성능 통계 업데이트
                if self.enable_profiling:
                    end_time = time.perf_counter()
                    execution_time = end_time - start_time
                    end_memory = self._get_memory_usage()
                    
                    with self.lock:
                        stats = self.call_stats[func_name]
                        stats['count'] += 1
                        stats['total_time'] += execution_time
                        stats['min_time'] = min(stats['min_time'], execution_time)
                        stats['max_time'] = max(stats['max_time'], execution_time)
                        stats['avg_time'] = stats['total_time'] / stats['count']
                        
                        memory_diff = end_memory - start_memory if start_memory else 0
                        if memory_diff > 0:
                            stats['memory_usage'] = stats.get('memory_usage', 0) + memory_diff
        
        # 통계 메서드 추가
        wrapper.get_performance_stats = lambda: self.get_performance_stats()
        wrapper.clear_cache = lambda: self.clear_cache()
        wrapper.get_cache_stats = lambda: self.get_cache_stats()
        
        return wrapper
    
    def _generate_cache_key(self, func, args, kwargs):
        """캐시 키 생성"""
        try:
            return hash((func.__name__, args, tuple(sorted(kwargs.items()))))
        except TypeError:
            # 해시 불가능한 인수가 있는 경우
            return f"{func.__name__}:{id(args)}:{id(kwargs)}"
    
    def _get_memory_usage(self):
        """현재 메모리 사용량 반환 (근사치)"""
        import psutil
        import os
        try:
            process = psutil.Process(os.getpid())
            return process.memory_info().rss
        except ImportError:
            return 0
    
    def get_performance_stats(self):
        """성능 통계 반환"""
        with self.lock:
            return dict(self.call_stats)
    
    def get_cache_stats(self):
        """캐시 통계 반환"""
        if not self.enable_caching:
            return {'caching_disabled': True}
        
        with self.lock:
            total_requests = self.cache_hits + self.cache_misses
            hit_rate = (self.cache_hits / total_requests * 100) if total_requests > 0 else 0
            
            return {
                'cache_size': len(self.cache),
                'max_cache_size': self.cache_size,
                'cache_hits': self.cache_hits,
                'cache_misses': self.cache_misses,
                'hit_rate': hit_rate
            }
    
    def clear_cache(self):
        """캐시 초기화"""
        if self.enable_caching:
            with self.lock:
                self.cache.clear()
                self.cache_hits = 0
                self.cache_misses = 0

class BatchProcessingDecorator:
    """배치 처리 최적화 데코레이터"""
    
    def __init__(self, batch_size=10, flush_interval=1.0):
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self.batch_queue = []
        self.last_flush = time.time()
        self.lock = threading.Lock()
        self.results = {}
    
    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request_id = id((args, kwargs))
            
            with self.lock:
                # 배치에 요청 추가
                self.batch_queue.append((request_id, args, kwargs))
                
                # 배치 크기 도달 또는 시간 초과 시 처리
                should_flush = (
                    len(self.batch_queue) >= self.batch_size or
                    time.time() - self.last_flush >= self.flush_interval
                )
                
                if should_flush:
                    self._process_batch(func)
            
            # 결과 대기
            while request_id not in self.results:
                time.sleep(0.001)  # 짧은 대기
            
            with self.lock:
                result = self.results.pop(request_id)
            
            return result
        
        # 강제 플러시 메서드 추가
        wrapper.flush_batch = lambda: self._process_batch(func)
        wrapper.get_batch_stats = lambda: self.get_batch_stats()
        
        return wrapper
    
    def _process_batch(self, func):
        """배치 처리 실행"""
        if not self.batch_queue:
            return
        
        current_batch = self.batch_queue.copy()
        self.batch_queue.clear()
        self.last_flush = time.time()
        
        print(f"   배치 처리: {len(current_batch)}개 요청")
        
        # 배치의 각 요청 처리
        for request_id, args, kwargs in current_batch:
            try:
                result = func(*args, **kwargs)
                self.results[request_id] = result
            except Exception as e:
                self.results[request_id] = e
    
    def get_batch_stats(self):
        """배치 통계 반환"""
        with self.lock:
            return {
                'batch_size': self.batch_size,
                'flush_interval': self.flush_interval,
                'current_queue_size': len(self.batch_queue),
                'pending_results': len(self.results)
            }

@contextmanager
def resource_pool(resource_factory, pool_size=5):
    """리소스 풀 컨텍스트 매니저"""
    pool = []
    used_resources = set()
    
    # 리소스 풀 초기화
    for i in range(pool_size):
        resource = resource_factory()
        pool.append(resource)
    
    print(f"   리소스 풀 생성: {pool_size}개")
    
    def acquire_resource():
        """리소스 획득"""
        if not pool:
            raise RuntimeError("사용 가능한 리소스가 없습니다")
        
        resource = pool.pop()
        used_resources.add(resource)
        print(f"     리소스 획득: {id(resource)}")
        return resource
    
    def release_resource(resource):
        """리소스 반환"""
        if resource in used_resources:
            used_resources.remove(resource)
            pool.append(resource)
            print(f"     리소스 반환: {id(resource)}")
    
    try:
        yield acquire_resource, release_resource
    finally:
        # 모든 리소스 정리
        print(f"   리소스 풀 정리: 사용 중인 리소스 {len(used_resources)}개")
        
        # 사용 중인 리소스들을 풀로 반환
        for resource in list(used_resources):
            release_resource(resource)
        
        # 리소스 정리
        for resource in pool:
            if hasattr(resource, 'close'):
                resource.close()

def demonstrate_performance_patterns():
    """성능 최적화 패턴 시연"""
    print("\n1. 종합 성능 데코레이터:")
    
    @PerformanceDecorator(enable_profiling=True, enable_caching=True, cache_size=5)
    def fibonacci(n):
        """피보나치 수 계산 (최적화됨)"""
        if n <= 1:
            return n
        return fibonacci(n-1) + fibonacci(n-2)
    
    # 성능 테스트
    for i in [10, 10, 15, 10, 20]:  # 일부 중복 호출로 캐시 효과 확인
        result = fibonacci(i)
        print(f"   fibonacci({i}) = {result}")
    
    # 성능 통계 확인
    perf_stats = fibonacci.get_performance_stats()
    cache_stats = fibonacci.get_cache_stats()
    
    print(f"   성능 통계: {perf_stats}")
    print(f"   캐시 히트율: {cache_stats['hit_rate']:.1f}%")
    
    print("\n2. 배치 처리 데코레이터:")
    
    @BatchProcessingDecorator(batch_size=3, flush_interval=0.5)
    def process_data(data):
        """데이터 처리 (배치 최적화됨)"""
        # 실제로는 데이터베이스 작업 등
        import time
        time.sleep(0.01)  # 처리 시뮬레이션
        return f"processed_{data}"
    
    # 여러 요청 동시 처리
    import threading
    
    def make_requests():
        for i in range(5):
            result = process_data(f"data_{i}")
            print(f"     요청 결과: {result}")
    
    # 동시 요청 시뮬레이션
    threads = []
    for _ in range(2):
        thread = threading.Thread(target=make_requests)
        threads.append(thread)
        thread.start()
    
    for thread in threads:
        thread.join()
    
    batch_stats = process_data.get_batch_stats()
    print(f"   배치 통계: {batch_stats}")
    
    print("\n3. 리소스 풀 패턴:")
    
    class DatabaseConnection:
        """데이터베이스 연결 시뮬레이션"""
        def __init__(self):
            self.connected = True
            print(f"       DB 연결 생성: {id(self)}")
        
        def query(self, sql):
            if not self.connected:
                raise RuntimeError("연결이 닫혔습니다")
            return f"Result of: {sql}"
        
        def close(self):
            self.connected = False
            print(f"       DB 연결 종료: {id(self)}")
    
    with resource_pool(DatabaseConnection, pool_size=3) as (acquire, release):
        # 여러 작업에서 리소스 사용
        conn1 = acquire()
        result1 = conn1.query("SELECT * FROM users")
        
        conn2 = acquire()
        result2 = conn2.query("SELECT * FROM orders")
        
        print(f"   쿼리 결과: {result1}")
        print(f"   쿼리 결과: {result2}")
        
        # 리소스 반환
        release(conn1)
        release(conn2)
        
        # 다시 사용
        conn3 = acquire()
        result3 = conn3.query("SELECT COUNT(*) FROM products")
        print(f"   쿼리 결과: {result3}")
        release(conn3)

demonstrate_performance_patterns()
```

## 6. 연습 문제

### 연습 1: 고급 캐싱 시스템
메모리와 디스크 캐시를 결합한 다단계 캐싱 데코레이터를 구현하세요:
- 메모리 캐시 (빠른 접근)
- 디스크 캐시 (영구 저장)
- TTL과 LRU 정책
- 캐시 동기화

### 연습 2: 분산 락 컨텍스트 매니저
Redis나 데이터베이스를 활용한 분산 락 시스템을 구현하세요:
- 데드락 방지
- 락 타임아웃
- 자동 갱신
- 장애 복구

### 연습 3: API 레이트 리미터
고급 API 호출 제한 시스템을 구현하세요:
- 사용자별 제한
- 시간 윈도우별 제한
- 점진적 제한 완화
- 우선순위 기반 제한

### 연습 4: 트랜잭션 매니저
다중 데이터베이스 트랜잭션을 관리하는 컨텍스트 매니저를 구현하세요:
- 2단계 커밋 프로토콜
- 부분 실패 처리
- 보상 트랜잭션
- 모니터링과 로깅

## 정리

이 챕터에서 학습한 내용:

1. **클래스 기반 데코레이터**: 상태를 유지하고 복잡한 로직을 구현하는 강력한 패턴
2. **매개변수가 있는 데코레이터**: 설정 가능하고 재사용 가능한 데코레이터 구현
3. **functools.wraps**: 메타데이터 보존과 함수 시그니처 유지의 중요성
4. **고급 컨텍스트 매니저**: 리소스 관리와 예외 처리의 정교한 제어
5. **contextlib 모듈**: 컨텍스트 매니저 작성을 위한 유용한 도구들
6. **중첩 컨텍스트 매니저**: 복잡한 리소스 조합과 의존성 관리
7. **비동기 컨텍스트 매니저**: 비동기 환경에서의 리소스 관리
8. **성능 최적화 패턴**: 실무에서 사용되는 고성능 패턴들

다음 챕터에서는 동시성과 병렬성 심화를 통해 더욱 복잡한 동시성 프로그래밍 기법을 학습하게 됩니다.

### 핵심 포인트
- 데코레이터는 함수의 동작을 확장하는 강력한 도구입니다
- 컨텍스트 매니저는 리소스 관리와 예외 처리를 보장합니다
- functools.wraps를 사용하여 메타데이터를 보존해야 합니다
- 복잡한 시스템에서는 중첩된 컨텍스트 매니저가 유용합니다
- 성능 최적화를 위해 캐싱, 배치 처리, 리소스 풀링 등을 활용할 수 있습니다
- 비동기 환경에서는 비동기 컨텍스트 매니저를 사용해야 합니다
</rewritten_file> 