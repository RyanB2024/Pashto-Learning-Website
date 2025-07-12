
// Back Button
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.history.back();
    });
}

// Data for all cardpacks
const allFlashcards = {
    clothing: [
        { english: "Shirt", pashto: "کمیس", latin: "Kamees", phonetic: "ka-mees" },
        { english: "Pants", pashto: "پتلون", latin: "Patloon", phonetic: "pat-loon" },
        { english: "Hat", pashto: "خولۍ", latin: "Kholai", phonetic: "kho-lai" },
        { english: "Shoes", pashto: "بوټان", latin: "Bootan", phonetic: "boo-tan" },
        { english: "Scarf", pashto: "شال", latin: "Shaal", phonetic: "shaal" },
        { english: "Jacket", pashto: "جرابۍ", latin: "Joraabee", phonetic: "jo-ra-bee" },
        { english: "Dress", pashto: "کالي", latin: "Kaali", phonetic: "kaa-lee" },
        { english: "Coat", pashto: "کوټ", latin: "Kot", phonetic: "kot" },
        { english: "Gloves", pashto: "لاس ګرمۍ", latin: "Las Garmi", phonetic: "las gar-mee" },
        { english: "Belt", pashto: "کمربند", latin: "Kamarband", phonetic: "ka-mar-band" },
        { english: "Tie", pashto: "ټای", latin: "Tie", phonetic: "tie" },
        { english: "Socks", pashto: "جرابې", latin: "Jaraabay", phonetic: "ja-ra-bay" },
        { english: "Sweater", pashto: "سویټر", latin: "Sweater", phonetic: "swea-ter" },
        { english: "Shorts", pashto: "شارټس", latin: "Shorts", phonetic: "shorts" },
        { english: "Boots", pashto: "بوټونه", latin: "Bootona", phonetic: "boo-to-na" }
    ],
    colors: [
        { english: "Red", pashto: "سره", latin: "Sra", phonetic: "sra" },
        { english: "Blue", pashto: "شنه", latin: "Shna", phonetic: "shna" },
        { english: "Green", pashto: "شنه", latin: "Shna", phonetic: "shna" },
        { english: "Yellow", pashto: "زیړ", latin: "Zeeṛ", phonetic: "zee-r" },
        { english: "Black", pashto: "تور", latin: "Tor", phonetic: "tor" },
        { english: "White", pashto: "سپین", latin: "Spin", phonetic: "spin" },
        { english: "Orange", pashto: "نارنجي", latin: "Narenji", phonetic: "na-ren-ji" },
        { english: "Purple", pashto: "ارغواني", latin: "Arghwani", phonetic: "ar-ghwa-ni" },
        { english: "Brown", pashto: "نسواري", latin: "Naswari", phonetic: "nas-wa-ri" },
        { english: "Pink", pashto: "ګلابي", latin: "Gulabi", phonetic: "gu-la-bi" }
    ],
    commonPhrases: [
        { english: "Hello", pashto: "سلام", latin: "Salam", phonetic: "sa-lam" },
        { english: "Thank you", pashto: "مننه", latin: "Manana", phonetic: "ma-na-na" },
        { english: "Please", pashto: "لطفا", latin: "Lutfan", phonetic: "lut-fan" },
        { english: "Yes", pashto: "هو", latin: "Ho", phonetic: "ho" },
        { english: "No", pashto: "نه", latin: "Na", phonetic: "na" },
        { english: "How are you?", pashto: "څنګه یی؟", latin: "Tsenga yi?", phonetic: "tse-nga yi" },
        { english: "Goodbye", pashto: "خدای پامان", latin: "Khudai paaman", phonetic: "khu-dai paa-man" }
    ],
    day: [
        { english: "Monday", pashto: "دوشنبه", latin: "Dushanba", phonetic: "du-shan-ba" },
        { english: "Tuesday", pashto: "سه شنبه", latin: "Se shanba", phonetic: "se shan-ba" },
        { english: "Wednesday", pashto: "چهارشنبه", latin: "Char shanba", phonetic: "char shan-ba" },
        { english: "Thursday", pashto: "پنجشنبه", latin: "Panj shanba", phonetic: "panj shan-ba" },
        { english: "Friday", pashto: "جمعه", latin: "Juma", phonetic: "ju-ma" },
        { english: "Saturday", pashto: "شنبه", latin: "Shanba", phonetic: "shan-ba" },
        { english: "Sunday", pashto: "یکشنبه", latin: "Yakshanba", phonetic: "yak-shan-ba" }
    ],
    numbers: [
        { english: "One", pashto: "یو", latin: "Yaw", phonetic: "yaw" },
        { english: "Two", pashto: "دو", latin: "Dwa", phonetic: "dwa" },
        { english: "Three", pashto: "درې", latin: "Dre", phonetic: "dre" },
        { english: "Four", pashto: "څلور", latin: "Tsalor", phonetic: "tsa-lor" },
        { english: "Five", pashto: "پنځه", latin: "Pinza", phonetic: "pin-za" },
        { english: "Six", pashto: "شپږ", latin: "Shpag", phonetic: "shpag" },
        { english: "Seven", pashto: "اووه", latin: "Owa", phonetic: "o-wa" },
        { english: "Eight", pashto: "اته", latin: "Ata", phonetic: "a-ta" },
        { english: "Nine", pashto: "نهه", latin: "Naha", phonetic: "na-ha" },
        { english: "Ten", pashto: "لس", latin: "Las", phonetic: "las" }
    ],
    travel: [
        { english: "Airport", pashto: "هوایی ډګر", latin: "Hawai Dagar", phonetic: "ho-wa-i da-gar" },
        { english: "Bus", pashto: "بس", latin: "Bus", phonetic: "bus" },
        { english: "Train", pashto: "رېل ګاډی", latin: "Rail Gadi", phonetic: "rail ga-di" },
        { english: "Ticket", pashto: "ټکټ", latin: "Ticket", phonetic: "tick-et" },
        { english: "Hotel", pashto: "هوټل", latin: "Hotel", phonetic: "ho-tel" },
        { english: "Passport", pashto: "پاسپورټ", latin: "Passport", phonetic: "pass-port" },
        { english: "Map", pashto: "نقشه", latin: "Naqsha", phonetic: "naq-sha" }
    ]
};

// Variables
let currentPack = null;
let currentCardIndex = 0;
let showingWord = true;

const cardText = document.getElementById("card-text");
const cardCounter = document.getElementById("card-counter");
const scriptSelect = document.getElementById("script-select");

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
}

function flipCard() {
    if (!currentPack || currentPack.length === 0) return;
    showingWord = !showingWord;
    cardText.textContent = showingWord
        ? currentPack[currentCardIndex][scriptSelect.value] || currentPack[currentCardIndex].english
        : currentPack[currentCardIndex].english;
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
});
