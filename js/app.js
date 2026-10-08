/* Orquesta: intro → libro → tesoros. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];

  /* ================= INTRO ================= */
  const LINES = [
    { t: '¡Hola karitoooo! 👋', side: 'c', pose: 'wave' },
    { t: 'Queremos desearte un feliz cumpleaños 🎂\nQue Dios te bendiga e ilumine por siempre. ✨', side: 'l', pose: 'up' },
    { t: 'Celebrar tu vida nos hace sentir agradecidas con Dios y muy afortunadas. No solo porque hagas parte de nuestras vidas, sino por lo importante que eres en ellas…', side: 'r', pose: 'clap' },
    { t: 'Eres nuestra hermana mayor 💛', side: 'l', pose: 'point' },
    { t: 'Por eso queremos desearte todo lo mejor del mundo: toda la felicidad, todos los éxitos… y, otra vez, decirte gracias.', side: 'r', pose: 'wave' }
  ];
  const POSE = {
    wave:  { nata: { armR: 'wave' },  tati: { armL: 'wave' } },
    up:    { nata: { armR: 'up', armL: 'up' }, tati: { armR: 'up', armL: 'up' } },
    clap:  { nata: { armR: 'clap', armL: 'clap' }, tati: { armR: 'clap', armL: 'clap' } },
    point: { nata: { armR: 'point' }, tati: { armL: 'point' } }
  };

  const intro = {
    i: -1, typing: false, timer: 0, started: false,
    els() {
      return { stage: $('#introStage'), bubble: $('#bubble'), text: $('#bubbleText'), nata: $('#spriteNata'), tati: $('#spriteTati'), hint: $('#introHint'), open: $('#openBook') };
    },
    render(who, pose, talk) {
      const e = this.els(), host = who === 'nata' ? e.nata : e.tati;
      host.innerHTML = Girl.svg(Object.assign({ who }, POSE[pose][who]));
      this.applyTalk();
    },
    // la boca se mueve mientras se escribe el texto o mientras habla su voz grabada
    voiceTalk: { nata: false, tati: false },
    applyTalk() {
      [['nata', '#spriteNata'], ['tati', '#spriteTati']].forEach(([w, s]) => {
        const g = $(s + ' .girl'); if (g) g.classList.toggle('talk', this.typing || this.voiceTalk[w]);
      });
    },
    setTalk() { this.applyTalk(); },
    /* Saludo hablado: primero Nata y luego Tati. `greeted` = ya empezó a sonar. */
    greet() {
      if (this.greeted || this.greetBusy) return;
      this.greetBusy = true;
      const hint = this.els().hint, hintText = hint.textContent;
      // Mientras hablan, el toque no avanza: así no se salta el audio.
      const seq = Voice.sequence(['nata', 'tati'], {
        onstart: n => { this.greeted = true; this.voiceTalk[n] = true; hint.textContent = '🎙️ Nata y Tati te están saludando…'; this.applyTalk(); },
        onend: n => { this.voiceTalk[n] = false; this.applyTalk(); }
      });
      UILock.hold(seq, { max: 14000, onRelease: () => { hint.textContent = hintText; this.greetBusy = false; } });
    },
    say(i) {
      const e = this.els(), L = LINES[i]; this.i = i;
      clearInterval(this.timer);
      this.render('nata', L.pose); this.render('tati', L.pose);
      e.bubble.className = 'bubble show side-' + L.side;
      e.text.textContent = ''; this.typing = true; this.applyTalk();
      let k = 0; const full = L.t;
      this.timer = setInterval(() => {
        k++; e.text.textContent = full.slice(0, k);
        if (k >= full.length) this.finishTyping();
      }, 28);
    },
    finishTyping() {
      clearInterval(this.timer); this.typing = false; this.applyTalk();
      $('#bubbleText').textContent = LINES[this.i].t;
      if (this.i === LINES.length - 1) { const e = this.els(); e.hint.hidden = true; e.open.hidden = false; e.stage.classList.add('ended'); }
    },
    react() {
      ['#whoNata', '#whoTati'].forEach(s => { const el = $(s); el.classList.remove('jump'); void el.offsetWidth; el.classList.add('jump'); });
      const r = $('.duo').getBoundingClientRect(); FX.hearts(r.left + r.width / 2, r.top + 40, 8);
    },
    tap() {
      this.started = true; Music.unlock();
      if (UILock.active) return; // hablando: esperar
      FX.vibrate(12);
      // Si el navegador bloqueó el saludo hablado, el primer toque lo reproduce (sin avanzar el diálogo).
      if (!this.greeted) { this.greet(); this.react(); if (this.typing) this.finishTyping(); return; }
      Music.pop();
      if (this.typing) { this.finishTyping(); return; }
      if (this.i >= LINES.length - 1) { this.react(); return; }
      this.react(); this.say(this.i + 1);
    },
    init() {
      const e = this.els();
      this.render('nata', 'wave'); this.render('tati', 'wave');
      // decoración
      const st = $('.stars'); for (let i = 0; i < 40; i++) { const s = document.createElement('i'); s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 60)}%;animation-delay:${rnd(0, 3)}s;width:${rnd(1, 3)}px;height:${rnd(1, 3)}px`; st.appendChild(s); }
      const bal = $('#balloons'), cols = ['#f08aa5', '#f5c542', '#41c3bd', '#b58cf0', '#ff9f6b', '#fff'];
      for (let i = 0; i < 10; i++) { const b = document.createElement('i'); b.style.cssText = `left:${rnd(2, 94)}%;background:${pick(cols)};animation-duration:${rnd(11, 20)}s;animation-delay:${-rnd(0, 18)}s;--s:${rnd(.7, 1.25)}`; bal.appendChild(b); }
      const bs = $('.bunting'), cs = ['#f08aa5', '#f5c542', '#41c3bd', '#b58cf0', '#fff', '#ff9f6b'];
      let flags = '';
      for (let i = 0; i < 11; i++) { const t = (i + .5) / 11, x = -5 + 410 * t, y = 8 + 108 * t * (1 - t); flags += `<polygon points="${x - 11},${y} ${x + 11},${y} ${x},${y + 24}" fill="${cs[i % cs.length]}" opacity=".95"/>`; }
      bs.insertAdjacentHTML('beforeend', flags);
      e.stage.addEventListener('click', ev => { if (ev.target.closest('#openBook')) return; this.tap(); });
      e.open.addEventListener('click', ev => { ev.stopPropagation(); Book.open(); });
      Voice.preload();
      setTimeout(() => { this.say(0); this.greet(); }, 700);
    }
  };

  /* ================= LIBRO ================= */
  const TOTAL_TREASURES = 10;
  const Book = {
    cur: 0, leaves: [], N: 0, busy: false,
    build() {
      const book = $('#book'); this.N = PAGES.length;
      PAGES.forEach((p, i) => {
        const leaf = document.createElement('div'); leaf.className = 'leaf'; leaf.style.zIndex = this.N - i; leaf.dataset.id = p.id;
        let inner;
        if (p.html) inner = p.html;
        else {
          const tr = (p.treasures || []).map(t => `<button class="treasure" data-id="${t.id}" data-msg="${t.msg.replace(/"/g, '&quot;')}" style="${t.style}" aria-label="Tesoro escondido">${t.html}</button>`).join('');
          inner = `<div class="page ${p.cls || ''}">
            <div class="eyebrow">${p.eyebrow}</div>
            <div class="stage ${p.stageCls || ''}">${p.stage}${tr}</div>
            <div class="hint">${p.hint || ''}</div>
            <h2 class="title">${p.title}</h2>
            <p class="copy">${p.copy}</p>
          </div>`;
        }
        leaf.innerHTML = `<div class="face front ${p.dark ? 'dark' : p.cover ? 'dark cover-face' : 'paper'}">${inner}</div><div class="face back"></div>`;
        book.appendChild(leaf); this.leaves.push(leaf);
        p.root = $('.front', leaf);
        p.init && p.init(p.root);
      });
      book.addEventListener('click', e => {
        const t = e.target.closest('.treasure'); if (t) { e.stopPropagation(); App.found(t.dataset.id, t.dataset.msg, t); return; }
        if (this.cur === 0 && e.target.closest('.cover')) this.next();
      });
      // swipe
      let sx = 0, sy = 0, down = false;
      book.addEventListener('pointerdown', e => { if (e.target.closest('[data-noswipe]')) return; down = true; sx = e.clientX; sy = e.clientY; });
      book.addEventListener('pointerup', e => {
        if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? this.next() : this.prev();
      });
      book.addEventListener('pointercancel', () => { down = false; });
      $('#next').addEventListener('click', () => this.next());
      $('#prev').addEventListener('click', () => this.prev());
      document.addEventListener('keydown', e => { if (!$('#bookScreen').classList.contains('active')) return; if (e.key === 'ArrowRight') this.next(); if (e.key === 'ArrowLeft') this.prev(); });
      $('#btnSound').addEventListener('click', () => { const on = Music.toggle(); $('#btnSound').classList.toggle('off', !on); });
      this.show(0, true);
    },
    open() {
      Voice.stop(); Music.start(); Music.chime();
      $('#intro').classList.remove('active'); $('#bookScreen').classList.add('active');
      this.show(0, true);
      setTimeout(() => FX.toast('Hay 10 tesoros escondidos 🔍 (tus cosas favoritas)', 4200), 1800);
    },
    show(n, instant) {
      n = Math.max(0, Math.min(this.N - 1, n));
      const dir = n - this.cur; this.cur = n;
      if (n !== this.N - 1) Voice.stop();
      this.leaves.forEach((l, i) => {
        if (i < n) { l.classList.add('flipped'); clearTimeout(l._t); l._t = setTimeout(() => l.classList.add('hidden'), instant ? 0 : 1050); }
        else { l.classList.remove('hidden'); if (l.classList.contains('flipped')) { void l.offsetWidth; l.classList.remove('flipped'); } }
        l.classList.toggle('active', i === n); l.classList.toggle('far', i > n + 1);
      });
      const p = PAGES[n]; p.enter && p.enter(p.root);
      $('#bookScreen').classList.toggle('on-cover', n === 0);
      $('#bookScreen').classList.toggle('on-dark', !!p.dark);
      $('#prev').disabled = n === 0; $('#next').disabled = n === this.N - 1;
      $('#pageno').textContent = n === 0 ? '' : `${n} / ${this.N - 1}`;
      $('#progress i').style.width = (n / (this.N - 1) * 100) + '%';
      if (!instant && dir) Music.flip();
    },
    next() { if (UILock.active) return; if (this.cur < this.N - 1) this.show(this.cur + 1); },
    prev() { if (UILock.active) return; if (this.cur > 0) this.show(this.cur - 1); }
  };

  /* ================= TESOROS ================= */
  const KEY = 'karol-card-treasures';
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* nada */ } }
  };
  let foundSet = new Set(store.get());

  const App = {
    found(id, msg, el) {
      if (foundSet.has(id)) { FX.toast('Ese ya lo habías encontrado ✨'); return; }
      foundSet.add(id); store.set([...foundSet]);
      if (el) { el.classList.add('got'); const [x, y] = FX.center(el); FX.burst(x, y, 20, { colors: ['#f5e2a1', '#e8c76a', '#fff6d6'], shape: 'star', power: 300, gravity: 250 }); }
      this.updateCount(true); Music.chime(); FX.vibrate([15, 30, 15]);
      FX.toast(msg + `  (${foundSet.size}/${TOTAL_TREASURES})`, 3600);
      if (foundSet.size >= TOTAL_TREASURES) setTimeout(() => this.bonus(), 1800);
    },
    updateCount(pulse) {
      const c = $('#treasureCount'); $('b', c).textContent = foundSet.size;
      if (pulse) { c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse'); }
      c.classList.toggle('full', foundSet.size >= TOTAL_TREASURES);
    },
    bonus() {
      const m = $('#modal'), card = $('#modalCard');
      card.innerHTML = `<div class="m-emoji">🏆</div><h3>¡Encontraste los 10 tesoros!</h3>
        <p>Eso significa que conoces tus cosas favoritas… y que nosotras también. 💛</p>
        <div class="m-bonus">🎟️ BONUS SECRETO<br><b>Vale por 1 abrazo triple<br>de Nata y Tati</b><br><small>(a cobrar en persona, sin fecha de vencimiento)</small></div>
        <button class="btn-gold" id="mClose">Guardar bonus</button>`;
      m.hidden = false; FX.fireworks(5); FX.rain(3000); Music.fanfare();
      $('#mClose').onclick = () => { m.hidden = true; };
    },
    restart() { Book.show(0); }
  };
  window.App = App;

  /* ================= ARRANQUE ================= */
  function boot() {
    intro.init(); Book.build(); App.updateCount();
    // Intentar música ya (suena sola donde el navegador lo permita) y, si no, con el primer toque en cualquier parte.
    try { Music.start(); } catch (e) { /* nada */ }
    ['pointerup', 'touchend', 'click', 'keydown'].forEach(ev => document.addEventListener(ev, () => Music.unlock(), { passive: true }));
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {}, () => {});
  window.addEventListener('DOMContentLoaded', boot);
})();
