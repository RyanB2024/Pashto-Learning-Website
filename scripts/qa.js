/* qa.js
   Question & Answer / quiz logic.
   - Supports multiple choice and written-answer modes
   - Display mode (pashto/latin/phonetic) is selectable
   - Very small and explicit API so tests can call loadQuestion()
*/
const QA = (function (utils) {
    // Example questions; in production move to data JSON
    const questions = [
        {
            pashto: "څنګه یی؟",
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

    function init() {
        bindUI();
        loadQuestion();
    }

    function bindUI() {
        utils.$('#displayMode').addEventListener('change', loadQuestion);
        utils.$('#answerModeToggle').addEventListener('change', toggleAnswerMode);
        utils.$('#textAnswer').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitAnswer();
        });
        // Buttons
        utils.$('button[onclick="submitAnswer()"]')?.addEventListener('click', submitAnswer);
        utils.$('button[onclick="nextQuestion()"]')?.addEventListener('click', nextQuestion);
    }

    function loadQuestion() {
        const q = questions[currentIndex];
        const displayMode = utils.$('#displayMode').value || 'pashto';
        utils.setText(utils.$('#question'), q[displayMode]);
        utils.setText(utils.$('#feedback'), '');
        utils.$('#textAnswer').value = '';
        selectedMC = null;
        const choicesContainer = utils.$('#choices-container');
        choicesContainer.innerHTML = '';
        if (useMultipleChoice) {
            utils.$('#textAnswer').style.display = 'none';
            q.choices.forEach(c => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'mc-button';
                btn.textContent = c;
                btn.addEventListener('click', () => selectMC(btn, c));
                choicesContainer.appendChild(btn);
            });
        } else {
            utils.$('#textAnswer').style.display = 'block';
        }
    }

    function selectMC(btn, choice) {
        utils.$$('.mc-button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMC = choice;
    }

    function checkAnswer(input) {
        const correct = questions[currentIndex].correctAnswer.trim().toLowerCase();
        const fbEl = utils.$('#feedback');
        if (input.trim().toLowerCase() === correct) {
            fbEl.textContent = '✅ Correct!';
            fbEl.style.color = 'green';
        } else {
            fbEl.textContent = `❌ Incorrect. Correct answer: "${questions[currentIndex].correctAnswer}"`;
            fbEl.style.color = 'red';
        }
    }

    function submitAnswer() {
        if (useMultipleChoice) {
            if (!selectedMC) return alert('Please select an answer.');
            checkAnswer(selectedMC);
        } else {
            const userInput = utils.$('#textAnswer').value || '';
            checkAnswer(userInput);
        }
    }

    function nextQuestion() {
        currentIndex = (currentIndex + 1) % questions.length;
        loadQuestion();
    }

    function toggleAnswerMode() {
        useMultipleChoice = utils.$('#answerModeToggle').checked;
        utils.$('#modeLabel').textContent = useMultipleChoice ? 'Multiple Choice' : 'Written Answer';
        loadQuestion();
    }

    return { init, loadQuestion }; // keep minimal public API
})(Utils);

document.addEventListener('DOMContentLoaded', QA.init);
