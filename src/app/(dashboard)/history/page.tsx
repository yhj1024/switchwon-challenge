"use client";

import { Container } from "../_components/container";
import { HistoryTable } from "./_components/history-table";
import { useOrders } from "@/api/hooks/use-orders";

export default function HistoryPage() {
  const { data: ordersData, isLoading } = useOrders();

  if (isLoading) {
    return (
      <Container
        title="환전 내역"
        description="환전 내역을 확인하실 수 있어요."
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E8EB] border-t-[#3479EB]" />
        </div>
      </Container>
    );
  }

  if (!ordersData?.data || ordersData.data.length === 0) {
    return (
      <Container
        title="환전 내역"
        description="환전 내역을 확인하실 수 있어요."
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-[1rem] text-[#646F7C]">환전 내역이 없습니다.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container title="환전 내역" description="환전 내역을 확인하실 수 있어요.">
      <HistoryTable orders={ordersData.data} />
    </Container>
  );
}
