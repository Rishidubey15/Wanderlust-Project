(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
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


// To view +18% gst 
let taxBox = document.getElementById("flexSwitchCheckDefault");
taxBox.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (tax of taxInfo) {
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

filterToggle.addEventListener("click", () => {
  filters.classList.toggle("open");
});


