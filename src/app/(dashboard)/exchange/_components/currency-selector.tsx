"use client";

import { useState, useEffect, useRef } from "react";
import { Currency } from "@/types/exchange";
import { CURRENCY_FLAGS } from "@/constants/currency";

interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  excludeCurrency?: Currency;
}

const currencyOptions = [
  {
    value: "USD",
    label: "USD 환전하기",
    dropdownLabel: "미국 USD",
    flag: CURRENCY_FLAGS.USD,
  },
  {
    value: "JPY",
    label: "JPY 환전하기",
    dropdownLabel: "일본 JPY",
    flag: CURRENCY_FLAGS.JPY,
  },
] as const;

export function CurrencySelector({
  value,
  onChange,
  excludeCurrency,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = currencyOptions.filter(
    (opt) => opt.value !== excludeCurrency
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative mb-[1.5rem]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-[0.5rem] rounded-[0.75rem] bg-[#F7F8F9] px-[1rem] py-[0.5rem] text-[1.125rem] font-semibold text-[#28323C] focus:outline-none"
        aria-label="환전할 통화 선택"
        aria-expanded={isOpen}
      >
        <span>
          {selectedOption?.flag} {selectedOption?.label}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#646F7C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-[0.5rem] min-w-[12rem] rounded-[0.75rem] border border-[#E5E8EB] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value as Currency)}
              className={`w-full px-[1rem] py-[0.75rem] text-left text-[1rem] transition-colors hover:bg-[#F7F8F9] first:rounded-t-[0.75rem] last:rounded-b-[0.75rem] ${
                value === option.value ? "bg-[#F7F8F9] font-semibold" : ""
              }`}
            >
              {option.flag} {option.dropdownLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
