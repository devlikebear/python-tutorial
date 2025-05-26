# Chapter 1: 고급 함수 기법 (Advanced Function Techniques)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- *args와 **kwargs를 활용한 유연한 함수 설계하기
- 람다 함수의 적절한 활용법 이해하기
- 고차 함수(map, filter, reduce)를 이용한 함수형 프로그래밍 기법 익히기
- 함수 데코레이터를 만들고 활용하기
- 클로저와 스코프 규칙을 정확히 이해하기
- 재귀 함수를 효과적으로 설계하고 구현하기
- Pythonic한 함수 작성 패턴 습득하기

## 1. 가변 인수 (*args와 **kwargs)

### 1.1 *args - 위치 인수 받기

```python
def basic_args_example(*args):
    """가변 위치 인수 기본 예제"""
    print(f"받은 인수들: {args}")
    print(f"인수 개수: {len(args)}")
    print(f"타입: {type(args)}")
    
    for i, arg in enumerate(args):
        print(f"  {i}: {arg}")

# 테스트
print("=== *args 기본 예제 ===")
basic_args_example(1, 2, 3)
basic_args_example("hello", "world", 42, True)
basic_args_example()  # 인수 없이도 호출 가능

# 실용적인 활용 예제
def calculate_sum(*numbers):
    """여러 숫자의 합 계산"""
    if not numbers:
        return 0
    
    total = 0
    for num in numbers:
        if isinstance(num, (int, float)):
            total += num
        else:
            print(f"경고: {num}은 숫자가 아닙니다")
    
    return total

def find_maximum(*values):
    """여러 값 중 최댓값 찾기"""
    if not values:
        return None
    
    max_val = values[0]
    for val in values[1:]:
        if val > max_val:
            max_val = val
    
    return max_val

# 활용 예제
print("\n=== *args 실용 예제 ===")
print(f"합계: {calculate_sum(1, 2, 3, 4, 5)}")
print(f"합계: {calculate_sum(10.5, 20.3, 30.2)}")
print(f"최댓값: {find_maximum(45, 23, 67, 12, 89, 34)}")
print(f"최댓값: {find_maximum('apple', 'zebra', 'banana')}")
```

### 1.2 **kwargs - 키워드 인수 받기

```python
def basic_kwargs_example(**kwargs):
    """가변 키워드 인수 기본 예제"""
    print(f"받은 키워드 인수들: {kwargs}")
    print(f"타입: {type(kwargs)}")
    
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

# 테스트
print("\n=== **kwargs 기본 예제 ===")
basic_kwargs_example(name="Alice", age=25, city="Seoul")
basic_kwargs_example(x=10, y=20, operation="add")

# 실용적인 활용 예제
def create_user_profile(name, email, **additional_info):
    """사용자 프로필 생성"""
    profile = {
        'name': name,
        'email': email,
        'created_at': '2024-01-01'  # 실제로는 현재 시간
    }
    
    # 추가 정보 병합
    profile.update(additional_info)
    
    return profile

def format_message(template, **placeholders):
    """템플릿 메시지 포맷팅"""
    try:
        return template.format(**placeholders)
    except KeyError as e:
        return f"오류: 필수 플레이스홀더 {e}가 없습니다"

# 활용 예제
print("\n=== **kwargs 실용 예제 ===")
user1 = create_user_profile(
    "김철수", 
    "kim@email.com",
    age=30,
    city="부산",
    hobby="독서"
)
print(f"사용자 프로필: {user1}")

message_template = "안녕하세요 {name}님! {product}를 {discount}% 할인가에 제공합니다."
formatted = format_message(
    message_template,
    name="이영희",
    product="노트북",
    discount=20
)
print(f"포맷된 메시지: {formatted}")
```

### 1.3 *args와 **kwargs 결합 활용

```python
def flexible_function(required_arg, *args, default_value=None, **kwargs):
    """유연한 함수 설계 패턴"""
    print(f"필수 인수: {required_arg}")
    print(f"추가 위치 인수: {args}")
    print(f"기본값 매개변수: {default_value}")
    print(f"키워드 인수: {kwargs}")

def advanced_calculator(operation, *numbers, **options):
    """고급 계산기 예제"""
    # 옵션 처리
    precision = options.get('precision', 2)
    verbose = options.get('verbose', False)
    
    if verbose:
        print(f"연산: {operation}, 숫자들: {numbers}")
    
    if operation == 'sum':
        result = sum(numbers)
    elif operation == 'multiply':
        result = 1
        for num in numbers:
            result *= num
    elif operation == 'average':
        result = sum(numbers) / len(numbers) if numbers else 0
    else:
        result = None
        print(f"지원하지 않는 연산: {operation}")
    
    if result is not None:
        return round(result, precision)
    return result

# 활용 예제
print("\n=== *args와 **kwargs 결합 ===")
flexible_function("필수값", 1, 2, 3, default_value="설정", key1="값1", key2="값2")

print(f"합계: {advanced_calculator('sum', 10, 20, 30, precision=1, verbose=True)}")
print(f"곱셈: {advanced_calculator('multiply', 2, 3, 4, 5)}")
print(f"평균: {advanced_calculator('average', 85, 90, 78, 92, precision=1)}")

# 함수 호출 시 언패킹
def process_coordinates(x, y, z=0):
    """좌표 처리 함수"""
    return f"좌표: ({x}, {y}, {z})"

# 리스트/튜플 언패킹
coords_2d = [10, 20]
coords_3d = (5, 15, 25)
coord_dict = {'x': 1, 'y': 2, 'z': 3}

print("\n=== 인수 언패킹 ===")
print(process_coordinates(*coords_2d))
print(process_coordinates(*coords_3d))
print(process_coordinates(**coord_dict))
```

