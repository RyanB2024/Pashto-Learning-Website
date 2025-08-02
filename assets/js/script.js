/**
 * Checks if the clicked answer button matches the correct answer.
 * Updates the feedback message and styles accordingly.
 * 
 * @param {HTMLButtonElement} button - The button that was clicked.
 */
function checkSimpleQuizAnswer(button) {
  const correctAnswer = "manana";
  const feedback = document.getElementById("quiz-feedback");
  const isCorrect = button.textContent.trim().toLowerCase() === correctAnswer;

  feedback.textContent = isCorrect ? "✅ Correct!" : "❌ Try again!";
  feedback.style.color = isCorrect ? "green" : "red";
}

// Search bar functionality
const searchBar = document.getElementById("searchBar");
const listItems = document.querySelectorAll("#dictionaryList li"); // Your full list items
const searchResults = document.getElementById("searchResults");
const dictionaryList = document.getElementById("dictionaryList");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.trim().toLowerCase();
  searchResults.innerHTML = ""; // clear previous results

  if (query === "") {
    // Show full dictionary list, hide search results
    dictionaryList.style.display = "block";
    searchResults.style.display = "none";
    return;
  }

  // Hide full list, show search results container
  dictionaryList.style.display = "none";
  searchResults.style.display = "block";

  let found = false;

  listItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      found = true;
      const li = document.createElement("li");
      li.textContent = item.textContent;
      searchResults.appendChild(li);
    }
  });

  if (!found) {
    const li = document.createElement("li");
    li.textContent = "No Results Found";
    li.style.fontStyle = "italic";
    searchResults.appendChild(li);
  }
});
