# Chapter 9: 이터레이터와 제너레이터

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 이터레이터와 이터러블의 개념을 이해하고 구분하기
- 커스텀 이터레이터를 구현하고 활용하기
- 제너레이터 함수와 제너레이터 표현식 사용하기
- yield 키워드의 다양한 활용법 이해하기
- 메모리 효율적인 데이터 처리 구현하기
- itertools 모듈을 활용한 고급 이터레이터 패턴 사용하기
- 비동기 이터레이터와 제너레이터 기초 이해하기

## 1. 이터레이터와 이터러블 기초

### 1.1 개념 이해

```python
print("=== 이터레이터와 이터러블 기초 ===")

def basic_iterator_concepts():
    """이터레이터와 이터러블의 기본 개념"""
    
    print("1. 이터러블(Iterable)과 이터레이터(Iterator) 구분:")
    
    # 이터러블: __iter__ 메서드를 가진 객체
    my_list = [1, 2, 3, 4, 5]
    my_string = "Hello"
    my_dict = {"a": 1, "b": 2}
    
    print(f"  리스트가 이터러블인가? {hasattr(my_list, '__iter__')}")
    print(f"  문자열이 이터러블인가? {hasattr(my_string, '__iter__')}")
    print(f"  딕셔너리가 이터러블인가? {hasattr(my_dict, '__iter__')}")
    
    # 이터러블에서 이터레이터 얻기
    list_iterator = iter(my_list)
    string_iterator = iter(my_string)
    dict_iterator = iter(my_dict)
    
    print(f"\n  리스트 이터레이터: {type(list_iterator)}")
    print(f"  문자열 이터레이터: {type(string_iterator)}")
    print(f"  딕셔너리 이터레이터: {type(dict_iterator)}")
    
    # 이터레이터: __next__ 메서드를 가진 객체
    print(f"\n  이터레이터가 __next__ 메서드를 가지는가? {hasattr(list_iterator, '__next__')}")
    
    # 수동으로 이터레이션
    print(f"\n2. 수동 이터레이션:")
    print(f"  next(list_iterator): {next(list_iterator)}")
    print(f"  next(list_iterator): {next(list_iterator)}")
    print(f"  next(string_iterator): {next(string_iterator)}")
    print(f"  next(dict_iterator): {next(dict_iterator)}")

basic_iterator_concepts()

def iteration_protocol():
    """이터레이션 프로토콜 상세 설명"""
    
    print(f"\n3. 이터레이션 프로토콜:")
    
    data = [10, 20, 30]
    iterator = iter(data)
    
    print(f"  원본 데이터: {data}")
    print(f"  이터레이터 생성: {iterator}")
    
    # StopIteration 예외 처리
    try:
        while True:
            value = next(iterator)
            print(f"    next() 호출 결과: {value}")
    except StopIteration:
        print("    StopIteration 예외 발생 - 이터레이션 완료")
    
    print(f"\n4. for 문의 내부 동작:")
    print("  for 문은 다음과 같이 동작합니다:")
    print("  1. iter() 함수로 이터레이터 생성")
    print("  2. next() 함수로 값을 하나씩 가져옴")
    print("  3. StopIteration 예외가 발생하면 반복 종료")
    
    # for 문과 동일한 동작을 수동으로 구현
    data = ['a', 'b', 'c']
    iterator = iter(data)
    
    print(f"\n  수동 for 문 구현:")
    try:
        while True:
            item = next(iterator)
            print(f"    처리: {item}")
    except StopIteration:
        print("    반복 완료")

iteration_protocol()
```

### 1.2 내장 이터러블과 이터레이터

```python
print("\n=== 내장 이터러블과 이터레이터 ===")

def builtin_iterables():
    """내장 이터러블들의 특징"""
    
    print("1. 다양한 내장 이터러블:")
    
    # 시퀀스 타입
    my_list = [1, 2, 3]
    my_tuple = (4, 5, 6)
    my_string = "abc"
    my_range = range(3)
    
    # 매핑 타입
    my_dict = {"x": 1, "y": 2}
    
    # 집합 타입
    my_set = {7, 8, 9}
    
    iterables = [
        ("리스트", my_list),
        ("튜플", my_tuple),
        ("문자열", my_string),
        ("range", my_range),
        ("딕셔너리", my_dict),
        ("집합", my_set)
    ]
    
    for name, iterable in iterables:
        print(f"  {name}: {list(iterable)}")
    
    print(f"\n2. 딕셔너리의 다양한 이터레이터:")
    sample_dict = {"name": "Alice", "age": 30, "city": "Seoul"}
    
    print(f"  키 이터레이션: {list(sample_dict)}")  # 기본적으로 키
    print(f"  키 이터레이션: {list(sample_dict.keys())}")
    print(f"  값 이터레이션: {list(sample_dict.values())}")
    print(f"  항목 이터레이션: {list(sample_dict.items())}")

builtin_iterables()

def special_iterators():
    """특별한 이터레이터들"""
    
    print(f"\n3. 특별한 이터레이터들:")
    
    # enumerate
    data = ['apple', 'banana', 'cherry']
    print(f"  enumerate: {list(enumerate(data))}")
    print(f"  enumerate(start=1): {list(enumerate(data, start=1))}")
    
    # zip
    names = ['Alice', 'Bob', 'Charlie']
    ages = [25, 30, 35]
    cities = ['Seoul', 'Busan', 'Daegu']
    
    print(f"  zip: {list(zip(names, ages))}")
    print(f"  zip (3개): {list(zip(names, ages, cities))}")
    
    # reversed
    print(f"  reversed: {list(reversed(data))}")
    
    # sorted
    numbers = [3, 1, 4, 1, 5]
    print(f"  sorted: {list(sorted(numbers))}")
    print(f"  sorted(reverse=True): {list(sorted(numbers, reverse=True))}")
    
    # filter와 map
    numbers = [1, 2, 3, 4, 5, 6]
    print(f"  filter(짝수): {list(filter(lambda x: x % 2 == 0, numbers))}")
    print(f"  map(제곱): {list(map(lambda x: x ** 2, numbers))}")

special_iterators()

def iterator_consumption():
    """이터레이터 소비와 재사용"""
    
    print(f"\n4. 이터레이터 소비와 재사용:")
    
    data = [1, 2, 3, 4, 5]
    iterator = iter(data)
    
    print(f"  원본 데이터: {data}")
    print(f"  첫 번째 소비: {list(iterator)}")
    print(f"  두 번째 소비: {list(iterator)}")  # 빈 리스트
    
    print(f"\n  이터레이터는 한 번만 사용 가능합니다!")
    print(f"  재사용하려면 새로 생성해야 합니다:")
    
    iterator = iter(data)  # 새로 생성
    print(f"  새 이터레이터: {list(iterator)}")
    
    # 이터러블은 여러 번 사용 가능
    print(f"\n  이터러블은 여러 번 사용 가능:")
    print(f"  첫 번째: {list(data)}")
    print(f"  두 번째: {list(data)}")

iterator_consumption()
```

