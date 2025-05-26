# Chapter 12: 데이터베이스 연동

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- SQLite3를 활용한 기본적인 데이터베이스 조작하기
- Python에서 SQL 쿼리 실행과 결과 처리하기
- 데이터베이스 트랜잭션과 에러 처리 구현하기
- ORM(SQLAlchemy) 기초와 활용법 이해하기
- 연결 풀링과 성능 최적화 기법 적용하기
- NoSQL 데이터베이스(MongoDB) 기초 활용하기
- 실무에서 사용되는 데이터베이스 설계 패턴 이해하기

## 1. SQLite3 기본 사용법

### 1.1 데이터베이스 기초 개념

```python
print("=== 데이터베이스 기초 개념 ===")

def demonstrate_database_concepts():
    """데이터베이스 기본 개념 설명"""
    
    print("1. 데이터베이스란?")
    print("  - 구조화된 데이터를 저장하고 관리하는 시스템")
    print("  - 관계형(RDBMS)과 비관계형(NoSQL) 데이터베이스")
    print("  - ACID 속성: 원자성, 일관성, 격리성, 지속성")
    print()
    
    print("2. SQLite의 특징:")
    print("  - 서버가 필요 없는 경량 데이터베이스")
    print("  - 단일 파일로 데이터베이스 저장")
    print("  - Python 표준 라이브러리에 포함")
    print("  - 작은 규모 애플리케이션에 적합")
    print()
    
    print("3. SQL 기본 명령어:")
    print("  - DDL (Data Definition Language): CREATE, ALTER, DROP")
    print("  - DML (Data Manipulation Language): INSERT, UPDATE, DELETE")
    print("  - DQL (Data Query Language): SELECT")
    print("  - DCL (Data Control Language): GRANT, REVOKE")

demonstrate_database_concepts()

import sqlite3
import os
from datetime import datetime, date
import json

# 데이터베이스 파일 생성 및 연결
def create_sample_database():
    """샘플 데이터베이스 생성"""
    
    print(f"\n4. SQLite 데이터베이스 생성:")
    
    # 데이터베이스 연결 (파일이 없으면 자동 생성)
    conn = sqlite3.connect('sample_company.db')
    cursor = conn.cursor()
    
    # 직원 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL,
            salary REAL NOT NULL,
            hire_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 부서 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            budget REAL NOT NULL,
            manager_id INTEGER,
            FOREIGN KEY (manager_id) REFERENCES employees (id)
        )
    ''')
    
    # 프로젝트 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            start_date DATE NOT NULL,
            end_date DATE,
            budget REAL NOT NULL,
            status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled'))
        )
    ''')
    
    # 직원-프로젝트 관계 테이블 (다대다 관계)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employee_projects (
            employee_id INTEGER,
            project_id INTEGER,
            role TEXT NOT NULL,
            assigned_date DATE DEFAULT CURRENT_DATE,
            PRIMARY KEY (employee_id, project_id),
            FOREIGN KEY (employee_id) REFERENCES employees (id),
            FOREIGN KEY (project_id) REFERENCES projects (id)
        )
    ''')
    
    conn.commit()
    print("  ✓ 데이터베이스와 테이블 생성 완료")
    
    return conn, cursor

# 샘플 데이터 삽입
def insert_sample_data(conn, cursor):
    """샘플 데이터 삽입"""
    
    print(f"\n5. 샘플 데이터 삽입:")
    
    # 직원 데이터
    employees_data = [
        ('김철수', 'kim@company.com', 'Engineering', 75000, '2023-01-15'),
        ('이영희', 'lee@company.com', 'Marketing', 65000, '2023-02-01'),
        ('박민수', 'park@company.com', 'Engineering', 80000, '2022-11-10'),
        ('최지영', 'choi@company.com', 'HR', 60000, '2023-03-20'),
        ('정하늘', 'jung@company.com', 'Sales', 70000, '2023-01-05'),
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO employees (name, email, department, salary, hire_date)
        VALUES (?, ?, ?, ?, ?)
    ''', employees_data)
    
    # 부서 데이터
    departments_data = [
        ('Engineering', 500000, 3),  # 박민수가 매니저
        ('Marketing', 300000, 2),    # 이영희가 매니저
        ('HR', 200000, 4),           # 최지영이 매니저
        ('Sales', 400000, 5),        # 정하늘이 매니저
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO departments (name, budget, manager_id)
        VALUES (?, ?, ?)
    ''', departments_data)
    
    # 프로젝트 데이터
    projects_data = [
        ('웹 애플리케이션 개발', '고객 관리 시스템 개발', '2023-01-01', '2023-06-30', 150000, 'active'),
        ('마케팅 캠페인', '신제품 런칭 캠페인', '2023-03-01', '2023-05-31', 80000, 'completed'),
        ('시스템 최적화', '데이터베이스 성능 개선', '2023-04-01', None, 100000, 'active'),
        ('모바일 앱 개발', 'iOS/Android 앱 개발', '2023-02-15', '2023-08-15', 200000, 'active'),
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO projects (name, description, start_date, end_date, budget, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', projects_data)
    
    # 직원-프로젝트 할당
    assignments_data = [
        (1, 1, 'Developer', '2023-01-01'),     # 김철수 -> 웹 애플리케이션
        (3, 1, 'Lead Developer', '2023-01-01'), # 박민수 -> 웹 애플리케이션
        (2, 2, 'Marketing Lead', '2023-03-01'), # 이영희 -> 마케팅 캠페인
        (3, 3, 'Tech Lead', '2023-04-01'),      # 박민수 -> 시스템 최적화
        (1, 4, 'Mobile Developer', '2023-02-15'), # 김철수 -> 모바일 앱
        (5, 2, 'Sales Coordinator', '2023-03-01'), # 정하늘 -> 마케팅 캠페인
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO employee_projects (employee_id, project_id, role, assigned_date)
        VALUES (?, ?, ?, ?)
    ''', assignments_data)
    
    conn.commit()
    print("  ✓ 샘플 데이터 삽입 완료")

# 데이터베이스 생성 및 데이터 삽입 실행
conn, cursor = create_sample_database()
insert_sample_data(conn, cursor)
```

### 1.2 기본 CRUD 연산

```python
print("\n=== 기본 CRUD 연산 ===")

class EmployeeDatabase:
    """직원 데이터베이스 관리 클래스"""
    
    def __init__(self, db_path='sample_company.db'):
        self.db_path = db_path
    
    def get_connection(self):
        """데이터베이스 연결 생성"""
        return sqlite3.connect(self.db_path)
    
    def create_employee(self, name, email, department, salary, hire_date):
        """직원 생성 (CREATE)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO employees (name, email, department, salary, hire_date)
                VALUES (?, ?, ?, ?, ?)
            ''', (name, email, department, salary, hire_date))
            
            employee_id = cursor.lastrowid
            conn.commit()
            print(f"    ✓ 새 직원 추가: {name} (ID: {employee_id})")
            return employee_id
            
        except sqlite3.IntegrityError as e:
            print(f"    ✗ 직원 추가 실패: {e}")
            return None
        finally:
            conn.close()
    
    def read_employees(self, department=None, limit=None):
        """직원 조회 (READ)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM employees"
        params = []
        
        if department:
            query += " WHERE department = ?"
            params.append(department)
        
        query += " ORDER BY hire_date DESC"
        
        if limit:
            query += " LIMIT ?"
            params.append(limit)
        
        cursor.execute(query, params)
        employees = cursor.fetchall()
        conn.close()
        
        return employees
    
    def update_employee_salary(self, employee_id, new_salary):
        """직원 급여 수정 (UPDATE)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE employees 
            SET salary = ? 
            WHERE id = ?
        ''', (new_salary, employee_id))
        
        if cursor.rowcount > 0:
            conn.commit()
            print(f"    ✓ 직원 ID {employee_id}의 급여를 {new_salary}로 업데이트")
        else:
            print(f"    ✗ 직원 ID {employee_id}를 찾을 수 없음")
        
        conn.close()
        return cursor.rowcount > 0
    
    def delete_employee(self, employee_id):
        """직원 삭제 (DELETE)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # 먼저 관련 데이터 확인
        cursor.execute('''
            SELECT COUNT(*) FROM employee_projects WHERE employee_id = ?
        ''', (employee_id,))
        
        project_count = cursor.fetchone()[0]
        
        if project_count > 0:
            print(f"    ✗ 직원 ID {employee_id}는 {project_count}개 프로젝트에 할당되어 삭제할 수 없음")
            conn.close()
            return False
        
        cursor.execute('DELETE FROM employees WHERE id = ?', (employee_id,))
        
        if cursor.rowcount > 0:
            conn.commit()
            print(f"    ✓ 직원 ID {employee_id} 삭제 완료")
        else:
            print(f"    ✗ 직원 ID {employee_id}를 찾을 수 없음")
        
        conn.close()
        return cursor.rowcount > 0
    
    def get_employee_projects(self, employee_id):
        """직원의 프로젝트 조회 (JOIN)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT e.name as employee_name, p.name as project_name, 
                   ep.role, ep.assigned_date, p.status
            FROM employees e
            JOIN employee_projects ep ON e.id = ep.employee_id
            JOIN projects p ON ep.project_id = p.id
            WHERE e.id = ?
            ORDER BY ep.assigned_date DESC
        ''', (employee_id,))
        
        projects = cursor.fetchall()
        conn.close()
        
        return projects

def demonstrate_crud_operations():
    """CRUD 연산 시연"""
    
    print("6. CRUD 연산 시연:")
    
    db = EmployeeDatabase()
    
    # CREATE - 새 직원 추가
    print("  CREATE 연산:")
    new_id = db.create_employee(
        '홍길동', 'hong@company.com', 'Engineering', 72000, '2023-05-01'
    )
    
    # READ - 직원 조회
    print(f"\n  READ 연산:")
    print("    Engineering 부서 직원들:")
    eng_employees = db.read_employees(department='Engineering', limit=3)
    for emp in eng_employees:
        print(f"      ID: {emp[0]}, 이름: {emp[1]}, 급여: {emp[4]:,}원")
    
    # UPDATE - 급여 수정
    print(f"\n  UPDATE 연산:")
    if new_id:
        db.update_employee_salary(new_id, 75000)
    
    # 프로젝트 정보 조회 (JOIN)
    print(f"\n  JOIN 연산 (직원의 프로젝트):")
    projects = db.get_employee_projects(1)  # 김철수의 프로젝트
    if projects:
        print(f"    {projects[0][0]}님의 프로젝트:")
        for proj in projects:
            print(f"      프로젝트: {proj[1]}, 역할: {proj[2]}, 상태: {proj[4]}")
    
    # DELETE - 직원 삭제 (참조 무결성 확인)
    print(f"\n  DELETE 연산:")
    if new_id:
        db.delete_employee(new_id)  # 프로젝트 할당이 없어서 삭제 가능

demonstrate_crud_operations()
```

