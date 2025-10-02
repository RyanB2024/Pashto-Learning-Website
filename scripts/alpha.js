/**
 * alpha.js
 * Handles the logic for the interactive alphabet page.
 * Fetches alphabet data and creates flip cards for each letter.
 */
document.addEventListener("DOMContentLoaded", () => {
  const alphabetGrid = document.getElementById("alphabetGrid");

  if (!alphabetGrid) return;

  // Load alphabet data from JSON
  fetch("../assets/data/alphabet.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const alphabet = data.alphabet;

      // Create a card for each letter
      alphabet.forEach(letter => {
        const card = document.createElement("div");
        card.className = "alphabet-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Pashto letter ${letter.pashto}`);

        card.innerHTML = `
                    <div class="alphabet-card-inner">
                        <div class="alphabet-card-front">${letter.pashto}</div>
                        <div class="alphabet-card-back">
                            <div><strong>Pashto:</strong> ${letter.pashto}</div>
                            <div><strong>Latin:</strong> ${letter.latin}</div>
                            <div><strong>Phonetic:</strong> ${letter.phonetic}</div>
                        </div>
                    </div>
                `;

        // Add flip functionality on click
        card.addEventListener("click", () => {
          card.classList.toggle("flipped");
        });

        // Add flip functionality on Enter/Space key press for accessibility
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            card.classList.toggle("flipped");
          }
        });

        alphabetGrid.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading alphabet.json:", error);
      alphabetGrid.innerHTML = "<p>Failed to load alphabet data. Please try again later.</p>";
    });
});