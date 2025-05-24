# Chapter 11: 테스팅과 디버깅

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- unittest 모듈을 활용한 체계적인 테스트 작성하기
- pytest를 사용한 더 편리하고 강력한 테스트 구현하기
- 다양한 테스팅 기법 (단위 테스트, 통합 테스트, 모킹) 활용하기
- 효과적인 디버깅 전략과 도구들 사용하기
- 테스트 주도 개발(TDD)의 개념과 실무 적용하기
- 코드 커버리지 측정과 품질 향상 기법 이해하기
- 지속적 통합과 자동화된 테스팅 환경 구축하기

## 1. 테스팅의 기본 개념

### 1.1 테스팅의 중요성과 종류

```python
print("=== 테스팅의 기본 개념 ===")

def demonstrate_testing_importance():
    """테스팅의 중요성 설명"""
    
    print("1. 테스팅이 필요한 이유:")
    print("  - 버그 조기 발견과 수정")
    print("  - 코드 품질 향상")
    print("  - 리팩토링 시 안전성 보장")
    print("  - 문서화 역할 (테스트가 스펙)")
    print("  - 협업 시 코드 신뢰성 확보")
    print()
    
    print("2. 테스트의 종류:")
    print("  단위 테스트(Unit Test): 개별 함수/메서드 테스트")
    print("  통합 테스트(Integration Test): 모듈 간 상호작용 테스트")
    print("  시스템 테스트(System Test): 전체 시스템 테스트")
    print("  인수 테스트(Acceptance Test): 사용자 요구사항 충족 테스트")
    print()
    
    print("3. 테스트 피라미드:")
    print("  ▲ 인수 테스트 (적음, 느림, 높은 수준)")
    print("  ■ 통합 테스트 (중간)")
    print("  ■■■ 단위 테스트 (많음, 빠름, 낮은 수준)")

demonstrate_testing_importance()

# 테스트할 예시 함수들
def calculate_area(length, width):
    """직사각형 넓이 계산"""
    if length <= 0 or width <= 0:
        raise ValueError("길이와 너비는 양수여야 합니다")
    return length * width

def is_prime(n):
    """소수 판별"""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

def validate_email(email):
    """간단한 이메일 검증"""
    if '@' not in email:
        return False
    parts = email.split('@')
    if len(parts) != 2:
        return False
    
    local, domain = parts
    if not local or not domain:
        return False
    if '.' not in domain:
        return False
    
    return True

class BankAccount:
    """테스트용 은행 계좌 클래스"""
    
    def __init__(self, initial_balance=0):
        if initial_balance < 0:
            raise ValueError("초기 잔액은 음수일 수 없습니다")
        self._balance = initial_balance
        self._transaction_history = []
    
    @property
    def balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("입금액은 양수여야 합니다")
        self._balance += amount
        self._transaction_history.append(f"입금: {amount}")
        return self._balance
    
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("출금액은 양수여야 합니다")
        if amount > self._balance:
            raise ValueError("잔액이 부족합니다")
        self._balance -= amount
        self._transaction_history.append(f"출금: {amount}")
        return self._balance
    
    def get_transaction_history(self):
        return self._transaction_history.copy()

print(f"\n4. 테스트 대상 함수들:")
print(f"  calculate_area(5, 3): {calculate_area(5, 3)}")
print(f"  is_prime(17): {is_prime(17)}")
print(f"  validate_email('test@example.com'): {validate_email('test@example.com')}")

account = BankAccount(1000)
account.deposit(500)
print(f"  BankAccount 잔액: {account.balance}")
```

### 1.2 테스트 작성 원칙과 모범 사례

```python
print("\n=== 테스트 작성 원칙 ===")

def demonstrate_testing_principles():
    """테스트 작성 원칙 설명"""
    
    print("5. 좋은 테스트의 특징 (FIRST 원칙):")
    print("  Fast: 빠르게 실행")
    print("  Independent: 독립적 (테스트 간 의존성 없음)")
    print("  Repeatable: 반복 가능 (환경에 관계없이 동일한 결과)")
    print("  Self-Validating: 자체 검증 (명확한 통과/실패)")
    print("  Timely: 적시성 (코드와 함께 작성)")
    print()
    
    print("6. AAA 패턴 (Arrange-Act-Assert):")
    print("  Arrange: 테스트 데이터와 환경 준비")
    print("  Act: 테스트할 동작 실행")
    print("  Assert: 결과 검증")
    print()
    
    print("7. 테스트 명명 규칙:")
    print("  test_함수명_조건_예상결과() 형태")
    print("  예: test_calculate_area_positive_numbers_returns_product()")
    print()
    
    print("8. 테스트 케이스 설계:")
    print("  정상 케이스: 일반적인 입력값")
    print("  경계 케이스: 최소/최대값, 빈 값")
    print("  예외 케이스: 잘못된 입력, 에러 상황")

demonstrate_testing_principles()

# 테스트 케이스 설계 예제
def demonstrate_test_case_design():
    """테스트 케이스 설계 예제"""
    
    print(f"\n9. calculate_area 함수 테스트 케이스 설계:")
    
    # 정상 케이스
    test_cases_normal = [
        (5, 3, 15),      # 일반적인 양수
        (10, 10, 100),   # 정사각형
        (0.5, 2, 1.0),   # 소수점
        (1, 1, 1),       # 최소 양수
    ]
    
    print("  정상 케이스:")
    for length, width, expected in test_cases_normal:
        result = calculate_area(length, width)
        status = "✓" if result == expected else "✗"
        print(f"    {status} calculate_area({length}, {width}) = {result} (예상: {expected})")
    
    # 예외 케이스
    print("  예외 케이스:")
    exception_cases = [
        (0, 5, "길이가 0"),
        (-1, 5, "음수 길이"),
        (5, -1, "음수 너비"),
        (0, 0, "둘 다 0"),
    ]
    
    for length, width, description in exception_cases:
        try:
            result = calculate_area(length, width)
            print(f"    ✗ {description}: 예외가 발생해야 하는데 {result} 반환")
        except ValueError as e:
            print(f"    ✓ {description}: 올바른 예외 발생 ({e})")

demonstrate_test_case_design()
```

## 2. unittest 모듈 활용

### 2.1 기본 unittest 사용법

```python
print("\n=== unittest 모듈 기본 사용법 ===")

import unittest
from io import StringIO
import sys

class TestCalculateArea(unittest.TestCase):
    """calculate_area 함수 테스트 클래스"""
    
    def setUp(self):
        """각 테스트 메서드 실행 전 호출"""
        print("    setUp: 테스트 준비")
        self.test_data = [
            (5, 3, 15),
            (10, 10, 100),
            (0.5, 2, 1.0),
            (1, 1, 1),
        ]
    
    def tearDown(self):
        """각 테스트 메서드 실행 후 호출"""
        print("    tearDown: 테스트 정리")
    
    def test_positive_numbers(self):
        """양수 입력 테스트"""
        for length, width, expected in self.test_data:
            with self.subTest(length=length, width=width):
                result = calculate_area(length, width)
                self.assertEqual(result, expected)
                print(f"      ✓ {length} × {width} = {result}")
    
    def test_zero_length_raises_error(self):
        """길이가 0일 때 예외 발생 테스트"""
        with self.assertRaises(ValueError) as context:
            calculate_area(0, 5)
        
        self.assertIn("양수여야 합니다", str(context.exception))
        print(f"      ✓ 길이 0 예외: {context.exception}")
    
    def test_negative_values_raise_error(self):
        """음수 입력 시 예외 발생 테스트"""
        test_cases = [(-1, 5), (5, -1), (-1, -1)]
        
        for length, width in test_cases:
            with self.subTest(length=length, width=width):
                with self.assertRaises(ValueError):
                    calculate_area(length, width)
                print(f"      ✓ 음수 입력 예외: ({length}, {width})")

class TestIsPrime(unittest.TestCase):
    """is_prime 함수 테스트 클래스"""
    
    def test_prime_numbers(self):
        """소수 판별 테스트"""
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
        for num in primes:
            with self.subTest(num=num):
                self.assertTrue(is_prime(num))
                print(f"      ✓ {num}은 소수")
    
    def test_non_prime_numbers(self):
        """합성수 판별 테스트"""
        non_primes = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20]
        for num in non_primes:
            with self.subTest(num=num):
                self.assertFalse(is_prime(num))
                print(f"      ✓ {num}은 합성수")
    
    def test_edge_cases(self):
        """경계 케이스 테스트"""
        edge_cases = [
            (0, False, "0은 소수가 아님"),
            (1, False, "1은 소수가 아님"),
            (2, True, "2는 소수"),
        ]
        
        for num, expected, description in edge_cases:
            with self.subTest(num=num):
                self.assertEqual(is_prime(num), expected)
                print(f"      ✓ {description}")

def run_unittest_example():
    """unittest 실행 예제"""
    
    print("10. unittest 실행:")
    
    # 테스트 스위트 생성
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # 테스트 클래스 추가
    suite.addTests(loader.loadTestsFromTestCase(TestCalculateArea))
    suite.addTests(loader.loadTestsFromTestCase(TestIsPrime))
    
    # 테스트 실행
    output = StringIO()
    runner = unittest.TextTestRunner(stream=output, verbosity=2)
    result = runner.run(suite)
    
    print(f"  실행된 테스트: {result.testsRun}개")
    print(f"  실패: {len(result.failures)}개")
    print(f"  에러: {len(result.errors)}개")
    print(f"  성공률: {((result.testsRun - len(result.failures) - len(result.errors)) / result.testsRun * 100):.1f}%")

run_unittest_example()
```

