import React from "react";
import { Province } from "../data/provincesData";

interface HoverTooltipProps {
  province: Province | null;
  position: { x: number; y: number } | null;
  isStamped: boolean;
}

export const HoverTooltip: React.FC<HoverTooltipProps> = ({
  province,
  position,
  isStamped,
}) => {
  if (!province || !position) return null;

  const left = Math.min(window.innerWidth - 260, position.x + 16);
  const top = Math.max(16, position.y - 20);

  return (
    <div
      className="fixed pointer-events-none z-50 bg-[#071326]/95 border border-cyan-400/60 px-3.5 py-2.5 rounded-xl shadow-2xl transition-opacity duration-150"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full inline-block border border-white"
          style={{ backgroundColor: province.color }}
        ></span>
        <span className="font-bold text-sm text-white tracking-wide">
          {province.stt}. {province.name}
        </span>
        {isStamped && (
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-1.5 py-0.5 rounded">
            <i className="fa-solid fa-stamp mr-1"></i>Đã đóng dấu
          </span>
        )}
      </div>
      <div className="text-[11px] text-cyan-200/90 mt-0.5">{province.mergedFrom}</div>
      <div className="text-[11px] text-amber-300/90 mt-0.5 font-medium">
        Tâm điểm: {province.hubs.map((h) => h.name).join(" • ")}
      </div>
    </div>
  );
};
