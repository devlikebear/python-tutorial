# Chapter 3: 문자열 완전 정복하기

## 📚 이 챕터에서 배울 내용
- 문자열 인덱싱과 슬라이싱으로 원하는 부분 추출하기
- 강력한 문자열 메서드들을 활용한 텍스트 조작
- 다양한 문자열 포맷팅 기법 마스터하기
- 이스케이프 문자와 특수 문자 다루기
- 실무에서 자주 사용하는 문자열 처리 패턴 익히기

---

## 🔍 문자열 인덱싱: 문자 하나하나 접근하기

### 💡 인덱스의 개념
문자열의 각 문자는 **고유한 위치 번호(인덱스)**를 가집니다. Python에서는 0부터 시작하며, 음수 인덱스로 뒤에서부터 접근할 수도 있습니다.

```python
text = "Python"
#       012345  (양수 인덱스: 앞에서부터)
#      -654321  (음수 인덱스: 뒤에서부터)

# 양수 인덱스로 접근
print(text[0])    # P (첫 번째 문자)
print(text[1])    # y (두 번째 문자)
print(text[5])    # n (마지막 문자)

# 음수 인덱스로 접근 (뒤에서부터)
print(text[-1])   # n (마지막 문자)
print(text[-2])   # o (뒤에서 두 번째)
print(text[-6])   # P (첫 번째 문자)
```

> 💡 **팁**: 음수 인덱스는 마지막 문자에 쉽게 접근할 때 매우 유용합니다!

### 🔢 문자열 길이와 안전한 인덱스 접근

```python
message = "안녕하세요"
print(f"문자열 길이: {len(message)}")      # 5

# 유효한 인덱스 범위: 0 ~ len(message)-1
print(f"첫 번째 문자: {message[0]}")        # 안
print(f"마지막 문자: {message[4]}")         # 요

# 인덱스 오류 방지하기
try:
    print(message[10])  # IndexError 발생!
except IndexError:
    print("인덱스가 범위를 벗어났습니다!")

# 마지막 문자 안전하게 접근하는 방법들
last_char = message[len(message) - 1]  # 전통적인 방법
last_char = message[-1]                # Python다운 방법 (권장)
print(f"마지막 문자: {last_char}")
```

### 🔄 문자열 순회하기

```python
word = "Hello"

print("=== 방법 1: 인덱스를 사용한 순회 ===")
for i in range(len(word)):
    print(f"인덱스 {i}: {word[i]}")

print("\n=== 방법 2: 직접 문자 순회 (권장) ===")
for char in word:
    print(f"문자: {char}")

print("\n=== 방법 3: 인덱스와 문자를 함께 순회 ===")
for i, char in enumerate(word):
    print(f"인덱스 {i}: {char}")
```

---

## ✂️ 문자열 슬라이싱: 원하는 부분만 잘라내기

### 🎯 기본 슬라이싱 문법
슬라이싱은 `문자열[시작:끝:간격]` 형식으로 문자열의 일부분을 추출합니다.

```python
text = "Python Programming"
#       0123456789012345678

print("=== 기본 슬라이싱 ===")
print(f"text[0:6] = '{text[0:6]}'")     # Python (0부터 5까지)
print(f"text[7:18] = '{text[7:18]}'")   # Programming (7부터 17까지)
print(f"text[7:] = '{text[7:]}'")       # Programming (7부터 끝까지)
print(f"text[:6] = '{text[:6]}'")       # Python (처음부터 5까지)
print(f"text[:] = '{text[:]}'")         # Python Programming (전체)

print("\n=== 음수 인덱스 활용 ===")
print(f"text[-11:] = '{text[-11:]}'")   # Programming (뒤에서 11번째부터)
print(f"text[:-12] = '{text[:-12]}'")   # Python (뒤에서 12번째 전까지)
```

### 🚀 간격(Step)을 이용한 고급 슬라이싱

```python
numbers = "0123456789"

print("=== 간격 지정 슬라이싱 ===")
print(f"numbers[::2] = '{numbers[::2]}'")     # 02468 (2칸씩 건너뛰기)
print(f"numbers[1::2] = '{numbers[1::2]}'")   # 13579 (1부터 2칸씩)
print(f"numbers[::3] = '{numbers[::3]}'")     # 0369 (3칸씩 건너뛰기)

print("\n=== 역순 출력 ===")
print(f"numbers[::-1] = '{numbers[::-1]}'")   # 9876543210 (전체 역순)
print(f"numbers[5:1:-1] = '{numbers[5:1:-1]}'") # 5432 (5부터 2까지 역순)
```

