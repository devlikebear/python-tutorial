# Chapter 1: 파이썬 내부 구조와 메모리 관리

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- CPython 인터프리터의 내부 구조와 동작 원리 이해하기
- 파이썬의 메모리 관리 메커니즘과 가비지 컬렉션 분석하기
- 객체 생성과 소멸 과정의 세부 사항 파악하기
- 메모리 프로파일링과 성능 최적화 기법 적용하기
- 메모리 누수 탐지와 해결 방법 구현하기
- 고급 최적화 패턴과 메모리 효율적 코딩 실습하기
- 파이썬 구현체 간의 차이점과 특성 비교하기

## 1. CPython 인터프리터 내부 구조

### 1.1 파이썬 실행 과정과 바이트코드

```python
print("=== CPython 내부 구조 분석 ===")

import dis
import sys
import gc
import weakref
from types import CodeType
import ctypes
import tracemalloc
import linecache
import psutil
import os
from collections import defaultdict

class PythonInternalsAnalyzer:
    """파이썬 내부 구조 분석 도구"""
    
    def __init__(self):
        self.bytecode_cache = {}
        self.memory_snapshots = []
        
    def analyze_bytecode(self, code_or_function):
        """바이트코드 분석"""
        print("\n1. 바이트코드 분석:")
        
        if hasattr(code_or_function, '__code__'):
            code = code_or_function.__code__
            func_name = code_or_function.__name__
        else:
            code = compile(code_or_function, '<string>', 'exec')
            func_name = '<code>'
        
        print(f"   함수/코드: {func_name}")
        print(f"   코드 객체 정보:")
        print(f"     - 인수 개수: {code.co_argcount}")
        print(f"     - 지역 변수 개수: {code.co_nlocals}")
        print(f"     - 스택 크기: {code.co_stacksize}")
        print(f"     - 플래그: {code.co_flags}")
        print(f"     - 상수: {code.co_consts}")
        print(f"     - 변수명: {code.co_varnames}")
        
        print("\n   바이트코드:")
        dis.dis(code)
        
        # 바이트코드 명령어 분석
        bytecode_ops = []
        for instruction in dis.get_instructions(code):
            bytecode_ops.append({
                'offset': instruction.offset,
                'opname': instruction.opname,
                'arg': instruction.arg,
                'argval': instruction.argval
            })
        
        self.bytecode_cache[func_name] = bytecode_ops
        return bytecode_ops
    
    def analyze_frame_stack(self):
        """프레임 스택 분석"""
        print("\n2. 프레임 스택 분석:")
        
        frame = sys._getframe()
        depth = 0
        
        while frame:
            print(f"   프레임 {depth}:")
            print(f"     - 파일: {frame.f_code.co_filename}")
            print(f"     - 함수: {frame.f_code.co_name}")
            print(f"     - 라인: {frame.f_lineno}")
            print(f"     - 지역 변수: {list(frame.f_locals.keys())}")
            print(f"     - 전역 변수: {len(frame.f_globals)} 개")
            
            frame = frame.f_back
            depth += 1
            if depth > 5:  # 너무 깊어지지 않도록 제한
                print("     ... (더 많은 프레임)")
                break
    
    def analyze_interpreter_state(self):
        """인터프리터 상태 분석"""
        print("\n3. 인터프리터 상태:")
        
        print(f"   Python 버전: {sys.version}")
        print(f"   플랫폼: {sys.platform}")
        print(f"   실행 파일: {sys.executable}")
        print(f"   모듈 경로: {len(sys.path)} 개 경로")
        print(f"   로드된 모듈: {len(sys.modules)} 개")
        
        # 인터프리터 플래그
        flags = sys.flags
        print(f"   인터프리터 플래그:")
        print(f"     - debug: {flags.debug}")
        print(f"     - optimize: {flags.optimize}")
        print(f"     - verbose: {flags.verbose}")
        print(f"     - interactive: {flags.interactive}")
        
        # 재귀 한계
        print(f"   재귀 한계: {sys.getrecursionlimit()}")
        
        # 레퍼런스 카운트 정보
        print(f"   총 객체 수: {len(gc.get_objects())}")
        print(f"   가비지 컬렉션 통계: {gc.get_stats()}")

# 실제 분석 수행
def demonstrate_bytecode_analysis():
    """바이트코드 분석 시연"""
    analyzer = PythonInternalsAnalyzer()
    
    # 간단한 함수 정의
    def sample_function(x, y):
        result = x + y
        if result > 10:
            return result * 2
        else:
            return result
    
    # 바이트코드 분석
    analyzer.analyze_bytecode(sample_function)
    
    # 더 복잡한 코드
    complex_code = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

result = fibonacci(5)
"""
    
    print("\n" + "="*50)
    print("복잡한 코드의 바이트코드:")
    analyzer.analyze_bytecode(complex_code)
    
    # 프레임 스택 분석
    analyzer.analyze_frame_stack()
    
    # 인터프리터 상태 분석
    analyzer.analyze_interpreter_state()

demonstrate_bytecode_analysis()
```

### 1.2 객체 모델과 타입 시스템

