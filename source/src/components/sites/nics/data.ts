// Content from https://nics.mcee.go.kr (main page and 업무안내 / 기관소개 pages), captured 2026-11-01.
// Layout and motion follow https://chemsafe.ondoco.workers.dev.

const ORIGIN = "https://nics.mcee.go.kr";
const sub = (id: number) => `${ORIGIN}/sub.do?menuId=${id}`;
const view = (menuId: number, boardId: number, master = 23) =>
  `${ORIGIN}/boardView.do?menuId=${menuId}&boardMasterId=${master}&boardId=${boardId}`;

export const ASSET = "/sites/nics";
export const EDU = "https://edunics.mcee.go.kr";

export type Link = { label: string; href: string };
export type MenuGroup = Link & { children: Link[] };

export const contact = {
  situationRoom: "043-830-4120~4",
  situationTel: "043-830-4120",
  main: "043-830-4000",
};

export const gnb: MenuGroup[] = [
  {
    label: "정보공개",
    href: sub(113),
    children: [
      { label: "공공데이터개방현황", href: sub(113) },
      { label: "정보공개안내", href: sub(9) },
      { label: "사전정보공개", href: sub(95) },
    ],
  },
  {
    label: "국민마당",
    href: "https://www.mcee.go.kr/home/web/index.do?menuId=10399",
    children: [
      { label: "일반민원신청", href: "https://www.mcee.go.kr/home/web/index.do?menuId=10399" },
      { label: "서식민원신청", href: "https://minwon.mcee.go.kr/index.do" },
      { label: "예산낭비신고", href: "https://www.mcee.go.kr/home/web/index.do?menuId=27" },
      { label: "공익신고", href: "https://www.clean.go.kr/menu.es?mid=a10207000000" },
    ],
  },
  {
    label: "알림마당",
    href: sub(72),
    children: [
      { label: "공지 · 공고", href: sub(72) },
      { label: "보도", href: sub(33) },
      { label: "기관홍보", href: sub(78) },
      { label: "간행물", href: sub(34) },
      { label: "연구활동", href: sub(121) },
      { label: "법령 정보", href: sub(36) },
    ],
  },
  {
    label: "자료마당",
    href: sub(170),
    children: [
      { label: "화학사고대응자료", href: sub(170) },
      { label: "화학사고예방관리계획서 자료", href: sub(124) },
      { label: "취급시설 안전관리 자료", href: sub(58) },
      { label: "화학물질배출량·통계 자료", href: sub(27) },
      { label: "살생물제 및 생활화학제품 자료", href: sub(153) },
      { label: "화학물질 등록평가 자료", href: sub(157) },
    ],
  },
  {
    label: "업무안내",
    href: sub(14),
    children: [
      { label: "화학사고대응", href: sub(14) },
      { label: "화학사고예방관리계획", href: sub(116) },
      { label: "화학물질취급 안전관리", href: sub(89) },
      { label: "화학물질배출량 · 통계", href: sub(91) },
      { label: "안전교육", href: sub(28) },
      { label: "화학사고조사", href: sub(107) },
      { label: "살생물물질·제품", href: sub(149) },
      { label: "화학물질등록평가", href: sub(155) },
    ],
  },
  {
    label: "기관소개",
    href: sub(46),
    children: [
      { label: "인사말", href: sub(46) },
      { label: "설립목적 및 배경", href: sub(47) },
      { label: "비전 · 기능", href: sub(101) },
      { label: "조직 및 직원", href: `${ORIGIN}/deptList.do?menuId=63` },
      { label: "찾아오시는길", href: sub(50) },
    ],
  },
];

export const hero = {
  lines: ["더 안전한 사회,", "화학물질안전원이"],
  em: "함께합니다",
  sub: "평시 24시간 비상상황실을 운영하며 화학사고·테러 대응의 컨트롤 타워 역할을 합니다. 화학물질 등록·평가부터 사고 예방·조사·교육까지 화학안전의 전 주기를 책임집니다.",
  gates: [
    { title: "화학사고 신고 안내", desc: `24시간 화학사고종합상황실 · ${"043-830-4120~4"}`, href: sub(12), tone: "alert" },
    { title: "교육훈련 일정 · 신청", desc: "전문 · 법정 · 특별교육, 화학안전 키움의 날", href: EDU, tone: "edu" },
  ],
};

export type FilmScene = { s: string; cam: string; tag: string; title: string; desc: string; ms: number; draw?: boolean };

