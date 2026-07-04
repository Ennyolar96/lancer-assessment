import { ChevronDown } from "lucide-react";

const yLabels = [180, 160, 140, 120, 100, 80, 60];
const monthOrder = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const chart = {
  minValue: 60,
  maxValue: 180,
  left: 50,
  right: 450,
  top: 26,
  bottom: 182,
};

const formatMonth = ({ month, year }) => `${month.slice(0, 3)}. ${year}`;

const getTime = ({ month, year }) =>
  year * 12 + monthOrder[month.toLowerCase()];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getY = (value) => {
  const clampedValue = clamp(value, chart.minValue, chart.maxValue);
  const chartHeight = chart.bottom - chart.top;
  const valueRange = chart.maxValue - chart.minValue;

  return (
    chart.top + ((chart.maxValue - clampedValue) / valueRange) * chartHeight
  );
};

const getPoints = (entries, getValue) => {
  const xStep =
    entries.length > 1 ? (chart.right - chart.left) / (entries.length - 1) : 0;

  return entries.map((entry, index) => [
    entries.length > 1
      ? chart.left + index * xStep
      : (chart.left + chart.right) / 2,
    getY(getValue(entry)),
  ]);
};

const getSmoothPath = (points) => {
  if (points.length === 0) return "";
  if (points.length === 1) return `M${points[0][0]} ${points[0][1]}`;

  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point[0]} ${point[1]}`;

    const previous = points[index - 1];
    const controlX = previous[0] + (point[0] - previous[0]) / 2;

    return `${path} C${controlX} ${previous[1]} ${controlX} ${point[1]} ${point[0]} ${point[1]}`;
  }, "");
};

const TrendIcon = ({ level }) => {
  const isLower = level.toLowerCase().includes("lower");

  return (
    <span
      className={`h-0 w-0 border-x-[5px] border-x-transparent ${
        isLower
          ? "border-t-[7px] border-t-[#072635]"
          : "border-b-[7px] border-b-[#072635]"
      }`}
    />
  );
};

export const DiagnosisChart = ({ data }) => {
  const chartEntries = [...data]
    .sort((a, b) => getTime(a) - getTime(b))
    .slice(-6);
  const latestEntry = chartEntries.at(-1);
  const systolicPoints = getPoints(
    chartEntries,
    (entry) => entry.blood_pressure.systolic.value,
  );
  const diastolicPoints = getPoints(
    chartEntries,
    (entry) => entry.blood_pressure.diastolic.value,
  );
  const systolicPath = getSmoothPath(systolicPoints);
  const diastolicPath = getSmoothPath(diastolicPoints);

  if (!latestEntry) {
    return (
      <section className="rounded-2xl bg-[#F4F0FE] p-4 text-[#072635]">
        <h3 className="text-base font-bold">Blood Pressure</h3>
        <p className="mt-3 text-sm font-semibold text-[#707070]">
          No diagnosis history available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-[#F4F0FE] p-4 text-[#072635] lg:h-[298px]">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_150px]">
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold">Blood Pressure</h3>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-semibold text-[#072635] hover:bg-white/60"
            >
              Last 6 months
              <ChevronDown size={14} />
            </button>
          </div>

          <div
            className="overflow-x-auto"
            style={{ scrollbarGutter: "stable", scrollbarWidth: "thin" }}
          >
            <svg
              className="h-[230px] min-w-[520px]"
              viewBox="0 0 520 230"
              role="img"
              aria-label="Blood pressure chart for the last six months"
            >
              {yLabels.map((label) => {
                const y = getY(label);

                return (
                  <g key={label}>
                    <text
                      x="4"
                      y={y + 4}
                      fill="#707070"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {label}
                    </text>
                    <line
                      x1="48"
                      x2="475"
                      y1={y}
                      y2={y}
                      stroke="#D8D2E8"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

              <path
                d={systolicPath}
                fill="none"
                stroke="#E66FD2"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d={diastolicPath}
                fill="none"
                stroke="#8C6FE6"
                strokeLinecap="round"
                strokeWidth="3"
              />

              {systolicPoints.map(([x, y], index) => (
                <circle
                  key={`systolic-${chartEntries[index].month}-${chartEntries[index].year}`}
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#E66FD2"
                  stroke="#F4F0FE"
                  strokeWidth="2"
                />
              ))}
              {diastolicPoints.map(([x, y], index) => (
                <circle
                  key={`diastolic-${chartEntries[index].month}-${chartEntries[index].year}`}
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#8C6FE6"
                  stroke="#F4F0FE"
                  strokeWidth="2"
                />
              ))}

              {chartEntries.map((entry, index) => (
                <text
                  key={`${entry.month}-${entry.year}`}
                  x={systolicPoints[index][0]}
                  y="214"
                  fill="#707070"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {formatMonth(entry)}
                </text>
              ))}
            </svg>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:block lg:space-y-4">
          <div className="border-b border-[#D8D2E8] pb-4 sm:border-b-0 sm:border-r sm:pr-4 lg:border-b lg:border-r-0 lg:pr-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E66FD2]" />
              <span className="text-sm font-bold">Systolic</span>
            </div>
            <p className="text-2xl font-extrabold">
              {latestEntry.blood_pressure.systolic.value}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#707070]">
              <TrendIcon level={latestEntry.blood_pressure.systolic.levels} />
              <span>{latestEntry.blood_pressure.systolic.levels}</span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#8C6FE6]" />
              <span className="text-sm font-bold">Diastolic</span>
            </div>
            <p className="text-2xl font-extrabold">
              {latestEntry.blood_pressure.diastolic.value}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#707070]">
              <TrendIcon level={latestEntry.blood_pressure.diastolic.levels} />
              <span>{latestEntry.blood_pressure.diastolic.levels}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
