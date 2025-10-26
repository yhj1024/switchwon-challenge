# Switchwon Challenge

스위치원 과제 환전 서비스 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: React Query v5
- **UI Libraries**: TanStack Table v8, TanStack Virtual v3
- **HTTP Client**: Axios

## 주요 기능

### 인증
- 이메일 기반 로그인
- 쿠키 기반 인증 토큰 관리
- 로그아웃 시 브라우저 히스토리 초기화 및 뒤로가기 방지

### 환전
- 실시간 환율 조회 (USD, JPY)
- 매수/매도 전환
- 견적 계산 (디바운싱 적용)
- 견적 조회 시 환율 재조회로 표시 환율과 계산 환율 일치
- 환율 자동 갱신 (1분 간격)

### 내역
- 환전 거래 내역 테이블
- TanStack Virtual을 활용하여 대용량 데이터를 렌더링 하더라도 성능 문제가 없도록 최적화

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000 에서 확인할 수 있습니다.

### 빌드

```bash
pnpm build
pnpm start
```

## 프로젝트 구조

```
src/
├── api/
│   ├── client.ts                    # Axios 인스턴스
│   ├── generated/                   # OpenAPI 생성 타입
│   └── hooks/                       # React Query hooks
│       ├── use-auth.ts
│       ├── use-exchange.ts
│       ├── use-exchange-rate.ts
│       ├── use-orders.ts
│       └── use-wallet.ts
├── app/
│   ├── (auth)/login/
│   │   ├── _actions/                # Server Actions
│   │   ├── _components/             # 로그인 페이지 전용
│   │   │   ├── login-form.tsx
│   │   │   └── login-input.tsx
│   │   ├── _hooks/                  # 로그인 페이지 전용 훅
│   │   └── page.tsx
│   ├── (dashboard)/
│   │   ├── exchange/
│   │   │   ├── _components/        # 환전 페이지 전용
│   │   │   │   ├── exchange-content.tsx
│   │   │   │   ├── exchange-form.tsx
│   │   │   │   ├── currency-selector.tsx
│   │   │   │   └── ...
│   │   │   ├── _hooks/              # 환전 페이지 전용 훅
│   │   │   │   ├── use-exchange-quote.ts
│   │   │   │   └── use-exchange-submit.ts
│   │   │   └── page.tsx
│   │   ├── history/
│   │   │   ├── _components/        # 내역 페이지 전용
│   │   │   │   ├── history-content.tsx
│   │   │   │   └── history-table.tsx
│   │   │   └── page.tsx
│   │   ├── _components/            # 대시보드 공통
│   │   │   ├── container.tsx
│   │   │   ├── nav-link.tsx
│   │   │   └── logout-button.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── providers.tsx
├── components/                      # 전역 공통 컴포넌트
│   └── button.tsx
├── constants/
│   ├── currency.ts                  # 통화 메타데이터
│   └── messages.ts
├── types/
│   ├── api.ts
│   └── exchange.ts
```

### 모듈화 패턴

각 페이지는 `_components`와 `_hooks` 폴더를 통해 응집도 높은 모듈로 구성했습니다.

- **`_components/`**: 해당 페이지에서만 사용되는 컴포넌트
- **`_hooks/`**: 해당 페이지에서만 사용되는 커스텀 훅
- **`_actions/`**: 해당 페이지의 Server Actions

이를 통해 페이지 단위로 독립적인 코드베이스를 유지하며, 불필요한 전역 컴포넌트 생성을 방지했습니다.

## 라이센스

MIT
