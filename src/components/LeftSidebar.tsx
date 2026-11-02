import React, { useState, useMemo } from "react";
import { Province, PROVINCES_34 } from "../data/provincesData";
import { getRouteHighwayInfo } from "../utils/routeHighwayHelper";

interface LeftSidebarProps {
  isHeaderCollapsed?: boolean;
  currentLocation: Province;
  originProvince: Province;
  destinationProvince: Province;
  transportMode: "road" | "air" | "water";
  chaseCamera: boolean;
  travelProgress: {
    active: boolean;
    percent: number;
    routeText: string;
    distanceKm: number;
    statusText: string;
  };
  stampedProvinces: Set<string>;
  onSelectOrigin: (p: Province) => void;
  onSelectDestination: (p: Province) => void;
  onSelectTransportMode: (mode: "road" | "air" | "water") => void;
  onToggleChaseCamera: () => void;
  onStartJourney: () => void;
  onSelectProvince: (p: Province) => void;
  onQuickTravelTo: (p: Province) => void;
  onClose: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isHeaderCollapsed = false,
  currentLocation,
  originProvince,
  destinationProvince,
  transportMode,
  chaseCamera,
  travelProgress,
  stampedProvinces,
  onSelectOrigin,
  onSelectDestination,
  onSelectTransportMode,
  onToggleChaseCamera,
  onStartJourney,
  onSelectProvince,
  onQuickTravelTo,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("ALL");

  const routeInfo = useMemo(() => {
    return getRouteHighwayInfo(originProvince, destinationProvince, transportMode);
  }, [originProvince, destinationProvince, transportMode]);