## 2. 람다 함수 (Lambda Functions)

### 2.1 람다 함수 기본 사용법

```python
# 기본 람다 함수 예제
print("=== 람다 함수 기본 ===")

# 일반 함수 vs 람다 함수
def square_function(x):
    return x * x

square_lambda = lambda x: x * x

print(f"일반 함수: {square_function(5)}")
print(f"람다 함수: {square_lambda(5)}")

# 여러 매개변수를 가진 람다
add = lambda x, y: x + y
multiply = lambda x, y, z: x * y * z
greet = lambda name, title="님": f"안녕하세요, {name}{title}!"

print(f"덧셈: {add(10, 20)}")
print(f"곱셈: {multiply(2, 3, 4)}")
print(f"인사: {greet('김철수')}")
print(f"인사: {greet('이영희', '씨')}")

# 조건부 람다 함수
max_value = lambda a, b: a if a > b else b
absolute_value = lambda x: x if x >= 0 else -x
grade_status = lambda score: "pass" if score >= 60 else "fail"

print(f"최댓값: {max_value(15, 23)}")
print(f"절댓값: {absolute_value(-7)}")
print(f"성적: {grade_status(75)}")
```

### 2.2 람다 함수의 실용적 활용

```python
# 정렬에서의 람다 활용
students = [
    {'name': '김철수', 'age': 20, 'grade': 85},
    {'name': '이영희', 'age': 19, 'grade': 92},
    {'name': '박민수', 'age': 21, 'grade': 78},
    {'name': '최지원', 'age': 20, 'grade': 95}
]

print("\n=== 람다를 활용한 정렬 ===")
print("원본 데이터:")
for student in students:
    print(f"  {student}")

# 이름순 정렬
sorted_by_name = sorted(students, key=lambda x: x['name'])
print("\n이름순 정렬:")
for student in sorted_by_name:
    print(f"  {student['name']}: {student['grade']}")

# 성적순 정렬 (내림차순)
sorted_by_grade = sorted(students, key=lambda x: x['grade'], reverse=True)
print("\n성적순 정렬 (높은 순):")
for student in sorted_by_grade:
    print(f"  {student['name']}: {student['grade']}")

# 복합 정렬 (나이 -> 성적 순)
sorted_complex = sorted(students, key=lambda x: (x['age'], -x['grade']))
print("\n나이순 정렬 (같은 나이면 성적 높은 순):")
for student in sorted_complex:
    print(f"  {student['name']}: 나이 {student['age']}, 성적 {student['grade']}")

# 문자열 처리에서의 람다 활용
words = ['Python', 'Java', 'JavaScript', 'C++', 'Go', 'Rust']

print("\n=== 문자열 처리 람다 ===")
print(f"원본: {words}")
print(f"길이순: {sorted(words, key=lambda x: len(x))}")
print(f"마지막 글자순: {sorted(words, key=lambda x: x[-1])}")
print(f"소문자로 변환 후 정렬: {sorted(words, key=lambda x: x.lower())}")
```

## 3. 고차 함수 (Higher-Order Functions)

### 3.1 map() 함수

```python
# map() 기본 사용법
print("=== map() 함수 ===")

# 기본 예제
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(f"원본: {numbers}")
print(f"제곱: {squared}")

# 문자열 처리
words = ['hello', 'world', 'python', 'programming']
capitalized = list(map(str.capitalize, words))
lengths = list(map(len, words))

print(f"원본: {words}")
print(f"첫 글자 대문자: {capitalized}")
print(f"길이: {lengths}")

# 여러 iterable 처리
numbers1 = [1, 2, 3, 4]
numbers2 = [10, 20, 30, 40]
sums = list(map(lambda x, y: x + y, numbers1, numbers2))
products = list(map(lambda x, y: x * y, numbers1, numbers2))

print(f"리스트1: {numbers1}")
print(f"리스트2: {numbers2}")
print(f"합: {sums}")
print(f"곱: {products}")

# 실용적인 예제: 온도 변환
celsius_temps = [0, 20, 30, 40, 100]
fahrenheit_temps = list(map(lambda c: (c * 9/5) + 32, celsius_temps))

print(f"섭씨: {celsius_temps}")
print(f"화씨: {fahrenheit_temps}")

# 딕셔너리 데이터 처리
employees = [
    {'name': '김철수', 'salary': 3000000},
    {'name': '이영희', 'salary': 3500000},
    {'name': '박민수', 'salary': 4000000}
]

# 연봉을 월급으로 변환
monthly_salaries = list(map(lambda emp: {
    'name': emp['name'], 
    'monthly_salary': emp['salary'] // 12
}, employees))

print(f"\n월급 정보:")
for emp in monthly_salaries:
    print(f"  {emp['name']}: {emp['monthly_salary']:,}원")
```