```python
print("\n=== 파이썬 객체 모델 ===")

class ObjectModelAnalyzer:
    """파이썬 객체 모델 분석"""
    
    def __init__(self):
        self.object_registry = weakref.WeakSet()
    
    def analyze_object_structure(self, obj):
        """객체 구조 분석"""
        print(f"\n객체 분석: {type(obj).__name__}")
        
        # 기본 정보
        print(f"   타입: {type(obj)}")
        print(f"   크기: {sys.getsizeof(obj)} bytes")
        print(f"   ID: {id(obj)}")
        print(f"   해시 가능: {self._is_hashable(obj)}")
        
        # 레퍼런스 카운트 (CPython 전용)
        if hasattr(sys, 'getrefcount'):
            print(f"   레퍼런스 카운트: {sys.getrefcount(obj)}")
        
        # 속성 분석
        if hasattr(obj, '__dict__'):
            print(f"   인스턴스 속성: {list(obj.__dict__.keys())}")
        
        # 타입 정보
        obj_type = type(obj)
        print(f"   타입 정보:")
        print(f"     - MRO: {[cls.__name__ for cls in obj_type.__mro__]}")
        print(f"     - 기본 크기: {obj_type.__basicsize__}")
        print(f"     - 아이템 크기: {obj_type.__itemsize__}")
        
        # 특수 메서드 확인
        special_methods = [attr for attr in dir(obj) if attr.startswith('__') and attr.endswith('__')]
        print(f"   특수 메서드 개수: {len(special_methods)}")
        
        return {
            'type': type(obj),
            'size': sys.getsizeof(obj),
            'id': id(obj),
            'refcount': sys.getrefcount(obj) if hasattr(sys, 'getrefcount') else None,
            'special_methods': len(special_methods)
        }
    
    def _is_hashable(self, obj):
        """해시 가능성 검사"""
        try:
            hash(obj)
            return True
        except TypeError:
            return False
    
    def compare_object_sizes(self):
        """다양한 객체의 크기 비교"""
        print("\n객체 크기 비교:")
        
        objects = [
            ('None', None),
            ('bool', True),
            ('int (small)', 42),
            ('int (large)', 123456789012345),
            ('float', 3.14159),
            ('string (empty)', ''),
            ('string (small)', 'hello'),
            ('string (large)', 'a' * 1000),
            ('list (empty)', []),
            ('list (small)', [1, 2, 3]),
            ('list (large)', list(range(1000))),
            ('dict (empty)', {}),
            ('dict (small)', {'a': 1, 'b': 2}),
            ('set (empty)', set()),
            ('tuple (empty)', ()),
            ('tuple (small)', (1, 2, 3)),
        ]
        
        for name, obj in objects:
            size = sys.getsizeof(obj)
            print(f"   {name:20s}: {size:6d} bytes")
        
        # 컨테이너 오버헤드 분석
        print("\n컨테이너 오버헤드 분석:")
        base_list = []
        for i in range(0, 11):
            current_list = list(range(i))
            size = sys.getsizeof(current_list)
            print(f"   리스트[{i:2d}]: {size:3d} bytes")
    
    def analyze_memory_layout(self):
        """메모리 레이아웃 분석"""
        print("\n메모리 레이아웃 분석:")
        
        # 동일한 값의 객체들이 같은 메모리를 공유하는지 확인
        small_ints = [i for i in range(-5, 257)]
        shared_count = 0
        
        for i in range(len(small_ints) - 1):
            if id(small_ints[i]) == id(small_ints[i]):  # 자기 자신과 비교
                shared_count += 1
        
        print(f"   작은 정수 (-5~256) 메모리 공유 확인:")
        print(f"     - id(-1): {id(-1)}")
        print(f"     - id(0): {id(0)}")
        print(f"     - id(100): {id(100)}")
        print(f"     - id(256): {id(256)}")
        print(f"     - id(257): {id(257)}")
        
        # 문자열 인터닝 확인
        str1 = "hello"
        str2 = "hello"
        str3 = "hello world"
        str4 = "hello world"
        
        print(f"   문자열 인터닝:")
        print(f"     - 'hello' 공유: {id(str1) == id(str2)}")
        print(f"     - 'hello world' 공유: {id(str3) == id(str4)}")
        
        # 리스트와 튜플의 메모리 레이아웃
        list_obj = [1, 2, 3, 4, 5]
        tuple_obj = (1, 2, 3, 4, 5)
        
        print(f"   컨테이너 메모리 비교:")
        print(f"     - 리스트 [1,2,3,4,5]: {sys.getsizeof(list_obj)} bytes")
        print(f"     - 튜플 (1,2,3,4,5): {sys.getsizeof(tuple_obj)} bytes")

def demonstrate_object_model():
    """객체 모델 시연"""
    analyzer = ObjectModelAnalyzer()
    
    # 다양한 객체 분석
    test_objects = [
        42,
        "Hello, World!",
        [1, 2, 3],
        {'key': 'value'},
        lambda x: x * 2
    ]
    
    for obj in test_objects:
        analyzer.analyze_object_structure(obj)
    
    # 객체 크기 비교
    analyzer.compare_object_sizes()
    
    # 메모리 레이아웃 분석
    analyzer.analyze_memory_layout()

demonstrate_object_model()
```

## 2. 메모리 관리와 가비지 컬렉션

### 2.1 메모리 할당과 해제 메커니즘

