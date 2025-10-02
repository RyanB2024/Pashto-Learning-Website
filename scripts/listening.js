/**
 * listening.js
 * Manages the listening comprehension practice module.
 */
import { $, $$, setText } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
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

    let allQuestions = [];
    let questions = [];
    let state = {
        currentIndex: 0,
        score: 0,
        answeredStates: {},
    };

    async function initialize() {
        await fetchData();
        bindEvents();
        startPractice();
    }

    async function fetchData() {
        try {
            const response = await fetch('../assets/data/listening.json');
            if (!response.ok) throw new Error('Failed to load listening data.');
            allQuestions = (await response.json()).listening;
        } catch (error) {
            console.error(error);
            setText(elements.speechBubble, "Error loading questions.");
        }
    }

    function bindEvents() {
        elements.displayMode.addEventListener('change', renderQuestion);
        elements.backButton.addEventListener('click', prevQuestion);
        elements.submitButton.addEventListener('click', submitAnswer);
        elements.nextButton.addEventListener('click', nextQuestion);
        elements.restartButton.addEventListener('click', startPractice);
    }

    function startPractice() {
        state.score = 0;
        state.currentIndex = 0;
        state.answeredStates = {};
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

        const question = questions[state.currentIndex];
        const displayMode = elements.displayMode.value;

        setText(elements.speechBubble, question.question[displayMode]);
        elements.speechBubble.style.display = 'block';
        setText(elements.feedback, '');

        elements.backButton.disabled = state.currentIndex === 0;
        elements.submitButton.disabled = false;
        elements.nextButton.textContent = 'Next';

        renderChoices(question.choices, displayMode);

        const answeredState = state.answeredStates[state.currentIndex];
        if (answeredState) {
            showFeedback(answeredState.selected, answeredState.correct);
            const selectedButton = $(`#choices-container button[data-choice="${answeredState.selected}"]`);
            if (selectedButton) selectedButton.classList.add('selected');
        } else {
            elements.mascotImg.src = '../assets/images/Emotes/teach.png';
        }
    }

    function renderChoices(choices, displayMode) {
        elements.choicesContainer.innerHTML = choices.map(choice =>
            `<button data-choice="${choice[displayMode]}">${choice[displayMode]}</button>`
        ).join('');

        $$('#choices-container button').forEach(button => {
            button.addEventListener('click', () => selectChoice(button));
        });
    }

    function selectChoice(button) {
        if (state.answeredStates[state.currentIndex]) return;
        $$('#choices-container button').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }

    function submitAnswer() {
        if (state.answeredStates[state.currentIndex]) return;

        const selectedButton = $('#choices-container button.selected');
        if (!selectedButton) {
            setText(elements.feedback, "Please select an answer.");
            return;
        }

        const selectedAnswer = selectedButton.dataset.choice;
        const displayMode = elements.displayMode.value;
        const correctAnswer = questions[state.currentIndex].correctAnswer[displayMode];

        if (selectedAnswer === correctAnswer) {
            state.score++;
        }

        state.answeredStates[state.currentIndex] = {
            selected: selectedAnswer,
            correct: correctAnswer,
        };

        showFeedback(selectedAnswer, correctAnswer);
    }

    function showFeedback(selected, correct) {
        if (selected === correct) {
            setText(elements.feedback, "✅ Correct!");
            elements.mascotImg.src = '../assets/images/Emotes/good.png';
        } else {
            setText(elements.feedback, `❌ Not quite. The correct response is: "${correct}"`);
            elements.mascotImg.src = '../assets/images/Emotes/question.png';
        }
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
        elements.mascotImg.src = '../assets/images/Emotes/default.png';
        setText(elements.speechBubble, "Practice complete!");
        elements.nextButton.textContent = 'Restart';
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    initialize();
});