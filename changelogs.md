# Python Tutorial Project - Changelog

## 프로젝트 진행 현황

### 🎯 전체 진행 상황
- **프로젝트 시작일**: 2025년 05월
- **현재 상태**: 중급 튜토리얼 작성 진행 중 (Chapter 6 완료)
- **완료된 단계**: 초급 Chapter 1-10 완료 (83.3%), 중급 Chapter 1-6 완료 (42.9%)

---

## 📝 작업 로그

### 2025-05-24

#### ✅ Chapter 6: 특수 메서드 (Magic Methods) (중급 과정) 완료 (2025-05-24 21:59)
- **작업 내용**:
  - 중급 Chapter 6 마크다운 튜토리얼 작성 완료
    - 특수 메서드 개요와 분류 (객체 표현, 연산자, 컨테이너, 반복자 등)
    - 객체 표현 메서드 (__str__, __repr__, __format__)와 사용자 친화적 출력
    - 산술 연산자 오버로딩 (__add__, __sub__, __mul__, __truediv__ 등)
    - 비교 연산자 오버로딩 (__eq__, __lt__, __le__, __gt__ 등)
    - 컨테이너 프로토콜 구현 (__getitem__, __setitem__, __contains__, __len__ 등)
    - 컨텍스트 매니저 구현 (__enter__, __exit__)과 리소스 관리
    - 반복자 프로토콜 (__iter__, __next__)과 커스텀 반복 가능 객체
    - Vector, Person, Book, Student, CustomList, Timer, NumberRange, FibonacciIterator 클래스 예제
    - 7개 종합 연습 문제 (복소수 클래스, 온도 클래스, 매트릭스 클래스 등)
    - 실무에서 자주 사용되는 패턴과 모범 사례 제공
  - Chapter 6 퀴즈 JSON 파일 생성 (30문제 - 다양한 문제 유형으로 전체 내용 포괄)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter06_magic_methods.md` (새로 생성)
  - `quizzes/intermediate/chapter06_quiz.json` (새로 생성)

#### ✅ Chapter 5: 상속과 다형성 (중급 과정) 완료 (2025-05-24 21:40)
- **작업 내용**:
  - 중급 Chapter 5 마크다운 튜토리얼 작성 완료
    - 상속의 기본 개념과 필요성 (코드 재사용성, 계층적 구조)
    - super() 함수 활용법과 부모 클래스 메서드 호출
    - 메서드 오버라이딩을 통한 기능 확장과 특화
    - 다형성의 개념과 동일한 인터페이스로 다양한 객체 처리
    - 추상 클래스(ABC)와 @abstractmethod 데코레이터 활용
    - 인터페이스 패턴 구현과 다중 인터페이스 상속
    - 다중 상속과 MRO(Method Resolution Order) 이해
    - 다이아몬드 문제 해결과 C3 선형화 알고리즘
    - 6개 주요 섹션과 실무 중심 예제 제공
    - Animal, Vehicle, Shape, Employee, PaymentProcessor 등 다양한 실습 클래스 포함
  - Chapter 5 퀴즈 JSON 파일 생성 (32문제 - 기본 개념부터 전문가 수준까지 포괄)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter05_inheritance_polymorphism.md` (새로 생성)
  - `quizzes/intermediate/chapter05_quiz.json` (새로 생성)

