import { useState, useCallback, useRef } from "react";
import { Currency, TransactionType } from "@/types/exchange";
import { useOrderQuote } from "@/api/hooks/use-exchange";

interface UseExchangeQuoteParams {
  currency: Currency;
  transactionType: TransactionType;
}

export function useExchangeQuote({
  currency,
  transactionType,
}: UseExchangeQuoteParams) {
  const [quote, setQuote] = useState<{
    krwAmount: number;
    appliedRate: number;
  } | null>(null);

  const { mutate: getQuote, isPending: isQuoteLoading } = useOrderQuote();
  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  /**
   * 견적 계산 (명시적 호출)
   */
  const calculateQuote = useCallback(
    (amount: string) => {
      const amountNum = parseFloat(amount) || 0;

      if (amountNum <= 0) {
        setQuote(null);
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
    },
    [currency, transactionType, getQuote]
  );

  /**
   * 디바운싱된 견적 계산 (onChange용)
   */
  const debouncedCalculateQuote = useCallback(
    (amount: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        calculateQuote(amount);
      }, 500);
    },
    [calculateQuote]
  );

  return {
    quote,
    isQuoteLoading,
    calculateQuote, // 즉시 계산 (onBlur용)
    debouncedCalculateQuote, // 디바운싱 계산 (onChange용)
  };
}
