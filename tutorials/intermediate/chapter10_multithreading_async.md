# Chapter 10: 멀티스레딩과 비동기 처리 기초

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 동시성과 병렬성의 개념과 차이점 이해하기
- 스레딩을 활용한 동시 작업 처리하기
- 멀티프로세싱을 통한 병렬 처리 구현하기
- asyncio를 사용한 비동기 프로그래밍 마스터하기
- 스레드 간 동기화와 데이터 공유 처리하기
- 적절한 동시성 패턴 선택하고 성능 최적화하기
- GIL(Global Interpreter Lock)의 영향 이해하기

## 1. 동시성과 병렬성 기초

### 1.1 개념 이해

```python
print("=== 동시성과 병렬성 기초 ===")

import time
import threading
import multiprocessing
import asyncio
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def demonstrate_concepts():
    """동시성과 병렬성 개념 설명"""
    
    print("1. 동시성 vs 병렬성:")
    print("  동시성(Concurrency): 여러 작업을 번갈아가며 처리 (논리적으로 동시)")
    print("  병렬성(Parallelism): 여러 작업을 실제로 동시에 처리 (물리적으로 동시)")
    print()
    
    print("2. Python에서의 선택 기준:")
    print("  I/O 바운드 작업: 스레딩 또는 비동기")
    print("  CPU 바운드 작업: 멀티프로세싱")
    print("  단일 스레드 비동기: asyncio")

demonstrate_concepts()

# CPU 집약적 작업 예제
def cpu_intensive_task(n, task_id):
    """CPU 집약적 작업 시뮬레이션"""
    start_time = time.time()
    total = 0
    for i in range(n):
        total += i ** 2
    end_time = time.time()
    print(f"  작업 {task_id}: {end_time - start_time:.2f}초, 결과: {total}")
    return total

# I/O 집약적 작업 예제
def io_intensive_task(duration, task_id):
    """I/O 집약적 작업 시뮬레이션"""
    start_time = time.time()
    time.sleep(duration)  # I/O 대기 시뮬레이션
    end_time = time.time()
    print(f"  I/O 작업 {task_id}: {end_time - start_time:.2f}초 완료")
    return f"결과 {task_id}"

def sequential_execution():
    """순차 실행 예제"""
    
    print(f"\n3. 순차 실행:")
    start_time = time.time()
    
    # CPU 작업들
    for i in range(3):
        cpu_intensive_task(1000000, i+1)
    
    end_time = time.time()
    print(f"  총 실행 시간: {end_time - start_time:.2f}초")

sequential_execution()
```

### 1.2 Python의 GIL (Global Interpreter Lock)

```python
print("\n=== Python의 GIL ===")

def demonstrate_gil():
    """GIL의 영향 설명"""
    
    print("4. GIL (Global Interpreter Lock):")
    print("  - 한 번에 하나의 스레드만 Python 바이트코드 실행 가능")
    print("  - CPU 집약적 작업에서는 멀티스레딩 효과 제한적")
    print("  - I/O 작업 중에는 GIL이 해제되어 스레딩 효과적")
    print("  - C 확장 모듈에서는 GIL 해제 가능")
    print()
    
    print("5. 각 방식의 특징:")
    print("  스레딩: 메모리 공유, 컨텍스트 스위칭 빠름, GIL 제약")
    print("  프로세싱: 독립적 메모리, 진정한 병렬성, 오버헤드 큼")
    print("  비동기: 단일 스레드, 이벤트 루프, I/O 최적화")

demonstrate_gil()

# GIL 영향 확인 실험
import threading
import time

def count_up(n):
    """카운팅 작업"""
    for i in range(n):
        pass

def measure_threading_performance():
    """스레딩 성능 측정"""
    
    print(f"\n6. GIL 영향 실험:")
    n = 50000000  # 5천만 번 반복
    
    # 단일 스레드
    start_time = time.time()
    count_up(n)
    single_time = time.time() - start_time
    print(f"  단일 스레드: {single_time:.2f}초")
    
    # 멀티 스레드 (2개)
    start_time = time.time()
    
    thread1 = threading.Thread(target=count_up, args=(n//2,))
    thread2 = threading.Thread(target=count_up, args=(n//2,))
    
    thread1.start()
    thread2.start()
    
    thread1.join()
    thread2.join()
    
    multi_time = time.time() - start_time
    print(f"  멀티 스레드: {multi_time:.2f}초")
    print(f"  성능 비율: {single_time / multi_time:.2f}배")
    
    if multi_time >= single_time:
        print("  → GIL로 인해 멀티스레딩이 더 느림")
    else:
        print("  → 멀티스레딩이 빠름")

# 안전한 환경에서만 실행
try:
    measure_threading_performance()
except:
    print("  (성능 측정은 환경에 따라 제한될 수 있습니다)")
```

## 2. 스레딩 (Threading)

### 2.1 기본 스레딩

