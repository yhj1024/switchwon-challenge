/**
 * 통화 관련 상수
 */

/**
 * 통화 심볼 매핑
 */
export const CURRENCY_SYMBOLS = {
  KRW: "₩",
  USD: "$",
  JPY: "¥",
} as const;

/**
 * 통화 한글명 매핑
 */
export const CURRENCY_NAMES = {
  KRW: "원화",
  USD: "미국 달러",
  JPY: "일본 엔화",
} as const;

/**
 * 통화 국기 이모지 매핑
 */
export const CURRENCY_FLAGS = {
  USD: "🇺🇸",
  JPY: "🇯🇵",
  KRW: "🇰🇷",
} as const;

/**
 * 기본 환전 수수료 (USD 기준)
 */
export const DEFAULT_EXCHANGE_FEE = 10;
