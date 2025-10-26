import { useMutation, useQuery } from "@tanstack/react-query";
import {
  OrderRequest,
  OrderQuoteRequest,
  OrderResponse,
  OrderQuoteResponse,
} from "../generated";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

// Fetch functions
export const fetchOrders = async () => {
  const response = await apiClient.get<ApiResponse<OrderResponse[]>>("/orders");
  return response.data;
};

export const fetchOrderQuote = async (request: OrderQuoteRequest) => {
  const response = await apiClient.get<ApiResponse<OrderQuoteResponse>>(
    "/orders/quote",
    { params: request }
  );
  return response.data;
};

export const fetchCreateOrder = async (request: OrderRequest) => {
  const response = await apiClient.post<ApiResponse>("/orders", request);
  return response.data;
};

// Hooks
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}

export function useOrderQuote() {
  return useMutation({
    mutationFn: fetchOrderQuote,
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: fetchCreateOrder,
  });
}
