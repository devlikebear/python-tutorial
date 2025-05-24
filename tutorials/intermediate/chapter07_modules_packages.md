# Chapter 7: 모듈과 패키지

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 모듈을 생성하고 효과적으로 활용하기
- 패키지 구조를 설계하고 구현하기
- import 시스템의 작동 원리 이해하기
- 상대 import와 절대 import 구분하여 사용하기
- 가상환경을 생성하고 관리하기
- pip를 사용한 패키지 관리하기
- 모듈 검색 경로와 파이썬 패키지 시스템 이해하기

## 1. 모듈 기초

### 1.1 모듈이란?

모듈(Module)은 파이썬 코드가 담긴 파일입니다. 함수, 클래스, 변수들을 모아둔 코드 라이브러리로 생각할 수 있습니다. 코드의 재사용성과 가독성을 높이는 핵심적인 방법입니다.

```python
# === 첫 번째 모듈 만들기 ===

# math_utils.py 파일 (가상의 파일 내용)
"""
수학 관련 유틸리티 함수들을 모아둔 모듈
"""

PI = 3.14159
E = 2.71828

def add(a, b):
    """두 수를 더합니다"""
    return a + b

def subtract(a, b):
    """첫 번째 수에서 두 번째 수를 뺍니다"""
    return a - b

def multiply(a, b):
    """두 수를 곱합니다"""
    return a * b

def divide(a, b):
    """첫 번째 수를 두 번째 수로 나눕니다"""
    if b == 0:
        raise ValueError("0으로 나눌 수 없습니다")
    return a / b

def circle_area(radius):
    """원의 넓이를 계산합니다"""
    return PI * radius * radius

def factorial(n):
    """팩토리얼을 계산합니다"""
    if n < 0:
        raise ValueError("음수의 팩토리얼은 정의되지 않습니다")
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

class Calculator:
    """간단한 계산기 클래스"""
    
    def __init__(self):
        self.history = []
    
    def calculate(self, operation, a, b):
        if operation == '+':
            result = add(a, b)
        elif operation == '-':
            result = subtract(a, b)
        elif operation == '*':
            result = multiply(a, b)
        elif operation == '/':
            result = divide(a, b)
        else:
            raise ValueError("지원하지 않는 연산입니다")
        
        self.history.append(f"{a} {operation} {b} = {result}")
        return result
    
    def get_history(self):
        return self.history.copy()

print("=== 모듈 기본 개념 ===")
print("모듈은 .py 파일로 저장된 파이썬 코드입니다")
print("함수, 클래스, 변수를 포함할 수 있습니다")
print("다른 파일에서 import하여 재사용할 수 있습니다")
```

### 1.2 기본 import 사용법

```python
print("\n=== import 기본 사용법 ===")

# 1. 전체 모듈 import
# import math_utils
# result = math_utils.add(5, 3)

# 2. 특정 함수만 import
# from math_utils import add, multiply
# result = add(5, 3)

# 3. 별칭 사용
# import math_utils as mu
# result = mu.add(5, 3)

# 4. 모든 것 import (권장하지 않음)
# from math_utils import *

# 내장 모듈 예제
import math
import random
import datetime

print("1. 내장 모듈 사용:")
print(f"수학 상수 π: {math.pi}")
print(f"제곱근 √16: {math.sqrt(16)}")
print(f"로그 log(10): {math.log10(100)}")

print(f"\n2. 랜덤 모듈:")
print(f"1-10 사이 랜덤 수: {random.randint(1, 10)}")
print(f"리스트에서 랜덤 선택: {random.choice(['사과', '바나나', '포도'])}")

print(f"\n3. 날짜/시간 모듈:")
now = datetime.datetime.now()
print(f"현재 시간: {now.strftime('%Y-%m-%d %H:%M:%S')}")

# 모듈의 속성 확인
print(f"\n4. 모듈 정보:")
print(f"math 모듈의 일부 속성들:")
math_attributes = [attr for attr in dir(math) if not attr.startswith('_')][:5]
print(f"  {math_attributes}")
```

### 1.3 모듈 생성과 활용 실습

