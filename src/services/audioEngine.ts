/**
 * Procedural Vietnamese Music & SFX Audio Engine using Web Audio API
 * Featured Soundtrack: "Xin Chào Việt Nam" (Bonjour Vietnam) - Bản Không Lời (Instrumental)
 * Transcribed with authentic verse & chorus melody, acoustic guitar arpeggios, and warm bassline.
 */

export type MusicStyle = "xinchao" | "xinchao_piano" | "journey";

// Musical note frequencies (Hz)
const N = {
  E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5,
  REST: 0,
};

interface MusicNote {
  freq: number;
  duration: number; // in eighth-note steps (1 step ~ 380ms)
}

/**
 * Authentic transcribed melody of "Xin Chào Việt Nam" (Bonjour Vietnam)
 * Verse: "Raconte-moi cette terre que je ne connais pas..."
 * Chorus: "Một ngày kia tôi sẽ đến nơi nghe quê hương đón chào... Xin chào Việt Nam"
 */
const XIN_CHAO_VIET_NAM_MELODY: MusicNote[] = [
  // --- VERSE 1: "Raconte-moi cette terre que je ne connais pas..." ---
  { freq: N.E4, duration: 1 },
  { freq: N.A4, duration: 1 },
  { freq: N.B4, duration: 1 },
  { freq: N.C5, duration: 2 },
  { freq: N.B4, duration: 1 },
  { freq: N.A4, duration: 2 },
  { freq: N.E4, duration: 1 },
  { freq: N.G4, duration: 1 },
  { freq: N.A4, duration: 4 }, // "que je ne connais pas"

  // "Les rizières au soleil et les ombres des toits..."
  { freq: N.E4, duration: 1 },
  { freq: N.A4, duration: 1 },
  { freq: N.B4, duration: 1 },
  { freq: N.C5, duration: 2 },
  { freq: N.B4, duration: 1 },
  { freq: N.A4, duration: 2 },
  { freq: N.G4, duration: 1 },
  { freq: N.E4, duration: 1 },
  { freq: N.D4, duration: 4 }, // "les ombres des toits"

  // "Parle-moi de ce fleuve où dorment les bateaux..."
  { freq: N.E4, duration: 1 },
  { freq: N.A4, duration: 1 },
  { freq: N.B4, duration: 1 },
  { freq: N.C5, duration: 2 },
  { freq: N.B4, duration: 1 },
  { freq: N.A4, duration: 2 },
  { freq: N.E4, duration: 1 },
  { freq: N.G4, duration: 1 },
  { freq: N.A4, duration: 4 },

  // "De ces îles de brume et de ces longs manteaux..."
  { freq: N.A4, duration: 1 },
  { freq: N.B4, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.E5, duration: 2 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.B4, duration: 2 },
  { freq: N.A4, duration: 4 }, // "longs manteaux"

  // --- PRE-CHORUS: "Un ngày mai tôi sẽ về..." ---
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.E5, duration: 3 },
  { freq: N.REST, duration: 1 },
  { freq: N.G5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 4 },

  // --- CHORUS: "Một ngày kia tôi sẽ đến nơi nghe quê hương đón chào..." ---
  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 4 }, // "Một ngày kia tôi sẽ đến..."

  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 4 }, // "nơi nghe quê hương đón chào..."

  // "Trong những giấc mơ êm đềm từ bao năm qua..."
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.F5, duration: 1 },
  { freq: N.E5, duration: 2 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 4 },

  // "Một ngày mai tôi sẽ về, thăm lại dòng sông xưa..."
  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 4 },

  { freq: N.G5, duration: 1 },
  { freq: N.G5, duration: 1 },
  { freq: N.G5, duration: 1 },
  { freq: N.F5, duration: 1 },
  { freq: N.E5, duration: 4 },

  // --- CLIMAX: "Xin chào Việt Nam... Bonjour Vietnam..." ---
  { freq: N.D5, duration: 2 },
  { freq: N.E5, duration: 1 },
  { freq: N.D5, duration: 1 },
  { freq: N.C5, duration: 4 }, // "Xin chào Việt Nam..."

  { freq: N.A4, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.D5, duration: 2 },
  { freq: N.C5, duration: 6 }, // "...Bonjour Vietnam!"

  // Lyrical Đàn Tranh & Acoustic Guitar Outro / Transition
  { freq: N.REST, duration: 2 },
  { freq: N.A4, duration: 1 },
  { freq: N.C5, duration: 1 },
  { freq: N.E5, duration: 2 },
  { freq: N.G5, duration: 2 },
  { freq: N.A5, duration: 4 },
  { freq: N.G5, duration: 2 },
  { freq: N.E5, duration: 2 },
  { freq: N.D5, duration: 2 },
  { freq: N.C5, duration: 2 },
  { freq: N.A4, duration: 4 },
  { freq: N.REST, duration: 4 },
];

