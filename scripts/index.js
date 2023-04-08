import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { searchRecipe } from "./utils/searchBar.js";
import { toggleDropDown } from "./utils/filter.js";

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");

  datas.forEach((data) => {
    let recipeModel = recipeFactory(data);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  const datas = await getRecipes();
  displayRecipes(datas);
}

init();
