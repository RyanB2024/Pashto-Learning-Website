/* utils.js
   Small helper utilities used across scripts.
   Keep tiny and dependency-free.
*/
const Utils = (function () {
    return {
        // Simple query helper
        $: (sel, ctx = document) => ctx.querySelector(sel),
        $$: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),
        // Toggle an ARIA attribute boolean
        toggleAriaPressed(elem, state) {
            if (!elem) return;
            elem.setAttribute('aria-pressed', !!state);
        },
        // Safe text content setter
        setText(el, text) {
            if (!el) return;
            el.textContent = text ?? '';
        },
        // Keyboard helper — activate on Enter or Space
        addKeyboardClick(el, handler) {
            if (!el) return;
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); handler(e);
                }
            });
        }
    };
})();
