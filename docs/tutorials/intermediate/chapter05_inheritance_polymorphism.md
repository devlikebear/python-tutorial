# Chapter 5: 상속과 다형성 (Inheritance and Polymorphism)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 상속의 개념과 필요성 이해하기
- 단일 상속과 다중 상속 구현하기
- super() 함수를 활용한 부모 클래스 메서드 호출하기
- 메서드 오버라이딩을 통한 기능 확장하기
- 추상 클래스와 인터페이스 개념 이해하기
- 다형성을 활용한 유연한 프로그래밍하기
- MRO(Method Resolution Order) 이해하기

## 1. 상속의 기본 개념

### 1.1 상속이란?

상속(Inheritance)은 기존 클래스의 속성과 메서드를 새로운 클래스가 물려받아 사용하는 객체지향 프로그래밍의 핵심 개념입니다. 코드 재사용성을 높이고 계층적 구조를 만들 수 있습니다.

```python
print("=== 상속의 기본 개념 ===")

# 부모 클래스 (기본 클래스, 슈퍼 클래스)
class Animal:
    """동물 기본 클래스"""
    
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.is_alive = True
    
    def breathe(self):
        """호흡하기"""
        return f"{self.name}이(가) 숨을 쉽니다."
    
    def eat(self, food):
        """먹기"""
        return f"{self.name}이(가) {food}을(를) 먹습니다."
    
    def sleep(self):
        """잠자기"""
        return f"{self.name}이(가) 잠을 잡니다."
    
    def make_sound(self):
        """소리내기 - 기본 구현"""
        return f"{self.name}이(가) 소리를 냅니다."
    
    def get_info(self):
        """동물 정보"""
        status = "살아있음" if self.is_alive else "죽음"
        return f"이름: {self.name}, 종: {self.species}, 상태: {status}"

# 자식 클래스 (파생 클래스, 서브 클래스)
class Dog(Animal):
    """개 클래스 - Animal을 상속받음"""
    
    def __init__(self, name, breed):
        # 부모 클래스의 생성자 호출
        super().__init__(name, "개")
        self.breed = breed  # 추가 속성
        self.is_trained = False
    
    def make_sound(self):
        """소리내기 - 메서드 오버라이딩"""
        return f"{self.name}이(가) 멍멍 짖습니다."
    
    def wag_tail(self):
        """꼬리 흔들기 - 새로운 메서드"""
        return f"{self.name}이(가) 꼬리를 흔듭니다."
    
    def fetch(self, item="공"):
        """물어오기"""
        return f"{self.name}이(가) {item}을(를) 물어옵니다."
    
    def train(self, command):
        """훈련하기"""
        self.is_trained = True
        return f"{self.name}이(가) '{command}' 명령을 배웠습니다."

class Cat(Animal):
    """고양이 클래스 - Animal을 상속받음"""
    
    def __init__(self, name, color):
        super().__init__(name, "고양이")
        self.color = color
        self.lives_remaining = 9  # 고양이는 9개의 목숨
    
    def make_sound(self):
        """소리내기 - 메서드 오버라이딩"""
        return f"{self.name}이(가) 야옹 웁니다."
    
    def purr(self):
        """그르렁거리기 - 새로운 메서드"""
        return f"{self.name}이(가) 그르렁거립니다."
    
    def climb_tree(self):
        """나무 올라가기"""
        return f"{self.name}이(가) 나무를 올라갑니다."
    
    def lose_life(self):
        """목숨 잃기"""
        if self.lives_remaining > 0:
            self.lives_remaining -= 1
            if self.lives_remaining == 0:
                self.is_alive = False
            return f"{self.name}의 남은 목숨: {self.lives_remaining}개"
        return f"{self.name}은(는) 이미 죽었습니다."

# 상속 사용 예제
print("1. 기본 동물:")
animal = Animal("동물", "포유류")
print(animal.get_info())
print(animal.make_sound())
print(animal.breathe())

print("\n2. 개:")
dog = Dog("멍멍이", "골든 리트리버")
print(dog.get_info())
print(dog.make_sound())  # 오버라이딩된 메서드
print(dog.breathe())     # 상속받은 메서드
print(dog.wag_tail())    # 새로운 메서드
print(dog.fetch("프리스비"))
print(dog.train("앉아"))

print("\n3. 고양이:")
cat = Cat("야옹이", "흰색")
print(cat.get_info())
print(cat.make_sound())  # 오버라이딩된 메서드
print(cat.purr())        # 새로운 메서드
print(cat.climb_tree())
print(cat.lose_life())

print("\n4. 상속 관계 확인:")
print(f"dog는 Dog 클래스의 인스턴스: {isinstance(dog, Dog)}")
print(f"dog는 Animal 클래스의 인스턴스: {isinstance(dog, Animal)}")
print(f"Dog는 Animal의 서브클래스: {issubclass(Dog, Animal)}")
print(f"Animal은 Dog의 서브클래스: {issubclass(Animal, Dog)}")

print("\n5. 상속된 속성과 메서드:")
print(f"Dog 클래스의 MRO: {Dog.__mro__}")
print(f"dog 객체가 가진 속성들: {[attr for attr in dir(dog) if not attr.startswith('_')]}")
```

### 1.2 super() 함수 활용

```python
print("\n=== super() 함수 활용 ===")

class Vehicle:
    """교통수단 기본 클래스"""
    
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.is_running = False
        self.fuel_level = 100
        print(f"Vehicle 생성자 호출: {brand} {model}")
    
    def start(self):
        """시동 걸기"""
        if not self.is_running:
            self.is_running = True
            return f"{self.brand} {self.model} 시동이 걸렸습니다."
        return "이미 시동이 걸려있습니다."
    
    def stop(self):
        """시동 끄기"""
        if self.is_running:
            self.is_running = False
            return f"{self.brand} {self.model} 시동이 꺼졌습니다."
        return "이미 시동이 꺼져있습니다."
    
    def get_info(self):
        """차량 정보"""
        status = "시동됨" if self.is_running else "정지됨"
        return f"{self.year}년 {self.brand} {self.model} - 상태: {status}, 연료: {self.fuel_level}%"

class Car(Vehicle):
    """자동차 클래스"""
    
    def __init__(self, brand, model, year, num_doors):
        # 부모 클래스 생성자 호출
        super().__init__(brand, model, year)
        self.num_doors = num_doors
        self.trunk_open = False
        print(f"Car 생성자 호출: {num_doors}도어")
    
    def open_trunk(self):
        """트렁크 열기"""
        if not self.trunk_open:
            self.trunk_open = True
            return "트렁크가 열렸습니다."
        return "트렁크가 이미 열려있습니다."
    
    def start(self):
        """시동 걸기 - 기능 확장"""
        # 부모 클래스의 start() 메서드 호출
        result = super().start()
        if self.is_running:
            return result + " 자동차 시스템이 활성화되었습니다."
        return result
    
    def get_info(self):
        """차량 정보 - 기능 확장"""
        # 부모 클래스의 정보에 추가 정보 포함
        base_info = super().get_info()
        trunk_status = "열림" if self.trunk_open else "닫힘"
        return f"{base_info}, 도어: {self.num_doors}개, 트렁크: {trunk_status}"

class ElectricCar(Car):
    """전기 자동차 클래스"""
    
    def __init__(self, brand, model, year, num_doors, battery_capacity):
        # 부모 클래스 생성자 호출
        super().__init__(brand, model, year, num_doors)
        self.battery_capacity = battery_capacity
        self.battery_level = 100
        print(f"ElectricCar 생성자 호출: 배터리 {battery_capacity}kWh")
    
    def charge(self, amount=100):
        """배터리 충전"""
        old_level = self.battery_level
        self.battery_level = min(100, self.battery_level + amount)
        charged = self.battery_level - old_level
        return f"배터리 {charged}% 충전됨. 현재 배터리: {self.battery_level}%"
    
    def start(self):
        """시동 걸기 - 전기차 특화"""
        if self.battery_level <= 0:
            return "배터리가 방전되어 시동을 걸 수 없습니다."
        
        # 부모 클래스의 start() 메서드 호출
        result = super().start()
        if self.is_running:
            return result + " 전기 모터가 준비되었습니다."
        return result
    
    def get_info(self):
        """차량 정보 - 전기차 정보 포함"""
        # 부모 클래스의 정보 가져오기
        base_info = super().get_info()
        # 연료 레벨을 배터리 레벨로 교체
        base_info = base_info.replace(f"연료: {self.fuel_level}%", f"배터리: {self.battery_level}%")
        return f"{base_info}, 배터리 용량: {self.battery_capacity}kWh"

# super() 함수 사용 예제
print("1. 일반 자동차:")
car = Car("현대", "소나타", 2023, 4)
print(car.get_info())
print(car.start())
print(car.open_trunk())
print(car.get_info())

print("\n2. 전기 자동차:")
ecar = ElectricCar("테슬라", "Model 3", 2023, 4, 75)
print(ecar.get_info())
print(ecar.start())
print(ecar.charge(20))
print(ecar.get_info())

print("\n3. 생성자 호출 순서 확인:")
print("ElectricCar 생성 시 생성자 호출 순서:")
print("Vehicle -> Car -> ElectricCar")
```

