"use client";

import { useState, useRef } from "react";
import { Currency, TransactionType } from "@/types/exchange";
import { CurrencySelector } from "./currency-selector";
import { TransactionTypeToggle } from "./transaction-type-toggle";
import { ExchangeArrowIcon } from "./exchange-arrow-icon";
import { ExchangeRateInfo } from "./exchange-rate-info";
import { Button } from "@/components/button";
import { ExchangeInput } from "@/app/(dashboard)/exchange/_components/exchange-input";
import { useExchangeQuote } from "../_hooks/use-exchange-quote";
import { useExchangeSubmit } from "../_hooks/use-exchange-submit";
import { DEFAULT_EXCHANGE_FEE, CURRENCY_METADATA } from "@/constants/currency";

interface ExchangeFormProps {
  exchangeRates: Record<Currency, { rate: number; exchangeRateId: number }>;
  refetchExchangeRates: () => void;
  fee?: number;
}

/**
 * 환전 신청 폼
 */
export function ExchangeForm({
  exchangeRates,
  refetchExchangeRates,
  fee = DEFAULT_EXCHANGE_FEE,
}: ExchangeFormProps) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("buy");
  const [amount, setAmount] = useState<string>("");

  const rateInfo = exchangeRates[currency] || { rate: 0, exchangeRateId: 0 };
  const amountNum = parseFloat(amount) || 0;
  const rateRefetchTimerRef = useRef<NodeJS.Timeout>(null);

  // Suffix 텍스트 계산 (확장성 개선)
  const currencyMeta = CURRENCY_METADATA[currency];
  const amountSuffix = `${currencyMeta.shortName} ${transactionType === "buy" ? "사기" : "팔기"}`;
  const resultSuffix = `원 ${transactionType === "buy" ? "필요해요" : "받을 수 있어요"}`;

  // 견적 조회 (명시적 호출)
  const { quote, isQuoteLoading, debouncedCalculateQuote } = useExchangeQuote({
    currency,
    transactionType,
  });

  // 환율 refetch 디바운싱
  const debouncedRefetchRates = () => {
    if (rateRefetchTimerRef.current) {
      clearTimeout(rateRefetchTimerRef.current);
    }
    rateRefetchTimerRef.current = setTimeout(() => {
      refetchExchangeRates();
    }, 500);
  };

  // 금액 변경 핸들러 (디바운싱 적용 + 환율 갱신)
  const handleAmountChange = (value: string) => {
    setAmount(value);
    debouncedCalculateQuote(value);
    debouncedRefetchRates(); // 환율도 디바운싱하여 갱신
  };

  // 통화 변경 핸들러
  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    debouncedRefetchRates(); // 환율 갱신
    if (amount) {
      debouncedCalculateQuote(amount);
    }
  };

  // 거래 타입 변경 핸들러
  const handleTransactionTypeChange = (newType: TransactionType) => {
    setTransactionType(newType);
    debouncedRefetchRates(); // 환율 갱신
    if (amount) {
      debouncedCalculateQuote(amount);
    }
  };

  // 환전 신청
  const { handleSubmit, isOrderLoading } = useExchangeSubmit({
    amount,
    currency,
    transactionType,
    exchangeRateId: rateInfo.exchangeRateId,
    onSuccess: () => {
      setAmount("");
    },
  });

  return (
    <section
      className="rounded-[1rem] border border-[#E5E8EB] bg-[#F7F8F9] p-[2rem]"
      aria-labelledby="exchange-form-title"
    >
      <h2 id="exchange-form-title" className="sr-only">
        환전 신청 폼
      </h2>
      <form onSubmit={handleSubmit}>
        <CurrencySelector
          value={currency}
          onChange={handleCurrencyChange}
          excludeCurrency="KRW"
        />

        <TransactionTypeToggle
          value={transactionType}
          onChange={handleTransactionTypeChange}
        />

        <div className="mb-[1.5rem]">
          <ExchangeInput
            id="amount"
            label={transactionType === "buy" ? "매수 금액" : "매도 금액"}
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="30"
            min="0"
            step="0.01"
            suffix={amountSuffix}
            textAlign="right"
          />
        </div>

        <ExchangeArrowIcon />

        <div className="mb-[2rem]">
          <ExchangeInput
            id="result"
            label={transactionType === "buy" ? "필요 원화" : "받을 원화"}
            type="text"
            value={
              quote
                ? `${quote.krwAmount.toLocaleString()}`
                : isQuoteLoading
                  ? "계산 중..."
                  : ""
            }
            readOnly
            placeholder="0"
            textAlign="right"
            suffix={resultSuffix}
            suffixColor={transactionType === "buy" ? "#F04438" : "#3479EB"}
          />
        </div>

        <ExchangeRateInfo
          currency={currency}
          appliedRate={quote ? quote.appliedRate : rateInfo.rate}
          fee={fee}
        />

        <Button
          type="submit"
          disabled={
            !amount || amountNum <= 0 || isOrderLoading || isQuoteLoading
          }
        >
          {isOrderLoading ? "환전 처리 중..." : "환전하기"}
        </Button>
      </form>
    </section>
  );
}