### 2.2 고급 unittest 기법

```python
print("\n=== 고급 unittest 기법 ===")

import unittest
from unittest.mock import Mock, patch, MagicMock
import tempfile
import os

class TestBankAccount(unittest.TestCase):
    """BankAccount 클래스 고급 테스트"""
    
    def setUp(self):
        """테스트 준비"""
        self.account = BankAccount(1000)
    
    def test_initial_balance(self):
        """초기 잔액 테스트"""
        account = BankAccount(500)
        self.assertEqual(account.balance, 500)
        print("      ✓ 초기 잔액 설정")
    
    def test_deposit_increases_balance(self):
        """입금 시 잔액 증가 테스트"""
        initial_balance = self.account.balance
        deposit_amount = 200
        
        result = self.account.deposit(deposit_amount)
        
        self.assertEqual(result, initial_balance + deposit_amount)
        self.assertEqual(self.account.balance, initial_balance + deposit_amount)
        print(f"      ✓ 입금 후 잔액: {self.account.balance}")
    
    def test_withdraw_decreases_balance(self):
        """출금 시 잔액 감소 테스트"""
        initial_balance = self.account.balance
        withdraw_amount = 200
        
        result = self.account.withdraw(withdraw_amount)
        
        self.assertEqual(result, initial_balance - withdraw_amount)
        self.assertEqual(self.account.balance, initial_balance - withdraw_amount)
        print(f"      ✓ 출금 후 잔액: {self.account.balance}")
    
    def test_withdraw_insufficient_funds(self):
        """잔액 부족 시 출금 실패 테스트"""
        with self.assertRaises(ValueError) as context:
            self.account.withdraw(2000)  # 잔액보다 많이 출금
        
        self.assertIn("잔액이 부족", str(context.exception))
        print(f"      ✓ 잔액 부족 예외: {context.exception}")
    
    def test_transaction_history(self):
        """거래 내역 테스트"""
        self.account.deposit(500)
        self.account.withdraw(200)
        
        history = self.account.get_transaction_history()
        
        self.assertEqual(len(history), 2)
        self.assertIn("입금: 500", history[0])
        self.assertIn("출금: 200", history[1])
        print(f"      ✓ 거래 내역: {history}")
    
    def test_multiple_operations(self):
        """복합 연산 테스트"""
        operations = [
            ('deposit', 500),
            ('withdraw', 200),
            ('deposit', 100),
            ('withdraw', 50),
        ]
        
        expected_balance = 1000  # 초기 잔액
        for operation, amount in operations:
            if operation == 'deposit':
                self.account.deposit(amount)
                expected_balance += amount
            else:
                self.account.withdraw(amount)
                expected_balance -= amount
        
        self.assertEqual(self.account.balance, expected_balance)
        print(f"      ✓ 복합 연산 후 잔액: {self.account.balance}")

class TestWithMocking(unittest.TestCase):
    """모킹을 활용한 테스트"""
    
    def test_file_operations_with_mock(self):
        """파일 연산 모킹 테스트"""
        
        def read_config_file(filename):
            """설정 파일 읽기 함수 (모킹 대상)"""
            with open(filename, 'r') as f:
                return f.read()
        
        # 파일 읽기 모킹
        mock_content = "key=value\nname=test"
        
        with patch('builtins.open', unittest.mock.mock_open(read_data=mock_content)):
            result = read_config_file('config.txt')
            self.assertEqual(result, mock_content)
            print("      ✓ 파일 읽기 모킹 성공")
    
    @patch('requests.get')
    def test_api_call_with_mock(self, mock_get):
        """API 호출 모킹 테스트"""
        
        def fetch_user_data(user_id):
            """사용자 데이터 가져오기 (외부 API 호출)"""
            import requests
            response = requests.get(f'https://api.example.com/users/{user_id}')
            return response.json()
        
        # Mock 응답 설정
        mock_response = Mock()
        mock_response.json.return_value = {'id': 1, 'name': 'John Doe'}
        mock_get.return_value = mock_response
        
        # 테스트 실행
        result = fetch_user_data(1)
        
        # 검증
        self.assertEqual(result['name'], 'John Doe')
        mock_get.assert_called_once_with('https://api.example.com/users/1')
        print(f"      ✓ API 모킹 결과: {result}")

def run_advanced_unittest():
    """고급 unittest 실행"""
    
    print("11. 고급 unittest 실행:")
    
    # 개별 테스트 클래스 실행
    test_classes = [TestBankAccount, TestWithMocking]
    
    for test_class in test_classes:
        print(f"\n  {test_class.__name__} 실행:")
        suite = unittest.TestLoader().loadTestsFromTestCase(test_class)
        runner = unittest.TextTestRunner(stream=StringIO(), verbosity=0)
        result = runner.run(suite)
        
        print(f"    테스트 수: {result.testsRun}")
        print(f"    성공률: {((result.testsRun - len(result.failures) - len(result.errors)) / result.testsRun * 100):.1f}%")

run_advanced_unittest()
```

## 3. pytest 프레임워크

### 3.1 pytest 기본 사용법

```python
print("\n=== pytest 기본 사용법 ===")

# pytest는 외부 라이브러리이므로 시뮬레이션으로 설명
def demonstrate_pytest_features():
    """pytest 특징과 장점 설명"""
    
    print("12. pytest의 장점:")
    print("  - 간단한 assert 문 사용")
    print("  - 자동 테스트 발견")
    print("  - 풍부한 플러그인 생태계")
    print("  - 매개변수화된 테스트")
    print("  - 픽스처(Fixture) 시스템")
    print("  - 더 읽기 쉬운 출력")
    print()
    
    print("13. pytest 스타일 테스트 예제:")

demonstrate_pytest_features()

# pytest 스타일 테스트 함수들 (실제로는 pytest로 실행)
def test_calculate_area_positive():
    """pytest 스타일: 양수 테스트"""
    result = calculate_area(5, 3)
    assert result == 15
    print("      pytest: calculate_area(5, 3) == 15")

def test_calculate_area_zero_raises_exception():
    """pytest 스타일: 예외 테스트"""
    try:
        calculate_area(0, 5)
        assert False, "예외가 발생해야 함"
    except ValueError:
        assert True
        print("      pytest: 0 입력 시 ValueError 발생")

def test_is_prime_with_various_numbers():
    """pytest 스타일: 다양한 입력 테스트"""
    test_cases = [
        (2, True),
        (3, True),
        (4, False),
        (17, True),
        (18, False),
    ]
    
    for number, expected in test_cases:
        result = is_prime(number)
        assert result == expected
        print(f"      pytest: is_prime({number}) == {expected}")

# pytest 스타일 클래스 테스트
class TestBankAccountPytest:
    """pytest 스타일 BankAccount 테스트"""
    
    def setup_method(self):
        """각 테스트 메서드 전에 실행"""
        self.account = BankAccount(1000)
        print("      pytest setup: 계좌 생성")
    
    def test_deposit(self):
        """입금 테스트"""
        result = self.account.deposit(500)
        assert result == 1500
        assert self.account.balance == 1500
        print("      pytest: 입금 테스트 통과")
    
    def test_withdraw_sufficient_funds(self):
        """충분한 잔액 출금 테스트"""
        result = self.account.withdraw(300)
        assert result == 700
        assert self.account.balance == 700
        print("      pytest: 출금 테스트 통과")

def run_pytest_style_tests():
    """pytest 스타일 테스트 실행 시뮬레이션"""
    
    print("14. pytest 스타일 테스트 실행:")
    
    # 함수 테스트 실행
    try:
        test_calculate_area_positive()
        test_calculate_area_zero_raises_exception()
        test_is_prime_with_various_numbers()
        print("  ✓ 함수 테스트 모두 통과")
    except Exception as e:
        print(f"  ✗ 함수 테스트 실패: {e}")
    
    # 클래스 테스트 실행
    try:
        test_instance = TestBankAccountPytest()
        test_instance.setup_method()
        test_instance.test_deposit()
        
        test_instance.setup_method()
        test_instance.test_withdraw_sufficient_funds()
        print("  ✓ 클래스 테스트 모두 통과")
    except Exception as e:
        print(f"  ✗ 클래스 테스트 실패: {e}")

run_pytest_style_tests()
```