### 🌟 실용적인 슬라이싱 예제

```python
# 이메일 주소 분석하기
email = "user@example.com"
at_index = email.index('@')
username = email[:at_index]           # user
domain = email[at_index + 1:]         # example.com
print(f"사용자명: {username}, 도메인: {domain}")

# 파일 경로에서 확장자 추출하기
filename = "document.pdf"
dot_index = filename.rfind('.')       # 마지막 점의 위치
if dot_index != -1:
    extension = filename[dot_index + 1:]
    print(f"파일 확장자: {extension}")

# 문자열 뒤집기 (팰린드롬 검사에 유용)
def reverse_string(s):
    return s[::-1]

def is_palindrome(word):
    word = word.lower().replace(" ", "")  # 소문자 변환, 공백 제거
    return word == word[::-1]

print(f"'Hello' 뒤집기: {reverse_string('Hello')}")
print(f"'level'은 팰린드롬? {is_palindrome('level')}")
print(f"'A man a plan a canal Panama'는 팰린드롬? {is_palindrome('A man a plan a canal Panama')}")
```

---

## 🛠️ 강력한 문자열 메서드들

### 🔤 대소문자 변환 메서드

```python
text = "Hello World Python"

print("=== 대소문자 변환 ===")
print(f"원본: {text}")
print(f"upper(): {text.upper()}")         # HELLO WORLD PYTHON
print(f"lower(): {text.lower()}")         # hello world python
print(f"capitalize(): {text.capitalize()}")  # Hello world python
print(f"title(): {text.title()}")         # Hello World Python
print(f"swapcase(): {text.swapcase()}")   # hELLO wORLD pYTHON

print("\n=== 대소문자 상태 확인 ===")
print(f"isupper(): {text.isupper()}")     # False
print(f"islower(): {text.islower()}")     # False
print(f"istitle(): {text.istitle()}")     # True
```

#### 🌟 실생활 활용 예시
```python
# 사용자 이름 정규화
def normalize_name(name):
    return name.strip().title()

# 비밀번호 강도 검사
def check_password_case(password):
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    return has_upper and has_lower

print(f"정규화된 이름: {normalize_name('  john DOE  ')}")
print(f"비밀번호 대소문자 포함: {check_password_case('MyPassword123')}")
```

### 🧹 공백 처리 메서드

```python
text = "   Hello World   "

print("=== 공백 제거 ===")
print(f"원본: '{text}'")
print(f"strip(): '{text.strip()}'")      # 양쪽 공백 제거
print(f"lstrip(): '{text.lstrip()}'")    # 왼쪽 공백 제거
print(f"rstrip(): '{text.rstrip()}'")    # 오른쪽 공백 제거

# 특정 문자 제거
data = "...Hello World..."
print(f"\n특정 문자 제거: '{data.strip('.')}'")  # Hello World

print("\n=== 문자열 정렬 ===")
clean_text = text.strip()
print(f"center(20, '*'): '{clean_text.center(20, '*')}'")  # ****Hello World****
print(f"ljust(20, '-'): '{clean_text.ljust(20, '-')}'")    # Hello World--------
print(f"rjust(20, '-'): '{clean_text.rjust(20, '-')}'")    # --------Hello World
```

### 🔍 검색과 확인 메서드

```python
sentence = "Python is easy to learn and Python is powerful"

print("=== 문자열 검색 ===")
print(f"find('is'): {sentence.find('is')}")          # 7 (첫 번째 위치)
print(f"find('Java'): {sentence.find('Java')}")      # -1 (없으면 -1)
print(f"rfind('Python'): {sentence.rfind('Python')}")  # 27 (마지막 위치)
print(f"count('is'): {sentence.count('is')}")        # 2 (개수)

print("\n=== 시작/끝 확인 ===")
print(f"startswith('Python'): {sentence.startswith('Python')}")  # True
print(f"endswith('powerful'): {sentence.endswith('powerful')}")   # True
print(f"startswith('Java'): {sentence.startswith('Java')}")       # False

print("\n=== 포함 확인 ===")
print(f"'easy' in sentence: {'easy' in sentence}")               # True
print(f"'difficult' in sentence: {'difficult' in sentence}")     # False
```

### ✂️ 분할과 결합 메서드

