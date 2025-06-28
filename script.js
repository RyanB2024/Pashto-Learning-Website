const flashcards = [
  { english: "Hello", pashto: "سلام", latin: "salaam", phonetic: "suh-laam" },
  { english: "Thank you", pashto: "مننه", latin: "manana", phonetic: "mah-na-na" },
  { english: "No", pashto: "نه", latin: "na", phonetic: "nah" },
  { english: "Yes", pashto: "هو", latin: "ho", phonetic: "ho" }
];

let currentCard = 0;
let showingWord = true;

function getSelectedScript() {
  return document.getElementById("script-select")?.value || "pashto";
}

function updateFlashcard() {
  const cardText = document.getElementById("card-text");
  const translation = document.getElementById("card-translation");
  const script = getSelectedScript();
  const card = flashcards[currentCard];

  if (showingWord) {
    cardText.textContent = card[script];
    translation.textContent = `(${card.english})`;
  } else {
    cardText.textContent = card.english;
    translation.textContent = `(${card[script]})`;
  }

  const counter = document.getElementById("card-counter");
  if (counter) counter.textContent = `Card ${currentCard + 1} of ${flashcards.length}`;
}

function flipCard() {
  showingWord = !showingWord;
  updateFlashcard();
}

function nextCard() {
  currentCard = (currentCard + 1) % flashcards.length;
  showingWord = true;
  updateFlashcard();
}

function checkAnswer(button) {
  const correctAnswer = "manana";
  const feedback = document.getElementById("quiz-feedback");
  const isCorrect = button.textContent.toLowerCase() === correctAnswer;
  feedback.textContent = isCorrect ? "✅ Correct!" : "❌ Try again!";
  feedback.style.color = isCorrect ? "green" : "red";
}