# Chapter 4: 동시성과 병렬성 심화

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- 고급 스레딩 패턴과 동기화 프리미티브를 설계하고 구현하기
- AsyncIO의 고급 기능과 성능 최적화 기법 마스터하기
- 멀티프로세싱 고급 기법, 분산 작업 처리, 성능 최적화, 동시성 디자인 패턴 등을 실무 중심으로 다룹니다.

## 1. 고급 스레딩 패턴과 동기화

### 1.1 고급 동기화 프리미티브

```python
print("=== 고급 동기화 프리미티브 ===")

import threading
import time
import queue
import weakref
from contextlib import contextmanager
from collections import defaultdict, deque
from dataclasses import dataclass
from typing import Any, Callable, Optional, List, Dict
import uuid

class ReadWriteLock:
    """읽기-쓰기 락 구현"""
    
    def __init__(self):
        self._read_ready = threading.Condition(threading.RLock())
        self._readers = 0
        self._writers = 0
        self._write_ready = threading.Condition(threading.RLock())
        
    def acquire_read(self):
        """읽기 락 획득"""
        with self._read_ready:
            while self._writers > 0:
                self._read_ready.wait()
            self._readers += 1
            print(f"   읽기 락 획득: {threading.current_thread().name} (읽기 중: {self._readers})")
    
    def release_read(self):
        """읽기 락 해제"""
        with self._read_ready:
            self._readers -= 1
            print(f"   읽기 락 해제: {threading.current_thread().name} (읽기 중: {self._readers})")
            if self._readers == 0:
                self._read_ready.notify_all()
    
    def acquire_write(self):
        """쓰기 락 획득"""
        with self._write_ready:
            while self._writers > 0 or self._readers > 0:
                self._write_ready.wait()
            self._writers += 1
            print(f"   쓰기 락 획득: {threading.current_thread().name}")
    
    def release_write(self):
        """쓰기 락 해제"""
        with self._write_ready:
            self._writers -= 1
            print(f"   쓰기 락 해제: {threading.current_thread().name}")
            with self._read_ready:
                self._read_ready.notify_all()
            self._write_ready.notify_all()
    
    @contextmanager
    def read_lock(self):
        """읽기 락 컨텍스트 매니저"""
        self.acquire_read()
        try:
            yield
        finally:
            self.release_read()
    
    @contextmanager
    def write_lock(self):
        """쓰기 락 컨텍스트 매니저"""
        self.acquire_write()
        try:
            yield
        finally:
            self.release_write()

class Barrier:
    """스레드 동기화 장벽"""
    
    def __init__(self, parties, action=None, timeout=None):
        self.parties = parties
        self.action = action
        self.timeout = timeout
        self._condition = threading.Condition()
        self._count = 0
        self._generation = 0
        self._broken = False
    
    def wait(self, timeout=None):
        """장벽에서 대기"""
        timeout = timeout or self.timeout
        
        with self._condition:
            if self._broken:
                raise BrokenBarrierError("Barrier is broken")
            
            generation = self._generation
            self._count += 1
            
            try:
                if self._count == self.parties:
                    # 마지막 스레드 - 장벽 해제
                    print(f"   장벽 해제: 모든 {self.parties}개 스레드 도착")
                    if self.action:
                        try:
                            self.action()
                        except Exception as e:
                            self._break_barrier()
                            raise
                    
                    self._next_generation()
                    return self.parties - 1
                else:
                    # 다른 스레드들 대기
                    print(f"   장벽 대기: {threading.current_thread().name} ({self._count}/{self.parties})")
                    
                    while (self._count < self.parties and 
                           generation == self._generation and 
                           not self._broken):
                        
                        if not self._condition.wait(timeout):
                            self._break_barrier()
                            raise TimeoutError("Barrier timeout")
                    
                    if self._broken:
                        raise BrokenBarrierError("Barrier broken during wait")
                    
                    return self.parties - self._count
            
            except Exception:
                self._break_barrier()
                raise
    
    def _next_generation(self):
        """다음 세대로 진행"""
        self._count = 0
        self._generation += 1
        self._condition.notify_all()
    
    def _break_barrier(self):
        """장벽 파괴"""
        self._broken = True
        self._condition.notify_all()
    
    def reset(self):
        """장벽 리셋"""
        with self._condition:
            if self._count > 0:
                self._break_barrier()
            self._broken = False
            self._next_generation()

class BrokenBarrierError(Exception):
    """장벽 파괴 예외"""
    pass

class CountDownLatch:
    """카운트다운 래치"""
    
    def __init__(self, count):
        self._count = count
        self._condition = threading.Condition()
    
    def count_down(self):
        """카운트 감소"""
        with self._condition:
            if self._count > 0:
                self._count -= 1
                print(f"   카운트다운: {self._count} 남음")
                if self._count == 0:
                    self._condition.notify_all()
    
    def wait(self, timeout=None):
        """카운트가 0이 될 때까지 대기"""
        with self._condition:
            while self._count > 0:
                if not self._condition.wait(timeout):
                    return False
            return True
    
    @property
    def count(self):
        """현재 카운트 반환"""
        return self._count

def demonstrate_advanced_synchronization():
    """고급 동기화 프리미티브 시연"""
    print("\n1. 읽기-쓰기 락:")
    
    rw_lock = ReadWriteLock()
    shared_data = {"value": 0}
    
    def reader(name, duration=0.1):
        """읽기 작업"""
        with rw_lock.read_lock():
            value = shared_data["value"]
            time.sleep(duration)  # 읽기 작업 시뮬레이션
            print(f"     {name} 읽기 완료: {value}")
    
    def writer(name, new_value, duration=0.1):
        """쓰기 작업"""
        with rw_lock.write_lock():
            old_value = shared_data["value"]
            time.sleep(duration)  # 쓰기 작업 시뮬레이션
            shared_data["value"] = new_value
            print(f"     {name} 쓰기 완료: {old_value} -> {new_value}")
    
    # 동시 읽기/쓰기 테스트
    threads = []
    
    for i in range(3):
        t = threading.Thread(target=reader, args=(f"Reader-{i+1}",), name=f"Reader-{i+1}")
        threads.append(t)
    
    t = threading.Thread(target=writer, args=("Writer-1", 42), name="Writer-1")
    threads.append(t)
    
    for i in range(2):
        t = threading.Thread(target=reader, args=(f"Reader-{i+4}",), name=f"Reader-{i+4}")
        threads.append(t)
    
    for t in threads:
        t.start()
    
    for t in threads:
        t.join()
    
    print("\n2. 스레드 동기화 장벽:")
    
    def barrier_action():
        print("     모든 스레드가 장벽에 도달했습니다!")
    
    barrier = Barrier(3, action=barrier_action)
    
    def worker_with_barrier(name, work_time):
        """장벽을 사용하는 워커"""
        print(f"     {name} 작업 시작")
        time.sleep(work_time)  # 작업 시뮬레이션
        print(f"     {name} 장벽 도달")
        
        try:
            index = barrier.wait(timeout=2.0)
            print(f"     {name} 장벽 통과 (순서: {index})")
        except (BrokenBarrierError, TimeoutError) as e:
            print(f"     {name} 장벽 오류: {e}")
    
    barrier_threads = []
    work_times = [0.1, 0.2, 0.15]  # 서로 다른 작업 시간
    
    for i, work_time in enumerate(work_times):
        t = threading.Thread(
            target=worker_with_barrier, 
            args=(f"Worker-{i+1}", work_time),
            name=f"Worker-{i+1}"
        )
        barrier_threads.append(t)
        t.start()
    
    for t in barrier_threads:
        t.join()
    
    print("\n3. 카운트다운 래치:")
    
    latch = CountDownLatch(3)
    
    def countdown_worker(name, work_time):
        """카운트다운 래치를 사용하는 워커"""
        print(f"     {name} 초기화 작업 시작")
        time.sleep(work_time)
        print(f"     {name} 초기화 완료")
        latch.count_down()
    
    def main_worker():
        """메인 워커 - 다른 워커들의 완료를 대기"""
        print("     메인 워커: 초기화 완료 대기 중...")
        if latch.wait(timeout=2.0):
            print("     메인 워커: 모든 초기화 완료, 메인 작업 시작")
        else:
            print("     메인 워커: 타임아웃!")
    
    # 카운트다운 래치 테스트
    countdown_threads = []
    
    # 메인 워커 시작
    main_thread = threading.Thread(target=main_worker, name="MainWorker")
    main_thread.start()
    
    # 초기화 워커들 시작
    for i in range(3):
        t = threading.Thread(
            target=countdown_worker, 
            args=(f"InitWorker-{i+1}", 0.1 * (i + 1)),
            name=f"InitWorker-{i+1}"
        )
        countdown_threads.append(t)
        t.start()
    
    main_thread.join()
    for t in countdown_threads:
        t.join()

demonstrate_advanced_synchronization()
```

### 1.2 스레드 풀 고급 패턴

