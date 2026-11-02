import React, { useState } from "react";
import { Province, TOUR_CHALLENGES } from "../data/provincesData";

interface ChallengePanelProps {
  challengeIndex: number;
  totalChallenges: number;
  selectedIds: string[];
  allProvinces: Province[];
  feedback: { isSuccess: boolean; text: string } | null;
  onSelectChallengeIndex: (index: number) => void;
  onNextChallenge: () => void;
  onPrevChallenge: () => void;
  onToggleProvince: (provId: string) => void;
  onRemoveProvince: (provId: string) => void;
  onClearSelection: () => void;
  onVerifyChallenge: () => void;
  onClose: () => void;
}

export const ChallengePanel: React.FC<ChallengePanelProps> = ({
  challengeIndex,
  totalChallenges,
  selectedIds,
  allProvinces,
  feedback,
  onSelectChallengeIndex,
  onNextChallenge,
  onPrevChallenge,
  onToggleProvince,
  onRemoveProvince,
  onClearSelection,
  onVerifyChallenge,
  onClose,
}) => {
  const challenge = TOUR_CHALLENGES[challengeIndex] || TOUR_CHALLENGES[0];
  const [selectedQuickId, setSelectedQuickId] = useState("");

  const handleQuickAdd = (provId: string) => {
    if (!provId) return;
    onToggleProvince(provId);
    setSelectedQuickId("");
  };

  // Group provinces by region for easy selection in dropdown
  const v1Provinces = allProvinces.filter((p) => p.regionCode === "V1");
  const v2Provinces = allProvinces.filter((p) => p.regionCode === "V2");
  const v3Provinces = allProvinces.filter((p) => p.regionCode === "V3");
  const v4Provinces = allProvinces.filter((p) => p.regionCode === "V4");
  const v5Provinces = allProvinces.filter((p) => p.regionCode === "V5");
  const v6Provinces = allProvinces.filter((p) => p.regionCode === "V6");

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#071326]/98 rounded-2xl p-4 w-[680px] max-w-[95vw] border-2 border-amber-400/80 shadow-2xl shadow-amber-500/10 backdrop-blur-md">
      {/* Top Header: Route selector & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider">
            THỬ THÁCH {challengeIndex + 1}/{totalChallenges}
          </span>
          <select
            value={challengeIndex}
            onChange={(e) => onSelectChallengeIndex(Number(e.target.value))}
            className="bg-slate-900 border border-amber-400/50 text-amber-200 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400 max-w-[260px] truncate"
          >
            {TOUR_CHALLENGES.map((ch, idx) => (
              <option key={idx} value={idx}>
                {ch.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrevChallenge}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs border border-slate-700 flex items-center gap-1 transition"
            title="Tuyến trước"
          >
            <i className="fa-solid fa-chevron-left text-[10px]"></i>
            <span>Trước</span>
          </button>
          <button
            onClick={onNextChallenge}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs border border-slate-700 flex items-center gap-1 transition"
            title="Tuyến sau"
          >
            <span>Sau</span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
            title="Đóng chế độ thử thách"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>

      {/* Challenge Description */}
      <div className="mb-3">
        <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
          <i className="fa-solid fa-route text-amber-400"></i>
          <span>{challenge.title}</span>
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          {challenge.desc}
        </p>
      </div>

      {/* Selection Area: Selected Chips & Quick Add Dropdown */}
      <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 mb-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-amber-400"></i>
            <span>Lộ trình bạn đã chọn: ({selectedIds.length}/3 tỉnh/thành)</span>
          </span>
          {selectedIds.length > 0 && (
            <button
              onClick={onClearSelection}
              className="text-[11px] text-rose-400 hover:text-rose-300 transition hover:underline"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {/* Selected Province Badges */}
        <div className="flex flex-wrap items-center gap-2 min-h-[36px] mb-2.5">
          {selectedIds.length === 0 ? (
            <div className="text-xs text-slate-400 italic flex items-center gap-1.5">
              <span>👉 Bấm chọn trực tiếp trên sa bàn 3D / nhãn tên hoặc chọn từ danh sách bên dưới:</span>
            </div>
          ) : (
            selectedIds.map((id, i) => {
              const prov = allProvinces.find((x) => x.id === id);
              return (
                <React.Fragment key={id}>
                  {i > 0 && <i className="fa-solid fa-arrow-right text-amber-400 text-xs"></i>}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-400 text-amber-200 text-xs font-bold shadow-md">
                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] flex items-center justify-center font-black">
                      {i + 1}
                    </span>
                    <span>{prov ? prov.name : id}</span>
                    <button
                      onClick={() => onRemoveProvince(id)}
                      className="ml-1 text-slate-400 hover:text-rose-300 px-1 rounded hover:bg-slate-800 transition"
                      title="Xóa tỉnh này khỏi tuyến"
                    >
                      <i className="fa-solid fa-xmark text-[10px]"></i>
                    </button>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Quick Dropdown & Verification Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <select
              value={selectedQuickId}
              onChange={(e) => handleQuickAdd(e.target.value)}
              className="bg-slate-900 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 border border-cyan-500/40 hover:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 flex-1"
            >
              <option value="">➕ Chọn nhanh Tỉnh/Thành từ danh mục...</option>
              <optgroup label="Trung du & Miền núi phía Bắc (V1)">
                {v1Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Đồng bằng sông Hồng (V2)">
                {v2Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Bắc Trung Bộ & Duyên hải miền Trung (V3)">
                {v3Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tây Nguyên (V4)">
                {v4Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Đông Nam Bộ (V5)">
                {v5Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Đồng bằng sông Cửu Long (V6)">
                {v6Provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {selectedIds.includes(p.id) ? "✓ (Đã chọn)" : ""}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onVerifyChallenge}
              disabled={selectedIds.length === 0}
              className={`px-4 py-1.5 rounded-lg font-bold text-xs shadow-lg flex items-center gap-1.5 transition ${
                selectedIds.length > 0
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-emerald-500/20"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <i className="fa-solid fa-clipboard-check"></i>
              <span>Chấm điểm Tuyến</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Feedback Notice */}
      {feedback && (
        <div
          className={`p-2.5 rounded-xl text-xs font-semibold leading-relaxed flex items-start gap-2 shadow-inner ${
            feedback.isSuccess
              ? "bg-emerald-950/95 border border-emerald-400 text-emerald-200"
              : "bg-amber-950/95 border border-amber-400 text-amber-200"
          }`}
        >
          <i
            className={`fa-solid mt-0.5 text-sm ${
              feedback.isSuccess ? "fa-circle-check text-emerald-400" : "fa-circle-question text-amber-400"
            }`}
          ></i>
          <div className="flex-1">
            <span>{feedback.text}</span>
            {feedback.isSuccess && (
              <div className="mt-1.5">
                <button
                  onClick={onNextChallenge}
                  className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] transition shadow"
                >
                  Thực hành Tuyến tiếp theo <i className="fa-solid fa-arrow-right ml-1"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
