"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-center text-[1.25rem] font-bold leading-[133%]",
        isActive ? "text-[#36414C]" : "text-[#8899AA]"
      )}
    >
      {children}
    </Link>
  );
}
