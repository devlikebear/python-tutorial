# Chapter 10: 함수 기초 (Functions Basics)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 함수의 개념과 필요성 이해하기
- 함수를 정의하고 호출하는 방법 익히기
- 매개변수와 인수의 차이점과 활용법 이해하기
- 반환값을 사용하는 다양한 방법 익히기
- 지역변수와 전역변수의 스코프 이해하기
- 다양한 매개변수 타입 활용하기 (기본값, 키워드, 가변 인수)
- 람다 함수의 기본 개념과 활용법
- 실무에서 활용 가능한 함수 작성하기

## 1. 함수의 기본 개념

### 1.1 함수란?

함수는 **특정한 작업을 수행하는 코드 블록**입니다. 입력(매개변수)을 받아서 처리한 후 결과(반환값)를 돌려주는 **재사용 가능한 코드 단위**입니다.

```python
# 함수를 사용하지 않는 경우 (코드 중복)
# 세 학생의 평균 계산
student1_scores = [85, 90, 78, 92]
student1_average = sum(student1_scores) / len(student1_scores)
print(f"학생1 평균: {student1_average:.1f}")

student2_scores = [76, 88, 84, 90]
student2_average = sum(student2_scores) / len(student2_scores)
print(f"학생2 평균: {student2_average:.1f}")

student3_scores = [95, 87, 91, 89]
student3_average = sum(student3_scores) / len(student3_scores)
print(f"학생3 평균: {student3_average:.1f}")

print("-" * 30)

# 함수를 사용하는 경우 (코드 재사용)
def calculate_average(scores):
    """점수 리스트의 평균을 계산하는 함수"""
    return sum(scores) / len(scores)

# 함수를 사용하여 같은 작업 수행
students_scores = [
    [85, 90, 78, 92],
    [76, 88, 84, 90],
    [95, 87, 91, 89]
]

for i, scores in enumerate(students_scores, 1):
    average = calculate_average(scores)
    print(f"학생{i} 평균: {average:.1f}")
```

### 1.2 함수의 장점

```python
# 1. 코드 재사용성
def greet_user(name, language="ko"):
    """사용자에게 인사하는 함수"""
    if language == "ko":
        return f"안녕하세요, {name}님!"
    elif language == "en":
        return f"Hello, {name}!"
    else:
        return f"Hi, {name}!"

# 여러 번 재사용 가능
print(greet_user("김철수"))
print(greet_user("Alice", "en"))
print(greet_user("田中", "jp"))

# 2. 코드 가독성과 유지보수성
def is_prime(number):
    """소수인지 판별하는 함수"""
    if number < 2:
        return False
    for i in range(2, int(number ** 0.5) + 1):
        if number % i == 0:
            return False
    return True

def find_primes_in_range(start, end):
    """범위 내 모든 소수를 찾는 함수"""
    primes = []
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
    return primes

# 함수 이름만으로도 기능을 이해할 수 있음
primes_1_to_30 = find_primes_in_range(1, 30)
print(f"1-30 사이의 소수: {primes_1_to_30}")

# 3. 모듈화와 추상화
def format_currency(amount, currency="원"):
    """금액을 통화 형식으로 포맷팅"""
    return f"{amount:,}{currency}"

def calculate_tax(amount, tax_rate=0.1):
    """세금을 계산하는 함수"""
    return amount * tax_rate

def calculate_total_with_tax(amount, tax_rate=0.1):
    """세금 포함 총액 계산"""
    tax = calculate_tax(amount, tax_rate)
    total = amount + tax
    return amount, tax, total

# 복잡한 계산도 간단한 함수 호출로 해결
price, tax, total = calculate_total_with_tax(10000, 0.1)
print(f"상품가격: {format_currency(price)}")
print(f"세    금: {format_currency(tax)}")
print(f"총  가격: {format_currency(total)}")
```

## 2. 함수 정의와 호출

### 2.1 기본 함수 정의

