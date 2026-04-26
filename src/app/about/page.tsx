
"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 pt-24 space-y-10">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold mb-2">About DentWise</h1>
          <p className="text-muted-foreground">
            Your trusted platform for booking dental appointments with ease and confidence.</p>
        </div>

        {/* About content */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            DentWise is designed to simplify the process of booking dental appointments.
            We connect patients with verified dentists and provide a seamless experience
            from booking to confirmation.
          </p>

          <p>
            Our mission is to make dental care accessible, organized, and stress-free.
            Whether it's a routine checkup or an emergency visit, DentWise helps you
            find the right doctor at the right time.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-sm text-muted-foreground">📍 Bangalore, India</p>
          <p className="text-sm text-muted-foreground">📞 +91 9449906170</p>
          <p className="text-sm text-muted-foreground">✉️ support@dentwise.com</p>
        </div>

        {/* Google Map */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Location</h2>

          <div className="w-full h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}