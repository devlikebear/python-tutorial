# Chapter 8: 리스트와 튜플 (Lists and Tuples)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 리스트와 튜플의 기본 개념과 차이점 이해하기
- 리스트와 튜플의 생성, 접근, 수정 방법 익히기
- 다양한 리스트와 튜플 메서드 활용하기
- 슬라이싱을 통한 효율적인 데이터 처리하기
- 중첩 리스트와 튜플 다루기
- 실용적인 데이터 구조 활용 프로그램 작성하기

## 1. 리스트의 기본 개념

### 1.1 리스트란?

리스트는 Python에서 가장 많이 사용되는 데이터 구조로, 여러 개의 값을 순서대로 저장할 수 있는 **변경 가능한(mutable)** 컬렉션입니다.

```python
# 리스트 생성 방법들
empty_list = []  # 빈 리스트
numbers = [1, 2, 3, 4, 5]  # 숫자 리스트
fruits = ["사과", "바나나", "오렌지"]  # 문자열 리스트
mixed = [1, "hello", 3.14, True]  # 다양한 타입의 데이터

# list() 함수로 생성
numbers_from_range = list(range(1, 6))  # [1, 2, 3, 4, 5]
chars = list("Hello")  # ['H', 'e', 'l', 'l', 'o']

print(f"숫자 리스트: {numbers}")
print(f"과일 리스트: {fruits}")
print(f"혼합 리스트: {mixed}")
```

### 1.2 리스트의 특징

```python
# 1. 순서가 있음 (ordered)
fruits = ["사과", "바나나", "오렌지"]
print(f"첫 번째 과일: {fruits[0]}")  # 인덱스로 접근 가능

# 2. 변경 가능 (mutable)
fruits[1] = "포도"  # 요소 변경 가능
print(f"변경된 리스트: {fruits}")

# 3. 중복 허용
numbers = [1, 2, 2, 3, 3, 3]
print(f"중복이 있는 리스트: {numbers}")

# 4. 다양한 타입 저장 가능
mixed_data = [42, "text", [1, 2, 3], {"key": "value"}]
print(f"다양한 타입: {mixed_data}")
```

## 2. 리스트 인덱싱과 슬라이싱

### 2.1 인덱싱 (Indexing)

```python
fruits = ["사과", "바나나", "오렌지", "포도", "키위"]

# 양수 인덱스 (0부터 시작)
print(f"첫 번째 과일: {fruits[0]}")   # 사과
print(f"두 번째 과일: {fruits[1]}")   # 바나나
print(f"마지막 과일: {fruits[4]}")    # 키위

# 음수 인덱스 (뒤에서부터)
print(f"마지막 과일: {fruits[-1]}")   # 키위
print(f"뒤에서 두 번째: {fruits[-2]}")  # 포도

# 인덱스 범위 체크
try:
    print(fruits[10])  # IndexError 발생
except IndexError as e:
    print(f"인덱스 오류: {e}")
```

### 2.2 슬라이싱 (Slicing)

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 기본 슬라이싱
print(f"처음부터 5번째까지: {numbers[:5]}")     # [0, 1, 2, 3, 4]
print(f"3번째부터 끝까지: {numbers[3:]}")      # [3, 4, 5, 6, 7, 8, 9]
print(f"2번째부터 7번째까지: {numbers[2:8]}")   # [2, 3, 4, 5, 6, 7]

# 단계(step) 사용
print(f"짝수 인덱스 요소들: {numbers[::2]}")    # [0, 2, 4, 6, 8]
print(f"홀수 인덱스 요소들: {numbers[1::2]}")   # [1, 3, 5, 7, 9]
print(f"역순으로: {numbers[::-1]}")           # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# 음수 인덱스와 슬라이싱
print(f"뒤에서 3개: {numbers[-3:]}")          # [7, 8, 9]
print(f"처음 3개 제외: {numbers[3:]}")        # [3, 4, 5, 6, 7, 8, 9]
```

## 3. 리스트 메서드

### 3.1 요소 추가 메서드

```python
# append(): 끝에 하나의 요소 추가
fruits = ["사과", "바나나"]
fruits.append("오렌지")
print(f"append 후: {fruits}")  # ['사과', '바나나', '오렌지']