### 3.2 pytest 고급 기능

```python
print("\n=== pytest 고급 기능 ===")

# 매개변수화된 테스트 시뮬레이션
def simulate_parametrized_test():
    """매개변수화된 테스트 시뮬레이션"""
    
    print("15. 매개변수화된 테스트:")
    
    # pytest.mark.parametrize와 유사한 효과
    test_data = [
        (2, True, "2는 소수"),
        (3, True, "3은 소수"),
        (4, False, "4는 합성수"),
        (17, True, "17은 소수"),
        (18, False, "18은 합성수"),
        (97, True, "97은 소수"),
        (100, False, "100은 합성수"),
    ]
    
    print("  @pytest.mark.parametrize 시뮬레이션:")
    for number, expected, description in test_data:
        result = is_prime(number)
        status = "✓" if result == expected else "✗"
        print(f"    {status} {description}: is_prime({number}) = {result}")

simulate_parametrized_test()

# 픽스처 시뮬레이션
class PytestFixtureSimulation:
    """pytest 픽스처 시뮬레이션"""
    
    def __init__(self):
        self.fixtures = {}
    
    def fixture(self, name, factory):
        """픽스처 등록"""
        self.fixtures[name] = factory
    
    def get_fixture(self, name):
        """픽스처 가져오기"""
        return self.fixtures[name]()

def simulate_fixtures():
    """pytest 픽스처 시뮬레이션"""
    
    print(f"\n16. pytest 픽스처 시뮬레이션:")
    
    fixture_manager = PytestFixtureSimulation()
    
    # 픽스처 정의
    def sample_account():
        """계좌 픽스처"""
        account = BankAccount(1000)
        account.deposit(500)
        return account
    
    def sample_data():
        """테스트 데이터 픽스처"""
        return {
            'users': ['Alice', 'Bob', 'Charlie'],
            'numbers': [1, 2, 3, 4, 5],
            'config': {'debug': True, 'timeout': 30}
        }
    
    # 픽스처 등록
    fixture_manager.fixture('account', sample_account)
    fixture_manager.fixture('test_data', sample_data)
    
    # 픽스처 사용 테스트
    print("  픽스처 기반 테스트:")
    
    # 계좌 픽스처 사용
    account = fixture_manager.get_fixture('account')
    print(f"    계좌 픽스처 잔액: {account.balance}")
    
    # 데이터 픽스처 사용
    data = fixture_manager.get_fixture('test_data')
    print(f"    데이터 픽스처 사용자 수: {len(data['users'])}")
    
    # 픽스처를 활용한 테스트
    account.withdraw(200)
    assert account.balance == 1300
    print("    ✓ 픽스처 기반 출금 테스트 통과")

simulate_fixtures()

def demonstrate_pytest_plugins():
    """pytest 플러그인 기능 설명"""
    
    print(f"\n17. pytest 주요 플러그인:")
    
    plugins = {
        'pytest-cov': '코드 커버리지 측정',
        'pytest-mock': '개선된 모킹 기능',
        'pytest-xdist': '병렬 테스트 실행',
        'pytest-html': 'HTML 테스트 리포트',
        'pytest-bdd': 'BDD 스타일 테스트',
        'pytest-django': 'Django 테스트 지원',
        'pytest-asyncio': '비동기 테스트 지원',
    }
    
    for plugin, description in plugins.items():
        print(f"  {plugin}: {description}")
    
    print(f"\n  사용 예시:")
    print(f"    pip install pytest pytest-cov pytest-mock")
    print(f"    pytest --cov=mypackage tests/")
    print(f"    pytest -n 4  # 4개 프로세스로 병렬 실행")

demonstrate_pytest_plugins()
```

## 4. 디버깅 기법과 도구

### 4.1 기본 디버깅 기법

```python
print("\n=== 기본 디버깅 기법 ===")

import logging
import traceback
import pdb

# 디버깅용 예제 함수들
def buggy_function(numbers):
    """버그가 있는 함수 (디버깅 예제용)"""
    total = 0
    for i, num in enumerate(numbers):
        if i == 0:
            continue  # 첫 번째 요소 건너뛰기 (의도적 버그)
        total += num / (i - 1)  # ZeroDivisionError 가능성
    return total

def process_user_data(users):
    """사용자 데이터 처리 (디버깅 예제용)"""
    processed = []
    for user in users:
        # 키 에러 가능성
        full_name = f"{user['first_name']} {user['last_name']}"
        age = user.get('age', 0)
        
        if age >= 18:
            processed.append({
                'name': full_name,
                'status': 'adult',
                'category': determine_category(age)
            })
    return processed

def determine_category(age):
    """나이별 카테고리 결정"""
    if age < 18:
        return 'minor'
    elif age < 30:
        return 'young_adult'
    elif age < 60:
        return 'adult'
    else:
        return 'senior'

def demonstrate_print_debugging():
    """print 디버깅 기법"""
    
    print("18. print를 활용한 디버깅:")
    
    def debug_buggy_function(numbers):
        """디버그 버전의 buggy_function"""
        print(f"  디버그: 입력 numbers = {numbers}")
        total = 0
        
        for i, num in enumerate(numbers):
            print(f"  디버그: 인덱스 {i}, 값 {num}")
            
            if i == 0:
                print(f"  디버그: 첫 번째 요소 건너뛰기")
                continue
            
            divisor = i - 1
            print(f"  디버그: {num} / {divisor}")
            
            if divisor == 0:
                print(f"  디버그: 0으로 나누기 감지! 수정 필요")
                continue  # 버그 수정
            
            result = num / divisor
            total += result
            print(f"  디버그: 중간 합계 = {total}")
        
        print(f"  디버그: 최종 결과 = {total}")
        return total
    
    # 테스트 실행
    test_numbers = [10, 20, 30, 40]
    try:
        result = debug_buggy_function(test_numbers)
        print(f"  결과: {result}")
    except Exception as e:
        print(f"  에러: {e}")

demonstrate_print_debugging()

def demonstrate_logging_debugging():
    """로깅을 활용한 디버깅"""
    
    print(f"\n19. logging을 활용한 디버깅:")
    
    # 로거 설정
    logger = logging.getLogger('debug_logger')
    logger.setLevel(logging.DEBUG)
    
    # 콘솔 핸들러 설정
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%H:%M:%S'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    def debug_process_user_data(users):
        """로깅 버전의 process_user_data"""
        logger.info(f"사용자 데이터 처리 시작: {len(users)}명")
        processed = []
        
        for i, user in enumerate(users):
            logger.debug(f"사용자 {i+1} 처리 중: {user}")
            
            try:
                # 필수 필드 검증
                if 'first_name' not in user or 'last_name' not in user:
                    logger.warning(f"사용자 {i+1}: 이름 필드 누락")
                    continue
                
                full_name = f"{user['first_name']} {user['last_name']}"
                age = user.get('age', 0)
                
                logger.debug(f"처리된 이름: {full_name}, 나이: {age}")
                
                if age >= 18:
                    category = determine_category(age)
                    user_data = {
                        'name': full_name,
                        'status': 'adult',
                        'category': category
                    }
                    processed.append(user_data)
                    logger.info(f"성인 사용자 추가: {full_name} ({category})")
                else:
                    logger.info(f"미성년자 제외: {full_name}")
                    
            except Exception as e:
                logger.error(f"사용자 {i+1} 처리 중 오류: {e}")
                logger.debug(f"오류 상세:", exc_info=True)
        
        logger.info(f"처리 완료: {len(processed)}명 처리됨")
        return processed
    
    # 테스트 데이터
    test_users = [
        {'first_name': 'John', 'last_name': 'Doe', 'age': 25},
        {'first_name': 'Jane', 'last_name': 'Smith', 'age': 17},
        {'first_name': 'Bob', 'last_name': 'Wilson', 'age': 35},
        {'first_name': 'Alice'},  # last_name 누락
        {'last_name': 'Brown', 'age': 45},  # first_name 누락
    ]
    
    result = debug_process_user_data(test_users)
    print(f"  처리된 사용자 수: {len(result)}")

demonstrate_logging_debugging()

def demonstrate_assertion_debugging():
    """assert를 활용한 디버깅"""
    
    print(f"\n20. assert를 활용한 디버깅:")
    
    def safe_divide(a, b, debug=True):
        """안전한 나눗셈 (assertion 포함)"""
        if debug:
            assert isinstance(a, (int, float)), f"a는 숫자여야 함: {type(a)}"
            assert isinstance(b, (int, float)), f"b는 숫자여야 함: {type(b)}"
            assert b != 0, f"0으로 나눌 수 없음: b = {b}"
        
        result = a / b
        
        if debug:
            assert result == a / b, "계산 결과 검증 실패"
        
        return result
    
    # 테스트
    test_cases = [
        (10, 2, "정상 케이스"),
        (15, 3, "정상 케이스 2"),
        # (10, 0, "0으로 나누기"),  # 주석 처리 (에러 방지)
        # ("10", 2, "문자열 입력"),  # 주석 처리 (에러 방지)
    ]
    
    for a, b, description in test_cases:
        try:
            result = safe_divide(a, b)
            print(f"  ✓ {description}: {a} / {b} = {result}")
        except AssertionError as e:
            print(f"  ✗ {description}: 검증 실패 - {e}")
        except Exception as e:
            print(f"  ✗ {description}: 오류 - {e}")

demonstrate_assertion_debugging()
```

