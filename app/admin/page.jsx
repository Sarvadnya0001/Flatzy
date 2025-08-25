import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (session.user.role !== "admin") {
    console.log(session.user);
    
    redirect("/");
  }

  return <AdminDashboard />;
}