# insert(): 특정 위치에 요소 추가
fruits.insert(1, "포도")  # 인덱스 1에 '포도' 추가
print(f"insert 후: {fruits}")  # ['사과', '포도', '바나나', '오렌지']

# extend(): 여러 요소를 한 번에 추가
fruits.extend(["키위", "망고"])
print(f"extend 후: {fruits}")  # ['사과', '포도', '바나나', '오렌지', '키위', '망고']

# + 연산자로 리스트 합치기
more_fruits = ["딸기", "복숭아"]
all_fruits = fruits + more_fruits
print(f"+ 연산자로: {all_fruits}")
```

### 3.2 요소 제거 메서드

```python
fruits = ["사과", "바나나", "오렌지", "바나나", "키위"]

# remove(): 첫 번째로 찾은 특정 값 제거
fruits.remove("바나나")  # 첫 번째 '바나나'만 제거
print(f"remove 후: {fruits}")  # ['사과', '오렌지', '바나나', '키위']

# pop(): 특정 인덱스의 요소 제거하고 반환
removed_fruit = fruits.pop(2)  # 인덱스 2의 요소 제거
print(f"pop으로 제거된 과일: {removed_fruit}")  # 바나나
print(f"pop 후: {fruits}")  # ['사과', '오렌지', '키위']

# 마지막 요소 제거
last_fruit = fruits.pop()  # 인덱스 없으면 마지막 요소 제거
print(f"마지막 요소: {last_fruit}")  # 키위
print(f"최종 리스트: {fruits}")  # ['사과', '오렌지']

# del 키워드로 제거
numbers = [1, 2, 3, 4, 5]
del numbers[2]  # 인덱스 2 제거
print(f"del 후: {numbers}")  # [1, 2, 4, 5]

del numbers[1:3]  # 슬라이싱으로 여러 요소 제거
print(f"슬라이스 del 후: {numbers}")  # [1, 5]

# clear(): 모든 요소 제거
numbers.clear()
print(f"clear 후: {numbers}")  # []
```

### 3.3 검색과 정보 메서드

```python
numbers = [1, 2, 3, 2, 4, 2, 5]

# index(): 요소의 첫 번째 인덱스 찾기
first_index = numbers.index(2)
print(f"2의 첫 번째 인덱스: {first_index}")  # 1

# 특정 범위에서 찾기
second_index = numbers.index(2, 2)  # 인덱스 2부터 찾기
print(f"2의 두 번째 인덱스: {second_index}")  # 3

# count(): 특정 값의 개수 세기
count_2 = numbers.count(2)
print(f"2의 개수: {count_2}")  # 3

# len(): 리스트 길이
length = len(numbers)
print(f"리스트 길이: {length}")  # 7

# in 연산자: 요소 존재 확인
print(f"3이 리스트에 있나요? {3 in numbers}")  # True
print(f"10이 리스트에 있나요? {10 in numbers}")  # False
```

### 3.4 정렬과 순서 변경 메서드

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sort(): 원본 리스트를 정렬 (내림차순)
numbers_copy = numbers.copy()  # 원본 보존용 복사
numbers_copy.sort()
print(f"오름차순 정렬: {numbers_copy}")  # [1, 1, 2, 3, 4, 5, 6, 9]

numbers_copy.sort(reverse=True)
print(f"내림차순 정렬: {numbers_copy}")  # [9, 6, 5, 4, 3, 2, 1, 1]

# sorted(): 새로운 정렬된 리스트 반환 (원본 유지)
original = [3, 1, 4, 1, 5]
sorted_new = sorted(original)
print(f"원본: {original}")      # [3, 1, 4, 1, 5]
print(f"정렬된 새 리스트: {sorted_new}")  # [1, 1, 3, 4, 5]

# reverse(): 리스트 뒤집기
fruits = ["사과", "바나나", "오렌지"]
fruits.reverse()
print(f"뒤집힌 리스트: {fruits}")  # ['오렌지', '바나나', '사과']

# 문자열 정렬
words = ["python", "java", "c++", "javascript"]
words.sort()
print(f"문자열 정렬: {words}")  # ['c++', 'java', 'javascript', 'python']

# 길이순 정렬
words.sort(key=len)
print(f"길이순 정렬: {words}")  # ['c++', 'java', 'python', 'javascript']
```

