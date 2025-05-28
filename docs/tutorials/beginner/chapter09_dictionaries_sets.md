# Chapter 9: 딕셔너리와 집합으로 데이터 마스터하기

## 📚 이 챕터에서 배울 내용
- 딕셔너리로 실생활 데이터를 효율적으로 관리하기
- 키-값 쌍의 강력함을 실무에 활용하는 방법
- 집합으로 중복 없는 깔끔한 데이터 처리하기
- 집합 연산으로 데이터 분석의 새로운 차원 열기
- 딕셔너리와 집합을 조합한 고급 데이터 처리 패턴
- 실무에서 바로 쓸 수 있는 데이터 관리 시스템 구축

---

## 📖 딕셔너리: 현실 세계의 완벽한 데이터 모델

### 💡 딕셔너리는 우리 일상 속 어디에나!

딕셔너리는 Python에서 가장 강력하고 유용한 데이터 구조입니다. 실제로 우리 주변에는 딕셔너리 형태의 정보가 가득합니다!

```python
print("=== 🌍 일상 속 딕셔너리들 ===")

# 📱 연락처 (이름 → 전화번호)
contacts = {
    "엄마": "010-1234-5678",
    "아빠": "010-2345-6789", 
    "친구": "010-3456-7890",
    "회사": "02-123-4567"
}

# 🏪 상품 카탈로그 (상품명 → 가격)
menu = {
    "아메리카노": 4000,
    "카페라떼": 4500,
    "카푸치노": 5000,
    "에스프레소": 3500
}

# 👤 사용자 프로필 (속성 → 값)
user_profile = {
    "이름": "김개발",
    "나이": 28,
    "직업": "소프트웨어 엔지니어",
    "취미": ["코딩", "독서", "영화감상"],
    "거주지": "서울",
    "가입일": "2024-01-15"
}

# 🌍 국가 정보 (국가 → 수도)
capitals = {
    "한국": "서울",
    "일본": "도쿄",
    "미국": "워싱턴 D.C.",
    "프랑스": "파리",
    "영국": "런던"
}

print("📞 연락처에서 엄마 번호 찾기:", contacts["엄마"])
print("☕ 아메리카노 가격:", f"{menu['아메리카노']:,}원")
print("👤 사용자 정보:", f"{user_profile['이름']}님 ({user_profile['나이']}세)")
print("🌍 한국의 수도:", capitals["한국"])
```

> 🌟 **핵심 포인트**: 딕셔너리는 **키(Key)**로 **값(Value)**을 빠르게 찾는 구조입니다. 마치 사전에서 단어를 찾듯이!

### 🏗️ 딕셔너리의 특별한 능력들

| 특징 | 설명 | 예시 |
|------|------|------|
| **키-값 쌍** | 의미 있는 연결 관계 | `"이름": "김철수"` |
| **빠른 검색** | O(1) 시간 복잡도 | 백만 개 데이터에서도 즉시 검색 |
| **변경 가능** | 언제든지 수정/추가/삭제 | `dict["새키"] = "새값"` |
| **순서 보장** | Python 3.7+ 입력 순서 유지 | 입력한 순서대로 저장 |

### 🎨 다양한 딕셔너리 생성 방법

```python
print("=== 🎯 딕셔너리 생성의 모든 방법 ===")

# 1. 직접 생성 (가장 일반적)
student = {
    "학번": "2024001",
    "이름": "이학생", 
    "전공": "컴퓨터공학",
    "학년": 2
}
print(f"학생 정보: {student}")

# 2. 빈 딕셔너리 생성
empty_dict = {}
print(f"빈 딕셔너리: {empty_dict}")

# 3. dict() 함수 사용
scores = dict(국어=85, 영어=92, 수학=78)
print(f"성적: {scores}")

# 4. 리스트에서 변환
pairs = [("사과", 2000), ("바나나", 3000), ("오렌지", 2500)]
fruit_prices = dict(pairs)
print(f"과일 가격: {fruit_prices}")

# 5. 딕셔너리 컴프리헨션 (고급 기법)
squares = {x: x**2 for x in range(1, 6)}
print(f"제곱수: {squares}")

# 6. zip()으로 두 리스트 결합
names = ["김철수", "이영희", "박민수"]
ages = [25, 30, 28]
name_age = dict(zip(names, ages))
print(f"이름-나이: {name_age}")

# 7. 실무 예제: 설정 파일 시뮬레이션
config = {
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "myapp_db"
    },
    "cache": {
        "enabled": True,
        "timeout": 300
    },
    "debug": False,
    "version": "1.2.3"
}

print(f"\n⚙️ 애플리케이션 설정:")
print(f"  데이터베이스: {config['database']['host']}:{config['database']['port']}")
print(f"  캐시 사용: {config['cache']['enabled']}")
print(f"  디버그 모드: {config['debug']}")
```

---

## 🎯 딕셔너리 접근과 조작: 데이터의 마법사

### 🔍 안전하고 스마트한 데이터 접근

```python
print("=== 🔍 딕셔너리 접근 마스터 클래스 ===")

# 온라인 쇼핑몰 상품 정보
product = {
    "id": "LAPTOP001",
    "name": "고성능 노트북",
    "price": 1200000,
    "brand": "TechCorp",
    "specs": {
        "cpu": "Intel i7",
        "ram": "16GB",
        "storage": "512GB SSD"
    },
    "in_stock": True,
    "reviews": 4.5
}

print("🛒 상품 정보 시스템")
print("=" * 30)

# 1. 기본 접근 (대괄호)
print(f"상품명: {product['name']}")
print(f"가격: {product['price']:,}원")

# 2. get() 메서드 - 안전한 접근
print(f"브랜드: {product.get('brand', '정보 없음')}")
print(f"할인율: {product.get('discount', 0)}%")  # 없는 키, 기본값 반환

# 3. 중첩 딕셔너리 접근
print(f"CPU: {product['specs']['cpu']}")
print(f"메모리: {product['specs']['ram']}")

# 4. 키 존재 확인
if "reviews" in product:
    print(f"⭐ 평점: {product['reviews']}/5.0")

if "warranty" not in product:
    print("⚠️ 보증 정보가 없습니다")

# 5. 안전한 중첩 접근 함수
def safe_get_nested(dictionary, keys, default=None):
    """중첩 딕셔너리에서 안전하게 값을 가져오는 함수"""
    for key in keys:
        if isinstance(dictionary, dict) and key in dictionary:
            dictionary = dictionary[key]
        else:
            return default
    return dictionary

# 안전한 중첩 접근 예제
cpu_info = safe_get_nested(product, ["specs", "cpu"], "정보 없음")
gpu_info = safe_get_nested(product, ["specs", "gpu"], "내장 그래픽")

print(f"CPU 정보: {cpu_info}")
print(f"GPU 정보: {gpu_info}")

# 6. 실무 패턴: 상품 상세 정보 출력
def display_product_info(product):
    """상품 정보를 보기 좋게 출력하는 함수"""
    print(f"\n📦 {product.get('name', '상품명 없음')}")
    print(f"💰 가격: {product.get('price', 0):,}원")
    print(f"🏭 브랜드: {product.get('brand', '정보 없음')}")
    print(f"📦 재고: {'있음' if product.get('in_stock', False) else '없음'}")
    
    if 'specs' in product:
        print("🔧 사양:")
        for spec, value in product['specs'].items():
            print(f"   {spec.upper()}: {value}")
    
    if 'reviews' in product:
        stars = "⭐" * int(product['reviews'])
        print(f"⭐ 평점: {stars} ({product['reviews']}/5.0)")

display_product_info(product)
```

