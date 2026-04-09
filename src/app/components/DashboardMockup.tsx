import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const baseSensorData = [
  { id: "t0", time: "00:00", vibration: 45, temperature: 72 },
  { id: "t1", time: "04:00", vibration: 48, temperature: 75 },
  { id: "t2", time: "08:00", vibration: 52, temperature: 78 },
  { id: "t3", time: "12:00", vibration: 58, temperature: 82 },
  { id: "t4", time: "16:00", vibration: 62, temperature: 85 },
  { id: "t5", time: "20:00", vibration: 55, temperature: 80 },
  { id: "t6", time: "24:00", vibration: 50, temperature: 76 },
];

const machines = [
  { id: "M-001", name: "CNC Machine A", status: "healthy", score: 98 },
  { id: "M-002", name: "Compressor B", status: "warning", score: 72 },
  { id: "M-003", name: "Conveyor C", status: "healthy", score: 95 },
  { id: "M-004", name: "Pump D", status: "critical", score: 45 },
];

export function DashboardMockup() {
  // Live data simulation: jitter sensor values every 2s
  const [sensorData, setSensorData] = useState(baseSensorData);
  const [alertPulse, setAlertPulse] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setSensorData((prev) =>
        prev.map((d) => ({
          ...d,
          vibration: d.vibration + Math.round((Math.random() - 0.5) * 4),
          temperature: d.temperature + Math.round((Math.random() - 0.5) * 3),
        }))
      );
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  // Pulse alerts periodically
  useEffect(() => {
    const iv = setInterval(() => {
      setAlertPulse(true);
      setTimeout(() => setAlertPulse(false), 800);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const [hoveredMachine, setHoveredMachine] = useState<string | null>(null);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div>
          <h3 className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
            Machine Overview
          </h3>
          <p className="text-[10px] text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>Real-time dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Live</span>
        </div>
      </div>

      {/* Machine cards with hover */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {machines.map((m) => (
          <motion.div
            key={m.id}
            className="border border-gray-200 p-3 cursor-default"
            whileHover={{ borderColor: "#f97316", y: -2 }}
            style={{ borderColor: "#e5e7eb" }}
            onHoverStart={() => setHoveredMachine(m.id)}
            onHoverEnd={() => setHoveredMachine(null)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] text-gray-400">{m.id}</p>
                <p className="text-xs text-black" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{m.name}</p>
              </div>
              {m.status === "healthy" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {m.status === "warning" && <AlertTriangle className="w-4 h-4 text-orange-500" />}
              {m.status === "critical" && <Activity className="w-4 h-4 text-red-500" />}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 h-1.5">
                <motion.div
                  className={`h-1.5 ${m.status === "healthy" ? "bg-green-500" : m.status === "warning" ? "bg-orange-500" : "bg-red-500"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] text-gray-600">{m.score}</span>
            </div>
            <AnimatePresence>
              {hoveredMachine === m.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[9px] text-gray-400 mt-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Status: {m.status.toUpperCase()} · Health Score: {m.score}/100
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Chart with live data */}
      <div className="border border-gray-200 p-3 mb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-black" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Sensor Data — 24h</p>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <span className="text-[10px] text-gray-500">Vibration</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-[10px] text-gray-500">Temperature</span>
            </div>
          </div>
        </div>
        <SvgLineChart data={sensorData} />
      </div>

      {/* Alerts with pulse */}
      <div className="border border-gray-200 p-3">
        <p className="text-xs text-black mb-2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Recent Alerts</p>
        <div className="space-y-2">
          <motion.div
            className="flex items-center gap-3 p-2 bg-red-50"
            animate={alertPulse ? { boxShadow: "0 0 0 2px rgba(239,68,68,0.3)" } : { boxShadow: "0 0 0 0px rgba(239,68,68,0)" }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-6 h-6 bg-red-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-black" style={{ fontWeight: 500 }}>Critical: Pump D — Abnormal vibration</p>
              <p className="text-[10px] text-gray-400">2 min ago · WhatsApp sent</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-3 p-2 bg-orange-50">
            <div className="w-6 h-6 bg-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-black" style={{ fontWeight: 500 }}>Warning: Compressor B — Temp rising</p>
              <p className="text-[10px] text-gray-400">15 min ago · WhatsApp sent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG Line Chart Component
function SvgLineChart({ data }: { data: typeof baseSensorData }) {
  const width = 400;
  const height = 140;
  const padL = 30;
  const padR = 10;
  const padT = 10;
  const padB = 25;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const allValues = data.flatMap((d) => [d.vibration, d.temperature]);
  const minVal = Math.min(...allValues) - 5;
  const maxVal = Math.max(...allValues) + 5;
  const range = maxVal - minVal || 1;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minVal) / range) * chartH;

  const makePath = (key: "vibration" | "temperature") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(d[key]).toFixed(1)}`).join(" ");

  const yTicks = Array.from({ length: 5 }, (_, i) => minVal + (range * i) / 4);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 140 }}>
      {/* Grid lines */}
      {yTicks.map((v, i) => (
        <line key={`g-${i}`} x1={padL} x2={width - padR} y1={toY(v)} y2={toY(v)} stroke="#f0f0f0" strokeDasharray="3 3" />
      ))}
      {/* Y-axis labels */}
      {yTicks.map((v, i) => (
        <text key={`yl-${i}`} x={padL - 4} y={toY(v) + 3} textAnchor="end" fill="#d1d5db" fontSize={9}>
          {Math.round(v)}
        </text>
      ))}
      {/* X-axis labels */}
      {data.map((d, i) => (
        <text key={`xl-${i}`} x={toX(i)} y={height - 4} textAnchor="middle" fill="#d1d5db" fontSize={9}>
          {d.time}
        </text>
      ))}
      {/* Lines */}
      <path d={makePath("vibration")} fill="none" stroke="#000" strokeWidth={1.5} />
      <path d={makePath("temperature")} fill="none" stroke="#f97316" strokeWidth={1.5} />
    </svg>
  );
}