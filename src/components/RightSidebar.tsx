import React, { useState, useEffect } from "react";
import { Province } from "../data/provincesData";
import { triggerStampCelebration } from "../utils/confetti";
import { audioEngine } from "../services/audioEngine";

interface RightSidebarProps {
  isHeaderCollapsed?: boolean;
  province: Province;
  isStamped: boolean;
  isSpeaking: boolean;
  voiceSpeed: number;
  autoNarrate: boolean;
  onFlyToProvince: () => void;
  onAwardStamp?: (provinceId: string) => void;
  onRemoveStamp?: (provinceId: string) => void;
  onStartVoice: () => void;
  onStopVoice: () => void;
  onChangeVoiceSpeed: (speed: number) => void;
  onToggleAutoNarrate: (val: boolean) => void;
  onClose: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  isHeaderCollapsed = false,
  province,
  isStamped,
  isSpeaking,
  voiceSpeed,
  autoNarrate,
  onFlyToProvince,
  onAwardStamp,
  onRemoveStamp,
  onStartVoice,
  onStopVoice,
  onChangeVoiceSpeed,
  onToggleAutoNarrate,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "attractions" | "cuisine" | "quiz">("overview");

  // 3 Questions from syllabus
  const questions =
    province.questions && province.questions.length === 3
      ? province.questions
      : [province.quiz, province.quiz, province.quiz];