// Chords progression for harmonic accompaniment (Am, F, C, G, Dm, Em)
interface ChordProgression {
  bass: number;
  arpeggio: number[];
}

const CHORDS: Record<string, ChordProgression> = {
  Am: { bass: N.A2, arpeggio: [N.E3, N.A3, N.C4, N.E4] },
  F:  { bass: N.F2, arpeggio: [N.C3, N.F3, N.A3, N.C4] },
  C:  { bass: N.C3, arpeggio: [N.G3, N.C4, N.E4, N.G4] },
  G:  { bass: N.G2, arpeggio: [N.D3, N.G3, N.B3, N.D4] },
  Dm: { bass: N.D3, arpeggio: [N.A3, N.D4, N.F4, N.A4] },
  Em: { bass: N.E2, arpeggio: [N.B2, N.E3, N.G3, N.B3] },
};

const XIN_CHAO_CHORD_CYCLE = [
  "Am", "F", "C", "G",
  "Am", "F", "Dm", "Em",
  "Am", "F", "C", "G",
  "Dm", "Em", "Am", "Am",
  // Pre-chorus & Chorus
  "F", "G", "Em", "Am",
  "Dm", "G", "C", "C",
  "Am", "F", "C", "G",
  "Dm", "G", "C", "Am",
  "F", "G", "Am", "Am",
];