### 1.3 고급 쿼리와 집계 함수

```python
print("\n=== 고급 쿼리와 집계 함수 ===")

class AdvancedQueries:
    """고급 SQL 쿼리 클래스"""
    
    def __init__(self, db_path='sample_company.db'):
        self.db_path = db_path
    
    def get_connection(self):
        return sqlite3.connect(self.db_path)
    
    def department_statistics(self):
        """부서별 통계"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                department,
                COUNT(*) as employee_count,
                AVG(salary) as avg_salary,
                MIN(salary) as min_salary,
                MAX(salary) as max_salary,
                SUM(salary) as total_salary
            FROM employees
            GROUP BY department
            ORDER BY avg_salary DESC
        ''')
        
        stats = cursor.fetchall()
        conn.close()
        
        return stats
    
    def project_progress_report(self):
        """프로젝트 진행 현황 보고서"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                p.name as project_name,
                p.status,
                p.budget,
                COUNT(ep.employee_id) as team_size,
                GROUP_CONCAT(e.name, ', ') as team_members,
                CASE 
                    WHEN p.end_date IS NULL THEN 'Ongoing'
                    WHEN DATE(p.end_date) > DATE('now') THEN 'In Progress'
                    ELSE 'Completed'
                END as progress_status
            FROM projects p
            LEFT JOIN employee_projects ep ON p.id = ep.project_id
            LEFT JOIN employees e ON ep.employee_id = e.id
            GROUP BY p.id
            ORDER BY p.budget DESC
        ''')
        
        reports = cursor.fetchall()
        conn.close()
        
        return reports
    
    def high_performers(self, salary_threshold=70000):
        """고성과자 조회 (급여 기준)"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                e.name,
                e.department,
                e.salary,
                COUNT(ep.project_id) as project_count,
                ROUND(
                    julianday('now') - julianday(e.hire_date)
                ) as days_employed
            FROM employees e
            LEFT JOIN employee_projects ep ON e.id = ep.employee_id
            WHERE e.salary >= ?
            GROUP BY e.id
            ORDER BY e.salary DESC, project_count DESC
        ''', (salary_threshold,))
        
        performers = cursor.fetchall()
        conn.close()
        
        return performers
    
    def project_budget_analysis(self):
        """프로젝트 예산 분석"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            WITH project_costs AS (
                SELECT 
                    p.id,
                    p.name,
                    p.budget,
                    COUNT(ep.employee_id) * 
                    (julianday(COALESCE(p.end_date, 'now')) - julianday(p.start_date)) / 30 * 
                    AVG(e.salary) / 12 as estimated_cost
                FROM projects p
                LEFT JOIN employee_projects ep ON p.id = ep.project_id
                LEFT JOIN employees e ON ep.employee_id = e.id
                GROUP BY p.id
            )
            SELECT 
                name,
                budget,
                ROUND(estimated_cost, 2) as estimated_cost,
                ROUND(budget - estimated_cost, 2) as budget_remaining,
                ROUND((budget - estimated_cost) / budget * 100, 1) as budget_utilization_pct
            FROM project_costs
            WHERE estimated_cost IS NOT NULL
            ORDER BY budget_utilization_pct ASC
        ''')
        
        analysis = cursor.fetchall()
        conn.close()
        
        return analysis

def demonstrate_advanced_queries():
    """고급 쿼리 시연"""
    
    print("7. 고급 쿼리와 집계 함수:")
    
    queries = AdvancedQueries()
    
    # 부서별 통계
    print("  부서별 통계:")
    stats = queries.department_statistics()
    for stat in stats:
        dept, count, avg_sal, min_sal, max_sal, total_sal = stat
        print(f"    {dept}: {count}명, 평균급여: {avg_sal:,.0f}원, 총급여: {total_sal:,.0f}원")
    
    # 프로젝트 진행 현황
    print(f"\n  프로젝트 진행 현황:")
    reports = queries.project_progress_report()
    for report in reports:
        name, status, budget, team_size, members, progress = report
        print(f"    {name}: 예산 {budget:,}원, 팀원 {team_size}명, 상태: {progress}")
        if members:
            print(f"      팀원: {members}")
    
    # 고성과자 분석
    print(f"\n  고성과자 분석 (급여 70,000원 이상):")
    performers = queries.high_performers()
    for perf in performers:
        name, dept, salary, proj_count, days = perf
        print(f"    {name} ({dept}): {salary:,}원, {proj_count}개 프로젝트, 근무 {days}일")
    
    # 프로젝트 예산 분석
    print(f"\n  프로젝트 예산 분석:")
    analysis = queries.project_budget_analysis()
    for item in analysis:
        name, budget, cost, remaining, util_pct = item
        print(f"    {name}: 예산 {budget:,}원, 예상비용 {cost:,}원, 잔여 {remaining:,}원 ({util_pct}%)")

demonstrate_advanced_queries()
```

## 2. 데이터베이스 트랜잭션과 에러 처리

### 2.1 트랜잭션 관리

