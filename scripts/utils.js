/**
 * utils.js
 * A collection of utility functions for DOM manipulation and event handling.
 */

/**
 * A query selector shortcut.
 * @param {string} selector - The CSS selector to find.
 * @param {Element} [context=document] - The context to search within.
 * @returns {Element | null} The first matching element or null.
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * A query selector all shortcut that returns an array.
 * @param {string} selector - The CSS selector to find.
 * @param {Element} [context=document] - The context to search within.
 * @returns {Element[]} An array of matching elements.
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Toggles the 'aria-pressed' attribute on an element.
 * @param {Element} element - The element to modify.
 * @param {boolean} state - The state to set.
 */
export function toggleAriaPressed(element, state) {
  if (element) {
    element.setAttribute('aria-pressed', !!state);
  }
}

/**
 * Sets the textContent of an element safely.
 * @param {Element} element - The element to modify.
 * @param {string} text - The text to set.
 */
export function setText(element, text) {
  if (element) {
    element.textContent = text ?? '';
  }
}

/**
 * Adds keyboard support for 'click' events (Enter and Space).
 * @param {Element} element - The element to attach the listener to.
 * @param {Function} handler - The event handler function.
 */
export function addKeyboardClick(element, handler) {
  if (element) {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
  }
}