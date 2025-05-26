# Chapter 6: 특수 메서드 (Magic Methods)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 특수 메서드(Magic Methods)의 개념과 목적 이해하기
- __str__과 __repr__ 메서드로 객체 표현 커스터마이징하기
- 연산자 오버로딩을 통한 객체 간 연산 정의하기
- 비교 연산자를 구현하여 객체 정렬과 비교 가능하게 만들기
- 컨테이너 메서드로 컬렉션처럼 작동하는 클래스 만들기
- 컨텍스트 매니저를 구현하여 리소스 관리하기
- 이터레이터 프로토콜을 구현하여 반복 가능한 객체 만들기

## 1. 특수 메서드 개요

### 1.1 특수 메서드란?

특수 메서드(Magic Methods 또는 Dunder Methods)는 파이썬에서 클래스가 내장 함수나 연산자와 상호작용할 수 있게 해주는 특별한 메서드입니다. 이름이 언더스코어 두 개(__) 로 시작하고 끝납니다.

```python
print("=== 특수 메서드 소개 ===")

class SimpleClass:
    """기본 클래스 - 특수 메서드 없음"""
    
    def __init__(self, value):
        self.value = value

class MagicClass:
    """특수 메서드가 구현된 클래스"""
    
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        """사용자 친화적인 문자열 표현"""
        return f"MagicClass({self.value})"
    
    def __repr__(self):
        """개발자를 위한 정확한 표현"""
        return f"MagicClass({self.value!r})"
    
    def __len__(self):
        """len() 함수 호출 시 동작"""
        if isinstance(self.value, (list, str, dict)):
            return len(self.value)
        return 0
    
    def __bool__(self):
        """bool() 변환이나 조건문에서 사용"""
        return bool(self.value)

# 기본 클래스 vs 특수 메서드 구현 클래스 비교
print("1. 기본 클래스:")
simple = SimpleClass("hello")
print(f"simple: {simple}")  # 메모리 주소 출력
print(f"type: {type(simple)}")

print("\n2. 특수 메서드 구현 클래스:")
magic = MagicClass("hello")
print(f"str(magic): {str(magic)}")    # __str__ 호출
print(f"repr(magic): {repr(magic)}")   # __repr__ 호출
print(f"len(magic): {len(magic)}")     # __len__ 호출
print(f"bool(magic): {bool(magic)}")   # __bool__ 호출

# 빈 값으로 테스트
empty_magic = MagicClass("")
print(f"\n3. 빈 값 테스트:")
print(f"bool(empty_magic): {bool(empty_magic)}")
print(f"len(empty_magic): {len(empty_magic)}")

print("\n4. 조건문에서 사용:")
if magic:
    print("magic은 True로 평가됩니다")

if not empty_magic:
    print("empty_magic은 False로 평가됩니다")

print("\n5. 내장 함수들과의 호환:")
magic_list = MagicClass([1, 2, 3, 4, 5])
print(f"리스트를 가진 magic: {magic_list}")
print(f"길이: {len(magic_list)}")
print(f"부울값: {bool(magic_list)}")
```

### 1.2 자주 사용되는 특수 메서드 분류

