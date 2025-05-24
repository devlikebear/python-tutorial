# Chapter 7: 반복문 (Loops)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- for문과 while문의 기본 문법과 차이점 이해하기
- range() 함수를 활용한 다양한 반복 패턴 구현하기
- 중첩 반복문을 사용하여 복잡한 패턴 처리하기
- break, continue를 사용한 반복문 제어하기
- 리스트, 문자열 등 다양한 iterable 객체 순회하기
- 실용적인 반복문 기반 프로그램 작성하기

## 1. 반복문의 기본 개념

### 1.1 반복문이란?

반복문은 특정 코드 블록을 여러 번 실행할 수 있게 해주는 제어 구조입니다. 같은 작업을 반복해야 할 때 코드를 중복해서 쓰지 않고 효율적으로 처리할 수 있습니다.

```python
# 반복문 없이 (비효율적)
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")
print("Hello World!")

# 반복문 사용 (효율적)
for i in range(5):
    print("Hello World!")
```

### 1.2 Python의 반복문 종류

Python에서는 두 가지 주요 반복문을 제공합니다:

1. **for문**: 정해진 횟수나 특정 컬렉션의 요소들을 순회할 때 사용
2. **while문**: 조건이 참인 동안 계속 반복할 때 사용

## 2. for문 (For Loop)

### 2.1 기본 for문 문법

```python
for 변수 in 반복가능한_객체:
    실행할_코드
```

### 2.2 range() 함수와 for문

`range()` 함수는 숫자 시퀀스를 생성하는 함수로, for문에서 가장 많이 사용됩니다.

```python
# range(stop): 0부터 stop-1까지
for i in range(5):
    print(f"숫자: {i}")
# 출력: 0, 1, 2, 3, 4

# range(start, stop): start부터 stop-1까지
for i in range(2, 8):
    print(f"숫자: {i}")
# 출력: 2, 3, 4, 5, 6, 7

# range(start, stop, step): start부터 stop-1까지 step 간격으로
for i in range(0, 10, 2):
    print(f"짝수: {i}")
# 출력: 0, 2, 4, 6, 8

# 역방향 (감소)
for i in range(10, 0, -1):
    print(f"카운트다운: {i}")
# 출력: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

### 2.3 리스트와 for문

```python
# 리스트 요소 순회
fruits = ["사과", "바나나", "오렌지", "포도"]

for fruit in fruits:
    print(f"과일: {fruit}")

# 인덱스와 함께 순회 (enumerate 사용)
for index, fruit in enumerate(fruits):
    print(f"{index + 1}번째 과일: {fruit}")

# 인덱스만 필요한 경우
for i in range(len(fruits)):
    print(f"{i}번 인덱스의 과일: {fruits[i]}")
```

### 2.4 문자열과 for문

```python
# 문자열의 각 문자 순회
word = "Python"
for char in word:
    print(f"글자: {char}")

# 문자의 위치와 함께 출력
for i, char in enumerate(word):
    print(f"위치 {i}: {char}")
```

### 2.5 딕셔너리와 for문

```python
student_scores = {
    "김철수": 85,
    "이영희": 92,
    "박민수": 78,
    "최지영": 96
}

# 키만 순회
for name in student_scores:
    print(f"학생: {name}")

# 키와 값 함께 순회
for name, score in student_scores.items():
    print(f"{name}: {score}점")

# 값만 순회
for score in student_scores.values():
    print(f"점수: {score}")
```

## 3. while문 (While Loop)

### 3.1 기본 while문 문법

```python
while 조건식:
    실행할_코드
```

### 3.2 기본 while문 예제

```python
# 1부터 5까지 출력
count = 1
while count <= 5:
    print(f"카운트: {count}")
    count += 1  # 반드시 조건을 변경하는 코드가 있어야 함

# 사용자 입력이 'quit'일 때까지 반복
while True:
    user_input = input("명령을 입력하세요 ('quit'로 종료): ")
    if user_input == 'quit':
        break
    print(f"입력받은 명령: {user_input}")
```

### 3.3 while문 주의사항

```python
# 무한 루프 주의! (잘못된 예)
"""
count = 1
while count <= 5:
    print(count)
    # count += 1이 없어서 무한 루프!
"""

