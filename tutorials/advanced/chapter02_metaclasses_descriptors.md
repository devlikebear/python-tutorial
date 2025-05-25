# Chapter 2: 메타클래스와 디스크립터

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 메타클래스의 개념과 파이썬 객체 생성 과정 이해하기
- 커스텀 메타클래스를 구현하여 클래스 생성 과정 제어하기
- 디스크립터 프로토콜을 활용한 고급 속성 관리 구현하기
- property와 고급 속성 접근 제어 메커니즘 마스터하기
- __new__와 __init__의 차이점과 활용법 파악하기
- 동적 클래스 생성과 타입 시스템 조작하기
- 메타클래스와 디스크립터를 활용한 프레임워크 설계하기
- 실무에서 활용할 수 있는 고급 객체지향 패턴 구현하기

## 1. 메타클래스 기초

### 1.1 클래스는 객체다

```python
print("=== 클래스의 본질 이해 ===")

class ClassInspector:
    """클래스와 메타클래스의 관계를 분석하는 도구"""
    
    def __init__(self):
        self.inspection_results = {}
    
    def inspect_class_nature(self):
        """클래스가 객체라는 것을 증명"""
        print("\n1. 클래스도 객체입니다:")
        
        # 간단한 클래스 정의
        class MyClass:
            def method(self):
                return "Hello from method"
        
        # 클래스도 객체임을 증명
        print(f"   MyClass의 타입: {type(MyClass)}")
        print(f"   MyClass의 ID: {id(MyClass)}")
        print(f"   MyClass는 객체인가? {isinstance(MyClass, object)}")
        
        # 클래스에 동적으로 속성 추가
        MyClass.dynamic_attribute = "동적으로 추가된 속성"
        print(f"   동적 속성: {MyClass.dynamic_attribute}")
        
        # 클래스를 변수에 할당
        ClassAlias = MyClass
        print(f"   클래스 별명: {ClassAlias}")
        print(f"   같은 객체인가? {ClassAlias is MyClass}")
        
        return MyClass
    
    def explore_metaclass_hierarchy(self):
        """메타클래스 계층 구조 탐색"""
        print("\n2. 메타클래스 계층 구조:")
        
        class ExampleClass:
            pass
        
        obj = ExampleClass()
        
        # 객체 → 클래스 → 메타클래스 관계
        print(f"   객체: {obj}")
        print(f"   객체의 타입 (클래스): {type(obj)}")
        print(f"   클래스의 타입 (메타클래스): {type(ExampleClass)}")
        print(f"   메타클래스의 타입: {type(type(ExampleClass))}")
        
        # __class__와 type()의 관계
        print(f"   obj.__class__: {obj.__class__}")
        print(f"   type(obj): {type(obj)}")
        print(f"   같은가? {obj.__class__ is type(obj)}")
        
        # 메타클래스 체인
        print("\n   메타클래스 체인:")
        current = obj
        level = 0
        while hasattr(current, '__class__'):
            print(f"     레벨 {level}: {current} → {type(current)}")
            current = type(current)
            level += 1
            if level > 5:  # 무한 루프 방지
                print("     ... (계속)")
                break
    
    def demonstrate_type_function(self):
        """type() 함수의 두 가지 용도"""
        print("\n3. type() 함수의 두 가지 용도:")
        
        # 1. 타입 확인
        print("   타입 확인 용도:")
        values = [42, "hello", [1, 2, 3], {"key": "value"}]
        for val in values:
            print(f"     type({val!r}) = {type(val)}")
        
        # 2. 동적 클래스 생성
        print("\n   동적 클래스 생성 용도:")
        
        # type(name, bases, dict) 형태로 클래스 생성
        DynamicClass = type('DynamicClass', (), {
            'class_var': 'I am dynamic!',
            'instance_method': lambda self: f"Instance method called on {self}",
            'class_method': classmethod(lambda cls: f"Class method called on {cls}"),
            'static_method': staticmethod(lambda: "Static method called")
        })
        
        print(f"     동적 생성된 클래스: {DynamicClass}")
        print(f"     클래스 변수: {DynamicClass.class_var}")
        
        # 인스턴스 생성 및 사용
        obj = DynamicClass()
        print(f"     인스턴스: {obj}")
        print(f"     인스턴스 메서드: {obj.instance_method()}")
        print(f"     클래스 메서드: {DynamicClass.class_method()}")
        print(f"     정적 메서드: {DynamicClass.static_method()}")
        
        return DynamicClass

def demonstrate_class_nature():
    """클래스의 본질 시연"""
    inspector = ClassInspector()
    
    # 클래스가 객체임을 증명
    my_class = inspector.inspect_class_nature()
    
    # 메타클래스 계층 구조 탐색
    inspector.explore_metaclass_hierarchy()
    
    # type() 함수의 활용
    dynamic_class = inspector.demonstrate_type_function()
    
    return inspector, my_class, dynamic_class

demonstrate_class_nature()
```

### 1.2 커스텀 메타클래스 구현

```python
print("\n=== 커스텀 메타클래스 구현 ===")

class SingletonMeta(type):
    """싱글톤 패턴을 구현하는 메타클래스"""
    
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        """인스턴스 생성을 제어하여 싱글톤 보장"""
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
            print(f"   새로운 {cls.__name__} 인스턴스 생성: {id(instance)}")
        else:
            print(f"   기존 {cls.__name__} 인스턴스 반환: {id(cls._instances[cls])}")
        
        return cls._instances[cls]
    
    def __new__(mcs, name, bases, namespace, **kwargs):
        """클래스 생성 과정을 커스터마이징"""
        print(f"   메타클래스가 {name} 클래스를 생성 중...")
        
        # 클래스에 메타데이터 추가
        namespace['_singleton_created'] = False
        namespace['_creation_timestamp'] = __import__('time').time()
        
        cls = super().__new__(mcs, name, bases, namespace)
        print(f"   {name} 클래스 생성 완료: {cls}")
        
        return cls

class ValidatedMeta(type):
    """속성 검증을 자동화하는 메타클래스"""
    
    def __new__(mcs, name, bases, namespace, **kwargs):
        """클래스 생성 시 검증 로직 자동 추가"""
        
        # 검증 규칙 수집
        validators = {}
        for key, value in list(namespace.items()):
            if key.startswith('validate_'):
                field_name = key[9:]  # 'validate_' 제거
                validators[field_name] = value
                del namespace[key]  # 검증 함수는 클래스에서 제거
        
        # __setattr__ 메서드 자동 생성
        def __setattr__(self, name, value):
            if name in validators:
                if not validators[name](value):
                    raise ValueError(f"Invalid value for {name}: {value}")
            super(cls, self).__setattr__(name, value)
        
        if validators:
            namespace['__setattr__'] = __setattr__
            namespace['_validators'] = validators
        
        cls = super().__new__(mcs, name, bases, namespace)
        print(f"   {name} 클래스에 {len(validators)}개 검증 규칙 적용")
        
        return cls

class AttributeTrackingMeta(type):
    """속성 접근을 추적하는 메타클래스"""
    
    def __new__(mcs, name, bases, namespace, **kwargs):
        """속성 접근 추적 기능 추가"""
        
        # 추적할 속성들 식별
        tracked_attrs = [key for key in namespace.keys() 
                        if not key.startswith('_') and not callable(namespace[key])]
        
        # 각 속성에 대한 접근 카운터 초기화
        access_counters = {attr: 0 for attr in tracked_attrs}
        namespace['_access_counters'] = access_counters
        
        # __getattribute__ 오버라이드
        original_getattribute = namespace.get('__getattribute__', object.__getattribute__)
        
        def __getattribute__(self, name):
            if hasattr(self, '_access_counters') and name in self._access_counters:
                self._access_counters[name] += 1
                print(f"     속성 '{name}' 접근됨 (총 {self._access_counters[name]}회)")
            return original_getattribute(self, name)
        
        namespace['__getattribute__'] = __getattribute__
        
        # 통계 조회 메서드 추가
        def get_access_stats(self):
            return dict(self._access_counters)
        
        namespace['get_access_stats'] = get_access_stats
        
        cls = super().__new__(mcs, name, bases, namespace)
        print(f"   {name} 클래스에 {len(tracked_attrs)}개 속성 추적 기능 추가")
        
        return cls

def demonstrate_metaclasses():
    """메타클래스 시연"""
    print("\n1. 싱글톤 메타클래스:")
    
    class DatabaseConnection(metaclass=SingletonMeta):
        def __init__(self, host="localhost"):
            if not self._singleton_created:
                self.host = host
                self.connected = True
                self._singleton_created = True
                print(f"     데이터베이스 연결 초기화: {host}")
    
    # 싱글톤 테스트
    db1 = DatabaseConnection("server1")
    db2 = DatabaseConnection("server2")  # 무시됨
    db3 = DatabaseConnection()
    
    print(f"   db1 is db2: {db1 is db2}")
    print(f"   db2 is db3: {db2 is db3}")
    print(f"   모든 인스턴스의 host: {db1.host}")
    
    print("\n2. 검증 메타클래스:")
    
    class Person(metaclass=ValidatedMeta):
        def __init__(self, name, age, email):
            self.name = name
            self.age = age
            self.email = email
        
        # 검증 함수들 (메타클래스가 자동으로 처리)
        def validate_name(value):
            return isinstance(value, str) and len(value) > 0
        
        def validate_age(value):
            return isinstance(value, int) and 0 <= value <= 150
        
        def validate_email(value):
            return isinstance(value, str) and '@' in value
    
    # 검증 테스트
    try:
        person = Person("Alice", 30, "alice@example.com")
        print(f"   유효한 Person 생성: {person.name}")
        
        person.age = 25  # 유효
        print(f"   나이 변경 성공: {person.age}")
        
        person.age = -5  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    print("\n3. 속성 추적 메타클래스:")
    
    class Product(metaclass=AttributeTrackingMeta):
        def __init__(self, name, price):
            self.name = name
            self.price = price
            self.category = "general"
    
    product = Product("Laptop", 1000)
    
    # 속성 접근으로 추적 테스트
    print(f"   상품명: {product.name}")
    print(f"   가격: {product.price}")
    print(f"   상품명 다시: {product.name}")
    print(f"   카테고리: {product.category}")
    
    # 접근 통계 확인
    stats = product.get_access_stats()
    print(f"   접근 통계: {stats}")

demonstrate_metaclasses()
```

