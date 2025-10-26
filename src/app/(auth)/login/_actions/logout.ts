"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * 로그아웃 처리
 * - authToken 쿠키 삭제
 * - 로그인 페이지로 리다이렉트
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  redirect("/login");
}
