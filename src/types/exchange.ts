export type Currency = "USD" | "JPY" | "KRW";

export interface ExchangeRate {
  currency: Currency;
  currencyName: string;
  rate: number;
  changeRate: number;
}

export interface WalletBalance {
  currency: Currency;
  amount: number;
}

export type TransactionType = "buy" | "sell";