## 2. 메서드 오버라이딩

### 2.1 메서드 오버라이딩 기본

```python
print("\n=== 메서드 오버라이딩 ===")

class Shape:
    """도형 기본 클래스"""
    
    def __init__(self, color="black"):
        self.color = color
    
    def area(self):
        """넓이 계산 - 기본 구현"""
        raise NotImplementedError("서브클래스에서 구현해야 합니다.")
    
    def perimeter(self):
        """둘레 계산 - 기본 구현"""
        raise NotImplementedError("서브클래스에서 구현해야 합니다.")
    
    def draw(self):
        """그리기 - 기본 구현"""
        return f"{self.color} 색상의 도형을 그립니다."
    
    def get_info(self):
        """도형 정보"""
        return f"색상: {self.color}, 넓이: {self.area():.2f}, 둘레: {self.perimeter():.2f}"

class Rectangle(Shape):
    """직사각형 클래스"""
    
    def __init__(self, width, height, color="black"):
        super().__init__(color)
        self.width = width
        self.height = height
    
    def area(self):
        """넓이 계산 - 오버라이딩"""
        return self.width * self.height
    
    def perimeter(self):
        """둘레 계산 - 오버라이딩"""
        return 2 * (self.width + self.height)
    
    def draw(self):
        """그리기 - 기능 확장"""
        base_draw = super().draw()
        return f"{base_draw} (직사각형: {self.width}×{self.height})"

class Circle(Shape):
    """원 클래스"""
    
    def __init__(self, radius, color="black"):
        super().__init__(color)
        self.radius = radius
    
    def area(self):
        """넓이 계산 - 오버라이딩"""
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        """둘레 계산 - 오버라이딩"""
        import math
        return 2 * math.pi * self.radius
    
    def draw(self):
        """그리기 - 완전히 새로운 구현"""
        return f"{self.color} 색상의 원을 그립니다. (반지름: {self.radius})"

class Triangle(Shape):
    """삼각형 클래스"""
    
    def __init__(self, base, height, side1, side2, color="black"):
        super().__init__(color)
        self.base = base
        self.height = height
        self.side1 = side1
        self.side2 = side2
    
    def area(self):
        """넓이 계산 - 오버라이딩"""
        return 0.5 * self.base * self.height
    
    def perimeter(self):
        """둘레 계산 - 오버라이딩"""
        return self.base + self.side1 + self.side2
    
    def draw(self):
        """그리기 - 오버라이딩"""
        return f"{self.color} 색상의 삼각형을 그립니다. (밑변: {self.base}, 높이: {self.height})"

# 메서드 오버라이딩 예제
print("1. 다양한 도형 생성:")
shapes = [
    Rectangle(10, 5, "빨간색"),
    Circle(3, "파란색"),
    Triangle(8, 6, 7, 9, "초록색")
]

for i, shape in enumerate(shapes, 1):
    print(f"\n도형 {i}:")
    print(f"  정보: {shape.get_info()}")
    print(f"  그리기: {shape.draw()}")

print("\n2. 도형별 특성:")
rect = Rectangle(12, 8)
print(f"직사각형 - 넓이: {rect.area()}, 둘레: {rect.perimeter()}")

circle = Circle(5)
print(f"원 - 넓이: {circle.area():.2f}, 둘레: {circle.perimeter():.2f}")

triangle = Triangle(10, 8, 6, 10)
print(f"삼각형 - 넓이: {triangle.area()}, 둘레: {triangle.perimeter()}")
```

### 2.2 고급 오버라이딩 패턴