```python
print("\n=== 스레드 풀 고급 패턴 ===")

import concurrent.futures
from concurrent.futures import ThreadPoolExecutor, as_completed
import functools
import heapq
from enum import Enum

class TaskPriority(Enum):
    """작업 우선순위"""
    LOW = 3
    NORMAL = 2
    HIGH = 1
    CRITICAL = 0

@dataclass
class PriorityTask:
    """우선순위 작업"""
    priority: TaskPriority
    task_id: str
    func: Callable
    args: tuple = ()
    kwargs: dict = None
    created_at: float = None
    
    def __post_init__(self):
        if self.kwargs is None:
            self.kwargs = {}
        if self.created_at is None:
            self.created_at = time.time()
    
    def __lt__(self, other):
        """우선순위 비교"""
        if self.priority.value != other.priority.value:
            return self.priority.value < other.priority.value
        return self.created_at < other.created_at
    
    def execute(self):
        """작업 실행"""
        return self.func(*self.args, **self.kwargs)

class PriorityThreadPool:
    """우선순위 기반 스레드 풀"""
    
    def __init__(self, max_workers=4, name_prefix="PriorityWorker"):
        self.max_workers = max_workers
        self.name_prefix = name_prefix
        self._task_queue = queue.PriorityQueue()
        self._shutdown = False
        self._workers = []
        self._results = {}
        self._lock = threading.Lock()
        self._active_tasks = set()
        
        # 워커 스레드 시작
        for i in range(max_workers):
            worker = threading.Thread(
                target=self._worker,
                name=f"{name_prefix}-{i+1}"
            )
            worker.daemon = True
            worker.start()
            self._workers.append(worker)
    
    def _worker(self):
        """워커 스레드 메인 루프"""
        while not self._shutdown:
            try:
                # 우선순위 작업 가져오기
                priority_task = self._task_queue.get(timeout=1.0)
                
                with self._lock:
                    self._active_tasks.add(priority_task.task_id)
                
                print(f"   작업 시작: {priority_task.task_id} "
                      f"(우선순위: {priority_task.priority.name}) - {threading.current_thread().name}")
                
                try:
                    # 작업 실행
                    result = priority_task.execute()
                    
                    with self._lock:
                        self._results[priority_task.task_id] = {
                            'result': result,
                            'exception': None,
                            'completed_at': time.time()
                        }
                    
                    print(f"   작업 완료: {priority_task.task_id}")
                
                except Exception as e:
                    with self._lock:
                        self._results[priority_task.task_id] = {
                            'result': None,
                            'exception': e,
                            'completed_at': time.time()
                        }
                    
                    print(f"   작업 실패: {priority_task.task_id} - {e}")
                
                finally:
                    with self._lock:
                        self._active_tasks.discard(priority_task.task_id)
                    self._task_queue.task_done()
                
            except queue.Empty:
                continue
            except Exception as e:
                print(f"   워커 오류: {e}")
    
    def submit(self, func, *args, priority=TaskPriority.NORMAL, task_id=None, **kwargs):
        """작업 제출"""
        if self._shutdown:
            raise RuntimeError("스레드 풀이 종료되었습니다")
        
        if task_id is None:
            task_id = str(uuid.uuid4())[:8]
        
        task = PriorityTask(
            priority=priority,
            task_id=task_id,
            func=func,
            args=args,
            kwargs=kwargs
        )
        
        self._task_queue.put(task)
        print(f"   작업 제출: {task_id} (우선순위: {priority.name})")
        
        return task_id
    
    def get_result(self, task_id, timeout=None):
        """작업 결과 가져오기"""
        start_time = time.time()
        
        while True:
            with self._lock:
                if task_id in self._results:
                    result_info = self._results.pop(task_id)
                    if result_info['exception']:
                        raise result_info['exception']
                    return result_info['result']
            
            if timeout and (time.time() - start_time) > timeout:
                raise TimeoutError(f"작업 {task_id} 타임아웃")
            
            time.sleep(0.01)
    
    def get_stats(self):
        """풀 통계 반환"""
        with self._lock:
            return {
                'max_workers': self.max_workers,
                'active_workers': len([w for w in self._workers if w.is_alive()]),
                'queue_size': self._task_queue.qsize(),
                'active_tasks': len(self._active_tasks),
                'pending_results': len(self._results)
            }
    
    def shutdown(self, wait=True):
        """스레드 풀 종료"""
        self._shutdown = True
        if wait:
            for worker in self._workers:
                worker.join()

class AdaptiveThreadPool:
    """적응형 스레드 풀"""
    
    def __init__(self, min_workers=2, max_workers=8, scale_factor=1.5):
        self.min_workers = min_workers
        self.max_workers = max_workers
        self.scale_factor = scale_factor
        self._executor = ThreadPoolExecutor(max_workers=min_workers)
        self._current_workers = min_workers
        self._task_queue = queue.Queue()
        self._submitted_tasks = 0
        self._completed_tasks = 0
        self._lock = threading.Lock()
        self._monitor_thread = None
        self._shutdown = False
        
        self._start_monitor()
    
    def _start_monitor(self):
        """모니터링 스레드 시작"""
        self._monitor_thread = threading.Thread(target=self._monitor_load, daemon=True)
        self._monitor_thread.start()
    
    def _monitor_load(self):
        """부하 모니터링 및 워커 수 조정"""
        while not self._shutdown:
            try:
                with self._lock:
                    queue_size = self._task_queue.qsize()
                    pending_ratio = queue_size / max(self._current_workers, 1)
                
                # 스케일 업 조건
                if (pending_ratio > self.scale_factor and 
                    self._current_workers < self.max_workers):
                    
                    new_worker_count = min(
                        int(self._current_workers * 1.5),
                        self.max_workers
                    )
                    
                    self._scale_up(new_worker_count)
                
                # 스케일 다운 조건
                elif (pending_ratio < 0.5 and 
                      self._current_workers > self.min_workers):
                    
                    new_worker_count = max(
                        int(self._current_workers * 0.8),
                        self.min_workers
                    )
                    
                    self._scale_down(new_worker_count)
                
                time.sleep(1.0)  # 모니터링 간격
                
            except Exception as e:
                print(f"   모니터링 오류: {e}")
    
    def _scale_up(self, new_worker_count):
        """워커 수 증가"""
        if new_worker_count > self._current_workers:
            print(f"   스케일 업: {self._current_workers} -> {new_worker_count} 워커")
            
            self._executor.shutdown(wait=False)
            self._executor = ThreadPoolExecutor(max_workers=new_worker_count)
            self._current_workers = new_worker_count
    
    def _scale_down(self, new_worker_count):
        """워커 수 감소"""
        if new_worker_count < self._current_workers:
            print(f"   스케일 다운: {self._current_workers} -> {new_worker_count} 워커")
            
            # 점진적 감소 (즉시 종료하지 않음)
            self._current_workers = new_worker_count
    
    def submit(self, func, *args, **kwargs):
        """작업 제출"""
        if self._shutdown:
            raise RuntimeError("풀이 종료되었습니다")
        
        with self._lock:
            self._submitted_tasks += 1
            self._task_queue.put(None)  # 큐 크기 추적용
        
        def wrapper():
            try:
                result = func(*args, **kwargs)
                return result
            finally:
                with self._lock:
                    self._completed_tasks += 1
                    if not self._task_queue.empty():
                        self._task_queue.get_nowait()
        
        return self._executor.submit(wrapper)
    
    def get_stats(self):
        """풀 통계"""
        with self._lock:
            return {
                'current_workers': self._current_workers,
                'min_workers': self.min_workers,
                'max_workers': self.max_workers,
                'queue_size': self._task_queue.qsize(),
                'submitted_tasks': self._submitted_tasks,
                'completed_tasks': self._completed_tasks,
                'completion_rate': (self._completed_tasks / max(self._submitted_tasks, 1)) * 100
            }
    
    def shutdown(self, wait=True):
        """풀 종료"""
        self._shutdown = True
        self._executor.shutdown(wait=wait)
        if self._monitor_thread:
            self._monitor_thread.join()

def demonstrate_advanced_thread_pools():
    """고급 스레드 풀 패턴 시연"""
    print("\n1. 우선순위 스레드 풀:")
    
    priority_pool = PriorityThreadPool(max_workers=3)
    
    def sample_task(name, duration, priority_name):
        """샘플 작업"""
        print(f"     {name} 실행 시작 (우선순위: {priority_name})")
        time.sleep(duration)
        return f"{name} 완료"
    
    # 다양한 우선순위 작업 제출
    tasks = [
        (TaskPriority.LOW, "저우선순위작업1", 0.2),
        (TaskPriority.CRITICAL, "긴급작업", 0.1),
        (TaskPriority.NORMAL, "일반작업1", 0.15),
        (TaskPriority.HIGH, "고우선순위작업", 0.1),
        (TaskPriority.NORMAL, "일반작업2", 0.1),
        (TaskPriority.LOW, "저우선순위작업2", 0.1)
    ]
    
    task_ids = []
    for priority, name, duration in tasks:
        task_id = priority_pool.submit(
            sample_task, name, duration, priority.name,
            priority=priority
        )
        task_ids.append(task_id)
    
    # 결과 수집
    print("\n   작업 결과:")
    for task_id in task_ids:
        try:
            result = priority_pool.get_result(task_id, timeout=2.0)
            print(f"     {result}")
        except Exception as e:
            print(f"     작업 {task_id} 오류: {e}")
    
    print(f"\n   풀 통계: {priority_pool.get_stats()}")
    priority_pool.shutdown()
    
    print("\n2. 적응형 스레드 풀:")
    
    adaptive_pool = AdaptiveThreadPool(min_workers=2, max_workers=6)
    
    def load_test_task(task_id, duration=0.1):
        """부하 테스트 작업"""
        time.sleep(duration)
        return f"작업 {task_id} 완료"
    
    # 부하 증가 시뮬레이션
    print("   부하 증가 시뮬레이션...")
    futures = []
    
    # 초기 부하
    for i in range(5):
        future = adaptive_pool.submit(load_test_task, f"batch1-{i}")
        futures.append(future)
    
    time.sleep(0.5)
    print(f"   초기 부하 후 통계: {adaptive_pool.get_stats()}")
    
    # 부하 급증
    for i in range(15):
        future = adaptive_pool.submit(load_test_task, f"batch2-{i}")
        futures.append(future)
    
    time.sleep(1.0)
    print(f"   부하 급증 후 통계: {adaptive_pool.get_stats()}")
    
    # 모든 작업 완료 대기
    for future in as_completed(futures, timeout=5.0):
        try:
            result = future.result()
        except Exception as e:
            print(f"   작업 오류: {e}")
    
    time.sleep(2.0)  # 스케일 다운 대기
    print(f"   최종 통계: {adaptive_pool.get_stats()}")
    
    adaptive_pool.shutdown()

demonstrate_advanced_thread_pools()
```

