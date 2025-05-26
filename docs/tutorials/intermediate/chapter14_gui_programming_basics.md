# Chapter 14: GUI 프로그래밍 기초

## 학습 목표
이 챕터를 완료하면 다음을 할 수 있습니다:
- tkinter를 활용한 GUI 애플리케이션 개발하기
- 다양한 위젯의 특성과 사용법 이해하기
- 이벤트 기반 프로그래밍과 콜백 함수 활용하기
- 레이아웃 매니저로 효과적인 UI 배치하기
- 메뉴, 대화상자, 캔버스 등 고급 기능 구현하기
- MVC 패턴을 적용한 GUI 애플리케이션 설계하기
- 사용자 친화적인 인터페이스 설계 원칙 적용하기

## 1. GUI 프로그래밍 기초

### 1.1 tkinter 소개와 기본 구조

```python
print("=== GUI 프로그래밍 기초 ===")

import tkinter as tk
from tkinter import ttk, messagebox, filedialog, colorchooser
from datetime import datetime
import json
import os

class BasicGUIExample:
    """기본 GUI 예제"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.setup_main_window()
        self.create_widgets()
    
    def setup_main_window(self):
        """메인 윈도우 설정"""
        self.root.title("기본 GUI 애플리케이션")
        self.root.geometry("600x400")
        self.root.resizable(True, True)
        
        # 윈도우 아이콘 설정 (시뮬레이션)
        # self.root.iconbitmap("app_icon.ico")
        
        # 윈도우 닫기 이벤트 처리
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        
        print("   메인 윈도우 설정 완료")
    
    def create_widgets(self):
        """기본 위젯 생성"""
        
        # 상단 프레임
        top_frame = tk.Frame(self.root, bg="lightblue", height=100)
        top_frame.pack(fill=tk.X, padx=5, pady=5)
        top_frame.pack_propagate(False)
        
        title_label = tk.Label(
            top_frame, 
            text="tkinter GUI 기초", 
            font=("Arial", 16, "bold"),
            bg="lightblue"
        )
        title_label.pack(pady=20)
        
        # 중앙 프레임
        middle_frame = tk.Frame(self.root)
        middle_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 좌측 패널
        left_panel = tk.LabelFrame(middle_frame, text="입력 패널", padx=5, pady=5)
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 5))
        
        # 입력 필드들
        tk.Label(left_panel, text="이름:").pack(anchor=tk.W)
        self.name_entry = tk.Entry(left_panel, width=30)
        self.name_entry.pack(fill=tk.X, pady=(0, 10))
        
        tk.Label(left_panel, text="메시지:").pack(anchor=tk.W)
        self.message_text = tk.Text(left_panel, height=5)
        self.message_text.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        # 버튼들
        button_frame = tk.Frame(left_panel)
        button_frame.pack(fill=tk.X)
        
        self.submit_btn = tk.Button(
            button_frame, 
            text="제출",
            command=self.on_submit,
            bg="lightgreen"
        )
        self.submit_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        self.clear_btn = tk.Button(
            button_frame, 
            text="지우기",
            command=self.on_clear,
            bg="lightcoral"
        )
        self.clear_btn.pack(side=tk.LEFT)
        
        # 우측 패널
        right_panel = tk.LabelFrame(middle_frame, text="출력 패널", padx=5, pady=5)
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        self.output_listbox = tk.Listbox(right_panel)
        self.output_listbox.pack(fill=tk.BOTH, expand=True)
        
        # 하단 상태바
        self.status_bar = tk.Label(
            self.root, 
            text="준비", 
            relief=tk.SUNKEN, 
            anchor=tk.W
        )
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        print("   기본 위젯 생성 완료")
    
    def on_submit(self):
        """제출 버튼 이벤트 처리"""
        name = self.name_entry.get()
        message = self.message_text.get("1.0", tk.END).strip()
        
        if name and message:
            timestamp = datetime.now().strftime("%H:%M:%S")
            entry = f"[{timestamp}] {name}: {message}"
            self.output_listbox.insert(tk.END, entry)
            
            self.status_bar.config(text=f"메시지 추가됨: {name}")
            self.on_clear()
        else:
            messagebox.showwarning("입력 오류", "이름과 메시지를 모두 입력하세요.")
            self.status_bar.config(text="입력 오류 발생")
    
    def on_clear(self):
        """지우기 버튼 이벤트 처리"""
        self.name_entry.delete(0, tk.END)
        self.message_text.delete("1.0", tk.END)
        self.status_bar.config(text="입력 필드 초기화됨")
    
    def on_closing(self):
        """윈도우 닫기 이벤트 처리"""
        if messagebox.askokcancel("종료", "애플리케이션을 종료하시겠습니까?"):
            self.root.destroy()
    
    def run(self):
        """애플리케이션 실행"""
        print("   GUI 애플리케이션 시작")
        # self.root.mainloop()  # 실제 실행 시 주석 해제
        print("   (실제 환경에서는 mainloop()가 실행됩니다)")

def demonstrate_basic_gui():
    """기본 GUI 시연"""
    print("1. tkinter 기본 구조:")
    
    app = BasicGUIExample()
    app.run()

demonstrate_basic_gui()
```

### 1.2 위젯의 종류와 특성

```python
print("\n=== 다양한 위젯 활용 ===")

class WidgetShowcase:
    """다양한 위젯 쇼케이스"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("위젯 쇼케이스")
        self.root.geometry("800x600")
        
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        self.create_input_widgets_tab()
        self.create_display_widgets_tab()
        self.create_selection_widgets_tab()
        self.create_container_widgets_tab()
    
    def create_input_widgets_tab(self):
        """입력 위젯 탭"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="입력 위젯")
        
        # Entry 위젯
        entry_frame = tk.LabelFrame(tab, text="Entry 위젯", padx=5, pady=5)
        entry_frame.pack(fill=tk.X, padx=5, pady=5)
        
        tk.Label(entry_frame, text="일반 입력:").pack(anchor=tk.W)
        self.normal_entry = tk.Entry(entry_frame, width=30)
        self.normal_entry.pack(anchor=tk.W, pady=2)
        
        tk.Label(entry_frame, text="비밀번호:").pack(anchor=tk.W)
        self.password_entry = tk.Entry(entry_frame, show="*", width=30)
        self.password_entry.pack(anchor=tk.W, pady=2)
        
        tk.Label(entry_frame, text="읽기 전용:").pack(anchor=tk.W)
        self.readonly_entry = tk.Entry(entry_frame, state="readonly", width=30)
        self.readonly_entry.pack(anchor=tk.W, pady=2)
        
        # Text 위젯
        text_frame = tk.LabelFrame(tab, text="Text 위젯", padx=5, pady=5)
        text_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        text_container = tk.Frame(text_frame)
        text_container.pack(fill=tk.BOTH, expand=True)
        
        self.text_widget = tk.Text(text_container, wrap=tk.WORD)
        scrollbar = tk.Scrollbar(text_container, orient=tk.VERTICAL, command=self.text_widget.yview)
        self.text_widget.config(yscrollcommand=scrollbar.set)
        
        self.text_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 텍스트 위젯에 샘플 텍스트 추가
        sample_text = """이것은 Text 위젯입니다.
여러 줄의 텍스트를 입력할 수 있습니다.
스크롤바도 지원됩니다.
다양한 포맷팅도 가능합니다."""
        self.text_widget.insert("1.0", sample_text)
        
        print("     입력 위젯 탭 생성 완료")
    
    def create_display_widgets_tab(self):
        """표시 위젯 탭"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="표시 위젯")
        
        # Label 위젯들
        label_frame = tk.LabelFrame(tab, text="Label 위젯", padx=5, pady=5)
        label_frame.pack(fill=tk.X, padx=5, pady=5)
        
        tk.Label(label_frame, text="기본 라벨", font=("Arial", 10)).pack(anchor=tk.W)
        tk.Label(label_frame, text="굵은 라벨", font=("Arial", 10, "bold"), fg="blue").pack(anchor=tk.W)
        tk.Label(label_frame, text="배경색 라벨", bg="yellow", fg="red").pack(anchor=tk.W)
        tk.Label(label_frame, text="경계선 라벨", relief=tk.RAISED, borderwidth=2).pack(anchor=tk.W, pady=2)
        
        # Listbox 위젯
        listbox_frame = tk.LabelFrame(tab, text="Listbox 위젯", padx=5, pady=5)
        listbox_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        list_container = tk.Frame(listbox_frame)
        list_container.pack(fill=tk.BOTH, expand=True)
        
        self.listbox = tk.Listbox(list_container, selectmode=tk.EXTENDED)
        list_scrollbar = tk.Scrollbar(list_container, orient=tk.VERTICAL, command=self.listbox.yview)
        self.listbox.config(yscrollcommand=list_scrollbar.set)
        
        # 샘플 데이터 추가
        for i in range(20):
            self.listbox.insert(tk.END, f"항목 {i+1}")
        
        self.listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        list_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 선택 이벤트 바인딩
        self.listbox.bind("<<ListboxSelect>>", self.on_listbox_select)
        
        print("     표시 위젯 탭 생성 완료")
    
    def create_selection_widgets_tab(self):
        """선택 위젯 탭"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="선택 위젯")
        
        # 체크박스들
        checkbox_frame = tk.LabelFrame(tab, text="Checkbutton 위젯", padx=5, pady=5)
        checkbox_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.check_vars = {}
        options = ["옵션 1", "옵션 2", "옵션 3"]
        
        for option in options:
            var = tk.BooleanVar()
            self.check_vars[option] = var
            
            checkbox = tk.Checkbutton(
                checkbox_frame, 
                text=option, 
                variable=var,
                command=lambda opt=option: self.on_checkbox_change(opt)
            )
            checkbox.pack(anchor=tk.W)
        
        # 라디오 버튼들
        radio_frame = tk.LabelFrame(tab, text="Radiobutton 위젯", padx=5, pady=5)
        radio_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.radio_var = tk.StringVar(value="라디오 1")
        radio_options = ["라디오 1", "라디오 2", "라디오 3"]
        
        for option in radio_options:
            radio = tk.Radiobutton(
                radio_frame, 
                text=option, 
                variable=self.radio_var, 
                value=option,
                command=self.on_radio_change
            )
            radio.pack(anchor=tk.W)
        
        # Scale (슬라이더) 위젯
        scale_frame = tk.LabelFrame(tab, text="Scale 위젯", padx=5, pady=5)
        scale_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.scale_var = tk.DoubleVar()
        self.scale = tk.Scale(
            scale_frame, 
            from_=0, 
            to=100, 
            orient=tk.HORIZONTAL,
            variable=self.scale_var,
            command=self.on_scale_change
        )
        self.scale.pack(fill=tk.X)
        
        self.scale_label = tk.Label(scale_frame, text="값: 0")
        self.scale_label.pack()
        
        # Spinbox 위젯
        spinbox_frame = tk.LabelFrame(tab, text="Spinbox 위젯", padx=5, pady=5)
        spinbox_frame.pack(fill=tk.X, padx=5, pady=5)
        
        self.spinbox = tk.Spinbox(
            spinbox_frame, 
            from_=1, 
            to=10, 
            width=10,
            command=self.on_spinbox_change
        )
        self.spinbox.pack(anchor=tk.W)
        
        print("     선택 위젯 탭 생성 완료")
    
    def create_container_widgets_tab(self):
        """컨테이너 위젯 탭"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="컨테이너 위젯")
        
        # PanedWindow 위젯
        paned_frame = tk.LabelFrame(tab, text="PanedWindow 위젯", padx=5, pady=5)
        paned_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        paned_window = tk.PanedWindow(paned_frame, orient=tk.HORIZONTAL)
        paned_window.pack(fill=tk.BOTH, expand=True)
        
        # 왼쪽 패널
        left_pane = tk.Frame(paned_window, bg="lightblue", width=200)
        paned_window.add(left_pane)
        tk.Label(left_pane, text="왼쪽 패널", bg="lightblue").pack(pady=20)
        
        # 오른쪽 패널
        right_pane = tk.Frame(paned_window, bg="lightgreen")
        paned_window.add(right_pane)
        tk.Label(right_pane, text="오른쪽 패널", bg="lightgreen").pack(pady=20)
        
        print("     컨테이너 위젯 탭 생성 완료")
    
    def on_listbox_select(self, event):
        """리스트박스 선택 이벤트"""
        selection = self.listbox.curselection()
        if selection:
            print(f"     선택된 항목: {[self.listbox.get(i) for i in selection]}")
    
    def on_checkbox_change(self, option):
        """체크박스 변경 이벤트"""
        state = self.check_vars[option].get()
        print(f"     {option}: {'체크됨' if state else '체크 해제'}")
    
    def on_radio_change(self):
        """라디오 버튼 변경 이벤트"""
        print(f"     라디오 선택: {self.radio_var.get()}")
    
    def on_scale_change(self, value):
        """스케일 변경 이벤트"""
        self.scale_label.config(text=f"값: {float(value):.0f}")
        print(f"     스케일 값: {float(value):.0f}")
    
    def on_spinbox_change(self):
        """스핀박스 변경 이벤트"""
        print(f"     스핀박스 값: {self.spinbox.get()}")
    
    def run(self):
        """쇼케이스 실행"""
        print("   위젯 쇼케이스 실행")
        # self.root.mainloop()  # 실제 실행 시 주석 해제

def demonstrate_widgets():
    """위젯 쇼케이스 시연"""
    print("2. 다양한 위젯 활용:")
    
    showcase = WidgetShowcase()
    showcase.run()

demonstrate_widgets()
```

