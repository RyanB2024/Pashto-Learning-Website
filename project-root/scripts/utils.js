// utils.js
const Utils = (function () {
    // Detect if we're on GitHub Pages
    const basePath = window.location.hostname.includes('github.io')
        ? '/Pashto-Learning-Website'
        : '';

    return {
        basePath, // export for other scripts
        $: (sel, ctx = document) => ctx.querySelector(sel),
        $$: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),
        toggleAriaPressed(elem, state) {
            if (!elem) return;
            elem.setAttribute('aria-pressed', !!state);
        },
        setText(el, text) {
            if (!el) return;
            el.textContent = text ?? '';
        },
        addKeyboardClick(el, handler) {
            if (!el) return;
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handler(e);
                }
            });
        }
    };
})();
