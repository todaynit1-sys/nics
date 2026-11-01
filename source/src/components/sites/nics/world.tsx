// "화학안전 세계" — one isometric map shared by the hero film and the scroll story.
// Every scene is a state of this map: motion.js sets data-s on the <svg> and moves
// the .cam group; CSS (nics-motion.css) reveals the matching .fx layers.

import { box, camera, cyl, disc, iso, line, poly, rect, roof, type Pt } from "./iso";

export const VIEWBOX = "-540 -170 1080 830";
// Subjects sit slightly above centre: the film caption and the stage dots cover the bottom.
const VIEW = { cx: 0, cy: 205, ox: 0, oy: 0 };

// Camera presets: [translateX, translateY, scale] in viewBox units.
export const CAMS: Record<string, [number, number, number]> = {
  wide: camera(VIEW, 300, 290, 0, 0.98),
  monitor: camera(VIEW, 140, 400, 40, 1.45),
  leak: camera(VIEW, 150, 150, 30, 1.3),
  respond: camera(VIEW, 175, 290, 20, 1.12),
  plan: camera(VIEW, 290, 150, 10, 1.0),
  facility: camera(VIEW, 110, 115, 30, 1.5),
  emission: camera(VIEW, 140, 200, 70, 1.15),
  register: camera(VIEW, 110, 500, 60, 1.55),
  biocide: camera(VIEW, 520, 505, 30, 1.5),
  edu: camera(VIEW, 400, 400, 20, 1.45),
  investigate: camera(VIEW, 150, 230, 30, 1.2),
  shield: camera(VIEW, 300, 290, 20, 0.9),
};

// ---------- primitives ----------

function Box({ b, className = "" }: { b: [number, number, number, number, number, number?]; className?: string }) {
  const f = box(...b);
  return (
    <g className={className}>
      <path className="fl" d={f.left} />
      <path className="fr" d={f.right} />
      <path className="ft" d={f.top} />
      <path className="ln" pathLength={1} d={f.edge} />
    </g>
  );
}

function Tank({ x, y, r, h, className = "" }: { x: number; y: number; r: number; h: number; className?: string }) {
  const c = cyl(x, y, r, h);
  return (
    <g className={`tank ${className}`}>
      <path className="fc" d={c.side} />
      <ellipse className="ft" cx={c.top.cx} cy={c.top.cy} rx={c.top.rx} ry={c.top.ry} />
      <path className="ln" pathLength={1} d={c.side} />
      <ellipse className="ln" pathLength={1} cx={c.top.cx} cy={c.top.cy} rx={c.top.rx} ry={c.top.ry} />
      {/* level band */}
      <path
        className="ln thin"
        pathLength={1}
        d={`M${c.base.cx - c.base.rx} ${c.base.cy - h * 0.45}A${c.base.rx} ${c.base.ry} 0 0 0 ${c.base.cx + c.base.rx} ${c.base.cy - h * 0.45}`}
      />
    </g>
  );
}

function House({ x, y, i }: { x: number; y: number; i: number }) {
  const r = roof(x, y, x + 34, y + 30, 20, 13);
  return (
    <g className="house" style={{ "--i": i } as React.CSSProperties}>
      <Box b={[x, y, x + 34, y + 30, 20]} />
      <path className="fr roofb" d={r.back} />
      <path className="ft roofs" d={r.slope} />
      <path className="fr" d={r.gable} />
      <path className="ln" pathLength={1} d={r.edge} />
      <path className="win" d={rect(x + 34, y + 8, x + 34, y + 16, 0).replace(/Z$/, "")} />
    </g>
  );
}

function Windows({ x0, x1, y, z0, rows }: { x0: number; x1: number; y: number; z0: number; rows: number }) {
  const out: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let x = x0; x < x1; x += 16) {
      const z = z0 + r * 18;
      out.push(poly([iso(x, y, z), iso(x + 9, y, z), iso(x + 9, y, z + 9), iso(x, y, z + 9)]));
    }
  }
  return <path className="win" d={out.join("")} />;
}