## 2. 디스크립터 프로토콜

### 2.1 디스크립터 기초

```python
print("\n=== 디스크립터 프로토콜 ===")

class BasicDescriptor:
    """기본 디스크립터 구현"""
    
    def __init__(self, name=None):
        self.name = name
        self.data = {}
    
    def __get__(self, obj, objtype=None):
        """속성 읽기 시 호출"""
        if obj is None:
            return self
        
        value = self.data.get(id(obj), None)
        print(f"   디스크립터 __get__ 호출: {self.name} = {value}")
        return value
    
    def __set__(self, obj, value):
        """속성 쓰기 시 호출"""
        print(f"   디스크립터 __set__ 호출: {self.name} = {value}")
        self.data[id(obj)] = value
    
    def __delete__(self, obj):
        """속성 삭제 시 호출"""
        print(f"   디스크립터 __delete__ 호출: {self.name}")
        if id(obj) in self.data:
            del self.data[id(obj)]

class TypedDescriptor:
    """타입 검증 디스크립터"""
    
    def __init__(self, expected_type, name=None):
        self.expected_type = expected_type
        self.name = name
        self.data = {}
    
    def __set_name__(self, owner, name):
        """Python 3.6+에서 자동으로 호출되는 메서드"""
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.data.get(id(obj))
    
    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"{self.name}는 {self.expected_type.__name__} 타입이어야 합니다")
        self.data[id(obj)] = value
    
    def __delete__(self, obj):
        if id(obj) in self.data:
            del self.data[id(obj)]

class RangeDescriptor:
    """범위 검증 디스크립터"""
    
    def __init__(self, min_value=None, max_value=None, name=None):
        self.min_value = min_value
        self.max_value = max_value
        self.name = name
        self.data = {}
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return self.data.get(id(obj))
    
    def __set__(self, obj, value):
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"{self.name}는 {self.min_value} 이상이어야 합니다")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"{self.name}는 {self.max_value} 이하여야 합니다")
        self.data[id(obj)] = value
    
    def __delete__(self, obj):
        if id(obj) in self.data:
            del self.data[id(obj)]

class LoggingDescriptor:
    """접근 로깅 디스크립터"""
    
    def __init__(self, name=None):
        self.name = name
        self.data = {}
        self.access_log = []
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        import time
        timestamp = time.time()
        self.access_log.append(('get', timestamp, id(obj)))
        print(f"   [{timestamp:.3f}] GET {self.name} from {obj.__class__.__name__}")
        
        return self.data.get(id(obj))
    
    def __set__(self, obj, value):
        import time
        timestamp = time.time()
        self.access_log.append(('set', timestamp, id(obj), value))
        print(f"   [{timestamp:.3f}] SET {self.name} = {value} on {obj.__class__.__name__}")
        
        self.data[id(obj)] = value
    
    def get_access_log(self):
        """접근 로그 반환"""
        return self.access_log.copy()

def demonstrate_descriptors():
    """디스크립터 시연"""
    print("\n1. 기본 디스크립터:")
    
    class TestClass:
        attr = BasicDescriptor("attr")
    
    obj1 = TestClass()
    obj2 = TestClass()
    
    # 속성 설정과 읽기
    obj1.attr = "value1"
    obj2.attr = "value2"
    
    print(f"   obj1.attr: {obj1.attr}")
    print(f"   obj2.attr: {obj2.attr}")
    
    # 클래스 레벨에서 디스크립터 자체 접근
    print(f"   TestClass.attr: {TestClass.attr}")
    
    print("\n2. 타입 검증 디스크립터:")
    
    class Person:
        name = TypedDescriptor(str)
        age = TypedDescriptor(int)
        height = TypedDescriptor(float)
    
    person = Person()
    
    try:
        person.name = "Alice"
        person.age = 30
        person.height = 165.5
        
        print(f"   이름: {person.name}")
        print(f"   나이: {person.age}")
        print(f"   키: {person.height}")
        
        person.age = "thirty"  # 오류 발생
    except TypeError as e:
        print(f"   타입 오류: {e}")
    
    print("\n3. 범위 검증 디스크립터:")
    
    class Temperature:
        celsius = RangeDescriptor(-273.15, None)  # 절대영도 이상
        fahrenheit = RangeDescriptor(-459.67, None)  # 절대영도 이상
    
    temp = Temperature()
    
    try:
        temp.celsius = 25.0
        temp.fahrenheit = 77.0
        
        print(f"   섭씨: {temp.celsius}°C")
        print(f"   화씨: {temp.fahrenheit}°F")
        
        temp.celsius = -300  # 오류 발생
    except ValueError as e:
        print(f"   범위 오류: {e}")
    
    print("\n4. 로깅 디스크립터:")
    
    class BankAccount:
        balance = LoggingDescriptor()
    
    account = BankAccount()
    
    account.balance = 1000
    account.balance = 1500
    current_balance = account.balance
    
    # 접근 로그 확인
    log = BankAccount.balance.get_access_log()
    print(f"   총 접근 횟수: {len(log)}")

demonstrate_descriptors()
```

### 2.2 고급 디스크립터 패턴

