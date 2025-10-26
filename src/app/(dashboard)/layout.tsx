import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/button";
import { NavLink } from "./_components/nav-link";

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
      <nav
        className="flex items-center justify-between border-b-1 border-[#D0D6DB] px-[2.5rem] py-[1rem]"
        aria-label="Main navigation"
      >
        <div className="flex items-center">
          <Image src="/main-logo.png" width={24} height={24} alt="Logo" />
          <span className="ml-[0.5rem] text-[1.5rem] font-bold">
            Exchange app
          </span>
        </div>
        <div className="flex items-center gap-14">
          <NavLink href="/exchange">환전하기</NavLink>
          <NavLink href="/history">환전내역</NavLink>
          <div className="w-[5.875rem]">
            <Button size="sm" variant="secondary">
              Log out
            </Button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