## 4. 튜플의 기본 개념

### 4.1 튜플란?

튜플은 리스트와 비슷하지만 **변경 불가능한(immutable)** 순서가 있는 컬렉션입니다.

```python
# 튜플 생성 방법들
empty_tuple = ()  # 빈 튜플
coordinates = (3, 4)  # 좌표
colors = ("red", "green", "blue")  # 색상
mixed_tuple = (1, "hello", 3.14, True)  # 다양한 타입

# 하나의 요소만 가진 튜플 (쉼표 필수!)
single_element = (42,)  # 쉼표가 없으면 그냥 괄호
not_tuple = (42)  # 이것은 정수 42

print(f"좌표: {coordinates}")
print(f"색상들: {colors}")
print(f"단일 요소 튜플: {single_element}")
print(f"단일 요소 타입: {type(single_element)}")
print(f"괄호만 있는 것: {not_tuple}, 타입: {type(not_tuple)}")

# tuple() 함수로 생성
numbers_tuple = tuple([1, 2, 3, 4, 5])
chars_tuple = tuple("Hello")
print(f"리스트에서 변환: {numbers_tuple}")
print(f"문자열에서 변환: {chars_tuple}")
```

### 4.2 튜플의 특징

```python
point = (10, 20)

# 1. 순서가 있음 (인덱싱 가능)
print(f"x 좌표: {point[0]}")  # 10
print(f"y 좌표: {point[1]}")  # 20

# 2. 변경 불가능 (immutable)
try:
    point[0] = 30  # TypeError 발생
except TypeError as e:
    print(f"튜플 변경 시도 오류: {e}")

# 3. 슬라이싱 가능
numbers = (0, 1, 2, 3, 4, 5)
print(f"처음 3개: {numbers[:3]}")  # (0, 1, 2)
print(f"마지막 3개: {numbers[-3:]}")  # (3, 4, 5)

# 4. 중복 허용
repeated = (1, 2, 2, 3, 3, 3)
print(f"중복이 있는 튜플: {repeated}")
```

### 4.3 튜플 메서드

튜플은 변경 불가능하므로 제한적인 메서드만 제공합니다.

```python
numbers = (1, 2, 3, 2, 4, 2, 5)

# count(): 특정 값의 개수
count_2 = numbers.count(2)
print(f"2의 개수: {count_2}")  # 3

# index(): 특정 값의 첫 번째 인덱스
index_2 = numbers.index(2)
print(f"2의 첫 번째 인덱스: {index_2}")  # 1

# len(): 튜플 길이
length = len(numbers)
print(f"튜플 길이: {length}")  # 7

# in 연산자: 요소 존재 확인
print(f"3이 튜플에 있나요? {3 in numbers}")  # True
print(f"10이 튜플에 있나요? {10 in numbers}")  # False

# max(), min(), sum() 함수 사용 가능
print(f"최댓값: {max(numbers)}")  # 5
print(f"최솟값: {min(numbers)}")  # 1
print(f"합계: {sum(numbers)}")    # 20
```

## 5. 리스트 vs 튜플 비교

### 5.1 주요 차이점

