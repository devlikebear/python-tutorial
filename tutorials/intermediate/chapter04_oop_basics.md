# Chapter 4: 객체지향 프로그래밍 기초 (Object-Oriented Programming Basics)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 객체지향 프로그래밍의 기본 개념 이해하기
- 클래스와 객체의 차이점 구분하기
- 속성(attribute)과 메서드(method) 정의하고 사용하기
- 생성자와 소멸자의 역할 이해하기
- 인스턴스/클래스 변수 구별하기
- 파이썬에서의 접근 제어 방법 이해하기
- 실용적인 클래스 설계와 구현하기

## 1. 객체지향 프로그래밍 개념

### 1.1 객체지향 프로그래밍이란?

객체지향 프로그래밍(OOP)은 현실 세계의 사물을 프로그래밍에서 객체로 모델링하는 패러다임입니다. 데이터와 그 데이터를 처리하는 함수들을 하나로 묶어서 관리합니다.

```python
print("=== 절차적 프로그래밍 vs 객체지향 프로그래밍 ===")

# 절차적 프로그래밍 방식
print("\n1. 절차적 프로그래밍 방식:")

# 학생 데이터를 딕셔너리로 관리
student1 = {"name": "홍길동", "age": 20, "grade": 85}
student2 = {"name": "김영희", "age": 19, "grade": 92}

def calculate_letter_grade(score):
    """점수를 문자 등급으로 변환"""
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

def print_student_info(student):
    """학생 정보 출력"""
    letter_grade = calculate_letter_grade(student["grade"])
    print(f"이름: {student['name']}, 나이: {student['age']}, 성적: {student['grade']} ({letter_grade})")

print_student_info(student1)
print_student_info(student2)

# 객체지향 프로그래밍 방식
print("\n2. 객체지향 프로그래밍 방식:")

class Student:
    """학생을 나타내는 클래스"""
    
    def __init__(self, name, age, grade):
        """생성자: 객체 초기화"""
        self.name = name
        self.age = age
        self.grade = grade
    
    def get_letter_grade(self):
        """점수를 문자 등급으로 변환하는 메서드"""
        if self.grade >= 90:
            return 'A'
        elif self.grade >= 80:
            return 'B'
        elif self.grade >= 70:
            return 'C'
        elif self.grade >= 60:
            return 'D'
        else:
            return 'F'
    
    def print_info(self):
        """학생 정보를 출력하는 메서드"""
        letter_grade = self.get_letter_grade()
        print(f"이름: {self.name}, 나이: {self.age}, 성적: {self.grade} ({letter_grade})")

# 객체 생성 및 사용
student3 = Student("홍길동", 20, 85)
student4 = Student("김영희", 19, 92)

student3.print_info()
student4.print_info()

print("\n=== 객체지향 프로그래밍의 장점 ===")
print("1. 캡슐화: 데이터와 기능이 하나로 묶임")
print("2. 재사용성: 클래스를 통해 여러 객체 생성 가능")
print("3. 유지보수성: 코드 구조가 명확하고 수정이 용이")
print("4. 확장성: 상속을 통해 기능 확장 가능")
```

### 1.2 클래스와 객체의 관계

```python
print("\n=== 클래스와 객체의 관계 ===")

# 클래스는 '설계도', 객체는 '실제 생성된 것'
class Car:
    """자동차 클래스 - 설계도 역할"""
    
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.mileage = 0
        self.is_running = False
    
    def start_engine(self):
        """엔진 시동"""
        if not self.is_running:
            self.is_running = True
            return f"{self.brand} {self.model} 엔진이 시동되었습니다."
        else:
            return "이미 엔진이 시동되어 있습니다."
    
    def stop_engine(self):
        """엔진 정지"""
        if self.is_running:
            self.is_running = False
            return f"{self.brand} {self.model} 엔진이 정지되었습니다."
        else:
            return "엔진이 이미 정지되어 있습니다."
    
    def drive(self, distance):
        """주행"""
        if self.is_running:
            self.mileage += distance
            return f"{distance}km 주행했습니다. 총 주행거리: {self.mileage}km"
        else:
            return "먼저 엔진을 시동하세요."
    
    def get_info(self):
        """차량 정보 반환"""
        status = "운행중" if self.is_running else "정지"
        return f"{self.year}년 {self.brand} {self.model} - 주행거리: {self.mileage}km, 상태: {status}"

# 같은 클래스로 여러 개의 서로 다른 객체 생성
print("클래스로부터 객체들 생성:")
car1 = Car("현대", "소나타", 2023)
car2 = Car("기아", "K5", 2022)
car3 = Car("BMW", "3시리즈", 2024)

print(f"car1: {car1.get_info()}")
print(f"car2: {car2.get_info()}")
print(f"car3: {car3.get_info()}")

print("\n각 객체는 독립적으로 동작:")
# car1 조작
print(f"car1: {car1.start_engine()}")
print(f"car1: {car1.drive(100)}")

# car2 조작
print(f"car2: {car2.start_engine()}")
print(f"car2: {car2.drive(50)}")

print("\n각 객체의 현재 상태:")
print(f"car1: {car1.get_info()}")
print(f"car2: {car2.get_info()}")
print(f"car3: {car3.get_info()}")  # car3는 건드리지 않음

# 객체의 정체성 확인
print(f"\ncar1과 car2는 같은 객체인가? {car1 is car2}")
print(f"car1의 타입: {type(car1)}")
print(f"car1이 Car 클래스의 인스턴스인가? {isinstance(car1, Car)}")
```

## 2. 클래스 정의와 기본 구조

### 2.1 클래스 정의 문법

