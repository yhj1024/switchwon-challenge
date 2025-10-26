import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExchangeForm } from "./exchange-form";
import * as useExchangeQuoteModule from "../_hooks/use-exchange-quote";
import * as useExchangeSubmitModule from "../_hooks/use-exchange-submit";

// Mock hooks
vi.mock("../_hooks/use-exchange-quote");
vi.mock("../_hooks/use-exchange-submit");

describe("ExchangeForm", () => {
  const mockRefetchExchangeRates = vi.fn();
  const mockDebouncedCalculateQuote = vi.fn();
  const mockHandleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

  const defaultExchangeRates = {
    USD: { rate: 1400, exchangeRateId: 1 },
    JPY: { rate: 10, exchangeRateId: 2 },
    KRW: { rate: 1, exchangeRateId: 3 },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // useExchangeQuote mock
    vi.spyOn(useExchangeQuoteModule, "useExchangeQuote").mockReturnValue({
      quote: null,
      isQuoteLoading: false,
      calculateQuote: vi.fn(),
      debouncedCalculateQuote: mockDebouncedCalculateQuote,
    });

    // useExchangeSubmit mock
    vi.spyOn(useExchangeSubmitModule, "useExchangeSubmit").mockReturnValue({
      handleSubmit: mockHandleSubmit,
      isOrderLoading: false,
    });
  });

  describe("금액 입력 검증", () => {
    it("금액이 비어있으면 환전하기 버튼이 disabled 상태이다", () => {
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      const submitButton = screen.getByRole("button", { name: /환전하기/i });
      expect(submitButton).toBeDisabled();
    });

    it("금액이 0 이하면 환전하기 버튼이 disabled 상태이다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      const amountInput = screen.getByLabelText(/매수 금액/i);
      const submitButton = screen.getByRole("button", { name: /환전하기/i });

      await user.type(amountInput, "0");
      expect(submitButton).toBeDisabled();

      await user.clear(amountInput);
      await user.type(amountInput, "-10");
      expect(submitButton).toBeDisabled();
    });

    it("유효한 금액을 입력하면 환전하기 버튼이 활성화된다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      const amountInput = screen.getByLabelText(/매수 금액/i);
      const submitButton = screen.getByRole("button", { name: /환전하기/i });

      await user.type(amountInput, "100");
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("통화 변경", () => {
    it("USD에서 JPY로 통화 변경 시 텍스트가 '달러 사기'에서 '엔 사기'로 변경된다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      // 초기 상태: USD, 살래요
      expect(screen.getByText(/달러 사기/i)).toBeInTheDocument();

      // 통화 선택 드롭다운 열기
      const currencyButton = screen.getByRole("button", {
        name: /환전할 통화 선택/i,
      });
      await user.click(currencyButton);

      // JPY 선택
      const jpyOption = screen.getByRole("button", { name: /일본 JPY/i });
      await user.click(jpyOption);

      // 텍스트 변경 확인
      await waitFor(() => {
        expect(screen.getByText(/엔 사기/i)).toBeInTheDocument();
        expect(screen.queryByText(/달러 사기/i)).not.toBeInTheDocument();
      });
    });

    it("통화 변경 시 환율 재조회 함수가 호출된다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      const currencyButton = screen.getByRole("button", {
        name: /환전할 통화 선택/i,
      });
      await user.click(currencyButton);

      const jpyOption = screen.getByRole("button", { name: /일본 JPY/i });
      await user.click(jpyOption);

      // 디바운싱 대기
      await waitFor(
        () => {
          expect(mockRefetchExchangeRates).toHaveBeenCalled();
        },
        { timeout: 1000 }
      );
    });
  });

  describe("매수/매도 전환", () => {
    it("살래요 상태에서 '달러 사기', '필요 원화', '원 필요해요' 텍스트가 표시된다", () => {
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      expect(screen.getByText(/달러 사기/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/필요 원화/i)).toBeInTheDocument();
      expect(screen.getByText(/원 필요해요/i)).toBeInTheDocument();
    });

    it("팔래요로 전환하면 '달러 팔기', '받을 원화', '원 받을 수 있어요' 텍스트로 변경된다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      // 팔래요 버튼 클릭
      const sellButton = screen.getByRole("tab", { name: /팔래요/i });
      await user.click(sellButton);

      await waitFor(() => {
        expect(screen.getByText(/달러 팔기/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/받을 원화/i)).toBeInTheDocument();
        expect(screen.getByText(/원 받을 수 있어요/i)).toBeInTheDocument();
      });
    });

    it("매수/매도 전환 시 입력된 금액으로 견적 재계산이 호출된다", async () => {
      const user = userEvent.setup();
      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      // 금액 입력
      const amountInput = screen.getByLabelText(/매수 금액/i);
      await user.type(amountInput, "100");

      // 팔래요로 전환
      const sellButton = screen.getByRole("tab", { name: /팔래요/i });
      await user.click(sellButton);

      // 디바운싱 대기 후 견적 재계산 호출 확인
      await waitFor(
        () => {
          expect(mockDebouncedCalculateQuote).toHaveBeenCalledWith("100");
        },
        { timeout: 1000 }
      );
    });
  });

  describe("환전 성공 시 폼 초기화", () => {
    it("환전 성공 시 금액 입력 필드가 초기화된다", async () => {
      const user = userEvent.setup();
      let onSuccessCallback: (() => void) | undefined;

      // useExchangeSubmit mock - onSuccess 콜백 저장
      vi.spyOn(useExchangeSubmitModule, "useExchangeSubmit").mockImplementation(
        ({ onSuccess }) => {
          onSuccessCallback = onSuccess;
          return {
            handleSubmit: vi.fn((e: React.FormEvent) => {
              e.preventDefault();
              // 환전 성공 시나리오 - onSuccess 콜백 실행
              onSuccessCallback?.();
            }),
            isOrderLoading: false,
          };
        }
      );

      render(
        <ExchangeForm
          exchangeRates={defaultExchangeRates}
          refetchExchangeRates={mockRefetchExchangeRates}
        />
      );

      // 금액 입력
      const amountInput = screen.getByLabelText(
        /매수 금액/i
      ) as HTMLInputElement;

      await user.type(amountInput, "100");
      expect(amountInput.value).toBe("100");

      // 환전하기 버튼 클릭
      const submitButton = screen.getByRole("button", { name: /환전하기/i });
      await user.click(submitButton);

      // 폼 초기화 확인
      await waitFor(() => {
        expect(amountInput.value).toBe("");
      });
    });
  });
});
