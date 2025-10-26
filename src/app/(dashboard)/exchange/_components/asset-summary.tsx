interface AssetSummaryProps {
  totalAmount: number;
}

export function AssetSummary({ totalAmount }: AssetSummaryProps) {
  return (
    <div className="flex items-center justify-between border-t border-[#E5E8EB] pt-[1.5rem]">
      <span className="text-[1.25rem] font-medium leading-[133%] text-[#646F7C]">
        총 보유 자산
      </span>
      <span className="text-[1.25rem] font-bold text-[#3479EB]">
        ₩ {totalAmount.toLocaleString()}
      </span>
    </div>
  );
}
