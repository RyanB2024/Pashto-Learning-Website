function checkAnswer(button) {
  const correctAnswer = "manana";
  const feedback = document.getElementById("quiz-feedback");
  const isCorrect = button.textContent.toLowerCase() === correctAnswer;
  feedback.textContent = isCorrect ? "✅ Correct!" : "❌ Try again!";
  feedback.style.color = isCorrect ? "green" : "red";
}