```python
print("\n=== 클래스 정의와 기본 구조 ===")

class BankAccount:
    """은행 계좌 클래스"""
    
    # 클래스 변수 (모든 인스턴스가 공유)
    bank_name = "Python Bank"
    interest_rate = 0.03
    
    def __init__(self, account_number, owner_name, initial_balance=0):
        """
        생성자 메서드: 객체가 생성될 때 자동으로 호출
        
        Args:
            account_number (str): 계좌번호
            owner_name (str): 계좌주 이름
            initial_balance (float): 초기 잔액 (기본값: 0)
        """
        # 인스턴스 변수 (각 객체마다 고유)
        self.account_number = account_number
        self.owner_name = owner_name
        self.balance = initial_balance
        self.transaction_history = []
        
        # 거래 기록 추가
        if initial_balance > 0:
            self.transaction_history.append(f"계좌 개설: +{initial_balance:,}원")
    
    def deposit(self, amount):
        """입금 메서드"""
        if amount <= 0:
            return "입금액은 0원보다 커야 합니다."
        
        self.balance += amount
        self.transaction_history.append(f"입금: +{amount:,}원")
        return f"{amount:,}원이 입금되었습니다. 현재 잔액: {self.balance:,}원"
    
    def withdraw(self, amount):
        """출금 메서드"""
        if amount <= 0:
            return "출금액은 0원보다 커야 합니다."
        
        if amount > self.balance:
            return f"잔액이 부족합니다. 현재 잔액: {self.balance:,}원"
        
        self.balance -= amount
        self.transaction_history.append(f"출금: -{amount:,}원")
        return f"{amount:,}원이 출금되었습니다. 현재 잔액: {self.balance:,}원"
    
    def get_balance(self):
        """잔액 조회 메서드"""
        return f"현재 잔액: {self.balance:,}원"
    
    def get_info(self):
        """계좌 정보 조회 메서드"""
        return f"""
=== {self.bank_name} 계좌 정보 ===
계좌번호: {self.account_number}
계좌주: {self.owner_name}
현재 잔액: {self.balance:,}원
이자율: {self.interest_rate * 100}%
        """.strip()
    
    def get_transaction_history(self, limit=5):
        """거래 내역 조회 메서드"""
        if not self.transaction_history:
            return "거래 내역이 없습니다."
        
        recent_transactions = self.transaction_history[-limit:]
        history = f"=== {self.owner_name}님의 최근 거래 내역 ===\n"
        for i, transaction in enumerate(recent_transactions, 1):
            history += f"{i}. {transaction}\n"
        
        return history.strip()

# 클래스 사용 예제
print("은행 계좌 시스템 예제:")

# 계좌 생성
account1 = BankAccount("123-456-789", "홍길동", 100000)
account2 = BankAccount("987-654-321", "김영희")

print("=== 계좌 정보 ===")
print(account1.get_info())
print()
print(account2.get_info())

print("\n=== 거래 실행 ===")
# account1 거래
print(account1.deposit(50000))
print(account1.withdraw(30000))
print(account1.withdraw(200000))  # 잔액 부족

print()

# account2 거래
print(account2.deposit(75000))
print(account2.deposit(25000))
print(account2.withdraw(20000))

print("\n=== 거래 내역 ===")
print(account1.get_transaction_history())
print()
print(account2.get_transaction_history())
```

### 2.2 생성자와 소멸자

```python
print("\n=== 생성자와 소멸자 ===")

class FileManager:
    """파일 관리 클래스 - 생성자와 소멸자 예제"""
    
    # 클래스 변수로 생성된 객체 수 추적
    total_instances = 0
    
    def __init__(self, filename):
        """
        생성자: 객체 생성 시 호출
        - 인스턴스 변수 초기화
        - 필요한 설정 작업 수행
        """
        self.filename = filename
        self.is_open = False
        self.content = ""
        
        # 클래스 변수 증가
        FileManager.total_instances += 1
        self.instance_id = FileManager.total_instances
        
        print(f"[생성자] FileManager 인스턴스 #{self.instance_id} 생성됨 (파일: {filename})")
        
        # 파일 열기 시도
        try:
            self.open_file()
        except Exception as e:
            print(f"[경고] 파일 열기 실패: {e}")
    
    def __del__(self):
        """
        소멸자: 객체가 메모리에서 제거될 때 호출
        - 리소스 정리 작업 수행
        - 파일 닫기, 네트워크 연결 해제 등
        """
        if hasattr(self, 'instance_id'):  # 초기화가 완료된 경우만
            print(f"[소멸자] FileManager 인스턴스 #{self.instance_id} 소멸됨")
            if hasattr(self, 'is_open') and self.is_open:
                self.close_file()
    
    def open_file(self):
        """파일 열기"""
        if not self.is_open:
            # 실제로는 파일을 열지 않고 시뮬레이션
            self.is_open = True
            self.content = f"파일 '{self.filename}'의 내용입니다."
            print(f"[FileManager #{self.instance_id}] 파일 '{self.filename}' 열림")
        else:
            print(f"[FileManager #{self.instance_id}] 파일이 이미 열려있습니다.")
    
    def close_file(self):
        """파일 닫기"""
        if self.is_open:
            self.is_open = False
            print(f"[FileManager #{self.instance_id}] 파일 '{self.filename}' 닫힘")
        else:
            print(f"[FileManager #{self.instance_id}] 파일이 이미 닫혀있습니다.")
    
    def read_content(self):
        """파일 내용 읽기"""
        if self.is_open:
            return self.content
        else:
            return "파일이 열려있지 않습니다."
    
    @classmethod
    def get_total_instances(cls):
        """생성된 총 인스턴스 수 반환"""
        return cls.total_instances

# 생성자와 소멸자 동작 확인
print("1. 객체 생성과 사용:")
file1 = FileManager("document1.txt")
print(f"총 인스턴스 수: {FileManager.get_total_instances()}")

file2 = FileManager("document2.txt")
print(f"총 인스턴스 수: {FileManager.get_total_instances()}")

print(f"\n파일1 내용: {file1.read_content()}")
print(f"파일2 내용: {file2.read_content()}")

print("\n2. 명시적으로 객체 삭제:")
del file1  # 명시적 삭제

print("\n3. 함수 스코프에서 객체 생성:")
def create_temp_file():
    temp_file = FileManager("temp.txt")
    print(f"함수 내에서: {temp_file.read_content()}")
    # 함수 종료 시 temp_file 자동 삭제

create_temp_file()

print("\n4. 프로그램 종료 시 남은 객체들 자동 삭제:")
# file2는 프로그램 종료 시 자동으로 삭제됨
```