# 올바른 예
count = 1
while count <= 5:
    print(count)
    count += 1  # 조건을 변경하는 코드 필수!
```

### 3.4 while문 활용 예제

```python
# 숫자 맞추기 게임
import random

secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("1부터 100 사이의 숫자를 맞춰보세요!")

while attempts < max_attempts:
    try:
        guess = int(input(f"시도 {attempts + 1}/{max_attempts}: "))
        attempts += 1
        
        if guess == secret_number:
            print(f"정답입니다! {attempts}번 만에 맞췄습니다.")
            break
        elif guess < secret_number:
            print("더 큰 숫자입니다.")
        else:
            print("더 작은 숫자입니다.")
        
        if attempts == max_attempts:
            print(f"게임 오버! 정답은 {secret_number}였습니다.")
    
    except ValueError:
        print("숫자만 입력해주세요.")
        attempts -= 1  # 잘못된 입력은 시도 횟수에 포함하지 않음
```

## 4. 반복문 제어: break와 continue

### 4.1 break문

`break`는 반복문을 즉시 종료하고 빠져나갑니다.

```python
# for문에서 break
for i in range(10):
    if i == 5:
        break
    print(i)
# 출력: 0, 1, 2, 3, 4

# while문에서 break
count = 0
while True:
    print(f"카운트: {count}")
    count += 1
    if count == 3:
        break
# 출력: 카운트: 0, 카운트: 1, 카운트: 2

# 실용적인 예: 사용자 입력 처리
while True:
    command = input("명령을 입력하세요 (exit로 종료): ")
    if command.lower() == 'exit':
        print("프로그램을 종료합니다.")
        break
    print(f"실행: {command}")
```

### 4.2 continue문

`continue`는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다.

```python
# 홀수만 출력
for i in range(10):
    if i % 2 == 0:  # 짝수면 건너뛰기
        continue
    print(f"홀수: {i}")
# 출력: 1, 3, 5, 7, 9

# 특정 값 제외하고 처리
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for num in numbers:
    if num == 5:  # 5는 건너뛰기
        continue
    print(f"처리: {num}")

# while문에서 continue
count = 0
while count < 10:
    count += 1
    if count % 3 == 0:  # 3의 배수는 건너뛰기
        continue
    print(f"출력: {count}")
```

### 4.3 중첩 반복문에서 break와 continue

```python
# 중첩 for문에서 break (안쪽 반복문만 종료)
for i in range(3):
    print(f"외부 루프 {i}")
    for j in range(5):
        if j == 3:
            break  # 내부 for문만 종료
        print(f"  내부 루프 {j}")

print()

# 외부 반복문도 종료하려면 플래그 사용
exit_flag = False
for i in range(3):
    if exit_flag:
        break
    print(f"외부 루프 {i}")
    for j in range(5):
        if j == 2 and i == 1:
            exit_flag = True
            break
        print(f"  내부 루프 {j}")
```

## 5. 중첩 반복문 (Nested Loops)

### 5.1 기본 중첩 반복문

```python
# 구구단 출력
print("=== 구구단 ===")
for i in range(2, 10):
    print(f"\n{i}단:")
    for j in range(1, 10):
        result = i * j
        print(f"{i} × {j} = {result}")
```

### 5.2 패턴 출력

```python
# 별 패턴 1: 직각삼각형
print("직각삼각형 패턴:")
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()  # 줄바꿈

# 별 패턴 2: 역직각삼각형
print("\n역직각삼각형 패턴:")
for i in range(5, 0, -1):
    for j in range(i):
        print("*", end="")
    print()

# 별 패턴 3: 피라미드
print("\n피라미드 패턴:")
for i in range(1, 6):
    # 공백 출력
    for j in range(5 - i):
        print(" ", end="")
    # 별 출력
    for k in range(2 * i - 1):
        print("*", end="")
    print()
```

### 5.3 2차원 리스트 처리

```python
# 2차원 리스트 생성 및 처리
matrix = [
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9]
]

# 모든 요소 출력
print("행렬 출력:")
for row in matrix:
    for element in row:
        print(f"{element:2}", end=" ")
    print()