#### ✅ Chapter 4: 객체지향 프로그래밍 기초 (중급 과정) 완료 (2025-05-24 21:29)
- **작업 내용**:
  - 중급 Chapter 4 마크다운 튜토리얼 작성 완료
    - 객체지향 프로그래밍의 기본 개념과 절차적 프로그래밍과의 비교
    - 클래스와 객체의 관계, 설계도와 실체의 개념
    - 클래스 정의 문법과 기본 구조 (생성자, 소멸자, 메서드)
    - 인스턴스 변수와 클래스 변수의 차이점과 활용법
    - 메서드의 종류 (인스턴스, 클래스, 정적 메서드)와 각각의 특징
    - 파이썬의 접근 제어 (public, protected, private)와 명명 규칙
    - 프로퍼티(@property)를 활용한 데이터 검증과 계산된 속성
    - 실용적인 클래스 설계 예제 (은행 계좌, 도서관 관리 시스템)
    - 6개 주요 섹션과 종합적인 실무 중심 예제 제공
    - Car, BankAccount, Student, Library 등 다양한 실습 클래스 포함
  - Chapter 4 퀴즈 JSON 파일 생성 (32문제 - 기본 개념부터 전문가 수준까지 포괄)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter04_oop_basics.md` (새로 생성)
  - `quizzes/intermediate/chapter04_quiz.json` (새로 생성)

#### ✅ Chapter 3: 정규표현식 (중급 과정) 완료 (2025-05-24 21:19)
- **작업 내용**:
  - 중급 Chapter 3 마크다운 튜토리얼 작성 완료
    - 정규표현식 기본 문법과 메타 문자 (점, 수량자, 앵커, 문자 클래스)
    - re 모듈 주요 함수 (search, match, findall, finditer, split, sub)
    - 컴파일된 패턴 객체와 플래그 활용 (IGNORECASE, MULTILINE, DOTALL)
    - 그룹화와 캡처 (기본 그룹, 명명된 그룹, 비캡처 그룹)
    - 고급 기법 (룩어헤드/룩비하인드, 조건부 매칭)
    - 실용적인 패턴 모음 (데이터 검증, 텍스트 처리, 로그 분석)
    - 웹 스크래핑과 로그 모니터링 시스템 예제
    - 성능 최적화와 모범 사례
    - 5개 주요 섹션과 실무 중심 예제 제공
    - 종합적인 연습 문제와 실무 활용 사례 포함
  - Chapter 3 퀴즈 JSON 파일 생성 (35문제 - 기본 문법부터 실무 응용까지 포괄)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter03_regular_expressions.md` (새로 생성)
  - `quizzes/intermediate/chapter03_quiz.json` (새로 생성)

#### ✅ Chapter 2: 파일 처리와 데이터 형식 (중급 과정) 완료 (2025-05-24 21:01)
- **작업 내용**:
  - 중급 Chapter 2 마크다운 튜토리얼 작성 완료
    - JSON 처리 (기본 활용, 복잡한 데이터 구조, 커스텀 직렬화, 스키마 검증)
    - CSV 처리 (기본 읽기/쓰기, 데이터 분석, 고급 검증과 필터링)
    - XML 처리 (ElementTree 기본, 고급 조작, 네임스페이스 처리)
    - 바이너리 파일 처리 (구조화된 데이터, 이미지 메타데이터, BMP 파일 생성/읽기)
    - 아카이브 처리 (ZIP/TAR 생성, 분석과 추출, 증분 백업)
    - 설정 파일 관리 (ConfigParser, JSON/YAML 설정, 검증)
    - 8개 주요 섹션과 실용적인 예제 제공
    - 종합적인 연습 문제와 실무 활용 사례 포함
  - Chapter 2 퀴즈 JSON 파일 생성 (40문제 - 객관식, 빈칸 채우기, 참/거짓 문제 포함)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter02_file_processing_data_formats.md` (새로 생성)
  - `quizzes/intermediate/chapter02_quiz.json` (새로 생성)

#### ✅ Chapter 1: 고급 함수 기법 (중급 과정) 완료 (2024-05-24 20:44)
- **작업 내용**:
  - 중급 Chapter 1 마크다운 튜토리얼 작성 완료
    - 가변 인수 (*args와 **kwargs) 활용법과 실용 예제
    - 람다 함수의 정의와 적절한 사용 사례 (정렬, 필터링, map 활용)
    - 고차 함수 (map, filter, reduce)를 이용한 함수형 프로그래밍 패턴
    - 함수 데코레이터 개념과 실용적 활용 (로깅, 타이밍, 캐싱, 검증 등)
    - 클로저의 개념과 상태 캡슐화 활용법
    - 재귀 함수 설계와 최적화 기법 (메모이제이션, 꼬리 재귀)
    - 함수형 프로그래밍 패턴 (순수 함수, 함수 합성, 커링)
    - 8개 주요 섹션과 종합적인 실습 예제
    - 고급 프로그래밍 패턴과 실무 활용 사례 제공
  - Chapter 1 퀴즈 JSON 파일 생성 (35문제 - 객관식, 코딩, 실습, 분석, 종합 문제 포함)

- **파일 생성/수정**:
  - `tutorials/intermediate/chapter01_advanced_functions.md` (새로 생성)
  - `quizzes/intermediate/chapter01_advanced_functions.json` (새로 생성)

#### ✅ Chapter 11: 에러 처리와 디버깅 완료 (2025-05-24 14:55)
#### ✅ Chapter 11: 에러 처리와 디버깅 완료 (2025-05-24 14:55)
- **작업 내용**:
  - Chapter 11 마크다운 튜토리얼 작성 완료
    - 에러와 예외의 기본 개념 (문법 에러 vs 런타임 에러, 예외 처리 필요성)
    - try-except 문 기본 사용법 (기본 구조, 구체적 예외 처리, 여러 예외 처리)
    - else와 finally 절 활용법 (조건부 실행, 리소스 정리)
    - 사용자 정의 예외 (커스텀 예외 클래스, 예외 체인과 컨텍스트)
    - 디버깅 기법 (print, assert, 로깅을 활용한 디버깅)
    - 실용적인 에러 처리 패턴 (입력 검증, 파일 처리, 네트워크 요청)
    - 실용적인 예제 6개 (안전한 계산기, 리소스 관리, 네트워크 요청, API 클라이언트 등)
    - 연습 문제 4개 (입력 처리기, 로그 분석기, API 클라이언트, 데이터 검증 시스템)
  - Chapter 11 퀴즈 JSON 파일 생성 (32문제 - 기본부터 고급까지 포괄)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter11_error_handling_debugging.md` (새로 생성)
  - `quizzes/beginner/chapter11_error_handling_debugging.json` (새로 생성)