```python
print("\n=== 특수 메서드 분류 ===")

class MethodDemo:
    """다양한 특수 메서드 데모"""
    
    def __init__(self, value):
        self.value = value
    
    # === 객체 표현 메서드 ===
    def __str__(self):
        return f"MethodDemo: {self.value}"
    
    def __repr__(self):
        return f"MethodDemo({self.value!r})"
    
    # === 산술 연산자 메서드 ===
    def __add__(self, other):
        if isinstance(other, MethodDemo):
            return MethodDemo(self.value + other.value)
        return MethodDemo(self.value + other)
    
    def __mul__(self, other):
        if isinstance(other, MethodDemo):
            return MethodDemo(self.value * other.value)
        return MethodDemo(self.value * other)
    
    # === 비교 연산자 메서드 ===
    def __eq__(self, other):
        if isinstance(other, MethodDemo):
            return self.value == other.value
        return self.value == other
    
    def __lt__(self, other):
        if isinstance(other, MethodDemo):
            return self.value < other.value
        return self.value < other
    
    # === 컨테이너 메서드 ===
    def __len__(self):
        if hasattr(self.value, '__len__'):
            return len(self.value)
        return 0
    
    def __getitem__(self, key):
        return self.value[key]
    
    # === 논리 연산 메서드 ===
    def __bool__(self):
        return bool(self.value)

# 다양한 특수 메서드 사용 예제
print("1. 객체 생성과 표현:")
demo1 = MethodDemo(10)
demo2 = MethodDemo(20)
print(f"demo1: {demo1}")
print(f"repr(demo1): {repr(demo1)}")

print("\n2. 산술 연산:")
result_add = demo1 + demo2
print(f"{demo1} + {demo2} = {result_add}")

result_mul = demo1 * 3
print(f"{demo1} * 3 = {result_mul}")

print("\n3. 비교 연산:")
print(f"{demo1} == {demo2}: {demo1 == demo2}")
print(f"{demo1} < {demo2}: {demo1 < demo2}")

print("\n4. 컨테이너 기능 (문자열로 테스트):")
demo_str = MethodDemo("Hello")
print(f"len({demo_str}): {len(demo_str)}")
print(f"{demo_str}[0]: {demo_str[0]}")

print("\n5. 논리 연산:")
demo_zero = MethodDemo(0)
print(f"bool({demo1}): {bool(demo1)}")
print(f"bool({demo_zero}): {bool(demo_zero)}")

print("\n6. 특수 메서드 목록 확인:")
magic_methods = [method for method in dir(MethodDemo) if method.startswith('__') and method.endswith('__')]
print(f"구현된 특수 메서드들: {magic_methods[:10]}...")  # 처음 10개만 표시
```

## 2. 객체 표현 메서드

### 2.1 __str__과 __repr__ 메서드

```python
print("\n=== 객체 표현 메서드 ===")

class Person:
    """사람 클래스 - 객체 표현 메서드 구현"""
    
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email
    
    def __str__(self):
        """사용자 친화적인 표현 - 최종 사용자를 위한 가독성 중시"""
        return f"{self.name} ({self.age}세)"
    
    def __repr__(self):
        """개발자를 위한 정확한 표현 - 디버깅과 개발에 유용"""
        return f"Person({self.name!r}, {self.age}, {self.email!r})"
    
    def __format__(self, format_spec):
        """format() 함수나 f-string에서 사용자 정의 포맷"""
        if format_spec == 'full':
            return f"{self.name} ({self.age}세, {self.email})"
        elif format_spec == 'formal':
            return f"Mr./Ms. {self.name}"
        else:
            return str(self)

class Book:
    """책 클래스 - 다양한 표현 형태"""
    
    def __init__(self, title, author, pages, isbn):
        self.title = title
        self.author = author
        self.pages = pages
        self.isbn = isbn
    
    def __str__(self):
        """간단한 표현"""
        return f"'{self.title}' by {self.author}"
    
    def __repr__(self):
        """완전한 표현"""
        return f"Book({self.title!r}, {self.author!r}, {self.pages}, {self.isbn!r})"
    
    def __format__(self, format_spec):
        """다양한 포맷 옵션"""
        if format_spec == 'detail':
            return f"'{self.title}' by {self.author} ({self.pages} pages, ISBN: {self.isbn})"
        elif format_spec == 'short':
            return f"{self.title} - {self.author}"
        elif format_spec == 'citation':
            return f"{self.author}. {self.title}. ISBN: {self.isbn}"
        else:
            return str(self)

# 객체 표현 메서드 테스트
print("1. Person 클래스 테스트:")
person = Person("김철수", 30, "kim@email.com")
print(f"str(person): {str(person)}")
print(f"repr(person): {repr(person)}")
print(f"format(person, 'full'): {format(person, 'full')}")
print(f"format(person, 'formal'): {format(person, 'formal')}")

print("\n2. Book 클래스 테스트:")
book = Book("파이썬 완전 정복", "김파이썬", 500, "978-89-123-4567-8")
print(f"str(book): {str(book)}")
print(f"repr(book): {repr(book)}")
print(f"format(book, 'detail'): {format(book, 'detail')}")
print(f"format(book, 'citation'): {format(book, 'citation')}")

print("\n3. f-string에서 포맷 사용:")
print(f"기본: {person}")
print(f"전체 정보: {person:full}")
print(f"정중한 호칭: {person:formal}")

print(f"\n책 정보:")
print(f"기본: {book}")
print(f"상세: {book:detail}")
print(f"인용: {book:citation}")

print("\n4. 리스트에서의 출력 차이:")
people = [Person("김철수", 30, "kim@email.com"), Person("이영희", 25, "lee@email.com")]
print(f"리스트 출력 (repr 사용): {people}")

for person in people:
    print(f"개별 출력 (str 사용): {person}")
```

