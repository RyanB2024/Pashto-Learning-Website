/**
 * qa.js
 * Manages the question and answer translation quiz.
 */
import { $, $$, setText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
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

  let allQuestions = [];
  let questions = [];
  let state = {
    currentIndex: 0,
    score: 0,
    useMultipleChoice: true,
    answeredCurrent: false,
  };

  async function initialize() {
    await fetchData();
    bindEvents();
    startQuiz();
  }

  async function fetchData() {
    try {
      const res = await fetch('../assets/data/question.json');
      if (!res.ok) throw new Error("Failed to load questions.");
      allQuestions = await res.json();
    } catch (err) {
      console.error(err);
      setText(elements.question, "⚠️ Error loading questions.");
    }
  }

  function bindEvents() {
    elements.displayMode.addEventListener('change', renderQuestion);
    elements.answerModeToggle.addEventListener('change', handleModeToggle);
    elements.textAnswer.addEventListener('keydown', (e) => e.key === 'Enter' && submitAnswer());
    elements.backButton.addEventListener('click', prevQuestion);
    elements.submitButton.addEventListener('click', submitAnswer);
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.restartButton.addEventListener('click', startQuiz);
  }

  function startQuiz() {
    state.score = 0;
    state.currentIndex = 0;
    questions = [...allQuestions];
    shuffleArray(questions);

    setText(elements.totalQuestions, questions.length);
    elements.scoreContainer.style.display = 'none';
    elements.quizWrapper.style.display = 'block';
    renderQuestion();
  }

  function renderQuestion() {
    if (state.currentIndex >= questions.length) {
      showFinalScore();
      return;
    }

    state.answeredCurrent = false;
    const question = questions[state.currentIndex];
    const displayMode = elements.displayMode.value;

    setText(elements.question, question[displayMode]);
    setText(elements.feedback, '');
    elements.textAnswer.value = '';
    elements.submitButton.disabled = false;
    elements.backButton.disabled = state.currentIndex === 0;

    setMascot('../assets/images/Emotes/learn.png', "Can you answer this?");

    if (state.useMultipleChoice) {
      elements.textAnswer.style.display = 'none';
      renderChoices(question.choices);
    } else {
      elements.choicesContainer.innerHTML = '';
      elements.textAnswer.style.display = 'block';
    }
  }

  function renderChoices(choices) {
    elements.choicesContainer.innerHTML = choices.map(choice => `<button>${choice}</button>`).join('');
    $$('#choices-container button').forEach(button => {
      button.addEventListener('click', () => selectChoice(button));
    });
  }

  function selectChoice(button) {
    if (state.answeredCurrent) return;
    $$('#choices-container button').forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
  }

  function handleModeToggle() {
    state.useMultipleChoice = elements.answerModeToggle.checked;
    renderQuestion();
  }

  function submitAnswer() {
    if (state.answeredCurrent) return;

    const question = questions[state.currentIndex];
    const answer = state.useMultipleChoice
      ? ($('#choices-container button.selected')?.textContent || '')
      : elements.textAnswer.value.trim();

    if (!answer) {
      setText(elements.feedback, "⚠️ Please provide an answer.");
      return;
    }

    if (answer.toLowerCase() === question.correctAnswer.toLowerCase()) {
      state.score++;
      setText(elements.feedback, "✅ Correct!");
      setMascot('../assets/images/Emotes/good.png', "Great job!");
    } else {
      setText(elements.feedback, `❌ Incorrect. The correct answer is: ${question.correctAnswer}`);
      setMascot('../assets/images/Emotes/question.png', "That's not it, try the next one!");
    }

    state.answeredCurrent = true;
    elements.submitButton.disabled = true;
  }

  function nextQuestion() {
    state.currentIndex++;
    renderQuestion();
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  }

  function showFinalScore() {
    setText(elements.finalScore, state.score);
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

  initialize();
});