```python
# 1. 변경 가능성
my_list = [1, 2, 3]
my_tuple = (1, 2, 3)

# 리스트는 변경 가능
my_list[0] = 10
my_list.append(4)
print(f"변경된 리스트: {my_list}")  # [10, 2, 3, 4]

# 튜플은 변경 불가능
try:
    my_tuple[0] = 10  # TypeError
except TypeError as e:
    print(f"튜플 변경 불가: {e}")

# 2. 성능 차이
import time

# 큰 데이터로 성능 테스트
large_list = list(range(1000000))
large_tuple = tuple(range(1000000))

# 리스트 순회 시간
start = time.time()
for item in large_list:
    pass
list_time = time.time() - start

# 튜플 순회 시간
start = time.time()
for item in large_tuple:
    pass
tuple_time = time.time() - start

print(f"리스트 순회 시간: {list_time:.6f}초")
print(f"튜플 순회 시간: {tuple_time:.6f}초")
print(f"튜플이 {list_time/tuple_time:.2f}배 빠름")
```

### 5.2 언제 사용할까?

```python
# 튜플 사용 예시
# 1. 좌표, 색상값 등 변하지 않는 데이터
point = (10, 20)
rgb_color = (255, 128, 0)

# 2. 함수에서 여러 값 반환
def get_name_age():
    return "김철수", 25  # 튜플로 반환

name, age = get_name_age()  # 튜플 언패킹
print(f"이름: {name}, 나이: {age}")

# 3. 딕셔너리의 키로 사용
locations = {
    (0, 0): "원점",
    (10, 20): "점 A",
    (30, 40): "점 B"
}
print(f"(10, 20) 위치: {locations[(10, 20)]}")

# 리스트 사용 예시
# 1. 데이터를 자주 추가/제거/수정하는 경우
shopping_list = ["우유", "빵", "계란"]
shopping_list.append("사과")  # 동적으로 추가
shopping_list.remove("빵")    # 동적으로 제거

# 2. 데이터 처리를 위한 임시 저장
numbers = [1, 5, 3, 9, 2]
numbers.sort()  # 정렬
numbers.append(10)  # 추가

print(f"쇼핑 목록: {shopping_list}")
print(f"정렬된 숫자들: {numbers}")
```

## 6. 중첩 리스트와 튜플

### 6.1 2차원 리스트 (행렬)

```python
# 2차원 리스트 생성
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 요소 접근
print(f"첫 번째 행: {matrix[0]}")        # [1, 2, 3]
print(f"두 번째 행, 세 번째 열: {matrix[1][2]}")  # 6

# 2차원 리스트 순회
print("행렬 출력:")
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"{matrix[i][j]:2}", end=" ")
    print()  # 줄바꿈

# 더 간단한 순회
print("\n행별 출력:")
for row in matrix:
    print(row)

# 리스트 컴프리헨션으로 2차원 리스트 생성
# 3x3 영행렬
zeros = [[0 for _ in range(3)] for _ in range(3)]
print(f"영행렬: {zeros}")

# 구구단 표
multiplication_table = [[i * j for j in range(1, 10)] for i in range(2, 10)]
print("구구단 2단:", multiplication_table[0][:5])  # 2단의 처음 5개
```

### 6.2 리스트 안의 다양한 데이터 구조

```python
# 복합 데이터 구조
students = [
    ["김철수", 20, [85, 90, 78]],          # 이름, 나이, 성적들
    ["이영희", 22, [92, 88, 95]],
    ["박민수", 21, [76, 82, 89]]
]

# 학생 정보 출력
for student in students:
    name, age, scores = student
    average = sum(scores) / len(scores)
    print(f"{name} ({age}세) - 평균: {average:.1f}점")

# 특정 학생의 특정 과목 점수
print(f"김철수의 두 번째 시험 점수: {students[0][2][1]}")

# 딕셔너리와 리스트 조합
products = [
    {"name": "노트북", "price": 1200000, "tags": ["전자제품", "컴퓨터"]},
    {"name": "마우스", "price": 30000, "tags": ["전자제품", "악세서리"]},
    {"name": "키보드", "price": 80000, "tags": ["전자제품", "입력장치"]}
]

# 특정 태그를 가진 제품 찾기
electronic_products = []
for product in products:
    if "전자제품" in product["tags"]:
        electronic_products.append(product["name"])

print(f"전자제품: {electronic_products}")
```

## 7. 리스트와 튜플의 고급 활용

### 7.1 언패킹 (Unpacking)