```python
# 기본 함수 정의 문법
def function_name():
    """함수 설명 (docstring)"""
    # 함수 본문
    pass

# 실제 예제
def say_hello():
    """간단한 인사 함수"""
    print("안녕하세요!")

def print_separator():
    """구분선을 출력하는 함수"""
    print("=" * 40)

# 함수 호출
say_hello()
print_separator()
say_hello()

# 함수 정보 확인
print(f"함수 이름: {say_hello.__name__}")
print(f"함수 설명: {say_hello.__doc__}")
```

### 2.2 매개변수가 있는 함수

```python
# 하나의 매개변수
def greet(name):
    """이름을 받아서 인사하는 함수"""
    print(f"안녕하세요, {name}님!")

# 여러 개의 매개변수
def introduce_person(name, age, city):
    """개인 정보를 소개하는 함수"""
    print(f"이름: {name}")
    print(f"나이: {age}세")
    print(f"거주지: {city}")

# 함수 호출
greet("김철수")
print()
introduce_person("이영희", 25, "서울")

# 매개변수 순서 주의
def calculate_rectangle_area(width, height):
    """직사각형의 넓이를 계산하고 출력"""
    area = width * height
    print(f"가로 {width}cm, 세로 {height}cm")
    print(f"넓이: {area}cm²")

calculate_rectangle_area(10, 5)  # 순서 중요!
calculate_rectangle_area(5, 10)  # 다른 결과
```

### 2.3 반환값이 있는 함수

```python
# 값을 반환하는 함수
def add_numbers(a, b):
    """두 수를 더한 결과를 반환"""
    result = a + b
    return result

def multiply_numbers(a, b):
    """두 수를 곱한 결과를 반환"""
    return a * b  # 직접 반환도 가능

# 반환값 사용
sum_result = add_numbers(10, 20)
product_result = multiply_numbers(5, 6)

print(f"덧셈 결과: {sum_result}")
print(f"곱셈 결과: {product_result}")

# 반환값을 다른 함수의 인수로 사용
final_result = add_numbers(sum_result, product_result)
print(f"최종 결과: {final_result}")

# 여러 값 반환
def calculate_circle(radius):
    """원의 둘레와 넓이를 계산"""
    import math
    circumference = 2 * math.pi * radius
    area = math.pi * radius ** 2
    return circumference, area  # 튜플로 반환

# 여러 값 받기
perimeter, area = calculate_circle(5)
print(f"반지름 5인 원:")
print(f"둘레: {perimeter:.2f}")
print(f"넓이: {area:.2f}")

# 조건부 반환
def get_grade(score):
    """점수에 따른 등급 반환"""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# 함수 결과를 바로 사용
student_score = 85
print(f"점수 {student_score}점: {get_grade(student_score)}등급")
```

## 3. 매개변수와 인수의 이해

### 3.1 매개변수 vs 인수

```python
# 매개변수(Parameter): 함수 정의에서 사용하는 변수
def create_profile(name, age):  # name, age는 매개변수
    """사용자 프로필을 생성하는 함수"""
    profile = f"이름: {name}, 나이: {age}세"
    return profile

# 인수(Argument): 함수 호출 시 전달하는 실제 값
user_profile = create_profile("김철수", 25)  # "김철수", 25는 인수
print(user_profile)

# 다양한 인수 전달 방법
def display_info(title, content, separator="="):
    """정보를 포맷팅해서 출력"""
    print(separator * len(title))
    print(title)
    print(separator * len(title))
    print(content)
    print()

# 위치 인수 (positional arguments)
display_info("공지사항", "내일 회의가 있습니다.")

# 키워드 인수 (keyword arguments)
display_info(title="알림", content="점심시간이 변경되었습니다.", separator="-")
display_info(content="새로운 프로젝트 시작", title="프로젝트", separator="*")
```

### 3.2 기본값 매개변수

