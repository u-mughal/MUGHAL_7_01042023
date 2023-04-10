import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { filterFactory } from "./factory/filterFactory.js";
import { searchRecipe } from "./utils/searchBar.js";
// import { toggleDropDown } from "./utils/filter.js";

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");

  datas.forEach((data) => {
    let recipeModel = recipeFactory(data);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

//création et affichage des filtres via la filterFactory
const filterOptions = ["Ingrédients", "Appareils", "Ustensiles"];

function displayFilter(filterOptions) {
  const filtersSection = document.getElementById("filters");

  filterOptions.forEach((option) => {
    let filterModel = filterFactory(option);
    const filterCardDOM = filterModel.getFilterCardDOM();
    filtersSection.appendChild(filterCardDOM);
  });
}

async function init() {
  const datas = await getRecipes();
  displayRecipes(datas);
  displayFilter(filterOptions);
}

init();