## 2. AsyncIO 심화와 고급 비동기 패턴

### 2.1 고급 AsyncIO 패턴

```python
print("\n=== 고급 AsyncIO 패턴 ===")

import asyncio
import aiohttp
from asyncio import Queue, Semaphore, gather, as_completed
import json
from typing import AsyncGenerator, AsyncIterator
import weakref

class AsyncResourcePool:
    """비동기 리소스 풀"""
    
    def __init__(self, factory, min_size=2, max_size=10):
        self.factory = factory
        self.min_size = min_size
        self.max_size = max_size
        self._pool = Queue(maxsize=max_size)
        self._created = 0
        self._semaphore = Semaphore(max_size)
        self._lock = asyncio.Lock()
    
    async def _create_resource(self):
        """리소스 생성"""
        resource = await self.factory()
        self._created += 1
        print(f"   리소스 생성: 총 {self._created}개")
        return resource
    
    async def acquire(self):
        """리소스 획득"""
        await self._semaphore.acquire()
        
        try:
            resource = self._pool.get_nowait()
            print(f"   풀에서 리소스 획득")
            return resource
        except asyncio.QueueEmpty:
            resource = await self._create_resource()
            print(f"   새 리소스 생성")
            return resource
    
    async def release(self, resource):
        """리소스 반환"""
        try:
            self._pool.put_nowait(resource)
            print(f"   리소스 풀 반환")
        except asyncio.QueueFull:
            # 풀이 가득 찬 경우 리소스 삭제
            if hasattr(resource, 'close'):
                await resource.close()
            print(f"   리소스 삭제 (풀 가득참)")
        finally:
            self._semaphore.release()
    
    async def __aenter__(self):
        return await self.acquire()
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.release(self)

class AsyncCircuitBreaker:
    """비동기 서킷 브레이커"""
    
    def __init__(self, failure_threshold=5, timeout=60, expected_exception=Exception):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.expected_exception = expected_exception
        
        self._failure_count = 0
        self._last_failure_time = None
        self._state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
        self._lock = asyncio.Lock()
    
    async def call(self, func, *args, **kwargs):
        """서킷 브레이커를 통한 함수 호출"""
        async with self._lock:
            state = self._get_state()
            
            if state == 'OPEN':
                raise CircuitBreakerOpenException("서킷 브레이커가 열려있습니다")
            
            if state == 'HALF_OPEN':
                print("   서킷 브레이커 테스트 호출")
        
        try:
            result = await func(*args, **kwargs)
            await self._on_success()
            return result
        
        except self.expected_exception as e:
            await self._on_failure()
            raise
    
    def _get_state(self):
        """현재 상태 확인"""
        if self._state == 'CLOSED':
            return 'CLOSED'
        
        if self._state == 'OPEN':
            if (time.time() - self._last_failure_time) > self.timeout:
                self._state = 'HALF_OPEN'
                return 'HALF_OPEN'
            return 'OPEN'
        
        return self._state
    
    async def _on_success(self):
        """성공 시 처리"""
        async with self._lock:
            self._failure_count = 0
            if self._state == 'HALF_OPEN':
                self._state = 'CLOSED'
                print("   서킷 브레이커 복구: CLOSED 상태")
    
    async def _on_failure(self):
        """실패 시 처리"""
        async with self._lock:
            self._failure_count += 1
            self._last_failure_time = time.time()
            
            if self._failure_count >= self.failure_threshold:
                self._state = 'OPEN'
                print(f"   서킷 브레이커 개방: {self._failure_count}회 실패")

class CircuitBreakerOpenException(Exception):
    """서킷 브레이커 개방 예외"""
    pass

class AsyncBatcher:
    """비동기 배치 처리기"""
    
    def __init__(self, batch_size=10, flush_interval=1.0):
        self.batch_size = batch_size
        self.flush_interval = flush_interval
        self._queue = Queue()
        self._batch = []
        self._results = {}
        self._flush_task = None
        self._lock = asyncio.Lock()
        self._processors = []
    
    async def start(self):
        """배처 시작"""
        self._flush_task = asyncio.create_task(self._flush_loop())
        
        # 배치 처리 워커들 시작
        for i in range(2):
            processor = asyncio.create_task(self._process_batches())
            self._processors.append(processor)
    
    async def add_item(self, item, item_id=None):
        """아이템 추가"""
        if item_id is None:
            item_id = str(uuid.uuid4())[:8]
        
        future = asyncio.Future()
        
        async with self._lock:
            self._batch.append((item_id, item, future))
            
            if len(self._batch) >= self.batch_size:
                await self._flush_batch()
        
        return await future
    
    async def _flush_loop(self):
        """주기적 플러시"""
        while True:
            try:
                await asyncio.sleep(self.flush_interval)
                async with self._lock:
                    if self._batch:
                        await self._flush_batch()
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"   플러시 루프 오류: {e}")
    
    async def _flush_batch(self):
        """배치 플러시"""
        if not self._batch:
            return
        
        batch = self._batch.copy()
        self._batch.clear()
        
        print(f"   배치 플러시: {len(batch)}개 아이템")
        await self._queue.put(batch)
    
    async def _process_batches(self):
        """배치 처리"""
        while True:
            try:
                batch = await self._queue.get()
                
                print(f"   배치 처리 시작: {len(batch)}개 아이템")
                
                # 실제 배치 처리 (여기서는 간단한 시뮬레이션)
                await asyncio.sleep(0.1)
                
                # 결과 설정
                for item_id, item, future in batch:
                    if not future.done():
                        result = f"processed_{item}"
                        future.set_result(result)
                
                print(f"   배치 처리 완료")
                self._queue.task_done()
                
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"   배치 처리 오류: {e}")
                
                # 오류 시 futures에 예외 설정
                for item_id, item, future in batch:
                    if not future.done():
                        future.set_exception(e)
    
    async def stop(self):
        """배처 중지"""
        if self._flush_task:
            self._flush_task.cancel()
        
        for processor in self._processors:
            processor.cancel()
        
        # 남은 배치 처리
        async with self._lock:
            if self._batch:
                await self._flush_batch()
        
        await self._queue.join()

async def async_retry(max_attempts=3, delay=1.0, backoff=2.0, exceptions=(Exception,)):
    """비동기 재시도 데코레이터"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            last_exception = None
            current_delay = delay
            
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt == max_attempts - 1:
                        break
                    
                    print(f"   재시도 {attempt + 1}/{max_attempts}: {func.__name__} - {e}")
                    await asyncio.sleep(current_delay)
                    current_delay *= backoff
            
            raise last_exception
        return wrapper
    return decorator

async def demonstrate_advanced_asyncio():
    """고급 AsyncIO 패턴 시연"""
    print("\n1. 비동기 리소스 풀:")
    
    async def connection_factory():
        """연결 팩토리"""
        await asyncio.sleep(0.1)  # 연결 생성 시뮬레이션
        return {"connection_id": str(uuid.uuid4())[:8], "created_at": time.time()}
    
    pool = AsyncResourcePool(connection_factory, min_size=2, max_size=5)
    
    async def use_connection(task_name):
        """연결 사용"""
        conn = await pool.acquire()
        try:
            print(f"   {task_name}: 연결 사용 중 {conn['connection_id']}")
            await asyncio.sleep(0.2)  # 작업 시뮬레이션
            return f"{task_name} 완료"
        finally:
            await pool.release(conn)
    
    # 동시 연결 사용
    tasks = [use_connection(f"Task-{i+1}") for i in range(8)]
    results = await gather(*tasks)
    print(f"   결과: {results}")
    
    print(f"\n   풀 통계: {pool.get_stats()}")
    pool.shutdown()
    
    print("\n2. 비동기 서킷 브레이커:")
    
    circuit_breaker = AsyncCircuitBreaker(failure_threshold=3, timeout=2)
    
    @async_retry(max_attempts=2)
    async def unreliable_service(fail_rate=0.7):
        """불안정한 서비스"""
        import random
        await asyncio.sleep(0.1)
        
        if random.random() < fail_rate:
            raise ConnectionError("서비스 연결 실패")
        
        return "서비스 응답"
    
    # 서킷 브레이커 테스트
    for i in range(8):
        try:
            result = await circuit_breaker.call(unreliable_service, 0.8)
            print(f"   호출 {i+1}: {result}")
        except Exception as e:
            print(f"   호출 {i+1}: 실패 - {e}")
        
        await asyncio.sleep(0.1)
    
    print("\n3. 비동기 배치 처리:")
    
    batcher = AsyncBatcher(batch_size=3, flush_interval=0.5)
    await batcher.start()
    
    # 배치 처리 테스트
    batch_tasks = []
    for i in range(10):
        task = batcher.add_item(f"item_{i+1}")
        batch_tasks.append(task)
        await asyncio.sleep(0.1)  # 점진적 추가
    
    # 결과 수집
    results = await gather(*batch_tasks)
    print(f"   배치 결과: {results}")
    
    await batcher.stop()

# 이벤트 루프 실행
async def run_advanced_asyncio():
    """고급 AsyncIO 데모 실행"""
    await demonstrate_advanced_asyncio()

try:
    asyncio.run(run_advanced_asyncio())
except RuntimeError:
    # 이미 실행 중인 이벤트 루프가 있는 경우
    print("   고급 AsyncIO 데모는 별도 환경에서 실행하세요")
```

### 2.2 비동기 데이터 스트리밍 시스템
실시간 데이터 스트리밍을 위한 비동기 시스템을 구현하세요:
- 백프레셔(backpressure) 처리
- 스트림 분기 및 병합
- 오류 복구 및 재시도
- 메트릭스 수집 및 모니터링

