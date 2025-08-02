let currentIndex = 0;
let currentScript = 'pashto';
let currentPackName = 'clothing';
let currentPack = [];
let isFlipped = true;  // Start showing script side, so "flipped" means showing English

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Initialize pack selector dropdown
    const packSelect = document.getElementById("pack-select");
    for (const pack in allFlashcards) {
        const option = document.createElement("option");
        option.value = pack;
        option.textContent = pack.charAt(0).toUpperCase() + pack.slice(1);
        packSelect.appendChild(option);
    }

    // Set initial pack from URL param or default
    const params = new URLSearchParams(window.location.search);
    currentPackName = params.get("pack") || "clothing";
    currentPackName = currentPackName.toLowerCase();

    if (!(currentPackName in allFlashcards)) {
        currentPackName = "clothing";
    }
    packSelect.value = currentPackName;

    // Load pack
    loadPack(currentPackName);

    // Script selector dropdown
    const scriptSelect = document.getElementById("script-select");
    scriptSelect.value = currentScript;

    // Event listeners
    scriptSelect.addEventListener("change", (e) => {
        currentScript = e.target.value;
        isFlipped = true;  // Show the script side when script changes
        showCard();
    });

    packSelect.addEventListener("change", (e) => {
        currentPackName = e.target.value;
        loadPack(currentPackName);
    });

    document.querySelector(".flip-button").addEventListener("click", flipCard);
    document.querySelector(".next-button").addEventListener("click", nextCard);
    document.querySelector(".prev-button").addEventListener("click", prevCard);
    document.querySelector(".shuffle-button").addEventListener("click", shuffleCards);
    document.querySelector(".speak-button").addEventListener("click", speakCard);

    document.querySelector(".back-button").addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back();
    });
});

function loadPack(packName) {
    currentPack = allFlashcards[packName] || [];
    currentIndex = 0;
    isFlipped = true; // Start showing script side, not English
    document.body.dataset.pack = packName;

    document.getElementById("pack-title").textContent = `Flashcards: ${packName.charAt(0).toUpperCase() + packName.slice(1)}`;
    showCard();
}

function showCard() {
    const cardText = document.getElementById("card-text");
    const counter = document.getElementById("card-counter");

    if (!currentPack.length) {
        cardText.textContent = "No cards available.";
        counter.textContent = "";
        return;
    }

    const card = currentPack[currentIndex];

    if (isFlipped) {
        // Show chosen script side (pashto, latin, phonetic)
        cardText.textContent = card[currentScript] || "No translation";
        cardText.parentElement.classList.add("flipped");
    } else {
        // Show English side
        cardText.textContent = card.english;
        cardText.parentElement.classList.remove("flipped");
    }

    counter.textContent = `Card ${currentIndex + 1} of ${currentPack.length}`;
}

function flipCard() {
    if (!currentPack.length) return;

    isFlipped = !isFlipped;
    showCard();
}

function nextCard() {
    if (!currentPack.length) return;

    currentIndex = (currentIndex + 1) % currentPack.length;
    isFlipped = true;  // Always start on script side when changing cards
    showCard();
}

function prevCard() {
    if (!currentPack.length) return;

    currentIndex = (currentIndex - 1 + currentPack.length) % currentPack.length;
    isFlipped = true;
    showCard();
}

function shuffleCards() {
    for (let i = currentPack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentPack[i], currentPack[j]] = [currentPack[j], currentPack[i]];
    }
    currentIndex = 0;
    isFlipped = true;
    showCard();
}

function speakCard() {
    if (!currentPack.length) return;
    const card = currentPack[currentIndex];

    // Speak what is currently shown
    let textToSpeak = isFlipped ? (card[currentScript] || card.english) : card.english;

    if (!("speechSynthesis" in window)) {
        alert("Sorry, your browser does not support speech synthesis.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
}
