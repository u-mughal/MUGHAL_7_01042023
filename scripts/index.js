import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { filterFactory } from './factory/filterFactory.js'
import { filterDatas, sortDatas } from './utils/filterAlgo.js'
import { toggleDropDown } from './utils/dropdown.js'
// import { initFilterList } from './utils/filter.js'
import { createTag } from './utils/tag.js'

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
	lists = {
		ingredient: ingredientsList,
		appliance: appliancesList,
		ustensil: ustensilsList,
	}
}

function listInit(datas) {
	createListIngredients(datas)
	createListAppliances(datas)
	createListUstensils(datas)
	groupLists()
}

//si
//génération des listes de filtres via la filterFactory
function displayFilterList(lists, keyword = null, source = null) {
	for (const [key, value] of Object.entries(lists)) {
		const ulSection = document.getElementById(`filter_list_${key}`)
		ulSection.innerHTML = ''
		if (keyword) {
			// si argument keyword transmis (input)
			if (source) {
				// si source filtre
				const keywordFormated = keyword
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
				//filtre les listes en gardant la valeur saisie
				const newValuesList = Object.values(value).filter((elt) => {
					const eltFormated = elt
						.toLowerCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
					return eltFormated.includes(keywordFormated)
				})
				//envoi la nouvelle liste de filtre à la filterFactory pour les générer et afficher
				let filterListModel = filterFactory(newValuesList)
				const filterListCardDOM = filterListModel.getFilterListCardDOM()
				Object.values(filterListCardDOM).forEach((li) => {
					li.addEventListener('click', (e) => createTag(e, key))
					ulSection.appendChild(li)
				})
			} else {
				// si argument keyword transmis (input)
				const keywordFormated = keyword
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
				//filtre les listes en enlevant la valeur saisie
				const newValuesList = Object.values(value).filter((elt) => {
					const eltFormated = elt
						.toLowerCase()
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, '')
					return !eltFormated.includes(keywordFormated)
				})
				//envoi la nouvelle liste de filtre à la filterFactory pour les générer et afficher
				let filterListModel = filterFactory(newValuesList)
				const filterListCardDOM = filterListModel.getFilterListCardDOM()
				Object.values(filterListCardDOM).forEach((li) => {
					li.addEventListener('click', (e) => createTag(e, key))
					ulSection.appendChild(li)
				})
			}
		} else {
			// si pas argument keyword transmis (input)
			//envoi la nouvelle liste de filtre à la filterFactory pour les générer et afficher
			let filterListModel = filterFactory(value)
			const filterListCardDOM = filterListModel.getFilterListCardDOM()
			Object.values(filterListCardDOM).forEach((li) => {
				li.addEventListener('click', (e) => {
					createTag(e, key)
					filteredDatas = filterDatas(e.target.value, datas)
					displayRecipes(filteredDatas)
					listInit(filteredDatas)
					displayFilterList(lists, value, sourceValue)
				})
				ulSection.appendChild(li)
			})
		}
	}
}

async function init() {
	datas = await getRecipes()
	displayRecipes(datas)
	listInit(datas)
	displayFilterList(lists)
}

init()

//------------------------------------------------------------------------------------------
// Dropdown
const triggers = document.querySelectorAll('.trigger')
triggers.forEach((trigger) => trigger.addEventListener('click', (e) => toggleDropDown(e)))

//------------------------------------------------------------------------------------------
// Filter search
const inputs = document.querySelectorAll('.filter_input')
// inputs.forEach((input) => input.addEventListener('input', (e) => initFilterList(e)))
inputs.forEach((input) =>
	input.addEventListener('input', (e) => {
		const value = e.target.value
		const sourceValue = e.target.classList.value
		console.log(sourceValue)
		// const inputSearchBar = document.getElementById('search_recipe')
		if (value.length >= 3) {
			// if (inputSearchBar.className === 'active') {
			// 	const searchValue = inputSearchBar.value
			// 	const newValue = optionArray.filter((option) => !option.toString().includes(searchValue))
			filteredDatas = filterDatas(e.target.value, datas)
			displayRecipes(filteredDatas)
			listInit(filteredDatas)
			displayFilterList(lists, value, sourceValue)
			// } else {
			// }
		} else {
			displayRecipes(datas)
			listInit(datas)
			displayFilterList(lists)
		}
	})
)

//------------------------------------------------------------------------------------------
// Event Listener
const searchBar = document.querySelector('#search_recipe')
searchBar.addEventListener('input', (e) => {
	const value = e.target.value
	const recipesSection = document.getElementById('recipes')
	if (value.length >= 3) {
		searchBar.classList.add('active') /** rajouter un style */
		filteredDatas = filterDatas(e.target.value, datas) // filtre les recettes avec la value de l'input
		displayRecipes(filteredDatas) // affiche les recettes filtrées
		listInit(filteredDatas) // réinitialise les listes ingr, app, ustens avec les recettes filtrées
		displayFilterList(lists, value) // filtre et affiche les listes les listes des recettes filtrées
		if (filteredDatas.length === 0) {
			recipesSection.innerHTML = "Votre recherche n'a pas de correspondance."
			recipesSection.classList.add('empty')
		} else {
			recipesSection.classList.remove('empty')
		}
	} else {
		searchBar.classList.remove('active')
		// displayRecipes(datas)
		// listInit(datas)
		// displayFilterList(lists)
		init()
		recipesSection.classList.remove('empty')
	}
})