```python
print("\n=== 스레딩 기초 ===")

import threading
import time
import queue

def worker_function(name, duration):
    """워커 함수"""
    print(f"  스레드 {name} 시작")
    time.sleep(duration)
    print(f"  스레드 {name} 완료 ({duration}초)")
    return f"결과 {name}"

def basic_threading():
    """기본 스레딩 사용법"""
    
    print("1. 기본 스레드 생성과 실행:")
    
    # 스레드 생성 방법 1: Thread 클래스 직접 사용
    thread1 = threading.Thread(target=worker_function, args=("A", 1))
    thread2 = threading.Thread(target=worker_function, args=("B", 2))
    
    start_time = time.time()
    
    # 스레드 시작
    thread1.start()
    thread2.start()
    
    # 스레드 완료 대기
    thread1.join()
    thread2.join()
    
    end_time = time.time()
    print(f"  총 실행 시간: {end_time - start_time:.2f}초")

basic_threading()

class WorkerThread(threading.Thread):
    """커스텀 스레드 클래스"""
    
    def __init__(self, name, task_queue, result_queue):
        super().__init__()
        self.name = name
        self.task_queue = task_queue
        self.result_queue = result_queue
        self.daemon = True  # 메인 프로그램 종료 시 같이 종료
    
    def run(self):
        """스레드 실행 메서드"""
        while True:
            try:
                task = self.task_queue.get(timeout=1)
                if task is None:  # 종료 신호
                    break
                
                # 작업 처리
                print(f"  {self.name}: 작업 '{task}' 처리 중...")
                time.sleep(0.5)  # 작업 시뮬레이션
                result = f"{task}_완료"
                
                self.result_queue.put(result)
                self.task_queue.task_done()
                
            except queue.Empty:
                break
        
        print(f"  {self.name}: 종료")

def custom_thread_example():
    """커스텀 스레드 클래스 사용"""
    
    print(f"\n2. 커스텀 스레드 클래스:")
    
    # 큐 생성
    task_queue = queue.Queue()
    result_queue = queue.Queue()
    
    # 작업 추가
    tasks = ["작업1", "작업2", "작업3", "작업4", "작업5"]
    for task in tasks:
        task_queue.put(task)
    
    # 워커 스레드 생성
    workers = []
    for i in range(3):
        worker = WorkerThread(f"워커{i+1}", task_queue, result_queue)
        worker.start()
        workers.append(worker)
    
    # 모든 작업 완료 대기
    task_queue.join()
    
    # 워커 종료
    for _ in workers:
        task_queue.put(None)
    
    for worker in workers:
        worker.join()
    
    # 결과 수집
    results = []
    while not result_queue.empty():
        results.append(result_queue.get())
    
    print(f"  결과: {results}")

custom_thread_example()
```

### 2.2 스레드 동기화

```python
print("\n=== 스레드 동기화 ===")

import threading
import time
import random

# 공유 자원
shared_counter = 0
shared_list = []

def unsafe_increment(name, iterations):
    """안전하지 않은 카운터 증가"""
    global shared_counter
    
    for i in range(iterations):
        # 이 부분에서 레이스 컨디션 발생 가능
        temp = shared_counter
        temp += 1
        shared_counter = temp
    
    print(f"  {name}: {iterations}번 증가 완료")

def demonstrate_race_condition():
    """레이스 컨디션 시연"""
    
    print("3. 레이스 컨디션 문제:")
    
    global shared_counter
    shared_counter = 0
    
    # 두 스레드가 동시에 카운터 증가
    thread1 = threading.Thread(target=unsafe_increment, args=("스레드1", 1000))
    thread2 = threading.Thread(target=unsafe_increment, args=("스레드2", 1000))
    
    thread1.start()
    thread2.start()
    
    thread1.join()
    thread2.join()
    
    print(f"  예상 결과: 2000")
    print(f"  실제 결과: {shared_counter}")
    if shared_counter != 2000:
        print("  → 레이스 컨디션 발생!")

demonstrate_race_condition()

# Lock을 사용한 안전한 버전
counter_lock = threading.Lock()
safe_counter = 0

def safe_increment(name, iterations):
    """Lock을 사용한 안전한 카운터 증가"""
    global safe_counter
    
    for i in range(iterations):
        with counter_lock:  # Lock 획득
            temp = safe_counter
            temp += 1
            safe_counter = temp
    
    print(f"  {name}: {iterations}번 안전하게 증가 완료")

def demonstrate_lock():
    """Lock을 사용한 동기화"""
    
    print(f"\n4. Lock을 사용한 동기화:")
    
    global safe_counter
    safe_counter = 0
    
    thread1 = threading.Thread(target=safe_increment, args=("안전스레드1", 1000))
    thread2 = threading.Thread(target=safe_increment, args=("안전스레드2", 1000))
    
    thread1.start()
    thread2.start()
    
    thread1.join()
    thread2.join()
    
    print(f"  예상 결과: 2000")
    print(f"  실제 결과: {safe_counter}")
    print("  → Lock으로 동기화 성공!")

demonstrate_lock()

def demonstrate_other_sync_primitives():
    """다른 동기화 프리미티브들"""
    
    print(f"\n5. 다른 동기화 도구들:")
    
    # RLock (재귀 락)
    rlock = threading.RLock()
    
    def recursive_function(depth):
        with rlock:
            print(f"    재귀 깊이: {depth}")
            if depth > 0:
                recursive_function(depth - 1)
    
    print("  RLock (재귀 락) 예제:")
    thread = threading.Thread(target=recursive_function, args=(3,))
    thread.start()
    thread.join()
    
    # Semaphore (세마포어)
    print(f"\n  Semaphore (세마포어) 예제:")
    semaphore = threading.Semaphore(2)  # 최대 2개 스레드만 동시 접근
    
    def limited_resource(name):
        with semaphore:
            print(f"    {name}: 리소스 사용 중...")
            time.sleep(1)
            print(f"    {name}: 리소스 해제")
    
    # 5개 스레드가 동시에 시작하지만 2개씩만 실행
    threads = []
    for i in range(5):
        t = threading.Thread(target=limited_resource, args=(f"스레드{i+1}",))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()
    
    # Event (이벤트)
    print(f"\n  Event (이벤트) 예제:")
    event = threading.Event()
    
    def waiter(name):
        print(f"    {name}: 이벤트 대기 중...")
        event.wait()
        print(f"    {name}: 이벤트 수신, 작업 시작!")
    
    def setter():
        time.sleep(2)
        print(f"    이벤트 발생!")
        event.set()
    
    # 대기 스레드들
    for i in range(3):
        t = threading.Thread(target=waiter, args=(f"대기자{i+1}",))
        t.start()
    
    # 이벤트 설정 스레드
    threading.Thread(target=setter).start()
    time.sleep(3)  # 결과 확인을 위한 대기

demonstrate_other_sync_primitives()
```

### 2.3 스레드 풀