## 3. 연산자 오버로딩

### 3.1 산술 연산자 오버로딩

```python
print("\n=== 산술 연산자 오버로딩 ===")

class Vector:
    """벡터 클래스 - 산술 연산자 오버로딩"""
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    # === 산술 연산자 ===
    def __add__(self, other):
        """덧셈 연산자 (+)"""
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        elif isinstance(other, (int, float)):
            return Vector(self.x + other, self.y + other)
        return NotImplemented
    
    def __radd__(self, other):
        """역방향 덧셈 (다른 타입 + Vector)"""
        return self.__add__(other)
    
    def __sub__(self, other):
        """뺄셈 연산자 (-)"""
        if isinstance(other, Vector):
            return Vector(self.x - other.x, self.y - other.y)
        elif isinstance(other, (int, float)):
            return Vector(self.x - other, self.y - other)
        return NotImplemented
    
    def __mul__(self, other):
        """곱셈 연산자 (*)"""
        if isinstance(other, Vector):
            # 내적 (dot product)
            return self.x * other.x + self.y * other.y
        elif isinstance(other, (int, float)):
            # 스칼라 곱
            return Vector(self.x * other, self.y * other)
        return NotImplemented
    
    def __rmul__(self, other):
        """역방향 곱셈"""
        return self.__mul__(other)
    
    def __truediv__(self, other):
        """나눗셈 연산자 (/)"""
        if isinstance(other, (int, float)):
            if other == 0:
                raise ValueError("0으로 나눌 수 없습니다")
            return Vector(self.x / other, self.y / other)
        return NotImplemented
    
    def __neg__(self):
        """단항 마이너스 연산자 (-x)"""
        return Vector(-self.x, -self.y)
    
    def __abs__(self):
        """절댓값 함수 abs()"""
        import math
        return math.sqrt(self.x**2 + self.y**2)
    
    # === 복합 할당 연산자 ===
    def __iadd__(self, other):
        """복합 할당 덧셈 (+=)"""
        if isinstance(other, Vector):
            self.x += other.x
            self.y += other.y
        elif isinstance(other, (int, float)):
            self.x += other
            self.y += other
        else:
            return NotImplemented
        return self

# 산술 연산자 테스트
print("1. Vector 클래스 산술 연산:")
v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(f"v1 = {v1}")
print(f"v2 = {v2}")

print(f"\n기본 산술 연산:")
print(f"v1 + v2 = {v1 + v2}")
print(f"v1 - v2 = {v1 - v2}")
print(f"v1 * v2 = {v1 * v2}")  # 내적
print(f"v1 * 3 = {v1 * 3}")   # 스칼라 곱
print(f"3 * v1 = {3 * v1}")   # 역방향 곱셈

print(f"\n나눗셈과 기타 연산:")
print(f"v1 / 2 = {v1 / 2}")
print(f"-v1 = {-v1}")
print(f"abs(v1) = {abs(v1):.2f}")

print(f"\n복합 할당 연산자:")
v3 = Vector(5, 6)
print(f"v3 = {v3}")
v3 += v1
print(f"v3 += v1 -> v3 = {v3}")
```

### 3.2 비교 연산자 오버로딩

