import Image from "next/image";

import { ASSET, shortcuts, systems } from "./data";
import { Icon } from "./icons";

export function Quick() {
  return (
    <section className="sec" id="systems" aria-labelledby="sys-title">
      <div className="wrap">
        <div className="sec__head">
          <p className="kicker">
            <Icon name="flask" size={16} stroke={2} />
            바로가기
          </p>
          <h2 id="sys-title">화학안전 정보시스템</h2>
        </div>
        <ul className="sys">
          {systems.map((s) => (
            <li key={s.title}>
              <a href={s.href} target="_blank" rel="noopener">
                <span className="sys__ico">
                  <Image src={`${ASSET}/${s.icon}`} width={35} height={32} alt="" unoptimized />
                </span>
                <span className="sys__txt">
                  <b>{s.title}</b>
                  <span>{s.desc}</span>
                </span>
                <Icon name="chevron" size={18} stroke={2} className="sys__arw" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="chips" aria-label="자주 찾는 메뉴">
          {shortcuts.map((s) => (
            <li key={s.label}>
              <a href={s.href} target={s.href.startsWith("https://nics") ? undefined : "_blank"} rel="noopener">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