```python
print("\n=== 고급 오버라이딩 패턴 ===")

class Employee:
    """직원 기본 클래스"""
    
    def __init__(self, name, employee_id, base_salary):
        self.name = name
        self.employee_id = employee_id
        self.base_salary = base_salary
        self.worked_hours = 0
    
    def calculate_salary(self):
        """급여 계산 - 기본 구현"""
        return self.base_salary
    
    def work(self, hours):
        """근무하기"""
        self.worked_hours += hours
        return f"{self.name}이(가) {hours}시간 근무했습니다. (총 {self.worked_hours}시간)"
    
    def get_details(self):
        """직원 세부 정보"""
        return f"""
=== 직원 정보 ===
이름: {self.name}
사번: {self.employee_id}
기본급: {self.base_salary:,}원
근무시간: {self.worked_hours}시간
실급여: {self.calculate_salary():,}원
        """.strip()

class HourlyEmployee(Employee):
    """시간제 직원"""
    
    def __init__(self, name, employee_id, hourly_rate):
        super().__init__(name, employee_id, 0)  # 기본급 0
        self.hourly_rate = hourly_rate
    
    def calculate_salary(self):
        """급여 계산 - 시간제 오버라이딩"""
        regular_hours = min(self.worked_hours, 40)
        overtime_hours = max(0, self.worked_hours - 40)
        
        regular_pay = regular_hours * self.hourly_rate
        overtime_pay = overtime_hours * self.hourly_rate * 1.5  # 야근수당 1.5배
        
        return regular_pay + overtime_pay
    
    def get_details(self):
        """직원 세부 정보 - 시간제 특화"""
        base_details = super().get_details()
        regular_hours = min(self.worked_hours, 40)
        overtime_hours = max(0, self.worked_hours - 40)
        
        additional_info = f"""
시급: {self.hourly_rate:,}원
일반근무: {regular_hours}시간
야근: {overtime_hours}시간
        """.strip()
        
        return base_details + "\n" + additional_info

class SalariedEmployee(Employee):
    """정규직 직원"""
    
    def __init__(self, name, employee_id, monthly_salary, bonus_rate=0.1):
        super().__init__(name, employee_id, monthly_salary)
        self.bonus_rate = bonus_rate
        self.performance_score = 0
    
    def set_performance(self, score):
        """성과 점수 설정 (0-100)"""
        self.performance_score = max(0, min(100, score))
        return f"{self.name}의 성과 점수: {self.performance_score}점"
    
    def calculate_salary(self):
        """급여 계산 - 정규직 오버라이딩"""
        # 기본급 + 성과 보너스
        bonus = self.base_salary * self.bonus_rate * (self.performance_score / 100)
        return self.base_salary + bonus
    
    def get_details(self):
        """직원 세부 정보 - 정규직 특화"""
        base_details = super().get_details()
        bonus_amount = self.base_salary * self.bonus_rate * (self.performance_score / 100)
        
        additional_info = f"""
성과점수: {self.performance_score}점
보너스율: {self.bonus_rate * 100}%
보너스: {bonus_amount:,}원
        """.strip()
        
        return base_details + "\n" + additional_info

class Manager(SalariedEmployee):
    """관리자 클래스"""
    
    def __init__(self, name, employee_id, monthly_salary, team_size, management_bonus=500000):
        super().__init__(name, employee_id, monthly_salary, bonus_rate=0.15)  # 보너스율 15%
        self.team_size = team_size
        self.management_bonus = management_bonus
    
    def calculate_salary(self):
        """급여 계산 - 관리자 오버라이딩"""
        # 정규직 급여 + 관리자 수당 + 팀 크기 보너스
        base_salary = super().calculate_salary()
        team_bonus = self.team_size * 50000  # 팀원 1명당 5만원
        return base_salary + self.management_bonus + team_bonus
    
    def manage_team(self, task):
        """팀 관리"""
        return f"관리자 {self.name}이(가) 팀({self.team_size}명)에게 '{task}' 업무를 지시했습니다."
    
    def get_details(self):
        """직원 세부 정보 - 관리자 특화"""
        base_details = super().get_details()
        team_bonus = self.team_size * 50000
        
        additional_info = f"""
팀 크기: {self.team_size}명
관리자 수당: {self.management_bonus:,}원
팀 보너스: {team_bonus:,}원
        """.strip()
        
        return base_details + "\n" + additional_info

# 고급 오버라이딩 예제
print("1. 다양한 직원 타입:")

# 시간제 직원
hourly_emp = HourlyEmployee("김시간", "H001", 15000)
print(hourly_emp.work(45))  # 45시간 근무 (5시간 야근)
print(f"시급 직원 급여: {hourly_emp.calculate_salary():,}원")

# 정규직 직원
salaried_emp = SalariedEmployee("박정규", "S001", 3000000)
print(salaried_emp.set_performance(85))
print(f"정규직 급여: {salaried_emp.calculate_salary():,}원")

# 관리자
manager = Manager("이관리", "M001", 5000000, 8)
print(manager.set_performance(90))
print(manager.manage_team("월간 보고서 작성"))
print(f"관리자 급여: {manager.calculate_salary():,}원")

print("\n2. 상세 정보 출력:")
employees = [hourly_emp, salaried_emp, manager]
for emp in employees:
    print(emp.get_details())
    print("-" * 40)
```

## 3. 다형성 (Polymorphism)

### 3.1 다형성의 기본 개념

```python
print("\n=== 다형성의 기본 개념 ===")

# 다형성: 같은 인터페이스로 다른 타입의 객체를 다루는 능력

class MediaPlayer:
    """미디어 플레이어 기본 클래스"""
    
    def __init__(self, title):
        self.title = title
        self.is_playing = False
    
    def play(self):
        """재생 - 기본 구현"""
        self.is_playing = True
        return f"'{self.title}' 재생 중..."
    
    def stop(self):
        """정지"""
        self.is_playing = False
        return f"'{self.title}' 재생 정지"
    
    def get_info(self):
        """미디어 정보"""
        status = "재생 중" if self.is_playing else "정지됨"
        return f"제목: {self.title}, 상태: {status}"

class AudioPlayer(MediaPlayer):
    """오디오 플레이어"""
    
    def __init__(self, title, artist, duration):
        super().__init__(title)
        self.artist = artist
        self.duration = duration
    
    def play(self):
        """오디오 재생 - 오버라이딩"""
        self.is_playing = True
        return f"🎵 {self.artist}의 '{self.title}' 오디오 재생 중... ({self.duration}초)"
    
    def adjust_volume(self, level):
        """볼륨 조절 - 오디오 특화 기능"""
        return f"볼륨을 {level}로 조절했습니다."

class VideoPlayer(MediaPlayer):
    """비디오 플레이어"""
    
    def __init__(self, title, director, resolution):
        super().__init__(title)
        self.director = director
        self.resolution = resolution
    
    def play(self):
        """비디오 재생 - 오버라이딩"""
        self.is_playing = True
        return f"🎬 {self.director} 감독의 '{self.title}' 비디오 재생 중... ({self.resolution})"
    
    def change_quality(self, quality):
        """화질 변경 - 비디오 특화 기능"""
        self.resolution = quality
        return f"화질을 {quality}로 변경했습니다."

class StreamingPlayer(MediaPlayer):
    """스트리밍 플레이어"""
    
    def __init__(self, title, platform, url):
        super().__init__(title)
        self.platform = platform
        self.url = url
    
    def play(self):
        """스트리밍 재생 - 오버라이딩"""
        self.is_playing = True
        return f"📡 {self.platform}에서 '{self.title}' 스트리밍 재생 중..."
    
    def check_connection(self):
        """연결 상태 확인 - 스트리밍 특화 기능"""
        return f"{self.platform} 연결 상태: 양호"

def play_media(player):
    """다형성을 활용한 미디어 재생 함수"""
    print(f"재생 시작: {player.play()}")
    print(f"정보: {player.get_info()}")

def play_all_media(players):
    """여러 미디어를 순차적으로 재생"""
    print("=== 플레이리스트 재생 ===")
    for i, player in enumerate(players, 1):
        print(f"\n{i}. {player.__class__.__name__}:")
        play_media(player)

# 다형성 예제
print("1. 다양한 미디어 플레이어 생성:")
audio = AudioPlayer("Spring Day", "BTS", 267)
video = VideoPlayer("Avengers: Endgame", "Russo Brothers", "4K")
stream = StreamingPlayer("Netflix Original", "Netflix", "https://netflix.com/watch")

print("\n2. 다형성을 통한 통일된 인터페이스:")
media_list = [audio, video, stream]
play_all_media(media_list)

print("\n3. 각 타입별 특화 기능:")
print(f"오디오: {audio.adjust_volume(75)}")
print(f"비디오: {video.change_quality('1080p')}")
print(f"스트리밍: {stream.check_connection()}")

print("\n4. 타입 확인과 특화 처리:")
def advanced_media_control(player):
    """고급 미디어 제어 - 타입별 특화 처리"""
    print(f"\n=== {player.__class__.__name__} 고급 제어 ===")
    print(player.play())
    
    # 타입별 특화 기능 호출
    if isinstance(player, AudioPlayer):
        print(player.adjust_volume(80))
    elif isinstance(player, VideoPlayer):
        print(player.change_quality("HD"))
    elif isinstance(player, StreamingPlayer):
        print(player.check_connection())

for player in media_list:
    advanced_media_control(player)
```

### 3.2 다형성을 활용한 실용적 예제