```python
# 기본 언패킹
coordinates = (10, 20)
x, y = coordinates
print(f"x: {x}, y: {y}")

# 리스트 언패킹
colors = ["red", "green", "blue"]
primary1, primary2, primary3 = colors
print(f"원색들: {primary1}, {primary2}, {primary3}")

# 확장 언패킹 (Python 3.0+)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
first, second, *middle, last = numbers
print(f"첫 번째: {first}")
print(f"두 번째: {second}")
print(f"중간 요소들: {middle}")
print(f"마지막: {last}")

# 함수 인자로 언패킹
def print_coordinates(x, y, z):
    print(f"좌표: ({x}, {y}, {z})")

point_3d = (1, 2, 3)
print_coordinates(*point_3d)  # 튜플 언패킹하여 인자로 전달

# 딕셔너리 언패킹
def introduce(name, age, city):
    print(f"안녕하세요, {name}입니다. {age}세이고 {city}에 살고 있습니다.")

person_info = {"name": "김철수", "age": 25, "city": "서울"}
introduce(**person_info)  # 딕셔너리 언패킹
```

### 7.2 리스트 컴프리헨션 심화

```python
# 기본 리스트 컴프리헨션
squares = [x**2 for x in range(1, 6)]
print(f"제곱수들: {squares}")  # [1, 4, 9, 16, 25]

# 조건이 있는 컴프리헨션
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(f"짝수의 제곱들: {even_squares}")  # [4, 16, 36, 64, 100]

# 중첩 컴프리헨션
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(f"곱셈 행렬: {matrix}")

# 문자열 처리
words = ["hello", "world", "python", "programming"]
lengths = [len(word) for word in words]
print(f"단어 길이들: {lengths}")

# 조건부 표현식과 함께
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
descriptions = ["짝수" if x % 2 == 0 else "홀수" for x in numbers]
print(f"숫자 설명들: {descriptions}")

# 중첩 리스트 평탄화 (flattening)
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [item for sublist in nested_list for item in sublist]
print(f"평탄화된 리스트: {flattened}")  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 7.3 얕은 복사 vs 깊은 복사

```python
import copy

# 얕은 복사 (shallow copy)
original = [[1, 2, 3], [4, 5, 6]]

# 슬라이싱으로 복사
shallow_copy1 = original[:]
# copy() 메서드로 복사
shallow_copy2 = original.copy()
# list() 함수로 복사
shallow_copy3 = list(original)

# 내부 리스트 수정
original[0][0] = 99

print(f"원본: {original}")           # [[99, 2, 3], [4, 5, 6]]
print(f"얕은 복사1: {shallow_copy1}")  # [[99, 2, 3], [4, 5, 6]] - 영향 받음!
print(f"얕은 복사2: {shallow_copy2}")  # [[99, 2, 3], [4, 5, 6]] - 영향 받음!

# 깊은 복사 (deep copy)
original = [[1, 2, 3], [4, 5, 6]]
deep_copy = copy.deepcopy(original)