```python
print("\n=== 메모리 관리 시스템 ===")

class MemoryManager:
    """메모리 관리 분석 도구"""
    
    def __init__(self):
        self.allocation_tracking = []
        self.gc_stats_history = []
    
    def analyze_memory_allocation(self):
        """메모리 할당 패턴 분석"""
        print("\n1. 메모리 할당 패턴:")
        
        # 프로세스 메모리 정보
        process = psutil.Process(os.getpid())
        memory_info = process.memory_info()
        
        print(f"   프로세스 메모리 정보:")
        print(f"     - RSS (물리 메모리): {memory_info.rss / 1024 / 1024:.2f} MB")
        print(f"     - VMS (가상 메모리): {memory_info.vms / 1024 / 1024:.2f} MB")
        
        # 파이썬 메모리 풀 정보
        print(f"   파이썬 내부 메모리:")
        
        # 가비지 컬렉션 통계
        gc_stats = gc.get_stats()
        print(f"     - GC 세대별 통계: {gc_stats}")
        
        # 객체 생성과 할당 추적
        initial_objects = len(gc.get_objects())
        
        # 대량 객체 생성
        test_objects = []
        for i in range(1000):
            test_objects.append({
                'id': i,
                'data': [j for j in range(10)],
                'name': f'object_{i}'
            })
        
        after_objects = len(gc.get_objects())
        print(f"     - 객체 생성 전: {initial_objects}")
        print(f"     - 객체 생성 후: {after_objects}")
        print(f"     - 증가한 객체: {after_objects - initial_objects}")
        
        # 메모리 사용량 변화
        new_memory_info = process.memory_info()
        memory_increase = (new_memory_info.rss - memory_info.rss) / 1024 / 1024
        print(f"     - 메모리 증가: {memory_increase:.2f} MB")
        
        return test_objects
    
    def analyze_garbage_collection(self):
        """가비지 컬렉션 분석"""
        print("\n2. 가비지 컬렉션 분석:")
        
        # GC 임계값 확인
        thresholds = gc.get_threshold()
        print(f"   GC 임계값: {thresholds}")
        
        # GC 통계 수집
        initial_stats = gc.get_stats()
        counts_before = gc.get_count()
        
        print(f"   컬렉션 전 카운트: {counts_before}")
        
        # 순환 참조 생성
        circular_refs = self._create_circular_references(100)
        
        # 강제 가비지 컬렉션 수행
        collected = gc.collect()
        
        counts_after = gc.get_count()
        final_stats = gc.get_stats()
        
        print(f"   컬렉션 후 카운트: {counts_after}")
        print(f"   수집된 객체 수: {collected}")
        
        # 세대별 수집 통계
        for i, (initial, final) in enumerate(zip(initial_stats, final_stats)):
            print(f"   세대 {i}:")
            print(f"     - 수집 전: {initial['collections']}회")
            print(f"     - 수집 후: {final['collections']}회")
            print(f"     - 수집된 객체: {final['collected']}개")
        
        return circular_refs
    
    def _create_circular_references(self, count):
        """순환 참조 객체 생성"""
        objects = []
        
        for i in range(count):
            obj_a = {'name': f'A_{i}'}
            obj_b = {'name': f'B_{i}'}
            
            # 순환 참조 생성
            obj_a['ref'] = obj_b
            obj_b['ref'] = obj_a
            
            objects.append((obj_a, obj_b))
        
        return objects
    
    def analyze_memory_pools(self):
        """메모리 풀 분석"""
        print("\n3. 메모리 풀 분석:")
        
        # 다양한 크기의 객체 생성으로 풀 사용 패턴 확인
        small_objects = [i for i in range(1000)]  # 작은 정수
        medium_objects = ['x' * i for i in range(1, 100)]  # 중간 크기 문자열
        large_objects = [list(range(i * 100)) for i in range(1, 10)]  # 큰 리스트
        
        print(f"   생성된 객체:")
        print(f"     - 작은 객체: {len(small_objects)}개")
        print(f"     - 중간 객체: {len(medium_objects)}개")
        print(f"     - 큰 객체: {len(large_objects)}개")
        
        # 메모리 사용량 확인
        total_size = (sum(sys.getsizeof(obj) for obj in small_objects) +
                     sum(sys.getsizeof(obj) for obj in medium_objects) +
                     sum(sys.getsizeof(obj) for obj in large_objects))
        
        print(f"   총 메모리 사용량: {total_size / 1024:.2f} KB")
        
        # 객체 해제
        del small_objects, medium_objects, large_objects
        
        # 가비지 컬렉션 수행
        collected = gc.collect()
        print(f"   해제 후 수집된 객체: {collected}개")
    
    def memory_profiling_demo(self):
        """메모리 프로파일링 데모"""
        print("\n4. 메모리 프로파일링:")
        
        # tracemalloc 시작
        tracemalloc.start()
        
        # 메모리 사용 코드 실행
        data = {}
        for i in range(1000):
            key = f"key_{i}"
            value = [j for j in range(i % 50)]
            data[key] = value
        
        # 첫 번째 스냅샷
        snapshot1 = tracemalloc.take_snapshot()
        
        # 추가 메모리 사용
        more_data = []
        for i in range(500):
            more_data.append({
                'id': i,
                'content': 'x' * (i % 100),
                'nested': {'value': i * 2}
            })
        
        # 두 번째 스냅샷
        snapshot2 = tracemalloc.take_snapshot()
        
        # 메모리 차이 분석
        top_stats = snapshot2.compare_to(snapshot1, 'lineno')
        
        print("   메모리 증가 상위 5개 위치:")
        for index, stat in enumerate(top_stats[:5], 1):
            print(f"     {index}. {stat}")
        
        # 현재 메모리 사용량
        current, peak = tracemalloc.get_traced_memory()
        print(f"   현재 메모리: {current / 1024 / 1024:.2f} MB")
        print(f"   최대 메모리: {peak / 1024 / 1024:.2f} MB")
        
        tracemalloc.stop()
        
        return data, more_data

def demonstrate_memory_management():
    """메모리 관리 시연"""
    manager = MemoryManager()
    
    # 메모리 할당 분석
    test_objects = manager.analyze_memory_allocation()
    
    # 가비지 컬렉션 분석
    circular_refs = manager.analyze_garbage_collection()
    
    # 메모리 풀 분석
    manager.analyze_memory_pools()
    
    # 메모리 프로파일링
    data, more_data = manager.memory_profiling_demo()
    
    return test_objects, circular_refs, data, more_data

demonstrate_memory_management()
```

### 2.2 메모리 누수 탐지와 최적화