export const filmScenes: FilmScene[] = [
  { s: "intro", cam: "wide", tag: "일상", title: "화학물질과 함께 살아가는 사회", desc: "사업장 · 마을 · 생활화학제품", ms: 5600, draw: true },
  { s: "monitor", cam: "monitor", tag: "상황실", title: "24시간 365일 화학사고를 지켜봅니다", desc: `화학사고종합상황실 ${"043-830-4120~4"}`, ms: 4800 },
  { s: "leak", cam: "leak", tag: "사고", title: "사고가 나면 피해 범위부터 예측합니다", desc: "확산 평가 · 사고물질 방제정보 제공", ms: 4800 },
  { s: "respond", cam: "respond", tag: "대응", title: "전문 인력과 장비가 현장으로 갑니다", desc: "유역(지방)환경청 · 화학재난합동방재센터와 협업", ms: 4800 },
  { s: "register", cam: "register", tag: "예방", title: "화학물질의 유해성을 미리 평가합니다", desc: "화학물질 등록평가 · 살생물제 승인", ms: 4800 },
  { s: "edu", cam: "edu", tag: "교육", title: "현장의 대응 역량을 키웁니다", desc: "전문 · 법정 · XR 실감형 교육훈련", ms: 4800 },
  { s: "shield", cam: "shield", tag: "함께", title: "국민이 신뢰하는 화학안전 선도기관", desc: "기후에너지환경부 소속 책임운영기관", ms: 6000 },
];

export const designations = [
  { title: "화학사고종합상황실", desc: `24시간 365일 · ${"043-830-4120~4"}` },
  { title: "대표전화", desc: "043-830-4000" },
  { title: "본원", desc: "충청북도 청주시 흥덕구 오송읍 오송생명11로 270" },
  { title: "분원", desc: "인천광역시 서구 환경로 42" },
];

export type Step = {
  id: string;
  s: string;
  tag: string;
  title: string;
  law: string;
  body: string;
  facts: string[];
  href: string;
};

// Order follows the life cycle of a chemical: evaluate → approve → prevent → manage → respond → investigate → train.
export const steps: Step[] = [
  {
    id: "w-register", s: "register", tag: "등록평가", title: "화학물질등록평가",
    law: "화학물질의 등록 및 평가 등에 관한 법률",
    body: "기존·신규 화학물질의 유해성을 심사하고, 안전관리에 필요한 정보를 생산·제공해 유해화학물질로부터 환경과 국민 건강을 보호합니다.",
    facts: ["기존 · 신규 화학물질 유해성 심사", "등록정보 공개 제도", "GHS · MAN · QSAR 국제협력"],
    href: sub(155),
  },
  {
    id: "w-biocide", s: "biocide", tag: "살생물제 승인", title: "살생물 물질 · 제품",
    law: "생활화학제품 및 살생물제의 안전관리에 관한 법률",
    body: "유해생물 제거 등에 쓰는 살생물물질·제품의 유·위해성과 효과·효능을 과학적으로 평가하고, 안전사용 정보를 제공합니다.",
    facts: ["살생물물질 승인", "살생물제품 승인", "안전확인대상생활화학제품 승인"],
    href: sub(149),
  },
  {
    id: "w-plan", s: "plan", tag: "화학사고예방", title: "화학사고 예방관리계획",
    law: "화학물질관리법 제23조",
    body: "유해화학물질 취급시설의 안전성을 확보하고, 사고가 나더라도 피해를 최소화할 수 있도록 비상대응체계를 구축·운영하게 하는 제도입니다.",
    facts: ["'21. 4. 1. 시행", "1군 · 2군 유해화학물질 취급 사업장", "장외영향평가 · 위해관리계획 통합"],
    href: sub(116),
  },
  {
    id: "w-facility", s: "facility", tag: "취급시설", title: "화학물질취급 안전관리",
    law: "취급시설의 설치 및 관리에 관한 기준",
    body: "취급시설을 현장 방문해 안전조치를 기술적으로 검토하고, 설치·정기검사를 기술적으로 지원해 사고 위험을 미리 막습니다.",
    facts: ["설치 · 정기검사 기술지원", "시설 유형별 5개 고시", "사고대비물질 지정 안내"],
    href: sub(89),
  },
  {
    id: "w-emission", s: "emission", tag: "배출량 · 통계", title: "화학물질 배출량 · 통계",
    law: "화학물질관리법 제11조",
    body: "사업장이 대기·수계·토양으로 배출하는 화학물질의 양을 스스로 파악하고 줄이도록 하며, 조사 결과를 국민에게 공개합니다.",
    facts: ["매년 4월 30일까지 조사표 제출", "배출저감제도", "통계조사 · 정보공개"],
    href: sub(91),
  },
  {
    id: "w-respond", s: "respond", tag: "사고대응", title: "화학사고대응",
    law: `24시간 화학사고종합상황실 ${"043-830-4120~4"}`,
    body: "화학사고종합상황실을 24시간 365일 운영합니다. 119나 유역(지방)환경청에 신고된 사고는 즉시 자동 전파되고, 피해범위 예측과 방제정보를 유관기관에 제공합니다.",
    facts: ["신고 즉시 자동 전파", "사고 피해범위 예측", "사고상황공유앱(CARIS)"],
    href: sub(14),
  },
  {
    id: "w-investigate", s: "investigate", tag: "사고조사", title: "화학사고조사",
    law: "원인팀 · 영향팀 · 분석팀",
    body: "화학사고·테러 현장을 조사·분석하고 과학적 기법으로 원인을 규명해, 반복사고를 줄이고 재발방지대책을 마련합니다.",
    facts: ["과학적 원인 조사", "주변지역 사후영향 조사", "유해화학물질 정밀분석"],
    href: sub(107),
  },
  {
    id: "w-edu", s: "edu", tag: "교육훈련", title: "안전교육",
    law: "화학물질관리법에 따른 법정교육",
    body: "화학사고 예방부터 현장 대응까지, 이론·실습·XR 실감형 교육으로 화학안전 전문인력을 양성하고 안전문화를 넓힙니다.",
    facts: ["전문 · 법정 · 특별교육", "XR 실감형 · 훈련장 실습", "화학안전 키움의 날"],
    href: sub(28),
  },
];

