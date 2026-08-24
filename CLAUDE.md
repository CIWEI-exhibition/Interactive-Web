# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

**AQUAURORE** — 청소년 대상 인터랙티브 웹 전시 프로젝트. 전시장, 굿즈샵, 작가 개인전, 포스트잇 게시판으로 구성.

- **백엔드 레포** (현재 디렉토리): `Interactive-Web` → Spring Boot 3 REST API 서버
- **프론트엔드 레포**: `C:\Users\hansb\Desktop\Interactive-Web-FE` → React 18 + TypeScript + Vite

---

## 백엔드 개발 명령어

# dev 프로필로 실행 (H2 인메모리)
.\gradlew.bat bootRun --args='--spring.profiles.active=dev'

# local 프로필로 실행 (MySQL, 기본값)
.\gradlew.bat bootRun

# 컴파일만
.\gradlew.bat compileJava

# 빌드 (jar 생성, 테스트 제외)
.\gradlew.bat build -x test
```

실행 후 확인:
- API 헬스체크: `http://localhost:8080/api/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 콘솔 (dev 전용): `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:aquaurore`)

---

## 프론트엔드 개발 명령어

```bash
cd C:\Users\hansb\Desktop\Interactive-Web-FE

npm run dev      # http://localhost:5173 (Vite 프록시: /api → localhost:8080)
npm run build    # tsc + vite build
npm run preview  # 빌드 결과 미리보기
```

---

## 백엔드 아키텍처

### 기술 스택
- Spring Boot 3.4.5 / Java 17 / Gradle
- Spring Data JPA + Hibernate
- Spring Security (JWT Stateless, JJWT 0.12.3)
- SpringDoc OpenAPI 2.3.0 (Swagger)
- H2 (dev) / MySQL 8 (local) / PostgreSQL Neon (prod)

### Spring 프로필

| 프로필 | DB | ddl-auto | 특이사항 |
|--------|----|----------|---------|
| `dev` | H2 인메모리 (`jdbc:h2:mem:aquaurore`) | create-drop | DataInitializer로 시드 데이터 자동 투입 (3 artists, 3 artworks, 4 goods) |
| `local` | MySQL localhost:3306, db: aquaurore | update | 기본 활성 프로필 (`spring.profiles.active: local`) |
| `prod` | PostgreSQL (Neon), 환경변수로 주입 | update | show-sql: false |


### 패키지 구조

```
com.example.aquaurore
├── common/
│   ├── ApiResponse<T>         # 공통 응답 래퍼
│   ├── DataInitializer        # dev 프로필 시드 데이터
│   └── GlobalExceptionHandler # IllegalArgument → 400, Exception → 500
├── config/
│   ├── SecurityConfig         # JWT Stateless, /api/admin/** 인증 필요
│   ├── WebConfig              # CORS 설정
│   ├── JwtUtil                # generate / isValid / getSubject
│   └── JwtFilter              # Bearer 토큰 파싱 필터
├── controller/
│   ├── ArtistController       # /api/artists, /api/admin/artists
│   ├── ArtworkController      # /api/artworks, /api/admin/artworks
│   ├── AuthController         # /api/auth/login
│   ├── GoodsController        # /api/goods, /api/admin/goods
│   ├── MemoController         # /api/memos
│   ├── OrderController        # /api/orders, /api/admin/orders
│   └── WebController          # 정적 파일 fallback
├── domain/
│   ├── Artist                 # id, name, email, bio, profileImageUrl
│   ├── Artwork                # id, title, description, imageUrl, displayOrder, artist(FK)
│   ├── Goods                  # id, name, description, price, stock, imageUrl
│   ├── Memo                   # id, nickname, content, color(hex), createdAt
│   └── Order                  # id, goods(FK), quantity, buyerName, buyerEmail, status(ENUM), createdAt
├── dto/                       # 각 도메인별 Request/Response DTO
├── repository/                # JpaRepository (ArtworkRepository: @EntityGraph로 N+1 방지)
└── service/                   # ArtistService, ArtworkService, GoodsService, MemoService, OrderService
```

### 엔드포인트 요약