#### ✅ Chapter 10: 함수 기초 완료
- **작업 내용**:
  - Chapter 10 마크다운 튜토리얼 작성 완료
    - 함수의 기본 개념과 필요성 (코드 재사용성, 가독성, 모듈화, 추상화)
    - 함수 정의와 호출 방법 (def 키워드, docstring, 매개변수, 반환값)
    - 매개변수와 인수의 차이점과 활용법 (위치/키워드 인수, 기본값 매개변수)
    - 가변 인수 활용 (*args, **kwargs, 언패킹)
    - 변수의 스코프 이해 (지역변수, 전역변수, global, nonlocal 키워드)
    - 람다 함수 기본 개념과 활용 (정렬, 필터링, map 함수와 조합)
    - 실용적인 함수 예제 3개 (계산기 함수들, 문자열 처리 함수들, 데이터 분석 함수들)
    - 연습 문제 4개 (온도 변환기, 비밀번호 검증기, 피보나치 생성기, 텍스트 암호화기)
  - Chapter 10 퀴즈 JSON 파일 생성 (30문제 - 기본부터 고급까지 포괄)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter10_functions_basics.md` (새로 생성)
  - `quizzes/beginner/chapter10_functions_basics.json` (새로 생성)

#### ✅ Chapter 9: 딕셔너리와 집합 완료
- **작업 내용**:
  - Chapter 9 마크다운 튜토리얼 작성 완료
    - 딕셔너리의 기본 개념과 특징 (키-값 쌍, 변경 가능, Python 3.7+ 순서 보장)
    - 딕셔너리 접근과 수정 (안전한 접근, 업데이트, 병합)
    - 딕셔너리 메서드 총정리 (keys(), values(), items(), get(), pop(), setdefault() 등)
    - 집합의 기본 개념과 특징 (중복 없음, 순서 없음, 해시 가능 객체만)
    - 집합 연산 (교집합, 합집합, 차집합, 대칭차집합, 부분집합 관계)
    - 딕셔너리와 집합 컴프리헨션 (조건부, 변환 활용)
    - 실용적인 예제 3개 (단어 빈도 분석기, 학생 성적 관리 시스템, 재고 관리 시스템)
    - 연습 문제 4개 (전화번호부, 중복 단어 찾기, 투표 시스템, 친구 관계 분석)
  - Chapter 9 퀴즈 JSON 파일 생성 (28문제 - 기본부터 고급까지 포괄)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter09_dictionaries_sets.md` (새로 생성)
  - `quizzes/beginner/chapter09_dictionaries_sets.json` (새로 생성)

