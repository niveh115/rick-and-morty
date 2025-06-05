/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */

/**
 * Loads and displays details for a specific character
 * @param {string} id - The character ID to load
 */

function loadCharacterDetails(id) {
  // TODO: Implement character detail loading
  // 1. Show loading state
  // 2. Fetch character data using the API module
  // 3. Extract episode IDs from character.episode URLs
  // 4. Fetch all episodes this character appears in
  // 5. Update UI with character and episode data
  // 6. Handle any errors
  // 7. Hide loading state
  const params = new URLSearchParams(window.location.search);
  const charId = params.get("charId");
  const CHAR_ID_URL = `https://rickandmortyapi.com/api/character/${charId}`;
  fetch(CHAR_ID_URL)
    .then((res) => res.json())
    .then((char) => {
      console.log(char.id);

      const charDetailsCon = document.querySelector(".details-con");

      charDetailsCon.innerHTML = ` <div class="char-details-card">
          <div class="img"><img src="${char.image}" /></div>
          <div class="info">
            <p>Name: ${char.name}</p>
            <p>Gender: ${char.gender}</p>
            <p>Location: ${char.location.name}</p>
            <p>Specie: ${char.species}</p>
            <p>Status: ${char.status}</p>
            <p>Origin: ${char.origin.name}</p>
            <p>Created on: ${char.created}</p>
            <p>Shown in: ${char.episode
              .map(
                (url) =>
                  `<a href="episode-detail.html?episodeId=${url
                    .split("/")
                    .pop()}">${url.split("/").pop()}</a>`
              )
              .join(", ")}</p></p>           
          </div>
        </div>`;
    })

    .catch((err) => {
      console.log("Error you mf", err);
    });
}
loadCharacterDetails();
/**
 * Updates the UI with character and episode data
 * @param {Object} character - The character data
 * @param {Array} episodes - Array of episode data
 */
function updateUI(character, episodes) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  // 2. Create character header with image and basic info
  // 3. Add links to origin and current location
  // 4. Create episodes section with all episodes the character appears in
  // 5. Handle empty states and errors
  throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing
