# Chapter 9: 딕셔너리와 집합 (Dictionaries and Sets)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 딕셔너리와 집합의 기본 개념과 특징 이해하기
- 딕셔너리와 집합의 생성, 접근, 수정 방법 익히기
- 다양한 딕셔너리와 집합 메서드 활용하기
- 딕셔너리를 사용한 실용적인 데이터 관리
- 집합을 이용한 효율적인 데이터 처리
- 실무에서 활용 가능한 프로그램 작성하기

## 1. 딕셔너리의 기본 개념

### 1.1 딕셔너리란?

딕셔너리는 **키(key)와 값(value)의 쌍**으로 데이터를 저장하는 **변경 가능한(mutable)** 컬렉션입니다. 순서는 Python 3.7부터 보장됩니다.

```python
# 딕셔너리 생성 방법들
empty_dict = {}  # 빈 딕셔너리
student_info = {
    "name": "김철수",
    "age": 20,
    "major": "컴퓨터공학",
    "grade": "A+"
}

# dict() 함수로 생성
grades = dict(korean=85, english=90, math=78)
coordinates = dict([("x", 10), ("y", 20)])

print(f"학생 정보: {student_info}")
print(f"성적: {grades}")
print(f"좌표: {coordinates}")
```

### 1.2 딕셔너리의 특징

```python
# 1. 키-값 쌍으로 저장
person = {
    "name": "이영희",
    "age": 25,
    "city": "서울"
}

# 2. 키로 빠른 접근 (O(1) 시간 복잡도)
print(f"이름: {person['name']}")
print(f"나이: {person['age']}")

# 3. 변경 가능 (mutable)
person["age"] = 26  # 값 수정
person["job"] = "개발자"  # 새 키-값 추가
print(f"수정된 정보: {person}")

# 4. 키는 불변 객체만 가능 (문자열, 숫자, 튜플)
valid_keys = {
    "string_key": "문자열 키",
    42: "숫자 키",
    (1, 2): "튜플 키"
}

# 5. 값은 모든 타입 가능
mixed_values = {
    "number": 42,
    "string": "hello",
    "list": [1, 2, 3],
    "dict": {"nested": "value"}
}

print(f"다양한 키: {valid_keys}")
print(f"다양한 값: {mixed_values}")
```

## 2. 딕셔너리 접근과 수정

### 2.1 딕셔너리 요소 접근

```python
student = {
    "name": "박민수",
    "age": 22,
    "subjects": ["Python", "Java", "C++"],
    "gpa": 3.8
}

# 대괄호로 접근
print(f"이름: {student['name']}")
print(f"과목들: {student['subjects']}")

# get() 메서드로 안전한 접근
print(f"나이: {student.get('age')}")
print(f"전공: {student.get('major', '미정')}")  # 기본값 설정

# 키 존재 확인
if "gpa" in student:
    print(f"학점: {student['gpa']}")

# 키가 없을 때 처리
try:
    print(student["phone"])  # KeyError 발생
except KeyError as e:
    print(f"키 오류: {e}")

# 안전한 접근 방법 비교
print(f"전화번호(get): {student.get('phone', '없음')}")
```

### 2.2 딕셔너리 요소 수정

```python
# 기본 딕셔너리
inventory = {
    "apple": 50,
    "banana": 30,
    "orange": 25
}

# 값 수정
inventory["apple"] = 45
print(f"사과 수량 수정: {inventory}")

# 새 키-값 추가
inventory["grape"] = 20
inventory["mango"] = 15
print(f"과일 추가: {inventory}")

# 여러 항목 동시 추가/수정
inventory.update({
    "pineapple": 10,
    "banana": 35,  # 기존 값 수정
    "kiwi": 12
})
print(f"일괄 업데이트: {inventory}")

# 딕셔너리 병합 (Python 3.9+)
new_fruits = {"strawberry": 8, "blueberry": 22}
inventory = inventory | new_fruits  # 병합 연산자
print(f"병합 후: {inventory}")
```

## 3. 딕셔너리 메서드

### 3.1 키, 값, 항목 접근

```python
menu = {
    "coffee": 4000,
    "tea": 3000,
    "juice": 5000,
    "sandwich": 7000,
    "cake": 6000
}

# keys(): 모든 키 반환
all_keys = menu.keys()
print(f"메뉴 항목들: {list(all_keys)}")

# values(): 모든 값 반환
all_prices = menu.values()
print(f"가격들: {list(all_prices)}")
print(f"평균 가격: {sum(all_prices) / len(all_prices):.0f}원")

# items(): 모든 키-값 쌍 반환
all_items = menu.items()
print(f"메뉴와 가격:")
for item, price in all_items:
    print(f"  {item}: {price:,}원")

# 딕셔너리 순회
print("\n가격별 메뉴:")
for name, price in menu.items():
    if price >= 5000:
        print(f"  고가: {name} ({price:,}원)")
    else:
        print(f"  일반: {name} ({price:,}원)")
```

### 3.2 딕셔너리 수정 메서드

```python
scores = {
    "alice": 85,
    "bob": 92,
    "charlie": 78,
    "david": 88
}

# pop(): 키를 제거하고 값 반환
removed_score = scores.pop("charlie")
print(f"제거된 점수: {removed_score}")
print(f"제거 후: {scores}")

# pop()에 기본값 설정
missing_score = scores.pop("eve", 0)
print(f"없는 학생 점수: {missing_score}")

# popitem(): 마지막 키-값 쌍 제거 (Python 3.7+)
last_item = scores.popitem()
print(f"마지막 항목: {last_item}")
print(f"popitem 후: {scores}")

# del로 특정 키 제거
del scores["bob"]
print(f"del 후: {scores}")

# clear(): 모든 항목 제거
scores_copy = scores.copy()
scores_copy.clear()
print(f"clear 후: {scores_copy}")
```

### 3.3 딕셔너리 복사와 기본값

```python
original = {"a": 1, "b": 2, "c": 3}

# copy(): 얕은 복사
copied = original.copy()
copied["d"] = 4
print(f"원본: {original}")
print(f"복사본: {copied}")

# setdefault(): 키가 없으면 기본값 설정
config = {"debug": True, "port": 8080}

# 키가 있으면 기존 값 반환
existing_value = config.setdefault("debug", False)
print(f"기존 debug 값: {existing_value}")

# 키가 없으면 기본값 설정하고 반환
new_value = config.setdefault("timeout", 30)
print(f"새 timeout 값: {new_value}")
print(f"설정 후: {config}")

# fromkeys(): 같은 값으로 딕셔너리 생성
keys = ["x", "y", "z"]
default_dict = dict.fromkeys(keys, 0)
print(f"기본값 딕셔너리: {default_dict}")

# 리스트를 기본값으로 사용할 때 주의점
categories = ["food", "clothes", "electronics"]
# 잘못된 방법 (모든 키가 같은 리스트 객체를 참조)
wrong_dict = dict.fromkeys(categories, [])
# 올바른 방법
right_dict = {category: [] for category in categories}
print(f"올바른 딕셔너리: {right_dict}")
```

## 4. 집합의 기본 개념

### 4.1 집합이란?

집합(Set)은 **중복을 허용하지 않는** **순서가 없는** **변경 가능한** 컬렉션입니다.

```python
# 집합 생성 방법들
empty_set = set()  # 빈 집합 ({}는 딕셔너리!)
numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "orange"}

# set() 함수로 생성
from_list = set([1, 2, 2, 3, 3, 4])  # 중복 자동 제거
from_string = set("hello")  # 문자 단위로 분리

print(f"숫자 집합: {numbers}")
print(f"과일 집합: {fruits}")
print(f"리스트에서 변환: {from_list}")
print(f"문자열에서 변환: {from_string}")

# 집합의 특징
mixed_set = {1, "hello", 3.14, (1, 2)}  # 해시 가능한 객체만
print(f"혼합 집합: {mixed_set}")

# 중복 제거 활용
duplicate_list = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique_list = list(set(duplicate_list))
print(f"중복 제거: {duplicate_list} → {unique_list}")
```

### 4.2 집합의 특징

```python
# 1. 중복 허용하지 않음
colors = {"red", "blue", "red", "green", "blue"}
print(f"중복 제거된 색상: {colors}")

# 2. 순서가 없음 (출력 순서는 보장되지 않음)
numbers = {3, 1, 4, 1, 5, 9, 2, 6}
print(f"순서 없는 숫자들: {numbers}")

# 3. 변경 가능
fruits = {"apple", "banana"}
fruits.add("orange")
fruits.remove("banana")
print(f"변경된 과일들: {fruits}")

# 4. 멤버십 테스트가 빠름 (O(1))
large_set = set(range(1000000))
print(f"999999가 집합에 있나요? {999999 in large_set}")

# 5. 해시 가능한 객체만 저장 가능
valid_set = {1, "text", (1, 2), frozenset([3, 4])}
print(f"유효한 집합: {valid_set}")

# 잘못된 예 (리스트는 해시 불가능)
try:
    invalid_set = {[1, 2, 3]}  # TypeError
except TypeError as e:
    print(f"집합 오류: {e}")
```

## 5. 집합 연산

### 5.1 기본 집합 메서드

```python
programming_languages = {"Python", "Java", "C++", "JavaScript"}

# add(): 요소 추가
programming_languages.add("Go")
print(f"언어 추가: {programming_languages}")

# remove(): 요소 제거 (없으면 KeyError)
programming_languages.remove("C++")
print(f"언어 제거: {programming_languages}")

# discard(): 요소 제거 (없어도 오류 없음)
programming_languages.discard("Ruby")  # 없어도 에러 없음
programming_languages.discard("Java")  # 있으면 제거
print(f"discard 후: {programming_languages}")

# pop(): 임의의 요소 제거하고 반환
removed_language = programming_languages.pop()
print(f"제거된 언어: {removed_language}")
print(f"pop 후: {programming_languages}")

# clear(): 모든 요소 제거
test_set = {"a", "b", "c"}
test_set.clear()
print(f"clear 후: {test_set}")

# update(): 여러 요소 추가
programming_languages.update(["Rust", "TypeScript", "Kotlin"])
print(f"업데이트 후: {programming_languages}")
```

### 5.2 집합 연산 (교집합, 합집합, 차집합)

```python
# 두 개의 집합 정의
python_users = {"Alice", "Bob", "Charlie", "David", "Eve"}
java_users = {"Bob", "David", "Frank", "Grace", "Henry"}

print(f"Python 사용자: {python_users}")
print(f"Java 사용자: {java_users}")

# 교집합 (intersection): 두 집합 모두에 있는 요소
both_languages = python_users & java_users
both_languages_method = python_users.intersection(java_users)
print(f"두 언어 모두 사용: {both_languages}")

# 합집합 (union): 두 집합을 합친 모든 요소
all_users = python_users | java_users
all_users_method = python_users.union(java_users)
print(f"모든 사용자: {all_users}")

# 차집합 (difference): 첫 번째 집합에만 있는 요소
only_python = python_users - java_users
only_java = java_users - python_users
print(f"Python만 사용: {only_python}")
print(f"Java만 사용: {only_java}")

# 대칭 차집합 (symmetric difference): 두 집합 중 하나에만 있는 요소
exclusive_users = python_users ^ java_users
print(f"한 언어만 사용: {exclusive_users}")

# 여러 집합과의 연산
cpp_users = {"Charlie", "David", "Ian", "Jack"}
all_three = python_users | java_users | cpp_users
common_three = python_users & java_users & cpp_users
print(f"세 언어 사용자 합계: {all_three}")
print(f"세 언어 모두 사용: {common_three}")
```

### 5.3 집합 관계 확인

```python
# 부분집합과 상위집합 관계
all_employees = {"Alice", "Bob", "Charlie", "David", "Eve", "Frank"}
developers = {"Alice", "Bob", "Charlie"}
managers = {"David", "Eve"}
seniors = {"Alice", "David"}

# 부분집합 확인 (subset)
print(f"개발자들이 전체 직원의 부분집합인가? {developers <= all_employees}")
print(f"개발자들이 전체 직원의 부분집합인가? {developers.issubset(all_employees)}")

# 상위집합 확인 (superset)
print(f"전체 직원이 개발자들의 상위집합인가? {all_employees >= developers}")
print(f"전체 직원이 개발자들의 상위집합인가? {all_employees.issuperset(developers)}")

# 진부분집합 확인 (proper subset)
print(f"개발자들이 전체 직원의 진부분집합인가? {developers < all_employees}")

# 서로소 확인 (disjoint: 교집합이 없음)
print(f"개발자와 매니저가 서로소인가? {developers.isdisjoint(managers)}")
print(f"개발자와 시니어가 서로소인가? {developers.isdisjoint(seniors)}")

# 집합 크기 비교
print(f"집합 크기:")
print(f"  전체 직원: {len(all_employees)}")
print(f"  개발자: {len(developers)}")
print(f"  매니저: {len(managers)}")
```

## 6. 딕셔너리와 집합의 실용적 활용

### 6.1 딕셔너리 컴프리헨션

```python
# 기본 딕셔너리 컴프리헨션
squares = {x: x**2 for x in range(1, 6)}
print(f"제곱 딕셔너리: {squares}")

# 조건부 딕셔너리 컴프리헨션
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = {x: x**2 for x in numbers if x % 2 == 0}
print(f"짝수 제곱: {even_squares}")

# 두 리스트로 딕셔너리 생성
names = ["Alice", "Bob", "Charlie", "David"]
ages = [25, 30, 35, 28]
people = {name: age for name, age in zip(names, ages)}
print(f"사람들: {people}")

# 문자열 처리
text = "hello world"
char_count = {char: text.count(char) for char in set(text) if char != ' '}
print(f"문자 빈도: {char_count}")

# 딕셔너리 변환
original_prices = {"apple": 1000, "banana": 1500, "orange": 2000}
discounted = {item: price * 0.8 for item, price in original_prices.items()}
print(f"할인가: {discounted}")
```

### 6.2 집합 컴프리헨션

```python
# 기본 집합 컴프리헨션
squares_set = {x**2 for x in range(1, 11)}
print(f"제곱수 집합: {squares_set}")

# 조건부 집합 컴프리헨션
text = "The Quick Brown Fox Jumps Over The Lazy Dog"
vowels = {char.lower() for char in text if char.lower() in 'aeiou'}
print(f"모음들: {vowels}")

# 복잡한 조건
numbers = range(1, 101)
special_numbers = {x for x in numbers if x % 3 == 0 or x % 5 == 0}
print(f"3 또는 5의 배수: {sorted(list(special_numbers))[:10]}...")  # 처음 10개만
```

## 7. 실용적인 예제들

### 7.1 단어 빈도 분석기

```python
class WordFrequencyAnalyzer:
    def __init__(self):
        self.word_count = {}
        self.total_words = 0
    
    def add_text(self, text):
        """텍스트를 추가하여 단어 빈도 분석"""
        import string
        
        # 텍스트 전처리
        text = text.lower()
        # 구두점 제거
        for punct in string.punctuation:
            text = text.replace(punct, ' ')
        
        # 단어 분리 및 카운트
        words = text.split()
        for word in words:
            if word:  # 빈 문자열 제외
                self.word_count[word] = self.word_count.get(word, 0) + 1
                self.total_words += 1
    
    def get_frequency(self, word):
        """특정 단어의 빈도 반환"""
        return self.word_count.get(word.lower(), 0)
    
    def get_top_words(self, n=10):
        """가장 빈번한 n개 단어 반환"""
        # 빈도순으로 정렬
        sorted_words = sorted(self.word_count.items(), 
                            key=lambda x: x[1], reverse=True)
        return sorted_words[:n]
    
    def get_unique_words(self):
        """고유 단어 집합 반환"""
        return set(self.word_count.keys())
    
    def get_words_by_length(self, length):
        """특정 길이의 단어들 반환"""
        return {word for word in self.word_count.keys() if len(word) == length}
    
    def get_statistics(self):
        """통계 정보 반환"""
        if not self.word_count:
            return {}
        
        word_lengths = [len(word) for word in self.word_count.keys()]
        return {
            'total_words': self.total_words,
            'unique_words': len(self.word_count),
            'avg_word_length': sum(word_lengths) / len(word_lengths),
            'longest_word': max(self.word_count.keys(), key=len),
            'shortest_word': min(self.word_count.keys(), key=len)
        }
    
    def print_analysis(self):
        """분석 결과 출력"""
        print("="*50)
        print("단어 빈도 분석 결과")
        print("="*50)
        
        stats = self.get_statistics()
        if not stats:
            print("분석할 텍스트가 없습니다.")
            return
        
        print(f"총 단어 수: {stats['total_words']:,}")
        print(f"고유 단어 수: {stats['unique_words']:,}")
        print(f"평균 단어 길이: {stats['avg_word_length']:.1f}자")
        print(f"가장 긴 단어: {stats['longest_word']}")
        print(f"가장 짧은 단어: {stats['shortest_word']}")
        
        print(f"\n상위 10개 단어:")
        for i, (word, count) in enumerate(self.get_top_words(10), 1):
            percentage = (count / self.total_words) * 100
            print(f"{i:2}. {word:<15} {count:4}회 ({percentage:4.1f}%)")

# 사용 예제
analyzer = WordFrequencyAnalyzer()

sample_texts = [
    "Python is a powerful programming language. Python is easy to learn.",
    "Machine learning and data science are popular fields in Python.",
    "Python has a large community and many useful libraries.",
    "Learning Python opens up many career opportunities in tech."
]

for text in sample_texts:
    analyzer.add_text(text)

analyzer.print_analysis()

# 특정 단어 검색
print(f"\n'python' 빈도: {analyzer.get_frequency('python')}회")
print(f"5글자 단어들: {analyzer.get_words_by_length(5)}")
```

### 7.2 학생 성적 관리 시스템 (딕셔너리 활용)

```python
class StudentGradeManager:
    def __init__(self):
        # 학생 정보: {학번: {'name': 이름, 'grades': {과목: 점수}}}
        self.students = {}
        self.subjects = set()  # 전체 과목 집합
    
    def add_student(self, student_id, name):
        """학생 추가"""
        if student_id in self.students:
            print(f"학번 {student_id}는 이미 존재합니다.")
            return False
        
        self.students[student_id] = {
            'name': name,
            'grades': {}
        }
        print(f"학생 {name} (학번: {student_id})이 추가되었습니다.")
        return True
    
    def add_grade(self, student_id, subject, score):
        """성적 추가"""
        if student_id not in self.students:
            print(f"학번 {student_id}를 찾을 수 없습니다.")
            return False
        
        if not 0 <= score <= 100:
            print("점수는 0-100 사이여야 합니다.")
            return False
        
        self.students[student_id]['grades'][subject] = score
        self.subjects.add(subject)
        print(f"{self.students[student_id]['name']}의 {subject} 성적이 추가되었습니다.")
        return True
    
    def get_student_average(self, student_id):
        """학생 평균 계산"""
        if student_id not in self.students:
            return None
        
        grades = self.students[student_id]['grades']
        if not grades:
            return 0
        
        return sum(grades.values()) / len(grades)
    
    def get_subject_statistics(self, subject):
        """과목별 통계"""
        scores = []
        for student in self.students.values():
            if subject in student['grades']:
                scores.append(student['grades'][subject])
        
        if not scores:
            return None
        
        return {
            'count': len(scores),
            'average': sum(scores) / len(scores),
            'max': max(scores),
            'min': min(scores)
        }
    
    def get_top_students(self, n=5):
        """상위 n명 학생"""
        student_averages = []
        for student_id, info in self.students.items():
            avg = self.get_student_average(student_id)
            if avg is not None:
                student_averages.append((student_id, info['name'], avg))
        
        # 평균 점수로 정렬
        student_averages.sort(key=lambda x: x[2], reverse=True)
        return student_averages[:n]
    
    def get_failing_students(self, passing_score=60):
        """낙제 위험 학생들 (평균 60점 미만)"""
        failing = []
        for student_id, info in self.students.items():
            avg = self.get_student_average(student_id)
            if avg is not None and avg < passing_score:
                failing.append((student_id, info['name'], avg))
        
        return sorted(failing, key=lambda x: x[2])
    
    def print_report(self):
        """전체 성적표 출력"""
        if not self.students:
            print("등록된 학생이 없습니다.")
            return
        
        print("\n" + "="*80)
        print("전체 성적표")
        print("="*80)
        
        # 헤더
        subjects_list = sorted(list(self.subjects))
        header = f"{'학번':<8} {'이름':<10}"
        for subject in subjects_list:
            header += f"{subject:>8}"
        header += f"{'평균':>8}"
        print(header)
        print("-" * 80)
        
        # 학생별 성적
        for student_id, info in self.students.items():
            line = f"{student_id:<8} {info['name']:<10}"
            grades = info['grades']
            
            for subject in subjects_list:
                score = grades.get(subject, '-')
                if score == '-':
                    line += f"{score:>8}"
                else:
                    line += f"{score:>8.0f}"
            
            avg = self.get_student_average(student_id)
            avg_str = f"{avg:.1f}" if avg is not None else "-"
            line += f"{avg_str:>8}"
            print(line)
        
        # 과목별 통계
        print("-" * 80)
        print("과목별 통계:")
        for subject in subjects_list:
            stats = self.get_subject_statistics(subject)
            if stats:
                print(f"{subject}: 평균 {stats['average']:.1f}, "
                      f"최고 {stats['max']}, 최저 {stats['min']} "
                      f"({stats['count']}명)")

# 사용 예제
manager = StudentGradeManager()

# 학생 추가
students_data = [
    ("2024001", "김철수"),
    ("2024002", "이영희"),
    ("2024003", "박민수"),
    ("2024004", "최지영"),
    ("2024005", "정다은")
]

for student_id, name in students_data:
    manager.add_student(student_id, name)

# 성적 추가
grades_data = [
    ("2024001", "수학", 85), ("2024001", "영어", 90), ("2024001", "과학", 78),
    ("2024002", "수학", 92), ("2024002", "영어", 88), ("2024002", "과학", 95),
    ("2024003", "수학", 76), ("2024003", "영어", 82), ("2024003", "과학", 70),
    ("2024004", "수학", 96), ("2024004", "영어", 94), ("2024004", "과학", 92),
    ("2024005", "수학", 58), ("2024005", "영어", 65), ("2024005", "과학", 62)
]

for student_id, subject, score in grades_data:
    manager.add_grade(student_id, subject, score)

# 성적표 출력
manager.print_report()

# 상위 학생들
print(f"\n상위 3명:")
for i, (student_id, name, avg) in enumerate(manager.get_top_students(3), 1):
    print(f"{i}등: {name} (학번: {student_id}, 평균: {avg:.1f})")

# 낙제 위험 학생들
failing = manager.get_failing_students()
if failing:
    print(f"\n낙제 위험 학생들:")
    for student_id, name, avg in failing:
        print(f"  {name} (학번: {student_id}, 평균: {avg:.1f})")
```

### 7.3 재고 관리 시스템

