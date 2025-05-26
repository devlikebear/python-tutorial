# Chapter 2: 파일 처리와 데이터 형식 (File Processing and Data Formats)

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- JSON 데이터를 파이썬 객체로 변환하고 처리하기
- CSV 파일을 효율적으로 읽고 쓰며 분석하기
- XML 문서를 파싱하고 조작하기
- 바이너리 파일을 안전하게 처리하기
- 압축 파일(ZIP, TAR)을 생성하고 해제하기
- 설정 파일을 관리하고 활용하기
- 파일 시스템을 탐색하고 관리하기
- 데이터 직렬화/역직렬화 개념 이해하기

## 1. JSON 파일 처리

### 1.1 JSON 기본 개념과 처리

```python
import json
import datetime
from decimal import Decimal

print("=== JSON 기본 처리 ===")

# 파이썬 객체를 JSON으로 변환
data = {
    "name": "김철수",
    "age": 30,
    "city": "서울",
    "hobbies": ["독서", "영화감상", "프로그래밍"],
    "is_student": False,
    "grades": {
        "math": 85,
        "english": 92,
        "science": 78
    }
}

# JSON 문자열로 변환
json_string = json.dumps(data, ensure_ascii=False, indent=2)
print("JSON 문자열:")
print(json_string)

# JSON 문자열을 파이썬 객체로 변환
parsed_data = json.loads(json_string)
print(f"\n파싱된 데이터: {parsed_data}")
print(f"이름: {parsed_data['name']}")
print(f"취미들: {', '.join(parsed_data['hobbies'])}")

# JSON 파일 쓰기
with open('student_data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)
    
print("\nJSON 파일이 저장되었습니다: student_data.json")

# JSON 파일 읽기
with open('student_data.json', 'r', encoding='utf-8') as file:
    loaded_data = json.load(file)
    
print(f"파일에서 읽은 데이터: {loaded_data}")
```

### 1.2 복합 JSON 데이터 처리

```python
# 복잡한 JSON 데이터 예제
complex_data = {
    "metadata": {
        "version": "1.0",
        "created_at": "2024-01-01T10:00:00Z",
        "author": "Python Tutorial"
    },
    "students": [
        {
            "id": 1,
            "name": "김철수",
            "courses": [
                {"name": "파이썬 프로그래밍", "grade": 'A', "credits": 3},
                {"name": "데이터 구조", "grade": 'B+', "credits": 3}
            ],
            "contact": {
                "email": "kim@email.com",
                "phone": "010-1234-5678"
            }
        },
        {
            "id": 2,
            "name": "이영희",
            "courses": [
                {"name": "파이썬 프로그래밍", "grade": 'A+', "credits": 3},
                {"name": "알고리즘", "grade": 'A', "credits": 4}
            ],
            "contact": {
                "email": "lee@email.com",
                "phone": "010-9876-5432"
            }
        }
    ]
}

print("\n=== 복합 JSON 데이터 처리 ===")

# JSON 파일로 저장
with open('school_data.json', 'w', encoding='utf-8') as file:
    json.dump(complex_data, file, ensure_ascii=False, indent=2)

# 데이터 분석 함수들
def analyze_student_data(data):
    """학생 데이터 분석"""
    students = data['students']
    
    print(f"총 학생 수: {len(students)}")
    
    # 각 학생의 총 학점 계산
    for student in students:
        total_credits = sum(course['credits'] for course in student['courses'])
        print(f"{student['name']}: {total_credits}학점")
    
    # 과목별 수강 학생 수
    course_count = {}
    for student in students:
        for course in student['courses']:
            course_name = course['name']
            course_count[course_name] = course_count.get(course_name, 0) + 1
    
    print("\n과목별 수강 학생 수:")
    for course, count in course_count.items():
        print(f"  {course}: {count}명")

def find_student_by_id(data, student_id):
    """ID로 학생 찾기"""
    for student in data['students']:
        if student['id'] == student_id:
            return student
    return None

# 데이터 분석 실행
analyze_student_data(complex_data)

# 특정 학생 찾기
student = find_student_by_id(complex_data, 1)
if student:
    print(f"\n학생 정보: {student['name']}")
    print(f"이메일: {student['contact']['email']}")
```

### 1.3 JSON 직렬화 고급 기법

```python
import json
from datetime import datetime, date
from decimal import Decimal

class DateTimeEncoder(json.JSONEncoder):
    """날짜/시간 객체를 JSON으로 직렬화하는 커스텀 인코더"""
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

class Person:
    """사용자 정의 클래스"""
    def __init__(self, name, birth_date, salary):
        self.name = name
        self.birth_date = birth_date
        self.salary = salary
    
    def to_dict(self):
        """객체를 딕셔너리로 변환"""
        return {
            'name': self.name,
            'birth_date': self.birth_date,
            'salary': self.salary
        }
    
    @classmethod
    def from_dict(cls, data):
        """딕셔너리에서 객체 생성"""
        return cls(
            data['name'],
            datetime.fromisoformat(data['birth_date']).date(),
            Decimal(str(data['salary']))
        )

print("\n=== JSON 직렬화 고급 기법 ===")

# 복잡한 데이터 타입을 포함한 객체
person = Person(
    "김철수",
    date(1990, 5, 15),
    Decimal('3500000.50')
)

# 커스텀 인코더 사용
person_dict = person.to_dict()
json_data = json.dumps(person_dict, cls=DateTimeEncoder, ensure_ascii=False, indent=2)
print("직렬화된 데이터:")
print(json_data)

# 역직렬화
loaded_dict = json.loads(json_data)
restored_person = Person.from_dict(loaded_dict)

print(f"\n복원된 객체:")
print(f"이름: {restored_person.name}")
print(f"생년월일: {restored_person.birth_date}")
print(f"급여: {restored_person.salary}")

# JSON 스키마 검증 함수
def validate_json_structure(data, schema):
    """간단한 JSON 스키마 검증"""
    def check_type(value, expected_type):
        if expected_type == 'string':
            return isinstance(value, str)
        elif expected_type == 'number':
            return isinstance(value, (int, float))
        elif expected_type == 'boolean':
            return isinstance(value, bool)
        elif expected_type == 'array':
            return isinstance(value, list)
        elif expected_type == 'object':
            return isinstance(value, dict)
        return False
    
    for key, expected_type in schema.items():
        if key not in data:
            return False, f"필수 필드 '{key}'가 없습니다"
        
        if not check_type(data[key], expected_type):
            return False, f"필드 '{key}'의 타입이 잘못되었습니다. 예상: {expected_type}"
    
    return True, "유효한 구조입니다"

# 스키마 검증 예제
user_schema = {
    'name': 'string',
    'age': 'number',
    'email': 'string',
    'is_active': 'boolean'
}

valid_user = {
    'name': '김철수',
    'age': 30,
    'email': 'kim@email.com',
    'is_active': True
}

invalid_user = {
    'name': '이영희',
    'age': '25',  # 문자열이지만 숫자여야 함
    'email': 'lee@email.com'
    # is_active 필드 누락
}

print(f"\n=== JSON 스키마 검증 ===")
is_valid, message = validate_json_structure(valid_user, user_schema)
print(f"유효한 사용자: {is_valid} - {message}")

is_valid, message = validate_json_structure(invalid_user, user_schema)
print(f"무효한 사용자: {is_valid} - {message}")
```

## 2. CSV 파일 처리

### 2.1 CSV 기본 처리

