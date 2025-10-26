import { useEffect, useState } from "react";
import { Currency, TransactionType } from "@/types/exchange";
import { useOrderQuote } from "@/api/hooks/use-exchange";

interface UseExchangeQuoteParams {
  amount: string;
  currency: Currency;
  transactionType: TransactionType;
}

export function useExchangeQuote({
  amount,
  currency,
  transactionType,
}: UseExchangeQuoteParams) {
  const [quote, setQuote] = useState<{
    krwAmount: number;
    appliedRate: number;
  } | null>(null);

  const { mutate: getQuote, isPending: isQuoteLoading } = useOrderQuote();

  const amountNum = parseFloat(amount) || 0;

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, currency, transactionType, amountNum]);

  return { quote, isQuoteLoading };
}
