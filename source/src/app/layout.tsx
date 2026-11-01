import type { Metadata } from "next";
import "./globals.css";
import "@/components/sites/nics/nics.css";
import "@/components/sites/nics/nics-motion.css";
import { HydrationMark } from "@/components/sites/nics/hydration-mark";

export const metadata: Metadata = {
  title: "화학물질안전원 | 더 안전한 사회, 화학물질안전원이 함께합니다",
  description: "화학사고·테러 대응의 컨트롤 타워, 기후에너지환경부 소속 화학물질안전원 메인 페이지 시안",
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