```python
import csv
from io import StringIO

print("\n=== CSV 기본 처리 ===")

# CSV 데이터 생성
students_data = [
    ['이름', '나이', '도시', '성적'],
    ['김철수', 25, '서울', 85],
    ['이영희', 23, '부산', 92],
    ['박민수', 24, '대구', 78],
    ['최지원', 22, '인천', 95]
]

# CSV 파일 쓰기
with open('students.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(students_data)

print("CSV 파일이 생성되었습니다: students.csv")

# CSV 파일 읽기
with open('students.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    
    print("\nCSV 파일 내용:")
    for row_num, row in enumerate(reader):
        if row_num == 0:
            print(f"헤더: {row}")
        else:
            print(f"학생 {row_num}: {row}")

# DictReader와 DictWriter 사용
print("\n=== DictReader와 DictWriter ===")

# DictWriter로 쓰기
fieldnames = ['name', 'age', 'city', 'grade']
students_dict = [
    {'name': '김철수', 'age': 25, 'city': '서울', 'grade': 85},
    {'name': '이영희', 'age': 23, 'city': '부산', 'grade': 92},
    {'name': '박민수', 'age': 24, 'city': '대구', 'grade': 78},
    {'name': '최지원', 'age': 22, 'city': '인천', 'grade': 95}
]

with open('students_dict.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(students_dict)

# DictReader로 읽기
with open('students_dict.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    print("DictReader로 읽은 데이터:")
    for row in reader:
        print(f"{row['name']}: {row['age']}세, {row['city']}, 성적 {row['grade']}")
```

### 2.2 CSV 데이터 분석 및 처리

```python
import csv
import statistics
from collections import defaultdict, Counter

def create_sample_sales_data():
    """샘플 판매 데이터 생성"""
    sales_data = [
        ['date', 'product', 'category', 'quantity', 'price', 'salesperson'],
        ['2024-01-01', '노트북', '전자제품', 2, 1200000, '김철수'],
        ['2024-01-02', '마우스', '전자제품', 5, 25000, '이영희'],
        ['2024-01-03', '키보드', '전자제품', 3, 80000, '김철수'],
        ['2024-01-04', '모니터', '전자제품', 1, 300000, '박민수'],
        ['2024-01-05', '헤드폰', '전자제품', 4, 150000, '이영희'],
        ['2024-01-06', '스피커', '전자제품', 2, 200000, '김철수'],
        ['2024-01-07', '웹캠', '전자제품', 6, 100000, '박민수'],
        ['2024-01-08', '태블릿', '전자제품', 1, 800000, '이영희'],
    ]
    
    with open('sales_data.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(sales_data)

def analyze_sales_data():
    """판매 데이터 분석"""
    print("\n=== CSV 데이터 분석 ===")
    
    # 데이터 읽기 및 변환
    sales_records = []
    with open('sales_data.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # 데이터 타입 변환
            record = {
                'date': row['date'],
                'product': row['product'],
                'category': row['category'],
                'quantity': int(row['quantity']),
                'price': int(row['price']),
                'salesperson': row['salesperson']
            }
            record['total_sales'] = record['quantity'] * record['price']
            sales_records.append(record)
    
    # 총 매출 계산
    total_revenue = sum(record['total_sales'] for record in sales_records)
    print(f"총 매출: {total_revenue:,}원")
    
    # 판매원별 매출
    salesperson_sales = defaultdict(int)
    for record in sales_records:
        salesperson_sales[record['salesperson']] += record['total_sales']
    
    print("\n판매원별 매출:")
    for person, sales in sorted(salesperson_sales.items(), key=lambda x: x[1], reverse=True):
        print(f"  {person}: {sales:,}원")
    
    # 제품별 판매 수량
    product_quantity = defaultdict(int)
    for record in sales_records:
        product_quantity[record['product']] += record['quantity']
    
    print("\n제품별 판매 수량:")
    for product, quantity in sorted(product_quantity.items(), key=lambda x: x[1], reverse=True):
        print(f"  {product}: {quantity}개")
    
    # 평균 단가 계산
    prices = [record['price'] for record in sales_records]
    avg_price = statistics.mean(prices)
    median_price = statistics.median(prices)
    
    print(f"\n가격 통계:")
    print(f"  평균 단가: {avg_price:,.0f}원")
    print(f"  중간 단가: {median_price:,}원")
    print(f"  최고 단가: {max(prices):,}원")
    print(f"  최저 단가: {min(prices):,}원")

def export_analysis_results():
    """분석 결과를 새로운 CSV 파일로 내보내기"""
    # 판매원별 요약 데이터 생성
    with open('sales_data.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        salesperson_stats = defaultdict(lambda: {
            'total_sales': 0,
            'total_quantity': 0,
            'products_sold': set()
        })
        
        for row in reader:
            person = row['salesperson']
            quantity = int(row['quantity'])
            price = int(row['price'])
            
            salesperson_stats[person]['total_sales'] += quantity * price
            salesperson_stats[person]['total_quantity'] += quantity
            salesperson_stats[person]['products_sold'].add(row['product'])
    
    # 요약 리포트 생성
    summary_data = []
    for person, stats in salesperson_stats.items():
        summary_data.append({
            'salesperson': person,
            'total_sales': stats['total_sales'],
            'total_quantity': stats['total_quantity'],
            'unique_products': len(stats['products_sold']),
            'avg_sale_amount': stats['total_sales'] // stats['total_quantity']
        })
    
    # CSV 파일로 저장
    with open('sales_summary.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['salesperson', 'total_sales', 'total_quantity', 'unique_products', 'avg_sale_amount']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(summary_data)
    
    print("\n판매원 요약 리포트가 생성되었습니다: sales_summary.csv")

# 샘플 데이터 생성 및 분석 실행
create_sample_sales_data()
analyze_sales_data()
export_analysis_results()
```

### 2.3 CSV 파일 고급 처리 기법