original[0][0] = 99
print(f"원본: {original}")        # [[99, 2, 3], [4, 5, 6]]
print(f"깊은 복사: {deep_copy}")   # [[1, 2, 3], [4, 5, 6]] - 영향 안 받음!
```

## 8. 실용적인 예제들

### 8.1 성적 관리 시스템

```python
class GradeManager:
    def __init__(self):
        # 학생 데이터: [이름, [과목1점수, 과목2점수, ...]]
        self.students = []
        self.subjects = ["국어", "영어", "수학", "과학", "사회"]
    
    def add_student(self, name, scores):
        """학생 추가"""
        if len(scores) != len(self.subjects):
            print(f"점수는 {len(self.subjects)}개 과목에 맞춰 입력해주세요.")
            return
        
        self.students.append([name, scores[:]])  # 점수 리스트 복사하여 저장
        print(f"{name} 학생이 추가되었습니다.")
    
    def get_student_average(self, name):
        """특정 학생의 평균 계산"""
        for student in self.students:
            if student[0] == name:
                scores = student[1]
                return sum(scores) / len(scores)
        return None
    
    def get_subject_average(self, subject_index):
        """특정 과목의 전체 평균 계산"""
        if not self.students:
            return 0
        
        total = sum(student[1][subject_index] for student in self.students)
        return total / len(self.students)
    
    def get_top_students(self, n=3):
        """상위 n명의 학생들 반환"""
        # (이름, 평균) 튜플 리스트 생성
        student_averages = []
        for student in self.students:
            name, scores = student
            average = sum(scores) / len(scores)
            student_averages.append((name, average))
        
        # 평균 점수로 정렬 (내림차순)
        student_averages.sort(key=lambda x: x[1], reverse=True)
        return student_averages[:n]
    
    def print_report(self):
        """성적표 출력"""
        if not self.students:
            print("등록된 학생이 없습니다.")
            return
        
        print("\n" + "="*60)
        print("성적표")
        print("="*60)
        
        # 헤더 출력
        header = "이름".ljust(8)
        for subject in self.subjects:
            header += subject.center(6)
        header += "평균".center(8)
        print(header)
        print("-" * 60)
        
        # 학생별 성적 출력
        for student in self.students:
            name, scores = student
            line = name.ljust(8)
            for score in scores:
                line += str(score).center(6)
            average = sum(scores) / len(scores)
            line += f"{average:.1f}".center(8)
            print(line)
        
        # 과목별 평균 출력
        print("-" * 60)
        avg_line = "평균".ljust(8)
        for i in range(len(self.subjects)):
            subject_avg = self.get_subject_average(i)
            avg_line += f"{subject_avg:.1f}".center(6)
        print(avg_line)

# 사용 예제
gm = GradeManager()

# 학생 데이터 추가
gm.add_student("김철수", [85, 90, 78, 92, 88])
gm.add_student("이영희", [92, 85, 95, 89, 91])
gm.add_student("박민수", [78, 82, 85, 79, 83])
gm.add_student("최지영", [96, 94, 92, 95, 93])

# 성적표 출력
gm.print_report()

# 상위 학생들
print("\n상위 3명:")
top_students = gm.get_top_students(3)
for i, (name, avg) in enumerate(top_students, 1):
    print(f"{i}등: {name} (평균 {avg:.1f}점)")
```

### 8.2 장바구니 시스템

```python
class ShoppingCart:
    def __init__(self):
        # 장바구니: [(상품명, 가격, 수량), ...]
        self.items = []
    
    def add_item(self, name, price, quantity=1):
        """상품 추가"""
        # 이미 있는 상품이면 수량 증가
        for i, (item_name, item_price, item_quantity) in enumerate(self.items):
            if item_name == name and item_price == price:
                self.items[i] = (item_name, item_price, item_quantity + quantity)
                print(f"{name} {quantity}개가 추가되었습니다. (총 {item_quantity + quantity}개)")
                return
        
        # 새로운 상품 추가
        self.items.append((name, price, quantity))
        print(f"{name} {quantity}개가 장바구니에 추가되었습니다.")
    
    def remove_item(self, name):
        """상품 제거"""
        for i, (item_name, _, _) in enumerate(self.items):
            if item_name == name:
                removed_item = self.items.pop(i)
                print(f"{removed_item[0]}이(가) 장바구니에서 제거되었습니다.")
                return
        print(f"{name}을(를) 장바구니에서 찾을 수 없습니다.")
    
    def update_quantity(self, name, new_quantity):
        """수량 변경"""
        if new_quantity <= 0:
            self.remove_item(name)
            return
        
        for i, (item_name, item_price, _) in enumerate(self.items):
            if item_name == name:
                self.items[i] = (item_name, item_price, new_quantity)
                print(f"{name}의 수량이 {new_quantity}개로 변경되었습니다.")
                return
        print(f"{name}을(를) 장바구니에서 찾을 수 없습니다.")
    
    def get_total_price(self):
        """총 가격 계산"""
        return sum(price * quantity for _, price, quantity in self.items)
    
    def get_total_items(self):
        """총 상품 개수 계산"""
        return sum(quantity for _, _, quantity in self.items)
    
    def apply_discount(self, discount_rate):
        """할인 적용 (할인된 새 리스트 반환)"""
        discounted_items = []
        for name, price, quantity in self.items:
            discounted_price = price * (1 - discount_rate)
            discounted_items.append((name, discounted_price, quantity))
        return discounted_items
    
    def print_cart(self):
        """장바구니 출력"""
        if not self.items:
            print("장바구니가 비어있습니다.")
            return
        
        print("\n" + "="*50)
        print("장바구니")
        print("="*50)
        print("상품명".ljust(15) + "가격".rjust(8) + "수량".rjust(6) + "소계".rjust(10))
        print("-" * 50)
        
        for name, price, quantity in self.items:
            subtotal = price * quantity
            print(f"{name.ljust(15)}{price:8,.0f}{quantity:6}{subtotal:10,.0f}")
        
        print("-" * 50)
        print(f"총 상품 수: {self.get_total_items()}개")
        print(f"총 가격: {self.get_total_price():,.0f}원")

