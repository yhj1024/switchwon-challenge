# 프론트엔드 개발자 사전 과제: 환전 애플리케이션

안녕하세요! 저희 채용 과정에 참여해주셔서 진심으로 감사합니다. 본 과제는 제시된 기술 스택을 활용하여 실제 서비스와 유사한 작은 애플리케이션을 개발하는 것입니다. 과제를 통해 지원자님의 기술적 역량과 문제 해결 능력을 확인하고자 합니다.

## ✉️ 과제 제출 방법

- 제출 마감: 과제는 일주일 내에 완료하여 tech@switchwon.com 으로 제출해야 합니다.
- 제출 형식: 소스 코드를 GitHub 리포지토리에 업로드하고, 해당 GitHub 링크를 이메일로 제출해주세요.

## 📝 과제 개요

제공되는 백엔드 API와 Figma 디자인을 기반으로, 사용자가 이메일로 로그인하고 실시간 환율을 적용하여 자산을 환전하며, 거래 내역을 관리하는 웹 애플리케이션의 클라이언트를 개발합니다.

## 📦 제공 자료

과제 진행에 필요한 아래의 자료들을 제공합니다.

- 실행 가능한 백엔드 서버: `exchange-example.switchflow.biz`
- API 명세서: [Swagger UI](https://exchange-example.switchflow.biz/swagger-ui/index.html)
- Figma 링크: [Figma 환전 예제](https://www.figma.com/design/ws0wZfa7r0YTW0hrpuHV93/%ED%99%98%EC%A0%84-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%98%88%EC%A0%9C?node-id=8-10175&t=eazJdYulAiOl1BLU-1)

## ✅ 기술 요구사항

React를 필수로 사용해야 합니다.

- 상태 관리(State Management), 스타일링(Styling), 데이터 페칭(Data Fetching) 등 React 이외의 라이브러리나 기술 스택은 지원자께서 가장 자신 있거나 선호하는 것을 자유롭게 선택하여 사용해 주세요. 지원자님의 역량을 가장 잘 보여줄 수 있는 기술 선택을 존중합니다.

## ⚠️ 주의사항
- 로그인 시, 지원했던 메일을 사용해주시길 바랍니다.
- Figma 디자인은 예시입니다. 최대한 비슷하게 하되 완전히 똑같을 필요는 없습니다.

## 💻 기능 요구사항

### 페이지 구성

환전 애플리케이션은 다음과 같은 페이지로 구성됩니다.

1. 로그인 페이지
    - 사용자 인증을 위한 이메일 입력 화면입니다.
2. 환전 페이지
    - 로그인 후 기본으로 보여주는 메인 페이지입니다.
    - 지갑 잔액, 환율 정보 표시, 환전 견적 및 실행 기능이 포함됩니다. 인증된 사용자만 접근할 수 있어야 합니다.
3. 환전 내역 페이지
    - 과거 환전 기록을 목록 형태로 보여주는 페이지입니다. 인증된 사용자만 접근할 수 있어야 합니다.

### 환전 애플리케이션의 주요 기능은 다음과 같습니다.

1. 사용자 인증
    - 로그인
        - 첫 화면에 이메일 주소를 입력하는 UI를 구현합니다.
        - 이메일 입력 후 '시작하기' 버튼을 누르면 `POST /auth/login` API를 호출합니다.
        - 서버는 해당 이메일로 사용자를 생성하거나 조회한 후 **JWT(Access Token)** 를 발급합니다.
    - 토큰 관리
        - 발급받은 JWT를 클라이언트에 안전하게 저장해야 합니다. (쿠키 또는 로컬 스토리지)
        - 이후 모든 API 요청의 Authorization 헤더에 Bearer ${token} 형식으로 JWT를 포함하여 전송해야 합니다.
    - 로그아웃
        - 로그아웃 버튼을 클릭하면 클라이언트에서 토큰을 삭제하고, 로그인 화면으로 리다이렉트합니다.

2. 라우트(페이지) 보호
    - 로그인하지 않은 사용자가 환전 페이지나 내역 페이지에 URL로 직접 접근하려고 하면, 로그인 페이지로 리다이렉트 시켜야 합니다.

3. 환전 및 내역 조회
    - 지갑/환율 조회
        - 로그인 후 메인 페이지에서 사용자의 현재 지갑 잔액과 실시간 환율을 API로 조회하여 화면에 표시합니다.
        - 주기적(1분)으로 최신 환율을 조회하여 화면에 표시합니다.
    - 환전 견적 조회
        - 사용자가 환전할 금액과 통화를 선택하면 `POST /orders/quote` API를 호출하여 환전 견적을 조회합니다.
        - 서버에서 받은 금액(원화)을 화면에 표시합니다.
    - 환전 실행
        - 사용자가 환전 금액을 입력하고 '환전하기' 버튼을 누르면 서버에 환전 요청 API를 보냅니다.
        - 환전 요청이 성공하면, 화면에 표시된 지갑 잔액 데이터가 자동으로 최신화되어야 합니다.
    - 환전 내역 조회
        - '내역 보기' 페이지에서 사용자의 모든 환전 내역을 API로 조회하여 목록 형태로 보여줍니다.

---

## API 문서 및 사용 가이드

### API Base URL 및 실시간 API 문서 (Swagger)

API 서버는 `exchange-example.switchflow.biz` 에 배포되어 있습니다.

전체 API 명세는 아래 Swagger UI 링크에서 실시간으로 확인하고 직접 테스트해볼 수 있습니다.

* **Swagger UI**: `https://exchange-example.switchflow.biz/swagger-ui/index.html`

### 인증 (Authentication) API 호출 예시

`POST /auth/login` API 호출과 토큰 사용법 예시입니다.

```bash
# 1. 이메일로 로그인 요청
curl -X POST "https://exchange-example.switchflow.biz/auth/login" \
     -d "email=user@example.com"

# 2. 응답으로 받은 accessToken 확인
# {
#   "accessToken": "ey..."
# }

# 3. 발급받은 토큰을 사용하여 다른 API 호출
curl -X GET "https://exchange-example.switchflow.biz/wallets" \
     -H "Authorization: Bearer ey..."
```

### 공통 응답 및 에러 포맷

모든 API 응답은 아래와 같은 `ApiResponse` 포맷을 따릅니다.

#### 성공 응답 (HTTP 2xx)

```json
{
    "code": "OK",
    "message": "정상적으로 처리되었습니다.",
    "data": {
        "memberId": 1,
        "token": "eyJhbGciOiJIUzM4NCJ9..."
    }
}
```

#### 실패/에러 응답 (HTTP 4xx, 5xx)

`code` 필드를 통해 에러의 종류를 구분할 수 있습니다.

**1. 유효성 검사 실패 (Validation Error)**
요청 바디의 값이 잘못된 경우 (`code: "VALIDATION_ERROR"`)

```json
{
    "code": "VALIDATION_ERROR",
    "message": "요청 데이터가 이상해요.",
    "data": {
        "amount": "환전 금액은 0보다 커야 합니다."
    }
}
```

**2. 비즈니스 로직 에러**
잔액 부족 등 비즈니스 규칙에 위배될 경우 (예: `code: "WALLET_INSUFFICIENT_BALANCE"`)

```json
{
    "code": "WALLET_INSUFFICIENT_BALANCE",
    "message": "지갑의 잔액이 부족합니다.",
    "data": null
}
```

**3. 인증 실패**
토큰이 없거나 유효하지 않은 경우 (`code: "UNAUTHORIZED"`)

```json
{
    "code": "UNAUTHORIZED",
    "message": "인증이 필요합니다.",
    "data": null
}
```

#### 주요 에러 코드 (Error Code Reference)

`code` 필드로 반환될 수 있는 주요 에러 코드 목록입니다.

**API 관련 에러 (`ApiException`)**

| Code                | 기본 메시지              | 설명                                 |
|:--------------------|:--------------------|:-----------------------------------|
| `BAD_REQUEST`       | 잘못된 요청입니다.          | 일반적인 요청 오류 시 발생합니다.                |
| `NOT_FOUND`         | 요청한 URL을 찾을 수 없어요.  | 존재하지 않는 API 경로를 요청한 경우 발생합니다.      |
| `UNAUTHORIZED`      | 로그인이 필요한 서비스입니다.    | 인증 토큰이 없거나 유효하지 않을 때 발생합니다.        |
| `VALIDATION_ERROR`  | 요청 데이터가 이상해요.       | API 요청 파라미터의 유효성 검사에 실패한 경우 발생합니다. |
| `MISSING_PARAMETER` | 필수 요청 파라미터가 누락되었어요. | 필수 파라미터가 요청에 포함되지 않은 경우 발생합니다.     |

**도메인 관련 에러 (`DomainException`)**

| Code                                      | 메시지 (예시)                              | 설명                                                |
|:------------------------------------------|:--------------------------------------|:--------------------------------------------------|
| `WALLET_INSUFFICIENT_BALANCE`             | 지갑의 잔액이 부족합니다.                        | 출금 또는 환전 시 지갑의 잔액이 요청 금액보다 적을 때 발생합니다.            |
| `INVALID_DEPOSIT_AMOUNT`                  | 입금 금액이 유효하지 않습니다.                     | 입금 금액이 0 이하일 경우 발생합니다.                            |
| `INVALID_WITHDRAW_AMOUNT`                 | 출금 금액이 유효하지 않습니다.                     | 출금 금액이 0 이하일 경우 발생합니다.                            |
| `CURRENCY_MISMATCH`                       | 통화 타입이 일치하지 않습니다.                     | 연산 또는 비교하는 두 금액의 통화가 다를 경우 발생합니다.                 |
| `INVALID_AMOUNT_SCALE`                    | USD 통화는 소수점 2자리까지만 허용됩니다...           | 각 통화 정책에 맞지 않는 소수점 자릿수로 금액을 요청한 경우 발생합니다.         |
| `EXCHANGE_RATE_CURRENCY_MISMATCH`         | 환율의 대상 통화(USD)와 변환하려는 금액의 통화(EUR)가... | 조회된 환율 정보와 사용자가 환전하려는 통화가 일치하지 않을 때 발생합니다.        |
| `UNSUPPORTED_FOREX_CONVERSION_CURRENCY`   | 외화 변환은 원화(KRW)를 지원하지 않습니다.            | 외화(USD)를 다른 외화(JPY)로 직접 변환하려고 시도할 때 발생합니다.        |
| `INVALID_EXCHANGE_RATE_CURRENCY`          | 환율 정보의 통화는 KRW가 될 수 없습니다.             | 환율 정보 자체에 KRW를 사용하려고 할 때 발생합니다.                   |
| `UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION` | 원화(KRW) 변환은 KRW 통화만 지원합니다...          | 원화를 다른 통화로 변환하는 로직에 KRW가 아닌 다른 통화가 사용되었을 때 발생합니다. |