```python
# split() - 문자열을 리스트로 분할
print("=== 문자열 분할 ===")
sentence = "Python,Java,JavaScript,C++"
languages = sentence.split(',')
print(f"쉼표로 분할: {languages}")

text = "Hello    World    Python"
words = text.split()  # 공백으로 분할 (연속 공백도 처리)
print(f"공백으로 분할: {words}")

# 분할 개수 제한
email = "user@mail.example.com"
parts = email.split('@', 1)  # 최대 1번만 분할
print(f"이메일 분할: {parts}")

# join() - 리스트를 문자열로 결합
print("\n=== 문자열 결합 ===")
fruits = ['apple', 'banana', 'cherry']
print(f"쉼표로 결합: {', '.join(fruits)}")
print(f"하이픈으로 결합: {'-'.join(fruits)}")
print(f"공백으로 결합: {' '.join(fruits)}")

# 실용적인 예제: 경로 만들기
path_parts = ['home', 'user', 'documents', 'file.txt']
file_path = '/'.join(path_parts)
print(f"파일 경로: /{file_path}")
```

### 🔄 치환과 변환 메서드

```python
text = "Hello World, Hello Python"

print("=== 문자열 치환 ===")
print(f"replace('Hello', 'Hi'): {text.replace('Hello', 'Hi')}")
print(f"replace('Hello', 'Hi', 1): {text.replace('Hello', 'Hi', 1)}")  # 1번만

# 여러 문자 번역
translation_table = str.maketrans('aeiou', '12345')
translated = text.translate(translation_table)
print(f"모음 번역: {translated}")

print("\n=== 문자열 검증 ===")
test_strings = ['123', 'abc', 'ABC', '123abc', 'Hello World', '   ']

for s in test_strings:
    print(f"'{s}' -> isdigit: {s.isdigit()}, isalpha: {s.isalpha()}, "
          f"isalnum: {s.isalnum()}, isspace: {s.isspace()}")
```

---

## 🎨 문자열 포맷팅: 동적 텍스트 만들기

### 🚀 f-string (권장 방법)

```python
name = "김민수"
age = 25
height = 175.5
is_student = True

print("=== f-string 기본 사용법 ===")
print(f"안녕하세요, {name}님!")
print(f"나이: {age}세, 키: {height}cm")
print(f"학생 여부: {is_student}")

print("\n=== f-string 고급 기능 ===")
# 표현식 사용
print(f"내년 나이: {age + 1}세")
print(f"키(미터): {height / 100:.2f}m")

# 조건문 사용
print(f"상태: {'학생' if is_student else '일반인'}")

# 함수 호출
print(f"이름 길이: {len(name)}글자")
print(f"대문자 이름: {name.upper()}")
```

### 📊 숫자 포맷팅

```python
pi = 3.14159265359
big_number = 1234567890
percentage = 0.85

print("=== 숫자 포맷팅 ===")
print(f"π (소수점 2자리): {pi:.2f}")
print(f"π (소수점 4자리): {pi:.4f}")
print(f"큰 수 (천 단위 구분): {big_number:,}")
print(f"퍼센트: {percentage:.1%}")

# 진법 변환
number = 255
print(f"\n=== 진법 변환 ===")
print(f"10진법: {number}")
print(f"2진법: {number:b}")
print(f"8진법: {number:o}")
print(f"16진법: {number:x}")
print(f"16진법(대문자): {number:X}")
```

### 📐 정렬과 패딩

```python
items = [
    ("사과", 1500),
    ("바나나", 2000),
    ("체리", 5000)
]

print("=== 테이블 형태로 출력 ===")
print(f"{'상품명':<10} {'가격':>8}")
print("-" * 20)
for item, price in items:
    print(f"{item:<10} {price:>8,}원")

print("\n=== 다양한 정렬 방법 ===")
text = "Python"
print(f"왼쪽 정렬: '{text:<15}'")
print(f"오른쪽 정렬: '{text:>15}'")
print(f"가운데 정렬: '{text:^15}'")
print(f"0으로 패딩: '{text:0>15}'")
print(f"*로 패딩: '{text:*^15}'")
```

### 🕒 날짜와 시간 포맷팅

```python
from datetime import datetime

now = datetime.now()

print("=== 날짜/시간 포맷팅 ===")
print(f"현재 시간: {now}")
print(f"날짜만: {now:%Y-%m-%d}")
print(f"시간만: {now:%H:%M:%S}")
print(f"한국식: {now:%Y년 %m월 %d일}")
print(f"요일 포함: {now:%Y-%m-%d (%A)}")
```

