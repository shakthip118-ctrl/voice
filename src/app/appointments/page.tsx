import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppointmentsClient from "./AppointmentsClient";

export default async function Page() {
  const user = await currentUser();

  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.primaryEmailAddress?.emailAddress;

  if (adminEmail && userEmail?.toLowerCase() === adminEmail.toLowerCase()) {
    redirect("/admin");
  }

  return <AppointmentsClient />;
}
