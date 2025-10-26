import { WalletBalance } from "@/types/exchange";
import { CURRENCY_SYMBOLS } from "@/constants/currency";

interface WalletCardProps {
  balances: WalletBalance[];
}

/**
 * 지갑 잔액 표시
 */
export function WalletCard({ balances }: WalletCardProps) {
  return (
    <section aria-labelledby="wallet-title">
      <h3
        id="wallet-title"
        className="mb-[1.5rem] text-[1.5rem] font-extrabold text-[#28323C]"
      >
        내 지갑
      </h3>
      <ul className="space-y-[0.5rem]">
        {balances.map((balance) => (
          <li
            key={balance.currency}
            className="flex items-center justify-between"
          >
            <span className="text-[1.25rem] font-medium text-[#646F7C]">
              {balance.currency}
            </span>
            <span className="text-[1.25rem] font-semibold text-[#646F7C]">
              {CURRENCY_SYMBOLS[balance.currency]}{" "}
              {balance.amount.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