```python
import csv
from datetime import datetime
import re

class CSVProcessor:
    """CSV 파일 처리를 위한 클래스"""
    
    def __init__(self, filename, delimiter=',', quotechar='"'):
        self.filename = filename
        self.delimiter = delimiter
        self.quotechar = quotechar
        self.data = []
        self.headers = []
    
    def load_data(self):
        """CSV 파일 데이터 로드"""
        try:
            with open(self.filename, 'r', encoding='utf-8') as csvfile:
                # 구분자 자동 감지
                sample = csvfile.read(1024)
                csvfile.seek(0)
                
                sniffer = csv.Sniffer()
                dialect = sniffer.sniff(sample)
                
                reader = csv.DictReader(csvfile, dialect=dialect)
                self.headers = reader.fieldnames
                self.data = list(reader)
                
            print(f"✓ {len(self.data)}개의 레코드를 로드했습니다.")
            return True
            
        except FileNotFoundError:
            print(f"✗ 파일을 찾을 수 없습니다: {self.filename}")
            return False
        except Exception as e:
            print(f"✗ 파일 로드 중 오류 발생: {e}")
            return False
    
    def validate_data(self, validation_rules):
        """데이터 검증"""
        errors = []
        
        for row_num, row in enumerate(self.data, 1):
            for field, rule in validation_rules.items():
                if field not in row:
                    continue
                
                value = row[field].strip()
                
                # 필수 필드 체크
                if rule.get('required', False) and not value:
                    errors.append(f"행 {row_num}: '{field}' 필드가 비어있습니다.")
                    continue
                
                # 데이터 타입 체크
                if value and 'type' in rule:
                    if rule['type'] == 'int':
                        try:
                            int(value)
                        except ValueError:
                            errors.append(f"행 {row_num}: '{field}'는 정수여야 합니다. (현재: {value})")
                    
                    elif rule['type'] == 'float':
                        try:
                            float(value)
                        except ValueError:
                            errors.append(f"행 {row_num}: '{field}'는 숫자여야 합니다. (현재: {value})")
                    
                    elif rule['type'] == 'email':
                        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                        if not re.match(email_pattern, value):
                            errors.append(f"행 {row_num}: '{field}'는 유효한 이메일 형식이어야 합니다. (현재: {value})")
                
                # 범위 체크
                if value and 'range' in rule:
                    try:
                        num_value = float(value)
                        min_val, max_val = rule['range']
                        if not (min_val <= num_value <= max_val):
                            errors.append(f"행 {row_num}: '{field}'는 {min_val}~{max_val} 범위여야 합니다. (현재: {value})")
                    except ValueError:
                        pass  # 타입 체크에서 이미 처리됨
        
        return errors
    
    def filter_data(self, conditions):
        """조건에 따른 데이터 필터링"""
        filtered_data = []
        
        for row in self.data:
            match = True
            
            for field, condition in conditions.items():
                if field not in row:
                    match = False
                    break
                
                value = row[field].strip()
                operator = condition.get('operator', '==')
                target = condition.get('value')
                
                try:
                    # 숫자 비교
                    if isinstance(target, (int, float)):
                        value = float(value)
                        if operator == '==' and value != target:
                            match = False
                        elif operator == '>' and value <= target:
                            match = False
                        elif operator == '<' and value >= target:
                            match = False
                        elif operator == '>=' and value < target:
                            match = False
                        elif operator == '<=' and value > target:
                            match = False
                    
                    # 문자열 비교
                    else:
                        if operator == '==' and value != target:
                            match = False
                        elif operator == 'contains' and target not in value:
                            match = False
                        elif operator == 'startswith' and not value.startswith(target):
                            match = False
                
                except ValueError:
                    match = False
                    
                if not match:
                    break
            
            if match:
                filtered_data.append(row)
        
        return filtered_data
    
    def save_data(self, data, output_filename):
        """데이터를 CSV 파일로 저장"""
        if not data:
            print("저장할 데이터가 없습니다.")
            return False
        
        try:
            with open(output_filename, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=self.headers)
                writer.writeheader()
                writer.writerows(data)
            
            print(f"✓ {len(data)}개의 레코드가 {output_filename}에 저장되었습니다.")
            return True
            
        except Exception as e:
            print(f"✗ 파일 저장 중 오류 발생: {e}")
            return False

# CSV 프로세서 사용 예제
print("\n=== CSV 고급 처리 예제 ===")

# 샘플 직원 데이터 생성
employee_data = [
    ['name', 'age', 'department', 'salary', 'email'],
    ['김철수', '28', 'IT', '3500000', 'kim@company.com'],
    ['이영희', '32', 'HR', '4000000', 'lee@company.com'],
    ['박민수', '', 'IT', '3200000', 'park@company.com'],  # 나이 누락
    ['최지원', '29', 'Sales', '3800000', 'choi-invalid-email'],  # 잘못된 이메일
    ['정현우', '35', 'IT', 'invalid', 'jung@company.com'],  # 잘못된 급여
    ['한미영', '27', 'Marketing', '3600000', 'han@company.com']
]

with open('employees.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(employee_data)

# CSV 프로세서 사용
processor = CSVProcessor('employees.csv')

if processor.load_data():
    # 데이터 검증 규칙 정의
    validation_rules = {
        'name': {'required': True},
        'age': {'required': True, 'type': 'int', 'range': (18, 65)},
        'salary': {'required': True, 'type': 'int', 'range': (2000000, 10000000)},
        'email': {'required': True, 'type': 'email'}
    }
    
    # 데이터 검증
    errors = processor.validate_data(validation_rules)
    if errors:
        print("\n데이터 검증 오류:")
        for error in errors:
            print(f"  • {error}")
    else:
        print("\n✓ 모든 데이터가 유효합니다.")
    
    # 데이터 필터링 (IT 부서, 급여 3500000 이상)
    filtered_data = processor.filter_data({
        'department': {'operator': '==', 'value': 'IT'},
        'salary': {'operator': '>=', 'value': 3500000}
    })
    
    print(f"\n필터링 결과: {len(filtered_data)}개의 레코드")
    for record in filtered_data:
        print(f"  {record['name']}: {record['department']}, {record['salary']}원")
    
    # 필터링된 데이터 저장
    if filtered_data:
        processor.save_data(filtered_data, 'it_high_salary.csv')
```

## 3. XML 파일 처리

### 3.1 XML 기본 파싱

```python
import xml.etree.ElementTree as ET
from xml.dom import minidom

print("\n=== XML 기본 처리 ===")

# XML 문서 생성
def create_sample_xml():
    """샘플 XML 데이터 생성"""
    root = ET.Element("library")
    
    # 책 1
    book1 = ET.SubElement(root, "book", id="1")
    ET.SubElement(book1, "title").text = "파이썬 프로그래밍"
    ET.SubElement(book1, "author").text = "김철수"
    ET.SubElement(book1, "year").text = "2023"
    ET.SubElement(book1, "price").text = "25000"
    ET.SubElement(book1, "category").text = "programming"
    
    # 책 2
    book2 = ET.SubElement(root, "book", id="2")
    ET.SubElement(book2, "title").text = "데이터 사이언스"
    ET.SubElement(book2, "author").text = "이영희"
    ET.SubElement(book2, "year").text = "2024"
    ET.SubElement(book2, "price").text = "30000"
    ET.SubElement(book2, "category").text = "data-science"
    
    # 책 3
    book3 = ET.SubElement(root, "book", id="3")
    ET.SubElement(book3, "title").text = "웹 개발"
    ET.SubElement(book3, "author").text = "박민수"
    ET.SubElement(book3, "year").text = "2023"
    ET.SubElement(book3, "price").text = "28000"
    ET.SubElement(book3, "category").text = "web-development"
    
    return root

# XML 파일 생성 및 저장
xml_root = create_sample_xml()

# 예쁘게 포맷팅하여 저장
def prettify_xml(element):
    """XML을 보기 좋게 포맷팅"""
    rough_string = ET.tostring(element, encoding='unicode')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")

with open('library.xml', 'w', encoding='utf-8') as f:
    f.write(prettify_xml(xml_root))

print("XML 파일이 생성되었습니다: library.xml")

# XML 파일 읽기 및 파싱
tree = ET.parse('library.xml')
root = tree.getroot()

print(f"\n루트 엘리먼트: {root.tag}")

# 모든 책 정보 출력
print("\n모든 책 정보:")
for book in root.findall('book'):
    book_id = book.get('id')
    title = book.find('title').text
    author = book.find('author').text
    year = book.find('year').text
    price = book.find('price').text
    category = book.find('category').text
    
    print(f"  책 ID {book_id}: {title}")
    print(f"    저자: {author}")
    print(f"    출판연도: {year}")
    print(f"    가격: {price}원")
    print(f"    카테고리: {category}")
    print()
```

### 3.2 XML 고급 조작