# 인덱스와 함께 처리
print("\n좌표와 함께 출력:")
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"({i},{j}): {matrix[i][j]}")

# 대각선 요소의 합
diagonal_sum = 0
for i in range(len(matrix)):
    diagonal_sum += matrix[i][i]
print(f"\n대각선 요소의 합: {diagonal_sum}")
```

## 6. for문과 while문 선택 기준

### 6.1 for문을 사용하는 경우

```python
# 1. 정해진 횟수만큼 반복
for i in range(10):
    print(f"반복 {i}")

# 2. 컬렉션의 모든 요소 순회
fruits = ["사과", "바나나", "체리"]
for fruit in fruits:
    print(fruit)

# 3. 인덱스가 필요한 경우
numbers = [10, 20, 30, 40, 50]
for i in range(len(numbers)):
    numbers[i] *= 2  # 각 요소를 2배로
```

### 6.2 while문을 사용하는 경우

```python
# 1. 조건에 따라 반복 횟수가 달라지는 경우
import random

count = 0
while random.randint(1, 6) != 6:  # 주사위에서 6이 나올 때까지
    count += 1
print(f"6이 나오기까지 {count}번 던졌습니다.")

# 2. 사용자 입력에 따라 계속 실행
while True:
    command = input("계속하시겠습니까? (y/n): ")
    if command.lower() == 'n':
        break
    print("작업을 계속합니다...")

# 3. 특정 조건이 만족될 때까지
password = ""
while len(password) < 8:
    password = input("8자 이상의 비밀번호를 입력하세요: ")
    if len(password) < 8:
        print("비밀번호가 너무 짧습니다.")
```

## 7. 반복문 활용 패턴

### 7.1 카운터 패턴

```python
# 조건을 만족하는 요소 개수 세기
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_count = 0
for num in numbers:
    if num % 2 == 0:
        even_count += 1

print(f"짝수의 개수: {even_count}")
```

### 7.2 누적 패턴

```python
# 리스트 요소들의 합계
numbers = [10, 20, 30, 40, 50]

total = 0
for num in numbers:
    total += num

print(f"총합: {total}")
print(f"평균: {total / len(numbers)}")

# 최댓값과 최솟값 찾기
numbers = [45, 23, 67, 12, 89, 34]

max_val = numbers[0]
min_val = numbers[0]

for num in numbers:
    if num > max_val:
        max_val = num
    if num < min_val:
        min_val = num

print(f"최댓값: {max_val}, 최솟값: {min_val}")
```

### 7.3 필터링 패턴

```python
# 조건에 맞는 요소만 새로운 리스트에 추가
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 짝수만 필터링
even_numbers = []
for num in numbers:
    if num % 2 == 0:
        even_numbers.append(num)

print(f"짝수들: {even_numbers}")

# 문자열 길이로 필터링
words = ["apple", "banana", "cat", "dog", "elephant", "frog"]
long_words = []

for word in words:
    if len(word) >= 5:
        long_words.append(word)

print(f"5글자 이상 단어들: {long_words}")
```

### 7.4 변환 패턴

```python
# 모든 요소에 동일한 연산 적용
celsius_temps = [0, 10, 20, 30, 40]
fahrenheit_temps = []

for celsius in celsius_temps:
    fahrenheit = (celsius * 9/5) + 32
    fahrenheit_temps.append(fahrenheit)

print("섭씨 -> 화씨 변환:")
for i in range(len(celsius_temps)):
    print(f"{celsius_temps[i]}°C = {fahrenheit_temps[i]}°F")
```

## 8. 실용적인 예제들

### 8.1 간단한 텍스트 분석기

```python
def analyze_text(text):
    """텍스트를 분석하여 통계 정보 반환"""
    
    # 기본 정보
    char_count = len(text)
    word_count = len(text.split())
    
    # 글자별 빈도 계산
    char_frequency = {}
    for char in text.lower():
        if char.isalpha():  # 알파벳만 카운트
            if char in char_frequency:
                char_frequency[char] += 1
            else:
                char_frequency[char] = 1
    
    # 단어별 빈도 계산
    word_frequency = {}
    words = text.lower().split()
    for word in words:
        # 특수문자 제거
        clean_word = ""
        for char in word:
            if char.isalnum():
                clean_word += char
        
        if clean_word:
            if clean_word in word_frequency:
                word_frequency[clean_word] += 1
            else:
                word_frequency[clean_word] = 1
    
    return {
        'char_count': char_count,
        'word_count': word_count,
        'char_frequency': char_frequency,
        'word_frequency': word_frequency
    }

