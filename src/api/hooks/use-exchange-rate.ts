import { useQuery } from "@tanstack/react-query";
import { ExchangeRateResponse } from "@/api/generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

/**
 * 최신 환율 조회 fetch 함수
 */
export const fetchExchangeRates = async () => {
  const response = await apiClient.get<ApiResponse<ExchangeRateResponse[]>>(
    "/exchange-rates/latest"
  );
  return response.data;
};

/**
 * 최신 환율 조회 hook
 * 1분마다 자동으로 최신 환율을 갱신합니다.
 */
export function useExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    refetchInterval: 60000, // 1분(60초)마다 자동 갱신
  });
}