```python
print("\n=== 고급 디스크립터 패턴 ===")

class CachedProperty:
    """계산 결과를 캐시하는 프로퍼티 디스크립터"""
    
    def __init__(self, func):
        self.func = func
        self.attrname = None
        self.__doc__ = func.__doc__
    
    def __set_name__(self, owner, name):
        self.attrname = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        # 캐시된 값이 있는지 확인
        cache_attr = f'_cached_{self.attrname}'
        if hasattr(obj, cache_attr):
            print(f"   캐시된 값 반환: {self.attrname}")
            return getattr(obj, cache_attr)
        
        # 값 계산 및 캐시
        print(f"   값 계산 중: {self.attrname}")
        value = self.func(obj)
        setattr(obj, cache_attr, value)
        return value
    
    def __delete__(self, obj):
        # 캐시 삭제
        cache_attr = f'_cached_{self.attrname}'
        if hasattr(obj, cache_attr):
            delattr(obj, cache_attr)
            print(f"   캐시 삭제됨: {self.attrname}")

class LazyProperty:
    """지연 로딩 프로퍼티 디스크립터"""
    
    def __init__(self, func):
        self.func = func
        self.attrname = None
        self.__doc__ = func.__doc__
    
    def __set_name__(self, owner, name):
        self.attrname = name
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        
        # 이미 로드된 값이 있는지 확인
        private_name = f'_{self.attrname}'
        if hasattr(obj, private_name):
            return getattr(obj, private_name)
        
        # 지연 로딩 수행
        print(f"   지연 로딩 수행: {self.attrname}")
        value = self.func(obj)
        setattr(obj, private_name, value)
        return value
    
    def __set__(self, obj, value):
        private_name = f'_{self.attrname}'
        setattr(obj, private_name, value)
    
    def __delete__(self, obj):
        private_name = f'_{self.attrname}'
        if hasattr(obj, private_name):
            delattr(obj, private_name)

class ValidatedProperty:
    """검증 로직이 포함된 프로퍼티 디스크립터"""
    
    def __init__(self, validator=None, transformer=None):
        self.validator = validator
        self.transformer = transformer
        self.name = None
    
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f'_{name}'
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)
    
    def __set__(self, obj, value):
        # 변환 적용
        if self.transformer:
            value = self.transformer(value)
            print(f"   값 변환 적용: {self.name}")
        
        # 검증 수행
        if self.validator and not self.validator(value):
            raise ValueError(f"Invalid value for {self.name}: {value}")
        
        setattr(obj, self.private_name, value)
        print(f"   검증된 값 설정: {self.name} = {value}")
    
    def __delete__(self, obj):
        if hasattr(obj, self.private_name):
            delattr(obj, self.private_name)

class ObservableProperty:
    """변경 시 이벤트를 발생시키는 프로퍼티 디스크립터"""
    
    def __init__(self, initial_value=None):
        self.initial_value = initial_value
        self.name = None
        self.observers = []
    
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f'_{name}'
    
    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, self.initial_value)
    
    def __set__(self, obj, value):
        old_value = getattr(obj, self.private_name, self.initial_value)
        setattr(obj, self.private_name, value)
        
        # 변경 이벤트 발생
        if old_value != value:
            self._notify_observers(obj, old_value, value)
    
    def _notify_observers(self, obj, old_value, new_value):
        """관찰자들에게 변경 사항 통지"""
        for observer in self.observers:
            observer(obj, self.name, old_value, new_value)
        print(f"   {len(self.observers)}명의 관찰자에게 변경 통지: {self.name}")
    
    def add_observer(self, observer):
        """관찰자 추가"""
        self.observers.append(observer)
    
    def remove_observer(self, observer):
        """관찰자 제거"""
        if observer in self.observers:
            self.observers.remove(observer)

def demonstrate_advanced_descriptors():
    """고급 디스크립터 패턴 시연"""
    print("\n1. 캐시 프로퍼티:")
    
    class DataProcessor:
        @CachedProperty
        def expensive_calculation(self):
            """비용이 큰 계산 시뮬레이션"""
            import time
            time.sleep(0.1)  # 시뮬레이션
            return sum(i * i for i in range(1000))
    
    processor = DataProcessor()
    
    # 첫 번째 접근 (계산 수행)
    result1 = processor.expensive_calculation
    print(f"   첫 번째 결과: {result1}")
    
    # 두 번째 접근 (캐시 사용)
    result2 = processor.expensive_calculation
    print(f"   두 번째 결과: {result2}")
    
    # 캐시 삭제
    del processor.expensive_calculation
    
    # 세 번째 접근 (다시 계산)
    result3 = processor.expensive_calculation
    print(f"   세 번째 결과: {result3}")
    
    print("\n2. 지연 로딩 프로퍼티:")
    
    class DatabaseRecord:
        @LazyProperty
        def large_data(self):
            """큰 데이터 지연 로딩 시뮬레이션"""
            print("     대용량 데이터 로딩 중...")
            return ["data"] * 1000
        
        @LazyProperty
        def computed_field(self):
            """계산된 필드"""
            return len(self.large_data) * 2
    
    record = DatabaseRecord()
    print(f"   레코드 생성됨")
    
    # 실제 접근 시에만 로딩
    data_size = len(record.large_data)
    print(f"   데이터 크기: {data_size}")
    
    computed = record.computed_field
    print(f"   계산된 필드: {computed}")
    
    print("\n3. 검증 프로퍼티:")
    
    class User:
        # 이메일 검증 및 정규화
        email = ValidatedProperty(
            validator=lambda x: isinstance(x, str) and '@' in x,
            transformer=lambda x: x.lower().strip()
        )
        
        # 나이 검증
        age = ValidatedProperty(
            validator=lambda x: isinstance(x, int) and 0 <= x <= 150
        )
    
    user = User()
    
    try:
        user.email = "  ALICE@EXAMPLE.COM  "
        print(f"   정규화된 이메일: {user.email}")
        
        user.age = 25
        print(f"   유효한 나이: {user.age}")
        
        user.age = 200  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    print("\n4. 관찰 가능한 프로퍼티:")
    
    # 관찰자 함수들
    def log_change(obj, attr_name, old_value, new_value):
        print(f"     로그: {attr_name} 변경됨 {old_value} → {new_value}")
    
    def validate_change(obj, attr_name, old_value, new_value):
        if attr_name == 'balance' and new_value < 0:
            print(f"     경고: 잔액이 음수가 되었습니다!")
    
    class Account:
        balance = ObservableProperty(0)
        name = ObservableProperty("")
    
    # 관찰자 등록
    Account.balance.add_observer(log_change)
    Account.balance.add_observer(validate_change)
    Account.name.add_observer(log_change)
    
    account = Account()
    
    account.name = "Alice"
    account.balance = 1000
    account.balance = 500
    account.balance = -100  # 경고 발생

demonstrate_advanced_descriptors()
```

## 3. property와 고급 속성 관리

### 3.1 property 데코레이터 심화

