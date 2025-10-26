import { Currency } from "@/types/exchange";

interface ExchangeRateInfoProps {
  currency: Currency;
  appliedRate: number;
  fee: number;
}

export function ExchangeRateInfo({
  currency,
  appliedRate,
  fee,
}: ExchangeRateInfoProps) {
  return (
    <div className="mb-[2rem] space-y-[0.5rem] border-t border-[#E5E8EB] pt-[1.5rem]">
      <div className="flex items-center justify-between">
        <span className="text-[1.25rem] font-medium leading-[133%] text-[#646F7C]">
          적용 환율
        </span>
        <span className="text-[1.25rem] font-semibold text-[#28323C]">
          1 {currency} = {appliedRate.toLocaleString()} 원
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[1.25rem] font-medium leading-[133%] text-[#646F7C]">
          환전 수수료
        </span>
        <span className="text-[1.25rem] font-bold text-[#3479EB]">
          {fee} {currency}
        </span>
      </div>
    </div>
  );
}
