document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("alphabetGrid");

  // Load alphabet.json
  fetch("../assets/data/alphabet.json")
    .then(response => response.json())
    .then(data => {
      const alphabet = data.alphabet;

      alphabet.forEach(letter => {
        const card = document.createElement("div");
        card.className = "alphabet-card";

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

        // Add flip functionality
        card.addEventListener("click", () => {
          card.classList.toggle("flipped");
        });

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading alphabet.json:", err);
      grid.innerHTML = "<p>Failed to load alphabet.</p>";
    });
});