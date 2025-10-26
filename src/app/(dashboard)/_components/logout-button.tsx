"use client";

import { Button } from "@/components/button";
import { logout } from "@/app/(auth)/login/_actions/logout";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-[5.875rem]">
      <Button
        size="sm"
        variant="secondary"
        type="button"
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
}
