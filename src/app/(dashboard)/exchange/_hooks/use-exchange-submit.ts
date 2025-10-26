import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Currency, TransactionType } from "@/types/exchange";
import { useCreateOrder } from "@/api/hooks/use-exchange";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/messages";

interface UseExchangeSubmitParams {
  amount: string;
  currency: Currency;
  transactionType: TransactionType;
  exchangeRateId: number;
  onSuccess?: () => void;
}

export function useExchangeSubmit({
  amount,
  currency,
  transactionType,
  exchangeRateId,
  onSuccess,
}: UseExchangeSubmitParams) {
  const queryClient = useQueryClient();
  const { mutate: createOrder, isPending: isOrderLoading } = useCreateOrder();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount) || 0;

    if (!amount || amountNum <= 0) {
      alert(ERROR_MESSAGES.EXCHANGE.INVALID_AMOUNT);
      return;
    }

    const fromCurrency = transactionType === "buy" ? "KRW" : currency;
    const toCurrency = transactionType === "buy" ? currency : "KRW";

    createOrder(
      {
        exchangeRateId,
        fromCurrency,
        toCurrency,
        forexAmount: amountNum,
      },
      {
        onSuccess: () => {
          alert(SUCCESS_MESSAGES.EXCHANGE);
          queryClient.invalidateQueries({ queryKey: ["wallet"] });
          onSuccess?.();
        },
        onError: (error: Error) => {
          const axiosError = error as {
            response?: {
              status?: number;
              data?: { code?: string; message?: string };
            };
            message: string;
          };

          if (
            axiosError.response?.data?.code === "EXCHANGE_RATE_MISMATCH" ||
            axiosError.response?.status === 400
          ) {
            queryClient.invalidateQueries({ queryKey: ["exchangeRates"] });
            alert(axiosError.response?.data?.message);
          } else {
            alert(axiosError.message || ERROR_MESSAGES.NETWORK.GENERIC);
          }
        },
      }
    );
  };

  return { handleSubmit, isOrderLoading };
}