### 3.2 filter() 함수

```python
print("\n=== filter() 함수 ===")

# 기본 예제
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
odd_numbers = list(filter(lambda x: x % 2 == 1, numbers))
large_numbers = list(filter(lambda x: x > 5, numbers))

print(f"원본: {numbers}")
print(f"짝수: {even_numbers}")
print(f"홀수: {odd_numbers}")
print(f"5보다 큰 수: {large_numbers}")

# 문자열 필터링
words = ['python', 'java', 'javascript', 'c++', 'go', 'rust', 'php']
long_words = list(filter(lambda w: len(w) > 4, words))
words_with_a = list(filter(lambda w: 'a' in w, words))
words_starting_with_j = list(filter(lambda w: w.startswith('j'), words))

print(f"\n언어들: {words}")
print(f"4글자 초과: {long_words}")
print(f"'a' 포함: {words_with_a}")
print(f"'j'로 시작: {words_starting_with_j}")

# 복합 데이터 필터링
products = [
    {'name': '노트북', 'price': 1200000, 'category': '전자제품'},
    {'name': '마우스', 'price': 25000, 'category': '전자제품'},
    {'name': '책상', 'price': 150000, 'category': '가구'},
    {'name': '의자', 'price': 80000, 'category': '가구'},
    {'name': '키보드', 'price': 70000, 'category': '전자제품'}
]

# 조건별 필터링
expensive_products = list(filter(lambda p: p['price'] > 100000, products))
electronics = list(filter(lambda p: p['category'] == '전자제품', products))
affordable_electronics = list(filter(
    lambda p: p['category'] == '전자제품' and p['price'] < 100000, 
    products
))

print(f"\n고가 제품:")
for product in expensive_products:
    print(f"  {product['name']}: {product['price']:,}원")

print(f"\n전자제품:")
for product in electronics:
    print(f"  {product['name']}: {product['price']:,}원")

print(f"\n저렴한 전자제품:")
for product in affordable_electronics:
    print(f"  {product['name']}: {product['price']:,}원")

# None 값 제거
mixed_data = [1, None, 2, '', 3, 0, 4, False, 5]
clean_data = list(filter(None, mixed_data))  # Falsy 값 제거
numbers_only = list(filter(lambda x: isinstance(x, int) and x > 0, mixed_data))

print(f"\n혼합 데이터: {mixed_data}")
print(f"Falsy 값 제거: {clean_data}")
print(f"양의 정수만: {numbers_only}")
```

### 3.3 reduce() 함수

```python
from functools import reduce

print("\n=== reduce() 함수 ===")

# 기본 예제
numbers = [1, 2, 3, 4, 5]
sum_result = reduce(lambda x, y: x + y, numbers)
product_result = reduce(lambda x, y: x * y, numbers)
max_result = reduce(lambda x, y: x if x > y else y, numbers)

print(f"숫자들: {numbers}")
print(f"합계: {sum_result}")
print(f"곱셈: {product_result}")
print(f"최댓값: {max_result}")

# 초기값 사용
sum_with_initial = reduce(lambda x, y: x + y, numbers, 100)
product_with_initial = reduce(lambda x, y: x * y, numbers, 2)

print(f"초기값 100과 합계: {sum_with_initial}")
print(f"초기값 2와 곱셈: {product_with_initial}")

# 문자열 처리
words = ['Python', 'is', 'awesome', 'and', 'powerful']
sentence = reduce(lambda x, y: x + ' ' + y, words)
concatenated = reduce(lambda x, y: x + y, words)

print(f"\n단어들: {words}")
print(f"문장: {sentence}")
print(f"연결: {concatenated}")

# 복잡한 데이터 처리
transactions = [
    {'amount': 100, 'type': 'deposit'},
    {'amount': 50, 'type': 'withdrawal'},
    {'amount': 200, 'type': 'deposit'},
    {'amount': 30, 'type': 'withdrawal'},
    {'amount': 150, 'type': 'deposit'}
]

# 최종 잔액 계산
def calculate_balance(current_balance, transaction):
    if transaction['type'] == 'deposit':
        return current_balance + transaction['amount']
    else:
        return current_balance - transaction['amount']

final_balance = reduce(calculate_balance, transactions, 0)
print(f"\n거래 내역으로 최종 잔액: {final_balance}")

# 리스트의 리스트 평탄화
nested_lists = [[1, 2], [3, 4], [5, 6, 7], [8, 9]]
flattened = reduce(lambda x, y: x + y, nested_lists)
print(f"중첩 리스트: {nested_lists}")
print(f"평탄화: {flattened}")
```