```python
print("\n=== 실제 모듈 생성 실습 ===")

# 실제로는 파일로 생성해야 하지만, 여기서는 개념 설명
# string_utils.py 모듈 예제

string_utils_code = '''
"""
문자열 처리 유틸리티 모듈
"""

def reverse_string(text):
    """문자열을 뒤집습니다"""
    return text[::-1]

def count_words(text):
    """문자열의 단어 수를 셉니다"""
    return len(text.split())

def is_palindrome(text):
    """회문인지 확인합니다"""
    cleaned = ''.join(text.lower().split())
    return cleaned == cleaned[::-1]

def title_case(text):
    """각 단어의 첫 글자를 대문자로 만듭니다"""
    return ' '.join(word.capitalize() for word in text.split())

def remove_duplicates(text):
    """연속된 중복 문자를 제거합니다"""
    if not text:
        return text
    
    result = [text[0]]
    for char in text[1:]:
        if char != result[-1]:
            result.append(char)
    
    return ''.join(result)

class TextProcessor:
    """텍스트 처리 클래스"""
    
    def __init__(self):
        self.processed_texts = []
    
    def process(self, text, operations):
        """여러 텍스트 처리 작업을 수행합니다"""
        result = text
        
        for operation in operations:
            if operation == 'reverse':
                result = reverse_string(result)
            elif operation == 'title':
                result = title_case(result)
            elif operation == 'remove_dup':
                result = remove_duplicates(result)
        
        self.processed_texts.append((text, result))
        return result
    
    def get_history(self):
        return self.processed_texts.copy()
'''

print("문자열 유틸리티 모듈 예제:")
print("def reverse_string(text): ...")
print("def count_words(text): ...")
print("def is_palindrome(text): ...")

# 모듈 사용 시뮬레이션
def reverse_string(text):
    return text[::-1]

def count_words(text):
    return len(text.split())

def is_palindrome(text):
    cleaned = ''.join(text.lower().split())
    return cleaned == cleaned[::-1]

# 사용 예제
test_text = "Hello World"
print(f"\n예제 사용:")
print(f"원본: '{test_text}'")
print(f"뒤집기: '{reverse_string(test_text)}'")
print(f"단어 수: {count_words(test_text)}")

palindrome_text = "A man a plan a canal Panama"
print(f"회문 테스트 '{palindrome_text}': {is_palindrome(palindrome_text)}")
```

## 2. 모듈 시스템 심화

### 2.1 모듈 검색 경로

```python
print("\n=== 모듈 검색 경로 ===")

import sys
import os

print("1. 파이썬 모듈 검색 경로:")
for i, path in enumerate(sys.path[:5], 1):  # 처음 5개만 표시
    print(f"  {i}. {path}")

print(f"\n2. 현재 작업 디렉토리:")
print(f"  {os.getcwd()}")

print(f"\n3. 모듈 검색 순서:")
print("  1) 현재 스크립트가 있는 디렉토리")
print("  2) PYTHONPATH 환경 변수에 지정된 디렉토리들")
print("  3) 표준 라이브러리 디렉토리")
print("  4) site-packages 디렉토리 (설치된 패키지들)")

# 모듈 위치 확인
print(f"\n4. 내장 모듈 위치 예제:")
import json
print(f"  json 모듈 위치: {json.__file__}")

# 모듈 정보 확인
print(f"\n5. 모듈 정보:")
print(f"  json 모듈 이름: {json.__name__}")
print(f"  json 모듈 문서: {json.__doc__[:50]}...")
```

### 2.2 `__name__`과 `__main__` 이해

```python
print("\n=== __name__과 __main__ ===")

# 이 개념을 이해하기 위한 예제
print("1. __name__ 변수:")
print(f"  현재 스크립트의 __name__: {__name__}")

# 모듈이 직접 실행될 때와 import될 때의 차이
example_module_code = '''
# example_module.py

def greet(name):
    return f"안녕하세요, {name}님!"

def main():
    print("이 모듈이 직접 실행되었습니다")
    print(greet("파이썬"))

if __name__ == "__main__":
    main()
'''

print(f"\n2. 모듈 예제 코드:")
print("# example_module.py")
print("def greet(name):")
print("    return f'안녕하세요, {name}님!'")
print("")
print("if __name__ == '__main__':")
print("    print('직접 실행됨')")

print(f"\n3. 실행 방식별 동작:")
print("  - 직접 실행: python example_module.py → __name__ == '__main__'")
print("  - import 시: import example_module → __name__ == 'example_module'")

# 실제 예제 함수
def demonstrate_name_main():
    """__name__ == '__main__' 패턴의 실용적 예제"""
    print("\n4. 실용적 활용:")
    print("  - 모듈을 라이브러리로도, 실행 파일로도 사용 가능")
    print("  - 테스트 코드를 모듈 내에 포함")
    print("  - 설정이나 초기화 코드 분리")

demonstrate_name_main()
```