#### ✅ Chapter 8: 리스트와 튜플 완료
- **작업 내용**:
  - Chapter 8 마크다운 튜토리얼 작성 완료
    - 리스트의 기본 개념과 특징 (변경 가능, 순서 있음, 중복 허용)
    - 리스트 인덱싱과 슬라이싱 (양수/음수 인덱스, step 활용)
    - 리스트 메서드 총정리 (추가, 제거, 검색, 정렬 관련)
    - 튜플의 기본 개념과 특징 (변경 불가능, 빠른 접근 속도)
    - 리스트 vs 튜플 비교 및 사용 시나리오
    - 중첩 리스트와 튜플 (2차원 구조, 복합 데이터)
    - 고급 활용: 언패킹, 리스트 컴프리헨션, 얕은/깊은 복사
    - 실용적인 예제 3개 (성적 관리 시스템, 장바구니 시스템, 텍스트 분석기)
    - 연습 문제 4개 (통계 계산기, 행렬 연산기, 할일 관리자, 중복 제거기)
  - Chapter 8 퀴즈 JSON 파일 생성 (25문제 - 기본부터 고급까지 포괄)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter08_lists_tuples.md` (새로 생성)
  - `quizzes/beginner/chapter08_lists_tuples.json` (새로 생성)

#### ✅ Chapter 7: 반복문 완료
- **작업 내용**:
  - Chapter 7 마크다운 튜토리얼 작성 완료
    - 반복문의 기본 개념과 종류 (for문, while문)
    - range() 함수를 활용한 다양한 반복 패턴
    - 리스트, 문자열, 딕셔너리 등 다양한 객체 순회
    - break와 continue를 사용한 반복문 제어
    - 중첩 반복문을 활용한 2차원 데이터 처리와 패턴 생성
    - for문과 while문 선택 기준과 활용 패턴
    - 실용적인 예제 3개 (텍스트 분석기, 소수 찾기, 학생 성적 관리 시스템)
    - 고급 기법 (for-else, 리스트 컴프리헨션)
    - 연습 문제 4개 (피보나치, 다이아몬드 패턴, 계산기, 단어 빈도 분석)
  - Chapter 7 퀴즈 JSON 파일 생성 (22문제 - 객관식, 코딩, 실습, 분석 포함)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter07_loops.md` (새로 생성)
  - `quizzes/beginner/chapter07_loops.json` (새로 생성)

#### ✅ Chapter 6: 조건문 완료
- **작업 내용**:
  - Chapter 6 마크다운 튜토리얼 작성 완료
    - 조건문의 기본 개념과 구조 (if, elif, else)
    - 다양한 조건 표현식과 활용법
    - 중첩 조건문과 복잡한 로직 구현
    - 논리 연산자와 조건문의 결합 (and, or, not)
    - 조건문 활용 패턴 (범위 확인, 타입 확인, 유효성 검사)
    - 삼항 연산자 사용법과 주의사항
    - 실용적인 예제 3개 (숫자 맞추기 게임, ATM 시스템, 학점 계산기)
    - 연습 문제 3개 (윤년 판별기, 주차 요금 계산기, 쇼핑몰 할인 시스템)
  - Chapter 6 퀴즈 JSON 파일 생성 (20문제 - 객관식, 코딩, 실습, 분석 포함)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter06_conditional_statements.md` (새로 생성)
  - `quizzes/beginner/chapter06_conditional_statements.json` (새로 생성)
#### ✅ Chapter 5: 입력과 출력 완료
- **작업 내용**:
  - Chapter 5 마크다운 튜토리얼 작성 완료
    - print() 함수 활용법 (기본 출력, 여러 값 출력, sep/end 매개변수, 특수 문자)
    - input() 함수 사용법 (기본 입력, 타입 변환, 주의사항)
    - 출력 포맷팅 (f-string, format() 메서드, % 포맷팅, 문자열 연결)
    - 실용적인 예제 4개 (간단한 계산기, 사용자 정보 수집, 온도 변환기, 쇼핑 목록)
    - 팁과 주의사항 (사용자 친화적 프로그램, 입력 검증, 여러 줄 입력)
    - 연습 문제 3개 (개인 정보 카드, BMI 계산기, 영수증 만들기)
  - Chapter 5 퀴즈 JSON 파일 생성 (15문제 - 객관식, 코딩, 실습 포함)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter05_input_output.md` (새로 생성)
  - `quizzes/beginner/chapter05_input_output.json` (새로 생성)
