/* 화학물질안전원 앱 — 서비스 워커 (오프라인 실행·빠른 재방문)
 * 페이지(index.html)는 네트워크 우선: 새 배포가 바로 보이고, 오프라인이면 저장본을 씁니다.
 * 이미지·폰트·CSS·JS는 저장본 우선 + 뒤에서 갱신(stale-while-revalidate).
 * 경로는 모두 이 파일 위치 기준(./)이라 Vercel 루트와 GitHub Pages 하위 경로 모두에서 동작합니다.
 * BUILD 값은 scripts/export-html.mjs가 내보낼 때마다 바꿔 넣어 예전 캐시를 비웁니다.
 */
const BUILD = "20261101094146";
const CACHE = "nics-" + BUILD;

const CORE = [
  "./",
  "./index.html",
  "./dept.html",
  "./manifest.webmanifest",
  "./assets/style.css?v=20261101094146",
  "./assets/motion.js?v=20261101094146",
  "./sites/nics/logo-dark.png",
  "./sites/nics/logo-white.png",
  "./sites/nics/kv-plant.jpg",
  "./sites/nics/icons/icon-192.png",
  "./sites/nics/fonts/Pretendard-Medium.woff",
  "./sites/nics/fonts/Pretendard-SemiBold.woff",
  "./sites/nics/fonts/Pretendard-Bold.woff",
  "./sites/nics/fonts/Pretendard-ExtraBold.woff",
  "./sites/nics/fonts/SUIT-Variable.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("nics-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 외부 사이트 링크·이미지는 건드리지 않음

  if (req.mode === "navigate") {
    // Each page is stored under its own address (without ?query / #hash);
    // offline, fall back to that page, then to the main page.
    const key = url.origin + url.pathname;
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(key, copy));
          }
          return res;
        })
        .catch(() => caches.match(key).then((hit) => hit || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((hit) => {
        const net = fetch(req)
          .then((res) => {
            if (res.ok) c.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || net;
      }),
    ),
  );
});