# 사용 예제
sample_text = "Python is a powerful programming language. Python is easy to learn."
result = analyze_text(sample_text)

print(f"총 글자 수: {result['char_count']}")
print(f"총 단어 수: {result['word_count']}")
print("\n글자 빈도:")
for char, count in sorted(result['char_frequency'].items()):
    print(f"'{char}': {count}번")

print("\n단어 빈도:")
for word, count in sorted(result['word_frequency'].items()):
    print(f"'{word}': {count}번")
```

### 8.2 소수 찾기 프로그램

```python
def find_primes(limit):
    """limit까지의 모든 소수를 찾아 반환"""
    
    if limit < 2:
        return []
    
    primes = []
    
    for num in range(2, limit + 1):
        is_prime = True
        
        # 2부터 num의 제곱근까지 나누어보기
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        
        if is_prime:
            primes.append(num)
    
    return primes

# 사용 예제
limit = 50
primes = find_primes(limit)

print(f"1부터 {limit}까지의 소수:")
print(primes)
print(f"총 {len(primes)}개의 소수가 있습니다.")

# 소수를 10개씩 한 줄에 출력
print("\n정렬된 출력:")
for i in range(0, len(primes), 10):
    row = primes[i:i+10]
    for prime in row:
        print(f"{prime:3}", end=" ")
    print()
```

### 8.3 간단한 학생 성적 관리 시스템

```python
def student_grade_system():
    """학생 성적 관리 시스템"""
    
    students = {}
    
    while True:
        print("\n=== 학생 성적 관리 시스템 ===")
        print("1. 학생 추가")
        print("2. 성적 입력")
        print("3. 성적 조회")
        print("4. 전체 학생 목록")
        print("5. 통계 보기")
        print("6. 종료")
        
        choice = input("선택하세요 (1-6): ")
        
        if choice == "1":
            name = input("학생 이름을 입력하세요: ")
            if name not in students:
                students[name] = []
                print(f"{name} 학생이 추가되었습니다.")
            else:
                print("이미 등록된 학생입니다.")
        
        elif choice == "2":
            name = input("성적을 입력할 학생 이름: ")
            if name in students:
                try:
                    score = float(input("점수를 입력하세요: "))
                    if 0 <= score <= 100:
                        students[name].append(score)
                        print(f"{name} 학생의 성적이 추가되었습니다.")
                    else:
                        print("점수는 0-100 사이여야 합니다.")
                except ValueError:
                    print("올바른 숫자를 입력해주세요.")
            else:
                print("등록되지 않은 학생입니다.")
        
        elif choice == "3":
            name = input("조회할 학생 이름: ")
            if name in students:
                scores = students[name]
                if scores:
                    print(f"\n{name} 학생의 성적:")
                    for i, score in enumerate(scores, 1):
                        print(f"  {i}번째 시험: {score}점")
                    
                    average = sum(scores) / len(scores)
                    print(f"평균: {average:.2f}점")
                    
                    # 등급 계산
                    if average >= 90:
                        grade = "A"
                    elif average >= 80:
                        grade = "B"
                    elif average >= 70:
                        grade = "C"
                    elif average >= 60:
                        grade = "D"
                    else:
                        grade = "F"
                    print(f"등급: {grade}")
                else:
                    print(f"{name} 학생의 성적이 없습니다.")
            else:
                print("등록되지 않은 학생입니다.")
        
        elif choice == "4":
            if students:
                print("\n전체 학생 목록:")
                for i, (name, scores) in enumerate(students.items(), 1):
                    score_count = len(scores)
                    avg = sum(scores) / len(scores) if scores else 0
                    print(f"{i}. {name} - 시험 {score_count}회, 평균 {avg:.2f}점")
            else:
                print("등록된 학생이 없습니다.")
        
        elif choice == "5":
            if students:
                all_scores = []
                for scores in students.values():
                    all_scores.extend(scores)
                
                if all_scores:
                    print(f"\n전체 통계:")
                    print(f"총 학생 수: {len(students)}")
                    print(f"총 시험 횟수: {len(all_scores)}")
                    print(f"전체 평균: {sum(all_scores) / len(all_scores):.2f}점")
                    print(f"최고 점수: {max(all_scores)}점")
                    print(f"최저 점수: {min(all_scores)}점")
                else:
                    print("입력된 성적이 없습니다.")
            else:
                print("등록된 학생이 없습니다.")
        
        elif choice == "6":
            print("프로그램을 종료합니다.")
            break
        
        else:
            print("올바른 선택지를 입력해주세요.")