export const vision = {
  title: "국민이 신뢰하는 화학안전 선도기관",
  values: ["전문성", "현장성", "소통 협력"],
};

export const responseFlow = [
  { title: "사고발생", icon: "alert", body: "최초 발견자가 119 등 유관기관에 신고하고, 현장 근무자가 응급조치와 상황보고를 합니다." },
  { title: "초동조치", icon: "radar", body: "화학물질안전원이 사고를 전파하고 피해범위를 예측해 사고물질 방제정보를 제공합니다." },
  { title: "현장대응", icon: "shield", body: "긴급구조와 주민보호, 접근 통제, 오염확산 방지와 방제활동을 유관기관이 함께합니다." },
  { title: "사후관리", icon: "search", body: "오염물품을 수거·폐기하고, 사후 영향을 조사해 지역을 복구합니다." },
];

export const responseLinks: Link[] = [
  { label: "화학사고 신고안내", href: sub(12) },
  { label: "도난물질 신고안내", href: sub(13) },
  { label: "화학사고 대응 정보시스템", href: sub(15) },
  { label: "각종 행동요령", href: sub(16) },
];

export type Post = { title: string; date: string; href: string; cat?: string };
export type Board = { label: string; more: string; posts: Post[] };

export const boards: Board[] = [
  {
    label: "공지사항",
    more: sub(73),
    posts: [
      { cat: "일반", title: "제8회 대한민국 동물복지대상 공모(10월1일~11월8일)", date: "2026.10.19", href: view(73, 1566) },
      { cat: "일반", title: "「제15기 화학물질 불법유통 온라인 감시단 공개 모집(2차)」", date: "2026.09.01", href: view(73, 1550) },
      { cat: "일반", title: "화학물질안전원장 표창 추천후보자 공개검증", date: "2026.07.06", href: view(73, 1520) },
      { cat: "일반", title: "화학물질안전원 교육시스템 서비스 중단 안내['26.6.5(금)18:00~8(월)09:00]", date: "2026.06.05", href: view(73, 1515) },
      { cat: "일반", title: "제18회 하늘사랑 그림공모전", date: "2026.06.01", href: view(73, 1514) },
    ],
  },
  {
    label: "보도자료",
    more: sub(33),
    posts: [
      { title: "화학사고 발생 시 ‘주민대피·수습복구’ 최우선… 지방정부 대응역량 높인다", date: "2026.10.14", href: view(33, 175) },
      { title: "유해화학물질 물류창고 화재 시 수질오염 복합사고 막는다… 비상대응정보집 발간", date: "2026.09.30", href: view(33, 174) },
      { title: "육상에서 바다까지, 대산산단 화학사고 민관이 함께 막는다", date: "2026.09.15", href: view(33, 173) },
      { title: "주민과 함께 만드는 지역 화학안전… 시민학교 경남권·수도권 확대", date: "2026.07.30", href: view(33, 172) },
      { title: "화학물질안전원, 대형 화재사고 대비 비상대응체계 강화한다", date: "2026.07.16", href: view(33, 171) },
    ],
  },
  {
    label: "채용공고",
    more: sub(76),
    posts: [
      { title: "화학물질안전원 공무직근로자(사무원) 면접시험 합격자 공고", date: "2026.10.29", href: view(33, 1569) },
      { title: "화학물질안전원 공무직근로자(운전원) 면접시험 합격자 공고", date: "2026.10.23", href: view(33, 1568) },
      { title: "화학물질안전원 공무직근로자(사무원) 서류전형 합격자 및 면접시험 공고", date: "2026.10.20", href: view(33, 1567) },
      { title: "화학물질안전원 공무직근로자(운전원) 서류전형 합격자 및 면접시험 공고", date: "2026.10.16", href: view(33, 1565) },
      { title: "화학물질안전원 공무직근로자(사무원) 채용 공고", date: "2026.10.02", href: view(33, 1559) },
    ],
  },
  {
    label: "입찰공고",
    more: sub(75),
    posts: [
      { title: "금수성물질의 물 반응 생성 유해화학물질 관리방안 연구 재공고", date: "2026.08.21", href: view(33, 1547) },
      { title: "금수성물질의 물 반응 생성 유해화학물질 관리방안 연구 입찰공고", date: "2026.08.10", href: view(33, 1540) },
      { title: "(정정)화학물질등록평가팀 연구재료 (소모품 104종) 입찰 공고", date: "2026.08.07", href: view(33, 1538) },
      { title: "「금속류 유해화학물질 취급현황 및 관리 방향성 연구」입찰공고", date: "2026.07.15", href: view(33, 1523) },
      { title: "「기술표준 간 취급시설 기준 정합성 연구」 입찰공고(재공고)", date: "2026.05.19", href: view(33, 1510) },
    ],
  },
];

