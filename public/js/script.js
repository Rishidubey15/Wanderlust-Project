(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();


// For adding +18% gst 
let taxBox = document.getElementById("flexSwitchCheckDefault");
taxBox.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (let tax of taxInfo) {
    if (tax.style.display != "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
});

// To view filters on small devices
const filterToggle = document.getElementById("filterToggle");
const filters = document.getElementById("filters");
const filterContainer = document.getElementById("filter-container");

filterToggle.addEventListener("click", () => {
  filters.classList.toggle("open");
  filterContainer.classList.toggle("open");
  
  
  filterToggle.textContent = filterContainer.classList.contains("open") ? "Hide Filters" : "Show Filters";
});

function filterListings(type) {
  const clickedFilter = document.querySelector(`[data-type="${type}"]`);
  if (clickedFilter) {
    clickedFilter.style.opacity = "0.5";
    clickedFilter.style.transform = "scale(0.95)";
  }

  setTimeout(() => {
    window.location.href = `/listings?type=${type}`;
  }, 150);
}