```python
# 기본값이 있는 매개변수
def create_email(username, domain="gmail.com", is_business=False):
    """이메일 주소를 생성하는 함수"""
    if is_business:
        domain = "company.com"
    
    email = f"{username}@{domain}"
    return email

# 다양한 호출 방법
print(create_email("john"))  # 기본값 사용
print(create_email("mary", "naver.com"))  # domain만 변경
print(create_email("bob", is_business=True))  # is_business만 변경
print(create_email("alice", "yahoo.com", True))  # 모든 값 지정

# 기본값 매개변수 주의사항
def add_item_to_list(item, target_list=None):
    """리스트에 아이템을 추가 (올바른 방법)"""
    if target_list is None:
        target_list = []  # 매번 새로운 리스트 생성
    
    target_list.append(item)
    return target_list

# 잘못된 예시 (실제로는 사용하지 말 것)
def add_item_wrong(item, target_list=[]):
    """잘못된 기본값 사용 예시"""
    target_list.append(item)
    return target_list

# 올바른 방법 테스트
list1 = add_item_to_list("사과")
list2 = add_item_to_list("바나나")
print(f"독립적인 리스트1: {list1}")
print(f"독립적인 리스트2: {list2}")

# 가변 기본값을 안전하게 사용하는 패턴
def create_student_record(name, subjects=None, grades=None):
    """학생 기록을 생성하는 함수"""
    if subjects is None:
        subjects = ["수학", "영어", "과학"]
    if grades is None:
        grades = [0, 0, 0]
    
    return {
        "name": name,
        "subjects": subjects.copy(),  # 복사본 사용
        "grades": grades.copy()
    }

student1 = create_student_record("김철수")
student2 = create_student_record("이영희", ["국어", "수학"])
print(f"학생1: {student1}")
print(f"학생2: {student2}")
```

### 3.3 가변 인수 (*args, **kwargs)

```python
# *args: 가변 위치 인수
def calculate_sum(*numbers):
    """여러 개의 숫자를 모두 더하는 함수"""
    print(f"받은 인수들: {numbers}")  # 튜플로 저장됨
    total = sum(numbers)
    return total

# 다양한 개수의 인수 전달
print(f"합계: {calculate_sum(1, 2, 3)}")
print(f"합계: {calculate_sum(10, 20, 30, 40, 50)}")
print(f"합계: {calculate_sum(100)}")

# **kwargs: 가변 키워드 인수
def create_person(**person_info):
    """인적사항을 딕셔너리로 생성하는 함수"""
    print(f"받은 정보: {person_info}")  # 딕셔너리로 저장됨
    
    # 필수 정보 확인
    if "name" not in person_info:
        return "이름은 필수 정보입니다."
    
    return person_info

# 다양한 키워드 인수 전달
person1 = create_person(name="김철수", age=25, city="서울")
person2 = create_person(name="이영희", age=30, job="개발자", hobby="독서")
print(f"인물1: {person1}")
print(f"인물2: {person2}")

# *args와 **kwargs 함께 사용
def process_data(operation, *args, **kwargs):
    """데이터를 처리하는 범용 함수"""
    print(f"작업: {operation}")
    print(f"위치 인수: {args}")
    print(f"키워드 인수: {kwargs}")
    
    if operation == "add":
        return sum(args)
    elif operation == "multiply":
        result = 1
        for num in args:
            result *= num
        return result
    elif operation == "format":
        name = kwargs.get("name", "Unknown")
        age = kwargs.get("age", 0)
        return f"{name} ({age}세)"

# 함수 사용 예제
print(f"덧셈 결과: {process_data('add', 1, 2, 3, 4, 5)}")
print(f"곱셈 결과: {process_data('multiply', 2, 3, 4)}")
print(f"포맷 결과: {process_data('format', name='김철수', age=25)}")

# 리스트나 딕셔너리를 언패킹하여 전달
numbers_list = [10, 20, 30, 40]
person_dict = {"name": "박민수", "age": 28, "city": "부산"}

print(f"리스트 언패킹: {calculate_sum(*numbers_list)}")
print(f"딕셔너리 언패킹: {create_person(**person_dict)}")
```

