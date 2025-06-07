import { ELEMENT_ID } from "./constants.js";

const state = {
  search: "",
};
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchBar");

  const handleSearch = debounce((event) => {
    state.search = event.target.value;
    loadLocations();
  }, 300);

  searchInput.addEventListener("input", handleSearch);

  loadLocations();
});

function loadLocations() {
  let url = `https://rickandmortyapi.com/api/location`;
  if (state.search.trim() !== "") {
    url += `?name=${encodeURIComponent(state.search.trim())}`;
  }

  console.log("Loading locations...");

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then((data) => {
      const locationList = document.getElementById(ELEMENT_ID.locationsListId);
      locationList.innerHTML = data.results
        .map((location) => {
          const link = `location-detail.html?locationId=${location.id}`;
          return `<li class="location-card">
              <p><a href="${link}">${location.name}</a></p>
              <p><span>Type:</span> ${location.type}</p>
              <p><span>Dimension:</span> ${location.dimension}</p>
            </li>`;
        })
        .join("");
    })
    .catch((error) => {
      const locationList = document.getElementById(ELEMENT_ID.locationsListId);
      locationList.innerHTML = `<p class="error">No locations found. Try another search.</p>`;
      console.error("Error fetching locations:", error);
    });
}

function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
