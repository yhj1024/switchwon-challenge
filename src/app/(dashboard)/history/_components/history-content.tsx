"use client";

import { HistoryTable } from "./history-table";
import { useOrders } from "@/api/hooks/use-orders";

export function HistoryContent() {
  const { data: ordersData, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E8EB] border-t-[#3479EB]" />
      </div>
    );
  }

  if (!ordersData?.data || ordersData.data.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-[1rem] text-[#646F7C]">환전 내역이 없습니다.</p>
      </div>
    );
  }

  return <HistoryTable orders={ordersData.data} />;
}
