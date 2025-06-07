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

state.page =
  parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
let totalPages = 1;

function loadEpisodes() {
  let url = `${BASE_URL}/api/episode?page=${state.page}`;
  if (state.search.trim() !== "") {
    url += `&name=${encodeURIComponent(state.search.trim())}`;
  }

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No episodes found");
      }
      return res.json();
    })
    .then((data) => {
      const episodesList = document.getElementById("episodesList");
      episodesList.innerHTML = "";

      totalPages = data.info.pages;

      data.results.forEach((episode) => {
        const li = document.createElement("li");
        li.classList.add("episode-card");

        li.innerHTML = `
          <h3>${episode.name}</h3>
          <p><strong>Air Date:</strong> ${episode.air_date}</p>
          <p><strong>Code:</strong> ${episode.episode}</p>
          <a href="episode-detail.html?episodeId=${episode.id}">View Details</a>
        `;

        episodesList.appendChild(li);
      });
      pagination();
    })
    .catch((err) => {
      const episodesList = document.getElementById("episodesList");
      episodesList.innerHTML = `<p class="error">No episodes found. Try another search.</p>`;
      console.error("Error loading episodes:", err);
      // Reset pagination UI
      document.getElementById("page-number").textContent = "";
      document.getElementById("prev-btn").disabled = true;
      document.getElementById("next-btn").disabled = true;
    });
}

function pagination() {
  document.getElementById("page-number").textContent = `Page ${state.page}`;
  document.getElementById("prev-btn").disabled = state.page === 1;
  document.getElementById("next-btn").disabled = state.page === totalPages;

  const newUrl = `${window.location.pathname}?page=${state.page}`;
  history.pushState(null, "", newUrl);
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (state.page > 1) {
    state.page--;
    loadEpisodes();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (state.page < totalPages) {
    state.page++;
    loadEpisodes();
  }
});

function debounce(fn, wait) {
  let timer;
  function deb(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  }
  return deb;
}

const searchInput = document.getElementById("searchBar");

const handleSearch = debounce((event) => {
  state.search = event.target.value;
  state.page = 1; // reset to first page when searching
  loadEpisodes();
}, 300);

searchInput.addEventListener("input", handleSearch);

loadEpisodes();
