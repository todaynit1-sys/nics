import { depts } from "./depts";
import { Icon } from "./icons";

// Main-page entry to the 부서별 업무 page: one card per department, deep-linking to its player.
export function DeptTeaser() {
  return (
    <section className="sec dteaser" id="depts" aria-labelledby="dteaser-title">
      <div className="wrap">
        <div className="sec__head sec__head--row">
          <div>
            <p className="kicker">
              <Icon name="users" size={16} stroke={2} />
              기관소개
            </p>
            <h2 id="dteaser-title">부서별 업무를 30초로</h2>
            <p className="dteaser__lede">{depts.length}개 부서가 하는 일을 짧은 애니메이션으로 확인하세요.</p>
          </div>
          <a className="more" href="/dept">
            전체 보기 <Icon name="arrow" size={16} stroke={2} />
          </a>
        </div>
        <ul className="dteaser__grid">
          {depts.map((d, i) => (
            <li key={d.id}>
              <a href={`/dept#${d.id}`}>
                <span className="dteaser__no">{String(i + 1).padStart(2, "0")}</span>
                <b>{d.name}</b>
                <span className="dteaser__m">{d.mission}</span>
                <span className="dteaser__go">
                  <Icon name="play" size={12} stroke={2.4} /> 30초 보기
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
