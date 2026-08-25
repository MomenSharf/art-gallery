import ManageLogin from "@/components/manage/manage-login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const cookieStore = await cookies();
  
  const session = cookieStore.get("manage_session");

   if (session?.value === "authenticated") {
      redirect("/manage/library");
    }
  return <ManageLogin />;
}