function Person({ at, className = "", i = 0 }: { at: Pt; className?: string; i?: number }) {
  const [x, y] = at;
  return (
    <g className={`fig ${className}`} style={{ "--i": i } as React.CSSProperties} transform={`translate(${x} ${y})`}>
      <circle className="fg" cx="0" cy="-15" r="3.4" />
      <path className="fg" d="M-4.5 -10h9l1.5 10h-12z" />
    </g>
  );
}

function Check({ at, i }: { at: Pt; i: number }) {
  return (
    <g transform={`translate(${at[0]} ${at[1]})`}>
      <g className="chk" style={{ "--i": i } as React.CSSProperties}>
        <circle className="chkbg" r="9" />
        <path className="chkm" d="M-4 0l3 3 5-6" />
      </g>
    </g>
  );
}

// ---------- the world ----------

const plantTanks = [
  { x: 75, y: 85, r: 28, h: 46 },
  { x: 150, y: 70, r: 22, h: 38 },
  { x: 95, y: 175, r: 30, h: 52, leak: true },
];

const houses: [number, number][] = [
  [340, 40], [405, 45], [470, 55], [335, 115], [410, 125], [490, 130], [355, 195], [440, 200],
];

const trainees: Pt[] = [
  iso(350, 400), iso(370, 400), iso(390, 400), iso(350, 425), iso(370, 425), iso(390, 425), iso(360, 450), iso(380, 450),
];

const bottles = [495, 512, 529, 546, 563];