# 프로그램 실행
# student_grade_system()  # 주석 해제하여 실행
```

## 9. 고급 반복문 기법

### 9.1 else 절과 함께 사용하는 반복문

```python
# for-else: 반복문이 break 없이 정상 완료되었을 때 실행
def find_number(numbers, target):
    for num in numbers:
        if num == target:
            print(f"{target}을 찾았습니다!")
            break
    else:
        print(f"{target}을 찾지 못했습니다.")

numbers = [1, 2, 3, 4, 5]
find_number(numbers, 3)  # 찾았습니다
find_number(numbers, 10) # 찾지 못했습니다

# while-else: while 조건이 거짓이 되어 종료되었을 때 실행
count = 0
while count < 3:
    print(f"카운트: {count}")
    count += 1
else:
    print("while 루프가 정상 완료되었습니다.")
```

### 9.2 리스트 컴프리헨션 (List Comprehension)

```python
# 기본 for문
squares = []
for i in range(1, 6):
    squares.append(i ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# 리스트 컴프리헨션으로 간단히
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# 조건과 함께 사용
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# 중첩 반복문을 컴프리헨션으로
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

## 10. 연습 문제

### 연습 1: 피보나치 수열 생성기
n번째까지의 피보나치 수열을 생성하는 프로그램을 작성하세요.
(피보나치 수열: 0, 1, 1, 2, 3, 5, 8, 13, ...)

### 연습 2: 별표 다이아몬드 패턴
사용자가 입력한 크기에 따라 다이아몬드 모양의 별표 패턴을 출력하는 프로그램을 작성하세요.

### 연습 3: 간단한 계산기
사용자가 'quit'을 입력할 때까지 계속해서 두 숫자와 연산자를 입력받아 계산 결과를 출력하는 계산기를 작성하세요.

### 연습 4: 단어 빈도 분석기
사용자가 입력한 텍스트에서 각 단어가 몇 번 나타나는지 분석하여 빈도순으로 출력하는 프로그램을 작성하세요.

## 정리

이 챕터에서 학습한 내용:

1. **반복문 기본**: for문과 while문의 기본 문법과 사용법
2. **range() 함수**: 다양한 매개변수를 활용한 숫자 시퀀스 생성
3. **컬렉션 순회**: 리스트, 문자열, 딕셔너리 등 다양한 객체 순회
4. **반복문 제어**: break와 continue를 사용한 흐름 제어
5. **중첩 반복문**: 2차원 데이터 처리와 패턴 생성
6. **활용 패턴**: 카운터, 누적, 필터링, 변환 패턴
7. **실용 예제**: 텍스트 분석, 소수 찾기, 성적 관리 시스템
8. **고급 기법**: else 절, 리스트 컴프리헨션

다음 챕터에서는 리스트와 튜플을 학습하여 데이터를 효율적으로 저장하고 관리하는 방법을 배워보겠습니다.

### 핵심 포인트
- 반복문은 코드의 중복을 줄이고 효율성을 높이는 핵심 도구
- for문은 정해진 횟수나 컬렉션 순회에, while문은 조건 기반 반복에 사용
- break와 continue로 반복문의 실행 흐름을 제어할 수 있음
- 중첩 반복문 사용 시 성능과 가독성을 고려해야 함
- 적절한 반복문 선택이 코드의 명확성과 성능에 큰 영향을 미침 