## 2. 이벤트 처리와 콜백

### 2.1 이벤트 기반 프로그래밍

```python
print("\n=== 이벤트 처리와 콜백 ===")

class EventHandlingDemo:
    """이벤트 처리 데모"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("이벤트 처리 데모")
        self.root.geometry("600x500")
        
        self.event_log = []
        self.create_widgets()
        self.bind_events()
    
    def create_widgets(self):
        """위젯 생성"""
        
        # 상단 정보 패널
        info_frame = tk.LabelFrame(self.root, text="이벤트 정보", padx=5, pady=5)
        info_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.mouse_label = tk.Label(info_frame, text="마우스 위치: (0, 0)")
        self.mouse_label.pack(anchor=tk.W)
        
        self.key_label = tk.Label(info_frame, text="마지막 키: 없음")
        self.key_label.pack(anchor=tk.W)
        
        # 이벤트 테스트 영역
        test_frame = tk.LabelFrame(self.root, text="이벤트 테스트 영역", padx=5, pady=5)
        test_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 캔버스 (드래그 앤 드롭 테스트용)
        self.canvas = tk.Canvas(test_frame, bg="white", height=200)
        self.canvas.pack(fill=tk.X, pady=5)
        
        # 버튼들
        button_frame = tk.Frame(test_frame)
        button_frame.pack(fill=tk.X, pady=5)
        
        self.click_btn = tk.Button(
            button_frame, 
            text="클릭 이벤트 테스트",
            command=self.on_button_click
        )
        self.click_btn.pack(side=tk.LEFT, padx=5)
        
        self.double_click_btn = tk.Button(
            button_frame, 
            text="더블클릭 테스트"
        )
        self.double_click_btn.pack(side=tk.LEFT, padx=5)
        
        self.right_click_btn = tk.Button(
            button_frame, 
            text="우클릭 테스트"
        )
        self.right_click_btn.pack(side=tk.LEFT, padx=5)
        
        # 입력 필드 (키보드 이벤트 테스트용)
        self.entry = tk.Entry(test_frame, font=("Arial", 12))
        self.entry.pack(fill=tk.X, pady=5)
        
        # 이벤트 로그
        log_frame = tk.LabelFrame(self.root, text="이벤트 로그", padx=5, pady=5)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        log_container = tk.Frame(log_frame)
        log_container.pack(fill=tk.BOTH, expand=True)
        
        self.log_listbox = tk.Listbox(log_container)
        log_scrollbar = tk.Scrollbar(log_container, orient=tk.VERTICAL, command=self.log_listbox.yview)
        self.log_listbox.config(yscrollcommand=log_scrollbar.set)
        
        self.log_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        log_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 로그 지우기 버튼
        clear_log_btn = tk.Button(log_frame, text="로그 지우기", command=self.clear_log)
        clear_log_btn.pack(pady=5)
        
        print("     이벤트 데모 위젯 생성 완료")
    
    def bind_events(self):
        """이벤트 바인딩"""
        
        # 마우스 이벤트
        self.root.bind("<Motion>", self.on_mouse_move)
        self.canvas.bind("<Button-1>", self.on_canvas_click)
        self.canvas.bind("<B1-Motion>", self.on_canvas_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_canvas_release)
        
        # 더블클릭 이벤트
        self.double_click_btn.bind("<Double-Button-1>", self.on_double_click)
        
        # 우클릭 이벤트
        self.right_click_btn.bind("<Button-3>", self.on_right_click)
        
        # 키보드 이벤트
        self.entry.bind("<KeyPress>", self.on_key_press)
        self.entry.bind("<KeyRelease>", self.on_key_release)
        self.entry.bind("<Return>", self.on_enter_press)
        
        # 윈도우 이벤트
        self.root.bind("<Configure>", self.on_window_resize)
        self.root.bind("<FocusIn>", self.on_focus_in)
        self.root.bind("<FocusOut>", self.on_focus_out)
        
        # 캔버스에 드래그 상태 추적 변수
        self.canvas.drag_data = {"x": 0, "y": 0, "item": None}
        
        print("     이벤트 바인딩 완료")
    
    def log_event(self, event_type, details=""):
        """이벤트 로깅"""
        timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        log_entry = f"[{timestamp}] {event_type}"
        if details:
            log_entry += f": {details}"
        
        self.event_log.append(log_entry)
        self.log_listbox.insert(tk.END, log_entry)
        self.log_listbox.see(tk.END)  # 자동 스크롤
        
        # 로그 개수 제한
        if len(self.event_log) > 100:
            self.event_log.pop(0)
            self.log_listbox.delete(0)
    
    def on_mouse_move(self, event):
        """마우스 이동 이벤트"""
        self.mouse_label.config(text=f"마우스 위치: ({event.x}, {event.y})")
    
    def on_button_click(self):
        """버튼 클릭 이벤트"""
        self.log_event("Button Click", "클릭 이벤트 테스트 버튼")
    
    def on_double_click(self, event):
        """더블클릭 이벤트"""
        self.log_event("Double Click", "더블클릭 감지")
    
    def on_right_click(self, event):
        """우클릭 이벤트"""
        self.log_event("Right Click", f"위치: ({event.x}, {event.y})")
    
    def on_canvas_click(self, event):
        """캔버스 클릭 이벤트"""
        # 작은 원 그리기
        x, y = event.x, event.y
        item = self.canvas.create_oval(x-5, y-5, x+5, y+5, fill="blue", outline="darkblue")
        
        self.canvas.drag_data["x"] = x
        self.canvas.drag_data["y"] = y
        self.canvas.drag_data["item"] = item
        
        self.log_event("Canvas Click", f"원 생성 at ({x}, {y})")
    
    def on_canvas_drag(self, event):
        """캔버스 드래그 이벤트"""
        if self.canvas.drag_data["item"]:
            # 드래그로 원 이동
            dx = event.x - self.canvas.drag_data["x"]
            dy = event.y - self.canvas.drag_data["y"]
            
            self.canvas.move(self.canvas.drag_data["item"], dx, dy)
            
            self.canvas.drag_data["x"] = event.x
            self.canvas.drag_data["y"] = event.y
    
    def on_canvas_release(self, event):
        """캔버스 마우스 릴리즈 이벤트"""
        if self.canvas.drag_data["item"]:
            self.log_event("Canvas Drag End", f"최종 위치: ({event.x}, {event.y})")
            self.canvas.drag_data["item"] = None
    
    def on_key_press(self, event):
        """키 누름 이벤트"""
        key = event.keysym
        self.key_label.config(text=f"마지막 키: {key}")
        self.log_event("Key Press", f"키: {key}")
    
    def on_key_release(self, event):
        """키 릴리즈 이벤트"""
        self.log_event("Key Release", f"키: {event.keysym}")
    
    def on_enter_press(self, event):
        """Enter 키 이벤트"""
        text = self.entry.get()
        self.log_event("Enter Press", f"입력 텍스트: '{text}'")
        self.entry.delete(0, tk.END)
    
    def on_window_resize(self, event):
        """윈도우 리사이즈 이벤트"""
        if event.widget == self.root:
            self.log_event("Window Resize", f"크기: {event.width}x{event.height}")
    
    def on_focus_in(self, event):
        """포커스 획득 이벤트"""
        self.log_event("Focus In", "윈도우 포커스 획득")
    
    def on_focus_out(self, event):
        """포커스 상실 이벤트"""
        self.log_event("Focus Out", "윈도우 포커스 상실")
    
    def clear_log(self):
        """로그 지우기"""
        self.event_log.clear()
        self.log_listbox.delete(0, tk.END)
        self.log_event("Log Cleared", "이벤트 로그가 지워졌습니다")
    
    def run(self):
        """데모 실행"""
        print("   이벤트 처리 데모 시작")
        # self.root.mainloop()  # 실제 실행 시 주석 해제

def demonstrate_event_handling():
    """이벤트 처리 시연"""
    print("3. 이벤트 기반 프로그래밍:")
    
    demo = EventHandlingDemo()
    demo.run()

demonstrate_event_handling()
```