### 4.2 고급 디버깅 도구

```python
print("\n=== 고급 디버깅 도구 ===")

import sys
import traceback
import cProfile
import time

def demonstrate_traceback_debugging():
    """traceback을 활용한 디버깅"""
    
    print("21. traceback을 활용한 오류 추적:")
    
    def level1():
        level2()
    
    def level2():
        level3()
    
    def level3():
        # 의도적 오류 발생
        raise ValueError("의도적 오류")
    
    try:
        level1()
    except Exception:
        print("  스택 추적 정보:")
        tb_str = traceback.format_exc()
        print("    " + tb_str.replace('\n', '\n    '))
        
        print("  스택 프레임 분석:")
        tb = sys.exc_info()[2]
        while tb:
            frame = tb.tb_frame
            print(f"    파일: {frame.f_code.co_filename}")
            print(f"    함수: {frame.f_code.co_name}")
            print(f"    라인: {tb.tb_lineno}")
            print()
            tb = tb.tb_next

demonstrate_traceback_debugging()

def demonstrate_profiling():
    """프로파일링을 활용한 성능 디버깅"""
    
    print("22. 성능 프로파일링:")
    
    def slow_function():
        """느린 함수 (최적화 대상)"""
        result = []
        for i in range(10000):
            # 비효율적인 문자열 연결
            temp = ""
            for j in range(100):
                temp += str(j)
            result.append(temp)
        return result
    
    def optimized_function():
        """최적화된 함수"""
        result = []
        for i in range(10000):
            # 효율적인 문자열 연결
            temp = ''.join(str(j) for j in range(100))
            result.append(temp)
        return result
    
    # 실행 시간 측정
    print("  실행 시간 비교:")
    
    start_time = time.time()
    slow_result = slow_function()
    slow_time = time.time() - start_time
    print(f"    느린 함수: {slow_time:.4f}초")
    
    start_time = time.time()
    optimized_result = optimized_function()
    optimized_time = time.time() - start_time
    print(f"    최적화된 함수: {optimized_time:.4f}초")
    
    if slow_time > 0:
        improvement = slow_time / optimized_time
        print(f"    성능 향상: {improvement:.2f}배")

demonstrate_profiling()

class DebugContext:
    """디버깅 컨텍스트 매니저"""
    
    def __init__(self, name, debug=True):
        self.name = name
        self.debug = debug
        self.start_time = None
    
    def __enter__(self):
        if self.debug:
            self.start_time = time.time()
            print(f"  디버그: {self.name} 시작")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.debug:
            end_time = time.time()
            duration = end_time - self.start_time
            
            if exc_type:
                print(f"  디버그: {self.name} 실패 ({duration:.4f}초)")
                print(f"  디버그: 예외 타입: {exc_type.__name__}")
                print(f"  디버그: 예외 메시지: {exc_val}")
            else:
                print(f"  디버그: {self.name} 완료 ({duration:.4f}초)")

def demonstrate_debug_context():
    """디버깅 컨텍스트 매니저 사용"""
    
    print(f"\n23. 디버깅 컨텍스트 매니저:")
    
    with DebugContext("데이터 처리"):
        # 정상 처리
        data = [i for i in range(1000)]
        result = sum(data)
        print(f"    처리 결과: {result}")
    
    try:
        with DebugContext("오류 발생 작업"):
            # 의도적 오류
            raise RuntimeError("테스트 오류")
    except RuntimeError:
        pass  # 오류 무시 (데모용)

demonstrate_debug_context()

def demonstrate_debugging_best_practices():
    """디버깅 모범 사례"""
    
    print(f"\n24. 디버깅 모범 사례:")
    
    practices = [
        "작은 단위로 테스트하기",
        "로그 레벨을 적절히 사용하기 (DEBUG, INFO, WARNING, ERROR)",
        "재현 가능한 테스트 케이스 만들기",
        "코드 리뷰를 통한 사전 버그 방지",
        "자동화된 테스트로 회귀 버그 방지",
        "에러 메시지를 명확하고 도움이 되도록 작성",
        "디버깅 정보는 프로덕션에서 제거하기",
        "버그 수정 후 테스트 케이스 추가하기"
    ]
    
    for i, practice in enumerate(practices, 1):
        print(f"  {i}. {practice}")

demonstrate_debugging_best_practices()
```

## 5. 테스트 주도 개발 (TDD)

### 5.1 TDD 기본 개념과 사이클

