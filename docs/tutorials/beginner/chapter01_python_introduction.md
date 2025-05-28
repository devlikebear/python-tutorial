# Chapter 1: Python 소개와 개발 환경 설정

## 📚 이 챕터에서 배울 내용
- Python이 무엇이고 왜 인기 있는지 이해하기
- Python 설치하고 개발 환경 구축하기
- 첫 번째 Python 프로그램 작성하고 실행하기
- Python의 기본 실행 방식 이해하기

---

## 🐍 Python이란 무엇인가요?

### 💡 Python의 탄생 이야기
Python은 1991년 네덜란드의 **귀도 반 로섬(Guido van Rossum)**이 만든 프로그래밍 언어입니다. 재미있게도 이름은 뱀이 아니라 영국의 코미디 그룹 "몬티 파이썬"에서 따온 것입니다!

### 🌟 Python이 특별한 이유

#### 1. 읽기 쉬운 문법
다른 언어와 비교해보면 Python의 간결함을 알 수 있습니다:

**Python으로 "Hello, World!" 출력하기:**
```python
print("Hello, World!")
```

**Java로 같은 작업하기:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

> 💭 **생각해보기**: Python이 얼마나 간단한지 보이시나요? 이것이 Python이 초보자에게 인기 있는 이유 중 하나입니다.

#### 2. 다양한 분야에서 활용
Python은 정말 다양한 곳에서 사용됩니다:

| 분야 | 주요 라이브러리 | 실제 사용 예시 |
|------|----------------|----------------|
| 🌐 웹 개발 | Django, Flask | Instagram, Spotify |
| 📊 데이터 분석 | Pandas, NumPy | Netflix 추천 시스템 |
| 🤖 인공지능 | TensorFlow, PyTorch | ChatGPT, 자율주행차 |
| 🔧 자동화 | Selenium, PyAutoGUI | 업무 자동화, 웹 크롤링 |

#### 3. 풍부한 생태계
Python에는 30만 개가 넘는 패키지가 있어서 거의 모든 작업을 위한 도구를 찾을 수 있습니다.

---

## 💻 Python 설치하기