## 4. 함수 데코레이터 (Function Decorators)

### 4.1 데코레이터 기본 개념

```python
print("=== 데코레이터 기본 개념 ===")

# 기본 데코레이터 구조
def simple_decorator(func):
    """간단한 데코레이터"""
    def wrapper():
        print("함수 실행 전")
        result = func()
        print("함수 실행 후")
        return result
    return wrapper

# 데코레이터 사용법 1: @ 문법
@simple_decorator
def say_hello():
    print("안녕하세요!")
    return "greeting_complete"

# 데코레이터 사용법 2: 직접 적용
def say_goodbye():
    print("안녕히 가세요!")
    return "farewell_complete"

say_goodbye = simple_decorator(say_goodbye)

# 테스트
print("1. @데코레이터 사용:")
result1 = say_hello()
print(f"반환값: {result1}")

print("\n2. 직접 적용:")
result2 = say_goodbye()
print(f"반환값: {result2}")

# 매개변수가 있는 함수를 위한 데코레이터
def args_decorator(func):
    """매개변수를 처리하는 데코레이터"""
    def wrapper(*args, **kwargs):
        print(f"함수 {func.__name__} 호출됨")
        print(f"위치 인수: {args}")
        print(f"키워드 인수: {kwargs}")
        result = func(*args, **kwargs)
        print(f"반환값: {result}")
        return result
    return wrapper

@args_decorator
def add_numbers(a, b, operation="add"):
    if operation == "add":
        return a + b
    elif operation == "multiply":
        return a * b
    else:
        return None

print("\n3. 매개변수가 있는 함수:")
add_numbers(10, 20)
add_numbers(5, 3, operation="multiply")
```

### 4.2 실용적인 데코레이터 예제

```python
import time
import functools

# 실행 시간 측정 데코레이터
def timing_decorator(func):
    """함수 실행 시간을 측정하는 데코레이터"""
    @functools.wraps(func)  # 원본 함수의 메타데이터 보존
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"{func.__name__} 실행 시간: {execution_time:.4f}초")
        return result
    return wrapper

# 로깅 데코레이터
def logging_decorator(func):
    """함수 호출을 로깅하는 데코레이터"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] {func.__name__} 함수 호출 시작")
        try:
            result = func(*args, **kwargs)
            print(f"[LOG] {func.__name__} 함수 호출 성공")
            return result
        except Exception as e:
            print(f"[LOG] {func.__name__} 함수 호출 실패: {e}")
            raise
    return wrapper

# 입력 검증 데코레이터
def validate_positive_numbers(func):
    """양수만 허용하는 데코레이터"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"음수는 허용되지 않습니다: {arg}")
        
        for key, value in kwargs.items():
            if isinstance(value, (int, float)) and value < 0:
                raise ValueError(f"음수는 허용되지 않습니다: {key}={value}")
        
        return func(*args, **kwargs)
    return wrapper

# 데코레이터 적용 예제
@timing_decorator
@logging_decorator
@validate_positive_numbers
def calculate_power(base, exponent):
    """거듭제곱 계산 (여러 데코레이터 적용)"""
    time.sleep(0.1)  # 시간 소요 시뮬레이션
    return base ** exponent

@timing_decorator
def slow_calculation(n):
    """느린 계산 시뮬레이션"""
    total = 0
    for i in range(n):
        total += i ** 2
    return total

print("\n=== 실용적인 데코레이터 예제 ===")

try:
    result = calculate_power(2, 3)
    print(f"2^3 = {result}")
    
    result = calculate_power(-2, 3)  # ValueError 발생
except ValueError as e:
    print(f"오류: {e}")

print(f"\n느린 계산 결과: {slow_calculation(1000)}")
```

### 4.3 매개변수를 받는 데코레이터

```python
def repeat_decorator(times):
    """함수를 여러 번 실행하는 데코레이터"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for i in range(times):
                print(f"실행 {i+1}/{times}")
                result = func(*args, **kwargs)
                results.append(result)
            return results
        return wrapper
    return decorator

def cache_decorator(max_size=100):
    """간단한 캐시 데코레이터"""
    def decorator(func):
        cache = {}
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 캐시 키 생성
            key = str(args) + str(sorted(kwargs.items()))
            
            if key in cache:
                print(f"캐시에서 반환: {func.__name__}")
                return cache[key]
            
            if len(cache) >= max_size:
                # 가장 오래된 항목 제거 (단순화)
                oldest_key = next(iter(cache))
                del cache[oldest_key]
            
            result = func(*args, **kwargs)
            cache[key] = result
            print(f"캐시에 저장: {func.__name__}")
            return result
        return wrapper
    return decorator

# 매개변수가 있는 데코레이터 사용
@repeat_decorator(3)
def greet_person(name):
    """사람에게 인사하기"""
    message = f"안녕하세요, {name}님!"
    print(message)
    return message

@cache_decorator(max_size=3)
def expensive_calculation(n):
    """비용이 많이 드는 계산"""
    print(f"계산 중... n={n}")
    time.sleep(0.1)  # 시간 소요 시뮬레이션
    return n * n + 2 * n + 1

print("\n=== 매개변수가 있는 데코레이터 ===")

print("1. 반복 데코레이터:")
greet_person("김철수")

print("\n2. 캐시 데코레이터:")
print(f"결과1: {expensive_calculation(5)}")
print(f"결과2: {expensive_calculation(3)}")
print(f"결과3: {expensive_calculation(5)}")  # 캐시에서 반환
print(f"결과4: {expensive_calculation(7)}")
print(f"결과5: {expensive_calculation(3)}")  # 캐시에서 반환
```

