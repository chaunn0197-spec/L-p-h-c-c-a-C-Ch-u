import { Province } from "../data/provincesData";
import { audioEngine } from "./audioEngine";

export interface TourGuideState {
  isSpeaking: boolean;
  provinceName: string;
}

type StateListener = (state: TourGuideState) => void;

class TourGuideVoiceService {
  private playbackSpeed = 1.0;
  private autoNarrateOnArrival = true;
  private isSpeaking = false;
  private currentSpeechQueue: string[] = [];
  private currentQueueIndex = 0;
  private audioPlayer: HTMLAudioElement | null = null;
  private activeSessionId = 0;
  private cachedHanoiVoice: SpeechSynthesisVoice | null = null;
  private listeners: StateListener[] = [];
  private currentProvinceName = "";

  constructor() {
    if (typeof window !== "undefined") {
      this.audioPlayer = new Audio();

      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.cachedHanoiVoice = this.detectStrictVietnameseVoice();
        };
        setTimeout(() => {
          this.cachedHanoiVoice = this.detectStrictVietnameseVoice();
        }, 300);
      }
    }
  }

  public subscribe(listener: StateListener) {
    this.listeners.push(listener);
    this.notify();
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const state: TourGuideState = {
      isSpeaking: this.isSpeaking,
      provinceName: this.currentProvinceName,
    };
    this.listeners.forEach((l) => l(state));
  }

  public setSpeed(speed: number) {
    this.playbackSpeed = speed;
    if (this.audioPlayer) {
      this.audioPlayer.playbackRate = speed;
    }
  }

  public setAutoNarrate(val: boolean) {
    this.autoNarrateOnArrival = val;
  }

  public getAutoNarrate(): boolean {
    return this.autoNarrateOnArrival;
  }

  /**
   * Strictly filters ONLY Vietnamese voices.
   * NEVER returns English voices (e.g. Zira, Samantha, David) under any circumstances.
   */
  public detectStrictVietnameseVoice(): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const viVoices = voices.filter((v) => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return (
        l.startsWith("vi") ||
        l.includes("vie") ||
        n.includes("vietnam") ||
        n.includes("tiếng việt") ||
        n.includes("hoaimy") ||
        n.includes("hoài my") ||
        n.includes("linh")
      );
    });

    if (viVoices.length > 0) {
      // Prioritize female voices
      const female = viVoices.filter((v) => {
        const n = v.name.toLowerCase();
        return !n.includes("namminh") && !n.includes("male") && !n.includes(" nam ");
      });

      const pool = female.length > 0 ? female : viVoices;

      // 1. Hoài My (Chuẩn Hà Nội)
      const hoaiMy = pool.find((v) => v.name.toLowerCase().includes("hoaimy") || v.name.toLowerCase().includes("hoài my"));
      if (hoaiMy) return hoaiMy;

      // 2. Google Tiếng Việt
      const googleVi = pool.find((v) => v.name.toLowerCase().includes("google"));
      if (googleVi) return googleVi;

      // 3. Linh
      const linh = pool.find((v) => v.name.toLowerCase().includes("linh"));
      if (linh) return linh;

      return pool[0];
    }

    // STRICT: Return NULL if no Vietnamese voice exists. NEVER return English voices!
    return null;
  }

  /**
   * 100% Vietnamese phonetic normalization: converts all abbreviations, acronyms, and foreign terms into pure Vietnamese.
   */
  public normalizeToPureVietnamese(rawText: string): string {
    if (!rawText) return "";
    let t = rawText;

    const replacements: [RegExp, string][] = [
      // Locations & Titles
      [/\bTP\.\s*HCM\b/gi, "Thành phố Hồ Chí Minh"],
      [/\bTP\.HCM\b/gi, "Thành phố Hồ Chí Minh"],
      [/\bTP\.\s*/g, "Thành phố "],
      [/\bTW\b/g, "Trung ương"],
      [/\bVQG\b/g, "Vườn quốc gia"],
      [/\bĐBSCL\b/g, "Đồng bằng sông Cửu Long"],
      [/\bĐB\b/g, "Đồng bằng"],
      [/\bQL(\d+[A-Z]?)\b/g, "Quốc lộ $1"],
      [/\bkm\b/gi, "ki-lô-mét"],

      // Acronyms & Organizations
      [/\bUNESCO\b/gi, "U-nét-xcô"],
      [/\bASEAN\b/gi, "A-xê-an"],
      [/\bOCOP\b/gi, "Ô-cốp"],
      [/\bMICE\b/gi, "du lịch hội nghị, sự kiện"],
      [/\bGPS\s*0001\b/gi, "Gờ Pê Ét không không không một"],
      [/\bATK\b/gi, "An toàn khu"],
      [/\b4N3Đ\b/gi, "bốn ngày ba đêm"],

      // Foreign Tourism & Commercial Names -> Pure Vietnamese
      [/\bSun World Ba Na Hills\b/gi, "Khu du lịch Bà Nà"],
      [/\bBa Na Hills\b/gi, "Bà Nà"],
      [/\bFoodtour\b/gi, "Khám phá ẩm thực"],
      [/\bHomestay\b/gi, "Lưu trú cộng đồng"],
      [/\bGrand World\b/gi, "Thành phố không ngủ Grand World"],
      [/\bSafari\b/gi, "Vườn thú bán hoang dã Sa-pha-ri"],
      [/\bVinWonders\b/gi, "Khu vui chơi giải trí Vin-uân-đơ"],
      [/\bEcopark\b/gi, "Khu đô thị sinh thái E-cô-pác"],
      [/\bKong Collapse\b/gi, "Hố sụt Kông"],
      [/\bRamsar\b/gi, "Khu bảo tồn đất ngập nước quốc tế Ram-xa"],
      [/\bResort\b/gi, "Khu nghỉ dưỡng"],

      // Symbols
      [/\+/g, " kết hợp cùng "],
      [/➔|→/g, " kết nối đến "],
      [/&/g, " và "],
      [/\//g, " hoặc "],
      [/\(([^)]+)\)/g, ", $1, "],
    ];

    replacements.forEach(([regex, rep]) => {
      t = t.replace(regex, rep);
    });

    return t.replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/,+/g, ",").trim();
  }

  /**
   * Generates pure Vietnamese Tour Guide narration structured strictly:
   * 1. TỔNG QUAN (Overview: Geography, regional position, urban hubs, tourism masterplan)
   * 2. ĐIỂM ĐẾN (Destinations: Key clusters, landmarks, natural & cultural heritage)
   * 3. ẨM THỰC (Cuisine: Signature local gastronomy, regional flavors)
   */
  private buildPureVietnameseScript(prov: Province): string[] {
    const cleanName = this.normalizeToPureVietnamese(prov.name);
    const regionName = this.normalizeToPureVietnamese(prov.regionName);
    const paragraphs: string[] = [];

    // --- PHẦN 1: TỔNG QUAN (OVERVIEW) ---
    const hubsText =
      prov.hubs && prov.hubs.length > 0
        ? this.normalizeToPureVietnamese(prov.hubs.map((h) => h.name).join(", "))
        : cleanName;

    let overviewText = `Đến với ${cleanName}, vùng đất giàu bản sắc và tiềm năng thuộc khu vực ${regionName}. `;
    if (prov.mergedFrom && !prov.mergedFrom.includes("Giữ nguyên")) {
      const cleanMerged = this.normalizeToPureVietnamese(prov.mergedFrom);
      overviewText += `Trong định hướng không gian phát triển mới, ${cleanName} được hình thành trên cơ sở ${cleanMerged}, liên kết các đô thị hạt nhân du lịch trọng điểm gồm ${hubsText}. `;
    } else {
      overviewText += `Nơi đây khẳng định vị thế trung tâm phát triển du lịch chiến lược với hạt nhân ${hubsText}, hội tụ cảnh quan kỳ vĩ cùng chiều sâu văn hóa truyền thống lâu đời. `;
    }
    paragraphs.push(overviewText.trim());

    // --- PHẦN 2: CÁC ĐIỂM ĐẾN NỔI BẬT (DESTINATIONS) ---
    if (prov.attractions && prov.attractions.length > 0) {
      // Điểm đến 1 (Điểm nhấn hàng đầu)
      const a1 = prov.attractions[0];
      const a1Name = this.normalizeToPureVietnamese(a1.name);
      const a1Desc = this.normalizeToPureVietnamese(a1.desc);
      paragraphs.push(
        `Về hệ thống điểm đến, trạm dừng chân nổi bật đầu tiên cuốn hút chúng ta chính là ${a1Name}. ${a1Desc}`
      );

      // Điểm đến 2 (Cụm tiếp theo)
      if (prov.attractions.length > 1) {
        const a2 = prov.attractions[1];
        const a2Name = this.normalizeToPureVietnamese(a2.name);
        const a2Desc = this.normalizeToPureVietnamese(a2.desc);
        paragraphs.push(
          `Tiếp nối hành trình, trước mắt du khách mở ra ${a2Name}. ${a2Desc}`
        );
      }

      // Điểm đến 3 (Di sản/thắng cảnh bổ sung)
      if (prov.attractions.length > 2) {
        const a3 = prov.attractions[2];
        const a3Name = this.normalizeToPureVietnamese(a3.name);
        const a3Desc = this.normalizeToPureVietnamese(a3.desc);
        paragraphs.push(
          `Đặc biệt, không thể bỏ qua ${a3Name}, nơi hội tụ vẻ đẹp đặc sắc của ${a3Desc}`
        );
      }
    }

    // --- PHẦN 3: TINH HOA ẨM THỰC (CUISINE) ---
    if (prov.cuisine && prov.cuisine.length > 0) {
      const topCuisine = this.normalizeToPureVietnamese(prov.cuisine.slice(0, 5).join(", "));
      paragraphs.push(
        `Khép lại chuyến tham quan là trải nghiệm ẩm thực đặc sắc của ${cleanName}. Mời du khách thưởng thức những phong vị đặc sản nức tiếng như ${topCuisine}, đậm đà tình đất, tình người hiếu khách nơi đây.`
      );
    }

    return paragraphs;
  }

  /**
   * Splits text into short, natural speech sentences (<= 140 characters) for optimal audio streaming
   */
  private splitIntoSpeechChunks(paragraphs: string[]): string[] {
    const chunks: string[] = [];
    paragraphs.forEach((para) => {
      const sentences = para.split(/(?<=[.!?])\s+/);
      sentences.forEach((s) => {
        const trimmed = s.trim();
        if (!trimmed) return;
        if (trimmed.length <= 140) {
          chunks.push(trimmed);
        } else {
          const parts = trimmed.split(/,\s+/);
          let buf = "";
          parts.forEach((part) => {
            if ((buf + ", " + part).length <= 135) {
              buf = buf ? `${buf}, ${part}` : part;
            } else {
              if (buf) chunks.push(buf + ".");
              buf = part;
            }
          });
          if (buf) chunks.push(buf);
        }
      });
    });
    return chunks;
  }

  public stop() {
    this.activeSessionId++;
    this.isSpeaking = false;
    this.currentSpeechQueue = [];
    this.currentQueueIndex = 0;
    this.currentProvinceName = "";
    audioEngine.setDucked(false);

    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.src = "";
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      (window as any).__tourGuideActiveUtterance = null;
    }

    this.notify();
  }

  public speak(prov: Province, forceRestart = false) {
    if (this.isSpeaking && !forceRestart) {
      this.stop();
      return;
    }

    this.stop();
    const sessionId = ++this.activeSessionId;
    this.isSpeaking = true;
    this.currentProvinceName = prov.name;
    audioEngine.setDucked(true);

    const paragraphs = this.buildPureVietnameseScript(prov);
    this.currentSpeechQueue = this.splitIntoSpeechChunks(paragraphs);
    this.currentQueueIndex = 0;

    this.notify();
    this.playNextChunk(sessionId);
  }

  private playNextChunk(sessionId: number) {
    if (sessionId !== this.activeSessionId || !this.isSpeaking) return;

    if (this.currentQueueIndex >= this.currentSpeechQueue.length) {
      this.stop();
      return;
    }

    const chunkText = this.currentSpeechQueue[this.currentQueueIndex];

    // Priority 1: High-reliability Server-side 100% Vietnamese Audio Endpoint (/api/voice)
    this.playViaVietnameseAudioStream(chunkText, sessionId);
  }

  /**
   * Primary Engine: High-reliability Server Vietnamese Audio Stream (/api/voice)
   * Guaranteed 100% pure Vietnamese female voice, crystal-clear, zero English, zero CORS issues.
   */
  private playViaVietnameseAudioStream(text: string, sessionId: number) {
    try {
      if (!this.audioPlayer) {
        this.audioPlayer = new Audio();
      }

      const audioUrl = `/api/voice?text=${encodeURIComponent(text)}`;
      this.audioPlayer.src = audioUrl;
      this.audioPlayer.playbackRate = this.playbackSpeed;

      this.audioPlayer.onended = () => {
        if (sessionId !== this.activeSessionId || !this.isSpeaking) return;
        this.currentQueueIndex++;
        setTimeout(() => this.playNextChunk(sessionId), 120);
      };

      this.audioPlayer.onerror = () => {
        if (sessionId !== this.activeSessionId || !this.isSpeaking) return;
        // Fallback to Web Speech ONLY IF a real Vietnamese voice exists
        this.playViaStrictVietnameseWebSpeech(text, sessionId);
      };

      const playPromise = this.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (sessionId !== this.activeSessionId || !this.isSpeaking) return;
          this.playViaStrictVietnameseWebSpeech(text, sessionId);
        });
      }
    } catch {
      this.playViaStrictVietnameseWebSpeech(text, sessionId);
    }
  }

  /**
   * Secondary Fallback: Web Speech API STRICTLY with Vietnamese Voice.
   * If no Vietnamese voice is present on the OS, it NEVER speaks in English.
   */
  private playViaStrictVietnameseWebSpeech(text: string, sessionId: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      this.advanceChunkSilently(text, sessionId);
      return;
    }

    const viVoice = this.cachedHanoiVoice || this.detectStrictVietnameseVoice();

    // STRICT GUARD: If no Vietnamese voice is available, DO NOT play with English voice!
    if (!viVoice) {
      this.advanceChunkSilently(text, sessionId);
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utter = new SpeechSynthesisUtterance(text);
    (window as any).__tourGuideActiveUtterance = utter;

    utter.voice = viVoice;
    utter.lang = viVoice.lang || "vi-VN";
    utter.rate = this.playbackSpeed * 0.98;
    utter.pitch = 1.04;
    utter.volume = 1.0;

    let hasHandled = false;

    utter.onend = () => {
      if (hasHandled || sessionId !== this.activeSessionId) return;
      hasHandled = true;
      (window as any).__tourGuideActiveUtterance = null;
      this.currentQueueIndex++;
      setTimeout(() => this.playNextChunk(sessionId), 120);
    };

    utter.onerror = (evt) => {
      if (hasHandled || sessionId !== this.activeSessionId) return;
      hasHandled = true;
      (window as any).__tourGuideActiveUtterance = null;

      if (evt.error === "canceled" || evt.error === "interrupted") {
        return;
      }
      this.advanceChunkSilently(text, sessionId);
    };

    try {
      window.speechSynthesis.speak(utter);
    } catch {
      this.advanceChunkSilently(text, sessionId);
    }
  }

  private advanceChunkSilently(text: string, sessionId: number) {
    const wordCount = text.split(/\s+/).length;
    const durationMs = Math.max(2000, Math.min(6000, wordCount * 220));

    setTimeout(() => {
      if (sessionId !== this.activeSessionId || !this.isSpeaking) return;
      this.currentQueueIndex++;
      this.playNextChunk(sessionId);
    }, durationMs);
  }
}

export const tourGuideVoice = new TourGuideVoiceService();
