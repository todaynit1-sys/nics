import Image from "next/image";

import { ASSET, boards, media } from "./data";
import { Icon } from "./icons";

export function News() {
  return (
    <section className="sec sec--tint" id="news" aria-labelledby="news-title">
      <div className="wrap">
        <div className="sec__head sec__head--row">
          <div>
            <p className="kicker">
              <Icon name="flask" size={16} stroke={2} />
              알림마당
            </p>
            <h2 id="news-title">새소식</h2>
          </div>
          <a className="more" href={boards[0].more} data-board-more>
            전체 보기 <Icon name="arrow" size={16} stroke={2} />
          </a>
        </div>

        <div className="tabs" role="tablist" aria-label="새소식 게시판">
          {boards.map((b, i) => (
            <button
              key={b.label}
              type="button"
              role="tab"
              id={`tab-${i}`}
              aria-controls={`panel-${i}`}
              aria-selected={i === 0}
              data-more={b.more}
              tabIndex={i === 0 ? 0 : -1}
            >
              {b.label}
            </button>
          ))}
        </div>
        {boards.map((b, i) => (
          <ul key={b.label} className="board" role="tabpanel" id={`panel-${i}`} aria-labelledby={`tab-${i}`} hidden={i !== 0}>
            {b.posts.map((p) => (
              <li key={p.href}>
                <a href={p.href}>
                  <span className="board__tag">{p.cat ? `${b.label} · ${p.cat}` : b.label}</span>
                  <b>{p.title}</b>
                  <span className="board__date">{p.date}</span>
                  <Icon name="chevron" size={18} stroke={2} className="board__arw" />
                </a>
              </li>
            ))}
          </ul>
        ))}

        <div className="media">
          {media.map((m) => (
            <div key={m.label} className="media__col">
              <div className="media__head">
                <h3>{m.label}</h3>
                <a className="more" href={m.more}>
                  더보기 <Icon name="arrow" size={14} stroke={2} />
                </a>
              </div>
              <ul className="media__grid">
                {m.items.map((it) => (
                  <li key={it.href}>
                    <a href={it.href}>
                      <span className="media__thumb">
                        <Image src={`${ASSET}/${it.img}`} width={480} height={300} alt="" sizes="(min-width: 900px) 270px, 50vw" />
                        {m.label === "홍보영상" && (
                          <span className="media__play">
                            <Icon name="play" size={16} stroke={2} />
                          </span>
                        )}
                      </span>
                      <b>{it.title}</b>
                      <span>{it.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
