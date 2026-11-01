/* 화학물질안전원 메인 — 모션그래픽과 화면 동작 (plain JS, Next 런타임 없이도 동작)
 *  1. 분자 격자 배경 (첫 화면) · 신호망 배경 (24시간 대응)
 *  2. 첫 화면 모션 필름 — 화학안전 세계 7장면
 *  3. 업무 스크롤 스토리 — 8개 업무 + 비전
 *  4. 24시간 대응 4단계 순환
 *  5. 헤더 메뉴, 새소식 탭
 */
(function () {
  "use strict";
  // In the Next app React hydrates the server HTML; touching attributes before that trips
  // its hydration check, so wait for HydrationMark (src/components/sites/nics/hydration-mark.tsx).
  // The static HTML export carries no Next payload (self.__next_f) and starts right away.
  (function whenReady() {
    var started = false;
    var start = function () { if (!started) { started = true; init(); } };
    if (!self.__next_f || document.documentElement.hasAttribute("data-hydrated")) { start(); return; }
    window.addEventListener("nics:hydrated", start);
    setTimeout(start, 8000); // never leave the page without motion
  })();

  function init() {
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var REDUCE = !!(mq && mq.matches);
  var root = document.documentElement;

  /* 헤더 높이 → sticky 기준선 */
  var hd = document.querySelector(".hd");
  var hdTop = document.querySelector(".hd__top");
  function setHd() {
    if (hd) root.style.setProperty("--hd-h", hd.offsetHeight + "px");
  }
  setHd();
  window.addEventListener("resize", setHd);

  function onVisible(el, cb) {
    if (!("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { cb(e.isIntersecting); }); }, { threshold: 0.05 }).observe(el);
  }

  function cam(svg, key) {
    if (!svg) return;
    var cams = svg._cams || (svg._cams = JSON.parse(svg.getAttribute("data-cams") || "{}"));
    var c = cams[key] || cams.wide;
    var g = svg.querySelector(".cam");
    if (g && c) g.style.transform = "translate(" + c[0] + "px," + c[1] + "px) scale(" + c[2] + ")";
  }

  /* ---------------- 1. 배경 캔버스 ---------------- */
  // mol: 원자(C·N·O)가 떠다니다 가까워지면 결합선을 잇고, 가끔 벤젠 고리(육각형)가 생겼다 흩어진다.
  // signal: 상황실 레이더처럼 퍼지는 동심원과 신호 점.
  function canvasLoop(cv, setup, frame) {
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d"), W = 0, H = 0, on = true, raf = 0, state = null;
    function resize() {
      var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state = setup(W, H);
      frame(ctx, W, H, state, 0);
    }
    var t0 = performance.now();
    function tick(ts) { frame(ctx, W, H, state, (ts - t0) / 1000); raf = requestAnimationFrame(tick); }
    resize();
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
    if (REDUCE) return;
    onVisible(cv, function (v) { on = v; cancelAnimationFrame(raf); if (v && !document.hidden) raf = requestAnimationFrame(tick); });
    document.addEventListener("visibilitychange", function () { cancelAnimationFrame(raf); if (!document.hidden && on) raf = requestAnimationFrame(tick); });
  }

  var ATOM = [
    { c: "166,232,247", r: 2.2 },  // C
    { c: "138,168,255", r: 2.6 },  // N
    { c: "255,140,118", r: 2.8 },  // O
  ];
  canvasLoop(document.querySelector('[data-net="mol"]'), function (W, H) {
    var n = Math.round(Math.min(70, Math.max(28, (W * H) / 15000))), pts = [];
    for (var i = 0; i < n; i++) {
      var k = Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 1 : 2;
      pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24, k: k });
    }
    var rings = [];
    for (var j = 0; j < 3; j++) rings.push(newRing(W, H, Math.random() * 8));
    return { pts: pts, rings: rings };
  }, function (ctx, W, H, s, t) {
    ctx.clearRect(0, 0, W, H);
    var D = Math.min(140, W / 7), D2 = D * D, pts = s.pts;
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      if (t) { a.x += a.vx; a.y += a.vy; if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20; if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20; }
      for (var j = i + 1; j < pts.length; j++) {
        var b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < D2) {
          var al = 0.18 * (1 - d2 / D2);
          ctx.strokeStyle = "rgba(143,224,242," + al.toFixed(3) + ")"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          if (d2 < D2 * 0.12) { // 가까우면 이중결합처럼
            var nx = -dy / Math.sqrt(d2 || 1) * 2.2, ny = dx / Math.sqrt(d2 || 1) * 2.2;
            ctx.beginPath(); ctx.moveTo(a.x + nx, a.y + ny); ctx.lineTo(b.x + nx, b.y + ny); ctx.stroke();
          }
        }
      }
    }
    for (var k = 0; k < pts.length; k++) {
      var p = pts[k], A = ATOM[p.k];
      ctx.fillStyle = "rgba(" + A.c + ",.75)"; ctx.beginPath(); ctx.arc(p.x, p.y, A.r, 0, 6.283); ctx.fill();
    }
    // 벤젠 고리: 생성 → 회전 → 해체
    for (var r = 0; r < s.rings.length; r++) {
      var g = s.rings[r], life = t - g.born;
      if (life > g.dur) { s.rings[r] = newRing(W, H, t + Math.random() * 3); continue; }
      if (life < 0) continue;
      var u = life / g.dur, alpha = Math.sin(Math.PI * Math.min(1, u)) * 0.5, spread = u > 0.75 ? (u - 0.75) * 4 : 0;
      ctx.save(); ctx.translate(g.x, g.y); ctx.rotate(g.rot + life * 0.25);
      ctx.strokeStyle = "rgba(133,232,186," + alpha.toFixed(3) + ")"; ctx.lineWidth = 1.2;
      var vs = [];
      for (var v = 0; v < 6; v++) { var an = Math.PI / 3 * v, rr = g.size * (1 + spread * 1.4); vs.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
      ctx.beginPath();
      for (var e = 0; e < 6; e++) { var p1 = vs[e], p2 = vs[(e + 1) % 6]; ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0] - (p2[0] - p1[0]) * spread, p2[1] - (p2[1] - p1[1]) * spread); }
      ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, g.size * 0.55, 0, 6.283 * Math.min(1, u * 2)); ctx.stroke();
      ctx.fillStyle = "rgba(166,232,247," + (alpha * 1.4).toFixed(3) + ")";
      for (var q = 0; q < 6; q++) { ctx.beginPath(); ctx.arc(vs[q][0], vs[q][1], 2.2, 0, 6.283); ctx.fill(); }
      ctx.restore();
    }
  });
  function newRing(W, H, born) {
    return { x: W * (0.08 + Math.random() * 0.84), y: H * (0.12 + Math.random() * 0.76), size: 16 + Math.random() * 16, rot: Math.random() * 6, born: born, dur: 7 + Math.random() * 4 };
  }

  canvasLoop(document.querySelector('[data-net="signal"]'), function (W, H) {
    var nodes = [];
    var n = Math.round(Math.min(40, Math.max(16, (W * H) / 30000)));
    for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, ph: Math.random() * 6 });
    return { nodes: nodes, cx: W * 0.82, cy: H * 0.18 };
  }, function (ctx, W, H, s, t) {
    ctx.clearRect(0, 0, W, H);
    // 상황실에서 퍼지는 레이더 파동
    for (var w = 0; w < 4; w++) {
      var u = ((t * 0.12 + w / 4) % 1), R = u * Math.max(W, H) * 0.9;
      ctx.strokeStyle = "rgba(133,232,186," + (0.14 * (1 - u)).toFixed(3) + ")"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(s.cx, s.cy, R, 0, 6.283); ctx.stroke();
    }
    // 노드: 파동이 지나가면 반짝이고 상황실로 신호선을 잇는다
    for (var i = 0; i < s.nodes.length; i++) {
      var p = s.nodes[i], dx = p.x - s.cx, dy = p.y - s.cy, d = Math.sqrt(dx * dx + dy * dy);
      var hit = 0;
      for (var k = 0; k < 4; k++) { var uu = ((t * 0.12 + k / 4) % 1) * Math.max(W, H) * 0.9; hit = Math.max(hit, 1 - Math.min(1, Math.abs(uu - d) / 60)); }
      ctx.fillStyle = "rgba(133,232,186," + (0.25 + hit * 0.7).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 + hit * 2.2, 0, 6.283); ctx.fill();
      if (hit > 0.6) {
        ctx.strokeStyle = "rgba(143,224,242," + ((hit - 0.6) * 0.5).toFixed(3) + ")"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(s.cx, s.cy); ctx.stroke();
      }
    }
  });

  /* ---------------- 2. 첫 화면 모션 필름 ---------------- */
  var film = document.getElementById("film");
  if (film) {
    var SC = JSON.parse(film.getAttribute("data-scenes") || "[]");
    var fsvg = film.querySelector(".world");
    var no = film.querySelector(".film__no"), tag = film.querySelector(".film__tag");
    var ft = film.querySelector(".film__t"), fd = film.querySelector(".film__d");
    var bars = [].slice.call(film.querySelectorAll(".film__ch i"));
    var btns = [].slice.call(film.querySelectorAll(".film__ch button"));
    var pp = film.querySelector(".film__pp");
    var idx = 0, el = 0, last = null, userPaused = false, inView = true;

    var words = function (node, text) {
      node.innerHTML = "";
      text.split(" ").forEach(function (w, i) {
        if (i) node.appendChild(document.createTextNode(" "));
        var o = document.createElement("span"); o.className = "w";
        var n = document.createElement("span"); n.textContent = w; n.style.animationDelay = i * 55 + "ms";
        o.appendChild(n); node.appendChild(o);
      });
    };
    var apply = function () {
      var s = SC[idx];
      film.setAttribute("data-scene", idx);
      fsvg.setAttribute("data-s", s.s);
      cam(fsvg, s.cam);
      no.textContent = ("0" + (idx + 1)).slice(-2); tag.textContent = s.tag;
      words(ft, s.title); fd.textContent = s.desc;
      fd.classList.remove("in"); void fd.offsetWidth; fd.classList.add("in");
      btns.forEach(function (b, j) { b.setAttribute("aria-current", j === idx ? "step" : "false"); });
      if (s.draw && !REDUCE) { fsvg.classList.remove("is-drawing"); void fsvg.getBoundingClientRect(); fsvg.classList.add("is-drawing"); }
    };
    var paint = function () {
      for (var j = 0; j < bars.length; j++) {
        var v = j < idx ? 1 : j > idx ? 0 : REDUCE ? 1 : Math.min(1, el / SC[idx].ms);
        bars[j].style.transform = "scaleX(" + v + ")";
      }
    };
    var go = function (i) { idx = (i + SC.length) % SC.length; el = 0; apply(); paint(); };
    var running = function () { return !REDUCE && !userPaused && inView && !document.hidden; };
    var loop = function (ts) {
      if (last === null) last = ts;
      var dt = Math.min(100, ts - last); last = ts;
      if (running()) { el += dt; if (el >= SC[idx].ms) go(idx + 1); paint(); }
      requestAnimationFrame(loop);
    };
    var idle = function () { film.classList.toggle("is-idle", !running()); };

    btns.forEach(function (b, j) { b.addEventListener("click", function () { go(j); }); });
    if (pp) {
      pp.addEventListener("click", function () {
        userPaused = !userPaused;
        pp.setAttribute("aria-pressed", userPaused ? "true" : "false");
        pp.setAttribute("aria-label", userPaused ? "모션 재생" : "모션 일시정지");
        film.classList.toggle("is-paused", userPaused); idle();
      });
    }
    onVisible(film, function (v) { inView = v; idle(); });
    document.addEventListener("visibilitychange", idle);

    if (REDUCE) { idx = SC.length - 1; apply(); paint(); if (pp) pp.hidden = true; }
    else { apply(); paint(); requestAnimationFrame(loop); }
  }

  /* ---------------- 3. 업무 스크롤 스토리 ---------------- */
  var stage = document.getElementById("stage");
  var steps = [].slice.call(document.querySelectorAll(".story__steps > .step"));
  if (stage && steps.length) {
    var ssvg = stage.querySelector(".world");
    var sno = stage.querySelector(".stage__no b"), slaw = stage.querySelector(".stage__law");
    var dots = [].slice.call(stage.querySelectorAll(".stage__dots button"));
    var wrapSt = stage.parentElement;
    var dq = window.matchMedia("(min-width: 960px)");
    var cur = -1, ticking = false, total = steps.length - 1;

    var set = function (i) {
      if (i === cur) return; cur = i;
      var st = steps[i], s = st.getAttribute("data-s");
      ssvg.setAttribute("data-s", s); cam(ssvg, s);
      sno.textContent = i < total ? ("0" + (i + 1)).slice(-2) : "—";
      slaw.textContent = st.getAttribute("data-law");
      slaw.classList.remove("in"); void slaw.offsetWidth; slaw.classList.add("in");
      steps.forEach(function (x, j) { x.classList.toggle("is-on", j === i); });
      dots.forEach(function (d, j) { d.setAttribute("aria-current", j === i ? "step" : "false"); });
    };
    var line = function () {
      var vh = window.innerHeight;
      if (dq.matches) return vh * 0.55;
      var b = (hd ? hd.offsetHeight : 62) + wrapSt.offsetHeight;
      return b + (vh - b) * 0.34;
    };
    var pick = function () {
      ticking = false;
      var L = line(), k = 0;
      for (var i = 0; i < steps.length; i++) { if (steps[i].getBoundingClientRect().top < L) k = i; }
      set(k);
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(pick); } }, { passive: true });
    window.addEventListener("resize", pick);
    dots.forEach(function (d, j) {
      d.addEventListener("click", function () {
        var r = steps[j].getBoundingClientRect();
        var y = dq.matches
          ? window.scrollY + r.top - line() + Math.min(r.height / 2, 160)
          : window.scrollY + r.top - ((hd ? hd.offsetHeight : 62) + wrapSt.offsetHeight) + 2;
        window.scrollTo({ top: y, behavior: REDUCE ? "auto" : "smooth" });
      });
    });
    onVisible(stage, function (v) { stage.classList.toggle("is-idle", !v); });
    pick();
  }

  /* ---------------- 4. 24시간 대응 4단계 순환 ---------------- */
  var flow = document.getElementById("rspflow");
  if (flow) {
    var st4 = [].slice.call(flow.querySelectorAll(".rss"));
    var rail = flow.querySelector(".rspflow__rail i");
    var ai = 0, aT = 0, aOn = false;
    var setA = function (i) {
      ai = i;
      st4.forEach(function (x, j) {
        x.classList.toggle("is-on", j === i); x.classList.toggle("is-done", j < i);
        x.querySelector(".rss__btn").setAttribute("aria-pressed", j === i ? "true" : "false");
      });
      if (rail) rail.style.transform = "scaleX(" + (i / (st4.length - 1) || 0.02) + ")";
    };
    var run = function () { clearInterval(aT); if (!REDUCE && aOn && !document.hidden) aT = setInterval(function () { setA((ai + 1) % st4.length); }, 2800); };
    st4.forEach(function (x, j) {
      x.querySelector(".rss__btn").addEventListener("click", function () { setA(j); run(); });
      x.addEventListener("mouseenter", function () { if (window.matchMedia("(hover:hover)").matches) { setA(j); run(); } });
    });
    setA(0);
    onVisible(flow, function (v) { aOn = v; run(); });
    document.addEventListener("visibilitychange", run);
  }

  /* ---------------- 5. 헤더 메뉴 · 새소식 탭 ---------------- */
  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") !== "true";
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      drawer.hidden = !open;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) { drawer.hidden = true; burger.setAttribute("aria-expanded", "false"); burger.focus(); }
    });
  }
  if (hdTop && hd) {
    window.addEventListener("scroll", function () { hd.classList.toggle("is-scrolled", window.scrollY > 8); }, { passive: true });
  }

  var tabs = [].slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  var more = document.querySelector("[data-board-more]");
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", String(on));
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
    if (more) more.href = t.getAttribute("data-more");
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { e.preventDefault(); selectTab(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });
  }
})();
