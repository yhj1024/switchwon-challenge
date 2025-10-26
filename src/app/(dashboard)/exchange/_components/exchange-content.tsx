"use client";

import { ExchangeRateCard } from "./exchange-rate-card";
import { WalletCard } from "./wallet-card";
import { AssetSummary } from "./asset-summary";
import { ExchangeForm } from "./exchange-form";
import { useExchangeRates } from "@/api/hooks/use-exchange-rate";
import { useWallet } from "@/api/hooks/use-wallet";

export function ExchangeContent() {
  const { data: exchangeRatesData, isLoading: isRatesLoading } =
    useExchangeRates();
  const { data: walletData, isLoading: isWalletLoading } = useWallet();

  if (isRatesLoading || isWalletLoading) {
    return (
      <div className="grid grid-cols-1 gap-[2rem] lg:grid-cols-2">
        <div className="space-y-[1.5rem]">
          <div className="h-[120px] animate-pulse rounded-[1rem] bg-gray-200" />
          <div className="h-[120px] animate-pulse rounded-[1rem] bg-gray-200" />
          <div className="h-[200px] animate-pulse rounded-[1rem] bg-gray-200" />
        </div>
        <div className="h-[500px] animate-pulse rounded-[1rem] bg-gray-200" />
      </div>
    );
  }

  if (!exchangeRatesData?.data || !walletData?.data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-[1rem] text-[#646F7C]">
          데이터를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  const exchangeRates = exchangeRatesData.data;
  const walletSummary = walletData.data;

  // 환율 데이터를 Record로 변환
  const exchangeRatesMap = exchangeRates.reduce(
    (acc, rate) => {
      acc[rate.currency] = {
        rate: rate.rate,
        exchangeRateId: rate.exchangeRateId,
      };
      return acc;
    },
    {} as Record<string, { rate: number; exchangeRateId: number }>
  );

  // 지갑 잔액을 변환
  const walletBalances = walletSummary.wallets.map((wallet) => ({
    currency: wallet.currency,
    amount: wallet.balance,
  }));

  // 환율 카드용 데이터 변환 (KRW 제외, USD 먼저)
  const rateCards = exchangeRates
    .filter((rate) => rate.currency !== "KRW")
    .sort((a, b) => {
      if (a.currency === "USD") return -1;
      if (b.currency === "USD") return 1;
      return 0;
    })
    .map((rate) => ({
      currency: rate.currency as "USD" | "JPY",
      currencyName:
        rate.currency === "USD"
          ? "미국 달러"
          : rate.currency === "JPY"
            ? "일본 엔화"
            : "",
      rate: rate.rate,
      changeRate: rate.changePercentage,
    }));

  return (
    <div className="grid grid-cols-1 gap-[2rem] lg:grid-cols-2">
      {/* 좌측 영역: 환율 정보 및 지갑 */}
      <aside aria-label="환율 정보 및 보유 자산">
        <div className="flex h-full flex-col gap-[1.5rem]">
          {/* 환율 카드 - 좌우 배치 */}
          <section aria-labelledby="exchange-rates-title">
            <h2 id="exchange-rates-title" className="sr-only">
              환율 정보
            </h2>
            <div className="grid grid-cols-2 gap-[1rem]">
              {rateCards.map((rate) => (
                <ExchangeRateCard key={rate.currency} rate={rate} />
              ))}
            </div>
          </section>

          {/* 내 지갑 + 총 보유 자산 - 회색 배경 영역 */}
          <div className="flex flex-1 flex-col rounded-[1rem] border border-[#E5E8EB] bg-[#F7F8F9] p-[2rem]">
            <WalletCard balances={walletBalances} />
            <div className="mt-auto">
              <AssetSummary totalAmount={walletSummary.totalKrwBalance} />
            </div>
          </div>
        </div>
      </aside>

      {/* 우측 영역: 환전 폼 */}
      <ExchangeForm exchangeRates={exchangeRatesMap} />
    </div>
  );
}