```python
print("\n=== 스레드 풀 ===")

from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
import time

def download_simulation(url_id):
    """다운로드 시뮬레이션"""
    # 실제로는 requests를 사용하지만 여기서는 시뮬레이션
    download_time = random.uniform(0.5, 2.0)
    time.sleep(download_time)
    
    result = {
        'url_id': url_id,
        'download_time': download_time,
        'size': random.randint(1000, 5000)
    }
    
    print(f"  다운로드 완료: URL {url_id} ({download_time:.2f}초)")
    return result

def thread_pool_example():
    """스레드 풀 사용 예제"""
    
    print("6. ThreadPoolExecutor 사용:")
    
    urls = [f"url_{i}" for i in range(1, 6)]
    
    # 순차 처리
    print(f"  순차 처리:")
    start_time = time.time()
    sequential_results = []
    for url in urls:
        result = download_simulation(url)
        sequential_results.append(result)
    sequential_time = time.time() - start_time
    print(f"    순차 처리 시간: {sequential_time:.2f}초")
    
    # 스레드 풀 처리
    print(f"\n  스레드 풀 처리:")
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        # 방법 1: map 사용
        results = list(executor.map(download_simulation, urls))
    
    pool_time = time.time() - start_time
    print(f"    스레드 풀 처리 시간: {pool_time:.2f}초")
    print(f"    성능 향상: {sequential_time / pool_time:.2f}배")

thread_pool_example()

def advanced_thread_pool():
    """고급 스레드 풀 사용법"""
    
    print(f"\n7. 고급 스레드 풀 패턴:")
    
    def process_task(task_id):
        """작업 처리"""
        processing_time = random.uniform(1, 3)
        time.sleep(processing_time)
        
        # 실패 시뮬레이션
        if random.random() < 0.2:  # 20% 확률로 실패
            raise Exception(f"작업 {task_id} 실패")
        
        return f"작업 {task_id} 성공 ({processing_time:.2f}초)"
    
    tasks = list(range(1, 8))
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        # 방법 2: submit과 as_completed 사용
        future_to_task = {executor.submit(process_task, task): task for task in tasks}
        
        print(f"  실시간 결과 처리:")
        for future in as_completed(future_to_task):
            task = future_to_task[future]
            try:
                result = future.result()
                print(f"    ✓ {result}")
            except Exception as exc:
                print(f"    ✗ 작업 {task}: {exc}")

advanced_thread_pool()
```

## 3. 멀티프로세싱 (Multiprocessing)

### 3.1 기본 프로세싱

```python
print("\n=== 멀티프로세싱 기초 ===")

import multiprocessing
import time
import os

def cpu_bound_task(n, process_id):
    """CPU 집약적 작업"""
    start_time = time.time()
    result = sum(i * i for i in range(n))
    end_time = time.time()
    
    print(f"  프로세스 {process_id} (PID: {os.getpid()}): "
          f"{end_time - start_time:.2f}초, 결과: {result}")
    return result

def basic_multiprocessing():
    """기본 멀티프로세싱"""
    
    print("8. 기본 프로세스 생성:")
    print(f"  메인 프로세스 PID: {os.getpid()}")
    
    # 프로세스 생성
    processes = []
    start_time = time.time()
    
    for i in range(2):
        p = multiprocessing.Process(
            target=cpu_bound_task, 
            args=(2000000, i+1)
        )
        processes.append(p)
        p.start()
    
    # 모든 프로세스 완료 대기
    for p in processes:
        p.join()
    
    end_time = time.time()
    print(f"  총 실행 시간: {end_time - start_time:.2f}초")

# multiprocessing 모듈은 메인 모듈에서만 실행되어야 함
if __name__ == '__main__':
    try:
        basic_multiprocessing()
    except:
        print("  (일부 환경에서는 멀티프로세싱이 제한될 수 있습니다)")

def demonstrate_process_communication():
    """프로세스 간 통신"""
    
    print(f"\n9. 프로세스 간 통신:")
    
    def worker_with_queue(queue, process_id):
        """큐를 사용하는 워커"""
        for i in range(3):
            item = f"프로세스{process_id}_항목{i+1}"
            queue.put(item)
            print(f"  프로세스 {process_id}: {item} 생성")
            time.sleep(0.5)
    
    def consumer(queue):
        """큐에서 소비하는 프로세스"""
        items = []
        while True:
            try:
                item = queue.get(timeout=2)
                items.append(item)
                print(f"  소비자: {item} 수신")
            except:
                break
        return items
    
    try:
        # 큐 생성
        queue = multiprocessing.Queue()
        
        # 생산자 프로세스들
        producers = []
        for i in range(2):
            p = multiprocessing.Process(
                target=worker_with_queue, 
                args=(queue, i+1)
            )
            producers.append(p)
            p.start()
        
        # 생산자 완료 대기
        for p in producers:
            p.join()
        
        # 소비자에서 결과 수집
        results = consumer(queue)
        print(f"  수집된 항목들: {results}")
        
    except:
        print("  (프로세스 간 통신 예제는 환경에 따라 제한될 수 있습니다)")

demonstrate_process_communication()
```

### 3.2 프로세스 풀

