/**
 * The meaning of the name, drawn: a load on an inclined plane, the slope made
 * of the four capability steps (Build grey, Contextualize and Enable orange,
 * Activate black). Static SVG, labelled for screen readers.
 */
export function NameDiagram() {
  const steps = [
    { label: "Build", fill: "#F1F1F2", stroke: "#A7A9AC", text: "#000" },
    { label: "Contextualize", fill: "#F47920", stroke: "#F47920", text: "#000" },
    { label: "Enable", fill: "#F47920", stroke: "#F47920", text: "#000" },
    { label: "Activate", fill: "#000", stroke: "#000", text: "#fff" },
  ];
  const W = 560;
  const H = 300;
  const baseY = 260;
  const stepW = 118;
  const x0 = 40;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="name-diagram-title name-diagram-desc" className="h-auto w-full max-w-[560px]">
      <title id="name-diagram-title">An inclined plane built from four steps</title>
      <desc id="name-diagram-desc">
        A load rests at the foot of a slope. The slope is made of four rising steps: Build, Contextualize, Enable and Activate.
      </desc>
      {/* ground */}
      <line x1="0" y1={baseY} x2={W} y2={baseY} stroke="#000" strokeWidth="2" />
      {/* steps */}
      {steps.map((s, i) => {
        const h = 46 + i * 46;
        const x = x0 + i * (stepW + 6);
        return (
          <g key={s.label}>
            <rect x={x} y={baseY - h} width={stepW} height={h} rx="6" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />
            <text
              x={x + 12}
              y={baseY - h + 22}
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="10.5"
              letterSpacing="0.08em"
              fill={s.text}
            >
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      {/* the slope: clears each step's top-left corner by 10px */}
      <line x1="0" y1="219" x2={W - 30} y2="22" stroke="#000" strokeWidth="2" strokeDasharray="5 6" />
      {/* the load, resting on the slope */}
      <g transform="translate(16 213.1) rotate(-20.4)">
        <rect x="0" y="-26" width="34" height="26" rx="3" fill="#fff" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  );
}
