import { $, $$, setText } from './utils.js';

let allQuestions = [];
let questions = [];
let currentIndex = 0;
let score = 0;
let answeredStates = {}; // Tracks if a question at an index has been answered

// DOM Elements
const elements = {
    displayMode: $('#displayMode'),
    speechBubble: $('#speechBubble'),
    mascotImg: $('#mascotImg'),
    choicesContainer: $('#choices-container'),
    backButton: $('#back-button'),
    submitButton: $('#submit-button'),
    nextButton: $('#next-button'),
    feedback: $('#feedback'),
    quizWrapper: $('#quiz-wrapper'),
    scoreContainer: $('#score-container'),
    finalScore: $('#final-score'),
    totalQuestions: $('#total-questions'),
    restartButton: $('#restart-button'),
};

async function loadListeningData() {
    try {
        const response = await fetch('../assets/data/listening.json');
        const data = await response.json();
        allQuestions = data.listening;
        startPractice();
    } catch (error) {
        console.error("Failed to load listening data:", error);
        setText(elements.speechBubble, "Error loading questions.");
    }
}

function startPractice() {
    score = 0;
    currentIndex = 0;
    answeredStates = {};
    questions = [...allQuestions];
    shuffleArray(questions);

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

    const currentQuestion = questions[currentIndex];
    const displayMode = elements.displayMode.value;

    setText(elements.speechBubble, currentQuestion.question[displayMode]);
    elements.speechBubble.style.display = 'block';
    setText(elements.feedback, '');

    elements.backButton.disabled = currentIndex === 0;
    elements.submitButton.disabled = false;

    renderChoices(currentQuestion.choices, displayMode);

    // If already answered, show feedback and disable submit
    if (answeredStates[currentIndex]) {
        showFeedback(answeredStates[currentIndex].selected, answeredStates[currentIndex].correct);
    } else {
        elements.mascotImg.src = '../assets/images/Emotes/teach.png';
    }
}

function renderChoices(choices, displayMode) {
    elements.choicesContainer.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice[displayMode];
        button.dataset.choice = choice[displayMode]; // Store the choice value
        button.addEventListener('click', () => selectChoice(button));
        elements.choicesContainer.appendChild(button);
    });
}

function selectChoice(button) {
    if (answeredStates[currentIndex]) return; // Don't allow changing answer

    const allButtons = $$('#choices-container button');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');
}

function submitAnswer() {
    if (answeredStates[currentIndex]) return;

    const selectedButton = $('#choices-container button.selected');
    if (!selectedButton) {
        setText(elements.feedback, "Please select an answer.");
        return;
    }

    const selectedAnswer = selectedButton.dataset.choice;
    const displayMode = elements.displayMode.value;
    const correctAnswer = questions[currentIndex].correctAnswer[displayMode];

    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
        score++;
    }

    // Store the state of this attempt
    answeredStates[currentIndex] = {
        selected: selectedAnswer,
        correct: correctAnswer,
        isCorrect: isCorrect
    };

    showFeedback(selectedAnswer, correctAnswer);
}

function showFeedback(selected, correct) {
    const isCorrect = selected === correct;
    if (isCorrect) {
        setText(elements.feedback, "✅ Correct!");
        elements.mascotImg.src = '../assets/images/Emotes/good.png';
    } else {
        setText(elements.feedback, `❌ Not quite. The correct response is: "${correct}"`);
        elements.mascotImg.src = '../assets/images/Emotes/question.png';
    }
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
    elements.mascotImg.src = '../assets/images/Emotes/default.png';
    setText(elements.speechBubble, "Practice complete!");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function bindEvents() {
    elements.displayMode.addEventListener('change', loadQuestion);
    elements.backButton.addEventListener('click', prevQuestion);
    elements.submitButton.addEventListener('click', submitAnswer);
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.restartButton.addEventListener('click', startPractice);
}

document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadListeningData();
});