```python
print("\n=== 프로세스 풀 ===")

from concurrent.futures import ProcessPoolExecutor
import multiprocessing

def cpu_intensive_calculation(n):
    """CPU 집약적 계산"""
    return sum(i * i for i in range(n))

def process_pool_example():
    """프로세스 풀 사용 예제"""
    
    print("10. ProcessPoolExecutor 사용:")
    
    numbers = [1000000, 1500000, 2000000, 2500000]
    
    # 순차 처리
    print(f"  순차 처리:")
    start_time = time.time()
    sequential_results = [cpu_intensive_calculation(n) for n in numbers]
    sequential_time = time.time() - start_time
    print(f"    순차 처리 시간: {sequential_time:.2f}초")
    
    # 프로세스 풀 처리
    print(f"  프로세스 풀 처리:")
    try:
        start_time = time.time()
        
        with ProcessPoolExecutor(max_workers=2) as executor:
            parallel_results = list(executor.map(cpu_intensive_calculation, numbers))
        
        parallel_time = time.time() - start_time
        print(f"    프로세스 풀 처리 시간: {parallel_time:.2f}초")
        print(f"    성능 향상: {sequential_time / parallel_time:.2f}배")
        
        # 결과 검증
        if sequential_results == parallel_results:
            print(f"    ✓ 결과 일치 확인")
        
    except:
        print("    (프로세스 풀은 일부 환경에서 제한될 수 있습니다)")

process_pool_example()

def shared_memory_example():
    """공유 메모리 사용"""
    
    print(f"\n11. 공유 메모리:")
    
    def increment_shared_value(shared_val, lock, process_id):
        """공유 값 증가"""
        for i in range(5):
            with lock:
                temp = shared_val.value
                temp += 1
                shared_val.value = temp
                print(f"  프로세스 {process_id}: 값을 {shared_val.value}로 증가")
                time.sleep(0.1)
    
    try:
        # 공유 변수와 락 생성
        shared_value = multiprocessing.Value('i', 0)  # 정수형 공유 변수
        lock = multiprocessing.Lock()
        
        # 프로세스들 생성
        processes = []
        for i in range(2):
            p = multiprocessing.Process(
                target=increment_shared_value,
                args=(shared_value, lock, i+1)
            )
            processes.append(p)
            p.start()
        
        # 완료 대기
        for p in processes:
            p.join()
        
        print(f"  최종 값: {shared_value.value}")
        
    except:
        print("  (공유 메모리 예제는 환경에 따라 제한될 수 있습니다)")

shared_memory_example()
```

## 4. 비동기 프로그래밍 (Asyncio)

### 4.1 기본 비동기 개념

```python
print("\n=== 비동기 프로그래밍 기초 ===")

import asyncio
import time
import aiohttp
import random

async def async_task(name, duration):
    """비동기 작업"""
    print(f"  {name} 시작")
    await asyncio.sleep(duration)  # 비동기 대기
    print(f"  {name} 완료 ({duration}초)")
    return f"결과_{name}"

async def basic_async_example():
    """기본 비동기 예제"""
    
    print("12. 기본 비동기 실행:")
    
    # 순차 실행
    start_time = time.time()
    result1 = await async_task("작업1", 1)
    result2 = await async_task("작업2", 2)
    sequential_time = time.time() - start_time
    print(f"    순차 실행 시간: {sequential_time:.2f}초")
    
    # 동시 실행
    print(f"\n  동시 실행:")
    start_time = time.time()
    
    # 방법 1: gather 사용
    results = await asyncio.gather(
        async_task("동시작업1", 1),
        async_task("동시작업2", 2),
        async_task("동시작업3", 1.5)
    )
    
    concurrent_time = time.time() - start_time
    print(f"    동시 실행 시간: {concurrent_time:.2f}초")
    print(f"    성능 향상: {sequential_time / concurrent_time:.2f}배")
    print(f"    결과: {results}")

# 비동기 함수 실행
def run_async_example():
    """비동기 예제 실행"""
    try:
        asyncio.run(basic_async_example())
    except Exception as e:
        print(f"  비동기 실행 오류: {e}")

run_async_example()

async def task_management_example():
    """태스크 관리 예제"""
    
    print(f"\n13. 태스크 관리:")
    
    async def long_running_task(task_id):
        """장시간 실행 작업"""
        try:
            for i in range(5):
                print(f"    작업 {task_id}: 진행 {i+1}/5")
                await asyncio.sleep(0.5)
            return f"작업 {task_id} 완료"
        except asyncio.CancelledError:
            print(f"    작업 {task_id} 취소됨")
            raise
    
    # 태스크 생성
    task1 = asyncio.create_task(long_running_task("A"))
    task2 = asyncio.create_task(long_running_task("B"))
    
    # 일정 시간 후 태스크 취소
    await asyncio.sleep(1.5)
    task2.cancel()
    
    # 결과 수집
    try:
        result1 = await task1
        print(f"  {result1}")
    except:
        print(f"  작업 A 실패")
    
    try:
        result2 = await task2
        print(f"  {result2}")
    except asyncio.CancelledError:
        print(f"  작업 B가 취소되었습니다")

def run_task_management():
    """태스크 관리 예제 실행"""
    try:
        asyncio.run(task_management_example())
    except:
        print("  (태스크 관리 예제는 환경에 따라 제한될 수 있습니다)")

run_task_management()
```

### 4.2 비동기 I/O 패턴