### ✏️ 딕셔너리 수정과 업데이트

```python
print("=== ✏️ 딕셔너리 수정 마스터 클래스 ===")

# 사용자 계정 관리 시스템
user_account = {
    "username": "coder123",
    "email": "coder@example.com",
    "created_at": "2024-01-01",
    "login_count": 0,
    "preferences": {
        "theme": "dark",
        "language": "ko"
    }
}

print("👤 사용자 계정 관리 시스템")
print("=" * 35)

# 1. 기본 값 수정
user_account["login_count"] = 1
print(f"로그인 횟수 업데이트: {user_account['login_count']}")

# 2. 새 키-값 추가
user_account["last_login"] = "2024-12-25 10:30:00"
user_account["premium"] = True
print(f"마지막 로그인: {user_account['last_login']}")
print(f"프리미엄 회원: {user_account['premium']}")

# 3. update() 메서드 - 여러 값 한 번에 업데이트
profile_updates = {
    "full_name": "김개발자",
    "phone": "010-1234-5678",
    "login_count": user_account["login_count"] + 1
}
user_account.update(profile_updates)
print(f"프로필 업데이트 완료: {user_account['full_name']}")

# 4. 중첩 딕셔너리 수정
user_account["preferences"]["theme"] = "light"
user_account["preferences"]["notifications"] = True
print(f"테마 변경: {user_account['preferences']['theme']}")

# 5. setdefault() - 키가 없을 때만 추가
user_account.setdefault("avatar", "default.png")
user_account.setdefault("premium", False)  # 이미 있으므로 변경되지 않음
print(f"아바타: {user_account['avatar']}")
print(f"프리미엄 상태: {user_account['premium']}")

# 6. 실무 패턴: 사용자 활동 로깅
def log_user_activity(account, activity_type, details=None):
    """사용자 활동을 로깅하는 함수"""
    import datetime
    
    # 활동 로그가 없으면 생성
    if "activity_log" not in account:
        account["activity_log"] = []
    
    # 새 활동 추가
    log_entry = {
        "timestamp": datetime.datetime.now().isoformat(),
        "type": activity_type,
        "details": details or {}
    }
    
    account["activity_log"].append(log_entry)
    print(f"📝 활동 로그 추가: {activity_type}")

# 활동 로깅 예제
log_user_activity(user_account, "login", {"ip": "192.168.1.100"})
log_user_activity(user_account, "profile_update", {"field": "theme"})
log_user_activity(user_account, "purchase", {"item": "premium_upgrade"})

print(f"\n📊 총 활동 로그: {len(user_account['activity_log'])}개")
for log in user_account["activity_log"]:
    print(f"   {log['type']} - {log['timestamp'][:19]}")
```

---

## 🛠️ 딕셔너리 메서드: 데이터 조작의 달인

### 🔑 키, 값, 항목 다루기

```python
print("=== 🔑 딕셔너리 메서드 완전 정복 ===")

# 온라인 서점 재고 관리 시스템
bookstore = {
    "파이썬 완전정복": {"price": 25000, "stock": 15, "author": "김파이썬"},
    "자바스크립트 마스터": {"price": 22000, "stock": 8, "author": "이자바"},
    "데이터 사이언스 입문": {"price": 30000, "stock": 12, "author": "박데이터"},
    "웹 개발 실무": {"price": 28000, "stock": 5, "author": "최웹개발"},
    "AI 프로그래밍": {"price": 35000, "stock": 20, "author": "정인공지능"}
}

print("📚 온라인 서점 재고 관리")
print("=" * 30)

# 1. keys() - 모든 책 제목
all_books = list(bookstore.keys())
print(f"📖 전체 도서 목록 ({len(all_books)}권):")
for i, book in enumerate(all_books, 1):
    print(f"   {i}. {book}")

# 2. values() - 모든 책 정보
all_info = list(bookstore.values())
total_stock = sum(info["stock"] for info in all_info)
avg_price = sum(info["price"] for info in all_info) / len(all_info)

print(f"\n📊 재고 통계:")
print(f"   총 재고: {total_stock}권")
print(f"   평균 가격: {avg_price:,.0f}원")

# 3. items() - 책과 정보 함께
print(f"\n💰 가격대별 도서:")
for book, info in bookstore.items():
    if info["price"] >= 30000:
        category = "고가"
    elif info["price"] >= 25000:
        category = "중가"
    else:
        category = "저가"
    
    print(f"   [{category}] {book}: {info['price']:,}원 (재고: {info['stock']}권)")

# 4. 실무 패턴: 재고 부족 알림
print(f"\n⚠️ 재고 부족 도서 (5권 이하):")
low_stock_books = []
for book, info in bookstore.items():
    if info["stock"] <= 5:
        low_stock_books.append((book, info["stock"]))
        print(f"   🚨 {book}: {info['stock']}권 남음")

if not low_stock_books:
    print("   ✅ 재고 부족 도서 없음")

# 5. 고급 분석: 저자별 통계
author_stats = {}
for book, info in bookstore.items():
    author = info["author"]
    if author not in author_stats:
        author_stats[author] = {"books": 0, "total_stock": 0, "total_value": 0}
    
    author_stats[author]["books"] += 1
    author_stats[author]["total_stock"] += info["stock"]
    author_stats[author]["total_value"] += info["price"] * info["stock"]

print(f"\n👨‍💼 저자별 통계:")
for author, stats in author_stats.items():
    print(f"   {author}: {stats['books']}권, 재고 {stats['total_stock']}권, "
          f"재고가치 {stats['total_value']:,}원")
```

### 🗑️ 딕셔너리 요소 제거하기

