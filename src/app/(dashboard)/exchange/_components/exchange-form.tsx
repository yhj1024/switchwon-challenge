"use client";

import { useState } from "react";
import { Currency, TransactionType } from "@/types/exchange";
import { CurrencySelector } from "./currency-selector";
import { TransactionTypeToggle } from "./transaction-type-toggle";
import { ExchangeArrowIcon } from "./exchange-arrow-icon";
import { ExchangeRateInfo } from "./exchange-rate-info";
import { Button } from "@/components/button";
import { ExchangeInput } from "@/app/(dashboard)/exchange/_components/exchange-input";
import { useExchangeQuote } from "../_hooks/use-exchange-quote";
import { useExchangeSubmit } from "../_hooks/use-exchange-submit";
import { DEFAULT_EXCHANGE_FEE } from "@/constants/currency";

interface ExchangeFormProps {
  exchangeRates: Record<Currency, { rate: number; exchangeRateId: number }>;
  fee?: number;
}

/**
 * 환전 신청 폼
 */
export function ExchangeForm({
  exchangeRates,
  fee = DEFAULT_EXCHANGE_FEE,
}: ExchangeFormProps) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("buy");
  const [amount, setAmount] = useState<string>("");

  const rateInfo = exchangeRates[currency] || { rate: 0, exchangeRateId: 0 };
  const amountNum = parseFloat(amount) || 0;

  // Suffix 텍스트 계산
  const currencyText = currency === "USD" ? "달러" : "엔";
  const amountSuffix = `${currencyText} ${transactionType === "buy" ? "사기" : "팔기"}`;
  const resultSuffix = `원 ${transactionType === "buy" ? "필요해요" : "받을 수 있어요"}`;

  // 견적 조회
  const { quote, isQuoteLoading } = useExchangeQuote({
    amount,
    currency,
    transactionType,
  });

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
          onChange={setCurrency}
          excludeCurrency="KRW"
        />

        <TransactionTypeToggle
          value={transactionType}
          onChange={setTransactionType}
        />

        <div className="mb-[1.5rem]">
          <ExchangeInput
            id="amount"
            label={transactionType === "buy" ? "매수 금액" : "매도 금액"}
            type="number"
            value={amount}
            onChange={setAmount}
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