## 3. 패키지 (Packages)

### 3.1 패키지 기본 구조

```python
print("\n=== 패키지 기본 구조 ===")

# 패키지 구조 예제
package_structure = '''
myproject/
├── __init__.py          # 패키지 초기화 파일
├── core/
│   ├── __init__.py
│   ├── database.py      # 데이터베이스 관련 기능
│   └── utils.py         # 핵심 유틸리티
├── web/
│   ├── __init__.py
│   ├── server.py        # 웹 서버 기능
│   └── templates/       # 템플릿 디렉토리
└── tests/
    ├── __init__.py
    ├── test_core.py
    └── test_web.py
'''

print("1. 패키지 디렉토리 구조:")
print(package_structure)

print("2. __init__.py 파일의 역할:")
print("  - 디렉토리를 패키지로 인식하게 함")
print("  - 패키지 초기화 코드 포함")
print("  - 패키지에서 노출할 모듈/함수 지정")
print("  - 패키지 수준의 변수나 함수 정의")

# __init__.py 예제
init_example = '''
# myproject/__init__.py
"""
MyProject 패키지
웹 애플리케이션 개발을 위한 유틸리티 패키지
"""

__version__ = "1.0.0"
__author__ = "Python Developer"

# 편의를 위한 import
from .core.utils import helper_function
from .web.server import start_server

# 패키지에서 노출할 항목들
__all__ = ['helper_function', 'start_server', '__version__']

def package_info():
    return f"MyProject v{__version__} by {__author__}"
'''

print(f"\n3. __init__.py 예제:")
print("# myproject/__init__.py")
print("__version__ = '1.0.0'")
print("from .core.utils import helper_function")
print("__all__ = ['helper_function', '__version__']")
```

### 3.2 import 패턴들

```python
print("\n=== 다양한 import 패턴 ===")

# 다양한 import 방법들
import_examples = {
    "절대 import": [
        "import myproject",
        "import myproject.core.database",
        "from myproject.core import utils",
        "from myproject.web.server import start_server"
    ],
    "상대 import": [
        "from . import utils          # 같은 패키지의 모듈",
        "from .. import config       # 상위 패키지의 모듈",
        "from ..web import server    # 형제 패키지의 모듈",
        "from ...external import lib # 더 상위 패키지"
    ],
    "별칭 사용": [
        "import myproject.core.database as db",
        "from myproject.core.utils import helper as h",
        "import numpy as np  # 관례적 별칭"
    ]
}

for category, examples in import_examples.items():
    print(f"\n{category}:")
    for example in examples:
        print(f"  {example}")

print(f"\n상대 import vs 절대 import:")
print("1. 절대 import:")
print("  - 명시적이고 명확함")
print("  - 패키지 구조 변경에 덜 민감")
print("  - 권장되는 방식")

print("\n2. 상대 import:")
print("  - 패키지 내부에서만 사용")
print("  - 패키지 이름 변경에 유연")
print("  - 스크립트 직접 실행 시 문제 발생 가능")
```

### 3.3 실용적 패키지 예제