```python
print("\n=== 메모리 누수 탐지와 최적화 ===")

class MemoryLeakDetector:
    """메모리 누수 탐지 도구"""
    
    def __init__(self):
        self.snapshots = []
        self.leak_patterns = []
        
    def start_monitoring(self):
        """메모리 모니터링 시작"""
        tracemalloc.start()
        gc.set_debug(gc.DEBUG_STATS)
        
    def stop_monitoring(self):
        """메모리 모니터링 중지"""
        tracemalloc.stop()
        gc.set_debug(0)
    
    def take_snapshot(self, label=""):
        """메모리 스냅샷 생성"""
        snapshot = {
            'label': label,
            'tracemalloc': tracemalloc.take_snapshot(),
            'gc_objects': len(gc.get_objects()),
            'gc_stats': gc.get_stats(),
            'process_memory': psutil.Process(os.getpid()).memory_info().rss
        }
        self.snapshots.append(snapshot)
        return snapshot
    
    def analyze_memory_growth(self):
        """메모리 증가 패턴 분석"""
        if len(self.snapshots) < 2:
            print("   분석을 위해 최소 2개의 스냅샷이 필요합니다.")
            return
        
        print("\n메모리 증가 패턴 분석:")
        
        for i in range(1, len(self.snapshots)):
            prev = self.snapshots[i-1]
            curr = self.snapshots[i]
            
            # 객체 수 변화
            obj_growth = curr['gc_objects'] - prev['gc_objects']
            
            # 프로세스 메모리 변화
            memory_growth = (curr['process_memory'] - prev['process_memory']) / 1024 / 1024
            
            print(f"   {prev['label']} → {curr['label']}:")
            print(f"     - 객체 증가: {obj_growth:+d}")
            print(f"     - 메모리 증가: {memory_growth:+.2f} MB")
            
            # tracemalloc 비교
            if prev['tracemalloc'] and curr['tracemalloc']:
                top_stats = curr['tracemalloc'].compare_to(prev['tracemalloc'], 'lineno')
                print(f"     - 주요 증가 위치:")
                for stat in top_stats[:3]:
                    print(f"       {stat}")
    
    def detect_memory_leaks(self):
        """메모리 누수 탐지"""
        print("\n메모리 누수 탐지:")
        
        # 강력한 참조 순환 탐지
        circular_refs = []
        all_objects = gc.get_objects()
        
        for obj in all_objects:
            if hasattr(obj, '__dict__'):
                for attr_name, attr_value in obj.__dict__.items():
                    if attr_value is obj:
                        circular_refs.append((obj, attr_name))
        
        print(f"   자기 참조 객체: {len(circular_refs)}개")
        
        # 가비지 컬렉션으로 수집되지 않는 객체 확인
        gc.collect()  # 강제 수집
        
        # 도달 불가능하지만 수집되지 않은 객체
        uncollectable = gc.garbage
        print(f"   수집 불가능한 객체: {len(uncollectable)}개")
        
        if uncollectable:
            print("   수집 불가능한 객체 유형:")
            type_counts = defaultdict(int)
            for obj in uncollectable:
                type_counts[type(obj).__name__] += 1
            
            for obj_type, count in type_counts.items():
                print(f"     - {obj_type}: {count}개")
        
        return circular_refs, uncollectable
    
    def optimize_memory_usage(self):
        """메모리 사용 최적화 기법"""
        print("\n메모리 최적화 기법:")
        
        # 1. __slots__ 사용 효과
        print("   1. __slots__ 최적화:")
        
        class RegularClass:
            def __init__(self, x, y):
                self.x = x
                self.y = y
        
        class SlottedClass:
            __slots__ = ['x', 'y']
            def __init__(self, x, y):
                self.x = x
                self.y = y
        
        regular_obj = RegularClass(1, 2)
        slotted_obj = SlottedClass(1, 2)
        
        regular_size = sys.getsizeof(regular_obj) + sys.getsizeof(regular_obj.__dict__)
        slotted_size = sys.getsizeof(slotted_obj)
        
        print(f"     - 일반 클래스: {regular_size} bytes")
        print(f"     - __slots__ 클래스: {slotted_size} bytes")
        print(f"     - 절약된 메모리: {regular_size - slotted_size} bytes ({((regular_size - slotted_size) / regular_size * 100):.1f}%)")
        
        # 2. 제너레이터 vs 리스트
        print("\n   2. 제너레이터 vs 리스트:")
        
        def create_list(n):
            return [i for i in range(n)]
        
        def create_generator(n):
            return (i for i in range(n))
        
        n = 10000
        list_obj = create_list(n)
        gen_obj = create_generator(n)
        
        list_size = sys.getsizeof(list_obj)
        gen_size = sys.getsizeof(gen_obj)
        
        print(f"     - 리스트 ({n}개 요소): {list_size} bytes")
        print(f"     - 제너레이터: {gen_size} bytes")
        print(f"     - 메모리 절약: {list_size - gen_size} bytes")
        
        # 3. 문자열 최적화
        print("\n   3. 문자열 최적화:")
        
        # 문자열 연결 비교
        import time
        
        # 비효율적인 방법
        start_time = time.time()
        result1 = ""
        for i in range(1000):
            result1 += f"item_{i} "
        inefficient_time = time.time() - start_time
        
        # 효율적인 방법
        start_time = time.time()
        parts = []
        for i in range(1000):
            parts.append(f"item_{i} ")
        result2 = "".join(parts)
        efficient_time = time.time() - start_time
        
        print(f"     - 문자열 연결 (+= 연산): {inefficient_time:.4f}초")
        print(f"     - join() 사용: {efficient_time:.4f}초")
        print(f"     - 성능 향상: {inefficient_time / efficient_time:.1f}배")
        
        return regular_obj, slotted_obj, list_obj, gen_obj

class MemoryOptimizationPatterns:
    """메모리 최적화 패턴"""
    
    def __init__(self):
        self.optimizations = {}
    
    def lazy_loading_pattern(self):
        """지연 로딩 패턴"""
        print("\n지연 로딩 패턴:")
        
        class LazyDataLoader:
            def __init__(self):
                self._data = None
                self._computed = False
            
            @property
            def data(self):
                if not self._computed:
                    print("     - 데이터 로딩 중...")
                    # 무거운 계산이나 I/O 작업 시뮬레이션
                    self._data = [i ** 2 for i in range(10000)]
                    self._computed = True
                return self._data
        
        loader = LazyDataLoader()
        print(f"   객체 생성 후 크기: {sys.getsizeof(loader)} bytes")
        
        # 첫 번째 접근
        data = loader.data
        print(f"   데이터 로딩 후 크기: {sys.getsizeof(loader)} bytes")
        print(f"   데이터 크기: {sys.getsizeof(data)} bytes")
        
        return loader
    
    def object_pooling_pattern(self):
        """객체 풀링 패턴"""
        print("\n객체 풀링 패턴:")
        
        class ObjectPool:
            def __init__(self, create_func, max_size=10):
                self._create_func = create_func
                self._pool = []
                self._max_size = max_size
                self._created_count = 0
                self._reused_count = 0
            
            def acquire(self):
                if self._pool:
                    obj = self._pool.pop()
                    self._reused_count += 1
                    return obj
                else:
                    obj = self._create_func()
                    self._created_count += 1
                    return obj
            
            def release(self, obj):
                if len(self._pool) < self._max_size:
                    # 객체 재설정
                    if hasattr(obj, 'reset'):
                        obj.reset()
                    self._pool.append(obj)
            
            def get_stats(self):
                return {
                    'created': self._created_count,
                    'reused': self._reused_count,
                    'pool_size': len(self._pool)
                }
        
        class ExpensiveObject:
            def __init__(self):
                self.data = [i for i in range(100)]
                self.state = "initialized"
            
            def reset(self):
                self.state = "reset"
        
        # 풀 사용 시뮬레이션
        pool = ObjectPool(ExpensiveObject, max_size=5)
        
        objects = []
        for i in range(10):
            obj = pool.acquire()
            objects.append(obj)
        
        for obj in objects:
            pool.release(obj)
        
        # 재사용 확인
        for i in range(5):
            obj = pool.acquire()
            pool.release(obj)
        
        stats = pool.get_stats()
        print(f"   생성된 객체: {stats['created']}개")
        print(f"   재사용된 객체: {stats['reused']}개")
        print(f"   풀 크기: {stats['pool_size']}개")
        
        return pool
    
    def weak_reference_pattern(self):
        """약한 참조 패턴"""
        print("\n약한 참조 패턴:")
        
        class CacheWithWeakRefs:
            def __init__(self):
                self._cache = weakref.WeakValueDictionary()
                self._access_count = 0
                self._miss_count = 0
            
            def get_object(self, key, create_func):
                self._access_count += 1
                
                obj = self._cache.get(key)
                if obj is None:
                    self._miss_count += 1
                    obj = create_func(key)
                    self._cache[key] = obj
                
                return obj
            
            def get_stats(self):
                return {
                    'cache_size': len(self._cache),
                    'access_count': self._access_count,
                    'miss_count': self._miss_count,
                    'hit_rate': ((self._access_count - self._miss_count) / self._access_count * 100) if self._access_count > 0 else 0
                }
        
        def create_expensive_object(key):
            return {'key': key, 'data': [i for i in range(100)]}
        
        cache = CacheWithWeakRefs()
        
        # 객체 생성과 접근
        obj1 = cache.get_object('key1', create_expensive_object)
        obj2 = cache.get_object('key2', create_expensive_object)
        obj1_again = cache.get_object('key1', create_expensive_object)  # 캐시 히트
        
        print(f"   obj1 is obj1_again: {obj1 is obj1_again}")
        
        # 객체 해제 후 가비지 컬렉션
        del obj1, obj1_again
        gc.collect()
        
        obj1_new = cache.get_object('key1', create_expensive_object)  # 새로 생성
        
        stats = cache.get_stats()
        print(f"   캐시 크기: {stats['cache_size']}")
        print(f"   접근 횟수: {stats['access_count']}")
        print(f"   미스 횟수: {stats['miss_count']}")
        print(f"   히트율: {stats['hit_rate']:.1f}%")
        
        return cache

def demonstrate_leak_detection():
    """메모리 누수 탐지 시연"""
    detector = MemoryLeakDetector()
    
    detector.start_monitoring()
    
    # 초기 스냅샷
    detector.take_snapshot("시작")
    
    # 메모리 사용 시뮬레이션
    data = []
    for i in range(1000):
        data.append({'id': i, 'content': 'x' * (i % 100)})
    
    detector.take_snapshot("데이터 생성 후")
    
    # 추가 메모리 사용
    more_data = {i: [j for j in range(i % 50)] for i in range(500)}
    
    detector.take_snapshot("추가 데이터 후")
    
    # 분석 수행
    detector.analyze_memory_growth()
    circular_refs, uncollectable = detector.detect_memory_leaks()
    
    # 최적화 기법 적용
    regular_obj, slotted_obj, list_obj, gen_obj = detector.optimize_memory_usage()
    
    detector.stop_monitoring()
    
    # 최적화 패턴 시연
    patterns = MemoryOptimizationPatterns()
    lazy_loader = patterns.lazy_loading_pattern()
    object_pool = patterns.object_pooling_pattern()
    weak_cache = patterns.weak_reference_pattern()
    
    return detector, patterns

demonstrate_leak_detection()
```