## 4. 변수의 스코프 (Scope)

### 4.1 지역변수와 전역변수

```python
# 전역변수
global_message = "전역 메시지입니다"
global_counter = 0

def demonstrate_scope():
    """스코프 테스트 함수"""
    # 지역변수
    local_message = "지역 메시지입니다"
    local_counter = 10
    
    print(f"함수 내부:")
    print(f"  지역 메시지: {local_message}")
    print(f"  지역 카운터: {local_counter}")
    print(f"  전역 메시지: {global_message}")  # 전역변수 접근 가능
    print(f"  전역 카운터: {global_counter}")

# 함수 호출
demonstrate_scope()

print(f"\n함수 외부:")
print(f"  전역 메시지: {global_message}")
print(f"  전역 카운터: {global_counter}")

# print(local_message)  # 오류! 지역변수는 함수 외부에서 접근 불가

# 변수 이름이 같을 때
user_name = "전역 사용자"

def greet_user():
    user_name = "지역 사용자"  # 지역변수가 전역변수를 가림
    print(f"안녕하세요, {user_name}님!")

greet_user()
print(f"전역 변수: {user_name}")  # 전역변수는 변경되지 않음
```

### 4.2 global과 nonlocal 키워드

```python
# global 키워드 사용
account_balance = 1000  # 전역변수

def deposit(amount):
    """입금 함수"""
    global account_balance  # 전역변수 수정 선언
    account_balance += amount
    print(f"{amount}원 입금. 잔액: {account_balance}원")

def withdraw(amount):
    """출금 함수"""
    global account_balance
    if account_balance >= amount:
        account_balance -= amount
        print(f"{amount}원 출금. 잔액: {account_balance}원")
    else:
        print("잔액이 부족합니다.")

def check_balance():
    """잔액 확인 함수 (global 없이도 읽기 가능)"""
    print(f"현재 잔액: {account_balance}원")

# 계좌 거래 테스트
check_balance()
deposit(500)
withdraw(300)
check_balance()

# nonlocal 키워드 (중첩 함수)
def create_counter():
    """카운터 생성기 함수"""
    count = 0  # 외부 함수의 지역변수
    
    def increment():
        """카운터 증가 함수"""
        nonlocal count  # 외부 함수의 변수 수정
        count += 1
        return count
    
    def decrement():
        """카운터 감소 함수"""
        nonlocal count
        count -= 1
        return count
    
    def get_count():
        """현재 카운터 값 반환"""
        return count
    
    # 함수들을 딕셔너리로 반환
    return {
        "increment": increment,
        "decrement": decrement,
        "get_count": get_count
    }

# 카운터 사용
counter = create_counter()
print(f"초기값: {counter['get_count']()}")
print(f"증가 후: {counter['increment']()}")
print(f"증가 후: {counter['increment']()}")
print(f"감소 후: {counter['decrement']()}")
print(f"현재값: {counter['get_count']()}")

# 각 카운터는 독립적
counter1 = create_counter()
counter2 = create_counter()

counter1['increment']()
counter1['increment']()
counter2['increment']()

print(f"카운터1: {counter1['get_count']()}")
print(f"카운터2: {counter2['get_count']()}")
```

## 5. 람다 함수 (Lambda Functions)

### 5.1 람다 함수 기본

```python
# 일반 함수 vs 람다 함수
def square(x):
    """제곱을 계산하는 일반 함수"""
    return x ** 2

# 같은 기능의 람다 함수
square_lambda = lambda x: x ** 2

# 두 함수 모두 같은 결과
print(f"일반 함수: {square(5)}")
print(f"람다 함수: {square_lambda(5)}")

# 여러 매개변수를 가진 람다 함수
add = lambda x, y: x + y
multiply = lambda x, y, z: x * y * z
greet = lambda name: f"안녕하세요, {name}님!"

print(f"덧셈: {add(10, 20)}")
print(f"곱셈: {multiply(2, 3, 4)}")
print(f"인사: {greet('김철수')}")

# 조건부 람다 함수
max_value = lambda a, b: a if a > b else b
is_even = lambda n: n % 2 == 0
absolute = lambda x: x if x >= 0 else -x

print(f"최댓값: {max_value(15, 23)}")
print(f"짝수 여부: {is_even(10)}")
print(f"절댓값: {absolute(-7)}")
```