export type Media = { title: string; date: string; img: string; href: string };

export const media: { label: string; more: string; items: Media[] }[] = [
  {
    label: "카드뉴스",
    more: sub(80),
    items: [
      { title: "[화학안전레터 NICS-SL-16] 플랜지 누출사고, 안전조치 후 보수", date: "2026.10.23", img: "card-1.jpg", href: view(80, 150111, 14) },
      { title: "[카드뉴스] 화학안전 정책 국민모니터단 3기 간담회 진행", date: "2026.09.02", img: "card-2.jpg", href: view(80, 150110, 14) },
      { title: "[화학안전레터 NICS-SL-14] 인화성물질 소분·회수작업 시 준수사항", date: "2025.12.17", img: "card-3.jpg", href: view(80, 150108, 14) },
      { title: "[화학안전레터 NICS-SL-13] 암모니아 누출 방지를 위한 밸브 조작 및 점검방법", date: "2025.11.14", img: "card-4.jpg", href: view(80, 150106, 14) },
    ],
  },
  {
    label: "홍보영상",
    more: sub(79),
    items: [
      { title: "유해화학물질등 온라인 판매자를 위한 법령 준수 안내 영상", date: "2026.07.20", img: "video-1.jpg", href: view(79, 150109, 14) },
      { title: "화학물질안전원 10주년 기념 다큐 - 안전한 화학물질은 없다", date: "2025.02.13", img: "video-2.jpg", href: view(79, 150098, 14) },
      { title: "제4회 화학사고예방관리계획 이행우수사례 공유대회 - 대호특수강", date: "2024.12.30", img: "video-3.jpg", href: view(79, 150097, 14) },
      { title: "제4회 화학사고예방관리계획 이행우수사례 공유대회 - GS동해전력", date: "2024.12.30", img: "video-4.jpg", href: view(79, 150096, 14) },
    ],
  },
];

