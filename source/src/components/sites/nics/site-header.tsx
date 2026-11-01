import Image from "next/image";

import { ASSET, EDU, contact, gnb } from "./data";
import { Icon } from "./icons";

export function SiteHeader() {
  return (
    <header className="hd">
      <div className="wrap hd__top">
        <a className="logo" href="#top">
          <Image src={`${ASSET}/logo-dark.png`} width={900} height={322} alt="기후에너지환경부 화학물질안전원" priority />
        </a>
        <div className="hd__right">
          <a className="hd__tel" href={`tel:${contact.situationTel}`}>
            <b>{contact.situationTel}</b>
            <span>화학사고 24시간 신고</span>
          </a>
          {/* Shown by motion.js only when the browser can install the app and it isn't installed yet. */}
          <button className="install" type="button" hidden>
            <Icon name="download" size={18} stroke={2} />
            <span>앱 설치</span>
          </button>
          <a className="mini" href={EDU} target="_blank" rel="noopener">
            교육신청
          </a>
          <button className="burger" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="drawer">
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>
      <nav className="nav" aria-label="주요 메뉴">
        <ul className="wrap">
          <li>
            <a href="#top" aria-current="page">
              홈
            </a>
          </li>
          {gnb.map((g) => (
            <li key={g.label} className="nav__item">
              <a href={g.href}>{g.label}</a>
              <ul className="nav__sub">
                {g.children.map((c) => (
                  <li key={c.label}>
                    <a href={c.href}>{c.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="drawer" id="drawer" aria-label="모바일 메뉴" hidden>
        {gnb.map((g) => (
          <details key={g.label}>
            <summary>
              {g.label}
              <Icon name="down" size={18} />
            </summary>
            <ul>
              {g.children.map((c) => (
                <li key={c.label}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <a className="drawer__tel" href={`tel:${contact.situationTel}`}>
          <Icon name="phone" size={18} />
          화학사고 신고 {contact.situationRoom}
        </a>
      </nav>
    </header>
  );
}
