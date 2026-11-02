import React from "react";
import { Province, PROVINCES_34 } from "../data/provincesData";

interface ZenControlDockProps {
  currentLocation: Province;
  selectedProvince: Province;
  isSpeaking: boolean;
  isMusicPlaying: boolean;
  onSelectProvince: (p: Province) => void;
  onStartJourney: () => void;
  onToggleVoice: () => void;
  onToggleMusic: () => void;
  onResetOverview: () => void;
  onOpenPanels: () => void;
}

export const ZenControlDock: React.FC<ZenControlDockProps> = ({
  currentLocation,
  selectedProvince,
  isSpeaking,
  isMusicPlaying,
  onSelectProvince,
  onStartJourney,
  onToggleVoice,
  onToggleMusic,
  onResetOverview,
  onOpenPanels,
}) => {
  return (
    <div className="fixed bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#09182f]/95 border border-cyan-400/40 rounded-2xl px-3.5 py-2 shadow-2xl backdrop-blur-none max-w-[94vw] text-xs transition-all">
      {/* Location indicators & quick jump */}
      <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-700/80">
        <span className="text-slate-400 text-[10px] hidden sm:inline">Từ:</span>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
          {currentLocation.name}
        </span>
        <i className="fa-solid fa-arrow-right text-slate-500 text-[10px]"></i>
        <span className="text-slate-400 text-[10px] hidden sm:inline">Đến:</span>
        <select
          value={selectedProvince.id}
          onChange={(e) => {
            const p = PROVINCES_34.find((x) => x.id === e.target.value);
            if (p) onSelectProvince(p);
          }}
          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400"
        >
          {PROVINCES_34.map((p) => (
            <option key={p.id} value={p.id}>
              {p.stt}. {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Launch Journey */}
      <button
        onClick={onStartJourney}
        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold flex items-center gap-1.5 shadow transition"
        title="Khởi hành phương tiện 3D tham quan"
      >
        <i className="fa-solid fa-play"></i>
        <span className="hidden sm:inline">Khởi hành</span>
      </button>

      {/* Voice Guide Quick Trigger */}
      <button
        onClick={onToggleVoice}
        className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition ${
          isSpeaking
            ? "bg-pink-600 border-pink-400 text-white animate-pulse"
            : "bg-slate-800 border-slate-700 text-pink-300 hover:bg-slate-700"
        }`}
        title={isSpeaking ? "Dừng thuyết minh" : "Nghe Nữ HDV thuyết minh tỉnh đang chọn"}
      >
        <i className={`fa-solid ${isSpeaking ? "fa-volume-high" : "fa-microphone-lines"}`}></i>
        <span className="hidden md:inline">{isSpeaking ? "Dừng HDV" : "Thuyết minh HDV"}</span>
      </button>

      {/* Music Toggle */}
      <button
        onClick={onToggleMusic}
        className={`p-2 rounded-xl border transition ${
          isMusicPlaying
            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
        }`}
        title="Bật/Tắt Nhạc Ngũ Cung"
      >
        <i className={`fa-solid ${isMusicPlaying ? "fa-music" : "fa-volume-xmark"}`}></i>
      </button>

      {/* Reset Camera */}
      <button
        onClick={onResetOverview}
        className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 hover:bg-slate-700 transition"
        title="Về toàn cảnh Việt Nam"
      >
        <i className="fa-solid fa-expand"></i>
      </button>

      {/* Open All Panels */}
      <button
        onClick={onOpenPanels}
        className="px-2.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 transition ml-1 shrink-0"
        title="Mở lại đầy đủ bảng danh mục tỉnh và hồ sơ chi tiết"
      >
        <i className="fa-solid fa-table-columns"></i>
        <span>Mở các bảng</span>
      </button>
    </div>
  );
};
