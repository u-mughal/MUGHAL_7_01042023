import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { filterFactory } from './factory/filterFactory.js'
import { filterDatas, sortDatas } from './utils/filterAlgo.js'
import { handleFilterList } from './utils/filter.js'
import { handleTag } from './utils/tag.js'

// déclaration variables
let datas = []
let ingredientsList = []
let appliancesList = []
let ustensilsList = []
let lists = []
let filteredDatas = []

// création et affichage des cards recette via la recipeFactory
function displayRecipes(datas) {
	sortDatas(datas)
	const recipesSection = document.getElementById('recipes')
	recipesSection.innerHTML = ''
	datas.forEach((data) => {
		let recipeModel = recipeFactory(data)
		const recipeCardDOM = recipeModel.getRecipeCard()
		recipesSection.appendChild(recipeCardDOM)
	})
}

// création liste ingrédients via la recipeFactory
function createListIngredients(datas) {
	let ingredientsListBrut = []
	datas.forEach((data) => {
		let listeModel = recipeFactory(data)
		const ingredients = listeModel.getIngredients()
		ingredientsListBrut.push(...ingredients)
	})
	ingredientsListBrut.sort()
	ingredientsList = [...new Set(ingredientsListBrut)]

	return ingredientsList
}

// création liste appareils via la recipeFactory
function createListAppliances(datas) {
	let applianceListBrut = []
	datas.forEach((data) => {
		let listeModel = recipeFactory(data)
		const appliances = listeModel.getAppliances()
		applianceListBrut.push(appliances)
	})
	applianceListBrut.sort()
	appliancesList = [...new Set(applianceListBrut)]

	return appliancesList
}

// création liste ustensiles via la recipeFactory
function createListUstensils(datas) {
	let ustensilsListBrut = []
	datas.forEach((data) => {
		let listeModel = recipeFactory(data)
		const ustensils = listeModel.getUstensiles()
		ustensilsListBrut.push(...ustensils)
	})
	ustensilsListBrut.sort()
	ustensilsList = [...new Set(ustensilsListBrut)]

	return ustensilsList
}

function groupLists() {
	lists = [
		{ Ingrédients: ingredientsList },
		{ Appareils: appliancesList },
		{ Ustensiles: ustensilsList },
	]
}

function listInit(datas) {
	createListIngredients(datas)
	createListAppliances(datas)
	createListUstensils(datas)
	groupLists()
}

//création et affichage des filtres via la filterFactory
function displayFilter(lists) {
	const filtersSection = document.getElementById('filters_buttons')
	filtersSection.innerHTML = ''
	lists.forEach((list) => {
		let filterModel = filterFactory(list)
		const filterCardDOM = filterModel.getFilterCardDOM()
		filtersSection.appendChild(filterCardDOM['filter'])
		filterCardDOM['input'].addEventListener('input', (e) => handleFilterList(e))
		// const value = e.target.value
		// const regexZeroCaracters = /^$/
		// const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/
		// const regexThreeCaracters = /[A-Za-z0-9]{3,}/
		// debugger
		// if (regexThreeCaracters.test(value)) {
		// 	initFilterList(e.target.value)
		// } else if (regexZeroCaracters.test(value)) {
		// 	initFilterList()
		// } else if (regexOneOrTwoCaracters.test(value)) {
		// 	null
		// }
	})
}

//génération des listes de filtres via la filterFactory
export function initFilterList(lists) {
	lists.forEach((list) => {
		const optionArray = Object.values(list)
		let filterListModel = filterFactory(list)
		const filterListCardDOM = filterListModel.getFilterListCardDOM(optionArray)
		const selectedFilter = filterListModel.selectedFilter
		const liSection = document.getElementById(`filter_by_${selectedFilter}`)
		const liFilter = filterListModel.liFilterArray
		liFilter.forEach((li) => {
			li.addEventListener('click', (e) => handleTag(e, selectedFilter))
		})
		liSection.appendChild(filterListCardDOM)
	})
}
// function filledListFilter(keyword = null) {
// 	const liSection = document.getElementById(`filter_list_${selectedFilter}`)
// 	liSection.innerHTML = ''
// 	if (keyword) {
// 		const keywordFormated = keyword
// 			.toLowerCase()
// 			.normalize('NFD')
// 			.replace(/[\u0300-\u036f]/g, '')
// 		const regex = new RegExp(keywordFormated)
// 		const matchKeywords = optionArray.filter((o) => {
// 			const oFormated = o.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
// 			return regex.test(oFormated)
// 		})
// 		getFilterListCardDOM(matchKeywords)
// 	} else {
// 		const inputSearchBar = document.getElementById('search_recipe')
// 		if (inputSearchBar.className === 'active') {
// 			const searchValue = inputSearchBar.value
// 			const newOptionArray = optionArray.filter(
// 				(option) => !option.toString().includes(searchValue)
// 			)
// 			getFilterListCardDOM(newOptionArray)
// 		} else {
// 			getFilterListCardDOM(optionArray)
// 		}
// 	}
// }

async function init() {
	datas = await getRecipes()
	displayRecipes(datas)
	listInit(datas)
	displayFilter(lists)
	initFilterList(lists)
}

init()

//------------------------------------------------------------------------------------------
// Event Listener
const searchBar = document.querySelector('#search_recipe')
searchBar.addEventListener('input', (e) => {
	const value = e.target.value
	const regexThreeCaracters = /[A-Za-z0-9]{3,}/
	const recipesSection = document.getElementById('recipes')
	if (regexThreeCaracters.test(value)) {
		searchBar.classList.add('active')
		filteredDatas = filterDatas(e.target.value, datas)
		displayRecipes(filteredDatas)
		listInit(filteredDatas)
		displayFilter(lists)
		initFilterList(lists)
		if (filteredDatas.length === 0) {
			recipesSection.innerHTML = "Votre recherche n'a pas de correspondance."
			recipesSection.classList.add('empty')
		} else {
			recipesSection.classList.remove('empty')
		}
	} else {
		searchBar.classList.remove('active')
		displayRecipes(datas)
		listInit(datas)
		displayFilter(lists)
		initFilterList(lists)
		recipesSection.classList.remove('empty')
	}
})