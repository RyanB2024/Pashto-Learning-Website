// Back Button
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.history.back();
    });
}

// All flashcards data
const allFlashcards = {
    clothing: [
        { english: "Shirt", pashto: "کمیس", latin: "Kamees", phonetic: "ka-mees", image: "images/clothing/shirt.jpeg" },
        { english: "Pants", pashto: "پتلون", latin: "Patloon", phonetic: "pat-loon", image: "images/clothing/pants.png" },
        { english: "Hat", pashto: "خولۍ", latin: "Kholai", phonetic: "kho-lai", image: "images/clothing/hat.png" },
        { english: "Shoes", pashto: "بوټان", latin: "Bootan", phonetic: "boo-tan", image: "images/clothing/shoes.png" },
        { english: "Scarf", pashto: "شال", latin: "Shaal", phonetic: "shaal", image: "images/clothing/scarf.png" },
        { english: "Jacket", pashto: "جرابۍ", latin: "Joraabee", phonetic: "jo-ra-bee", image: "images/clothing/jacket.png" },
        { english: "Dress", pashto: "کالي", latin: "Kaali", phonetic: "kaa-lee", image: "images/clothing/dress.png" },
        { english: "Coat", pashto: "کوټ", latin: "Kot", phonetic: "kot", image: "images/clothing/coat.png" },
        { english: "Gloves", pashto: "لاس ګرمۍ", latin: "Las Garmi", phonetic: "las gar-mee", image: "images/clothing/gloves.png" },
        { english: "Belt", pashto: "کمربند", latin: "Kamarband", phonetic: "ka-mar-band", image: "images/clothing/belt.png" },
        { english: "Tie", pashto: "ټای", latin: "Tie", phonetic: "tie", image: "images/clothing/tie.png" },
        { english: "Socks", pashto: "جرابې", latin: "Jaraabay", phonetic: "ja-ra-bay", image: "images/clothing/socks.png" },
        { english: "Sweater", pashto: "سویټر", latin: "Sweater", phonetic: "swea-ter", image: "images/clothing/sweater.png" },
        { english: "Shorts", pashto: "شارټس", latin: "Shorts", phonetic: "shorts", image: "images/clothing/shorts.png" },
        { english: "Boots", pashto: "بوټونه", latin: "Bootona", phonetic: "boo-to-na", image: "images/clothing/boots.png" }
    ],
    colors: [
        { english: "Red", pashto: "سره", latin: "Sra", phonetic: "sra", image: "images/colors/red.png" },
        { english: "Blue", pashto: "شنه", latin: "Shna", phonetic: "shna", image: "images/colors/blue.png" },
        { english: "Green", pashto: "شنه", latin: "Shna", phonetic: "shna", image: "images/colors/green.png" },
        { english: "Yellow", pashto: "زیړ", latin: "Zeeṛ", phonetic: "zee-r", image: "images/colors/yellow.png" },
        { english: "Black", pashto: "تور", latin: "Tor", phonetic: "tor", image: "images/colors/black.png" },
        { english: "White", pashto: "سپین", latin: "Spin", phonetic: "spin", image: "images/colors/white.png" },
        { english: "Orange", pashto: "نارنجي", latin: "Narenji", phonetic: "na-ren-ji", image: "images/colors/orange.png" },
        { english: "Purple", pashto: "ارغواني", latin: "Arghwani", phonetic: "ar-ghwa-ni", image: "images/colors/purple.png" },
        { english: "Brown", pashto: "نسواري", latin: "Naswari", phonetic: "nas-wa-ri", image: "images/colors/brown.png" },
        { english: "Pink", pashto: "ګلابي", latin: "Gulabi", phonetic: "gu-la-bi", image: "images/colors/pink.png" }
    ],
    commonPhrases: [
        { english: "Hello", pashto: "سلام", latin: "Salam", phonetic: "sa-lam", image: "images/phrases/hello.png" },
        { english: "Thank you", pashto: "مننه", latin: "Manana", phonetic: "ma-na-na", image: "images/phrases/thank_you.png" },
        { english: "Please", pashto: "لطفا", latin: "Lutfan", phonetic: "lut-fan", image: "images/phrases/please.png" },
        { english: "Yes", pashto: "هو", latin: "Ho", phonetic: "ho", image: "images/phrases/yes.png" },
        { english: "No", pashto: "نه", latin: "Na", phonetic: "na", image: "images/phrases/no.png" },
        { english: "How are you?", pashto: "څنګه یی؟", latin: "Tsenga yi?", phonetic: "tse-nga yi", image: "images/phrases/how_are_you.png" },
        { english: "Goodbye", pashto: "خدای پامان", latin: "Khudai paaman", phonetic: "khu-dai paa-man", image: "images/phrases/goodbye.png" }
    ],
    day: [
        { english: "Monday", pashto: "دوشنبه", latin: "Dushanba", phonetic: "du-shan-ba", image: "images/days/monday.png" },
        { english: "Tuesday", pashto: "سه شنبه", latin: "Se shanba", phonetic: "se shan-ba", image: "images/days/tuesday.png" },
        { english: "Wednesday", pashto: "چهارشنبه", latin: "Char shanba", phonetic: "char shan-ba", image: "images/days/wednesday.png" },
        { english: "Thursday", pashto: "پنجشنبه", latin: "Panj shanba", phonetic: "panj shan-ba", image: "images/days/thursday.png" },
        { english: "Friday", pashto: "جمعه", latin: "Juma", phonetic: "ju-ma", image: "images/days/friday.png" },
        { english: "Saturday", pashto: "شنبه", latin: "Shanba", phonetic: "shan-ba", image: "images/days/saturday.png" },
        { english: "Sunday", pashto: "یکشنبه", latin: "Yakshanba", phonetic: "yak-shan-ba", image: "images/days/sunday.png" }
    ],
    numbers: [
        { english: "One", pashto: "یو", latin: "Yaw", phonetic: "yaw", image: "images/numbers/1.png" },
        { english: "Two", pashto: "دو", latin: "Dwa", phonetic: "dwa", image: "images/numbers/2.png" },
        { english: "Three", pashto: "درې", latin: "Dre", phonetic: "dre", image: "images/numbers/3.png" },
        { english: "Four", pashto: "څلور", latin: "Tsalor", phonetic: "tsa-lor", image: "images/numbers/4.png" },
        { english: "Five", pashto: "پنځه", latin: "Pinza", phonetic: "pin-za", image: "images/numbers/5.png" },
        { english: "Six", pashto: "شپږ", latin: "Shpag", phonetic: "shpag", image: "images/numbers/6.png" },
        { english: "Seven", pashto: "اووه", latin: "Owa", phonetic: "o-wa", image: "images/numbers/7.png" },
        { english: "Eight", pashto: "اته", latin: "Ata", phonetic: "a-ta", image: "images/numbers/8.png" },
        { english: "Nine", pashto: "نهه", latin: "Naha", phonetic: "na-ha", image: "images/numbers/9.png" },
        { english: "Ten", pashto: "لس", latin: "Las", phonetic: "las", image: "images/numbers/10.png" }
    ],
    travel: [
        { english: "Airport", pashto: "هوایی ډګر", latin: "Hawai Dagar", phonetic: "ho-wa-i da-gar", image: "images/travel/airport.png" },
        { english: "Bus", pashto: "بس", latin: "Bus", phonetic: "bus", image: "images/travel/bus.png" },
        { english: "Train", pashto: "رېل ګاډی", latin: "Rail Gadi", phonetic: "rail ga-di", image: "images/travel/train.png" },
        { english: "Ticket", pashto: "ټکټ", latin: "Ticket", phonetic: "tick-et", image: "images/travel/ticket.png" },
        { english: "Hotel", pashto: "هوټل", latin: "Hotel", phonetic: "ho-tel", image: "images/travel/hotel.png" },
        { english: "Passport", pashto: "پاسپورټ", latin: "Passport", phonetic: "pass-port", image: "images/travel/passport.png" },
        { english: "Map", pashto: "نقشه", latin: "Naqsha", phonetic: "naq-sha", image: "images/travel/map.png" }
    ]
};