```python
import xml.etree.ElementTree as ET
from datetime import datetime

class XMLLibraryManager:
    """XML 도서관 관리 시스템"""
    
    def __init__(self, xml_file):
        self.xml_file = xml_file
        try:
            self.tree = ET.parse(xml_file)
            self.root = self.tree.getroot()
        except FileNotFoundError:
            # 파일이 없으면 새로 생성
            self.root = ET.Element("library")
            self.tree = ET.ElementTree(self.root)
            self.save()
    
    def add_book(self, title, author, year, price, category):
        """새 책 추가"""
        # 새로운 ID 생성
        existing_ids = [int(book.get('id', 0)) for book in self.root.findall('book')]
        new_id = max(existing_ids, default=0) + 1
        
        # 새 책 엘리먼트 생성
        book = ET.SubElement(self.root, "book", id=str(new_id))
        ET.SubElement(book, "title").text = title
        ET.SubElement(book, "author").text = author
        ET.SubElement(book, "year").text = str(year)
        ET.SubElement(book, "price").text = str(price)
        ET.SubElement(book, "category").text = category
        ET.SubElement(book, "added_date").text = datetime.now().isoformat()
        
        self.save()
        print(f"✓ 책이 추가되었습니다: {title} (ID: {new_id})")
        return new_id
    
    def find_books_by_author(self, author):
        """저자별 책 검색"""
        books = []
        for book in self.root.findall('book'):
            if book.find('author').text == author:
                books.append(self._book_to_dict(book))
        return books
    
    def find_books_by_category(self, category):
        """카테고리별 책 검색"""
        books = []
        for book in self.root.findall('book'):
            if book.find('category').text == category:
                books.append(self._book_to_dict(book))
        return books
    
    def find_books_by_price_range(self, min_price, max_price):
        """가격 범위로 책 검색"""
        books = []
        for book in self.root.findall('book'):
            price = int(book.find('price').text)
            if min_price <= price <= max_price:
                books.append(self._book_to_dict(book))
        return books
    
    def update_book_price(self, book_id, new_price):
        """책 가격 업데이트"""
        book = self.root.find(f".//book[@id='{book_id}']")
        if book is not None:
            book.find('price').text = str(new_price)
            # 수정일 추가
            updated_date = book.find('updated_date')
            if updated_date is None:
                updated_date = ET.SubElement(book, 'updated_date')
            updated_date.text = datetime.now().isoformat()
            
            self.save()
            print(f"✓ 책 ID {book_id}의 가격이 {new_price}원으로 업데이트되었습니다.")
            return True
        else:
            print(f"✗ 책 ID {book_id}를 찾을 수 없습니다.")
            return False
    
    def delete_book(self, book_id):
        """책 삭제"""
        book = self.root.find(f".//book[@id='{book_id}']")
        if book is not None:
            title = book.find('title').text
            self.root.remove(book)
            self.save()
            print(f"✓ 책이 삭제되었습니다: {title} (ID: {book_id})")
            return True
        else:
            print(f"✗ 책 ID {book_id}를 찾을 수 없습니다.")
            return False
    
    def get_statistics(self):
        """도서관 통계"""
        books = self.root.findall('book')
        total_books = len(books)
        
        if total_books == 0:
            return {"total_books": 0}
        
        # 카테고리별 책 수
        categories = {}
        total_value = 0
        years = []
        
        for book in books:
            category = book.find('category').text
            categories[category] = categories.get(category, 0) + 1
            
            price = int(book.find('price').text)
            total_value += price
            
            year = int(book.find('year').text)
            years.append(year)
        
        return {
            "total_books": total_books,
            "categories": categories,
            "total_value": total_value,
            "average_price": total_value // total_books,
            "newest_year": max(years),
            "oldest_year": min(years)
        }
    
    def _book_to_dict(self, book_element):
        """XML 엘리먼트를 딕셔너리로 변환"""
        return {
            'id': book_element.get('id'),
            'title': book_element.find('title').text,
            'author': book_element.find('author').text,
            'year': int(book_element.find('year').text),
            'price': int(book_element.find('price').text),
            'category': book_element.find('category').text
        }
    
    def save(self):
        """XML 파일 저장"""
        # 예쁘게 포맷팅하여 저장
        with open(self.xml_file, 'w', encoding='utf-8') as f:
            f.write(prettify_xml(self.root))

# XML 도서관 관리 시스템 사용 예제
print("\n=== XML 도서관 관리 시스템 ===")

# 도서관 매니저 생성
library = XMLLibraryManager('library.xml')

# 새 책 추가
library.add_book("머신러닝 기초", "정현우", 2024, 35000, "machine-learning")
library.add_book("알고리즘 설계", "한미영", 2023, 32000, "programming")

# 저자별 검색
print("\n김철수가 쓴 책:")
kim_books = library.find_books_by_author("김철수")
for book in kim_books:
    print(f"  {book['title']} ({book['year']}) - {book['price']:,}원")

# 카테고리별 검색
print("\n프로그래밍 관련 책:")
programming_books = library.find_books_by_category("programming")
for book in programming_books:
    print(f"  {book['title']} by {book['author']} - {book['price']:,}원")

# 가격 범위 검색
print("\n25,000원 ~ 30,000원 책:")
mid_price_books = library.find_books_by_price_range(25000, 30000)
for book in mid_price_books:
    print(f"  {book['title']} - {book['price']:,}원")

# 가격 업데이트
library.update_book_price("1", 27000)

# 통계 출력
stats = library.get_statistics()
print(f"\n=== 도서관 통계 ===")
print(f"총 책 수: {stats['total_books']}권")
print(f"총 가치: {stats['total_value']:,}원")
print(f"평균 가격: {stats['average_price']:,}원")
print(f"출판 연도: {stats['oldest_year']} ~ {stats['newest_year']}")
print("카테고리별 분포:")
for category, count in stats['categories'].items():
    print(f"  {category}: {count}권")
```

### 3.3 XML 네임스페이스 처리

```python
import xml.etree.ElementTree as ET

# 네임스페이스가 있는 XML 문서 생성
def create_namespaced_xml():
    """네임스페이스가 있는 XML 문서 생성"""
    namespaces = {
        '': 'http://example.com/library',
        'meta': 'http://example.com/metadata',
        'auth': 'http://example.com/author'
    }
    
    # 네임스페이스 등록
    for prefix, uri in namespaces.items():
        ET.register_namespace(prefix, uri)
    
    root = ET.Element("{http://example.com/library}library")
    root.set("{http://www.w3.org/2001/XMLSchema-instance}schemaLocation", 
             "http://example.com/library library.xsd")
    
    # 메타데이터
    metadata = ET.SubElement(root, "{http://example.com/metadata}metadata")
    ET.SubElement(metadata, "{http://example.com/metadata}version").text = "1.0"
    ET.SubElement(metadata, "{http://example.com/metadata}created").text = "2024-01-01"
    
    # 책 정보
    book = ET.SubElement(root, "{http://example.com/library}book")
    book.set("id", "1")
    
    ET.SubElement(book, "{http://example.com/library}title").text = "Python Programming"
    
    # 저자 정보 (다른 네임스페이스)
    author = ET.SubElement(book, "{http://example.com/author}author")
    ET.SubElement(author, "{http://example.com/author}name").text = "김철수"
    ET.SubElement(author, "{http://example.com/author}email").text = "kim@email.com"
    
    return root

print("\n=== XML 네임스페이스 처리 ===")

# 네임스페이스 XML 생성
ns_root = create_namespaced_xml()

# 파일로 저장
with open('library_ns.xml', 'wb') as f:
    ET.ElementTree(ns_root).write(f, encoding='utf-8', xml_declaration=True)

print("네임스페이스 XML 파일이 생성되었습니다: library_ns.xml")

# 네임스페이스 XML 읽기
tree = ET.parse('library_ns.xml')
root = tree.getroot()

# 네임스페이스 정의
namespaces = {
    'lib': 'http://example.com/library',
    'meta': 'http://example.com/metadata',
    'auth': 'http://example.com/author'
}

print("\n네임스페이스 XML 파싱:")

# 메타데이터 읽기
metadata = root.find('meta:metadata', namespaces)
if metadata is not None:
    version = metadata.find('meta:version', namespaces).text
    created = metadata.find('meta:created', namespaces).text
    print(f"버전: {version}, 생성일: {created}")

# 책 정보 읽기
book = root.find('lib:book', namespaces)
if book is not None:
    title = book.find('lib:title', namespaces).text
    print(f"책 제목: {title}")
    
    # 저자 정보 읽기
    author = book.find('auth:author', namespaces)
    if author is not None:
        name = author.find('auth:name', namespaces).text
        email = author.find('auth:email', namespaces).text
        print(f"저자: {name} ({email})")
```