```python
class InventoryManager:
    def __init__(self):
        # 재고: {상품ID: {'name': 이름, 'quantity': 수량, 'price': 가격, 'category': 카테고리}}
        self.inventory = {}
        self.categories = set()
        self.low_stock_threshold = 10
    
    def add_product(self, product_id, name, quantity, price, category):
        """상품 추가"""
        if product_id in self.inventory:
            print(f"상품 ID {product_id}는 이미 존재합니다.")
            return False
        
        self.inventory[product_id] = {
            'name': name,
            'quantity': quantity,
            'price': price,
            'category': category
        }
        self.categories.add(category)
        print(f"상품 '{name}'이 추가되었습니다.")
        return True
    
    def update_stock(self, product_id, quantity_change):
        """재고 수량 변경 (양수: 입고, 음수: 출고)"""
        if product_id not in self.inventory:
            print(f"상품 ID {product_id}를 찾을 수 없습니다.")
            return False
        
        current_quantity = self.inventory[product_id]['quantity']
        new_quantity = current_quantity + quantity_change
        
        if new_quantity < 0:
            print(f"재고가 부족합니다. 현재 재고: {current_quantity}")
            return False
        
        self.inventory[product_id]['quantity'] = new_quantity
        product_name = self.inventory[product_id]['name']
        
        if quantity_change > 0:
            print(f"{product_name} {quantity_change}개 입고. 현재 재고: {new_quantity}")
        else:
            print(f"{product_name} {abs(quantity_change)}개 출고. 현재 재고: {new_quantity}")
        
        return True
    
    def get_low_stock_items(self):
        """재고 부족 상품들"""
        low_stock = {}
        for product_id, info in self.inventory.items():
            if info['quantity'] <= self.low_stock_threshold:
                low_stock[product_id] = info
        return low_stock
    
    def get_products_by_category(self, category):
        """카테고리별 상품들"""
        category_products = {}
        for product_id, info in self.inventory.items():
            if info['category'] == category:
                category_products[product_id] = info
        return category_products
    
    def calculate_total_value(self):
        """총 재고 가치 계산"""
        total_value = 0
        category_values = {}
        
        for info in self.inventory.values():
            value = info['quantity'] * info['price']
            total_value += value
            
            category = info['category']
            category_values[category] = category_values.get(category, 0) + value
        
        return total_value, category_values
    
    def search_products(self, keyword):
        """상품명으로 검색"""
        results = {}
        keyword = keyword.lower()
        
        for product_id, info in self.inventory.items():
            if keyword in info['name'].lower():
                results[product_id] = info
        
        return results
    
    def get_top_value_products(self, n=5):
        """가치 높은 상품 순서"""
        product_values = []
        for product_id, info in self.inventory.items():
            value = info['quantity'] * info['price']
            product_values.append((product_id, info['name'], value, info['quantity'], info['price']))
        
        # 가치순으로 정렬
        product_values.sort(key=lambda x: x[2], reverse=True)
        return product_values[:n]
    
    def print_inventory_report(self):
        """재고 현황 보고서"""
        if not self.inventory:
            print("재고가 없습니다.")
            return
        
        print("\n" + "="*90)
        print("재고 현황 보고서")
        print("="*90)
        
        # 전체 현황
        total_value, category_values = self.calculate_total_value()
        total_items = sum(info['quantity'] for info in self.inventory.values())
        
        print(f"총 상품 종류: {len(self.inventory)}개")
        print(f"총 재고 수량: {total_items:,}개")
        print(f"총 재고 가치: {total_value:,.0f}원")
        print(f"등록된 카테고리: {', '.join(sorted(self.categories))}")
        
        # 카테고리별 가치
        print(f"\n카테고리별 재고 가치:")
        for category in sorted(self.categories):
            value = category_values.get(category, 0)
            percentage = (value / total_value) * 100 if total_value > 0 else 0
            print(f"  {category}: {value:,.0f}원 ({percentage:.1f}%)")
        
        # 상품 목록
        print(f"\n상품 목록:")
        print(f"{'ID':<8} {'상품명':<20} {'카테고리':<12} {'수량':>8} {'단가':>10} {'총가치':>12}")
        print("-" * 90)
        
        for product_id, info in sorted(self.inventory.items()):
            total_value_item = info['quantity'] * info['price']
            print(f"{product_id:<8} {info['name']:<20} {info['category']:<12} "
                  f"{info['quantity']:>8} {info['price']:>10,.0f} {total_value_item:>12,.0f}")
        
        # 재고 부족 경고
        low_stock = self.get_low_stock_items()
        if low_stock:
            print(f"\n⚠️  재고 부족 경고 (기준: {self.low_stock_threshold}개 이하):")
            for product_id, info in low_stock.items():
                print(f"  {info['name']} (ID: {product_id}): {info['quantity']}개")

# 사용 예제
inventory = InventoryManager()

# 상품 추가
products = [
    ("P001", "노트북", 50, 1200000, "전자제품"),
    ("P002", "마우스", 150, 30000, "전자제품"),
    ("P003", "키보드", 80, 80000, "전자제품"),
    ("P004", "의자", 25, 150000, "가구"),
    ("P005", "책상", 12, 200000, "가구"),
    ("P006", "모니터", 35, 300000, "전자제품"),
    ("P007", "책장", 8, 120000, "가구")
]

for product_id, name, quantity, price, category in products:
    inventory.add_product(product_id, name, quantity, price, category)

# 재고 변동
inventory.update_stock("P001", -5)  # 노트북 5개 출고
inventory.update_stock("P002", 20)  # 마우스 20개 입고
inventory.update_stock("P007", -3)  # 책장 3개 출고

# 보고서 출력
inventory.print_inventory_report()

# 검색 기능
print(f"\n'노트' 검색 결과:")
search_results = inventory.search_products("노트")
for product_id, info in search_results.items():
    print(f"  {info['name']} (ID: {product_id}): {info['quantity']}개")

# 가치 높은 상품들
print(f"\n가치 높은 상위 3개 상품:")
top_products = inventory.get_top_value_products(3)
for i, (product_id, name, value, quantity, price) in enumerate(top_products, 1):
    print(f"{i}. {name}: {value:,.0f}원 ({quantity}개 × {price:,.0f}원)")
```