```python
print("=== 🗑️ 딕셔너리 요소 제거 마스터 클래스 ===")

# 소셜 미디어 친구 목록 관리
friends = {
    "김친구": {"status": "online", "last_seen": "2024-12-25 10:00"},
    "이동료": {"status": "offline", "last_seen": "2024-12-24 15:30"},
    "박동창": {"status": "away", "last_seen": "2024-12-25 09:45"},
    "최직장": {"status": "online", "last_seen": "2024-12-25 10:15"},
    "정학교": {"status": "offline", "last_seen": "2024-12-20 12:00"}
}

print("👥 친구 목록 관리 시스템")
print("=" * 25)

# 1. del 키워드 - 직접 삭제
print("🗑️ 친구 삭제 (del):")
del friends["정학교"]
print(f"   정학교님을 친구 목록에서 제거했습니다.")

# 2. pop() - 삭제하고 값 반환
print(f"\n🗑️ 친구 삭제 (pop):")
removed_friend = friends.pop("이동료")
print(f"   이동료님 제거: {removed_friend}")

# 3. pop()에 기본값 설정
print(f"\n🔍 존재하지 않는 친구 제거 시도:")
result = friends.pop("없는친구", "친구를 찾을 수 없음")
print(f"   결과: {result}")

# 4. popitem() - 마지막 항목 제거 (Python 3.7+)
print(f"\n🗑️ 마지막 친구 제거 (popitem):")
last_friend = friends.popitem()
print(f"   제거된 친구: {last_friend[0]} - {last_friend[1]}")

# 5. clear() - 모든 항목 제거
backup_friends = friends.copy()  # 백업 생성
print(f"\n🧹 전체 친구 목록 초기화:")
print(f"   초기화 전: {len(friends)}명")
friends.clear()
print(f"   초기화 후: {len(friends)}명")

# 백업에서 복원
friends = backup_friends
print(f"   백업에서 복원: {len(friends)}명")

# 6. 실무 패턴: 조건부 친구 정리
def cleanup_inactive_friends(friend_list, days_threshold=7):
    """비활성 친구들을 정리하는 함수"""
    from datetime import datetime, timedelta
    
    current_time = datetime.now()
    threshold_date = current_time - timedelta(days=days_threshold)
    
    inactive_friends = []
    for name, info in list(friend_list.items()):  # list()로 복사본 생성
        last_seen = datetime.fromisoformat(info["last_seen"])
        if last_seen < threshold_date:
            inactive_friends.append(name)
            del friend_list[name]
    
    return inactive_friends

print(f"\n🧹 비활성 친구 정리 (7일 기준):")
removed = cleanup_inactive_friends(friends, 7)
if removed:
    print(f"   제거된 친구: {', '.join(removed)}")
else:
    print("   제거된 친구 없음")

print(f"   현재 활성 친구: {len(friends)}명")
for name, info in friends.items():
    print(f"   👤 {name}: {info['status']} ({info['last_seen']})")
```

---

## 🎯 집합(Set): 중복 없는 깔끔한 데이터 세계

### 💡 집합은 수학에서 온 완벽한 도구

집합은 **중복을 허용하지 않는** 데이터 컬렉션입니다. 실생활에서 "회원 명단", "태그 목록", "고유 방문자" 등을 관리할 때 완벽한 도구입니다!

```python
print("=== 🎯 집합의 놀라운 세계 ===")

# 실생활 집합 예제들
print("📚 온라인 강의 수강생 관리")

# 파이썬 강의 수강생
python_students = {"김철수", "이영희", "박민수", "최지영", "정다은"}

# 자바스크립트 강의 수강생  
javascript_students = {"이영희", "박민수", "한상우", "윤미래", "김철수"}

# 데이터 사이언스 강의 수강생
datascience_students = {"박민수", "최지영", "한상우", "조현진", "김데이터"}

print(f"🐍 Python 수강생 ({len(python_students)}명): {python_students}")
print(f"🟨 JavaScript 수강생 ({len(javascript_students)}명): {javascript_students}")
print(f"📊 Data Science 수강생 ({len(datascience_students)}명): {datascience_students}")

# 집합의 특징 확인
print(f"\n🔍 집합의 특징:")
test_set = {"사과", "바나나", "사과", "오렌지", "바나나"}
print(f"   중복 제거 전: ['사과', '바나나', '사과', '오렌지', '바나나']")
print(f"   중복 제거 후: {test_set}")
print(f"   순서 없음: 매번 다른 순서로 출력될 수 있음")

# 실무 예제: 웹사이트 방문자 추적
print(f"\n🌐 웹사이트 방문자 추적 시스템")
daily_visitors = set()

# 방문자 로그 시뮬레이션
visitor_logs = [
    "user123", "guest456", "user123", "admin789", 
    "guest456", "user999", "user123", "newbie001"
]

for visitor in visitor_logs:
    daily_visitors.add(visitor)
    print(f"   방문자 추가: {visitor} (총 고유 방문자: {len(daily_visitors)}명)")

print(f"📊 오늘의 고유 방문자: {daily_visitors}")
print(f"📈 총 방문 로그: {len(visitor_logs)}개, 고유 방문자: {len(daily_visitors)}명")
```

### 🎨 다양한 집합 생성 방법

```python
print("=== 🎨 집합 생성의 모든 방법 ===")

# 1. 중괄호로 직접 생성
fruits = {"사과", "바나나", "오렌지", "포도"}
print(f"과일 집합: {fruits}")

# 2. set() 함수 사용
empty_set = set()  # 빈 집합 ({}는 딕셔너리!)
print(f"빈 집합: {empty_set}")

# 3. 문자열에서 집합 생성
unique_chars = set("PYTHON")
print(f"PYTHON의 고유 문자: {unique_chars}")

# 4. 리스트에서 중복 제거
numbers_list = [1, 2, 2, 3, 3, 3, 4, 4, 5]
unique_numbers = set(numbers_list)
print(f"중복 제거: {numbers_list} → {unique_numbers}")

# 5. 집합 컴프리헨션
even_squares = {x**2 for x in range(10) if x % 2 == 0}
print(f"짝수의 제곱: {even_squares}")

# 6. 실무 예제: 이메일 도메인 추출
email_list = [
    "user1@gmail.com", "user2@naver.com", "user3@gmail.com",
    "user4@daum.net", "user5@naver.com", "user6@yahoo.com"
]

domains = {email.split("@")[1] for email in email_list}
print(f"\n📧 이메일 도메인 분석:")
print(f"   전체 이메일: {len(email_list)}개")
print(f"   고유 도메인: {domains}")
print(f"   도메인 수: {len(domains)}개")

# 7. 해시태그 시스템
posts = [
    {"content": "파이썬 공부중", "tags": ["python", "coding", "study"]},
    {"content": "맛있는 점심", "tags": ["food", "lunch", "delicious"]},
    {"content": "코딩 테스트 준비", "tags": ["python", "algorithm", "coding"]},
    {"content": "새로운 프로젝트", "tags": ["project", "coding", "teamwork"]}
]

all_tags = set()
for post in posts:
    all_tags.update(post["tags"])

print(f"\n🏷️ 해시태그 시스템:")
print(f"   전체 게시물: {len(posts)}개")
print(f"   사용된 태그: {all_tags}")
print(f"   고유 태그 수: {len(all_tags)}개")
```