## 3. 속성과 메서드

### 3.1 인스턴스 변수와 클래스 변수

```python
print("\n=== 인스턴스 변수와 클래스 변수 ===")

class Employee:
    """직원 클래스 - 인스턴스 변수와 클래스 변수 구분"""
    
    # 클래스 변수: 모든 인스턴스가 공유
    company_name = "Python Corporation"
    employee_count = 0
    salary_raise_percentage = 1.05  # 5% 인상율
    
    def __init__(self, name, position, salary):
        """생성자: 인스턴스 변수 초기화"""
        # 인스턴스 변수: 각 객체마다 고유
        self.name = name
        self.position = position
        self.salary = salary
        self.employee_id = Employee.employee_count + 1
        
        # 클래스 변수 수정
        Employee.employee_count += 1
        
        print(f"새 직원 등록: {self.name} (ID: {self.employee_id})")
    
    def get_info(self):
        """직원 정보 반환"""
        return f"""
직원 정보:
- 이름: {self.name}
- 사번: {self.employee_id}
- 직책: {self.position}
- 급여: {self.salary:,}원
- 회사: {self.company_name}
        """.strip()
    
    def raise_salary(self):
        """급여 인상"""
        old_salary = self.salary
        self.salary = int(self.salary * self.salary_raise_percentage)
        increase = self.salary - old_salary
        return f"{self.name}님의 급여가 {increase:,}원 인상되었습니다. (기존: {old_salary:,}원 -> 현재: {self.salary:,}원)"
    
    @classmethod
    def get_company_info(cls):
        """클래스 메서드: 회사 정보 반환"""
        return f"회사명: {cls.company_name}, 총 직원 수: {cls.employee_count}명"
    
    @classmethod
    def set_company_name(cls, new_name):
        """클래스 메서드: 회사명 변경"""
        old_name = cls.company_name
        cls.company_name = new_name
        print(f"회사명이 '{old_name}'에서 '{new_name}'으로 변경되었습니다.")
    
    @classmethod
    def set_raise_percentage(cls, percentage):
        """클래스 메서드: 인상율 변경"""
        cls.salary_raise_percentage = 1 + (percentage / 100)
        print(f"급여 인상율이 {percentage}%로 설정되었습니다.")
    
    @staticmethod
    def calculate_annual_salary(monthly_salary):
        """정적 메서드: 연봉 계산 (클래스나 인스턴스와 무관한 유틸리티 함수)"""
        return monthly_salary * 12

# 인스턴스 변수와 클래스 변수 사용 예제
print("1. 직원 객체들 생성:")
emp1 = Employee("김철수", "개발자", 4000000)
emp2 = Employee("이영희", "디자이너", 3500000)
emp3 = Employee("박민수", "기획자", 3800000)

print(f"\n{Employee.get_company_info()}")

print("\n2. 각 직원의 정보:")
print(emp1.get_info())
print()
print(emp2.get_info())

print("\n3. 클래스 변수 vs 인스턴스 변수:")
print(f"emp1의 회사명 (인스턴스를 통한 접근): {emp1.company_name}")
print(f"Employee의 회사명 (클래스를 통한 접근): {Employee.company_name}")
print(f"emp1의 급여 (인스턴스 변수): {emp1.salary:,}원")

print("\n4. 클래스 변수 변경의 영향:")
Employee.set_company_name("Advanced Python Corp")
print(f"변경 후 emp1의 회사명: {emp1.company_name}")
print(f"변경 후 emp2의 회사명: {emp2.company_name}")

print("\n5. 급여 인상:")
Employee.set_raise_percentage(10)  # 10% 인상으로 변경
print(emp1.raise_salary())
print(emp2.raise_salary())

print("\n6. 정적 메서드 사용:")
monthly_salary = 4000000
annual_salary = Employee.calculate_annual_salary(monthly_salary)
print(f"월급 {monthly_salary:,}원의 연봉: {annual_salary:,}원")

print("\n7. 네임스페이스 확인:")
print(f"Employee 클래스의 네임스페이스: {Employee.__dict__.keys()}")
print(f"emp1 인스턴스의 네임스페이스: {emp1.__dict__.keys()}")
```

### 3.2 메서드의 종류

