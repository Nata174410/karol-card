/* Voces grabadas (assets/audio-*.ogg con respaldo .m4a para Safari).
   Mientras suenan, la música baja de volumen. */
(function () {
  const CLIPS = {
    nata: 'assets/audio-nata',
    tati: 'assets/audio-tati',
    'cumple-nata': 'assets/audio-feliz-cumple-nata',
    'cumple-tati': 'assets/audio-feliz-cumple-tati'
  };
  const cache = {};
  let token = 0; // invalida secuencias en curso al hacer stop()

  function get(name) {
    if (cache[name]) return cache[name];
    const a = new Audio();
    a.preload = 'auto';
    const ogg = document.createElement('audio').canPlayType('audio/ogg; codecs="opus"');
    a.src = CLIPS[name] + (ogg ? '.ogg' : '.m4a');
    cache[name] = a;
    return a;
  }
  const duck = on => { if (window.Music && Music.duck) Music.duck(on); };

  const Voice = {
    played: {},
    preload() { Object.keys(CLIPS).forEach(get); },

    /* Reproduce un clip. Promesa -> true si terminó de sonar, false si el navegador lo bloqueó. */
    play(name, o = {}) {
      const a = get(name), my = token;
      try { a.currentTime = 0; } catch (e) { /* aún no cargado */ }
      return new Promise(resolve => {
        const finish = ok => { a.onended = a.onerror = a.onpause = null; o.onend && o.onend(name); resolve(ok); };
        a.onended = () => finish(true);
        a.onerror = () => finish(false);
        a.onpause = () => { if (a.ended) return; finish(false); }; // stop() manual
        const p = a.play();
        const started = () => { Voice.played[name] = true; o.onstart && o.onstart(name); };
        if (p && p.then) p.then(() => { if (my !== token) { a.pause(); return; } started(); }, () => { a.onended = a.onerror = a.onpause = null; resolve(false); });
        else started();
      });
    },

    /* Reproduce varios clips en orden. Promesa -> true si sonaron todos; false si algo falló o se detuvo. */
    async sequence(names, o = {}) {
      const my = ++token;
      duck(true);
      let ok = true;
      for (const n of names) {
        if (my !== token) { ok = false; break; }
        const r = await Voice.play(n, o);
        if (!r) { ok = false; break; }
        if (my === token) await new Promise(r => setTimeout(r, o.gap ?? 180));
      }
      if (my === token) duck(false);
      return ok;
    },

    stop() {
      token++;
      Object.values(cache).forEach(a => { try { a.pause(); } catch (e) { /* nada */ } });
      duck(false);
    }
  };
  window.Voice = Voice;
})();