---

## 🔄 집합 연산: 데이터 분석의 새로운 차원

### 🎯 집합 연산으로 데이터 인사이트 발견하기

```python
print("=== 🔄 집합 연산 마스터 클래스 ===")

# 온라인 쇼핑몰 고객 분석 시스템
print("🛒 온라인 쇼핑몰 고객 분석")
print("=" * 30)

# 각 카테고리별 구매 고객
electronics_buyers = {"김철수", "이영희", "박민수", "최지영", "한상우"}
fashion_buyers = {"이영희", "박민수", "정다은", "윤미래", "김패션"}
books_buyers = {"박민수", "최지영", "정다은", "조현진", "김독서"}
sports_buyers = {"김철수", "한상우", "윤미래", "조현진", "이스포츠"}

print(f"📱 전자제품 구매자: {electronics_buyers}")
print(f"👕 패션 구매자: {fashion_buyers}")
print(f"📚 도서 구매자: {books_buyers}")
print(f"⚽ 스포츠 구매자: {sports_buyers}")

# 1. 합집합 (Union) - 전체 고객
all_customers = electronics_buyers | fashion_buyers | books_buyers | sports_buyers
print(f"\n🎯 전체 고객 (합집합):")
print(f"   고객 수: {len(all_customers)}명")
print(f"   고객 명단: {all_customers}")

# 2. 교집합 (Intersection) - 공통 고객
electronics_fashion = electronics_buyers & fashion_buyers
print(f"\n🔍 전자제품 & 패션 동시 구매자 (교집합):")
print(f"   고객: {electronics_fashion}")

# 다중 교집합
multi_buyers = electronics_buyers & fashion_buyers & books_buyers
print(f"📊 3개 카테고리 모두 구매한 고객:")
print(f"   고객: {multi_buyers if multi_buyers else '없음'}")

# 3. 차집합 (Difference) - 특정 카테고리만 구매
only_electronics = electronics_buyers - fashion_buyers - books_buyers - sports_buyers
only_fashion = fashion_buyers - electronics_buyers - books_buyers - sports_buyers

print(f"\n📱 전자제품만 구매한 고객 (차집합):")
print(f"   고객: {only_electronics if only_electronics else '없음'}")
print(f"👕 패션만 구매한 고객:")
print(f"   고객: {only_fashion if only_fashion else '없음'}")

# 4. 대칭차집합 (Symmetric Difference) - 둘 중 하나만
electronics_xor_fashion = electronics_buyers ^ fashion_buyers
print(f"\n⚡ 전자제품 또는 패션 중 하나만 구매한 고객:")
print(f"   고객: {electronics_xor_fashion}")

# 5. 실무 분석: 고객 세그먼테이션
def analyze_customer_segments(customers_dict):
    """고객 세그먼트 분석 함수"""
    all_customers = set()
    for customers in customers_dict.values():
        all_customers.update(customers)
    
    # 구매 카테고리 수별 고객 분류
    customer_segments = {
        "단일구매": set(),
        "다중구매": set(),
        "충성고객": set()  # 3개 이상 카테고리
    }
    
    for customer in all_customers:
        purchase_count = sum(1 for customers in customers_dict.values() 
                           if customer in customers)
        
        if purchase_count == 1:
            customer_segments["단일구매"].add(customer)
        elif purchase_count == 2:
            customer_segments["다중구매"].add(customer)
        else:
            customer_segments["충성고객"].add(customer)
    
    return customer_segments

categories = {
    "전자제품": electronics_buyers,
    "패션": fashion_buyers,
    "도서": books_buyers,
    "스포츠": sports_buyers
}

segments = analyze_customer_segments(categories)

print(f"\n📊 고객 세그먼트 분석:")
for segment, customers in segments.items():
    print(f"   {segment}: {len(customers)}명 - {customers}")

# 6. 마케팅 타겟 분석
print(f"\n🎯 마케팅 타겟 분석:")

# 전자제품 구매자 중 패션에 관심 없는 고객 (패션 추천 대상)
fashion_target = electronics_buyers - fashion_buyers
print(f"   패션 추천 대상: {fashion_target}")

# 도서 구매자 중 전자제품에 관심 있는 고객 (전자책 리더 추천)
ebook_target = books_buyers & electronics_buyers
print(f"   전자책 리더 추천 대상: {ebook_target}")

# 스포츠 구매자 중 패션에도 관심 있는 고객 (스포츠웨어 추천)
sportswear_target = sports_buyers & fashion_buyers
print(f"   스포츠웨어 추천 대상: {sportswear_target}")
```

### 🛠️ 집합 메서드와 고급 활용

