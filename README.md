# Python Tutorial Project

🌐 **웹사이트**: [https://python-tutors.netlify.app/](https://python-tutors.netlify.app/)

## 프로젝트 개요
이 프로젝트는 파이썬 프로그래밍을 체계적으로 학습할 수 있는 종합적인 튜토리얼 시스템입니다. 초급부터 고급까지 3단계로 구성되어 있으며, 각 단계별로 상세한 커리큘럼과 실습 자료, 퀴즈를 제공합니다.

## 학습 단계

### 🟢 초급 (Beginner)
- **대상**: 프로그래밍 경험이 없는 완전 초보자
- **기간**: 4-6주 (주 3-4시간)
- **내용**: 파이썬 기초 문법, 데이터 타입, 조건문, 반복문, 함수 등
- **목표**: 간단한 프로그램을 작성할 수 있는 능력 개발

### 🟡 중급 (Intermediate)  
- **대상**: 파이썬 기초를 완료한 학습자
- **기간**: 6-8주 (주 4-5시간)
- **내용**: 객체지향 프로그래밍, 고급 함수, 파일 처리, 웹 스크래핑 등
- **목표**: 실무에서 활용 가능한 중급 프로그래밍 기술 습득

### 🔴 고급 (Advanced)
- **대상**: 파이썬 중급을 완료하고 전문적인 개발을 원하는 학습자
- **기간**: 8-10주 (주 5-6시간)
- **내용**: 메타클래스, 동시성, 성능 최적화, 시스템 설계 등
- **목표**: 전문 개발자 수준의 고급 기술 습득

## 프로젝트 구조

```
python-tutorial/
├── docs/                    # MkDocs 웹사이트 소스
│   ├── tutorials/          # 마크다운 튜토리얼 문서
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── quizzes/            # JSON 형태의 퀴즈 파일
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── curricula/          # 커리큘럼 문서
│   ├── stylesheets/        # 커스텀 CSS
│   ├── javascripts/        # 커스텀 JS
│   └── index.md            # 홈페이지
├── site/                   # 빌드된 정적 사이트
├── mkdocs.yml              # MkDocs 설정
├── requirements.txt        # Python 의존성
├── vercel.json             # Vercel 배포 설정
├── netlify.toml            # Netlify 배포 설정
├── runtime.txt             # Python 런타임 버전
├── _redirects              # Netlify 리다이렉트 규칙
├── changelogs.md           # 프로젝트 진행 로그
├── .cursorrules            # 프로젝트 규칙과 가이드라인
├── README.md               # 프로젝트 개요 (이 파일)
└── LICENSE                 # 라이센스
```

## 학습 방법

1. **커리큘럼 확인**: `curricula/` 폴더에서 해당 단계의 커리큘럼을 확인합니다.
2. **튜토리얼 학습**: `tutorials/` 폴더의 마크다운 문서로 단계별 학습을 진행합니다.
3. **퀴즈 풀이**: 각 챕터 완료 후 `quizzes/` 폴더의 퀴즈로 학습 내용을 점검합니다.
4. **실습 프로젝트**: 커리큘럼에 제시된 실습 프로젝트를 통해 실무 경험을 쌓습니다.

## 특징

### ✨ 체계적인 학습 과정
- 단계별로 명확한 학습 목표와 로드맵 제공
- 실무 중심의 실용적인 내용 구성
- 이론과 실습의 균형잡힌 조합

### 📚 풍부한 학습 자료
- 마크다운 기반의 읽기 쉬운 튜토리얼
- 각 챕터별 퀴즈를 통한 학습 확인
- 실습 프로젝트를 통한 응용 능력 개발

### 🛠️ 실무 적용 가능
- 현업에서 실제로 사용되는 패턴과 기법
- 최신 파이썬 기능과 라이브러리 반영
- 코드 품질과 best practices 강조

## 시작하기

### 환경 설정
```bash
# Python 3.8+ 설치 확인
python --version

# 코드 실행을 위한 기본 패키지 설치 (필요시)
pip install -r requirements.txt
```

### 학습 시작
1. 본인의 프로그래밍 수준에 맞는 커리큘럼을 선택합니다.
2. `curricula/` 폴더에서 해당 커리큘럼을 확인합니다.
3. `tutorials/` 폴더에서 첫 번째 튜토리얼을 시작합니다.

## 기여하기

이 프로젝트는 지속적으로 개선되고 있습니다. 다음과 같은 방법으로 기여할 수 있습니다:

- 오타나 오류 신고
- 새로운 튜토리얼 내용 제안
- 퀴즈 문제 추가
- 실습 프로젝트 아이디어 제공

## 라이센스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 연락처

궁금한 점이나 제안사항이 있으시면 언제든 연락해 주세요!

---

**Happy Python Learning! 🐍✨**

## 웹사이트 배포

이 프로젝트는 MkDocs로 구축된 정적 웹사이트로, 다양한 플랫폼에 배포할 수 있습니다.

### 🚀 Netlify 배포

#### 자동 배포 (권장)
1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 선택
3. GitHub 저장소 연결: `devlikebear/python-tutorial`
4. 빌드 설정 (자동 감지됨):
   - **Build command**: `pip install -r requirements.txt && mkdocs build`
   - **Publish directory**: `site`
   - **Python version**: `3.11` (runtime.txt에서 자동 설정)
5. "Deploy site" 클릭

#### 수동 배포
```bash
# 로컬에서 빌드
pip install -r requirements.txt
mkdocs build

# site/ 폴더를 Netlify에 드래그 앤 드롭
```

### ⚡ Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 선택
3. GitHub 저장소 가져오기: `devlikebear/python-tutorial`
4. 프레임워크: "Other" 선택
5. 빌드 설정:
   - **Build Command**: `pip install -r requirements.txt && mkdocs build`
   - **Output Directory**: `site`
6. "Deploy" 클릭

### 🔧 로컬 개발 서버

```bash
# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
mkdocs serve

# 브라우저에서 http://127.0.0.1:8000 접속
```

### 📦 정적 빌드

```bash
# 정적 사이트 빌드
mkdocs build

# site/ 폴더에 빌드 결과물 생성
``` 