/* El aporte: $200.000 — tarjeta, elección de destino y comprobante de canje (todo queda en el celular de ella). */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const OPTIONS = [
    { id: 'antojos', icon: '🛍️', name: 'Mis antojos',      tag: 'Un bolso, unos New Balance, un vestido de baño nuevo… un gustico sin culpa.' },
    { id: 'futuro',  icon: '📈', name: 'Mi futuro',        tag: 'Un libro, una joya, un ahorrito. Rendimiento garantizado: nuestro cariño.' },
    { id: 'viaje',   icon: '🏖️', name: 'Mi próximo viaje', tag: 'El primer ladrillo de esa playa que te mereces. El resto lo vamos armando juntas.' }
  ];
  const METHODS = ['Nequi', 'Bancolombia', 'Daviplata', 'Efectivo', 'Otro'];

  const html = `
  <div class="gift">
    <div class="gold-dust" aria-hidden="true"></div>
    <div class="g-eyebrow">Hay algo más…</div>

    <div class="gcard-wrap">
      <div class="gcard blink tap" id="gcard">
        <div class="gcard-inner">
          <div class="gc gc-back"><div class="gc-mono">K</div><div class="gc-tap">toca la tarjeta</div><div class="gc-shine"></div></div>
          <div class="gc gc-front">
            <div class="gc-top"><span class="gc-brand">KARITO</span><span class="gc-ed">APORTE ESPECIAL</span></div>
            <div class="gc-chip"></div>
            <div class="gc-amount"><small>$</small>200.000<em>COP</em></div>
            <div class="gc-bottom"><span>de Nata &amp; Tati</span><span>100% tuyo</span></div>
            <div class="gc-shine"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="g-main">
      <div class="g-step step-a show"><p class="teaser">Las dos te lo están señalando…<br><b>Ábrelo 👇</b></p></div>

      <div class="g-step step-b">
        <h3 class="pitch-title">Un aporte para<br>tus sueños</h3>
        <p class="pitch">Nos encantaría regalarte la playa entera, el bolso y el viaje de lujo… pero somos dos hermanas con presupuesto de hermanas 😅. Así que te dejamos el primer ladrillo: <b>$200.000</b> de aporte para lo que más te haga brillar. Sin letra pequeña, sin “luego te lo pago” y con todo el cariño del mundo.</p>
        <div class="perks"><span>✓ Aporte especial</span><span>✓ Una sola dueña</span><span>✓ Para sueños chicos y grandes</span></div>
      </div>

      <div class="g-step step-c">
        <h3 class="pitch-title sm">Mi aporte es para…</h3>
        <div class="opts">${OPTIONS.map(o => `<button class="opt" data-id="${o.id}"><span class="o-ic">${o.icon}</span><span class="o-tx"><b>${o.name}</b><em>${o.tag}</em></span></button>`).join('')}</div>
      </div>

      <div class="g-step step-d">
        <h3 class="pitch-title sm">¿Cómo lo quieres recibir?</h3>
        <div class="methods">${METHODS.map(m => `<button class="meth" data-m="${m}">${m}</button>`).join('')}</div>
        <p class="note">Tú eliges, nosotras cumplimos. 💛</p>
      </div>

      <div class="g-step step-e">
        <div class="voucher">
          <div class="v-top">APORTE CANJEADO ✓</div>
          <div class="v-amount">$200.000 <small>COP</small></div>
          <div class="v-row"><span>Para</span><b>Karito 💛</b></div>
          <div class="v-row"><span>Aporte para</span><b class="v-dest"></b></div>
          <div class="v-row"><span>Medio</span><b class="v-meth"></b></div>
          <div class="v-note">Muéstrale esta pantalla a Nata o Tati y tu aporte es tuyo.</div>
          <div class="v-stamp">¡FELIZ<br>CUMPLE!</div>
        </div>
      </div>
    </div>

    <button class="g-cta btn-gold" type="button" hidden></button>
    <div class="sisters">
      <div class="s s-nata">${Girl.svg({ who: 'nata', armR: 'point', armL: 'hip', cls: 'static' })}</div>
      <div class="s s-tati">${Girl.svg({ who: 'tati', armL: 'point', armR: 'hip', cls: 'static' })}</div>
    </div>
  </div>`;

  PAGES.push({
    id: 'bono', dark: true, html,
    init(root) {
      const card = $('#gcard', root), cta = $('.g-cta', root), steps = $$('.g-step', root), page = $('.gift', root);
      let step = 'a', choice = null, method = null;
      const show = s => {
        step = s; steps.forEach(x => x.classList.toggle('show', x.classList.contains('step-' + s)));
        page.dataset.step = s; card.classList.toggle('compact', s === 'c' || s === 'd' || s === 'e');
      };
      const setCta = (txt, disabled) => { cta.hidden = false; cta.textContent = txt; cta.disabled = !!disabled; };

      card.addEventListener('click', () => {
        if (step !== 'a') return;
        card.classList.add('flipped'); card.classList.remove('blink'); Music.fanfare(); FX.vibrate([30, 40, 30]);
        const [x, y] = FX.center(card); FX.burst(x, y, 50); FX.gold(x, y, 26);
        setTimeout(() => { show('b'); setCta('¿Para qué es mi aporte?'); $('.step-b', root).classList.add('pop'); }, 750);
      });

      $$('.opt', root).forEach(b => b.addEventListener('click', () => {
        $$('.opt', root).forEach(o => o.classList.remove('sel')); b.classList.add('sel'); choice = OPTIONS.find(o => o.id === b.dataset.id);
        const [x, y] = FX.center(b); FX.gold(x, y, 12); Music.pop(); FX.vibrate(12); setCta('Este es mi aporte'); page.classList.add('cheer'); setTimeout(() => page.classList.remove('cheer'), 700);
      }));

      $$('.meth', root).forEach(b => b.addEventListener('click', () => {
        $$('.meth', root).forEach(o => o.classList.remove('sel')); b.classList.add('sel'); method = b.dataset.m;
        const [x, y] = FX.center(b); FX.gold(x, y, 10); Music.pop(); FX.vibrate(12); setCta('Canjear mi aporte');
      }));

      cta.addEventListener('click', () => {
        if (step === 'b') { show('c'); setCta('Elige para qué', true); }
        else if (step === 'c') { if (!choice) return; show('d'); setCta('Elige cómo recibirlo', true); }
        else if (step === 'd') {
          if (!method) return;
          $('.v-dest', root).textContent = choice.icon + ' ' + choice.name; $('.v-meth', root).textContent = method;
          show('e'); setCta('Escuchándolas… 💛', true); cta.classList.add('ghost');
          Music.fanfare(); FX.fireworks(6); FX.rain(4200); FX.vibrate([40, 60, 40, 60, 80]); page.classList.add('cheer');
          // Felicitación hablada: primero Nata y luego Tati (mueven la boca mientras hablan)
          const mouth = n => $('.s-' + n + ' .girl', root);
          const speech = new Promise(res => setTimeout(() => {
            if (step !== 'e') return res();
            Voice.sequence(['cumple-nata', 'cumple-tati'], {
              onstart: n => { const m = mouth(n.replace('cumple-', '')); m && m.classList.add('talk'); },
              onend: n => { const m = mouth(n.replace('cumple-', '')); m && m.classList.remove('talk'); }
            }).then(res);
          }, 1300));
          // Sin poder avanzar ni retroceder hasta que terminen de hablar
          UILock.hold(speech, { max: 16000, onRelease: () => { if (step === 'e') setCta('Volver al inicio ↺'); } });
        } else if (step === 'e') { Voice.stop(); window.App && App.restart(); }
      });
      root._reset = () => { };
    },
    enter(root) { }
  });
})();