```python
print("\n=== 데이터베이스 트랜잭션과 에러 처리 ===")

import sqlite3
from contextlib import contextmanager
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class TransactionManager:
    """트랜잭션 관리 클래스"""
    
    def __init__(self, db_path='sample_company.db'):
        self.db_path = db_path
    
    @contextmanager
    def transaction(self):
        """트랜잭션 컨텍스트 매니저"""
        conn = sqlite3.connect(self.db_path)
        conn.execute('BEGIN')
        
        try:
            yield conn
            conn.commit()
            logger.info("트랜잭션 커밋 완료")
        except Exception as e:
            conn.rollback()
            logger.error(f"트랜잭션 롤백: {e}")
            raise
        finally:
            conn.close()
    
    def transfer_employee_between_projects(self, employee_id, from_project_id, to_project_id, new_role):
        """직원의 프로젝트 이동 (트랜잭션 사용)"""
        
        print(f"8. 트랜잭션 예제 - 직원 프로젝트 이동:")
        
        try:
            with self.transaction() as conn:
                cursor = conn.cursor()
                
                # 1. 현재 프로젝트에서 제거
                cursor.execute('''
                    DELETE FROM employee_projects 
                    WHERE employee_id = ? AND project_id = ?
                ''', (employee_id, from_project_id))
                
                if cursor.rowcount == 0:
                    raise ValueError(f"직원 {employee_id}가 프로젝트 {from_project_id}에 할당되지 않음")
                
                # 2. 새 프로젝트에 할당
                cursor.execute('''
                    INSERT INTO employee_projects (employee_id, project_id, role, assigned_date)
                    VALUES (?, ?, ?, DATE('now'))
                ''', (employee_id, to_project_id, new_role))
                
                # 3. 로그 기록용 정보 조회
                cursor.execute('SELECT name FROM employees WHERE id = ?', (employee_id,))
                emp_name = cursor.fetchone()[0]
                
                cursor.execute('SELECT name FROM projects WHERE id = ?', (from_project_id,))
                from_proj = cursor.fetchone()[0]
                
                cursor.execute('SELECT name FROM projects WHERE id = ?', (to_project_id,))
                to_proj = cursor.fetchone()[0]
                
                print(f"    ✓ {emp_name}님을 '{from_proj}'에서 '{to_proj}'로 이동 ({new_role})")
                
        except Exception as e:
            print(f"    ✗ 프로젝트 이동 실패: {e}")
            return False
        
        return True
    
    def batch_salary_update(self, updates):
        """일괄 급여 조정 (트랜잭션 사용)"""
        
        print(f"\n9. 일괄 처리 트랜잭션:")
        
        try:
            with self.transaction() as conn:
                cursor = conn.cursor()
                
                for employee_id, new_salary, reason in updates:
                    # 현재 급여 확인
                    cursor.execute('SELECT name, salary FROM employees WHERE id = ?', (employee_id,))
                    result = cursor.fetchone()
                    
                    if not result:
                        raise ValueError(f"직원 ID {employee_id}를 찾을 수 없음")
                    
                    name, current_salary = result
                    
                    # 급여 업데이트
                    cursor.execute('''
                        UPDATE employees 
                        SET salary = ? 
                        WHERE id = ?
                    ''', (new_salary, employee_id))
                    
                    print(f"    ✓ {name}: {current_salary:,}원 → {new_salary:,}원 ({reason})")
                
                print(f"    총 {len(updates)}명의 급여 조정 완료")
                
        except Exception as e:
            print(f"    ✗ 일괄 급여 조정 실패: {e}")
            return False
        
        return True

# 트랜잭션 시연
def demonstrate_transactions():
    """트랜잭션 시연"""
    
    tm = TransactionManager()
    
    # 프로젝트 이동 (성공 케이스)
    tm.transfer_employee_between_projects(
        employee_id=1,
        from_project_id=1,
        to_project_id=3,
        new_role='Senior Developer'
    )
    
    # 일괄 급여 조정
    salary_updates = [
        (1, 78000, '성과 인상'),
        (2, 68000, '시장 조정'),
        (3, 85000, '승진'),
    ]
    
    tm.batch_salary_update(salary_updates)

demonstrate_transactions()
```

### 2.2 연결 풀링과 성능 최적화

```python
print("\n=== 연결 풀링과 성능 최적화 ===")

import threading
import time
import queue
from concurrent.futures import ThreadPoolExecutor, as_completed

class ConnectionPool:
    """간단한 데이터베이스 연결 풀"""
    
    def __init__(self, db_path, pool_size=5):
        self.db_path = db_path
        self.pool_size = pool_size
        self.pool = queue.Queue(maxsize=pool_size)
        self.lock = threading.Lock()
        
        # 연결 풀 초기화
        for _ in range(pool_size):
            conn = sqlite3.connect(db_path, check_same_thread=False)
            conn.execute('PRAGMA journal_mode=WAL')  # 성능 개선
            conn.execute('PRAGMA synchronous=NORMAL')  # 성능 개선
            self.pool.put(conn)
    
    @contextmanager
    def get_connection(self, timeout=10):
        """연결 풀에서 연결 가져오기"""
        try:
            conn = self.pool.get(timeout=timeout)
            yield conn
        finally:
            self.pool.put(conn)
    
    def close_all(self):
        """모든 연결 닫기"""
        while not self.pool.empty():
            conn = self.pool.get()
            conn.close()

class OptimizedDatabase:
    """최적화된 데이터베이스 클래스"""
    
    def __init__(self, db_path='sample_company.db', pool_size=5):
        self.pool = ConnectionPool(db_path, pool_size)
        self.prepare_optimizations()
    
    def prepare_optimizations(self):
        """데이터베이스 최적화 설정"""
        
        print("10. 데이터베이스 최적화 설정:")
        
        with self.pool.get_connection() as conn:
            cursor = conn.cursor()
            
            # 인덱스 생성
            indexes = [
                "CREATE INDEX IF NOT EXISTS idx_emp_department ON employees(department)",
                "CREATE INDEX IF NOT EXISTS idx_emp_salary ON employees(salary)",
                "CREATE INDEX IF NOT EXISTS idx_emp_hire_date ON employees(hire_date)",
                "CREATE INDEX IF NOT EXISTS idx_proj_status ON projects(status)",
                "CREATE INDEX IF NOT EXISTS idx_emp_proj_emp_id ON employee_projects(employee_id)",
                "CREATE INDEX IF NOT EXISTS idx_emp_proj_proj_id ON employee_projects(project_id)",
            ]
            
            for index_sql in indexes:
                cursor.execute(index_sql)
            
            # 통계 정보 업데이트
            cursor.execute("ANALYZE")
            conn.commit()
            
            print("    ✓ 인덱스 생성 및 통계 정보 업데이트 완료")
    
    def bulk_insert_employees(self, employee_data_list):
        """대량 직원 데이터 삽입 (최적화)"""
        
        print(f"\n11. 대량 데이터 삽입 최적화:")
        
        start_time = time.time()
        
        with self.pool.get_connection() as conn:
            cursor = conn.cursor()
            
            # WAL 모드에서 대량 삽입 최적화
            cursor.execute('PRAGMA cache_size = 10000')
            cursor.execute('PRAGMA temp_store = MEMORY')
            
            # executemany를 사용한 일괄 삽입
            cursor.executemany('''
                INSERT OR IGNORE INTO employees (name, email, department, salary, hire_date)
                VALUES (?, ?, ?, ?, ?)
            ''', employee_data_list)
            
            conn.commit()
            
            inserted_count = cursor.rowcount
            elapsed_time = time.time() - start_time
            
            print(f"    ✓ {len(employee_data_list)}개 레코드 삽입 시도")
            print(f"    ✓ {inserted_count}개 레코드 실제 삽입")
            print(f"    ✓ 소요 시간: {elapsed_time:.3f}초")
            
            return inserted_count
    
    def concurrent_queries(self, query_func_list):
        """동시 쿼리 실행"""
        
        print(f"\n12. 동시 쿼리 실행:")
        
        start_time = time.time()
        results = []
        
        with ThreadPoolExecutor(max_workers=3) as executor:
            # 쿼리 제출
            future_to_query = {
                executor.submit(query_func): query_func.__name__ 
                for query_func in query_func_list
            }
            
            # 결과 수집
            for future in as_completed(future_to_query):
                query_name = future_to_query[future]
                try:
                    result = future.result()
                    results.append((query_name, result))
                    print(f"    ✓ {query_name} 완료")
                except Exception as e:
                    print(f"    ✗ {query_name} 실패: {e}")
        
        elapsed_time = time.time() - start_time
        print(f"    총 소요 시간: {elapsed_time:.3f}초")
        
        return results
    
    def query_department_stats(self):
        """부서 통계 쿼리"""
        with self.pool.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT department, COUNT(*), AVG(salary)
                FROM employees
                GROUP BY department
            ''')
            return cursor.fetchall()
    
    def query_recent_hires(self):
        """최근 입사자 쿼리"""
        with self.pool.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT name, hire_date
                FROM employees
                WHERE hire_date >= DATE('now', '-6 months')
                ORDER BY hire_date DESC
            ''')
            return cursor.fetchall()
    
    def query_project_summary(self):
        """프로젝트 요약 쿼리"""
        with self.pool.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT status, COUNT(*), SUM(budget)
                FROM projects
                GROUP BY status
            ''')
            return cursor.fetchall()
    
    def close(self):
        """연결 풀 정리"""
        self.pool.close_all()

def demonstrate_optimization():
    """성능 최적화 시연"""
    
    opt_db = OptimizedDatabase()
    
    # 대량 데이터 생성
    import random
    departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
    
    bulk_data = [
        (
            f'Employee_{i:04d}',
            f'emp{i:04d}@company.com',
            random.choice(departments),
            random.randint(50000, 100000),
            f'2023-{random.randint(1,12):02d}-{random.randint(1,28):02d}'
        )
        for i in range(100, 200)  # 100개 레코드
    ]
    
    # 대량 삽입 테스트
    opt_db.bulk_insert_employees(bulk_data)
    
    # 동시 쿼리 실행 테스트
    query_functions = [
        opt_db.query_department_stats,
        opt_db.query_recent_hires,
        opt_db.query_project_summary,
    ]
    
    results = opt_db.concurrent_queries(query_functions)
    
    # 결과 출력
    for query_name, result in results:
        print(f"    {query_name} 결과: {len(result)}개 레코드")
    
    opt_db.close()

demonstrate_optimization()
```

## 3. ORM과 SQLAlchemy 기초

### 3.1 SQLAlchemy 모델 정의

