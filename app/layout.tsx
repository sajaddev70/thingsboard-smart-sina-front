import type { Metadata, Viewport } from "next";
import "./globals.css";
import { vazirFont } from "@/presentation/styles/fonts";
import { ThemeProvider } from "@/presentation/components/ThemeProvider";
import { QueryProvider } from "@/presentation/components/QueryProvider";
import { BottomNavigation } from "@/presentation/components/BottomNavigation";

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
    <html lang="fa" dir="rtl" suppressHydrationWarning className="h-full">
      <body className={`${vazirFont.variable} font-vazir antialiased selection:bg-tg-blue/30 overflow-x-hidden bg-gray-100 dark:bg-[#0e1621] h-full flex justify-center`}>
        <QueryProvider>
          <ThemeProvider>
            <div className="w-full max-w-[600px] min-h-full bg-background text-foreground safe-area-top safe-area-bottom shadow-2xl relative border-x border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto pb-24">
                {children}
              </main>
              <BottomNavigation />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
