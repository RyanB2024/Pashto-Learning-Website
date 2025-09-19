// scripts/utils.js
export function $(sel, ctx = document) {
  return ctx.querySelector(sel);
}

export function $$(sel, ctx = document) {
  return Array.from(ctx.querySelectorAll(sel));
}

export function toggleAriaPressed(elem, state) {
  if (!elem) return;
  elem.setAttribute('aria-pressed', !!state);
}

export function setText(el, text) {
  if (!el) return;
  el.textContent = text ?? '';
}

export function addKeyboardClick(el, handler) {
  if (!el) return;
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  });
}