```python
print("\n=== ORM과 SQLAlchemy 기초 ===")

# SQLAlchemy가 설치되지 않았을 수 있으므로 시뮬레이션으로 설명
def demonstrate_sqlalchemy_concepts():
    """SQLAlchemy 개념 설명"""
    
    print("13. ORM (Object-Relational Mapping) 개념:")
    print("  - 객체와 관계형 데이터베이스 테이블 간의 매핑")
    print("  - SQL을 직접 작성하지 않고 객체 메서드로 데이터베이스 조작")
    print("  - 데이터베이스 독립성과 코드 재사용성 향상")
    print("  - SQLAlchemy는 Python의 대표적인 ORM 라이브러리")
    print()
    
    print("14. SQLAlchemy 주요 구성 요소:")
    print("  - Engine: 데이터베이스 연결 관리")
    print("  - Session: 트랜잭션과 객체 상태 관리")
    print("  - Model: 데이터베이스 테이블과 매핑되는 클래스")
    print("  - Query: 데이터 조회와 조작")

demonstrate_sqlalchemy_concepts()

# SQLAlchemy 스타일 모델 시뮬레이션
class SQLAlchemySimulation:
    """SQLAlchemy 사용법 시뮬레이션"""
    
    def __init__(self):
        self.db_path = 'sample_company.db'
    
    def demonstrate_model_definition(self):
        """SQLAlchemy 모델 정의 예제"""
        
        print(f"\n15. SQLAlchemy 모델 정의 예제:")
        
        model_code = '''
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import date

Base = declarative_base()

# 다대다 관계를 위한 연관 테이블
employee_project_table = Table(
    'employee_projects', Base.metadata,
    Column('employee_id', Integer, ForeignKey('employees.id'), primary_key=True),
    Column('project_id', Integer, ForeignKey('projects.id'), primary_key=True),
    Column('role', String(50), nullable=False)
)

class Employee(Base):
    __tablename__ = 'employees'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    department = Column(String(50), nullable=False)
    salary = Column(Float, nullable=False)
    hire_date = Column(Date, nullable=False)
    
    # 관계 정의
    projects = relationship('Project', secondary=employee_project_table, back_populates='employees')
    
    def __repr__(self):
        return f"<Employee(name='{self.name}', department='{self.department}')>"

class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    budget = Column(Float, nullable=False)
    status = Column(String(20), default='active')
    
    # 관계 정의
    employees = relationship('Employee', secondary=employee_project_table, back_populates='projects')
    
    def __repr__(self):
        return f"<Project(name='{self.name}', status='{self.status}')>"

# 엔진과 세션 설정
engine = create_engine('sqlite:///company_orm.db', echo=True)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
        '''
        
        print("    SQLAlchemy 모델 정의:")
        print("    " + model_code.replace('\n', '\n    '))
    
    def demonstrate_orm_operations(self):
        """ORM 연산 예제"""
        
        print(f"\n16. SQLAlchemy ORM 연산 예제:")
        
        operations_code = '''
# 세션 생성
session = Session()

# CREATE - 새 직원 생성
new_employee = Employee(
    name='김개발',
    email='kim.dev@company.com',
    department='Engineering',
    salary=75000,
    hire_date=date(2023, 6, 1)
)

session.add(new_employee)
session.commit()

# READ - 직원 조회
# 모든 직원
all_employees = session.query(Employee).all()

# 필터링
eng_employees = session.query(Employee).filter(
    Employee.department == 'Engineering'
).all()

# 정렬과 제한
top_earners = session.query(Employee).order_by(
    Employee.salary.desc()
).limit(5).all()

# JOIN 쿼리
employees_with_projects = session.query(Employee).join(
    Employee.projects
).filter(Project.status == 'active').all()

# UPDATE - 급여 인상
session.query(Employee).filter(
    Employee.department == 'Engineering'
).update({Employee.salary: Employee.salary * 1.1})

# DELETE - 직원 삭제
session.query(Employee).filter(
    Employee.email == 'old.employee@company.com'
).delete()

session.commit()

# 관계 활용
employee = session.query(Employee).first()
for project in employee.projects:
    print(f"{employee.name}는 {project.name} 프로젝트에 참여")

session.close()
        '''
        
        print("    ORM 연산 예제:")
        print("    " + operations_code.replace('\n', '\n    '))
    
    def demonstrate_advanced_orm(self):
        """고급 ORM 패턴"""
        
        print(f"\n17. 고급 SQLAlchemy 패턴:")
        
        advanced_code = '''
# 1. 쿼리 최적화 - Eager Loading
employees_with_projects = session.query(Employee).options(
    joinedload(Employee.projects)
).all()

# 2. 집계 쿼리
from sqlalchemy import func

dept_stats = session.query(
    Employee.department,
    func.count(Employee.id).label('employee_count'),
    func.avg(Employee.salary).label('avg_salary')
).group_by(Employee.department).all()

# 3. 서브쿼리
high_budget_projects = session.query(Project.id).filter(
    Project.budget > 100000
).subquery()

employees_on_high_budget = session.query(Employee).join(
    Employee.projects
).filter(Project.id.in_(high_budget_projects)).all()

# 4. Raw SQL 실행
result = session.execute(
    "SELECT department, COUNT(*) FROM employees GROUP BY department"
).fetchall()

# 5. 벌크 연산
session.bulk_insert_mappings(Employee, [
    {'name': f'Bulk Employee {i}', 'email': f'bulk{i}@company.com', 
     'department': 'Engineering', 'salary': 70000, 'hire_date': date(2023, 7, 1)}
    for i in range(10)
])

# 6. 트랜잭션 관리
try:
    with session.begin():
        # 여러 연산 수행
        new_project = Project(name='New Project', budget=150000, 
                            start_date=date(2023, 8, 1))
        session.add(new_project)
        
        # 직원 할당
        employee = session.query(Employee).first()
        employee.projects.append(new_project)
        
        # 자동 커밋됨
except Exception as e:
    # 자동 롤백됨
    print(f"Transaction failed: {e}")
        '''
        
        print("    고급 ORM 패턴:")
        print("    " + advanced_code.replace('\n', '\n    '))

# SQLAlchemy 시뮬레이션 실행
sqlalchemy_sim = SQLAlchemySimulation()
sqlalchemy_sim.demonstrate_model_definition()
sqlalchemy_sim.demonstrate_orm_operations()
sqlalchemy_sim.demonstrate_advanced_orm()
```

### 3.2 실용적인 ORM 패턴

