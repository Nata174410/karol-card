# Tarjeta de cumpleaños para Karito 💛

Página estática (HTML + CSS + JS puro, sin build) pensada para verse en el celular.

## Probar en local

```bash
python3 -m http.server 8765
# abrir http://localhost:8765
```

Para verla en el celular (misma red wifi): `http://<IP-de-tu-computador>:8765`
(la IP la ves con `ipconfig getifaddr en0` en Mac).

## Estructura

- `index.html` — esqueleto (intro, libro, modal)
- `js/characters.js` — Nata, Tati y Karito dibujadas en SVG
- `js/scenes.js` — las páginas de "gracias" (cada una con su animación)
- `js/gift.js` — el bono de $200.000 (tarjeta, elección, cupón)
- `js/music.js` — música generada con Web Audio (no hay archivos de audio)
- `js/fx.js` — confeti, textos flotantes, vibración
- `js/app.js` — intro, navegación del libro, tesoros escondidos
- `assets/cut/` — fotos grupales con fondo removido (se usan en el álbum)

## Notas

- Los tesoros encontrados se guardan en el `localStorage` del celular de Karito.
- Para reiniciar los tesoros en el navegador: `localStorage.clear()`.
- El bono NO envía nada a ningún lado: la elección solo se muestra en pantalla.