```python
print("\n=== 실용적 패키지 설계 예제 ===")

# 웹 애플리케이션 패키지 구조
webapp_structure = '''
webapp/
├── __init__.py
├── app.py               # 메인 애플리케이션
├── config/
│   ├── __init__.py
│   ├── development.py   # 개발 환경 설정
│   └── production.py    # 운영 환경 설정
├── models/
│   ├── __init__.py
│   ├── user.py         # 사용자 모델
│   └── post.py         # 게시물 모델
├── views/
│   ├── __init__.py
│   ├── auth.py         # 인증 관련 뷰
│   └── blog.py         # 블로그 관련 뷰
├── utils/
│   ├── __init__.py
│   ├── validators.py   # 검증 함수들
│   └── helpers.py      # 헬퍼 함수들
└── static/
    ├── css/
    ├── js/
    └── images/
'''

print("웹 애플리케이션 패키지 구조:")
print(webapp_structure)

# 각 모듈의 예제 코드
print("\n모듈별 예제 코드:")

# utils/validators.py 예제
print("\n1. utils/validators.py:")
def validate_email(email):
    """이메일 주소 유효성 검사"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """비밀번호 강도 검사"""
    if len(password) < 8:
        return False, "비밀번호는 최소 8자 이상이어야 합니다"
    
    checks = {
        'uppercase': any(c.isupper() for c in password),
        'lowercase': any(c.islower() for c in password),
        'digit': any(c.isdigit() for c in password),
        'special': any(c in '!@#$%^&*(),.?":{}|<>' for c in password)
    }
    
    missing = [key for key, value in checks.items() if not value]
    
    if len(missing) > 1:
        return False, f"비밀번호에 {', '.join(missing)}이(가) 포함되어야 합니다"
    
    return True, "유효한 비밀번호입니다"

# 사용 예제
print("def validate_email(email): ...")
print("def validate_password(password): ...")

test_email = "test@example.com"
test_password = "MyPassword123!"

print(f"\n검증 예제:")
print(f"이메일 '{test_email}': {validate_email(test_email)}")
is_valid, message = validate_password(test_password)
print(f"비밀번호 검증: {is_valid} - {message}")
```

## 4. 가상환경과 패키지 관리

### 4.1 가상환경의 필요성

```python
print("\n=== 가상환경의 필요성 ===")

print("1. 가상환경이 필요한 이유:")
reasons = [
    "프로젝트별 독립적인 패키지 관리",
    "패키지 버전 충돌 방지",
    "시스템 파이썬 환경 보호",
    "배포 시 정확한 의존성 관리",
    "개발 환경 일관성 유지"
]

for i, reason in enumerate(reasons, 1):
    print(f"  {i}. {reason}")

print(f"\n2. 가상환경 없이 발생할 수 있는 문제:")
problems = [
    "Django 2.0과 Django 3.0이 동시에 필요한 경우",
    "A 프로젝트는 requests 2.20, B 프로젝트는 requests 2.25 필요",
    "전역 패키지 설치로 인한 시스템 불안정",
    "다른 개발자와 환경 차이로 인한 오류"
]

for i, problem in enumerate(problems, 1):
    print(f"  {i}. {problem}")

# 가상환경 명령어 예제 (실제로는 터미널에서 실행)
venv_commands = [
    "python -m venv myenv          # 가상환경 생성",
    "source myenv/bin/activate     # 활성화 (Linux/Mac)",
    "myenv\\Scripts\\activate       # 활성화 (Windows)",
    "deactivate                    # 비활성화"
]

print(f"\n3. 가상환경 기본 명령어:")
for cmd in venv_commands:
    print(f"  {cmd}")
```

### 4.2 pip 패키지 관리

```python
print("\n=== pip 패키지 관리 ===")

# pip 기본 명령어들
pip_commands = {
    "설치": [
        "pip install package_name",
        "pip install package_name==1.2.3",
        "pip install -r requirements.txt",
        "pip install -e .  # 개발 모드 설치"
    ],
    "조회": [
        "pip list                    # 설치된 패키지 목록",
        "pip show package_name       # 패키지 정보 확인",
        "pip search keyword          # 패키지 검색 (deprecated)",
        "pip outdated                # 업데이트 가능한 패키지"
    ],
    "업데이트/제거": [
        "pip install --upgrade package_name",
        "pip uninstall package_name",
        "pip freeze > requirements.txt",
        "pip check                   # 의존성 확인"
    ]
}

for category, commands in pip_commands.items():
    print(f"\n{category}:")
    for cmd in commands:
        print(f"  {cmd}")

# requirements.txt 예제
requirements_example = '''
# requirements.txt 예제
Django>=3.2,<4.0
requests==2.25.1
numpy>=1.20.0
pandas
pytest>=6.0
black==21.5b2        # 코드 포맷터
flake8               # 린터
'''

print(f"\n4. requirements.txt 예제:")
print("# requirements.txt")
print("Django>=3.2,<4.0")
print("requests==2.25.1")
print("numpy>=1.20.0")
print("pytest>=6.0")

print(f"\n5. 버전 지정 방법:")
version_specifiers = [
    "package==1.2.3      # 정확한 버전",
    "package>=1.2.0      # 최소 버전",
    "package<=1.3.0      # 최대 버전",
    "package>=1.2,<1.4   # 범위 지정",
    "package~=1.2.0      # 호환 버전 (>=1.2.0, <1.3.0)"
]

for spec in version_specifiers:
    print(f"  {spec}")
```

