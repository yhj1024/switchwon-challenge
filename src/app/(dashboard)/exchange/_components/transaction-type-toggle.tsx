"use client";

import { TransactionType } from "@/types/exchange";
import { cn } from "@/lib/utils";

interface TransactionTypeToggleProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export function TransactionTypeToggle({
  value,
  onChange,
}: TransactionTypeToggleProps) {
  return (
    <div
      className="mb-[1.5rem] flex gap-[0.5rem] rounded-[0.75rem] bg-white p-[0.5rem] border-1 border-[#D0D6DB]"
      role="tablist"
      aria-label="거래 유형"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "buy"}
        onClick={() => onChange("buy")}
        className={cn(
          "flex-1 rounded-[0.75rem] px-[1.5rem] py-[1rem] text-[1rem] font-semibold transition-colors",
          value === "buy"
            ? "bg-[#F04438] text-white"
            : "bg-white text-[#F04438]"
        )}
      >
        살래요
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "sell"}
        onClick={() => onChange("sell")}
        className={cn(
          "flex-1 rounded-[0.75rem] px-[1.5rem] py-[1rem] text-[1rem] font-semibold transition-colors",
          value === "sell"
            ? "bg-[#3479EB] text-white"
            : "bg-white text-[#3479EB]"
        )}
      >
        팔래요
      </button>
    </div>
  );
}
