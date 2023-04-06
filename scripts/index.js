import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";

async function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");

  datas.forEach((data) => {
    let recipeModel = recipeFactory(data);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.insertAdjacentHTML("afterbegin", recipeCardDOM);

    const ingredientsList = document.querySelector(".recipe_ingredients");

    recipeModel = recipeFactory(data);
    const ingredientDOM = recipeModel.getIngredientsList();
    ingredientsList.appendChild(ingredientDOM);
  });
}

async function init() {
  const datas = await getRecipes();
  displayRecipes(datas);
}

init();