### 4.3 패키지 개발과 배포

```python
print("\n=== 패키지 개발과 배포 ===")

# setup.py 예제
setup_example = '''
# setup.py
from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="my-awesome-package",
    version="0.1.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A short description of your package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/my-awesome-package",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
    ],
    python_requires=">=3.8",
    install_requires=[
        "requests>=2.25.0",
        "click>=7.0",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "black>=21.0",
            "flake8>=3.8",
        ]
    },
    entry_points={
        "console_scripts": [
            "my-tool=my_package.cli:main",
        ],
    },
)
'''

print("1. setup.py 구조:")
print("# setup.py")
print("from setuptools import setup, find_packages")
print("")
print("setup(")
print("    name='my-package',")
print("    version='0.1.0',")
print("    packages=find_packages(),")
print("    install_requires=['requests'],")
print(")")

print(f"\n2. 패키지 배포 명령어:")
dist_commands = [
    "python setup.py sdist bdist_wheel  # 배포 파일 생성",
    "pip install twine                  # 업로드 도구 설치",
    "twine check dist/*                 # 배포 파일 검증",
    "twine upload --repository testpypi dist/*  # 테스트 PyPI 업로드",
    "twine upload dist/*                # PyPI 업로드"
]

for cmd in dist_commands:
    print(f"  {cmd}")

print(f"\n3. pyproject.toml (현대적 방식):")
pyproject_example = '''
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-package"
version = "0.1.0"
description = "My awesome package"
authors = [{name = "Your Name", email = "your.email@example.com"}]
license = {text = "MIT"}
dependencies = ["requests>=2.25.0"]
'''

print("[project]")
print("name = 'my-package'")
print("version = '0.1.0'")
print("dependencies = ['requests>=2.25.0']")
```

## 5. 고급 모듈 시스템

### 5.1 동적 import

```python
print("\n=== 동적 import ===")

# importlib를 사용한 동적 import
import importlib
import sys

def dynamic_import_demo():
    """동적 import 예제"""
    
    print("1. importlib.import_module() 사용:")
    
    # 모듈 이름을 문자열로 지정하여 import
    module_names = ['math', 'random', 'datetime']
    
    for module_name in module_names:
        try:
            module = importlib.import_module(module_name)
            print(f"  {module_name} 모듈 로드 성공: {module.__name__}")
            
            # 모듈의 일부 속성 표시
            attrs = [attr for attr in dir(module) if not attr.startswith('_')][:3]
            print(f"    주요 속성: {attrs}")
            
        except ImportError as e:
            print(f"  {module_name} 모듈 로드 실패: {e}")

dynamic_import_demo()

def conditional_import():
    """조건부 import 예제"""
    print(f"\n2. 조건부 import:")
    
    # 운영체제별 모듈 import
    import platform
    system = platform.system()
    
    print(f"  현재 OS: {system}")
    
    if system == "Windows":
        print("  Windows 전용 모듈을 사용할 것입니다")
        # import winsound  # Windows에서만 사용 가능
    elif system == "Darwin":  # macOS
        print("  macOS 전용 기능을 사용할 것입니다")
    else:  # Linux 등
        print("  Unix/Linux 기능을 사용할 것입니다")

conditional_import()

def plugin_system_demo():
    """플러그인 시스템 예제"""
    print(f"\n3. 플러그인 시스템 개념:")
    
    # 가상의 플러그인 시스템
    available_plugins = ['auth_plugin', 'cache_plugin', 'logger_plugin']
    
    loaded_plugins = {}
    
    for plugin_name in available_plugins:
        # 실제로는 파일 시스템에서 플러그인을 찾아 로드
        print(f"  플러그인 '{plugin_name}' 로드 시뮬레이션")
        
        # 가상의 플러그인 객체
        plugin = type('Plugin', (), {
            'name': plugin_name,
            'version': '1.0.0',
            'process': lambda self, data: f"{self.name}이(가) {data}를 처리했습니다"
        })()
        
        loaded_plugins[plugin_name] = plugin
    
    print(f"  로드된 플러그인 수: {len(loaded_plugins)}")
    
    # 플러그인 사용 예제
    if 'auth_plugin' in loaded_plugins:
        result = loaded_plugins['auth_plugin'].process("사용자 인증")
        print(f"    {result}")

plugin_system_demo()
```