#### ✅ Chapter 4: 연산자와 표현식 완료
- **작업 내용**:
  - Chapter 4 마크다운 튜토리얼 작성 완료
    - 산술 연산자 (기본 연산, 나눗셈 연산자 차이, 거듭제곱과 루트)
    - 비교 연산자 (기본 비교, 연쇄 비교, 특수 상황, 활용 예제)
    - 논리 연산자 (기본 개념, 단축 평가, 복합 논리 표현식, 드모르간 법칙)
    - 할당 연산자 (기본/복합 할당, 리스트 활용, 월리스 연산자, 활용 패턴)
    - 연산자 우선순위와 결합성 (우선순위 표, 헷갈리기 쉬운 예제, 결합성)
    - 비트 연산자 (기본 연산, 실용적 활용, 비트 마스크)
    - 실습 예제 3개 (계산기, 점수 등급 시스템, 시간 계산기)
    - 실습 과제 3개 (학점 계산기, 단위 변환기, 비트 플래그 권한 시스템)
  - Chapter 4 퀴즈 JSON 파일 생성 (25문제 + 실습 과제 5개)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter04_operators_expressions.md` (새로 생성)
  - `quizzes/beginner/chapter04_quiz.json` (새로 생성)

#### ✅ Chapter 3: 문자열 다루기 완료
- **작업 내용**:
  - Chapter 3 마크다운 튜토리얼 작성 완료
    - 문자열 인덱싱과 슬라이싱 (양수/음수 인덱스, step 활용)
    - 문자열 메서드 총정리 (대소문자, 공백처리, 검색, 분할/결합, 치환)
    - 문자열 포맷팅 (f-string, format(), % 포맷팅)
    - 이스케이프 문자와 Raw 문자열
    - 문자열 검증 메서드 (isdigit, isalpha, isalnum 등)
    - 실용적인 예제 (문자열 분석기, 텍스트 에디터 기능)
    - 실습 과제 3개 포함 (단어 게임, 이름 포맷터, 시저 암호)
  - Chapter 3 퀴즈 JSON 파일 생성 (22문제 + 실습 과제 4개)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter03_string_handling.md` (새로 생성)
  - `quizzes/beginner/chapter03_quiz.json` (새로 생성)

