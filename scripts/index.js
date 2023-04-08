import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { searchRecipe } from "./utils/searchBar.js";
import { toggleDropdown } from "./utils/filter.js";

// création et affichage des cards recette via la recipeFactory
async function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");

  datas.forEach((data) => {
    let recipeModel = recipeFactory(data);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.insertAdjacentHTML("afterbegin", recipeCardDOM);

    const recipeDetails = document.querySelector(".recipe_ingredients");
    const ingredientDOM = recipeModel.getIngredientsList();
    recipeDetails.appendChild(ingredientDOM);
  });
}

async function init() {
  const datas = await getRecipes();
  displayRecipes(datas);
}

init();