### 5.2 모듈 캐싱과 재로드

```python
print("\n=== 모듈 캐싱과 재로드 ===")

def module_caching_demo():
    """모듈 캐싱 메커니즘 설명"""
    
    print("1. 모듈 캐시 확인:")
    
    # sys.modules에서 로드된 모듈들 확인
    loaded_modules = list(sys.modules.keys())
    print(f"  현재 로드된 모듈 수: {len(loaded_modules)}")
    
    # 일부 모듈 표시
    sample_modules = [m for m in loaded_modules if not m.startswith('_')][:5]
    print(f"  예시 모듈들: {sample_modules}")
    
    print(f"\n2. 모듈 캐싱 동작:")
    print("  - 처음 import 시: 모듈 파일을 읽고 실행")
    print("  - 이후 import 시: sys.modules에서 캐시된 모듈 반환")
    print("  - 모듈 코드는 한 번만 실행됨")

module_caching_demo()

def reload_demo():
    """모듈 재로드 예제"""
    print(f"\n3. 모듈 재로드:")
    
    print("  개발 중 모듈을 수정한 후 재로드가 필요한 경우:")
    print("  importlib.reload(module_name)")
    
    # 예제: math 모듈 재로드 (실제로는 의미 없음)
    import math
    print(f"  math.pi (재로드 전): {math.pi}")
    
    # 재로드 수행
    importlib.reload(math)
    print(f"  math.pi (재로드 후): {math.pi}")
    
    print(f"\n  재로드 주의사항:")
    print("  - 이미 생성된 객체는 영향받지 않음")
    print("  - 순환 참조가 있는 모듈은 문제가 발생할 수 있음")
    print("  - 프로덕션에서는 사용하지 않는 것이 좋음")

reload_demo()

def namespace_package_intro():
    """네임스페이스 패키지 개념 소개"""
    print(f"\n4. 네임스페이스 패키지:")
    
    print("  __init__.py가 없는 패키지 구조:")
    ns_structure = '''
  company/
  ├── auth/           # __init__.py 없음
  │   └── models.py
  └── billing/        # __init__.py 없음
      └── invoice.py
  '''
    print(ns_structure)
    
    print("  특징:")
    print("  - 여러 디렉토리에 분산된 패키지를 하나로 취급")
    print("  - 대규모 프로젝트나 플러그인 시스템에 유용")
    print("  - Python 3.3+ 에서 지원")

namespace_package_intro()
```

## 6. 실용적 활용 예제

### 6.1 로그 시스템 패키지

