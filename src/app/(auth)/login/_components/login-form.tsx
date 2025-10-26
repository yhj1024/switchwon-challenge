"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login with:", email);
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
        <Button type="submit">로그인하기</Button>
      </form>
    </main>
  );
}