# 사용 예제
cart = ShoppingCart()

# 상품 추가
cart.add_item("노트북", 1200000, 1)
cart.add_item("마우스", 30000, 2)
cart.add_item("키보드", 80000, 1)
cart.add_item("마우스", 30000, 1)  # 기존 마우스에 수량 추가

# 장바구니 출력
cart.print_cart()

# 수량 변경
cart.update_quantity("마우스", 5)

# 상품 제거
cart.remove_item("키보드")

# 최종 장바구니
cart.print_cart()

# 10% 할인 적용 시뮬레이션
print("\n10% 할인 적용 시:")
discounted = cart.apply_discount(0.1)
for name, price, quantity in discounted:
    print(f"{name}: {price:,.0f}원 x {quantity}개 = {price*quantity:,.0f}원")
```

### 8.3 텍스트 데이터 분석기

```python
class TextAnalyzer:
    def __init__(self, text):
        self.original_text = text
        self.words = self._extract_words()
        self.sentences = self._extract_sentences()
    
    def _extract_words(self):
        """텍스트에서 단어 추출"""
        import string
        # 구두점 제거하고 소문자로 변환
        cleaned = self.original_text.lower()
        for punct in string.punctuation:
            cleaned = cleaned.replace(punct, ' ')
        
        # 단어 리스트 반환 (빈 문자열 제외)
        words = [word for word in cleaned.split() if word]
        return words
    
    def _extract_sentences(self):
        """텍스트에서 문장 추출"""
        # 간단한 문장 분리 (. ! ? 기준)
        sentences = []
        current_sentence = ""
        
        for char in self.original_text:
            current_sentence += char
            if char in '.!?':
                sentences.append(current_sentence.strip())
                current_sentence = ""
        
        # 마지막 문장이 구두점으로 끝나지 않은 경우
        if current_sentence.strip():
            sentences.append(current_sentence.strip())
        
        return [s for s in sentences if s]  # 빈 문장 제외
    
    def get_word_frequency(self):
        """단어 빈도 계산"""
        frequency = {}
        for word in self.words:
            frequency[word] = frequency.get(word, 0) + 1
        
        # 빈도순으로 정렬된 튜플 리스트 반환
        return sorted(frequency.items(), key=lambda x: x[1], reverse=True)
    
    def get_most_common_words(self, n=10):
        """가장 많이 사용된 n개 단어"""
        word_freq = self.get_word_frequency()
        return word_freq[:n]
    
    def get_statistics(self):
        """텍스트 통계 정보"""
        char_count = len(self.original_text)
        char_count_no_spaces = len(self.original_text.replace(' ', ''))
        word_count = len(self.words)
        sentence_count = len(self.sentences)
        
        # 평균 단어 길이
        avg_word_length = sum(len(word) for word in self.words) / len(self.words) if self.words else 0
        
        # 평균 문장 길이 (단어 수 기준)
        avg_sentence_length = word_count / sentence_count if sentence_count else 0
        
        return {
            'total_characters': char_count,
            'characters_no_spaces': char_count_no_spaces,
            'total_words': word_count,
            'total_sentences': sentence_count,
            'unique_words': len(set(self.words)),
            'avg_word_length': avg_word_length,
            'avg_sentence_length': avg_sentence_length
        }
    
    def find_long_words(self, min_length=6):
        """특정 길이 이상의 단어들"""
        long_words = [word for word in set(self.words) if len(word) >= min_length]
        return sorted(long_words, key=len, reverse=True)
    
    def print_analysis(self):
        """분석 결과 출력"""
        stats = self.get_statistics()
        
        print("="*50)
        print("텍스트 분석 결과")
        print("="*50)
        
        print(f"총 문자 수: {stats['total_characters']:,}")
        print(f"공백 제외 문자 수: {stats['characters_no_spaces']:,}")
        print(f"총 단어 수: {stats['total_words']:,}")
        print(f"고유 단어 수: {stats['unique_words']:,}")
        print(f"총 문장 수: {stats['total_sentences']:,}")
        print(f"평균 단어 길이: {stats['avg_word_length']:.1f}자")
        print(f"평균 문장 길이: {stats['avg_sentence_length']:.1f}단어")
        
        print("\n상위 10개 자주 사용된 단어:")
        most_common = self.get_most_common_words(10)
        for i, (word, count) in enumerate(most_common, 1):
            print(f"{i:2}. {word} ({count}번)")
        
        print(f"\n6글자 이상 긴 단어들:")
        long_words = self.find_long_words(6)[:10]  # 상위 10개만
        for word in long_words:
            print(f"- {word} ({len(word)}글자)")