```python
print("\n=== property 데코레이터 심화 ===")

class SmartProperty:
    """지능형 프로퍼티 구현"""
    
    def __init__(self):
        self._value = None
        self._accessed_count = 0
        self._modified_count = 0
        self._history = []
    
    @property
    def value(self):
        """읽기 전용 접근자"""
        self._accessed_count += 1
        print(f"   value 읽기 (총 {self._accessed_count}회)")
        return self._value
    
    @value.setter
    def value(self, new_value):
        """설정자 with 히스토리 추적"""
        old_value = self._value
        self._value = new_value
        self._modified_count += 1
        self._history.append((old_value, new_value))
        print(f"   value 설정: {old_value} → {new_value} (총 {self._modified_count}회)")
    
    @value.deleter
    def value(self):
        """삭제자"""
        old_value = self._value
        self._value = None
        self._history.append((old_value, None))
        print(f"   value 삭제: {old_value}")
    
    @property
    def history(self):
        """변경 히스토리 조회"""
        return self._history.copy()
    
    @property
    def stats(self):
        """접근 통계"""
        return {
            'accessed': self._accessed_count,
            'modified': self._modified_count,
            'current_value': self._value
        }

class Circle:
    """원 클래스 with 계산된 프로퍼티"""
    
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """반지름"""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("반지름은 양수여야 합니다")
        self._radius = value
        print(f"   반지름 설정: {value}")
    
    @property
    def diameter(self):
        """지름 (계산된 프로퍼티)"""
        return self._radius * 2
    
    @diameter.setter
    def diameter(self, value):
        """지름으로부터 반지름 계산"""
        self.radius = value / 2
    
    @property
    def area(self):
        """넓이 (읽기 전용 계산된 프로퍼티)"""
        import math
        return math.pi * self._radius ** 2
    
    @property
    def circumference(self):
        """둘레 (읽기 전용 계산된 프로퍼티)"""
        import math
        return 2 * math.pi * self._radius

class Temperature:
    """온도 변환 클래스"""
    
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """섭씨 온도"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("절대영도 아래로 설정할 수 없습니다")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """화씨 온도 (계산된)"""
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """화씨로부터 섭씨 계산"""
        self.celsius = (value - 32) * 5/9
    
    @property
    def kelvin(self):
        """켈빈 온도 (계산된)"""
        return self._celsius + 273.15
    
    @kelvin.setter
    def kelvin(self, value):
        """켈빈으로부터 섭씨 계산"""
        self.celsius = value - 273.15
    
    def __str__(self):
        return f"{self.celsius:.1f}°C ({self.fahrenheit:.1f}°F, {self.kelvin:.1f}K)"

def demonstrate_advanced_properties():
    """고급 프로퍼티 기법 시연"""
    print("\n1. 지능형 프로퍼티:")
    
    smart = SmartProperty()
    
    # 값 설정과 읽기
    smart.value = 10
    smart.value = 20
    current = smart.value
    current_again = smart.value
    
    # 통계 및 히스토리 확인
    print(f"   통계: {smart.stats}")
    print(f"   히스토리: {smart.history}")
    
    # 값 삭제
    del smart.value
    print(f"   삭제 후 히스토리: {smart.history}")
    
    print("\n2. 계산된 프로퍼티 (원):")
    
    circle = Circle(5)
    
    print(f"   반지름: {circle.radius}")
    print(f"   지름: {circle.diameter}")
    print(f"   넓이: {circle.area:.2f}")
    print(f"   둘레: {circle.circumference:.2f}")
    
    # 지름으로 반지름 설정
    circle.diameter = 20
    print(f"   지름 설정 후 반지름: {circle.radius}")
    print(f"   새로운 넓이: {circle.area:.2f}")
    
    print("\n3. 온도 변환 프로퍼티:")
    
    temp = Temperature(25)
    print(f"   초기 온도: {temp}")
    
    # 화씨로 설정
    temp.fahrenheit = 100
    print(f"   화씨 100도 설정 후: {temp}")
    
    # 켈빈으로 설정
    temp.kelvin = 300
    print(f"   켈빈 300도 설정 후: {temp}")
    
    try:
        temp.celsius = -300  # 오류 발생
    except ValueError as e:
        print(f"   온도 오류: {e}")

demonstrate_advanced_properties()
```

### 3.2 동적 프로퍼티 생성

```python
print("\n=== 동적 프로퍼티 생성 ===")

def create_property(name, validator=None, default=None):
    """동적으로 프로퍼티를 생성하는 팩토리 함수"""
    private_name = f'_{name}'
    
    def getter(self):
        return getattr(self, private_name, default)
    
    def setter(self, value):
        if validator and not validator(value):
            raise ValueError(f"Invalid value for {name}: {value}")
        setattr(self, private_name, value)
    
    def deleter(self):
        if hasattr(self, private_name):
            delattr(self, private_name)
    
    return property(getter, setter, deleter, f"Property for {name}")

class PropertyFactory:
    """프로퍼티 생성 팩토리"""
    
    @staticmethod
    def typed_property(prop_type, name=None):
        """타입 검증 프로퍼티 생성"""
        def decorator(func_or_name):
            nonlocal name
            if isinstance(func_or_name, str):
                name = func_or_name
                private_name = f'_{name}'
                
                def getter(self):
                    return getattr(self, private_name, None)
                
                def setter(self, value):
                    if not isinstance(value, prop_type):
                        raise TypeError(f"{name} must be {prop_type.__name__}")
                    setattr(self, private_name, value)
                
                return property(getter, setter, doc=f"Typed property: {prop_type.__name__}")
            else:
                # 함수가 전달된 경우 (데코레이터로 사용)
                func = func_or_name
                name = name or func.__name__
                private_name = f'_{name}'
                
                def getter(self):
                    value = getattr(self, private_name, None)
                    if value is None:
                        value = func(self)
                        setattr(self, private_name, value)
                    return value
                
                def setter(self, value):
                    if not isinstance(value, prop_type):
                        raise TypeError(f"{name} must be {prop_type.__name__}")
                    setattr(self, private_name, value)
                
                return property(getter, setter, doc=func.__doc__)
        
        return decorator
    
    @staticmethod
    def cached_property(func):
        """캐시된 프로퍼티 생성"""
        cache_name = f'_cached_{func.__name__}'
        
        def getter(self):
            if not hasattr(self, cache_name):
                setattr(self, cache_name, func(self))
                print(f"   {func.__name__} 계산 및 캐시됨")
            else:
                print(f"   {func.__name__} 캐시에서 반환")
            return getattr(self, cache_name)
        
        def deleter(self):
            if hasattr(self, cache_name):
                delattr(self, cache_name)
                print(f"   {func.__name__} 캐시 삭제됨")
        
        return property(getter, fdel=deleter, doc=func.__doc__)
    
    @staticmethod
    def monitored_property(name, on_change=None):
        """변경 모니터링 프로퍼티 생성"""
        private_name = f'_{name}'
        
        def getter(self):
            return getattr(self, private_name, None)
        
        def setter(self, value):
            old_value = getattr(self, private_name, None)
            setattr(self, private_name, value)
            
            if on_change and old_value != value:
                on_change(self, name, old_value, value)
        
        return property(getter, setter, doc=f"Monitored property: {name}")

class DynamicPropertyMixin:
    """동적 프로퍼티 지원 믹스인"""
    
    def add_property(self, name, validator=None, default=None):
        """런타임에 프로퍼티 추가"""
        prop = create_property(name, validator, default)
        setattr(self.__class__, name, prop)
        print(f"   프로퍼티 '{name}' 동적 추가됨")
    
    def remove_property(self, name):
        """런타임에 프로퍼티 제거"""
        if hasattr(self.__class__, name):
            delattr(self.__class__, name)
            print(f"   프로퍼티 '{name}' 제거됨")
    
    def list_properties(self):
        """클래스의 모든 프로퍼티 나열"""
        properties = []
        for name in dir(self.__class__):
            attr = getattr(self.__class__, name)
            if isinstance(attr, property):
                properties.append(name)
        return properties

def demonstrate_dynamic_properties():
    """동적 프로퍼티 생성 시연"""
    print("\n1. 동적 프로퍼티 팩토리:")
    
    class Person:
        # 동적으로 생성된 프로퍼티들
        name = create_property('name', lambda x: isinstance(x, str) and len(x) > 0)
        age = create_property('age', lambda x: isinstance(x, int) and 0 <= x <= 150, 0)
        email = create_property('email', lambda x: '@' in x if x else True)
    
    person = Person()
    
    try:
        person.name = "Alice"
        person.age = 30
        person.email = "alice@example.com"
        
        print(f"   이름: {person.name}")
        print(f"   나이: {person.age}")
        print(f"   이메일: {person.email}")
        
        person.age = -5  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    print("\n2. 프로퍼티 팩토리 클래스:")
    
    class Product:
        # 타입 검증 프로퍼티
        name = PropertyFactory.typed_property(str)("name")
        price = PropertyFactory.typed_property(float)("price")
        
        # 캐시된 프로퍼티
        @PropertyFactory.cached_property
        def expensive_calculation(self):
            """비용이 큰 계산"""
            import time
            time.sleep(0.05)  # 시뮬레이션
            return self.price * 1.2 if self.price else 0
        
        # 모니터링 프로퍼티
        stock = PropertyFactory.monitored_property(
            'stock', 
            lambda obj, name, old, new: print(f"     재고 변경: {old} → {new}")
        )
    
    product = Product()
    
    product.name = "Laptop"
    product.price = 1000.0
    product.stock = 50
    product.stock = 45  # 모니터링 메시지 출력
    
    # 캐시된 프로퍼티 테스트
    calc1 = product.expensive_calculation
    calc2 = product.expensive_calculation  # 캐시에서 반환
    
    print(f"   계산 결과: {calc1}")
    
    # 캐시 삭제 후 다시 계산
    del product.expensive_calculation
    calc3 = product.expensive_calculation
    
    print("\n3. 동적 프로퍼티 믹스인:")
    
    class ConfigurableClass(DynamicPropertyMixin):
        """설정 가능한 클래스"""
        pass
    
    obj = ConfigurableClass()
    
    # 기존 프로퍼티 목록
    print(f"   초기 프로퍼티: {obj.list_properties()}")
    
    # 동적으로 프로퍼티 추가
    obj.add_property('username', lambda x: len(x) >= 3 if x else False)
    obj.add_property('score', lambda x: 0 <= x <= 100 if isinstance(x, (int, float)) else False, 0)
    
    print(f"   추가 후 프로퍼티: {obj.list_properties()}")
    
    # 동적 프로퍼티 사용
    try:
        obj.username = "alice"
        obj.score = 85
        
        print(f"   사용자명: {obj.username}")
        print(f"   점수: {obj.score}")
        
        obj.username = "ab"  # 오류 발생
    except ValueError as e:
        print(f"   동적 프로퍼티 검증 오류: {e}")

demonstrate_dynamic_properties()
```