### 5.2 람다 함수의 활용

```python
# 정렬에서 람다 함수 활용
students = [
    {"name": "김철수", "age": 20, "grade": 85},
    {"name": "이영희", "age": 22, "grade": 92},
    {"name": "박민수", "age": 19, "grade": 78},
    {"name": "최지영", "age": 21, "grade": 95}
]

# 나이순 정렬
students_by_age = sorted(students, key=lambda student: student["age"])
print("나이순 정렬:")
for student in students_by_age:
    print(f"  {student['name']} ({student['age']}세)")

# 성적순 정렬 (내림차순)
students_by_grade = sorted(students, key=lambda student: student["grade"], reverse=True)
print("\n성적순 정렬:")
for student in students_by_grade:
    print(f"  {student['name']} ({student['grade']}점)")

# 필터링에서 람다 함수 활용
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 짝수만 필터링
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(f"\n짝수들: {even_numbers}")

# 5보다 큰 수들
greater_than_5 = list(filter(lambda x: x > 5, numbers))
print(f"5보다 큰 수들: {greater_than_5}")

# 성적이 90점 이상인 학생들
top_students = list(filter(lambda student: student["grade"] >= 90, students))
print(f"\n우수 학생들:")
for student in top_students:
    print(f"  {student['name']} ({student['grade']}점)")

# map 함수와 람다 함수
# 모든 수를 제곱
squared_numbers = list(map(lambda x: x ** 2, numbers))
print(f"\n제곱수들: {squared_numbers}")

# 학생 이름들만 추출
student_names = list(map(lambda student: student["name"], students))
print(f"학생 이름들: {student_names}")

# 복잡한 변환
formatted_students = list(map(
    lambda s: f"{s['name']} ({s['age']}세, {s['grade']}점)", 
    students
))
print("\n포맷된 학생 정보:")
for info in formatted_students:
    print(f"  {info}")
```

## 6. 실용적인 함수 예제들

### 6.1 계산기 함수들

```python
class SimpleCalculator:
    """간단한 계산기 함수들의 모음"""
    
    @staticmethod
    def add(a, b):
        """덧셈"""
        return a + b
    
    @staticmethod
    def subtract(a, b):
        """뺄셈"""
        return a - b
    
    @staticmethod
    def multiply(a, b):
        """곱셈"""
        return a * b
    
    @staticmethod
    def divide(a, b):
        """나눗셈 (0으로 나누기 방지)"""
        if b == 0:
            return "0으로 나눌 수 없습니다."
        return a / b
    
    @staticmethod
    def power(base, exponent):
        """거듭제곱"""
        return base ** exponent
    
    @staticmethod
    def sqrt(number):
        """제곱근"""
        if number < 0:
            return "음수의 제곱근은 계산할 수 없습니다."
        return number ** 0.5

# 계산기 함수 딕셔너리
operations = {
    "+": SimpleCalculator.add,
    "-": SimpleCalculator.subtract,
    "*": SimpleCalculator.multiply,
    "/": SimpleCalculator.divide,
    "**": SimpleCalculator.power
}

def calculate(a, operator, b):
    """계산 실행 함수"""
    if operator in operations:
        result = operations[operator](a, b)
        return f"{a} {operator} {b} = {result}"
    else:
        return "지원하지 않는 연산자입니다."

# 계산기 테스트
print(calculate(10, "+", 5))
print(calculate(10, "-", 3))
print(calculate(4, "*", 7))
print(calculate(15, "/", 3))
print(calculate(2, "**", 8))
print(calculate(9, "/", 0))  # 오류 처리 테스트

# 제곱근 테스트
print(f"√16 = {SimpleCalculator.sqrt(16)}")
print(f"√-4 = {SimpleCalculator.sqrt(-4)}")
```

