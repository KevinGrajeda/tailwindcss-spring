import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tailwindcss-spring",
  description:
    "A Tailwind CSS plugin that adds spring animations to your project using CSS linear(). Define just two parameters and let the plugin generate the easing curve and the animation duration.",
  keywords: [
    "tailwindcss",
    "tailwind",
    "spring",
    "animation",
    "plugin",
    "bounce",
    "linear()",
    "easing",
    "curve",
    "CSS",
  ],
  twitter: {
    title: "tailwindcss-spring",
    description:
      "A Tailwind CSS plugin that adds spring animations to your project using CSS linear(). Define just two parameters and let the plugin generate the easing curve and the animation duration.",
    card: "summary_large_image",
  },
  authors: [{ name: "Kevin Grajeda", url: "https://x.com/k_grajeda" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "overflow-y-scroll bg-background text-foreground antialiased",
          inter.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "6b4ca0b4cc924f9fac5827b89cf1a15f"}'
        ></script>
      </body>
    </html>
  );
}