```python
print("\n=== 테스트 주도 개발 (TDD) ===")

def demonstrate_tdd_concept():
    """TDD 개념 설명"""
    
    print("25. TDD (Test-Driven Development) 개념:")
    print("  Red-Green-Refactor 사이클:")
    print("    🔴 Red: 실패하는 테스트 작성")
    print("    🟢 Green: 테스트를 통과하는 최소한의 코드 작성")
    print("    🔵 Refactor: 코드 개선 (기능은 유지)")
    print()
    
    print("26. TDD의 장점:")
    print("  - 요구사항을 명확히 이해")
    print("  - 버그 조기 발견")
    print("  - 리팩토링 안전성")
    print("  - 코드 품질 향상")
    print("  - 문서화 효과")

demonstrate_tdd_concept()

# TDD 예제: 간단한 계산기 클래스 개발
class CalculatorTDD:
    """TDD로 개발하는 계산기 클래스"""
    
    def __init__(self):
        self.result = 0
        self.history = []
    
    def add(self, value):
        """덧셈"""
        old_result = self.result
        self.result += value
        self.history.append(f"{old_result} + {value} = {self.result}")
        return self.result
    
    def subtract(self, value):
        """뺄셈"""
        old_result = self.result
        self.result -= value
        self.history.append(f"{old_result} - {value} = {self.result}")
        return self.result
    
    def multiply(self, value):
        """곱셈"""
        old_result = self.result
        self.result *= value
        self.history.append(f"{old_result} × {value} = {self.result}")
        return self.result
    
    def divide(self, value):
        """나눗셈"""
        if value == 0:
            raise ValueError("0으로 나눌 수 없습니다")
        
        old_result = self.result
        self.result /= value
        self.history.append(f"{old_result} ÷ {value} = {self.result}")
        return self.result
    
    def clear(self):
        """초기화"""
        self.result = 0
        self.history.clear()
    
    def get_history(self):
        """계산 이력 반환"""
        return self.history.copy()

def demonstrate_tdd_cycle():
    """TDD 사이클 시연"""
    
    print(f"\n27. TDD 사이클 시연 (계산기 개발):")
    
    # Step 1: Red - 실패하는 테스트 작성
    print("  🔴 Red Phase: 테스트 작성")
    
    def test_calculator_initial_state():
        """초기 상태 테스트"""
        calc = CalculatorTDD()
        assert calc.result == 0
        print("    ✓ 초기 결과값 0 테스트")
    
    def test_calculator_add():
        """덧셈 테스트"""
        calc = CalculatorTDD()
        result = calc.add(5)
        assert result == 5
        assert calc.result == 5
        print("    ✓ 덧셈 테스트 (0 + 5 = 5)")
    
    def test_calculator_chain_operations():
        """연속 연산 테스트"""
        calc = CalculatorTDD()
        calc.add(10)
        calc.subtract(3)
        calc.multiply(2)
        assert calc.result == 14  # (0 + 10 - 3) * 2 = 14
        print("    ✓ 연속 연산 테스트")
    
    def test_calculator_divide_by_zero():
        """0으로 나누기 예외 테스트"""
        calc = CalculatorTDD()
        calc.add(10)
        try:
            calc.divide(0)
            assert False, "예외가 발생해야 함"
        except ValueError:
            assert True
            print("    ✓ 0으로 나누기 예외 테스트")
    
    def test_calculator_history():
        """계산 이력 테스트"""
        calc = CalculatorTDD()
        calc.add(5)
        calc.multiply(3)
        
        history = calc.get_history()
        assert len(history) == 2
        assert "0 + 5 = 5" in history[0]
        assert "5 × 3 = 15" in history[1]
        print("    ✓ 계산 이력 테스트")
    
    # Step 2: Green - 테스트 통과하는 코드 작성 (이미 구현됨)
    print("  🟢 Green Phase: 테스트 통과 확인")
    
    tests = [
        test_calculator_initial_state,
        test_calculator_add,
        test_calculator_chain_operations,
        test_calculator_divide_by_zero,
        test_calculator_history,
    ]
    
    passed_tests = 0
    for test in tests:
        try:
            test()
            passed_tests += 1
        except Exception as e:
            print(f"    ✗ 테스트 실패: {test.__name__} - {e}")
    
    print(f"    통과한 테스트: {passed_tests}/{len(tests)}")
    
    # Step 3: Refactor - 코드 개선
    print("  🔵 Refactor Phase: 코드 개선 가능한 부분")
    print("    - 연산 메서드의 중복 코드 제거")
    print("    - 이력 저장 로직 분리")
    print("    - 더 명확한 에러 메시지")
    print("    - 타입 힌트 추가")

demonstrate_tdd_cycle()

# TDD로 개발한 개선된 버전
class ImprovedCalculatorTDD:
    """TDD로 개발한 개선된 계산기"""
    
    def __init__(self):
        self.result = 0.0
        self.history = []
    
    def _record_operation(self, old_value, operator, operand, new_value):
        """연산 기록"""
        self.history.append(f"{old_value} {operator} {operand} = {new_value}")
    
    def _perform_operation(self, value, operation, operator_symbol):
        """공통 연산 수행"""
        old_result = self.result
        self.result = operation(self.result, value)
        self._record_operation(old_result, operator_symbol, value, self.result)
        return self.result
    
    def add(self, value: float) -> float:
        """덧셈"""
        return self._perform_operation(value, lambda x, y: x + y, "+")
    
    def subtract(self, value: float) -> float:
        """뺄셈"""
        return self._perform_operation(value, lambda x, y: x - y, "-")
    
    def multiply(self, value: float) -> float:
        """곱셈"""
        return self._perform_operation(value, lambda x, y: x * y, "×")
    
    def divide(self, value: float) -> float:
        """나눗셈"""
        if value == 0:
            raise ValueError("0으로 나눌 수 없습니다")
        return self._perform_operation(value, lambda x, y: x / y, "÷")

def test_improved_calculator():
    """개선된 계산기 테스트"""
    
    print(f"\n28. 리팩토링된 계산기 테스트:")
    
    calc = ImprovedCalculatorTDD()
    
    # 복합 연산 테스트
    calc.add(100)
    calc.subtract(25)
    calc.multiply(2)
    calc.divide(5)
    
    expected_result = ((100 - 25) * 2) / 5  # 30
    
    print(f"  최종 결과: {calc.result}")
    print(f"  예상 결과: {expected_result}")
    print(f"  정확성: {'✓' if abs(calc.result - expected_result) < 0.001 else '✗'}")
    
    print(f"  계산 이력:")
    for i, operation in enumerate(calc.history, 1):
        print(f"    {i}. {operation}")

test_improved_calculator()
```

### 5.2 TDD 실습 예제

```python
print("\n=== TDD 실습 예제 ===")

# TDD로 개발할 클래스: WordCounter
# 요구사항: 텍스트에서 단어 빈도를 계산하는 클래스

def demonstrate_tdd_word_counter():
    """TDD로 WordCounter 개발"""
    
    print("29. TDD 실습: WordCounter 개발")
    print("  요구사항:")
    print("    - 텍스트에서 단어 빈도 계산")
    print("    - 대소문자 구분 없음")
    print("    - 구두점 제거")
    print("    - 가장 빈도 높은 단어 반환")
    print("    - 단어 길이별 통계")
    print()

# 1단계: 테스트 작성 (Red)
def test_word_counter_creation():
    """WordCounter 생성 테스트"""
    counter = WordCounter()
    assert hasattr(counter, 'count_words')
    print("    ✓ WordCounter 생성 테스트")

def test_word_counter_simple_text():
    """간단한 텍스트 처리 테스트"""
    counter = WordCounter()
    text = "hello world hello"
    result = counter.count_words(text)
    
    expected = {'hello': 2, 'world': 1}
    assert result == expected
    print("    ✓ 간단한 텍스트 처리 테스트")

def test_word_counter_case_insensitive():
    """대소문자 구분 없음 테스트"""
    counter = WordCounter()
    text = "Hello HELLO hello"
    result = counter.count_words(text)
    
    expected = {'hello': 3}
    assert result == expected
    print("    ✓ 대소문자 구분 없음 테스트")

def test_word_counter_punctuation():
    """구두점 제거 테스트"""
    counter = WordCounter()
    text = "Hello, world! How are you?"
    result = counter.count_words(text)
    
    expected = {'hello': 1, 'world': 1, 'how': 1, 'are': 1, 'you': 1}
    assert result == expected
    print("    ✓ 구두점 제거 테스트")

# 2단계: 구현 (Green)
import re
from collections import Counter

class WordCounter:
    """단어 빈도 계산 클래스"""
    
    def __init__(self):
        self.word_counts = {}
        self.total_words = 0
    
    def count_words(self, text):
        """텍스트에서 단어 빈도 계산"""
        if not text:
            return {}
        
        # 텍스트 정리: 소문자 변환, 구두점 제거
        cleaned_text = re.sub(r'[^\w\s]', ' ', text.lower())
        
        # 단어 분리
        words = cleaned_text.split()
        
        # 빈 단어 제거
        words = [word for word in words if word]
        
        # 빈도 계산
        self.word_counts = dict(Counter(words))
        self.total_words = len(words)
        
        return self.word_counts
    
    def get_most_common(self, n=1):
        """가장 빈도 높은 단어 반환"""
        if not self.word_counts:
            return []
        
        return Counter(self.word_counts).most_common(n)
    
    def get_word_length_stats(self):
        """단어 길이별 통계"""
        if not self.word_counts:
            return {}
        
        length_counts = {}
        for word, count in self.word_counts.items():
            length = len(word)
            length_counts[length] = length_counts.get(length, 0) + count
        
        return length_counts
    
    def get_total_words(self):
        """총 단어 수 반환"""
        return self.total_words
    
    def get_unique_words(self):
        """고유 단어 수 반환"""
        return len(self.word_counts)

# 추가 테스트들
def test_word_counter_most_common():
    """가장 빈도 높은 단어 테스트"""
    counter = WordCounter()
    text = "apple banana apple cherry apple banana"
    counter.count_words(text)
    
    most_common = counter.get_most_common(2)
    assert most_common[0] == ('apple', 3)
    assert most_common[1] == ('banana', 2)
    print("    ✓ 가장 빈도 높은 단어 테스트")

def test_word_counter_length_stats():
    """단어 길이별 통계 테스트"""
    counter = WordCounter()
    text = "a bb ccc dddd"
    counter.count_words(text)
    
    length_stats = counter.get_word_length_stats()
    expected = {1: 1, 2: 1, 3: 1, 4: 1}
    assert length_stats == expected
    print("    ✓ 단어 길이별 통계 테스트")

def run_word_counter_tests():
    """WordCounter 테스트 실행"""
    
    print("  🔴 Red → 🟢 Green Phase: 테스트 실행")
    
    tests = [
        test_word_counter_creation,
        test_word_counter_simple_text,
        test_word_counter_case_insensitive,
        test_word_counter_punctuation,
        test_word_counter_most_common,
        test_word_counter_length_stats,
    ]
    
    passed = 0
    for test in tests:
        try:
            test()
            passed += 1
        except Exception as e:
            print(f"    ✗ {test.__name__} 실패: {e}")
    
    print(f"  통과한 테스트: {passed}/{len(tests)}")
    
    # 실제 사용 예제
    print(f"\n  WordCounter 사용 예제:")
    counter = WordCounter()
    sample_text = """
    Python is a great programming language. 
    Python is easy to learn and Python is powerful.
    Many developers love Python programming.
    """
    
    result = counter.count_words(sample_text)
    print(f"    단어 빈도: {dict(list(result.items())[:5])}...")
    print(f"    총 단어 수: {counter.get_total_words()}")
    print(f"    고유 단어 수: {counter.get_unique_words()}")
    print(f"    가장 빈도 높은 단어: {counter.get_most_common(3)}")

run_word_counter_tests()

demonstrate_tdd_word_counter()
```

