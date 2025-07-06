document.addEventListener("DOMContentLoaded", () => {
    // Back Button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Flashcard logic
    let currentCard = 0;
    let showingWord = true; // true = English, false = translation
    let script = 'pashto';

    const flashcards = [
        { english: "Hello", pashto: "سلام", latin: "Salam", phonetic: "salaam" },
        { english: "Thank you", pashto: "مننه", latin: "Manana", phonetic: "manana" },
        { english: "Goodbye", pashto: "خدای پامان", latin: "Khudai Paman", phonetic: "khudai pamaan" },
        { english: "Yes", pashto: "هو", latin: "Ho", phonetic: "ho" }
    ];

    function updateFlashcard() {
        script = document.getElementById("script-select").value;
        const card = flashcards[currentCard];
        const cardText = document.getElementById("card-text");

        if (showingWord) {
            cardText.textContent = card[script];
        } else {
            cardText.textContent = card.english;
        }

        const counter = document.getElementById("card-counter");
        if (counter) counter.textContent = `Card ${currentCard + 1} of ${flashcards.length}`;
    }

    window.flipCard = function () {
        showingWord = !showingWord;
        updateFlashcard();
    };

    window.nextCard = function () {
        currentCard = (currentCard + 1) % flashcards.length;
        showingWord = true; // Reset to English side
        updateFlashcard();
    };

    window.updateFlashcard = updateFlashcard;

    // Initialize card on load
    updateFlashcard();
});
