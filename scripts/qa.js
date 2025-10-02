// scripts/qa.js
import { $, $$, setText } from './utils.js';

let allQuestions = [];
let questions = [];
let currentIndex = 0;
let score = 0;
let answeredCurrentQuestion = false;
let useMultipleChoice = true;
let selectedMC = null;

// DOM Elements
const elements = {
  question: $('#question'),
  feedback: $('#feedback'),
  textAnswer: $('#textAnswer'),
  choicesContainer: $('#choices-container'),
  displayMode: $('#displayMode'),
  answerModeToggle: $('#answerModeToggle'),
  backButton: $('#back-button'),
  submitButton: $('#submit-button'),
  nextButton: $('#next-button'),
  mascotImg: $('#mascotImg'),
  speechBubble: $('#speechBubble'),
  quizWrapper: $('#quiz-wrapper'),
  scoreContainer: $('#score-container'),
  finalScore: $('#final-score'),
  totalQuestions: $('#total-questions'),
  restartButton: $('#restart-button'),
};

async function loadQuestions() {
  try {
    const res = await fetch('../assets/data/question.json');
    allQuestions = await res.json();
    startQuiz();
  } catch (err) {
    console.error("Failed to load questions:", err);
    setText(elements.question, "⚠️ Error loading questions.");
  }
}

function startQuiz() {
  score = 0;
  currentIndex = 0;
  questions = [...allQuestions]; // Create a mutable copy
  shuffleArray(questions); // Shuffle questions for a new quiz
  elements.totalQuestions.textContent = questions.length;
  elements.scoreContainer.style.display = 'none';
  elements.quizWrapper.style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  if (currentIndex >= questions.length) {
    showFinalScore();
    return;
  }

  // Disable back button on the first question
  elements.backButton.disabled = currentIndex === 0;

  answeredCurrentQuestion = false;
  const q = questions[currentIndex];
  const displayMode = elements.displayMode.value || 'pashto';

  setText(elements.question, q[displayMode]);
  setText(elements.feedback, '');
  elements.textAnswer.value = '';
  selectedMC = null;
  elements.submitButton.disabled = false;

  setMascot('../assets/images/Emotes/learn.png', "Can you answer this?");

  elements.choicesContainer.innerHTML = '';
  if (useMultipleChoice) {
    elements.textAnswer.style.display = 'none';
    q.choices.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mc-button';
      btn.textContent = c;
      btn.addEventListener('click', () => selectMC(btn, c));
      elements.choicesContainer.appendChild(btn);
    });
  } else {
    elements.textAnswer.style.display = 'block';
  }
}

function selectMC(button, choice) {
  if (answeredCurrentQuestion) return;
  const buttons = $$('#choices-container button');
  buttons.forEach(b => b.classList.remove('selected'));
  button.classList.add('selected');
  selectedMC = choice;
}

function submitAnswer() {
  if (answeredCurrentQuestion) return;

  const q = questions[currentIndex];
  let answer = useMultipleChoice ? selectedMC : elements.textAnswer.value.trim();

  if (!answer) {
    setText(elements.feedback, "⚠️ Please provide an answer.");
    return;
  }

  if (answer.toLowerCase() === q.correctAnswer.toLowerCase()) {
    score++;
    setText(elements.feedback, "✅ Correct!");
    setMascot('../assets/images/Emotes/good.png', "Great job!");
  } else {
    setText(elements.feedback, `❌ Incorrect. The correct answer is: ${q.correctAnswer}`);
    setMascot('../assets/images/Emotes/question.png', "That's not it, try the next one!");
  }

  answeredCurrentQuestion = true;
  elements.submitButton.disabled = true;
}

function nextQuestion() {
  currentIndex++;
  loadQuestion();
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

function showFinalScore() {
  setText(elements.finalScore, score);
  elements.quizWrapper.style.display = 'none';
  elements.scoreContainer.style.display = 'block';
  setMascot('../assets/images/Emotes/default.png', "Well done!");
}

function setMascot(imgPath, bubbleText) {
  if (elements.mascotImg) elements.mascotImg.src = imgPath;
  if (elements.speechBubble) {
    elements.speechBubble.textContent = bubbleText;
    elements.speechBubble.style.display = 'block';
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function bindUI() {
  elements.displayMode.addEventListener('change', loadQuestion);

  elements.answerModeToggle.addEventListener('change', () => {
    useMultipleChoice = elements.answerModeToggle.checked;
    loadQuestion();
  });

  elements.textAnswer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });

  elements.backButton.addEventListener('click', prevQuestion);
  elements.submitButton.addEventListener('click', submitAnswer);
  elements.nextButton.addEventListener('click', nextQuestion);
  elements.restartButton.addEventListener('click', startQuiz);
}

function init() {
  bindUI();
  loadQuestions();
}

document.addEventListener('DOMContentLoaded', init);