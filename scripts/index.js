import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { searchRecipe } from "./utils/searchBar.js";

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


//Event Listener
const searchBar = document.querySelector("#search_recipe");
searchBar.addEventListener("keyup", (e) => {
  const value = e.target.value;
  const regex = /[A-Za-z0-9]{3,}/;
  if (regex.test(value)) {
    searchRecipe(value);
  }
});
