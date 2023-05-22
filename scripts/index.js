import { getRecipes } from './api/services.js'
import { recipeFactory } from './factory/recipeFactory.js'
import { createFilterList } from './factory/createFilterList.js'
import { filterRecipes, sortRecipes } from './utils/filterAlgo.js'
import { toggleDropDown } from './utils/dropdown.js'

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
 * 
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
 * Affiche les listes de filtres en utilisant la fonction createFilterList.
 * @param {Object} lists - Objets contenant les listes de filtres (ingrédients, appareils, ustensiles).
 * @param {string|null} keyword - Mot-clé pour filtrer les éléments sélectionnés (optionnel).
 */
function displayFilterList(lists, keyword = null) {
  for (const [filterName, filterList] of Object.entries(lists)) {
    const ulSection = document.getElementById(`filter_list_${filterName}`);
    ulSection.innerHTML = '';

    let filterListModel = createFilterList(filterList);
    const filterListCardDOM = filterListModel.generateFilterElements();

    Object.values(filterListCardDOM).forEach((li) => {
      li.addEventListener('click', (e) => {
        createTag(e, filterName);
      });

      if (keyword) {
        const liFormated = format(li.textContent);

        if (typeof keyword === 'string') {
          const keywordFormated = format(keyword);

          if (keywordFormated == liFormated) {
            li.classList.add('selected');
          }
        } else {
          keyword.forEach((word) => {
            const wordFormated = format(word);

            if (wordFormated == liFormated) {
              li.classList.add('selected');
            }
          });
        }
      }
      ulSection.appendChild(li);
    });
  }
}

/**
 * Fonction d'initialisation. Récupère les recettes, les affiche, et initialise les listes de filtres.
 */
async function init() {
  recipes = await getRecipes();
  displayRecipes(recipes);
  listInit(recipes);
  displayFilterList(lists);
}

init();

/**
 * Réinitialise la page des recettes.
 * Réaffiche les recettes, réinitialise les listes et filtres, et réinitialise les mots-clés de recherche.
 */
function resetRecipePage() {
  displayRecipes(recipes);
  listInit(recipes);
  displayFilterList(lists);

  searchBarKeyword = [];
  filteredRecipes = [];
  recipesLength.textContent = recipes.length;

  if (searchBar.classList == 'active') {
    searchBar.classList.remove('active');
  }

  if (recipesSection.classList == 'empty') {
    recipesSection.classList.remove('empty');
  }
}

/**
 * Sélectionne tous les éléments avec la classe '.trigger' et ajoute un écouteur d'événement click à chacun.
 * Lorsque l'événement click est déclenché, la fonction 'toggleDropDown' est appelée.
 */
const triggers = document.querySelectorAll('.trigger');
triggers.forEach((trigger) => trigger.addEventListener('click', (e) => toggleDropDown(e)));

/**
 * Ajoute un écouteur d'événement input à l'élément searchBar.
 * Lorsque l'événement input est déclenché (l'utilisateur saisit du texte dans la barre de recherche), la fonction est exécutée.
 * La valeur saisie dans la barre de recherche est stockée dans searchBarValue.
 * Si la longueur de la valeur saisie est supérieure ou égale à 3 caractères :
 *   - La variable searchBarKeyword est réinitialisée et contient la valeur de la barre de recherche.
 *   - La classe 'active' est ajoutée à l'élément searchBar pour appliquer un style actif.
 *   - La fonction initResetSearchbar() est appelée pour initialiser le bouton de réinitialisation de la barre de recherche.
 *   - Les recettes sont filtrées en utilisant la valeur de la barre de recherche, et le nombre de recettes filtrées est affiché.
 *   - Les recettes filtrées sont affichées à l'écran.
 *   - Les listes de filtres sont initialisées et affichées.
 *   - Si des tags sont déjà actifs, ils sont réinitialisés.
 *   - Si aucune recette n'est trouvée, un message d'erreur est affiché. Sinon, le message d'erreur est masqué.
 * Sinon (la longueur de la valeur saisie est inférieure à 3 caractères) :
 *   - La fonction resetRecipePage() est appelée pour réinitialiser l'affichage des recettes et des filtres.
 *   - Le bouton de réinitialisation est masqué.
 */