## 2. 커스텀 이터레이터 구현

### 2.1 기본 이터레이터 클래스

```python
print("\n=== 커스텀 이터레이터 구현 ===")

class NumberRange:
    """숫자 범위를 나타내는 이터레이터"""
    
    def __init__(self, start, end, step=1):
        self.start = start
        self.end = end
        self.step = step
        self.current = start
    
    def __iter__(self):
        """이터러블 프로토콜: 자기 자신(이터레이터)을 반환"""
        return self
    
    def __next__(self):
        """이터레이터 프로토콜: 다음 값을 반환"""
        if self.current >= self.end:
            raise StopIteration
        
        value = self.current
        self.current += self.step
        return value

def demonstrate_custom_iterator():
    """커스텀 이터레이터 사용 예제"""
    
    print("1. 기본 커스텀 이터레이터:")
    
    # NumberRange 사용
    num_range = NumberRange(1, 6)
    print(f"  NumberRange(1, 6): {list(num_range)}")
    
    # step이 있는 경우
    num_range_step = NumberRange(0, 10, 2)
    print(f"  NumberRange(0, 10, 2): {list(num_range_step)}")
    
    # for 문에서 사용
    print(f"  for 문에서 사용:")
    for num in NumberRange(5, 8):
        print(f"    값: {num}")

demonstrate_custom_iterator()

class FibonacciIterator:
    """피보나치 수열 이터레이터"""
    
    def __init__(self, max_count=None):
        self.max_count = max_count
        self.count = 0
        self.a, self.b = 0, 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.max_count and self.count >= self.max_count:
            raise StopIteration
        
        value = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return value

class InfiniteCounter:
    """무한 카운터 이터레이터"""
    
    def __init__(self, start=0, step=1):
        self.current = start
        self.step = step
    
    def __iter__(self):
        return self
    
    def __next__(self):
        value = self.current
        self.current += self.step
        return value

def demonstrate_advanced_iterators():
    """고급 커스텀 이터레이터 예제"""
    
    print(f"\n2. 고급 커스텀 이터레이터:")
    
    # 피보나치 수열 (제한된 개수)
    fib = FibonacciIterator(10)
    print(f"  피보나치 수열 (10개): {list(fib)}")
    
    # 무한 카운터 (처음 5개만)
    counter = InfiniteCounter(10, 3)
    result = []
    for i, value in enumerate(counter):
        if i >= 5:  # 처음 5개만
            break
        result.append(value)
    print(f"  무한 카운터 (처음 5개): {result}")

demonstrate_advanced_iterators()

class FileLineIterator:
    """파일을 한 줄씩 읽는 이터레이터"""
    
    def __init__(self, filename):
        self.filename = filename
        self.file = None
    
    def __iter__(self):
        self.file = open(self.filename, 'r', encoding='utf-8')
        return self
    
    def __next__(self):
        if self.file is None:
            raise StopIteration
        
        line = self.file.readline()
        if not line:
            self.file.close()
            self.file = None
            raise StopIteration
        
        return line.rstrip('\n')  # 줄바꿈 제거
    
    def __del__(self):
        """소멸자에서 파일 닫기"""
        if self.file and not self.file.closed:
            self.file.close()

def demonstrate_file_iterator():
    """파일 이터레이터 예제"""
    
    print(f"\n3. 파일 이터레이터:")
    
    # 테스트용 파일 생성
    test_filename = "temp_test_file.txt"
    with open(test_filename, 'w', encoding='utf-8') as f:
        f.write("첫 번째 줄\n두 번째 줄\n세 번째 줄\n")
    
    # 파일 이터레이터 사용
    file_iter = FileLineIterator(test_filename)
    print(f"  파일 내용:")
    for line_num, line in enumerate(file_iter, 1):
        print(f"    라인 {line_num}: {line}")
    
    # 파일 정리
    import os
    os.remove(test_filename)

demonstrate_file_iterator()
```

### 2.2 이터러블 클래스 vs 이터레이터 클래스

```python
print("\n=== 이터러블 vs 이터레이터 클래스 ===")

class NumberSequence:
    """이터러블 클래스 (재사용 가능)"""
    
    def __init__(self, start, end, step=1):
        self.start = start
        self.end = end
        self.step = step
    
    def __iter__(self):
        """새로운 이터레이터를 반환"""
        return NumberSequenceIterator(self.start, self.end, self.step)

class NumberSequenceIterator:
    """별도의 이터레이터 클래스"""
    
    def __init__(self, start, end, step):
        self.current = start
        self.end = end
        self.step = step
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += self.step
        return value

def demonstrate_iterable_vs_iterator():
    """이터러블과 이터레이터 클래스 비교"""
    
    print("1. 이터러블 클래스 (재사용 가능):")
    
    # 이터러블 클래스는 여러 번 사용 가능
    sequence = NumberSequence(1, 5)
    
    print(f"  첫 번째 사용: {list(sequence)}")
    print(f"  두 번째 사용: {list(sequence)}")
    
    # 여러 이터레이터 동시 사용 가능
    iter1 = iter(sequence)
    iter2 = iter(sequence)
    
    print(f"  이터레이터 1 (2개): {[next(iter1), next(iter1)]}")
    print(f"  이터레이터 2 (1개): {[next(iter2)]}")
    print(f"  이터레이터 1 (나머지): {list(iter1)}")
    print(f"  이터레이터 2 (나머지): {list(iter2)}")

demonstrate_iterable_vs_iterator()

class SmartContainer:
    """스마트 컨테이너 - 다양한 이터레이션 방식 지원"""
    
    def __init__(self, data):
        self.data = list(data)
    
    def __iter__(self):
        """기본 이터레이션"""
        return iter(self.data)
    
    def reverse_iter(self):
        """역순 이터레이션"""
        return reversed(self.data)
    
    def enumerate_iter(self, start=0):
        """인덱스와 함께 이터레이션"""
        return enumerate(self.data, start)
    
    def filter_iter(self, predicate):
        """조건에 맞는 요소만 이터레이션"""
        return filter(predicate, self.data)
    
    def chunk_iter(self, size):
        """청크 단위로 이터레이션"""
        for i in range(0, len(self.data), size):
            yield self.data[i:i+size]

def demonstrate_smart_container():
    """스마트 컨테이너 사용 예제"""
    
    print(f"\n2. 스마트 컨테이너:")
    
    container = SmartContainer([1, 2, 3, 4, 5, 6, 7, 8])
    
    print(f"  기본 이터레이션: {list(container)}")
    print(f"  역순 이터레이션: {list(container.reverse_iter())}")
    print(f"  인덱스와 함께: {list(container.enumerate_iter(1))}")
    print(f"  짝수만 필터링: {list(container.filter_iter(lambda x: x % 2 == 0))}")
    print(f"  청크 단위 (크기 3): {list(container.chunk_iter(3))}")

demonstrate_smart_container()
```