### Step 1: Python 다운로드
1. [Python 공식 홈페이지](https://www.python.org/) 방문
2. 큰 "Download Python" 버튼 클릭
3. 본인의 운영체제에 맞는 버전 다운로드

### Step 2: 설치하기

#### Windows 사용자
⚠️ **중요**: 설치할 때 반드시 "Add Python to PATH" 체크박스를 선택하세요!

#### macOS 사용자
기본 설치 과정을 따라하면 됩니다.

#### Linux 사용자
대부분의 Linux 배포판에는 Python이 이미 설치되어 있습니다.

### Step 3: 설치 확인하기
터미널(Windows에서는 명령 프롬프트)을 열고 다음 명령어를 입력하세요:

```bash
python --version
```

다음과 같은 결과가 나오면 성공입니다:
```
Python 3.11.5
```

> 🔧 **문제 해결**: 만약 "python을 찾을 수 없습니다"라는 오류가 나온다면, PATH 설정이 제대로 되지 않은 것입니다. Python을 다시 설치하거나 PATH를 수동으로 설정해야 합니다.

---

## 🚀 Python 실행해보기

### 방법 1: 대화형 모드 (Interactive Mode)

터미널에서 `python`을 입력하면 대화형 모드가 시작됩니다:

```
$ python
Python 3.11.5 (main, Sep 11 2023, 08:17:37) 
[Clang 14.0.6 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

이제 Python 코드를 바로 입력할 수 있습니다:

```python
>>> 2 + 3
5
>>> print("안녕하세요!")
안녕하세요!
>>> name = "김민수"
>>> print(f"제 이름은 {name}입니다")
제 이름은 김민수입니다
```

**대화형 모드 종료하기:**
- `exit()` 입력하거나
- `Ctrl + D` (Mac/Linux) 또는 `Ctrl + Z` (Windows) 누르기

> 💡 **팁**: 대화형 모드는 간단한 계산이나 코드 테스트에 매우 유용합니다!

### 방법 2: 스크립트 파일 실행

#### 첫 번째 Python 파일 만들기
텍스트 에디터로 `hello.py` 파일을 만들고 다음 코드를 입력하세요:

```python
# My first Python program
print("Hello, World!")
print("Welcome to Python!")

# Using variables
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
```

#### 파일 실행하기
터미널에서 파일이 있는 폴더로 이동한 후:

```bash
python hello.py
```

**예상 결과:**
```
Hello, World!
Welcome to Python!
My name is Alice and I am 25 years old.
```

---

## 🛠️ 개발 환경 설정하기

### 텍스트 에디터 vs IDE 선택하기

#### 🌟 추천: Visual Studio Code (무료)
- 가볍고 빠름
- 강력한 Python 확장 기능
- 초보자에게 친화적

#### 다른 좋은 선택지들
- **PyCharm**: 전문적인 Python IDE (무료 Community 버전 있음)
- **Sublime Text**: 매우 빠른 텍스트 에디터
- **IDLE**: Python과 함께 설치되는 기본 에디터

### Visual Studio Code 설정하기

1. **VS Code 설치**
   - [VS Code 홈페이지](https://code.visualstudio.com/)에서 다운로드
   - 설치 후 실행

2. **Python 확장 프로그램 설치**
   - `Ctrl + Shift + X` (확장 프로그램 탭 열기)
   - "Python" 검색
   - Microsoft에서 만든 Python 확장 프로그램 설치

3. **첫 번째 Python 파일 만들고 실행하기**
   - `Ctrl + N` (새 파일)
   - 코드 작성
   - `Ctrl + S`로 `.py` 확장자로 저장
   - `F5` 또는 `Ctrl + F5`로 실행

---

## 🎯 실습: 나만의 자기소개 프로그램 만들기

이제 배운 내용을 활용해서 간단한 프로그램을 만들어보겠습니다!

### 📝 실습 과제
`my_introduction.py` 파일을 만들고 다음 기능을 구현해보세요:

1. 사용자에게 이름, 나이, 취미를 입력받기
2. 입력받은 정보로 멋진 자기소개 출력하기

### 💻 예시 코드

```python
# Personal Introduction Program
print("=" * 30)
print("   자기소개 프로그램")
print("=" * 30)

# Get user input
name = input("이름을 입력하세요: ")
age = input("나이를 입력하세요: ")
hobby = input("취미를 입력하세요: ")

# Display introduction
print("\n" + "=" * 30)
print("      자기소개")
print("=" * 30)
print(f"🙋‍♂️ 이름: {name}")
print(f"🎂 나이: {age}살")
print(f"🎨 취미: {hobby}")
print("=" * 30)
print("Python 학습을 시작합니다! 🐍")
```

### 🎮 실행 예시
```
==============================
   자기소개 프로그램
==============================
이름을 입력하세요: 김민수
나이를 입력하세요: 20
취미를 입력하세요: 독서

==============================
      자기소개
==============================
🙋‍♂️ 이름: 김민수
🎂 나이: 20살
🎨 취미: 독서
==============================
Python 학습을 시작합니다! 🐍
```

### 🔍 코드 이해하기

#### 주석 (Comments)
```python
# This is a comment - used for code explanation
```
- `#` 뒤의 내용은 실행되지 않음
- 코드를 설명하거나 메모를 남길 때 사용

#### 문자열 반복
```python
print("=" * 30)  # Print = 30 times
```

#### f-string (포맷 문자열)
```python
print(f"안녕하세요, {name}님!")  # Insert variable value into string
```

#### 줄바꿈 문자
```python
print("\n")  # Print empty line
```

---

## 🎯 도전 과제

### 🌟 기본 과제
위의 자기소개 프로그램을 실행해보고, 본인의 정보로 테스트해보세요.

### 🚀 심화 과제
자기소개 프로그램을 다음과 같이 개선해보세요:
1. 좋아하는 음식도 입력받기
2. 더 예쁜 출력 형태 만들기
3. 나이에 따라 다른 메시지 출력하기

### 💡 힌트
```python
# Conditional statement example (will learn in next chapter)
if int(age) >= 20:
    print("성인이시군요!")
else:
    print("미성년자시군요!")
```

---

## 🔧 일반적인 오류와 해결법

### SyntaxError
```python
# Wrong code
print("Hello World"
```
**Error message:**
```
SyntaxError: unexpected EOF while parsing
```
**Solution:** Add closing parenthesis `)`

### NameError
```python
# Wrong code
print(message)
```
**Error message:**
```
NameError: name 'message' is not defined
```
**Solution:** Define variable first
```python
message = "Hello"
print(message)
```

### IndentationError
```python
# Wrong code
if True:
print("Hello")
```
**Error message:**
```
IndentationError: expected an indented block
```
**Solution:** Add proper indentation
```python
if True:
    print("Hello")
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- Python의 특징과 장점
- Python 설치 및 환경 설정
- 대화형 모드와 스크립트 파일 실행
- 기본적인 입력/출력 함수 사용
- 주석, 변수, f-string 기초

✅ **핵심 개념**
- `print()`: 화면에 출력
- `input()`: 사용자 입력 받기
- `#`: 주석 작성
- `f"{변수}"`: 문자열 포맷팅

🎯 **다음 챕터 예고**
다음 챕터에서는 변수와 데이터 타입에 대해 자세히 알아보겠습니다. 숫자, 문자열, 불린 등 Python의 기본 데이터 타입들을 마스터해보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: Python 2와 Python 3 중 어떤 것을 배워야 하나요?**
A: 반드시 Python 3를 배우세요! Python 2는 2020년에 지원이 종료되었습니다.

**Q: 프로그래밍이 처음인데 Python으로 시작해도 될까요?**
A: 네! Python은 초보자에게 가장 추천되는 언어 중 하나입니다.

**Q: 에러가 나면 어떻게 해야 하나요?**
A: 에러 메시지를 잘 읽어보세요. 대부분의 에러 메시지는 문제가 무엇인지 알려줍니다. 구글에 에러 메시지를 검색하는 것도 좋은 방법입니다.

**Q: 얼마나 공부하면 Python을 잘할 수 있나요?**
A: 개인차가 있지만, 매일 1-2시간씩 꾸준히 공부하면 3-6개월 정도면 기본기를 탄탄히 다질 수 있습니다. 