```python
print("\n=== 메서드의 종류 ===")

class MathUtility:
    """수학 유틸리티 클래스 - 다양한 메서드 타입 예제"""
    
    # 클래스 변수
    pi = 3.14159
    calculation_count = 0
    
    def __init__(self, name="Calculator"):
        """인스턴스 메서드 - 생성자"""
        self.name = name
        self.history = []
    
    def add_to_history(self, operation, result):
        """인스턴스 메서드 - 계산 기록 추가"""
        self.history.append(f"{operation} = {result}")
        MathUtility.calculation_count += 1
    
    def circle_area(self, radius):
        """인스턴스 메서드 - 원의 넓이 계산"""
        area = self.pi * radius ** 2
        operation = f"π × {radius}²"
        self.add_to_history(operation, f"{area:.2f}")
        return area
    
    def rectangle_area(self, width, height):
        """인스턴스 메서드 - 직사각형 넓이 계산"""
        area = width * height
        operation = f"{width} × {height}"
        self.add_to_history(operation, area)
        return area
    
    def get_history(self):
        """인스턴스 메서드 - 계산 기록 조회"""
        if not self.history:
            return f"{self.name}: 계산 기록이 없습니다."
        
        result = f"=== {self.name} 계산 기록 ===\n"
        for i, record in enumerate(self.history, 1):
            result += f"{i}. {record}\n"
        return result.strip()
    
    @classmethod
    def get_total_calculations(cls):
        """클래스 메서드 - 전체 계산 횟수 조회"""
        return f"전체 계산 횟수: {cls.calculation_count}회"
    
    @classmethod
    def create_scientific_calculator(cls):
        """클래스 메서드 - 팩토리 메서드 (특별한 인스턴스 생성)"""
        calculator = cls("Scientific Calculator")
        calculator.pi = 3.141592653589793  # 더 정확한 pi 값
        return calculator
    
    @classmethod
    def reset_calculation_count(cls):
        """클래스 메서드 - 계산 횟수 초기화"""
        cls.calculation_count = 0
        print("전체 계산 횟수가 초기화되었습니다.")
    
    @staticmethod
    def is_prime(n):
        """정적 메서드 - 소수 판별 (클래스와 독립적인 유틸리티 함수)"""
        if n < 2:
            return False
        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                return False
        return True
    
    @staticmethod
    def factorial(n):
        """정적 메서드 - 팩토리얼 계산"""
        if n < 0:
            raise ValueError("음수의 팩토리얼은 정의되지 않습니다.")
        if n == 0 or n == 1:
            return 1
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result
    
    @staticmethod
    def gcd(a, b):
        """정적 메서드 - 최대공약수 계산 (유클리드 호제법)"""
        while b:
            a, b = b, a % b
        return a

# 메서드 사용 예제
print("1. 일반 계산기 생성 및 사용:")
calc1 = MathUtility("일반 계산기")
calc2 = MathUtility("공학 계산기")

# 인스턴스 메서드 사용
area1 = calc1.circle_area(5)
area2 = calc1.rectangle_area(10, 20)
print(f"원의 넓이: {area1:.2f}")
print(f"직사각형 넓이: {area2}")

area3 = calc2.circle_area(3)
print(f"다른 계산기로 원의 넓이: {area3:.2f}")

print("\n2. 계산 기록 조회:")
print(calc1.get_history())
print()
print(calc2.get_history())

print("\n3. 클래스 메서드 사용:")
print(MathUtility.get_total_calculations())

# 팩토리 메서드로 특별한 인스턴스 생성
scientific_calc = MathUtility.create_scientific_calculator()
area4 = scientific_calc.circle_area(5)
print(f"과학 계산기로 원의 넓이 (더 정확한 π): {area4:.6f}")

print(f"\n{MathUtility.get_total_calculations()}")

print("\n4. 정적 메서드 사용 (클래스나 인스턴스 없이도 호출 가능):")
# 클래스를 통해 호출
print(f"17은 소수인가? {MathUtility.is_prime(17)}")
print(f"20은 소수인가? {MathUtility.is_prime(20)}")
print(f"5의 팩토리얼: {MathUtility.factorial(5)}")
print(f"48과 18의 최대공약수: {MathUtility.gcd(48, 18)}")

# 인스턴스를 통해서도 호출 가능 (권장하지 않음)
print(f"calc1을 통해 6의 팩토리얼: {calc1.factorial(6)}")

print("\n5. 메서드 타입 정리:")
print("- 인스턴스 메서드: self를 첫 번째 매개변수로 받음, 인스턴스 데이터 조작")
print("- 클래스 메서드: cls를 첫 번째 매개변수로 받음, 클래스 데이터 조작")
print("- 정적 메서드: 특별한 매개변수 없음, 독립적인 유틸리티 함수")
```

## 4. 접근 제어 (Access Control)

### 4.1 파이썬의 접근 제어 규칙