```python
print("\n=== 다형성 실용 예제: 결제 시스템 ===")

from abc import ABC, abstractmethod
import datetime

class PaymentProcessor(ABC):
    """결제 처리기 추상 클래스"""
    
    def __init__(self, processor_name):
        self.processor_name = processor_name
        self.is_active = True
    
    @abstractmethod
    def process_payment(self, amount, **kwargs):
        """결제 처리 - 추상 메서드"""
        pass
    
    @abstractmethod
    def refund_payment(self, transaction_id, amount):
        """환불 처리 - 추상 메서드"""
        pass
    
    def validate_amount(self, amount):
        """금액 검증"""
        if not isinstance(amount, (int, float)) or amount <= 0:
            raise ValueError("결제 금액은 양수여야 합니다.")
        return True
    
    def generate_transaction_id(self):
        """거래 ID 생성"""
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        return f"{self.processor_name[:3].upper()}{timestamp}"

class CreditCardProcessor(PaymentProcessor):
    """신용카드 결제 처리기"""
    
    def __init__(self):
        super().__init__("CreditCard")
        self.processing_fee_rate = 0.029  # 2.9% 수수료
    
    def process_payment(self, amount, card_number, expiry_date, cvv, **kwargs):
        """신용카드 결제 처리"""
        self.validate_amount(amount)
        
        # 카드 정보 검증 (실제로는 더 복잡한 검증)
        if len(card_number) != 16:
            raise ValueError("잘못된 카드 번호입니다.")
        
        processing_fee = amount * self.processing_fee_rate
        total_charge = amount + processing_fee
        
        transaction_id = self.generate_transaction_id()
        
        return {
            'success': True,
            'transaction_id': transaction_id,
            'amount': amount,
            'processing_fee': processing_fee,
            'total_charge': total_charge,
            'card_last_4': card_number[-4:],
            'processor': self.processor_name
        }
    
    def refund_payment(self, transaction_id, amount):
        """신용카드 환불 처리"""
        self.validate_amount(amount)
        refund_fee = min(amount * 0.01, 500)  # 환불 수수료 1% (최대 500원)
        
        return {
            'success': True,
            'refund_id': f"REF_{transaction_id}",
            'refund_amount': amount - refund_fee,
            'refund_fee': refund_fee,
            'processor': self.processor_name
        }

class BankTransferProcessor(PaymentProcessor):
    """계좌이체 결제 처리기"""
    
    def __init__(self):
        super().__init__("BankTransfer")
        self.processing_fee = 1000  # 고정 수수료 1000원
    
    def process_payment(self, amount, account_number, bank_code, **kwargs):
        """계좌이체 결제 처리"""
        self.validate_amount(amount)
        
        if len(account_number) < 10:
            raise ValueError("잘못된 계좌번호입니다.")
        
        total_charge = amount + self.processing_fee
        transaction_id = self.generate_transaction_id()
        
        return {
            'success': True,
            'transaction_id': transaction_id,
            'amount': amount,
            'processing_fee': self.processing_fee,
            'total_charge': total_charge,
            'account_masked': account_number[:3] + "*" * (len(account_number) - 6) + account_number[-3:],
            'bank_code': bank_code,
            'processor': self.processor_name
        }
    
    def refund_payment(self, transaction_id, amount):
        """계좌이체 환불 처리"""
        self.validate_amount(amount)
        
        return {
            'success': True,
            'refund_id': f"REF_{transaction_id}",
            'refund_amount': amount,  # 계좌이체는 환불 수수료 없음
            'refund_fee': 0,
            'processor': self.processor_name,
            'note': "영업일 기준 3일 내 환불 예정"
        }

class DigitalWalletProcessor(PaymentProcessor):
    """디지털 지갑 결제 처리기"""
    
    def __init__(self, wallet_name):
        super().__init__(f"DigitalWallet_{wallet_name}")
        self.wallet_name = wallet_name
        self.processing_fee_rate = 0.015  # 1.5% 수수료
    
    def process_payment(self, amount, wallet_id, pin, **kwargs):
        """디지털 지갑 결제 처리"""
        self.validate_amount(amount)
        
        if len(pin) != 6:
            raise ValueError("PIN은 6자리여야 합니다.")
        
        processing_fee = amount * self.processing_fee_rate
        total_charge = amount + processing_fee
        transaction_id = self.generate_transaction_id()
        
        return {
            'success': True,
            'transaction_id': transaction_id,
            'amount': amount,
            'processing_fee': processing_fee,
            'total_charge': total_charge,
            'wallet_name': self.wallet_name,
            'wallet_id_masked': wallet_id[:3] + "*" * (len(wallet_id) - 6) + wallet_id[-3:],
            'processor': self.processor_name
        }
    
    def refund_payment(self, transaction_id, amount):
        """디지털 지갑 환불 처리"""
        self.validate_amount(amount)
        
        return {
            'success': True,
            'refund_id': f"REF_{transaction_id}",
            'refund_amount': amount,  # 즉시 환불
            'refund_fee': 0,
            'processor': self.processor_name,
            'note': "즉시 지갑으로 환불됩니다."
        }

class PaymentGateway:
    """결제 게이트웨이 - 다형성을 활용한 통합 결제 시스템"""
    
    def __init__(self):
        self.processors = {}
        self.transaction_history = []
    
    def register_processor(self, name, processor):
        """결제 처리기 등록"""
        if not isinstance(processor, PaymentProcessor):
            raise TypeError("PaymentProcessor 인스턴스여야 합니다.")
        
        self.processors[name] = processor
        return f"{name} 결제 처리기가 등록되었습니다."
    
    def process_payment(self, processor_name, amount, **payment_details):
        """통합 결제 처리"""
        if processor_name not in self.processors:
            raise ValueError(f"등록되지 않은 결제 처리기: {processor_name}")
        
        processor = self.processors[processor_name]
        
        try:
            result = processor.process_payment(amount, **payment_details)
            
            # 거래 기록 저장
            self.transaction_history.append({
                'timestamp': datetime.datetime.now(),
                'type': 'payment',
                'processor': processor_name,
                'result': result
            })
            
            return result
            
        except Exception as e:
            error_result = {
                'success': False,
                'error': str(e),
                'processor': processor_name
            }
            
            self.transaction_history.append({
                'timestamp': datetime.datetime.now(),
                'type': 'payment_failed',
                'processor': processor_name,
                'result': error_result
            })
            
            return error_result
    
    def process_refund(self, processor_name, transaction_id, amount):
        """통합 환불 처리"""
        if processor_name not in self.processors:
            raise ValueError(f"등록되지 않은 결제 처리기: {processor_name}")
        
        processor = self.processors[processor_name]
        
        try:
            result = processor.refund_payment(transaction_id, amount)
            
            # 환불 기록 저장
            self.transaction_history.append({
                'timestamp': datetime.datetime.now(),
                'type': 'refund',
                'processor': processor_name,
                'result': result
            })
            
            return result
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'processor': processor_name
            }
    
    def get_transaction_summary(self):
        """거래 요약 정보"""
        total_transactions = len(self.transaction_history)
        successful_payments = len([t for t in self.transaction_history 
                                 if t['type'] == 'payment' and t['result']['success']])
        failed_payments = len([t for t in self.transaction_history 
                             if t['type'] == 'payment_failed'])
        refunds = len([t for t in self.transaction_history if t['type'] == 'refund'])
        
        return f"""
=== 거래 요약 ===
총 거래: {total_transactions}건
성공한 결제: {successful_payments}건
실패한 결제: {failed_payments}건
환불: {refunds}건
등록된 결제 처리기: {len(self.processors)}개
        """.strip()

# 다형성 결제 시스템 예제
print("1. 결제 게이트웨이 설정:")
gateway = PaymentGateway()

# 다양한 결제 방법으로 결제 처리:")

# 신용카드 결제
credit_result = gateway.process_payment(
    "credit_card", 
    50000,
    card_number="1234567890123456",
    expiry_date="12/25",
    cvv="123"
)
print(f"신용카드 결제 결과: {credit_result}")

# 계좌이체 결제
bank_result = gateway.process_payment(
    "bank_transfer",
    30000,
    account_number="1234567890",
    bank_code="004"
)
print(f"계좌이체 결과: {bank_result}")

# 디지털 지갑 결제
wallet_result = gateway.process_payment(
    "kakao_pay",
    25000,
    wallet_id="kakao123456",
    pin="123456"
)
print(f"카카오페이 결제 결과: {wallet_result}")

print("\n3. 환불 처리:")
if credit_result['success']:
    refund_result = gateway.process_refund(
        "credit_card",
        credit_result['transaction_id'],
        20000
    )
    print(f"신용카드 환불 결과: {refund_result}")

print("\n4. 거래 요약:")
print(gateway.get_transaction_summary())
```