```python
print("\n=== 실용적인 ORM 패턴 ===")

# SQLite를 사용한 간단한 ORM 패턴 구현
class SimpleORM:
    """간단한 ORM 패턴 구현"""
    
    def __init__(self, db_path='sample_company.db'):
        self.db_path = db_path
    
    def get_connection(self):
        return sqlite3.connect(self.db_path)

class BaseModel:
    """기본 모델 클래스"""
    
    table_name = None
    fields = {}
    
    def __init__(self, orm_instance, **kwargs):
        self.orm = orm_instance
        for field, value in kwargs.items():
            setattr(self, field, value)
    
    def save(self):
        """객체 저장"""
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        if hasattr(self, 'id') and self.id:
            # UPDATE
            set_clause = ', '.join([f"{field} = ?" for field in self.fields.keys() if field != 'id'])
            values = [getattr(self, field) for field in self.fields.keys() if field != 'id']
            values.append(self.id)
            
            cursor.execute(f'''
                UPDATE {self.table_name} 
                SET {set_clause} 
                WHERE id = ?
            ''', values)
        else:
            # INSERT
            fields = list(self.fields.keys())
            if 'id' in fields:
                fields.remove('id')  # AUTO INCREMENT
            
            placeholders = ', '.join(['?' for _ in fields])
            field_names = ', '.join(fields)
            values = [getattr(self, field, None) for field in fields]
            
            cursor.execute(f'''
                INSERT INTO {self.table_name} ({field_names})
                VALUES ({placeholders})
            ''', values)
            
            self.id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        return self
    
    def delete(self):
        """객체 삭제"""
        if not hasattr(self, 'id') or not self.id:
            raise ValueError("Cannot delete object without id")
        
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        cursor.execute(f'DELETE FROM {self.table_name} WHERE id = ?', (self.id,))
        conn.commit()
        conn.close()
    
    @classmethod
    def find_by_id(cls, orm_instance, obj_id):
        """ID로 객체 찾기"""
        conn = orm_instance.get_connection()
        cursor = conn.cursor()
        
        cursor.execute(f'SELECT * FROM {cls.table_name} WHERE id = ?', (obj_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            field_names = list(cls.fields.keys())
            data = dict(zip(field_names, row))
            return cls(orm_instance, **data)
        return None
    
    @classmethod
    def find_all(cls, orm_instance, where_clause=None, params=None):
        """모든 객체 찾기"""
        conn = orm_instance.get_connection()
        cursor = conn.cursor()
        
        query = f'SELECT * FROM {cls.table_name}'
        if where_clause:
            query += f' WHERE {where_clause}'
        
        cursor.execute(query, params or [])
        rows = cursor.fetchall()
        conn.close()
        
        field_names = list(cls.fields.keys())
        objects = []
        for row in rows:
            data = dict(zip(field_names, row))
            objects.append(cls(orm_instance, **data))
        
        return objects

class EmployeeModel(BaseModel):
    """직원 모델"""
    
    table_name = 'employees'
    fields = {
        'id': int,
        'name': str,
        'email': str,
        'department': str,
        'salary': float,
        'hire_date': str,
        'created_at': str,
    }
    
    def get_projects(self):
        """직원의 프로젝트 조회"""
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT p.*, ep.role 
            FROM projects p
            JOIN employee_projects ep ON p.id = ep.project_id
            WHERE ep.employee_id = ?
        ''', (self.id,))
        
        projects = cursor.fetchall()
        conn.close()
        
        return projects
    
    def assign_to_project(self, project_id, role):
        """프로젝트에 할당"""
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO employee_projects (employee_id, project_id, role, assigned_date)
            VALUES (?, ?, ?, DATE('now'))
        ''', (self.id, project_id, role))
        
        conn.commit()
        conn.close()
    
    def __repr__(self):
        return f"<Employee(id={self.id}, name='{self.name}', department='{self.department}')>"

class ProjectModel(BaseModel):
    """프로젝트 모델"""
    
    table_name = 'projects'
    fields = {
        'id': int,
        'name': str,
        'description': str,
        'start_date': str,
        'end_date': str,
        'budget': float,
        'status': str,
    }
    
    def get_team_members(self):
        """프로젝트 팀원 조회"""
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT e.*, ep.role 
            FROM employees e
            JOIN employee_projects ep ON e.id = ep.employee_id
            WHERE ep.project_id = ?
        ''', (self.id,))
        
        members = cursor.fetchall()
        conn.close()
        
        return members
    
    def add_team_member(self, employee_id, role):
        """팀원 추가"""
        conn = self.orm.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO employee_projects (employee_id, project_id, role, assigned_date)
            VALUES (?, ?, ?, DATE('now'))
        ''', (employee_id, self.id, role))
        
        conn.commit()
        conn.close()
    
    def __repr__(self):
        return f"<Project(id={self.id}, name='{self.name}', status='{self.status}')>"

def demonstrate_simple_orm():
    """간단한 ORM 패턴 시연"""
    
    print("18. 간단한 ORM 패턴 구현:")
    
    orm = SimpleORM()
    
    # 새 직원 생성
    print("  객체 생성과 저장:")
    new_employee = EmployeeModel(
        orm,
        name='이ORM',
        email='orm@company.com',
        department='Engineering',
        salary=72000,
        hire_date='2023-06-15'
    )
    
    new_employee.save()
    print(f"    ✓ 새 직원 생성: {new_employee}")
    
    # 직원 조회
    print(f"\n  객체 조회:")
    employee = EmployeeModel.find_by_id(orm, new_employee.id)
    if employee:
        print(f"    ✓ ID로 조회: {employee}")
    
    # 조건부 조회
    eng_employees = EmployeeModel.find_all(
        orm, 
        where_clause="department = ?", 
        params=['Engineering']
    )
    print(f"    ✓ Engineering 부서: {len(eng_employees)}명")
    
    # 프로젝트 조회
    print(f"\n  관계 데이터 조회:")
    projects = ProjectModel.find_all(orm, where_clause="status = ?", params=['active'])
    if projects:
        project = projects[0]
        print(f"    ✓ 활성 프로젝트: {project}")
        
        # 직원을 프로젝트에 할당
        employee.assign_to_project(project.id, 'ORM Developer')
        print(f"    ✓ {employee.name}을 {project.name}에 할당")
        
        # 프로젝트 팀원 조회
        team_members = project.get_team_members()
        print(f"    ✓ {project.name} 팀원: {len(team_members)}명")
    
    # 급여 업데이트
    print(f"\n  객체 수정:")
    employee.salary = 75000
    employee.save()
    print(f"    ✓ 급여 업데이트: {employee.salary:,}원")

demonstrate_simple_orm()
```

## 4. NoSQL 데이터베이스 기초

### 4.1 MongoDB 시뮬레이션