```python
print("\n=== 파이썬의 접근 제어 ===")

class BankAccount:
    """은행 계좌 클래스 - 접근 제어 예제"""
    
    def __init__(self, account_number, owner_name, initial_balance=0):
        # Public 속성 (외부에서 자유롭게 접근 가능)
        self.account_number = account_number
        self.owner_name = owner_name
        
        # Protected 속성 (내부 및 서브클래스에서만 사용 권장)
        self._balance = initial_balance
        self._transaction_fee = 500
        
        # Private 속성 (클래스 내부에서만 접근 가능)
        self.__pin = self._generate_pin()
        self.__is_locked = False
        
        print(f"계좌 생성 완료: {account_number} ({owner_name})")
    
    def _generate_pin(self):
        """Protected 메서드 - PIN 생성"""
        import random
        return f"{random.randint(1000, 9999)}"
    
    def __validate_pin(self, entered_pin):
        """Private 메서드 - PIN 검증"""
        return entered_pin == self.__pin
    
    def __lock_account(self):
        """Private 메서드 - 계좌 잠금"""
        self.__is_locked = True
        print("⚠️ 계좌가 잠겼습니다. 은행에 문의하세요.")
    
    def __unlock_account(self):
        """Private 메서드 - 계좌 잠금 해제"""
        self.__is_locked = False
        print("✅ 계좌 잠금이 해제되었습니다.")
    
    def deposit(self, amount):
        """Public 메서드 - 입금"""
        if self.__is_locked:
            return "❌ 계좌가 잠겨있습니다."
        
        if amount <= 0:
            return "❌ 입금액은 0원보다 커야 합니다."
        
        self._balance += amount
        self.transaction_history.append(f"입금: +{amount:,}원")
        return f"✅ {amount:,}원이 입금되었습니다. 현재 잔액: {self._balance:,}원"
    
    def withdraw(self, amount, pin):
        """Public 메서드 - 출금 (PIN 필요)"""
        if self.__is_locked:
            return "❌ 계좌가 잠겨있습니다."
        
        # PIN 검증
        if not self.__validate_pin(pin):
            self.__lock_account()
            return "❌ PIN이 틀렸습니다. 계좌가 잠겼습니다."
        
        if amount <= 0:
            return "❌ 출금액은 0원보다 커야 합니다."
        
        total_amount = amount + self._transaction_fee
        if total_amount > self._balance:
            return f"❌ 잔액이 부족합니다. (출금액: {amount:,}원 + 수수료: {self._transaction_fee:,}원)"
        
        self._balance -= total_amount
        self.transaction_history.append(f"출금: -{amount:,}원")
        return f"✅ {amount:,}원이 출금되었습니다. (수수료: {self._transaction_fee:,}원 차감) 잔액: {self._balance:,}원"
    
    def get_balance(self, pin):
        """Public 메서드 - 잔액 조회 (PIN 필요)"""
        if self.__is_locked:
            return "❌ 계좌가 잠겨있습니다."
        
        if not self.__validate_pin(pin):
            self.__lock_account()
            return "❌ PIN이 틀렸습니다. 계좌가 잠겼습니다."
        
        return f"💰 현재 잔액: {self._balance:,}원"
    
    def admin_unlock(self, admin_code="ADMIN2024"):
        """관리자용 계좌 잠금 해제"""
        if admin_code == "ADMIN2024":
            self.__unlock_account()
            return "✅ 관리자 권한으로 계좌 잠금이 해제되었습니다."
        else:
            return "❌ 관리자 코드가 틀렸습니다."
    
    def get_pin_hint(self):
        """PIN 힌트 제공 (테스트용)"""
        return f"💡 PIN 힌트: {self.__pin[:2]}**"
    
    def get_account_info(self):
        """계좌 정보 조회"""
        status = "🔒 잠김" if self.__is_locked else "🔓 정상"
        return f"""
=== 계좌 정보 ===
계좌번호: {self.account_number}
예금주: {self.owner_name}
상태: {status}
수수료: {self._transaction_fee:,}원
        """.strip()

# 접근 제어 테스트
print("1. 계좌 생성:")
account = BankAccount("123-456-789", "홍길동", 100000)

print("\n2. Public 속성/메서드 접근:")
print(f"계좌번호 (public): {account.account_number}")
print(f"예금주 (public): {account.owner_name}")
print(account.get_account_info())

print("\n3. Protected 속성 접근 (외부에서는 권장하지 않음):")
print(f"잔액 (protected): {account._balance:,}원")
print(f"수수료 (protected): {account._transaction_fee:,}원")

print("\n4. Private 속성 접근 시도:")
try:
    print(f"PIN (private): {account.__pin}")  # 에러 발생
except AttributeError as e:
    print(f"❌ Private 속성 접근 불가: {e}")

# 실제로는 name mangling으로 접근 가능하지만 권장하지 않음
print(f"Name mangling으로 접근 (권장하지 않음): {account._BankAccount__pin}")

print("\n5. 정상적인 거래:")
pin_hint = account.get_pin_hint()
print(f"PIN 힌트: {pin_hint}")

# 실제 PIN 사용 (테스트를 위해 private 속성에 접근)
correct_pin = account._BankAccount__pin
print(f"실제 PIN: {correct_pin}")

print(account.deposit(50000))
print(account.get_balance(correct_pin))
print(account.withdraw(30000, correct_pin))

print("\n6. 잘못된 PIN 사용:")
print(account.withdraw(10000, "0000"))  # 틀린 PIN
print(account.get_balance(correct_pin))  # 계좌가 잠김

print("\n7. 관리자 잠금 해제:")
print(account.admin_unlock())
print(account.get_balance(correct_pin))  # 이제 접근 가능
```

### 4.2 프로퍼티 (Property) 사용