## 3. 제너레이터 함수

### 3.1 기본 제너레이터 함수

```python
print("\n=== 제너레이터 함수 ===")

def simple_generator():
    """가장 간단한 제너레이터 함수"""
    print("  제너레이터 시작")
    yield 1
    print("  첫 번째 yield 이후")
    yield 2
    print("  두 번째 yield 이후")
    yield 3
    print("  제너레이터 종료")

def demonstrate_basic_generator():
    """기본 제너레이터 동작 확인"""
    
    print("1. 기본 제너레이터 함수:")
    
    # 제너레이터 객체 생성
    gen = simple_generator()
    print(f"  제너레이터 객체: {gen}")
    print(f"  타입: {type(gen)}")
    
    # 수동으로 값 가져오기
    print(f"\n  수동 실행:")
    print(f"    첫 번째 next(): {next(gen)}")
    print(f"    두 번째 next(): {next(gen)}")
    print(f"    세 번째 next(): {next(gen)}")
    
    try:
        print(f"    네 번째 next(): {next(gen)}")
    except StopIteration:
        print(f"    StopIteration 발생")
    
    # for 문으로 사용
    print(f"\n  for 문으로 사용:")
    for value in simple_generator():
        print(f"    값: {value}")

demonstrate_basic_generator()

def countdown(n):
    """카운트다운 제너레이터"""
    while n > 0:
        yield n
        n -= 1
    yield "발사!"

def fibonacci_generator(max_count=None):
    """피보나치 수열 제너레이터"""
    a, b = 0, 1
    count = 0
    
    while max_count is None or count < max_count:
        yield a
        a, b = b, a + b
        count += 1

def squares(max_num):
    """제곱수 제너레이터"""
    for i in range(1, max_num + 1):
        yield i ** 2

def demonstrate_practical_generators():
    """실용적인 제너레이터 예제"""
    
    print(f"\n2. 실용적인 제너레이터들:")
    
    # 카운트다운
    print(f"  카운트다운: {list(countdown(5))}")
    
    # 피보나치 수열
    print(f"  피보나치 (10개): {list(fibonacci_generator(10))}")
    
    # 제곱수
    print(f"  제곱수 (1-5): {list(squares(5))}")

demonstrate_practical_generators()
```

### 3.2 고급 제너레이터 패턴

```python
print("\n=== 고급 제너레이터 패턴 ===")

def infinite_sequence(start=0, step=1):
    """무한 시퀀스 제너레이터"""
    current = start
    while True:
        yield current
        current += step

def take(iterable, n):
    """이터러블에서 처음 n개 요소를 가져오는 제너레이터"""
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item

def cycle(iterable):
    """이터러블을 무한히 반복하는 제너레이터"""
    saved = []
    for item in iterable:
        yield item
        saved.append(item)
    
    while saved:
        for item in saved:
            yield item

def demonstrate_infinite_generators():
    """무한 제너레이터 활용"""
    
    print("3. 무한 제너레이터:")
    
    # 무한 시퀀스에서 처음 5개
    infinite_nums = infinite_sequence(10, 3)
    first_five = list(take(infinite_nums, 5))
    print(f"  무한 시퀀스 (처음 5개): {first_five}")
    
    # 순환 제너레이터
    colors = ['red', 'green', 'blue']
    color_cycle = cycle(colors)
    first_ten_colors = list(take(color_cycle, 10))
    print(f"  색상 순환 (10개): {first_ten_colors}")

demonstrate_infinite_generators()

def file_processor(filename):
    """파일을 처리하는 제너레이터"""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            for line_num, line in enumerate(file, 1):
                # 빈 줄이나 주석 제외
                line = line.strip()
                if line and not line.startswith('#'):
                    yield line_num, line
    except FileNotFoundError:
        print(f"  파일을 찾을 수 없습니다: {filename}")
        return

def data_pipeline(*processors):
    """데이터 파이프라인 제너레이터"""
    def pipeline(data):
        result = data
        for processor in processors:
            result = processor(result)
        return result
    return pipeline

def demonstrate_generator_pipeline():
    """제너레이터 파이프라인 예제"""
    
    print(f"\n4. 제너레이터 파이프라인:")
    
    # 테스트 데이터 생성
    test_file = "temp_data.txt"
    with open(test_file, 'w', encoding='utf-8') as f:
        f.write("# 설정 파일\n")
        f.write("name=Alice\n")
        f.write("age=30\n")
        f.write("\n")  # 빈 줄
        f.write("city=Seoul\n")
        f.write("# 주석\n")
        f.write("country=Korea\n")
    
    # 파일 처리 파이프라인
    def parse_config_line(line_data):
        """설정 라인을 파싱하는 제너레이터"""
        for line_num, line in line_data:
            if '=' in line:
                key, value = line.split('=', 1)
                yield line_num, key.strip(), value.strip()
    
    def filter_valid_config(config_data):
        """유효한 설정만 필터링하는 제너레이터"""
        for line_num, key, value in config_data:
            if key and value:  # 키와 값이 모두 있는 경우만
                yield line_num, key, value
    
    # 파이프라인 실행
    print(f"  파일 처리 파이프라인:")
    file_data = file_processor(test_file)
    parsed_data = parse_config_line(file_data)
    valid_config = filter_valid_config(parsed_data)
    
    for line_num, key, value in valid_config:
        print(f"    라인 {line_num}: {key} = {value}")
    
    # 파일 정리
    import os
    os.remove(test_file)

demonstrate_generator_pipeline()

def sliding_window(iterable, window_size):
    """슬라이딩 윈도우 제너레이터"""
    iterator = iter(iterable)
    window = []
    
    # 초기 윈도우 채우기
    for _ in range(window_size):
        try:
            window.append(next(iterator))
        except StopIteration:
            return
    
    yield tuple(window)
    
    # 슬라이딩
    for item in iterator:
        window.pop(0)
        window.append(item)
        yield tuple(window)

def batch_generator(iterable, batch_size):
    """배치 제너레이터"""
    iterator = iter(iterable)
    while True:
        batch = list(take(iterator, batch_size))
        if not batch:
            break
        yield batch

def demonstrate_window_generators():
    """윈도우와 배치 제너레이터"""
    
    print(f"\n5. 윈도우와 배치 제너레이터:")
    
    data = range(1, 11)  # 1부터 10까지
    
    # 슬라이딩 윈도우
    print(f"  슬라이딩 윈도우 (크기 3):")
    for window in sliding_window(data, 3):
        print(f"    {window}")
    
    # 배치 처리
    print(f"\n  배치 처리 (크기 4):")
    for batch in batch_generator(range(1, 13), 4):
        print(f"    배치: {batch}")

demonstrate_window_generators()
```