```python
print("=== 🛠️ 집합 메서드 완전 정복 ===")

# 프로젝트 팀 관리 시스템
print("👥 프로젝트 팀 관리 시스템")
print("=" * 25)

# 초기 팀 구성
team_alpha = {"김팀장", "이개발", "박디자인"}
team_beta = {"최기획", "정개발", "한디자인"}

print(f"🅰️ Alpha 팀: {team_alpha}")
print(f"🅱️ Beta 팀: {team_beta}")

# 1. add() - 팀원 추가
team_alpha.add("신입사원")
print(f"\n➕ Alpha 팀에 신입사원 추가: {team_alpha}")

# 2. update() - 여러 팀원 한 번에 추가
new_members = {"인턴1", "인턴2"}
team_alpha.update(new_members)
print(f"➕ Alpha 팀에 인턴들 추가: {team_alpha}")

# 3. remove() vs discard()
print(f"\n🗑️ 팀원 제거 테스트:")
try:
    team_alpha.remove("인턴1")  # 있으면 제거, 없으면 오류
    print(f"   remove로 인턴1 제거: {team_alpha}")
except KeyError:
    print("   remove: 인턴1을 찾을 수 없음")

team_alpha.discard("인턴2")  # 있으면 제거, 없어도 오류 없음
team_alpha.discard("없는사람")  # 오류 없음
print(f"   discard로 인턴2 제거: {team_alpha}")

# 4. pop() - 임의의 요소 제거
removed_member = team_alpha.pop()
print(f"   pop으로 임의 팀원 제거: {removed_member}")
print(f"   현재 Alpha 팀: {team_alpha}")

# 5. 집합 관계 확인 메서드
all_employees = {"김팀장", "이개발", "박디자인", "최기획", "정개발", "한디자인"}
senior_employees = {"김팀장", "최기획"}
developers = {"이개발", "정개발"}

print(f"\n🔍 집합 관계 분석:")
print(f"   전체 직원: {all_employees}")
print(f"   시니어 직원: {senior_employees}")
print(f"   개발자: {developers}")

# issubset() - 부분집합 확인
print(f"   시니어가 전체의 부분집합? {senior_employees.issubset(all_employees)}")
print(f"   개발자가 전체의 부분집합? {developers.issubset(all_employees)}")

# issuperset() - 상위집합 확인
print(f"   전체가 시니어의 상위집합? {all_employees.issuperset(senior_employees)}")

# isdisjoint() - 교집합 없음 확인
management = {"김팀장", "최기획"}
interns = {"인턴A", "인턴B"}
print(f"   관리진과 인턴이 겹치지 않음? {management.isdisjoint(interns)}")

# 6. 실무 패턴: 권한 관리 시스템
class PermissionManager:
    def __init__(self):
        self.user_permissions = {}
        self.role_permissions = {
            "admin": {"read", "write", "delete", "manage_users"},
            "editor": {"read", "write"},
            "viewer": {"read"},
            "guest": set()
        }
    
    def assign_role(self, user, role):
        """사용자에게 역할 할당"""
        if role in self.role_permissions:
            self.user_permissions[user] = self.role_permissions[role].copy()
            print(f"👤 {user}에게 {role} 역할 할당")
    
    def grant_permission(self, user, permission):
        """개별 권한 부여"""
        if user not in self.user_permissions:
            self.user_permissions[user] = set()
        self.user_permissions[user].add(permission)
        print(f"🔑 {user}에게 {permission} 권한 부여")
    
    def revoke_permission(self, user, permission):
        """권한 회수"""
        if user in self.user_permissions:
            self.user_permissions[user].discard(permission)
            print(f"🚫 {user}의 {permission} 권한 회수")
    
    def check_permission(self, user, permission):
        """권한 확인"""
        user_perms = self.user_permissions.get(user, set())
        return permission in user_perms
    
    def get_users_with_permission(self, permission):
        """특정 권한을 가진 사용자 목록"""
        users = set()
        for user, perms in self.user_permissions.items():
            if permission in perms:
                users.add(user)
        return users

# 권한 관리 시스템 테스트
print(f"\n🔐 권한 관리 시스템 테스트:")
pm = PermissionManager()

pm.assign_role("김관리자", "admin")
pm.assign_role("이편집자", "editor")
pm.assign_role("박뷰어", "viewer")

# 개별 권한 부여
pm.grant_permission("이편집자", "delete")

print(f"\n📊 권한 현황:")
for user, perms in pm.user_permissions.items():
    print(f"   {user}: {perms}")

print(f"\n🔍 권한 확인:")
print(f"   김관리자의 delete 권한: {pm.check_permission('김관리자', 'delete')}")
print(f"   이편집자의 delete 권한: {pm.check_permission('이편집자', 'delete')}")
print(f"   박뷰어의 write 권한: {pm.check_permission('박뷰어', 'write')}")

print(f"\n👥 delete 권한을 가진 사용자: {pm.get_users_with_permission('delete')}")
```

---

## 🚀 고급 기법: 딕셔너리와 집합의 숨겨진 파워

### 🎯 딕셔너리 컴프리헨션: 한 줄의 마법

```python
print("=== 🎯 딕셔너리 컴프리헨션 마스터 클래스 ===")

# 기본 딕셔너리 컴프리헨션
numbers = range(1, 6)
squares = {x: x**2 for x in numbers}
print(f"제곱수 딕셔너리: {squares}")

# 조건부 딕셔너리 컴프리헨션
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(f"짝수 제곱수: {even_squares}")

# 실무 예제: 학생 성적 처리
students_scores = [
    ("김철수", 85), ("이영희", 92), ("박민수", 78),
    ("최지영", 96), ("정다은", 88), ("한상우", 74)
]

# 성적별 등급 부여
grade_dict = {
    name: "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"
    for name, score in students_scores
}
print(f"\n📊 학생 등급: {grade_dict}")

# 우수 학생만 필터링
honor_students = {name: score for name, score in students_scores if score >= 85}
print(f"🏆 우수 학생: {honor_students}")

# 문자열 처리: 단어 길이 딕셔너리
sentence = "Python is a powerful programming language"
word_lengths = {word: len(word) for word in sentence.split()}
print(f"\n📝 단어 길이: {word_lengths}")

# 중첩 딕셔너리 컴프리헨션
matrix_data = [(i, j, i*j) for i in range(1, 4) for j in range(1, 4)]
multiplication_table = {
    i: {j: i*j for j in range(1, 4)} 
    for i in range(1, 4)
}
print(f"\n🔢 구구단 (1-3단):")
for i, row in multiplication_table.items():
    print(f"   {i}단: {row}")
```

### 🔄 defaultdict와 Counter: 고급 딕셔너리 도구

```python
print("=== 🔄 고급 딕셔너리 도구 ===")

from collections import defaultdict, Counter

# 1. defaultdict - 기본값이 있는 딕셔너리
print("📊 defaultdict 활용:")

# 그룹별 데이터 수집
students_by_grade = defaultdict(list)
student_data = [
    ("김철수", "A"), ("이영희", "A"), ("박민수", "B"),
    ("최지영", "A"), ("정다은", "B"), ("한상우", "C")
]

for name, grade in student_data:
    students_by_grade[grade].append(name)

print(f"   등급별 학생: {dict(students_by_grade)}")

# 단어 빈도 계산 (수동)
text = "python is great python is powerful python is fun"
word_count = defaultdict(int)
for word in text.split():
    word_count[word] += 1

print(f"   단어 빈도: {dict(word_count)}")

# 2. Counter - 자동 카운팅
print(f"\n🔢 Counter 활용:")

# 문자 빈도 분석
char_counter = Counter("PYTHON PROGRAMMING")
print(f"   문자 빈도: {char_counter}")
print(f"   가장 많은 문자 3개: {char_counter.most_common(3)}")

# 리스트 요소 빈도
colors = ["red", "blue", "red", "green", "blue", "red", "yellow"]
color_counter = Counter(colors)
print(f"   색상 빈도: {color_counter}")

# 실무 예제: 로그 분석
log_entries = [
    "INFO", "ERROR", "INFO", "WARNING", "ERROR", 
    "INFO", "DEBUG", "ERROR", "INFO", "WARNING"
]

log_counter = Counter(log_entries)
print(f"\n📋 로그 레벨 분석:")
for level, count in log_counter.most_common():
    print(f"   {level}: {count}회")

# Counter 연산
counter1 = Counter("AABBCC")
counter2 = Counter("ABCCDD")
print(f"\n🔄 Counter 연산:")
print(f"   Counter1: {counter1}")
print(f"   Counter2: {counter2}")
print(f"   합집합: {counter1 + counter2}")
print(f"   차집합: {counter1 - counter2}")
print(f"   교집합: {counter1 & counter2}")
```

