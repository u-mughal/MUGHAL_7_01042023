import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { createFilterList } from './factory/createFilterList.js'
import { filterRecipes, sortRecipes } from './utils/filterAlgo.js'
import { toggleDropDown } from './utils/dropdown.js'

// déclaration variables
let recipes = []
let ingredientsList = []
let appliancesList = []
let ustensilsList = []
let lists = []
let searchBarValue
let searchBarKeyword = []
let filteredRecipes = []
let tagList = []
let globalKeyword = []
let filteredRecipesByTag = []

const searchBar = document.querySelector('#search_recipe')
const searchBarForm = document.querySelector('form')
const cross = document.querySelector('.search_btn_cross')
const recipesSection = document.getElementById('recipes')
const recipesLength = document.querySelector('.search_recipe_number')
const inputsFilter = document.querySelectorAll('.filter_input')

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
function generateIngredientList(recipes) {
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
function generateApplianceList(recipes) {
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
function generateUstensilList(recipes) {
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
	generateIngredientList(recipes)
	generateApplianceList(recipes)
	generateUstensilList(recipes)
	groupLists()
}

//génération des listes de filtres via la createFilterList
function displayFilterList(lists, keyword = null) {
	// pour chaque filtre Ing, App, Usten
	for (const [filterName, filterList] of Object.entries(lists)) {
		const ulSection = document.getElementById(`filter_list_${filterName}`)
		ulSection.innerHTML = ''

		// on génère la liste html via la createFilterList
		let filterListModel = createFilterList(filterList)
		const filterListCardDOM = filterListModel.generateFilterElements()

		// on postionne un eventlistener sur chaque option de filtre li
		Object.values(filterListCardDOM).forEach((li) => {
			li.addEventListener('click', (e) => {
				createTag(e, filterName)
			})

			// selon la nature de keyword, applique style aux éléments sélectionnés
			if (keyword) {
				const liFormated = format(li.textContent)

				if (typeof keyword === 'string') {
					const keywordFormated = format(keyword)

					if (keywordFormated == liFormated) {
						li.classList.add('selected')
					}
				} else {
					keyword.forEach((word) => {
						const wordFormated = format(word)

						if (wordFormated == liFormated) {
							li.classList.add('selected')
						}
					})
				}
			}
			ulSection.appendChild(li)
		})
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
// Réinitialisation de la page
function resetRecipePage() {
	displayRecipes(recipes)
	listInit(recipes)
	displayFilterList(lists)

	searchBarKeyword = []
	filteredRecipes = []
	recipesLength.textContent = recipes.length

	if (searchBar.classList == 'active') {
		searchBar.classList.remove('active')
	}

	if (recipesSection.classList == 'empty') {
		recipesSection.classList.remove('empty')
	}
}

//------------------------------------------------------------------------------------------
// Dropdown
const triggers = document.querySelectorAll('.trigger')
triggers.forEach((trigger) => trigger.addEventListener('click', (e) => toggleDropDown(e)))

//------------------------------------------------------------------------------------------
// Barre de recherche principale
searchBar.addEventListener('input', (e) => {
	searchBarValue = e.target.value

	if (searchBarValue.length >= 3) {
		searchBarKeyword = []
		searchBarKeyword.push(searchBarValue)
		searchBar.classList.add('active')
		initResetSearchbar()

		// filtre les recettes avec la value de l'input
		filteredRecipes = filterRecipes(searchBarValue, recipes)
		recipesLength.textContent = filteredRecipes.length
		displayRecipes(filteredRecipes)
		listInit(filteredRecipes)
		displayFilterList(lists, searchBarValue)

		// si déjà recherche par tag, reset
		if (tagList.length != 0) {
			tagSectionReset()
		}

		// si aucune recette trouvée, message erreur
		if (filteredRecipes.length === 0) {
			recipesSection.innerHTML =
				'Aucune recette ne correspond à votre recherche.<br/> Essayez quiche lorraine, chocolat noir, cocotte minute...'
			recipesSection.classList.add('empty')
		} else {
			recipesSection.classList.remove('empty')
		}
	} else {
		resetRecipePage()
		cross.style.display = 'none'
	}
})

// gestion du reset de la barre de recherche
function initResetSearchbar() {
	cross.style.display = 'block'
	cross.addEventListener('click', () => resetSearchbar())
}

function resetSearchbar() {
	searchBarForm.reset()
	cross.style.display = 'none'
	resetRecipePage()
	// si tag actif, reset
	if (tagList.length != 0) {
		tagSectionReset()
	}
}

//------------------------------------------------------------------------------------------
// Filtres de tri
inputsFilter.forEach((input) =>
	input.addEventListener('input', (e) => {
		const filterValue = e.target.value
		const filterProperty = e.target.dataset.property

		if (filterValue.length >= 3) {
			initResetInput(filterProperty)

			// récupère les li existants
			const ulSection = document.getElementById(`filter_list_${filterProperty}`)
			const liSectionList = ulSection.childNodes
			const keywordFormated = format(filterValue)

			// filtre les li ceux qui contiennent la même valeur que le filtre saisi
			const newFilterList = []
			Object.values(liSectionList).filter((li) => {
				const eltFormated = format(li.innerHTML)
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
				liFilter.addEventListener('click', (e) => {
					createTag(e, filterProperty)
				})
				ulSection.appendChild(liFilter)
			})
		} else {
			document.querySelectorAll('.filter_reset').forEach((reset) => {
				reset.style.display = 'none'
			})

			if (searchBar.value !== '') {
				listInit(filteredRecipes)
				displayFilterList(lists, searchBar.value)
			} else {
				listInit(recipes)
				displayFilterList(lists)
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
			listInit(filteredRecipes)
			displayFilterList(lists, searchBar.value)
		} else {
			listInit(recipes)
			displayFilterList(lists)
		}
	})
}

// désactivation de la touche Enter dans les inputs des filtres
inputsFilter.forEach((input) => {
	input.addEventListener('keydown', (e) => {
		e.key === 'Enter' && e.preventDefault()
	})
})

//------------------------------------------------------------------------------------------
// Gestion des tags

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

	// supprime croix reset dans l'input du filtre
	const resetFilter = document.getElementById(`filter_reset_${selectedFilter}`)
	resetFilter.style.display = 'none'

	// concatène les 2 tableaux de keyword
	globalKeyword = searchBarKeyword.concat(tagList)
	filterByTag(recipes, globalKeyword)
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

	filterByTag(recipes, globalKeyword)
}

function filterByTag(recipes, globalKeyword) {
	if (globalKeyword.length != 0) {
		filteredRecipesByTag = recipes

		// filtre les recettes avec chaque keyword
		globalKeyword.forEach((keyword) => {
			filteredRecipesByTag = filterRecipes(keyword, filteredRecipesByTag)
			recipesLength.textContent = filteredRecipesByTag.length
			displayRecipes(filteredRecipesByTag)
			listInit(filteredRecipesByTag)
			displayFilterList(lists, globalKeyword)
		})
	} else {
		filteredRecipesByTag = []
		resetRecipePage()
	}
}

function tagSectionReset() {
	tagList = []
	globalKeyword = []
	filteredRecipesByTag = []

	const tags = document.querySelectorAll('.filter_tag_div')
	tags.forEach((tag) => {
		tag.remove()
	})

	const tagDiv = document.getElementById('filters_tags')
	tagDiv.classList.remove('filters_tags_active')
}

//------------------------------------------------------------------------------------------
// Formatage des éléments
export function format(e) {
	const formattedElement = e
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
	return formattedElement
}