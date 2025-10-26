"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useLogin } from "@/api/hooks";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(
      { email },
      {
        onSuccess: (data) => {
          if (data.data?.token) {
            Cookies.set("authToken", data.data.token, {
              expires: 7, // 7일
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            router.push("/exchange");
          }
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section
        aria-labelledby="login-title"
        className="mb-[3rem] flex flex-col items-center"
      >
        <div className="mb-[1.5rem]">
          <Image src="/main-logo.png" width={80} height={80} alt="Logo" />
        </div>
        <h1
          id="login-title"
          className="mb-[0.5rem] text-[3rem] font-bold text-[#374553]"
        >
          반갑습니다.
        </h1>
        <p className="mb-[0.5rem] text-[2rem] font-medium text-[#646F7C]">
          로그인 정보를 입력해주세요.
        </p>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-[16.9375rem] min-w-[35rem] flex-col items-center rounded-[1.25rem] border border-[#D0D6DB] bg-[#F7F8F9] px-[2rem] py-[1.5rem]"
      >
        <Input
          id="email"
          type="email"
          label="이메일 주소를 입력해주세요."
          value={email}
          onChange={setEmail}
          placeholder="test@test.com"
          required
          autoComplete="email"
        />
        {isError && (
          <p className="mb-4 text-sm text-red-600">
            {error?.message || "로그인에 실패했습니다."}
          </p>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인하기"}
        </Button>
      </form>
    </main>
  );
}