```python
print("\n=== 비동기 I/O 패턴 ===")

async def simulate_api_call(api_id, delay):
    """API 호출 시뮬레이션"""
    print(f"  API {api_id} 호출 시작")
    await asyncio.sleep(delay)  # 네트워크 지연 시뮬레이션
    
    # 실패 시뮬레이션
    if random.random() < 0.2:  # 20% 확률로 실패
        raise Exception(f"API {api_id} 호출 실패")
    
    result = {
        'api_id': api_id,
        'data': f"응답데이터_{api_id}",
        'delay': delay
    }
    print(f"  API {api_id} 호출 완료")
    return result

async def async_io_patterns():
    """비동기 I/O 패턴들"""
    
    print("14. 비동기 I/O 패턴:")
    
    # 패턴 1: as_completed - 완료되는 순서대로 처리
    print(f"  패턴 1: as_completed")
    
    tasks = [
        simulate_api_call(f"API{i}", random.uniform(0.5, 2.0))
        for i in range(1, 5)
    ]
    
    async for completed_task in asyncio.as_completed(tasks):
        try:
            result = await completed_task
            print(f"    완료: {result['api_id']} ({result['delay']:.2f}초)")
        except Exception as e:
            print(f"    오류: {e}")
    
    # 패턴 2: wait - 조건부 대기
    print(f"\n  패턴 2: wait with timeout")
    
    tasks = [
        asyncio.create_task(simulate_api_call(f"API{i}", random.uniform(1, 3)))
        for i in range(5, 8)
    ]
    
    try:
        done, pending = await asyncio.wait(tasks, timeout=2.0)
        
        print(f"    완료된 작업: {len(done)}개")
        for task in done:
            try:
                result = await task
                print(f"      완료: {result['api_id']}")
            except Exception as e:
                print(f"      오류: {e}")
        
        print(f"    미완료 작업: {len(pending)}개")
        for task in pending:
            task.cancel()
            print(f"      취소됨")
        
    except asyncio.TimeoutError:
        print(f"    타임아웃 발생")

def run_async_io_patterns():
    """비동기 I/O 패턴 실행"""
    try:
        asyncio.run(async_io_patterns())
    except:
        print("  (비동기 I/O 패턴은 환경에 따라 제한될 수 있습니다)")

run_async_io_patterns()

async def producer_consumer_pattern():
    """비동기 생산자-소비자 패턴"""
    
    print(f"\n15. 비동기 생산자-소비자 패턴:")
    
    async def producer(queue, producer_id):
        """비동기 생산자"""
        for i in range(3):
            item = f"생산자{producer_id}_항목{i+1}"
            await queue.put(item)
            print(f"  생산: {item}")
            await asyncio.sleep(0.5)
        
        await queue.put(None)  # 종료 신호
        print(f"  생산자 {producer_id} 완료")
    
    async def consumer(queue, consumer_id):
        """비동기 소비자"""
        consumed_items = []
        while True:
            item = await queue.get()
            if item is None:
                queue.task_done()
                break
            
            consumed_items.append(item)
            print(f"  소비 {consumer_id}: {item}")
            await asyncio.sleep(0.3)
            queue.task_done()
        
        print(f"  소비자 {consumer_id} 완료: {len(consumed_items)}개 처리")
        return consumed_items
    
    # 큐 생성
    queue = asyncio.Queue(maxsize=5)
    
    # 생산자와 소비자 실행
    await asyncio.gather(
        producer(queue, 1),
        consumer(queue, 1),
        producer(queue, 2),
        consumer(queue, 2)
    )

def run_producer_consumer():
    """생산자-소비자 패턴 실행"""
    try:
        asyncio.run(producer_consumer_pattern())
    except:
        print("  (생산자-소비자 패턴은 환경에 따라 제한될 수 있습니다)")

run_producer_consumer()
```

### 4.3 비동기 컨텍스트 매니저

```python
print("\n=== 비동기 컨텍스트 매니저 ===")

class AsyncResource:
    """비동기 리소스 매니저"""
    
    def __init__(self, name):
        self.name = name
        self.is_open = False
    
    async def __aenter__(self):
        """비동기 진입"""
        print(f"  {self.name} 리소스 열기 시작...")
        await asyncio.sleep(0.5)  # 리소스 열기 시뮬레이션
        self.is_open = True
        print(f"  {self.name} 리소스 준비 완료")
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """비동기 종료"""
        print(f"  {self.name} 리소스 정리 시작...")
        await asyncio.sleep(0.3)  # 정리 작업 시뮬레이션
        self.is_open = False
        print(f"  {self.name} 리소스 정리 완료")
        
        if exc_type:
            print(f"  예외 발생: {exc_type.__name__}: {exc_val}")
            return False  # 예외를 다시 발생시킴
    
    async def do_work(self):
        """작업 수행"""
        if not self.is_open:
            raise RuntimeError("리소스가 열려있지 않습니다")
        
        print(f"  {self.name}에서 작업 수행 중...")
        await asyncio.sleep(1)
        print(f"  {self.name} 작업 완료")
        return f"{self.name} 결과"

async def async_context_manager_example():
    """비동기 컨텍스트 매니저 사용"""
    
    print("16. 비동기 컨텍스트 매니저:")
    
    # 정상적인 사용
    async with AsyncResource("데이터베이스") as db:
        result = await db.do_work()
        print(f"  작업 결과: {result}")
    
    print()
    
    # 예외 발생 시
    try:
        async with AsyncResource("네트워크") as network:
            await network.do_work()
            raise ValueError("의도적 예외")
    except ValueError as e:
        print(f"  예외 처리됨: {e}")

def run_async_context_manager():
    """비동기 컨텍스트 매니저 실행"""
    try:
        asyncio.run(async_context_manager_example())
    except:
        print("  (비동기 컨텍스트 매니저는 환경에 따라 제한될 수 있습니다)")

run_async_context_manager()
```

## 5. 성능 비교와 선택 기준

### 5.1 시나리오별 성능 비교

