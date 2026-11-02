import React, { useState, useEffect } from "react";
import { Province, PROVINCES_34 } from "../data/provincesData";
import { triggerStampCelebration } from "../utils/confetti";
import { audioEngine } from "../services/audioEngine";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stampedProvinces: Set<string>;
  onSelectProvince: (p: Province) => void;
  onUnlockAllDemo: () => void;
  onAwardStamp?: (provinceId: string) => void;
  onRemoveStamp: (provinceId: string) => void;
  onClearAllStamps: () => void;
  onAnswerQuizDirect?: (prov: Province, selectedIdx: number) => { isCorrect: boolean; explain: string };
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  stampedProvinces,
  onSelectProvince,
  onUnlockAllDemo,
  onAwardStamp,
  onRemoveStamp,
  onClearAllStamps,
}) => {
  const [activeProvince, setActiveProvince] = useState<Province | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  // 3-Question Stepper State for the selected province
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [questionResults, setQuestionResults] = useState<Record<number, boolean | null>>({});
  const [currentFeedback, setCurrentFeedback] = useState<{
    isCorrect: boolean;
    text: string;
    explain: string;
  } | null>(null);

  // Reset quiz states when inspecting a different province
  useEffect(() => {
    setActiveQIndex(0);
    setSelectedAnswers({});
    setQuestionResults({});
    setCurrentFeedback(null);
  }, [activeProvince?.id]);

  if (!isOpen) return null;

  const count = stampedProvinces.size;
  let rank = "Hướng dẫn viên Tập sự";
  if (count >= 34) rank = "🏆 Đại sứ Tuyến điểm Du lịch Việt Nam (34/34 Xuất sắc)";
  else if (count >= 20) rank = "🌟 Chuyên gia Điều hành Tour Xuyên Việt";
  else if (count >= 10) rank = "🧭 Lữ hành gia Chuyên nghiệp";

  const handleOpenProvinceDetail = (p: Province) => {
    setActiveProvince(p);
  };

  const questions = activeProvince
    ? activeProvince.questions && activeProvince.questions.length === 3
      ? activeProvince.questions
      : [activeProvince.quiz, activeProvince.quiz, activeProvince.quiz]
    : [];

  const correctCount = [0, 1, 2].filter((i) => questionResults[i] === true).length;
  const hasWrongAnswer = [0, 1, 2].some((i) => questionResults[i] === false);
  const isAllCorrect = correctCount === 3;

  const currentQ = questions[activeQIndex];
  const currentSelectedOpt = selectedAnswers[activeQIndex] ?? null;
  const currentQResult = questionResults[activeQIndex] ?? null;

  const handleSelectOptionInModal = (optIdx: number) => {
    if (!currentQ || !activeProvince) return;
    const isCorrect = optIdx === currentQ.ans;

    setSelectedAnswers((prev) => ({ ...prev, [activeQIndex]: optIdx }));
    setQuestionResults((prev) => ({ ...prev, [activeQIndex]: isCorrect }));

    if (isCorrect) {
      audioEngine.playSfx("stamp");
      setCurrentFeedback({
        isCorrect: true,
        text: `✓ Chính xác câu hỏi ${activeQIndex + 1}/3!`,
        explain: currentQ.explain,
      });
    } else {
      audioEngine.playSfx("wrong");
      setCurrentFeedback({
        isCorrect: false,
        text: "😢 Rất tiếc, câu trả lời chưa chính xác! Bạn cần trả lời đúng cả 3 câu để mở khóa nút Nhận dấu. Đừng nản lòng nhé!",
        explain: currentQ.explain,
      });
    }
  };

  const handleRetryCurrentQuestionInModal = () => {
    setSelectedAnswers((prev) => ({ ...prev, [activeQIndex]: null }));
    setQuestionResults((prev) => ({ ...prev, [activeQIndex]: null }));
    setCurrentFeedback(null);
  };

  const handleClaimStampInModal = () => {
    if (!activeProvince || !isAllCorrect) return;
    audioEngine.playSfx("fireworks");
    audioEngine.playSfx("stamp");
    triggerStampCelebration();
    onAwardStamp?.(activeProvince.id);
  };

  const handleRemoveStampForCurrent = (provId: string) => {
    audioEngine.playSfx("click");
    onRemoveStamp(provId);
    setSelectedAnswers({});
    setQuestionResults({});
    setCurrentFeedback(null);
  };

  const handleFlyToFromModal = (p: Province) => {
    onSelectProvince(p);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <div className="bg-[#09182f] rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-amber-400/50 shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-amber-900/50 via-slate-900 to-cyan-900/50 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-400 flex items-center justify-center text-amber-300 text-2xl shadow-lg">
              <i className="fa-solid fa-passport"></i>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-extrabold text-white tracking-wide flex items-center gap-2">
                <span>HỘ CHIẾU DI SẢN DU LỊCH 34 TỈNH THÀNH</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                  {count}/34 Dấu
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Thi 3 câu hỏi nghiệp vụ tuyến điểm du lịch để mở khóa và nhận con dấu di sản
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700 cursor-pointer"
            title="Đóng Hộ chiếu"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Status Bar & Global Actions */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-slate-400">Tiến độ thu thập:</span>{" "}
              <strong className="text-amber-300 text-sm font-black">{count} / 34 Tỉnh</strong>
            </div>
            <div>
              <span className="text-slate-400">Danh hiệu:</span>{" "}
              <strong className="text-cyan-300 font-bold">{rank}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {confirmClearAll ? (
              <div className="flex items-center gap-1.5 bg-rose-950/90 border border-rose-500/80 px-2.5 py-1 rounded-xl">
                <span className="text-rose-200 text-[11px] font-bold">Xác nhận xóa hết 34 dấu?</span>
                <button
                  onClick={() => {
                    onClearAllStamps();
                    setConfirmClearAll(false);
                  }}
                  className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold text-[10px] cursor-pointer"
                >
                  Xóa
                </button>
                <button
                  onClick={() => setConfirmClearAll(false)}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold text-[10px] cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClearAll(true)}
                disabled={count === 0}
                className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-semibold transition flex items-center gap-1.5 ${
                  count > 0
                    ? "bg-slate-800 hover:bg-rose-950/80 text-rose-300 border-rose-500/40 cursor-pointer"
                    : "bg-slate-800/40 text-slate-500 border-slate-700/40 cursor-not-allowed"
                }`}
                title="Xóa toàn bộ các dấu đóng đã nhận để làm lại từ đầu"
              >
                <i className="fa-solid fa-trash-can text-[10px]"></i>
                <span>Xóa tất cả đóng dấu</span>
              </button>
            )}

            <button
              onClick={onUnlockAllDemo}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-400/40 font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Mở khóa mẫu 34 dấu</span>
            </button>
          </div>
        </div>

        {/* Main Body: Grid on Left/Center, Inspection Drawer on Right if active */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* 34 Province Stamp Cards Grid */}
          <div
            className={`p-4 md:p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 transition-all ${
              activeProvince ? "md:w-3/5 border-r border-slate-800" : "w-full"
            }`}
          >
            {PROVINCES_34.map((p) => {
              const isStamped = stampedProvinces.has(p.id);
              const isCurrent = activeProvince?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleOpenProvinceDetail(p)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between relative group ${
                    isCurrent
                      ? "ring-2 ring-amber-400 bg-amber-950/40 border-amber-400"
                      : isStamped
                      ? "bg-emerald-950/60 border-emerald-400/70 shadow-lg shadow-emerald-500/10 hover:border-emerald-300"
                      : "bg-slate-900/60 border-slate-700/70 opacity-75 hover:opacity-100 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-extrabold px-1.5 py-0.5 rounded text-slate-950 shadow-sm"
                      style={{ background: p.color }}
                    >
                      #{String(p.stt).padStart(2, "0")}
                    </span>
                    {isStamped ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-400 text-xs shadow-inner">
                        <i className="fa-solid fa-stamp"></i>
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-[10px]">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5">
                    <div className="text-xs font-black text-white group-hover:text-amber-300 transition truncate">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {p.hubs.map((h) => h.name).join(" • ")}
                    </div>
                    <div className="mt-1 text-[9px] font-bold">
                      {isStamped ? (
                        <span className="text-emerald-400">✓ Đã đóng dấu</span>
                      ) : (
                        <span className="text-slate-500">Chưa nhận dấu</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Inspector & Quiz Panel when a province is clicked */}
          {activeProvince && (
            <div className="md:w-2/5 p-4 md:p-5 overflow-y-auto bg-slate-950/95 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded text-slate-950"
                      style={{ background: activeProvince.color }}
                    >
                      ĐƠN VỊ #{String(activeProvince.stt).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-black text-white">{activeProvince.name.toUpperCase()}</h3>
                  </div>
                  <button
                    onClick={() => setActiveProvince(null)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800 cursor-pointer"
                  >
                    Đóng <i className="fa-solid fa-xmark ml-1"></i>
                  </button>
                </div>

                {stampedProvinces.has(activeProvince.id) ? (
                  /* Stamped Province Card with Delete Stamp Option */
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border-2 border-emerald-400/60 shadow-xl text-center relative overflow-hidden">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 text-3xl shadow-inner">
                        <i className="fa-solid fa-stamp"></i>
                      </div>
                      <h4 className="text-sm font-black text-emerald-200 uppercase tracking-wider">
                        CHỨNG NHẬN DI SẢN ĐÃ CẤP DẤU
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Học viên đã hoàn thành xuất sắc toàn bộ 3/3 câu hỏi nghiệp vụ tuyến điểm tại {activeProvince.name}.
                      </p>

                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-1">
                        <div className="text-[11px] font-bold text-amber-300">
                          {activeProvince.quiz.q}
                        </div>
                        <div className="text-emerald-300 font-bold flex items-center gap-1.5 text-xs">
                          <i className="fa-solid fa-circle-check"></i>
                          <span>Đáp án chuẩn: {activeProvince.quiz.options[activeProvince.quiz.ans]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemoveStampForCurrent(activeProvince.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/70 text-rose-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
                        title="Xóa dấu để thi lại"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                        <span>Xóa đóng dấu tỉnh này</span>
                      </button>
                      <button
                        onClick={() => handleFlyToFromModal(activeProvince)}
                        className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
                      >
                        <i className="fa-solid fa-plane-departure"></i>
                        <span>Bay đến trên 3D</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Unstamped: Interactive 3-Question Stepper Quiz inside Modal */
                  <div className="space-y-3">
                    <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-amber-400/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 flex items-center gap-1">
                          <i className="fa-solid fa-graduation-cap"></i>
                          <span>THI NGHIỆP VỤ NHẬN DẤU</span>
                        </span>
                        <span className="text-[10px] font-bold text-cyan-300">
                          Đã đúng: {correctCount}/3 câu
                        </span>
                      </div>

                      {/* 3 Step Tabs */}
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
                              className={`py-1 px-1.5 rounded-lg font-bold text-center transition flex items-center justify-center gap-1 ${
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

                      {currentQ && (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                            <span>Câu hỏi {activeQIndex + 1} trên 3:</span>
                            {currentQResult === true && <span className="text-emerald-400 font-bold">✓ Đã đúng</span>}
                            {currentQResult === false && <span className="text-rose-400 font-bold">✗ Chưa đúng</span>}
                          </div>

                          <p className="text-xs font-bold text-white leading-relaxed bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                            {currentQ.q}
                          </p>

                          {/* 4 Choices */}
                          <div className="space-y-1.5">
                            {currentQ.options.map((opt, optIdx) => {
                              const isSelected = currentSelectedOpt === optIdx;
                              const isAnswered = currentQResult !== null;
                              const isThisCorrect = optIdx === currentQ.ans;

                              let btnStyle = "bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200";
                              if (isAnswered) {
                                if (isThisCorrect) {
                                  btnStyle = "bg-emerald-950/90 border-emerald-400 text-emerald-200 font-bold";
                                } else if (isSelected && !isThisCorrect) {
                                  btnStyle = "bg-rose-950/90 border-rose-500 text-rose-200";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={isAnswered}
                                  onClick={() => handleSelectOptionInModal(optIdx)}
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

                          {/* Feedback & Retry */}
                          {currentFeedback && (
                            <div
                              className={`p-2.5 rounded-xl text-xs border leading-relaxed shadow ${
                                currentFeedback.isCorrect
                                  ? "bg-emerald-950/90 border-emerald-400 text-emerald-200"
                                  : "bg-rose-950/90 border-rose-400 text-rose-200"
                              }`}
                            >
                              <div className="font-bold mb-1 flex items-center gap-1.5">
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
                                    onClick={handleRetryCurrentQuestionInModal}
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
                      )}

                      {/* PRIMARY ACTION BUTTON: NÚT NHẬN DẤU (ĐÓNG DẤU) */}
                      <div className="pt-2 border-t border-slate-800 space-y-1.5">
                        {isAllCorrect ? (
                          /* TRẢ LỜI ĐÚNG TOÀN BỘ 3/3: NÚT NHẬN DẤU SÁNG RỰC VÀ BẤM ĐƯỢC */
                          <div className="space-y-1">
                            <button
                              onClick={handleClaimStampInModal}
                              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform active:scale-95 animate-pulse cursor-pointer border border-emerald-300"
                            >
                              <i className="fa-solid fa-stamp text-sm"></i>
                              <span>NHẬN DẤU HỘ CHIẾU DI SẢN (3/3 ĐÚNG)</span>
                            </button>
                            <p className="text-[10px] text-center text-emerald-300 font-semibold">
                              🎉 Đã hoàn thành đúng 3/3 câu! Hãy bấm nút trên để nhận con dấu di sản.
                            </p>
                          </div>
                        ) : (
                          /* CHƯA ĐÚNG TOÀN BỘ HOẶC TRẢ LỜI SAI: NÚT KHÔNG ẤN ĐƯỢC */
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
                                <span>🔒 Nút Nhận dấu đang khóa: Trả lời đúng cả 3 câu để mở khóa nút.</span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleFlyToFromModal(activeProvince)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <i className="fa-solid fa-plane-departure"></i>
                      <span>Bay đến sa bàn 3D {activeProvince.name} để học thông tin</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
