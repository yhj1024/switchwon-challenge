import { useQuery } from "@tanstack/react-query";
import { ExchangeRateResponse } from "../generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

// Fetch functions
export const fetchLatestExchangeRates = async () => {
  const response = await apiClient.get<ApiResponse<ExchangeRateResponse[]>>(
    "/exchange-rates/latest"
  );
  return response.data;
};

// Hooks
export function useLatestExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates", "latest"],
    queryFn: fetchLatestExchangeRates,
  });
}