#### ✅ Chapter 2: 변수와 기본 데이터 타입 완료
- **작업 내용**:
  - Chapter 2 마크다운 튜토리얼 작성 완료
    - 변수의 개념과 할당 방법
    - Python 기본 데이터 타입 (int, float, str, bool)
    - 타입 확인과 변환 (type, isinstance, int, float, str)
    - 변수 명명 규칙과 PEP 8 스타일 가이드
    - 동적 타이핑의 개념과 장단점
    - 상수와 None 타입
    - 일반적인 오류와 해결법
    - 실습 예제 2개 및 과제 3개 포함
  - Chapter 2 퀴즈 JSON 파일 생성 (18문제 + 실습 과제 3개)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter02_variables_and_datatypes.md` (새로 생성)
  - `quizzes/beginner/chapter02_quiz.json` (새로 생성)

#### ✅ Chapter 1: Python 소개와 개발 환경 설정 완료
- **작업 내용**:
  - Jupyter 노트북에서 마크다운 형태로 튜토리얼 형식 변경
  - `.cursorrules` 및 `README.md` 파일 업데이트 (Markdown 기반으로 수정)
  - Chapter 1 마크다운 튜토리얼 작성 완료
    - Python 역사와 특징 설명
    - 설치 방법 및 환경 설정 가이드
    - 대화형 모드와 스크립트 실행 방법
    - 개발 환경 설정 (VS Code 권장)
    - 첫 번째 프로그램 작성 실습
    - 일반적인 오류와 해결법
    - 실습 과제 2개 포함
  - Chapter 1 퀴즈 JSON 파일 생성 (15문제 + 실습 과제 2개)

- **파일 생성/수정**:
  - `tutorials/beginner/chapter01_python_introduction.md` (새로 생성)
  - `quizzes/beginner/chapter01_quiz.json` (새로 생성)
  - `.cursorrules` (Jupyter → Markdown으로 수정)
  - `README.md` (설명 업데이트)

#### ✅ 프로젝트 초기 설정 완료
- **작업 내용**: 
  - 프로젝트 기본 구조 생성
  - Cursor Rules 작성 및 설정
  - 3단계 커리큘럼 설계 완료
  - README.md 작성
  - Git 저장소 초기화

- **완료된 커리큘럼**:
  - ✅ 초급 커리큘럼 (12 챕터)
  - ✅ 중급 커리큘럼 (14 챕터)  
  - ✅ 고급 커리큘럼 (15 챕터)

- **다음 단계**: 초급 Chapter 1부터 튜토리얼 작성 시작

---

## 📊 챕터별 완료 현황

### 🟢 초급 (Beginner) - 10/12 완료
- [x] Chapter 1: 파이썬 소개와 개발환경 설정 ✅ 2025-05-24 완료
- [x] Chapter 2: 변수와 기본 데이터 타입 ✅ 2025-05-24 완료
- [x] Chapter 3: 문자열 다루기 ✅ 2025-05-24 완료
- [x] Chapter 4: 연산자와 표현식 ✅ 2025-05-24 완료
- [x] Chapter 5: 입력과 출력 ✅ 2025-05-24 완료
- [x] Chapter 6: 조건문 (if문) ✅ 2025-05-24 완료
- [x] Chapter 7: 반복문 (for, while) ✅ 2025-05-24 완료
- [x] Chapter 8: 리스트와 튜플 ✅ 2025-05-24 완료
- [x] Chapter 9: 딕셔너리와 집합 ✅ 2025-05-24 완료
- [x] Chapter 10: 함수 기초 ✅ 2025-05-24 완료
- [ ] Chapter 11: 에러 처리와 디버깅
- [ ] Chapter 12: 파일 입출력

### 🟡 중급 (Intermediate) - 5/14 완료
- [x] Chapter 1: 고급 함수 기법 ✅ 2024-05-24 완료
- [x] Chapter 2: 파일 처리와 데이터 형식 ✅ 2025-05-24 완료
- [x] Chapter 3: 정규표현식 (Regular Expressions) ✅ 2025-05-24 완료
- [x] Chapter 4: 객체지향 프로그래밍 기초 ✅ 2025-05-24 완료
- [x] Chapter 5: 상속과 다형성 ✅ 2025-05-24 완료
- [ ] Chapter 5: 상속과 다형성
- [ ] Chapter 6: 특수 메서드 (Magic Methods)
- [ ] Chapter 7: 모듈과 패키지
- [ ] Chapter 8: 예외 처리 고급
- [ ] Chapter 9: 이터레이터와 제너레이터
- [ ] Chapter 10: 멀티스레딩과 비동기 처리 기초
- [ ] Chapter 11: 테스팅과 디버깅
- [ ] Chapter 12: 데이터베이스 연동
- [ ] Chapter 13: 웹 스크래핑과 API 활용
- [ ] Chapter 14: GUI 프로그래밍 기초

### 🔴 고급 (Advanced) - 0/15 완료
- [ ] Chapter 1: 파이썬 내부 구조와 메모리 관리
- [ ] Chapter 2: 메타클래스와 디스크립터
- [ ] Chapter 3: 고급 데코레이터와 컨텍스트 매니저
- [ ] Chapter 4: 동시성과 병렬성 심화
- [ ] Chapter 5: 네트워킹과 소켓 프로그래밍
- [ ] Chapter 6: 데이터베이스 고급 활용
- [ ] Chapter 7: 웹 프레임워크 심화 (Django/Flask)
- [ ] Chapter 8: 테스팅과 품질 보증
- [ ] Chapter 9: 성능 최적화와 프로파일링
- [ ] Chapter 10: 분산 시스템과 마이크로서비스
- [ ] Chapter 11: 데이터 사이언스와 머신러닝 엔지니어링
- [ ] Chapter 12: 보안과 암호화
- [ ] Chapter 13: 시스템 통합과 자동화
- [ ] Chapter 14: 패키지 개발과 배포
- [ ] Chapter 15: 아키텍처 패턴과 설계 원칙

---

## 🎯 목표 및 마일스톤

### Phase 1: 초급 과정 완성 (목표: 4주)
- [ ] 모든 초급 챕터 튜토리얼 작성
- [ ] 초급 챕터별 퀴즈 작성
- [ ] 초급 실습 프로젝트 가이드 작성

### Phase 2: 중급 과정 완성 (목표: 6주)
- [ ] 모든 중급 챕터 튜토리얼 작성
- [ ] 중급 챕터별 퀴즈 작성
- [ ] 중급 실습 프로젝트 가이드 작성

### Phase 3: 고급 과정 완성 (목표: 8주)
- [ ] 모든 고급 챕터 튜토리얼 작성
- [ ] 고급 챕터별 퀴즈 작성
- [ ] 고급 실습 프로젝트 가이드 작성

### Phase 4: 퀴즈 애플리케이션 개발
- [ ] 퀴즈 앱 설계
- [ ] 퀴즈 앱 개발
- [ ] 사용자 인터페이스 구현
- [ ] 테스트 및 배포

---

## 📌 작업 메모
- 각 챕터는 이론 설명 + 실습 코드 + 연습 문제로 구성
- 마크다운 형태로 상호작용 가능한 학습 환경 제공
- 실무 중심의 예제와 프로젝트 포함
- 단계별 난이도 조절과 연결성 유지 