## 4. 바이너리 파일 처리

### 4.1 바이너리 파일 기본 처리

```python
import struct
import os
from datetime import datetime

print("\n=== 바이너리 파일 처리 ===")

# 바이너리 데이터 생성 및 저장
def create_binary_data():
    """바이너리 데이터 파일 생성"""
    # 학생 레코드 구조: ID(4바이트), 이름(20바이트), 나이(1바이트), 성적(4바이트 float)
    students = [
        (1, "김철수", 25, 85.5),
        (2, "이영희", 23, 92.0),
        (3, "박민수", 24, 78.5),
        (4, "최지원", 22, 95.0)
    ]
    
    with open('students.bin', 'wb') as f:
        for student_id, name, age, grade in students:
            # 데이터 패킹: I=unsigned int, 20s=20바이트 문자열, B=unsigned char, f=float
            name_bytes = name.encode('utf-8')[:20].ljust(20, b'\x00')
            packed_data = struct.pack('I20sBf', student_id, name_bytes, age, grade)
            f.write(packed_data)
    
    print("바이너리 파일이 생성되었습니다: students.bin")
    return len(students)

def read_binary_data():
    """바이너리 데이터 파일 읽기"""
    print("\n바이너리 파일 읽기:")
    
    record_size = struct.calcsize('I20sBf')  # 레코드 크기 계산
    
    with open('students.bin', 'rb') as f:
        record_num = 1
        while True:
            data = f.read(record_size)
            if not data:
                break
            
            # 데이터 언패킹
            student_id, name_bytes, age, grade = struct.unpack('I20sBf', data)
            name = name_bytes.rstrip(b'\x00').decode('utf-8')
            
            print(f"학생 {record_num}: ID={student_id}, 이름={name}, 나이={age}, 성적={grade:.1f}")
            record_num += 1

def update_binary_record(record_index, new_grade):
    """특정 레코드의 성적 업데이트"""
    record_size = struct.calcsize('I20sBf')
    
    # 파일을 읽기/쓰기 모드로 열기
    with open('students.bin', 'r+b') as f:
        # 해당 레코드 위치로 이동
        f.seek(record_index * record_size)
        
        # 기존 데이터 읽기
        data = f.read(record_size)
        if data:
            student_id, name_bytes, age, old_grade = struct.unpack('I20sBf', data)
            
            # 성적만 변경하여 다시 패킹
            new_data = struct.pack('I20sBf', student_id, name_bytes, age, new_grade)
            
            # 파일 포인터를 다시 해당 위치로 이동
            f.seek(record_index * record_size)
            f.write(new_data)
            
            name = name_bytes.rstrip(b'\x00').decode('utf-8')
            print(f"✓ {name}의 성적이 {old_grade:.1f}에서 {new_grade:.1f}로 업데이트되었습니다.")
        else:
            print("✗ 해당 레코드를 찾을 수 없습니다.")

# 바이너리 파일 처리 실행
student_count = create_binary_data()
read_binary_data()

# 두 번째 학생(인덱스 1)의 성적 업데이트
update_binary_record(1, 95.5)

print("\n업데이트 후 데이터:")
read_binary_data()
```

### 4.2 이미지 파일 메타데이터 처리

```python
import struct
import os

def read_bmp_header(filename):
    """BMP 파일 헤더 읽기"""
    try:
        with open(filename, 'rb') as f:
            # BMP 파일 시그니처 확인
            signature = f.read(2)
            if signature != b'BM':
                print("✗ BMP 파일이 아닙니다.")
                return None
            
            # 파일 크기
            file_size = struct.unpack('<I', f.read(4))[0]
            
            # 예약 필드 건너뛰기
            f.read(4)
            
            # 이미지 데이터 오프셋
            data_offset = struct.unpack('<I', f.read(4))[0]
            
            # DIB 헤더 크기
            dib_header_size = struct.unpack('<I', f.read(4))[0]
            
            # 이미지 크기
            width = struct.unpack('<I', f.read(4))[0]
            height = struct.unpack('<I', f.read(4))[0]
            
            # 색상 평면 수
            color_planes = struct.unpack('<H', f.read(2))[0]
            
            # 비트 per 픽셀
            bits_per_pixel = struct.unpack('<H', f.read(2))[0]
            
            return {
                'file_size': file_size,
                'width': width,
                'height': height,
                'bits_per_pixel': bits_per_pixel,
                'data_offset': data_offset
            }
            
    except FileNotFoundError:
        print(f"✗ 파일을 찾을 수 없습니다: {filename}")
        return None
    except Exception as e:
        print(f"✗ 파일 읽기 오류: {e}")
        return None

def create_simple_bmp():
    """간단한 BMP 파일 생성 (2x2 픽셀, 빨간색)"""
    # BMP 헤더 생성
    width, height = 2, 2
    bits_per_pixel = 24
    
    # 한 행의 바이트 수 (4바이트 경계로 정렬)
    row_size = ((width * bits_per_pixel + 31) // 32) * 4
    pixel_data_size = row_size * height
    file_size = 54 + pixel_data_size  # 54는 헤더 크기
    
    with open('simple.bmp', 'wb') as f:
        # BMP 파일 헤더 (14바이트)
        f.write(b'BM')  # 시그니처
        f.write(struct.pack('<I', file_size))  # 파일 크기
        f.write(struct.pack('<I', 0))  # 예약 필드
        f.write(struct.pack('<I', 54))  # 데이터 오프셋
        
        # DIB 헤더 (40바이트)
        f.write(struct.pack('<I', 40))  # DIB 헤더 크기
        f.write(struct.pack('<I', width))  # 너비
        f.write(struct.pack('<I', height))  # 높이
        f.write(struct.pack('<H', 1))  # 색상 평면
        f.write(struct.pack('<H', bits_per_pixel))  # 비트/픽셀
        f.write(struct.pack('<I', 0))  # 압축 방식
        f.write(struct.pack('<I', pixel_data_size))  # 이미지 크기
        f.write(struct.pack('<I', 2835))  # X 해상도
        f.write(struct.pack('<I', 2835))  # Y 해상도
        f.write(struct.pack('<I', 0))  # 색상 수
        f.write(struct.pack('<I', 0))  # 중요한 색상 수
        
        # 픽셀 데이터 (BGR 순서, 아래쪽부터)
        for y in range(height):
            for x in range(width):
                # 빨간색 픽셀 (BGR: 0, 0, 255)
                f.write(struct.pack('BBB', 0, 0, 255))
            
            # 행 패딩
            padding = row_size - (width * 3)
            f.write(b'\x00' * padding)
    
    print("간단한 BMP 파일이 생성되었습니다: simple.bmp")

print("\n=== 이미지 파일 메타데이터 처리 ===")

# 간단한 BMP 파일 생성
create_simple_bmp()

# BMP 파일 헤더 읽기
bmp_info = read_bmp_header('simple.bmp')
if bmp_info:
    print("\nBMP 파일 정보:")
    print(f"  파일 크기: {bmp_info['file_size']:,} 바이트")
    print(f"  이미지 크기: {bmp_info['width']} x {bmp_info['height']} 픽셀")
    print(f"  색상 깊이: {bmp_info['bits_per_pixel']} 비트/픽셀")
    print(f"  데이터 오프셋: {bmp_info['data_offset']} 바이트")
```

