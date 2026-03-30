// components/SuppressDailyError.tsx
"use client";

import { useEffect } from "react";

export default function SuppressDailyError() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("daily-js version 0.80.0 is no longer supported")
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}