/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */

// State management for the characters page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with character data
 * @param {Object} data - The character data from the API
 * @param {Array} data.results - Array of character objects
 * @param {Object} data.info - Pagination information
 */
function updateUI(data) {
  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each character in data.results:
  //    - Create a card element
  //    - Add character image, name, status, species, location
  //    - Make the card clickable (link to character-detail.html)
  // 4. Update pagination UI

  throw new Error("updateUI not implemented");
}

/**
 * Loads character data from the API
 */
function loadCharacters(Page = 1) {
  let CHAR_URL = `https://rickandmortyapi.com/api/character?page=${Page}`;
  if (state.search.trim()) {
    CHAR_URL += `&name=${encodeURIComponent(state.search.trim())}`;
  }
  fetch(CHAR_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("No characters found");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data.results);
      const charCon = document.querySelector(".char-con");

      let charStr = "";
      data.results.forEach((char) => {
        charStr += `<div class="char-card"><a href="/pages/character-detail.html?charId=${char.id}">
        <div class="char-img">
        <img src="${char.image}"></div>
          <div class="char-info">
            <p><span>Name:</span> ${char.name}</p>
            <p><span>Gender:</span> ${char.gender}</p> 
            <p><span>Species:</span> ${char.species}</p>
            <p><span>Status:</span> ${char.status}</p>
            <p><span>Location:</span> ${char.location.name}</p>
          </div>
          </a></div>
          `;
      });
      charCon.innerHTML = charStr;
    })
    .catch((err) => {
      const charCon = document.querySelector(".char-con");
      charCon.innerHTML = `<p class="error">No characters found. Try another name.</p>`;
      console.error(err.message);
    });
}
loadCharacters();

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadCharacters() on page load
let Page = 1;
const pageNumber = document.querySelector(".page-num");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

next.addEventListener("click", () => {
  state.page++;
  pageNumber.innerHTML = `Page: ${state.page}`;
  loadCharacters(state.page);
  updatePaginationButtons();
});

previous.addEventListener("click", () => {
  state.page--;
  pageNumber.innerHTML = `Page: ${state.page}`;
  loadCharacters(state.page);
  updatePaginationButtons();
});

function updatePaginationButtons() {
  next.disabled = state.page === 42;
  previous.disabled = state.page === 1;
}

function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.getElementById("searchBar");

const handleSearch = debounce((event) => {
  state.search = event.target.value;
  Page = 1;
  pageNumber.textContent = `Page: ${Page}`;
  loadCharacters(Page);
  updatePaginationButtons();
}, 300);

searchInput.addEventListener("input", handleSearch);
