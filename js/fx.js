/* Efectos: confeti en canvas, textos flotantes, destellos, toasts, vibración. */
(function () {
  const cv = document.getElementById('fx');
  const ctx = cv.getContext('2d');
  const dom = document.getElementById('fxdom');
  let W = 0, H = 0, dpr = 1, parts = [], raf = 0, rainUntil = 0, lastT = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const GOLD = ['#f5e2a1', '#e8c76a', '#d9b45a', '#fff6d6'];
  const PARTY = ['#f5e2a1', '#e8c76a', '#f08aa5', '#ffffff', '#41c3bd', '#b58cf0', '#ff9f6b'];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];

  function add(p) { parts.push(p); if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); } }

  function heartPath(c, s) {
    c.beginPath();
    c.moveTo(0, s * .35);
    c.bezierCurveTo(-s, -s * .3, -s * .55, -s, 0, -s * .45);
    c.bezierCurveTo(s * .55, -s, s, -s * .3, 0, s * .35);
    c.closePath();
  }
  function starPath(c, s) {
    c.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 ? s * .28 : s;
      const a = i * Math.PI / 4;
      c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    c.closePath();
  }

  function tick(t) {
    const dt = Math.min(.033, (t - lastT) / 1000); lastT = t;
    ctx.clearRect(0, 0, W, H);
    if (rainUntil > t) {
      for (let i = 0; i < 2; i++) add({ x: rnd(0, W), y: -10, vx: rnd(-20, 20), vy: rnd(90, 190), g: 30, s: rnd(5, 9), rot: rnd(0, 6), vr: rnd(-6, 6), c: pick(PARTY), shape: Math.random() < .25 ? 'heart' : Math.random() < .3 ? 'star' : 'rect', life: 6, drag: .2 });
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life -= dt;
      p.vy += (p.g ?? 600) * dt;
      p.vx *= 1 - (p.drag ?? 1.2) * dt; p.vy *= 1 - (p.drag ?? 1.2) * dt * .4;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (p.life <= 0 || p.y > H + 30) { parts.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      if (p.shape === 'heart') { heartPath(ctx, p.s * 1.1); ctx.fill(); }
      else if (p.shape === 'dot') { ctx.beginPath(); ctx.arc(0, 0, p.s * .5, 0, 7); ctx.fill(); }
      else if (p.shape === 'star') { ctx.shadowColor = p.c; ctx.shadowBlur = 8; starPath(ctx, p.s * 1.1); ctx.fill(); }
      else { ctx.scale(1, Math.abs(Math.cos(p.rot * 2)) * .8 + .2); ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .66); }
      ctx.restore();
    }
    if (parts.length || rainUntil > t) raf = requestAnimationFrame(tick); else { raf = 0; ctx.clearRect(0, 0, W, H); }
  }

  const FX = {
    burst(x, y, n = 40, o = {}) {
      const colors = o.colors || PARTY;
      for (let i = 0; i < n; i++) {
        const a = rnd(0, Math.PI * 2), sp = rnd(120, o.power || 420);
        add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 140, g: o.gravity ?? 520, s: rnd(5, 10), rot: rnd(0, 6), vr: rnd(-9, 9), c: pick(colors), shape: o.shape || (Math.random() < .3 ? 'heart' : Math.random() < .3 ? 'star' : 'rect'), life: rnd(1.4, 2.6) });
      }
    },
    gold(x, y, n = 18) { FX.burst(x, y, n, { colors: GOLD, shape: 'star', power: 260, gravity: 200 }); },
    hearts(x, y, n = 14) { FX.burst(x, y, n, { colors: ['#f08aa5', '#ff6f91', '#ffb3c6', '#f5e2a1'], shape: 'heart', power: 300, gravity: 120 }); },
    rain(ms = 3500) { rainUntil = performance.now() + ms; if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(tick); } },
    fireworks(n = 5) {
      for (let i = 0; i < n; i++) setTimeout(() => FX.burst(rnd(W * .15, W * .85), rnd(H * .12, H * .45), 46, { power: 360, gravity: 300 }), i * 380);
    },
    float(text, x, y, o = {}) {
      const el = document.createElement('div');
      el.className = 'floaty' + (o.cls ? ' ' + o.cls : '');
      el.textContent = text;
      el.style.left = x + 'px'; el.style.top = y + 'px';
      if (o.color) el.style.color = o.color;
      if (o.size) el.style.fontSize = o.size + 'px';
      el.style.setProperty('--dx', (o.dx ?? rnd(-30, 30)) + 'px');
      dom.appendChild(el);
      setTimeout(() => el.remove(), 1700);
    },
    center(el) { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; },
    toast(msg, ms = 2800) {
      let t = document.getElementById('toast');
      if (!t) { t = document.createElement('div'); t.id = 'toast'; dom.appendChild(t); }
      t.textContent = msg; t.classList.add('show');
      clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), ms);
    },
    vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { /* nada */ } }
  };
  window.FX = FX;

  /* Bloqueo de la interfaz mientras hablan las voces: UILock.hold(promesa, {max, onRelease}) */
  const UILock = {
    n: 0,
    get active() { return this.n > 0; },
    hold(promise, o = {}) {
      const app = document.getElementById('app'); this.n++; app.classList.add('locked');
      let done = false;
      const release = () => {
        if (done) return; done = true; this.n = Math.max(0, this.n - 1);
        if (!this.n) app.classList.remove('locked');
        o.onRelease && o.onRelease();
      };
      Promise.race([promise, new Promise(r => setTimeout(r, o.max || 15000))]).then(release, release);
    }
  };
  window.UILock = UILock;
})();