```python
print("\n=== 비동기 데이터 스트리밍 시스템 ===")

from typing import AsyncGenerator, AsyncIterable
import json

class AsyncStreamProcessor:
    """비동기 스트림 처리기"""
    
    def __init__(self, buffer_size=100):
        self.buffer_size = buffer_size
        self._processors = []
    
    async def process_stream(self, stream: AsyncIterable, 
                           processors: List[Callable] = None) -> AsyncGenerator:
        """스트림 처리"""
        if processors is None:
            processors = self._processors
        
        buffer = []
        
        async for item in stream:
            # 전처리
            processed_item = item
            for processor in processors:
                if asyncio.iscoroutinefunction(processor):
                    processed_item = await processor(processed_item)
                else:
                    processed_item = processor(processed_item)
            
            buffer.append(processed_item)
            
            # 버퍼가 찬 경우 배치 처리
            if len(buffer) >= self.buffer_size:
                yield buffer
                buffer = []
        
        # 남은 항목들 처리
        if buffer:
            yield buffer
    
    def add_processor(self, processor):
        """처리기 추가"""
        self._processors.append(processor)
    
    async def filter_stream(self, stream: AsyncIterable, 
                          predicate: Callable) -> AsyncGenerator:
        """스트림 필터링"""
        async for item in stream:
            if asyncio.iscoroutinefunction(predicate):
                should_include = await predicate(item)
            else:
                should_include = predicate(item)
            
            if should_include:
                yield item
    
    async def map_stream(self, stream: AsyncIterable, 
                        mapper: Callable) -> AsyncGenerator:
        """스트림 매핑"""
        async for item in stream:
            if asyncio.iscoroutinefunction(mapper):
                mapped_item = await mapper(item)
            else:
                mapped_item = mapper(item)
            
            yield mapped_item
    
    async def reduce_stream(self, stream: AsyncIterable, 
                          reducer: Callable, initial=None):
        """스트림 축약"""
        accumulator = initial
        
        async for item in stream:
            if accumulator is None:
                accumulator = item
            else:
                if asyncio.iscoroutinefunction(reducer):
                    accumulator = await reducer(accumulator, item)
                else:
                    accumulator = reducer(accumulator, item)
        
        return accumulator

class AsyncDataPipeline:
    """비동기 데이터 파이프라인"""
    
    def __init__(self):
        self.stages = []
        self.metrics = {
            'processed_items': 0,
            'errors': 0,
            'start_time': None,
            'end_time': None
        }
    
    def add_stage(self, stage_func, error_handler=None):
        """파이프라인 스테이지 추가"""
        self.stages.append({
            'func': stage_func,
            'error_handler': error_handler
        })
        return self
    
    async def execute(self, input_stream: AsyncIterable):
        """파이프라인 실행"""
        self.metrics['start_time'] = time.time()
        current_stream = input_stream
        
        for i, stage in enumerate(self.stages):
            print(f"   파이프라인 스테이지 {i+1} 실행: {stage['func'].__name__}")
            current_stream = self._execute_stage(current_stream, stage)
        
        # 최종 결과 수집
        results = []
        async for item in current_stream:
            results.append(item)
            self.metrics['processed_items'] += 1
        
        self.metrics['end_time'] = time.time()
        return results
    
    async def _execute_stage(self, input_stream: AsyncIterable, stage):
        """스테이지 실행"""
        stage_func = stage['func']
        error_handler = stage['error_handler']
        
        async for item in input_stream:
            try:
                if asyncio.iscoroutinefunction(stage_func):
                    result = await stage_func(item)
                else:
                    result = stage_func(item)
                
                yield result
                
            except Exception as e:
                self.metrics['errors'] += 1
                
                if error_handler:
                    try:
                        if asyncio.iscoroutinefunction(error_handler):
                            handled_result = await error_handler(item, e)
                        else:
                            handled_result = error_handler(item, e)
                        
                        if handled_result is not None:
                            yield handled_result
                    except Exception as handler_error:
                        print(f"     오류 핸들러 실패: {handler_error}")
                else:
                    print(f"     스테이지 오류: {e}")
    
    def get_metrics(self):
        """파이프라인 메트릭스"""
        duration = None
        if self.metrics['start_time'] and self.metrics['end_time']:
            duration = self.metrics['end_time'] - self.metrics['start_time']
        
        return {
            **self.metrics,
            'duration': duration,
            'items_per_second': (self.metrics['processed_items'] / duration) 
                              if duration and duration > 0 else 0
        }

async def data_source() -> AsyncGenerator[Dict, None]:
    """테스트 데이터 소스"""
    for i in range(20):
        yield {
            'id': i + 1,
            'value': i * 2,
            'category': 'A' if i % 2 == 0 else 'B',
            'timestamp': time.time()
        }
        await asyncio.sleep(0.05)  # 스트리밍 시뮬레이션

async def validate_data(item):
    """데이터 검증"""
    await asyncio.sleep(0.01)  # 검증 시뮬레이션
    
    if item['value'] < 0:
        raise ValueError("음수 값")
    
    return item

def transform_data(item):
    """데이터 변환"""
    return {
        **item,
        'value_squared': item['value'] ** 2,
        'processed_at': time.time()
    }

def filter_category_a(item):
    """카테고리 A 필터링"""
    return item['category'] == 'A'

async def enrich_data(item):
    """데이터 보강"""
    await asyncio.sleep(0.02)  # 외부 API 호출 시뮬레이션
    
    return {
        **item,
        'enriched': True,
        'external_data': f"ext_data_{item['id']}"
    }

def error_handler(item, error):
    """오류 처리"""
    print(f"     데이터 처리 오류: {item['id']} - {error}")
    return {**item, 'error': str(error), 'processed': False}

async def demonstrate_async_streams():
    """비동기 스트림 처리 시연"""
    print("\n1. 비동기 스트림 처리기:")
    
    processor = AsyncStreamProcessor(buffer_size=5)
    
    # 스트림 처리 테스트
    stream = data_source()
    
    # 필터링
    filtered_stream = processor.filter_stream(stream, filter_category_a)
    
    # 매핑
    mapped_stream = processor.map_stream(filtered_stream, transform_data)
    
    # 배치 처리
    batch_count = 0
    async for batch in processor.process_stream(mapped_stream):
        batch_count += 1
        print(f"   배치 {batch_count}: {len(batch)}개 항목")
        for item in batch[:2]:  # 처음 2개만 출력
            print(f"     아이템: ID={item['id']}, Value²={item['value_squared']}")
    
    print("\n2. 비동기 데이터 파이프라인:")
    
    # 파이프라인 구성
    pipeline = (AsyncDataPipeline()
                .add_stage(validate_data, error_handler)
                .add_stage(transform_data)
                .add_stage(enrich_data))
    
    # 파이프라인 실행
    input_stream = data_source()
    results = await pipeline.execute(input_stream)
    
    print(f"\n   파이프라인 결과: {len(results)}개 항목 처리")
    
    # 처음 3개 결과 출력
    for i, result in enumerate(results[:3]):
        print(f"     결과 {i+1}: ID={result['id']}, "
              f"enriched={result.get('enriched', False)}")
    
    # 메트릭스 출력
    metrics = pipeline.get_metrics()
    print(f"\n   파이프라인 메트릭스:")
    print(f"     처리된 항목: {metrics['processed_items']}")
    print(f"     오류 수: {metrics['errors']}")
    print(f"     실행 시간: {metrics['duration']:.3f}초")
    print(f"     처리 속도: {metrics['items_per_second']:.1f} 항목/초")

# 비동기 스트림 데모 실행
async def run_stream_demo():
    """스트림 데모 실행"""
    await demonstrate_async_streams()

try:
    asyncio.run(run_stream_demo())
except RuntimeError:
    print("   비동기 스트림 데모는 별도 환경에서 실행하세요")
```

## 3. 멀티프로세싱 고급 기법

### 3.1 고급 프로세스 간 통신