## 3. 성능 프로파일링과 최적화

### 3.1 프로파일링 도구와 기법

```python
print("\n=== 성능 프로파일링 ===")

import cProfile
import pstats
import timeit
import functools
import threading
import multiprocessing
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import asyncio

class PerformanceProfiler:
    """성능 프로파일링 도구"""
    
    def __init__(self):
        self.profiling_results = {}
        self.benchmarks = {}
    
    def profile_function(self, func, *args, **kwargs):
        """함수 프로파일링"""
        print(f"\n함수 프로파일링: {func.__name__}")
        
        # cProfile을 사용한 프로파일링
        profiler = cProfile.Profile()
        
        profiler.enable()
        result = func(*args, **kwargs)
        profiler.disable()
        
        # 통계 생성
        stats = pstats.Stats(profiler)
        stats.sort_stats('cumulative')
        
        print("   상위 함수 호출:")
        stats.print_stats(10)
        
        # 결과 저장
        self.profiling_results[func.__name__] = {
            'stats': stats,
            'result': result
        }
        
        return result
    
    def time_function(self, func, *args, setup_code="", number=1000):
        """함수 실행 시간 측정"""
        print(f"\n실행 시간 측정: {func.__name__}")
        
        # timeit을 사용한 정확한 시간 측정
        func_code = f"{func.__name__}(*{args})"
        
        # 단일 실행 시간
        single_time = timeit.timeit(
            lambda: func(*args),
            number=1
        )
        
        # 평균 실행 시간
        avg_time = timeit.timeit(
            lambda: func(*args),
            number=number
        ) / number
        
        print(f"   단일 실행: {single_time:.6f}초")
        print(f"   평균 실행 ({number}회): {avg_time:.6f}초")
        
        self.benchmarks[func.__name__] = {
            'single_time': single_time,
            'avg_time': avg_time,
            'iterations': number
        }
        
        return single_time, avg_time
    
    def memory_profile_function(self, func, *args, **kwargs):
        """메모리 사용량 프로파일링"""
        print(f"\n메모리 프로파일링: {func.__name__}")
        
        tracemalloc.start()
        
        # 실행 전 메모리
        before_memory = tracemalloc.get_traced_memory()[0]
        
        result = func(*args, **kwargs)
        
        # 실행 후 메모리
        after_memory = tracemalloc.get_traced_memory()[0]
        
        snapshot = tracemalloc.take_snapshot()
        top_stats = snapshot.statistics('lineno')
        
        print(f"   메모리 사용량 증가: {(after_memory - before_memory) / 1024:.2f} KB")
        print("   메모리 할당 상위 5개:")
        for stat in top_stats[:5]:
            print(f"     {stat}")
        
        tracemalloc.stop()
        
        return result
    
    def compare_implementations(self, implementations, test_data, iterations=1000):
        """여러 구현 방식 비교"""
        print(f"\n구현 방식 비교 ({iterations}회 실행):")
        
        results = {}
        
        for name, func in implementations.items():
            start_time = timeit.default_timer()
            
            for _ in range(iterations):
                func(test_data)
            
            end_time = timeit.default_timer()
            total_time = end_time - start_time
            avg_time = total_time / iterations
            
            results[name] = {
                'total_time': total_time,
                'avg_time': avg_time
            }
            
            print(f"   {name}: {total_time:.4f}초 (평균: {avg_time:.6f}초)")
        
        # 가장 빠른 구현 찾기
        fastest = min(results.items(), key=lambda x: x[1]['avg_time'])
        print(f"\n   가장 빠른 구현: {fastest[0]}")
        
        # 상대적 성능 비교
        print("   상대적 성능:")
        for name, result in results.items():
            ratio = result['avg_time'] / fastest[1]['avg_time']
            print(f"     {name}: {ratio:.2f}배 {'(기준)' if name == fastest[0] else ''}")
        
        return results

# 프로파일링 데모 함수들
def fibonacci_recursive(n):
    """재귀적 피보나치 (비효율적)"""
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

def fibonacci_iterative(n):
    """반복적 피보나치 (효율적)"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

@functools.lru_cache(maxsize=None)
def fibonacci_memoized(n):
    """메모이제이션 피보나치"""
    if n <= 1:
        return n
    return fibonacci_memoized(n-1) + fibonacci_memoized(n-2)

def sorting_comparison_demo():
    """정렬 알고리즘 비교"""
    import random
    
    def bubble_sort(arr):
        arr = arr.copy()
        n = len(arr)
        for i in range(n):
            for j in range(0, n-i-1):
                if arr[j] > arr[j+1]:
                    arr[j], arr[j+1] = arr[j+1], arr[j]
        return arr
    
    def quick_sort(arr):
        if len(arr) <= 1:
            return arr
        pivot = arr[len(arr) // 2]
        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]
        return quick_sort(left) + middle + quick_sort(right)
    
    def builtin_sort(arr):
        return sorted(arr)
    
    # 테스트 데이터
    test_data = [random.randint(1, 1000) for _ in range(100)]
    
    # 구현 비교
    implementations = {
        'bubble_sort': bubble_sort,
        'quick_sort': quick_sort,
        'builtin_sorted': builtin_sort
    }
    
    profiler = PerformanceProfiler()
    results = profiler.compare_implementations(implementations, test_data, iterations=100)
    
    return results

def demonstrate_profiling():
    """프로파일링 시연"""
    profiler = PerformanceProfiler()
    
    # 피보나치 구현 비교
    print("=== 피보나치 구현 비교 ===")
    
    n = 25
    
    # 재귀적 구현 (작은 n으로 제한)
    recursive_time = profiler.time_function(fibonacci_recursive, 20, number=1)
    
    # 반복적 구현
    iterative_time = profiler.time_function(fibonacci_iterative, n, number=1000)
    
    # 메모이제이션 구현
    memoized_time = profiler.time_function(fibonacci_memoized, n, number=1000)
    
    # 메모리 프로파일링
    print("\n메모리 사용량 비교:")
    profiler.memory_profile_function(fibonacci_iterative, n)
    profiler.memory_profile_function(fibonacci_memoized, n)
    
    # 정렬 알고리즘 비교
    print("\n=== 정렬 알고리즘 비교 ===")
    sorting_results = sorting_comparison_demo()
    
    return profiler

demonstrate_profiling()
```

