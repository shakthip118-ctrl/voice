import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/provider/TanStackProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant. Available 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <TanStackProvider>
      <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#d87943",   // 🟠 Orange buttons
          colorBackground: "#f3f4f6", // 🟫 Grey background (matches cards)
          colorText: "#111827",       // Dark text
          borderRadius: "0.75rem",    // Rounded corners
        },
        elements: {
          card: "bg-card shadow-lg border border-border rounded-xl",
          input:
            "bg-card border border-border text-card-foreground rounded-md px-3 py-2 placeholder-gray-400",
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:opacity-90 font-medium rounded-lg px-4 py-2",
        },
      }}
    >
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
            <UserSync />
            {children}
          </body>
        </html>
      </ClerkProvider>
      </TanStackProvider>
  );
}