## 5. 클로저 (Closures)

### 5.1 클로저 기본 개념

```python
print("=== 클로저 기본 개념 ===")

def outer_function(x):
    """외부 함수"""
    print(f"외부 함수: x = {x}")
    
    def inner_function(y):
        """내부 함수 (클로저)"""
        print(f"내부 함수: y = {y}")
        return x + y  # 외부 함수의 변수 x에 접근
    
    print("내부 함수 반환")
    return inner_function

# 클로저 생성
closure1 = outer_function(10)
closure2 = outer_function(20)

print(f"클로저1 타입: {type(closure1)}")
print(f"클로저1 이름: {closure1.__name__}")

# 클로저 실행
result1 = closure1(5)  # 10 + 5
result2 = closure2(5)  # 20 + 5

print(f"클로저1 결과: {result1}")
print(f"클로저2 결과: {result2}")

# 클로저가 캡처한 변수 확인
print(f"클로저1이 캡처한 변수: {closure1.__closure__[0].cell_contents}")
print(f"클로저2가 캡처한 변수: {closure2.__closure__[0].cell_contents}")
```

### 5.2 클로저의 실용적 활용

```python
def create_multiplier(factor):
    """배수 함수 생성기"""
    def multiplier(number):
        return number * factor
    return multiplier

def create_validator(min_value, max_value):
    """범위 검증 함수 생성기"""
    def validator(value):
        if not isinstance(value, (int, float)):
            return False, "숫자가 아닙니다"
        if value < min_value:
            return False, f"최솟값 {min_value}보다 작습니다"
        if value > max_value:
            return False, f"최댓값 {max_value}보다 큽니다"
        return True, "유효한 값입니다"
    return validator

def create_counter(initial_value=0):
    """카운터 함수 생성기"""
    count = initial_value
    
    def counter(increment=1):
        nonlocal count  # 외부 변수 수정 허용
        count += increment
        return count
    
    def reset():
        nonlocal count
        count = initial_value
        return count
    
    def get_current():
        return count
    
    # 여러 함수를 가진 객체처럼 사용
    counter.reset = reset
    counter.get_current = get_current
    return counter

print("\n=== 클로저 실용 예제 ===")

# 배수 함수들
double = create_multiplier(2)
triple = create_multiplier(3)
ten_times = create_multiplier(10)

print("배수 함수들:")
print(f"2배: {double(15)}")
print(f"3배: {triple(15)}")
print(f"10배: {ten_times(15)}")

# 검증 함수들
age_validator = create_validator(0, 150)
score_validator = create_validator(0, 100)

print("\n검증 함수들:")
test_values = [-5, 25, 150, 200]
for value in test_values:
    is_valid, message = age_validator(value)
    print(f"나이 {value}: {'✓' if is_valid else '✗'} {message}")

# 카운터 함수들
counter1 = create_counter()
counter2 = create_counter(100)

print("\n카운터 함수들:")
print(f"카운터1: {counter1()}")  # 1
print(f"카운터1: {counter1(5)}")  # 6
print(f"카운터1 현재값: {counter1.get_current()}")  # 6

print(f"카운터2: {counter2()}")  # 101
print(f"카운터2: {counter2(10)}")  # 111
print(f"카운터2 리셋: {counter2.reset()}")  # 100
print(f"카운터2: {counter2()}")  # 101
```

### 5.3 클로저와 데코레이터 조합