## 4. 추상 클래스와 인터페이스

### 4.1 추상 클래스 (Abstract Base Class)

```python
print("\n=== 추상 클래스 ===")

from abc import ABC, abstractmethod

class DatabaseConnection(ABC):
    """데이터베이스 연결 추상 클래스"""
    
    def __init__(self, host, port, database):
        self.host = host
        self.port = port
        self.database = database
        self.is_connected = False
    
    @abstractmethod
    def connect(self):
        """연결 - 반드시 구현해야 하는 추상 메서드"""
        pass
    
    @abstractmethod
    def disconnect(self):
        """연결 해제 - 반드시 구현해야 하는 추상 메서드"""
        pass
    
    @abstractmethod
    def execute_query(self, query):
        """쿼리 실행 - 반드시 구현해야 하는 추상 메서드"""
        pass
    
    def get_connection_info(self):
        """연결 정보 - 공통 구현"""
        status = "연결됨" if self.is_connected else "연결 안됨"
        return f"Host: {self.host}:{self.port}, DB: {self.database}, Status: {status}"
    
    def validate_query(self, query):
        """쿼리 검증 - 공통 구현"""
        if not query or not isinstance(query, str):
            raise ValueError("유효하지 않은 쿼리입니다.")
        
        dangerous_keywords = ['DROP', 'DELETE', 'TRUNCATE']
        query_upper = query.upper()
        
        for keyword in dangerous_keywords:
            if keyword in query_upper:
                raise ValueError(f"위험한 쿼리가 감지되었습니다: {keyword}")
        
        return True

class MySQLConnection(DatabaseConnection):
    """MySQL 연결 클래스"""
    
    def __init__(self, host, port, database, username, password):
        super().__init__(host, port, database)
        self.username = username
        self.password = password
        self.charset = "utf8mb4"
    
    def connect(self):
        """MySQL 연결 구현"""
        try:
            # 실제로는 mysql-connector-python 등을 사용
            print(f"MySQL에 연결 중... {self.host}:{self.port}")
            self.is_connected = True
            return f"MySQL {self.database}에 성공적으로 연결되었습니다."
        except Exception as e:
            return f"MySQL 연결 실패: {e}"
    
    def disconnect(self):
        """MySQL 연결 해제 구현"""
        if self.is_connected:
            self.is_connected = False
            return "MySQL 연결이 해제되었습니다."
        return "이미 연결이 해제되어 있습니다."
    
    def execute_query(self, query):
        """MySQL 쿼리 실행 구현"""
        if not self.is_connected:
            return "먼저 데이터베이스에 연결하세요."
        
        self.validate_query(query)
        
        # 실제로는 데이터베이스에서 쿼리 실행
        print(f"MySQL에서 쿼리 실행: {query}")
        return f"MySQL 쿼리 실행 완료: {query[:50]}..."
    
    def set_charset(self, charset):
        """MySQL 특화 기능"""
        self.charset = charset
        return f"문자셋이 {charset}로 설정되었습니다."

class PostgreSQLConnection(DatabaseConnection):
    """PostgreSQL 연결 클래스"""
    
    def __init__(self, host, port, database, username, password):
        super().__init__(host, port, database)
        self.username = username
        self.password = password
        self.schema = "public"
    
    def connect(self):
        """PostgreSQL 연결 구현"""
        try:
            print(f"PostgreSQL에 연결 중... {self.host}:{self.port}")
            self.is_connected = True
            return f"PostgreSQL {self.database}에 성공적으로 연결되었습니다."
        except Exception as e:
            return f"PostgreSQL 연결 실패: {e}"
    
    def disconnect(self):
        """PostgreSQL 연결 해제 구현"""
        if self.is_connected:
            self.is_connected = False
            return "PostgreSQL 연결이 해제되었습니다."
        return "이미 연결이 해제되어 있습니다."
    
    def execute_query(self, query):
        """PostgreSQL 쿼리 실행 구현"""
        if not self.is_connected:
            return "먼저 데이터베이스에 연결하세요."
        
        self.validate_query(query)
        
        print(f"PostgreSQL에서 쿼리 실행: {query}")
        return f"PostgreSQL 쿼리 실행 완료: {query[:50]}..."
    
    def set_schema(self, schema):
        """PostgreSQL 특화 기능"""
        self.schema = schema
        return f"스키마가 {schema}로 설정되었습니다."

class SQLiteConnection(DatabaseConnection):
    """SQLite 연결 클래스"""
    
    def __init__(self, database_file):
        super().__init__("localhost", 0, database_file)
        self.database_file = database_file
    
    def connect(self):
        """SQLite 연결 구현"""
        try:
            print(f"SQLite 파일에 연결 중... {self.database_file}")
            self.is_connected = True
            return f"SQLite {self.database_file}에 성공적으로 연결되었습니다."
        except Exception as e:
            return f"SQLite 연결 실패: {e}"
    
    def disconnect(self):
        """SQLite 연결 해제 구현"""
        if self.is_connected:
            self.is_connected = False
            return "SQLite 연결이 해제되었습니다."
        return "이미 연결이 해제되어 있습니다."
    
    def execute_query(self, query):
        """SQLite 쿼리 실행 구현"""
        if not self.is_connected:
            return "먼저 데이터베이스에 연결하세요."
        
        self.validate_query(query)
        
        print(f"SQLite에서 쿼리 실행: {query}")
        return f"SQLite 쿼리 실행 완료: {query[:50]}..."
    
    def vacuum_database(self):
        """SQLite 특화 기능"""
        if self.is_connected:
            return "데이터베이스 VACUUM 작업이 완료되었습니다."
        return "연결된 데이터베이스가 없습니다."

def database_operations(db_connection):
    """추상 클래스를 활용한 통합 데이터베이스 작업"""
    print(f"\n=== {db_connection.__class__.__name__} 작업 ===")
    print(db_connection.get_connection_info())
    
    # 연결
    print(db_connection.connect())
    print(db_connection.get_connection_info())
    
    # 쿼리 실행
    queries = [
        "SELECT * FROM users",
        "INSERT INTO users (name, email) VALUES ('김철수', 'kim@email.com')",
        "UPDATE users SET email = 'new@email.com' WHERE id = 1"
    ]
    
    for query in queries:
        try:
            result = db_connection.execute_query(query)
            print(result)
        except ValueError as e:
            print(f"쿼리 오류: {e}")
    
    # 연결 해제
    print(db_connection.disconnect())

# 추상 클래스 예제
print("1. 다양한 데이터베이스 연결:")

# 다양한 데이터베이스 연결 객체 생성
mysql_db = MySQLConnection("localhost", 3306, "myapp", "user", "password")
postgres_db = PostgreSQLConnection("localhost", 5432, "myapp", "user", "password")
sqlite_db = SQLiteConnection("myapp.db")

# 다형성을 활용한 동일한 인터페이스로 처리
databases = [mysql_db, postgres_db, sqlite_db]

for db in databases:
    database_operations(db)

print("\n2. 데이터베이스별 특화 기능:")
print(mysql_db.set_charset("utf8"))
print(postgres_db.set_schema("custom_schema"))
print(sqlite_db.vacuum_database())

print("\n3. 추상 클래스 인스턴스 생성 시도:")
try:
    # 추상 클래스는 직접 인스턴스화할 수 없음
    abstract_db = DatabaseConnection("host", 5432, "db")
except TypeError as e:
    print(f"추상 클래스 인스턴스화 오류: {e}")
```

