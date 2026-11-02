import { useEffect, useRef, useState } from "react";
import { Province, PROVINCES_34, TOUR_CHALLENGES } from "./data/provincesData";
import { audioEngine, MusicStyle } from "./services/audioEngine";
import { tourGuideVoice, TourGuideState } from "./services/tourGuideVoice";
import { ThreeSceneManager, LabelItem } from "./three/ThreeSceneManager";
import { getRouteHighwayInfo } from "./utils/routeHighwayHelper";
import { HeaderBar } from "./components/HeaderBar";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { ChallengePanel } from "./components/ChallengePanel";
import { PassportModal } from "./components/PassportModal";
import { LabelsOverlay } from "./components/LabelsOverlay";
import { HoverTooltip } from "./components/HoverTooltip";
import { ZenControlDock } from "./components/ZenControlDock";
import { MapNavController } from "./components/MapNavController";

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<ThreeSceneManager | null>(null);

  // Core Application State
  const [currentLocation, setCurrentLocation] = useState<Province>(PROVINCES_34[11]); // Hà Nội (STT 12)
  const [selectedProvince, setSelectedProvince] = useState<Province>(PROVINCES_34[8]); // Quảng Ninh (STT 09)
  const [originProvince, setOriginProvince] = useState<Province>(PROVINCES_34[11]);
  const [destinationProvince, setDestinationProvince] = useState<Province>(PROVINCES_34[8]);
  const [transportMode, setTransportMode] = useState<"road" | "air" | "water">("road");
  const [chaseCamera, setChaseCamera] = useState(false);
  const [dragMode, setDragMode] = useState<"pan" | "rotate">("rotate");

  // UI Panels Visibility (collapsible to avoid blocking the 3D map)
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [labels, setLabels] = useState<LabelItem[]>([]);

  // Hover Tooltip State
  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  // Telemetry
  const [travelProgress, setTravelProgress] = useState({
    active: false,
    percent: 0,
    routeText: "",
    distanceKm: 0,
    statusText: "",
  });

  // Game & Challenge Modes
  const [gameMode, setGameMode] = useState<"explore" | "challenge">("explore");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeSelectedIds, setChallengeSelectedIds] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);

  // Heritage Passport
  const [stampedProvinces, setStampedProvinces] = useState<Set<string>>(new Set(["VN-09", "VN-12"]));
  const [passportModalOpen, setPassportModalOpen] = useState(false);

  // Audio Music & Tour Guide Voice - Featured: Xin Chào Việt Nam (Không Lời)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicStyle, setMusicStyle] = useState<MusicStyle>("xinchao");
  const [voiceSpeed, setVoiceSpeed] = useState(0.98);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const [guideState, setGuideState] = useState<TourGuideState>({
    isSpeaking: false,
    provinceName: "",
  });
  const [celebrationModalData, setCelebrationModalData] = useState<{
    provinceName: string;
    totalCount: number;
  } | null>(null);

  // Master Toggle to Collapse or Open all panels
  const handleToggleAllPanels = () => {
    if (showLeftPanel || showRightPanel) {
      setShowLeftPanel(false);
      setShowRightPanel(false);
    } else {
      setShowLeftPanel(true);
      setShowRightPanel(true);
    }
  };

  // Reference to always call the latest click callback without stale closure issues
  const onProvinceClickRef = useRef<(prov: Province) => void>(() => {});

  // Toggle province selection in challenge mode
  const handleToggleChallengeProvince = (provId: string) => {
    audioEngine.playSfx("click");
    setChallengeFeedback(null);
    const prov = PROVINCES_34.find((p) => p.id === provId);
    if (prov) {
      setSelectedProvince(prov);
    }

    setChallengeSelectedIds((prev) => {
      let next: string[];
      if (prev.includes(provId)) {
        // Deselect if already selected
        next = prev.filter((id) => id !== provId);
      } else {
        if (prev.length >= 3) {
          // Replace last item or keep up to 3
          next = [...prev.slice(0, 2), provId];
        } else {
          next = [...prev, provId];
        }
      }

      // If we have at least 2 in sequence, animate journey between the last two
      if (next.length >= 2) {
        const pA = PROVINCES_34.find((x) => x.id === next[next.length - 2]);
        const pB = PROVINCES_34.find((x) => x.id === next[next.length - 1]);
        if (pA && pB) {
          sceneManagerRef.current?.launchJourney(pA, pB, transportMode);
        }
      }
      return next;
    });
  };

  // General province click handler for both Explore and Challenge modes
  const handleProvinceClick = (prov: Province) => {
    if (gameMode === "challenge") {
      handleToggleChallengeProvince(prov.id);
    } else {
      audioEngine.playSfx("click");
      setSelectedProvince(prov);
      setDestinationProvince(prov);
      sceneManagerRef.current?.setSelectedProvince(prov.id, true);
    }
  };

  // Keep onProvinceClickRef updated with latest state
  useEffect(() => {
    onProvinceClickRef.current = (prov: Province) => {
      handleProvinceClick(prov);
    };
  });

  // Sync 3D challenge highlights whenever challengeSelectedIds or gameMode changes
  useEffect(() => {
    if (gameMode === "challenge") {
      sceneManagerRef.current?.setChallengeSelectedProvinces(challengeSelectedIds);
    }
  }, [challengeSelectedIds, gameMode]);

  // Keyboard shortcut: Press 'H' to toggle panels, 'T' to toggle toolbar
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "h" || e.key === "H") {
        handleToggleAllPanels();
      }
      if (e.key === "t" || e.key === "T") {
        setIsHeaderCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showLeftPanel, showRightPanel]);

  // Initialize Three.js Scene once on mount
  useEffect(() => {
    if (!mountRef.current) return;

    const manager = new ThreeSceneManager(mountRef.current);
    sceneManagerRef.current = manager;

    // Set initial selection highlight
    manager.setSelectedProvince("VN-09", false);

    // Callbacks
    manager.onProvinceHover = (prov, screenPos) => {
      setHoveredProvince(prov);
      setHoverPosition(screenPos);
    };

    manager.onProvinceClick = (prov) => {
      onProvinceClickRef.current(prov);
    };

    manager.onTravelProgress = (progress, distanceKm) => {
      setTravelProgress((prev) => ({
        ...prev,
        percent: Math.min(100, Math.round(progress * 100)),
        distanceKm,
      }));
    };

    manager.onTravelComplete = (dest) => {
      audioEngine.playSfx("click");
      setCurrentLocation(dest);
      setOriginProvince(dest);
      setSelectedProvince(dest);
      manager.setSelectedProvince(dest.id, false);

      setTravelProgress({
        active: false,
        percent: 100,
        routeText: "",
        distanceKm: 0,
        statusText: `Đã đến ${dest.name}!`,
      });

      if (autoNarrate && gameMode === "explore") {
        setTimeout(() => {
          tourGuideVoice.speak(dest, true);
        }, 350);
      }
    };

    manager.onLabelsUpdate = (updatedLabels) => {
      setLabels(updatedLabels);
    };

    // Subscribe to Tour Guide state
    const unsubscribeGuide = tourGuideVoice.subscribe((st) => {
      setGuideState(st);
    });

    return () => {
      unsubscribeGuide();
      manager.dispose();
      tourGuideVoice.stop();
    };
  }, []);

  // Update chase camera in 3D manager
  const handleToggleChaseCamera = () => {
    const next = !chaseCamera;
    setChaseCamera(next);
    sceneManagerRef.current?.setChaseCamera(next);
  };

  // Select Province from UI
  const handleSelectProvince = (prov: Province) => {
    handleProvinceClick(prov);
  };

  // Launch travel from UI
  const handleStartJourney = () => {
    if (!originProvince || !destinationProvince) return;
    audioEngine.playSfx("depart");

    const routeHwy = getRouteHighwayInfo(originProvince, destinationProvince, transportMode);

    setTravelProgress({
      active: true,
      percent: 0,
      routeText: `${originProvince.name} ➔ ${destinationProvince.name}`,
      distanceKm: 0,
      statusText: `${routeHwy.roadName}: Đang di chuyển...`,
    });

    sceneManagerRef.current?.launchJourney(originProvince, destinationProvince, transportMode);
  };

  // Quick travel to specific province
  const handleQuickTravelTo = (destProv: Province) => {
    setDestinationProvince(destProv);
    setSelectedProvince(destProv);
    audioEngine.playSfx("depart");

    const routeHwy = getRouteHighwayInfo(originProvince, destProv, transportMode);

    setTravelProgress({
      active: true,
      percent: 0,
      routeText: `${originProvince.name} ➔ ${destProv.name}`,
      distanceKm: 0,
      statusText: `${routeHwy.roadName}: Khởi hành đến ${destProv.name}...`,
    });

    sceneManagerRef.current?.launchJourney(originProvince, destProv, transportMode);
  };

  // Switch Game Mode
  const handleSwitchGameMode = (mode: "explore" | "challenge") => {
    setGameMode(mode);
    setChallengeFeedback(null);
    if (mode === "challenge") {
      setChallengeSelectedIds([]);
      sceneManagerRef.current?.resetOverview();
      sceneManagerRef.current?.setChallengeSelectedProvinces([]);
    } else {
      sceneManagerRef.current?.setSelectedProvince(selectedProvince.id, false);
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % TOUR_CHALLENGES.length);
    setChallengeSelectedIds([]);
    setChallengeFeedback(null);
  };

  // Previous Challenge
  const handlePrevChallenge = () => {
    setChallengeIndex((prev) => (prev - 1 + TOUR_CHALLENGES.length) % TOUR_CHALLENGES.length);
    setChallengeSelectedIds([]);
    setChallengeFeedback(null);
  };

  // Jump to specific Challenge by index
  const handleSelectChallengeIndex = (idx: number) => {
    setChallengeIndex(idx);
    setChallengeSelectedIds([]);
    setChallengeFeedback(null);
  };

  // Verify Challenge Route
  const handleVerifyChallenge = () => {
    const ch = TOUR_CHALLENGES[challengeIndex];
    if (!ch) return;

    if (challengeSelectedIds.length < ch.targetIds.length) {
      audioEngine.playSfx("click");
      setChallengeFeedback({
        isSuccess: false,
        text: `⚠️ Bạn mới chọn ${challengeSelectedIds.length}/${ch.targetIds.length} tỉnh. Tuyến này cần chọn đủ 3 tỉnh/thành: ${ch.targetNames.join(" ➔ ")}.`,
      });
      return;
    }

    const hasAllTargets =
      ch.targetIds.length === challengeSelectedIds.length &&
      ch.targetIds.every((id) => challengeSelectedIds.includes(id));

    const isExactOrder =
      hasAllTargets &&
      ch.targetIds.every((id, idx) => challengeSelectedIds[idx] === id);

    if (hasAllTargets) {
      audioEngine.playSfx("stamp");
      setStampedProvinces((prev) => {
        const next = new Set(prev);
        ch.targetIds.forEach((id) => next.add(id));
        return next;
      });
      const orderNote = isExactOrder
        ? "Đúng thứ tự hành trình tối ưu nhất!"
        : "Đã chọn chính xác đầy đủ 3 tỉnh thành trong cụm!";
      setChallengeFeedback({
        isSuccess: true,
        text: `🎉 Tuyệt vời! ${orderNote} Tuyến [${ch.targetNames.join(
          " ➔ "
        )}] đã được nghiệm thu và đóng dấu chứng nhận Hộ chiếu cho cả 3 tỉnh!`,
      });
    } else {
      audioEngine.playSfx("click");
      setChallengeFeedback({
        isSuccess: false,
        text: `💡 Chưa chính xác. Lộ trình chuẩn của đề bài: ${ch.targetNames.join(" ➔ ")}. Hãy bấm vào tỉnh để bỏ chọn hoặc chọn lại!`,
      });
    }
  };

  // Answer Quiz directly for any province (Pure validation - Does NOT award stamps until all 3 are completed)
  const handleAnswerQuizDirect = (prov: Province, idx: number) => {
    const isCorrect = idx === prov.quiz.ans;
    if (isCorrect) {
      audioEngine.playSfx("click");
    } else {
      audioEngine.playSfx("wrong");
    }
    return {
      isCorrect,
      explain: prov.quiz.explain,
    };
  };

  // Award stamp for a specific province (Called ONLY after all 3/3 questions are answered correctly)
  const handleAwardStamp = (provinceId: string) => {
    const prov = PROVINCES_34.find((p) => p.id === provinceId);
    setStampedProvinces((prev) => {
      const next = new Set(prev).add(provinceId);
      if (prov) {
        setCelebrationModalData({
          provinceName: prov.name,
          totalCount: next.size,
        });
      }
      return next;
    });
  };

  // Remove stamp for a specific province
  const handleRemoveStamp = (provinceId: string) => {
    audioEngine.playSfx("click");
    setCelebrationModalData(null);
    setStampedProvinces((prev) => {
      const next = new Set(prev);
      next.delete(provinceId);
      return next;
    });
  };

  // Clear all stamps to start over
  const handleClearAllStamps = () => {
    audioEngine.playSfx("click");
    setStampedProvinces(new Set());
  };

  // Unlock all stamps for demo/teacher presentation
  const handleUnlockAllDemo = () => {
    audioEngine.playSfx("stamp");
    audioEngine.playSfx("fireworks");
    const all = new Set(PROVINCES_34.map((p) => p.id));
    setStampedProvinces(all);
  };

  const areAllPanelsHidden = !showLeftPanel && !showRightPanel;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040d1a] text-slate-100 select-none">
      {/* 3D WebGL Canvas Ref Mount */}
      <div id="canvas-container" ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 3D Projected Floating HTML Labels */}
      <LabelsOverlay
        labels={labels}
        showLabels={showLabels}
        selectedProvinceId={selectedProvince.id}
        challengeSelectedIds={gameMode === "challenge" ? challengeSelectedIds : []}
        onSelectProvince={(provId) => {
          const p = PROVINCES_34.find((x) => x.id === provId);
          if (p) handleProvinceClick(p);
        }}
      />

      {/* Hover Tooltip */}
      <HoverTooltip
        province={hoveredProvince}
        position={hoverPosition}
        isStamped={hoveredProvince ? stampedProvinces.has(hoveredProvince.id) : false}
      />

      {/* Top Header & Master Controls */}
      <HeaderBar
        isCollapsed={isHeaderCollapsed}
        onToggleCollapse={() => setIsHeaderCollapsed((prev) => !prev)}
        gameMode={gameMode}
        onSwitchGameMode={handleSwitchGameMode}
        onOpenPassport={() => setPassportModalOpen(true)}
        passportCount={stampedProvinces.size}
        isMusicPlaying={isMusicPlaying}
        musicStyle={musicStyle}
        onToggleMusic={() => {
          const playing = audioEngine.toggleMusic();
          setIsMusicPlaying(playing);
        }}
        onChangeMusicStyle={(st) => {
          setMusicStyle(st);
          audioEngine.setStyle(st);
          setIsMusicPlaying(true);
        }}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels((prev) => !prev)}
        onResetOverview={() => sceneManagerRef.current?.resetOverview()}
        showLeftPanel={showLeftPanel}
        onToggleLeftPanel={() => setShowLeftPanel((prev) => !prev)}
        showRightPanel={showRightPanel}
        onToggleRightPanel={() => setShowRightPanel((prev) => !prev)}
        onToggleAllPanels={handleToggleAllPanels}
      />

      {/* Floating Edge Re-open Tab (Left Edge) when Left Panel is Collapsed */}
      {!showLeftPanel && (
        <button
          onClick={() => setShowLeftPanel(true)}
          className={`fixed left-3 z-20 px-2.5 py-1.5 rounded-xl bg-[#09182f]/94 border border-cyan-400/50 text-cyan-200 text-xs font-bold shadow-2xl hover:bg-cyan-600/30 flex items-center gap-1.5 transition-all transform hover:translate-x-1 ${
            isHeaderCollapsed ? "top-3" : "top-14"
          }`}
          title="Mở Bảng Điều hành Lộ trình & 34 Tỉnh Thành"
        >
          <i className="fa-solid fa-map-location-dot text-amber-300"></i>
          <span>34 Tỉnh Thành</span>
          <i className="fa-solid fa-chevron-right text-[10px] text-cyan-400"></i>
        </button>
      )}

      {/* Floating Edge Re-open Tab (Right Edge) when Right Panel is Collapsed */}
      {!showRightPanel && (
        <button
          onClick={() => setShowRightPanel(true)}
          className={`fixed right-3 z-20 px-2.5 py-1.5 rounded-xl bg-[#09182f]/94 border border-pink-400/50 text-pink-200 text-xs font-bold shadow-2xl hover:bg-pink-600/30 flex items-center gap-1.5 transition-all transform hover:-translate-x-1 ${
            isHeaderCollapsed ? "top-3" : "top-14"
          }`}
          title="Mở Bảng Thuyết minh HDV & Hồ sơ Chi tiết"
        >
          <i className="fa-solid fa-chevron-left text-[10px] text-pink-400"></i>
          <i className="fa-solid fa-headset text-pink-300"></i>
          <span>HDV & Hồ sơ</span>
        </button>
      )}

      {/* Left Sidebar: Transport Dispatcher & 34 Provinces Directory */}
      {showLeftPanel && (
        <LeftSidebar
          isHeaderCollapsed={isHeaderCollapsed}
          currentLocation={currentLocation}
          originProvince={originProvince}
          destinationProvince={destinationProvince}
          transportMode={transportMode}
          chaseCamera={chaseCamera}
          travelProgress={travelProgress}
          stampedProvinces={stampedProvinces}
          onSelectOrigin={setOriginProvince}
          onSelectDestination={(p) => {
            setDestinationProvince(p);
            setSelectedProvince(p);
            sceneManagerRef.current?.setSelectedProvince(p.id, true);
          }}
          onSelectTransportMode={setTransportMode}
          onToggleChaseCamera={handleToggleChaseCamera}
          onStartJourney={handleStartJourney}
          onSelectProvince={handleSelectProvince}
          onQuickTravelTo={handleQuickTravelTo}
          onClose={() => setShowLeftPanel(false)}
        />
      )}

      {/* Right Sidebar: Province Dossier & Tour Guide Controls */}
      {showRightPanel && (
        <RightSidebar
          isHeaderCollapsed={isHeaderCollapsed}
          province={selectedProvince}
          isStamped={stampedProvinces.has(selectedProvince.id)}
          isSpeaking={guideState.isSpeaking}
          voiceSpeed={voiceSpeed}
          autoNarrate={autoNarrate}
          onFlyToProvince={() => sceneManagerRef.current?.flyCameraToProvince(selectedProvince)}
          onAwardStamp={handleAwardStamp}
          onRemoveStamp={handleRemoveStamp}
          onStartVoice={() => tourGuideVoice.speak(selectedProvince, true)}
          onStopVoice={() => tourGuideVoice.stop()}
          onChangeVoiceSpeed={(spd) => {
            setVoiceSpeed(spd);
            tourGuideVoice.setSpeed(spd);
          }}
          onToggleAutoNarrate={(val) => {
            setAutoNarrate(val);
            tourGuideVoice.setAutoNarrate(val);
          }}
          onClose={() => setShowRightPanel(false)}
        />
      )}

      {/* Subtle discreet audio playing indicator (Zero subtitle text covering the screen) */}
      {guideState.isSpeaking && (
        <div className="fixed bottom-3.5 right-4 z-30 flex items-center gap-2 bg-[#09182f]/95 border border-pink-400/50 px-3 py-1.5 rounded-xl shadow-xl text-xs font-semibold text-pink-200">
          <i className="fa-solid fa-volume-high text-pink-400 animate-pulse"></i>
          <span>Nữ HDV Hà Nội: {guideState.provinceName}</span>
          <button
            onClick={() => tourGuideVoice.stop()}
            className="text-slate-400 hover:text-rose-400 ml-1 text-xs px-1 rounded bg-slate-800/80"
            title="Dừng thuyết minh"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4-Way Pan & Custom Drag Controller */}
      <MapNavController
        onPan={(dir, step) => sceneManagerRef.current?.panBy(dir, step)}
        onZoom={(factor) => sceneManagerRef.current?.zoomBy(factor)}
        onRotate={(deg) => sceneManagerRef.current?.rotateBy(deg)}
        onReset={() => sceneManagerRef.current?.resetOverview()}
        dragMode={dragMode}
        onToggleDragMode={(mode) => {
          setDragMode(mode);
          sceneManagerRef.current?.setDragMode(mode);
        }}
        showLeftPanel={showLeftPanel}
      />

      {/* Zen / Cinema Mode Floating Dock: Shown when both sidebars are collapsed to keep 3D view 100% clean */}
      {areAllPanelsHidden && gameMode === "explore" && (
        <ZenControlDock
          currentLocation={currentLocation}
          selectedProvince={selectedProvince}
          isSpeaking={guideState.isSpeaking}
          isMusicPlaying={isMusicPlaying}
          onSelectProvince={handleSelectProvince}
          onStartJourney={handleStartJourney}
          onToggleVoice={() => {
            if (guideState.isSpeaking) {
              tourGuideVoice.stop();
            } else {
              tourGuideVoice.speak(selectedProvince, true);
            }
          }}
          onToggleMusic={() => {
            const playing = audioEngine.toggleMusic();
            setIsMusicPlaying(playing);
          }}
          onResetOverview={() => sceneManagerRef.current?.resetOverview()}
          onOpenPanels={handleToggleAllPanels}
        />
      )}

      {/* Tour Builder Challenge Floating Dock */}
      {gameMode === "challenge" && (
        <ChallengePanel
          challengeIndex={challengeIndex}
          totalChallenges={TOUR_CHALLENGES.length}
          selectedIds={challengeSelectedIds}
          allProvinces={PROVINCES_34}
          feedback={challengeFeedback}
          onSelectChallengeIndex={handleSelectChallengeIndex}
          onNextChallenge={handleNextChallenge}
          onPrevChallenge={handlePrevChallenge}
          onToggleProvince={handleToggleChallengeProvince}
          onRemoveProvince={(id) => {
            audioEngine.playSfx("click");
            setChallengeSelectedIds((prev) => prev.filter((x) => x !== id));
            setChallengeFeedback(null);
          }}
          onClearSelection={() => {
            setChallengeSelectedIds([]);
            setChallengeFeedback(null);
          }}
          onVerifyChallenge={handleVerifyChallenge}
          onClose={() => handleSwitchGameMode("explore")}
        />
      )}

      {/* Heritage Passport Modal */}
      <PassportModal
        isOpen={passportModalOpen}
        onClose={() => setPassportModalOpen(false)}
        stampedProvinces={stampedProvinces}
        onSelectProvince={(p) => {
          setSelectedProvince(p);
          setDestinationProvince(p);
          sceneManagerRef.current?.setSelectedProvince(p.id, true);
        }}
        onUnlockAllDemo={handleUnlockAllDemo}
        onAwardStamp={handleAwardStamp}
        onRemoveStamp={handleRemoveStamp}
        onClearAllStamps={handleClearAllStamps}
        onAnswerQuizDirect={handleAnswerQuizDirect}
      />

      {/* Celebratory Fireworks Banner Modal when Passport Stamp is Granted (3/3 Questions Correct) */}
      {celebrationModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full bg-gradient-to-b from-slate-900 via-[#091b36] to-slate-950 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl shadow-amber-500/30 text-center relative overflow-hidden">
            {/* Background glowing sparkles */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="text-4xl mb-2">🎆 🎇 🏆</div>

            <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[11px] font-black uppercase tracking-wider mb-2">
              ★ CHÚC MỪNG CẤP DẤU HỘ CHIẾU THÀNH CÔNG ★
            </div>

            <h3 className="text-base md:text-lg font-black text-white mb-2">
              HOÀN THÀNH XUẤT SẮC 3/3 CÂU HỎI!
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Bạn đã trả lời đúng tuyệt đối toàn bộ 3 câu hỏi nghiệp vụ và được chính thức cấp con dấu Hộ chiếu Di sản tỉnh{" "}
              <strong className="text-amber-300 font-bold">{celebrationModalData.provinceName}</strong>.
            </p>

            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-5 flex items-center justify-around">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 text-lg shadow-inner">
                  <i className="fa-solid fa-stamp"></i>
                </span>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Chứng nhận</div>
                  <div className="text-xs font-black text-emerald-300">ĐÃ ĐÓNG DẤU ✓</div>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Hộ chiếu di sản</div>
                <div className="text-sm font-black text-amber-300">{celebrationModalData.totalCount}/34 TỈNH</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setCelebrationModalData(null);
                  setPassportModalOpen(true);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-passport"></i>
                <span>Mở Hộ Chiếu Xem Ngay</span>
              </button>
              <button
                onClick={() => setCelebrationModalData(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