```python
print("\n=== 프로퍼티 (Property) 사용 ===")

class Temperature:
    """온도 클래스 - 프로퍼티를 이용한 데이터 검증"""
    
    def __init__(self, celsius=0):
        """생성자"""
        self._celsius = 0  # private 변수
        self.celsius = celsius  # 프로퍼티를 통해 초기화
    
    @property
    def celsius(self):
        """섭씨 온도 getter"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """섭씨 온도 setter - 유효성 검증"""
        if not isinstance(value, (int, float)):
            raise TypeError("온도는 숫자여야 합니다.")
        
        if value < -273.15:
            raise ValueError("절대 영도보다 낮을 수 없습니다.")
        
        self._celsius = float(value)
    
    @property
    def fahrenheit(self):
        """화씨 온도 getter (계산된 프로퍼티)"""
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """화씨 온도 setter"""
        if not isinstance(value, (int, float)):
            raise TypeError("온도는 숫자여야 합니다.")
        
        celsius_value = (value - 32) * 5/9
        if celsius_value < -273.15:
            raise ValueError("절대 영도보다 낮을 수 없습니다.")
        
        self._celsius = celsius_value
    
    @property
    def kelvin(self):
        """켈빈 온도 getter (계산된 프로퍼티)"""
        return self._celsius + 273.15
    
    @kelvin.setter
    def kelvin(self, value):
        """켈빈 온도 setter"""
        if not isinstance(value, (int, float)):
            raise TypeError("온도는 숫자여야 합니다.")
        
        if value < 0:
            raise ValueError("켈빈 온도는 0보다 작을 수 없습니다.")
        
        self._celsius = value - 273.15
    
    @property
    def description(self):
        """온도 설명 getter (읽기 전용 프로퍼티)"""
        celsius = self._celsius
        
        if celsius < 0:
            return "빙점 이하"
        elif celsius == 0:
            return "빙점"
        elif celsius < 25:
            return "시원함"
        elif celsius < 35:
            return "따뜻함"
        else:
            return "더움"
    
    def __str__(self):
        """문자열 표현"""
        return f"{self._celsius:.1f}°C ({self.fahrenheit:.1f}°F, {self.kelvin:.1f}K) - {self.description}"

class Rectangle:
    """직사각형 클래스 - 프로퍼티를 이용한 계산된 속성"""
    
    def __init__(self, width=1, height=1):
        self._width = 0
        self._height = 0
        self.width = width    # 프로퍼티를 통해 설정
        self.height = height  # 프로퍼티를 통해 설정
    
    @property
    def width(self):
        """너비 getter"""
        return self._width
    
    @width.setter
    def width(self, value):
        """너비 setter - 양수만 허용"""
        if not isinstance(value, (int, float)):
            raise TypeError("너비는 숫자여야 합니다.")
        if value <= 0:
            raise ValueError("너비는 양수여야 합니다.")
        self._width = float(value)
    
    @property
    def height(self):
        """높이 getter"""
        return self._height
    
    @height.setter
    def height(self, value):
        """높이 setter - 양수만 허용"""
        if not isinstance(value, (int, float)):
            raise TypeError("높이는 숫자여야 합니다.")
        if value <= 0:
            raise ValueError("높이는 양수여야 합니다.")
        self._height = float(value)
    
    @property
    def area(self):
        """넓이 계산 (읽기 전용)"""
        return self._width * self._height
    
    @property
    def perimeter(self):
        """둘레 계산 (읽기 전용)"""
        return 2 * (self._width + self._height)
    
    @property
    def diagonal(self):
        """대각선 길이 계산 (읽기 전용)"""
        return (self._width ** 2 + self._height ** 2) ** 0.5
    
    @property
    def is_square(self):
        """정사각형 여부 (읽기 전용)"""
        return self._width == self._height
    
    def __str__(self):
        shape_type = "정사각형" if self.is_square else "직사각형"
        return f"{shape_type} ({self._width}×{self._height}) - 넓이: {self.area}, 둘레: {self.perimeter:.2f}"

# 프로퍼티 사용 예제
print("1. 온도 클래스 테스트:")
temp = Temperature(25)
print(f"초기 온도: {temp}")

print("\n2. 섭씨 온도 변경:")
temp.celsius = 0
print(f"빙점: {temp}")

temp.celsius = 100
print(f"끓는점: {temp}")

print("\n3. 화씨 온도로 설정:")
temp.fahrenheit = 68
print(f"화씨 68도: {temp}")

print("\n4. 켈빈 온도로 설정:")
temp.kelvin = 300
print(f"켈빈 300도: {temp}")

print("\n5. 잘못된 값 설정 시도:")
try:
    temp.celsius = -300  # 절대 영도보다 낮음
except ValueError as e:
    print(f"❌ 오류: {e}")

try:
    temp.celsius = "hot"  # 문자열
except TypeError as e:
    print(f"❌ 오류: {e}")

print("\n6. 직사각형 클래스 테스트:")
rect = Rectangle(10, 5)
print(f"초기 직사각형: {rect}")

print("\n7. 크기 변경:")
rect.width = 8
rect.height = 8
print(f"변경 후: {rect}")

print(f"넓이: {rect.area}")
print(f"둘레: {rect.perimeter}")
print(f"대각선: {rect.diagonal:.2f}")
print(f"정사각형인가? {rect.is_square}")

print("\n8. 잘못된 값 설정 시도:")
try:
    rect.width = -5  # 음수
except ValueError as e:
    print(f"❌ 오류: {e}")

try:
    rect.area = 100  # 읽기 전용 프로퍼티 변경 시도
except AttributeError as e:
    print(f"❌ 오류: {e}")

print("\n9. 프로퍼티의 장점:")
print("- 속성처럼 사용하면서도 메서드의 기능 제공")
print("- 데이터 검증과 계산을 투명하게 처리")
print("- 기존 코드를 변경하지 않고 내부 구현 변경 가능")
print("- 읽기 전용 속성 구현 가능")
```

## 5. 실용적인 클래스 설계

### 5.1 도서관 관리 시스템

