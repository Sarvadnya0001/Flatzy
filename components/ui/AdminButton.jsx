"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AdminButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session?.user?.role === "admin") {
    return (
      <Link
        href="/admin"
        className="flex items-center justify-center tracking-widest font-mono gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 shadow-sm transition-colors duration-200"
      >
        <ShieldCheck className="w-4 h-4" />
        ADMIN DASHBOARD
      </Link>
    );
  }

  return null;
}