## 6. 코드 커버리지와 품질 측정

### 6.1 코드 커버리지 개념

```python
print("\n=== 코드 커버리지와 품질 측정 ===")

def demonstrate_coverage_concept():
    """코드 커버리지 개념 설명"""
    
    print("30. 코드 커버리지 유형:")
    print("  Line Coverage: 실행된 코드 라인 비율")
    print("  Branch Coverage: 실행된 분기 비율")
    print("  Function Coverage: 호출된 함수 비율")
    print("  Statement Coverage: 실행된 문장 비율")
    print()
    
    print("31. 커버리지 목표:")
    print("  - 단위 테스트: 80-90% 이상")
    print("  - 통합 테스트: 70-80% 이상")
    print("  - 전체 프로젝트: 75-85% 이상")
    print("  - 100% 커버리지가 완벽한 테스트를 의미하지는 않음")

demonstrate_coverage_concept()

# 커버리지 측정 예제 함수
def complex_function(x, y, option='default'):
    """복잡한 함수 (커버리지 측정용)"""
    result = 0
    
    # 분기 1: x 값 검사
    if x > 0:
        result += x * 2
    elif x < 0:
        result += x * -1
    else:
        result = 1
    
    # 분기 2: y 값 검사
    if y > 10:
        result *= 2
    
    # 분기 3: 옵션 처리
    if option == 'double':
        result *= 2
    elif option == 'square':
        result = result ** 2
    elif option == 'negative':
        result = -result
    # default는 그대로
    
    # 분기 4: 결과값 후처리
    if result > 100:
        return min(result, 1000)
    elif result < -100:
        return max(result, -1000)
    else:
        return result

class CoverageTracker:
    """간단한 커버리지 추적기"""
    
    def __init__(self):
        self.executed_lines = set()
        self.total_lines = set()
        self.executed_branches = set()
        self.total_branches = set()
    
    def record_line(self, line_num):
        """라인 실행 기록"""
        self.executed_lines.add(line_num)
        self.total_lines.add(line_num)
    
    def record_branch(self, branch_id, taken=True):
        """분기 실행 기록"""
        self.total_branches.add(branch_id)
        if taken:
            self.executed_branches.add(branch_id)
    
    def get_line_coverage(self):
        """라인 커버리지 계산"""
        if not self.total_lines:
            return 0.0
        return len(self.executed_lines) / len(self.total_lines) * 100
    
    def get_branch_coverage(self):
        """분기 커버리지 계산"""
        if not self.total_branches:
            return 0.0
        return len(self.executed_branches) / len(self.total_branches) * 100

def demonstrate_coverage_tracking():
    """커버리지 추적 시연"""
    
    print(f"\n32. 커버리지 추적 시연:")
    
    tracker = CoverageTracker()
    
    def tracked_complex_function(x, y, option='default'):
        """커버리지 추적이 포함된 complex_function"""
        tracker.record_line(1)  # 함수 시작
        result = 0
        
        # 분기 1: x 값 검사
        tracker.record_line(2)
        if x > 0:
            tracker.record_branch('x_positive', True)
            tracker.record_line(3)
            result += x * 2
        elif x < 0:
            tracker.record_branch('x_negative', x < 0)
            if x < 0:
                tracker.record_line(4)
                result += x * -1
        else:
            tracker.record_branch('x_zero', x == 0)
            if x == 0:
                tracker.record_line(5)
                result = 1
        
        # 분기 2: y 값 검사
        tracker.record_line(6)
        tracker.record_branch('y_greater_10', y > 10)
        if y > 10:
            tracker.record_line(7)
            result *= 2
        
        # 분기 3: 옵션 처리
        tracker.record_line(8)
        if option == 'double':
            tracker.record_branch('option_double', True)
            tracker.record_line(9)
            result *= 2
        elif option == 'square':
            tracker.record_branch('option_square', option == 'square')
            tracker.record_line(10)
            result = result ** 2
        elif option == 'negative':
            tracker.record_branch('option_negative', option == 'negative')
            tracker.record_line(11)
            result = -result
        
        # 분기 4: 결과값 후처리
        tracker.record_line(12)
        if result > 100:
            tracker.record_branch('result_high', result > 100)
            tracker.record_line(13)
            return min(result, 1000)
        elif result < -100:
            tracker.record_branch('result_low', result < -100)
            tracker.record_line(14)
            return max(result, -1000)
        else:
            tracker.record_branch('result_normal', -100 <= result <= 100)
            tracker.record_line(15)
            return result
    
    # 테스트 케이스들
    test_cases = [
        (5, 5, 'default', "양수, 작은 y, 기본 옵션"),
        (-3, 15, 'double', "음수, 큰 y, double 옵션"),
        (0, 8, 'square', "0, 작은 y, square 옵션"),
        (10, 12, 'negative', "양수, 큰 y, negative 옵션"),
    ]
    
    print("  테스트 케이스 실행:")
    for x, y, option, description in test_cases:
        result = tracked_complex_function(x, y, option)
        print(f"    {description}: f({x}, {y}, '{option}') = {result}")
    
    # 커버리지 보고서
    print(f"\n  커버리지 보고서:")
    print(f"    라인 커버리지: {tracker.get_line_coverage():.1f}%")
    print(f"    분기 커버리지: {tracker.get_branch_coverage():.1f}%")
    print(f"    실행된 라인: {len(tracker.executed_lines)}/{len(tracker.total_lines)}")
    print(f"    실행된 분기: {len(tracker.executed_branches)}/{len(tracker.total_branches)}")
    
    # 미실행 분기 분석
    missing_branches = tracker.total_branches - tracker.executed_branches
    if missing_branches:
        print(f"    미실행 분기: {missing_branches}")
        print(f"    → 추가 테스트 케이스 필요")

demonstrate_coverage_tracking()
```

### 6.2 품질 메트릭과 정적 분석