```python
print("\n=== 고급 프로세스 간 통신 ===")

import multiprocessing as mp
from multiprocessing import Process, Queue, Pipe, Lock, Value, Array
from multiprocessing.managers import BaseManager
import pickle
import signal
import os

class SharedCounter:
    """공유 카운터 클래스"""
    
    def __init__(self, initial_value=0):
        self._value = Value('i', initial_value)
        self._lock = Lock()
    
    def increment(self, amount=1):
        """카운터 증가"""
        with self._lock:
            self._value.value += amount
            return self._value.value
    
    def decrement(self, amount=1):
        """카운터 감소"""
        with self._lock:
            self._value.value -= amount
            return self._value.value
    
    @property
    def value(self):
        """현재 값 반환"""
        return self._value.value
    
    def reset(self):
        """카운터 리셋"""
        with self._lock:
            self._value.value = 0

class TaskQueue:
    """작업 큐 관리자"""
    
    def __init__(self):
        self.task_queue = Queue()
        self.result_queue = Queue()
        self.workers = []
        self.task_counter = SharedCounter()
        self.completed_counter = SharedCounter()
        self._shutdown_event = mp.Event()
    
    def add_worker(self, worker_func, worker_id):
        """워커 프로세스 추가"""
        worker = Process(
            target=self._worker_loop,
            args=(worker_func, worker_id),
            name=f"Worker-{worker_id}"
        )
        self.workers.append(worker)
        return worker
    
    def _worker_loop(self, worker_func, worker_id):
        """워커 메인 루프"""
        print(f"   워커 {worker_id} 시작 (PID: {os.getpid()})")
        
        while not self._shutdown_event.is_set():
            try:
                # 작업 가져오기
                task = self.task_queue.get(timeout=1.0)
                
                if task is None:  # 종료 신호
                    break
                
                self._current_task = task
                
                # 작업 처리
                result = self._process_task(task)
                
                # 결과 제출
                self.result_queue.put(result)
                
                self._current_task = None
                
            except Exception as e:
                print(f"   워커 {worker_id} 오류: {e}")
                break
        
        print(f"   워커 {worker_id} 종료")
    
    def _process_task(self, task):
        """작업 처리"""
        start_time = time.time()
        
        try:
            handler = self.task_queue._task_handlers.get(task.task_type)
            if not handler:
                raise ValueError(f"No handler for task type: {task.task_type}")
            
            print(f"     워커 {os.getpid()}: 작업 처리 중 {task.task_id}")
            
            # 타임아웃 처리 (간단한 구현)
            result = handler.handle(task)
            
            end_time = time.time()
            processing_time = end_time - start_time
            
            return {
                'task_id': task.task_id,
                'result': result,
                'status': 'success',
                'started_at': start_time,
                'completed_at': end_time,
                'processing_time': processing_time
            }
            
        except Exception as e:
            self.result_queue.put({
                'task_id': task.task_id,
                'error': str(e),
                'status': 'failed'
            })
            return None
    
    def start_workers(self):
        """모든 워커 시작"""
        for worker in self.workers:
            worker.start()
        print(f"   {len(self.workers)}개 워커 프로세스 시작")
    
    def shutdown(self, timeout=5):
        """워커들 종료"""
        print("   워커 종료 시작...")
        
        # 종료 신호 설정
        self._shutdown_event.set()
        
        # 종료 토큰 전송
        for _ in self.workers:
            self.task_queue.put(None)
        
        # 워커들 종료 대기
        for worker in self.workers:
            worker.join(timeout=timeout)
        
        print("   모든 워커 종료 완료")
    
    def get_stats(self):
        """통계 정보"""
        return {
            'submitted_tasks': self.task_counter.value,
            'completed_tasks': self.completed_counter.value,
            'active_workers': len([w for w in self.workers if w.is_alive()]),
            'queue_size': self.task_queue.qsize(),
            'result_queue_size': self.result_queue.qsize()
        }

class DistributedDataProcessor:
    """분산 데이터 처리기"""
    
    def __init__(self, num_workers=4):
        self.num_workers = num_workers
        self.data_chunks = Queue()
        self.results = Queue()
        self.progress = Value('i', 0)
        self.total_chunks = Value('i', 0)
        self.lock = Lock()
    
    def chunk_data(self, data, chunk_size=100):
        """데이터 청크 분할"""
        chunks = []
        for i in range(0, len(data), chunk_size):
            chunk = data[i:i + chunk_size]
            chunks.append(chunk)
        
        with self.lock:
            self.total_chunks.value = len(chunks)
        
        return chunks
    
    def process_chunk(self, chunk):
        """청크 처리 (워커에서 실행)"""
        pid = os.getpid()
        print(f"     프로세스 {pid}: {len(chunk)}개 항목 처리 중...")
        
        # 실제 처리 (여기서는 간단한 변환)
        processed = []
        for item in chunk:
            # 복잡한 처리 시뮬레이션
            time.sleep(0.01)
            processed.append(item * 2 + 1)
        
        # 진행률 업데이트
        with self.lock:
            self.progress.value += 1
            current_progress = self.progress.value
            total = self.total_chunks.value
        
        print(f"     프로세스 {pid}: 청크 완료 ({current_progress}/{total})")
        return processed
    
    def worker_process(self, worker_id):
        """워커 프로세스 메인 함수"""
        print(f"   데이터 워커 {worker_id} 시작 (PID: {os.getpid()})")
        
        while True:
            try:
                chunk = self.data_chunks.get(timeout=2.0)
                
                if chunk is None:  # 종료 신호
                    break
                
                result = self.process_chunk(chunk)
                self.results.put(result)
                self.data_chunks.task_done()
                
            except queue.Empty:
                break  # 더 이상 작업이 없음
            except Exception as e:
                print(f"   워커 {worker_id} 오류: {e}")
                break
        
        print(f"   데이터 워커 {worker_id} 종료")
    
    def process_data(self, data, chunk_size=50):
        """데이터 분산 처리"""
        print(f"   분산 처리 시작: {len(data)}개 항목")
        
        # 데이터 청크 분할
        chunks = self.chunk_data(data, chunk_size)
        print(f"   {len(chunks)}개 청크로 분할")
        
        # 청크를 큐에 추가
        for chunk in chunks:
            self.data_chunks.put(chunk)
        
        # 워커 프로세스 시작
        workers = []
        for i in range(self.num_workers):
            worker = Process(
                target=self.worker_process,
                args=(i + 1,),
                name=f"DataWorker-{i+1}"
            )
            workers.append(worker)
            worker.start()
        
        # 종료 신호 전송
        for _ in workers:
            self.data_chunks.put(None)
        
        # 결과 수집
        all_results = []
        expected_results = len(chunks)
        
        while len(all_results) < expected_results:
            try:
                result = self.results.get(timeout=5.0)
                all_results.extend(result)
            except queue.Empty:
                print("   결과 수집 타임아웃")
                break
        
        # 워커들 종료 대기
        for worker in workers:
            worker.join(timeout=3)
            if worker.is_alive():
                worker.terminate()
                worker.join()
        
        print(f"   분산 처리 완료: {len(all_results)}개 결과")
        return all_results

def cpu_intensive_task(task_data):
    """CPU 집약적 작업"""
    task_id, numbers = task_data
    
    # 복잡한 계산 시뮬레이션
    result = 0
    for num in numbers:
        for i in range(num % 1000 + 1):
            result += i * i
    
    return f"Task-{task_id}: {result}"

def demonstrate_advanced_multiprocessing():
    """고급 멀티프로세싱 시연"""
    print("\n1. 작업 큐 관리:")
    
    task_queue = TaskQueue()
    
    # 워커 추가
    for i in range(3):
        task_queue.add_worker(cpu_intensive_task, i + 1)
    
    # 워커 시작
    task_queue.start_workers()
    
    # 작업 제출
    test_tasks = [
        (1, list(range(100, 200))),
        (2, list(range(200, 300))),
        (3, list(range(150, 250))),
        (4, list(range(300, 400))),
        (5, list(range(50, 150)))
    ]
    
    for task in test_tasks:
        task_queue.submit_task(task)
    
    # 모든 작업 완료 대기
    time.sleep(2.0)
    
    # 결과 수집
    results = task_queue.get_results()
    print(f"\n   작업 결과:")
    for result in results:
        print(f"     {result}")
    
    # 통계 출력
    stats = task_queue.get_stats()
    print(f"\n   작업 큐 통계: {stats}")
    
    # 워커 종료
    task_queue.shutdown()

if __name__ == "__main__":
    # 멀티프로세싱 데모는 메인 모듈에서만 실행
    demonstrate_advanced_multiprocessing()
else:
    print("   멀티프로세싱 데모는 메인 모듈에서 실행하세요")
```

### 3.2 고성능 병렬 처리 패턴

