import { useMutation } from "@tanstack/react-query";
import { LoginRequest, TokenResponse } from "../generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

// Fetch functions
export const fetchAuthLogin = async (request: LoginRequest) => {
  const response = await apiClient.post<ApiResponse<TokenResponse>>(
    "/auth/login",
    null,
    { params: request }
  );
  return response.data;
};

// Hooks
export function useLogin() {
  return useMutation({
    mutationFn: fetchAuthLogin,
  });
}
