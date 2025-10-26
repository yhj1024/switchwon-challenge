"use client";

import { FormEvent, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Currency, TransactionType } from "@/types/exchange";
import { CurrencySelector } from "./currency-selector";
import { TransactionTypeToggle } from "./transaction-type-toggle";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useOrderQuote, useCreateOrder } from "@/api/hooks/use-exchange";
import { DEFAULT_EXCHANGE_FEE } from "@/constants/currency";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";

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
  const queryClient = useQueryClient();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("buy");
  const [amount, setAmount] = useState<string>("");
  const [quote, setQuote] = useState<{
    krwAmount: number;
    appliedRate: number;
  } | null>(null);

  const { mutate: getQuote, isPending: isQuoteLoading } = useOrderQuote();
  const { mutate: createOrder, isPending: isOrderLoading } = useCreateOrder();

  const rateInfo = exchangeRates[currency] || { rate: 0, exchangeRateId: 0 };
  const amountNum = parseFloat(amount) || 0;

  // Suffix 텍스트 계산
  const currencyText = currency === "USD" ? "달러" : "엔";
  const amountSuffix = `${currencyText} ${transactionType === "buy" ? "사기" : "팔기"}`;
  const resultSuffix = `원 ${transactionType === "buy" ? "필요해요" : "받을 수 있어요"}`;

  // 금액 변경 시 견적 조회
  useEffect(() => {
    if (amountNum <= 0) {
      return;
    }

    const fromCurrency = transactionType === "buy" ? "KRW" : currency;
    const toCurrency = transactionType === "buy" ? currency : "KRW";

    getQuote(
      {
        fromCurrency,
        toCurrency,
        forexAmount: amountNum,
      },
      {
        onSuccess: (data) => {
          if (data.data) {
            setQuote({
              krwAmount: data.data.krwAmount,
              appliedRate: data.data.appliedRate,
            });
          }
        },
        onError: () => {
          setQuote(null);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, currency, transactionType, amountNum]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!amount || amountNum <= 0) {
      alert(ERROR_MESSAGES.EXCHANGE.INVALID_AMOUNT);
      return;
    }

    const fromCurrency = transactionType === "buy" ? "KRW" : currency;
    const toCurrency = transactionType === "buy" ? currency : "KRW";

    createOrder(
      {
        exchangeRateId: rateInfo.exchangeRateId,
        fromCurrency,
        toCurrency,
        forexAmount: amountNum,
      },
      {
        onSuccess: () => {
          alert(SUCCESS_MESSAGES.EXCHANGE);
          queryClient.invalidateQueries({ queryKey: ["wallet"] });
          setAmount("");
          setQuote(null);
        },
        onError: (error: Error) => {
          alert(error.message || ERROR_MESSAGES.NETWORK.GENERIC);
        },
      }
    );
  };

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
          <Input
            id="amount"
            label={transactionType === "buy" ? "매수 금액" : "매도 금액"}
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="30"
            variant="exchange"
            fullWidth
            min="0"
            step="0.01"
            suffix={amountSuffix}
            textAlign="right"
          />
        </div>

        <div className="mb-[1.5rem] flex justify-center">
          <div className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-[#E5E8EB]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4V16M10 16L6 12M10 16L14 12"
                stroke="#646F7C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mb-[2rem]">
          <Input
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
            variant="exchange"
            fullWidth
            textAlign="right"
            suffix={resultSuffix}
            suffixColor="#F04438"
          />
        </div>

        <div className="mb-[2rem] space-y-[0.5rem] border-t border-[#E5E8EB] pt-[1.5rem]">
          <div className="flex items-center justify-between">
            <span className="text-[1.25rem] font-medium leading-[133%] text-[#646F7C]">
              적용 환율
            </span>
            <span className="text-[1.25rem] font-semibold text-[#28323C]">
              1 {currency} ={" "}
              {quote
                ? quote.appliedRate.toLocaleString()
                : rateInfo.rate.toLocaleString()}{" "}
              원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[1.25rem] font-medium leading-[133%] text-[#646F7C]">
              환전 수수료
            </span>
            <span className="text-[1.25rem] font-bold text-[#3479EB]">
              {fee} {currency}
            </span>
          </div>
        </div>

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