```python
print("\n=== 고성능 병렬 처리 패턴 ===")

from concurrent.futures import ProcessPoolExecutor, as_completed
import numpy as np
from functools import partial
import psutil

class ParallelProcessingFramework:
    """병렬 처리 프레임워크"""
    
    def __init__(self, max_workers=None):
        self.max_workers = max_workers or min(32, os.cpu_count() + 4)
        self._executor = None
        self.submitted_tasks = []
        self.completed_tasks = []
        self.stats = {
            'total_tasks': 0,
            'completed_tasks': 0,
            'failed_tasks': 0,
            'total_time': 0,
            'cpu_usage': [],
            'memory_usage': []
        }
    
    def __enter__(self):
        self._executor = ProcessPoolExecutor(max_workers=self.max_workers)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._executor:
            self._executor.shutdown(wait=True)
    
    def submit_batch(self, func, data_batches, *args, **kwargs):
        """배치 작업 제출"""
        if not self._executor:
            raise RuntimeError("Framework not initialized")
        
        futures = []
        for i, batch in enumerate(data_batches):
            if args or kwargs:
                task_func = partial(func, *args, **kwargs)
                future = self._executor.submit(task_func, batch)
            else:
                task_func = partial(func, batch)
                future = self._executor.submit(task_func)
            
            future.batch_id = i
            futures.append(future)
            self.stats['total_tasks'] += 1
        
        self.submitted_tasks.extend(futures)
        return futures
    
    def collect_results(self, futures, timeout=None):
        """결과 수집"""
        results = []
        
        for future in as_completed(futures, timeout=timeout):
            try:
                result = future.result()
                results.append(result)
                self.stats['completed_tasks'] += 1
                
            except Exception as e:
                results.append(None)
                self.stats['failed_tasks'] += 1
        
        self.completed_tasks.extend(results)
        return results
    
    def get_stats(self):
        """프레임워크 통계"""
        return self.stats

def matrix_multiply_chunk(data):
    """매트릭스 곱셈 청크 처리"""
    matrix_a, matrix_b, start_row, end_row = data
    
    result_chunk = []
    for i in range(start_row, end_row):
        row = []
        for j in range(len(matrix_b[0])):
            cell_value = sum(matrix_a[i][k] * matrix_b[k][j] for k in range(len(matrix_b)))
            row.append(cell_value)
        result_chunk.append(row)
    
    return result_chunk

def sum_of_squares_map(numbers):
    """제곱의 합 매핑 함수"""
    return sum(x * x for x in numbers)

def sum_reduce(a, b):
    """합계 리듀스 함수"""
    return a + b

def prime_count_in_range(range_data):
    """범위 내 소수 개수 계산"""
    start, end = range_data
    
    def is_prime(n):
        if n < 2:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True
    
    count = sum(1 for n in range(start, end + 1) if is_prime(n))
    return count

def statistical_analysis(data_chunk):
    """통계 분석"""
    import statistics
    
    return {
        'mean': statistics.mean(data_chunk),
        'median': statistics.median(data_chunk),
        'stdev': statistics.stdev(data_chunk) if len(data_chunk) > 1 else 0,
        'min': min(data_chunk),
        'max': max(data_chunk),
        'count': len(data_chunk)
    }

def merge_statistics(stats1, stats2):
    """통계 병합"""
    total_count = stats1['count'] + stats2['count']
    
    # 가중 평균 계산
    combined_mean = ((stats1['mean'] * stats1['count'] + 
                     stats2['mean'] * stats2['count']) / total_count)
    
    return {
        'mean': combined_mean,
        'median': (stats1['median'] + stats2['median']) / 2,  # 근사치
        'stdev': max(stats1['stdev'], stats2['stdev']),  # 근사치
        'min': min(stats1['min'], stats2['min']),
        'max': max(stats1['max'], stats2['max']),
        'count': total_count
    }

def demonstrate_parallel_processing():
    """고성능 병렬 처리 시연"""
    print("\n1. 병렬 매트릭스 곱셈:")
    
    # 테스트 매트릭스 생성
    size = 100
    matrix_a = [[i + j for j in range(size)] for i in range(size)]
    matrix_b = [[i * j + 1 for j in range(size)] for i in range(size)]
    
    with ParallelProcessingFramework(max_workers=4) as framework:
        # 행 단위로 분할
        chunk_size = max(1, size // framework.max_workers)
        chunks = []
        
        for start_row in range(0, size, chunk_size):
            end_row = min(start_row + chunk_size, size)
            chunks.append((matrix_a, matrix_b, start_row, end_row))
        
        print(f"   매트릭스 {size}x{size}, {len(chunks)}개 청크로 분할")
        
        start_time = time.time()
        futures = framework.submit_batch(matrix_multiply_chunk, chunks)
        results = framework.collect_results(futures)
        end_time = time.time()
        
        # 결과 조합
        final_matrix = []
        successful_results = [r for r in results if r is not None]
        successful_results.sort(key=lambda x: x['batch_id'])
        
        for result in successful_results:
            final_matrix.extend(result)
        
        print(f"   매트릭스 곱셈 완료: {end_time - start_time:.3f}초")
        print(f"   결과 매트릭스 크기: {len(final_matrix)}x{len(final_matrix[0])}")
        
        stats = framework.get_stats()
        print(f"   성능 통계: {stats}")
    
    print("\n2. 맵-리듀스 패턴:")
    
    # 큰 숫자 리스트의 제곱합 계산
    large_numbers = list(range(1, 10001))  # 1부터 10000까지
    
    with ParallelProcessingFramework(max_workers=6) as framework:
        print(f"   {len(large_numbers)}개 숫자의 제곱합 계산")
        
        start_time = time.time()
        result = framework.map_reduce(
            map_func=sum_of_squares_map,
            reduce_func=sum_reduce,
            data=large_numbers,
            chunk_size=1000
        )
        end_time = time.time()
        
        print(f"   맵-리듀스 결과: {result}")
        print(f"   실행 시간: {end_time - start_time:.3f}초")
        
        # 검증 (순차 계산)
        sequential_result = sum(x * x for x in large_numbers)
        print(f"   검증 (순차 계산): {sequential_result}")
        print(f"   결과 일치: {result == sequential_result}")
    
    print("\n3. 복합 병렬 처리:")
    
    with ParallelProcessingFramework(max_workers=4) as framework:
        # 소수 개수 계산
        ranges = [(1, 2500), (2501, 5000), (5001, 7500), (7501, 10000)]
        
        print("   범위별 소수 개수 계산...")
        futures1 = framework.submit_batch(prime_count_in_range, ranges)
        
        # 통계 분석
        import random
        test_data = [random.randint(1, 1000) for _ in range(10000)]
        data_chunks = [test_data[i:i+2500] for i in range(0, len(test_data), 2500)]
        
        print("   통계 분석...")
        futures2 = framework.submit_batch(statistical_analysis, data_chunks)
        
        # 소수 결과 수집
        prime_results = framework.collect_results(futures1)
        total_primes = sum(r for r in prime_results if r is not None)
        print(f"   1-10000 범위 소수 개수: {total_primes}")
        
        # 통계 결과 수집 및 병합
        stats_results = framework.collect_results(futures2)
        successful_stats = [r for r in stats_results if r is not None]
        
        if successful_stats:
            final_stats = successful_stats[0]
            for stats in successful_stats[1:]:
                final_stats = merge_statistics(final_stats, stats)
            
            print(f"   통계 분석 결과:")
            print(f"     평균: {final_stats['mean']:.2f}")
            print(f"     최소/최대: {final_stats['min']}/{final_stats['max']}")
            print(f"     표준편차: {final_stats['stdev']:.2f}")
            print(f"     총 개수: {final_stats['count']}")
        
        final_stats = framework.get_stats()
        print(f"\n   전체 성능 통계: {final_stats}")

if __name__ == "__main__":
    demonstrate_parallel_processing()
else:
    print("   병렬 처리 데모는 메인 모듈에서 실행하세요")
```

## 4. 분산 작업 처리와 워커 풀

### 4.1 분산 워커 시스템