```python
def create_rate_limiter(max_calls, time_window):
    """호출 횟수 제한 데코레이터 생성기"""
    call_times = []
    
    def rate_limiter(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            current_time = time.time()
            
            # 시간 윈도우를 벗어난 호출 기록 제거
            while call_times and current_time - call_times[0] > time_window:
                call_times.pop(0)
            
            # 호출 횟수 확인
            if len(call_times) >= max_calls:
                remaining_time = time_window - (current_time - call_times[0])
                raise Exception(f"호출 제한 초과. {remaining_time:.1f}초 후 다시 시도하세요.")
            
            # 호출 기록 추가
            call_times.append(current_time)
            return func(*args, **kwargs)
        return wrapper
    return rate_limiter

def create_retry_decorator(max_attempts, delay=1):
    """재시도 데코레이터 생성기"""
    def retry_decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        print(f"시도 {attempt + 1} 실패: {e}. {delay}초 후 재시도...")
                        time.sleep(delay)
                    else:
                        print(f"모든 시도 실패. 마지막 오류: {e}")
            
            raise last_exception
        return wrapper
    return retry_decorator

# 클로저 기반 데코레이터 사용
@create_rate_limiter(max_calls=3, time_window=5)
def api_call(endpoint):
    """API 호출 시뮬레이션"""
    print(f"API 호출: {endpoint}")
    return f"응답 from {endpoint}"

@create_retry_decorator(max_attempts=3, delay=0.5)
def unstable_operation(success_rate=0.3):
    """불안정한 작업 시뮬레이션"""
    import random
    if random.random() < success_rate:
        return "작업 성공!"
    else:
        raise Exception("작업 실패")

print("\n=== 클로저 기반 데코레이터 ===")

# 레이트 리미터 테스트
try:
    for i in range(5):
        result = api_call(f"endpoint_{i}")
        print(f"결과: {result}")
        time.sleep(0.5)
except Exception as e:
    print(f"오류: {e}")

# 재시도 데코레이터 테스트
print("\n재시도 테스트:")
try:
    result = unstable_operation(success_rate=0.7)
    print(f"최종 결과: {result}")
except Exception as e:
    print(f"최종 실패: {e}")
```

## 6. 재귀 함수 (Recursive Functions)

### 6.1 재귀 함수 기본 개념

```python
print("=== 재귀 함수 기본 ===")

def factorial(n):
    """팩토리얼 계산 (기본 재귀)"""
    # 기저 조건 (Base Case)
    if n <= 1:
        return 1
    
    # 재귀 호출
    return n * factorial(n - 1)

def fibonacci(n):
    """피보나치 수열 (기본 재귀)"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def countdown(n):
    """카운트다운 (단순 재귀)"""
    if n <= 0:
        print("발사!")
        return
    
    print(f"{n}...")
    countdown(n - 1)

# 기본 재귀 테스트
print("팩토리얼:")
for i in range(6):
    print(f"{i}! = {factorial(i)}")

print("\n피보나치 수열:")
for i in range(8):
    print(f"fib({i}) = {fibonacci(i)}")

print("\n카운트다운:")
countdown(5)
```

### 6.2 재귀 함수 최적화

```python
# 메모이제이션을 활용한 최적화
def memoized_fibonacci():
    """메모이제이션을 사용한 피보나치"""
    cache = {}
    
    def fib(n):
        if n in cache:
            return cache[n]
        
        if n <= 1:
            result = n
        else:
            result = fib(n - 1) + fib(n - 2)
        
        cache[n] = result
        return result
    
    return fib

# 내장 데코레이터를 활용한 최적화
from functools import lru_cache

@lru_cache(maxsize=None)
def optimized_fibonacci(n):
    """lru_cache를 사용한 피보나치"""
    if n <= 1:
        return n
    return optimized_fibonacci(n - 1) + optimized_fibonacci(n - 2)

def tail_recursive_factorial(n, accumulator=1):
    """꼬리 재귀 팩토리얼"""
    if n <= 1:
        return accumulator
    return tail_recursive_factorial(n - 1, n * accumulator)

print("\n=== 재귀 함수 최적화 ===")

# 성능 비교
import time

def measure_time(func, *args):
    start = time.time()
    result = func(*args)
    end = time.time()
    return result, end - start

# 피보나치 성능 비교
n = 30
memo_fib = memoized_fibonacci()

print(f"피보나치({n}) 성능 비교:")

result1, time1 = measure_time(fibonacci, n)
print(f"기본 재귀: {result1} ({time1:.4f}초)")

result2, time2 = measure_time(memo_fib, n)
print(f"메모이제이션: {result2} ({time2:.4f}초)")

result3, time3 = measure_time(optimized_fibonacci, n)
print(f"lru_cache: {result3} ({time3:.4f}초)")

# 팩토리얼 비교
n = 500
result4, time4 = measure_time(factorial, n)
result5, time5 = measure_time(tail_recursive_factorial, n)

print(f"\n팩토리얼({n}) 성능 비교:")
print(f"기본 재귀: 계산 완료 ({time4:.4f}초)")
print(f"꼬리 재귀: 계산 완료 ({time5:.4f}초)")
```

### 6.3 재귀 함수 고급 활용