```python
print("\n=== 실용적 예제: 로그 시스템 패키지 ===")

# 로그 시스템 패키지 구조
log_package_structure = '''
logger_package/
├── __init__.py
├── core/
│   ├── __init__.py
│   ├── logger.py       # 로거 클래스
│   └── formatters.py   # 포맷터들
├── handlers/
│   ├── __init__.py
│   ├── file_handler.py # 파일 핸들러
│   └── email_handler.py# 이메일 핸들러
├── utils/
│   ├── __init__.py
│   └── helpers.py      # 헬퍼 함수들
└── config/
    ├── __init__.py
    └── settings.py     # 설정
'''

print("로그 시스템 패키지 구조:")
print(log_package_structure)

# 각 모듈 구현 예제
print("\n1. core/logger.py 구현:")

import datetime
import json
from enum import Enum

class LogLevel(Enum):
    DEBUG = 1
    INFO = 2
    WARNING = 3
    ERROR = 4
    CRITICAL = 5

class Logger:
    """간단한 로거 클래스"""
    
    def __init__(self, name, level=LogLevel.INFO):
        self.name = name
        self.level = level
        self.handlers = []
    
    def add_handler(self, handler):
        """핸들러 추가"""
        self.handlers.append(handler)
    
    def log(self, level, message, **kwargs):
        """로그 메시지 기록"""
        if level.value < self.level.value:
            return
        
        log_record = {
            'timestamp': datetime.datetime.now().isoformat(),
            'logger': self.name,
            'level': level.name,
            'message': message,
            'extra': kwargs
        }
        
        for handler in self.handlers:
            handler.handle(log_record)
    
    def debug(self, message, **kwargs):
        self.log(LogLevel.DEBUG, message, **kwargs)
    
    def info(self, message, **kwargs):
        self.log(LogLevel.INFO, message, **kwargs)
    
    def warning(self, message, **kwargs):
        self.log(LogLevel.WARNING, message, **kwargs)
    
    def error(self, message, **kwargs):
        self.log(LogLevel.ERROR, message, **kwargs)
    
    def critical(self, message, **kwargs):
        self.log(LogLevel.CRITICAL, message, **kwargs)

print("class Logger:")
print("    def log(self, level, message): ...")
print("    def info(self, message): ...")
print("    def error(self, message): ...")

# 핸들러 예제
print("\n2. handlers/file_handler.py:")

class FileHandler:
    """파일 로그 핸들러"""
    
    def __init__(self, filename, max_size=1024*1024):  # 1MB
        self.filename = filename
        self.max_size = max_size
    
    def handle(self, log_record):
        """로그 레코드를 파일에 기록"""
        formatted_message = self._format_message(log_record)
        
        # 파일 크기 확인 및 로테이션 (실제 구현 시)
        try:
            with open(self.filename, 'a', encoding='utf-8') as f:
                f.write(formatted_message + '\n')
        except IOError as e:
            print(f"파일 쓰기 오류: {e}")
    
    def _format_message(self, log_record):
        """로그 메시지 포맷팅"""
        return f"[{log_record['timestamp']}] {log_record['level']} - {log_record['logger']}: {log_record['message']}"

class ConsoleHandler:
    """콘솔 로그 핸들러"""
    
    def handle(self, log_record):
        """로그 레코드를 콘솔에 출력"""
        level = log_record['level']
        message = log_record['message']
        logger_name = log_record['logger']
        
        # 레벨별 색상 (실제로는 colorama 등 사용)
        color_codes = {
            'DEBUG': '',
            'INFO': '',
            'WARNING': '⚠️',
            'ERROR': '❌',
            'CRITICAL': '🚨'
        }
        
        prefix = color_codes.get(level, '')
        print(f"{prefix} [{level}] {logger_name}: {message}")

print("class FileHandler:")
print("    def handle(self, log_record): ...")
print("")
print("class ConsoleHandler:")
print("    def handle(self, log_record): ...")

# 사용 예제
print("\n3. 로거 사용 예제:")

# 로거 생성
app_logger = Logger("MyApp", LogLevel.DEBUG)

# 핸들러 추가
console_handler = ConsoleHandler()
app_logger.add_handler(console_handler)

# 로그 메시지 출력
app_logger.info("애플리케이션 시작")
app_logger.warning("설정 파일을 찾을 수 없습니다", config_path="/etc/myapp.conf")
app_logger.error("데이터베이스 연결 실패", error_code=500)

print("\n로그 출력 완료")
```

### 6.2 설정 관리 패키지

