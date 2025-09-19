// scripts/qa.js
import { $, $$, setText } from './utils.js';

let questions = [];
let currentIndex = 0;
let useMultipleChoice = true;
let selectedMC = null;

// Load questions from JSON file
async function loadQuestions() {
  try {
    const res = await fetch('../assets/data/question.json'); // ✅ singular
    questions = await res.json();
    loadQuestion();
  } catch (err) {
    console.error("Failed to load questions:", err);
    setText($('#question'), "⚠️ Error loading questions.");
  }
}

function loadQuestion() {
  if (!questions.length) return;

  const q = questions[currentIndex];
  const displayMode = $('#displayMode').value || 'pashto';

  setText($('#question'), q[displayMode]);
  setText($('#feedback'), '');
  $('#textAnswer').value = '';
  selectedMC = null;

  // Mascot: question state
  setMascot('../assets/images/Emotes/learn.png', "Can you answer this?");

  const choicesContainer = $('#choices-container');
  choicesContainer.innerHTML = '';
  if (useMultipleChoice) {
    $('#textAnswer').style.display = 'none';
    q.choices.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mc-button';
      btn.textContent = c;
      btn.addEventListener('click', () => selectMC(btn, c));
      choicesContainer.appendChild(btn);
    });
  } else {
    $('#textAnswer').style.display = 'block';
  }
}

function selectMC(button, choice) {
  const buttons = $$('#choices-container button');
  buttons.forEach(b => b.classList.remove('selected'));
  button.classList.add('selected');
  selectedMC = choice;
}

function submitAnswer() {
  if (!questions.length) return;

  const q = questions[currentIndex];
  let answer = useMultipleChoice ? selectedMC : $('#textAnswer').value.trim();

  if (!answer) {
    setText($('#feedback'), "⚠️ Please provide an answer.");
    return;
  }

  if (answer.toLowerCase() === q.correctAnswer.toLowerCase()) {
    setText($('#feedback'), "✅ Correct!");
    setMascot('../assets/images/Emotes/good.png', "Great job!");
  } else {
    setText($('#feedback'), `❌ Incorrect. Correct: ${q.correctAnswer}`);
    setMascot('../assets/images/Emotes/question.png', "Try again!");
  }
}

function nextQuestion() {
  if (!questions.length) return;
  currentIndex = (currentIndex + 1) % questions.length;
  loadQuestion();
}

function setMascot(imgPath, bubbleText) {
  const mascotImg = $('#mascotImg');
  const bubble = $('#speechBubble');
  if (mascotImg) mascotImg.src = imgPath;
  if (bubble) {
    bubble.textContent = bubbleText;
    bubble.style.display = 'block';
  }
}

function bindUI() {
  $('#displayMode').addEventListener('change', loadQuestion);

  const toggle = $('#answerModeToggle');
  toggle.addEventListener('change', () => {
    useMultipleChoice = toggle.checked;
    loadQuestion();
  });

  $('#textAnswer').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });

  document.querySelector('button[onclick="submitAnswer()"]')
    ?.addEventListener('click', submitAnswer);
  document.querySelector('button[onclick="nextQuestion()"]')
    ?.addEventListener('click', nextQuestion);
}

export function init() {
  bindUI();
  loadQuestions();
}

// Auto-init
document.addEventListener('DOMContentLoaded', init);