### 3.2 고급 최적화 기법

```python
print("\n=== 고급 최적화 기법 ===")

class AdvancedOptimizations:
    """고급 최적화 기법"""
    
    def __init__(self):
        self.optimization_results = {}
    
    def cpu_intensive_optimization(self):
        """CPU 집약적 작업 최적화"""
        print("\n1. CPU 집약적 작업 최적화:")
        
        # 벡터화 연산 시뮬레이션
        def naive_matrix_multiply(a, b):
            """순수 Python 행렬 곱셈"""
            result = []
            for i in range(len(a)):
                row = []
                for j in range(len(b[0])):
                    sum_val = 0
                    for k in range(len(b)):
                        sum_val += a[i][k] * b[k][j]
                    row.append(sum_val)
                result.append(row)
            return result
        
        def optimized_matrix_multiply(a, b):
            """최적화된 행렬 곱셈 (리스트 컴프리헨션)"""
            return [[sum(a[i][k] * b[k][j] for k in range(len(b)))
                    for j in range(len(b[0]))]
                   for i in range(len(a))]
        
        # 테스트 데이터
        size = 50
        matrix_a = [[i+j for j in range(size)] for i in range(size)]
        matrix_b = [[i*j for j in range(size)] for i in range(size)]
        
        # 성능 비교
        naive_time = timeit.timeit(
            lambda: naive_matrix_multiply(matrix_a, matrix_b),
            number=1
        )
        
        optimized_time = timeit.timeit(
            lambda: optimized_matrix_multiply(matrix_a, matrix_b),
            number=1
        )
        
        print(f"   순수 Python: {naive_time:.4f}초")
        print(f"   최적화 버전: {optimized_time:.4f}초")
        print(f"   성능 향상: {naive_time / optimized_time:.2f}배")
        
        return naive_time, optimized_time
    
    def io_intensive_optimization(self):
        """I/O 집약적 작업 최적화"""
        print("\n2. I/O 집약적 작업 최적화:")
        
        import asyncio
        import aiohttp
        import requests
        from concurrent.futures import ThreadPoolExecutor
        
        # 동기 방식
        def fetch_urls_sync(urls):
            """동기 방식 URL 요청 시뮬레이션"""
            import time
            results = []
            for url in urls:
                # 실제 HTTP 요청 대신 시간 지연으로 시뮬레이션
                time.sleep(0.1)  # 100ms 지연
                results.append(f"Content from {url}")
            return results
        
        # 스레드 풀 방식
        def fetch_urls_threaded(urls):
            """스레드 풀을 사용한 병렬 처리"""
            import time
            
            def fetch_single(url):
                time.sleep(0.1)  # 100ms 지연
                return f"Content from {url}"
            
            with ThreadPoolExecutor(max_workers=5) as executor:
                results = list(executor.map(fetch_single, urls))
            return results
        
        # 비동기 방식 시뮬레이션
        async def fetch_urls_async(urls):
            """비동기 방식 URL 요청"""
            async def fetch_single(url):
                await asyncio.sleep(0.1)  # 100ms 지연
                return f"Content from {url}"
            
            tasks = [fetch_single(url) for url in urls]
            return await asyncio.gather(*tasks)
        
        # 테스트 URL 목록
        test_urls = [f"http://example.com/page{i}" for i in range(10)]
        
        # 성능 비교
        sync_time = timeit.timeit(
            lambda: fetch_urls_sync(test_urls),
            number=1
        )
        
        threaded_time = timeit.timeit(
            lambda: fetch_urls_threaded(test_urls),
            number=1
        )
        
        # 비동기 실행 시간 측정
        async_start = timeit.default_timer()
        asyncio.run(fetch_urls_async(test_urls))
        async_time = timeit.default_timer() - async_start
        
        print(f"   동기 방식: {sync_time:.4f}초")
        print(f"   스레드 풀: {threaded_time:.4f}초")
        print(f"   비동기: {async_time:.4f}초")
        print(f"   스레드 풀 향상: {sync_time / threaded_time:.2f}배")
        print(f"   비동기 향상: {sync_time / async_time:.2f}배")
        
        return sync_time, threaded_time, async_time
    
    def memory_access_optimization(self):
        """메모리 접근 최적화"""
        print("\n3. 메모리 접근 패턴 최적화:")
        
        # 캐시 친화적 vs 비친화적 메모리 접근
        def row_major_access(matrix):
            """행 우선 접근 (캐시 친화적)"""
            total = 0
            for i in range(len(matrix)):
                for j in range(len(matrix[0])):
                    total += matrix[i][j]
            return total
        
        def column_major_access(matrix):
            """열 우선 접근 (캐시 비친화적)"""
            total = 0
            for j in range(len(matrix[0])):
                for i in range(len(matrix)):
                    total += matrix[i][j]
            return total
        
        # 큰 2D 배열 생성
        size = 1000
        large_matrix = [[i + j for j in range(size)] for i in range(size)]
        
        # 성능 비교
        row_time = timeit.timeit(
            lambda: row_major_access(large_matrix),
            number=10
        )
        
        col_time = timeit.timeit(
            lambda: column_major_access(large_matrix),
            number=10
        )
        
        print(f"   행 우선 접근: {row_time:.4f}초")
        print(f"   열 우선 접근: {col_time:.4f}초")
        print(f"   성능 차이: {col_time / row_time:.2f}배")
        
        return row_time, col_time
    
    def algorithmic_optimization(self):
        """알고리즘 최적화"""
        print("\n4. 알고리즘 최적화:")
        
        # 중복 계산 제거 (메모이제이션)
        def expensive_calculation(n):
            """비용이 큰 계산 시뮬레이션"""
            result = 0
            for i in range(n):
                result += i ** 2
            return result
        
        # 메모이제이션 적용
        @functools.lru_cache(maxsize=128)
        def memoized_calculation(n):
            """메모이제이션이 적용된 계산"""
            result = 0
            for i in range(n):
                result += i ** 2
            return result
        
        # 반복 계산 시나리오
        test_values = [100, 200, 100, 300, 200, 100]  # 중복 값 포함
        
        # 메모이제이션 없이
        start_time = timeit.default_timer()
        for val in test_values:
            expensive_calculation(val)
        no_memo_time = timeit.default_timer() - start_time
        
        # 메모이제이션 적용
        start_time = timeit.default_timer()
        for val in test_values:
            memoized_calculation(val)
        memo_time = timeit.default_timer() - start_time
        
        print(f"   메모이제이션 없음: {no_memo_time:.4f}초")
        print(f"   메모이제이션 적용: {memo_time:.4f}초")
        print(f"   성능 향상: {no_memo_time / memo_time:.2f}배")
        
        # 캐시 통계
        cache_info = memoized_calculation.cache_info()
        print(f"   캐시 히트: {cache_info.hits}")
        print(f"   캐시 미스: {cache_info.misses}")
        print(f"   히트율: {cache_info.hits / (cache_info.hits + cache_info.misses) * 100:.1f}%")
        
        return no_memo_time, memo_time
    
    def data_structure_optimization(self):
        """데이터 구조 최적화"""
        print("\n5. 데이터 구조 최적화:")
        
        import array
        import collections
        
        # 리스트 vs array
        python_list = [i for i in range(10000)]
        int_array = array.array('i', range(10000))
        
        list_size = sys.getsizeof(python_list)
        array_size = sys.getsizeof(int_array)
        
        print(f"   Python 리스트: {list_size} bytes")
        print(f"   array.array: {array_size} bytes")
        print(f"   메모리 절약: {(list_size - array_size) / list_size * 100:.1f}%")
        
        # 검색 성능 비교
        test_list = list(range(10000))
        test_set = set(range(10000))
        test_dict = {i: i for i in range(10000)}
        
        search_value = 9999
        
        # 리스트 검색
        list_time = timeit.timeit(
            lambda: search_value in test_list,
            number=1000
        )
        
        # 집합 검색
        set_time = timeit.timeit(
            lambda: search_value in test_set,
            number=1000
        )
        
        # 딕셔너리 검색
        dict_time = timeit.timeit(
            lambda: search_value in test_dict,
            number=1000
        )
        
        print(f"\n   검색 성능 (1000회 평균):")
        print(f"     리스트: {list_time:.6f}초")
        print(f"     집합: {set_time:.6f}초")
        print(f"     딕셔너리: {dict_time:.6f}초")
        print(f"     집합 향상: {list_time / set_time:.0f}배")
        print(f"     딕셔너리 향상: {list_time / dict_time:.0f}배")
        
        return list_time, set_time, dict_time

def demonstrate_advanced_optimizations():
    """고급 최적화 기법 시연"""
    optimizer = AdvancedOptimizations()
    
    # 각 최적화 기법 실행
    cpu_results = optimizer.cpu_intensive_optimization()
    io_results = optimizer.io_intensive_optimization()
    memory_results = optimizer.memory_access_optimization()
    algo_results = optimizer.algorithmic_optimization()
    ds_results = optimizer.data_structure_optimization()
    
    print("\n=== 최적화 요약 ===")
    print(f"CPU 최적화 향상: {cpu_results[0] / cpu_results[1]:.2f}배")
    print(f"I/O 최적화 향상 (스레드): {io_results[0] / io_results[1]:.2f}배")
    print(f"I/O 최적화 향상 (비동기): {io_results[0] / io_results[2]:.2f}배")
    print(f"메모리 접근 최적화: {memory_results[1] / memory_results[0]:.2f}배 느림 (열 우선)")
    print(f"알고리즘 최적화: {algo_results[0] / algo_results[1]:.2f}배")
    print(f"데이터 구조 최적화: {ds_results[0] / ds_results[1]:.0f}배 (집합)")
    
    return optimizer

demonstrate_advanced_optimizations()
```

