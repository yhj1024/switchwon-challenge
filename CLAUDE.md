# Project Guidelines

## Directory Structure

### Global vs Local Modules

**Global Modules** (`src/` 디렉토리)
- 프로젝트 전역에서 사용하는 공통 기능
- 재사용 가능한 컴포넌트, 훅, 유틸리티

```
src/
├── app/         # Next.js App Router pages
├── components/  # 전역 재사용 컴포넌트
├── hooks/       # 전역 커스텀 훅
├── types/       # 전역 TypeScript 타입 정의
└── utils/       # 전역 유틸리티 함수
```

**Local Modules** (각 라우트 내부)
- 특정 페이지/라우트에서만 사용하는 기능
- 언더스코어(`_`) prefix로 구분
- 해당 라우트 디렉토리 내부에 위치

```
src/app/login/
├── page.tsx
├── _components/     # login 페이지 전용 컴포넌트
├── _hooks/          # login 페이지 전용 훅
└── _utils/          # login 페이지 전용 유틸리티
```

### Module Placement Rules

1. **전역으로 배치**: 2개 이상의 라우트에서 사용
2. **로컬로 배치**: 1개의 라우트에서만 사용
3. **이동 시점**: 다른 라우트에서 사용 필요 시 `src/`로 이동

## Testing Strategy

### Colocated Tests

테스트 파일은 테스트 대상 파일과 같은 디렉토리에 배치

```
src/components/
├── button.tsx
├── button.test.tsx
└── button.stories.tsx

src/app/login/
├── page.tsx
├── page.test.tsx
├── _components/
│   ├── login-form.tsx
│   └── login-form.test.tsx
```

### Test File Naming

- Unit tests: `*.test.ts(x)`
- Integration tests: `*.integration.test.ts(x)`
- E2E tests: `*.e2e.test.ts(x)`

## TypeScript Guidelines

### Strict Type Safety

**절대 금지:**
```typescript
// ❌ any 타입 사용 금지
const data: any = fetchData();
function process(input: any) {}
```

**권장 방식:**
```typescript
// ✅ 명시적 타입 정의
interface User {
  id: string;
  name: string;
}

const data: User = fetchData();
function process(input: User) {}

// ✅ unknown 사용 후 타입 가드
const data: unknown = fetchData();
if (isUser(data)) {
  // data is User
}

// ✅ Generic 활용
function process<T extends BaseType>(input: T) {}
```

### Type Organization

```
src/types/
├── api.ts          # API 관련 타입
├── models.ts       # 데이터 모델
├── components.ts   # 컴포넌트 Props 타입
└── index.ts        # 타입 re-export
```

## Import Rules

### Path Alias

```typescript
// ✅ 절대 경로 사용 (전역 모듈)
import { Button } from "@/components/button";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types/models";

// ✅ 상대 경로 사용 (로컬 모듈)
import { LoginForm } from "./_components/login-form";
import { useLoginForm } from "./_hooks/use-login-form";
```

## Code Quality Standards

### Component Guidelines

1. **Single Responsibility**: 컴포넌트는 하나의 책임만
2. **Props Interface**: 모든 Props는 명시적 인터페이스 정의
3. **Named Export**: 컴포넌트는 named export 사용

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Hook Guidelines

1. **Prefix**: `use` prefix 필수
2. **Return Type**: 명시적 반환 타입 정의
3. **Dependency Array**: 모든 의존성 명시

```typescript
// ✅ Good
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  return { count, increment, decrement };
}
```

## File Naming Conventions

**모든 파일은 kebab-case 사용**

- Components: `kebab-case.tsx` (button.tsx, login-form.tsx)
- Hooks: `kebab-case.ts` (use-auth.ts, use-counter.ts)
- Utils: `kebab-case.ts` (format-date.ts, validate-email.ts)
- Types: `kebab-case.ts` (user.ts, api.ts)
- Tests: `*.test.tsx` (button.test.tsx, login-form.test.tsx)

## Git Workflow

### Commit Message Format

```
type(scope): subject

- feat: 새로운 기능
- fix: 버그 수정
- refactor: 리팩토링
- test: 테스트 추가/수정
- docs: 문서 수정
- style: 코드 포맷팅
- chore: 빌드/설정 변경
```