```python
print("\n=== NoSQL 데이터베이스 기초 ===")

import json
from datetime import datetime
from collections import defaultdict

# MongoDB 스타일 문서 데이터베이스 시뮬레이션
class DocumentDatabase:
    """문서 데이터베이스 시뮬레이션 (MongoDB 스타일)"""
    
    def __init__(self):
        self.collections = defaultdict(list)
        self.indexes = defaultdict(dict)
        self.next_id = 1
    
    def insert_one(self, collection_name, document):
        """단일 문서 삽입"""
        doc = document.copy()
        doc['_id'] = self.next_id
        doc['created_at'] = datetime.now().isoformat()
        
        self.collections[collection_name].append(doc)
        self.next_id += 1
        
        return doc['_id']
    
    def insert_many(self, collection_name, documents):
        """여러 문서 삽입"""
        inserted_ids = []
        for doc in documents:
            doc_id = self.insert_one(collection_name, doc)
            inserted_ids.append(doc_id)
        return inserted_ids
    
    def find_one(self, collection_name, query=None):
        """단일 문서 조회"""
        for doc in self.collections[collection_name]:
            if self._match_query(doc, query or {}):
                return doc
        return None
    
    def find(self, collection_name, query=None, sort=None, limit=None):
        """여러 문서 조회"""
        results = []
        for doc in self.collections[collection_name]:
            if self._match_query(doc, query or {}):
                results.append(doc)
        
        # 정렬
        if sort:
            for field, direction in reversed(sort):
                results.sort(key=lambda x: x.get(field, 0), reverse=(direction == -1))
        
        # 제한
        if limit:
            results = results[:limit]
        
        return results
    
    def update_one(self, collection_name, query, update):
        """단일 문서 업데이트"""
        for doc in self.collections[collection_name]:
            if self._match_query(doc, query):
                if '$set' in update:
                    doc.update(update['$set'])
                if '$inc' in update:
                    for field, value in update['$inc'].items():
                        doc[field] = doc.get(field, 0) + value
                doc['updated_at'] = datetime.now().isoformat()
                return True
        return False
    
    def delete_one(self, collection_name, query):
        """단일 문서 삭제"""
        for i, doc in enumerate(self.collections[collection_name]):
            if self._match_query(doc, query):
                del self.collections[collection_name][i]
                return True
        return False
    
    def aggregate(self, collection_name, pipeline):
        """집계 파이프라인 (간단한 구현)"""
        docs = self.collections[collection_name][:]
        
        for stage in pipeline:
            if '$match' in stage:
                docs = [doc for doc in docs if self._match_query(doc, stage['$match'])]
            
            elif '$group' in stage:
                group_spec = stage['$group']
                group_id = group_spec['_id']
                groups = defaultdict(list)
                
                for doc in docs:
                    key = doc.get(group_id.replace('$', '')) if group_id.startswith('$') else group_id
                    groups[key].append(doc)
                
                new_docs = []
                for key, group_docs in groups.items():
                    new_doc = {'_id': key}
                    
                    for field, operation in group_spec.items():
                        if field == '_id':
                            continue
                        
                        if isinstance(operation, dict) and '$sum' in operation:
                            sum_field = operation['$sum'].replace('$', '')
                            if sum_field == '1':
                                new_doc[field] = len(group_docs)
                            else:
                                new_doc[field] = sum(doc.get(sum_field, 0) for doc in group_docs)
                        
                        elif isinstance(operation, dict) and '$avg' in operation:
                            avg_field = operation['$avg'].replace('$', '')
                            values = [doc.get(avg_field, 0) for doc in group_docs]
                            new_doc[field] = sum(values) / len(values) if values else 0
                    
                    new_docs.append(new_doc)
                
                docs = new_docs
            
            elif '$sort' in stage:
                sort_spec = stage['$sort']
                for field, direction in reversed(list(sort_spec.items())):
                    docs.sort(key=lambda x: x.get(field, 0), reverse=(direction == -1))
            
            elif '$limit' in stage:
                docs = docs[:stage['$limit']]
        
        return docs
    
    def _match_query(self, document, query):
        """쿼리 매칭 확인"""
        for field, condition in query.items():
            doc_value = document.get(field)
            
            if isinstance(condition, dict):
                for operator, value in condition.items():
                    if operator == '$gte' and not (doc_value >= value):
                        return False
                    elif operator == '$lte' and not (doc_value <= value):
                        return False
                    elif operator == '$gt' and not (doc_value > value):
                        return False
                    elif operator == '$lt' and not (doc_value < value):
                        return False
                    elif operator == '$ne' and not (doc_value != value):
                        return False
                    elif operator == '$in' and doc_value not in value:
                        return False
            else:
                if doc_value != condition:
                    return False
        
        return True
    
    def get_collection_stats(self, collection_name):
        """컬렉션 통계"""
        docs = self.collections[collection_name]
        if not docs:
            return {'count': 0}
        
        return {
            'count': len(docs),
            'avg_size': sum(len(json.dumps(doc)) for doc in docs) / len(docs),
            'total_size': sum(len(json.dumps(doc)) for doc in docs),
        }

def demonstrate_nosql_database():
    """NoSQL 데이터베이스 시연"""
    
    print("19. NoSQL 데이터베이스 개념:")
    print("  - 스키마가 없는 유연한 데이터 구조")
    print("  - JSON 스타일의 문서 저장")
    print("  - 수평적 확장성 (Horizontal Scaling)")
    print("  - 빠른 읽기/쓰기 성능")
    print("  - 복잡한 조인 대신 문서에 데이터 포함")
    
    print(f"\n20. MongoDB 스타일 문서 데이터베이스 시연:")
    
    db = DocumentDatabase()
    
    # 직원 문서 삽입 (중첩된 구조)
    employees = [
        {
            'name': '김문서',
            'email': 'kim.doc@company.com',
            'department': 'Engineering',
            'salary': 75000,
            'skills': ['Python', 'JavaScript', 'MongoDB'],
            'address': {
                'city': '서울',
                'district': '강남구',
                'zipcode': '12345'
            },
            'projects': [
                {'name': '웹 애플리케이션', 'role': 'Developer', 'start_date': '2023-01-01'},
                {'name': '모바일 앱', 'role': 'Backend Developer', 'start_date': '2023-03-01'}
            ],
            'performance_reviews': [
                {'year': 2022, 'score': 4.2, 'comments': '우수한 성과'},
                {'year': 2023, 'score': 4.5, 'comments': '탁월한 기술력'}
            ]
        },
        {
            'name': '이NoSQL',
            'email': 'lee.nosql@company.com',
            'department': 'Data Science',
            'salary': 80000,
            'skills': ['Python', 'R', 'MongoDB', 'Machine Learning'],
            'address': {
                'city': '서울',
                'district': '서초구',
                'zipcode': '54321'
            },
            'projects': [
                {'name': '데이터 분석', 'role': 'Data Scientist', 'start_date': '2023-02-01'}
            ],
            'performance_reviews': [
                {'year': 2023, 'score': 4.8, 'comments': '뛰어난 분석 능력'}
            ]
        }
    ]
    
    # 문서 삽입
    print("  문서 삽입:")
    inserted_ids = db.insert_many('employees', employees)
    print(f"    ✓ {len(inserted_ids)}개 직원 문서 삽입")
    
    # 단순 조회
    print(f"\n  문서 조회:")
    all_employees = db.find('employees')
    print(f"    ✓ 전체 직원: {len(all_employees)}명")
    
    # 조건부 조회
    eng_employees = db.find('employees', {'department': 'Engineering'})
    print(f"    ✓ Engineering 부서: {len(eng_employees)}명")
    
    # 복잡한 조회 (배열 내 검색)
    python_developers = db.find('employees', {'skills': 'Python'})
    print(f"    ✓ Python 개발자: {len(python_developers)}명")
    
    # 중첩 필드 조회
    seoul_employees = db.find('employees', {'address.city': '서울'})
    print(f"    ✓ 서울 거주자: {len(seoul_employees)}명")
    
    # 범위 조회
    high_earners = db.find('employees', {'salary': {'$gte': 75000}})
    print(f"    ✓ 고소득자 (75000원 이상): {len(high_earners)}명")
    
    # 정렬과 제한
    top_earners = db.find('employees', sort=[('salary', -1)], limit=1)
    if top_earners:
        print(f"    ✓ 최고 연봉자: {top_earners[0]['name']} ({top_earners[0]['salary']:,}원)")
    
    # 문서 업데이트
    print(f"\n  문서 업데이트:")
    updated = db.update_one(
        'employees', 
        {'name': '김문서'}, 
        {'$set': {'salary': 78000}, '$inc': {'projects_count': 1}}
    )
    if updated:
        print(f"    ✓ 김문서님 급여 인상")
    
    # 집계 쿼리
    print(f"\n  집계 쿼리:")
    dept_stats = db.aggregate('employees', [
        {'$group': {
            '_id': '$department',
            'count': {'$sum': 1},
            'avg_salary': {'$avg': '$salary'}
        }},
        {'$sort': {'avg_salary': -1}}
    ])
    
    print(f"    부서별 통계:")
    for stat in dept_stats:
        dept, count, avg_sal = stat
        print(f"      {dept}: {count}명, 평균급여: {avg_sal:,.0f}원")
    
    # 컬렉션 통계
    print(f"\n  컬렉션 통계:")
    stats = db.get_collection_stats('employees')
    print(f"    ✓ 문서 수: {stats['count']}")
    print(f"    ✓ 평균 문서 크기: {stats['avg_size']:.0f} bytes")
    print(f"    ✓ 총 크기: {stats['total_size']} bytes")

demonstrate_nosql_database()
```

### 4.2 NoSQL vs SQL 비교

```python
print("\n=== NoSQL vs SQL 비교 ===")

def demonstrate_nosql_vs_sql():
    """NoSQL과 SQL 비교"""
    
    print("21. NoSQL vs SQL 비교:")
    
    comparison = {
        '데이터 모델': {
            'SQL': '테이블, 행, 열의 관계형 구조',
            'NoSQL': '문서, 키-값, 그래프 등 다양한 구조'
        },
        '스키마': {
            'SQL': '엄격한 스키마, 사전 정의 필요',
            'NoSQL': '유연한 스키마, 동적 변경 가능'
        },
        '확장성': {
            'SQL': '수직적 확장 (더 강력한 서버)',
            'NoSQL': '수평적 확장 (더 많은 서버)'
        },
        '일관성': {
            'SQL': 'ACID 보장, 강한 일관성',
            'NoSQL': 'BASE 모델, 최종 일관성'
        },
        '쿼리 언어': {
            'SQL': '표준 SQL 문법',
            'NoSQL': '각 데이터베이스별 고유 API'
        },
        '복잡한 조인': {
            'SQL': '여러 테이블 조인 지원',
            'NoSQL': '제한적 조인, 문서에 데이터 포함'
        },
        '사용 사례': {
            'SQL': '복잡한 관계, 트랜잭션 중요',
            'NoSQL': '빠른 개발, 대용량 데이터, 단순 구조'
        }
    }
    
    for aspect, details in comparison.items():
        print(f"\n  {aspect}:")
        print(f"    SQL:    {details['SQL']}")
        print(f"    NoSQL:  {details['NoSQL']}")
    
    print(f"\n22. 언제 무엇을 사용할까?")
    
    use_cases = {
        'SQL 데이터베이스 사용 시기': [
            '복잡한 관계와 조인이 필요한 경우',
            '강한 일관성과 ACID 트랜잭션이 중요한 경우',
            '복잡한 쿼리와 리포팅이 필요한 경우',
            '기존 SQL 지식과 도구를 활용하고 싶은 경우',
            '예: 금융 시스템, ERP, 전자상거래'
        ],
        'NoSQL 데이터베이스 사용 시기': [
            '빠른 개발과 유연한 스키마가 필요한 경우',
            '대용량 데이터와 높은 처리량이 필요한 경우',
            '수평적 확장이 중요한 경우',
            '복잡한 객체 구조를 저장해야 하는 경우',
            '예: 소셜 미디어, IoT, 실시간 분석, 콘텐츠 관리'
        ]
    }
    
    for category, cases in use_cases.items():
        print(f"\n  {category}:")
        for case in cases:
            print(f"    - {case}")

demonstrate_nosql_vs_sql()
```

## 5. 데이터베이스 설계 패턴과 모범 사례

### 5.1 데이터베이스 설계 원칙

