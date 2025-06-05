/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */

// State management for the episodes page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 
 */
function updateUI(data) {
  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each episode in data.results:
  //    - Create a card element
  //    - Add episode name, air date, episode code, and character count
  //    - Make the card clickable (link to episode-detail.html)
  // 4. Update pagination UI
  throw new Error("updateUI not implemented");
}

/**
 * Loads episode data from the API
 */
const BASE_URL = "https://rickandmortyapi.com";
function loadEpisodes() {
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

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