## 4. __new__ vs __init__

### 4.1 객체 생성 과정 이해

```python
print("\n=== __new__ vs __init__ ===")

class ObjectCreationDemo:
    """객체 생성 과정 시연"""
    
    def __new__(cls, *args, **kwargs):
        """인스턴스 생성 단계"""
        print(f"   1. __new__ 호출됨: {cls.__name__}")
        print(f"      args: {args}")
        print(f"      kwargs: {kwargs}")
        
        # 실제 인스턴스 생성
        instance = super().__new__(cls)
        print(f"      생성된 인스턴스: {id(instance)}")
        
        # __new__에서도 속성을 설정할 수 있음
        instance._created_by_new = True
        
        return instance
    
    def __init__(self, name, value):
        """인스턴스 초기화 단계"""
        print(f"   2. __init__ 호출됨: {id(self)}")
        print(f"      이미 생성된 인스턴스: {hasattr(self, '_created_by_new')}")
        
        self.name = name
        self.value = value
        print(f"      초기화 완료: {self.name} = {self.value}")

class ImmutablePoint:
    """불변 점 클래스 (__new__ 활용)"""
    
    def __new__(cls, x, y):
        """좌표 유효성 검사 후 인스턴스 생성"""
        if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
            raise TypeError("좌표는 숫자여야 합니다")
        
        instance = super().__new__(cls)
        
        # __new__에서 속성 설정 (불변 객체를 위해)
        instance._x = float(x)
        instance._y = float(y)
        
        print(f"   불변 점 생성: ({x}, {y})")
        return instance
    
    def __init__(self, x, y):
        """__init__는 이미 설정된 속성을 확인만 함"""
        # 불변 객체이므로 __init__에서는 검증만
        if hasattr(self, '_x') and hasattr(self, '_y'):
            print(f"   점 초기화 완료: ({self._x}, {self._y})")
    
    @property
    def x(self):
        return self._x
    
    @property
    def y(self):
        return self._y
    
    def __repr__(self):
        return f"ImmutablePoint({self.x}, {self.y})"

class Singleton:
    """싱글톤 패턴 (__new__ 활용)"""
    
    _instance = None
    _initialized = False
    
    def __new__(cls, *args, **kwargs):
        """인스턴스가 없으면 생성, 있으면 기존 반환"""
        if cls._instance is None:
            print(f"   새로운 {cls.__name__} 인스턴스 생성")
            cls._instance = super().__new__(cls)
        else:
            print(f"   기존 {cls.__name__} 인스턴스 반환")
        
        return cls._instance
    
    def __init__(self, name="default"):
        """최초 한 번만 초기화"""
        if not self._initialized:
            self.name = name
            self._initialized = True
            print(f"   싱글톤 초기화: {self.name}")
        else:
            print(f"   싱글톤 이미 초기화됨: {self.name}")

class CachedString(str):
    """캐시된 문자열 클래스"""
    
    _cache = {}
    
    def __new__(cls, value):
        """동일한 문자열은 캐시에서 재사용"""
        if value in cls._cache:
            print(f"   캐시에서 문자열 반환: '{value}'")
            return cls._cache[value]
        
        print(f"   새로운 문자열 생성: '{value}'")
        instance = super().__new__(cls, value)
        cls._cache[value] = instance
        
        return instance
    
    def __init__(self, value):
        """str은 불변이므로 __init__는 비어있음"""
        pass
    
    @classmethod
    def cache_info(cls):
        """캐시 정보 반환"""
        return {
            'size': len(cls._cache),
            'keys': list(cls._cache.keys())
        }

def demonstrate_new_vs_init():
    """__new__ vs __init__ 시연"""
    print("\n1. 기본 객체 생성 과정:")
    
    obj = ObjectCreationDemo("test", 42)
    print(f"   최종 객체: {obj}")
    
    print("\n2. 불변 객체 생성:")
    
    try:
        point1 = ImmutablePoint(3, 4)
        point2 = ImmutablePoint(0, 0)
        
        print(f"   점1: {point1}")
        print(f"   점2: {point2}")
        print(f"   점1.x: {point1.x}")
        print(f"   점1.y: {point1.y}")
        
        # 잘못된 타입으로 생성 시도
        point3 = ImmutablePoint("invalid", 1)
    except TypeError as e:
        print(f"   타입 오류: {e}")
    
    print("\n3. 싱글톤 패턴:")
    
    singleton1 = Singleton("first")
    singleton2 = Singleton("second")  # 무시됨
    singleton3 = Singleton("third")   # 무시됨
    
    print(f"   singleton1 is singleton2: {singleton1 is singleton2}")
    print(f"   singleton2 is singleton3: {singleton2 is singleton3}")
    print(f"   모든 인스턴스의 이름: {singleton1.name}")
    
    print("\n4. 캐시된 문자열:")
    
    str1 = CachedString("hello")
    str2 = CachedString("world")
    str3 = CachedString("hello")  # 캐시에서 반환
    str4 = CachedString("world")  # 캐시에서 반환
    
    print(f"   str1 is str3 (같은 'hello'): {str1 is str3}")
    print(f"   str2 is str4 (같은 'world'): {str2 is str4}")
    print(f"   캐시 정보: {CachedString.cache_info()}")

demonstrate_new_vs_init()
```

### 4.2 고급 객체 생성 패턴

