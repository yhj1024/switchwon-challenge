import { useQuery } from "@tanstack/react-query";
import { WalletSummaryResponse } from "@/api/generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

/**
 * 지갑 정보 조회 fetch 함수
 */
export const fetchWallet = async () => {
  const response =
    await apiClient.get<ApiResponse<WalletSummaryResponse>>("/wallets");
  return response.data;
};

/**
 * 지갑 정보 조회 hook
 */
export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
  });
}
