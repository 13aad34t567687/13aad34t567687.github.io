import { QuartzComponent, QuartzComponentConstructor } from "./types"

const style = `
.qlb-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.85); display: none; align-items: center; justify-content: center; z-index: 9999; }
.qlb-overlay.show { display: flex; }
.qlb-overlay img { max-width: 92vw; max-height: 92vh; box-shadow: 0 10px 30px rgba(0,0,0,.4); border-radius: 8px; }
.qlb-overlay .close { position: absolute; top: 20px; right: 24px; font-size: 26px; color: #fff; cursor: pointer; opacity: .9; }
.article img { cursor: zoom-in; }
`

const script = `
(() => {
  const overlay = document.createElement('div');
  overlay.className = 'qlb-overlay';
  overlay.innerHTML = '<span class="close">×</span><img />';
  document.body.appendChild(overlay);
  const imgEl = overlay.querySelector('img');
  const close = () => overlay.classList.remove('show');
  overlay.addEventListener('click', (e) => { const t = e.target; if (t === overlay || (t && t.classList && t.classList.contains('close'))) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  function bind() {
    document.querySelectorAll('article img').forEach((img) => {
      img.addEventListener('click', () => {
        if (imgEl) imgEl.setAttribute('src', (img).src);
        overlay.classList.add('show');
      });
    });
  }
  bind();
  document.addEventListener('nav', bind);
})();
`

const ImageLightbox: QuartzComponent = () => null
ImageLightbox.css = style
ImageLightbox.afterDOMLoaded = script

export default (() => ImageLightbox) satisfies QuartzComponentConstructor