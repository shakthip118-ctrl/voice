"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowLeftIcon,
  ClipboardListIcon,
  HomeIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminNavbar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-primary/20 bg-background/90 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DentWise Logo"
              width={32}
              height={32}
              className="w-11"
            />
            <div className="flex items-center gap-2">
              <span className="font-medium">DentWise</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-primary/15 text-primary border border-primary/20 rounded-full flex items-center gap-1">
                <ShieldIcon className="w-3 h-3" />
                Admin
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className={`flex items-center gap-2 transition-colors ${
                pathname === "/admin"
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            <a
              href="#doctors"
              className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground"
            >
              <UsersIcon className="w-4 h-4" />
              <span className="hidden md:inline">Doctors</span>
            </a>

            <a
              href="#appointments"
              className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground"
            >
              <ClipboardListIcon className="w-4 h-4" />
              <span className="hidden md:inline">Recent Appointments</span>
            </a>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden md:inline">Back to Site</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>

            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