### 4.2 인터페이스 패턴 구현

```python
print("\n=== 인터페이스 패턴 구현 ===")

from abc import ABC, abstractmethod

# 인터페이스: 메서드 시그니처만 정의하는 순수 추상 클래스
class Drawable(ABC):
    """그리기 가능한 객체 인터페이스"""
    
    @abstractmethod
    def draw(self):
        """그리기"""
        pass
    
    @abstractmethod
    def get_area(self):
        """넓이 구하기"""
        pass

class Movable(ABC):
    """이동 가능한 객체 인터페이스"""
    
    @abstractmethod
    def move(self, x, y):
        """이동하기"""
        pass
    
    @abstractmethod
    def get_position(self):
        """위치 구하기"""
        pass

class Resizable(ABC):
    """크기 조절 가능한 객체 인터페이스"""
    
    @abstractmethod
    def resize(self, scale_factor):
        """크기 조절"""
        pass
    
    @abstractmethod
    def get_size(self):
        """크기 구하기"""
        pass

# 다중 인터페이스 구현
class GraphicRectangle(Drawable, Movable, Resizable):
    """그래픽 직사각형 - 여러 인터페이스 구현"""
    
    def __init__(self, x, y, width, height, color="black"):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = color
    
    # Drawable 인터페이스 구현
    def draw(self):
        return f"{self.color} 직사각형을 ({self.x}, {self.y})에 그립니다. 크기: {self.width}×{self.height}"
    
    def get_area(self):
        return self.width * self.height
    
    # Movable 인터페이스 구현
    def move(self, x, y):
        self.x += x
        self.y += y
        return f"직사각형을 ({x}, {y})만큼 이동했습니다. 새 위치: ({self.x}, {self.y})"
    
    def get_position(self):
        return (self.x, self.y)
    
    # Resizable 인터페이스 구현
    def resize(self, scale_factor):
        if scale_factor <= 0:
            raise ValueError("크기 조절 비율은 양수여야 합니다.")
        
        self.width *= scale_factor
        self.height *= scale_factor
        return f"직사각형 크기를 {scale_factor}배로 조절했습니다. 새 크기: {self.width}×{self.height}"
    
    def get_size(self):
        return (self.width, self.height)

class GraphicCircle(Drawable, Movable, Resizable):
    """그래픽 원 - 여러 인터페이스 구현"""
    
    def __init__(self, x, y, radius, color="black"):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
    
    # Drawable 인터페이스 구현
    def draw(self):
        return f"{self.color} 원을 ({self.x}, {self.y})에 그립니다. 반지름: {self.radius}"
    
    def get_area(self):
        import math
        return math.pi * self.radius ** 2
    
    # Movable 인터페이스 구현
    def move(self, x, y):
        self.x += x
        self.y += y
        return f"원을 ({x}, {y})만큼 이동했습니다. 새 위치: ({self.x}, {self.y})"
    
    def get_position(self):
        return (self.x, self.y)
    
    # Resizable 인터페이스 구현
    def resize(self, scale_factor):
        if scale_factor <= 0:
            raise ValueError("크기 조절 비율은 양수여야 합니다.")
        
        self.radius *= scale_factor
        return f"원의 크기를 {scale_factor}배로 조절했습니다. 새 반지름: {self.radius}"
    
    def get_size(self):
        return self.radius

class SimpleText(Drawable, Movable):
    """단순 텍스트 - 일부 인터페이스만 구현"""
    
    def __init__(self, x, y, text, font_size=12):
        self.x = x
        self.y = y
        self.text = text
        self.font_size = font_size
    
    # Drawable 인터페이스 구현
    def draw(self):
        return f"텍스트 '{self.text}'를 ({self.x}, {self.y})에 그립니다. 폰트 크기: {self.font_size}"
    
    def get_area(self):
        # 텍스트의 대략적인 넓이 (폰트 크기 기반)
        return len(self.text) * self.font_size * 0.6 * self.font_size
    
    # Movable 인터페이스 구현
    def move(self, x, y):
        self.x += x
        self.y += y
        return f"텍스트를 ({x}, {y})만큼 이동했습니다. 새 위치: ({self.x}, {self.y})"
    
    def get_position(self):
        return (self.x, self.y)

# 인터페이스 기반 함수들
def draw_all(drawable_objects):
    """그리기 가능한 모든 객체 그리기"""
    print("=== 모든 객체 그리기 ===")
    for obj in drawable_objects:
        print(f"- {obj.draw()}")
        print(f"  넓이: {obj.get_area():.2f}")

def move_all(movable_objects, dx, dy):
    """이동 가능한 모든 객체 이동"""
    print(f"\n=== 모든 객체를 ({dx}, {dy})만큼 이동 ===")
    for obj in movable_objects:
        print(f"- {obj.move(dx, dy)}")

def resize_all(resizable_objects, scale):
    """크기 조절 가능한 모든 객체 크기 조절"""
    print(f"\n=== 모든 객체 크기를 {scale}배로 조절 ===")
    for obj in resizable_objects:
        if isinstance(obj, Resizable):
            print(f"- {obj.resize(scale)}")

def process_graphics(objects):
    """그래픽 객체들을 인터페이스별로 처리"""
    print("\n=== 인터페이스별 객체 분류 및 처리 ===")
    
    drawable_objects = [obj for obj in objects if isinstance(obj, Drawable)]
    movable_objects = [obj for obj in objects if isinstance(obj, Movable)]
    resizable_objects = [obj for obj in objects if isinstance(obj, Resizable)]
    
    print(f"그리기 가능한 객체: {len(drawable_objects)}개")
    print(f"이동 가능한 객체: {len(movable_objects)}개")
    print(f"크기 조절 가능한 객체: {len(resizable_objects)}개")
    
    # 각 인터페이스별 작업 수행
    draw_all(drawable_objects)
    move_all(movable_objects, 10, 5)
    resize_all(resizable_objects, 1.5)

# 인터페이스 패턴 예제
print("1. 다양한 그래픽 객체 생성:")
rect = GraphicRectangle(0, 0, 100, 50, "빨간색")
circle = GraphicCircle(50, 50, 30, "파란색")
text = SimpleText(10, 10, "안녕하세요!", 16)

graphics_objects = [rect, circle, text]

print("\n2. 초기 상태:")
for i, obj in enumerate(graphics_objects, 1):
    print(f"{i}. {obj.__class__.__name__}: {obj.draw()}")

print("\n3. 인터페이스 기반 처리:")
process_graphics(graphics_objects)

print("\n4. 처리 후 상태:")
for i, obj in enumerate(graphics_objects, 1):
    print(f"{i}. {obj.__class__.__name__}: {obj.draw()}")
    print(f"   위치: {obj.get_position()}")
    if isinstance(obj, Resizable):
        print(f"   크기: {obj.get_size()}")

print("\n5. 인터페이스 확인:")
for obj in graphics_objects:
    interfaces = []
    if isinstance(obj, Drawable):
        interfaces.append("Drawable")
    if isinstance(obj, Movable):
        interfaces.append("Movable")
    if isinstance(obj, Resizable):
        interfaces.append("Resizable")
    
    print(f"{obj.__class__.__name__}: {', '.join(interfaces)}")
```

## 5. 다중 상속과 MRO

### 5.1 다중 상속 기본

