"use client";

type RadarSignal = {
  key: string;
  label: string;
  value: number; // 0 to 10
  fullMark?: number;
};

type RadarChartProps = {
  data: RadarSignal[];
  size?: number;
};

export function RadarChart({ data, size = 320 }: RadarChartProps) {
  const count = data.length;
  if (count < 3) return null;

  const center = size / 2;
  const radius = (size / 2) * 0.72;
  const angleStep = (Math.PI * 2) / count;
  // Rotate so top vertex points straight up
  const startAngle = -Math.PI / 2;

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  function getCoordinates(index: number, ratio: number) {
    const angle = startAngle + index * angleStep;
    const x = center + radius * ratio * Math.cos(angle);
    const y = center + radius * ratio * Math.sin(angle);
    return { x, y };
  }

  // Generate polygon points for data
  const dataPoints = data.map((item, index) => {
    const ratio = Math.max(0.2, Math.min(1.0, item.value / (item.fullMark ?? 10)));
    return getCoordinates(index, ratio);
  });

  const polygonPath = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18af99" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffd044" stopOpacity="0.25" />
          </linearGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric grid webs */}
        {levels.map(level => {
          const levelPoints = Array.from({ length: count }, (_, i) => getCoordinates(i, level))
            .map(p => `${p.x},${p.y}`)
            .join(" ");
          return (
            <polygon
              key={level}
              points={levelPoints}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={level < 1.0 ? "3 3" : "none"}
            />
          );
        })}

        {/* Axis lines from center */}
        {Array.from({ length: count }, (_, i) => {
          const end = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon filled */}
        <polygon
          points={polygonPath}
          fill="url(#radarGradient)"
          stroke="#008375"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="transition-all duration-700 ease-out"
        />

        {/* Vertex dots */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4.5"
            fill="#ffffff"
            stroke="#008375"
            strokeWidth="2.5"
            className="transition-all duration-700"
          />
        ))}

        {/* Labels positioned at vertices with slight offset */}
        {data.map((item, index) => {
          const outer = getCoordinates(index, 1.18);
          // Alignment helper
          const isLeft = outer.x < center - 15;
          const isRight = outer.x > center + 15;
          const textAnchor = isLeft ? "end" : isRight ? "start" : "middle";

          return (
            <g key={item.key} transform={`translate(${outer.x}, ${outer.y})`}>
              <text
                textAnchor={textAnchor}
                className="fill-slate-700 text-[11px] font-extrabold"
                dy="0.3em"
              >
                {item.label}
              </text>
              <text
                textAnchor={textAnchor}
                className="fill-tek-600 text-[10px] font-bold"
                dy="1.5em"
              >
                {item.value >= 8 ? "Tín hiệu mạnh" : "Đang hình thành"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
