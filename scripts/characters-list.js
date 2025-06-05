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
  // TODO: Implement character loading
  // 1. Show loading state
  // 2. Fetch character data using the API module
  // 3. Update UI with the results
  // 4. Handle any errors
  // 5. Hide loading state

  const CHAR_URL = `https://rickandmortyapi.com/api/character?page=${Page}`;
  fetch(CHAR_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      const charCon = document.querySelector(".char-con");

      let charStr = "";
      data.results.forEach((char) => {
        charStr += `<div class="char-card"><a href="/pages/character-detail.html?charId=${char.id}">
        <div class="char-img">
        <img src="${char.image}"></div>
          <div class="char-info">
            <p>Name: ${char.name}</p>
            <p>Gender: ${char.gender}</p> 
            <p>Specie: ${char.species}</p>
            <p>Status: ${char.status}</p>
            <p>Location: ${char.location.name}</p>
          </div>
          </a></div>
          `;
      });
      charCon.innerHTML = charStr;
    })
    .catch((err) => {
      console.log("Error you mf", err);
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
  Page++;
  pageNumber.innerHTML = `Page: ${Page}`;
  loadCharacters(Page);
  updatePaginationButtons();
});

previous.addEventListener("click", () => {
  Page--;
  pageNumber.innerHTML = `Page: ${Page}`;
  loadCharacters(Page);
  updatePaginationButtons();
});

function updatePaginationButtons() {
  next.disabled = Page === 42;
  previous.disabled = Page === 1;
}
