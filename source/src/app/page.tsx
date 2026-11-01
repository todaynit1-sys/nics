import { AppTabBar, InstallSheet } from "@/components/sites/nics/app-shell";
import { Hero } from "@/components/sites/nics/hero";
import { News } from "@/components/sites/nics/news";
import { Quick } from "@/components/sites/nics/quick";
import { Response } from "@/components/sites/nics/response";
import { SiteFooter } from "@/components/sites/nics/site-footer";
import { SiteHeader } from "@/components/sites/nics/site-header";
import { Story } from "@/components/sites/nics/story";

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">
        본문 바로가기
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Story />
        <Response />
        <News />
        <Quick />
      </main>
      <SiteFooter />
      <AppTabBar />
      <InstallSheet />
    </>
  );
}