export const systems = [
  { title: "화학물질 정보처리시스템", desc: "화평법에 따른 화학물질 등록 업무와 유독물질 등 화학물질 목록정보를 제공합니다.", href: "https://kreach.mcee.go.kr", icon: "sys-1.svg" },
  { title: "화학제품 관리시스템", desc: "생활화학제품 및 살생물물질·제품 승인 관련 정보와 업무를 안내합니다.", href: "https://chemp.mcee.go.kr", icon: "sys-2.svg" },
  { title: "교육 시스템", desc: "화학물질에 대한 다양한 주제의 온라인 교육과 집합교육 정보를 제공합니다.", href: `${EDU}/academy/main/main.do`, icon: "sys-3.svg" },
  { title: "화학물질 종합정보시스템", desc: "화관법에 따른 사고현황, 주민고지, 화학안전정보 등을 제공합니다.", href: "https://icis.mcee.go.kr", icon: "sys-4.svg" },
  { title: "화관법 민원24", desc: "화학물질관리법 각종 민원 처리와 정보를 제공합니다.", href: "https://icis.mcee.go.kr/cdms/", icon: "sys-5.svg" },
  { title: "화학물질 배출량 보고", desc: "배출량 조사제도에 따라 기업체가 배출량을 보고하는 사이트입니다.", href: "https://icis.mcee.go.kr/prtr/tri/main.do", icon: "sys-6.svg" },
  { title: "통계조사보고 서비스", desc: "통계조사와 실적보고 제도에 따라 기업체가 자료를 제출하는 사이트입니다.", href: "https://icis.mcee.go.kr/cdms/", icon: "sys-7.svg" },
  { title: "화학물질 종합검색", desc: "화학물질 정보를 검색할 수 있습니다.", href: "https://kreach.mcee.go.kr/repwrt/mttr/kr/mttrList.do?searchKeyword=", icon: "sys-8.svg" },
];

export const shortcuts: Link[] = [
  { label: "화학사고예방관리계획서 자료", href: sub(124) },
  { label: "CARIS / 사고상황공유앱", href: sub(15) },
  { label: "배출량 통계자료", href: sub(27) },
  { label: "화학물질 온라인 감시단", href: "https://icis.mcee.go.kr/ccst" },
  { label: "개인보호장구 3D 플랫폼", href: `${EDU}/krpano/` },
  { label: "화학안전 키움의 날", href: `${EDU}/kiwoom-day/schdl?menu=33` },
  { label: "법령정보", href: sub(36) },
  { label: "찾아오시는 길", href: sub(50) },
];

export const sns = [
  { label: "유튜브", href: "https://www.youtube.com/channel/UCHQy7pb7CikOEeHDRIoByPg", icon: "sns-youtube.png" },
  { label: "인스타그램", href: "https://www.instagram.com/moe_nics/", icon: "sns-instagram.png" },
  { label: "페이스북", href: "https://www.facebook.com/moe.nics", icon: "sns-facebook.png" },
  { label: "X", href: "http://x.com/nics7030", icon: "sns-x.png" },
  { label: "네이버 블로그", href: "https://blog.naver.com/moe_nics", icon: "sns-blog.png" },
];

export const footerLinks: (Link & { em?: boolean })[] = [
  { label: "홈페이지 이용안내", href: sub(53) },
  { label: "개인정보처리방침", href: sub(60), em: true },
  { label: "저작권정책", href: sub(55) },
  { label: "웹접근성정책", href: sub(56) },
  { label: "영상정보처리기기 운영관리 방침", href: sub(62), em: true },
];

export const relatedSites: Link[] = [
  { label: "기후에너지환경부", href: "https://www.mcee.go.kr" },
  { label: "기상청", href: "https://www.kma.go.kr" },
  { label: "국립환경과학원", href: "https://www.nier.go.kr" },
  { label: "국립생물자원관", href: "https://www.nibr.go.kr" },
  { label: "온실가스종합정보센터", href: "https://www.gir.go.kr" },
  { label: "한강유역환경청", href: "https://www.mcee.go.kr/hg" },
  { label: "낙동강유역환경청", href: "https://www.mcee.go.kr/ndg" },
  { label: "금강유역환경청", href: "https://www.mcee.go.kr/gg" },
  { label: "영산강유역환경청", href: "https://www.mcee.go.kr/ysg" },
  { label: "수도권대기환경청", href: "https://www.mcee.go.kr/mamo" },
  { label: "한국환경공단", href: "https://www.keco.or.kr" },
  { label: "한국화학물질관리협회", href: "http://www.kcma.or.kr" },
];

export const footer = {
  hq: { label: "본원", addr: "[28164] 충청북도 청주시 흥덕구 오송읍 오송생명11로 270" },
  branch: { label: "분원", addr: "[22689] 인천광역시 서구 환경로 42" },
  tel: "043-830-4000",
  copyright: "Copyrights National Institute of Chemical Safety. All Rights Reserved.",
};
