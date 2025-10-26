import { ExchangeRate } from "@/types/exchange";

interface ExchangeRateCardProps {
  rate: ExchangeRate;
}

export function ExchangeRateCard({ rate }: ExchangeRateCardProps) {
  const isPositive = rate.changeRate >= 0;

  return (
    <article className="rounded-[1rem] border border-[#E5E8EB] bg-white p-[1.5rem]">
      <header className="mb-[0.5rem] flex items-center justify-between">
        <h4 className="font-semibold text-[#646F7C] text-[1.25rem]">
          {rate.currency}
        </h4>
        <h5 className="font-regular text-[#646F7C]">{rate.currencyName}</h5>
      </header>
      <div>
        <h3 className="text-[1.5rem] font-bold text-[#28323C]">
          {rate.rate.toLocaleString()} KRW
        </h3>
        <span
          className={`font-medium ${
            isPositive ? "text-[#F04438]" : "text-[#3479EB]"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(rate.changeRate)}%
        </span>
      </div>
    </article>
  );
}
