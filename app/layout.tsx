import type { Metadata, Viewport } from "next";
import "./globals.css";
import { vazirFont } from "@/presentation/styles/fonts";
import { ThemeProvider } from "@/presentation/components/ThemeProvider";
import { QueryProvider } from "@/presentation/components/QueryProvider";

export const metadata: Metadata = {
  title: "ThingsBoard Smart Sina",
  description: "Advanced IoT Management Platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ThingsBoard",
  },
};

export const viewport: Viewport = {
  themeColor: "#2481cc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirFont.variable} font-vazir antialiased selection:bg-tg-blue/30 overflow-x-hidden`}>
        <QueryProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-background text-foreground safe-area-top safe-area-bottom max-w-[600px] mx-auto shadow-2xl relative border-x border-gray-100 dark:border-gray-800">
              {children}
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