## 4. 연습 문제

### 연습 1: 커스텀 가비지 컬렉터
약한 참조를 활용한 커스텀 가비지 컬렉터를 구현하세요:
- 순환 참조 탐지
- 자동 정리 기능
- 통계 수집

### 연습 2: 메모리 풀 관리자
효율적인 메모리 풀 관리자를 구현하세요:
- 크기별 풀 분할
- 동적 확장/축소
- 통계 모니터링

### 연습 3: 성능 프로파일러
종합적인 성능 분석 도구를 구현하세요:
- 함수별 실행 시간
- 메모리 사용량 추적
- 병목 지점 식별

### 연습 4: 최적화 컨설턴트
코드 최적화 제안 시스템을 구현하세요:
- 성능 문제 자동 탐지
- 최적화 제안 생성
- 개선 효과 측정

## 정리

이 챕터에서 학습한 내용:

1. **CPython 내부 구조**: 바이트코드, 프레임 스택, 객체 모델의 이해
2. **메모리 관리**: 할당/해제 메커니즘, 가비지 컬렉션의 동작 원리
3. **메모리 최적화**: 누수 탐지, 효율적 패턴, 최적화 기법
4. **성능 프로파일링**: 도구 활용, 병목 지점 식별, 측정 방법
5. **고급 최적화**: CPU/I/O 최적화, 알고리즘 개선, 데이터 구조 선택
6. **실무 패턴**: 지연 로딩, 객체 풀링, 약한 참조 활용
7. **성능 분석**: 벤치마킹, 비교 분석, 통계적 접근

다음 챕터에서는 메타클래스와 디스크립터를 통한 더욱 고급 파이썬 기법을 학습하게 됩니다.

### 핵심 포인트
- Python의 내부 동작을 이해하면 더 효율적인 코드를 작성할 수 있습니다
- 메모리 관리는 성능과 안정성에 직결되는 중요한 요소입니다
- 최적화는 측정을 통해 검증되어야 합니다
- 적절한 데이터 구조와 알고리즘 선택이 성능에 큰 영향을 미칩니다
- 프로파일링 도구를 활용하여 객관적인 성능 분석을 수행하세요
- 최적화는 코드의 가독성과 유지보수성을 고려하여 적용해야 합니다