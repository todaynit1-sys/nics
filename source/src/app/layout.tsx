import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/components/sites/nics/nics.css";
import "@/components/sites/nics/nics-motion.css";
import "@/components/sites/nics/nics-app.css";
import { HydrationMark } from "@/components/sites/nics/hydration-mark";

export const metadata: Metadata = {
  title: "화학물질안전원 | 더 안전한 사회, 화학물질안전원이 함께합니다",
  description: "화학사고·테러 대응의 컨트롤 타워, 기후에너지환경부 소속 화학물질안전원 메인 페이지 시안",
  applicationName: "화학물질안전원",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/sites/nics/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/sites/nics/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/sites/nics/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "화학물질안전원",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

// viewport-fit=cover lets the app draw under the iPhone notch / home indicator;
// nics-app.css pads the header and tab bar with the safe-area insets.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d4a5c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="nics">
      <body>
        {children}
        <HydrationMark />
        {/* All behaviour lives in one plain script so the static HTML export works without the Next runtime. */}
        <script src="/sites/nics/motion.js" defer />
      </body>
    </html>
  );
}