### 6.2 문자열 처리 함수들

```python
def clean_text(text):
    """텍스트를 정리하는 함수"""
    # 앞뒤 공백 제거 후 소문자로 변환
    cleaned = text.strip().lower()
    return cleaned

def count_words(text):
    """텍스트의 단어 개수를 세는 함수"""
    words = text.split()
    return len(words)

def count_characters(text, include_spaces=False):
    """문자 개수를 세는 함수"""
    if include_spaces:
        return len(text)
    else:
        return len(text.replace(" ", ""))

def is_palindrome(text):
    """회문인지 확인하는 함수"""
    cleaned = clean_text(text).replace(" ", "")
    return cleaned == cleaned[::-1]

def capitalize_words(text):
    """각 단어의 첫 글자를 대문자로 만드는 함수"""
    return " ".join(word.capitalize() for word in text.split())

def extract_numbers(text):
    """텍스트에서 숫자만 추출하는 함수"""
    numbers = []
    current_number = ""
    
    for char in text:
        if char.isdigit() or char == ".":
            current_number += char
        else:
            if current_number:
                try:
                    # 정수인지 실수인지 판단하여 변환
                    if "." in current_number:
                        numbers.append(float(current_number))
                    else:
                        numbers.append(int(current_number))
                except ValueError:
                    pass  # 변환 실패시 무시
                current_number = ""
    
    # 마지막 숫자 처리
    if current_number:
        try:
            if "." in current_number:
                numbers.append(float(current_number))
            else:
                numbers.append(int(current_number))
        except ValueError:
            pass
    
    return numbers

# 문자열 처리 함수들 테스트
test_text = "  Hello World! This is a Test Message 123.45 and 678  "

print("=== 문자열 처리 함수 테스트 ===")
print(f"원본 텍스트: '{test_text}'")
print(f"정리된 텍스트: '{clean_text(test_text)}'")
print(f"단어 개수: {count_words(test_text)}")
print(f"문자 개수 (공백 포함): {count_characters(test_text, True)}")
print(f"문자 개수 (공백 제외): {count_characters(test_text, False)}")
print(f"첫 글자 대문자: '{capitalize_words(test_text)}'")
print(f"추출된 숫자들: {extract_numbers(test_text)}")

# 회문 테스트
palindrome_tests = ["level", "A man a plan a canal Panama", "hello", "race car"]
print(f"\n회문 테스트:")
for test in palindrome_tests:
    result = is_palindrome(test)
    print(f"  '{test}' -> {result}")
```

### 6.3 데이터 분석 함수들

