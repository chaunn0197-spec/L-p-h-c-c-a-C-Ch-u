import React from "react";
import { LabelItem } from "../three/ThreeSceneManager";

interface LabelsOverlayProps {
  labels: LabelItem[];
  showLabels: boolean;
  selectedProvinceId: string;
  challengeSelectedIds?: string[];
  onSelectProvince?: (provId: string) => void;
}

export const LabelsOverlay: React.FC<LabelsOverlayProps> = ({
  labels,
  showLabels,
  selectedProvinceId,
  challengeSelectedIds = [],
  onSelectProvince,
}) => {
  if (!showLabels) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {labels.map((item) => {
        if (!item.visible) return null;
        const isSelected = item.id === selectedProvinceId;
        const challengeStepIndex = challengeSelectedIds.indexOf(item.id);
        const isChallengeSelected = challengeStepIndex !== -1;

        if (item.isIsland) {
          return (
            <div
              key={item.id}
              onClick={() => onSelectProvince?.(item.id)}
              className={`absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2 whitespace-nowrap shadow-md transition-all duration-150 select-none ${
                item.isSovereign
                  ? "px-2.5 py-1 rounded-lg bg-red-950/95 border border-red-400 text-[11px] font-extrabold text-amber-300 shadow-xl hover:scale-105"
                  : "px-1.5 py-0.5 rounded bg-slate-900/90 border border-cyan-400/40 text-[10px] font-semibold text-cyan-200 hover:border-cyan-300"
              }`}
              style={{
                left: `${item.screenX}px`,
                top: `${item.screenY}px`,
              }}
            >
              {item.isSovereign ? (
                <>
                  <i className="fa-solid fa-star text-amber-400 mr-1"></i>
                  {item.name}
                </>
              ) : (
                `🏝️ ${item.name}`
              )}
            </div>
          );
        }

        return (
          <div
            key={item.id}
            onClick={() => onSelectProvince?.(item.id)}
            className={`absolute pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-full whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1 shadow transition-all duration-150 select-none ${
              isChallengeSelected
                ? "bg-amber-950/95 border-2 border-amber-400 scale-110 shadow-lg shadow-amber-500/40 z-30"
                : isSelected
                ? "bg-cyan-950/95 border-2 border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20 z-20"
                : "bg-slate-950/85 border border-white/20 hover:border-cyan-400 hover:scale-105"
            }`}
            style={{
              left: `${item.screenX}px`,
              top: `${item.screenY}px`,
            }}
          >
            {isChallengeSelected ? (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shrink-0">
                {challengeStepIndex + 1}
              </span>
            ) : (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
            )}
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