```python
print("\n=== 고급 객체 생성 패턴 ===")

class Factory:
    """팩토리 패턴을 위한 기본 클래스"""
    
    _product_types = {}
    
    def __new__(cls, product_type, *args, **kwargs):
        """제품 타입에 따라 다른 클래스 인스턴스 생성"""
        if product_type not in cls._product_types:
            raise ValueError(f"알 수 없는 제품 타입: {product_type}")
        
        product_class = cls._product_types[product_type]
        print(f"   팩토리: {product_type} → {product_class.__name__} 생성")
        
        return product_class(*args, **kwargs)
    
    @classmethod
    def register_product(cls, product_type, product_class):
        """제품 타입 등록"""
        cls._product_types[product_type] = product_class
        print(f"   제품 타입 등록: {product_type} → {product_class.__name__}")

# 제품 클래스들
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def __repr__(self):
        return f"Car({self.brand}, {self.model})"

class Motorcycle:
    def __init__(self, brand, engine_size):
        self.brand = brand
        self.engine_size = engine_size
    
    def __repr__(self):
        return f"Motorcycle({self.brand}, {self.engine_size}cc)"

class Truck:
    def __init__(self, brand, capacity):
        self.brand = brand
        self.capacity = capacity
    
    def __repr__(self):
        return f"Truck({self.brand}, {self.capacity}톤)"

class ObjectPool:
    """객체 풀 패턴"""
    
    def __init__(self, factory_func, max_size=10):
        self._factory = factory_func
        self._pool = []
        self._max_size = max_size
        self._created_count = 0
        self._reused_count = 0
    
    def __new__(cls, factory_func, max_size=10):
        """풀 인스턴스 생성"""
        instance = super().__new__(cls)
        return instance
    
    def acquire(self):
        """객체 획득"""
        if self._pool:
            obj = self._pool.pop()
            self._reused_count += 1
            print(f"   풀에서 객체 재사용: {id(obj)}")
            return obj
        else:
            obj = self._factory()
            self._created_count += 1
            print(f"   새 객체 생성: {id(obj)}")
            return obj
    
    def release(self, obj):
        """객체 반환"""
        if len(self._pool) < self._max_size:
            # 객체 재설정
            if hasattr(obj, 'reset'):
                obj.reset()
            self._pool.append(obj)
            print(f"   객체 풀에 반환: {id(obj)}")
        else:
            print(f"   풀이 가득참, 객체 삭제: {id(obj)}")
    
    def stats(self):
        """풀 통계"""
        return {
            'pool_size': len(self._pool),
            'created': self._created_count,
            'reused': self._reused_count,
            'efficiency': self._reused_count / (self._created_count + self._reused_count) * 100 if self._created_count + self._reused_count > 0 else 0
        }

class PooledConnection:
    """풀링될 연결 객체"""
    
    def __init__(self):
        self.connected = True
        self.queries_executed = 0
    
    def execute_query(self, query):
        """쿼리 실행 시뮬레이션"""
        if self.connected:
            self.queries_executed += 1
            return f"Query executed: {query}"
        else:
            raise RuntimeError("Connection is closed")
    
    def reset(self):
        """풀 반환 시 재설정"""
        self.queries_executed = 0
        print(f"     연결 재설정됨")
    
    def close(self):
        """연결 닫기"""
        self.connected = False

class ConditionalCreation:
    """조건부 객체 생성"""
    
    def __new__(cls, condition, *args, **kwargs):
        """조건에 따라 생성 여부 결정"""
        if not condition:
            print(f"   조건 불만족으로 {cls.__name__} 생성 안함")
            return None
        
        print(f"   조건 만족으로 {cls.__name__} 생성")
        return super().__new__(cls)
    
    def __init__(self, condition, value):
        if condition:  # __new__에서 None을 반환했다면 __init__도 호출되지 않음
            self.value = value
            print(f"   조건부 객체 초기화: {self.value}")

def demonstrate_advanced_creation_patterns():
    """고급 객체 생성 패턴 시연"""
    print("\n1. 팩토리 패턴:")
    
    # 제품 타입 등록
    Factory.register_product("car", Car)
    Factory.register_product("motorcycle", Motorcycle)
    Factory.register_product("truck", Truck)
    
    # 팩토리를 통한 객체 생성
    try:
        vehicle1 = Factory("car", "Toyota", "Camry")
        vehicle2 = Factory("motorcycle", "Honda", 600)
        vehicle3 = Factory("truck", "Volvo", 20)
        
        print(f"   생성된 차량들:")
        print(f"     {vehicle1}")
        print(f"     {vehicle2}")
        print(f"     {vehicle3}")
        
        vehicle4 = Factory("plane", "Boeing", "747")  # 오류 발생
    except ValueError as e:
        print(f"   팩토리 오류: {e}")
    
    print("\n2. 객체 풀 패턴:")
    
    # 연결 풀 생성
    connection_pool = ObjectPool(PooledConnection, max_size=3)
    
    # 객체들 획득
    connections = []
    for i in range(5):
        conn = connection_pool.acquire()
        connections.append(conn)
        if conn:
            result = conn.execute_query(f"SELECT * FROM table{i}")
    
    # 객체들 반환
    for conn in connections[:3]:
        connection_pool.release(conn)
    
    # 풀 통계
    print(f"   풀 통계: {connection_pool.stats()}")
    
    # 재사용 테스트
    conn_reused = connection_pool.acquire()
    print(f"   재사용된 연결의 쿼리 수: {conn_reused.queries_executed}")
    
    print("\n3. 조건부 객체 생성:")
    
    # 조건에 따른 생성
    obj1 = ConditionalCreation(True, "success")
    obj2 = ConditionalCreation(False, "failure")
    obj3 = ConditionalCreation(1 > 0, "conditional success")
    obj4 = ConditionalCreation(1 > 2, "conditional failure")
    
    print(f"   생성된 객체들:")
    print(f"     obj1: {obj1}")
    print(f"     obj2: {obj2}")
    print(f"     obj3: {obj3}")
    print(f"     obj4: {obj4}")
    
    # None이 아닌 객체들의 값 확인
    for name, obj in [("obj1", obj1), ("obj3", obj3)]:
        if obj is not None:
            print(f"     {name}.value: {obj.value}")

demonstrate_advanced_creation_patterns()
```

## 5. 동적 클래스 생성과 수정

### 5.1 동적 클래스 생성