```python
def calculate_statistics(numbers):
    """숫자 리스트의 기본 통계를 계산하는 함수"""
    if not numbers:
        return None
    
    total = sum(numbers)
    count = len(numbers)
    mean = total / count
    
    # 중앙값 계산
    sorted_numbers = sorted(numbers)
    n = len(sorted_numbers)
    if n % 2 == 0:
        median = (sorted_numbers[n//2 - 1] + sorted_numbers[n//2]) / 2
    else:
        median = sorted_numbers[n//2]
    
    # 최빈값 계산 (간단한 방법)
    frequency = {}
    for num in numbers:
        frequency[num] = frequency.get(num, 0) + 1
    
    max_freq = max(frequency.values())
    mode = [num for num, freq in frequency.items() if freq == max_freq]
    
    return {
        "count": count,
        "sum": total,
        "mean": mean,
        "median": median,
        "mode": mode,
        "min": min(numbers),
        "max": max(numbers),
        "range": max(numbers) - min(numbers)
    }

def find_outliers(numbers, threshold=2):
    """평균에서 벗어난 값들을 찾는 함수 (간단한 방법)"""
    if len(numbers) < 2:
        return []
    
    mean = sum(numbers) / len(numbers)
    
    # 표준편차 계산
    variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)
    std_dev = variance ** 0.5
    
    outliers = []
    for num in numbers:
        if abs(num - mean) > threshold * std_dev:
            outliers.append(num)
    
    return outliers

def group_by_range(numbers, range_size=10):
    """숫자들을 범위별로 그룹화하는 함수"""
    if not numbers:
        return {}
    
    min_val = min(numbers)
    max_val = max(numbers)
    
    groups = {}
    
    for num in numbers:
        # 어느 그룹에 속하는지 계산
        group_index = int((num - min_val) // range_size)
        group_start = min_val + (group_index * range_size)
        group_end = group_start + range_size - 1
        
        group_key = f"{group_start}-{group_end}"
        
        if group_key not in groups:
            groups[group_key] = []
        groups[group_key].append(num)
    
    return groups

# 데이터 분석 함수들 테스트
sample_data = [85, 92, 78, 95, 88, 76, 94, 82, 90, 87, 91, 89, 15, 98]  # 15는 이상값

print("=== 데이터 분석 함수 테스트 ===")
print(f"샘플 데이터: {sample_data}")

# 기본 통계
stats = calculate_statistics(sample_data)
if stats:
    print(f"\n기본 통계:")
    print(f"  개수: {stats['count']}")
    print(f"  합계: {stats['sum']}")
    print(f"  평균: {stats['mean']:.2f}")
    print(f"  중앙값: {stats['median']:.2f}")
    print(f"  최빈값: {stats['mode']}")
    print(f"  최솟값: {stats['min']}")
    print(f"  최댓값: {stats['max']}")
    print(f"  범위: {stats['range']}")

# 이상값 찾기
outliers = find_outliers(sample_data)
print(f"\n이상값들: {outliers}")

# 범위별 그룹화
groups = group_by_range(sample_data, 10)
print(f"\n범위별 그룹화 (10단위):")
for range_key, values in sorted(groups.items()):
    print(f"  {range_key}: {values} ({len(values)}개)")
```

## 7. 연습 문제

### 연습 1: 온도 변환기
섭씨, 화씨, 켈빈 온도를 서로 변환하는 함수들을 작성하세요.

### 연습 2: 비밀번호 검증기
비밀번호가 안전한지 검사하는 함수를 작성하세요. (길이, 대소문자, 숫자, 특수문자 포함 여부)

### 연습 3: 피보나치 수열 생성기
n번째까지의 피보나치 수열을 생성하는 함수를 작성하세요.

### 연습 4: 텍스트 암호화기
간단한 시저 암호를 구현하는 함수들을 작성하세요. (암호화/복호화)

## 정리

이 챕터에서 학습한 내용:

1. **함수의 기본 개념**: 코드 재사용성과 가독성을 크게 향상시킵니다
2. **함수 정의와 호출**: def 키워드, 매개변수, 반환값
3. **매개변수 종류**: 위치 인수, 키워드 인수, 기본값, 가변 인수
4. **변수 스코프**: 지역변수, 전역변수, global, nonlocal
5. **람다 함수**: 간단한 함수 표현, 고차 함수와의 활용
6. **실용적 예제**: 계산기, 문자열 처리, 데이터 분석 함수들

다음 챕터에서는 에러 처리와 디버깅을 학습하여 더욱 안정적인 프로그램을 작성하는 방법을 배워보겠습니다.

### 핵심 포인트
- 함수는 코드의 재사용성과 가독성을 크게 향상시킵니다
- 매개변수와 반환값을 적절히 활용하여 유연한 함수를 설계하세요
- 변수의 스코프를 이해하고 적절한 범위에서 변수를 사용하세요
- 람다 함수는 간단한 함수가 필요할 때 유용합니다
- 함수명과 매개변수명을 명확하게 지어 코드의 의도를 분명히 하세요 