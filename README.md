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

## 폴더 구성

```
화학물질안전원/
  index.html      ← 페이지 (더블클릭하면 열림, GitHub Pages가 이 파일을 보여줌)
  assets/         ← style.css(디자인), motion.js(모션·동작)
  sites/nics/     ← 이미지·폰트
  .nojekyll       ← GitHub Pages가 파일을 그대로 쓰도록 하는 빈 파일
  source/         ← 원본 프로젝트(Next.js). 내용 수정 후 위 파일들을 다시 만들 때 사용
```

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
