import React, { useState, useRef, useEffect } from "react";

interface MapNavControllerProps {
  onPan: (direction: "up" | "down" | "left" | "right", step?: number) => void;
  onZoom: (factor: number) => void;
  onRotate: (degrees: number) => void;
  onReset: () => void;
  dragMode: "pan" | "rotate";
  onToggleDragMode: (mode: "pan" | "rotate") => void;
  showLeftPanel: boolean;
}

export const MapNavController: React.FC<MapNavControllerProps> = ({
  onPan,
  onZoom,
  onRotate,
  onReset,
  dragMode,
  onToggleDragMode,
  showLeftPanel,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [panSpeedMultiplier, setPanSpeedMultiplier] = useState<1 | 2 | 3>(2);

  // Interval ref for continuous pressing
  const intervalRef = useRef<number | null>(null);

  const startContinuousPan = (dir: "up" | "down" | "left" | "right") => {
    stopContinuousAction();
    const baseStep = 2.4 * panSpeedMultiplier;
    onPan(dir, baseStep);

    intervalRef.current = window.setInterval(() => {
      onPan(dir, baseStep);
    }, 75);
  };

  const stopContinuousAction = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopContinuousAction();
  }, []);

  return (
    <div
      className={`fixed z-20 transition-all duration-300 select-none ${
        showLeftPanel
          ? "left-[330px] md:left-[368px] bottom-3.5"
          : "left-3 bottom-3.5"
      }`}
    >
      {!isExpanded ? (
        /* Collapsed Floating Compass Button */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#09182f]/92 border border-cyan-400/50 text-cyan-200 text-xs font-bold shadow-2xl hover:bg-cyan-600/30 transition transform hover:scale-105"
          title="Mở Bảng Điều khiển Kéo Bản đồ 4 Phía (Phím mũi tên ⬆️⬇️⬅️➡️)"
        >
          <i className="fa-solid fa-compass text-amber-300 animate-spin-slow"></i>
          <span className="text-[11px]">Kéo bản đồ</span>
          <i className="fa-solid fa-chevron-up text-[9px] text-cyan-400 ml-0.5"></i>
        </button>
      ) : (
        /* Expanded Floating D-Pad & Drag Controller */
        <div className="bg-[#09182f]/95 border border-cyan-500/40 rounded-2xl p-2.5 shadow-2xl text-xs flex flex-col gap-2 backdrop-blur-none w-52">
          {/* Header & Collapse */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <i className="fa-solid fa-arrows-up-down-left-right text-amber-300 text-xs shrink-0"></i>
              <span className="text-[11px] font-extrabold uppercase text-cyan-200 tracking-wide truncate">
                Kéo bản đồ 4 phía
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded text-[10px]"
              title="Thu nhỏ cụm điều hướng"
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          {/* Mouse Drag Mode Switcher */}
          <div className="flex items-center bg-[#071326] p-0.5 rounded-xl border border-slate-700/80">
            <button
              onClick={() => onToggleDragMode("pan")}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 ${
                dragMode === "pan"
                  ? "bg-amber-500 text-slate-950 shadow"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Kéo chuột trái để trượt bản đồ tự do"
            >
              <i className="fa-solid fa-hand"></i>
              <span>Chuột: Kéo (Pan)</span>
            </button>
            <button
              onClick={() => onToggleDragMode("rotate")}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 ${
                dragMode === "rotate"
                  ? "bg-cyan-600 text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Kéo chuột trái để xoay góc nhìn 3D"
            >
              <i className="fa-solid fa-arrows-rotate"></i>
              <span>Xoay 3D</span>
            </button>
          </div>

          {/* Directional D-Pad (Up, Down, Left, Right) */}
          <div className="flex flex-col items-center justify-center py-1">
            {/* North (Up) */}
            <button
              onMouseDown={() => startContinuousPan("up")}
              onMouseUp={stopContinuousAction}
              onMouseLeave={stopContinuousAction}
              onTouchStart={() => startContinuousPan("up")}
              onTouchEnd={stopContinuousAction}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-cyan-600 active:bg-cyan-500 border border-slate-600 hover:border-cyan-400 text-cyan-200 hover:text-white flex items-center justify-center shadow transition active:scale-95"
              title="Kéo bản đồ lên trên (Bắc) / Phím ⬆"
            >
              <i className="fa-solid fa-chevron-up text-xs"></i>
            </button>

            {/* Middle Row: Left - Center Reset - Right */}
            <div className="flex items-center gap-1.5 my-1">
              <button
                onMouseDown={() => startContinuousPan("left")}
                onMouseUp={stopContinuousAction}
                onMouseLeave={stopContinuousAction}
                onTouchStart={() => startContinuousPan("left")}
                onTouchEnd={stopContinuousAction}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-cyan-600 active:bg-cyan-500 border border-slate-600 hover:border-cyan-400 text-cyan-200 hover:text-white flex items-center justify-center shadow transition active:scale-95"
                title="Kéo bản đồ sang trái (Tây) / Phím ⬅"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>

              <button
                onClick={onReset}
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black flex items-center justify-center shadow transition active:scale-95"
                title="Đặt lại toàn cảnh Việt Nam"
              >
                <i className="fa-solid fa-expand text-[11px]"></i>
              </button>

              <button
                onMouseDown={() => startContinuousPan("right")}
                onMouseUp={stopContinuousAction}
                onMouseLeave={stopContinuousAction}
                onTouchStart={() => startContinuousPan("right")}
                onTouchEnd={stopContinuousAction}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-cyan-600 active:bg-cyan-500 border border-slate-600 hover:border-cyan-400 text-cyan-200 hover:text-white flex items-center justify-center shadow transition active:scale-95"
                title="Kéo bản đồ sang phải (Đông) / Phím ➡️"
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>

            {/* South (Down) */}
            <button
              onMouseDown={() => startContinuousPan("down")}
              onMouseUp={stopContinuousAction}
              onMouseLeave={stopContinuousAction}
              onTouchStart={() => startContinuousPan("down")}
              onTouchEnd={stopContinuousAction}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-cyan-600 active:bg-cyan-500 border border-slate-600 hover:border-cyan-400 text-cyan-200 hover:text-white flex items-center justify-center shadow transition active:scale-95"
              title="Kéo bản đồ xuống dưới (Nam) / Phím ⬇"
            >
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>

          {/* Quick Zoom & Rotate Tools */}
          <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800">
            <button
              onClick={() => onZoom(0.85)}
              className="py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 font-bold text-[11px] border border-slate-700 flex items-center justify-center gap-0.5"
              title="Phóng to gần hơn"
            >
              <i className="fa-solid fa-plus text-[9px]"></i>
            </button>
            <button
              onClick={() => onZoom(1.18)}
              className="py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 font-bold text-[11px] border border-slate-700 flex items-center justify-center gap-0.5"
              title="Thu nhỏ ra xa"
            >
              <i className="fa-solid fa-minus text-[9px]"></i>
            </button>
            <button
              onClick={() => onRotate(-15)}
              className="py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-bold text-[11px] border border-slate-700 flex items-center justify-center"
              title="Xoay trái 15°"
            >
              <i className="fa-solid fa-arrow-rotate-left text-[10px]"></i>
            </button>
            <button
              onClick={() => onRotate(15)}
              className="py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-bold text-[11px] border border-slate-700 flex items-center justify-center"
              title="Xoay phải 15°"
            >
              <i className="fa-solid fa-arrow-rotate-right text-[10px]"></i>
            </button>
          </div>

          {/* Speed Multiplier & Keyboard Hint */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1">
              <span>Tốc độ:</span>
              <button
                onClick={() => setPanSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1))}
                className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700"
                title="Thay đổi tốc độ kéo bản đồ"
              >
                {panSpeedMultiplier}x
              </button>
            </span>
            <span className="text-[9px] text-slate-400 flex items-center gap-1">
              <i className="fa-regular fa-keyboard text-slate-400"></i> Phím ⬆️⬇️⬅️➡️
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