# 사용 예제
sample_text = """
Python is a high-level programming language. Python is easy to learn and powerful to use.
Many developers love Python because of its simplicity and readability.
Python can be used for web development, data analysis, artificial intelligence, and more.
The Python community is very supportive and helpful.
Learning Python is a great investment for your programming career!
"""

analyzer = TextAnalyzer(sample_text)
analyzer.print_analysis()
```

## 9. 연습 문제

### 연습 1: 리스트 통계 계산기
숫자 리스트를 입력받아 평균, 중앙값, 최빈값을 계산하는 함수를 작성하세요.

### 연습 2: 행렬 연산기
두 개의 2차원 리스트(행렬)를 입력받아 덧셈, 뺄셈, 곱셈을 수행하는 함수들을 작성하세요.

### 연습 3: 할일 목록 관리자
튜플을 사용하여 할일 항목을 저장하고 관리하는 시스템을 만드세요. 각 할일은 (제목, 설명, 우선순위, 완료여부) 형태로 저장합니다.

### 연습 4: 중복 제거기
중첩 리스트에서 중복된 요소들을 제거하고 원래 순서를 유지하는 함수를 작성하세요.

## 정리

이 챕터에서 학습한 내용:

1. **리스트 기본**: 생성, 인덱싱, 슬라이싱, 주요 특징
2. **리스트 메서드**: 추가, 제거, 검색, 정렬 관련 메서드들
3. **튜플 기본**: 생성, 특징, 제한적인 메서드들
4. **리스트 vs 튜플**: 변경 가능성, 성능, 사용 상황
5. **중첩 구조**: 2차원 리스트, 복합 데이터 구조
6. **고급 활용**: 언패킹, 리스트 컴프리헨션, 복사
7. **실용 예제**: 성적 관리, 장바구니, 텍스트 분석

다음 챕터에서는 딕셔너리와 집합을 학습하여 더 다양한 데이터 구조 활용법을 배워보겠습니다.

### 핵심 포인트
- 리스트는 변경 가능하고 다양한 메서드 제공, 튜플은 변경 불가능하지만 빠르고 안전
- 슬라이싱과 인덱싱은 두 자료형 모두에서 동일하게 작동
- 리스트 컴프리헨션으로 간결하고 효율적인 코드 작성 가능
- 중첩 구조 사용 시 얕은 복사와 깊은 복사의 차이점 이해 필요
- 언패킹을 활용하면 코드가 더 읽기 쉽고 우아해짐 