## 5. 압축 파일 처리

### 5.1 ZIP 파일 처리

```python
import zipfile
import os
from datetime import datetime

print("\n=== ZIP 파일 처리 ===")

def create_sample_files():
    """압축할 샘플 파일들 생성"""
    # 디렉토리 생성
    os.makedirs('sample_project', exist_ok=True)
    os.makedirs('sample_project/src', exist_ok=True)
    os.makedirs('sample_project/docs', exist_ok=True)
    
    # Python 소스 파일
    with open('sample_project/src/main.py', 'w', encoding='utf-8') as f:
        f.write('''#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
메인 애플리케이션 모듈
"""

def main():
    print("Hello, World!")
    return 0

if __name__ == "__main__":
    main()
''')
    
    # 설정 파일
    with open('sample_project/config.json', 'w', encoding='utf-8') as f:
        f.write('''{
  "app_name": "Sample App",
  "version": "1.0.0",
  "debug": true,
  "database": {
    "host": "localhost",
    "port": 5432
  }
}''')
    
    # README 파일
    with open('sample_project/README.md', 'w', encoding='utf-8') as f:
        f.write('''# Sample Project

이것은 샘플 프로젝트입니다.

## 설치 방법

1. Python 3.8 이상 설치
2. 의존성 설치: `pip install -r requirements.txt`
3. 실행: `python src/main.py`

## 라이선스

MIT License
''')
    
    # 문서 파일
    with open('sample_project/docs/api.md', 'w', encoding='utf-8') as f:
        f.write('''# API 문서

## 함수 목록

### main()
- 설명: 메인 함수
- 반환값: int (0: 성공, 1: 실패)
''')
    
    print("샘플 파일들이 생성되었습니다.")

def create_zip_archive():
    """ZIP 압축 파일 생성"""
    with zipfile.ZipFile('sample_project.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        # 디렉토리를 재귀적으로 압축
        for root, dirs, files in os.walk('sample_project'):
            for file in files:
                file_path = os.path.join(root, file)
                archive_path = os.path.relpath(file_path, '.')
                zipf.write(file_path, archive_path)
                print(f"압축됨: {archive_path}")
    
    print("\n✓ ZIP 파일이 생성되었습니다: sample_project.zip")

def analyze_zip_archive(zip_filename):
    """ZIP 파일 분석"""
    print(f"\n=== {zip_filename} 분석 ===")
    
    with zipfile.ZipFile(zip_filename, 'r') as zipf:
        file_list = zipf.filelist
        
        print(f"총 파일 수: {len(file_list)}")
        
        total_compressed = 0
        total_uncompressed = 0
        
        print("\n파일 목록:")
        for file_info in file_list:
            total_compressed += file_info.compress_size
            total_uncompressed += file_info.file_size
            
            # 압축률 계산
            if file_info.file_size > 0:
                compression_ratio = (1 - file_info.compress_size / file_info.file_size) * 100
            else:
                compression_ratio = 0
            
            # 수정 시간
            date_time = datetime(*file_info.date_time)
            
            print(f"  {file_info.filename}")
            print(f"    크기: {file_info.file_size:,} → {file_info.compress_size:,} 바이트 ({compression_ratio:.1f}% 압축)")
            print(f"    수정일: {date_time.strftime('%Y-%m-%d %H:%M:%S')}")
        
        overall_compression = (1 - total_compressed / total_uncompressed) * 100 if total_uncompressed > 0 else 0
        print(f"\n전체 압축률: {overall_compression:.1f}%")
        print(f"압축 전 크기: {total_uncompressed:,} 바이트")
        print(f"압축 후 크기: {total_compressed:,} 바이트")

def extract_zip_archive(zip_filename, extract_path='extracted'):
    """ZIP 파일 압축 해제"""
    os.makedirs(extract_path, exist_ok=True)
    
    with zipfile.ZipFile(zip_filename, 'r') as zipf:
        print(f"\n{zip_filename}을 {extract_path}에 압축 해제 중...")
        
        for file_info in zipf.filelist:
            zipf.extract(file_info, extract_path)
            print(f"  추출됨: {file_info.filename}")
        
        print("✓ 압축 해제 완료")

def create_selective_zip():
    """조건부 파일 압축"""
    with zipfile.ZipFile('python_files.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('sample_project'):
            for file in files:
                # Python 파일과 마크다운 파일만 압축
                if file.endswith(('.py', '.md')):
                    file_path = os.path.join(root, file)
                    archive_path = os.path.relpath(file_path, '.')
                    zipf.write(file_path, archive_path)
                    print(f"선택적 압축: {archive_path}")
    
    print("\n✓ Python 및 Markdown 파일만 압축되었습니다: python_files.zip")

# ZIP 파일 처리 실행
create_sample_files()
create_zip_archive()
analyze_zip_archive('sample_project.zip')
extract_zip_archive('sample_project.zip')
create_selective_zip()
```

### 5.2 TAR 파일 처리

```python
import tarfile
import os
import gzip
import time

print("\n=== TAR 파일 처리 ===")

def create_tar_archive():
    """TAR 압축 파일 생성 (다양한 압축 방식)"""
    
    # 일반 TAR 파일
    with tarfile.open('sample_project.tar', 'w') as tar:
        tar.add('sample_project', arcname='sample_project')
    print("✓ TAR 파일 생성: sample_project.tar")
    
    # GZIP 압축 TAR 파일
    with tarfile.open('sample_project.tar.gz', 'w:gz') as tar:
        tar.add('sample_project', arcname='sample_project')
    print("✓ TAR.GZ 파일 생성: sample_project.tar.gz")
    
    # BZIP2 압축 TAR 파일
    with tarfile.open('sample_project.tar.bz2', 'w:bz2') as tar:
        tar.add('sample_project', arcname='sample_project')
    print("✓ TAR.BZ2 파일 생성: sample_project.tar.bz2")

def analyze_tar_archive(tar_filename):
    """TAR 파일 분석"""
    print(f"\n=== {tar_filename} 분석 ===")
    
    with tarfile.open(tar_filename, 'r') as tar:
        members = tar.getmembers()
        
        print(f"총 항목 수: {len(members)}")
        
        file_count = 0
        dir_count = 0
        total_size = 0
        
        print("\n내용 목록:")
        for member in members:
            if member.isfile():
                file_count += 1
                total_size += member.size
                print(f"  📄 {member.name} ({member.size:,} 바이트)")
            elif member.isdir():
                dir_count += 1
                print(f"  📁 {member.name}/")
            
            # 권한 정보
            mode = oct(member.mode)[-3:]
            mtime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(member.mtime))
            print(f"      권한: {mode}, 수정일: {mtime}")
        
        print(f"\n요약:")
        print(f"  파일: {file_count}개")
        print(f"  디렉토리: {dir_count}개")
        print(f"  총 크기: {total_size:,} 바이트")

def extract_specific_files(tar_filename, pattern='*.py'):
    """특정 패턴의 파일만 추출"""
    import fnmatch
    
    extract_path = 'tar_extracted'
    os.makedirs(extract_path, exist_ok=True)
    
    with tarfile.open(tar_filename, 'r') as tar:
        members = tar.getmembers()
        
        extracted_files = []
        for member in members:
            if member.isfile() and fnmatch.fnmatch(member.name, pattern):
                tar.extract(member, extract_path)
                extracted_files.append(member.name)
        
        print(f"\n'{pattern}' 패턴에 맞는 파일들이 추출되었습니다:")
        for filename in extracted_files:
            print(f"  {filename}")

def create_incremental_backup():
    """증분 백업 시뮬레이션"""
    # 첫 번째 백업 (전체)
    backup_name = f"backup_full_{datetime.now().strftime('%Y%m%d_%H%M%S')}.tar.gz"
    with tarfile.open(backup_name, 'w:gz') as tar:
        tar.add('sample_project', arcname='sample_project')
    print(f"✓ 전체 백업 생성: {backup_name}")
    
    # 파일 수정 시뮬레이션
    with open('sample_project/src/main.py', 'a', encoding='utf-8') as f:
        f.write('\n# 수정된 내용\nprint("Updated!")\n')
    
    # 새 파일 추가
    with open('sample_project/new_file.txt', 'w', encoding='utf-8') as f:
        f.write('새로 추가된 파일입니다.')
    
    # 수정된 파일들만 백업 (간단한 증분 백업)
    incremental_name = f"backup_incremental_{datetime.now().strftime('%Y%m%d_%H%M%S')}.tar.gz"
    
    with tarfile.open(incremental_name, 'w:gz') as tar:
        # 실제로는 더 복잡한 로직이 필요하지만, 여기서는 단순화
        for root, dirs, files in os.walk('sample_project'):
            for file in files:
                file_path = os.path.join(root, file)
                # 최근 수정된 파일들만 포함 (예: 최근 1시간 이내)
                stat = os.stat(file_path)
                if time.time() - stat.st_mtime < 3600:  # 1시간 = 3600초
                    archive_path = os.path.relpath(file_path, '.')
                    tar.add(file_path, arcname=archive_path)
    
    print(f"✓ 증분 백업 생성: {incremental_name}")

# TAR 파일 처리 실행
create_tar_archive()

# 파일 크기 비교
archives = ['sample_project.tar', 'sample_project.tar.gz', 'sample_project.tar.bz2']
print("\n압축 방식별 파일 크기 비교:")
for archive in archives:
    if os.path.exists(archive):
        size = os.path.getsize(archive)
        print(f"  {archive}: {size:,} 바이트")

analyze_tar_archive('sample_project.tar.gz')
extract_specific_files('sample_project.tar.gz', '*.py')
create_incremental_backup()
```

