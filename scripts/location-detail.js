/**
 * Location Detail Page Script
 * Handles the display of detailed information for a single location
 */
function loadLocationDetails() {
  // TODO: Implement location detail loading
  // 1. Show loading state
  const urlParams = new URLSearchParams(window.location.search);
  const locId = urlParams.get("locationId") || "1";
  console.log("Loading...");
  // 2. Fetch location data using the API module
  fetch(`https://rickandmortyapi.com/api/location/${locId}`)
    .then((response) => response.json())
    .then((location) => {
      const residentPromises = location.residents.map((url) => {
        return fetch(url).then((response) => response.json());
      });

      return Promise.all([
        Promise.resolve(location),
        Promise.all(residentPromises),
      ]);
    })
    .then(([location, residents]) => {
      updateUI(location, residents);
    });
  // 3. Extract resident IDs from location.residents URLs
  // 4. Fetch all residents of this location
  // 5. Update UI with location and resident data
  // 6. Handle any errors
  // 7. Hide loading state
}

/**
 * Updates the UI with location and resident data
 * @param {Object} location - The location data
 * @param {Array} residents - Array of resident data
 */
function updateUI(location, residents) {
  // TODO: Implement the UI update
  // 1. Get the detail container element
  const container = document.querySelector(".location-detail");
  const residentList = document.querySelector(".residents-list");
  // 2. Create location header with basic info
  container.innerHTML = `<h2>Name: ${location.name}</h2>
            <div class="flex-container">
              <h3>Dimension: ${location.dimension}</h3>
              <h3>Type: ${location.type}</h3>
            </div>`;
  residentList.innerHTML = residents
    .map(function (resident) {
      const link = `character-detail.html?id=${resident.id}`;
      return ` <li class="resident-item">
              <div class="img-container"><a href="${link}"><img src="https://rickandmortyapi.com/api/character/avatar/${resident.id}.jpeg" alt="${resident.name}"></a></div>
              <div class="text-container"><p>${resident.name}</p>
              <p class="origin">Origin: ${resident.origin.name}</p></div>
            </li>`;
    })
    .join("");
}
loadLocationDetails();

// TODO: Initialize the page
// 1. Get location ID from URL parameters
// 2. Validate the ID
// 3. Load location details if ID is valid
// 4. Show error if ID is invalid or missing
