/**
 * search.js
 * Handles the dictionary search functionality and renders the dictionary list.
 */
import { $ } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    input: $('#searchBar'),
    resultsList: $('#searchResults'),
    dictionaryContainer: $('#dictionaryList'),
    liveRegion: createLiveRegion(),
  };

  let fullData = null;

  async function initialize() {
    try {
      const response = await fetch('../assets/data/flashcards.json');
      if (!response.ok) throw new Error('Could not load dictionary data.');
      fullData = await response.json();
      renderFullDictionary();
    } catch (error) {
      console.error(error);
      if (elements.dictionaryContainer) {
        elements.dictionaryContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
      }
    }
    if (elements.input) {
      elements.input.addEventListener('input', handleInput);
    }
  }

  function createLiveRegion() {
    let region = $('#search-live');
    if (!region) {
      region = document.createElement('div');
      region.id = 'search-live';
      region.className = 'visually-hidden';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
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
    if (!fullData || !elements.dictionaryContainer) return;

    const fragment = document.createDocumentFragment();
    const title = document.createElement('h2');
    title.id = 'full-dict-title';
    title.textContent = 'All Packs';
    fragment.appendChild(title);

    for (const [packName, list] of Object.entries(fullData)) {
      const section = document.createElement('section');
      section.className = 'sub-container card';

      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = packName.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
      section.appendChild(sectionTitle);

      list.forEach(item => section.appendChild(createDictionaryEntry(item)));
      fragment.appendChild(section);
    }
    elements.dictionaryContainer.innerHTML = '';
    elements.dictionaryContainer.appendChild(fragment);
  }

  function handleInput(e) {
    const query = e.target.value.trim().toLowerCase();

    if (!query) {
      elements.dictionaryContainer.style.display = 'block';
      elements.resultsList.style.display = 'none';
      elements.liveRegion.textContent = 'Search cleared.';
      return;
    }

    const matches = findMatches(query);
    renderSearchResults(matches);
  }

  function findMatches(query) {
    const matches = [];
    for (const pack of Object.values(fullData)) {
      for (const item of pack) {
        const searchableText = `${item.english} ${item.pashto} ${item.latin} ${item.phonetic}`.toLowerCase();
        if (searchableText.includes(query)) {
          matches.push(item);
        }
      }
    }
    return matches;
  }

  function renderSearchResults(matches) {
    elements.dictionaryContainer.style.display = 'none';
    elements.resultsList.style.display = 'block';
    elements.resultsList.innerHTML = '';

    if (!matches.length) {
      elements.resultsList.innerHTML = '<li>No Results Found</li>';
      elements.liveRegion.textContent = 'No results found.';
      return;
    }

    const fragment = document.createDocumentFragment();
    matches.forEach(match => {
      const li = document.createElement('li');
      li.appendChild(createDictionaryEntry(match));
      fragment.appendChild(li);
    });

    elements.resultsList.appendChild(fragment);
    elements.liveRegion.textContent = `${matches.length} results found.`;
  }

  initialize();
})();