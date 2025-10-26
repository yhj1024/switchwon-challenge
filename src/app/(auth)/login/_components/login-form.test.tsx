import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";
import * as authHooks from "@/api/hooks";
import Cookies from "js-cookie";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock API hooks
vi.mock("@/api/hooks", () => ({
  useLogin: vi.fn(),
}));

// Mock js-cookie
vi.mock("js-cookie", () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
  },
}));

describe("LoginForm", () => {
  const mockPush = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });
    (authHooks.useLogin as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null,
    });
  });

  it("이메일 형식이 잘못된 경우 HTML5 validation이 동작한다", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("test@test.com");
    const submitButton = screen.getByRole("button", { name: /로그인하기/i });

    // @ 없는 이메일 입력
    await user.type(emailInput, "invalidemail");
    await user.click(submitButton);

    // HTML5 validation으로 인해 API 호출이 안됨
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("로그인 성공 시 쿠키에 토큰을 저장하고 /exchange 페이지로 이동한다", async () => {
    const user = userEvent.setup();

    // 성공 시나리오 mock
    (authHooks.useLogin as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: vi.fn((request, options) => {
        // 성공 콜백 즉시 실행
        options?.onSuccess?.({
          code: "OK",
          message: "로그인 성공",
          data: {
            memberId: 1,
            token: "mock-jwt-token",
          },
        });
      }),
      isPending: false,
      isError: false,
      error: null,
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("test@test.com");
    const submitButton = screen.getByRole("button", { name: /로그인하기/i });

    // 올바른 이메일 입력
    await user.type(emailInput, "test@test.com");
    await user.click(submitButton);

    await waitFor(() => {
      // 쿠키에 토큰 저장 확인
      expect(Cookies.set).toHaveBeenCalledWith(
        "authToken",
        "mock-jwt-token",
        expect.objectContaining({
          expires: 7,
          sameSite: "strict",
        })
      );

      // /exchange로 이동 확인
      expect(mockPush).toHaveBeenCalledWith("/exchange");
    });
  });
});
