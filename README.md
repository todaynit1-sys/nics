# 화학물질안전원 메인 페이지 시안

[화학물질안전원](https://nics.mcee.go.kr/main.do)의 내용을 [한국화학안전협회 소개 페이지](https://chemsafe.ondoco.workers.dev/)의 형식으로 다시 구성한 메인 페이지 시안입니다. 모션그래픽은 화학물질안전원의 업무에 맞춰 새로 만들었습니다.

> 내부 검토용 시안입니다. 기관 로고·사진·게시글은 화학물질안전원 자료이므로, 공개 저장소로 올리거나 외부에 배포하기 전에 담당 부서와 확인하세요.

## 모션그래픽

모든 장면은 하나의 아이소메트릭 지도 "화학안전 세계"(화학공장 · 마을 · 안전원 본원과 24시간 상황실 · 연구동 · 교육훈련장 · 생활화학제품 매장)에서 카메라가 움직이며 진행됩니다.

| 위치 | 내용 |
|---|---|
| 첫 화면 배경 | 분자 격자 — 원자(C·N·O)가 결합선을 잇고, 벤젠 고리가 생겼다 흩어짐 |
| 첫 화면 모션 필름 (7장면) | 일상 → 24시간 상황실(레이더) → 사고(경보·확산 예측) → 대응(방재차량 출동) → 예방(분자 조립·GHS) → 교육(훈련장) → 보호막 |
| 업무 스크롤 스토리 (8업무) | 등록평가(분자) · 살생물(미생물 제거·승인) · 예방관리계획(영향범위·대피로) · 취급시설(점검 체크) · 배출량(굴뚝·통계 막대·데이터 흐름) · 사고대응(출동) · 사고조사(돋보기·시료 추적) · 안전교육(훈련 인원) |
| 24시간 대응 | 상황실에서 퍼지는 레이더 파동 배경 + 사고발생→초동조치→현장대응→사후관리 4단계 순환 |

화면 밖에서는 멈추고, 운영체제의 "동작 줄이기" 설정을 켜면 정지 화면으로 보입니다.

## 앱으로 설치 (PWA, PC·모바일 공용)

웹 주소 하나로 PC와 휴대폰 모두에서 앱처럼 설치해 쓸 수 있습니다. 앱스토어 등록은 필요 없습니다.

| 기기 | 설치 방법 |
|---|---|
| PC (크롬·엣지) | 상단의 **앱 설치** 버튼, 또는 주소창 오른쪽 설치 아이콘 |
| 안드로이드 (크롬·삼성인터넷) | **앱 설치** 버튼 → 설치 |
| 아이폰·아이패드 (Safari) | **앱 설치** 버튼 → 안내대로 공유 → **홈 화면에 추가** |

- 설치하면 브라우저 주소창 없이 별도 창(전체 화면)으로 열리고, 아이콘을 길게 누르면 **사고 신고 · 업무 안내 · 새소식** 바로가기가 나옵니다.
- 한 번 연 뒤에는 인터넷이 없어도 열립니다(서비스 워커 `sw.js`). 새로 배포하면 다음 실행 때 자동으로 새 버전으로 바뀝니다.
- 휴대폰·태블릿(폭 900px 미만)에서는 하단 탭바(홈 · 업무 · 사고 신고 · 새소식 · 전체메뉴)가 나오고, 아이폰 노치·홈 바 영역을 피해 배치됩니다.
- 오프라인 저장은 http(s)로 열었을 때만 동작합니다. `index.html`을 더블클릭해 열면 페이지는 보이지만 설치·오프라인 기능은 꺼져 있습니다.

## 폴더 구성

```
화학물질안전원/
  index.html            ← 페이지 (더블클릭하면 열림, GitHub Pages·Vercel이 이 파일을 보여줌)
  manifest.webmanifest  ← 앱 이름·아이콘·색상 (설치 정보)
  sw.js                 ← 서비스 워커 (오프라인 실행)
  assets/               ← style.css(디자인), motion.js(모션·동작·설치)
  sites/nics/           ← 이미지·폰트·앱 아이콘(icons/)
  .nojekyll             ← GitHub Pages가 파일을 그대로 쓰도록 하는 빈 파일
  source/               ← 원본 프로젝트(Next.js). 내용 수정 후 위 파일들을 다시 만들 때 사용
```

## 배포

- **Vercel**: https://mcee-nics.vercel.app — `main` 브랜치에 올리면 자동으로 다시 배포됩니다.

## GitHub Pages로 보기

1. 이 폴더를 GitHub 저장소에 올립니다.
2. 저장소 **Settings → Pages**에서 Source를 **Deploy from a branch**, Branch를 **main / (root)**로 지정합니다.
3. 1~2분 뒤 `https://<계정>.github.io/<저장소>/`에서 열립니다.

## 내용 수정하기

- 글·링크: `source/src/components/sites/nics/data.ts`
- 지도·장면 그림: `source/src/components/sites/nics/world.tsx` (좌표 계산은 `iso.ts`)
- 디자인: `nics.css`, 장면별 효과: `nics-motion.css`
- 모션·동작: `source/public/sites/nics/motion.js`

수정한 뒤 아래 명령으로 맨 위의 `index.html`, `assets/`, `sites/`를 다시 만듭니다. (Node.js 24 이상)

```bash
cd source
npm install
npm run export:html
```

개발 서버: `cd source` 후 `npm run dev` → http://localhost:3000

## 출처

- 내용·이미지: 화학물질안전원 홈페이지 (2026-11-01 기준)
- 폰트: Pretendard, SUIT (SIL Open Font License)
- `source/`는 [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)(MIT, `source/LICENSE`)을 바탕으로 만들었습니다.