## 8. 연습 문제

### 연습 1: 전화번호부 관리자
딕셔너리를 사용하여 이름을 키로 하고 전화번호, 이메일 등의 정보를 값으로 하는 전화번호부를 만드세요.

### 연습 2: 중복 단어 찾기
두 개의 텍스트에서 공통으로 나타나는 단어들을 집합 연산을 사용하여 찾는 프로그램을 작성하세요.

### 연습 3: 투표 시스템
딕셔너리를 사용하여 후보자별 득표수를 관리하고, 최종 결과를 분석하는 시스템을 만드세요.

### 연습 4: 친구 관계 분석
집합을 사용하여 SNS에서 공통 친구, 친구 추천 등의 기능을 구현해보세요.

## 정리

이 챕터에서 학습한 내용:

1. **딕셔너리 기본**: 키-값 쌍, 생성, 접근, 수정 방법
2. **딕셔너리 메서드**: keys(), values(), items(), get(), pop() 등
3. **집합 기본**: 중복 없는 컬렉션, 생성, 특징
4. **집합 연산**: 교집합, 합집합, 차집합, 부분집합 관계
5. **컴프리헨션**: 딕셔너리와 집합 컴프리헨션
6. **실용 예제**: 단어 분석, 성적 관리, 재고 관리

다음 챕터에서는 함수의 기초를 학습하여 코드를 더욱 체계적으로 구성하는 방법을 배워보겠습니다.

### 핵심 포인트
- 딕셔너리는 키로 빠른 접근이 가능한 해시 테이블 구조
- 집합은 중복 제거와 집합 연산에 최적화된 자료구조
- 두 자료형 모두 해시 가능한 객체만 키/요소로 사용 가능
- 컴프리헨션을 활용하면 간결하고 효율적인 코드 작성 가능
- 실무에서는 데이터 분석, 관리 시스템 등에 광범위하게 활용 