export function World({ className = "" }: { className?: string }) {
  const leak = plantTanks[2];
  const leakBase = disc(leak.x, leak.y, 1);
  const leakTop = iso(leak.x, leak.y, leak.h);
  const stackTop = iso(40, 240, 140);
  const hqRoof = iso(115, 390, 62);
  const labTop = iso(105, 510, 120);
  const storeFront = iso(530, 565, 0);
  const truckA = iso(70, 290, 0);
  const truckB = iso(225, 290, 0);
  const magnifierPath = [iso(60, 60, 60), iso(200, 120, 60), iso(100, 200, 60)];

  return (
    <svg
      className={`world ${className}`}
      viewBox={VIEWBOX}
      data-cams={JSON.stringify(CAMS)}
      data-s="wide"
      aria-hidden="true"
      focusable="false"
    >
      <g className="cam">
        {/* ground */}
        <path className="lot" d={rect(0, 0, 600, 600)} />
        <path
          className="grid"
          d={Array.from({ length: 11 }, (_, i) => i * 60)
            .map((v) => line([[v, 0], [v, 600]]) + line([[0, v], [600, v]]))
            .join("")}
        />
        <path className="road" d={rect(0, 275, 600, 305) + rect(275, 0, 305, 600)} />
        <path className="roadline" d={line([[0, 290], [600, 290]]) + line([[290, 0], [290, 600]])} />

        {/* zone pads */}
        <path className="pad" d={rect(20, 20, 262, 262)} />
        <path className="pad" d={rect(318, 20, 580, 262)} />
        <path className="pad" d={rect(20, 318, 262, 580)} />
        <path className="pad" d={rect(318, 318, 580, 580)} />

        {/* FX under the buildings */}
        <g className="fx fx-disperse">
          {[70, 120, 175].map((r, i) => {
            const d = disc(leak.x + 30, leak.y - 10, r);
            return <ellipse key={r} className="disp" style={{ "--i": i } as React.CSSProperties} cx={d.cx} cy={d.cy} rx={d.rx} ry={d.ry} />;
          })}
        </g>
        <g className="fx fx-plan">
          <path className="plotedge" d={rect(28, 28, 254, 254)} />
          <path className="bpgrid" d={[60, 100, 140, 180, 220].map((v) => line([[v, 28], [v, 254]]) + line([[28, v], [254, v]])).join("")} />
          {[150, 230].map((r, i) => {
            const d = disc(leak.x, leak.y, r);
            return <ellipse key={r} className="impact" style={{ "--i": i } as React.CSSProperties} cx={d.cx} cy={d.cy} rx={d.rx} ry={d.ry} />;
          })}
          <path className="evac" pathLength={1} d={line([[420, 160], [420, 290], [440, 360], [450, 420]])} />
          <path className="evachead" d={`M${iso(450, 420)[0]} ${iso(450, 420)[1]}l-7 -9h14z`} />
        </g>
        <g className="fx fx-dike">
          <path className="dikeon" d={rect(42, 52, 110, 120) + rect(122, 44, 180, 98) + rect(58, 140, 132, 212)} />
        </g>
        <g className="fx fx-edu">
          <path className="plotedge" d={rect(330, 335, 470, 470)} />
        </g>

        {/* ---------- plant ---------- */}
        <g className="zone plant">
          <path className="dike" d={rect(42, 52, 110, 120) + rect(122, 44, 180, 98) + rect(58, 140, 132, 212)} />
          <Tank {...plantTanks[1]} />
          <Tank x={215} y={55} r={10} h={120} className="col" />
          <Tank x={242} y={95} r={8} h={98} className="col" />
          <Tank {...plantTanks[0]} />
          <path className="pipe" d={line([[75, 85, 22], [75, 130, 22], [160, 130, 22], [160, 150, 22]]) + line([[150, 70, 18], [215, 70, 18], [215, 55, 18]])} />
          <path className="flow" d={line([[75, 85, 22], [75, 130, 22], [160, 130, 22], [160, 150, 22]]) + line([[150, 70, 18], [215, 70, 18], [215, 55, 18]])} />
          <Box b={[160, 145, 245, 230, 44]} className="bldg" />
          <Windows x0={166} x1={240} y={230} z0={14} rows={2} />
          <Tank {...leak} className="tank-leak" />
          <path className="pipe" d={line([[95, 175, 26], [130, 175, 26], [130, 190, 26], [160, 190, 26]])} />
          <path className="flow" d={line([[95, 175, 26], [130, 175, 26], [130, 190, 26], [160, 190, 26]])} />
          <Tank x={40} y={240} r={9} h={140} className="stack" />
        </g>

        {/* ---------- village ---------- */}
        <g className="zone village">
          {houses.map(([x, y], i) => (
            <House key={`${x}-${y}`} x={x} y={y} i={i} />
          ))}
        </g>

        {/* ---------- NICS HQ + 24h situation room ---------- */}
        <g className="zone hq">
          <Box b={[50, 335, 180, 445, 62]} className="bldg hqb" />
          <Windows x0={56} x1={176} y={445} z0={12} rows={3} />
          <Box b={[188, 350, 252, 412, 30]} className="bldg annex" />
          <g className="screens">
            {[0, 1, 2].map((i) => {
              const x = 194 + i * 19;
              return (
                <path
                  key={i}
                  className="screen"
                  style={{ "--i": i } as React.CSSProperties}
                  d={poly([iso(x, 412, 9), iso(x + 14, 412, 9), iso(x + 14, 412, 21), iso(x, 412, 21)])}
                />
              );
            })}
          </g>
          {/* rooftop radar */}
          <g transform={`translate(${hqRoof[0]} ${hqRoof[1]})`}>
            <ellipse className="ln" pathLength={1} rx="26" ry="15" />
            <ellipse className="ln thin" pathLength={1} rx="14" ry="8" />
            <g className="fx fx-radar">
              <g transform="scale(1 0.58)">
                <g className="sweep">
                  <path className="sweepf" d="M0 0L45 0A45 45 0 0 0 31.8 -31.8Z" />
                </g>
              </g>
            </g>
            <path className="ln" pathLength={1} d="M0 0V-26" />
            <circle className="beacon" cy="-28" r="3" />
          </g>
        </g>

        {/* ---------- lab (registration & evaluation) ---------- */}
        <g className="zone lab">
          <Box b={[60, 470, 150, 552, 36]} className="bldg" />
          <Windows x0={66} x1={146} y={552} z0={12} rows={1} />
          <Tank x={170} y={500} r={9} h={30} className="vial" />
        </g>

        {/* ---------- training ground ---------- */}
        <g className="zone training">
          <path className="field" d={rect(330, 335, 470, 470)} />
          <Tank x={430} y={372} r={16} h={28} />
          <g className="fx fx-edu">
            {trainees.map((p, i) => (
              <Person key={i} at={p} i={i} />
            ))}
            <Person at={iso(440, 420)} className="lead" i={9} />
            <path className="spray" d={`M${iso(440, 412, 14)[0]} ${iso(440, 412, 14)[1]}Q${iso(436, 392, 40)[0]} ${iso(436, 392, 40)[1]} ${iso(432, 378, 26)[0]} ${iso(432, 378, 26)[1]}`} />
          </g>
        </g>

        {/* ---------- household chemical products store ---------- */}
        <g className="zone store">
          <Box b={[490, 470, 572, 548, 30]} className="bldg" />
          <path className="awning" d={poly([iso(490, 548, 30), iso(572, 548, 30), iso(572, 560, 22), iso(490, 560, 22)])} />
          {bottles.map((x, i) => (
            <Tank key={x} x={x} y={572} r={5} h={14 + (i % 2) * 5} className="bottle" />
          ))}
        </g>

        {/* ---------- response vehicle ---------- */}
        <g
          className="truck"
          style={{ "--ax": `${truckA[0]}px`, "--ay": `${truckA[1]}px`, "--bx": `${truckB[0]}px`, "--by": `${truckB[1]}px` } as React.CSSProperties}
        >
          <Box b={[-16, -8, 6, 8, 13]} className="truckb" />
          <Box b={[6, -7, 17, 7, 10]} className="truckc" />
          <circle className="siren" cx={iso(-5, 0, 16)[0]} cy={iso(-5, 0, 16)[1]} r="3" />
        </g>

        {/* ---------- FX above everything ---------- */}

        {/* 24h monitoring: signals from the plant to the HQ */}
        <g className="fx fx-signal">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              className="sig"
              style={{ "--i": i } as React.CSSProperties}
              d={`M${leakTop[0]} ${leakTop[1]}Q${iso(60, 300, 160)[0]} ${iso(60, 300, 160)[1]} ${hqRoof[0]} ${hqRoof[1] - 28}`}
            />
          ))}
        </g>

        {/* leak: alarm rings and a drifting plume */}
        <g className="fx fx-alarm">
          {[0, 1, 2].map((i) => (
            <ellipse key={i} className="ring" style={{ "--i": i } as React.CSSProperties} cx={leakBase.cx} cy={leakBase.cy} rx="48" ry="27" />
          ))}
          <g transform={`translate(${leakTop[0]} ${leakTop[1] - 34})`}>
            <path className="warn" d="M0 -13L12 8H-12Z" />
            <path className="warnm" d="M0 -5V2M0 5V5.5" />
          </g>
        </g>
        <g className="fx fx-plume">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} className="puff" style={{ "--i": i } as React.CSSProperties} cx={leakTop[0]} cy={leakTop[1]} r={10 + i * 2} />
          ))}
        </g>

        {/* emissions: stack plume, statistics bars, data flow to HQ */}
        <g className="fx fx-emit">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} className="puff grey" style={{ "--i": i } as React.CSSProperties} cx={stackTop[0]} cy={stackTop[1]} r={8 + i * 2} />
          ))}
          <g transform={`translate(${iso(200, 190, 60)[0]} ${iso(200, 190, 60)[1]})`}>
            <path className="chartbase" d="M-30 0H34" />
            {[18, 30, 24, 40].map((h, i) => (
              <rect key={i} className="bar" style={{ "--i": i } as React.CSSProperties} x={-26 + i * 15} y={-h} width="10" height={h} rx="2" />
            ))}
          </g>
          <path className="data" d={`M${stackTop[0]} ${stackTop[1] + 60}Q${iso(40, 330, 120)[0]} ${iso(40, 330, 120)[1]} ${hqRoof[0]} ${hqRoof[1] - 10}`} />
        </g>

        {/* registration & evaluation: molecule assembles above the lab, GHS label */}
        <g className="fx fx-mol">
          <g transform={`translate(${labTop[0]} ${labTop[1]})`}>
            {(() => {
              const hex = Array.from({ length: 6 }, (_, k) => {
                const a = (Math.PI / 3) * k - Math.PI / 2;
                return [Math.round(Math.cos(a) * 22 * 10) / 10, Math.round(Math.sin(a) * 22 * 10) / 10] as Pt;
              });
              const outer = [hex[0], hex[2], hex[4]].map(([x, y]) => [x * 1.9, y * 1.9] as Pt);
              return (
                <>
                  <path className="bond" pathLength={1} d={poly(hex)} />
                  <path className="bond thin" pathLength={1} d={poly(hex.map(([x, y]) => [x * 0.62, y * 0.62] as Pt))} />
                  {outer.map((o, k) => (
                    <path key={k} className="bond" pathLength={1} d={`M${hex[k * 2][0]} ${hex[k * 2][1]}L${o[0]} ${o[1]}`} />
                  ))}
                  {hex.map(([x, y], k) => (
                    <circle key={k} className="atom c" style={{ "--i": k, "--dx": `${x * 2.4}px`, "--dy": `${y * 2.4}px` } as React.CSSProperties} cx={x} cy={y} r="5" />
                  ))}
                  {outer.map(([x, y], k) => (
                    <circle key={k} className={`atom ${k === 1 ? "n" : "o"}`} style={{ "--i": k + 6, "--dx": `${x * 1.8}px`, "--dy": `${y * 1.8}px` } as React.CSSProperties} cx={x} cy={y} r="6.5" />
                  ))}
                </>
              );
            })()}
          </g>
          <g transform={`translate(${iso(178, 470, 70)[0]} ${iso(178, 470, 70)[1]})`}>
            <g className="ghs">
              <rect x="-13" y="-13" width="26" height="26" transform="rotate(45)" />
              <path d="M0 -8V3M0 7V7.5" />
            </g>
          </g>
        </g>

        {/* biocides & household products: mist, microbes cleared, approval stamp */}
        <g className="fx fx-bio">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} className="mist" style={{ "--i": i } as React.CSSProperties} cx={storeFront[0] - 30 + i * 6} cy={storeFront[1] - 40} r="2.2" />
          ))}
          {[[-50, -70], [-20, -95], [15, -78], [40, -100]].map(([dx, dy], i) => (
            <g key={i} className="microbe" style={{ "--i": i } as React.CSSProperties} transform={`translate(${storeFront[0] + dx} ${storeFront[1] + dy})`}>
              <circle r="6" />
              <path d="M-9 0h-3M9 0h3M0 -9v-3M0 9v3M6.4 6.4l2 2M-6.4 -6.4l-2 -2" />
            </g>
          ))}
          <g transform={`translate(${storeFront[0] + 48} ${storeFront[1] - 62})`}>
            <g className="stamp">
              <circle r="17" />
              <circle r="13" className="thin" />
              <path d="M-7 0l5 5 9 -10" />
            </g>
          </g>
        </g>

        {/* facility safety checks */}
        <g className="fx fx-check">
          {[iso(75, 85, 66), iso(150, 70, 54), iso(95, 175, 74), iso(215, 55, 132), iso(202, 188, 62)].map((p, i) => (
            <Check key={i} at={p} i={i} />
          ))}
        </g>

        {/* accident investigation: magnifier sweeps the plant, sample trace to the lab */}
        <g className="fx fx-scan">
          <path className="trace" pathLength={1} d={`M${leakBase.cx} ${leakBase.cy}Q${iso(60, 380, 80)[0]} ${iso(60, 380, 80)[1]} ${iso(170, 500, 30)[0]} ${iso(170, 500, 30)[1]}`} />
          <g
            className="lens"
            style={{
              "--p0x": `${magnifierPath[0][0]}px`, "--p0y": `${magnifierPath[0][1]}px`,
              "--p1x": `${magnifierPath[1][0]}px`, "--p1y": `${magnifierPath[1][1]}px`,
              "--p2x": `${magnifierPath[2][0]}px`, "--p2y": `${magnifierPath[2][1]}px`,
            } as React.CSSProperties}
          >
            <circle className="lensg" r="20" />
            <circle className="lensr" r="20" />
            <path className="lensh" d="M14 14L30 30" />
          </g>
        </g>

        {/* protection dome over the whole map */}
        <g className="fx fx-dome">
          {/* Arc from the map's left corner to its right corner, over the top. */}
          <path className="dome" pathLength={1} d={`M${iso(0, 600)[0]} ${iso(0, 600)[1]}A520 400 0 0 1 ${iso(600, 0)[0]} ${iso(600, 0)[1]}`} />
          <ellipse className="domeb" cx={iso(300, 300)[0]} cy={iso(300, 300)[1]} rx="520" ry="300" />
        </g>
      </g>
    </svg>
  );
}
