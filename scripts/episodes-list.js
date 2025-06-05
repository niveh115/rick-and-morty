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
  fetch(`${BASE_URL}/api/episode`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load episodes");
      }
      return response.json();
    })
    .then((data) => {
      const episodes = data.results;
      const list = document.getElementById("episodeslist");

      episodes.forEach((episode) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <a href="episode-detail.html?episodeId=${episode.id}">
            <strong>${episode.name}</strong><br>
            <small>${episode.episode} — ${episode.air_date}</small>
          </a>
        `;

        list.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error loading episodes:", err);
      document.getElementById("episodeslist").innerHTML = `
        <li>Could not load episodes. Please try again later.</li>
      `;
    });
}
loadEpisodes();
// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
