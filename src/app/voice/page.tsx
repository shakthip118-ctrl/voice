// src/app/voice/page.tsx
import Navbar from "@/components/Navbar";
import VapiWidget from "@/components/voice/VapiWidget";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import WelcomeSection from "@/components/voice/WelcomeSection";
import FeatureCards from "@/components/voice/FeatureCards";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SuppressDailyError from "@/components/SuppressDailyError" // new

async function VoicePage() {
  const { has } = await auth();
  const user = await currentUser();

  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.primaryEmailAddress?.emailAddress;

  if (adminEmail && userEmail?.toLowerCase() === adminEmail.toLowerCase()) {
    redirect("/admin");
  }

  const hasProPlan = has({ plan: "ai_basic" }) || has({ plan: "ai_pro" });

  if (!hasProPlan) return <ProPlanRequired />;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Suppress Daily 0.80.0 console error */}
      <SuppressDailyError />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <FeatureCards />
      </div>

      <VapiWidget />
    </div>
  );
}

export default VoicePage;