### 3.3 제너레이터 표현식

```python
print("\n=== 제너레이터 표현식 ===")

def demonstrate_generator_expressions():
    """제너레이터 표현식 사용법"""
    
    print("6. 제너레이터 표현식:")
    
    # 기본 제너레이터 표현식
    numbers = range(1, 6)
    squared_gen = (x ** 2 for x in numbers)
    
    print(f"  제너레이터 표현식: {squared_gen}")
    print(f"  타입: {type(squared_gen)}")
    print(f"  값들: {list(squared_gen)}")
    
    # 조건부 제너레이터 표현식
    even_squares = (x ** 2 for x in range(1, 11) if x % 2 == 0)
    print(f"  짝수의 제곱: {list(even_squares)}")
    
    # 중첩 제너레이터 표현식
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    flattened = (item for row in matrix for item in row)
    print(f"  행렬 평면화: {list(flattened)}")
    
    # 함수와 함께 사용
    words = ['hello', 'world', 'python', 'generator']
    word_lengths = (len(word) for word in words)
    print(f"  단어 길이들: {list(word_lengths)}")

demonstrate_generator_expressions()

def demonstrate_memory_efficiency():
    """메모리 효율성 비교"""
    
    print(f"\n7. 메모리 효율성 비교:")
    
    import sys
    
    # 리스트 컴프리헨션 vs 제너레이터 표현식
    size = 1000
    
    # 리스트 컴프리헨션
    list_comp = [x ** 2 for x in range(size)]
    list_size = sys.getsizeof(list_comp)
    
    # 제너레이터 표현식
    gen_exp = (x ** 2 for x in range(size))
    gen_size = sys.getsizeof(gen_exp)
    
    print(f"  데이터 크기: {size}")
    print(f"  리스트 컴프리헨션 메모리: {list_size} bytes")
    print(f"  제너레이터 표현식 메모리: {gen_size} bytes")
    print(f"  메모리 차이: {list_size - gen_size} bytes")
    print(f"  제너레이터가 {list_size // gen_size}배 더 효율적")

demonstrate_memory_efficiency()

def generator_pipeline_example():
    """제너레이터 표현식 파이프라인"""
    
    print(f"\n8. 제너레이터 파이프라인:")
    
    # 원본 데이터
    text_data = [
        "Hello World",
        "Python Programming",
        "Generator Expressions",
        "Memory Efficient",
        "Data Processing"
    ]
    
    # 파이프라인: 소문자 → 단어 분리 → 길이 5 이상 → 정렬
    pipeline = sorted(
        word
        for line in text_data
        for word in line.lower().split()
        if len(word) >= 5
    )
    
    print(f"  원본 데이터: {text_data}")
    print(f"  파이프라인 결과: {pipeline}")

generator_pipeline_example()
```

## 4. yield 키워드 고급 활용

### 4.1 양방향 제너레이터 (send 메서드)

```python
print("\n=== yield 키워드 고급 활용 ===")

def accumulator():
    """값을 누적하는 제너레이터"""
    total = 0
    while True:
        value = yield total
        if value is not None:
            total += value

def demonstrate_generator_send():
    """제너레이터 send 메서드 사용"""
    
    print("1. 양방향 제너레이터 (send 메서드):")
    
    acc = accumulator()
    
    # 제너레이터 시작 (첫 번째 yield까지 실행)
    print(f"  초기값: {next(acc)}")
    
    # 값 전송하고 결과 받기
    print(f"  10 전송: {acc.send(10)}")
    print(f"  20 전송: {acc.send(20)}")
    print(f"  5 전송: {acc.send(5)}")
    
    # None 전송 (값 추가하지 않음)
    print(f"  None 전송: {acc.send(None)}")

demonstrate_generator_send()

def calculator():
    """계산기 제너레이터"""
    result = 0
    while True:
        expression = yield result
        if expression is None:
            continue
        
        try:
            # 간단한 수식 평가
            if '+' in expression:
                a, b = map(float, expression.split('+'))
                result = a + b
            elif '-' in expression:
                a, b = map(float, expression.split('-'))
                result = a - b
            elif '*' in expression:
                a, b = map(float, expression.split('*'))
                result = a * b
            elif '/' in expression:
                a, b = map(float, expression.split('/'))
                result = a / b if b != 0 else float('inf')
            else:
                result = float(expression)
        except:
            result = 0  # 오류 시 0으로 설정

def demonstrate_calculator_generator():
    """계산기 제너레이터 예제"""
    
    print(f"\n2. 계산기 제너레이터:")
    
    calc = calculator()
    print(f"  초기값: {next(calc)}")
    
    expressions = ["10", "5+3", "20-7", "4*6", "15/3"]
    
    for expr in expressions:
        result = calc.send(expr)
        print(f"  '{expr}' = {result}")

demonstrate_calculator_generator()
```

### 4.2 예외 처리와 제너레이터

