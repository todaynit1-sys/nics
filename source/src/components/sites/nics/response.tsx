import Image from "next/image";

import { ASSET, contact, responseFlow, responseLinks } from "./data";
import { Icon, type IconName } from "./icons";

export function Response() {
  return (
    <section className="rsp" id="response" aria-labelledby="rsp-title">
      <canvas className="rsp__net" aria-hidden="true" data-net="signal" />
      <div className="wrap rsp__in">
        <div className="rsp__head">
          <p className="kicker kicker--light">
            <Icon name="radar" size={16} stroke={2} />
            24시간 화학사고 대응
          </p>
          <h2 id="rsp-title">
            사고 발생부터 사후관리까지,
            <br />
            <em>멈추지 않는 상황실</em>
          </h2>
          <p className="rsp__lede">
            화학사고종합상황실은 24시간 365일 운영됩니다. 119나 유역(지방)환경청에 신고된 사고는 즉시 자동으로 전파되어 신속하고 체계적으로 대응합니다.
          </p>
        </div>

        <div className="rspflow" id="rspflow">
          <div className="rspflow__rail" aria-hidden="true">
            <i />
          </div>
          <ol>
            {responseFlow.map((f, i) => (
              <li key={f.title} className={`rss${i === 0 ? " is-on" : ""}`}>
                <button type="button" className="rss__btn" aria-pressed={i === 0}>
                  <span className="rss__ico">
                    <Icon name={f.icon as IconName} size={30} stroke={1.6} />
                    <span className="rss__pulse" />
                  </span>
                  <span className="rss__no">{String(i + 1).padStart(2, "0")}</span>
                  <b>{f.title}</b>
                  <span className="rss__p">{f.body}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="rsp__room">
          <figure className="rsp__photo">
            <Image src={`${ASSET}/kv-site.jpg`} width={1920} height={1280} alt="화학사고종합상황실 근무 모습" sizes="(min-width: 900px) 540px, 100vw" />
            <span className="rsp__live">
              <i /> 24H LIVE
            </span>
          </figure>
          <div className="rsp__call">
            <p className="rsp__label">화학사고·테러가 의심되면 지체 없이</p>
            <a className="rsp__tel" href={`tel:${contact.situationTel}`}>
              <Icon name="phone" size={26} stroke={1.8} />
              {contact.situationRoom}
            </a>
            <p className="rsp__note">화학사고종합상황실 · 상황 접수 즉시 관계기관에 전파</p>
            <ul className="rsp__links">
              {responseLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    {l.label}
                    <Icon name="chevron" size={16} stroke={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
