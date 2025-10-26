import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { NavLink } from "./_components/nav-link";
import { LogoutButton } from "./_components/logout-button";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  // 토큰 없으면 로그인 페이지로 리디렉션
  if (!authToken) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <nav className="border-b-1 border-[#D0D6DB]" aria-label="Main navigation">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[2.5rem] py-[1rem]">
          <Link href="/exchange" className="flex items-center">
            <Image src="/main-logo.png" width={24} height={24} alt="Logo" />
            <span className="ml-[0.5rem] text-[1.5rem] font-bold">
              Exchange app
            </span>
          </Link>
          <div className="flex items-center gap-14">
            <NavLink href="/exchange">환전하기</NavLink>
            <NavLink href="/history">환전내역</NavLink>
            <LogoutButton />
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
