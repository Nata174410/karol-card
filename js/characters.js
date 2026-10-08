/* Las tres hermanas, dibujadas en SVG.
   Girl.svg({who:'nata'|'tati'|'karol', armR:'wave', armL:'down', cls:''}) -> string */
(function () {
  const SISTERS = {
    nata:  { hair: 'straight', hairColor: '#1b1417', skin: '#efbd98', outfit: 'dress', outfitColor: '#1f6b57', lips: '#c2554f', hoops: false, cuff: true },
    tati:  { hair: 'wavy',     hairColor: '#20161a', skin: '#e8b48d', outfit: 'tee',   outfitColor: '#f4efe6', lips: '#b3262f', hoops: false, cuff: false },
    karol: { hair: 'straight', hairColor: '#171114', skin: '#eab994', outfit: 'tee',   outfitColor: '#2b2630', lips: '#c2554f', hoops: true,  cuff: false }
  };

  // Coordenadas del brazo derecho (de la pantalla). El izquierdo se refleja.
  const POSES = {
    down:  { E: [158, 236], H: [161, 286], hand: 'fist' },
    wave:  { E: [182, 206], H: [190, 132], hand: 'open' },
    up:    { E: [178, 152], H: [172, 100], hand: 'open' },
    point: { E: [174, 150], H: [208, 114], hand: 'point' },
    hip:   { E: [176, 218], H: [150, 240], hand: 'fist' },
    clap:  { E: [160, 226], H: [108, 212], hand: 'fist' }
  };
  const S = [142, 178];
  const mir = p => [200 - p[0], p[1]];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const f = n => Math.round(n * 10) / 10;

  function hand(kind, E, H, skin) {
    const ang = Math.atan2(H[1] - E[1], H[0] - E[0]) * 180 / Math.PI + 90; // 0 = apunta hacia arriba
    let inner = '';
    if (kind === 'open') {
      [-34, -12, 12, 34].forEach(a => {
        inner += `<ellipse cx="0" cy="-17" rx="3.6" ry="9.5" fill="${skin}" transform="rotate(${a})"/>`;
      });
      inner += `<ellipse cx="-10" cy="-4" rx="3.8" ry="8" fill="${skin}" transform="rotate(-62 -10 -4)"/>`;
      inner += `<circle cx="0" cy="0" r="11" fill="${skin}"/>`;
    } else if (kind === 'point') { // mano abierta, "presentando" (sin dedo parado)
      inner += `<rect x="-6.8" y="-27" width="13.6" height="27" rx="6.8" fill="${skin}"/>`;
      inner += `<path d="M-2.8 -22 V-8 M2.6 -22 V-8" stroke="rgba(0,0,0,.14)" stroke-width="1.2" stroke-linecap="round"/>`;
      inner += `<ellipse cx="-9.5" cy="-4" rx="3.8" ry="8.5" fill="${skin}" transform="rotate(-48 -9.5 -4)"/>`;
      inner += `<circle cx="0" cy="0" r="9.5" fill="${skin}"/>`;
    } else {
      inner += `<circle cx="0" cy="0" r="9.5" fill="${skin}"/>`;
    }
    return `<g transform="translate(${f(H[0])} ${f(H[1])}) rotate(${f(ang)})">${inner}</g>`;
  }

  function arm(side, pose, sk, sleeve) {
    const P = POSES[pose] || POSES.down;
    let s = S, e = P.E, h = P.H;
    if (side === 'l') { s = mir(s); e = mir(e); h = mir(h); }
    const sl = sleeve ? (p => `<line x1="${f(s[0])}" y1="${f(s[1])}" x2="${f(p[0])}" y2="${f(p[1])}" stroke="${sleeve}" stroke-width="22" stroke-linecap="round"/>`)(lerp(s, e, .5)) : '';
    return `<g class="arm arm-${side} pose-${pose}">
      <line x1="${f(s[0])}" y1="${f(s[1])}" x2="${f(e[0])}" y2="${f(e[1])}" stroke="${sk}" stroke-width="15" stroke-linecap="round"/>
      ${sl}
      <g class="fore" style="transform-origin:${f(e[0])}px ${f(e[1])}px">
        <line x1="${f(e[0])}" y1="${f(e[1])}" x2="${f(h[0])}" y2="${f(h[1])}" stroke="${sk}" stroke-width="14" stroke-linecap="round"/>
        ${hand(P.hand, e, h, sk)}
      </g></g>`;
  }

  function svg(o) {
    const w = o.who || 'nata';
    const c = Object.assign({}, SISTERS[w], o);
    const sk = c.skin, shade = '#d79c78', hc = c.hairColor;
    const wavy = c.hair === 'wavy';

    const hairBack = wavy
      ? `M54 92 C28 26 172 26 146 92 C178 118 150 146 178 176 C200 200 156 214 180 240 C192 262 160 276 166 290 C140 302 126 284 100 294 C74 284 60 302 34 290 C40 276 8 262 20 240 C44 214 0 200 22 176 C50 146 22 118 54 92Z`
      : `M54 92 C44 28 156 28 146 92 C150 150 166 220 158 284 C130 294 70 294 42 284 C34 220 50 150 54 92Z`;
    const cap = wavy
      ? `M44 104 C24 22 176 22 156 104 C154 78 140 56 112 54 C84 50 60 66 44 104Z`
      : `M48 100 C38 28 162 28 152 100 C150 72 128 52 100 56 C72 52 50 72 48 100Z`;
    const lockL = wavy
      ? `M52 94 C32 138 70 160 46 198 C32 228 66 250 42 280 C74 276 86 246 74 218 C64 192 84 166 66 132 C60 116 60 104 58 96Z`
      : `M52 94 C47 140 50 214 40 272 C62 274 70 232 68 178 C66 140 60 112 58 96Z`;
    const lockR = wavy
      ? `M148 94 C168 138 130 160 154 198 C168 228 134 250 158 280 C126 276 114 246 126 218 C136 192 116 166 134 132 C140 116 140 104 142 96Z`
      : `M148 94 C153 140 150 214 160 272 C138 274 130 232 132 178 C134 140 140 112 142 96Z`;

    let outfit = '', sleeve = null, extras = '';
    if (c.outfit === 'dress') {
      outfit = `<path d="M46 300 C44 232 48 206 62 192 C74 198 86 206 100 200 C114 206 126 198 138 192 C152 206 156 232 154 300Z" fill="${c.outfitColor}"/>
        <path d="M60 200 C70 250 70 270 66 300 M84 208 C88 250 86 275 84 300 M116 208 C112 250 114 275 116 300 M140 200 C130 250 130 270 134 300" stroke="rgba(255,255,255,.14)" stroke-width="3" fill="none"/>
        <path d="M70 194 L76 160 M130 194 L124 160" stroke="${c.outfitColor}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
      extras = `<path d="M86 150 Q100 200 114 150" stroke="#d9b45a" stroke-width="1.6" fill="none"/><circle cx="100" cy="186" r="4" fill="#e8c76a"/>`;
    } else {
      outfit = `<path d="M46 300 C44 232 48 196 82 170 Q100 190 118 170 C152 196 156 232 154 300Z" fill="${c.outfitColor}"/>
        <path d="M82 170 Q100 190 118 170" stroke="rgba(0,0,0,.18)" stroke-width="3" fill="none"/>`;
      sleeve = c.outfitColor;
      if (w === 'tati') extras = `<path d="M88 156 Q100 188 112 156" stroke="#cfd3d8" stroke-width="1.4" fill="none"/>`;
      if (w === 'karol') extras = `<path d="M88 156 Q100 186 112 156" stroke="#d9b45a" stroke-width="1.4" fill="none"/>`;
    }

    const earrings = c.hoops
      ? `<circle cx="54" cy="108" r="7" fill="none" stroke="#e1b94f" stroke-width="2.4"/><circle cx="146" cy="108" r="7" fill="none" stroke="#e1b94f" stroke-width="2.4"/>`
      : c.cuff ? `<circle cx="146" cy="104" r="3" fill="#e1b94f"/><circle cx="146" cy="94" r="2.4" fill="#e1b94f"/>` : `<circle cx="54" cy="106" r="2.6" fill="#e8e3dc"/><circle cx="146" cy="106" r="2.6" fill="#e8e3dc"/>`;

    const lipsW = w === 'tati' ? 3.6 : 2.4;
    const eye = x => `<g transform="translate(${x} 92)"><ellipse rx="5.4" ry="6.8" fill="#2a1a17"/><circle cx="-1.8" cy="-2.4" r="1.9" fill="#fff"/><path d="M-8.5 -3 Q0 -10.5 8.5 -3" stroke="#150d0f" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;

    return `<svg class="girl girl-${w} ${o.cls || ''}" viewBox="-40 0 280 300" xmlns="http://www.w3.org/2000/svg" aria-label="${w}">
      <g class="bobber">
        <path d="${hairBack}" fill="${hc}"/>
        <rect x="90" y="124" width="20" height="50" rx="9" fill="${shade}"/>
        <path d="M46 300 C44 228 50 188 86 166 L114 166 C150 188 156 228 154 300Z" fill="${sk}"/>
        ${outfit}
        ${extras}
        ${arm('l', o.armL || 'down', sk, sleeve)}
        ${arm('r', o.armR || 'down', sk, sleeve)}
        <g class="head">
          <ellipse cx="55" cy="94" rx="5.5" ry="8.5" fill="${shade}"/><ellipse cx="145" cy="94" rx="5.5" ry="8.5" fill="${shade}"/>
          ${earrings}
          <path d="M55 86 C55 40 145 40 145 86 C145 122 124 141 100 141 C76 141 55 122 55 86Z" fill="${sk}"/>
          <ellipse cx="72" cy="109" rx="9" ry="5.5" fill="#f08a8a" opacity=".38"/><ellipse cx="128" cy="109" rx="9" ry="5.5" fill="#f08a8a" opacity=".38"/>
          <g fill="#b8774f" opacity=".42"><circle cx="86" cy="103" r="1.1"/><circle cx="92" cy="107" r="1.1"/><circle cx="108" cy="107" r="1.1"/><circle cx="114" cy="103" r="1.1"/><circle cx="78" cy="100" r="1"/><circle cx="122" cy="100" r="1"/></g>
          <g class="eyes" style="transform-origin:100px 92px">${eye(81)}${eye(119)}</g>
          <path d="M69 77 Q81 69 94 75 M106 75 Q119 69 131 77" stroke="${hc}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
          <path d="M98 103 Q100 108 104 105" stroke="#c9906d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <g class="mouth" style="transform-origin:100px 116px"><path d="M82 114 Q100 138 118 114 Q100 121 82 114Z" fill="#fff" stroke="${c.lips}" stroke-width="${lipsW}" stroke-linejoin="round"/></g>
          <path d="${cap}" fill="${hc}"/>
          <path d="M60 70 C72 52 94 46 100 50" stroke="rgba(255,255,255,.2)" stroke-width="4" fill="none" stroke-linecap="round"/>
        </g>
        <path d="${lockL}" fill="${hc}"/><path d="${lockR}" fill="${hc}"/>
        <path d="M54 150 C52 190 52 220 48 250" stroke="rgba(255,255,255,.12)" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  window.Girl = { svg, SISTERS };
})();
