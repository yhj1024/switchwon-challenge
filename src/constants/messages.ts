/**
 * 사용자 메시지 상수
 */

export const ERROR_MESSAGES = {
  AUTH: {
    NO_TOKEN: "인증 토큰이 없습니다.",
    LOGIN_REQUIRED: "로그인이 필요합니다.",
    LOGIN_FAILED: "로그인에 실패했습니다.",
  },
  EXCHANGE: {
    FETCH_RATES_FAILED: "환율 정보를 불러올 수 없습니다.",
    FETCH_WALLET_FAILED: "지갑 정보를 불러올 수 없습니다.",
    INSUFFICIENT_BALANCE: "잔액이 부족합니다.",
    INVALID_AMOUNT: "올바른 금액을 입력해주세요.",
  },
  NETWORK: {
    GENERIC: "요청 처리 중 오류가 발생했습니다.",
    TIMEOUT: "요청 시간이 초과되었습니다.",
  },
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: "로그인되었습니다.",
  EXCHANGE: "환전이 완료되었습니다.",
} as const;