```python
print("\n=== 비교 연산자 오버로딩 ===")

from functools import total_ordering

@total_ordering
class Student:
    """학생 클래스 - 비교 연산자 구현"""
    
    def __init__(self, name, grade, student_id):
        self.name = name
        self.grade = grade
        self.student_id = student_id
    
    def __str__(self):
        return f"Student({self.name}, 성적: {self.grade})"
    
    def __repr__(self):
        return f"Student({self.name!r}, {self.grade}, {self.student_id!r})"
    
    def __eq__(self, other):
        """등등 연산자 (==)"""
        if not isinstance(other, Student):
            return NotImplemented
        return (self.name, self.grade, self.student_id) == (other.name, other.grade, other.student_id)
    
    def __lt__(self, other):
        """작다 연산자 (<) - @total_ordering이 나머지를 자동 생성"""
        if not isinstance(other, Student):
            return NotImplemented
        # 성적으로 비교 (높은 성적이 더 큰 값)
        return self.grade < other.grade
    
    def __hash__(self):
        """해시 값 - 딕셔너리 키나 집합 원소로 사용 가능"""
        return hash((self.name, self.grade, self.student_id))

# 비교 연산자 테스트
print("1. Student 클래스 비교:")
student1 = Student("김철수", 85, "S001")
student2 = Student("이영희", 92, "S002")
student3 = Student("박민수", 85, "S003")

students = [student1, student2, student3]
print("정렬 전:")
for s in students:
    print(f"  {s}")

students.sort()  # __lt__ 메서드 사용
print("\n성적순 정렬 후:")
for s in students:
    print(f"  {s}")

print(f"\n비교 연산:")
print(f"{student1} == {student3}: {student1 == student3}")  # False (이름이 다름)
print(f"{student1} < {student2}: {student1 < student2}")    # True (성적이 낮음)
print(f"{student2} >= {student1}: {student2 >= student1}")  # True
```

## 4. 컨테이너 메서드

### 4.1 시퀀스 프로토콜 구현

```python
print("\n=== 컨테이너 메서드 ===")

class CustomList:
    """커스텀 리스트 - 시퀀스 프로토콜 구현"""
    
    def __init__(self, *items):
        self._items = list(items)
    
    def __len__(self):
        """len() 함수 지원"""
        return len(self._items)
    
    def __getitem__(self, index):
        """인덱싱과 슬라이싱 지원"""
        if isinstance(index, slice):
            return CustomList(*self._items[index])
        return self._items[index]
    
    def __setitem__(self, index, value):
        """항목 할당"""
        self._items[index] = value
    
    def __delitem__(self, index):
        """항목 삭제"""
        del self._items[index]
    
    def __contains__(self, item):
        """'in' 연산자 지원"""
        return item in self._items
    
    def __iter__(self):
        """반복자 지원"""
        return iter(self._items)
    
    def __str__(self):
        return f"CustomList{tuple(self._items)}"
    
    def __repr__(self):
        return f"CustomList({', '.join(repr(item) for item in self._items)})"
    
    def append(self, item):
        """항목 추가"""
        self._items.append(item)

# 컨테이너 메서드 테스트
print("1. CustomList 테스트:")
clist = CustomList(1, 2, 3, 4, 5)
print(f"생성: {clist}")
print(f"길이: {len(clist)}")
print(f"인덱싱 clist[1]: {clist[1]}")
print(f"슬라이싱 clist[1:4]: {clist[1:4]}")

print(f"\n멤버십 테스트:")
print(f"3 in clist: {3 in clist}")
print(f"10 in clist: {10 in clist}")

print(f"\n수정 작업:")
clist[0] = 10
print(f"clist[0] = 10: {clist}")

clist.append(6)
print(f"clist.append(6): {clist}")

del clist[1]
print(f"del clist[1]: {clist}")

print(f"\n반복:")
print("for문:", end=" ")
for item in clist:
    print(item, end=" ")
```

## 5. 컨텍스트 매니저

### 5.1 기본 컨텍스트 매니저 구현

