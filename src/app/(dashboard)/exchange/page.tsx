import { Container } from "../_components/container";
import { ExchangeContent } from "./_components/exchange-content";

export default function ExchangePage() {
  return (
    <Container
      title="환율 정보"
      description="실시간 환율을 확인하고 간편하게 환전하세요."
    >
      <ExchangeContent />
    </Container>
  );
}