```python
print("\n=== 다중 상속과 MRO ===")

class Flyable:
    """날 수 있는 능력"""
    
    def __init__(self):
        self.altitude = 0
        self.is_flying = False
    
    def take_off(self):
        """이륙"""
        if not self.is_flying:
            self.is_flying = True
            self.altitude = 100
            return f"{self.__class__.__name__}이(가) 이륙했습니다. 고도: {self.altitude}m"
        return "이미 비행 중입니다."
    
    def land(self):
        """착륙"""
        if self.is_flying:
            self.is_flying = False
            self.altitude = 0
            return f"{self.__class__.__name__}이(가) 착륙했습니다."
        return "이미 착륙해 있습니다."
    
    def fly_to_altitude(self, target_altitude):
        """고도 변경"""
        if self.is_flying:
            self.altitude = target_altitude
            return f"고도를 {target_altitude}m로 변경했습니다."
        return "먼저 이륙하세요."

class Swimmable:
    """수영할 수 있는 능력"""
    
    def __init__(self):
        self.depth = 0
        self.is_swimming = False
    
    def dive(self):
        """다이빙"""
        if not self.is_swimming:
            self.is_swimming = True
            self.depth = 5
            return f"{self.__class__.__name__}이(가) 물에 들어갔습니다. 깊이: {self.depth}m"
        return "이미 수영 중입니다."
    
    def surface(self):
        """수면으로"""
        if self.is_swimming:
            self.is_swimming = False
            self.depth = 0
            return f"{self.__class__.__name__}이(가) 수면으로 올라왔습니다."
        return "물에 있지 않습니다."
    
    def swim_to_depth(self, target_depth):
        """깊이 변경"""
        if self.is_swimming:
            self.depth = target_depth
            return f"깊이를 {target_depth}m로 변경했습니다."
        return "먼저 물에 들어가세요."

class Animal:
    """동물 기본 클래스"""
    
    def __init__(self, name, species):
        self.name = name
        self.species = species
        self.energy = 100
    
    def eat(self, food):
        """먹기"""
        self.energy = min(100, self.energy + 20)
        return f"{self.name}이(가) {food}을(를) 먹어서 에너지가 {self.energy}이 되었습니다."
    
    def rest(self):
        """휴식"""
        self.energy = min(100, self.energy + 30)
        return f"{self.name}이(가) 휴식을 취해서 에너지가 {self.energy}이 되었습니다."
    
    def get_status(self):
        """상태 확인"""
        return f"{self.name} ({self.species}) - 에너지: {self.energy}"

# 다중 상속 예제
class Duck(Animal, Flyable, Swimmable):
    """오리 - 날고 수영도 가능한 동물"""
    
    def __init__(self, name):
        # 다중 상속 시 모든 부모 클래스 초기화
        Animal.__init__(self, name, "오리")
        Flyable.__init__(self)
        Swimmable.__init__(self)
        self.feathers_waterproof = True
    
    def quack(self):
        """꽥꽥"""
        return f"{self.name}이(가) 꽥꽥 웁니다."
    
    def preen_feathers(self):
        """깃털 정리"""
        return f"{self.name}이(가) 깃털을 정리합니다."

class Penguin(Animal, Swimmable):
    """펭귄 - 수영만 가능한 동물 (날지 못함)"""
    
    def __init__(self, name):
        Animal.__init__(self, name, "펭귄")
        Swimmable.__init__(self)
        self.blubber_thickness = 5  # 지방층 두께(cm)
    
    def slide_on_ice(self):
        """얼음 위에서 미끄러지기"""
        return f"{self.name}이(가) 얼음 위에서 미끄러집니다."
    
    def huddle_for_warmth(self):
        """추위에 몸을 움츠리기"""
        return f"{self.name}이(가) 추위에 몸을 움츠립니다."

class Eagle(Animal, Flyable):
    """독수리 - 날기만 가능한 동물 (수영 못함)"""
    
    def __init__(self, name):
        Animal.__init__(self, name, "독수리")
        Flyable.__init__(self)
        self.wing_span = 200  # 날개 길이(cm)
    
    def hunt(self):
        """사냥"""
        if self.is_flying:
            return f"{self.name}이(가) 하늘에서 사냥합니다."
        return f"{self.name}이(가) 지상에서 사냥합니다."
    
    def screech(self):
        """날카로운 울음"""
        return f"{self.name}이(가) 날카롭게 웁니다."

# MRO (Method Resolution Order) 확인
print("1. MRO (메서드 해결 순서) 확인:")
print(f"Duck의 MRO: {Duck.__mro__}")
print(f"Penguin의 MRO: {Penguin.__mro__}")
print(f"Eagle의 MRO: {Eagle.__mro__}")

# 다중 상속 동물들 생성 및 테스트
print("\n2. 다중 상속 동물들:")

# 오리 (날고 수영 모두 가능)
duck = Duck("도널드")
print(f"\n=== {duck.name} 오리 ===")
print(duck.get_status())
print(duck.quack())
print(duck.take_off())
print(duck.fly_to_altitude(200))
print(duck.land())
print(duck.dive())
print(duck.swim_to_depth(3))
print(duck.surface())

# 펭귄 (수영만 가능)
penguin = Penguin("핑구")
print(f"\n=== {penguin.name} 펭귄 ===")
print(penguin.get_status())
print(penguin.slide_on_ice())
print(penguin.dive())
print(penguin.swim_to_depth(10))
print(penguin.surface())

# 독수리 (날기만 가능)
eagle = Eagle("이글")
print(f"\n=== {eagle.name} 독수리 ===")
print(eagle.get_status())
print(eagle.take_off())
print(eagle.hunt())
print(eagle.fly_to_altitude(500))
print(eagle.screech())
print(eagle.land())

print("\n3. 능력별 동물 분류:")
animals = [duck, penguin, eagle]

flying_animals = [animal for animal in animals if isinstance(animal, Flyable)]
swimming_animals = [animal for animal in animals if isinstance(animal, Swimmable)]

print(f"날 수 있는 동물: {[animal.name for animal in flying_animals]}")
print(f"수영할 수 있는 동물: {[animal.name for animal in swimming_animals]}")

print("\n4. 다형성을 활용한 처리:")
def test_animal_abilities(animal):
    """동물의 능력 테스트"""
    print(f"\n--- {animal.name} 능력 테스트 ---")
    
    # 모든 동물이 가진 기본 능력
    print(animal.eat("물고기"))
    
    # 날 수 있는 경우
    if isinstance(animal, Flyable):
        print(animal.take_off())
        print(animal.land())
    else:
        print(f"{animal.name}은(는) 날 수 없습니다.")
    
    # 수영할 수 있는 경우
    if isinstance(animal, Swimmable):
        print(animal.dive())
        print(animal.surface())
    else:
        print(f"{animal.name}은(는) 수영할 수 없습니다.")

for animal in animals:
    test_animal_abilities(animal)
```

### 5.2 복잡한 다중 상속과 다이아몬드 문제

