import { Container } from "../_components/container";
import { HistoryContent } from "./_components/history-content";

export default function HistoryPage() {
  return (
    <Container title="환전 내역" description="환전 내역을 확인하실 수 있어요.">
      <HistoryContent />
    </Container>
  );
}
