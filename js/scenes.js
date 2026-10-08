/* Páginas del libro. Cada página: {id, eyebrow, title, copy, hint, stageCls, stage, treasures, init(root), enter(root)} */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];
  const retrigger = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
  const mid = el => FX.center(el);
  const stars = (n, seed = 1, h = 120) => {
    let s = '', x = seed * 9301;
    for (let i = 0; i < n; i++) {
      x = (x * 233280 + 49297) % 233280;
      const a = x / 233280; x = (x * 233280 + 49297) % 233280; const b = x / 233280;
      s += `<circle class="tw" style="animation-delay:${(a * 3).toFixed(2)}s" cx="${(a * 300).toFixed(0)}" cy="${(b * h).toFixed(0)}" r="${(1 + b * 1.3).toFixed(1)}" fill="#fff6d6"/>`;
    }
    return s;
  };

  const PAGES = [];

  /* ---------------- PORTADA ---------------- */
  PAGES.push({
    id: 'cover', cover: true,
    html: `
      <div class="cover">
        <div class="cover-frame"></div>
        <div class="foil-sparkles" aria-hidden="true"></div>
        <div class="cover-top">Un libro para</div>
        <h1 class="cover-title">Karito</h1>
        <div class="cover-orn"><span></span><i>✦</i><span></span></div>
        <div class="cover-sub">escrito con gratitud<br>por Nata y Tati</div>
        <div class="cover-open"><span>Toca para abrir</span></div>
      </div>`
  });

  /* ---------------- 1. PONQUÉ + JUGO ---------------- */
  PAGES.push({
    id: 'ponque', eyebrow: 'Gracias · 01', title: 'Por la cena de reyes',
    copy: 'Gracias por cada ponqué Ramo con jugo Hit de mora que, sin que lo supiéramos, era la mejor cena del mundo.',
    hint: '👆 Toca el jugo… y el ponqué', stageCls: 'st-night',
    treasures: [{ id: 'joya', html: '💍', style: 'left:9%;top:24%', msg: '💍 Las joyas: brillan… pero tú más.' }],
    stage: `
      <svg class="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="gCone1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd88a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd88a" stop-opacity="0"/></linearGradient>
          <linearGradient id="gMora1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9446bd"/><stop offset="1" stop-color="#4b1d6e"/></linearGradient>
          <radialGradient id="gLamp1"><stop offset="0" stop-color="#ffd88a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd88a" stop-opacity="0"/></radialGradient>
        </defs>
        <g>${stars(26, 3, 230)}</g>
        <circle cx="244" cy="58" r="22" fill="#fff3c4" opacity=".9"/><circle cx="252" cy="52" r="20" fill="#251a4d" opacity=".25"/>
        <polygon class="cone" points="132,104 168,104 262,356 38,356" fill="url(#gCone1)"/>
        <line x1="150" y1="0" x2="150" y2="72" stroke="#d9b45a" stroke-width="2"/>
        <path d="M116 104 L132 72 H168 L184 104Z" fill="#e8c76a"/><ellipse cx="150" cy="104" rx="34" ry="5" fill="#fff3c4"/>
        <g transform="translate(0 150)">
        <ellipse cx="150" cy="130" rx="170" ry="120" fill="url(#gLamp1)"/>
        <rect x="0" y="206" width="300" height="44" fill="#c99a62"/><rect x="0" y="206" width="300" height="5" fill="#b3834f"/>
        <g class="cake tap">
          <ellipse cx="100" cy="207" rx="68" ry="7" fill="rgba(0,0,0,.28)"/>
          <path d="M42 200 Q40 154 100 148 Q160 154 158 200Z" fill="#b46f32"/>
          <path d="M52 180 Q54 158 100 153 Q146 158 148 180 Q100 168 52 180Z" fill="#dc9a50"/>
          <circle cx="72" cy="166" r="2" fill="#7a4620"/><circle cx="118" cy="162" r="2" fill="#7a4620"/><circle cx="132" cy="174" r="1.8" fill="#7a4620"/><circle cx="90" cy="176" r="1.8" fill="#7a4620"/>
          <rect x="38" y="184" width="124" height="22" rx="9" fill="#e63a46"/>
          <path d="M44 190 H156" stroke="#fff" stroke-opacity=".55" stroke-dasharray="4 6"/>
          <text x="100" y="201" text-anchor="middle" font-family="Great Vibes, cursive" font-size="17" fill="#fff">ponqué ramo</text>
        </g>
        <g class="juice tap">
          <ellipse cx="216" cy="207" rx="40" ry="6" fill="rgba(0,0,0,.28)"/>
          <rect x="184" y="122" width="64" height="84" rx="7" fill="url(#gMora1)"/>
          <path d="M184 122 L192 110 H240 L248 122Z" fill="#43195f"/>
          <g class="berry">
            <circle cx="208" cy="152" r="7" fill="#2c0f40"/><circle cx="222" cy="152" r="7" fill="#2c0f40"/><circle cx="215" cy="142" r="7" fill="#2c0f40"/>
            <circle cx="208" cy="165" r="7" fill="#2c0f40"/><circle cx="222" cy="165" r="7" fill="#2c0f40"/><circle cx="231" cy="158" r="6" fill="#2c0f40"/>
            <circle cx="206" cy="150" r="1.6" fill="#fff" opacity=".7"/><circle cx="220" cy="150" r="1.6" fill="#fff" opacity=".7"/><circle cx="213" cy="140" r="1.6" fill="#fff" opacity=".7"/>
            <path d="M215 136 q8 -12 18 -8 q-6 10 -18 8Z" fill="#59b36a"/>
          </g>
          <text x="216" y="192" text-anchor="middle" font-family="Great Vibes, cursive" font-size="21" fill="#fff">mora</text>
          <g class="straw"><path d="M232 110 L238 68 Q240 60 252 62" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M232 110 L238 68 Q240 60 252 62" stroke="#e63a46" stroke-width="5" fill="none" stroke-dasharray="5 6"/></g>
        </g>
        </g>
      </svg>`,
    init(root) {
      let sipped = false, bitten = false;
      const juice = $('.juice', root), cake = $('.cake', root);
      const done = () => { if (sipped && bitten) { const [x, y] = mid($('.stage', root)); FX.hearts(x, y, 22); FX.toast('Cena servida 💜'); sipped = bitten = false; } };
      juice.addEventListener('click', () => {
        retrigger(juice, 'wob'); const [x, y] = mid(juice);
        FX.burst(x, y - 30, 14, { colors: ['#9446bd', '#b58cf0', '#4b1d6e', '#e0c3ff'], shape: 'dot', power: 260, gravity: 380 });
        FX.float('¡glup!', x, y - 50, { color: '#e0c3ff', size: 22 }); Music.pop(); FX.vibrate(15);
        sipped = true; done();
      });
      cake.addEventListener('click', () => {
        retrigger(cake, 'wob'); const [x, y] = mid(cake);
        FX.burst(x, y - 20, 14, { colors: ['#b46f32', '#dc9a50', '#7a4620', '#f3c58a'], shape: 'dot', power: 220, gravity: 420 });
        FX.float('¡ñam!', x, y - 50, { color: '#ffd9a0', size: 22 }); Music.pop(); FX.vibrate(15);
        bitten = true; done();
      });
    }
  });

  /* ---------------- 2. NUGGETS ---------------- */
  PAGES.push({
    id: 'nuggets', eyebrow: 'Gracias · 02', title: 'Por las cajas de nuggets',
    copy: 'Gracias por cada caja de nuggets que nos compraste. Nos enseñaste que el amor también puede venir crocante y calientico.',
    hint: '👆 Atrápalos… o abre la caja', stageCls: 'st-warm',
    treasures: [{ id: 'newbalance', html: '👟', style: 'left:5%;bottom:6%', msg: '👟 New Balance: el mejor aliado de tus pasos.' }],
    stage: `
      <div class="nug-field"></div>
      <svg class="nug-box tap" viewBox="0 0 120 100" aria-label="Caja de nuggets">
        <path d="M14 26 H106 L98 96 H22Z" fill="#e63a46"/>
        <path d="M14 26 H106 L104 38 H16Z" fill="#f5c542"/>
        <path d="M14 26 L22 10 H98 L106 26Z" fill="#c92d3a"/>
        <text x="60" y="76" text-anchor="middle" font-family="Great Vibes, cursive" font-size="26" fill="#fff">nuggets</text>
      </svg>
      <div class="nug-count">Rescatados: <b>0</b></div>`,
    init(root) {
      const field = $('.nug-field', root), box = $('.nug-box', root), cnt = $('.nug-count b', root);
      let n = 0, celebrated = false;
      const spawn = (fromBox) => {
        const el = document.createElement('i'); el.className = 'nugget';
        const fx = rnd(8, 84), fy = rnd(14, 56);
        el.style.left = (fromBox ? 46 : fx) + '%';
        el.style.top = (fromBox ? 72 : -14) + '%';
        el.style.setProperty('--r', rnd(-40, 40) + 'deg');
        field.appendChild(el);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.classList.add('in');
          el.style.left = fx + '%'; el.style.top = fy + '%';
        }));
        el.addEventListener('click', () => {
          if (el.classList.contains('eaten')) return;
          el.classList.add('eaten'); n++; cnt.textContent = n;
          const [x, y] = mid(el); FX.float('¡ñam!', x, y - 10, { color: '#ffe3a0', size: 20 }); Music.pop(); FX.vibrate(12);
          setTimeout(() => el.remove(), 300);
          if (n >= 8 && !celebrated) { celebrated = true; FX.rain(2600); FX.toast('¡Suficientes! La caja quedó vacía 😋'); }
        });
      };
      root._spawn = spawn;
      box.addEventListener('click', () => { retrigger(box, 'wob'); for (let i = 0; i < 5; i++) setTimeout(() => spawn(true), i * 80); Music.pop(); });
    },
    enter(root) {
      const field = $('.nug-field', root);
      if (!field.childElementCount) for (let i = 0; i < 7; i++) setTimeout(() => root._spawn(false), 300 + i * 220);
    }
  });

  /* ---------------- 3. ÚTILES ---------------- */
  PAGES.push({
    id: 'utiles', eyebrow: 'Gracias · 03', title: 'Por los útiles bonitos',
    copy: 'Gracias por cada útil escolar bonito. Con ellos estrenábamos cuadernos… y también la ilusión de empezar.',
    hint: '👆 Toca el cuaderno', stageCls: 'st-sky',
    treasures: [{ id: 'libro', html: '📚', style: 'right:6%;top:47%', msg: '📚 Los libros: tu refugio favorito.' }],
    stage: `
      <svg class="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice">
        <g class="sunrays" style="transform-origin:236px 78px"><circle cx="236" cy="78" r="30" fill="#ffe27a"/>${Array.from({ length: 12 }, (_, i) => `<rect x="233" y="34" width="6" height="14" rx="3" fill="#ffd24a" transform="rotate(${i * 30} 236 78)"/>`).join('')}</g>
        <g fill="#fff" opacity=".95"><ellipse cx="60" cy="70" rx="34" ry="14"/><ellipse cx="82" cy="60" rx="22" ry="14"/><ellipse cx="46" cy="62" rx="18" ry="11"/></g>
        <g fill="#fff" opacity=".8"><ellipse cx="170" cy="130" rx="30" ry="11"/><ellipse cx="188" cy="122" rx="18" ry="11"/></g>
        <path d="M10 18 Q150 70 290 18" stroke="#d9b45a" stroke-width="2" fill="none"/>
        ${['A', 'B', 'C', '1', '2', '3'].map((l, i) => { const t = (i + .6) / 6.2, x = 10 + 280 * t, y = 18 + 104 * t * (1 - t) * 1; return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><path d="M-14 0 H14 L0 34Z" fill="${['#f08aa5', '#f5c542', '#41c3bd', '#b58cf0', '#ff9f6b', '#6bb6f0'][i]}"/><text y="18" text-anchor="middle" font-family="Playfair Display, serif" font-weight="800" font-size="13" fill="#fff">${l}</text></g>`; }).join('')}
        <g class="plane"><path d="M0 0 L34 -10 L10 4 L8 14 L2 5Z" fill="#fff" stroke="#8aa4c8" stroke-width="1.2" stroke-linejoin="round"/></g>
        <g transform="translate(0 150)">
        <rect x="0" y="212" width="300" height="38" fill="#b98b5a"/><rect x="0" y="212" width="300" height="4" fill="#a37646"/>
        <g transform="translate(157 212) scale(.8) translate(-157 -212)"><g class="nb tap">
          <rect x="72" y="42" width="170" height="170" rx="8" fill="#fffdf6" stroke="#d6c7a8" stroke-width="2"/>
          <g stroke="#bcd3ea" stroke-width="1.2">${Array.from({ length: 8 }, (_, i) => `<line x1="84" x2="232" y1="${64 + i * 18}" y2="${64 + i * 18}"/>`).join('')}</g>
          <line x1="96" x2="96" y1="42" y2="212" stroke="#f3a0a8" stroke-width="1.4"/>
          ${Array.from({ length: 7 }, (_, i) => `<circle cx="72" cy="${58 + i * 24}" r="5" fill="#8a8fa8"/>`).join('')}
          <path class="heart-draw" pathLength="100" d="M158 168 C112 132 116 92 140 92 C152 92 158 100 158 106 C158 100 164 92 176 92 C200 92 204 132 158 168Z" fill="none" stroke="#e0527a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="158" y="198" text-anchor="middle" font-family="Caveat, cursive" font-size="20" fill="#5b6aa8">mis útiles nuevos</text>
        </g></g>
        <g transform="translate(24 0)"><g class="cup tap">
          <rect x="12" y="156" width="46" height="56" rx="8" fill="#e8738a"/><rect x="12" y="170" width="46" height="8" fill="#fff" opacity=".35"/>
          <g class="pencils">
            <rect x="20" y="104" width="7" height="58" rx="2" fill="#f5c542" transform="rotate(-12 23 160)"/>
            <rect x="30" y="98" width="7" height="64" rx="2" fill="#41c3bd" transform="rotate(-2 33 160)"/>
            <rect x="40" y="106" width="7" height="56" rx="2" fill="#9446bd" transform="rotate(10 43 160)"/>
          </g>
        </g></g>
        <g transform="translate(228 154) rotate(8)"><rect width="36" height="56" rx="4" fill="#f5c542"/><g stroke="#8a6a10" stroke-width="1.4">${Array.from({ length: 7 }, (_, i) => `<line x1="0" x2="${i % 2 ? 9 : 14}" y1="${6 + i * 7}" y2="${6 + i * 7}"/>`).join('')}</g></g>
        <rect x="232" y="196" width="34" height="14" rx="4" fill="#f2a1b8" transform="rotate(-10 249 203)"/>
        </g>
      </svg>`,
    init(root) {
      const nb = $('.nb', root), cup = $('.cup', root), stage = $('.stage', root);
      const colors = ['#e0527a', '#2f8fd8', '#2fb57a', '#9446bd', '#f08a24'];
      let k = 0;
      nb.addEventListener('click', () => {
        const hp = $('.heart-draw', root); hp.style.stroke = colors[++k % colors.length]; retrigger(hp, 'redraw');
        const [x, y] = mid(nb); FX.float(pick(['⭐', '🌈', '✏️', '💖']), x + rnd(-40, 40), y - 30, { size: 28 }); Music.pop();
      });
      cup.addEventListener('click', () => { retrigger(cup, 'wob'); const [x, y] = mid(cup); FX.gold(x, y - 30, 16); Music.pop(); });
    }
  });

  /* ---------------- 4. BORRAR LA HOJA ---------------- */
  PAGES.push({
    id: 'hoja', eyebrow: 'Gracias · 04', title: 'Por borrar la hoja',
    copy: 'Gracias por borrar toda la hoja cuando salía fea. Nos enseñaste que siempre se puede volver a empezar, sin regaños y con mucho cariño.',
    hint: '☝️ Pasa el dedo para borrar', stageCls: 'st-sky', noswipe: true,
    treasures: [{ id: 'bolso', html: '👜', style: 'right:5%;bottom:5%', msg: '👜 Los bolsos: nunca son suficientes.' }],
    stage: `
      <div class="sheet">
        <div class="clean"><div class="clean-text">Empezar<br>de nuevo</div><div class="clean-heart">♡</div></div>
        <canvas class="mess" data-noswipe></canvas>
        <div class="eraser" aria-hidden="true"></div>
      </div>`,
    init(root) { root._erase = { done: false, ready: false }; },
    enter(root) {
      const st = root._erase; if (st.ready || st.done) return;
      const sheet = $('.sheet', root), cv = $('.mess', root), er = $('.eraser', root);
      const r = sheet.getBoundingClientRect(); if (!r.width) return;
      st.ready = true;
      const dpr = Math.min(window.devicePixelRatio || 1, 2), w = r.width, h = r.height;
      cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px';
      const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = '#fffaf0'; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(120,160,200,.5)'; g.lineWidth = 1;
      for (let y = 30; y < h; y += 26) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      g.lineCap = 'round'; g.lineJoin = 'round';
      const cols = ['#2b3c8f', '#c0392b', '#2a2a2a', '#7a2bc0'];
      for (let row = 0; row < Math.floor(h / 26); row++) {
        let x = rnd(8, 30); const y = 24 + row * 26;
        while (x < w - 20) {
          g.strokeStyle = pick(cols); g.lineWidth = rnd(1.6, 2.8); g.beginPath();
          const len = rnd(24, 80); g.moveTo(x, y);
          for (let t = 0; t < len; t += 5) g.lineTo(x + t, y + Math.sin(t * rnd(.5, .9)) * rnd(5, 10) + rnd(-3, 3));
          g.stroke(); x += len + rnd(8, 20);
        }
      }
      g.strokeStyle = '#c0392b'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(w * .1, h * .12); g.lineTo(w * .5, h * .5); g.moveTo(w * .5, h * .12); g.lineTo(w * .1, h * .5); g.stroke();
      g.fillStyle = '#2b3c8f'; g.font = '700 30px Caveat, cursive'; g.fillText('uy… qué feo 😬', w * .38, h * .3);
      g.fillStyle = '#c0392b'; g.font = '700 26px Caveat, cursive'; g.fillText('¡mal!', w * .1, h * .8); g.fillText('???', w * .62, h * .7);
      for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(30,30,80,.55)'; g.beginPath(); g.arc(rnd(10, w - 10), rnd(10, h - 10), rnd(3, 9), 0, 7); g.fill(); }

      let drawing = false, lx = 0, ly = 0, lastCheck = 0;
      const pos = e => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
      const wipe = (x, y) => {
        g.globalCompositeOperation = 'destination-out'; g.lineWidth = 44; g.lineCap = 'round';
        g.beginPath(); g.moveTo(lx, ly); g.lineTo(x, y); g.stroke(); lx = x; ly = y;
        er.style.transform = `translate(${x - 18}px, ${y - 30}px) rotate(${rnd(-14, -6)}deg)`;
      };
      const coverage = () => {
        const d = g.getImageData(0, 0, cv.width, cv.height).data; let clear = 0, tot = 0;
        for (let i = 3; i < d.length; i += 4 * 37) { tot++; if (d[i] < 40) clear++; }
        return clear / tot;
      };
      const finish = () => {
        if (st.done) return; st.done = true; cv.classList.add('gone'); er.classList.remove('on');
        const [x, y] = mid(sheet); FX.hearts(x, y, 26); FX.gold(x, y, 20); FX.toast('Hoja nueva ✨ Todo en orden.'); Music.chime(); FX.vibrate([20, 40, 20]);
      };
      cv.addEventListener('pointerdown', e => { drawing = true; cv.setPointerCapture(e.pointerId); [lx, ly] = pos(e); er.classList.add('on'); wipe(lx, ly); });
      cv.addEventListener('pointermove', e => {
        if (!drawing) return; const [x, y] = pos(e); wipe(x, y);
        const t = performance.now(); if (t - lastCheck > 220) { lastCheck = t; if (coverage() > .55) finish(); }
      });
      const up = () => { drawing = false; er.classList.remove('on'); g.globalCompositeOperation = 'destination-out'; if (!st.done && coverage() > .55) finish(); };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    }
  });

  /* ---------------- 5. COSQUILLAS ---------------- */
  PAGES.push({
    id: 'cosquillas', eyebrow: 'Gracias · 05', title: 'Por las cosquillas',
    copy: 'Gracias porque nos moríamos de risa con tus cosquillas obligadas. Todavía nos duele la barriga (de la risa).',
    hint: '👆 Toca a Karito… ¡y a ellas!', stageCls: 'st-wall',
    treasures: [{ id: 'bikini', html: '👙', style: 'left:44%;top:3%', msg: '👙 Los vestidos de baño: temporada, siempre.' }],
    stage: `
      <div class="wall-deco"><i class="f1"></i><i class="f2"></i><i class="f3"></i><b>JA JA JA</b></div>
      <div class="floor5"></div>
      <div class="trio">
        <div class="t-nata">${Girl.svg({ who: 'nata', armL: 'down', armR: 'down', cls: 'static' })}</div>
        <div class="t-karol">${Girl.svg({ who: 'karol', armL: 'up', armR: 'up', cls: 'static claws' })}</div>
        <div class="t-tati">${Girl.svg({ who: 'tati', armL: 'down', armR: 'down', cls: 'static' })}</div>
      </div>
      <div class="laugh-count"></div>`,
    init(root) {
      const nata = $('.t-nata .girl', root), tati = $('.t-tati .girl', root), karol = $('.t-karol .girl', root);
      let n = 0, party = false;
      const laugh = (g, ms = 1100, txt) => {
        g.classList.add('laugh'); const [x, y] = mid(g);
        FX.float(txt || pick(['JAJAJA', 'JAJAJAJA', 'JIJIJI', 'JAJA 😂']), x + rnd(-20, 20), y - 60, { color: '#fff3c4', size: rnd(20, 28), cls: 'laughtxt' });
        clearTimeout(g._h); g._h = setTimeout(() => g.classList.remove('laugh'), ms);
      };
      karol.parentElement.addEventListener('click', () => {
        n++; karol.classList.add('tickle'); setTimeout(() => karol.classList.remove('tickle'), 900);
        laugh(nata, 1000 + n * 80); laugh(tati, 1000 + n * 80); FX.vibrate([25, 30, 25, 30, 25]); Music.pop();
        if (n >= 6 && !party) { party = true; FX.rain(3000); FX.toast('¡Ya, ya, ya… nos duele la barriga! 😂'); }
      });
      [nata, tati].forEach(g => g.parentElement.addEventListener('click', () => { laugh(g, 900, pick(['¡no, no!', 'JAJAJA', '¡para!'])); FX.vibrate(20); }));
    }
  });

  /* ---------------- 6. LA PUERTA ---------------- */
  PAGES.push({
    id: 'puerta', eyebrow: 'Gracias · 06', title: 'Detrás de la puerta',
    copy: 'Gracias por cada regalito que encontrábamos detrás de la puerta: medias, cucos y más ropa esperando a que la organizáramos. Era tu manera de decir «confío en ustedes».',
    hint: '👆 Toca la puerta', stageCls: 'st-wall',
    treasures: [{ id: 'mama', html: '🌷', style: 'right:6%;bottom:6%', msg: '🌷 Mamá: nuestro primer hogar.' }],
    stage: `
      <div class="floor6"></div>
      <div class="door-scene">
        <div class="light"></div>
        <div class="behind"><i class="present g1">🧦</i><i class="present g2">🩲</i><i class="present g3">👕</i></div>
        <div class="door"><b class="knob"></b><i class="panel p1"></i><i class="panel p2"></i><i class="panel p3"></i><i class="panel p4"></i></div>
        <div class="frame"></div>
      </div>`,
    init(root) {
      const scene = $('.door-scene', root), door = $('.door', root);
      let open = false;
      door.addEventListener('click', () => {
        if (open) return; open = true; scene.classList.add('open'); Music.fanfare(); FX.vibrate([30, 40, 30]);
        const [x, y] = mid(scene); setTimeout(() => { FX.burst(x, y, 50); FX.gold(x, y, 20); }, 450);
      });
      $$('.present', root).forEach((g, i) => g.addEventListener('click', () => {
        if (!open) return; retrigger(g, 'wob'); const [x, y] = mid(g);
        FX.float(['¡Una media sin pareja!', 'Cucos: a organizar', 'A doblar, hermanitas'][i], x, y - 40, { color: '#ffe6a8', size: 20 }); FX.hearts(x, y, 6); Music.pop();
      }));
    },
    leave(root) { /* la puerta queda abierta */ }
  });

  /* ---------------- 7. EL FARO ---------------- */
  const ADVICE = ['Confía en ti', 'Sin miedo', 'Un paso a la vez', 'Tú puedes', 'Cuídate mucho', 'Con fe', 'Respira', 'No te rindas'];
  PAGES.push({
    id: 'faro', eyebrow: 'Gracias · 07', title: 'Por cada consejo',
    copy: 'Gracias por cada consejo, incluso por los que no queríamos escuchar. Fueron un faro en las noches en que no sabíamos hacia dónde ir.',
    hint: '👆 Toca el faro', stageCls: 'st-dusk',
    stage: `
      <svg class="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice">
        <defs><linearGradient id="gBeam7" x1="0" x2="1"><stop offset="0" stop-color="#fff2b8" stop-opacity=".85"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient>
        <linearGradient id="gSea7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a6f9e"/><stop offset="1" stop-color="#143a63"/></linearGradient></defs>
        <g>${stars(40, 5, 260)}</g>
        <circle cx="236" cy="70" r="26" fill="#fff3c4" opacity=".95"/><circle cx="246" cy="62" r="24" fill="#1b2a5e" opacity=".2"/>
        <g fill="#fff" opacity=".18"><ellipse cx="70" cy="110" rx="46" ry="12"/><ellipse cx="96" cy="102" rx="26" ry="12"/><ellipse cx="220" cy="190" rx="40" ry="10"/></g>
        <g transform="translate(0 150)">
        <g class="beam" style="transform-origin:150px 80px"><polygon points="150,80 300,36 300,114" fill="url(#gBeam7)"/><polygon points="150,80 70,68 70,94" fill="url(#gBeam7)" opacity=".5"/></g>
        <rect x="0" y="196" width="300" height="54" fill="url(#gSea7)"/>
        <g class="wave-a"><path d="M-20 200 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 v6 h-300z" fill="#3b86b8" opacity=".7"/></g>
        <g class="lh tap">
          <path d="M96 214 Q150 172 204 214 L212 226 H88Z" fill="#6b5a4a"/>
          <path d="M132 206 L142 98 H158 L168 206Z" fill="#fff"/>
          <path d="M139.9 120 H160.1 L161.7 140 H138.3Z M135.7 170 H164.3 L166 190 H134Z" fill="#d94a4a"/>
          <rect x="140" y="76" width="20" height="22" rx="3" fill="#ffe9a8" class="lamp"/>
          <path d="M136 78 L150 62 L164 78Z" fill="#d94a4a"/><rect x="134" y="96" width="32" height="4" rx="2" fill="#3a3a48"/>
          <circle cx="150" cy="87" r="16" fill="#ffe9a8" opacity=".35" class="glow"/>
        </g>
        <g class="wave-b"><path d="M-20 214 q15 10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 v40 h-300z" fill="#1f5a86" opacity=".9"/></g>
        <rect x="0" y="232" width="300" height="18" fill="#d8c08c"/>
        <path d="M0 232 Q40 222 84 232Z" fill="#d8c08c"/>
        <g class="toe tap" transform="translate(30 222)"><path d="M-9 14 C-10 6 -4 0 2 0 C9 0 12 7 10 14Z" fill="#e8b48d"/><path d="M-3 2 C-1 -1 6 0 7 3.5 C6 6 -2 6.5 -3 2Z" fill="#e6d38a" stroke="#a9763d" stroke-width=".5"/><path d="M0 3 l3 1 l-1 2" stroke="#9b6a35" stroke-width=".4" fill="none"/></g>
        </g>
      </svg>`,
    init(root) {
      const lh = $('.lh', root), toe = $('.toe', root); let i = 0;
      lh.addEventListener('click', () => {
        const lamp = $('.lamp', root), [x, y] = mid(lamp);
        retrigger(lh, 'flash');
        [[-95, -30], [0, -78], [95, -22]].forEach(([dx, dy], k) => setTimeout(() => FX.float(ADVICE[(i++) % ADVICE.length], x + dx, y + dy, { color: '#fff2b8', size: 23, cls: 'script', dx: dx / 3 }), k * 280));
        FX.gold(x, y, 12); Music.pop();
      });
      toe.addEventListener('click', e => {
        e.stopPropagation(); const [x, y] = mid(toe);
        FX.float('🦶 ¡LA UÑA!', x, y - 20, { color: '#ffe6a8', size: 22 }); FX.burst(x, y, 24); FX.vibrate([20, 30, 20]);
        window.App && App.found('una', '🦶 Hallazgo clasificado: la uña más famosa del Eje Cafetero. Nadie vio nada. 🤫');
      });
    }
  });

  /* ---------------- 8. PERSEVERANCIA ---------------- */
  const STEPS = ['Cansancio', 'Dudas', 'Noches largas', 'Un paso más', '¡Lo lograste!'];
  PAGES.push({
    id: 'perseverancia', eyebrow: 'Gracias · 08', title: 'Por tu perseverancia',
    copy: 'Gracias por ser ejemplo de perseverancia. Nos mostraste que no importa cuántos escalones falten: con paciencia, fe y un paso más, se llega.',
    hint: '👆 Toca para ayudarla a subir', stageCls: 'st-dawn',
    treasures: [{ id: 'vale', html: '🎀', style: 'left:6%;top:6%', msg: '🎀 Vale: tu razón para todo.' }],
    stage: `
      <div class="stairs">
        ${STEPS.map((s, i) => `<div class="step" style="left:${4 + i * 19}%;height:${16 + i * 15}%"><span>${s}</span></div>`).join('')}
        <div class="goal">🏆</div>
        <div class="token">${Girl.svg({ who: 'karol', cls: 'static' }).replace('viewBox="-40 0 280 300"', 'viewBox="22 14 156 156"')}</div>
      </div>
      <button class="stage-btn" type="button">Un paso más ⬆</button>`,
    init(root) {
      const token = $('.token', root), btn = $('.stage-btn', root), steps = $$('.step', root);
      let idx = -1;
      const place = () => {
        if (idx < 0) { token.style.left = '1%'; token.style.bottom = '4%'; return; }
        const s = steps[idx]; token.style.left = (parseFloat(s.style.left) + 3) + '%'; token.style.bottom = (parseFloat(s.style.height) + 2) + '%';
      };
      const go = () => {
        if (idx >= 4) { idx = -1; place(); btn.textContent = 'Un paso más ⬆'; return; }
        idx++; place(); retrigger(token, 'hop'); Music.pop(); FX.vibrate(15);
        const [x, y] = mid(token); FX.float(idx === 4 ? '¡LO LOGRASTE!' : '+1 💪', x, y - 36, { color: '#fff3c4', size: idx === 4 ? 26 : 20 });
        if (idx === 4) { setTimeout(() => { FX.fireworks(4); FX.rain(2200); Music.fanfare(); }, 400); btn.textContent = 'Otra vez ↺'; }
      };
      btn.addEventListener('click', go); $('.stairs', root).addEventListener('click', e => { if (e.target.closest('.token, .step, .goal')) go(); });
      place();
    }
  });

  /* ---------------- 9. UNIDAS ---------------- */
  const heart = (c, l) => `<svg viewBox="0 0 100 90"><path d="M50 86 C10 56 0 30 18 14 C32 2 46 10 50 22 C54 10 68 2 82 14 C100 30 90 56 50 86Z" fill="${c}"/><path d="M26 22 C32 14 40 14 44 20" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/><text x="50" y="56" text-anchor="middle" font-family="Great Vibes, cursive" font-size="${l.length > 4 ? 28 : 36}" fill="#fff">${l}</text></svg>`;
  PAGES.push({
    id: 'unidas', eyebrow: 'Gracias · 09', title: 'Por hacernos más unidas',
    copy: 'Gracias por hacernos más unidas cada día. Tres corazones, una sola familia: contigo todo se queda junto.',
    hint: '👆 Toca cada corazón', stageCls: 'st-rose',
    treasures: [{ id: 'lujo', html: '🥂', style: 'right:6%;top:6%', msg: '🥂 Una vida de lujos: ya viene (y mientras tanto, pequeños lujos).' }],
    stage: `
      <div class="hearts3">
        ${Array.from({ length: 9 }, (_, i) => `<span class="bgh" style="--l:${(i * 11 + 6) % 92}%;--s:${14 + (i * 5) % 16}px;--d:${9 + (i * 3) % 7}s;--w:${-i * 1.7}s">♥</span>`).join('')}
        <div class="hrt h-n" style="--x:10%;--y:8%">${heart('#1f8f6b', 'Nata')}</div>
        <div class="hrt h-t" style="--x:62%;--y:8%">${heart('#d65a86', 'Tati')}</div>
        <div class="hrt h-k" style="--x:36%;--y:52%">${heart('#d9a93a', 'Karito')}</div>
        <div class="bigheart">${heart('#e0527a', '')}<em>Siempre juntas</em></div>
        <div class="rings"><i></i><i></i><i></i></div>
      </div>`,
    init(root) {
      const box = $('.hearts3', root), hs = $$('.hrt', root); let moved = 0;
      hs.forEach(h => h.addEventListener('click', () => {
        if (h.classList.contains('moved')) return;
        h.classList.add('moved'); moved++; Music.pop(); FX.vibrate(15);
        const [x, y] = mid(h); FX.hearts(x, y, 6);
        if (moved === 3) setTimeout(() => {
          box.classList.add('merged'); const [bx, by] = mid($('.bigheart', root)); FX.hearts(bx, by, 36); FX.burst(bx, by, 30); Music.chime(); FX.vibrate([30, 50, 30]);
          setTimeout(() => { box.classList.remove('merged'); hs.forEach(h => h.classList.remove('moved')); moved = 0; }, 9000);
        }, 1000);
      }));
    }
  });

  /* ---------------- 10. SER TÍAS (la profunda) ---------------- */
  PAGES.push({
    id: 'tias', eyebrow: 'Gracias · 10', title: 'Por hacernos tías', cls: 'deep',
    copy: `<span style="--d:.8s">Gracias por dejarnos descubrir lo que significa ser tías.</span> <span style="--d:3.4s">Nadie nos dijo que el corazón podía agrandarse de un día para otro, ni que existe un amor que llega sin pedir permiso.</span> <span style="--d:7.6s">Y descubrimos algo más: a ti también te aprendimos a querer distinto al verte convertirte en mamá.</span>`,
    hint: '💗 Toca el corazón', stageCls: 'st-glow',
    stage: `
      <div class="grow-heart tap">
        <div class="halo"></div><div class="halo h2"></div>
        <svg viewBox="0 0 100 90"><defs><radialGradient id="gHeart10" cx=".35" cy=".3"><stop offset="0" stop-color="#ffb3c6"/><stop offset="1" stop-color="#d63d6a"/></radialGradient></defs>
        <path d="M50 86 C10 56 0 30 18 14 C32 2 46 10 50 22 C54 10 68 2 82 14 C100 30 90 56 50 86Z" fill="url(#gHeart10)"/>
        <path d="M24 22 C30 14 40 13 45 20" stroke="#fff" stroke-opacity=".55" stroke-width="4" fill="none" stroke-linecap="round"/></svg>
        <em>Vale</em>
      </div>`,
    init(root) {
      const h = $('.grow-heart', root);
      h.addEventListener('click', () => {
        retrigger(h, 'beat'); const [x, y] = mid(h); FX.hearts(x, y, 14);
        FX.float(pick(['Vale 💗', 'Vale 🎀', 'Vale ✨']), x + rnd(-30, 30), y - 60, { color: '#ffe3ec', size: 24, cls: 'script' }); Music.pop(); FX.vibrate(20);
      });
    }
  });

  /* ---------------- 12. ÁLBUM ---------------- */
  const ALBUM = [
    ['cumpleanos-30-selfie-torta', 'Siempre juntas'], ['playa-selfie', 'Playa mode: ON 🏖️'],
    ['fiesta-grado-globos', 'Las tres, como siempre'], ['muelle-bahia-atardecer', 'Hasta los atardeceres se ven mejor contigo'],
    ['cumpleanos-21', 'Cada cumpleaños, en familia'], ['grado-contadora-publica', 'Los logros se celebran juntas']
  ];
  PAGES.push({
    id: 'album', eyebrow: 'Nuestro álbum', title: 'Lo que hemos vivido',
    copy: 'Cada foto guarda un pedacito de lo que somos: tres hermanas que se eligen, siempre.',
    hint: '👆 Toca para cambiar de foto', stageCls: 'st-sunset',
    treasures: [{ id: 'playa', html: '🏖️', style: 'left:4%;top:5%', msg: '🏖️ La playa: tu lugar feliz.' }],
    stage: `<div class="album">${ALBUM.map((a, i) => `<figure class="ph" style="--rot:${[-3, 3, -2, 2.5, -3.5, 2][i]}deg"><img loading="lazy" decoding="async" src="assets/cut/${a[0]}.png" alt=""><figcaption>${a[1]}</figcaption></figure>`).join('')}</div>`,
    init(root) {
      const album = $('.album', root); let order = $$('.ph', root);
      const layout = () => order.forEach((p, i) => { p.style.zIndex = order.length - i; p.dataset.pos = Math.min(i, 3); });
      layout();
      album.addEventListener('click', () => {
        const top = order[0]; top.classList.add('out');
        setTimeout(() => { top.classList.remove('out'); order = [...order.slice(1), top]; layout(); }, 420);
        const [x, y] = mid(album); FX.gold(x, y, 10); Music.flip();
      });
    }
  });

  /* ---------------- 13. FIRMA + CHANGUA ---------------- */
  PAGES.push({
    id: 'firma', eyebrow: 'Con todo el amor de', title: 'Nata y Tati', cls: 'sign',
    copy: `<span class="ps">P.D.</span> Sabemos que ahora eres pereirana de corazón y que reniegas de tu pasado rolo con orgullo… pero también sabemos que, en secreto, buscas changua en cada panadería del Eje Cafetero y nadie sabe qué es eso. 🍲 Tranquila, Karito: puedes renegar de Bogotá, pero la changua no renegó de ti. Nosotras, rolas de pura cepa, te la guardamos. 💛`,
    hint: '👆 Toca la changua', stageCls: 'st-cold',
    stage: `
      <svg class="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice">
        <defs><radialGradient id="gMilk13" cx=".4" cy=".3"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#efe4cc"/></radialGradient>
        <linearGradient id="gBowl13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b45a"/><stop offset="1" stop-color="#9b7a2e"/></linearGradient></defs>
        <g fill="#8d97bd" opacity=".55"><ellipse cx="60" cy="50" rx="46" ry="14"/><ellipse cx="92" cy="40" rx="26" ry="13"/><ellipse cx="230" cy="86" rx="44" ry="13"/><ellipse cx="206" cy="76" rx="24" ry="12"/></g>
        <path d="M0 210 L40 170 L70 186 L110 120 L150 90 L186 118 L216 100 L250 150 L300 130 V260 H0Z" fill="#2c3560"/>
        <g transform="translate(150 80)"><rect x="-7" y="-14" width="14" height="14" fill="#e9e2cf"/><path d="M-9 -14 L0 -24 L9 -14Z" fill="#c75b4a"/><rect x="-1.5" y="-34" width="3" height="10" fill="#e9e2cf"/><rect x="-5" y="-30" width="10" height="3" fill="#e9e2cf"/></g>
        <g fill="#1f2750"><rect x="10" y="190" width="22" height="70"/><rect x="36" y="176" width="16" height="84"/><rect x="236" y="170" width="20" height="90"/><rect x="262" y="190" width="28" height="70"/><rect x="210" y="200" width="22" height="60"/></g>
        <g fill="#ffd36b" opacity=".8"><rect x="14" y="200" width="3" height="3"/><rect x="22" y="212" width="3" height="3"/><rect x="40" y="190" width="3" height="3"/><rect x="241" y="184" width="3" height="3"/><rect x="246" y="200" width="3" height="3"/><rect x="268" y="204" width="3" height="3"/></g>
        <g stroke="#b9c8ff" stroke-width="1.2" opacity=".55" class="drizzle">${Array.from({ length: 22 }, (_, i) => `<line x1="${(i * 14 + 6) % 296 + 4}" y1="${(i * 37) % 200}" x2="${(i * 14 + 6) % 296}" y2="${(i * 37) % 200 + 12}"/>`).join('')}</g>
        <g transform="translate(0 150)">
        <g class="steam"><path d="M110 100 q-10 -18 0 -34 t0 -30" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M150 96 q-10 -18 0 -34 t0 -30" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round" style="animation-delay:.6s"/>
        <path d="M190 100 q-10 -18 0 -34 t0 -30" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round" style="animation-delay:1.1s"/></g>
        <g class="bowl tap">
          <ellipse cx="150" cy="214" rx="96" ry="10" fill="rgba(0,0,0,.3)"/>
          <path d="M44 120 H256 Q252 196 150 204 Q48 196 44 120Z" fill="url(#gBowl13)"/>
          <ellipse cx="150" cy="120" rx="106" ry="22" fill="#b38b36"/>
          <ellipse cx="150" cy="120" rx="98" ry="17" fill="url(#gMilk13)"/>
          <ellipse cx="136" cy="118" rx="22" ry="9" fill="#fff"/><circle cx="136" cy="117" r="7.5" fill="#f5b21c"/><circle cx="133" cy="115" r="2" fill="#fff" opacity=".7"/>
          <g fill="#3f9a4c"><path d="M180 112 l8 -6 l4 8 l-8 4Z"/><path d="M196 120 l9 -4 l2 8 l-9 2Z"/><path d="M110 124 l8 -3 l3 7 l-9 2Z"/><path d="M166 126 l7 -5 l5 7 l-8 3Z"/></g>
          <g fill="#c98a4b" stroke="#a46a31" stroke-width="1"><rect x="206" y="108" width="14" height="12" rx="3" transform="rotate(12 213 114)"/><rect x="92" y="112" width="13" height="11" rx="3" transform="rotate(-10 98 117)"/></g>
          <text x="150" y="178" text-anchor="middle" font-family="Great Vibes, cursive" font-size="28" fill="#fff6d6">changua</text>
        </g>
        <g transform="translate(246 58) rotate(8)"><rect width="46" height="30" rx="4" fill="#33343e" stroke="#c8a85a" stroke-width="2"/><text x="23" y="13" text-anchor="middle" font-family="Caveat, cursive" font-size="11" fill="#fff6d6">solo en</text><text x="23" y="25" text-anchor="middle" font-family="Caveat, cursive" font-size="13" font-weight="700" fill="#ffd36b">Bogotá</text></g>
        <g class="stamp" transform="translate(46 56) rotate(-12)"><rect width="82" height="38" rx="6" fill="none" stroke="#e0527a" stroke-width="2.5"/><text x="41" y="16" text-anchor="middle" font-family="Playfair Display, serif" font-weight="800" font-size="10" fill="#e0527a">ROLA</text><text x="41" y="30" text-anchor="middle" font-family="Playfair Display, serif" font-weight="800" font-size="10" fill="#e0527a">CERTIFICADA</text></g>
        </g>
      </svg>`,
    init(root) {
      const bowl = $('.bowl', root);
      bowl.addEventListener('click', () => {
        retrigger(bowl, 'wob'); const [x, y] = mid(bowl);
        FX.float(pick(['¡Una changuita!', '¡Qué hambre!', 'Con calado, por favor']), x, y - 70, { color: '#fff6d6', size: 22, cls: 'script' });
        FX.burst(x, y - 30, 16, { colors: ['#fff', '#fffdf5', '#f5b21c', '#3f9a4c'], shape: 'dot', power: 240, gravity: 300 }); Music.pop(); FX.vibrate(15);
      });
    }
  });

  window.PAGES = PAGES;
})();