```python
def binary_search(arr, target, left=None, right=None):
    """이진 탐색 (재귀)"""
    if left is None:
        left = 0
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1  # 찾지 못함
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)

def quicksort(arr):
    """퀵 정렬 (재귀)"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

def tree_traversal(node, traversal_type="inorder"):
    """이진 트리 순회 (재귀)"""
    if node is None:
        return []
    
    if traversal_type == "preorder":
        return [node['value']] + tree_traversal(node.get('left')) + tree_traversal(node.get('right'))
    elif traversal_type == "inorder":
        return tree_traversal(node.get('left')) + [node['value']] + tree_traversal(node.get('right'))
    elif traversal_type == "postorder":
        return tree_traversal(node.get('left')) + tree_traversal(node.get('right')) + [node['value']]

def find_all_paths(graph, start, end, path=[]):
    """그래프에서 모든 경로 찾기 (재귀)"""
    path = path + [start]
    
    if start == end:
        return [path]
    
    if start not in graph:
        return []
    
    paths = []
    for node in graph[start]:
        if node not in path:  # 순환 방지
            new_paths = find_all_paths(graph, node, end, path)
            paths.extend(new_paths)
    
    return paths

print("\n=== 재귀 함수 고급 활용 ===")

# 이진 탐색 테스트
sorted_numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target = 7
index = binary_search(sorted_numbers, target)
print(f"이진 탐색: {target}은 인덱스 {index}에 있습니다.")

# 퀵 정렬 테스트
unsorted = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quicksort(unsorted)
print(f"퀵 정렬: {unsorted} → {sorted_arr}")

# 트리 순회 테스트
tree = {
    'value': 1,
    'left': {
        'value': 2,
        'left': {'value': 4, 'left': None, 'right': None},
        'right': {'value': 5, 'left': None, 'right': None}
    },
    'right': {
        'value': 3,
        'left': {'value': 6, 'left': None, 'right': None},
        'right': {'value': 7, 'left': None, 'right': None}
    }
}

print(f"전위 순회: {tree_traversal(tree, 'preorder')}")
print(f"중위 순회: {tree_traversal(tree, 'inorder')}")
print(f"후위 순회: {tree_traversal(tree, 'postorder')}")

# 그래프 경로 찾기 테스트
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': ['G'],
    'E': ['G'],
    'F': ['G'],
    'G': []
}

all_paths = find_all_paths(graph, 'A', 'G')
print(f"A에서 G로 가는 모든 경로:")
for i, path in enumerate(all_paths, 1):
    print(f"  경로 {i}: {' → '.join(path)}")
```

## 7. 함수형 프로그래밍 패턴

### 7.1 순수 함수와 부작용

```python
# 순수 함수 vs 비순수 함수
print("=== 순수 함수 vs 비순수 함수 ===")

# 비순수 함수 (부작용 있음)
counter = 0

def impure_increment():
    """비순수 함수: 전역 변수 수정"""
    global counter
    counter += 1
    return counter

def impure_add_to_list(lst, item):
    """비순수 함수: 입력 매개변수 수정"""
    lst.append(item)
    return lst

# 순수 함수 (부작용 없음)
def pure_increment(value):
    """순수 함수: 입력값만 사용, 부작용 없음"""
    return value + 1

def pure_add_to_list(lst, item):
    """순수 함수: 새로운 리스트 반환"""
    return lst + [item]

def pure_calculate(a, b, operation):
    """순수 함수: 입력에만 의존, 동일 입력 -> 동일 출력"""
    operations = {
        'add': lambda x, y: x + y,
        'multiply': lambda x, y: x * y,
        'power': lambda x, y: x ** y
    }
    return operations.get(operation, lambda x, y: 0)(a, b)

# 테스트
print("비순수 함수:")
print(f"호출 1: {impure_increment()}")  # 1
print(f"호출 2: {impure_increment()}")  # 2
print(f"전역 변수: {counter}")

original_list = [1, 2, 3]
modified_list = impure_add_to_list(original_list, 4)
print(f"원본 리스트 수정됨: {original_list}")

print("\n순수 함수:")
value = 5
print(f"호출 1: {pure_increment(value)}")  # 6
print(f"호출 2: {pure_increment(value)}")  # 6
print(f"원본 값: {value}")  # 5 (변경되지 않음)

original_list = [1, 2, 3]
new_list = pure_add_to_list(original_list, 4)
print(f"원본 리스트: {original_list}")  # [1, 2, 3]
print(f"새 리스트: {new_list}")  # [1, 2, 3, 4]

print(f"계산 결과: {pure_calculate(2, 3, 'power')}")  # 8
```

### 7.2 함수 합성 (Function Composition)

```python
def compose(*functions):
    """함수 합성: f(g(h(x)))를 compose(f, g, h)(x)로 사용"""
    def composed_function(x):
        result = x
        for func in reversed(functions):
            result = func(result)
        return result
    return composed_function

def pipe(*functions):
    """파이프: h(g(f(x)))를 pipe(f, g, h)(x)로 사용"""
    def piped_function(x):
        result = x
        for func in functions:
            result = func(result)
        return result
    return piped_function

# 기본 변환 함수들
def add_ten(x):
    return x + 10

def multiply_by_two(x):
    return x * 2

def to_string(x):
    return str(x)

def add_exclamation(s):
    return s + "!"

print("\n=== 함수 합성 ===")

# 함수 합성 예제
transform1 = compose(add_exclamation, to_string, multiply_by_two, add_ten)
transform2 = pipe(add_ten, multiply_by_two, to_string, add_exclamation)

number = 5
result1 = transform1(number)  # ((5 + 10) * 2) -> "30" -> "30!"
result2 = transform2(number)  # 같은 결과

print(f"입력: {number}")
print(f"compose 결과: {result1}")
print(f"pipe 결과: {result2}")

# 실용적인 데이터 처리 파이프라인
def clean_text(text):
    """텍스트 정리"""
    return text.strip().lower()

def remove_punctuation(text):
    """구두점 제거"""
    import string
    return text.translate(str.maketrans('', '', string.punctuation))

def split_words(text):
    """단어 분할"""
    return text.split()

def filter_short_words(words):
    """짧은 단어 제거"""
    return [word for word in words if len(word) > 2]

def count_words(words):
    """단어 개수 계산"""
    return len(words)

# 텍스트 처리 파이프라인
text_processor = pipe(
    clean_text,
    remove_punctuation,
    split_words,
    filter_short_words,
    count_words
)

sample_text = "  Hello, World! This is a Sample Text.  "
word_count = text_processor(sample_text)
print(f"\n텍스트: '{sample_text}'")
print(f"긴 단어 개수: {word_count}")
```

