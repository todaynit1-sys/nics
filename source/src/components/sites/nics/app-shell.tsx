import Image from "next/image";

import { ASSET, contact } from "./data";
import { Icon } from "./icons";

// App-style chrome for phones and installed (PWA) use:
// a bottom tab bar below 900px and the install sheet shown by motion.js.
export function AppTabBar() {
  return (
    <nav className="tabbar" aria-label="빠른 이동">
      <a href="#top" data-tab="top">
        <Icon name="home" size={22} />
        <span>홈</span>
      </a>
      <a href="#work" data-tab="work">
        <Icon name="flask" size={22} />
        <span>업무</span>
      </a>
      <a className="tabbar__call" href={`tel:${contact.situationTel}`} aria-label={`화학사고 신고 ${contact.situationRoom}`}>
        <span className="tabbar__callb">
          <Icon name="siren" size={24} />
        </span>
        <span>사고 신고</span>
      </a>
      <a href="#news" data-tab="news">
        <Icon name="news" size={22} />
        <span>새소식</span>
      </a>
      <button type="button" data-open-drawer aria-controls="drawer" aria-expanded="false">
        <Icon name="grid" size={22} />
        <span>전체메뉴</span>
      </button>
    </nav>
  );
}

export function InstallSheet() {
  return (
    <div className="sheet" id="install-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" hidden>
      <div className="sheet__panel">
        <p className="sheet__app">
          <Image src={`${ASSET}/icons/icon-192.png`} width={48} height={48} alt="" />
          <span>
            <b id="sheet-title">화학물질안전원 앱 설치</b>
            <span>홈 화면에서 바로 열고, 인터넷이 없어도 볼 수 있어요.</span>
          </span>
        </p>
        <ol className="sheet__steps" data-ios>
          <li>
            Safari 아래쪽의 <Icon name="share" size={18} /> <b>공유</b> 버튼을 누르세요.
          </li>
          <li>
            <Icon name="plus" size={18} /> <b>홈 화면에 추가</b>를 고르세요.
          </li>
        </ol>
        <p className="sheet__steps" data-other>
          브라우저 메뉴(⋮)에서 <b>앱 설치</b> 또는 <b>홈 화면에 추가</b>를 고르세요.
        </p>
        <button type="button" className="sheet__close" data-close-sheet>
          확인
        </button>
      </div>
    </div>
  );
}