```python
print("\n=== 동적 클래스 생성과 수정 ===")

class ClassBuilder:
    """동적 클래스 생성 도구"""
    
    def __init__(self):
        self.created_classes = {}
    
    def create_data_class(self, class_name, fields, validation_rules=None):
        """데이터 클래스 동적 생성"""
        print(f"\n동적 데이터 클래스 생성: {class_name}")
        
        # __init__ 메서드 생성
        def __init__(self, **kwargs):
            for field in fields:
                value = kwargs.get(field.name, field.default)
                
                # 유효성 검사
                if validation_rules and field.name in validation_rules:
                    validator = validation_rules[field.name]
                    if not validator(value):
                        raise ValueError(f"Invalid value for {field.name}: {value}")
                
                setattr(self, field.name, value)
        
        # __repr__ 메서드 생성
        def __repr__(self):
            field_strs = []
            for field in fields:
                value = getattr(self, field.name, None)
                field_strs.append(f"{field.name}={value!r}")
            return f"{class_name}({', '.join(field_strs)})"
        
        # __eq__ 메서드 생성
        def __eq__(self, other):
            if not isinstance(other, self.__class__):
                return False
            for field in fields:
                if getattr(self, field.name) != getattr(other, field.name):
                    return False
            return True
        
        # 프로퍼티 생성
        properties = {}
        for field in fields:
            if field.read_only:
                # 읽기 전용 프로퍼티
                properties[field.name] = property(
                    lambda self, fname=field.name: getattr(self, f'_{fname}'),
                    doc=f"Read-only property: {field.name}"
                )
        
        # 클래스 네임스페이스 구성
        namespace = {
            '__init__': __init__,
            '__repr__': __repr__,
            '__eq__': __eq__,
            '_fields': fields,
            **properties
        }
        
        # 클래스 생성
        cls = type(class_name, (object,), namespace)
        self.created_classes[class_name] = cls
        
        print(f"   필드: {[f.name for f in fields]}")
        print(f"   생성된 클래스: {cls}")
        
        return cls
    
    def create_enum_class(self, class_name, values):
        """열거형 클래스 동적 생성"""
        print(f"\n동적 열거형 클래스 생성: {class_name}")
        
        # 각 값을 클래스 속성으로 추가
        namespace = {}
        for i, value in enumerate(values):
            namespace[value.upper()] = i
        
        # 유틸리티 메서드들
        def get_name(cls, value):
            for name, val in cls.__dict__.items():
                if val == value and not name.startswith('_'):
                    return name
            return None
        
        def get_values(cls):
            return [val for name, val in cls.__dict__.items() 
                   if not name.startswith('_') and not callable(val)]
        
        namespace.update({
            'get_name': classmethod(get_name),
            'get_values': classmethod(get_values),
            '_values': values
        })
        
        cls = type(class_name, (object,), namespace)
        self.created_classes[class_name] = cls
        
        print(f"   값들: {values}")
        print(f"   생성된 열거형: {cls}")
        
        return cls
    
    def create_proxy_class(self, class_name, target_class, interceptors=None):
        """프록시 클래스 동적 생성"""
        print(f"\n프록시 클래스 생성: {class_name} → {target_class.__name__}")
        
        def __init__(self, *args, **kwargs):
            self._target = target_class(*args, **kwargs)
            self._access_log = []
        
        def __getattr__(self, name):
            # 접근 로깅
            self._access_log.append(('get', name))
            
            # 인터셉터 실행
            if interceptors and 'get' in interceptors:
                result = interceptors['get'](self._target, name)
                if result is not None:
                    return result
            
            return getattr(self._target, name)
        
        def __setattr__(self, name, value):
            if name.startswith('_'):
                super(cls, self).__setattr__(name, value)
                return
            
            # 접근 로깅
            if hasattr(self, '_access_log'):
                self._access_log.append(('set', name, value))
            
            # 인터셉터 실행
            if interceptors and 'set' in interceptors:
                if interceptors['set'](self._target, name, value):
                    return
            
            setattr(self._target, name, value)
        
        def get_access_log(self):
            return self._access_log.copy()
        
        namespace = {
            '__init__': __init__,
            '__getattr__': __getattr__,
            '__setattr__': __setattr__,
            'get_access_log': get_access_log,
            '_target_class': target_class
        }
        
        cls = type(class_name, (object,), namespace)
        self.created_classes[class_name] = cls
        
        return cls

class Field:
    """필드 정의 클래스"""
    
    def __init__(self, name, field_type=None, default=None, read_only=False):
        self.name = name
        self.field_type = field_type
        self.default = default
        self.read_only = read_only
    
    def __repr__(self):
        return f"Field({self.name}, {self.field_type}, default={self.default})"

def demonstrate_dynamic_class_creation():
    """동적 클래스 생성 시연"""
    builder = ClassBuilder()
    
    print("\n1. 동적 데이터 클래스:")
    
    # 필드 정의
    person_fields = [
        Field('name', str, ''),
        Field('age', int, 0),
        Field('email', str, ''),
    ]
    
    # 유효성 검사 규칙
    validation_rules = {
        'name': lambda x: isinstance(x, str) and len(x) > 0,
        'age': lambda x: isinstance(x, int) and 0 <= x <= 150,
        'email': lambda x: isinstance(x, str) and '@' in x
    }
    
    # 동적 클래스 생성
    Person = builder.create_data_class('Person', person_fields, validation_rules)
    
    # 클래스 사용
    try:
        person1 = Person(name="Alice", age=30, email="alice@example.com")
        person2 = Person(name="Bob", age=25, email="bob@example.com")
        
        print(f"   person1: {person1}")
        print(f"   person2: {person2}")
        print(f"   person1 == person2: {person1 == person2}")
        
        person3 = Person(name="", age=30, email="invalid")  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    print("\n2. 동적 열거형 클래스:")
    
    # 상태 열거형 생성
    Status = builder.create_enum_class('Status', ['pending', 'approved', 'rejected'])
    
    print(f"   Status.PENDING: {Status.PENDING}")
    print(f"   Status.APPROVED: {Status.APPROVED}")
    print(f"   Status.REJECTED: {Status.REJECTED}")
    print(f"   값 이름 조회: {Status.get_name(1)}")
    print(f"   모든 값: {Status.get_values()}")
    
    print("\n3. 동적 프록시 클래스:")
    
    # 원본 클래스
    class Calculator:
        def __init__(self):
            self.result = 0
        
        def add(self, value):
            self.result += value
            return self.result
        
        def multiply(self, value):
            self.result *= value
            return self.result
    
    # 인터셉터 정의
    def log_interceptor(target, name):
        print(f"     메서드 '{name}' 호출됨")
        return None  # 기본 동작 수행
    
    def validation_interceptor(target, name, value):
        if name == 'result' and value < 0:
            print(f"     경고: 음수 결과 설정 시도 ({value})")
        return False  # 기본 동작 수행
    
    interceptors = {
        'get': log_interceptor,
        'set': validation_interceptor
    }
    
    # 프록시 클래스 생성
    LoggingCalculator = builder.create_proxy_class('LoggingCalculator', Calculator, interceptors)
    
    # 프록시 사용
    calc = LoggingCalculator()
    calc.add(10)
    calc.multiply(3)
    calc.result = -5  # 경고 발생
    
    print(f"   최종 결과: {calc.result}")
    print(f"   접근 로그: {calc.get_access_log()}")

demonstrate_dynamic_class_creation()
```

### 5.2 클래스 수정과 확장

