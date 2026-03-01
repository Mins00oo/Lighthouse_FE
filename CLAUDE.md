# 프로젝트 컨텍스트

Lighthouse는 서버 모니터링 및 로그 관리 시스템입니다. 프론트엔드는 **Minimals UI** 템플릿(v7) 기반의 React 관리자 대시보드로, MUI v7을 사용합니다. 
서버 상태 모니터링, 로그 데이터 시각화, 에러 추세 추적, 서버 인스턴스 관리 기능을 제공합니다.
개발진행중이며, 모니터링 시스템에 추가되어야 할 메뉴 화면 및 API 추가 연동이 필요한 상태입니다. (2026/03/01)

## 명령어

```bash
- `npm run dev`: 개발 서버 시작
- `npm run lint`: ESLint 검사
추가로 항상 eslint 오류 검사 후 오류나 경고가 발견되면 수정 및 재점검
```

### 기술 스택
- **React 19** + Vite + SWC, TypeScript 없이 순수 JS/JSX 사용
- **MUI v7** (Material UI) 컴포넌트, **MUI X DataGrid** 테이블
- **react-router v7** 라우팅 (브라우저 라우터, 페이지 lazy loading)
- **SWR** 데이터 페칭 (60초 간격 자동 갱신)
- **axios** HTTP 클라이언트 (설정된 인스턴스: `src/lib/axios.js`)
- **Zod + react-hook-form** 폼 유효성 검사
- **dayjs** 날짜 처리, **ApexCharts** 차트 시각화

### 경로 별칭
`src/...`는 `src/` 디렉토리로 별칭 처리됨 (`vite.config.js`에서 설정). 모듈 간 import 시 항상 `src/` 접두사를 사용하고, 상대 경로는 같은 모듈 내부에서만 사용합니다.

### 주요 디렉토리
- `src/sections/` — 기능별 UI 컴포넌트 (각 기능의 `view/` 하위 폴더에 메인 페이지 뷰 포함)
- `src/pages/` — `src/sections/*/view/`를 import하는 얇은 페이지 래퍼
- `src/routes/` — 라우트 정의 (`paths.js`에 경로 상수, `sections/`에 라우트 설정)
- `src/actions/` — SWR 데이터 페칭 훅 (예: `monitoring.js`에 대시보드 데이터)
- `src/lib/axios.js` — 인터셉터가 설정된 Axios 인스턴스 (401 리다이렉트, 서버 다운 감지)
- `src/components/` — Minimals 템플릿의 재사용 가능한 UI 컴포넌트
- `src/layouts/` — 레이아웃 셸 (dashboard, auth, main)
- `src/auth/` — 다중 프로바이더 지원 인증 시스템 (JWT 활성, `src/global-config.js`에서 설정)
- `src/_mock/` — 개발용 Mock/데모 데이터
- `src/context/` — React Context (예: `ServerHealthProvider` 서버 헬스 모니터링)
- `src/theme/` — MUI 테마 커스터마이징


대시보드 내비게이션은 `src/layouts/nav-config-dashboard.jsx`에 정의 (Dashboard, Logs, Server Instances).

### 데이터 흐름 패턴
1. API 엔드포인트는 `src/lib/axios.js`의 `endpoints` 객체에 정의
2. `src/actions/`의 SWR 훅이 `fetcher`로 엔드포인트를 래핑
3. Section의 뷰 컴포넌트가 훅을 사용하고 프레젠테이셔널 컴포넌트에 데이터 전달
4. 백엔드 URL은 `VITE_SERVER_URL` 환경변수로 설정 (기본값: `http://localhost:8080`)

## 코드 스타일

### Import 정렬 순서 (eslint-plugin-perfectionist 적용)
import는 줄 길이 기준으로 다음 그룹 순서로 정렬:
1. Style / side-effect
2. 외부 패키지
3. `@mui/*`
4. `src/routes/*`
5. `src/hooks/*`
6. `src/utils/*`
7. 내부 (`src/*`)
8. `src/components/*`
9. `src/sections/*`
10. `src/auth/*`
11. `src/types/*`
12. 상대 경로 import

### 포매팅 (Prettier)
- 작은따옴표, 세미콜론, 2칸 들여쓰기, 100자 줄 너비, trailing comma (es5), LF 줄바꿈

### 컴포넌트 컨벤션
- 함수형 컴포넌트, named export 사용 (section 컴포넌트는 default export 하지 않음)
- `src/pages/`의 페이지 파일은 default export 사용 (lazy loading용)
- 섹션 구분 주석: `// ----------------------------------------------------------------------`

## 중요 사항
- .env 파일은 절대 커밋하지 마세요
- 새 화면을 만들때는 기존 css 틀을 깨지 마세요
- 이 화면을 보는 대상 타겟은 대상 서버를 관리하는 운영자입니다.
	-> 디자인을 너무 화려하게 하지 마세요
	-> 운영자용 화면인 만큼 정보를 편리하고 깔끔하게 보여주는데 집중하고 기존 탬플릿에 너무 구속될 필요없음 
	-> 모니터링을 위한 시스템인만큼 전체 색상이나 간격, 글꼴, 글자크기 등은 너가 바꿔도 무관 
	-> 다만 바꾸게 된다면 다른 메뉴화면에서도 모두 동일하게 적용해야한다 .