```python
print("\n\n=== 컨텍스트 매니저 ===")

class Timer:
    """실행 시간 측정 컨텍스트 매니저"""
    
    def __init__(self, name="코드 블록"):
        self.name = name
        self.start_time = None
        self.end_time = None
        self.elapsed_time = None
    
    def __enter__(self):
        """시간 측정 시작"""
        import time
        self.start_time = time.time()
        print(f"{self.name} 실행 시작")
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        """시간 측정 종료"""
        import time
        self.end_time = time.time()
        self.elapsed_time = self.end_time - self.start_time
        
        if exc_type is None:
            print(f"{self.name} 완료: {self.elapsed_time:.4f}초")
        else:
            print(f"{self.name} 실행 중 오류 발생 (경과 시간: {self.elapsed_time:.4f}초)")
        
        return False  # 예외를 다시 발생시킴

# 컨텍스트 매니저 테스트
print("1. Timer 테스트:")
with Timer("작업 시뮬레이션") as timer:
    import time
    time.sleep(0.01)  # 0.01초 대기
    print("작업 중...")

print(f"측정된 시간: {timer.elapsed_time:.4f}초")
```

## 6. 이터레이터 프로토콜

### 6.1 기본 이터레이터 구현

```python
print("\n=== 이터레이터 프로토콜 ===")

class NumberRange:
    """숫자 범위 이터레이터"""
    
    def __init__(self, start, end, step=1):
        self.start = start
        self.end = end
        self.step = step
        self.current = start
    
    def __iter__(self):
        """이터레이터 객체 반환"""
        return self
    
    def __next__(self):
        """다음 값 반환"""
        if (self.step > 0 and self.current >= self.end) or \
           (self.step < 0 and self.current <= self.end):
            raise StopIteration
        
        value = self.current
        self.current += self.step
        return value

class FibonacciIterator:
    """피보나치 수열 이터레이터"""
    
    def __init__(self, max_count=None):
        self.max_count = max_count
        self.count = 0
        self.current = 0
        self.next_val = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.max_count is not None and self.count >= self.max_count:
            raise StopIteration
        
        value = self.current
        self.current, self.next_val = self.next_val, self.current + self.next_val
        self.count += 1
        return value

# 이터레이터 테스트
print("1. NumberRange 이터레이터:")
print("1부터 5까지:", end=" ")
for num in NumberRange(1, 6):
    print(num, end=" ")

print(f"\n\n2. FibonacciIterator:")
print("처음 8개 피보나치 수:", end=" ")
for fib in FibonacciIterator(8):
    print(fib, end=" ")
```

## 7. 연습 문제

### 연습 1: 스마트 계산기 클래스
다양한 특수 메서드를 구현한 계산기 클래스를 만드세요. 산술 연산, 비교 연산, 문자열 표현 등을 지원해야 합니다.

### 연습 2: 파일 처리 컨텍스트 매니저
안전한 파일 처리를 위한 컨텍스트 매니저를 구현하세요. 예외 처리와 리소스 정리 기능을 포함해야 합니다.

### 연습 3: 커스텀 컬렉션
특별한 기능을 가진 컬렉션 클래스를 구현하세요. 인덱싱, 슬라이싱, 반복, 멤버십 테스트를 지원해야 합니다.

### 연습 4: 데이터 스트림 이터레이터
대용량 데이터를 메모리 효율적으로 처리하는 이터레이터를 구현하세요.

## 정리

이 챕터에서 학습한 내용:

1. **특수 메서드 개요**: Python 객체와 내장 함수/연산자의 상호작용
2. **객체 표현**: `__str__`, `__repr__`, `__format__` 메서드
3. **연산자 오버로딩**: 산술, 비교 연산자 커스터마이징
4. **컨테이너 메서드**: 시퀀스 프로토콜 구현
5. **컨텍스트 매니저**: 리소스 관리와 `with` 문 지원
6. **이터레이터 프로토콜**: 반복 가능한 객체와 메모리 효율적 처리

다음 챕터에서는 모듈과 패키지를 학습하여 코드를 체계적으로 구조화하는 방법을 배우겠습니다.

### 핵심 포인트
- 특수 메서드를 통해 Python 객체를 내장 타입처럼 자연스럽게 사용할 수 있습니다
- 연산자 오버로딩으로 도메인에 특화된 직관적인 코드를 작성할 수 있습니다
- 컨텍스트 매니저는 리소스 관리와 예외 안전성을 보장합니다
- 이터레이터는 메모리 효율적인 대용량 데이터 처리를 가능하게 합니다
- 적절한 특수 메서드 구현으로 Python다운 우아한 클래스를 만들 수 있습니다 