```python
print("\n=== 분산 워커 시스템 ===")

import json
import socket
import threading
from abc import ABC, abstractmethod
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional, Callable
from enum import Enum
import hashlib

class TaskStatus(Enum):
    """작업 상태"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

@dataclass
class Task:
    """작업 정의"""
    task_id: str
    task_type: str
    payload: Dict[str, Any]
    priority: int = 0
    max_retries: int = 3
    timeout: float = 30.0
    created_at: float = 0.0
    
    def __post_init__(self):
        if self.created_at == 0.0:
            self.created_at = time.time()
    
    def to_dict(self):
        """딕셔너리로 변환"""
        return asdict(self)
    
    @classmethod
    def from_dict(cls, data):
        """딕셔너리에서 생성"""
        return cls(**data)

@dataclass
class TaskResult:
    """작업 결과"""
    task_id: str
    status: TaskStatus
    result: Any = None
    error: str = None
    worker_id: str = None
    started_at: float = 0.0
    completed_at: float = 0.0
    
    def to_dict(self):
        """딕셔너리로 변환"""
        data = asdict(self)
        data['status'] = self.status.value
        return data
    
    @classmethod
    def from_dict(cls, data):
        """딕셔너리에서 생성"""
        data['status'] = TaskStatus(data['status'])
        return cls(**data)

class TaskHandler(ABC):
    """작업 핸들러 인터페이스"""
    
    @abstractmethod
    def handle(self, task: Task) -> Any:
        """작업 처리"""
        pass
    
    @abstractmethod
    def get_task_type(self) -> str:
        """처리 가능한 작업 타입 반환"""
        pass

class DistributedTaskQueue:
    """분산 작업 큐"""
    
    def __init__(self, max_size=1000):
        self.max_size = max_size
        self._tasks = {}  # task_id -> Task
        self._pending_tasks = []  # priority queue
        self._running_tasks = {}  # task_id -> worker_id
        self._completed_tasks = {}  # task_id -> TaskResult
        self._lock = threading.RLock()
        self._task_handlers = {}  # task_type -> TaskHandler
        self._workers = {}  # worker_id -> worker_info
        self._metrics = {
            'total_submitted': 0,
            'total_completed': 0,
            'total_failed': 0,
            'avg_processing_time': 0.0
        }
    
    def register_handler(self, handler: TaskHandler):
        """작업 핸들러 등록"""
        task_type = handler.get_task_type()
        self._task_handlers[task_type] = handler
        print(f"   핸들러 등록: {task_type}")
    
    def submit_task(self, task: Task) -> bool:
        """작업 제출"""
        with self._lock:
            if len(self._tasks) >= self.max_size:
                return False
            
            if task.task_type not in self._task_handlers:
                raise ValueError(f"Unknown task type: {task.task_type}")
            
            self._tasks[task.task_id] = task
            self._pending_tasks.append(task)
            self._pending_tasks.sort(key=lambda t: (-t.priority, t.created_at))
            
            self._metrics['total_submitted'] += 1
            
            print(f"   작업 제출: {task.task_id} ({task.task_type})")
            return True
    
    def get_next_task(self, worker_id: str) -> Optional[Task]:
        """다음 작업 가져오기"""
        with self._lock:
            if not self._pending_tasks:
                return None
            
            task = self._pending_tasks.pop(0)
            self._running_tasks[task.task_id] = worker_id
            
            print(f"   작업 할당: {task.task_id} -> 워커 {worker_id}")
            return task
    
    def complete_task(self, task_result: TaskResult):
        """작업 완료 처리"""
        with self._lock:
            task_id = task_result.task_id
            
            if task_id in self._running_tasks:
                del self._running_tasks[task_id]
            
            self._completed_tasks[task_id] = task_result
            
            if task_result.status == TaskStatus.COMPLETED:
                self._metrics['total_completed'] += 1
                
                # 평균 처리 시간 업데이트
                processing_time = task_result.completed_at - task_result.started_at
                current_avg = self._metrics['avg_processing_time']
                completed_count = self._metrics['total_completed']
                new_avg = ((current_avg * (completed_count - 1) + processing_time) / 
                          completed_count)
                self._metrics['avg_processing_time'] = new_avg
                
            elif task_result.status == TaskStatus.FAILED:
                self._metrics['total_failed'] += 1
                
                # 재시도 로직
                task = self._tasks.get(task_id)
                if task and task.max_retries > 0:
                    task.max_retries -= 1
                    self._pending_tasks.append(task)
                    self._pending_tasks.sort(key=lambda t: (-t.priority, t.created_at))
                    print(f"   작업 재시도: {task_id} (남은 시도: {task.max_retries})")
            
            print(f"   작업 완료: {task_id} ({task_result.status.value})")
    
    def get_task_status(self, task_id: str) -> Optional[TaskStatus]:
        """작업 상태 조회"""
        with self._lock:
            if task_id in self._completed_tasks:
                return self._completed_tasks[task_id].status
            elif task_id in self._running_tasks:
                return TaskStatus.RUNNING
            elif task_id in self._tasks:
                return TaskStatus.PENDING
            return None
    
    def get_metrics(self):
        """메트릭스 반환"""
        with self._lock:
            return {
                **self._metrics,
                'pending_tasks': len(self._pending_tasks),
                'running_tasks': len(self._running_tasks),
                'completed_tasks': len(self._completed_tasks),
                'active_workers': len(self._workers)
            }

class DistributedWorker:
    """분산 워커"""
    
    def __init__(self, worker_id: str, task_queue: DistributedTaskQueue):
        self.worker_id = worker_id
        self.task_queue = task_queue
        self._running = False
        self._thread = None
        self._current_task = None
        self._stats = {
            'tasks_processed': 0,
            'tasks_failed': 0,
            'total_processing_time': 0.0,
            'start_time': None
        }
    
    def start(self):
        """워커 시작"""
        if self._running:
            return
        
        self._running = True
        self._stats['start_time'] = time.time()
        self._thread = threading.Thread(target=self._work_loop, daemon=True)
        self._thread.start()
        print(f"   워커 시작: {self.worker_id}")
    
    def stop(self):
        """워커 중지"""
        self._running = False
        if self._thread:
            self._thread.join()
        print(f"   워커 중지: {self.worker_id}")
    
    def _work_loop(self):
        """워커 메인 루프"""
        while self._running:
            try:
                # 작업 가져오기
                task = self.task_queue.get_next_task(self.worker_id)
                
                if task is None:
                    time.sleep(0.1)  # 작업이 없으면 잠시 대기
                    continue
                
                self._current_task = task
                
                # 작업 처리
                result = self._process_task(task)
                
                # 결과 제출
                self.task_queue.complete_task(result)
                
                self._current_task = None
                
            except Exception as e:
                print(f"   워커 {self.worker_id} 오류: {e}")
                break
        
        print(f"   워커 {self.worker_id} 종료")
    
    def _process_task(self, task: Task) -> TaskResult:
        """작업 처리"""
        start_time = time.time()
        
        try:
            handler = self.task_queue._task_handlers.get(task.task_type)
            if not handler:
                raise ValueError(f"No handler for task type: {task.task_type}")
            
            print(f"     워커 {self.worker_id}: 작업 처리 중 {task.task_id}")
            
            # 타임아웃 처리 (간단한 구현)
            result = handler.handle(task)
            
            end_time = time.time()
            processing_time = end_time - start_time
            
            return TaskResult(
                task_id=task.task_id,
                status=TaskStatus.COMPLETED,
                result=result,
                worker_id=self.worker_id,
                started_at=start_time,
                completed_at=end_time,
                processing_time=processing_time
            )
            
        except Exception as e:
            end_time = time.time()
            self._stats['tasks_failed'] += 1
            
            return TaskResult(
                task_id=task.task_id,
                status=TaskStatus.FAILED,
                error=str(e),
                worker_id=self.worker_id,
                completed_at=end_time
            )
    
    def get_stats(self):
        """워커 통계"""
        uptime = time.time() - self._stats['start_time'] if self._stats['start_time'] else 0
        avg_processing_time = (self._stats['total_processing_time'] / 
                              max(self._stats['tasks_processed'], 1))
        
        return {
            'worker_id': self.worker_id,
            'uptime': uptime,
            'tasks_processed': self._stats['tasks_processed'],
            'tasks_failed': self._stats['tasks_failed'],
            'avg_processing_time': avg_processing_time,
            'current_task': self._current_task.task_id if self._current_task else None
        }

class MathTaskHandler(TaskHandler):
    """수학 계산 작업 핸들러"""
    
    def get_task_type(self) -> str:
        return "math"
    
    def handle(self, task: Task) -> Any:
        operation = task.payload.get('operation')
        numbers = task.payload.get('numbers', [])
        
        if operation == 'sum':
            return sum(numbers)
        elif operation == 'product':
            result = 1
            for num in numbers:
                result *= num
            return result
        elif operation == 'factorial':
            n = task.payload.get('number', 0)
            result = 1
            for i in range(1, n + 1):
                result *= i
            return result
        elif operation == 'fibonacci':
            n = task.payload.get('number', 0)
            if n <= 1:
                return n
            a, b = 0, 1
            for _ in range(2, n + 1):
                a, b = b, a + b
            return b
        else:
            raise ValueError(f"Unknown math operation: {operation}")

class StringTaskHandler(TaskHandler):
    """문자열 처리 작업 핸들러"""
    
    def get_task_type(self) -> str:
        return "string"
    
    def handle(self, task: Task) -> Any:
        operation = task.payload.get('operation')
        text = task.payload.get('text', '')
        
        # 처리 시뮬레이션
        time.sleep(0.1)
        
        if operation == 'reverse':
            return text[::-1]
        elif operation == 'uppercase':
            return text.upper()
        elif operation == 'word_count':
            return len(text.split())
        elif operation == 'hash':
            return hashlib.md5(text.encode()).hexdigest()
        else:
            raise ValueError(f"Unknown string operation: {operation}")

def demonstrate_distributed_system():
    """분산 워커 시스템 시연"""
    print("\n1. 분산 작업 큐 설정:")
    
    task_queue = DistributedTaskQueue(max_size=100)
    
    # 핸들러 등록
    task_queue.register_handler(MathTaskHandler())
    task_queue.register_handler(StringTaskHandler())
    
    # 워커들 생성 및 시작
    workers = []
    for i in range(4):
        worker = DistributedWorker(f"worker-{i+1}", task_queue)
        workers.append(worker)
        worker.start()
    
    print("\n2. 작업 제출:")
    
    # 다양한 작업 제출
    tasks = [
        Task("math-1", "math", {"operation": "factorial", "number": 10}, priority=2),
        Task("string-1", "string", {"operation": "reverse", "text": "Hello World"}, priority=1),
        Task("math-2", "math", {"operation": "fibonacci", "number": 15}, priority=3),
        Task("string-2", "string", {"operation": "word_count", "text": "The quick brown fox jumps"}, priority=1),
        Task("math-3", "math", {"operation": "sum", "numbers": list(range(1, 101))}, priority=2),
        Task("string-3", "string", {"operation": "hash", "text": "distribute processing"}, priority=1),
        Task("math-4", "math", {"operation": "product", "numbers": [2, 3, 4, 5]}, priority=2),
        Task("string-4", "string", {"operation": "uppercase", "text": "distributed system"}, priority=1)
    ]
    
    for task in tasks:
        task_queue.submit_task(task)
    
    # 모든 작업 완료 대기
    time.sleep(2.0)
    
    # 결과 수집
    results = task_queue.get_results()
    print(f"\n   작업 결과:")
    for result in results:
        print(f"     {result}")
    
    # 통계 출력
    stats = task_queue.get_stats()
    print(f"\n   작업 큐 통계: {stats}")
    
    # 워커 종료
    task_queue.shutdown()

if __name__ == "__main__":
    # 멀티프로세싱 데모는 메인 모듈에서만 실행
    demonstrate_distributed_system()
else:
    print("   분산 워커 시스템은 메인 모듈에서만 실행하세요")
```

## 5. 성능 분석과 최적화

### 5.1 동시성 성능 프로파일링