### 🎨 중첩 구조와 복잡한 데이터 처리

```python
print("=== 🎨 중첩 구조 마스터 클래스 ===")

# 복잡한 중첩 데이터 구조
company_data = {
    "departments": {
        "engineering": {
            "teams": {
                "backend": {
                    "members": ["김백엔드", "이서버", "박API"],
                    "projects": ["user-service", "payment-service"],
                    "budget": 500000000
                },
                "frontend": {
                    "members": ["최프론트", "정리액트", "한뷰"],
                    "projects": ["web-app", "mobile-app"],
                    "budget": 300000000
                }
            },
            "manager": "김CTO"
        },
        "marketing": {
            "teams": {
                "digital": {
                    "members": ["박마케팅", "이SNS", "최광고"],
                    "projects": ["campaign-2024", "brand-renewal"],
                    "budget": 200000000
                }
            },
            "manager": "이CMO"
        }
    },
    "company_info": {
        "name": "테크스타트업",
        "founded": 2020,
        "employees": 50
    }
}

# 중첩 데이터 안전 접근 함수
def safe_nested_get(data, keys, default=None):
    """중첩 딕셔너리에서 안전하게 값을 가져오는 함수"""
    for key in keys:
        if isinstance(data, dict) and key in data:
            data = data[key]
        else:
            return default
    return data

# 데이터 분석 함수들
def get_all_employees(company_data):
    """모든 직원 목록 추출"""
    employees = set()
    departments = company_data.get("departments", {})
    
    for dept_name, dept_info in departments.items():
        # 부서 매니저 추가
        if "manager" in dept_info:
            employees.add(dept_info["manager"])
        
        # 팀 멤버들 추가
        teams = dept_info.get("teams", {})
        for team_name, team_info in teams.items():
            members = team_info.get("members", [])
            employees.update(members)
    
    return employees

def get_total_budget(company_data):
    """총 예산 계산"""
    total = 0
    departments = company_data.get("departments", {})
    
    for dept_info in departments.values():
        teams = dept_info.get("teams", {})
        for team_info in teams.values():
            budget = team_info.get("budget", 0)
            total += budget
    
    return total

def get_projects_by_department(company_data):
    """부서별 프로젝트 목록"""
    dept_projects = {}
    departments = company_data.get("departments", {})
    
    for dept_name, dept_info in departments.items():
        projects = set()
        teams = dept_info.get("teams", {})
        for team_info in teams.values():
            team_projects = team_info.get("projects", [])
            projects.update(team_projects)
        dept_projects[dept_name] = projects
    
    return dept_projects

# 분석 실행
print("🏢 회사 데이터 분석:")
print("=" * 20)

all_employees = get_all_employees(company_data)
total_budget = get_total_budget(company_data)
dept_projects = get_projects_by_department(company_data)

print(f"👥 전체 직원 수: {len(all_employees)}명")
print(f"💰 총 예산: {total_budget:,}원")

print(f"\n📊 부서별 분석:")
for dept, projects in dept_projects.items():
    print(f"   {dept}: {len(projects)}개 프로젝트 - {projects}")

# 특정 정보 안전 접근
backend_members = safe_nested_get(
    company_data, 
    ["departments", "engineering", "teams", "backend", "members"],
    []
)
print(f"\n💻 백엔드 팀원: {backend_members}")

# 존재하지 않는 경로 접근
nonexistent = safe_nested_get(
    company_data,
    ["departments", "hr", "teams", "recruitment"],
    "부서 없음"
)
print(f"🔍 존재하지 않는 부서: {nonexistent}")
```

---

## 🎯 실습: 종합 데이터 관리 시스템

### 📝 실습 과제: 학생 성적 관리 시스템
딕셔너리와 집합을 활용한 완전한 학생 성적 관리 시스템을 만들어보세요.

