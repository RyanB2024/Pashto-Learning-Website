/* search.js
   Dictionary search for dictionary.html
   - Pulls from assets/data/flashcards.json to avoid duplication
   - Accessible: results are announced via aria-live
*/

(function (utils) {
  const input = utils.$('#searchBar');
  const resultsList = utils.$('#searchResults');
  const dictionaryContainer = utils.$('#dictionaryList');
  const live = (() => {
    let el = utils.$('#search-live');
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
      renderFullDictionary(); // optional: pre-render dictionary
    } catch (err) {
      console.error(err);
    }
    input.addEventListener('input', onInput);
  }

  function renderFullDictionary() {
    if (!fullData) return;
    dictionaryContainer.innerHTML = '';
    Object.entries(fullData).forEach(([packName, list]) => {
      const section = document.createElement('section');
      section.className = 'sub-container card';
      const title = document.createElement('strong');
      title.textContent = packName[0].toUpperCase() + packName.slice(1) + ':';
      section.appendChild(title);
      const ul = document.createElement('ul');
      ul.className = 'double-space';
      list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `English: "${item.english}" | Pashto: "${item.pashto}" | Latin: "${item.latin}" | Phonetic: "${item.phonetic}"`;
        ul.appendChild(li);
      });
      section.appendChild(ul);
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
      li.textContent = `${m.english} — ${m.pashto} (${m.latin}) • ${m.phonetic}`;
      resultsList.appendChild(li);
    });
    live.textContent = `${matches.length} results found`;
  }

  document.addEventListener('DOMContentLoaded', init);
})(Utils);
