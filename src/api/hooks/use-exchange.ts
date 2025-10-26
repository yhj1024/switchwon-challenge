import { useMutation } from "@tanstack/react-query";
import {
  OrderQuoteRequest,
  OrderQuoteResponse,
  OrderRequest,
  OrderResponse,
} from "@/api/generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

/**
 * 환전 주문 견적 조회
 */
export const fetchOrderQuote = async (request: OrderQuoteRequest) => {
  const response = await apiClient.get<ApiResponse<OrderQuoteResponse>>(
    "/orders/quote",
    {
      params: request,
    }
  );
  return response.data;
};

/**
 * 환전 주문 실행
 */
export const fetchCreateOrder = async (request: OrderRequest) => {
  const response = await apiClient.post<ApiResponse<OrderResponse>>(
    "/orders",
    request
  );
  return response.data;
};

/**
 * 환전 주문 견적 조회 hook
 */
export function useOrderQuote() {
  return useMutation({
    mutationFn: fetchOrderQuote,
  });
}

/**
 * 환전 주문 실행 hook
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: fetchCreateOrder,
  });
}