**공개 (인증 불필요)**

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/auth/login` | 관리자 로그인 → JWT 반환 |
| GET | `/api/artists` | 전체 작가 목록 |
| GET | `/api/artists/{id}` | 작가 상세 |
| GET | `/api/artworks` | 작품 목록 (`?artistId=` 필터 가능) |
| GET | `/api/artworks/{id}` | 작품 상세 |
| GET | `/api/goods` | 굿즈 목록 |
| GET | `/api/goods/{id}` | 굿즈 상세 |
| GET | `/api/memos` | 메모 목록 |
| POST | `/api/memos` | 메모 작성 |
| DELETE | `/api/memos/{id}` | 메모 삭제 |
| POST | `/api/orders` | 굿즈 주문 생성 |

**관리자 (JWT 인증 필요)**

| Method | Path | 설명 |
|--------|------|------|
| POST | `/api/admin/artists` | 작가 등록 |
| POST | `/api/admin/artworks` | 작품 등록 |
| POST | `/api/admin/goods` | 굿즈 등록 |
| PUT | `/api/admin/goods/{id}` | 굿즈 수정 |
| DELETE | `/api/admin/goods/{id}` | 굿즈 삭제 |
| GET | `/api/admin/orders` | 전체 주문 목록 |
| PATCH | `/api/admin/orders/{id}/status` | 주문 상태 변경 |

### 공통 응답 포맷

```json
{ "success": true,  "data": { ... }, "error": null  }
{ "success": false, "data": null,    "error": "메시지" }
```

### Security 규칙
- `/api/admin/**` → JWT Bearer 토큰 인증 필요
- `/api/auth/**`, `/api/health`, Swagger (`/swagger-ui/**`, `/v3/api-docs/**`), H2 콘솔 (`/h2-console/**`) → 전체 허용
- 나머지 `/api/**` → 인증 불필요

### CORS 허용 오리진
- `http://localhost:5173` (Vite dev)
- `https://*.vercel.app` (Vercel 프리뷰)
- `https://aquaurore.vercel.app` (프로덕션)

허용 메서드: GET, POST, PUT, DELETE, PATCH, OPTIONS / `allowCredentials: true`

---

## 프론트엔드 아키텍처 (`C:\Users\hansb\Desktop\Interactive-Web-FE`)

### 기술 스택
- React 18.2 + TypeScript 5.2 / Vite 4.5
- Tailwind CSS 3.4 (다크 배경: `bg-[#0a0a0a]`)
- React Query v3 (서버 상태), Zustand 4 (전역 상태)
- Framer Motion 11 (애니메이션)
- Axios (`src/api/client.ts`) — JWT 자동 주입, 401 시 localStorage 토큰 제거

### 현재 등록된 React 라우트 (`App.tsx`)

| 경로 | 컴포넌트 |
|------|----------|
| `/` | `MainPage` (entrance.html로 redirect) |
| `/artist/:id` | `ArtistPage` |
| `/artwork/:id` | `ArtworkDetailPage` |
| `/admin` | `AdminPage` (로그인 + 관리 탭) |

> `/goods`, `/memo` 라우트는 **미등록** — 컴포넌트(GoodsPage, MemoPage)는 구현 완료이나 App.tsx에 Route 추가 필요.

### API 모듈 (`src/api/`)

| 파일 | 역할 |
|------|------|
| `client.ts` | Axios 인스턴스 (baseURL: `VITE_API_URL` 또는 `/api`) |
| `auth.ts` | 관리자 로그인 |
| `artists.ts` | 작가 목록/상세 |
| `artworks.ts` | 작품 목록/상세 |
| `goods.ts` | 굿즈 목록/상세 |
| `memos.ts` | 메모 목록/작성/삭제 |
| `orders.ts` | 주문 생성 |
| `admin.ts` | 관리자 기능 (주문 관리, 굿즈 CRUD) |

### 정적 HTML 유지 정책

아래 페이지는 픽셀 퍼펙트 레이아웃 유지를 위해 **React 전환하지 않고 정적 HTML로 유지**:

| 파일 | 설명 |
|------|------|
| `Main_Page/entrance.html` | 메인 입구 (`/`에서 redirect 대상) |
| `Exhibition_Page/` | 전시장 (Phaser.js 게임 씬 포함) |
| `Goods_Page/goods.html` | 굿즈샵 (NavBar `<a href>` 연결) |
| `Community_Page/note.html` | 포스트잇 게시판 (NavBar `<a href>` 연결) |

API 연동이 필요한 데이터 주도 페이지만 React 컴포넌트로 전환.