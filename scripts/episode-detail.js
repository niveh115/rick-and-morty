document.addEventListener("DOMContentLoaded", loadEpisodeDetails);

/**
 * Episode Detail Page Script
 * Handles the display of detailed information for a single episode
 */
const BASE_URL = "https://rickandmortyapi.com";
function loadEpisodeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const episodeId = urlParams.get("episodeId");

  if (!episodeId) {
    console.error("No episodeId in URL.");
    return;
  }

  fetch(`${BASE_URL}/api/episode/${episodeId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Episode not found");
      return response.json();
    })
    .then((episodeData) => {
      document.getElementById("episode-name").textContent = episodeData.name;
      document.getElementById(
        "episode-air-date"
      ).textContent = `Air Date: ${episodeData.air_date}`;
      document.getElementById(
        "episode-code"
      ).textContent = `Episode Code: ${episodeData.episode}`;

      const characterContainer = document.getElementById("ep-characters");
      characterContainer.innerHTML = "";

      episodeData.characters.forEach((url) => {
        fetch(url)
          .then((res) => res.json())
          .then((character) => {
            const charDiv = document.createElement("div");
            charDiv.classList.add("character-card");
            charDiv.innerHTML = `
  <a href="character-detail.html?charId=${character.id}" >
                <img src="${character.image}" alt="${character.name}" />
                <h4>${character.name}</h4>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
              </a>
            `;
            characterContainer.appendChild(charDiv);
          });
      });
    })
    .catch((err) => {
      console.error("Error loading episode:", err);
    });
}

loadEpisodeDetails();
/**
/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {

  throw new Error("updateUI not implemented");
}

