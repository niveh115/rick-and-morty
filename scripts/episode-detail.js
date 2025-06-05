document.addEventListener("DOMContentLoaded", loadEpisodeDetails);

/**
 * Episode Detail Page Script
 * Handles the display of detailed information for a single episode
 */
const BASE_URL = "https://rickandmortyapi.com";

function loadEpisodeDetails() {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("episodeId");
  console.log(id);

  fetch(`${BASE_URL}/api/episode/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Episode not found");
      }
      return response.json();
    })
    .then((episodeData) => {
      console.log("Episode data:", episodeData);
    })
    .catch((err) => {
      console.log("Error loading episode:", err);
    });
}

/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  // 2. Create episode header with basic info
  // 3. Create characters section
  // 4. For each character:
  //    - Create a card with image and basic info
  //    - Make the card link to the character detail page
  // 5. Handle empty states (no characters)
  throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get episode ID from URL parameters
// 2. Validate the ID
// 3. Load episode details if ID is valid
// 4. Show error if ID is invalid or missing