```python
print("\n=== 실용적인 클래스 설계: 도서관 관리 시스템 ===")

from datetime import datetime, timedelta
from typing import List, Optional

class Book:
    """도서 클래스"""
    
    def __init__(self, isbn, title, author, publisher, year, copies=1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.publisher = publisher
        self.year = year
        self.total_copies = copies
        self.available_copies = copies
        self._borrowers = []  # 현재 대출자 목록
    
    def __str__(self):
        return f"《{self.title}》 - {self.author} ({self.year})"
    
    def __repr__(self):
        return f"Book('{self.isbn}', '{self.title}', '{self.author}')"
    
    def borrow(self, member_id):
        """도서 대출"""
        if self.available_copies > 0:
            self.available_copies -= 1
            self._borrowers.append(member_id)
            return True
        return False
    
    def return_book(self, member_id):
        """도서 반납"""
        if member_id in self._borrowers:
            self.available_copies += 1
            self._borrowers.remove(member_id)
            return True
        return False
    
    def is_available(self):
        """대출 가능 여부"""
        return self.available_copies > 0
    
    def get_availability_info(self):
        """대출 현황 정보"""
        return f"{self.available_copies}/{self.total_copies} 권 대출 가능"

class Member:
    """도서관 회원 클래스"""
    
    def __init__(self, member_id, name, email, phone):
        self.member_id = member_id
        self.name = name
        self.email = email
        self.phone = phone
        self.borrowed_books = []  # 현재 대출 중인 도서 목록
        self.borrowing_history = []  # 대출 이력
        self.join_date = datetime.now()
        self.is_active = True
    
    def __str__(self):
        return f"회원 {self.name} (ID: {self.member_id})"
    
    def __repr__(self):
        return f"Member('{self.member_id}', '{self.name}')"
    
    def get_borrowed_count(self):
        """현재 대출 중인 도서 수"""
        return len(self.borrowed_books)
    
    def can_borrow_more(self, max_books=5):
        """추가 대출 가능 여부"""
        return self.is_active and self.get_borrowed_count() < max_books
    
    def add_borrowed_book(self, book_info):
        """대출 도서 추가"""
        self.borrowed_books.append(book_info)
    
    def remove_borrowed_book(self, isbn):
        """반납 도서 제거"""
        self.borrowed_books = [book for book in self.borrowed_books if book['isbn'] != isbn]
    
    def get_member_info(self):
        """회원 정보 조회"""
        status = "활성" if self.is_active else "비활성"
        return f"""
=== 회원 정보 ===
이름: {self.name}
회원번호: {self.member_id}
이메일: {self.email}
전화번호: {self.phone}
가입일: {self.join_date.strftime('%Y-%m-%d')}
상태: {status}
현재 대출: {self.get_borrowed_count()}권
        """.strip()

class Library:
    """도서관 클래스"""
    
    def __init__(self, name="Python 도서관"):
        self.name = name
        self.books = {}  # ISBN을 키로 하는 도서 딕셔너리
        self.members = {}  # 회원번호를 키로 하는 회원 딕셔너리
        self.loan_period_days = 14  # 대출 기간 (일)
        self.max_books_per_member = 5  # 회원당 최대 대출 권수
        self.next_member_id = 1001
    
    def add_book(self, isbn, title, author, publisher, year, copies=1):
        """도서 추가"""
        if isbn in self.books:
            # 기존 도서의 사본 수 증가
            self.books[isbn].total_copies += copies
            self.books[isbn].available_copies += copies
            return f"도서 《{title}》의 사본 {copies}권이 추가되었습니다."
        else:
            # 새 도서 추가
            book = Book(isbn, title, author, publisher, year, copies)
            self.books[isbn] = book
            return f"새 도서 《{title}》이 추가되었습니다."
    
    def register_member(self, name, email, phone):
        """회원 등록"""
        member_id = f"M{self.next_member_id:04d}"
        member = Member(member_id, name, email, phone)
        self.members[member_id] = member
        self.next_member_id += 1
        return member_id, f"회원 {name}님이 등록되었습니다. (회원번호: {member_id})"
    
    def search_books(self, keyword):
        """도서 검색 (제목, 저자, 출판사에서 검색)"""
        results = []
        keyword_lower = keyword.lower()
        
        for book in self.books.values():
            if (keyword_lower in book.title.lower() or 
                keyword_lower in book.author.lower() or 
                keyword_lower in book.publisher.lower()):
                results.append(book)
        
        return results
    
    def borrow_book(self, member_id, isbn):
        """도서 대출"""
        # 회원 확인
        if member_id not in self.members:
            return False, "등록되지 않은 회원입니다."
        
        member = self.members[member_id]
        if not member.is_active:
            return False, "비활성 회원은 대출할 수 없습니다."
        
        # 대출 권수 확인
        if not member.can_borrow_more(self.max_books_per_member):
            return False, f"최대 대출 권수({self.max_books_per_member}권)를 초과했습니다."
        
        # 도서 확인
        if isbn not in self.books:
            return False, "존재하지 않는 도서입니다."
        
        book = self.books[isbn]
        if not book.is_available():
            return False, "현재 대출 가능한 사본이 없습니다."
        
        # 대출 처리
        if book.borrow(member_id):
            due_date = datetime.now() + timedelta(days=self.loan_period_days)
            
            # 회원의 대출 목록에 추가
            loan_info = {
                'isbn': isbn,
                'title': book.title,
                'author': book.author,
                'borrow_date': datetime.now(),
                'due_date': due_date
            }
            member.add_borrowed_book(loan_info)
            member.borrowing_history.append(loan_info.copy())
            
            return True, f"《{book.title}》을 대출했습니다. 반납일: {due_date.strftime('%Y-%m-%d')}"
        
        return False, "대출 처리 중 오류가 발생했습니다."
    
    def return_book(self, member_id, isbn):
        """도서 반납"""
        # 회원 확인
        if member_id not in self.members:
            return False, "등록되지 않은 회원입니다."
        
        member = self.members[member_id]
        
        # 도서 확인
        if isbn not in self.books:
            return False, "존재하지 않는 도서입니다."
        
        book = self.books[isbn]
        
        # 대출 기록 확인
        borrowed_book = None
        for book_info in member.borrowed_books:
            if book_info['isbn'] == isbn:
                borrowed_book = book_info
                break
        
        if not borrowed_book:
            return False, "해당 도서를 대출하지 않았습니다."
        
        # 반납 처리
        if book.return_book(member_id):
            member.remove_borrowed_book(isbn)
            
            # 연체 확인
            days_overdue = (datetime.now() - borrowed_book['due_date']).days
            if days_overdue > 0:
                return True, f"《{book.title}》을 반납했습니다. (연체: {days_overdue}일)"
            else:
                return True, f"《{book.title}》을 반납했습니다."
        
        return False, "반납 처리 중 오류가 발생했습니다."
    
    def get_member_borrowed_books(self, member_id):
        """회원의 대출 현황 조회"""
        if member_id not in self.members:
            return None
        
        member = self.members[member_id]
        if not member.borrowed_books:
            return f"{member.name}님은 현재 대출 중인 도서가 없습니다."
        
        result = f"=== {member.name}님의 대출 현황 ===\n"
        for i, book_info in enumerate(member.borrowed_books, 1):
            due_date = book_info['due_date']
            days_until_due = (due_date - datetime.now()).days
            
            if days_until_due < 0:
                status = f"연체 {abs(days_until_due)}일"
            elif days_until_due == 0:
                status = "오늘 반납"
            else:
                status = f"{days_until_due}일 남음"
            
            result += f"{i}. 《{book_info['title']}》 - {book_info['author']}\n"
            result += f"   대출일: {book_info['borrow_date'].strftime('%Y-%m-%d')}\n"
            result += f"   반납일: {due_date.strftime('%Y-%m-%d')} ({status})\n"
        
        return result.strip()
    
    def get_library_stats(self):
        """도서관 통계"""
        total_books = sum(book.total_copies for book in self.books.values())
        available_books = sum(book.available_copies for book in self.books.values())
        borrowed_books = total_books - available_books
        
        active_members = sum(1 for member in self.members.values() if member.is_active)
        
        return f"""
=== {self.name} 통계 ===
등록 도서: {len(self.books)}종 {total_books}권
대출 가능: {available_books}권
대출 중: {borrowed_books}권
등록 회원: {len(self.members)}명 (활성: {active_members}명)
        """.strip()

# 도서관 시스템 사용 예제
print("1. 도서관 시스템 초기화:")
library = Library("중앙 도서관")

print("\n2. 도서 추가:")
print(library.add_book("978-89-123-4567", "파이썬 프로그래밍", "김파이", "프로그램 출판사", 2023, 3))
print(library.add_book("978-89-123-4568", "데이터 구조와 알고리즘", "이알고", "컴퓨터 출판사", 2022, 2))
print(library.add_book("978-89-123-4569", "웹 개발 입문", "박웹", "웹 출판사", 2023, 2))

print("\n3. 회원 등록:")
member1_id, msg1 = library.register_member("홍길동", "hong@email.com", "010-1234-5678")
print(msg1)
member2_id, msg2 = library.register_member("김영희", "kim@email.com", "010-2345-6789")
print(msg2)

print("\n4. 도서 검색:")
search_results = library.search_books("파이썬")
print(f"'파이썬' 검색 결과: {len(search_results)}권")
for book in search_results:
    print(f"  - {book} [{book.get_availability_info()}]")

print("\n5. 도서 대출:")
success, message = library.borrow_book(member1_id, "978-89-123-4567")
print(f"대출 결과: {message}")

success, message = library.borrow_book(member2_id, "978-89-123-4567")
print(f"대출 결과: {message}")

success, message = library.borrow_book(member1_id, "978-89-123-4568")
print(f"대출 결과: {message}")

print("\n6. 대출 현황 조회:")
borrowed_info = library.get_member_borrowed_books(member1_id)
print(borrowed_info)

print("\n7. 도서관 통계:")
print(library.get_library_stats())

print("\n8. 도서 반납:")
success, message = library.return_book(member1_id, "978-89-123-4567")
print(f"반납 결과: {message}")

print("\n9. 반납 후 통계:")
print(library.get_library_stats())
```