```python
def robust_processor():
    """견고한 데이터 처리 제너레이터"""
    processed_count = 0
    error_count = 0
    
    try:
        while True:
            data = yield (processed_count, error_count)
            
            try:
                # 데이터 처리 시뮬레이션
                if data is None:
                    continue
                
                if isinstance(data, str) and data.isdigit():
                    processed_value = int(data) * 2
                    processed_count += 1
                    print(f"    처리 완료: '{data}' → {processed_value}")
                else:
                    raise ValueError(f"유효하지 않은 데이터: {data}")
                    
            except ValueError as e:
                error_count += 1
                print(f"    오류: {e}")
                
    except GeneratorExit:
        print(f"  제너레이터 종료 - 처리: {processed_count}, 오류: {error_count}")

def demonstrate_generator_exceptions():
    """제너레이터 예외 처리"""
    
    print(f"\n3. 제너레이터 예외 처리:")
    
    processor = robust_processor()
    print(f"  초기 상태: {next(processor)}")
    
    test_data = ["10", "20", "invalid", "30", None, "40", "abc"]
    
    for data in test_data:
        stats = processor.send(data)
        print(f"    통계: 처리 {stats[0]}개, 오류 {stats[1]}개")
    
    # 제너레이터 정리
    processor.close()

demonstrate_generator_exceptions()

def generator_with_cleanup():
    """정리 작업이 있는 제너레이터"""
    print("  리소스 초기화")
    resource = {"connections": [], "files": []}
    
    try:
        while True:
            action = yield len(resource["connections"])
            
            if action == "connect":
                resource["connections"].append(f"conn_{len(resource['connections'])}")
                print(f"    연결 생성: {resource['connections'][-1]}")
            elif action == "disconnect":
                if resource["connections"]:
                    conn = resource["connections"].pop()
                    print(f"    연결 해제: {conn}")
            
    except GeneratorExit:
        print(f"  리소스 정리 중...")
        for conn in resource["connections"]:
            print(f"    연결 정리: {conn}")
        print(f"  정리 완료")

def demonstrate_generator_cleanup():
    """제너레이터 정리 작업"""
    
    print(f"\n4. 제너레이터 정리 작업:")
    
    resource_manager = generator_with_cleanup()
    print(f"  초기 연결 수: {next(resource_manager)}")
    
    actions = ["connect", "connect", "disconnect", "connect"]
    
    for action in actions:
        count = resource_manager.send(action)
        print(f"    현재 연결 수: {count}")
    
    # 제너레이터 종료 시 정리 작업 실행
    resource_manager.close()

demonstrate_generator_cleanup()
```

### 4.3 yield from과 제너레이터 위임

```python
print("\n=== yield from과 제너레이터 위임 ===")

def subgenerator():
    """하위 제너레이터"""
    print("    하위 제너레이터 시작")
    yield "A"
    yield "B"
    yield "C"
    print("    하위 제너레이터 종료")
    return "하위 제너레이터 완료"

def delegating_generator():
    """위임하는 제너레이터 (yield from 사용)"""
    print("  위임 제너레이터 시작")
    yield "시작"
    
    # yield from으로 다른 제너레이터에 위임
    result = yield from subgenerator()
    print(f"  하위 제너레이터 반환값: {result}")
    
    yield "종료"
    print("  위임 제너레이터 종료")

def manual_delegation():
    """수동 위임 (yield from 없이)"""
    print("  수동 위임 시작")
    yield "시작"
    
    # 수동으로 위임
    for value in subgenerator():
        yield value
    
    yield "종료"
    print("  수동 위임 종료")

def demonstrate_yield_from():
    """yield from 사용 예제"""
    
    print("5. yield from 사용:")
    
    print(f"  yield from 사용:")
    for value in delegating_generator():
        print(f"    받은 값: {value}")
    
    print(f"\n  수동 위임:")
    for value in manual_delegation():
        print(f"    받은 값: {value}")

demonstrate_yield_from()

def nested_data_processor():
    """중첩 데이터 처리 제너레이터"""
    
    def process_numbers(numbers):
        """숫자 처리 하위 제너레이터"""
        for num in numbers:
            if isinstance(num, (int, float)):
                yield num * 2
    
    def process_strings(strings):
        """문자열 처리 하위 제너레이터"""
        for s in strings:
            if isinstance(s, str):
                yield s.upper()
    
    def process_mixed_data(data):
        """혼합 데이터 처리"""
        for item in data:
            if isinstance(item, (int, float)):
                yield from process_numbers([item])
            elif isinstance(item, str):
                yield from process_strings([item])
            elif isinstance(item, (list, tuple)):
                yield from process_mixed_data(item)

    # 테스트 데이터
    mixed_data = [1, "hello", [2, 3], "world", (4, "python"), 5]
    
    yield from process_mixed_data(mixed_data)

def demonstrate_nested_processing():
    """중첩 처리 예제"""
    
    print(f"\n6. 중첩 데이터 처리:")
    
    processor = nested_data_processor()
    results = list(processor)
    print(f"  처리 결과: {results}")

demonstrate_nested_processing()
```

## 5. itertools 모듈 활용

### 5.1 무한 이터레이터

```python
print("\n=== itertools 모듈 활용 ===")

import itertools

def demonstrate_infinite_iterators():
    """무한 이터레이터들"""
    
    print("1. 무한 이터레이터:")
    
    # count: 무한 카운터
    counter = itertools.count(10, 3)  # 10부터 3씩 증가
    first_five = list(itertools.islice(counter, 5))
    print(f"  count(10, 3) 처음 5개: {first_five}")
    
    # cycle: 순환 반복
    colors = ['red', 'green', 'blue']
    color_cycle = itertools.cycle(colors)
    first_ten = list(itertools.islice(color_cycle, 10))
    print(f"  cycle(['red', 'green', 'blue']) 10개: {first_ten}")
    
    # repeat: 값 반복
    repeated = itertools.repeat('hello', 5)
    print(f"  repeat('hello', 5): {list(repeated)}")
    
    # repeat (무한)
    infinite_repeat = itertools.repeat('x')
    first_three = list(itertools.islice(infinite_repeat, 3))
    print(f"  repeat('x') 처음 3개: {first_three}")

demonstrate_infinite_iterators()

def demonstrate_terminating_iterators():
    """종료되는 이터레이터들"""
    
    print(f"\n2. 종료되는 이터레이터:")
    
    # accumulate: 누적 연산
    numbers = [1, 2, 3, 4, 5]
    accumulated = list(itertools.accumulate(numbers))
    print(f"  accumulate([1,2,3,4,5]): {accumulated}")
    
    # accumulate with operator
    import operator
    accumulated_mul = list(itertools.accumulate(numbers, operator.mul))
    print(f"  accumulate (곱셈): {accumulated_mul}")
    
    # chain: 여러 이터러블 연결
    list1 = [1, 2, 3]
    list2 = ['a', 'b', 'c']
    list3 = [10, 20]
    chained = list(itertools.chain(list1, list2, list3))
    print(f"  chain([1,2,3], ['a','b','c'], [10,20]): {chained}")
    
    # compress: 조건에 따른 필터링
    data = ['a', 'b', 'c', 'd', 'e']
    selectors = [1, 0, 1, 0, 1]
    compressed = list(itertools.compress(data, selectors))
    print(f"  compress(['a','b','c','d','e'], [1,0,1,0,1]): {compressed}")
    
    # dropwhile: 조건이 거짓이 될 때까지 버리기
    numbers = [1, 3, 5, 8, 9, 10, 12]
    dropped = list(itertools.dropwhile(lambda x: x % 2 == 1, numbers))
    print(f"  dropwhile(홀수): {dropped}")
    
    # takewhile: 조건이 참인 동안만 가져오기
    taken = list(itertools.takewhile(lambda x: x < 10, numbers))
    print(f"  takewhile(<10): {taken}")

demonstrate_terminating_iterators()
```

