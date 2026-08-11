// Web Audio API Synthesizer for Gentle Audible Birthday Tunes

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pleasant, soft, audible tone
  playTone(freq, type = 'sine', duration = 0.4, volume = 0.12) {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playClick() {
    this.playTone(523.25, 'sine', 0.1, 0.08);
  }

  playSplat() {
    this.playTone(200, 'sine', 0.2, 0.08);
  }

  playTroll() {
    this.playTone(240, 'sine', 0.2, 0.08);
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.2, 0.1), idx * 80);
    });
  }

  playFanfare() {
    const melody = [523.25, 659.25, 783.99, 1046.50];
    melody.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 'sine', 0.3, 0.12), idx * 100);
    });
  }

  startBirthdaySong(onNoteCallback = null) {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25;
    
    const birthdayMelody = [
      { note: C4, duration: 0.4, label: "Happy" },
      { note: C4, duration: 0.3, label: "birthday" },
      { note: D4, duration: 0.6, label: "to" },
      { note: C4, duration: 0.6, label: "you!" },
      { note: F4, duration: 0.6, label: "Happy" },
      { note: E4, duration: 1.0, label: "birthday!" },

      { note: C4, duration: 0.4, label: "Happy" },
      { note: C4, duration: 0.3, label: "birthday" },
      { note: D4, duration: 0.6, label: "to" },
      { note: C4, duration: 0.6, label: "you!" },
      { note: G4, duration: 0.6, label: "Happy" },
      { note: F4, duration: 1.0, label: "birthday!" },

      { note: C4, duration: 0.4, label: "Happy" },
      { note: C4, duration: 0.3, label: "birthday" },
      { note: C5, duration: 0.6, label: "dear" },
      { note: A4, duration: 0.6, label: "Suhani!" },
      { note: F4, duration: 0.6, label: "Happy" },
      { note: E4, duration: 0.6, label: "birthday" },
      { note: D4, duration: 1.0, label: "Suhani!" },

      { note: Bb4, duration: 0.4, label: "Happy" },
      { note: Bb4, duration: 0.3, label: "birthday" },
      { note: A4, duration: 0.6, label: "to" },
      { note: F4, duration: 0.6, label: "you!" },
      { note: G4, duration: 0.6, label: "Happiest" },
      { note: F4, duration: 1.4, label: "Birthday Suhani! 🎉" }
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const item = birthdayMelody[noteIdx];
      this.playTone(item.note, 'sine', item.duration * 0.9, 0.12);

      if (onNoteCallback) onNoteCallback(item.label, noteIdx);

      noteIdx = (noteIdx + 1) % birthdayMelody.length;
      const delay = item.duration * 850;
      this.musicInterval = setTimeout(playNext, delay);
    };

    playNext();
  }

  stopBirthdaySong() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundFx = new SoundManager();
