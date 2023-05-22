/**
 * Crée une liste de filtres à partir d'une liste d'éléments.
 * @param {Array} recipe - Liste des éléments de la recette.
 * @returns {Object} - Liste des éléments filtrés.
 */
export function createFilterList(recipe) {
  let filterElements = [];

  /**
   * Génère les éléments HTML d'une liste de filtres.
   * @returns {Array} - Liste des éléments filtrés.
   */
  function generateFilterElements() {
    recipe.forEach((element) => {
      const filterElement = document.createElement('li');
      filterElement.classList.add('filter_li');
      const formattedElement = capitalizeFirstLetter(element);
      filterElement.textContent = formattedElement;
      filterElements.push(filterElement);
    });
    return filterElements;
  }

  /**
   * Met la première lettre en majuscule.
   * @param {string} str - Chaîne de caractères.
   * @returns {string} - Chaîne de caractères avec la première lettre en majuscule.
   */
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return { generateFilterElements };
}