### 2.2 고급 이벤트 처리와 콜백 패턴

```python
print("\n=== 고급 이벤트 처리 패턴 ===")

class CallbackManager:
    """콜백 관리자"""
    
    def __init__(self):
        self.callbacks = {}
    
    def register(self, event_type, callback):
        """콜백 등록"""
        if event_type not in self.callbacks:
            self.callbacks[event_type] = []
        self.callbacks[event_type].append(callback)
    
    def unregister(self, event_type, callback):
        """콜백 해제"""
        if event_type in self.callbacks:
            try:
                self.callbacks[event_type].remove(callback)
            except ValueError:
                pass
    
    def trigger(self, event_type, *args, **kwargs):
        """이벤트 트리거"""
        if event_type in self.callbacks:
            for callback in self.callbacks[event_type]:
                try:
                    callback(*args, **kwargs)
                except Exception as e:
                    print(f"     콜백 오류 ({event_type}): {e}")

class AdvancedEventDemo:
    """고급 이벤트 처리 데모"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("고급 이벤트 처리")
        self.root.geometry("700x600")
        
        self.callback_manager = CallbackManager()
        self.setup_callbacks()
        self.create_widgets()
        
        # 커스텀 이벤트 시뮬레이션용 타이머
        self.timer_active = False
        self.timer_count = 0
    
    def setup_callbacks(self):
        """콜백 설정"""
        
        # 데이터 변경 이벤트 콜백들
        self.callback_manager.register("data_changed", self.on_data_validation)
        self.callback_manager.register("data_changed", self.on_data_logging)
        self.callback_manager.register("data_changed", self.on_data_backup)
        
        # 사용자 액션 콜백들
        self.callback_manager.register("user_action", self.on_user_analytics)
        self.callback_manager.register("user_action", self.on_user_feedback)
        
        # 시스템 이벤트 콜백들
        self.callback_manager.register("system_event", self.on_system_monitoring)
        self.callback_manager.register("system_event", self.on_system_notification)
        
        print("     콜백 시스템 설정 완료")
    
    def create_widgets(self):
        """위젯 생성"""
        
        # 콜백 트리거 버튼들
        trigger_frame = tk.LabelFrame(self.root, text="이벤트 트리거", padx=5, pady=5)
        trigger_frame.pack(fill=tk.X, padx=10, pady=5)
        
        btn_frame = tk.Frame(trigger_frame)
        btn_frame.pack(fill=tk.X)
        
        tk.Button(btn_frame, text="데이터 변경", 
                 command=lambda: self.trigger_event("data_changed", "사용자 데이터")).pack(side=tk.LEFT, padx=5)
        
        tk.Button(btn_frame, text="사용자 액션", 
                 command=lambda: self.trigger_event("user_action", "버튼 클릭")).pack(side=tk.LEFT, padx=5)
        
        tk.Button(btn_frame, text="시스템 이벤트", 
                 command=lambda: self.trigger_event("system_event", "메모리 부족")).pack(side=tk.LEFT, padx=5)
        
        # 타이머 제어
        timer_frame = tk.Frame(trigger_frame)
        timer_frame.pack(fill=tk.X, pady=5)
        
        self.timer_btn = tk.Button(timer_frame, text="타이머 시작", command=self.toggle_timer)
        self.timer_btn.pack(side=tk.LEFT, padx=5)
        
        self.timer_label = tk.Label(timer_frame, text="타이머 비활성")
        self.timer_label.pack(side=tk.LEFT, padx=10)
        
        # 콜백 관리
        callback_frame = tk.LabelFrame(self.root, text="콜백 관리", padx=5, pady=5)
        callback_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # 콜백 활성화/비활성화 체크박스들
        self.callback_vars = {}
        callbacks = [
            ("data_validation", "데이터 검증"),
            ("data_logging", "데이터 로깅"),
            ("data_backup", "데이터 백업"),
            ("user_analytics", "사용자 분석"),
            ("user_feedback", "사용자 피드백"),
            ("system_monitoring", "시스템 모니터링"),
            ("system_notification", "시스템 알림")
        ]
        
        for callback_id, callback_name in callbacks:
            var = tk.BooleanVar(value=True)
            self.callback_vars[callback_id] = var
            
            checkbox = tk.Checkbutton(
                callback_frame, 
                text=callback_name, 
                variable=var,
                command=lambda cid=callback_id: self.toggle_callback(cid)
            )
            checkbox.pack(anchor=tk.W)
        
        # 이벤트 로그
        log_frame = tk.LabelFrame(self.root, text="이벤트 로그", padx=5, pady=5)
        log_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        log_container = tk.Frame(log_frame)
        log_container.pack(fill=tk.BOTH, expand=True)
        
        self.log_text = tk.Text(log_container, wrap=tk.WORD, state=tk.DISABLED)
        log_scrollbar = tk.Scrollbar(log_container, orient=tk.VERTICAL, command=self.log_text.yview)
        self.log_text.config(yscrollcommand=log_scrollbar.set)
        
        self.log_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        log_scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 로그 제어 버튼들
        log_control_frame = tk.Frame(log_frame)
        log_control_frame.pack(fill=tk.X, pady=5)
        
        tk.Button(log_control_frame, text="로그 지우기", command=self.clear_log).pack(side=tk.LEFT, padx=5)
        tk.Button(log_control_frame, text="로그 저장", command=self.save_log).pack(side=tk.LEFT, padx=5)
        
        print("     고급 이벤트 데모 위젯 생성 완료")
    
    def trigger_event(self, event_type, data):
        """이벤트 트리거"""
        self.log_message(f"이벤트 트리거: {event_type} - {data}")
        self.callback_manager.trigger(event_type, data)
    
    def toggle_callback(self, callback_id):
        """콜백 활성화/비활성화"""
        is_active = self.callback_vars[callback_id].get()
        self.log_message(f"콜백 {'활성화' if is_active else '비활성화'}: {callback_id}")
    
    def toggle_timer(self):
        """타이머 토글"""
        if self.timer_active:
            self.timer_active = False
            self.timer_btn.config(text="타이머 시작")
            self.timer_label.config(text="타이머 비활성")
        else:
            self.timer_active = True
            self.timer_btn.config(text="타이머 중지")
            self.timer_label.config(text="타이머 활성")
            self.timer_count = 0
            self.run_timer()
    
    def run_timer(self):
        """타이머 실행"""
        if self.timer_active:
            self.timer_count += 1
            self.timer_label.config(text=f"타이머: {self.timer_count}초")
            
            # 5초마다 자동 이벤트 발생
            if self.timer_count % 5 == 0:
                self.trigger_event("system_event", f"자동 체크 ({self.timer_count}초)")
            
            # 1초 후 재귀 호출 (실제로는 self.root.after 사용)
            # self.root.after(1000, self.run_timer)
            print(f"     타이머 틱: {self.timer_count}초")
    
    # 콜백 함수들
    def on_data_validation(self, data):
        """데이터 검증 콜백"""
        if self.callback_vars["data_validation"].get():
            self.log_message(f"  → 데이터 검증: {data} 검증 완료")
    
    def on_data_logging(self, data):
        """데이터 로깅 콜백"""
        if self.callback_vars["data_logging"].get():
            self.log_message(f"  → 데이터 로깅: {data} 로그 기록")
    
    def on_data_backup(self, data):
        """데이터 백업 콜백"""
        if self.callback_vars["data_backup"].get():
            self.log_message(f"  → 데이터 백업: {data} 백업 생성")
    
    def on_user_analytics(self, action):
        """사용자 분석 콜백"""
        if self.callback_vars["user_analytics"].get():
            self.log_message(f"  → 사용자 분석: {action} 분석 데이터 수집")
    
    def on_user_feedback(self, action):
        """사용자 피드백 콜백"""
        if self.callback_vars["user_feedback"].get():
            self.log_message(f"  → 사용자 피드백: {action}에 대한 피드백 표시")
    
    def on_system_monitoring(self, event):
        """시스템 모니터링 콜백"""
        if self.callback_vars["system_monitoring"].get():
            self.log_message(f"  → 시스템 모니터링: {event} 상태 체크")
    
    def on_system_notification(self, event):
        """시스템 알림 콜백"""
        if self.callback_vars["system_notification"].get():
            self.log_message(f"  → 시스템 알림: {event} 알림 발송")
    
    def log_message(self, message):
        """로그 메시지 추가"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] {message}\n"
        
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, log_entry)
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)
    
    def clear_log(self):
        """로그 지우기"""
        self.log_text.config(state=tk.NORMAL)
        self.log_text.delete("1.0", tk.END)
        self.log_text.config(state=tk.DISABLED)
        self.log_message("로그가 지워졌습니다")
    
    def save_log(self):
        """로그 저장 (시뮬레이션)"""
        # 실제로는 filedialog.asksaveasfilename() 사용
        self.log_message("로그가 파일로 저장되었습니다 (시뮬레이션)")
    
    def run(self):
        """데모 실행"""
        print("   고급 이벤트 처리 데모 시작")
        # self.root.mainloop()  # 실제 실행 시 주석 해제

def demonstrate_advanced_events():
    """고급 이벤트 처리 시연"""
    print("4. 고급 콜백 패턴:")
    
    demo = AdvancedEventDemo()
    demo.run()

demonstrate_advanced_events()
```