```python
print("\n=== 클래스 수정과 확장 ===")

class ClassModifier:
    """클래스 수정 도구"""
    
    def __init__(self):
        self.modification_history = []
    
    def add_method(self, cls, method_name, method_func):
        """클래스에 메서드 추가"""
        setattr(cls, method_name, method_func)
        self.modification_history.append(('add_method', cls.__name__, method_name))
        print(f"   메서드 '{method_name}' 추가됨: {cls.__name__}")
    
    def remove_method(self, cls, method_name):
        """클래스에서 메서드 제거"""
        if hasattr(cls, method_name):
            delattr(cls, method_name)
            self.modification_history.append(('remove_method', cls.__name__, method_name))
            print(f"   메서드 '{method_name}' 제거됨: {cls.__name__}")
    
    def add_property(self, cls, prop_name, getter=None, setter=None, deleter=None):
        """클래스에 프로퍼티 추가"""
        prop = property(getter, setter, deleter)
        setattr(cls, prop_name, prop)
        self.modification_history.append(('add_property', cls.__name__, prop_name))
        print(f"   프로퍼티 '{prop_name}' 추가됨: {cls.__name__}")
    
    def monkey_patch(self, cls, method_name, new_method):
        """메서드 몽키 패치"""
        original_method = getattr(cls, method_name, None)
        setattr(cls, method_name, new_method)
        setattr(cls, f'_original_{method_name}', original_method)
        self.modification_history.append(('monkey_patch', cls.__name__, method_name))
        print(f"   메서드 '{method_name}' 몽키 패치됨: {cls.__name__}")
    
    def add_mixin(self, cls, mixin_class):
        """클래스에 믹스인 추가 (다중 상속 시뮬레이션)"""
        # 믹스인의 메서드들을 복사
        for attr_name in dir(mixin_class):
            if not attr_name.startswith('_') and callable(getattr(mixin_class, attr_name)):
                method = getattr(mixin_class, attr_name)
                setattr(cls, attr_name, method)
        
        self.modification_history.append(('add_mixin', cls.__name__, mixin_class.__name__))
        print(f"   믹스인 '{mixin_class.__name__}' 추가됨: {cls.__name__}")
    
    def get_modification_history(self):
        """수정 히스토리 반환"""
        return self.modification_history.copy()

class MethodDecorator:
    """메서드 데코레이션 도구"""
    
    @staticmethod
    def timing_decorator(func):
        """실행 시간 측정 데코레이터"""
        import time
        import functools
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            result = func(*args, **kwargs)
            end_time = time.time()
            print(f"     {func.__name__} 실행 시간: {end_time - start_time:.4f}초")
            return result
        
        return wrapper
    
    @staticmethod
    def caching_decorator(func):
        """결과 캐싱 데코레이터"""
        import functools
        cache = {}
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 간단한 캐시 키 생성
            key = str(args) + str(sorted(kwargs.items()))
            
            if key in cache:
                print(f"     {func.__name__} 캐시 히트")
                return cache[key]
            
            result = func(*args, **kwargs)
            cache[key] = result
            print(f"     {func.__name__} 결과 캐시됨")
            return result
        
        wrapper.cache = cache
        wrapper.clear_cache = lambda: cache.clear()
        return wrapper
    
    @staticmethod
    def validation_decorator(validator):
        """인수 검증 데코레이터"""
        def decorator(func):
            import functools
            
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                if not validator(*args, **kwargs):
                    raise ValueError(f"Validation failed for {func.__name__}")
                return func(*args, **kwargs)
            
            return wrapper
        return decorator

# 믹스인 클래스들
class LoggingMixin:
    """로깅 기능 믹스인"""
    
    def log(self, message):
        """로그 메시지 출력"""
        class_name = self.__class__.__name__
        print(f"   [{class_name}] {message}")
    
    def log_method_call(self, method_name, *args, **kwargs):
        """메서드 호출 로깅"""
        self.log(f"메서드 '{method_name}' 호출됨: args={args}, kwargs={kwargs}")

class SerializationMixin:
    """직렬화 기능 믹스인"""
    
    def to_dict(self):
        """객체를 딕셔너리로 변환"""
        result = {}
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                result[key] = value
        return result
    
    def from_dict(self, data):
        """딕셔너리에서 객체 복원"""
        for key, value in data.items():
            setattr(self, key, value)
        return self
    
    def to_json(self):
        """JSON 문자열로 변환"""
        import json
        return json.dumps(self.to_dict())

class ValidationMixin:
    """검증 기능 믹스인"""
    
    def validate(self):
        """객체 유효성 검사"""
        validation_rules = getattr(self, '_validation_rules', {})
        
        for field, rule in validation_rules.items():
            value = getattr(self, field, None)
            if not rule(value):
                raise ValueError(f"Validation failed for field '{field}': {value}")
        
        return True
    
    def add_validation_rule(self, field, rule):
        """검증 규칙 추가"""
        if not hasattr(self, '_validation_rules'):
            self._validation_rules = {}
        self._validation_rules[field] = rule

def demonstrate_class_modification():
    """클래스 수정과 확장 시연"""
    modifier = ClassModifier()
    
    # 기본 클래스 정의
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age
        
        def greet(self):
            return f"안녕하세요, 저는 {self.name}입니다."
    
    print("\n1. 메서드 동적 추가:")
    
    # 새 메서드 정의
    def introduce(self):
        return f"제 이름은 {self.name}이고, 나이는 {self.age}세입니다."
    
    def calculate_birth_year(self):
        import datetime
        current_year = datetime.datetime.now().year
        return current_year - self.age
    
    # 메서드 추가
    modifier.add_method(Person, 'introduce', introduce)
    modifier.add_method(Person, 'calculate_birth_year', calculate_birth_year)
    
    # 추가된 메서드 사용
    person = Person("Alice", 30)
    print(f"   인사: {person.greet()}")
    print(f"   소개: {person.introduce()}")
    print(f"   출생년도: {person.calculate_birth_year()}")
    
    print("\n2. 프로퍼티 동적 추가:")
    
    # 프로퍼티 getter/setter 정의
    def full_name_getter(self):
        return getattr(self, '_full_name', f"{self.name}")
    
    def full_name_setter(self, value):
        self._full_name = value
    
    # 프로퍼티 추가
    modifier.add_property(Person, 'full_name', full_name_getter, full_name_setter)
    
    person.full_name = "Alice Smith"
    print(f"   전체 이름: {person.full_name}")
    
    print("\n3. 메서드 몽키 패치:")
    
    # 원본 greet 메서드 개선
    def enhanced_greet(self):
        original_greet = getattr(self, '_original_greet', lambda: "안녕하세요!")
        basic_greeting = original_greet()
        return f"{basic_greeting} 오늘 하루도 좋은 하루 되세요!"
    
    modifier.monkey_patch(Person, 'greet', enhanced_greet)
    
    print(f"   개선된 인사: {person.greet()}")
    
    print("\n4. 믹스인 추가:")
    
    # 새로운 클래스에 믹스인 추가
    class Product:
        def __init__(self, name, price):
            self.name = name
            self.price = price
    
    # 믹스인들 추가
    modifier.add_mixin(Product, LoggingMixin)
    modifier.add_mixin(Product, SerializationMixin)
    modifier.add_mixin(Product, ValidationMixin)
    
    product = Product("Laptop", 1000)
    
    # 믹스인 기능 사용
    product.log("상품이 생성되었습니다")
    
    # 직렬화
    product.to_dict()
    product.to_json()
    
    # 검증 규칙 추가
    product.add_validation_rule('price', lambda x: x > 0)
    product.add_validation_rule('name', lambda x: len(x) > 0)
    
    try:
        product.validate()
        print(f"   검증 성공")
        
        product.price = -100
        product.validate()  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    print("\n5. 메서드 데코레이션:")
    
    # 새 클래스에 데코레이션 적용
    class Calculator:
        def __init__(self):
            self.result = 0
        
        def add(self, value):
            self.result += value
            return self.result
        
        def multiply(self, value):
            self.result *= value
            return self.result
    
    # 메서드에 데코레이터 적용
    Calculator.add = MethodDecorator.timing_decorator(Calculator.add)
    Calculator.multiply = MethodDecorator.caching_decorator(Calculator.multiply)
    
    calc = Calculator()
    
    # 시간 측정
    calc.add(10)
    calc.multiply(3)
    
    # 캐싱 테스트
    result1 = calc.add(10)
    result2 = calc.add(10)  # 캐시에서 반환
    
    print(f"   계산 결과: {result1}")
    
    # 검증 테스트
    try:
        calc.multiply(2)
        calc.multiply(-1)  # 오류 발생
    except ValueError as e:
        print(f"   검증 오류: {e}")
    
    # 수정 히스토리 확인
    print(f"\n수정 히스토리:")
    for action, cls_name, item_name in modifier.get_modification_history():
        print(f"   {action}: {cls_name}.{item_name}")

demonstrate_class_modification()
```

## 6. 연습 문제

### 연습 1: ORM 스타일 메타클래스
데이터베이스 모델을 위한 ORM 스타일 메타클래스를 구현하세요:
- 필드 자동 등록
- 쿼리 메서드 자동 생성
- 유효성 검사 통합

### 연습 2: 스마트 프로퍼티 시스템
고급 프로퍼티 관리 시스템을 구현하세요:
- 타입 검증과 변환
- 변경 이벤트 시스템
- 의존성 체인 관리

### 연습 3: 동적 API 클라이언트
메타클래스와 디스크립터를 활용한 동적 API 클라이언트를 구현하세요:
- 메서드 자동 생성
- 요청/응답 로깅
- 에러 처리 자동화

### 연습 4: 프레임워크 디자인
메타클래스 기반 웹 프레임워크의 기초를 설계하세요:
- 라우팅 자동 등록
- 미들웨어 체인
- 설정 관리 시스템

## 정리

이 챕터에서 학습한 내용:

1. **메타클래스 기초**: 클래스도 객체, 타입 시스템, 메타클래스 계층 구조
2. **커스텀 메타클래스**: 싱글톤, 검증, 속성 추적 등 다양한 패턴 구현
3. **디스크립터 프로토콜**: __get__, __set__, __delete__ 메서드 활용
4. **고급 디스크립터**: 캐싱, 지연 로딩, 검증, 관찰 가능한 프로퍼티
5. **property 고급 활용**: 계산된 프로퍼티, 동적 프로퍼티 생성
6. **__new__ vs __init__**: 객체 생성 과정 제어, 불변 객체, 팩토리 패턴
7. **동적 클래스**: 런타임 클래스 생성, 수정, 확장 기법
8. **실무 패턴**: ORM, 프록시, 믹스인, 데코레이터 활용

다음 챕터에서는 고급 데코레이터와 컨텍스트 매니저를 통한 더욱 정교한 코드 제어 기법을 학습하게 됩니다.

### 핵심 포인트
- 메타클래스는 클래스 생성 과정을 제어하는 강력한 도구입니다
- 디스크립터는 속성 접근을 세밀하게 제어할 수 있게 해줍니다
- property는 간단하면서도 강력한 속성 관리 메커니즘입니다
- __new__는 인스턴스 생성, __init__는 초기화를 담당합니다
- 동적 클래스 생성과 수정은 유연한 프로그래밍을 가능하게 합니다
- 이러한 고급 기법들은 프레임워크와 라이브러리 개발에 필수적입니다
</rewritten_file>
