import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { createFilterList } from './factory/createFilterList.js'
import { filterRecipes, sortRecipes } from './utils/filterAlgo.js'
import { toggleDropDown } from './utils/dropdown.js'
import { format } from './utils/format.js'

/**
 * Liste des recettes.
 * @type {Array}
 * Liste des ingrédients.
 * @type {Array}
 * Liste des appareils.
 * @type {Array}
 * Liste des ustensiles.
 * @type {Array}
 * Liste des filtres.
 * @type {Array}
 * Valeur de la barre de recherche.
 * @type {string}
 * Mots-clés de recherche pour la barre de recherche.
 * @type {Array}
 * Recettes filtrées.
 * @type {Array}
 * Liste de tags.
 * @type {Array}
 * Mot-clé global de recherche.
 * @type {Array}
 * Recettes filtrées par tags.
 * @type {Array}
 */
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


/**
 * Barre de recherche.
 * @type {Element}
 * Formulaire de la barre de recherche.
 * @type {Element}
 * Bouton de suppression de recherche.
 * @type {Element}
 * Section des recettes.
 * @type {Element}
 * Nombre de recettes affichées.
 * @type {Element}
 * Inputs de filtres.
 * @type {NodeList}
 */
const searchBar = document.querySelector('#search_recipe')
const searchBarForm = document.querySelector('form')
const cross = document.querySelector('.search_btn_cross')
const recipesSection = document.getElementById('recipes')
const recipesLength = document.querySelector('.search_recipe_number')
const inputsFilter = document.querySelectorAll('.filter_input')


/**
 * Affiche les cartes de recettes en utilisant la factory de recettes.
 * @param {Array} recipes - Liste des recettes à afficher.
 */
function displayRecipes(recipes) {
  sortRecipes(recipes, 'name');
  const recipesSection = document.getElementById('recipes');
  recipesSection.innerHTML = '';

  recipes.forEach((recipe) => {
    let recipeModel = recipeFactory(recipe);
    const recipeCardHTML = recipeModel.getRecipeCard();
    recipesSection.insertAdjacentHTML('beforeend', recipeCardHTML);
  });
}

/**
 * Génère et retourne la liste des ingrédients à partir des recettes fournies.
 * @param {Array} recipes - Liste des recettes.
 * @returns {Array} - Liste des ingrédients.
 */
function generateIngredientList(recipes) {
  let ingredientsListBrut = [];

  recipes.forEach((recipe) => {
    let listeModel = recipeFactory(recipe);
    const ingredients = listeModel.getIngredients();
    ingredientsListBrut.push(...ingredients);
  });

  ingredientsListBrut.sort();
  ingredientsList = [...new Set(ingredientsListBrut)];

  return ingredientsList;
}

/**
 * Génère et retourne la liste des appareils à partir des recettes fournies.
 * @param {Array} recipes - Liste des recettes.
 * @returns {Array} - Liste des appareils.
 */
function generateApplianceList(recipes) {
  let applianceListBrut = [];

  recipes.forEach((recipe) => {
    let listeModel = recipeFactory(recipe);
    const appliances = listeModel.getAppliances();
    applianceListBrut.push(appliances);
  });

  applianceListBrut.sort();
  appliancesList = [...new Set(applianceListBrut)];

  return appliancesList;
}

/**
 * Génère et retourne la liste des ustensiles à partir des recettes fournies.
 * @param {Array} recipes - Liste des recettes.
 * @returns {Array} - Liste des ustensiles.
 */
function generateUstensilList(recipes) {
  let ustensilsListBrut = [];

  recipes.forEach((recipe) => {
    let listeModel = recipeFactory(recipe);
    const ustensils = listeModel.getUstensiles();
    ustensilsListBrut.push(...ustensils);
  });

  ustensilsListBrut.sort();
  ustensilsList = [...new Set(ustensilsListBrut)];

  return ustensilsList;
}

/**
 * Regroupe les listes d'ingrédients, d'appareils et d'ustensiles dans un objet.
 */
function groupLists() {
  lists = {
    ingredient: ingredientsList,
    appliance: appliancesList,
    ustensil: ustensilsList,
  };
}

