import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Starfield } from "@/components/ui/Starfield";
import Navbar from "@/components/navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSSC",
  description: "National Students Space Challenge - Asia's largest Astro-Tech Fest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${jetbrainsMono.className} min-h-full flex flex-col bg-transparent text-white antialiased relative`}>
        {/* Persistent starfield background — mounted once, never unmounts */}
        <div className="fixed inset-0 pointer-events-none -z-50" aria-hidden="true">
          <Starfield
            starColor="rgba(255, 255, 255, 0.95)"
            bgColor="#000000"
            speed={2}
            quantity={300}
          />
        </div>
        {/* Navbar lives here so it is NEVER re-mounted on route changes */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

