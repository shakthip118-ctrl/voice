"use client";

import { useEffect } from "react";

export default function SuppressDailyError() {
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalConsoleError = console.error;

    const isSuppressed = (...args: unknown[]) => {
      const message = args.map(arg => String(arg)).join(' ').toLowerCase();
      return (
        message.includes('daily-js') ||
        (message.includes('transport') && message.includes('disconnected')) ||
        (message.includes('meeting') && message.includes('ejection'))
      );
    };

    console.log = (...args) => {
      if (!isSuppressed(args)) originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      if (!isSuppressed(args)) originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      if (!isSuppressed(args)) originalConsoleError.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