### 7.3 커링 (Currying)

```python
def curry(func):
    """함수를 커링으로 변환"""
    def curried(*args, **kwargs):
        if len(args) + len(kwargs) >= func.__code__.co_argcount:
            return func(*args, **kwargs)
        return lambda *more_args, **more_kwargs: curried(*(args + more_args), **{**kwargs, **more_kwargs})
    return curried

def manual_curry_add(a):
    """수동 커링 예제"""
    def add_b(b):
        def add_c(c):
            return a + b + c
        return add_c
    return add_b

# 커링 적용
@curry
def add_three_numbers(a, b, c):
    return a + b + c

@curry
def multiply_three(a, b, c):
    return a * b * c

@curry
def power_with_base(base, exponent):
    return base ** exponent

print("\n=== 커링 (Currying) ===")

# 수동 커링 사용
manual_result = manual_curry_add(1)(2)(3)
print(f"수동 커링: {manual_result}")

# 자동 커링 사용
auto_result = add_three_numbers(1)(2)(3)
print(f"자동 커링: {auto_result}")

# 부분 적용 (Partial Application)
add_to_100 = add_three_numbers(100)
add_to_100_and_10 = add_to_100(10)
final_result = add_to_100_and_10(5)
print(f"부분 적용: {final_result}")

# 실용적인 예제
square = power_with_base(2)  # 제곱 함수
cube = power_with_base(3)    # 세제곱 함수

numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(square, numbers))
cubed_numbers = list(map(cube, numbers))

print(f"원본: {numbers}")
print(f"제곱: {squared_numbers}")
print(f"세제곱: {cubed_numbers}")

# 설정 가능한 함수들
double = multiply_three(2)
triple = multiply_three(3)

double_and_multiply_by_5 = double(5)  # 2 * 5 * x
triple_and_multiply_by_2 = triple(2)  # 3 * 2 * x

test_value = 4
print(f"\n{test_value}에 대한 연산:")
print(f"2 * 5 * {test_value} = {double_and_multiply_by_5(test_value)}")
print(f"3 * 2 * {test_value} = {triple_and_multiply_by_2(test_value)}")
```

## 8. 연습 문제

### 연습 1: 고급 데코레이터 만들기
함수 호출 횟수를 추적하고, 실행 시간을 측정하며, 결과를 캐싱하는 종합 데코레이터를 작성하세요.

### 연습 2: 함수형 데이터 처리
map, filter, reduce를 조합하여 복잡한 데이터 변환 파이프라인을 구현하세요.

### 연습 3: 재귀적 파일 탐색기
주어진 디렉토리에서 특정 확장자의 파일을 재귀적으로 찾는 함수를 작성하세요.

### 연습 4: 클로저 기반 상태 관리
클로저를 활용하여 간단한 상태 관리 시스템을 구현하세요.

## 정리

이 챕터에서 학습한 내용:

1. **가변 인수**: *args와 **kwargs를 활용한 유연한 함수 설계
2. **람다 함수**: 간결한 익명 함수 작성과 활용
3. **고차 함수**: map, filter, reduce를 이용한 함수형 프로그래밍
4. **데코레이터**: 함수의 동작을 확장하는 패턴
5. **클로저**: 외부 변수를 캡처하는 내부 함수
6. **재귀 함수**: 자기 자신을 호출하는 함수와 최적화 기법
7. **함수형 패턴**: 순수 함수, 함수 합성, 커링 등

다음 챕터에서는 파일 처리와 다양한 데이터 형식을 다루는 방법을 학습하겠습니다.

### 핵심 포인트
- 함수는 일급 객체로서 다양한 방식으로 조작할 수 있습니다
- 데코레이터는 코드의 재사용성과 가독성을 높입니다
- 클로저는 상태를 캡처하는 강력한 도구입니다
- 함수형 프로그래밍 패턴으로 더 안전하고 예측 가능한 코드를 작성할 수 있습니다
- 적절한 추상화는 코드의 유지보수성을 크게 향상시킵니다 