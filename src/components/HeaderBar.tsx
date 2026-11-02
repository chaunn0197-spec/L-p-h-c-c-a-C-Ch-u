import React from "react";
import { MusicStyle } from "../services/audioEngine";

export interface HeaderBarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  gameMode: "explore" | "challenge";
  onSwitchGameMode: (mode: "explore" | "challenge") => void;
  onOpenPassport: () => void;
  passportCount: number;
  isMusicPlaying: boolean;
  musicStyle: MusicStyle;
  onToggleMusic: () => void;
  onChangeMusicStyle: (style: MusicStyle) => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  onResetOverview: () => void;
  showLeftPanel: boolean;
  onToggleLeftPanel: () => void;
  showRightPanel: boolean;
  onToggleRightPanel: () => void;
  onToggleAllPanels: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  isCollapsed,
  onToggleCollapse,
  gameMode,
  onSwitchGameMode,
  onOpenPassport,
  passportCount,
  isMusicPlaying,
  musicStyle,
  onToggleMusic,
  onChangeMusicStyle,
  showLabels,
  onToggleLabels,
  onResetOverview,
  showLeftPanel,
  onToggleLeftPanel,
  showRightPanel,
  onToggleRightPanel,
  onToggleAllPanels,
}) => {
  const areAllPanelsHidden = !showLeftPanel && !showRightPanel;

  // Render ultra-compact floating pill when collapsed
  if (isCollapsed) {
    return (
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#09182f]/92 border border-cyan-400/40 rounded-full px-3 py-1 shadow-xl text-xs backdrop-blur-none transition-all hover:border-cyan-300">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-[10px] text-white font-black shrink-0 shadow">
          ★
        </div>
        <span className="font-extrabold text-white tracking-wider text-[11px] sm:text-xs">
          VIETNAM 3D
        </span>
        <span className="text-slate-500 text-[10px]">|</span>
        <button
          onClick={onToggleCollapse}
          className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-bold text-[11px] transition px-1 py-0.5 rounded hover:bg-slate-800"
          title="Mở thanh công cụ (Phím T)"
        >
          <span>Mở công cụ</span>
          <i className="fa-solid fa-chevron-down text-[9px] text-cyan-400"></i>
        </button>
        <span className="text-slate-600 text-[10px]">·</span>
        <button
          onClick={onResetOverview}
          className="text-amber-300 hover:text-amber-200 text-[11px] px-1 py-0.5"
          title="Toàn cảnh sa bàn"
        >
          <i className="fa-solid fa-expand"></i>
        </button>
      </div>
    );
  }

  // Render sleek single-row compact toolbar
  return (
    <header className="fixed top-2 left-2 right-2 md:left-3 md:right-3 z-30 flex items-center justify-between gap-1.5 bg-[#09182f]/95 border border-cyan-500/35 px-2.5 py-1 rounded-xl shadow-2xl transition-all h-11 text-xs select-none max-w-[1440px] mx-auto">
      {/* Left: Brand + Left Panel Trigger */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onToggleLeftPanel}
          className={`px-2 py-1 rounded-lg border text-xs flex items-center gap-1 transition ${
            showLeftPanel
              ? "bg-cyan-600/30 border-cyan-400 text-cyan-200 font-bold"
              : "bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white"
          }`}
          title="Ẩn/Hiện Bảng Tuyến Lộ Trình & 34 Tỉnh"
        >
          <i className={`fa-solid ${showLeftPanel ? "fa-xmark" : "fa-bars"} text-[10px]`}></i>
          <span className="hidden sm:inline font-semibold text-[11px]">34 Tỉnh</span>
        </button>

        <div className="flex items-center gap-1.5 pl-1">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 via-rose-500 to-red-600 flex items-center justify-center shadow border border-amber-300/40 shrink-0">
            <i className="fa-solid fa-earth-asia text-white text-[11px]"></i>
          </div>
          <span className="text-xs font-black tracking-wider bg-gradient-to-r from-amber-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent hidden sm:inline whitespace-nowrap">
            VIETNAM 3D
          </span>
        </div>
      </div>

      {/* Center: Segmented Modes & Passport */}
      <div className="flex items-center bg-[#071326] p-0.5 rounded-lg border border-slate-700/80 shrink-0">
        <button
          onClick={() => onSwitchGameMode("explore")}
          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1 ${
            gameMode === "explore"
              ? "bg-cyan-600 text-white shadow"
              : "text-slate-300 hover:text-white"
          }`}
          title="Chế độ tham quan sa bàn 3D"
        >
          <i className="fa-solid fa-compass text-[10px]"></i>
          <span>Khám phá</span>
        </button>
        <button
          onClick={() => onSwitchGameMode("challenge")}
          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1 ${
            gameMode === "challenge"
              ? "bg-amber-500 text-slate-950 font-bold shadow"
              : "text-slate-300 hover:text-white"
          }`}
          title="Chế độ thử thách thiết kế tour"
        >
          <i className="fa-solid fa-route text-[10px]"></i>
          <span className="hidden sm:inline">Thử thách</span>
        </button>
        <button
          onClick={onOpenPassport}
          className="px-2 py-1 rounded-md text-[11px] font-semibold transition flex items-center gap-1 text-amber-300 hover:bg-amber-500/10"
          title="Mở Hộ chiếu Di sản 34 con dấu"
        >
          <i className="fa-solid fa-passport text-[10px]"></i>
          <span>Hộ chiếu ({passportCount}/34)</span>
        </button>
      </div>

      {/* Right: Audio, Labels, Pan-out, Side Panel, & Collapse Button */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Toggle All Side Panels */}
        <button
          onClick={onToggleAllPanels}
          className={`px-2 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
            areAllPanelsHidden
              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 hover:bg-emerald-500/30"
              : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
          }`}
          title={
            areAllPanelsHidden
              ? "Mở lại các bảng thông tin"
              : "Thu gọn 2 bên để xem sa bàn 3D"
          }
        >
          <i className={`fa-solid ${areAllPanelsHidden ? "fa-table-columns" : "fa-eye-slash"} text-[10px]`}></i>
          <span className="hidden lg:inline">{areAllPanelsHidden ? "Mở bảng" : "Xem 3D"}</span>
        </button>

        {/* Music Audio Toggle & Selector - Xin Chào Việt Nam (Không Lời) */}
        <div className="hidden md:flex items-center bg-[#071326] rounded-lg px-2 py-0.5 border border-slate-700/80 gap-1.5">
          <button
            onClick={onToggleMusic}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300 hover:text-white py-0.5 transition cursor-pointer"
            title="Bật/Tắt Nhạc nền: Xin Chào Việt Nam (Không lời)"
          >
            <i
              className={`fa-solid ${
                isMusicPlaying
                  ? "fa-volume-high text-emerald-400 animate-pulse"
                  : "fa-volume-xmark text-slate-400"
              } text-[10px]`}
            ></i>
            <span className="text-[10px] text-amber-300 font-bold truncate max-w-[130px]">
              {isMusicPlaying ? "🎵 Xin Chào VN" : "Nhạc nền"}
            </span>
          </button>
          <select
            value={musicStyle}
            onChange={(e) => onChangeMusicStyle(e.target.value as MusicStyle)}
            className="bg-slate-800 text-[10px] text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 focus:outline-none cursor-pointer"
            title="Chọn phong cách hòa tấu Xin Chào Việt Nam"
          >
            <option value="xinchao">Xin Chào Việt Nam (Guitar & Đàn tranh)</option>
            <option value="xinchao_piano">Xin Chào Việt Nam (Piano mộc)</option>
            <option value="journey">Hành trình Xuyên Việt</option>
          </select>
        </div>

        {/* Labels 3D Toggle */}
        <button
          onClick={onToggleLabels}
          className={`p-1.5 rounded-lg border text-xs flex items-center justify-center transition ${
            showLabels
              ? "bg-slate-800 border-cyan-400/50 text-cyan-300"
              : "bg-slate-900 border-slate-700 text-slate-500"
          }`}
          title="Ẩn/Hiện nhãn 34 tỉnh trên sa bàn"
        >
          <i className="fa-solid fa-tags text-[10px]"></i>
        </button>

        {/* Reset Camera Overview */}
        <button
          onClick={onResetOverview}
          className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-semibold flex items-center justify-center transition"
          title="Toàn cảnh Việt Nam"
        >
          <i className="fa-solid fa-expand text-[10px]"></i>
        </button>

        {/* Right Panel Trigger (HDV & Dossier) */}
        <button
          onClick={onToggleRightPanel}
          className={`px-2 py-1 rounded-lg border text-xs flex items-center gap-1 transition ${
            showRightPanel
              ? "bg-pink-600/30 border-pink-400 text-pink-200 font-bold"
              : "bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white"
          }`}
          title="Ẩn/Hiện Hồ sơ & Hướng dẫn viên"
        >
          <i className={`fa-solid ${showRightPanel ? "fa-xmark" : "fa-headset"} text-[10px]`}></i>
          <span className="hidden sm:inline font-semibold text-[11px]">HDV</span>
        </button>

        {/* Dedicated Collapse Toolbar Button ("CÓ THỂ THU VÀO") */}
        <button
          onClick={onToggleCollapse}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs border border-slate-700 font-bold flex items-center gap-1 transition shrink-0 ml-0.5"
          title="Thu gọn thanh công cụ lên trên để ngắm trọn sa bàn (Phím T)"
        >
          <i className="fa-solid fa-chevron-up text-[10px] text-cyan-400"></i>
          <span className="hidden md:inline text-[11px]">Thu vào</span>
        </button>
      </div>
    </header>
  );
};
