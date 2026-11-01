import { steps, vision } from "./data";
import { Icon } from "./icons";
import { World } from "./world";

export function Story() {
  return (
    <section className="story" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec__head story__head">
          <p className="kicker">
            <Icon name="flask" size={16} stroke={2} />
            안전원이 하는 일
          </p>
          <h2 id="work-title">화학물질의 전 주기 안전을 책임집니다</h2>
          <p className="story__lede">
            물질의 등록·평가부터 사고 예방과 대응, 원인 조사와 교육까지. 화면을 내리시면 화학물질안전원의 업무를 차례로 확인하실 수 있습니다.
          </p>
        </div>
        <div className="story__grid">
          <div className="story__stage">
            <div className="stage" id="stage">
              <World />
              <div className="stage__hud">
                <span className="stage__no">
                  <b>01</b>
                  <i>/ {String(steps.length).padStart(2, "0")}</i>
                </span>
                <span className="stage__law">{steps[0].law}</span>
              </div>
              <ol className="stage__dots">
                {steps.map((s, i) => (
                  <li key={s.id}>
                    <button type="button" aria-label={`${String(i + 1).padStart(2, "0")} ${s.title}`} />
                  </li>
                ))}
                <li>
                  <button type="button" aria-label="마무리" />
                </li>
              </ol>
            </div>
          </div>
          <ol className="story__steps">
            {steps.map((s, i) => (
              <li key={s.id} className={`step${i === 0 ? " is-on" : ""}`} id={s.id} data-s={s.s} data-law={s.law}>
                <div className="step__meta">
                  <span className="step__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="step__tag">{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="step__law">{s.law}</p>
                <p className="step__p">{s.body}</p>
                <ul className="step__facts">
                  {s.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className="step__go" href={s.href}>
                  자세히 보기 <Icon name="arrow" size={16} stroke={2} />
                </a>
              </li>
            ))}
            <li className="step step--end" data-s="shield" data-law="비전">
              <p className="step__law">비전</p>
              <h3>{vision.title}</h3>
              <ul className="values">
                {vision.values.map((v, i) => (
                  <li key={v}>
                    <span>{i + 1}</span>
                    {v}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
