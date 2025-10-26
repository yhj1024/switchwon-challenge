import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (authToken) {
    redirect("/exchange");
  }

  redirect("/login");
}
