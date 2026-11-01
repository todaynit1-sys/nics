import Image from "next/image";

import { ASSET, footer, footerLinks, relatedSites, sns } from "./data";
import { Icon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft__top">
          <Image className="ft__logo" src={`${ASSET}/logo-white.png`} width={352} height={126} alt="기후에너지환경부 화학물질안전원" />
          <ul className="ft__sns">
            {sns.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" title={`${s.label} (새창)`}>
                  <Image src={`${ASSET}/${s.icon}`} width={43} height={43} alt={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <address className="ft__info">
          <span>
            <b>{footer.hq.label}</b> {footer.hq.addr}
          </span>
          <span>
            <b>{footer.branch.label}</b> {footer.branch.addr}
          </span>
          <span>
            <b>대표전화</b> {footer.tel}
          </span>
        </address>
        <div className="ft__row">
          <ul className="ft__links">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={l.em ? "is-em" : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <details className="ft__sites">
            <summary>
              관련사이트 바로가기 <Icon name="down" size={16} stroke={2} />
            </summary>
            <ul>
              {relatedSites.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <p className="ft__copy">{footer.copyright}</p>
        <p className="ft__note">본 페이지는 화학물질안전원 공식 홈페이지의 공개 정보를 바탕으로 제작한 메인 페이지 시안입니다.</p>
      </div>
    </footer>
  );
}