```python
print("\n=== 성능 비교와 선택 기준 ===")

import time
import threading
import multiprocessing
import asyncio
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def io_bound_sync(task_id, duration):
    """I/O 바운드 동기 작업"""
    time.sleep(duration)
    return f"IO작업{task_id}_완료"

async def io_bound_async(task_id, duration):
    """I/O 바운드 비동기 작업"""
    await asyncio.sleep(duration)
    return f"비동기IO작업{task_id}_완료"

def cpu_bound_sync(n):
    """CPU 바운드 동기 작업"""
    return sum(i * i for i in range(n))

def performance_comparison():
    """성능 비교"""
    
    print("17. I/O 바운드 작업 성능 비교:")
    
    tasks = [(i, 0.5) for i in range(1, 6)]  # 5개 작업, 각각 0.5초
    
    # 1. 순차 실행
    start_time = time.time()
    sequential_results = [io_bound_sync(task_id, duration) for task_id, duration in tasks]
    sequential_time = time.time() - start_time
    print(f"  순차 실행: {sequential_time:.2f}초")
    
    # 2. 스레드 풀
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=3) as executor:
        thread_results = list(executor.map(lambda x: io_bound_sync(*x), tasks))
    thread_time = time.time() - start_time
    print(f"  스레드 풀: {thread_time:.2f}초 (향상: {sequential_time/thread_time:.2f}배)")
    
    # 3. 비동기 실행
    async def async_test():
        start_time = time.time()
        async_results = await asyncio.gather(
            *[io_bound_async(task_id, duration) for task_id, duration in tasks]
        )
        return time.time() - start_time, async_results
    
    try:
        async_time, async_results = asyncio.run(async_test())
        print(f"  비동기 실행: {async_time:.2f}초 (향상: {sequential_time/async_time:.2f}배)")
    except:
        print(f"  비동기 실행: (환경 제한)")

performance_comparison()

def cpu_bound_comparison():
    """CPU 바운드 작업 비교"""
    
    print(f"\n18. CPU 바운드 작업 성능 비교:")
    
    tasks = [2000000] * 4  # 4개의 동일한 CPU 작업
    
    # 1. 순차 실행
    start_time = time.time()
    sequential_results = [cpu_bound_sync(n) for n in tasks]
    sequential_time = time.time() - start_time
    print(f"  순차 실행: {sequential_time:.2f}초")
    
    # 2. 스레드 풀 (GIL로 인해 효과 제한적)
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=4) as executor:
        thread_results = list(executor.map(cpu_bound_sync, tasks))
    thread_time = time.time() - start_time
    print(f"  스레드 풀: {thread_time:.2f}초 (비율: {thread_time/sequential_time:.2f})")
    
    # 3. 프로세스 풀
    try:
        start_time = time.time()
        with ProcessPoolExecutor(max_workers=2) as executor:
            process_results = list(executor.map(cpu_bound_sync, tasks))
        process_time = time.time() - start_time
        print(f"  프로세스 풀: {process_time:.2f}초 (향상: {sequential_time/process_time:.2f}배)")
    except:
        print(f"  프로세스 풀: (환경 제한)")

cpu_bound_comparison()

def selection_guidelines():
    """선택 가이드라인"""
    
    print(f"\n19. 동시성 패턴 선택 가이드라인:")
    
    guidelines = {
        "I/O 바운드 + 간단한 로직": {
            "추천": "스레딩 또는 비동기",
            "이유": "I/O 대기 시간 동안 다른 작업 수행 가능",
            "예시": "파일 읽기/쓰기, 네트워크 요청, 데이터베이스 쿼리"
        },
        "I/O 바운드 + 복잡한 로직": {
            "추천": "비동기 (asyncio)",
            "이유": "세밀한 제어 가능, 메모리 효율적",
            "예시": "웹 스크래핑, API 서버, 실시간 데이터 처리"
        },
        "CPU 바운드": {
            "추천": "멀티프로세싱",
            "이유": "GIL 우회하여 진정한 병렬 처리",
            "예시": "수학 계산, 이미지/비디오 처리, 암호화"
        },
        "혼합 작업": {
            "추천": "상황에 따라 조합",
            "이유": "각 작업 유형에 최적화된 방식 사용",
            "예시": "데이터 수집(비동기) + 분석(프로세싱)"
        }
    }
    
    for scenario, info in guidelines.items():
        print(f"  {scenario}:")
        print(f"    추천: {info['추천']}")
        print(f"    이유: {info['이유']}")
        print(f"    예시: {info['예시']}")
        print()

selection_guidelines()

def resource_usage_comparison():
    """리소스 사용량 비교"""
    
    print(f"20. 리소스 사용량 특성:")
    
    characteristics = {
        "스레딩": {
            "메모리": "공유 (적음)",
            "생성 비용": "중간",
            "컨텍스트 스위칭": "빠름",
            "확장성": "제한적 (수백 개)",
            "디버깅": "어려움 (레이스 컨디션)"
        },
        "프로세싱": {
            "메모리": "독립적 (많음)",
            "생성 비용": "높음",
            "컨텍스트 스위칭": "느림",
            "확장성": "CPU 코어 수에 의존",
            "디버깅": "상대적으로 쉬움"
        },
        "비동기": {
            "메모리": "단일 스레드 (적음)",
            "생성 비용": "낮음",
            "컨텍스트 스위칭": "없음 (협력적)",
            "확장성": "매우 높음 (수만 개)",
            "디버깅": "중간 (콜백 지옥 주의)"
        }
    }
    
    for method, chars in characteristics.items():
        print(f"  {method}:")
        for aspect, value in chars.items():
            print(f"    {aspect}: {value}")
        print()

resource_usage_comparison()
```

## 6. 실용적인 활용 예제

### 6.1 웹 스크래핑 시스템

```python
print("\n=== 실용적인 활용 예제 ===")

import asyncio
import time
import random
from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class ScrapingResult:
    """스크래핑 결과"""
    url: str
    status: str
    data: Dict[str, Any]
    processing_time: float

def simulate_web_request(url: str) -> ScrapingResult:
    """웹 요청 시뮬레이션"""
    start_time = time.time()
    
    # 네트워크 지연 시뮬레이션
    delay = random.uniform(0.5, 2.0)
    time.sleep(delay)
    
    # 성공/실패 시뮬레이션
    if random.random() < 0.1:  # 10% 실패율
        status = "failed"
        data = {"error": "Connection timeout"}
    else:
        status = "success"
        data = {
            "title": f"Title for {url}",
            "content_length": random.randint(1000, 5000),
            "links": random.randint(10, 50)
        }
    
    processing_time = time.time() - start_time
    return ScrapingResult(url, status, data, processing_time)

async def simulate_async_web_request(url: str) -> ScrapingResult:
    """비동기 웹 요청 시뮬레이션"""
    start_time = time.time()
    
    # 비동기 네트워크 지연
    delay = random.uniform(0.5, 2.0)
    await asyncio.sleep(delay)
    
    if random.random() < 0.1:
        status = "failed"
        data = {"error": "Connection timeout"}
    else:
        status = "success"
        data = {
            "title": f"Async Title for {url}",
            "content_length": random.randint(1000, 5000),
            "links": random.randint(10, 50)
        }
    
    processing_time = time.time() - start_time
    return ScrapingResult(url, status, data, processing_time)

def web_scraping_comparison():
    """웹 스크래핑 방식 비교"""
    
    print("21. 웹 스크래핑 시스템 비교:")
    
    urls = [f"https://example{i}.com" for i in range(1, 11)]
    
    # 1. 순차 스크래핑
    print(f"  순차 스크래핑:")
    start_time = time.time()
    sequential_results = []
    for url in urls:
        result = simulate_web_request(url)
        sequential_results.append(result)
    sequential_time = time.time() - start_time
    
    success_count = sum(1 for r in sequential_results if r.status == "success")
    print(f"    시간: {sequential_time:.2f}초")
    print(f"    성공: {success_count}/{len(urls)}")
    
    # 2. 스레드 풀 스크래핑
    print(f"\n  스레드 풀 스크래핑:")
    start_time = time.time()
    with ThreadPoolExecutor(max_workers=5) as executor:
        thread_results = list(executor.map(simulate_web_request, urls))
    thread_time = time.time() - start_time
    
    success_count = sum(1 for r in thread_results if r.status == "success")
    print(f"    시간: {thread_time:.2f}초 (향상: {sequential_time/thread_time:.2f}배)")
    print(f"    성공: {success_count}/{len(urls)}")
    
    # 3. 비동기 스크래핑
    async def async_scraping():
        start_time = time.time()
        async_results = await asyncio.gather(
            *[simulate_async_web_request(url) for url in urls],
            return_exceptions=True
        )
        return time.time() - start_time, async_results
    
    try:
        async_time, async_results = asyncio.run(async_scraping())
        success_count = sum(1 for r in async_results if isinstance(r, ScrapingResult) and r.status == "success")
        print(f"\n  비동기 스크래핑:")
        print(f"    시간: {async_time:.2f}초 (향상: {sequential_time/async_time:.2f}배)")
        print(f"    성공: {success_count}/{len(urls)}")
    except:
        print(f"\n  비동기 스크래핑: (환경 제한)")

web_scraping_comparison()
```

