import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

async function AdminPage() {
  const user = await currentUser();

  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.primaryEmailAddress?.emailAddress;

  if (!adminEmail || userEmail?.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient />;
}

export default AdminPage;