## 3. 레이아웃 관리

### 3.1 Pack, Grid, Place 매니저

```python
print("\n=== 레이아웃 관리 ===")

class LayoutDemo:
    """레이아웃 관리 데모"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("레이아웃 관리 데모")
        self.root.geometry("900x700")
        
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        self.create_pack_demo()
        self.create_grid_demo()
        self.create_place_demo()
        self.create_mixed_demo()
    
    def create_pack_demo(self):
        """Pack 매니저 데모"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Pack 매니저")
        
        # 설명
        description = tk.Label(
            tab, 
            text="Pack 매니저: 위젯을 TOP, BOTTOM, LEFT, RIGHT로 순차적으로 배치",
            font=("Arial", 10, "bold")
        )
        description.pack(pady=5)
        
        # 기본 pack 예제
        basic_frame = tk.LabelFrame(tab, text="기본 pack() 사용법", padx=5, pady=5)
        basic_frame.pack(fill=tk.X, padx=10, pady=5)
        
        tk.Label(basic_frame, text="TOP", bg="lightblue").pack(side=tk.TOP, fill=tk.X, padx=2, pady=2)
        tk.Label(basic_frame, text="BOTTOM", bg="lightgreen").pack(side=tk.BOTTOM, fill=tk.X, padx=2, pady=2)
        tk.Label(basic_frame, text="LEFT", bg="lightcoral").pack(side=tk.LEFT, fill=tk.Y, padx=2, pady=2)
        tk.Label(basic_frame, text="RIGHT", bg="lightyellow").pack(side=tk.RIGHT, fill=tk.Y, padx=2, pady=2)
        tk.Label(basic_frame, text="CENTER (fill=BOTH, expand=True)", 
                bg="lightgray").pack(fill=tk.BOTH, expand=True, padx=2, pady=2)
        
        # 복잡한 pack 예제
        complex_frame = tk.LabelFrame(tab, text="복잡한 pack 레이아웃", padx=5, pady=5)
        complex_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 헤더
        header = tk.Frame(complex_frame, bg="darkblue", height=50)
        header.pack(side=tk.TOP, fill=tk.X, padx=2, pady=2)
        header.pack_propagate(False)
        tk.Label(header, text="헤더 영역", bg="darkblue", fg="white", 
                font=("Arial", 12, "bold")).pack(expand=True)
        
        # 메인 컨텐츠 영역
        main_area = tk.Frame(complex_frame)
        main_area.pack(fill=tk.BOTH, expand=True, padx=2, pady=2)
        
        # 사이드바
        sidebar = tk.Frame(main_area, bg="lightsteelblue", width=150)
        sidebar.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 2))
        sidebar.pack_propagate(False)
        tk.Label(sidebar, text="사이드바", bg="lightsteelblue").pack(pady=10)
        
        # 콘텐츠
        content = tk.Frame(main_area, bg="white")
        content.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        tk.Label(content, text="메인 콘텐츠 영역\n(fill=BOTH, expand=True)", 
                bg="white", justify=tk.CENTER).pack(expand=True)
        
        # 푸터
        footer = tk.Frame(complex_frame, bg="darkgray", height=30)
        footer.pack(side=tk.BOTTOM, fill=tk.X, padx=2, pady=2)
        footer.pack_propagate(False)
        tk.Label(footer, text="푸터 영역", bg="darkgray", fg="white").pack(expand=True)
        
        print("     Pack 데모 생성 완료")
    
    def create_grid_demo(self):
        """Grid 매니저 데모"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Grid 매니저")
        
        # 설명
        description = tk.Label(
            tab, 
            text="Grid 매니저: 위젯을 행(row)과 열(column)의 격자 형태로 배치",
            font=("Arial", 10, "bold")
        )
        description.grid(row=0, column=0, columnspan=3, pady=5, sticky="ew")
        
        # 기본 grid 예제
        basic_frame = tk.LabelFrame(tab, text="기본 grid() 사용법", padx=5, pady=5)
        basic_frame.grid(row=1, column=0, columnspan=3, sticky="ew", padx=10, pady=5)
        
        # 간단한 격자 레이아웃
        for i in range(3):
            for j in range(4):
                label = tk.Label(
                    basic_frame, 
                    text=f"({i},{j})", 
                    bg=f"#{200+i*20:02x}{200+j*10:02x}{150:02x}",
                    relief=tk.RAISED,
                    borderwidth=1
                )
                label.grid(row=i, column=j, padx=1, pady=1, sticky="ew")
        
        # 폼 레이아웃 예제
        form_frame = tk.LabelFrame(tab, text="폼 레이아웃 (sticky, span 활용)", padx=5, pady=5)
        form_frame.grid(row=2, column=0, columnspan=2, sticky="ew", padx=10, pady=5)
        
        # 폼 필드들
        tk.Label(form_frame, text="이름:").grid(row=0, column=0, sticky="e", padx=5, pady=2)
        tk.Entry(form_frame, width=20).grid(row=0, column=1, sticky="ew", padx=5, pady=2)
        
        tk.Label(form_frame, text="이메일:").grid(row=1, column=0, sticky="e", padx=5, pady=2)
        tk.Entry(form_frame, width=20).grid(row=1, column=1, sticky="ew", padx=5, pady=2)
        
        tk.Label(form_frame, text="메시지:").grid(row=2, column=0, sticky="ne", padx=5, pady=2)
        message_text = tk.Text(form_frame, height=4, width=30)
        message_text.grid(row=2, column=1, sticky="ew", padx=5, pady=2)
        
        # 버튼들 (columnspan 사용)
        button_frame = tk.Frame(form_frame)
        button_frame.grid(row=3, column=0, columnspan=2, pady=10)
        
        tk.Button(button_frame, text="제출").pack(side=tk.LEFT, padx=5)
        tk.Button(button_frame, text="취소").pack(side=tk.LEFT, padx=5)
        
        # 열 가중치 설정
        form_frame.columnconfigure(1, weight=1)
        
        # 계산기 레이아웃 예제
        calc_frame = tk.LabelFrame(tab, text="계산기 레이아웃", padx=5, pady=5)
        calc_frame.grid(row=2, column=2, sticky="nsew", padx=10, pady=5)
        
        # 디스플레이
        display = tk.Entry(calc_frame, font=("Arial", 14), justify="right", state="readonly")
        display.grid(row=0, column=0, columnspan=4, sticky="ew", padx=2, pady=2)
        
        # 버튼들
        buttons = [
            ['C', '±', '%', '÷'],
            ['7', '8', '9', '×'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '0', '.', '=']
        ]
        
        for i, row in enumerate(buttons):
            for j, btn_text in enumerate(row):
                if i == 4 and j == 0:  # '0' 버튼은 2칸 차지
                    btn = tk.Button(calc_frame, text=btn_text, font=("Arial", 12))
                    btn.grid(row=i+1, column=j, columnspan=2, sticky="ew", padx=1, pady=1)
                elif i == 4 and j == 1:  # 이미 '0' 버튼으로 사용됨
                    continue
                else:
                    btn = tk.Button(calc_frame, text=btn_text, font=("Arial", 12))
                    btn.grid(row=i+1, column=j, sticky="ew", padx=1, pady=1)
        
        # 열과 행 가중치 설정
        for i in range(4):
            calc_frame.columnconfigure(i, weight=1)
        
        # 메인 탭 열 가중치 설정
        tab.columnconfigure(0, weight=1)
        tab.columnconfigure(1, weight=1)
        tab.columnconfigure(2, weight=1)
        
        print("     Grid 데모 생성 완료")
    
    def create_place_demo(self):
        """Place 매니저 데모"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="Place 매니저")
        
        # 설명
        description = tk.Label(
            tab, 
            text="Place 매니저: 위젯을 절대 또는 상대 좌표로 정확한 위치에 배치",
            font=("Arial", 10, "bold")
        )
        description.place(x=10, y=10)
        
        # 절대 좌표 예제
        abs_frame = tk.LabelFrame(tab, text="절대 좌표 배치", padx=5, pady=5, width=300, height=200)
        abs_frame.place(x=20, y=50)
        abs_frame.place_propagate(False)
        
        # 절대 좌표로 위젯들 배치
        tk.Label(abs_frame, text="(10, 10)", bg="lightblue").place(x=10, y=10)
        tk.Label(abs_frame, text="(100, 50)", bg="lightgreen").place(x=100, y=50)
        tk.Label(abs_frame, text="(200, 100)", bg="lightcoral").place(x=200, y=100)
        tk.Button(abs_frame, text="버튼", width=8).place(x=50, y=150)
        
        # 상대 좌표 예제
        rel_frame = tk.LabelFrame(tab, text="상대 좌표 배치 (relx, rely)", padx=5, pady=5, width=300, height=200)
        rel_frame.place(x=350, y=50)
        rel_frame.place_propagate(False)
        
        # 상대 좌표로 위젯들 배치 (0.0 ~ 1.0)
        tk.Label(rel_frame, text="중앙", bg="yellow").place(relx=0.5, rely=0.5, anchor="center")
        tk.Label(rel_frame, text="좌상단", bg="lightblue").place(relx=0, rely=0, anchor="nw")
        tk.Label(rel_frame, text="우하단", bg="lightgreen").place(relx=1, rely=1, anchor="se")
        tk.Label(rel_frame, text="우상단", bg="lightcoral").place(relx=1, rely=0, anchor="ne")
        tk.Label(rel_frame, text="좌하단", bg="lightyellow").place(relx=0, rely=1, anchor="sw")
        
        # 크기 조절 예제
        size_frame = tk.LabelFrame(tab, text="크기 조절 (relwidth, relheight)", padx=5, pady=5, 
                                  width=300, height=200)
        size_frame.place(x=20, y=280)
        size_frame.place_propagate(False)
        
        # 상대 크기로 위젯들 배치
        tk.Label(size_frame, text="50% 너비", bg="lightblue").place(
            relx=0, rely=0, relwidth=0.5, height=30
        )
        tk.Label(size_frame, text="전체 너비", bg="lightgreen").place(
            relx=0, rely=0.2, relwidth=1, height=30
        )
        tk.Label(size_frame, text="중앙 70%", bg="lightcoral").place(
            relx=0.15, rely=0.4, relwidth=0.7, height=30
        )
        tk.Label(size_frame, text="전체 높이 30%", bg="lightyellow").place(
            relx=0, rely=0.7, relwidth=1, relheight=0.3
        )
        
        # 오버레이 예제
        overlay_frame = tk.LabelFrame(tab, text="오버레이 효과", padx=5, pady=5, 
                                     width=300, height=200)
        overlay_frame.place(x=350, y=280)
        overlay_frame.place_propagate(False)
        
        # 배경 위젯
        bg_label = tk.Label(overlay_frame, text="배경 레이어", bg="lightgray", 
                           font=("Arial", 20))
        bg_label.place(relwidth=1, relheight=1)
        
        # 오버레이 위젯들
        overlay1 = tk.Label(overlay_frame, text="오버레이 1", bg="red", fg="white")
        overlay1.place(x=20, y=20, width=100, height=30)
        
        overlay2 = tk.Label(overlay_frame, text="오버레이 2", bg="blue", fg="white")
        overlay2.place(x=50, y=50, width=100, height=30)
        
        overlay3 = tk.Label(overlay_frame, text="투명 효과", bg="green", fg="white")
        overlay3.place(relx=0.5, rely=0.8, anchor="center")
        
        print("     Place 데모 생성 완료")
    
    def create_mixed_demo(self):
        """혼합 레이아웃 데모"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="혼합 레이아웃")
        
        # 설명
        description = tk.Label(
            tab, 
            text="실제 애플리케이션에서는 여러 레이아웃 매니저를 조합하여 사용",
            font=("Arial", 10, "bold")
        )
        description.pack(pady=5)
        
        # 메인 컨테이너 (pack 사용)
        main_container = tk.Frame(tab)
        main_container.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # 상단 툴바 (pack 사용)
        toolbar = tk.Frame(main_container, bg="lightgray", height=40)
        toolbar.pack(side=tk.TOP, fill=tk.X, pady=(0, 5))
        toolbar.pack_propagate(False)
        
        # 툴바 버튼들 (pack 사용)
        tk.Button(toolbar, text="새로 만들기").pack(side=tk.LEFT, padx=5, pady=5)
        tk.Button(toolbar, text="열기").pack(side=tk.LEFT, padx=5, pady=5)
        tk.Button(toolbar, text="저장").pack(side=tk.LEFT, padx=5, pady=5)
        
        # 구분선
        tk.Frame(toolbar, width=2, bg="gray").pack(side=tk.LEFT, fill=tk.Y, padx=5, pady=2)
        
        tk.Button(toolbar, text="실행").pack(side=tk.LEFT, padx=5, pady=5)
        tk.Button(toolbar, text="디버그").pack(side=tk.LEFT, padx=5, pady=5)
        
        # 상태 표시 (오른쪽 정렬)
        status_label = tk.Label(toolbar, text="준비", bg="lightgray")
        status_label.pack(side=tk.RIGHT, padx=10, pady=5)
        
        # 메인 영역 (pack + grid 조합)
        main_area = tk.Frame(main_container)
        main_area.pack(fill=tk.BOTH, expand=True)
        
        # 좌측 패널 (pack 사용)
        left_panel = tk.Frame(main_area, bg="lightsteelblue", width=200)
        left_panel.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 5))
        left_panel.pack_propagate(False)
        
        # 좌측 패널 내용 (grid 사용)
        tk.Label(left_panel, text="프로젝트 탐색기", bg="lightsteelblue", 
                font=("Arial", 10, "bold")).grid(row=0, column=0, sticky="ew", padx=5, pady=5)
        
        # 트리뷰 시뮬레이션
        tree_frame = tk.Frame(left_panel, bg="white")
        tree_frame.grid(row=1, column=0, sticky="nsew", padx=5, pady=5)
        
        tree_items = ["📁 프로젝트", "  📄 main.py", "  📄 utils.py", "📁 tests", "  📄 test_main.py"]
        for item in tree_items:
            tk.Label(tree_frame, text=item, bg="white", anchor="w").pack(fill=tk.X, padx=2, pady=1)
        
        left_panel.rowconfigure(1, weight=1)
        left_panel.columnconfigure(0, weight=1)
        
        # 우측 영역 (pack 사용)
        right_area = tk.Frame(main_area)
        right_area.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # 탭 영역 (grid 사용)
        tab_frame = tk.Frame(right_area, bg="lightgray", height=30)
        tab_frame.pack(side=tk.TOP, fill=tk.X)
        tab_frame.pack_propagate(False)
        
        # 탭 버튼들 (pack 사용)
        tk.Button(tab_frame, text="main.py", relief=tk.FLAT, bg="white").pack(side=tk.LEFT, padx=1, pady=2)
        tk.Button(tab_frame, text="utils.py", relief=tk.FLAT).pack(side=tk.LEFT, padx=1, pady=2)
        
        # 에디터 영역 (pack 사용)
        editor_frame = tk.Frame(right_area, bg="white")
        editor_frame.pack(fill=tk.BOTH, expand=True)
        
        # 줄 번호와 텍스트 에디터 (grid 사용)
        line_numbers = tk.Text(editor_frame, width=4, bg="lightgray", state=tk.DISABLED)
        line_numbers.grid(row=0, column=0, sticky="ns")
        
        editor_text = tk.Text(editor_frame, wrap=tk.NONE)
        editor_text.grid(row=0, column=1, sticky="nsew")
        
        # 스크롤바 (grid 사용)
        v_scrollbar = tk.Scrollbar(editor_frame, orient=tk.VERTICAL, command=editor_text.yview)
        v_scrollbar.grid(row=0, column=2, sticky="ns")
        editor_text.config(yscrollcommand=v_scrollbar.set)
        
        h_scrollbar = tk.Scrollbar(editor_frame, orient=tk.HORIZONTAL, command=editor_text.xview)
        h_scrollbar.grid(row=1, column=1, sticky="ew")
        editor_text.config(xscrollcommand=h_scrollbar.set)
        
        # 그리드 가중치 설정
        editor_frame.rowconfigure(0, weight=1)
        editor_frame.columnconfigure(1, weight=1)
        
        # 샘플 코드 추가
        sample_code = """def hello_world():
    print("Hello, GUI World!")
    return "Success"

if __name__ == "__main__":
    hello_world()
"""
        editor_text.insert("1.0", sample_code)
        
        # 줄 번호 추가
        for i in range(1, 7):
            line_numbers.config(state=tk.NORMAL)
            line_numbers.insert(tk.END, f"{i}\n")
            line_numbers.config(state=tk.DISABLED)
        
        # 하단 상태바 (pack 사용)
        status_bar = tk.Frame(main_container, bg="darkgray", height=25)
        status_bar.pack(side=tk.BOTTOM, fill=tk.X, pady=(5, 0))
        status_bar.pack_propagate(False)
        
        tk.Label(status_bar, text="줄: 1, 열: 1", bg="darkgray", fg="white").pack(side=tk.LEFT, padx=10)
        tk.Label(status_bar, text="Python", bg="darkgray", fg="white").pack(side=tk.RIGHT, padx=10)
        
        print("     혼합 레이아웃 데모 생성 완료")
    
    def run(self):
        """데모 실행"""
        print("   레이아웃 관리 데모 시작")
        # self.root.mainloop()  # 실제 실행 시 주석 해제

def demonstrate_layouts():
    """레이아웃 관리 시연"""
    print("5. 레이아웃 매니저:")
    
    demo = LayoutDemo()
    demo.run()

demonstrate_layouts()
```

