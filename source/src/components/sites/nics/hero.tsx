import Image from "next/image";

import { ASSET, designations, filmScenes, hero } from "./data";
import { Icon } from "./icons";
import { World } from "./world";

export function Hero() {
  const first = filmScenes[0];
  return (
    <>
      <section className="mkv" id="top">
        <canvas className="mkv__net" aria-hidden="true" data-net="mol" />
        <div className="wrap mkv__in">
          <div className="mkv__copy">
            <Image className="kv__logo" src={`${ASSET}/logo-white.png`} width={352} height={126} alt="" />
            <h1>
              <span>{hero.lines[0]}</span>
              <span>
                {hero.lines[1]} <em>{hero.em}</em>
              </span>
            </h1>
            <p className="kv__sub">{hero.sub}</p>
            <div className="gates">
              {hero.gates.map((g) => (
                <a key={g.title} className={`gate gate--${g.tone}`} href={g.href} target={g.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                  <span className="gate__ico">
                    <Icon name={g.tone === "alert" ? "siren" : "edu"} size={24} />
                  </span>
                  <span>
                    <b>{g.title}</b>
                    <span>{g.desc}</span>
                  </span>
                  <span className="arw">
                    <Icon name="chevron" size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <figure className="film" id="film" data-scene="0" data-scenes={JSON.stringify(filmScenes)} aria-label="화학물질안전원 업무 소개 모션그래픽">
            <div className="film__stage">
              <World />
              <div className="film__hud">
                <span className="film__no">01</span>
                <span className="film__tag">{first.tag}</span>
              </div>
              <figcaption className="film__cap">
                <b className="film__t">{first.title}</b>
                <span className="film__d">{first.desc}</span>
              </figcaption>
              <div className="film__bar">
                <ol className="film__ch">
                  {filmScenes.map((s, i) => (
                    <li key={s.s}>
                      <button type="button" aria-label={`${i + 1}장 ${s.tag}`} aria-current={i === 0 ? "step" : "false"}>
                        <span>
                          <i />
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
                <button className="film__pp" type="button" aria-pressed="false" aria-label="모션 일시정지">
                  <Icon name="pause" size={14} stroke={2.4} className="i-pause" />
                  <Icon name="play" size={14} stroke={2} className="i-play" />
                </button>
              </div>
            </div>
          </figure>
        </div>
        <a className="mkv__down" href="#work">
          <span>안전원이 하는 일</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="desig" aria-label="연락처">
        <div className="wrap">
          <ul>
            {designations.map((d) => (
              <li key={d.title}>
                <span className="dot" />
                <span>
                  <b>{d.title}</b>
                  <span>{d.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