// Variables
let currentPack = null;
let currentCardIndex = 0;
let showingWord = true;

const cardText = document.getElementById("card-text");
const cardCounter = document.getElementById("card-counter");
const scriptSelect = document.getElementById("script-select");
const imageContainer = document.getElementById("image-container");
const toggleImagesCheckbox = document.getElementById("toggle-images");

function getAllFlashcardsCombined() {
    return Object.values(allFlashcards).flat();
}

function initFlashcards(packName) {
    currentPack = packName === "allFlashcards"
        ? getAllFlashcardsCombined()
        : allFlashcards[packName];

    if (!currentPack) {
        console.error("Unknown flashcard pack:", packName);
        return;
    }

    currentCardIndex = 0;
    showingWord = true;
    updateFlashcard();
}

function updateFlashcard() {
    if (!currentPack || currentPack.length === 0) return;
    showingWord = true;
    const card = currentPack[currentCardIndex];
    const script = scriptSelect.value;

    cardText.textContent = card[script] || card.english;
    cardCounter.textContent = `Card ${currentCardIndex + 1} of ${currentPack.length}`;
    updateImage(card.english);
}

function updateImage(englishWord) {
    const showImages = toggleImagesCheckbox?.checked;
    if (!imageContainer || !showImages) {
        imageContainer.innerHTML = '';
        return;
    }

    const imagePath = `Images/${englishWord}.jpg`;
    imageContainer.innerHTML = `<img src="${imagePath}" alt="${englishWord}" style="max-width: 300px; height: auto; border-radius: 10px;" onerror="this.style.display='none';" />`;
}

