// import { filterFactory } from "../factory/filterFactory.js";

// function handleTag() {
//   console.log("coucou");
//   let filterModel = filterFactory();
//   const fiterCardDOM = filterModel.getSelectedFilter();
//   console.log(fiterCardDOM);
// }

// function createTag(e) {
//   const filterTag = document.getElementById("filters_tags");
//   filterTag.classList.add("filters_tags_active");

//   const tagDiv = document.createElement("div");
//   tagDiv.classList.add("filter_tag_div");
//   tagDiv.classList.add(`color_tag_${selectedFilter}`);
//   filterTag.appendChild(tagDiv);

//   const tag = document.createElement("p");
//   tag.classList.add("filter_tag_p");
//   tag.textContent = e;
//   tagDiv.appendChild(tag);

//   const tagIcon = document.createElement("i");
//   tagIcon.classList.add("far", "fa-times-circle");
//   tagIcon.addEventListener("click", (e) => deleteTag(e));
//   tagDiv.appendChild(tagIcon);

//   const filterInput = document.getElementById(`input_${selectedFilter}`);
//   filterInput.value = "";
//   const filterList = document.getElementById(`filter_by_${selectedFilter}`);
//   filterList.style.display = "none";
//   const filterButton = document.getElementById(`filter_btn_${selectedFilter}`);
//   filterButton.style.display = "block";
// }

// function deleteTag(e) {
//   e.target.parentElement.remove();
//   const tagDiv = document.getElementById("filters_tags");
//   if (tagDiv.innerHTML === "") {
//     tagDiv.classList.remove("filters_tags_active");
//   }
// }

// export function filterByTag(e) {
//   createTag(e.target.innerText);
//   filledListFilter();
// }

// function handleTag() {
//   filterByTag(e);
//   filterDatas(e.target.innerText, datas);
// }

// quand on sélectionne/clique sur filtre
// on créé un tag html
// createTag();
// //**s'il y a déjà eu une recherche dans la searchbar **/
// // que searchbar est active
// searchbar.className == "active";
// // on va filtrer les filteredDatas avec le keywordTag
// filterDatas(tag, filteredDatas);
// // puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
// displayRecipe(fileredDatasWithTag);
// // on va filledListFilter avec filteredDataWithTag
// filledListFilter(fileredDatasWithTag);
// // si on sélectionne/clique sur autre filtre
// // on créé un tag html
// createTag();
// // on va filtrer les filteredDataWithTag avec le keywordTag
// filterDatas(tag, fileredDatasWithTag);
// // puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
// displayRecipe(fileredDatasWithTag);
// // etc...
// // si on delete un tag

// //** s'il n'y a pas eu de recherche dans la searchbar */
// // que filteredDatas est vide
// filteredDatas === empty;
// // on va filtrer les datas avec le keywordTag
// filterDatas(tag, datas);
// // puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
// displayRecipe(fileredDatasWithTag);
// // si on sélectionne/clique sur autre filtre
// // on créé un tag html
// createTag();
// // on va filtrer les filteredDataWithTag avec le keywordTag qui sont le return filteredDatas
// filterDatas(tag, fileredDatasWithTag);
// // puis displayRecipe avec fileredDatasWithTag qui sont le return filteredDatas
// displayRecipe(fileredDatasWithTag);
// // etc...
// // si on désélectionne/clique un filtre
// // on delete un tag html
// deleteTag();
// // si input searchbar
// console.log(
//   "Veuillez déselectionner le/les filtre(s) pour saisir une recherche"
// );