```python
print("\n=== 동시성 성능 프로파일링 ===")

import cProfile
import pstats
import tracemalloc
from memory_profiler import profile as memory_profile
from line_profiler import LineProfiler
import matplotlib.pyplot as plt
import gc
import resource

class ConcurrencyProfiler:
    """동시성 성능 프로파일러"""
    
    def __init__(self):
        self.results = {}
        self.memory_snapshots = []
        self.cpu_profiles = {}
        
    def profile_function(self, func, *args, **kwargs):
        """함수 프로파일링"""
        # CPU 프로파일링
        profiler = cProfile.Profile()
        
        # 메모리 추적 시작
        tracemalloc.start()
        
        # 실행 시간 측정
        start_time = time.perf_counter()
        start_cpu = time.process_time()
        
        # 함수 실행
        profiler.enable()
        try:
            result = func(*args, **kwargs)
        finally:
            profiler.disable()
        
        # 시간 측정 완료
        end_time = time.perf_counter()
        end_cpu = time.process_time()
        
        # 메모리 스냅샷
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        # 결과 저장
        func_name = func.__name__
        self.results[func_name] = {
            'wall_time': end_time - start_time,
            'cpu_time': end_cpu - start_cpu,
            'memory_current': current,
            'memory_peak': peak,
            'result': result
        }
        
        # CPU 프로파일 저장
        stats = pstats.Stats(profiler)
        self.cpu_profiles[func_name] = stats
        
        return result
    
    def compare_implementations(self, implementations, test_data):
        """구현 방식 비교"""
        comparison_results = {}
        
        for name, impl_func in implementations.items():
            print(f"   프로파일링: {name}")
            
            # 여러 번 실행하여 평균 구하기
            iterations = 3
            total_metrics = {
                'wall_time': 0,
                'cpu_time': 0,
                'memory_peak': 0
            }
            
            for i in range(iterations):
                result = self.profile_function(impl_func, test_data)
                metrics = self.results[impl_func.__name__]
                
                total_metrics['wall_time'] += metrics['wall_time']
                total_metrics['cpu_time'] += metrics['cpu_time']
                total_metrics['memory_peak'] = max(
                    total_metrics['memory_peak'], 
                    metrics['memory_peak']
                )
            
            # 평균 계산
            comparison_results[name] = {
                'avg_wall_time': total_metrics['wall_time'] / iterations,
                'avg_cpu_time': total_metrics['cpu_time'] / iterations,
                'peak_memory': total_metrics['memory_peak']
            }
        
        return comparison_results
    
    def analyze_bottlenecks(self, func_name):
        """병목 분석"""
        if func_name not in self.cpu_profiles:
            return None
        
        stats = self.cpu_profiles[func_name]
        
        # 가장 시간을 많이 소모한 함수들
        print(f"\n   {func_name} 병목 분석:")
        stats.sort_stats('cumulative')
        stats.print_stats(10)  # 상위 10개만 출력
        
        return stats
    
    def get_summary(self):
        """프로파일링 요약"""
        summary = {}
        
        for func_name, metrics in self.results.items():
            summary[func_name] = {
                'wall_time': f"{metrics['wall_time']:.4f}s",
                'cpu_time': f"{metrics['cpu_time']:.4f}s",
                'memory_peak': f"{metrics['memory_peak'] / 1024 / 1024:.2f}MB",
                'cpu_efficiency': f"{(metrics['cpu_time'] / metrics['wall_time'] * 100):.1f}%"
            }
        
        return summary

# 테스트 구현들
def sequential_processing(data):
    """순차 처리"""
    result = []
    for item in data:
        # CPU 집약적 작업 시뮬레이션
        processed = sum(i * i for i in range(item % 100 + 1))
        result.append(processed)
    return result

def threaded_processing(data):
    """스레드 기반 처리"""
    def worker(chunk):
        return [sum(i * i for i in range(item % 100 + 1)) for item in chunk]
    
    chunk_size = len(data) // 4
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(worker, chunk) for chunk in chunks]
        result = []
        for future in futures:
            result.extend(future.result())
    
    return result

def multiprocess_processing(data):
    """멀티프로세스 처리"""
    def worker(chunk):
        return [sum(i * i for i in range(item % 100 + 1)) for item in chunk]
    
    chunk_size = len(data) // 4
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    with ProcessPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(worker, chunk) for chunk in chunks]
        result = []
        for future in futures:
            result.extend(future.result())
    
    return result

async def async_processing(data):
    """비동기 처리"""
    async def worker(chunk):
        result = []
        for item in chunk:
            # I/O 시뮬레이션
            await asyncio.sleep(0.001)
            processed = sum(i * i for i in range(item % 50 + 1))
            result.append(processed)
        return result
    
    chunk_size = len(data) // 4
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    tasks = [worker(chunk) for chunk in chunks]
    results = await asyncio.gather(*tasks)
    
    final_result = []
    for result in results:
        final_result.extend(result)
    
    return final_result

class MemoryMonitor:
    """메모리 사용량 모니터"""
    
    def __init__(self, interval=0.1):
        self.interval = interval
        self.monitoring = False
        self.memory_usage = []
        self.monitor_thread = None
    
    def start_monitoring(self):
        """모니터링 시작"""
        self.monitoring = True
        self.memory_usage = []
        self.monitor_thread = threading.Thread(target=self._monitor_loop, daemon=True)
        self.monitor_thread.start()
    
    def stop_monitoring(self):
        """모니터링 중지"""
        self.monitoring = False
        if self.monitor_thread:
            self.monitor_thread.join()
    
    def _monitor_loop(self):
        """모니터링 루프"""
        while self.monitoring:
            try:
                # 메모리 사용량 측정 (RSS)
                import psutil
                process = psutil.Process()
                memory_mb = process.memory_info().rss / 1024 / 1024
                self.memory_usage.append({
                    'timestamp': time.time(),
                    'memory_mb': memory_mb
                })
                time.sleep(self.interval)
            except Exception as e:
                print(f"   메모리 모니터링 오류: {e}")
                break
    
    def get_peak_memory(self):
        """최대 메모리 사용량"""
        if not self.memory_usage:
            return 0
        return max(entry['memory_mb'] for entry in self.memory_usage)
    
    def get_average_memory(self):
        """평균 메모리 사용량"""
        if not self.memory_usage:
            return 0
        return sum(entry['memory_mb'] for entry in self.memory_usage) / len(self.memory_usage)

def demonstrate_performance_profiling():
    """성능 프로파일링 시연"""
    print("\n1. 동시성 구현 방식 비교:")
    
    # 테스트 데이터
    test_data = list(range(1000))
    
    profiler = ConcurrencyProfiler()
    
    # 구현 방식들
    implementations = {
        'Sequential': sequential_processing,
        'Threading': threaded_processing,
        'Multiprocessing': multiprocess_processing
    }
    
    # 비교 실행
    comparison = profiler.compare_implementations(implementations, test_data)
    
    # 결과 출력
    print("\n   성능 비교 결과:")
    print(f"   {'Method':<15} {'Wall Time':<12} {'CPU Time':<12} {'Memory (MB)':<12}")
    print("   " + "-" * 60)
    
    for method, metrics in comparison.items():
        wall_time = f"{metrics['avg_wall_time']:.4f}s"
        cpu_time = f"{metrics['avg_cpu_time']:.4f}s"
        memory = f"{metrics['peak_memory'] / 1024 / 1024:.2f}MB"
        
        print(f"   {method:<15} {wall_time:<12} {cpu_time:<12} {memory:<12}")
    
    # 상세 프로파일링 요약
    print("\n   프로파일링 요약:")
    summary = profiler.get_summary()
    for func_name, metrics in summary.items():
        print(f"   {func_name}:")
        for metric, value in metrics.items():
            print(f"     {metric}: {value}")
    
    print("\n2. 메모리 사용량 모니터링:")
    
    monitor = MemoryMonitor(interval=0.05)
    
    # 메모리 집약적 작업 테스트
    def memory_intensive_task():
        """메모리 집약적 작업"""
        data = []
        for i in range(100000):
            data.append([j for j in range(i % 100)])
        return len(data)
    
    monitor.start_monitoring()
    
    start_time = time.time()
    result = memory_intensive_task()
    end_time = time.time()
    
    monitor.stop_monitoring()
    
    peak_memory = monitor.get_peak_memory()
    avg_memory = monitor.get_average_memory()
    
    print(f"   작업 결과: {result}")
    print(f"   실행 시간: {end_time - start_time:.3f}초")
    print(f"   최대 메모리: {peak_memory:.2f}MB")
    print(f"   평균 메모리: {avg_memory:.2f}MB")
    
    print("\n3. 동시성 최적화 권장사항:")
    
    # 기본 분석
    fastest_method = min(comparison.items(), key=lambda x: x[1]['avg_wall_time'])
    most_efficient = min(comparison.items(), 
                        key=lambda x: x[1]['peak_memory'] / x[1]['avg_wall_time'])
    
    print(f"   가장 빠른 방법: {fastest_method[0]} "
          f"({fastest_method[1]['avg_wall_time']:.4f}초)")
    print(f"   가장 효율적인 방법: {most_efficient[0]} "
          f"(메모리/시간 비율 기준)")
    
    # 권장사항 출력
    recommendations = [
        "CPU 집약적 작업에는 멀티프로세싱 사용",
        "I/O 집약적 작업에는 비동기 처리 사용",
        "메모리 제약이 있는 환경에서는 스레딩 고려",
        "작은 데이터셋에는 순차 처리가 오버헤드 없이 효율적",
        "프로파일링을 통한 병목 지점 식별 후 최적화"
    ]
    
    print("   최적화 권장사항:")
    for i, rec in enumerate(recommendations, 1):
        print(f"     {i}. {rec}")

demonstrate_performance_profiling()
```

## 6. 연습 문제

### 연습 1: 고급 스레드 풀 관리자
다음 기능을 가진 고급 스레드 풀 관리자를 구현하세요:
- 동적 스레드 수 조정
- 작업 우선순위 처리
- 데드락 감지 및 복구
- 성능 모니터링 및 최적화

### 연습 2: 비동기 데이터 스트리밍 시스템
실시간 데이터 스트리밍을 위한 비동기 시스템을 구현하세요:
- 백프레셔(backpressure) 처리
- 스트림 분기 및 병합
- 오류 복구 및 재시도
- 메트릭스 수집 및 모니터링

### 연습 3: 분산 작업 스케줄러
고가용성 분산 작업 스케줄러를 구현하세요:
- 작업 파티셔닝 및 로드 밸런싱
- 워커 노드 장애 처리
- 작업 결과 수집 및 집계
- 확장성 고려한 아키텍처

### 연습 4: 성능 최적화 프레임워크
동시성 애플리케이션을 위한 성능 최적화 프레임워크를 구현하세요:
- 자동 병목 지점 탐지
- 최적 스레드/프로세스 수 추천
- 메모리 사용량 최적화
- 실시간 성능 모니터링

## 정리

이 챕터에서 학습한 내용:

1. **고급 스레드 풀 관리자**: 우선순위 기반 스레드 풀, 적응형 스케일링
2. **AsyncIO 심화**: 비동기 리소스 풀, 서킷 브레이커, 배치 처리
3. **멀티프로세싱 고급 기법**: 고급 프로세스 간 통신, 분산 데이터 처리
4. **성능 최적화**: 프로파일링 기법, 메모리 사용량 모니터링

다음 챕터에서는 네트워킹과 소켓 프로그래밍을 통해 분산 시스템 구축의 기초를 학습하게 됩니다.

### 핵심 포인트
- 동시성 패턴 선택은 작업의 특성(CPU/I/O 집약적)에 따라 결정해야 합니다
- 고급 동기화 프리미티브를 통해 복잡한 동시성 시나리오를 안전하게 처리할 수 있습니다
- 비동기 프로그래밍은 I/O 집약적 작업에서 뛰어난 성능을 보입니다
- 분산 시스템에서는 장애 처리와 복구 메커니즘이 필수적입니다
- 성능 프로파일링을 통해 병목을 식별하고 최적화할 수 있습니다
- 메모리 효율성과 확장성을 고려한 설계가 중요합니다
</rewritten_file> 