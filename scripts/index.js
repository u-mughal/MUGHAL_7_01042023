import { getRecipes } from "./api/services.js";
import { recipeFactory } from "./factory/recipeFactory.js";
import { filterFactory } from "./factory/filterFactory.js";
import { filterDatas, sortDatas } from "./utils/searchBar.js";

// déclaration variables
let datas = [];
let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];
let lists = [];
let filteredDatas = [];

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
  sortDatas(datas);
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

function listInit(datas) {
  createListIngredients(datas);
  createListAppliances(datas);
  createListUstensils(datas);
  groupLists();
}

async function init() {
  datas = await getRecipes();
  displayRecipes(datas);
  listInit(datas);
  displayFilter(lists);
}

init();

//------------------------------------------------------------------------------------------
//création et affichage des filtres via la filterFactory
function displayFilter(lists) {
  const filtersSection = document.getElementById("filters_buttons");
  filtersSection.innerHTML = "";
  lists.forEach((list) => {
    let filterModel = filterFactory(list);
    const filterCardDOM = filterModel.getFilterCardDOM();
    filtersSection.appendChild(filterCardDOM);
  });
}

function removeKeywordFromList(value, lists) {
  const eFormated = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const regex = new RegExp(eFormated);
  lists.forEach((list) =>
    Object.values(list).forEach((eList) => {
      eList.find((e, index) => {
        console.log(e.value);
        let indexUtd = index;
        if (regex.test(e)) {
          eList.splice(indexUtd, 1);
          indexUtd--;
        }
      });
    })
  );
  return lists;
}
// const k = Object.keys(list);
// console.log(typeof k, k);
// list = eList.filter((e) => !regex.test(e));
// console.log(lists.k);

//------------------------------------------------------------------------------------------
// Event Listener
const searchBar = document.querySelector("#search_recipe");
searchBar.addEventListener("input", (e) => {
  const value = e.target.value;
  const regexThreeCaracters = /[A-Za-z0-9]{3,}/;
  const recipesSection = document.getElementById("recipes");
  if (regexThreeCaracters.test(value)) {
    filteredDatas = filterDatas(e.target.value, datas);
    displayRecipes(filteredDatas);
    listInit(filteredDatas);
    removeKeywordFromList(value, lists);
    displayFilter(lists);
    if (filteredDatas.length === 0) {
      recipesSection.innerHTML = "Votre recherche n'a pas de correspondance.";
      recipesSection.classList.add("empty");
    } else {
      recipesSection.classList.remove("empty");
    }
  } else {
    displayRecipes(datas);
    listInit(datas);
    displayFilter(lists);
    recipesSection.classList.remove("empty");
  }
});