```python
print("\n=== 데이터베이스 설계 패턴과 모범 사례 ===")

def demonstrate_design_principles():
    """데이터베이스 설계 원칙 설명"""
    
    print("23. 관계형 데이터베이스 설계 원칙:")
    
    principles = {
        '정규화 (Normalization)': {
            '1차 정규화': '원자값만 포함, 반복 그룹 제거',
            '2차 정규화': '부분 함수 종속 제거',
            '3차 정규화': '이행 함수 종속 제거',
            '장점': '데이터 중복 최소화, 일관성 보장',
            '단점': '조인 증가로 성능 저하 가능'
        },
        '반정규화 (Denormalization)': {
            '목적': '성능 향상을 위한 의도적 중복',
            '방법': '자주 조인되는 테이블 통합',
            '주의점': '데이터 일관성 관리 필요'
        },
        '인덱스 설계': {
            '클러스터 인덱스': '데이터 물리적 정렬',
            '비클러스터 인덱스': '별도의 인덱스 구조',
            '복합 인덱스': '여러 컬럼 조합',
            '주의점': '쓰기 성능 저하, 저장공간 증가'
        }
    }
    
    for principle, details in principles.items():
        print(f"\n  {principle}:")
        for key, value in details.items():
            print(f"    {key}: {value}")

demonstrate_design_principles()

class DatabaseDesignPatterns:
    """데이터베이스 설계 패턴"""
    
    def __init__(self, db_path='design_patterns.db'):
        self.db_path = db_path
        self.setup_examples()
    
    def setup_examples(self):
        """예제 테이블 설정"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 1. 계층 구조 패턴 - 조직도
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS organization (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                parent_id INTEGER,
                level INTEGER,
                path TEXT,
                FOREIGN KEY (parent_id) REFERENCES organization (id)
            )
        ''')
        
        # 2. 이력 관리 패턴 - 급여 이력
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS salary_history (
                id INTEGER PRIMARY KEY,
                employee_id INTEGER NOT NULL,
                salary REAL NOT NULL,
                effective_date DATE NOT NULL,
                end_date DATE,
                is_current BOOLEAN DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 3. 태그 시스템 패턴
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tags (
                id INTEGER PRIMARY KEY,
                name TEXT UNIQUE NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS employee_tags (
                employee_id INTEGER,
                tag_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (employee_id, tag_id),
                FOREIGN KEY (employee_id) REFERENCES employees (id),
                FOREIGN KEY (tag_id) REFERENCES tags (id)
            )
        ''')
        
        # 4. 설정 관리 패턴
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS app_settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                data_type TEXT DEFAULT 'string',
                description TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # 5. 로그 패턴
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS audit_log (
                id INTEGER PRIMARY KEY,
                table_name TEXT NOT NULL,
                record_id INTEGER NOT NULL,
                action TEXT NOT NULL,  -- INSERT, UPDATE, DELETE
                old_values TEXT,       -- JSON
                new_values TEXT,       -- JSON
                user_id INTEGER,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def demonstrate_hierarchy_pattern(self):
        """계층 구조 패턴 시연"""
        
        print(f"\n24. 계층 구조 패턴 (조직도):")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 조직 데이터 삽입
        org_data = [
            (1, 'CEO', None, 1, '/1'),
            (2, 'CTO', 1, 2, '/1/2'),
            (3, 'Engineering Team', 2, 3, '/1/2/3'),
            (4, 'Senior Developer', 3, 4, '/1/2/3/4'),
            (5, 'Junior Developer', 3, 4, '/1/2/3/5'),
            (6, 'CMO', 1, 2, '/1/6'),
            (7, 'Marketing Team', 6, 3, '/1/6/7'),
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO organization (id, name, parent_id, level, path)
            VALUES (?, ?, ?, ?, ?)
        ''', org_data)
        
        # 계층 구조 조회
        print("  조직 계층 구조:")
        cursor.execute('''
            SELECT name, level, path
            FROM organization
            ORDER BY path
        ''')
        
        for row in cursor.fetchall():
            name, level, path = row
            indent = '  ' * (level - 1)
            print(f"    {indent}• {name}")
        
        # 특정 부서의 하위 조직 조회
        print(f"\n  CTO 하위 조직:")
        cursor.execute('''
            SELECT name, level
            FROM organization
            WHERE path LIKE '/1/2/%'
            ORDER BY path
        ''')
        
        for row in cursor.fetchall():
            name, level = row
            indent = '  ' * (level - 2)
            print(f"    {indent}• {name}")
        
        conn.close()
    
    def demonstrate_history_pattern(self):
        """이력 관리 패턴 시연"""
        
        print(f"\n25. 이력 관리 패턴 (급여 이력):")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 급여 이력 데이터
        salary_data = [
            (1, 1, 60000, '2022-01-01', '2022-06-30', 0),
            (2, 1, 65000, '2022-07-01', '2023-01-31', 0),
            (3, 1, 70000, '2023-02-01', '2023-07-31', 0),
            (4, 1, 75000, '2023-08-01', None, 1),  # 현재 급여
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO salary_history 
            (id, employee_id, salary, effective_date, end_date, is_current)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', salary_data)
        
        # 현재 급여 조회
        print("  현재 급여:")
        cursor.execute('''
            SELECT employee_id, salary, effective_date
            FROM salary_history
            WHERE is_current = 1
        ''')
        
        for row in cursor.fetchall():
            emp_id, salary, effective_date = row
            print(f"    직원 {emp_id}: {salary:,}원 (시작일: {effective_date})")
        
        # 급여 이력 조회
        print(f"\n  급여 변경 이력:")
        cursor.execute('''
            SELECT salary, effective_date, end_date
            FROM salary_history
            WHERE employee_id = 1
            ORDER BY effective_date
        ''')
        
        for row in cursor.fetchall():
            salary, start_date, end_date = row
            end_info = end_date if end_date else '현재'
            print(f"    {salary:,}원 ({start_date} ~ {end_info})")
        
        conn.close()
    
    def demonstrate_tagging_pattern(self):
        """태그 시스템 패턴 시연"""
        
        print(f"\n26. 태그 시스템 패턴:")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 태그 데이터
        tags_data = [
            ('Python', ), ('JavaScript', ), ('React', ), ('Node.js', ),
            ('Senior', ), ('Junior', ), ('Team Lead', ), ('Full Stack', )
        ]
        
        cursor.executemany('INSERT OR IGNORE INTO tags (name) VALUES (?)', tags_data)
        
        # 직원-태그 매핑
        employee_tags_data = [
            (1, 1), (1, 2), (1, 5),  # 직원 1: Python, JavaScript, Senior
            (2, 1), (2, 3), (2, 8),  # 직원 2: Python, React, Full Stack
            (3, 1), (3, 4), (3, 7),  # 직원 3: Python, Node.js, Team Lead
        ]
        
        cursor.executemany('''
            INSERT OR IGNORE INTO employee_tags (employee_id, tag_id) VALUES (?, ?)
        ''', employee_tags_data)
        
        # 태그별 직원 조회
        print("  태그별 직원 수:")
        cursor.execute('''
            SELECT t.name, COUNT(et.employee_id) as employee_count
            FROM tags t
            LEFT JOIN employee_tags et ON t.id = et.tag_id
            GROUP BY t.id, t.name
            ORDER BY employee_count DESC
        ''')
        
        for row in cursor.fetchall():
            tag_name, count = row
            print(f"    {tag_name}: {count}명")
        
        # 특정 태그를 가진 직원 조회
        print(f"\n  Python 태그를 가진 직원:")
        cursor.execute('''
            SELECT DISTINCT et.employee_id
            FROM employee_tags et
            JOIN tags t ON et.tag_id = t.id
            WHERE t.name = 'Python'
        ''')
        
        python_devs = cursor.fetchall()
        print(f"    {len(python_devs)}명의 Python 개발자")
        
        conn.close()
    
    def demonstrate_settings_pattern(self):
        """설정 관리 패턴 시연"""
        
        print(f"\n27. 설정 관리 패턴:")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 애플리케이션 설정
        settings_data = [
            ('max_login_attempts', '3', 'integer', '최대 로그인 시도 횟수'),
            ('session_timeout', '30', 'integer', '세션 타임아웃 (분)'),
            ('enable_notifications', 'true', 'boolean', '알림 활성화'),
            ('company_name', 'Tech Company', 'string', '회사명'),
            ('default_salary', '60000.0', 'float', '기본 급여'),
        ]
        
        cursor.executemany('''
            INSERT OR REPLACE INTO app_settings (key, value, data_type, description)
            VALUES (?, ?, ?, ?)
        ''', settings_data)
        
        # 설정 조회
        print("  애플리케이션 설정:")
        cursor.execute('SELECT key, value, data_type, description FROM app_settings')
        
        for row in cursor.fetchall():
            key, value, data_type, desc = row
            print(f"    {key}: {value} ({data_type}) - {desc}")
        
        # 타입별 설정 조회 함수
        def get_setting(key, default=None):
            cursor.execute('SELECT value, data_type FROM app_settings WHERE key = ?', (key,))
            result = cursor.fetchone()
            
            if not result:
                return default
            
            value, data_type = result
            
            if data_type == 'integer':
                return int(value)
            elif data_type == 'float':
                return float(value)
            elif data_type == 'boolean':
                return value.lower() == 'true'
            else:
                return value
        
        print(f"\n  설정 사용 예제:")
        print(f"    최대 로그인 시도: {get_setting('max_login_attempts')}회")
        print(f"    알림 활성화: {get_setting('enable_notifications')}")
        print(f"    회사명: {get_setting('company_name')}")
        
        conn.close()

def demonstrate_design_patterns():
    """데이터베이스 설계 패턴 시연"""
    
    patterns = DatabaseDesignPatterns()
    
    patterns.demonstrate_hierarchy_pattern()
    patterns.demonstrate_history_pattern()
    patterns.demonstrate_tagging_pattern()
    patterns.demonstrate_settings_pattern()

demonstrate_design_patterns()
```