function flipCard() {
    if (!currentPack || currentPack.length === 0) return;
    showingWord = !showingWord;
    const card = currentPack[currentCardIndex];
    const script = scriptSelect.value;
    cardText.textContent = showingWord
        ? card[script] || card.english
        : card.english;
}

function nextCard() {
    if (!currentPack || currentPack.length === 0) return;
    currentCardIndex = (currentCardIndex + 1) % currentPack.length;
    updateFlashcard();
}

function previousCard() {
    if (!currentPack || currentPack.length === 0) return;
    currentCardIndex = (currentCardIndex - 1 + currentPack.length) % currentPack.length;
    updateFlashcard();
}

function shufflePack(pack) {
    for (let i = pack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pack[i], pack[j]] = [pack[j], pack[i]];
    }
}

function shuffleCurrentPack() {
    if (!currentPack || currentPack.length === 0) return;
    shufflePack(currentPack);
    currentCardIndex = 0;
    updateFlashcard();
}

function speakCurrentCard() {
    if (!currentPack || currentPack.length === 0) return;
    const card = currentPack[currentCardIndex];
    const script = scriptSelect.value;
    const textToSpeak = showingWord
        ? card[script] || card.english
        : card.english;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    const packName = document.body.getAttribute("data-pack");
    if (packName) {
        initFlashcards(packName);
    }

    if (scriptSelect) {
        scriptSelect.addEventListener("change", updateFlashcard);
    }

    document.querySelector(".flip-button")?.addEventListener("click", flipCard);
    document.querySelector(".next-button")?.addEventListener("click", nextCard);
    document.querySelector(".prev-button")?.addEventListener("click", previousCard);
    document.querySelector(".shuffle-button")?.addEventListener("click", shuffleCurrentPack);
    document.querySelector(".speak-button")?.addEventListener("click", speakCurrentCard);
    toggleImagesCheckbox?.addEventListener("change", updateFlashcard);
});