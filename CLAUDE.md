# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**AQUAURORE** — 청소년 대상 인터랙티브 웹 전시 프로젝트. 전시장, 굿즈샵, 작가 개인전, 포스트잇 게시판, Phaser.js 게임 씬으로 구성.

현재 **대규모 리팩토링 진행 중**: 기존 순수 HTML/CSS/JS 모노레포 → 분리된 프론트/백엔드 구조로 전환.

- **백엔드 레포** (현재 디렉토리): `Interactive-Web` → Spring Boot 3 REST API 서버
- **프론트엔드 레포**: `C:\Users\hansb\Desktop\Interactive-Web-FE` → React 18 + TypeScript + Vite

---

## 리팩토링 진행 상황

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 1 | 기반 세팅 (Thymeleaf 제거, REST 전환, Vite 프로젝트 생성) | ✅ 완료 |
| Phase 2 | 백엔드 도메인 모델 + REST API (Artwork, Artist, Goods, Memo, Order) | 🔄 진행 중 |
| Phase 3 | 기존 HTML/CSS/JS → React 컴포넌트 전환 | ⬜ 미시작 |
| Phase 4 | 미완성 기능 완성 (포스트잇 게시판, 굿즈 주문, 관리자 페이지) | ⬜ 미시작 |
| Phase 5 | 배포 & CI/CD (Vercel 프론트, Railway 백엔드) | ⬜ 미시작 |

---

## 백엔드 개발 명령어

> **필수**: Java 17만 설치돼 있음 (`C:\Program Files\Java\jdk-17.0.1`). Gradle 실행 전 반드시 JAVA_HOME 설정.

```powershell
# PowerShell에서 JAVA_HOME 설정 후 실행
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17.0.1"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# 실행
.\gradlew.bat bootRun

# 컴파일만
.\gradlew.bat compileJava

# 테스트
.\gradlew.bat test

# 빌드 (jar 생성)
.\gradlew.bat build
```

실행 후 확인:
- API 헬스체크: `http://localhost:8080/api/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 콘솔 (dev only): `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:aquaurore`)

---

## 프론트엔드 개발 명령어

```bash
cd C:\Users\hansb\Desktop\Interactive-Web-FE

npm run dev      # http://localhost:5173
npm run build    # tsc + vite build
npm run preview  # 빌드 결과 미리보기
```

---

## 백엔드 아키텍처

### 기술 스택
- Spring Boot 3.4.5 / Java 17 / Gradle
- Spring Data JPA + Hibernate
- Spring Security (JWT Stateless)
- SpringDoc OpenAPI (Swagger)
- **dev 프로필**: H2 인메모리 DB (`ddl-auto: create-drop`)
- **prod 프로필**: MySQL (`ddl-auto: validate`, 환경변수 `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` 필요)

### 패키지 구조 (목표)
```
com.example.aquaurore
├── common/         # ApiResponse<T> 공통 응답 래퍼
├── config/         # SecurityConfig, WebConfig (CORS)
├── controller/     # @RestController — /api/** 엔드포인트
├── domain/         # @Entity 클래스 (Phase 2에서 추가 예정)
├── dto/            # Request/Response DTO
├── repository/     # JPA Repository
└── service/        # 비즈니스 로직
```

### 공통 응답 포맷
모든 API는 `ApiResponse<T>`로 응답을 감싼다:
```json
{ "success": true, "data": {...}, "error": null }
{ "success": false, "data": null, "error": "메시지" }
```

### Security 규칙
- `/api/admin/**` → JWT 인증 필요
- 나머지 `/api/**` → 인증 불필요
- H2 콘솔, Swagger → 전체 허용

### CORS 허용 오리진
- `http://localhost:5173` (Vite dev)
- `https://*.vercel.app` (Vercel 프리뷰)
- `https://aquaurore.vercel.app` (프로덕션 — 도메인 확정 후 변경)

---

## 프론트엔드 아키텍처

### 기술 스택
- React 18 + TypeScript / Vite 4 (Node 17 환경이라 Vite 5 불가)
- Tailwind CSS (다크 배경 기본: `bg-[#0a0a0a]`)
- Zustand (전역 상태), React Query v3 (서버 상태)
- Framer Motion (인터랙션/애니메이션)
- Axios (`src/api/client.ts`) — JWT 자동 주입, 401 시 localStorage 토큰 제거

### API 호출
`src/api/client.ts`의 Axios 인스턴스 사용. 로컬 dev에서는 Vite 프록시(`/api` → `localhost:8080`)를 통해 CORS 없이 호출됨. `VITE_API_URL` 환경변수로 오버라이드 가능.

### 라우트 계획 (Phase 3)
| 경로 | 페이지 |
|------|--------|
| `/` | 메인 전시장 |
| `/artwork/:id` | 작품 상세 |
| `/artist/:id` | 작가 개인전 (chaewon, jiyoung, yena) |
| `/goods` | 굿즈샵 |
| `/memo` | 포스트잇 게시판 |
| `/admin` | 관리자 (JWT 보호) |

---

## 기존 정적 파일 (마이그레이션 대상)

`src/main/resources/static/`에 기존 HTML/CSS/JS가 그대로 남아 있음. Phase 3에서 React로 전환 예정.

**특이사항**: `Exhibition_Page/page3/`에 **Phaser.js 게임 씬**이 있음(`GameScene.js`, `StartPage.js`). React와 직접 통합 시 충돌 가능 — `useEffect`로 마운트/언마운트 관리하거나 `public/`에 두고 iframe으로 임베드하는 방식 중 결정 필요.

---

## 미완성 기능 (Phase 4 목표)

- 포스트잇 게시판 (`Community_Page/note.html`) — 등록/삭제 API 미구현
- 굿즈 주문/결제 플로우 — `Goods_Page/payment/` 미완성
- 관리자 페이지 — 작품·굿즈 CRUD UI 없음
