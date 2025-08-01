const questions = [
    {
        pashto: "ته څنګه یې؟",
        latin: "Ta tsenga ye?",
        phonetic: "tah tsang-uh yay?",
        correctAnswer: "How are you?",
        choices: ["Good morning", "How are you?", "Thank you", "Goodbye"]
    },
    {
        pashto: "زما نوم احمد دی.",
        latin: "Zma num Ahmad dey.",
        phonetic: "zmaa noom Ahmad day.",
        correctAnswer: "My name is Ahmad.",
        choices: ["I am hungry", "My name is Ahmad.", "I live in Kabul", "What is your name?"]
    }
];

let currentIndex = 0;
let useMultipleChoice = true;
let selectedMC = null;

function loadQuestion() {
    const questionEl = document.getElementById("question");
    const choicesContainer = document.getElementById("choices-container");
    const textInput = document.getElementById("textAnswer");
    const feedback = document.getElementById("feedback");
    const displayMode = document.getElementById("displayMode").value;

    const q = questions[currentIndex];
    questionEl.textContent = q[displayMode];
    feedback.textContent = '';
    textInput.value = '';
    selectedMC = null;
    choicesContainer.innerHTML = '';

    if (useMultipleChoice) {
        textInput.style.display = 'none';
        q.choices.forEach((choice, index) => {
            const btn = document.createElement("button");
            btn.textContent = choice;
            btn.className = "mc-button";
            btn.onclick = () => selectMC(btn, choice);
            choicesContainer.appendChild(btn);
        });
    } else {
        textInput.style.display = 'block';
    }
}

function selectMC(button, choice) {
    // Clear previous selections
    document.querySelectorAll(".mc-button").forEach(btn => {
        btn.classList.remove("selected");
    });

    // Highlight selected and store value
    button.classList.add("selected");
    selectedMC = choice;
}

function checkAnswer(input) {
    const correct = questions[currentIndex].correctAnswer.trim().toLowerCase();
    const feedback = document.getElementById("feedback");

    if (input.trim().toLowerCase() === correct) {
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `❌ Incorrect. Correct answer: "${questions[currentIndex].correctAnswer}"`;
        feedback.style.color = "red";
    }
}

function submitAnswer() {
    if (useMultipleChoice) {
        if (!selectedMC) {
            alert("Please select an answer.");
            return;
        }
        checkAnswer(selectedMC);
    } else {
        const userInput = document.getElementById("textAnswer").value;
        checkAnswer(userInput);
    }
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % questions.length;
    loadQuestion();
}

function toggleAnswerMode() {
    const toggle = document.getElementById('answerModeToggle');
    const label = document.getElementById('modeLabel');
    useMultipleChoice = toggle.checked;
    label.textContent = useMultipleChoice ? "Multiple Choice" : "Written Answer";
    loadQuestion();
}

window.onload = loadQuestion;