---

## 🎯 실습: 텍스트 분석 프로그램

### 📝 실습 과제
사용자가 입력한 텍스트를 분석하여 다양한 통계 정보를 제공하는 프로그램을 만들어보세요.

```python
# Text Analysis Program
def analyze_text(text):
    """텍스트를 분석하여 다양한 통계를 반환합니다."""
    
    # 기본 통계
    char_count = len(text)
    char_count_no_space = len(text.replace(' ', ''))
    word_count = len(text.split())
    line_count = text.count('\n') + 1
    
    # 문자 종류별 개수
    upper_count = sum(1 for c in text if c.isupper())
    lower_count = sum(1 for c in text if c.islower())
    digit_count = sum(1 for c in text if c.isdigit())
    space_count = text.count(' ')
    
    # 가장 긴/짧은 단어
    words = text.split()
    if words:
        longest_word = max(words, key=len)
        shortest_word = min(words, key=len)
    else:
        longest_word = shortest_word = ""
    
    # 단어 빈도 (간단 버전)
    word_freq = {}
    for word in words:
        word_lower = word.lower().strip('.,!?')
        word_freq[word_lower] = word_freq.get(word_lower, 0) + 1
    
    return {
        'char_count': char_count,
        'char_count_no_space': char_count_no_space,
        'word_count': word_count,
        'line_count': line_count,
        'upper_count': upper_count,
        'lower_count': lower_count,
        'digit_count': digit_count,
        'space_count': space_count,
        'longest_word': longest_word,
        'shortest_word': shortest_word,
        'word_freq': word_freq
    }

def display_analysis(stats):
    """분석 결과를 예쁘게 출력합니다."""
    print("=" * 50)
    print("           📊 텍스트 분석 결과")
    print("=" * 50)
    
    print(f"📝 전체 문자 수: {stats['char_count']:,}개")
    print(f"📝 공백 제외 문자 수: {stats['char_count_no_space']:,}개")
    print(f"📖 단어 수: {stats['word_count']:,}개")
    print(f"📄 줄 수: {stats['line_count']:,}개")
    
    print(f"\n🔤 문자 종류별 통계:")
    print(f"   대문자: {stats['upper_count']:,}개")
    print(f"   소문자: {stats['lower_count']:,}개")
    print(f"   숫자: {stats['digit_count']:,}개")
    print(f"   공백: {stats['space_count']:,}개")
    
    if stats['longest_word']:
        print(f"\n📏 단어 길이:")
        print(f"   가장 긴 단어: '{stats['longest_word']}' ({len(stats['longest_word'])}글자)")
        print(f"   가장 짧은 단어: '{stats['shortest_word']}' ({len(stats['shortest_word'])}글자)")
    
    # 상위 5개 빈도 단어
    if stats['word_freq']:
        print(f"\n🔥 자주 사용된 단어 (상위 5개):")
        sorted_words = sorted(stats['word_freq'].items(), key=lambda x: x[1], reverse=True)
        for i, (word, count) in enumerate(sorted_words[:5], 1):
            print(f"   {i}. '{word}': {count}번")

# 메인 프로그램
def main():
    print("=" * 50)
    print("           📊 텍스트 분석기")
    print("=" * 50)
    print("분석할 텍스트를 입력하세요 (빈 줄 입력 시 종료):")
    
    lines = []
    while True:
        line = input()
        if line.strip() == "":
            break
        lines.append(line)
    
    if lines:
        text = '\n'.join(lines)
        stats = analyze_text(text)
        display_analysis(stats)
    else:
        print("입력된 텍스트가 없습니다.")

# 프로그램 실행
if __name__ == "__main__":
    main()
```

