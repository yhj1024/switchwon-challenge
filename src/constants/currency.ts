/**
 * 통화 관련 상수
 */

import { Currency } from "@/types/exchange";

/**
 * 통화 메타데이터 (확장성을 위한 중앙화)
 */
export const CURRENCY_METADATA = {
  KRW: {
    code: "KRW" as Currency,
    symbol: "₩",
    flag: "🇰🇷",
    name: "원화",
    shortName: "원",
    country: "대한민국",
  },
  USD: {
    code: "USD" as Currency,
    symbol: "$",
    flag: "🇺🇸",
    name: "미국 달러",
    shortName: "달러",
    country: "미국",
  },
  JPY: {
    code: "JPY" as Currency,
    symbol: "¥",
    flag: "🇯🇵",
    name: "일본 엔화",
    shortName: "엔",
    country: "일본",
  },
} as const;

/**
 * 통화 심볼 매핑 (하위 호환성)
 */
export const CURRENCY_SYMBOLS = {
  KRW: CURRENCY_METADATA.KRW.symbol,
  USD: CURRENCY_METADATA.USD.symbol,
  JPY: CURRENCY_METADATA.JPY.symbol,
} as const;

/**
 * 통화 한글명 매핑 (하위 호환성)
 */
export const CURRENCY_NAMES = {
  KRW: CURRENCY_METADATA.KRW.name,
  USD: CURRENCY_METADATA.USD.name,
  JPY: CURRENCY_METADATA.JPY.name,
} as const;

/**
 * 통화 국기 이모지 매핑 (하위 호환성)
 */
export const CURRENCY_FLAGS = {
  USD: CURRENCY_METADATA.USD.flag,
  JPY: CURRENCY_METADATA.JPY.flag,
  KRW: CURRENCY_METADATA.KRW.flag,
} as const;

/**
 * 기본 환전 수수료 (USD 기준)
 */
export const DEFAULT_EXCHANGE_FEE = 10;