## 4. 고급 GUI 기능

### 4.1 메뉴와 대화상자

```python
print("\n=== 고급 GUI 기능 ===")

class AdvancedGUIFeatures:
    """고급 GUI 기능 데모"""
    
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("고급 GUI 기능")
        self.root.geometry("800x600")
        
        # 애플리케이션 상태
        self.file_content = ""
        self.is_modified = False
        self.current_file = None
        
        self.create_menu()
        self.create_toolbar()
        self.create_main_content()
        self.create_status_bar()
        self.create_context_menu()
        
        # 키보드 단축키 바인딩
        self.bind_shortcuts()
    
    def create_menu(self):
        """메뉴바 생성"""
        
        menubar = tk.Menu(self.root)
        self.root.config(menu=menubar)
        
        # 파일 메뉴
        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="파일", menu=file_menu)
        
        file_menu.add_command(label="새로 만들기", command=self.new_file, accelerator="Ctrl+N")
        file_menu.add_command(label="열기...", command=self.open_file, accelerator="Ctrl+O")
        file_menu.add_separator()
        file_menu.add_command(label="저장", command=self.save_file, accelerator="Ctrl+S")
        file_menu.add_command(label="다른 이름으로 저장...", command=self.save_as_file, accelerator="Ctrl+Shift+S")
        file_menu.add_separator()
        
        # 최근 파일 서브메뉴
        recent_menu = tk.Menu(file_menu, tearoff=0)
        file_menu.add_cascade(label="최근 파일", menu=recent_menu)
        recent_menu.add_command(label="파일1.txt")
        recent_menu.add_command(label="파일2.py")
        recent_menu.add_command(label="프로젝트.md")
        
        file_menu.add_separator()
        file_menu.add_command(label="종료", command=self.quit_app, accelerator="Ctrl+Q")
        
        # 편집 메뉴
        edit_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="편집", menu=edit_menu)
        
        edit_menu.add_command(label="실행 취소", command=self.undo, accelerator="Ctrl+Z")
        edit_menu.add_command(label="다시 실행", command=self.redo, accelerator="Ctrl+Y")
        edit_menu.add_separator()
        edit_menu.add_command(label="잘라내기", command=self.cut, accelerator="Ctrl+X")
        edit_menu.add_command(label="복사", command=self.copy, accelerator="Ctrl+C")
        edit_menu.add_command(label="붙여넣기", command=self.paste, accelerator="Ctrl+V")
        edit_menu.add_separator()
        edit_menu.add_command(label="모두 선택", command=self.select_all, accelerator="Ctrl+A")
        edit_menu.add_command(label="찾기...", command=self.find, accelerator="Ctrl+F")
        edit_menu.add_command(label="바꾸기...", command=self.replace, accelerator="Ctrl+H")
        
        # 보기 메뉴 (체크 메뉴 예제)
        view_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="보기", menu=view_menu)
        
        self.show_toolbar_var = tk.BooleanVar(value=True)
        self.show_status_var = tk.BooleanVar(value=True)
        self.word_wrap_var = tk.BooleanVar(value=False)
        
        view_menu.add_checkbutton(label="툴바", variable=self.show_toolbar_var, command=self.toggle_toolbar)
        view_menu.add_checkbutton(label="상태바", variable=self.show_status_var, command=self.toggle_status_bar)
        view_menu.add_separator()
        view_menu.add_checkbutton(label="줄 바꿈", variable=self.word_wrap_var, command=self.toggle_word_wrap)
        view_menu.add_separator()
        
        # 확대/축소 서브메뉴
        zoom_menu = tk.Menu(view_menu, tearoff=0)
        view_menu.add_cascade(label="확대/축소", menu=zoom_menu)
        zoom_menu.add_command(label="확대", command=lambda: self.zoom(1.2))
        zoom_menu.add_command(label="축소", command=lambda: self.zoom(0.8))
        zoom_menu.add_command(label="원래 크기", command=lambda: self.zoom(1.0, reset=True))
        
        # 도구 메뉴
        tools_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="도구", menu=tools_menu)
        
        tools_menu.add_command(label="색상 선택기", command=self.color_chooser)
        tools_menu.add_command(label="폰트 선택기", command=self.font_chooser)
        tools_menu.add_separator()
        tools_menu.add_command(label="설정...", command=self.show_preferences)
        
        # 도움말 메뉴
        help_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="도움말", menu=help_menu)
        
        help_menu.add_command(label="사용법", command=self.show_help)
        help_menu.add_command(label="키보드 단축키", command=self.show_shortcuts)
        help_menu.add_separator()
        help_menu.add_command(label="정보", command=self.show_about)
        
        print("     메뉴바 생성 완료")
    
    def create_toolbar(self):
        """툴바 생성"""
        
        self.toolbar_frame = tk.Frame(self.root, bg="lightgray", height=40)
        self.toolbar_frame.pack(side=tk.TOP, fill=tk.X)
        self.toolbar_frame.pack_propagate(False)
        
        # 툴바 버튼들
        buttons = [
            ("새로 만들기", self.new_file, "📄"),
            ("열기", self.open_file, "📁"),
            ("저장", self.save_file, "💾"),
            ("-", None, None),  # 구분선
            ("잘라내기", self.cut, "✂️"),
            ("복사", self.copy, "📋"),
            ("붙여넣기", self.paste, "📌"),
            ("-", None, None),  # 구분선
            ("찾기", self.find, "🔍"),
            ("설정", self.show_preferences, "⚙️")
        ]
        
        for btn_text, btn_command, btn_icon in buttons:
            if btn_text == "-":
                # 구분선
                separator = tk.Frame(self.toolbar_frame, width=2, bg="gray")
                separator.pack(side=tk.LEFT, fill=tk.Y, padx=5, pady=5)
            else:
                btn = tk.Button(
                    self.toolbar_frame,
                    text=f"{btn_icon} {btn_text}",
                    command=btn_command,
                    relief=tk.FLAT,
                    padx=10,
                    pady=5
                )
                btn.pack(side=tk.LEFT, padx=2, pady=5)
        
        print("     툴바 생성 완료")
    
    def create_main_content(self):
        """메인 콘텐츠 영역 생성"""
        
        self.main_frame = tk.Frame(self.root)
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # 텍스트 에디터
        self.text_editor = tk.Text(
            self.main_frame,
            wrap=tk.NONE,
            undo=True,
            font=("Consolas", 11)
        )
        
        # 스크롤바
        v_scrollbar = tk.Scrollbar(self.main_frame, orient=tk.VERTICAL, command=self.text_editor.yview)
        h_scrollbar = tk.Scrollbar(self.main_frame, orient=tk.HORIZONTAL, command=self.text_editor.xview)
        
        self.text_editor.config(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
        # 배치
        self.text_editor.grid(row=0, column=0, sticky="nsew")
        v_scrollbar.grid(row=0, column=1, sticky="ns")
        h_scrollbar.grid(row=1, column=0, sticky="ew")
        
        # 그리드 가중치 설정
        self.main_frame.rowconfigure(0, weight=1)
        self.main_frame.columnconfigure(0, weight=1)
        
        # 텍스트 변경 이벤트 바인딩
        self.text_editor.bind("<KeyPress>", self.on_text_change)
        self.text_editor.bind("<Button-1>", self.update_cursor_position)
        self.text_editor.bind("<KeyRelease>", self.update_cursor_position)
        
        print("     메인 콘텐츠 영역 생성 완료")
    
    def create_status_bar(self):
        """상태바 생성"""
        
        self.status_frame = tk.Frame(self.root, bg="darkgray", height=25)
        self.status_frame.pack(side=tk.BOTTOM, fill=tk.X)
        self.status_frame.pack_propagate(False)
        
        # 상태 정보 레이블들
        self.status_label = tk.Label(self.status_frame, text="준비", bg="darkgray", fg="white", anchor="w")
        self.status_label.pack(side=tk.LEFT, padx=10)
        
        self.cursor_label = tk.Label(self.status_frame, text="줄: 1, 열: 1", bg="darkgray", fg="white")
        self.cursor_label.pack(side=tk.RIGHT, padx=10)
        
        self.encoding_label = tk.Label(self.status_frame, text="UTF-8", bg="darkgray", fg="white")
        self.encoding_label.pack(side=tk.RIGHT, padx=10)
        
        print("     상태바 생성 완료")
    
    def create_context_menu(self):
        """컨텍스트 메뉴 (우클릭 메뉴) 생성"""
        
        self.context_menu = tk.Menu(self.root, tearoff=0)
        self.context_menu.add_command(label="잘라내기", command=self.cut)
        self.context_menu.add_command(label="복사", command=self.copy)
        self.context_menu.add_command(label="붙여넣기", command=self.paste)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="모두 선택", command=self.select_all)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="찾기...", command=self.find)
        
        # 텍스트 에디터에 우클릭 이벤트 바인딩
        self.text_editor.bind("<Button-3>", self.show_context_menu)
        
        print("     컨텍스트 메뉴 생성 완료")
    
    def bind_shortcuts(self):
        """키보드 단축키 바인딩"""
        
        shortcuts = [
            ("<Control-n>", self.new_file),
            ("<Control-o>", self.open_file),
            ("<Control-s>", self.save_file),
            ("<Control-Shift-s>", self.save_as_file),
            ("<Control-q>", self.quit_app),
            ("<Control-z>", self.undo),
            ("<Control-y>", self.redo),
            ("<Control-x>", self.cut),
            ("<Control-c>", self.copy),
            ("<Control-v>", self.paste),
            ("<Control-a>", self.select_all),
            ("<Control-f>", self.find),
            ("<Control-h>", self.replace),
            ("<F1>", self.show_help)
        ]
        
        for shortcut, command in shortcuts:
            self.root.bind(shortcut, lambda event, cmd=command: cmd())
        
        print("     키보드 단축키 바인딩 완료")
    
    # 메뉴 명령어 구현
    def new_file(self):
        """새 파일"""
        if self.is_modified:
            result = messagebox.askyesnocancel("저장", "변경사항을 저장하시겠습니까?")
            if result is True:
                self.save_file()
            elif result is None:
                return
        
        self.text_editor.delete("1.0", tk.END)
        self.current_file = None
        self.is_modified = False
        self.update_title()
        self.status_label.config(text="새 파일")
    
    def open_file(self):
        """파일 열기"""
        filename = filedialog.askopenfilename(
            title="파일 열기",
            filetypes=[
                ("텍스트 파일", "*.txt"),
                ("Python 파일", "*.py"),
                ("모든 파일", "*.*")
            ]
        )
        
        if filename:
            try:
                # 실제로는 파일을 읽어옴 (시뮬레이션)
                self.text_editor.delete("1.0", tk.END)
                sample_content = f"# 파일: {os.path.basename(filename)}\n# 파일 내용 시뮬레이션\n\nprint('Hello, World!')\n"
                self.text_editor.insert("1.0", sample_content)
                
                self.current_file = filename
                self.is_modified = False
                self.update_title()
                self.status_label.config(text=f"파일 열림: {os.path.basename(filename)}")
                
            except Exception as e:
                messagebox.showerror("오류", f"파일을 열 수 없습니다:\n{str(e)}")
    
    def save_file(self):
        """파일 저장"""
        if self.current_file:
            # 실제로는 파일에 저장 (시뮬레이션)
            self.is_modified = False
            self.update_title()
            self.status_label.config(text=f"저장됨: {os.path.basename(self.current_file)}")
            return True
        else:
            return self.save_as_file()
    
    def save_as_file(self):
        """다른 이름으로 저장"""
        filename = filedialog.asksaveasfilename(
            title="다른 이름으로 저장",
            defaultextension=".txt",
            filetypes=[
                ("텍스트 파일", "*.txt"),
                ("Python 파일", "*.py"),
                ("모든 파일", "*.*")
            ]
        )
        
        if filename:
            # 실제로는 파일에 저장 (시뮬레이션)
            self.current_file = filename
            self.is_modified = False
            self.update_title()
            self.status_label.config(text=f"저장됨: {os.path.basename(filename)}")
            return True
        return False
    
    def quit_app(self):
        """애플리케이션 종료"""
        if self.is_modified:
            result = messagebox.askyesnocancel("저장", "변경사항을 저장하시겠습니까?")
            if result is True:
                if not self.save_file():
                    return
            elif result is None:
                return
        
        self.root.destroy()
    
    def undo(self):
        """실행 취소"""
        try:
            self.text_editor.edit_undo()
        except tk.TclError:
            pass
    
    def redo(self):
        """다시 실행"""
        try:
            self.text_editor.edit_redo()
        except tk.TclError:
            pass
    
    def cut(self):
        """잘라내기"""
        try:
            self.text_editor.event_generate("<<Cut>>")
        except tk.TclError:
            pass
    
    def copy(self):
        """복사"""
        try:
            self.text_editor.event_generate("<<Copy>>")
        except tk.TclError:
            pass
    
    def paste(self):
        """붙여넣기"""
        try:
            self.text_editor.event_generate("<<Paste>>")
        except tk.TclError:
            pass
    
    def select_all(self):
        """모두 선택"""
        self.text_editor.tag_add(tk.SEL, "1.0", tk.END)
        self.text_editor.mark_set(tk.INSERT, "1.0")
        self.text_editor.see(tk.INSERT)
    
    def find(self):
        """찾기 대화상자"""
        find_text = tk.simpledialog.askstring("찾기", "찾을 텍스트:")
        if find_text:
            # 검색 구현 (시뮬레이션)
            self.status_label.config(text=f"검색: '{find_text}'")
    
    def replace(self):
        """바꾸기 대화상자"""
        # 커스텀 대화상자 생성
        dialog = tk.Toplevel(self.root)
        dialog.title("바꾸기")
        dialog.geometry("400x150")
        dialog.transient(self.root)
        dialog.grab_set()
        
        tk.Label(dialog, text="찾을 텍스트:").grid(row=0, column=0, sticky="e", padx=5, pady=5)
        find_entry = tk.Entry(dialog, width=30)
        find_entry.grid(row=0, column=1, padx=5, pady=5)
        
        tk.Label(dialog, text="바꿀 텍스트:").grid(row=1, column=0, sticky="e", padx=5, pady=5)
        replace_entry = tk.Entry(dialog, width=30)
        replace_entry.grid(row=1, column=1, padx=5, pady=5)
        
        button_frame = tk.Frame(dialog)
        button_frame.grid(row=2, column=0, columnspan=2, pady=10)
        
        tk.Button(button_frame, text="바꾸기", command=lambda: self.do_replace(find_entry.get(), replace_entry.get(), dialog)).pack(side=tk.LEFT, padx=5)
        tk.Button(button_frame, text="모두 바꾸기", command=lambda: self.do_replace_all(find_entry.get(), replace_entry.get(), dialog)).pack(side=tk.LEFT, padx=5)
        tk.Button(button_frame, text="취소", command=dialog.destroy).pack(side=tk.LEFT, padx=5)
        
        find_entry.focus()
    
    def do_replace(self, find_text, replace_text, dialog):
        """단일 바꾸기"""
        if find_text:
            self.status_label.config(text=f"바꾸기: '{find_text}' → '{replace_text}'")
        dialog.destroy()
    
    def do_replace_all(self, find_text, replace_text, dialog):
        """모두 바꾸기"""
        if find_text:
            self.status_label.config(text=f"모두 바꾸기: '{find_text}' → '{replace_text}'")
        dialog.destroy()
    
    def color_chooser(self):
        """색상 선택기"""
        color = colorchooser.askcolor(title="색상 선택")
        if color[1]:
            self.text_editor.config(bg=color[1])
            self.status_label.config(text=f"배경색 변경: {color[1]}")
    
    def font_chooser(self):
        """폰트 선택기 (시뮬레이션)"""
        fonts = ["Arial", "Times New Roman", "Consolas", "Courier New"]
        font = tk.simpledialog.askstring("폰트 선택", f"폰트를 선택하세요:\n{', '.join(fonts)}")
        if font and font in fonts:
            current_font = self.text_editor.cget("font")
            if isinstance(current_font, str):
                size = 11
            else:
                size = current_font[1] if len(current_font) > 1 else 11
            
            self.text_editor.config(font=(font, size))
            self.status_label.config(text=f"폰트 변경: {font}")
    
    def show_preferences(self):
        """설정 대화상자"""
        prefs_dialog = tk.Toplevel(self.root)
        prefs_dialog.title("설정")
        prefs_dialog.geometry("500x400")
        prefs_dialog.transient(self.root)
        prefs_dialog.grab_set()
        
        notebook = ttk.Notebook(prefs_dialog)
        notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # 일반 탭
        general_tab = ttk.Frame(notebook)
        notebook.add(general_tab, text="일반")
        
        tk.Checkbutton(general_tab, text="시작 시 마지막 파일 열기").pack(anchor="w", padx=10, pady=5)
        tk.Checkbutton(general_tab, text="자동 저장 활성화").pack(anchor="w", padx=10, pady=5)
        tk.Checkbutton(general_tab, text="줄 번호 표시").pack(anchor="w", padx=10, pady=5)
        
        # 편집기 탭
        editor_tab = ttk.Frame(notebook)
        notebook.add(editor_tab, text="편집기")
        
        tk.Label(editor_tab, text="탭 크기:").pack(anchor="w", padx=10, pady=5)
        tab_size_var = tk.IntVar(value=4)
        tk.Spinbox(editor_tab, from_=2, to=8, textvariable=tab_size_var).pack(anchor="w", padx=20)
        
        tk.Checkbutton(editor_tab, text="공백을 탭으로 변환").pack(anchor="w", padx=10, pady=5)
        tk.Checkbutton(editor_tab, text="자동 들여쓰기").pack(anchor="w", padx=10, pady=5)
        
        # 버튼 프레임
        button_frame = tk.Frame(prefs_dialog)
        button_frame.pack(side=tk.BOTTOM, fill=tk.X, padx=10, pady=10)
        
        tk.Button(button_frame, text="확인", command=prefs_dialog.destroy).pack(side=tk.RIGHT, padx=5)
        tk.Button(button_frame, text="취소", command=prefs_dialog.destroy).pack(side=tk.RIGHT, padx=5)
    
    def show_help(self):
        """도움말 대화상자"""
        help_dialog = tk.Toplevel(self.root)
        help_dialog.title("도움말")
        help_dialog.geometry("600x400")
        help_dialog.transient(self.root)
        
        help_text = tk.Text(help_dialog, wrap=tk.WORD, padx=10, pady=10)
        help_text.pack(fill=tk.BOTH, expand=True)
        
        help_content = """GUI 텍스트 에디터 사용법

1. 파일 작업:
   - 새로 만들기: Ctrl+N
   - 열기: Ctrl+O
   - 저장: Ctrl+S
   - 다른 이름으로 저장: Ctrl+Shift+S

2. 편집 작업:
   - 실행 취소: Ctrl+Z
   - 다시 실행: Ctrl+Y
   - 잘라내기: Ctrl+X
   - 복사: Ctrl+C
   - 붙여넣기: Ctrl+V
   - 모두 선택: Ctrl+A

3. 검색 및 바꾸기:
   - 찾기: Ctrl+F
   - 바꾸기: Ctrl+H

4. 보기 옵션:
   - 툴바 표시/숨기기
   - 상태바 표시/숨기기
   - 줄 바꿈 설정
   - 확대/축소

5. 기타 기능:
   - 우클릭으로 컨텍스트 메뉴 사용
   - 색상 및 폰트 변경
   - 설정 사용자 정의
"""
        
        help_text.insert("1.0", help_content)
        help_text.config(state=tk.DISABLED)
        
        tk.Button(help_dialog, text="닫기", command=help_dialog.destroy).pack(pady=10)
    
    def show_shortcuts(self):
        """키보드 단축키 대화상자"""
        shortcuts_dialog = tk.Toplevel(self.root)
        shortcuts_dialog.title("키보드 단축키")
        shortcuts_dialog.geometry("400x500")
        shortcuts_dialog.transient(self.root)
        
        # 단축키 목록을 표로 표시
        tree_frame = tk.Frame(shortcuts_dialog)
        tree_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # 트리뷰 시뮬레이션 (실제로는 ttk.Treeview 사용)
        shortcuts_text = tk.Text(tree_frame, font=("Courier", 10))
        shortcuts_text.pack(fill=tk.BOTH, expand=True)
        
        shortcuts_list = [
            ("기능", "단축키"),
            ("=" * 30, "=" * 15),
            ("새로 만들기", "Ctrl+N"),
            ("열기", "Ctrl+O"),
            ("저장", "Ctrl+S"),
            ("다른 이름으로 저장", "Ctrl+Shift+S"),
            ("종료", "Ctrl+Q"),
            ("실행 취소", "Ctrl+Z"),
            ("다시 실행", "Ctrl+Y"),
            ("잘라내기", "Ctrl+X"),
            ("복사", "Ctrl+C"),
            ("붙여넣기", "Ctrl+V"),
            ("모두 선택", "Ctrl+A"),
            ("찾기", "Ctrl+F"),
            ("바꾸기", "Ctrl+H"),
            ("도움말", "F1")
        ]
        
        for function, shortcut in shortcuts_list:
            shortcuts_text.insert(tk.END, f"{function:<25} {shortcut}\n")
        
        shortcuts_text.config(state=tk.DISABLED)
        
        tk.Button(shortcuts_dialog, text="닫기", command=shortcuts_dialog.destroy).pack(pady=10)
    
    def show_about(self):
        """정보 대화상자"""
        about_info = """GUI 텍스트 에디터
버전 1.0

Python tkinter를 사용하여 제작된
간단한 텍스트 에디터입니다.

© 2025 Python Tutorial Project"""
        
        messagebox.showinfo("정보", about_info)
    
    # 보기 메뉴 토글 함수들
    def toggle_toolbar(self):
        """툴바 표시/숨기기"""
        if self.show_toolbar_var.get():
            self.toolbar_frame.pack(side=tk.TOP, fill=tk.X, before=self.main_frame)
        else:
            self.toolbar_frame.pack_forget()
    
    def toggle_status_bar(self):
        """상태바 표시/숨기기"""
        if self.show_status_var.get():
            self.status_frame.pack(side=tk.BOTTOM, fill=tk.X)
        else:
            self.status_frame.pack_forget()
    
    def toggle_word_wrap(self):
        """줄 바꿈 토글"""
        if self.word_wrap_var.get():
            self.text_editor.config(wrap=tk.WORD)
        else:
            self.text_editor.config(wrap=tk.NONE)
    
    def zoom(self, factor, reset=False):
        """확대/축소"""
        current_font = self.text_editor.cget("font")
        if isinstance(current_font, str):
            font_family = current_font
            font_size = 11
        else:
            font_family = current_font[0] if current_font else "Arial"
            font_size = current_font[1] if len(current_font) > 1 else 11
        
        if reset:
            new_size = 11
        else:
            new_size = max(8, min(32, int(font_size * factor)))
        
        self.text_editor.config(font=(font_family, new_size))
        self.status_label.config(text=f"폰트 크기: {new_size}")
    
    # 이벤트 핸들러들
    def show_context_menu(self, event):
        """컨텍스트 메뉴 표시"""
        try:
            self.context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.context_menu.grab_release()
    
    def on_text_change(self, event):
        """텍스트 변경 이벤트"""
        if not self.is_modified:
            self.is_modified = True
            self.update_title()
    
    def update_cursor_position(self, event=None):
        """커서 위치 업데이트"""
        cursor_pos = self.text_editor.index(tk.INSERT)
        line, col = cursor_pos.split('.')
        self.cursor_label.config(text=f"줄: {line}, 열: {int(col)+1}")
    
    def update_title(self):
        """윈도우 타이틀 업데이트"""
        if self.current_file:
            filename = os.path.basename(self.current_file)
        else:
            filename = "제목 없음"
        
        if self.is_modified:
            filename = "*" + filename
        
        self.root.title(f"{filename} - GUI 텍스트 에디터")
    
    def run(self):
        """애플리케이션 실행"""
        print("   고급 GUI 기능 데모 시작")
        self.update_title()
        # self.root.mainloop()  # 실제 실행 시 주석 해제

def demonstrate_advanced_features():
    """고급 GUI 기능 시연"""
    print("6. 메뉴와 대화상자:")
    
    app = AdvancedGUIFeatures()
    app.run()

demonstrate_advanced_features()
```

