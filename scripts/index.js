import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { filterFactory } from "./factory/filterFactory.js";
import { filterDatas } from "./utils/searchBar.js";

// déclaration variables
let datas = [];
let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];
let lists = [];
let filteredDatas = [];

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
  const recipesSection = document.getElementById("recipes");
  recipesSection.innerHTML = "";
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
}

async function init() {
  datas = await getRecipes();
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
    const filterCardDOM = filterModel.getFilterCard();
    filtersSection.appendChild(filterCardDOM);
  });
}

//------------------------------------------------------------------------------------------
// Event Listener
const searchBar = document.querySelector("#search_recipe");
searchBar.addEventListener("input", (e) => {
  const value = e.target.value;
  const regexThreeCaracters = /[A-Za-z0-9]{3,}/;
  if (regexThreeCaracters.test(value)) {
    filterDatas(e.target.value, datas);
    filteredDatas = filterDatas(e.target.value, datas);
    displayRecipes(filteredDatas);
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