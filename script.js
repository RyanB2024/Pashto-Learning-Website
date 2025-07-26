/**
 * Checks if the clicked answer button matches the correct answer.
 * Updates the feedback message and styles accordingly.
 * 
 * @param {HTMLButtonElement} button - The button that was clicked.
 */
function checkAnswer(button) {
  const correctAnswer = "manana";
  const feedback = document.getElementById("quiz-feedback");
  const isCorrect = button.textContent.trim().toLowerCase() === correctAnswer;

  feedback.textContent = isCorrect ? "✅ Correct!" : "❌ Try again!";
  feedback.style.color = isCorrect ? "green" : "red";
}