## 5. 연습 문제

### 연습 1: 간단한 계산기
기본적인 사칙연산을 수행하는 GUI 계산기를 구현하세요:
- Grid 레이아웃으로 버튼 배치
- 연산 결과 표시
- 키보드 입력 지원
- 오류 처리

### 연습 2: 이미지 뷰어
이미지 파일을 보여주는 GUI 애플리케이션을 구현하세요:
- 파일 열기 대화상자
- 이미지 확대/축소
- 다음/이전 이미지 탐색
- 썸네일 목록

### 연습 3: 텍스트 에디터
기본적인 텍스트 편집 기능을 가진 에디터를 구현하세요:
- 파일 열기/저장
- 찾기/바꾸기 기능
- 폰트 변경
- 상태바

### 연습 4: 데이터베이스 GUI 클라이언트
SQLite 데이터베이스를 관리하는 GUI를 구현하세요:
- 테이블 목록 표시
- 데이터 조회/편집
- SQL 쿼리 실행
- 결과 내보내기

## 정리

이 챕터에서 학습한 내용:

1. **GUI 기초**: tkinter의 기본 구조와 위젯 시스템
2. **다양한 위젯**: Entry, Text, Listbox, Button, Label 등의 활용
3. **이벤트 처리**: 마우스, 키보드, 윈도우 이벤트의 처리 방법
4. **콜백 패턴**: 이벤트 기반 프로그래밍과 콜백 관리
5. **레이아웃 관리**: Pack, Grid, Place 매니저의 특성과 활용
6. **고급 기능**: 메뉴, 대화상자, 툴바, 상태바 구현
7. **실무 패턴**: MVC 패턴과 사용자 친화적 인터페이스 설계

다음 단계에서는 고급 과정으로 넘어가 더 복잡한 GUI 프레임워크나 웹 기반 인터페이스 개발을 학습하게 됩니다.

### 핵심 포인트
- GUI는 사용자 경험(UX)을 최우선으로 고려해야 합니다
- 이벤트 기반 프로그래밍의 비동기적 특성을 이해하세요
- 적절한 레이아웃 매니저를 선택하여 반응형 UI를 만드세요
- 에러 처리와 사용자 피드백을 잊지 마세요
- 키보드 단축키와 접근성을 고려하세요
- 코드의 재사용성과 유지보수성을 위해 모듈화하세요
</rewritten_file> 