```python
# Comprehensive Student Management System
from collections import defaultdict, Counter
import statistics

class StudentManagementSystem:
    def __init__(self):
        self.students = {}  # 학생 정보
        self.subjects = set()  # 과목 목록
        self.grades = defaultdict(dict)  # 성적 정보
        
    def add_student(self, student_id, name, grade_level, class_name):
        """학생 추가"""
        self.students[student_id] = {
            "name": name,
            "grade_level": grade_level,
            "class": class_name,
            "enrollment_date": "2024-03-01"
        }
        print(f"✅ 학생 추가: {name} ({student_id})")
    
    def add_subject(self, subject_name):
        """과목 추가"""
        self.subjects.add(subject_name)
        print(f"📚 과목 추가: {subject_name}")
    
    def record_grade(self, student_id, subject, score):
        """성적 기록"""
        if student_id not in self.students:
            print(f"❌ 학생을 찾을 수 없습니다: {student_id}")
            return
        
        if subject not in self.subjects:
            self.add_subject(subject)
        
        self.grades[student_id][subject] = score
        student_name = self.students[student_id]["name"]
        print(f"📝 성적 기록: {student_name} - {subject}: {score}점")
    
    def get_student_average(self, student_id):
        """학생 평균 계산"""
        if student_id not in self.grades:
            return 0
        
        scores = list(self.grades[student_id].values())
        return statistics.mean(scores) if scores else 0
    
    def get_subject_statistics(self, subject):
        """과목별 통계"""
        scores = []
        for student_grades in self.grades.values():
            if subject in student_grades:
                scores.append(student_grades[subject])
        
        if not scores:
            return None
        
        return {
            "count": len(scores),
            "average": statistics.mean(scores),
            "median": statistics.median(scores),
            "min": min(scores),
            "max": max(scores),
            "std_dev": statistics.stdev(scores) if len(scores) > 1 else 0
        }
    
    def get_top_students(self, n=5):
        """상위 n명 학생"""
        student_averages = []
        for student_id in self.students:
            avg = self.get_student_average(student_id)
            if avg > 0:
                student_averages.append((student_id, avg))
        
        student_averages.sort(key=lambda x: x[1], reverse=True)
        return student_averages[:n]
    
    def get_students_by_grade_level(self, grade_level):
        """학년별 학생 목록"""
        students = set()
        for student_id, info in self.students.items():
            if info["grade_level"] == grade_level:
                students.add(student_id)
        return students
    
    def get_failing_students(self, passing_score=60):
        """낙제 위험 학생들"""
        failing_students = set()
        for student_id in self.students:
            avg = self.get_student_average(student_id)
            if 0 < avg < passing_score:
                failing_students.add(student_id)
        return failing_students
    
    def generate_report(self):
        """종합 리포트 생성"""
        print("\n" + "="*50)
        print("           📊 학생 성적 관리 시스템 리포트")
        print("="*50)
        
        # 기본 통계
        total_students = len(self.students)
        total_subjects = len(self.subjects)
        print(f"👥 총 학생 수: {total_students}명")
        print(f"📚 총 과목 수: {total_subjects}개")
        
        # 과목별 통계
        print(f"\n📊 과목별 통계:")
        for subject in sorted(self.subjects):
            stats = self.get_subject_statistics(subject)
            if stats:
                print(f"   {subject}:")
                print(f"      응시자: {stats['count']}명")
                print(f"      평균: {stats['average']:.1f}점")
                print(f"      최고점: {stats['max']}점")
                print(f"      최저점: {stats['min']}점")
        
        # 상위 학생
        print(f"\n🏆 상위 5명:")
        top_students = self.get_top_students(5)
        for i, (student_id, avg) in enumerate(top_students, 1):
            name = self.students[student_id]["name"]
            print(f"   {i}. {name}: {avg:.1f}점")
        
        # 낙제 위험 학생
        failing = self.get_failing_students()
        if failing:
            print(f"\n⚠️ 낙제 위험 학생 ({len(failing)}명):")
            for student_id in failing:
                name = self.students[student_id]["name"]
                avg = self.get_student_average(student_id)
                print(f"   {name}: {avg:.1f}점")
        else:
            print(f"\n✅ 낙제 위험 학생 없음")
        
        # 학년별 분포
        grade_distribution = defaultdict(int)
        for info in self.students.values():
            grade_distribution[info["grade_level"]] += 1
        
        print(f"\n📈 학년별 분포:")
        for grade in sorted(grade_distribution.keys()):
            count = grade_distribution[grade]
            print(f"   {grade}학년: {count}명")

# 시스템 테스트
print("🎓 학생 성적 관리 시스템 테스트")
print("=" * 35)

sms = StudentManagementSystem()

# 학생 추가
students_data = [
    ("2024001", "김철수", 1, "1-A"),
    ("2024002", "이영희", 1, "1-A"),
    ("2024003", "박민수", 1, "1-B"),
    ("2024004", "최지영", 2, "2-A"),
    ("2024005", "정다은", 2, "2-A"),
    ("2024006", "한상우", 2, "2-B")
]

for student_id, name, grade, class_name in students_data:
    sms.add_student(student_id, name, grade, class_name)

# 성적 입력
grades_data = [
    ("2024001", "국어", 85), ("2024001", "영어", 78), ("2024001", "수학", 92),
    ("2024002", "국어", 92), ("2024002", "영어", 88), ("2024002", "수학", 85),
    ("2024003", "국어", 76), ("2024003", "영어", 82), ("2024003", "수학", 79),
    ("2024004", "국어", 88), ("2024004", "영어", 91), ("2024004", "수학", 87),
    ("2024005", "국어", 94), ("2024005", "영어", 89), ("2024005", "수학", 96),
    ("2024006", "국어", 72), ("2024006", "영어", 68), ("2024006", "수학", 74)
]

print(f"\n📝 성적 입력:")
for student_id, subject, score in grades_data:
    sms.record_grade(student_id, subject, score)

# 리포트 생성
sms.generate_report()
```

### 🛒 실습 과제: 온라인 쇼핑몰 재고 관리

```python
# Online Store Inventory Management System
class InventoryManager:
    def __init__(self):
        self.products = {}  # 상품 정보
        self.categories = defaultdict(set)  # 카테고리별 상품
        self.suppliers = defaultdict(set)  # 공급업체별 상품
        self.low_stock_threshold = 10
    
    def add_product(self, product_id, name, category, price, stock, supplier):
        """상품 추가"""
        self.products[product_id] = {
            "name": name,
            "category": category,
            "price": price,
            "stock": stock,
            "supplier": supplier,
            "sales_count": 0
        }
        
        self.categories[category].add(product_id)
        self.suppliers[supplier].add(product_id)
        
        print(f"✅ 상품 추가: {name} (ID: {product_id})")
    
    def update_stock(self, product_id, quantity_change):
        """재고 업데이트"""
        if product_id in self.products:
            self.products[product_id]["stock"] += quantity_change
            action = "입고" if quantity_change > 0 else "출고"
            print(f"📦 {action}: {self.products[product_id]['name']} "
                  f"({abs(quantity_change)}개)")
        else:
            print(f"❌ 상품을 찾을 수 없습니다: {product_id}")
    
    def sell_product(self, product_id, quantity):
        """상품 판매"""
        if product_id not in self.products:
            print(f"❌ 상품을 찾을 수 없습니다: {product_id}")
            return False
        
        product = self.products[product_id]
        if product["stock"] >= quantity:
            product["stock"] -= quantity
            product["sales_count"] += quantity
            print(f"💰 판매 완료: {product['name']} {quantity}개")
            return True
        else:
            print(f"❌ 재고 부족: {product['name']} "
                  f"(요청: {quantity}, 재고: {product['stock']})")
            return False
    
    def get_low_stock_products(self):
        """재고 부족 상품"""
        low_stock = set()
        for product_id, info in self.products.items():
            if info["stock"] <= self.low_stock_threshold:
                low_stock.add(product_id)
        return low_stock
    
    def get_category_value(self, category):
        """카테고리별 재고 가치"""
        total_value = 0
        if category in self.categories:
            for product_id in self.categories[category]:
                product = self.products[product_id]
                total_value += product["price"] * product["stock"]
        return total_value
    
    def get_bestsellers(self, n=5):
        """베스트셀러 상품"""
        products_by_sales = [
            (pid, info["sales_count"]) 
            for pid, info in self.products.items()
        ]
        products_by_sales.sort(key=lambda x: x[1], reverse=True)
        return products_by_sales[:n]
    
    def generate_inventory_report(self):
        """재고 리포트"""
        print("\n" + "="*50)
        print("           📦 재고 관리 시스템 리포트")
        print("="*50)
        
        total_products = len(self.products)
        total_categories = len(self.categories)
        total_value = sum(p["price"] * p["stock"] for p in self.products.values())
        
        print(f"📊 기본 통계:")
        print(f"   총 상품 수: {total_products}개")
        print(f"   카테고리 수: {total_categories}개")
        print(f"   총 재고 가치: {total_value:,}원")
        
        # 카테고리별 분석
        print(f"\n📈 카테고리별 분석:")
        for category, products in self.categories.items():
            value = self.get_category_value(category)
            print(f"   {category}: {len(products)}개 상품, {value:,}원")
        
        # 재고 부족 상품
        low_stock = self.get_low_stock_products()
        if low_stock:
            print(f"\n⚠️ 재고 부족 상품 ({len(low_stock)}개):")
            for product_id in low_stock:
                product = self.products[product_id]
                print(f"   {product['name']}: {product['stock']}개 남음")
        
        # 베스트셀러
        bestsellers = self.get_bestsellers()
        print(f"\n🏆 베스트셀러 TOP 5:")
        for i, (product_id, sales) in enumerate(bestsellers, 1):
            name = self.products[product_id]["name"]
            print(f"   {i}. {name}: {sales}개 판매")

# 재고 관리 시스템 테스트
print("🛒 온라인 쇼핑몰 재고 관리 시스템")
print("=" * 35)

inventory = InventoryManager()

# 상품 추가
products_data = [
    ("P001", "노트북", "전자제품", 1200000, 25, "테크공급사"),
    ("P002", "마우스", "전자제품", 30000, 50, "테크공급사"),
    ("P003", "키보드", "전자제품", 80000, 30, "테크공급사"),
    ("P004", "티셔츠", "의류", 25000, 100, "패션공급사"),
    ("P005", "청바지", "의류", 60000, 40, "패션공급사"),
    ("P006", "운동화", "신발", 120000, 20, "스포츠공급사"),
    ("P007", "책", "도서", 15000, 200, "출판공급사")
]

for product_data in products_data:
    inventory.add_product(*product_data)

# 판매 시뮬레이션
sales_data = [
    ("P001", 3), ("P002", 15), ("P003", 8),
    ("P004", 25), ("P005", 12), ("P006", 5),
    ("P007", 30), ("P002", 10), ("P004", 20)
]

print(f"\n💰 판매 처리:")
for product_id, quantity in sales_data:
    inventory.sell_product(product_id, quantity)

# 리포트 생성
inventory.generate_inventory_report()
```