### 6.2 데이터 처리 파이프라인

```python
print("\n=== 데이터 처리 파이프라인 ===")

import queue
import threading
import time
from typing import Generator, List

class DataProcessor:
    """데이터 처리 파이프라인"""
    
    def __init__(self, num_workers: int = 3):
        self.num_workers = num_workers
        self.input_queue = queue.Queue()
        self.output_queue = queue.Queue()
        self.workers = []
        self.running = False
    
    def worker(self, worker_id: int):
        """워커 스레드"""
        while self.running:
            try:
                data = self.input_queue.get(timeout=1)
                if data is None:  # 종료 신호
                    break
                
                # 데이터 처리 시뮬레이션
                processed_data = self.process_data(data, worker_id)
                self.output_queue.put(processed_data)
                self.input_queue.task_done()
                
            except queue.Empty:
                continue
            except Exception as e:
                print(f"    워커 {worker_id} 오류: {e}")
    
    def process_data(self, data: Dict[str, Any], worker_id: int) -> Dict[str, Any]:
        """데이터 처리 로직"""
        # 처리 시간 시뮬레이션
        processing_time = random.uniform(0.1, 0.5)
        time.sleep(processing_time)
        
        return {
            'original': data,
            'processed_by': f'worker_{worker_id}',
            'processing_time': processing_time,
            'processed_at': time.time(),
            'value': data.get('value', 0) * 2  # 간단한 변환
        }
    
    def start(self):
        """파이프라인 시작"""
        self.running = True
        for i in range(self.num_workers):
            worker = threading.Thread(target=self.worker, args=(i+1,))
            worker.start()
            self.workers.append(worker)
        print(f"    파이프라인 시작: {self.num_workers}개 워커")
    
    def stop(self):
        """파이프라인 정지"""
        self.running = False
        
        # 종료 신호 전송
        for _ in self.workers:
            self.input_queue.put(None)
        
        # 워커 종료 대기
        for worker in self.workers:
            worker.join()
        
        print(f"    파이프라인 정지")
    
    def add_data(self, data: Dict[str, Any]):
        """데이터 추가"""
        self.input_queue.put(data)
    
    def get_results(self) -> List[Dict[str, Any]]:
        """결과 수집"""
        results = []
        while not self.output_queue.empty():
            results.append(self.output_queue.get())
        return results

def data_pipeline_example():
    """데이터 처리 파이프라인 예제"""
    
    print("22. 데이터 처리 파이프라인:")
    
    # 파이프라인 생성 및 시작
    processor = DataProcessor(num_workers=3)
    processor.start()
    
    # 테스트 데이터 생성
    test_data = [
        {'id': i, 'value': random.randint(1, 100)}
        for i in range(1, 16)
    ]
    
    print(f"    {len(test_data)}개 데이터 처리 시작")
    start_time = time.time()
    
    # 데이터 추가
    for data in test_data:
        processor.add_data(data)
    
    # 모든 작업 완료 대기
    processor.input_queue.join()
    
    # 결과 수집
    results = processor.get_results()
    processing_time = time.time() - start_time
    
    print(f"    처리 완료: {len(results)}개 결과")
    print(f"    처리 시간: {processing_time:.2f}초")
    print(f"    평균 처리 시간: {processing_time/len(results):.3f}초/건")
    
    # 파이프라인 정지
    processor.stop()
    
    # 결과 분석
    if results:
        worker_stats = {}
        for result in results:
            worker = result['processed_by']
            worker_stats[worker] = worker_stats.get(worker, 0) + 1
        
        print(f"    워커별 처리량: {worker_stats}")

data_pipeline_example()
```

### 6.3 실시간 모니터링 시스템