```python
print("\n=== 다이아몬드 문제와 super() ===")

class A:
    """최상위 클래스"""
    
    def __init__(self):
        print("A 클래스 초기화")
        self.value_a = "A"
    
    def method(self):
        print("A의 method 호출")
        return "A"

class B(A):
    """A를 상속받는 클래스"""
    
    def __init__(self):
        print("B 클래스 초기화 시작")
        super().__init__()
        print("B 클래스 초기화 완료")
        self.value_b = "B"
    
    def method(self):
        print("B의 method 호출")
        result = super().method()
        return f"B -> {result}"

class C(A):
    """A를 상속받는 다른 클래스"""
    
    def __init__(self):
        print("C 클래스 초기화 시작")
        super().__init__()
        print("C 클래스 초기화 완료")
        self.value_c = "C"
    
    def method(self):
        print("C의 method 호출")
        result = super().method()
        return f"C -> {result}"

class D(B, C):
    """B와 C를 모두 상속받는 클래스 (다이아몬드 구조)"""
    
    def __init__(self):
        print("D 클래스 초기화 시작")
        super().__init__()
        print("D 클래스 초기화 완료")
        self.value_d = "D"
    
    def method(self):
        print("D의 method 호출")
        result = super().method()
        return f"D -> {result}"
    
    def show_all_values(self):
        """모든 값 표시"""
        return f"A: {self.value_a}, B: {self.value_b}, C: {self.value_c}, D: {self.value_d}"

print("1. 다이아몬드 상속 구조:")
print("    A")
print("   / \\")
print("  B   C")
print("   \\ /")
print("    D")

print("\n2. MRO 확인:")
print(f"D의 MRO: {D.__mro__}")

print("\n3. 객체 생성 시 초기화 순서:")
d = D()

print("\n4. 메서드 호출 순서:")
result = d.method()
print(f"최종 결과: {result}")

print("\n5. 모든 값 확인:")
print(d.show_all_values())

# 더 복잡한 다중 상속 예제
print("\n=== 복잡한 다중 상속 시나리오 ===")

class Device:
    """장치 기본 클래스"""
    
    def __init__(self, name):
        self.name = name
        self.is_on = False
        print(f"Device '{name}' 초기화")
    
    def power_on(self):
        self.is_on = True
        return f"{self.name} 전원 켜짐"
    
    def power_off(self):
        self.is_on = False
        return f"{self.name} 전원 꺼짐"

class NetworkEnabled:
    """네트워크 기능"""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.ip_address = None
        self.is_connected = False
        print("NetworkEnabled 초기화")
    
    def connect_to_network(self, ip):
        self.ip_address = ip
        self.is_connected = True
        return f"네트워크에 연결됨: {ip}"
    
    def disconnect_from_network(self):
        self.is_connected = False
        return "네트워크에서 연결 해제됨"

class AudioCapable:
    """오디오 기능"""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.volume = 50
        self.is_muted = False
        print("AudioCapable 초기화")
    
    def play_audio(self, audio_file):
        if not self.is_muted:
            return f"오디오 재생: {audio_file} (볼륨: {self.volume})"
        return "음소거 상태입니다"
    
    def set_volume(self, volume):
        self.volume = max(0, min(100, volume))
        return f"볼륨 설정: {self.volume}"
    
    def toggle_mute(self):
        self.is_muted = not self.is_muted
        status = "음소거" if self.is_muted else "음소거 해제"
        return f"{status}됨"

class DisplayCapable:
    """디스플레이 기능"""
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.brightness = 70
        self.resolution = "1920x1080"
        print("DisplayCapable 초기화")
    
    def show_content(self, content):
        return f"화면에 표시: {content} (밝기: {self.brightness}%, 해상도: {self.resolution})"
    
    def adjust_brightness(self, brightness):
        self.brightness = max(0, min(100, brightness))
        return f"밝기 조절: {self.brightness}%"
    
    def change_resolution(self, resolution):
        self.resolution = resolution
        return f"해상도 변경: {resolution}"

class SmartTV(Device, NetworkEnabled, AudioCapable, DisplayCapable):
    """스마트 TV - 모든 기능을 가진 복합 장치"""
    
    def __init__(self, name, brand):
        self.brand = brand
        super().__init__(name=name)
        self.current_channel = 1
        self.apps_installed = []
        print(f"SmartTV '{name}' 초기화 완료")
    
    def change_channel(self, channel):
        self.current_channel = channel
        return f"채널 {channel}으로 변경"
    
    def install_app(self, app_name):
        if self.is_connected:
            self.apps_installed.append(app_name)
            return f"앱 '{app_name}' 설치 완료"
        return "네트워크에 연결되지 않음"
    
    def launch_app(self, app_name):
        if app_name in self.apps_installed:
            return f"앱 '{app_name}' 실행"
        return f"앱 '{app_name}'이 설치되지 않음"
    
    def get_device_info(self):
        status = "켜짐" if self.is_on else "꺼짐"
        network_status = f"연결됨 ({self.ip_address})" if self.is_connected else "연결 안됨"
        
        return f"""
=== {self.brand} {self.name} 정보 ===
전원: {status}
네트워크: {network_status}
현재 채널: {self.current_channel}
볼륨: {self.volume} (음소거: {self.is_muted})
밝기: {self.brightness}%
해상도: {self.resolution}
설치된 앱: {', '.join(self.apps_installed) if self.apps_installed else '없음'}
        """.strip()

print("1. 복잡한 다중 상속 객체 생성:")
tv = SmartTV("거실 TV", "삼성")

print(f"\n2. SmartTV의 MRO:")
print(f"MRO: {SmartTV.__mro__}")

print(f"\n3. 모든 기능 테스트:")
print(tv.power_on())
print(tv.connect_to_network("192.168.1.100"))
print(tv.install_app("Netflix"))
print(tv.install_app("YouTube"))
print(tv.launch_app("Netflix"))
print(tv.show_content("영화: 아바타"))
print(tv.play_audio("영화 사운드트랙"))
print(tv.set_volume(75))
print(tv.adjust_brightness(80))
print(tv.change_channel(7))

print(f"\n4. 장치 정보:")
print(tv.get_device_info())

print(f"\n5. 다중 상속에서 super()의 동작:")
print("super()는 MRO를 따라 다음 클래스의 메서드를 호출합니다.")
print("이를 통해 다이아몬드 문제를 해결하고 모든 부모 클래스가 정확히 한 번씩 초기화됩니다.")
```

## 6. 연습 문제

### 연습 1: 게임 캐릭터 상속 시스템
RPG 게임의 캐릭터 시스템을 설계하세요. 기본 Character 클래스를 만들고, Warrior, Mage, Archer 등의 직업 클래스를 상속받아 구현하세요.

### 연습 2: 도형 계층 구조
Shape 추상 클래스를 만들고, 다양한 도형(Circle, Rectangle, Triangle 등)을 상속받아 구현하세요. 각 도형은 넓이와 둘레를 계산할 수 있어야 합니다.

### 연습 3: 직원 관리 시스템
Employee 기본 클래스를 만들고, FullTimeEmployee, PartTimeEmployee, Contractor 등으로 상속받아 급여 계산 시스템을 구현하세요.

### 연습 4: 미디어 플레이어 시스템
MediaPlayer 추상 클래스를 만들고, AudioPlayer, VideoPlayer, StreamingPlayer 등을 구현하여 다형성을 활용한 플레이어 시스템을 만드세요.

## 정리

이 챕터에서 학습한 내용:

1. **상속 기본**: 코드 재사용성을 높입니다
2. **super() 함수**: 부모 클래스의 기능을 안전하게 확장할 수 있습니다
3. **메서드 오버라이딩**: 기능 확장과 특화
4. **다형성**: 동일한 인터페이스로 다양한 객체 처리
5. **추상 클래스**: 공통 인터페이스 강제
6. **다중 상속**: 여러 클래스로부터 상속받기
7. **MRO**: 메서드 해결 순서와 다이아몬드 문제

다음 챕터에서는 특수 메서드(Magic Methods)를 학습하여 Python 객체를 더욱 자연스럽게 사용하는 방법을 배우겠습니다.

### 핵심 포인트
- 상속은 is-a 관계를 나타내며, 코드 재사용성을 높입니다
- super()를 사용하여 부모 클래스의 기능을 안전하게 확장할 수 있습니다
- 다형성을 통해 유연하고 확장 가능한 코드를 작성할 수 있습니다
- 추상 클래스로 공통 인터페이스를 강제할 수 있습니다
- 다중 상속 시 MRO를 이해하고 super()를 올바르게 사용해야 합니다
</rewritten_file> 