searchBar.addEventListener('input', (e) => {
	searchBarValue = e.target.value;

	if (searchBarValue.length >= 3) {
		searchBarKeyword = [];
		searchBarKeyword.push(searchBarValue);
		searchBar.classList.add('active');
		initResetSearchbar();

		filteredRecipes = filterRecipes(searchBarValue, recipes);
		recipesLength.textContent = filteredRecipes.length;
		displayRecipes(filteredRecipes);
		listInit(filteredRecipes);
		displayFilterList(lists, searchBarValue);

		if (tagList.length !== 0) {
			tagSectionReset();
		}

		if (filteredRecipes.length === 0) {
			recipesSection.innerHTML =
				'Aucune recette ne correspond à votre recherche.<br/> Essayez quiche lorraine, chocolat noir, cocotte minute...';
			recipesSection.classList.add('empty');
		} else {
			recipesSection.classList.remove('empty');
		}
	} else {
		resetRecipePage();
		cross.style.display = 'none';
	}
});

/**
 * Initialise le bouton de réinitialisation de la barre de recherche.
 * Le bouton de réinitialisation est affiché et un écouteur d'événement click est ajouté.
 * Lorsque l'utilisateur clique sur le bouton de réinitialisation, la fonction resetSearchbar() est appelée.
 */
function initResetSearchbar() {
	cross.style.display = 'block';
	cross.addEventListener('click', () => resetSearchbar());
}

/**
 * Réinitialise la barre de recherche et réinitialise l'affichage des recettes et des filtres.
 * La fonction reset() du formulaire de la barre de recherche est appelée pour effacer le contenu de la barre de recherche.
 * Le bouton de réinitialisation est masqué.
 * La fonction resetRecipePage() est appelée pour réinitialiser l'affichage des recettes et des filtres.
 * Si des tags sont déjà actifs, ils sont réinitialisés.
 */
function resetSearchbar() {
	searchBarForm.reset();
	cross.style.display = 'none';
	resetRecipePage();

	if (tagList.length !== 0) {
		tagSectionReset();
	}
}

/**
 * Ajoute des écouteurs d'événements sur les champs de filtrage.
 * Lorsque la valeur d'un champ de filtrage change, la fonction de rappel est déclenchée.
 * Elle effectue les opérations de filtrage et de mise à jour de l'affichage des filtres.
 */
inputsFilter.forEach((input) =>
	input.addEventListener('input', (e) => {
		const filterValue = e.target.value;
		const filterProperty = e.target.dataset.property;

		if (filterValue.length >= 3) {
			initResetInput(filterProperty);

			const ulSection = document.getElementById(`filter_list_${filterProperty}`);
			const liSectionList = ulSection.childNodes;
			const keywordFormated = format(filterValue);

			const newFilterList = [];
			Object.values(liSectionList).filter((li) => {
				const eltFormated = format(li.innerHTML);
				if (eltFormated.includes(keywordFormated)) {
					newFilterList.push(eltFormated);
				}
			});

			ulSection.innerHTML = '';
			newFilterList.forEach((elt) => {
				const liFilter = document.createElement('li');
				liFilter.classList.add('filter_li');
				const eltFormated = (elt + '').charAt(0).toUpperCase() + elt.substr(1);
				liFilter.textContent = eltFormated;
				liFilter.addEventListener('click', (e) => {
					createTag(e, filterProperty);
				});
				ulSection.appendChild(liFilter);
			});
		} else {
			document.querySelectorAll('.filter_reset').forEach((reset) => {
				reset.style.display = 'none';
			});

			if (searchBar.value !== '') {
				listInit(filteredRecipes);
				displayFilterList(lists, searchBar.value);
			} else {
				listInit(recipes);
				displayFilterList(lists);
			}
		}
	})
);

/**
 * Initialise la réinitialisation du champ de filtrage.
 * Ajoute un écouteur d'événements sur le bouton de réinitialisation du champ.
 * Lorsque le bouton est cliqué, le champ de filtrage est réinitialisé et l'affichage est mis à jour.
 * @param {string} e - Le nom du champ de filtrage.
 */
function initResetInput(e) {
	const filterForm = document.getElementById(`filter_by_${e}`);
	const resetFilter = document.getElementById(`filter_reset_${e}`);
	resetFilter.style.display = 'block';

	resetFilter.addEventListener('click', () => {
		filterForm.reset();
		resetFilter.style.display = 'none';

		if (searchBar.value !== '') {
			listInit(filteredRecipes);
			displayFilterList(lists, searchBar.value);
		} else {
			listInit(recipes);
			displayFilterList(lists);
		}
	});
}

