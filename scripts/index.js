import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { filterFactory } from './factory/filterFactory.js'
import { filterRecipes, sortRecipes } from './utils/filterAlgo.js'
import { toggleDropDown } from './utils/dropdown.js'
// import { filterByTag } from './utils/tag.js'

// déclaration variables
let recipes = []
let ingredientsList = []
let appliancesList = []
let ustensilsList = []
let lists = []
let filteredRecipes = []
let searchBarKeyword = []

// création et affichage des cards recette via la recipeFactory
function displayRecipes(recipes) {
	sortRecipes(recipes)
	const recipesSection = document.getElementById('recipes')
	recipesSection.innerHTML = ''
	recipes.forEach((recipe) => {
		let recipeModel = recipeFactory(recipe)
		const recipeCardDOM = recipeModel.getRecipeCard()
		recipesSection.appendChild(recipeCardDOM)
	})
}

// création liste ingrédients via la recipeFactory
function createListIngredients(recipes) {
	let ingredientsListBrut = []
	recipes.forEach((recipe) => {
		let listeModel = recipeFactory(recipe)
		const ingredients = listeModel.getIngredients()
		ingredientsListBrut.push(...ingredients)
	})
	ingredientsListBrut.sort()
	ingredientsList = [...new Set(ingredientsListBrut)]

	return ingredientsList
}

// création liste appareils via la recipeFactory
function createListAppliances(recipes) {
	let applianceListBrut = []
	recipes.forEach((recipe) => {
		let listeModel = recipeFactory(recipe)
		const appliances = listeModel.getAppliances()
		applianceListBrut.push(appliances)
	})
	applianceListBrut.sort()
	appliancesList = [...new Set(applianceListBrut)]

	return appliancesList
}

