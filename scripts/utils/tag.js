import { filterByTag } from "../factory/filterFactory.js";
import { filterDatas } from "./searchBar.js";

function handleTag() {
  filterByTag(e);
  filterDatas(e.target.innerText, datas);
}

// quand on sélectionne/clique sur filtre
// on créé un tag html
createTag();
//**s'il y a déjà eu une recherche dans la searchbar **/
// que filteredDatas n'est pas vide
filteredDatas !== empty;
// on va filtrer les filteredDatas avec le keywordTag
filterDatas(tag, filteredDatas);
// puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
displayRecipe(fileredDatasWithTag);
// on va filledListFilter avec filteredDataWithTag
filledListFilter(fileredDatasWithTag);
// si on sélectionne/clique sur autre filtre
// on créé un tag html
createTag();
// on va filtrer les filteredDataWithTag avec le keywordTag
filterDatas(tag, fileredDatasWithTag);
// puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
displayRecipe(fileredDatasWithTag);
// etc...
// si on delete un tag

//** s'il n'y a pas eu de recherche dans la searchbar */
// que filteredDatas est vide
filteredDatas === empty;
// on va filtrer les datas avec le keywordTag
filterDatas(tag, datas);
// puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
displayRecipe(fileredDatasWithTag);
// si on sélectionne/clique sur autre filtre
// on créé un tag html
createTag();
// on va filtrer les filteredDataWithTag avec le keywordTag qui sont le return filteredDatas
filterDatas(tag, fileredDatasWithTag);
// puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
displayRecipe(fileredDatasWithTag);
// etc...
// si on désélectionne/clique un filtre
// on delete un tag html
deleteTag();
// si input searchbar
console.log(
  "Veuillez déselectionner le/les filtre(s) pour saisir une recherche"
);