### 5.2 조합 이터레이터

```python
def demonstrate_combinatorial_iterators():
    """조합 이터레이터들"""
    
    print(f"\n3. 조합 이터레이터:")
    
    data = ['A', 'B', 'C', 'D']
    
    # product: 곱집합
    pairs = list(itertools.product(data[:2], repeat=2))
    print(f"  product(['A','B'], repeat=2): {pairs}")
    
    different_sets = list(itertools.product(['X', 'Y'], [1, 2]))
    print(f"  product(['X','Y'], [1,2]): {different_sets}")
    
    # permutations: 순열
    perms = list(itertools.permutations(data[:3]))
    print(f"  permutations(['A','B','C']): {perms}")
    
    # permutations with length
    perms_2 = list(itertools.permutations(data[:3], 2))
    print(f"  permutations(['A','B','C'], 2): {perms_2}")
    
    # combinations: 조합
    combs = list(itertools.combinations(data, 2))
    print(f"  combinations(['A','B','C','D'], 2): {combs}")
    
    # combinations_with_replacement: 중복 조합
    combs_rep = list(itertools.combinations_with_replacement(data[:3], 2))
    print(f"  combinations_with_replacement(['A','B','C'], 2): {combs_rep}")

demonstrate_combinatorial_iterators()

def real_world_itertools_examples():
    """실용적인 itertools 예제"""
    
    print(f"\n4. 실용적인 itertools 활용:")
    
    # 배치 처리
    def batch_data(iterable, batch_size):
        """데이터를 배치로 나누기"""
        iterator = iter(iterable)
        while True:
            batch = list(itertools.islice(iterator, batch_size))
            if not batch:
                break
            yield batch
    
    data = range(1, 16)  # 1부터 15까지
    batches = list(batch_data(data, 4))
    print(f"  배치 처리 (크기 4): {batches}")
    
    # 그룹화
    data = [
        ('A', 1), ('A', 2), ('B', 3), ('B', 4), ('B', 5), ('C', 6)
    ]
    
    grouped = []
    for key, group in itertools.groupby(data, key=lambda x: x[0]):
        group_list = list(group)
        grouped.append((key, group_list))
    
    print(f"  그룹화: {grouped}")
    
    # 슬라이딩 윈도우 (itertools 버전)
    def sliding_window_itertools(iterable, window_size):
        """itertools를 사용한 슬라이딩 윈도우"""
        iterators = itertools.tee(iterable, window_size)
        
        for i, iterator in enumerate(iterators):
            # 각 이터레이터를 i만큼 앞으로 진행
            for _ in range(i):
                next(iterator, None)
        
        return zip(*iterators)
    
    data = range(1, 8)
    windows = list(sliding_window_itertools(data, 3))
    print(f"  슬라이딩 윈도우 (크기 3): {windows}")
    
    # 평면화 (flatten)
    nested_data = [[1, 2], [3, 4, 5], [6], [7, 8, 9]]
    flattened = list(itertools.chain.from_iterable(nested_data))
    print(f"  평면화: {flattened}")

real_world_itertools_examples()
```

### 5.3 고급 itertools 패턴

```python
def advanced_itertools_patterns():
    """고급 itertools 패턴"""
    
    print(f"\n5. 고급 itertools 패턴:")
    
    # 라운드 로빈
    def roundrobin(*iterables):
        """라운드 로빈 방식으로 이터러블들을 처리"""
        iterators = [iter(it) for it in iterables]
        while iterators:
            for i, iterator in enumerate(iterators[:]):
                try:
                    yield next(iterator)
                except StopIteration:
                    iterators.remove(iterator)
    
    list1 = [1, 2, 3]
    list2 = ['a', 'b', 'c', 'd']
    list3 = [10, 20]
    
    result = list(roundrobin(list1, list2, list3))
    print(f"  라운드 로빈: {result}")
    
    # 분할 (partition)
    def partition(predicate, iterable):
        """조건에 따라 이터러블을 두 부분으로 분할"""
        t1, t2 = itertools.tee(iterable)
        return itertools.filterfalse(predicate, t1), filter(predicate, t2)
    
    numbers = range(1, 11)
    even, odd = partition(lambda x: x % 2 == 0, numbers)
    print(f"  짝수: {list(even)}")
    print(f"  홀수: {list(odd)}")
    
    # 고유 값만 유지 (중복 제거)
    def unique_everseen(iterable, key=None):
        """순서를 유지하면서 중복 제거"""
        seen = set()
        seen_add = seen.add
        if key is None:
            for element in itertools.filterfalse(seen.__contains__, iterable):
                seen_add(element)
                yield element
        else:
            for element in iterable:
                k = key(element)
                if k not in seen:
                    seen_add(k)
                    yield element
    
    data = [1, 2, 3, 2, 4, 1, 5, 3]
    unique = list(unique_everseen(data))
    print(f"  중복 제거: {unique}")
    
    # 조건별 소비
    def consume(iterator, n=None):
        """이터레이터에서 n개 요소를 소비 (반환하지 않음)"""
        if n is None:
            # 모든 요소 소비
            for _ in iterator:
                pass
        else:
            # n개 요소만 소비
            next(itertools.islice(iterator, n, n), None)
    
    numbers = iter(range(1, 11))
    consume(numbers, 3)  # 처음 3개 소비
    remaining = list(numbers)
    print(f"  소비 후 남은 것: {remaining}")

advanced_itertools_patterns()
```

## 6. 메모리 효율적인 데이터 처리

### 6.1 대용량 데이터 처리