// création liste ustensiles via la recipeFactory
function createListUstensils(recipes) {
	let ustensilsListBrut = []
	recipes.forEach((recipe) => {
		let listeModel = recipeFactory(recipe)
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

function listInit(recipes) {
	createListIngredients(recipes)
	createListAppliances(recipes)
	createListUstensils(recipes)
	groupLists()
}

//génération des listes de filtres via la filterFactory
function displayFilterList(lists, keyword = null) {
	// pour chaque filtre Ing, App, Usten
	for (const [filterName, filterList] of Object.entries(lists)) {
		const ulSection = document.getElementById(`filter_list_${filterName}`)
		ulSection.innerHTML = ''
		// si pas de recherche
		if (!keyword) {
			// initialisation
			// on génère la liste html via la filterFactory
			let filterListModel = filterFactory(filterList)
			const filterListCardDOM = filterListModel.getFilterListCardDOM()
			// on postionne un eventlistener sur chaque option de filtre li
			Object.values(filterListCardDOM).forEach((li) => {
				li.addEventListener('click', (e) => {
					createTag(e, filterName, recipes)
				})
				ulSection.appendChild(li)
			})
		} else {
			// si recherche saisie // dans searchbar principale
			const keywordFormated = keyword
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
			//filtre les listes en enlevant la valeur saisie
			const newValuesList = Object.values(filterList).filter((elt) => {
				const eltFormated = elt
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
				return !eltFormated.includes(keywordFormated)
			})
			// on génère la liste html via la filterFactory
			let filterListModel = filterFactory(newValuesList)
			const filterListCardDOM = filterListModel.getFilterListCardDOM()
			// on postionne un eventlistener sur chaque option de filtre li
			Object.values(filterListCardDOM).forEach((li) => {
				li.addEventListener('click', (e) => {
					createTag(e, filterName, recipes)
				})
				ulSection.appendChild(li)
			})
		}
	}
}

async function init() {
	recipes = await getRecipes()
	displayRecipes(recipes)
	listInit(recipes)
	displayFilterList(lists)
}

init()

//------------------------------------------------------------------------------------------
// Dropdown
const triggers = document.querySelectorAll('.trigger')
triggers.forEach((trigger) => trigger.addEventListener('click', (e) => toggleDropDown(e)))

//------------------------------------------------------------------------------------------
// Barre de recherche principale
const searchBar = document.querySelector('#search_recipe')
const recipesSection = document.getElementById('recipes')
const cross = document.querySelector('.search_btn_cross')
const searchBarForm = document.querySelector('form')
const recipesLength = document.querySelector('.search_recipe_number')

searchBar.addEventListener('input', (e) => {
	const value = e.target.value

	if (value.length >= 3) {
		initResetSearchbar()
		searchBar.classList.add('active')
		// filtre les recettes avec la value de l'input
		filteredRecipes = filterRecipes(e.target.value, recipes)
		// affiche le nombre de recettes filtrées
		recipesLength.textContent = filteredRecipes.length
		// affiche les recettes filtrées
		displayRecipes(filteredRecipes)
		// réinitialise les listes ingr, app, ustens avec les recettes filtrées
		listInit(filteredRecipes)
		// affiche les listes des recettes filtrées
		displayFilterList(lists, value)
		// stock recherche saisie
		searchBarKeyword = []
		searchBarKeyword.push(value)

		if (filteredRecipes.length === 0) {
			recipesSection.innerHTML = "Votre recherche n'a pas de correspondance."
			recipesSection.classList.add('empty')
		} else {
			recipesSection.classList.remove('empty')
		}
	} else {
		init()
		searchBar.classList.remove('active')
		recipesSection.classList.remove('empty')
		cross.style.display = 'none'
		document.querySelector('.search_recipe_number').textContent = '50'
		// reset recherche saisie
		searchBarKeyword = []
	}
})

// gestion du reset de la barre de recherche
function initResetSearchbar() {
	cross.style.display = 'block'
	cross.addEventListener('click', () => {
		searchBarForm.reset()
		searchBar.classList.remove('active')
		cross.style.display = 'none'
		init()
		searchBar.classList.remove('active')
		recipesSection.classList.remove('empty')
		document.querySelector('.search_recipe_number').textContent = '50'
	})
}

//------------------------------------------------------------------------------------------
// Filtres de tri
const inputsFilter = document.querySelectorAll('.filter_input')

inputsFilter.forEach((input) =>
	input.addEventListener('input', (e) => {
		const filterValue = e.target.value
		const filterProperty = e.target.dataset.property
		if (filterValue.length >= 3) {
			initResetInput(filterProperty)
			// récupère les li existants
			const ulSection = document.getElementById(`filter_list_${filterProperty}`)
			const liSectionList = ulSection.childNodes
			const keywordFormated = filterValue
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
			// filtre les li ceux qui contiennent la même valeur que le filtre saisi
			const newFilterList = []
			Object.values(liSectionList).filter((li) => {
				const eltFormated = li.innerHTML
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
				if (eltFormated.includes(keywordFormated)) {
					newFilterList.push(eltFormated)
				}
			})
			// on génère la liste html
			ulSection.innerHTML = ''
			newFilterList.forEach((elt) => {
				const liFilter = document.createElement('li')
				liFilter.classList.add('filter_li')
				const eltFormated = (elt + '').charAt(0).toUpperCase() + elt.substr(1)
				liFilter.textContent = eltFormated
				// on postionne un eventlistener sur chaque option de filtre li
				liFilter.addEventListener('click', (e) => {
					createTag(e, filterProperty, recipes)
				})
				ulSection.appendChild(liFilter)
			})
		} else {
			document.querySelectorAll('.filter_reset').forEach((reset) => {
				reset.style.display = 'none'
			})
			// si searchbar principale active
			if (searchBar.value !== '') {
				// réinitialise la liste des elts avec toutes les recettes filtrées
				listInit(filteredRecipes)
				displayFilterList(lists, searchBar.value)
			} else {
				// initialise la liste des elts avec toutes les recettes
				init()
			}
		}
	})
)

// gestion du reset de l'input du filtre
function initResetInput(e) {
	const filterForm = document.getElementById(`filter_by_${e}`)
	const resetFilter = document.getElementById(`filter_reset_${e}`)
	resetFilter.style.display = 'block'
	resetFilter.addEventListener('click', () => {
		filterForm.reset()
		resetFilter.style.display = 'none'
		if (searchBar.value !== '') {
			// réinitialise la liste des elts avec toutes les recettes filtrées
			listInit(filteredRecipes)
			displayFilterList(lists, searchBar.value)
		} else {
			// initialise la liste des elts avec toutes les recettes
			init()
		}
	})
}

//------------------------------------------------------------------------------------------
// Gestion des tags
let tagList = []
let globalKeyword = []
let filteredRecipesByTag = []

function createTag(e, selectedFilter) {
	const filterTag = document.getElementById('filters_tags')
	filterTag.classList.add('filters_tags_active')

	const tagDiv = document.createElement('div')
	tagDiv.classList.add('filter_tag_div')
	tagDiv.classList.add(`color_tag_${selectedFilter}`)
	filterTag.appendChild(tagDiv)

	const tag = document.createElement('p')
	tag.classList.add('filter_tag_p')
	tag.textContent = e.target.innerText
	tagDiv.appendChild(tag)

	const tagIcon = document.createElement('i')
	tagIcon.classList.add('far', 'fa-times-circle')
	tagIcon.addEventListener('click', (e) => deleteTag(e))
	tagDiv.appendChild(tagIcon)

	const filterInput = document.getElementById(`input_${selectedFilter}`)
	filterInput.value = ''
	const filterListInput = document.getElementById(`filter_by_${selectedFilter}`)
	filterListInput.style.display = 'none'
	const filterList = document.getElementById(`filter_list_${selectedFilter}`)
	filterList.style.display = 'none'
	const filterButton = document.getElementById(`filter_btn_${selectedFilter}`)
	filterButton.style.display = 'block'

	// ajoute le tag dans tagList
	tagList.push(e.target.innerText)
	// concatene les 2 tableaux de keyword
	globalKeyword = searchBarKeyword.concat(tagList)
	filterByKeyword(recipes, globalKeyword)
}

function deleteTag(e) {
	e.target.parentElement.remove()
	const tagDiv = document.getElementById('filters_tags')
	if (tagDiv.innerHTML === '') {
		tagDiv.classList.remove('filters_tags_active')
	}

	// supprime le tag de tagList
	const index = tagList.indexOf(e.target.previousSibling.innerHTML)
	if (index > -1) {
		tagList.splice(index, 1)
	}

	// supprime le tag de globalKeyword
	const index2 = globalKeyword.indexOf(e.target.previousSibling.innerHTML)
	if (index2 > -1) {
		globalKeyword.splice(index2, 1)
	}

	filterByKeyword(recipes, globalKeyword)
}

function filterByKeyword(recipes, globalKeyword) {
	if (globalKeyword.length != 0) {
		filteredRecipesByTag = recipes
		// filtre les recettes avec chaque keyword
		globalKeyword.forEach((keyword) => {
			filteredRecipesByTag = filterRecipes(keyword, filteredRecipesByTag)
			// affiche le nombre de recettes filtrées
			recipesLength.textContent = filteredRecipesByTag.length
			// affiche les recettes filtrées
			displayRecipes(filteredRecipesByTag)
			// réinitialise les listes ingr, app, ustens avec les recettes filtrées
			listInit(filteredRecipesByTag)
			// affiche les listes des recettes filtrées
			displayFilterList(lists)
		})

		document.querySelectorAll('.filter_li').forEach((li) => {
			globalKeyword.forEach((keyword) => {
				if (keyword == li.textContent) {
					li.classList.add('selected')
				}
			})
		})
	} else {
		init()
		document.querySelector('.search_recipe_number').textContent = '50'
	}
}