  const [activeQIndex, setActiveQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [questionResults, setQuestionResults] = useState<Record<number, boolean | null>>({});
  const [currentFeedback, setCurrentFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    explain: string;
  } | null>(null);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  // Reset quiz progress when selected province changes
  useEffect(() => {
    setActiveQIndex(0);
    setSelectedAnswers({});
    setQuestionResults({});
    setCurrentFeedback(null);
    setShowCelebrationBanner(false);
  }, [province.id]);

  const correctCount = [0, 1, 2].filter((i) => questionResults[i] === true).length;
  const hasWrongAnswer = [0, 1, 2].some((i) => questionResults[i] === false);
  const isAllCorrect = correctCount === 3;

  const currentQ = questions[activeQIndex];
  const currentSelectedOpt = selectedAnswers[activeQIndex] ?? null;
  const currentQResult = questionResults[activeQIndex] ?? null;

  const handleSelectOption = (optIdx: number) => {
    const isCorrect = optIdx === currentQ.ans;

    setSelectedAnswers((prev) => ({ ...prev, [activeQIndex]: optIdx }));
    setQuestionResults((prev) => ({ ...prev, [activeQIndex]: isCorrect }));

    if (isCorrect) {
      audioEngine.playSfx("click");
      setCurrentFeedback({
        isCorrect: true,
        text: `✓ Chính xác câu hỏi ${activeQIndex + 1}/3!`,
        explain: currentQ.explain,
      });
    } else {
      audioEngine.playSfx("wrong");
      setCurrentFeedback({
        isCorrect: false,
        text: "😢 Rất tiếc, câu trả lời chưa chính xác! Bạn phải trả lời đúng cả 3/3 câu hỏi mới được cấp Hộ chiếu. Hãy bấm 'Thử lại câu hỏi này'!",
        explain: currentQ.explain,
      });
    }
  };

  const handleRetryCurrentQuestion = () => {
    setSelectedAnswers((prev) => ({ ...prev, [activeQIndex]: null }));
    setQuestionResults((prev) => ({ ...prev, [activeQIndex]: null }));
    setCurrentFeedback(null);
    setShowCelebrationBanner(false);
  };

  const handleClaimStamp = () => {
    // Strictly require all 3 questions to be answered and all 3 to be correct
    if (!isAllCorrect || correctCount < 3) return;
    audioEngine.playSfx("fireworks");
    audioEngine.playSfx("stamp");
    triggerStampCelebration();
    setShowCelebrationBanner(true);
    onAwardStamp?.(province.id);
  };

  return (
    <aside
      className={`fixed right-3 bottom-20 w-88 md:w-96 z-20 flex flex-col bg-[#09182f]/94 border border-cyan-400/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isHeaderCollapsed ? "top-3" : "top-14"
      }`}
    >
      {/* Dossier Header */}
      <div className="p-3 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-slate-700/80">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-slate-950"
            style={{ backgroundColor: province.color }}
          >
            ĐƠN VỊ {String(province.stt).padStart(2, "0")}/34
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-cyan-300 font-semibold">{province.regionName}</span>
            <button
              onClick={onClose}
              className="p-1 px-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
              title="Thu gọn bảng này lại để quan sát sa bàn 3D"
            >
              Thu gọn <i className="fa-solid fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-black text-white tracking-wide flex items-center gap-2">
            <span>{province.name.toUpperCase()}</span>
            {isStamped && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <i className="fa-solid fa-stamp mr-0.5"></i>
                <span>Đã đóng dấu</span>
                {onRemoveStamp && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveStamp(province.id);
                    }}
                    className="ml-1 text-slate-400 hover:text-rose-400 transition"
                    title="Xóa đóng dấu tỉnh này"
                  >
                    ✕
                  </button>
                )}
              </span>
            )}
          </h2>
          <button
            onClick={onFlyToProvince}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow flex items-center gap-1 transition"
          >
            <i className="fa-solid fa-plane-departure"></i>
            <span>Bay tới đây</span>
          </button>
        </div>
        <div className="text-[11px] text-amber-300 mt-1 font-medium">{province.mergedFrom}</div>
      </div>

      {/* Hubs Bar */}
      <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center gap-1.5">
        {province.hubs.map((h, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-md bg-slate-800 border border-amber-400/40 text-amber-300 text-[10px] font-semibold"
          >
            ⦿ {h.name}
          </span>
        ))}
      </div>

      {/* Navigation Tabs (Ordered: Tổng quan -> Điểm đến -> Ẩm thực -> Nhận dấu) */}
      <div className="grid grid-cols-4 text-xs font-semibold bg-slate-950/80 border-b border-slate-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-2 text-center border-b-2 transition ${
            activeTab === "overview"
              ? "border-cyan-400 text-cyan-300 font-bold"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setActiveTab("attractions")}
          className={`py-2 text-center border-b-2 transition ${
            activeTab === "attractions"
              ? "border-cyan-400 text-cyan-300 font-bold"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Điểm đến
        </button>
        <button
          onClick={() => setActiveTab("cuisine")}
          className={`py-2 text-center border-b-2 transition ${
            activeTab === "cuisine"
              ? "border-cyan-400 text-cyan-300 font-bold"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Ẩm thực
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`py-2 text-center border-b-2 transition flex items-center justify-center gap-1 ${
            activeTab === "quiz"
              ? "border-cyan-400 text-cyan-300 font-bold"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <span>Nhận dấu</span>
          {isStamped ? (
            <span className="text-[9px] text-emerald-400">✓</span>
          ) : isAllCorrect ? (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          ) : null}
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {activeTab === "overview" && (
          <div className="space-y-2">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">Đơn vị hành chính:</span>
                <strong className="text-white">{province.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">Cấu trúc sáp nhập:</span>
                <strong className="text-amber-300 text-right">{province.mergedFrom}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-700/60 pb-1">
                <span className="text-slate-400">Vùng du lịch:</span>
                <strong className="text-cyan-300 text-right">{province.regionName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tâm điểm đô thị:</span>
                <strong className="text-emerald-300">
                  {province.hubs.map((h) => h.name).join(", ")}
                </strong>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/80">
              <div className="text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1">
                <i className="fa-solid fa-route"></i>Hạ tầng giao thông & Cửa ngõ kết nối:
              </div>
              <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                {province.transport.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="text-[11px] font-bold text-cyan-300 mb-1">
                <i className="fa-solid fa-compass mr-1"></i>Định hướng Tuyến & Liên kết Vùng:
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">{province.routeAdvice}</p>
            </div>
          </div>
        )}

        {activeTab === "attractions" && (
          <>
            <div className="text-[11px] text-slate-300 mb-1 flex items-center justify-between">
              <span>Hệ thống Điểm du lịch trọng điểm:</span>
              <span className="text-cyan-300 font-semibold">{province.attractions.length} Cụm</span>
            </div>
            <div className="space-y-2">
              {province.attractions.map((a, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/70 border-l-4"
                  style={{ borderLeftColor: province.color }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-0.5">
                    <i className="fa-solid fa-layer-group mr-1"></i>
                    {a.cluster}
                  </div>
                  <h4 className="text-xs font-extrabold text-white mb-1">
                    {idx + 1}. {a.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "cuisine" && (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-300 mb-1 flex items-center justify-between">
              <span>Đặc sản ẩm thực trứ danh {province.name}:</span>
              <span className="text-amber-300 font-semibold">{province.cuisine.length} Món ngon</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {province.cuisine.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 p-2 rounded-xl border border-slate-700/80 flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-white">{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="space-y-3">
            {/* Header: Status and Stamp State */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 flex items-center gap-1">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>THI NGHIỆP VỤ (3 CÂU HỎI)</span>
              </span>
              <div className="flex items-center gap-1.5">
                {isStamped ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <i className="fa-solid fa-circle-check"></i> Đã nhận dấu
                    </span>
                    {onRemoveStamp && (
                      <button
                        onClick={() => {
                          onRemoveStamp(province.id);
                          setCurrentFeedback(null);
                        }}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 font-semibold transition flex items-center gap-1"
                        title="Xóa dấu để thi lại"
                      >
                        <i className="fa-solid fa-trash-can text-[9px]"></i>
                        <span>Xóa dấu</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-cyan-300">
                    Đã đúng: {correctCount}/3 câu
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Tabs: Question 1, 2, 3 */}
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              {[0, 1, 2].map((idx) => {
                const isCurrent = activeQIndex === idx;
                const isAnsCorrect = questionResults[idx] === true;
                const isAnsWrong = questionResults[idx] === false;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveQIndex(idx);
                      setCurrentFeedback(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg font-bold text-center transition flex items-center justify-center gap-1 ${
                      isCurrent
                        ? "bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow"
                        : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Câu {idx + 1}/3</span>
                    {isAnsCorrect && <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]"></i>}
                    {isAnsWrong && <i className="fa-solid fa-circle-xmark text-rose-400 text-[10px]"></i>}
                  </button>
                );
              })}
            </div>

            {/* Current Question Body */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                <span>Câu hỏi {activeQIndex + 1} trên 3:</span>
                {currentQResult === true && <span className="text-emerald-400">✓ Đã trả lời đúng</span>}
                {currentQResult === false && <span className="text-rose-400">✗ Chưa chính xác</span>}
              </div>

              <p className="text-xs font-extrabold text-white leading-relaxed">
                {currentQ.q}
              </p>

              {/* 4 Choices */}
              <div className="space-y-1.5 pt-1">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = currentSelectedOpt === optIdx;
                  const isAnswered = currentQResult !== null;
                  const isThisCorrect = optIdx === currentQ.ans;

                  let btnStyle = "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200";
                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = "bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold";
                    } else if (isSelected && !isThisCorrect) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center gap-2 group ${btnStyle} ${
                        isAnswered ? "cursor-default" : "cursor-pointer hover:border-amber-400"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 border border-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0 transition">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* In-Question Feedback & Retry */}
              {currentFeedback && (
                <div
                  className={`mt-2 p-2.5 rounded-xl text-xs border leading-relaxed shadow ${
                    currentFeedback.isCorrect
                      ? "bg-emerald-950/90 border-emerald-400/80 text-emerald-200"
                      : "bg-rose-950/90 border-rose-400/80 text-rose-200"
                  }`}
                >
                  <div className="font-black text-xs mb-1 flex items-center gap-1.5">
                    <i
                      className={`fa-solid ${
                        currentFeedback.isCorrect ? "fa-circle-check text-emerald-300" : "fa-triangle-exclamation text-rose-300"
                      }`}
                    ></i>
                    <span>{currentFeedback.text}</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/10 text-[11px] leading-relaxed mb-2">
                    {currentFeedback.explain}
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    {!currentFeedback.isCorrect ? (
                      <button
                        onClick={handleRetryCurrentQuestion}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <i className="fa-solid fa-rotate-left text-[10px]"></i>
                        <span>Thử lại câu hỏi này</span>
                      </button>
                    ) : (
                      activeQIndex < 2 && (
                        <button
                          onClick={() => {
                            setActiveQIndex((prev) => prev + 1);
                            setCurrentFeedback(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>Sang câu tiếp theo ({activeQIndex + 2}/3)</span>
                          <i className="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PRIMARY USER ACTION: NÚT NHẬN DẤU (ĐÓNG DẤU HỘ CHIẾU) */}
            <div className="pt-1 space-y-1.5">
              {isStamped ? (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border border-emerald-400/80 text-center space-y-1 shadow-lg">
                  <div className="text-emerald-300 font-black text-xs flex items-center justify-center gap-1.5">
                    <i className="fa-solid fa-stamp text-amber-300 text-sm"></i>
                    <span>HỘ CHIẾU ĐÃ CẤP DẤU CHỨNG NHẬN DI SẢN</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Học viên đã hoàn thành xuất sắc toàn bộ 3/3 câu hỏi nghiệp vụ tại {province.name}.
                  </p>
                </div>
              ) : isAllCorrect ? (
                /* ĐÚNG TOÀN BỘ 3/3: NÚT NHẬN DẤU SÁNG RỰC VÀ BẤM ĐƯỢC */
                <div className="space-y-1.5">
                  <button
                    onClick={handleClaimStamp}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform active:scale-95 animate-pulse cursor-pointer border border-emerald-300"
                  >
                    <i className="fa-solid fa-stamp text-sm"></i>
                    <span>NHẬN DẤU HỘ CHIẾU DI SẢN (3/3 ĐÚNG)</span>
                  </button>
                  <p className="text-[10px] text-center text-emerald-300 font-semibold">
                    🎉 Tuyệt vời! Bạn đã trả lời đúng cả 3/3 câu hỏi. Bấm nút trên để đóng dấu vào Hộ chiếu!
                  </p>
                </div>
              ) : (
                /* CHƯA ĐÚNG TOÀN BỘ / TRẢ LỜI SAI: NÚT NHẬN DẤU KHÔNG ẤN ĐƯỢC */
                <div className="space-y-1">
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-500 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed opacity-60 shadow-inner"
                    title="Cần trả lời đúng cả 3 câu hỏi để kích hoạt nút Nhận dấu"
                  >
                    <i className="fa-solid fa-lock text-[11px]"></i>
                    <span>Nhận dấu (Cần đúng 3/3 câu • Hiện tại: {correctCount}/3)</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    {hasWrongAnswer ? (
                      <span className="text-rose-300">
                        ⚠️ Có câu chưa đúng. Hãy bấm 'Thử lại câu hỏi này' để hoàn thành đúng cả 3 câu.
                      </span>
                    ) : (
                      <span>🔒 Nút Nhận dấu đang khóa: Trả lời đúng toàn bộ 3 câu hỏi để mở khóa nút.</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Dedicated Northern Hanoi Female Tour Guide Voice Bar */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-[11px] bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-700/80">
          <div className="flex items-center gap-1.5 text-pink-300 font-bold min-w-0">
            <i className="fa-solid fa-headset text-pink-400 shrink-0"></i>
            <span className="truncate text-[10px]">🎙️ Nữ HDV Hà Nội (Chuẩn Tiếng Việt)</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={voiceSpeed}
              onChange={(e) => onChangeVoiceSpeed(parseFloat(e.target.value))}
              className="bg-slate-800 text-cyan-300 font-bold px-1.5 py-0.5 rounded border border-slate-600 focus:outline-none text-[10px]"
              title="Tốc độ đọc giọng Hà Nội"
            >
              <option value={0.92}>0.9x</option>
              <option value={0.98}>1.0x</option>
              <option value={1.06}>1.1x</option>
            </select>
            <label
              className="flex items-center gap-1 cursor-pointer text-[10px] text-slate-300 hover:text-white"
              title="Tự động thuyết minh giọng Hà Nội khi đến tỉnh mới"
            >
              <input
                type="checkbox"
                checked={autoNarrate}
                onChange={(e) => onToggleAutoNarrate(e.target.checked)}
                className="accent-pink-500 rounded cursor-pointer"
              />
              <span>Tự động</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          <button
            onClick={onStartVoice}
            className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg transition ${
              isSpeaking
                ? "bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400 animate-pulse"
                : "bg-gradient-to-r from-pink-600/90 to-cyan-600/90 hover:from-pink-500 hover:to-cyan-500 border-pink-400/40"
            }`}
          >
            <i className={`fa-solid ${isSpeaking ? "fa-volume-high" : "fa-microphone-lines"}`}></i>
            <span className="truncate">
              {isSpeaking ? "Đang thuyết minh (Nữ Hà Nội)..." : "Thuyết minh (Nữ HDV Hà Nội)"}
            </span>
          </button>
          {isSpeaking && (
            <button
              onClick={onStopVoice}
              className="py-2 px-2.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/50 text-rose-200 text-xs font-bold transition shrink-0"
              title="Dừng thuyết minh"
            >
              <i className="fa-solid fa-stop"></i>
            </button>
          )}
          <button
            onClick={() => setActiveTab("quiz")}
            className="py-2 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition shrink-0"
          >
            <i className="fa-solid fa-award mr-1"></i>Nhận dấu
          </button>
        </div>
      </div>
    </aside>
  );
};