```python
print("\n=== 메모리 효율적인 데이터 처리 ===")

def process_large_dataset():
    """대용량 데이터셋 처리 시뮬레이션"""
    
    print("1. 대용량 데이터 처리:")
    
    # 대용량 데이터 시뮬레이션 (메모리에 모두 로드하지 않음)
    def generate_large_dataset(size):
        """대용량 데이터 생성기"""
        for i in range(size):
            # 복잡한 데이터 생성 시뮬레이션
            yield {
                'id': i,
                'value': i ** 2,
                'category': 'A' if i % 3 == 0 else 'B' if i % 3 == 1 else 'C',
                'active': i % 2 == 0
            }
    
    # 스트리밍 처리
    def process_streaming_data(data_stream):
        """스트리밍 데이터 처리"""
        for record in data_stream:
            # 데이터 변환
            if record['active']:
                yield {
                    'id': record['id'],
                    'processed_value': record['value'] * 1.1,
                    'category': record['category']
                }
    
    # 필터링
    def filter_data(data_stream, min_value=0):
        """데이터 필터링"""
        for record in data_stream:
            if record['processed_value'] > min_value:
                yield record
    
    # 파이프라인 실행
    dataset_size = 100000  # 10만 개 레코드
    
    print(f"  데이터셋 크기: {dataset_size:,} 레코드")
    
    # 스트리밍 파이프라인
    raw_data = generate_large_dataset(dataset_size)
    processed_data = process_streaming_data(raw_data)
    filtered_data = filter_data(processed_data, min_value=1000)
    
    # 처음 5개만 확인
    sample_results = list(itertools.islice(filtered_data, 5))
    
    print(f"  처리 결과 샘플:")
    for record in sample_results:
        print(f"    {record}")

process_large_dataset()

def demonstrate_memory_comparison():
    """메모리 사용량 비교"""
    
    print(f"\n2. 메모리 사용량 비교:")
    
    import sys
    import gc
    
    # 메모리 측정 함수
    def get_memory_usage():
        """현재 메모리 사용량 반환 (대략적)"""
        return sum(sys.getsizeof(obj) for obj in gc.get_objects())
    
    size = 10000
    
    # 리스트 방식 (모든 데이터를 메모리에 로드)
    print(f"  리스트 방식:")
    mem_before = get_memory_usage()
    
    data_list = [x ** 2 for x in range(size)]
    processed_list = [x * 2 for x in data_list if x % 2 == 0]
    
    mem_after = get_memory_usage()
    print(f"    메모리 증가: {mem_after - mem_before:,} bytes (대략)")
    print(f"    결과 개수: {len(processed_list)}")
    
    # 제너레이터 방식 (필요한 때만 계산)
    print(f"\n  제너레이터 방식:")
    mem_before = get_memory_usage()
    
    data_gen = (x ** 2 for x in range(size))
    processed_gen = (x * 2 for x in data_gen if x % 2 == 0)
    result_count = sum(1 for _ in processed_gen)  # 개수만 세기
    
    mem_after = get_memory_usage()
    print(f"    메모리 증가: {mem_after - mem_before:,} bytes (대략)")
    print(f"    결과 개수: {result_count}")

demonstrate_memory_comparison()
```

### 6.2 파일 처리와 스트리밍

```python
def file_processing_generators():
    """파일 처리 제너레이터"""
    
    print(f"\n3. 파일 처리 제너레이터:")
    
    # 대용량 로그 파일 시뮬레이션
    log_filename = "temp_large_log.txt"
    
    # 테스트 로그 파일 생성
    with open(log_filename, 'w', encoding='utf-8') as f:
        for i in range(1000):
            level = ['INFO', 'WARNING', 'ERROR'][i % 3]
            f.write(f"2023-01-01 10:{i%60:02d}:{i%60:02d} {level} Message {i}\n")
    
    def read_log_lines(filename):
        """로그 파일을 한 줄씩 읽는 제너레이터"""
        with open(filename, 'r', encoding='utf-8') as file:
            for line_num, line in enumerate(file, 1):
                yield line_num, line.strip()
    
    def parse_log_entry(line_data):
        """로그 항목을 파싱하는 제너레이터"""
        for line_num, line in line_data:
            parts = line.split(' ', 3)
            if len(parts) >= 4:
                date, time, level, message = parts
                yield {
                    'line_num': line_num,
                    'datetime': f"{date} {time}",
                    'level': level,
                    'message': message
                }
    
    def filter_log_level(log_entries, target_level):
        """특정 로그 레벨만 필터링하는 제너레이터"""
        for entry in log_entries:
            if entry['level'] == target_level:
                yield entry
    
    # 로그 처리 파이프라인
    print(f"  로그 처리 파이프라인:")
    
    # ERROR 로그만 필터링
    log_lines = read_log_lines(log_filename)
    parsed_logs = parse_log_entry(log_lines)
    error_logs = filter_log_level(parsed_logs, 'ERROR')
    
    # 처음 5개 ERROR 로그만 출력
    error_count = 0
    for log_entry in error_logs:
        print(f"    라인 {log_entry['line_num']}: {log_entry['datetime']} - {log_entry['message']}")
        error_count += 1
        if error_count >= 5:
            break
    
    # 파일 정리
    import os
    os.remove(log_filename)

file_processing_generators()

def csv_processing_example():
    """CSV 파일 처리 예제"""
    
    print(f"\n4. CSV 파일 처리:")
    
    csv_filename = "temp_data.csv"
    
    # 테스트 CSV 파일 생성
    with open(csv_filename, 'w', encoding='utf-8') as f:
        f.write("id,name,age,department,salary\n")
        departments = ['IT', 'HR', 'Finance', 'Marketing']
        for i in range(1, 101):
            dept = departments[i % 4]
            salary = 30000 + (i * 1000) + (i % 10) * 5000
            f.write(f"{i},Employee{i},{25 + i % 40},{dept},{salary}\n")
    
    def read_csv_rows(filename):
        """CSV 파일을 행별로 읽는 제너레이터"""
        with open(filename, 'r', encoding='utf-8') as file:
            header = file.readline().strip().split(',')
            for line in file:
                values = line.strip().split(',')
                yield dict(zip(header, values))
    
    def convert_types(rows):
        """데이터 타입 변환 제너레이터"""
        for row in rows:
            yield {
                'id': int(row['id']),
                'name': row['name'],
                'age': int(row['age']),
                'department': row['department'],
                'salary': int(row['salary'])
            }
    
    def department_statistics(rows):
        """부서별 통계 계산"""
        dept_stats = {}
        
        for row in rows:
            dept = row['department']
            if dept not in dept_stats:
                dept_stats[dept] = {'count': 0, 'total_salary': 0, 'ages': []}
            
            dept_stats[dept]['count'] += 1
            dept_stats[dept]['total_salary'] += row['salary']
            dept_stats[dept]['ages'].append(row['age'])
        
        # 평균 계산
        for dept, stats in dept_stats.items():
            stats['avg_salary'] = stats['total_salary'] / stats['count']
            stats['avg_age'] = sum(stats['ages']) / len(stats['ages'])
            del stats['ages']  # 메모리 절약
        
        return dept_stats
    
    # CSV 처리 파이프라인
    rows = read_csv_rows(csv_filename)
    converted_rows = convert_types(rows)
    
    # 스트리밍으로 통계 계산
    stats = department_statistics(converted_rows)
    
    print(f"  부서별 통계:")
    for dept, stat in stats.items():
        print(f"    {dept}: 직원 {stat['count']}명, 평균 연봉 {stat['avg_salary']:,.0f}원, 평균 나이 {stat['avg_age']:.1f}세")
    
    # 파일 정리
    import os
    os.remove(csv_filename)

csv_processing_example()
```

