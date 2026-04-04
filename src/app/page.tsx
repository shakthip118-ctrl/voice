import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatToAsk from "@/components/landing/WhatToAsk";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function Home() {
  const user = await currentUser();

  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-background">
      
      {/* CLIENT-SIDE ERROR SUPPRESSOR */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const originalError = console.error;
              console.error = function(...args) {
                if (
                  typeof args[0] === "string" &&
                  args[0].includes("daily-js version 0.80.0 is no longer supported")
                ) {
                  return;
                }
                originalError.apply(console, args);
              };
            })();
          `,
        }}
      />

      <br />
      <br />
      <br />

      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />  <PricingSection />
      <CTA /><Footer />
    </div>
  );
}