## 6. 설정 파일 관리

### 6.1 ConfigParser 사용

```python
import configparser
import os
from datetime import datetime

print("\n=== 설정 파일 관리 ===")

def create_sample_config():
    """샘플 설정 파일 생성"""
    config = configparser.ConfigParser()
    
    # 기본 섹션 설정
    config['DEFAULT'] = {
        'debug': 'False',
        'log_level': 'INFO',
        'max_connections': '100'
    }
    
    # 데이터베이스 설정
    config['database'] = {
        'host': 'localhost',
        'port': '5432',
        'username': 'admin',
        'password': 'secret123',
        'database_name': 'myapp'
    }
    
    # 웹 서버 설정
    config['webserver'] = {
        'host': '0.0.0.0',
        'port': '8080',
        'workers': '4',
        'timeout': '30'
    }
    
    # 로깅 설정
    config['logging'] = {
        'log_file': '/var/log/myapp.log',
        'max_size': '10MB',
        'backup_count': '5',
        'log_level': 'DEBUG'  # DEFAULT의 log_level을 오버라이드
    }
    
    # 파일로 저장
    with open('app_config.ini', 'w') as configfile:
        config.write(configfile)
    
    print("✓ 설정 파일이 생성되었습니다: app_config.ini")

def read_config():
    """설정 파일 읽기"""
    config = configparser.ConfigParser()
    config.read('app_config.ini')
    
    print("\n설정 파일 내용:")
    
    # 모든 섹션 출력
    for section_name in config.sections():
        print(f"\n[{section_name}]")
        for key, value in config[section_name].items():
            print(f"  {key} = {value}")
    
    # 특정 값 접근
    print(f"\n특정 설정 값 접근:")
    print(f"  데이터베이스 호스트: {config['database']['host']}")
    print(f"  웹 서버 포트: {config.getint('webserver', 'port')}")
    print(f"  디버그 모드: {config.getboolean('database', 'debug')}")  # DEFAULT에서 상속
    print(f"  로그 레벨: {config['logging']['log_level']}")  # 오버라이드된 값

class AppConfig:
    """애플리케이션 설정 관리 클래스"""
    
    def __init__(self, config_file='app_config.ini'):
        self.config_file = config_file
        self.config = configparser.ConfigParser()
        self.load_config()
    
    def load_config(self):
        """설정 파일 로드"""
        if os.path.exists(self.config_file):
            self.config.read(self.config_file)
            print(f"✓ 설정 파일 로드됨: {self.config_file}")
        else:
            print(f"⚠ 설정 파일이 없습니다: {self.config_file}")
            self.create_default_config()
    
    def create_default_config(self):
        """기본 설정 생성"""
        self.config['DEFAULT'] = {
            "created_at": datetime.now().isoformat(),
            "version": "1.0.0"
        }
        
        self.config['app'] = {
            'name': 'MyApplication',
            'debug': 'False'
        }
        
        self.save_config()
        print("✓ 기본 설정 파일이 생성되었습니다.")
    
    def get(self, section, key, fallback=None):
        """설정 값 가져오기"""
        try:
            return self.config.get(section, key, fallback=fallback)
        except (configparser.NoSectionError, configparser.NoOptionError):
            return fallback
    
    def getint(self, section, key, fallback=0):
        """정수 설정 값 가져오기"""
        try:
            return self.config.getint(section, key, fallback=fallback)
        except (configparser.NoSectionError, configparser.NoOptionError, ValueError):
            return fallback
    
    def getboolean(self, section, key, fallback=False):
        """불린 설정 값 가져오기"""
        try:
            return self.config.getboolean(section, key, fallback=fallback)
        except (configparser.NoSectionError, configparser.NoOptionError, ValueError):
            return fallback
    
    def set(self, section, key, value):
        """설정 값 변경"""
        if not self.config.has_section(section):
            self.config.add_section(section)
        
        self.config.set(section, key, str(value))
        print(f"설정 변경: [{section}] {key} = {value}")
    
    def save_config(self):
        """설정 파일 저장"""
        with open(self.config_file, 'w') as configfile:
            self.config.write(configfile)
        print(f"✓ 설정이 저장되었습니다: {self.config_file}")
    
    def list_all_settings(self):
        """모든 설정 나열"""
        print("\n현재 설정:")
        for section_name in self.config.sections():
            print(f"\n[{section_name}]")
            for key in self.config[section_name]:
                value = self.config[section_name][key]
                print(f"  {key} = {value}")

# 설정 관리 클래스 사용 예제
print("\n=== 설정 관리 클래스 사용 ===")

create_sample_config()
read_config()

# 설정 관리 클래스 사용
app_config = AppConfig('my_app.ini')

# 설정 값 읽기
app_name = app_config.get('app', 'name', 'Unknown App')
debug_mode = app_config.getboolean('app', 'debug', False)

print(f"\n애플리케이션: {app_name}")
print(f"디버그 모드: {debug_mode}")

# 설정 값 변경
app_config.set('app', 'debug', True)
app_config.set('app', 'last_updated', datetime.now().isoformat())
app_config.set('performance', 'cache_enabled', True)

# 설정 저장
app_config.save_config()

# 모든 설정 출력
app_config.list_all_settings()
```

### 6.2 JSON과 YAML 설정 파일