### 5.2 성능 최적화와 모니터링

```python
print("\n=== 성능 최적화와 모니터링 ===")

import time
import psutil
import os

class DatabasePerformanceMonitor:
    """데이터베이스 성능 모니터링"""
    
    def __init__(self, db_path='sample_company.db'):
        self.db_path = db_path
    
    def analyze_query_performance(self, query, params=None, iterations=100):
        """쿼리 성능 분석"""
        
        print(f"28. 쿼리 성능 분석:")
        print(f"  쿼리: {query[:50]}...")
        
        times = []
        
        for i in range(iterations):
            conn = sqlite3.connect(self.db_path)
            start_time = time.time()
            
            cursor = conn.cursor()
            cursor.execute(query, params or [])
            results = cursor.fetchall()
            
            end_time = time.time()
            times.append(end_time - start_time)
            conn.close()
        
        avg_time = sum(times) / len(times)
        min_time = min(times)
        max_time = max(times)
        
        print(f"  반복 횟수: {iterations}")
        print(f"  평균 실행 시간: {avg_time*1000:.2f}ms")
        print(f"  최소 실행 시간: {min_time*1000:.2f}ms")
        print(f"  최대 실행 시간: {max_time*1000:.2f}ms")
        print(f"  결과 행 수: {len(results) if i == 0 else 'N/A'}")
        
        return avg_time
    
    def compare_queries(self, query_pairs):
        """쿼리 성능 비교"""
        
        print(f"\n29. 쿼리 성능 비교:")
        
        for description, queries in query_pairs.items():
            print(f"\n  {description}:")
            
            for name, query in queries.items():
                avg_time = self.analyze_query_performance(query, iterations=50)
                print(f"    {name}: {avg_time*1000:.2f}ms")
    
    def database_size_analysis(self):
        """데이터베이스 크기 분석"""
        
        print(f"\n30. 데이터베이스 크기 분석:")
        
        if os.path.exists(self.db_path):
            file_size = os.path.getsize(self.db_path)
            print(f"  데이터베이스 파일 크기: {file_size:,} bytes ({file_size/1024:.1f} KB)")
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 테이블별 레코드 수
        cursor.execute('''
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ''')
        
        tables = cursor.fetchall()
        
        print(f"  테이블별 레코드 수:")
        total_records = 0
        
        for table_name, in tables:
            cursor.execute(f'SELECT COUNT(*) FROM {table_name}')
            count = cursor.fetchone()[0]
            print(f"    {table_name}: {count:,}개")
            total_records += count
        
        print(f"  총 레코드 수: {total_records:,}개")
        
        # 인덱스 정보
        print(f"\n  인덱스 정보:")
        cursor.execute('''
            SELECT name, tbl_name FROM sqlite_master 
            WHERE type='index' AND name NOT LIKE 'sqlite_%'
        ''')
        
        indexes = cursor.fetchall()
        for index_name, table_name in indexes:
            print(f"    {index_name} (테이블: {table_name})")
        
        conn.close()
    
    def system_resource_monitoring(self):
        """시스템 리소스 모니터링"""
        
        print(f"\n31. 시스템 리소스 모니터링:")
        
        # CPU 사용률
        cpu_percent = psutil.cpu_percent(interval=1)
        print(f"  CPU 사용률: {cpu_percent}%")
        
        # 메모리 사용률
        memory = psutil.virtual_memory()
        print(f"  메모리 사용률: {memory.percent}%")
        print(f"  사용 가능한 메모리: {memory.available / 1024 / 1024:.1f} MB")
        
        # 디스크 사용률
        disk = psutil.disk_usage('/')
        print(f"  디스크 사용률: {disk.percent}%")
        print(f"  사용 가능한 디스크: {disk.free / 1024 / 1024 / 1024:.1f} GB")

def demonstrate_performance_optimization():
    """성능 최적화 시연"""
    
    monitor = DatabasePerformanceMonitor()
    
    # 쿼리 성능 비교
    query_comparisons = {
        '인덱스 유무 비교': {
            '인덱스 없는 검색': 'SELECT * FROM employees WHERE salary > 70000',
            '인덱스 있는 검색': 'SELECT * FROM employees WHERE salary > 70000',  # 이미 인덱스 생성됨
        },
        '조인 vs 서브쿼리': {
            'JOIN 사용': '''
                SELECT e.name, p.name 
                FROM employees e 
                JOIN employee_projects ep ON e.id = ep.employee_id 
                JOIN projects p ON ep.project_id = p.id
            ''',
            '서브쿼리 사용': '''
                SELECT e.name, 
                       (SELECT p.name FROM projects p 
                        JOIN employee_projects ep ON p.id = ep.project_id 
                        WHERE ep.employee_id = e.id LIMIT 1) as project_name
                FROM employees e
            '''
        }
    }
    
    monitor.compare_queries(query_comparisons)
    monitor.database_size_analysis()
    monitor.system_resource_monitoring()

def demonstrate_best_practices():
    """데이터베이스 모범 사례"""
    
    print(f"\n32. 데이터베이스 모범 사례:")
    
    best_practices = {
        '성능 최적화': [
            '적절한 인덱스 생성 (과도한 인덱스는 쓰기 성능 저하)',
            '쿼리 최적화 (불필요한 컬럼 조회 피하기)',
            '페이징 처리 (LIMIT과 OFFSET 활용)',
            '연결 풀링 사용',
            '배치 처리로 대량 작업 수행',
        ],
        '보안': [
            'SQL 인젝션 방지 (매개변수화된 쿼리 사용)',
            '최소 권한 원칙 (필요한 권한만 부여)',
            '데이터 암호화 (민감 정보 보호)',
            '정기적인 백업과 복구 테스트',
            '접근 로그 및 감사 추적',
        ],
        '유지보수성': [
            '명확한 명명 규칙 (테이블, 컬럼명)',
            '외래 키 제약 조건 활용',
            '문서화 (스키마, 관계도)',
            '버전 관리 (마이그레이션 스크립트)',
            '테스트 데이터와 프로덕션 데이터 분리',
        ],
        '확장성': [
            '정규화와 반정규화의 적절한 균형',
            '파티셔닝 고려 (대용량 테이블)',
            '읽기 전용 복제본 활용',
            '캐싱 전략 수립',
            '아키텍처 확장성 고려',
        ]
    }
    
    for category, practices in best_practices.items():
        print(f"\n  {category}:")
        for practice in practices:
            print(f"    • {practice}")

demonstrate_performance_optimization()
demonstrate_best_practices()
```

## 6. 연습 문제

### 연습 1: 도서관 관리 시스템
SQLite3를 사용하여 완전한 도서관 관리 시스템을 구현하세요:
- 도서, 회원, 대출 테이블 설계
- 대출/반납 기능 구현
- 연체료 계산 시스템
- 통계 및 보고서 기능

### 연습 2: ORM 패턴 구현
간단한 ORM 라이브러리를 구현하세요:
- 모델 클래스 기반 테이블 매핑
- CRUD 연산 지원
- 관계 매핑 (1:N, N:M)
- 쿼리 빌더 패턴

### 연습 3: NoSQL 문서 데이터베이스
MongoDB 스타일의 문서 데이터베이스를 구현하세요:
- JSON 문서 저장/조회
- 인덱싱 시스템
- 집계 쿼리 지원
- 백업/복원 기능

### 연습 4: 성능 모니터링 시스템
데이터베이스 성능 모니터링 시스템을 구현하세요:
- 쿼리 실행 시간 측정
- 슬로우 쿼리 로깅
- 리소스 사용량 모니터링
- 성능 보고서 생성

## 정리

이 챕터에서 학습한 내용:

1. **SQLite3 기초**: 데이터베이스 생성, CRUD 연산, 고급 쿼리
2. **트랜잭션 관리**: 트랜잭션 패턴, 에러 처리, 연결 풀링
3. **ORM 기초**: SQLAlchemy 개념, 모델 정의, ORM 패턴
4. **NoSQL 기초**: 문서 데이터베이스, MongoDB 스타일 API
5. **설계 패턴**: 계층 구조, 이력 관리, 태그 시스템, 설정 관리
6. **성능 최적화**: 인덱싱, 쿼리 최적화, 모니터링

다음 챕터에서는 웹 스크래핑과 API 활용에 대해 학습하여 외부 데이터 소스와의 연동 방법을 배우겠습니다.

### 핵심 포인트
- 데이터베이스는 애플리케이션의 핵심 구성 요소입니다
- 적절한 설계와 최적화가 성능에 큰 영향을 미칩니다
- SQL과 NoSQL의 특성을 이해하고 적절히 선택해야 합니다
- 트랜잭션과 일관성 관리가 중요합니다
- 보안과 성능을 균형있게 고려해야 합니다
- ORM은 생산성을 높이지만 성능을 고려해야 합니다
</rewritten_file> 