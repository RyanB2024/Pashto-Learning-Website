/* flashcards.js
   Responsible for flashcard UI & behaviour.
   - Loads JSON data
   - Handles pack/script selection, flip, next/prev, shuffle
   - Adds speech synthesis (with graceful fallback)
*/
import { $, addKeyboardClick, setText } from './utils.js';

const Flashcards = (function () {
    // DOM refs (cache for performance)
    const refs = {
        packSelect: null,
        scriptSelect: null,
        packTitle: null,
        cardText: null,
        cardCounter: null,
        flipBtn: null,
        nextBtn: null,
        prevBtn: null,
        shuffleBtn: null,
        speakBtn: null,
        cardContainer: null
    };

    // Internal state
    let data = {};              // full JSON data
    let currentPack = [];
    let packName = 'clothing';
    let currentIndex = 0;
    let currentScript = 'pashto'; // 'pashto' | 'latin' | 'phonetic'
    let isShowingEnglish = false;

    // Initialize module
    async function init() {
        // DOM
        refs.packSelect = $('#pack-select');
        refs.scriptSelect = $('#script-select');
        refs.packTitle = $('#pack-title');
        refs.cardText = $('#card-text');
        refs.cardCounter = $('#card-counter');
        refs.flipBtn = $('.flip-button');
        refs.nextBtn = $('.next-button');
        refs.prevBtn = $('.prev-button');
        refs.shuffleBtn = $('.shuffle-button');
        refs.speakBtn = $('.speak-button');
        refs.cardContainer = $('.flashcard-card');

        // Load saved preferences
        const savedScript = localStorage.getItem('lp_script');
        const savedPack = localStorage.getItem('lp_pack');
        if (savedScript) currentScript = savedScript;
        if (savedPack) packName = savedPack;

        // Fetch data file
        try {
            const resp = await fetch('../assets/data/flashcards.json');
            if (!resp.ok) throw new Error('Failed to load flashcard data');
            data = await resp.json();
        } catch (err) {
            console.error(err);
            setText(refs.cardText, 'Error loading cards.');
            return;
        }

        populatePackOptions();
        bindEvents();

        // set selects
        refs.scriptSelect.value = currentScript;
        refs.packSelect.value = packName;
        loadPack(packName);
        updateCard();
    }

    function populatePackOptions() {
        refs.packSelect.innerHTML = '';
        Object.keys(data).forEach((k) => {
            const opt = document.createElement('option');
            opt.value = k;
            opt.textContent = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
            refs.packSelect.appendChild(opt);
        });
    }

    function bindEvents() {
        refs.scriptSelect.addEventListener('change', (e) => {
            currentScript = e.target.value;
            localStorage.setItem('lp_script', currentScript);
            isShowingEnglish = false;
            updateCard();
        });

        refs.packSelect.addEventListener('change', (e) => {
            loadPack(e.target.value);
            localStorage.setItem('lp_pack', packName);
        });

        refs.flipBtn.addEventListener('click', toggleFlip);
        refs.nextBtn.addEventListener('click', nextCard);
        refs.prevBtn.addEventListener('click', prevCard);
        refs.shuffleBtn.addEventListener('click', shufflePack);
        refs.speakBtn.addEventListener('click', speakCard);
        // Keyboard support
        addKeyboardClick(refs.flipBtn, toggleFlip);
        addKeyboardClick(refs.nextBtn, nextCard);
        addKeyboardClick(refs.prevBtn, prevCard);

        // Allow clicking the card to flip
        refs.cardContainer.addEventListener('click', toggleFlip);
    }

    function loadPack(name) {
        packName = name;
        currentPack = data[name] || [];
        currentIndex = 0;
        isShowingEnglish = false;
        updateCard();
    }

    function updateCard() {
        if (!currentPack.length) {
            setText(refs.cardText, 'No cards available.');
            setText(refs.cardCounter, '');
            return;
        }
        const card = currentPack[currentIndex];
        const shown = isShowingEnglish ? card.english : (card[currentScript] || card.english);
        setText(refs.cardText, shown);
        setText(refs.cardCounter, `Card ${currentIndex + 1} of ${currentPack.length}`);
        refs.cardContainer.setAttribute('aria-label', `${shown}. ${refs.cardCounter.textContent}`);
        refs.flipBtn.setAttribute('aria-pressed', isShowingEnglish ? 'true' : 'false');
    }

    function toggleFlip(e) {
        if (!currentPack.length) return;
        isShowingEnglish = !isShowingEnglish;
        updateCard();
    }

    function nextCard() {
        if (!currentPack.length) return;
        currentIndex = (currentIndex + 1) % currentPack.length;
        isShowingEnglish = false;
        updateCard();
    }

    function prevCard() {
        if (!currentPack.length) return;
        currentIndex = (currentIndex - 1 + currentPack.length) % currentPack.length;
        isShowingEnglish = false;
        updateCard();
    }

    function shufflePack() {
        if (!currentPack.length) return;
        for (let i = currentPack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentPack[i], currentPack[j]] = [currentPack[j], currentPack[i]];
        }
        currentIndex = 0;
        isShowingEnglish = false;
        updateCard();
    }

    function speakCard() {
        if (!currentPack.length) return;
        const text = isShowingEnglish ? currentPack[currentIndex].english : (currentPack[currentIndex][currentScript] || currentPack[currentIndex].english);
        if (!('speechSynthesis' in window)) {
            // Accessible message instead of alert
            setText(refs.cardText, text + ' (speech not supported by this browser)');
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    // Expose init
    return { init };
})();

// initialize on DOM ready
document.addEventListener('DOMContentLoaded', Flashcards.init);