```python
print("\n=== 설정 관리 패키지 예제 ===")

# 설정 관리 시스템
class ConfigManager:
    """설정 관리자 클래스"""
    
    def __init__(self):
        self.config = {}
        self.config_sources = []
    
    def add_source(self, source):
        """설정 소스 추가"""
        self.config_sources.append(source)
        self._reload()
    
    def _reload(self):
        """모든 소스에서 설정 다시 로드"""
        self.config = {}
        for source in self.config_sources:
            source_config = source.load()
            self._merge_config(source_config)
    
    def _merge_config(self, new_config):
        """설정 병합"""
        for key, value in new_config.items():
            if key in self.config and isinstance(self.config[key], dict) and isinstance(value, dict):
                self.config[key].update(value)
            else:
                self.config[key] = value
    
    def get(self, key, default=None):
        """설정 값 조회"""
        keys = key.split('.')
        value = self.config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value
    
    def set(self, key, value):
        """설정 값 설정"""
        keys = key.split('.')
        config = self.config
        
        for k in keys[:-1]:
            if k not in config:
                config[k] = {}
            config = config[k]
        
        config[keys[-1]] = value

class DictConfigSource:
    """딕셔너리 설정 소스"""
    
    def __init__(self, config_dict):
        self.config_dict = config_dict
    
    def load(self):
        return self.config_dict.copy()

class EnvConfigSource:
    """환경변수 설정 소스"""
    
    def __init__(self, prefix="APP_"):
        self.prefix = prefix
    
    def load(self):
        import os
        config = {}
        
        for key, value in os.environ.items():
            if key.startswith(self.prefix):
                config_key = key[len(self.prefix):].lower().replace('_', '.')
                config[config_key] = value
        
        return config

# 설정 관리자 사용 예제
print("1. 설정 관리자 생성:")
config_manager = ConfigManager()

# 기본 설정
default_config = {
    'database': {
        'host': 'localhost',
        'port': 5432,
        'name': 'myapp'
    },
    'app': {
        'debug': False,
        'secret_key': 'default-secret'
    }
}

config_manager.add_source(DictConfigSource(default_config))

print(f"데이터베이스 호스트: {config_manager.get('database.host')}")
print(f"앱 디버그 모드: {config_manager.get('app.debug')}")

# 환경변수 설정 추가 (시뮬레이션)
import os
os.environ['APP_DATABASE_HOST'] = 'production-db.example.com'
os.environ['APP_APP_DEBUG'] = 'true'

config_manager.add_source(EnvConfigSource())

print(f"\n환경변수 적용 후:")
print(f"데이터베이스 호스트: {config_manager.get('database.host')}")
print(f"앱 디버그 모드: {config_manager.get('app.debug')}")

# 동적 설정 변경
config_manager.set('app.new_feature', True)
print(f"새 기능 활성화: {config_manager.get('app.new_feature')}")
```

## 7. 연습 문제

### 연습 1: 유틸리티 패키지 만들기
다양한 유틸리티 함수들을 포함하는 패키지를 설계하고 구현하세요. 문자열 처리, 파일 조작, 데이터 검증 등의 모듈을 포함해야 합니다.

### 연습 2: 플러그인 시스템 구현
동적으로 플러그인을 로드하고 실행할 수 있는 시스템을 구현하세요. 플러그인 디렉토리를 스캔하고 모듈을 동적으로 import하는 기능을 포함해야 합니다.

### 연습 3: 설정 파일 관리자
JSON, YAML, INI 등 다양한 형식의 설정 파일을 통합 관리할 수 있는 패키지를 만드세요. 환경변수와 명령행 인수도 지원해야 합니다.

### 연습 4: 모듈 문서화 도구
패키지나 모듈의 구조를 분석하고 자동으로 문서를 생성하는 도구를 만드세요. docstring을 추출하고 HTML이나 마크다운 형태로 출력하는 기능을 포함해야 합니다.

## 정리

이 챕터에서 학습한 내용:

1. **모듈 기초**: 모듈 생성, import 방법, `__name__`과 `__main__` 이해
2. **패키지 구조**: `__init__.py`, 패키지 계층, import 패턴
3. **가상환경**: venv 사용법, 프로젝트 격리, 의존성 관리
4. **패키지 관리**: pip 사용법, requirements.txt, 패키지 배포
5. **고급 기능**: 동적 import, 모듈 캐싱, 재로드, 네임스페이스 패키지
6. **실용적 예제**: 로그 시스템, 설정 관리, 플러그인 아키텍처

다음 챕터에서는 예외 처리 고급 기법을 학습하여 견고하고 안정적인 프로그램을 작성하는 방법을 배우겠습니다.

### 핵심 포인트
- 모듈과 패키지는 코드 구조화와 재사용성의 핵심입니다
- 가상환경은 프로젝트별 의존성 관리에 필수적입니다
- 올바른 import 패턴과 패키지 구조는 유지보수성을 크게 향상시킵니다
- 동적 import와 플러그인 시스템으로 확장 가능한 애플리케이션을 만들 수 있습니다
- 설정 관리와 로깅은 실무 프로젝트에서 반드시 필요한 요소입니다 