class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicStyle: MusicStyle = "xinchao";
  private musicInterval: number | null = null;
  private stepIndex = 0;
  private currentNoteIndex = 0;
  private noteStepRemaining = 0;
  private isDucked = false;

  public init() {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public setDucked(ducked: boolean) {
    this.isDucked = ducked;
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getStyle(): MusicStyle {
    return this.musicStyle;
  }

  public setStyle(style: MusicStyle) {
    this.musicStyle = style;
    if (this.isMusicPlaying) {
      this.startScheduler();
    }
  }

  public toggleMusic(): boolean {
    this.init();
    this.isMusicPlaying = !this.isMusicPlaying;
    if (this.isMusicPlaying) {
      this.startScheduler();
    } else {
      if (this.musicInterval !== null) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }
    return this.isMusicPlaying;
  }

  private startScheduler() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
    }

    // Step duration: ~370ms per eighth-note (andante tempo ~81 bpm)
    const stepMs = this.musicStyle === "journey" ? 320 : 375;

    this.musicInterval = window.setInterval(() => {
      if (!this.isMusicPlaying || !this.audioCtx) return;

      const baseVol = this.isDucked ? 0.015 : 0.07;
      const bassVol = this.isDucked ? 0.01 : 0.04;
      const arpVol  = this.isDucked ? 0.008 : 0.035;

      // 1. Play Lead Melody of "Xin Chào Việt Nam"
      if (this.noteStepRemaining <= 0) {
        const curNote = XIN_CHAO_VIET_NAM_MELODY[this.currentNoteIndex];
        if (curNote && curNote.freq > 0) {
          const durationSec = (curNote.duration * stepMs) / 1000 * 0.95;
          const waveType: OscillatorType =
            this.musicStyle === "xinchao_piano" ? "sine" : "triangle";
          this.playMelodyNote(curNote.freq, durationSec, baseVol * 1.1, waveType);
        }
        this.noteStepRemaining = curNote ? curNote.duration : 1;
        this.currentNoteIndex = (this.currentNoteIndex + 1) % XIN_CHAO_VIET_NAM_MELODY.length;
      }
      this.noteStepRemaining--;

      // 2. Play Harmonic Fingerpicked Acoustic Guitar / Harp Arpeggios & Bass
      const chordIndex = Math.floor(this.stepIndex / 4) % XIN_CHAO_CHORD_CYCLE.length;
      const chordName = XIN_CHAO_CHORD_CYCLE[chordIndex] || "Am";
      const chord = CHORDS[chordName] || CHORDS.Am;

      // Downbeat (beat 1 and beat 3): Warm acoustic bass note
      if (this.stepIndex % 4 === 0) {
        this.playBassNote(chord.bass, 1.4, bassVol);
      }

      // Rolling fingerpicked guitar arpeggio on each step
      const arpNote = chord.arpeggio[this.stepIndex % chord.arpeggio.length];
      this.playArpNote(arpNote, 0.65, arpVol);

      this.stepIndex++;
    }, stepMs);
  }

  /**
   * Warm acoustic guitar / đàn tranh plucked lead note with natural resonance
   */
  private playMelodyNote(
    freq: number,
    duration = 0.8,
    volume = 0.07,
    waveType: OscillatorType = "triangle"
  ) {
    if (!this.audioCtx || !this.isMusicPlaying) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const overtone = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, now);

    // Subtle traditional vibrato / pitch bend
    osc.frequency.exponentialRampToValueAtTime(freq * 1.004, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

    // Gentle warm overtone (octave up or fifth)
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freq * 2, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc.connect(filter);
    overtone.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  }

  /**
   * Soft fingerpicked nylon guitar / piano arpeggio note
   */
  private playArpNote(freq: number, duration = 0.55, volume = 0.03) {
    if (!this.audioCtx || !this.isMusicPlaying) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Deep warm acoustic cello / bass tone
   */
  private playBassNote(freq: number, duration = 1.3, volume = 0.035) {
    if (!this.audioCtx || !this.isMusicPlaying) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0006, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playSfx(type: "click" | "depart" | "stamp" | "fireworks" | "wrong") {
    try {
      this.init();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      if (type === "click") {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.09);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === "depart") {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "stamp") {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          if (!this.audioCtx) return;
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.type = "triangle";
          o.frequency.setValueAtTime(f, now + idx * 0.07);
          g.gain.setValueAtTime(0.08, now + idx * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.5);
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.start(now + idx * 0.07);
          o.stop(now + idx * 0.07 + 0.5);
        });
      } else if (type === "fireworks") {
        // Triumphant celebratory fanfare arpeggio + sparkling fireworks chimes
        const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093.0];
        fanfareNotes.forEach((f, idx) => {
          if (!this.audioCtx) return;
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.type = idx % 2 === 0 ? "triangle" : "sine";
          o.frequency.setValueAtTime(f, now + idx * 0.06);
          g.gain.setValueAtTime(0.12, now + idx * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.85);
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.start(now + idx * 0.06);
          o.stop(now + idx * 0.06 + 0.85);
        });

        // Firework crackle / sparkle effect
        [0.15, 0.3, 0.48, 0.65, 0.82].forEach((offset) => {
          if (!this.audioCtx) return;
          const crackle = this.audioCtx.createOscillator();
          const crackleGain = this.audioCtx.createGain();
          crackle.type = "sawtooth";
          crackle.frequency.setValueAtTime(1200 + Math.random() * 800, now + offset);
          crackle.frequency.exponentialRampToValueAtTime(300, now + offset + 0.08);
          crackleGain.gain.setValueAtTime(0.04, now + offset);
          crackleGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
          crackle.connect(crackleGain);
          crackleGain.connect(this.audioCtx.destination);
          crackle.start(now + offset);
          crackle.stop(now + offset + 0.08);
        });
      } else if (type === "wrong") {
        // Sympathetic gentle descending minor chord for incorrect response
        const minorNotes = [440, 415.3, 369.99, 329.63];
        minorNotes.forEach((f, idx) => {
          if (!this.audioCtx) return;
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.type = "sine";
          o.frequency.setValueAtTime(f, now + idx * 0.12);
          g.gain.setValueAtTime(0.07, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.45);
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.45);
        });
      }
    } catch {
      // Ignore user gesture restrictions before initial click
    }
  }
}

export const audioEngine = new AudioEngine();
