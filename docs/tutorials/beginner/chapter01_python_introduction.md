# Chapter 1: Python 소개와 개발 환경 설정

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- Python의 역사와 특징을 이해한다
- Python 개발 환경을 설정한다
- Python 인터프리터를 사용한다
- 첫 번째 Python 프로그램을 작성하고 실행한다

## 1. Python이란?

### 1.1 Python의 역사
Python은 1991년 네덜란드의 **귀도 반 로섬(Guido van Rossum)**이 개발한 프로그래밍 언어입니다. 영국의 코미디 그룹 "몬티 파이썬"에서 이름을 따왔습니다.

### 1.2 Python의 특징

#### 🔹 간단하고 읽기 쉬운 문법
```python
# Python
print("Hello, World!")

# Java (비교)
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

#### 🔹 인터프리터 언어
- 컴파일 없이 바로 실행 가능
- 대화형 실행 환경 제공

#### 🔹 플랫폼 독립적
- Windows, macOS, Linux에서 동일하게 작동

#### 🔹 풍부한 라이브러리
- 표준 라이브러리와 서드파티 패키지 생태계

#### 🔹 다양한 용도
- **웹 개발**: Django, Flask
- **데이터 분석**: Pandas, NumPy
- **머신러닝**: TensorFlow, PyTorch
- **자동화**: 스크립트, 업무 자동화

## 2. Python 설치하기

### 2.1 Python 공식 홈페이지에서 설치

1. [Python 공식 홈페이지](https://www.python.org/) 방문
2. "Downloads" 클릭
3. 본인의 운영체제에 맞는 최신 버전 다운로드
4. 설치 파일 실행

**⚠️ 설치 시 주의사항**
- Windows: "Add Python to PATH" 체크박스 반드시 선택
- "Install launcher for all users" 권장

### 2.2 설치 확인

터미널/명령 프롬프트에서 다음 명령어 실행:

```bash
python --version
```

또는

```bash
python -V
```

**예상 출력:**
```
Python 3.11.5
```

## 3. Python 실행 방법

### 3.1 대화형 모드 (Interactive Mode)

터미널에서 `python` 입력:

```
$ python
Python 3.11.5 (main, Sep 11 2023, 08:17:37) 
[Clang 14.0.6 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

#### 간단한 계산해보기
```python
>>> 2 + 3
5
>>> 10 * 5
50
>>> "Hello" + " World"
'Hello World'
```

#### 대화형 모드 종료하기
```python
>>> exit()
```

또는 `Ctrl + D` (Linux/macOS), `Ctrl + Z` (Windows)

### 3.2 스크립트 파일 실행

#### hello.py 파일 만들기
텍스트 에디터로 `hello.py` 파일 생성:

```python
# This is my first Python program
print("Hello, World!")
print("Welcome to Python!")

# Variables
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")
```

#### 파일 실행하기
```bash
python hello.py
```

**예상 출력:**
```
Hello, World!
Welcome to Python!
My name is Alice and I am 25 years old.
```

## 4. 개발 환경 설정

### 4.1 텍스트 에디터 vs IDE

#### 추천 텍스트 에디터
- **Visual Studio Code** (무료, 강력한 확장 기능)
- **Sublime Text** (빠른 속도)
- **Atom** (GitHub 제작)

#### 추천 IDE
- **PyCharm** (Professional, Community 버전 있음)
- **Spyder** (과학 계산용)
- **IDLE** (Python 기본 제공)

### 4.2 Visual Studio Code 설정 (권장)

1. [VS Code 다운로드](https://code.visualstudio.com/)
2. Python 확장 프로그램 설치:
   - `Ctrl + Shift + X` → "Python" 검색 → 설치

#### VS Code에서 Python 파일 만들고 실행하기
1. `Ctrl + N` → 새 파일
2. `Ctrl + S` → `.py` 확장자로 저장
3. 코드 작성
4. `Ctrl + F5` → 실행

## 5. 첫 번째 프로그램 작성하기

### 5.1 실습: 자기소개 프로그램

`introduction.py` 파일을 만들고 다음 코드를 작성해보세요:

```python
# Personal Introduction Program

# Get user input
print("=== 자기소개 프로그램 ===")
name = input("이름을 입력하세요: ")
age = input("나이를 입력하세요: ")
hobby = input("취미를 입력하세요: ")

# Display introduction
print("\n=== 자기소개 ===")
print(f"안녕하세요! 제 이름은 {name}입니다.")
print(f"저는 {age}살이고, {hobby}을/를 좋아합니다.")
print("Python 학습을 시작합니다!")
```

**실행 예시:**
```
=== 자기소개 프로그램 ===
이름을 입력하세요: 김민수
나이를 입력하세요: 20
취미를 입력하세요: 독서

=== 자기소개 ===
안녕하세요! 제 이름은 김민수입니다.
저는 20살이고, 독서을/를 좋아합니다.
Python 학습을 시작합니다!
```

### 5.2 코드 설명

#### 주석 (Comments)
```python
# 이것은 주석입니다
```
- `#` 뒤의 내용은 실행되지 않음
- 코드 설명이나 메모 용도

#### print() 함수
```python
print("Hello, World!")
```
- 화면에 텍스트를 출력하는 함수

#### input() 함수
```python
name = input("이름을 입력하세요: ")
```
- 사용자로부터 입력을 받는 함수
- 입력받은 값을 변수에 저장

#### f-string (포맷 문자열)
```python
print(f"제 이름은 {name}입니다.")
```
- 변수 값을 문자열에 삽입하는 방법
- `{}` 안에 변수명 작성

## 6. 일반적인 오류와 해결법

### 6.1 SyntaxError
```python
# 잘못된 코드
print("Hello World"
```
**오류 메시지:**
```
SyntaxError: unexpected EOF while parsing
```
**해결법:** 괄호 닫기 `)`

### 6.2 NameError
```python
# 잘못된 코드
print(message)
```
**오류 메시지:**
```
NameError: name 'message' is not defined
```
**해결법:** 변수를 먼저 정의
```python
message = "Hello"
print(message)
```

### 6.3 IndentationError
```python
# 잘못된 코드
if True:
print("Hello")
```
**오류 메시지:**
```
IndentationError: expected an indented block
```
**해결법:** 들여쓰기 추가
```python
if True:
    print("Hello")
```

## 7. 실습 과제

### 과제 1: 계산기 프로그램
두 숫자를 입력받아 사칙연산 결과를 출력하는 프로그램을 작성하세요.

**요구사항:**
- 두 숫자 입력받기
- 덧셈, 뺄셈, 곱셈, 나눗셈 결과 출력
- 적절한 설명 메시지 포함

**예시 출력:**
```
=== 간단한 계산기 ===
첫 번째 숫자: 10
두 번째 숫자: 3

=== 계산 결과 ===
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3.33
```

### 과제 2: 정보 수집 프로그램
사용자의 여러 정보를 입력받아 정리해서 출력하는 프로그램을 작성하세요.

**수집할 정보:**
- 이름, 나이, 거주지역, 직업, 좋아하는 색상

## 8. 다음 챕터 미리보기

Chapter 2에서는 다음 내용을 학습합니다:
- **변수와 데이터 타입**: 숫자, 문자열, 불린
- **변수 명명 규칙**과 **상수**
- **타입 변환**과 **타입 확인**
- **기본 연산자**: 산술, 비교, 논리 연산자

## 9. 핵심 정리

✅ **Python 특징**
- 간단하고 읽기 쉬운 문법
- 인터프리터 언어로 즉시 실행 가능
- 풍부한 라이브러리 생태계

✅ **실행 방법**
- 대화형 모드: `python` 명령어
- 스크립트 실행: `python 파일명.py`

✅ **기본 함수**
- `print()`: 출력
- `input()`: 입력
- `#`: 주석

✅ **개발 환경**
- Visual Studio Code + Python 확장 프로그램 권장

---

**🎉 축하합니다!** Chapter 1을 완료했습니다. 이제 Python의 기본 개념을 이해하고 개발 환경을 설정했습니다. Chapter 2에서는 변수와 데이터 타입에 대해 더 자세히 알아보겠습니다. 