### 🎮 실행 예시
```
==================================================
           📊 텍스트 분석기
==================================================
분석할 텍스트를 입력하세요 (빈 줄 입력 시 종료):
Python is a powerful programming language.
It is easy to learn and fun to use.
Many developers love Python!

==================================================
           📊 텍스트 분석 결과
==================================================
📝 전체 문자 수: 98개
📝 공백 제외 문자 수: 82개
📖 단어 수: 16개
📄 줄 수: 3개

🔤 문자 종류별 통계:
   대문자: 4개
   소문자: 78개
   숫자: 0개
   공백: 16개

📏 단어 길이:
   가장 긴 단어: 'programming' (11글자)
   가장 짧은 단어: 'a' (1글자)

🔥 자주 사용된 단어 (상위 5개):
   1. 'python': 2번
   2. 'is': 2번
   3. 'to': 2번
   4. 'and': 1번
   5. 'it': 1번
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 단어 게임
```python
def word_game():
    """끝말잇기 게임의 기본 검증 로직"""
    words = []
    
    print("=== 끝말잇기 게임 ===")
    print("단어를 입력하세요 ('quit' 입력 시 종료)")
    
    while True:
        word = input("단어: ").strip().lower()
        
        if word == 'quit':
            break
            
        if not word.isalpha():
            print("❌ 알파벳만 입력해주세요!")
            continue
            
        if word in words:
            print("❌ 이미 사용된 단어입니다!")
            continue
            
        if words and words[-1][-1] != word[0]:
            print(f"❌ '{words[-1]}'의 마지막 글자 '{words[-1][-1]}'로 시작해야 합니다!")
            continue
            
        words.append(word)
        print(f"✅ 좋습니다! 현재 단어: {' → '.join(words)}")
    
    print(f"게임 종료! 총 {len(words)}개의 단어를 사용했습니다.")

# word_game()  # 주석 해제하여 실행
```

### 🚀 심화 과제: 텍스트 암호화
```python
def caesar_cipher(text, shift):
    """시저 암호로 텍스트를 암호화/복호화합니다."""
    result = ""
    
    for char in text:
        if char.isalpha():
            # 대문자/소문자 구분
            start = ord('A') if char.isupper() else ord('a')
            # 시프트 적용
            shifted = (ord(char) - start + shift) % 26
            result += chr(start + shifted)
        else:
            result += char
    
    return result

def text_encoder():
    """텍스트 인코딩/디코딩 프로그램"""
    print("=== 텍스트 암호화 프로그램 ===")
    
    while True:
        print("\n1. 암호화")
        print("2. 복호화")
        print("3. 종료")
        
        choice = input("선택: ").strip()
        
        if choice == '3':
            break
        elif choice in ['1', '2']:
            text = input("텍스트 입력: ")
            shift = int(input("시프트 값 (1-25): "))
            
            if choice == '2':
                shift = -shift  # 복호화는 음수 시프트
            
            result = caesar_cipher(text, shift)
            print(f"결과: {result}")
        else:
            print("잘못된 선택입니다.")

# text_encoder()  # 주석 해제하여 실행
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- 문자열 인덱싱과 슬라이싱으로 원하는 부분 추출
- 다양한 문자열 메서드를 활용한 텍스트 조작
- f-string을 이용한 강력한 문자열 포맷팅
- 실무에서 자주 사용하는 문자열 처리 패턴

✅ **핵심 개념**
- **인덱싱**: `text[0]`, `text[-1]`
- **슬라이싱**: `text[start:end:step]`
- **메서드**: `split()`, `join()`, `replace()`, `strip()`
- **포맷팅**: `f"{변수:포맷}"`

✅ **실무 팁**
- 음수 인덱스로 뒤에서부터 접근하기
- f-string 사용하여 가독성 높은 코드 작성하기
- 문자열 메서드 체이닝으로 효율적인 처리하기

🎯 **다음 챕터 예고**
다음 챕터에서는 리스트와 튜플을 배워보겠습니다. 여러 개의 데이터를 효율적으로 관리하고 조작하는 방법을 마스터해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: 문자열은 변경할 수 없다고 하는데, replace()는 어떻게 작동하나요?**
A: Python의 문자열은 불변(immutable)입니다. `replace()`는 원본을 수정하지 않고 새로운 문자열을 반환합니다.

**Q: 슬라이싱에서 인덱스가 범위를 벗어나면 어떻게 되나요?**
A: 슬라이싱은 인덱스가 범위를 벗어나도 오류가 발생하지 않습니다. 자동으로 유효한 범위로 조정됩니다.

**Q: f-string과 format() 메서드 중 어떤 것을 사용해야 하나요?**
A: Python 3.6 이상에서는 f-string을 권장합니다. 더 빠르고 읽기 쉽습니다.

**Q: 문자열에서 특정 패턴을 찾으려면 어떻게 해야 하나요?**
A: 간단한 패턴은 `in`, `find()`, `startswith()` 등을 사용하고, 복잡한 패턴은 정규표현식(re 모듈)을 사용합니다. 