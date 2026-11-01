import type { Metadata } from "next";

import { AppTabBar, InstallSheet } from "@/components/sites/nics/app-shell";
import { DeptExplorer } from "@/components/sites/nics/dept-explorer";
import { SiteFooter } from "@/components/sites/nics/site-footer";
import { SiteHeader } from "@/components/sites/nics/site-header";

export const metadata: Metadata = {
  title: "부서별 업무 | 화학물질안전원",
  description: "화학물질안전원 8개 부서의 업무를 30초 애니메이션으로 소개합니다.",
};

export default function DeptPage() {
  return (
    <>
      <a className="skip" href="#dept">
        본문 바로가기
      </a>
      <SiteHeader page="dept" />
      <main>
        <DeptExplorer />
      </main>
      <SiteFooter />
      <AppTabBar page="dept" />
      <InstallSheet />
    </>
  );
}
