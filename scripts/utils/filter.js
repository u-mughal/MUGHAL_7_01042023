// Déclaration des variables
const filterBtn = document.querySelector(".filter_btn");
filterBtn.style.display = "inline";
const filterList = document.querySelector(".filter_list");

// Ouverture/Fermeture dropdown 
export function toggleDropDown(elt) {
  if (elt.style.display == "inline") {
    filterBtn.style.display = "none";
    filterList.style.display = "block";
  } else {
    filterList.style.display = "none";
    filterBtn.style.display = "inline";
  }
}

const triggers = document.querySelectorAll(".trigger");
triggers.forEach((btn) =>
  btn.addEventListener("click", (e) => toggleDropDown(e.target))
);