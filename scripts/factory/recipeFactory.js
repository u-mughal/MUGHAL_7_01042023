/**
 * Factory de recettes qui crée une carte HTML de recette à partir des informations fournies.
 * @param {Object} recipe - Les informations de la recette.
 * @returns {Object} - Objet contenant les méthodes pour obtenir la carte de recette et les informations associées.
 */
export function recipeFactory(recipe) {
  const { name, ingredients, time, description, appliance, ustensils } = recipe;

  /**
   * Retourne la carte HTML de la recette.
   * @returns {string} - La carte HTML de la recette.
   */
  function getRecipeCard() {
    const card = `
      <article class="recipe_card">
        <a href="#" class="recipe_link">
          <div class="recipe_img"></div>
          <div class="recipe_content">
            <header class="recipe_header">
              <h2>${name}</h2>
              <div class="recipe_time">
                <i class="far fa-clock"></i>
                <p class="recipe_minute">${time} min</p>
              </div>
            </header>
            <div class="recipe_details">
              <div class="recipe_ingredients">
                <ul class="recipe_ingredients_list">
                  ${ingredients
                    .map(
                      (ingredient) => `
                        <li class="li_recipe">
                          <p class="recipe_ingredient">${ingredient['ingredient']}</p>
                          <p>${('ingredient' in ingredient && 'quantity' in ingredient && 'unit' in ingredient) ? `: ${ingredient['quantity']}${ingredient['unit']}` : `: ${ingredient['quantity']}`}</p>
                        </li>
                      `
                    )
                    .join('')}
                </ul>
              </div>
              <div class="recipe_description">
                <p class="recipe_description_text">${description.slice(0, 150)}...</p>
              </div>
            </div>
          </div>
        </a>
      </article>
    `;

    return card;
  }

  const recipeCard = getRecipeCard();
  const container = document.createElement('div');
  container.insertAdjacentHTML('beforeend', recipeCard);

  return {
    /**
     * Retourne la carte de recette au format HTML.
     * @returns {string} - La carte de recette au format HTML.
     */
    getRecipeCard: () => container.innerHTML,

    /**
     * Retourne la liste des ingrédients de la recette en minuscules.
     * @returns {Array} - Liste des ingrédients de la recette en minuscules.
     */
    getIngredients: () => ingredients.map(ingredient => ingredient['ingredient'].toLowerCase()),

    /**
     * Retourne l'appareil de la recette en minuscules.
     * @returns {string} - L'appareil de la recette en minuscules.
     */
    getAppliances: () => appliance.toLowerCase(),

    /**
     * Retourne la liste des ustensiles de la recette en minuscules.
     * @returns {Array} - Liste des ustensiles de la recette en minuscules.
     */
    getUstensiles: () => ustensils.map(ustensil => ustensil.toLowerCase())
  };
}