```python
print("\n=== 실시간 모니터링 시스템 ===")

import asyncio
import time
import random
from collections import deque
from dataclasses import dataclass
from typing import Deque, Dict, List

@dataclass
class MetricData:
    """메트릭 데이터"""
    timestamp: float
    metric_name: str
    value: float
    source: str

class MonitoringSystem:
    """실시간 모니터링 시스템"""
    
    def __init__(self):
        self.metrics_buffer: Deque[MetricData] = deque(maxsize=1000)
        self.alerts: List[str] = []
        self.running = False
        self.stats = {
            'total_metrics': 0,
            'alerts_triggered': 0,
            'sources': set()
        }
    
    async def metric_collector(self, source: str, interval: float):
        """메트릭 수집기"""
        while self.running:
            # 시뮬레이션된 메트릭 수집
            metrics = [
                MetricData(
                    timestamp=time.time(),
                    metric_name=metric_type,
                    value=self.generate_metric_value(metric_type),
                    source=source
                )
                for metric_type in ['cpu_usage', 'memory_usage', 'disk_io']
            ]
            
            for metric in metrics:
                self.metrics_buffer.append(metric)
                self.stats['total_metrics'] += 1
                self.stats['sources'].add(source)
            
            await asyncio.sleep(interval)
    
    def generate_metric_value(self, metric_type: str) -> float:
        """메트릭 값 생성"""
        base_values = {
            'cpu_usage': 30.0,
            'memory_usage': 50.0,
            'disk_io': 20.0
        }
        
        base = base_values.get(metric_type, 50.0)
        # 정상 범위에서 변동
        return max(0, base + random.uniform(-20, 20))
    
    async def alert_processor(self):
        """알림 처리기"""
        alert_thresholds = {
            'cpu_usage': 80.0,
            'memory_usage': 85.0,
            'disk_io': 70.0
        }
        
        while self.running:
            # 최근 메트릭 확인
            recent_metrics = list(self.metrics_buffer)[-10:]  # 최근 10개
            
            for metric in recent_metrics:
                threshold = alert_thresholds.get(metric.metric_name)
                if threshold and metric.value > threshold:
                    alert_msg = (f"ALERT: {metric.source}의 {metric.metric_name} "
                               f"{metric.value:.1f}% (임계값: {threshold}%)")
                    self.alerts.append(alert_msg)
                    self.stats['alerts_triggered'] += 1
                    print(f"    🚨 {alert_msg}")
            
            await asyncio.sleep(2.0)  # 2초마다 확인
    
    async def stats_reporter(self):
        """통계 리포터"""
        while self.running:
            await asyncio.sleep(5.0)  # 5초마다 리포트
            
            print(f"    📊 통계 리포트:")
            print(f"      총 메트릭: {self.stats['total_metrics']}")
            print(f"      알림 발생: {self.stats['alerts_triggered']}")
            print(f"      모니터링 소스: {len(self.stats['sources'])}개")
            
            if self.metrics_buffer:
                recent = list(self.metrics_buffer)[-5:]
                print(f"      최근 메트릭 (5개):")
                for metric in recent:
                    print(f"        {metric.source}.{metric.metric_name}: {metric.value:.1f}")
    
    async def run_monitoring(self, duration: float = 10.0):
        """모니터링 시스템 실행"""
        self.running = True
        
        print(f"    모니터링 시스템 시작 ({duration}초 동안)")
        
        # 다중 소스에서 메트릭 수집
        collectors = [
            self.metric_collector("server1", 1.0),
            self.metric_collector("server2", 1.5),
            self.metric_collector("database", 2.0),
        ]
        
        # 모든 컴포넌트 동시 실행
        await asyncio.wait_for(
            asyncio.gather(
                *collectors,
                self.alert_processor(),
                self.stats_reporter()
            ),
            timeout=duration
        )

async def monitoring_system_example():
    """모니터링 시스템 예제"""
    
    print("23. 실시간 모니터링 시스템:")
    
    system = MonitoringSystem()
    
    try:
        await system.run_monitoring(duration=8.0)
    except asyncio.TimeoutError:
        system.running = False
        print(f"    모니터링 시스템 종료")
        
        # 최종 통계
        print(f"\n    최종 통계:")
        print(f"      수집된 메트릭: {system.stats['total_metrics']}개")
        print(f"      발생한 알림: {system.stats['alerts_triggered']}개")
        print(f"      모니터링 소스: {list(system.stats['sources'])}")

def run_monitoring_example():
    """모니터링 시스템 실행"""
    try:
        asyncio.run(monitoring_system_example())
    except:
        print("    (모니터링 시스템은 환경에 따라 제한될 수 있습니다)")

run_monitoring_example()
```

## 7. 연습 문제

### 연습 1: 다운로드 매니저
멀티스레딩을 활용한 파일 다운로드 매니저를 구현하세요. 진행률 표시, 재시도 로직, 동시 다운로드 수 제한 기능을 포함해야 합니다.

### 연습 2: 데이터 분석 파이프라인
멀티프로세싱을 활용한 대용량 데이터 분석 파이프라인을 구현하세요. 데이터 분할, 병렬 처리, 결과 병합 기능을 포함해야 합니다.

### 연습 3: 웹 API 클라이언트
asyncio를 활용한 비동기 웹 API 클라이언트를 구현하세요. 레이트 리미팅, 재시도, 배치 처리 기능을 포함해야 합니다.

### 연습 4: 실시간 채팅 서버
비동기 프로그래밍을 활용한 간단한 채팅 서버를 구현하세요. 다중 클라이언트 지원, 메시지 브로드캐스팅, 연결 관리 기능을 포함해야 합니다.

## 정리

이 챕터에서 학습한 내용:

1. **동시성과 병렬성**: 개념의 차이와 Python에서의 구현 방법
2. **스레딩**: 기본 사용법, 동기화, 스레드 풀 활용
3. **멀티프로세싱**: 프로세스 생성, 통신, 프로세스 풀 사용
4. **비동기 프로그래밍**: asyncio를 활용한 효율적인 I/O 처리
5. **GIL의 영향**: Python의 특성과 적절한 패턴 선택
6. **성능 최적화**: 작업 유형에 따른 최적 방식 선택
7. **실무 활용**: 웹 스크래핑, 데이터 처리, 모니터링 시스템

다음 챕터에서는 테스팅과 디버깅에 대해 학습하여 안정적이고 신뢰할 수 있는 코드 작성 방법을 배우겠습니다.

### 핵심 포인트
- I/O 바운드 작업에는 스레딩이나 비동기가 효과적입니다
- CPU 바운드 작업에는 멀티프로세싱을 사용해야 합니다
- GIL로 인해 Python에서 멀티스레딩은 CPU 작업에 제한적입니다
- 비동기 프로그래밍은 높은 동시성을 효율적으로 처리할 수 있습니다
- 적절한 동기화 메커니즘을 사용하여 레이스 컨디션을 방지해야 합니다
- 성능 측정을 통해 최적의 동시성 패턴을 선택해야 합니다
- 실무에서는 작업의 특성을 분석하여 적절한 방식을 조합해야 합니다