---

## 🎯 도전 과제

### 🌟 기본 과제: 도서관 관리 시스템
```python
def library_management_challenge():
    """도서관 관리 시스템 도전 과제"""
    
    # 도서 정보: {ISBN: {title, author, category, available}}
    books = {}
    
    # 회원 정보: {member_id: {name, borrowed_books}}
    members = {}
    
    # 대출 기록: {member_id: {book_isbn: borrow_date}}
    borrow_records = defaultdict(dict)
    
    # 카테고리별 도서: {category: {isbn1, isbn2, ...}}
    categories = defaultdict(set)
    
    print("📚 도서관 관리 시스템 도전 과제")
    print("다음 기능들을 구현해보세요:")
    print("1. 도서 추가/삭제")
    print("2. 회원 등록/탈퇴")
    print("3. 도서 대출/반납")
    print("4. 카테고리별 도서 검색")
    print("5. 회원별 대출 현황")
    print("6. 인기 도서 통계")
    
    # 여기에 구현해보세요!

# library_management_challenge()  # 주석 해제하여 실행
```

### 🚀 심화 과제: 소셜 네트워크 분석
```python
def social_network_challenge():
    """소셜 네트워크 분석 도전 과제"""
    
    # 사용자 정보
    users = {}
    
    # 친구 관계 (양방향)
    friendships = defaultdict(set)
    
    # 게시물과 좋아요
    posts = {}
    likes = defaultdict(set)  # {post_id: {user_ids}}
    
    # 해시태그
    hashtags = defaultdict(set)  # {hashtag: {post_ids}}
    
    print("🌐 소셜 네트워크 분석 도전 과제")
    print("다음 기능들을 구현해보세요:")
    print("1. 친구 추천 (공통 친구 기반)")
    print("2. 인플루언서 찾기 (팔로워 수 기반)")
    print("3. 트렌딩 해시태그")
    print("4. 친구 네트워크 분석")
    print("5. 게시물 추천 시스템")
    
    # 여기에 구현해보세요!

# social_network_challenge()  # 주석 해제하여 실행
```

---

## 📝 이번 챕터 요약

✅ **배운 내용**
- 딕셔너리로 키-값 쌍 데이터를 효율적으로 관리하기
- 집합으로 중복 없는 데이터 처리와 집합 연산 활용하기
- 딕셔너리 컴프리헨션과 고급 기법 마스터하기
- defaultdict, Counter 등 고급 도구 활용하기
- 중첩 구조에서는 안전한 접근 함수 활용하기

✅ **핵심 개념**
- **딕셔너리**: `{key: value}` 형태의 매핑 타입
- **집합**: `{element1, element2}` 형태의 중복 없는 컬렉션
- **딕셔너리 메서드**: `get()`, `keys()`, `values()`, `items()`, `update()`
- **집합 연산**: 합집합(`|`), 교집합(`&`), 차집합(`-`), 대칭차집합(`^`)
- **고급 도구**: `defaultdict`, `Counter`, 컴프리헨션

✅ **실무 팁**
- 딕셔너리는 O(1) 시간 복잡도로 매우 빠른 검색 제공
- 집합은 중복 제거와 멤버십 테스트에 최적화
- `get()` 메서드로 안전한 딕셔너리 접근하기
- 컴프리헨션으로 간결하고 효율적인 코드 작성하기
- 중첩 구조에서는 안전한 접근 함수 활용하기

🎯 **다음 챕터 예고**
다음 챕터에서는 함수(Functions)를 배워보겠습니다. 코드를 재사용 가능한 블록으로 나누어 더 체계적이고 효율적인 프로그램을 만드는 방법을 익혀보세요!

---

## ❓ 자주 묻는 질문 (FAQ)

**Q: 딕셔너리와 리스트의 차이점은 무엇인가요?**
A: 리스트는 순서가 있는 인덱스 기반 접근이고, 딕셔너리는 키 기반 접근입니다. 딕셔너리가 검색 속도가 훨씬 빠릅니다.

**Q: 집합에서 순서가 보장되나요?**
A: Python 3.7+에서는 집합도 입력 순서를 유지하지만, 순서에 의존하는 코드는 권장하지 않습니다.

**Q: 딕셔너리의 키로 사용할 수 있는 타입은?**
A: 불변(immutable) 타입만 가능합니다. 문자열, 숫자, 튜플은 가능하지만 리스트, 딕셔너리, 집합은 불가능합니다.

**Q: 집합과 리스트 중 어느 것이 더 빠른가요?**
A: 멤버십 테스트(`in` 연산)는 집합이 O(1), 리스트가 O(n)으로 집합이 훨씬 빠릅니다.

**Q: defaultdict와 일반 딕셔너리의 차이점은?**
A: defaultdict는 존재하지 않는 키에 접근할 때 기본값을 자동으로 생성하여 KeyError를 방지합니다.