## 7. 비동기 이터레이터와 제너레이터 기초

### 7.1 비동기 이터레이터 소개

```python
print("\n=== 비동기 이터레이터와 제너레이터 기초 ===")

import asyncio
import time

async def demonstrate_async_generator():
    """비동기 제너레이터 기본 예제"""
    
    print("1. 비동기 제너레이터:")
    
    async def async_counter(max_count):
        """비동기 카운터 제너레이터"""
        for i in range(max_count):
            # 비동기 작업 시뮬레이션
            await asyncio.sleep(0.1)
            yield i
    
    # 비동기 제너레이터 사용
    print(f"  비동기 카운터 실행:")
    async for value in async_counter(5):
        print(f"    값: {value}")

# 비동기 함수 실행을 위한 래퍼
def run_async_demo():
    """비동기 데모 실행"""
    try:
        asyncio.run(demonstrate_async_generator())
    except Exception as e:
        print(f"  비동기 실행 오류: {e}")
        print(f"  (일부 환경에서는 비동기 코드가 제한될 수 있습니다)")

run_async_demo()

class AsyncRange:
    """비동기 이터레이터 클래스"""
    
    def __init__(self, start, end, delay=0.1):
        self.start = start
        self.end = end
        self.delay = delay
        self.current = start
    
    def __aiter__(self):
        return self
    
    async def __anext__(self):
        if self.current >= self.end:
            raise StopAsyncIteration
        
        await asyncio.sleep(self.delay)
        value = self.current
        self.current += 1
        return value

async def demonstrate_async_iterator():
    """비동기 이터레이터 클래스 사용"""
    
    print(f"\n2. 비동기 이터레이터 클래스:")
    
    async_range = AsyncRange(1, 4, 0.05)
    
    print(f"  AsyncRange(1, 4) 실행:")
    async for value in async_range:
        print(f"    값: {value}")

def run_async_iterator_demo():
    """비동기 이터레이터 데모 실행"""
    try:
        asyncio.run(demonstrate_async_iterator())
    except Exception as e:
        print(f"  비동기 실행 오류: {e}")

run_async_iterator_demo()
```

### 7.2 동기 vs 비동기 성능 비교

```python
def sync_vs_async_comparison():
    """동기 vs 비동기 성능 비교"""
    
    print(f"\n3. 동기 vs 비동기 성능 비교:")
    
    def sync_slow_operation(n):
        """동기 방식의 느린 작업"""
        time.sleep(0.01)  # I/O 작업 시뮬레이션
        return n * 2
    
    async def async_slow_operation(n):
        """비동기 방식의 느린 작업"""
        await asyncio.sleep(0.01)  # 비동기 I/O 작업 시뮬레이션
        return n * 2
    
    def sync_processor(data):
        """동기 처리"""
        start_time = time.time()
        results = []
        
        for item in data:
            result = sync_slow_operation(item)
            results.append(result)
        
        end_time = time.time()
        return results, end_time - start_time
    
    async def async_processor(data):
        """비동기 처리"""
        start_time = time.time()
        
        # 모든 작업을 동시에 실행
        tasks = [async_slow_operation(item) for item in data]
        results = await asyncio.gather(*tasks)
        
        end_time = time.time()
        return results, end_time - start_time
    
    test_data = list(range(1, 6))  # 5개 작업
    
    # 동기 처리
    sync_results, sync_time = sync_processor(test_data)
    print(f"  동기 처리: {sync_time:.3f}초, 결과: {sync_results}")
    
    # 비동기 처리
    try:
        async_results, async_time = asyncio.run(async_processor(test_data))
        print(f"  비동기 처리: {async_time:.3f}초, 결과: {async_results}")
        print(f"  성능 개선: {sync_time / async_time:.1f}배 빠름")
    except Exception as e:
        print(f"  비동기 처리 오류: {e}")

sync_vs_async_comparison()
```

## 8. 연습 문제

### 연습 1: 커스텀 데이터 구조
리스트와 딕셔너리의 기능을 결합한 IndexedDict 클래스를 구현하세요. 인덱스와 키 모두로 접근 가능하고, 이터레이션을 지원해야 합니다.

### 연습 2: 로그 분석기
대용량 로그 파일을 분석하는 제너레이터를 구현하세요. 특정 패턴을 찾고, 시간대별 통계를 계산하며, 메모리 효율적으로 처리해야 합니다.

### 연습 3: 데이터 스트림 처리기
실시간 데이터 스트림을 처리하는 파이프라인을 구현하세요. 필터링, 변환, 집계 기능을 제너레이터로 구현하고 조합 가능해야 합니다.

### 연습 4: 파일 시스템 탐색기
디렉토리 구조를 재귀적으로 탐색하는 제너레이터를 구현하세요. 파일 크기, 확장자별 필터링, 깊이 제한 등의 기능을 포함해야 합니다.

## 정리

이 챕터에서 학습한 내용:

1. **이터레이터와 이터러블**: 기본 개념과 프로토콜 이해
2. **커스텀 이터레이터**: 클래스 기반 이터레이터 구현
3. **제너레이터 함수**: yield를 사용한 간편한 이터레이터 생성
4. **고급 yield**: send, 예외 처리, yield from 활용
5. **itertools 모듈**: 강력한 이터레이터 유틸리티 활용
6. **메모리 효율성**: 대용량 데이터의 스트리밍 처리
7. **비동기 기초**: 비동기 이터레이터와 제너레이터 소개

다음 챕터에서는 멀티스레딩과 비동기 처리를 더 깊이 학습하여 효율적인 동시성 프로그래밍을 배우겠습니다.

### 핵심 포인트
- 이터레이터는 메모리 효율적인 데이터 처리의 핵심입니다
- 제너레이터는 이터레이터를 쉽게 만드는 강력한 도구입니다
- yield는 단순한 값 반환 이상의 다양한 기능을 제공합니다
- itertools는 복잡한 이터레이션 패턴을 간단하게 구현하게 해줍니다
- 대용량 데이터는 스트리밍 방식으로 처리해야 합니다
- 비동기 이터레이터는 I/O 집약적 작업에서 성능을 크게 개선할 수 있습니다