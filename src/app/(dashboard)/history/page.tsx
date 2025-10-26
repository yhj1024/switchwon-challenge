import { Metadata } from "next";
import { Container } from "../_components/container";

export const metadata: Metadata = {
  title: "환전 내역 | Exchange App",
  description: "환전 거래 내역을 확인하고 관리하세요.",
  keywords: ["환전", "거래 내역", "내역 조회"],
};

export default function HistoryPage() {
  return (
    <Container title="환전 내역" description="확전 내역을 확인하실 수 있어요.">
      {/* TODO: 환전 내역 테이블 구현 */}
      <div>환전 내역 테이블</div>
    </Container>
  );
}
