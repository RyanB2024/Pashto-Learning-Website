/* search.js
   Dictionary search for dictionary.html
   - Pulls from assets/data/flashcards.json to avoid duplication
   - Accessible: results are announced via aria-live
*/
import { $ } from './utils.js';

(function () {
  const input = $('#searchBar');
  const resultsList = $('#searchResults');
  const dictionaryContainer = $('#dictionaryList');
  const live = (() => {
    let el = $('#search-live');
    if (!el) {
      el = document.createElement('div');
      el.id = 'search-live';
      el.className = 'visually-hidden';
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    return el;
  })();

  let fullData = null;

  async function init() {
    try {
      const resp = await fetch('../assets/data/flashcards.json');
      fullData = await resp.json();
      renderFullDictionary();
    } catch (err) {
      console.error(err);
      if (dictionaryContainer) {
        dictionaryContainer.innerHTML = '<p style="color:red;">Error: Could not load dictionary data.</p>';
      }
    }
    if (input) {
      input.addEventListener('input', onInput);
    }
  }

  function createDictionaryEntry(item) {
    const entry = document.createElement('div');
    entry.className = 'dictionary-entry';

    entry.innerHTML = `
      <div class="entry-header">
        <span class="entry-term">${item.english}</span>
        <span class="entry-phonetic">[${item.phonetic}]</span>
      </div>
      <div class="entry-details">
        <div><strong>Pashto:</strong> <span class="entry-pashto">${item.pashto}</span></div>
        <div><strong>Latin:</strong> ${item.latin}</div>
      </div>
    `;
    return entry;
  }

  function renderFullDictionary() {
    if (!fullData || !dictionaryContainer) return;
    dictionaryContainer.innerHTML = '';
    const fullDictTitle = document.createElement('h2');
    fullDictTitle.id = 'full-dict-title';
    fullDictTitle.textContent = 'All Packs';
    dictionaryContainer.appendChild(fullDictTitle);

    Object.entries(fullData).forEach(([packName, list]) => {
      const section = document.createElement('section');
      section.className = 'sub-container card';
      const title = document.createElement('h3');
      title.textContent = packName[0].toUpperCase() + packName.slice(1).replace(/([A-Z])/g, ' $1');
      section.appendChild(title);

      list.forEach(item => {
        section.appendChild(createDictionaryEntry(item));
      });
      dictionaryContainer.appendChild(section);
    });
  }

  function onInput(e) {
    const q = (e.target.value || '').trim().toLowerCase();
    resultsList.innerHTML = '';
    if (!q) {
      dictionaryContainer.style.display = 'block';
      resultsList.style.display = 'none';
      live.textContent = '';
      return;
    }
    dictionaryContainer.style.display = 'none';
    resultsList.style.display = 'block';

    const matches = [];
    Object.values(fullData || {}).forEach(arr => {
      arr.forEach(item => {
        const text = `${item.english} ${item.pashto} ${item.latin} ${item.phonetic}`.toLowerCase();
        if (text.includes(q)) matches.push(item);
      });
    });

    if (!matches.length) {
      const li = document.createElement('li');
      li.textContent = 'No Results Found';
      resultsList.appendChild(li);
      live.textContent = 'No results found';
      return;
    }

    matches.forEach(m => {
      const li = document.createElement('li');
      li.appendChild(createDictionaryEntry(m));
      resultsList.appendChild(li);
    });
    live.textContent = `${matches.length} results found`;
  }

  document.addEventListener('DOMContentLoaded', init);
})();