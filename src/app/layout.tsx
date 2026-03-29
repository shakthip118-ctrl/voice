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
            colorPrimary: "#e78a53",
            colorBackground: "#565657",
            colorText: "#111827",
            colorTextSecondary: "#cad1df",
            colorInputBackground: "#6e6f72",
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