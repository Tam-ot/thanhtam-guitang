import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scroll Animation",
  description: "Scroll-driven frame sequence animation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
