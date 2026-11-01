import { DEPT_CHECKED, DEPT_SOURCE, depts } from "./depts";
import { Icon } from "./icons";
import { World } from "./world";

const pad = (n: number) => String(n).padStart(2, "0");
const sec = (ms: number) => Math.round(ms / 1000);

// 부서별 업무 탐색기. Markup for every department is server-rendered (each panel carries its
// scene script in data-scenes); public/sites/nics/motion.js switches panels and runs the player.
export function DeptExplorer() {
  const first = depts[0];
  const total = first.scenes.reduce((t, s) => t + s.ms, 0);

  return (
    <section className="dx" id="dept" aria-labelledby="dx-title">
      <div className="wrap">
        <div className="dx__head">
          <p className="kicker">
            <Icon name="flask" size={16} stroke={2} />
            기관소개 · 부서별 업무
          </p>
          <h1 id="dx-title">부서별 업무를 30초로</h1>
          <p className="dx__lede">
            화학물질안전원 {depts.length}개 부서가 하는 일을 &lsquo;화학안전 세계&rsquo; 애니메이션으로 소개합니다. 자동 재생으로 전체를 보거나, 장면 버튼으로 원하는 업무로 바로 이동하세요.
          </p>
        </div>

        <div className="dx__tabs" role="tablist" aria-label="부서 선택">
          {depts.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`dx-tab-${d.id}`}
              aria-controls={`dx-panel-${d.id}`}
              aria-selected={i === 0}
              tabIndex={i === 0 ? 0 : -1}
              data-dept={d.id}
            >
              <span>{pad(i + 1)}</span>
              {d.name}
            </button>
          ))}
        </div>

        <div className="dx__grid">
          <div className="dx__side">
            {depts.map((d, i) => (
              <div
                key={d.id}
                className="dx__panel"
                role="tabpanel"
                id={`dx-panel-${d.id}`}
                aria-labelledby={`dx-tab-${d.id}`}
                data-dept={d.id}
                data-scenes={JSON.stringify(d.scenes)}
                hidden={i !== 0}
              >
                <p className="dx__eyebrow">
                  {pad(i + 1)} — {d.name}
                </p>
                <h2>{d.name}</h2>
                <p className="dx__mission">{d.mission}</p>
                <p className="dx__meta">30초 · {d.scenes.length}개 장면</p>
                <p className="dx__label">대표 업무 바로 보기</p>
                <ul className="dx__tasks">
                  {d.tasks.map((t, k) => (
                    <li key={t.title}>
                      <button type="button" data-scene={t.scene}>
                        <span className="dx__tno">
                          {pad(k + 1)} · {pad(sec(d.scenes.slice(0, t.scene).reduce((a, s) => a + s.ms, 0)))}초
                        </span>
                        <b>{t.title}</b>
                        <span>{t.body}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <figure className="dxp" id="dxp" aria-label="부서 업무 애니메이션">
            <div className="dxp__stage">
              <World />
              <div className="dxp__hud">
                <span className="dxp__dept">{first.name}</span>
                <span className="dxp__scene">{first.scenes[0].title}</span>
                <span className="dxp__time" aria-hidden="true">
                  <i />
                  <b>00:00</b> / {pad(sec(total))}초
                </span>
              </div>
              <figcaption className="dxp__cap" aria-live="polite">
                {first.scenes[0].caption}
              </figcaption>
              <div className="dxp__bar" aria-hidden="true">
                <i />
              </div>
            </div>
            <div className="dxp__ctrl">
              <button type="button" className="dxp__btn" data-act="play" aria-pressed="false">
                <Icon name="pause" size={16} stroke={2.4} className="i-pause" />
                <Icon name="play" size={16} stroke={2} className="i-play" />
                <span>일시정지</span>
              </button>
              <button type="button" className="dxp__btn" data-act="voice" aria-pressed="false">
                <Icon name="megaphone" size={16} stroke={2} />
                <span>음성 해설 듣기</span>
              </button>
              <button type="button" className="dxp__btn" data-act="cc" aria-pressed="true">
                <span className="dxp__cc">CC</span>
                <span>자막 끄기</span>
              </button>
            </div>
            <ol className="dxp__chips">
              {first.scenes.map((s, i) => (
                <li key={i}>
                  <button type="button" data-scene={i} aria-current={i === 0 ? "step" : "false"}>
                    <span className="dxp__cno">
                      {pad(i + 1)} · {pad(sec(first.scenes.slice(0, i).reduce((a, x) => a + x.ms, 0)))}초
                    </span>
                    <b>{s.title}</b>
                    <i aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </figure>
        </div>

        {depts.map((d, i) => (
          <div key={d.id} className="dx__duties" data-dept={d.id} hidden={i !== 0}>
            <div className="dx__dhead">
              <div>
                <p className="dx__label">DEPARTMENT · 업무 안내</p>
                <h3>{d.name} 주요 업무</h3>
              </div>
              <p className="dx__src">
                <a href={DEPT_SOURCE} target="_blank" rel="noopener">
                  공식 부서안내 <Icon name="arrow" size={14} stroke={2} />
                </a>
                <span>홈페이지 확인: {DEPT_CHECKED}</span>
              </p>
            </div>
            <ul>
              {d.duties.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className="dx__note">지도와 사업장, 차량, 수치 표현은 업무 이해를 돕기 위한 예시입니다.</p>
      </div>
    </section>
  );
}