## 6. 연습 문제

### 연습 1: 게임 캐릭터 클래스
RPG 게임의 캐릭터를 나타내는 클래스를 설계하세요. 체력, 마나, 레벨, 경험치 등의 속성과 공격, 방어, 레벨업 등의 메서드를 포함해야 합니다.

### 연습 2: 온라인 쇼핑몰 시스템
상품, 장바구니, 주문 클래스를 설계하여 간단한 온라인 쇼핑몰 시스템을 구현하세요.

### 연습 3: 학생 성적 관리 시스템
학생, 과목, 성적 클래스를 설계하여 학교의 성적 관리 시스템을 구현하세요.

### 연습 4: 은행 계좌 시스템 확장
이 챕터에서 만든 은행 계좌 시스템을 확장하여 정기예금, 대출 등의 기능을 추가하세요.

## 정리

이 챕터에서 학습한 내용:

1. **객체지향 개념**: 클래스와 객체의 관계, OOP의 장점
2. **클래스 정의**: 기본 문법, 생성자와 소멸자
3. **속성과 메서드**: 인스턴스/클래스 변수, 다양한 메서드 타입
4. **접근 제어**: public, protected, private 개념과 프로퍼티
5. **실용적 설계**: 실제 도메인을 잘 모델링하는 방법

다음 챕터에서는 상속과 다형성을 학습하여 더욱 강력하고 유연한 객체지향 프로그램을 작성하는 방법을 배우겠습니다.

### 핵심 포인트
- 클래스는 데이터와 기능을 함께 묶어서 관리하는 설계도입니다
- 객체는 클래스로부터 생성된 실제 인스턴스입니다
- 캡슐화를 통해 데이터를 보호하고 인터페이스를 명확히 할 수 있습니다
- 프로퍼티를 사용하면 데이터 검증과 계산을 투명하게 처리할 수 있습니다
- 실용적인 클래스 설계 시 실제 도메인을 잘 모델링하는 것이 중요합니다 