  const filteredProvinces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROVINCES_34.filter((p) => {
      const matchRegion = regionFilter === "ALL" || p.regionCode === regionFilter;
      const matchText =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.mergedFrom.toLowerCase().includes(q) ||
        p.hubs.some((h) => h.name.toLowerCase().includes(q)) ||
        p.attractions.some((a) => a.name.toLowerCase().includes(q));
      return matchRegion && matchText;
    });
  }, [searchQuery, regionFilter]);

  return (
    <aside className={`fixed left-3 bottom-3 w-80 md:w-88 z-20 flex flex-col gap-2.5 transition-all duration-300 ${isHeaderCollapsed ? "top-3" : "top-14"}`}>
      {/* 1. INTER-PROVINCIAL TRAVEL CONTROLLER */}
      <div className="bg-[#09182f]/94 border border-cyan-500/35 rounded-2xl p-3 flex flex-col gap-2.5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700/70 pb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <i className="fa-solid fa-plane-departure text-cyan-400 text-xs shrink-0"></i>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-300 truncate">
              Điều hành Lộ trình
            </h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
              📍 {currentLocation.name}
            </span>
            <button
              onClick={onClose}
              className="p-1 px-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
              title="Thu gọn bảng này lại tránh chắn màn hình 3D"
            >
              <i className="fa-solid fa-chevron-left mr-1"></i>Thu gọn
            </button>
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Điểm đi (Tỉnh A)</label>
            <select
              value={originProvince.id}
              onChange={(e) => {
                const p = PROVINCES_34.find((x) => x.id === e.target.value);
                if (p) onSelectOrigin(p);
              }}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {PROVINCES_34.map((p) => (
                <option key={p.id} value={p.id}>
                  {String(p.stt).padStart(2, "0")}. {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Điểm đến (Tỉnh B)</label>
            <select
              value={destinationProvince.id}
              onChange={(e) => {
                const p = PROVINCES_34.find((x) => x.id === e.target.value);
                if (p) onSelectDestination(p);
              }}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
            >
              {PROVINCES_34.map((p) => (
                <option key={p.id} value={p.id}>
                  {String(p.stt).padStart(2, "0")}. {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Highway Information (Quốc lộ, Cao tốc, Tuyến đường di chuyển) */}
        <div className="bg-slate-950/90 border border-amber-400/40 rounded-xl p-2.5 text-xs flex flex-col gap-1 shadow-inner">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <i className="fa-solid fa-diamond-turn-right text-amber-400"></i>
              <span>Tuyến đường di chuyển:</span>
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
              {routeInfo.roadType}
            </span>
          </div>
          <div className="font-black text-amber-200 text-xs flex items-center gap-1.5 leading-snug">
            <i className="fa-solid fa-road text-cyan-400 shrink-0"></i>
            <span>{routeInfo.roadName}</span>
          </div>
          <div className="text-[10px] text-slate-300 line-clamp-1 italic">
            {routeInfo.description}
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {routeInfo.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] font-semibold bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded border border-slate-700/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Transport Modes */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <button
            onClick={() => onSelectTransportMode("road")}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex flex-col items-center gap-0.5 transition ${
              transportMode === "road"
                ? "border-cyan-400 bg-cyan-500/25 text-white shadow"
                : "border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500"
            }`}
          >
            <i className="fa-solid fa-bus text-amber-300"></i>
            <span>Đường bộ</span>
          </button>
          <button
            onClick={() => onSelectTransportMode("air")}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex flex-col items-center gap-0.5 transition ${
              transportMode === "air"
                ? "border-cyan-400 bg-cyan-500/25 text-white shadow"
                : "border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500"
            }`}
          >
            <i className="fa-solid fa-plane text-sky-300"></i>
            <span>Hàng không</span>
          </button>
          <button
            onClick={() => onSelectTransportMode("water")}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex flex-col items-center gap-0.5 transition ${
              transportMode === "water"
                ? "border-cyan-400 bg-cyan-500/25 text-white shadow"
                : "border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500"
            }`}
          >
            <i className="fa-solid fa-ship text-emerald-300"></i>
            <span>Thủy / Sắt</span>
          </button>
        </div>

        {/* Action & Chase Camera */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onStartJourney}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5 transition transform active:scale-95"
          >
            <i className="fa-solid fa-play"></i>
            <span>Khởi hành Tham quan</span>
          </button>
          <button
            onClick={onToggleChaseCamera}
            className={`px-2.5 py-2 rounded-xl border text-xs font-medium transition ${
              chaseCamera
                ? "border-amber-400 bg-amber-500/25 text-amber-300 font-bold"
                : "border-slate-700 bg-slate-800/80 text-slate-300 hover:border-cyan-400"
            }`}
            title="Bật/Tắt Camera bám theo phương tiện 3D"
          >
            <i className="fa-solid fa-video mr-1"></i>Cam hành trình
          </button>
        </div>

        {/* Active Telemetry Status Bar */}
        {travelProgress.active && (
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-xl p-2.5 text-xs space-y-1">
            <div className="flex items-center justify-between text-amber-300 font-bold">
              <span>{travelProgress.routeText}</span>
              <span>~{travelProgress.distanceKm} km</span>
            </div>
            <div className="text-[11px] font-extrabold text-cyan-300 flex items-center gap-1.5">
              <i className="fa-solid fa-road text-amber-400"></i>
              <span className="truncate">{routeInfo.roadName}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-amber-400 h-full transition-all duration-75"
                style={{ width: `${travelProgress.percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-300 italic">{travelProgress.statusText}</div>
          </div>
        )}
      </div>

      {/* 2. DIRECTORY OF 34 PROVINCES */}
      <div className="bg-[#09182f]/94 border border-cyan-500/35 rounded-2xl p-3 flex-1 flex flex-col min-h-0 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <i className="fa-solid fa-map-location-dot"></i>
            <span>34 Tỉnh / Thành</span>
          </h2>
          <span className="text-[11px] text-slate-400">{filteredProvinces.length}/34</span>
        </div>

        {/* Search & Region Filter */}
        <div className="flex flex-col gap-1.5 mb-2.5">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-slate-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tỉnh, tỉnh cũ, điểm đến (VD: Hà Giang, Mù Cang Chải)..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">🌏 Tất cả 6 Vùng Du lịch (34 Tỉnh/Thành)</option>
            <option value="V1">⛰️ Vùng 1: Trung du & Miền núi phía Bắc (10)</option>
            <option value="V2">🏯 Vùng 2: Đồng bằng sông Hồng (5)</option>
            <option value="V3">🏖️ Vùng 3: Bắc Trung Bộ & Duyên hải Miền Trung (8)</option>
            <option value="V4">🌲 Vùng 4: Tây Nguyên - Nam Trung Bộ mở rộng (3)</option>
            <option value="V5">🏙️ Vùng 5: Đông Nam Bộ (3)</option>
            <option value="V6">🛶 Vùng 6: Đồng bằng sông Cửu Long (5)</option>
          </select>
        </div>

        {/* Scrollable Province Cards */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {filteredProvinces.map((p) => {
            const isSelected = p.id === destinationProvince.id;
            const isStamped = stampedProvinces.has(p.id);
            return (
              <div
                key={p.id}
                onClick={() => onSelectProvince(p)}
                className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-2 border transition ${
                  isSelected
                    ? "ring-2 ring-cyan-400 bg-cyan-950/70 border-cyan-400/50"
                    : "bg-slate-900/60 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-6 h-6 rounded-lg font-extrabold text-[11px] flex items-center justify-center text-slate-950 shrink-0 shadow"
                    style={{ background: p.color }}
                  >
                    {String(p.stt).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                      <span>{p.name}</span>
                      {isStamped && (
                        <i
                          className="fa-solid fa-stamp text-emerald-400 text-[10px]"
                          title="Đã đóng dấu Hộ chiếu"
                        ></i>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{p.mergedFrom}</div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickTravelTo(p);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-cyan-300 text-[10px] font-bold transition shrink-0"
                  title="Di chuyển phương tiện 3D tới tỉnh này"
                >
                  <i className="fa-solid fa-route"></i> Đi
                </button>
              </div>
            );
          })}
        </div>

        {/* Color Legend */}
        <div className="pt-2 mt-2 border-t border-slate-700/70 flex items-center justify-between text-[10px] text-slate-400">
          <span>Bảng màu mẫu:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F5C71A]" title="Vàng"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F05A22]" title="Cam đỏ"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#2CE5C3]" title="Xanh ngọc"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" title="Xanh lá"></span>
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0047BA]" title="Xanh dương đậm"></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
