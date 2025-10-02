/**
 * flashcards.js
 * Manages the UI and behavior of the flashcards learning module.
 */
import { $, addKeyboardClick, setText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        packSelect: $('#pack-select'),
        scriptSelect: $('#script-select'),
        packTitle: $('#pack-title'),
        cardText: $('#card-text'),
        cardCounter: $('#card-counter'),
        flipBtn: $('.flip-button'),
        nextBtn: $('.next-button'),
        prevBtn: $('.prev-button'),
        shuffleBtn: $('.shuffle-button'),
        speakBtn: $('.speak-button'),
        cardContainer: $('.flashcard-card')
    };

    let allData = {};
    let currentPack = [];
    let state = {
        packName: 'clothing',
        currentIndex: 0,
        currentScript: 'pashto',
        isShowingEnglish: false,
    };

    async function initialize() {
        loadPreferences();
        await fetchData();
        populatePackOptions();
        bindEvents();
        updateUI();
    }

    function loadPreferences() {
        state.currentScript = localStorage.getItem('lp_script') || 'pashto';
        state.packName = localStorage.getItem('lp_pack') || 'clothing';
    }

    async function fetchData() {
        try {
            const response = await fetch('../assets/data/flashcards.json');
            if (!response.ok) throw new Error('Failed to load flashcard data');
            allData = await response.json();
        } catch (error) {
            console.error(error);
            setText(elements.cardText, 'Error loading cards.');
        }
    }

    function populatePackOptions() {
        elements.packSelect.innerHTML = Object.keys(allData).map(key =>
            `<option value="${key}">${key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</option>`
        ).join('');
    }

    function bindEvents() {
        elements.scriptSelect.addEventListener('change', handleScriptChange);
        elements.packSelect.addEventListener('change', handlePackChange);
        elements.flipBtn.addEventListener('click', flipCard);
        elements.cardContainer.addEventListener('click', flipCard);
        elements.nextBtn.addEventListener('click', nextCard);
        elements.prevBtn.addEventListener('click', prevCard);
        elements.shuffleBtn.addEventListener('click', shufflePack);
        elements.speakBtn.addEventListener('click', speakCard);

        addKeyboardClick(elements.flipBtn, flipCard);
        addKeyboardClick(elements.nextBtn, nextCard);
        addKeyboardClick(elements.prevBtn, prevCard);
    }

    function updateUI() {
        elements.scriptSelect.value = state.currentScript;
        elements.packSelect.value = state.packName;
        loadPack(state.packName);
    }

    function loadPack(packName) {
        state.packName = packName;
        currentPack = allData[packName] || [];
        state.currentIndex = 0;
        state.isShowingEnglish = false;
        renderCard();
    }

    function renderCard() {
        if (!currentPack.length) {
            setText(elements.cardText, 'No cards available.');
            setText(elements.cardCounter, '');
            return;
        }

        const card = currentPack[state.currentIndex];
        const textToShow = state.isShowingEnglish ? card.english : (card[state.currentScript] || card.english);

        setText(elements.cardText, textToShow);
        setText(elements.cardCounter, `Card ${state.currentIndex + 1} of ${currentPack.length}`);

        elements.cardContainer.setAttribute('aria-label', `${textToShow}. ${elements.cardCounter.textContent}`);
        elements.flipBtn.setAttribute('aria-pressed', state.isShowingEnglish);
    }

    function handleScriptChange(e) {
        state.currentScript = e.target.value;
        localStorage.setItem('lp_script', state.currentScript);
        state.isShowingEnglish = false;
        renderCard();
    }

    function handlePackChange(e) {
        loadPack(e.target.value);
        localStorage.setItem('lp_pack', state.packName);
    }

    function flipCard() {
        if (!currentPack.length) return;
        state.isShowingEnglish = !state.isShowingEnglish;
        renderCard();
    }

    function nextCard() {
        if (!currentPack.length) return;
        state.currentIndex = (state.currentIndex + 1) % currentPack.length;
        state.isShowingEnglish = false;
        renderCard();
    }

    function prevCard() {
        if (!currentPack.length) return;
        state.currentIndex = (state.currentIndex - 1 + currentPack.length) % currentPack.length;
        state.isShowingEnglish = false;
        renderCard();
    }

    function shufflePack() {
        if (!currentPack.length) return;
        for (let i = currentPack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentPack[i], currentPack[j]] = [currentPack[j], currentPack[i]];
        }
        state.currentIndex = 0;
        state.isShowingEnglish = false;
        renderCard();
    }

    function speakCard() {
        if (!currentPack.length || !('speechSynthesis' in window)) return;

        const card = currentPack[state.currentIndex];
        const text = state.isShowingEnglish ? card.english : (card[state.currentScript] || card.english);

        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    initialize();
});