```python
import json
import os
from datetime import datetime

# YAML은 외부 라이브러리이므로 try-except로 처리
try:
    import yaml
    YAML_AVAILABLE = True
except ImportError:
    YAML_AVAILABLE = False
    print("⚠ PyYAML이 설치되지 않았습니다. YAML 기능을 사용하려면 'pip install PyYAML'을 실행하세요.")

class ConfigManager:
    """다양한 형식의 설정 파일 관리"""
    
    def __init__(self, config_file):
        self.config_file = config_file
        self.config_data = {}
        self.file_format = self._detect_format()
        self.load()
    
    def _detect_format(self):
        """파일 확장자로 형식 감지"""
        _, ext = os.path.splitext(self.config_file)
        ext = ext.lower()
        
        if ext == '.json':
            return 'json'
        elif ext in ['.yml', '.yaml'] and YAML_AVAILABLE:
            return 'yaml'
        elif ext == '.ini':
            return 'ini'
        else:
            return 'json'  # 기본값
    
    def load(self):
        """설정 파일 로드"""
        if not os.path.exists(self.config_file):
            self.create_default_config()
            return
        
        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                if self.file_format == 'json':
                    self.config_data = json.load(f)
                elif self.file_format == 'yaml':
                    self.config_data = yaml.safe_load(f)
                
            print(f"✓ 설정 파일 로드됨: {self.config_file} ({self.file_format.upper()})")
        
        except Exception as e:
            print(f"✗ 설정 파일 로드 실패: {e}")
            self.create_default_config()
    
    def create_default_config(self):
        """기본 설정 생성"""
        self.config_data = {
            "application": {
                "name": "MyApp",
                "version": "1.0.0",
                "debug": False,
                "created_at": datetime.now().isoformat()
            },
            "database": {
                "type": "postgresql",
                "host": "localhost",
                "port": 5432,
                "name": "myapp_db",
                "connection_pool": {
                    "min_connections": 1,
                    "max_connections": 20
                }
            },
            "logging": {
                "level": "INFO",
                "handlers": [
                    {
                        "type": "file",
                        "filename": "app.log",
                        "max_size": "10MB",
                        "backup_count": 5
                    },
                    {
                        "type": "console",
                        "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
                    }
                ]
            },
            "features": {
                "email_notifications": True,
                "api_rate_limit": 1000,
                "allowed_file_types": ["jpg", "png", "pdf", "txt"],
                "maintenance_mode": False
            }
        }
        self.save()
        print(f"✓ 기본 설정 파일 생성됨: {self.config_file}")
    
    def get(self, path, default=None):
        """점 표기법으로 설정 값 가져오기 (예: 'database.host')"""
        keys = path.split('.')
        current = self.config_data
        
        try:
            for key in keys:
                current = current[key]
            return current
        except (KeyError, TypeError):
            return default
    
    def set(self, path, value):
        """점 표기법으로 설정 값 변경"""
        keys = path.split('.')
        current = self.config_data
        
        # 중간 딕셔너리들을 생성
        for key in keys[:-1]:
            if key not in current or not isinstance(current[key], dict):
                current[key] = {}
            current = current[key]
        
        # 마지막 키에 값 설정
        current[keys[-1]] = value
        print(f"설정 변경: {path} = {value}")
    
    def delete(self, path):
        """설정 삭제"""
        keys = path.split('.')
        current = self.config_data
        
        try:
            for key in keys[:-1]:
                current = current[key]
            
            if keys[-1] in current:
                del current[keys[-1]]
                print(f"설정 삭제: {path}")
                return True
            else:
                print(f"설정을 찾을 수 없습니다: {path}")
                return False
        except (KeyError, TypeError):
            print(f"설정을 찾을 수 없습니다: {path}")
            return False
    
    def save(self):
        """설정 파일 저장"""
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                if self.file_format == 'json':
                    json.dump(self.config_data, f, ensure_ascii=False, indent=2)
                elif self.file_format == 'yaml':
                    yaml.dump(self.config_data, f, default_flow_style=False, allow_unicode=True)
            
            print(f"✓ 설정 저장됨: {self.config_file}")
        
        except Exception as e:
            print(f"✗ 설정 저장 실패: {e}")
            return False

# CSV 프로세서 사용 예제
print("\n=== CSV 고급 처리 예제 ===")

# 샘플 직원 데이터 생성
employee_data = [
    ['name', 'age', 'department', 'salary', 'email'],
    ['김철수', '28', 'IT', '3500000', 'kim@company.com'],
    ['이영희', '32', 'HR', '4000000', 'lee@company.com'],
    ['박민수', '', 'IT', '3200000', 'park@company.com'],  # 나이 누락
    ['최지원', '29', 'Sales', '3800000', 'choi-invalid-email'],  # 잘못된 이메일
    ['정현우', '35', 'IT', 'invalid', 'jung@company.com'],  # 잘못된 급여
    ['한미영', '27', 'Marketing', '3600000', 'han@company.com']
]

with open('employees.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(employee_data)

# CSV 프로세서 사용
processor = CSVProcessor('employees.csv')

if processor.load_data():
    # 데이터 검증 규칙 정의
    validation_rules = {
        'name': {'required': True},
        'age': {'required': True, 'type': 'int', 'range': (18, 65)},
        'salary': {'required': True, 'type': 'int', 'range': (2000000, 10000000)},
        'email': {'required': True, 'type': 'email'}
    }
    
    # 데이터 검증
    errors = processor.validate_data(validation_rules)
    if errors:
        print("\n데이터 검증 오류:")
        for error in errors:
            print(f"  • {error}")
    else:
        print("\n✓ 모든 데이터가 유효합니다.")
    
    # 데이터 필터링 (IT 부서, 급여 3500000 이상)
    filtered_data = processor.filter_data({
        'department': {'operator': '==', 'value': 'IT'},
        'salary': {'operator': '>=', 'value': 3500000}
    })
    
    print(f"\n필터링 결과: {len(filtered_data)}개의 레코드")
    for record in filtered_data:
        print(f"  {record['name']}: {record['department']}, {record['salary']}원")
    
    # 필터링된 데이터 저장
    if filtered_data:
        processor.save_data(filtered_data, 'it_high_salary.csv')
```

## 7. 연습 문제

### 연습 1: 로그 파일 분석기
웹 서버 로그 파일을 분석하여 접근 통계를 생성하는 프로그램을 작성하세요.

### 연습 2: 설정 파일 변환기
INI 형식의 설정 파일을 JSON이나 YAML 형식으로 변환하는 도구를 만드세요.

### 연습 3: 파일 백업 시스템
지정된 디렉토리를 주기적으로 백업하는 시스템을 구현하세요.

### 연습 4: 데이터 포맷 변환기
CSV 파일을 JSON이나 XML 형식으로 변환하는 프로그램을 작성하세요.

## 정리

이 챕터에서 학습한 내용:

1. **JSON 처리**: 파이썬 객체와 JSON 간의 직렬화/역직렬화
2. **CSV 처리**: 체계적인 데이터 분석과 처리 기법
3. **XML 처리**: DOM 방식의 XML 문서 조작
4. **바이너리 파일**: 구조화된 바이너리 데이터 처리
5. **압축 파일**: ZIP과 TAR 형식의 압축/해제
6. **설정 파일**: 다양한 형식의 설정 관리 패턴

다음 챕터에서는 정규표현식을 활용한 고급 텍스트 처리 기법을 학습하겠습니다.

### 핵심 포인트
- 데이터 형식에 맞는 적절한 라이브러리 선택이 중요합니다
- 예외 처리를 통한 안전한 파일 처리가 필수입니다
- 메모리 효율성을 고려한 대용량 파일 처리 기법을 익혀야 합니다
- 설정 관리는 애플리케이션의 유지보수성을 크게 좌우합니다
- 압축 파일은 저장 공간과 전송 효율성을 높이는 중요한 도구입니다
</rewritten_file> 