```python
print("\n=== 품질 메트릭과 정적 분석 ===")

def demonstrate_quality_metrics():
    """코드 품질 메트릭 설명"""
    
    print("33. 주요 품질 메트릭:")
    print("  Cyclomatic Complexity: 순환 복잡도 (분기 수)")
    print("  Lines of Code (LOC): 코드 라인 수")
    print("  Maintainability Index: 유지보수 지수")
    print("  Code Duplication: 코드 중복률")
    print("  Technical Debt: 기술 부채")
    print()
    
    print("34. 품질 기준:")
    print("  순환 복잡도: 함수당 10 이하 권장")
    print("  함수 길이: 20-50줄 권장")
    print("  클래스 길이: 500줄 이하 권장")
    print("  중복률: 5% 이하 권장")

demonstrate_quality_metrics()

def calculate_cyclomatic_complexity(func_code):
    """순환 복잡도 계산 (간단한 버전)"""
    # 실제로는 AST를 분석해야 하지만, 간단한 키워드 카운팅으로 근사
    keywords = ['if', 'elif', 'while', 'for', 'except', 'and', 'or']
    complexity = 1  # 기본 복잡도
    
    for keyword in keywords:
        complexity += func_code.count(keyword)
    
    return complexity

def analyze_code_quality():
    """코드 품질 분석 예제"""
    
    print(f"\n35. 코드 품질 분석 예제:")
    
    # 분석할 함수들
    functions_to_analyze = {
        'simple_function': '''
def simple_add(a, b):
    return a + b
        ''',
        
        'complex_function': '''
def complex_processor(data, options):
    if not data:
        return None
    
    result = []
    for item in data:
        if item > 0:
            if options.get('double'):
                result.append(item * 2)
            elif options.get('square'):
                result.append(item ** 2)
            else:
                result.append(item)
        elif item < 0:
            if options.get('abs'):
                result.append(abs(item))
        
    if len(result) > 10 and options.get('limit'):
        result = result[:10]
    
    return result
        ''',
        
        'very_complex_function': '''
def process_orders(orders, user, settings):
    if not orders or not user:
        return None
    
    processed = []
    total = 0
    
    for order in orders:
        if order.status == 'pending':
            if user.is_premium:
                if order.amount > 100:
                    discount = 0.1
                elif order.amount > 50:
                    discount = 0.05
                else:
                    discount = 0.02
            else:
                if order.amount > 200:
                    discount = 0.05
                else:
                    discount = 0.01
            
            final_amount = order.amount * (1 - discount)
            
            if settings.get('apply_tax'):
                tax_rate = settings.get('tax_rate', 0.1)
                final_amount *= (1 + tax_rate)
            
            if final_amount > 0:
                processed.append({
                    'order_id': order.id,
                    'amount': final_amount,
                    'discount': discount
                })
                total += final_amount
        
        elif order.status == 'cancelled' and settings.get('include_cancelled'):
            processed.append({
                'order_id': order.id,
                'amount': 0,
                'status': 'cancelled'
            })
    
    return {
        'orders': processed,
        'total': total,
        'count': len(processed)
    }
        '''
    }
    
    print("  함수별 복잡도 분석:")
    for func_name, code in functions_to_analyze.items():
        complexity = calculate_cyclomatic_complexity(code)
        lines = len([line for line in code.strip().split('\n') if line.strip()])
        
        # 복잡도 평가
        if complexity <= 5:
            complexity_level = "낮음 (좋음)"
        elif complexity <= 10:
            complexity_level = "보통"
        elif complexity <= 15:
            complexity_level = "높음 (주의)"
        else:
            complexity_level = "매우 높음 (리팩토링 필요)"
        
        print(f"    {func_name}:")
        print(f"      순환 복잡도: {complexity} ({complexity_level})")
        print(f"      코드 라인 수: {lines}")
        
        if complexity > 10:
            print(f"      권장사항: 함수 분리, 조건문 단순화")

analyze_code_quality()

def demonstrate_refactoring_for_quality():
    """품질 향상을 위한 리팩토링 예제"""
    
    print(f"\n36. 리팩토링을 통한 품질 향상:")
    
    # 복잡한 함수 (리팩토링 전)
    def calculate_shipping_cost_before(weight, distance, is_premium, is_express, country):
        """리팩토링 전: 복잡한 배송비 계산"""
        if weight <= 0 or distance <= 0:
            return 0
        
        base_cost = 5.0
        
        if weight > 10:
            if weight > 50:
                if weight > 100:
                    base_cost += 50
                else:
                    base_cost += 25
            else:
                base_cost += 10
        elif weight > 5:
            base_cost += 5
        
        if distance > 1000:
            if distance > 5000:
                distance_cost = distance * 0.02
            else:
                distance_cost = distance * 0.015
        elif distance > 500:
            distance_cost = distance * 0.01
        else:
            distance_cost = distance * 0.005
        
        total = base_cost + distance_cost
        
        if is_premium:
            if is_express:
                total *= 1.5
            else:
                total *= 1.2
        else:
            if is_express:
                total *= 2.0
            else:
                total *= 1.3
        
        if country == 'US':
            total *= 1.0
        elif country == 'CA':
            total *= 1.1
        elif country in ['UK', 'EU']:
            total *= 1.3
        else:
            total *= 1.5
        
        return round(total, 2)
    
    # 리팩토링 후: 함수 분리와 단순화
    class ShippingCalculator:
        """리팩토링 후: 배송비 계산 클래스"""
        
        WEIGHT_TIERS = [
            (100, 50),
            (50, 25),
            (10, 10),
            (5, 5),
            (0, 0)
        ]
        
        DISTANCE_RATES = [
            (5000, 0.02),
            (1000, 0.015),
            (500, 0.01),
            (0, 0.005)
        ]
        
        COUNTRY_MULTIPLIERS = {
            'US': 1.0,
            'CA': 1.1,
            'UK': 1.3,
            'EU': 1.3
        }
        
        @staticmethod
        def calculate_weight_cost(weight):
            """무게별 기본 비용 계산"""
            base_cost = 5.0
            for threshold, additional_cost in ShippingCalculator.WEIGHT_TIERS:
                if weight > threshold:
                    return base_cost + additional_cost
            return base_cost
        
        @staticmethod
        def calculate_distance_cost(distance):
            """거리별 비용 계산"""
            for threshold, rate in ShippingCalculator.DISTANCE_RATES:
                if distance > threshold:
                    return distance * rate
            return distance * 0.005
        
        @staticmethod
        def apply_service_multiplier(cost, is_premium, is_express):
            """서비스 유형별 배율 적용"""
            if is_premium:
                return cost * (1.5 if is_express else 1.2)
            else:
                return cost * (2.0 if is_express else 1.3)
        
        @staticmethod
        def apply_country_multiplier(cost, country):
            """국가별 배율 적용"""
            multiplier = ShippingCalculator.COUNTRY_MULTIPLIERS.get(country, 1.5)
            return cost * multiplier
        
        @classmethod
        def calculate_shipping_cost(cls, weight, distance, is_premium, is_express, country):
            """개선된 배송비 계산"""
            if weight <= 0 or distance <= 0:
                return 0
            
            weight_cost = cls.calculate_weight_cost(weight)
            distance_cost = cls.calculate_distance_cost(distance)
            base_total = weight_cost + distance_cost
            
            with_service = cls.apply_service_multiplier(base_total, is_premium, is_express)
            final_cost = cls.apply_country_multiplier(with_service, country)
            
            return round(final_cost, 2)
    
    # 비교 테스트
    test_cases = [
        (15, 800, True, False, 'US'),
        (75, 3000, False, True, 'UK'),
        (3, 200, True, True, 'CA'),
    ]
    
    print("  리팩토링 전후 결과 비교:")
    for weight, distance, is_premium, is_express, country in test_cases:
        before = calculate_shipping_cost_before(weight, distance, is_premium, is_express, country)
        after = ShippingCalculator.calculate_shipping_cost(weight, distance, is_premium, is_express, country)
        
        print(f"    무게:{weight}kg, 거리:{distance}km, 프리미엄:{is_premium}, 특급:{is_express}, 국가:{country}")
        print(f"      리팩토링 전: ${before}")
        print(f"      리팩토링 후: ${after}")
        print(f"      일치: {'✓' if abs(before - after) < 0.01 else '✗'}")
    
    print(f"\n  리팩토링 장점:")
    print(f"    - 함수별 단일 책임")
    print(f"    - 테스트 용이성 향상")
    print(f"    - 가독성 개선")
    print(f"    - 확장성 증대")
    print(f"    - 순환 복잡도 감소")

demonstrate_refactoring_for_quality()
```

## 7. 지속적 통합과 자동화

### 7.1 CI/CD 파이프라인에서의 테스팅

