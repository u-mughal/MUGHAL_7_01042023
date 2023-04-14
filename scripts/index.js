import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { filterFactory } from "./factory/filterFactory.js";
import { searchRecipe } from "./utils/searchBar.js";

// déclaration variables
let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];
let lists = [];
let filterDatas = [];

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");
  console.log(datas);
  datas.forEach((data) => {
    let recipeModel = recipeFactory(data);
    const recipeCardDOM = recipeModel.getRecipeCard();
    recipesSection.appendChild(recipeCardDOM);
  });
}

// création liste ingrédients via la recipeFactory
function createListIngredients(datas) {
  let ingredientsListBrut = [];
  datas.forEach((data) => {
    let listeModel = recipeFactory(data);
    const ingredients = listeModel.getIngredients();
    ingredientsListBrut.push(...ingredients);
  });
  ingredientsListBrut.sort();
  ingredientsList = [...new Set(ingredientsListBrut)];

  return ingredientsList;
}

// création liste appareils via la recipeFactory
function createListAppliances(datas) {
  let applianceListBrut = [];
  datas.forEach((data) => {
    let listeModel = recipeFactory(data);
    const appliances = listeModel.getAppliances();
    applianceListBrut.push(appliances);
  });
  applianceListBrut.sort();
  appliancesList = [...new Set(applianceListBrut)];

  return appliancesList;
}

// création liste ustensiles via la recipeFactory
function createListUstensils(datas) {
  let ustensilsListBrut = [];
  datas.forEach((data) => {
    let listeModel = recipeFactory(data);
    const ustensils = listeModel.getUstensiles();
    ustensilsListBrut.push(...ustensils);
  });
  ustensilsListBrut.sort();
  ustensilsList = [...new Set(ustensilsListBrut)];

  return ustensilsList;
}

function groupLists() {
  lists = [
    { Ingrédients: ingredientsList },
    { Appareils: appliancesList },
    { Ustensiles: ustensilsList },
  ];
  console.log(lists);
}

async function init() {
  const datas = await getRecipes();
  displayRecipes(datas);
  createListIngredients(datas);
  createListAppliances(datas);
  createListUstensils(datas);
  groupLists();
  displayFilter(lists);
}

init();

//------------------------------------------------------------------------------------------
//création et affichage des filtres via la filterFactory
function displayFilter(lists) {
  const filtersSection = document.getElementById("filters_buttons");
  lists.forEach((list) => {
    let filterModel = filterFactory(list);
    const filterCardDOM = filterModel.getFilterCardDOM();
    filtersSection.appendChild(filterCardDOM);
  });
}

//------------------------------------------------------------------------------------------
// Event Listener
const searchBar = document.querySelector("#search_recipe");
searchBar.addEventListener("input", (e) => {
  const value = e.target.value;
  const regexZeroCaracters = /^$/;
  const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/;
  const regexThreeCaracters = /[A-Za-z0-9]{3,}/;
  if (regexThreeCaracters.test(value)) {
    searchRecipe(e.target.value);
  } else if (regexZeroCaracters.test(value)) {
    searchRecipe();
  } else if (regexOneOrTwoCaracters.test(value)) {
    null;
  }
});

//------------------------------------------------------------------------------------------
// manipule 4 listes : recettes, ingrédients, appareils, ustensiles
// 4 arrays
// selon les filtres on va reconstruire ces tableaux
// ces tableaux seront envoyés aux fonctions qui affiche les recettes, le contenu du filtre
// array.filter reconstruit le tableau
// return operation ternaire

// boucle en 1er
// loqigue tri : dans un nvo tableau prend la 1ere variable et une seconde

//------------------------------------------------------------------------------------------