/**
 * Initialise les listes d'ingrédients, d'appareils et d'ustensiles à partir des recettes fournies.
 * @param {Array} recipes - Liste des recettes.
 */
function listInit(recipes) {
  generateIngredientList(recipes);
  generateApplianceList(recipes);
  generateUstensilList(recipes);
  groupLists();
}

/**
 * Génère les listes de filtres à afficher sur l'interface.
 * @param {Object} lists - Les listes de filtres disponibles.
 * @param {string|null} keyword - Le mot-clé de filtrage actif (facultatif).
 */
function displayFilterList(lists, keyword = null) {

	for (const [filterName, filterList] of Object.entries(lists)) {
		const ulSection = document.getElementById(`filter_list_${filterName}`)
		ulSection.innerHTML = ''

		let filterListModel = createFilterList(filterList)
		const filterListCardDOM = filterListModel.generateFilterElements()

		Object.values(filterListCardDOM).forEach((li) => {
			li.addEventListener('click', (e) => {
				createTag(e, filterName)
			})

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

/**
 * Fonction d'initialisation.
 * Effectue les étapes nécessaires pour démarrer l'application.
 */
async function init() {
	recipes = await getRecipes()
	displayRecipes(recipes)
	listInit(recipes)
	displayFilterList(lists)
}

init()

/**
 * Réinitialise la page des recettes.
 * Affiche toutes les recettes, réinitialise les filtres et les mots-clés de recherche.
 */
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

/**
 * Sélectionne tous les éléments avec la classe '.trigger' et ajoute un écouteur d'événement click à chacun.
 * Lorsque l'événement click est déclenché, la fonction 'toggleDropDown' est appelée.
 */
const triggers = document.querySelectorAll('.trigger');
triggers.forEach((trigger) => trigger.addEventListener('click', (e) => toggleDropDown(e)));

/**
 * Gère l'événement de saisie dans la barre de recherche.
 * Effectue une recherche en fonction de la valeur saisie et affiche les résultats correspondants.
 */
searchBar.addEventListener('input', (e) => {
	searchBarValue = e.target.value

	if (searchBarValue.length >= 3) {
		searchBarKeyword = []
		searchBarKeyword.push(searchBarValue)
		searchBar.classList.add('active')
		initResetSearchbar()

		filteredRecipes = filterRecipes(searchBarValue, recipes)
		recipesLength.textContent = filteredRecipes.length
		displayRecipes(filteredRecipes)
		listInit(filteredRecipes)
		displayFilterList(lists, searchBarValue)

		if (tagList.length != 0) {
			tagSectionReset()
		}

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

/**
 * Initialise la fonction de réinitialisation de la barre de recherche.
 * Affiche le bouton de suppression de la recherche et ajoute un événement de clic pour réinitialiser la barre de recherche.
 */
function initResetSearchbar() {
	cross.style.display = 'block'
	cross.addEventListener('click', () => resetSearchbar())
}

/**
 * Réinitialise la barre de recherche.
 * Réinitialise le formulaire de la barre de recherche, masque le bouton de suppression de la recherche,
 * et réinitialise la page des recettes. Si une recherche par tag était active, elle est également réinitialisée.
 */
function resetSearchbar() {
	searchBarForm.reset()
	cross.style.display = 'none'
	resetRecipePage()

	// Si un tag était actif, le réinitialise également
	if (tagList.length != 0) {
		tagSectionReset()
	}
}

/**
 * Ajoute des événements d'écoute aux champs de filtre.
 * Lorsque la valeur d'un champ de filtre change, cette fonction est déclenchée.
 * Elle effectue le filtrage des options de filtre en fonction de la valeur saisie.
 */
inputsFilter.forEach((input) =>
	input.addEventListener('input', (e) => {
		const filterValue = e.target.value
		const filterProperty = e.target.dataset.property

		if (filterValue.length >= 3) {
			initResetInput(filterProperty)

			const ulSection = document.getElementById(`filter_list_${filterProperty}`)
			const liSectionList = ulSection.childNodes
			const keywordFormated = format(filterValue)

			const newFilterList = []
			Object.values(liSectionList).filter((li) => {
				const eltFormated = format(li.innerHTML)
				if (eltFormated.includes(keywordFormated)) {
					newFilterList.push(eltFormated)
				}
			})

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
);

/**
 * Initialise le processus de réinitialisation d'un champ de filtre.
 * Cette fonction est appelée lorsqu'un utilisateur souhaite réinitialiser un champ de filtre spécifique.
 * Elle réinitialise la valeur du champ de filtre, masque le bouton de réinitialisation et réinitialise les filtres et les recettes en fonction de l'état de la barre de recherche principale.
 * @param {string} e - Le nom de la propriété du champ de filtre.
 */
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

// Désactivation de la touche Enter dans les champs de filtre
inputsFilter.forEach((input) => {
	input.addEventListener('keydown', (e) => {
		e.key === 'Enter' && e.preventDefault()
	})
});

/**
 * Crée un tag de filtre lorsqu'un utilisateur sélectionne une option de filtre.
 * Cette fonction crée un tag visuel représentant le filtre sélectionné par l'utilisateur.
 * Elle ajoute le tag à la section des tags de filtre, met à jour l'état des éléments associés au filtre sélectionné
 * (tels que l'input de recherche et la liste de filtres) et effectue une mise à jour des recettes en fonction des filtres actifs.
 * @param {Event} e - L'événement déclenché lors de la sélection d'une option de filtre.
 * @param {string} selectedFilter - Le filtre sélectionné par l'utilisateur.
 */
function createTag(e, selectedFilter) {
	if (!e.target.className.includes('selected')) {
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

		// Ajoute le tag dans tagList
		tagList.push(e.target.innerText)

		// Supprime la croix de réinitialisation dans l'input du filtre
		const resetFilter = document.getElementById(`filter_reset_${selectedFilter}`)
		resetFilter.style.display = 'none'

		// Concatène les deux tableaux de keyword
		globalKeyword = searchBarKeyword.concat(tagList)
		filterByTag(recipes, globalKeyword)
	}
}

/**
 * Supprime un tag de filtre lorsqu'un utilisateur clique sur l'icône de suppression du tag.
 * Cette fonction supprime visuellement le tag de la section des tags de filtre.
 * Elle met également à jour les listes `tagList` et `globalKeyword` en supprimant le tag supprimé.
 * Enfin, elle effectue une mise à jour des recettes en fonction des filtres actifs.
 * @param {Event} e - L'événement déclenché lors du clic sur l'icône de suppression du tag.
 */
function deleteTag(e) {
	e.target.parentElement.remove()
	const tagDiv = document.getElementById('filters_tags')
	if (tagDiv.innerHTML === '') {
		tagDiv.classList.remove('filters_tags_active')
	}

	const index = tagList.indexOf(e.target.previousSibling.innerHTML)
	if (index > -1) {
		tagList.splice(index, 1)
	}

	const index2 = globalKeyword.indexOf(e.target.previousSibling.innerHTML)
	if (index2 > -1) {
		globalKeyword.splice(index2, 1)
	}

	filterByTag(recipes, globalKeyword)
}

/**
 * Filtre les recettes en fonction des mots-clés globaux (searchBarKeyword + tagList).
 * Cette fonction filtre les recettes en utilisant chaque mot-clé dans la liste `globalKeyword`.
 * Elle met à jour la liste `filteredRecipesByTag` avec les recettes filtrées et effectue une mise à jour visuelle des recettes et des listes de filtres.
 * Si aucun mot-clé n'est présent dans `globalKeyword`, la liste `filteredRecipesByTag` est réinitialisée et la page des recettes est réinitialisée.
 * @param {Array} recipes - La liste complète des recettes.
 * @param {Array} globalKeyword - La liste des mots-clés globaux (searchBarKeyword + tagList).
 */
function filterByTag(recipes, globalKeyword) {
	if (globalKeyword.length != 0) {
		filteredRecipesByTag = recipes

		// Filtre les recettes avec chaque mot-clé
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

/**
 * Réinitialise la section des tags de filtre.
 * Cette fonction supprime tous les tags visuellement de la section des tags de filtre.
 * Elle réinitialise les listes `tagList`, `globalKeyword` et `filteredRecipesByTag` en les vidant.
 * @returns {void}
 */
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