```python
print("\n=== 지속적 통합과 자동화 ===")

def demonstrate_ci_cd_testing():
    """CI/CD에서의 테스팅 개념"""
    
    print("37. CI/CD 파이프라인에서의 테스팅:")
    print("  커밋 단계:")
    print("    - 단위 테스트 자동 실행")
    print("    - 코드 스타일 검사 (pylint, flake8)")
    print("    - 타입 체크 (mypy)")
    print()
    print("  빌드 단계:")
    print("    - 통합 테스트 실행")
    print("    - 코드 커버리지 측정")
    print("    - 보안 취약점 스캔")
    print()
    print("  배포 단계:")
    print("    - 스모크 테스트")
    print("    - 성능 테스트")
    print("    - 사용자 인수 테스트")

demonstrate_ci_cd_testing()

# CI/CD 파이프라인 시뮬레이션
class CIPipeline:
    """CI 파이프라인 시뮬레이터"""
    
    def __init__(self):
        self.stages = []
        self.failed_stages = []
        self.test_results = {}
    
    def add_stage(self, name, function):
        """파이프라인 단계 추가"""
        self.stages.append((name, function))
    
    def run_pipeline(self):
        """파이프라인 실행"""
        print("  CI 파이프라인 실행:")
        
        for stage_name, stage_function in self.stages:
            print(f"    {stage_name} 실행 중...")
            
            try:
                result = stage_function()
                self.test_results[stage_name] = result
                print(f"      ✓ {stage_name} 성공")
            except Exception as e:
                self.failed_stages.append(stage_name)
                self.test_results[stage_name] = {'error': str(e)}
                print(f"      ✗ {stage_name} 실패: {e}")
                break  # 실패 시 파이프라인 중단
        
        self.print_summary()
    
    def print_summary(self):
        """결과 요약"""
        print(f"\n  파이프라인 결과:")
        print(f"    실행된 단계: {len(self.test_results)}/{len(self.stages)}")
        print(f"    실패한 단계: {len(self.failed_stages)}")
        
        if not self.failed_stages:
            print(f"    상태: ✓ 성공 - 배포 가능")
        else:
            print(f"    상태: ✗ 실패 - 수정 필요")

def simulate_ci_pipeline():
    """CI 파이프라인 시뮬레이션"""
    
    print(f"\n38. CI 파이프라인 시뮬레이션:")
    
    pipeline = CIPipeline()
    
    # 파이프라인 단계들
    def lint_check():
        """코드 스타일 검사"""
        # 실제로는 pylint, flake8 등 실행
        issues = ['line too long', 'unused import']
        if issues:
            return {'status': 'warning', 'issues': issues}
        return {'status': 'passed'}
    
    def unit_tests():
        """단위 테스트 실행"""
        # 앞서 만든 테스트들 실행
        calc = CalculatorTDD()
        calc.add(10)
        calc.subtract(5)
        
        if calc.result == 5:
            return {'status': 'passed', 'tests': 15, 'failures': 0}
        else:
            raise Exception("단위 테스트 실패")
    
    def coverage_check():
        """커버리지 측정"""
        coverage = 85.5  # 시뮬레이션
        threshold = 80
        
        if coverage >= threshold:
            return {'status': 'passed', 'coverage': coverage}
        else:
            raise Exception(f"커버리지 부족: {coverage}% < {threshold}%")
    
    def integration_tests():
        """통합 테스트"""
        # 시뮬레이션: 데이터베이스, API 연동 테스트
        return {'status': 'passed', 'tests': 8, 'failures': 0}
    
    def security_scan():
        """보안 스캔"""
        # 시뮬레이션: bandit 등 보안 도구
        vulnerabilities = []  # 취약점 없음
        if vulnerabilities:
            raise Exception(f"보안 취약점 발견: {vulnerabilities}")
        return {'status': 'passed', 'vulnerabilities': 0}
    
    def performance_test():
        """성능 테스트"""
        # 시뮬레이션: 응답 시간 측정
        avg_response_time = 120  # ms
        threshold = 200  # ms
        
        if avg_response_time <= threshold:
            return {'status': 'passed', 'avg_response_time': avg_response_time}
        else:
            raise Exception(f"성능 기준 미달: {avg_response_time}ms > {threshold}ms")
    
    # 파이프라인 구성
    pipeline.add_stage("코드 스타일 검사", lint_check)
    pipeline.add_stage("단위 테스트", unit_tests)
    pipeline.add_stage("커버리지 측정", coverage_check)
    pipeline.add_stage("통합 테스트", integration_tests)
    pipeline.add_stage("보안 스캔", security_scan)
    pipeline.add_stage("성능 테스트", performance_test)
    
    # 파이프라인 실행
    pipeline.run_pipeline()

simulate_ci_pipeline()

def demonstrate_automated_testing_tools():
    """자동화된 테스팅 도구들"""
    
    print(f"\n39. 자동화된 테스팅 도구들:")
    
    tools = {
        '단위 테스트': {
            'pytest': '가장 인기 있는 테스트 프레임워크',
            'unittest': 'Python 내장 테스트 프레임워크',
            'nose2': 'unittest 확장'
        },
        '코드 품질': {
            'pylint': '코드 스타일과 품질 검사',
            'flake8': '가벼운 코드 스타일 검사',
            'black': '자동 코드 포맷팅',
            'mypy': '정적 타입 검사'
        },
        '커버리지': {
            'coverage.py': '코드 커버리지 측정',
            'pytest-cov': 'pytest용 커버리지 플러그인'
        },
        '보안': {
            'bandit': 'Python 보안 취약점 스캔',
            'safety': '의존성 보안 검사'
        },
        '성능': {
            'pytest-benchmark': '성능 벤치마크 테스트',
            'locust': '부하 테스트',
            'py-spy': '프로파일링'
        },
        'CI/CD': {
            'GitHub Actions': 'GitHub 통합 CI/CD',
            'Jenkins': '범용 CI/CD 도구',
            'GitLab CI': 'GitLab 통합 CI/CD',
            'Travis CI': '클라우드 CI 서비스'
        }
    }
    
    for category, category_tools in tools.items():
        print(f"  {category}:")
        for tool, description in category_tools.items():
            print(f"    {tool}: {description}")
        print()
    
    print(f"\n  사용 예시:")
    print(f"    pip install pytest pytest-cov pytest-mock")
    print(f"    pytest --cov=mypackage tests/")
    print(f"    pytest -n 4  # 4개 프로세스로 병렬 실행")

demonstrate_automated_testing_tools()
```

## 8. 연습 문제

### 연습 1: 테스트 스위트 작성
다음 클래스에 대한 완전한 테스트 스위트를 작성하세요:
- 정상 케이스, 경계 케이스, 예외 케이스 모두 포함
- unittest와 pytest 스타일 모두 사용
- 코드 커버리지 90% 이상 달성

```python
class ShoppingCart:
    def __init__(self):
        self.items = {}
        self.discount_rate = 0.0
    
    def add_item(self, name, price, quantity=1):
        if price < 0 or quantity <= 0:
            raise ValueError("가격은 음수일 수 없고 수량은 양수여야 합니다")
        
        if name in self.items:
            self.items[name]['quantity'] += quantity
        else:
            self.items[name] = {'price': price, 'quantity': quantity}
    
    def remove_item(self, name):
        if name not in self.items:
            raise KeyError(f"'{name}' 항목이 장바구니에 없습니다")
        del self.items[name]
    
    def update_quantity(self, name, quantity):
        if name not in self.items:
            raise KeyError(f"'{name}' 항목이 장바구니에 없습니다")
        if quantity <= 0:
            raise ValueError("수량은 양수여야 합니다")
        self.items[name]['quantity'] = quantity
    
    def apply_discount(self, rate):
        if not 0 <= rate <= 1:
            raise ValueError("할인율은 0과 1 사이여야 합니다")
        self.discount_rate = rate
    
    def get_total(self):
        subtotal = sum(item['price'] * item['quantity'] for item in self.items.values())
        return subtotal * (1 - self.discount_rate)
    
    def get_item_count(self):
        return sum(item['quantity'] for item in self.items.values())
```

### 연습 2: TDD로 클래스 개발
TDD 방식으로 다음 요구사항을 만족하는 `PasswordValidator` 클래스를 개발하세요:
- 최소 8자 이상
- 대문자, 소문자, 숫자, 특수문자 각각 최소 1개 포함
- 연속된 문자 3개 이상 금지 (예: "abc", "123")
- 일반적인 약한 비밀번호 리스트 체크
- 강도 점수 계산 (0-100점)

### 연습 3: 성능 테스트 및 최적화
다음 함수의 성능을 측정하고 최적화하세요:
```python
def find_prime_numbers(limit):
    primes = []
    for num in range(2, limit + 1):
        is_prime = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes
```

### 연습 4: 통합 테스트 시나리오
다음 클래스들의 상호작용을 테스트하는 통합 테스트를 작성하세요:
```python
class Database:
    def __init__(self):
        self.data = {}
    
    def save(self, key, value):
        self.data[key] = value
    
    def get(self, key):
        return self.data.get(key)

class UserService:
    def __init__(self, database):
        self.db = database
    
    def create_user(self, username, email):
        if self.db.get(username):
            raise ValueError("사용자가 이미 존재합니다")
        
        user = {'username': username, 'email': email}
        self.db.save(username, user)
        return user
    
    def get_user(self, username):
        return self.db.get(username)

class NotificationService:
    def __init__(self, user_service):
        self.user_service = user_service
    
    def send_welcome_email(self, username):
        user = self.user_service.get_user(username)
        if not user:
            raise ValueError("사용자를 찾을 수 없습니다")
        
        # 이메일 발송 시뮬레이션
        return f"Welcome email sent to {user['email']}"
```

## 정리

이 챕터에서 학습한 내용:

1. **테스트 기초**: 테스트 종류, 작성 원칙, AAA 패턴
2. **unittest 모듈**: 기본 사용법, 고급 기법, 모킹
3. **pytest 프레임워크**: 장점, 픽스처, 매개변수화, 플러그인
4. **디버깅 기법**: print, logging, assertion, traceback, 프로파일링
5. **TDD**: Red-Green-Refactor 사이클, 실무 적용
6. **코드 커버리지와 품질 측정**: 커버리지 측정, 품질 메트릭, 리팩토링
7. **CI/CD 통합**: 자동화된 테스트, 파이프라인 구축

다음 챕터에서는 데이터베이스 연동에 대해 학습하여 실제 애플리케이션 개발에 필요한 데이터 관리 기법을 배우겠습니다.

### 핵심 포인트
- 테스트는 코드 품질과 신뢰성의 핵심입니다
- TDD는 요구사항 이해와 설계 개선에 도움이 됩니다
- 적절한 커버리지와 품질 메트릭이 중요합니다
- 자동화된 테스트로 회귀 버그 방지
- 디버깅은 체계적인 접근이 필요합니다
- CI/CD 파이프라인에서 테스트는 필수 요소입니다
</rewritten_file>