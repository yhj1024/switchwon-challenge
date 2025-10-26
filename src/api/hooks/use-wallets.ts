import { useQuery } from "@tanstack/react-query";
import { WalletSummaryResponse } from "../generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

// Fetch functions
export const fetchWallets = async () => {
  const response =
    await apiClient.get<ApiResponse<WalletSummaryResponse>>("/wallets");
  return response.data;
};

// Hooks
export function useWallets() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: fetchWallets,
  });
}
