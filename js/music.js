/* Música generativa conmovedora (Web Audio, sin archivos):
   progresión tipo "Canon en Re" — pad suave, arpegio de piano y melodía de campanitas. */
(function () {
  const NOTE = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
  const hz = name => {
    const o = parseInt(name.slice(-1), 10), n = name.slice(0, -1);
    return 440 * Math.pow(2, (12 * (o + 1) + NOTE[n] - 69) / 12);
  };

  const BARS = [
    { bass: 'D3',  chord: ['D3', 'F#3', 'A3'],  arp: ['D4', 'F#4', 'A4', 'D5'],   mel: ['F#5', 'A5'] },
    { bass: 'A2',  chord: ['A2', 'C#3', 'E3'],  arp: ['C#4', 'E4', 'A4', 'C#5'],  mel: ['E5', 'C#5'] },
    { bass: 'B2',  chord: ['B2', 'D3', 'F#3'],  arp: ['D4', 'F#4', 'B4', 'D5'],   mel: ['D5', 'F#5'] },
    { bass: 'F#2', chord: ['F#2', 'A2', 'C#3'], arp: ['C#4', 'F#4', 'A4', 'C#5'], mel: ['C#5', 'A4'] },
    { bass: 'G2',  chord: ['G2', 'B2', 'D3'],   arp: ['B3', 'D4', 'G4', 'B4'],    mel: ['B4', 'D5'] },
    { bass: 'D3',  chord: ['D3', 'F#3', 'A3'],  arp: ['A3', 'D4', 'F#4', 'A4'],   mel: ['A4', 'F#4'] },
    { bass: 'G2',  chord: ['G2', 'B2', 'D3'],   arp: ['B3', 'D4', 'G4', 'B4'],    mel: ['B4', 'D5'] },
    { bass: 'A2',  chord: ['A2', 'C#3', 'E3'],  arp: ['A3', 'C#4', 'E4', 'A4'],   mel: ['C#5', 'E5'] }
  ];
  const ARP_PATTERN = [0, 1, 2, 3, 2, 3, 2, 1];
  const BEAT = 60 / 58, BAR = BEAT * 4;

  let ctx = null, master = null, wet = null, timer = 0, nextT = 0, bar = 0;
  const state = { enabled: true, started: false };

  const rnd = (a, b) => a + Math.random() * (b - a);

  function impulse(c, secs, decay) {
    const len = c.sampleRate * secs, buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    const flag = () => document.documentElement.classList.toggle('audio-on', ctx.state === 'running');
    ctx.onstatechange = flag; flag();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 4;
    master = ctx.createGain(); master.gain.value = 0;
    const conv = ctx.createConvolver(); conv.buffer = impulse(ctx, 3.4, 2.4);
    wet = ctx.createGain(); wet.gain.value = .55;
    const dry = ctx.createGain(); dry.gain.value = .8;
    const bus = ctx.createGain();
    bus.connect(dry); bus.connect(conv); conv.connect(wet);
    dry.connect(master); wet.connect(master);
    const out = ctx.createGain(); out.gain.value = 1.7;
    master.connect(comp); comp.connect(out); out.connect(ctx.destination);
    ctx._bus = bus;
    return true;
  }

  function env(g, t, a, peak, d, end) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(end || 0.0001, t + a + d);
  }

  function pluck(f, t, dur, vol) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2600;
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o1.type = 'triangle'; o1.frequency.value = f;
    o2.type = 'sine'; o2.frequency.value = f * 2; g2.gain.value = .28;
    o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(lp); lp.connect(ctx._bus);
    env(g, t, .008, vol, dur);
    o1.start(t); o2.start(t); o1.stop(t + dur + .1); o2.stop(t + dur + .1);
  }

  function bell(f, t, dur, vol) {
    const g = ctx.createGain(); g.connect(ctx._bus);
    env(g, t, .014, vol, dur);
    [[1, 1], [2, .38], [3, .14], [4.2, .05]].forEach(([m, a], i) => {
      const o = ctx.createOscillator(), og = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f * m; og.gain.value = a;
      o.connect(og); og.connect(g);
      o.start(t); o.stop(t + dur / (1 + i * .45) + .2);
    });
  }

  function pad(freqs, t, dur, vol) {
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 760;
    g.connect(lp); lp.connect(ctx._bus);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 1.3);
    g.gain.setValueAtTime(vol, t + dur - .2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 1.6);
    freqs.forEach(f => [-5, 5].forEach(det => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det;
      o.connect(g); o.start(t); o.stop(t + dur + 1.8);
    }));
  }

  function playBar(i, t) {
    const b = BARS[i];
    pad(b.chord.map(hz), t, BAR, .035);
    pluck(hz(b.bass), t, BAR * .9, .17);
    ARP_PATTERN.forEach((k, n) => pluck(hz(b.arp[k]), t + n * BEAT / 2 + rnd(0, .012), 1.5, n % 4 === 0 ? .075 : .05));
    bell(hz(b.mel[0]), t + rnd(0, .02), 3.4, .1);
    bell(hz(b.mel[1]), t + BEAT * 2 + rnd(0, .02), 2.8, .07);
  }

  function schedule() {
    if (!ctx) return;
    while (nextT < ctx.currentTime + 8) {
      playBar(bar % BARS.length, nextT);
      nextT += BAR; bar++;
    }
  }

  function fade(to, secs) {
    if (!master) return;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(to, t + secs);
  }

  const Music = {
    get enabled() { return state.enabled; },
    start() {
      if (state.started) { if (state.enabled) this.resume(); return; }
      try { if (!build()) return; } catch (e) { return; }
      state.started = true;
      ctx.resume && ctx.resume();
      nextT = ctx.currentTime + .15; bar = 0;
      schedule(); timer = setInterval(schedule, 700);
      if (state.enabled) fade(.95, 4);
    },
    /* baja la música mientras habla una voz */
    duck(on) { if (!ctx || !state.enabled) return; fade(on ? .3 : .95, on ? .25 : 1.2); },
    resume() { if (!ctx) return; ctx.resume && ctx.resume(); fade(.95, 1.5); },
    /* primer gesto del usuario: los navegadores móviles no dejan sonar antes */
    unlock() { if (!state.started) this.start(); else if (state.enabled && ctx && ctx.state !== 'running') this.resume(); },
    toggle() {
      state.enabled = !state.enabled;
      if (!state.started) { if (state.enabled) this.start(); return state.enabled; }
      if (state.enabled) { ctx.resume(); fade(.95, 1.2); } else { fade(0, .6); }
      return state.enabled;
    },
    /* efectos de sonido cortos */
    chime() {
      if (!ctx || !state.enabled) return;
      const t = ctx.currentTime;
      bell(hz('E6'), t, 1.6, .16); bell(hz('B6'), t + .11, 1.8, .12); bell(hz('G#6'), t + .22, 2, .1);
    },
    pop() {
      if (!ctx || !state.enabled) return;
      const t = ctx.currentTime; bell(hz('A5') * (1 + Math.random() * .3), t, .5, .08);
    },
    flip() {
      if (!ctx || !state.enabled) return;
      const t = ctx.currentTime, len = ctx.sampleRate * .5, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / len);
      const s = ctx.createBufferSource(); s.buffer = buf;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = .8;
      bp.frequency.setValueAtTime(900, t); bp.frequency.exponentialRampToValueAtTime(3200, t + .45);
      const g = ctx.createGain(); g.gain.value = .12;
      s.connect(bp); bp.connect(g); g.connect(ctx._bus); s.start(t);
    },
    fanfare() {
      if (!ctx || !state.enabled) return;
      const t = ctx.currentTime;
      ['D5', 'F#5', 'A5', 'D6', 'F#6'].forEach((n, i) => bell(hz(n), t + i * .13, 2.6, .12));
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (!ctx || !state.started) return;
    if (document.hidden) ctx.suspend(); else if (state.enabled) ctx.resume();
  });

  window.Music = Music;
})();