/**
 * Ajoute un écouteur d'événements sur les champs de filtrage pour la touche "Entrée".
 * Si la touche "Entrée" est pressée, l'événement par défaut est annulé.
 * @param {Event} e - L'événement déclenché par la touche.
 */
inputsFilter.forEach((input) => {
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	});
});

/**
 * Crée un tag de filtre sélectionné et effectue les actions associées.
 * @param {Event} e - L'événement de clic.
 * @param {string} selectedFilter - Le nom du filtre sélectionné.
 */
function createTag(e, selectedFilter) {
	const filterTag = document.getElementById('filters_tags');
	filterTag.classList.add('filters_tags_active');

	const tagDiv = document.createElement('div');
	tagDiv.classList.add('filter_tag_div');
	tagDiv.classList.add(`color_tag_${selectedFilter}`);
	filterTag.appendChild(tagDiv);

	const tag = document.createElement('p');
	tag.classList.add('filter_tag_p');
	tag.textContent = e.target.innerText;
	tagDiv.appendChild(tag);

	const tagIcon = document.createElement('i');
	tagIcon.classList.add('far', 'fa-times-circle');
	tagIcon.addEventListener('click', (e) => deleteTag(e));
	tagDiv.appendChild(tagIcon);

	const filterInput = document.getElementById(`input_${selectedFilter}`);
	filterInput.value = '';
	const filterListInput = document.getElementById(`filter_by_${selectedFilter}`);
	filterListInput.style.display = 'none';
	const filterList = document.getElementById(`filter_list_${selectedFilter}`);
	filterList.style.display = 'none';
	const filterButton = document.getElementById(`filter_btn_${selectedFilter}`);
	filterButton.style.display = 'block';

	tagList.push(e.target.innerText);

	const resetFilter = document.getElementById(`filter_reset_${selectedFilter}`);
	resetFilter.style.display = 'none';

	globalKeyword = searchBarKeyword.concat(tagList);
	filterByTag(recipes, globalKeyword);
}

/**
 * Supprime un tag de filtre et effectue les actions associées.
 * @param {Event} e - L'événement de clic.
 */
function deleteTag(e) {
	e.target.parentElement.remove();
	const tagDiv = document.getElementById('filters_tags');
	if (tagDiv.innerHTML === '') {
		tagDiv.classList.remove('filters_tags_active');
	}

	const index = tagList.indexOf(e.target.previousSibling.innerHTML);
	if (index > -1) {
		tagList.splice(index, 1);
	}

	const index2 = globalKeyword.indexOf(e.target.previousSibling.innerHTML);
	if (index2 > -1) {
		globalKeyword.splice(index2, 1);
	}

	filterByTag(recipes, globalKeyword);
}

/**
 * Filtre les recettes en fonction des tags sélectionnés.
 * @param {Array} recipes - La liste des recettes à filtrer.
 * @param {Array} globalKeyword - Les mots-clés globaux des filtres.
 */
function filterByTag(recipes, globalKeyword) {
	if (globalKeyword.length != 0) {
		filteredRecipesByTag = recipes;

		globalKeyword.forEach((keyword) => {
			filteredRecipesByTag = filterRecipes(keyword, filteredRecipesByTag);
			recipesLength.textContent = filteredRecipesByTag.length;
			displayRecipes(filteredRecipesByTag);
			listInit(filteredRecipesByTag);
			displayFilterList(lists, globalKeyword);
		});
	} else {
		filteredRecipesByTag = [];
		resetRecipePage();
	}
}

/**
 * Réinitialise la section des tags en supprimant tous les tags.
 */
function tagSectionReset() {
	tagList = [];
	globalKeyword = [];
	filteredRecipesByTag = [];

	const tags = document.querySelectorAll('.filter_tag_div');
	tags.forEach((tag) => {
		tag.remove();
	});

	const tagDiv = document.getElementById('filters_tags');
	tagDiv.classList.remove('filters_tags_active');
}

/**
 * Formate une chaîne de caractères en la convertissant en minuscules et en supprimant les accents.
 * @param {string} e - La chaîne de caractères à formater.
 * @returns {string} La chaîne de caractères formatée.
 */
export function format(e) {
	const formattedElement = e
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
	return formattedElement;
}
