export function recipeFactory(data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

  // renvoi l'élément HTML d'une recette
  function getRecipeCard() {
    const card = document.createElement("article");
    card.classList.add("recipe_card");

    const html = `
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
                    <li>
                      <p class="recipe_ingredient">${ingredient.ingredient}</p>
                      ${
                        ingredient.quantity
                          ? `<p>${ingredient.quantity}${ingredient.unit ? ingredient.unit : ""}</p>`
                          : ""
                      }
                    </li>
                  `
                  )
                  .join("")}
              </ul>
            </div>
            <div class="recipe_description">
              <p class="recipe_description_text">${description}</p>
            </div>
          </div>
        </div>
      </a>
    `;

    card.insertAdjacentHTML("beforeend", html);

    return card;
  }
  
  // Fonction utilitaire pour formater un tableau de chaînes de caractères en minuscules
function formatStrings(arr) {
  return arr.map((str) => str.toLowerCase());
}

// Fonction pour récupérer les ingrédients d'une recette sous forme de tableau formaté en minuscules
function getIngredients() {
  return formatStrings(ingredients.map((ingredient) => ingredient["ingredient"]));
}

// Fonction pour récupérer les appareils d'une recette formaté en minuscules
function getAppliances() {
  return appliance.toLowerCase();
}

// Fonction pour récupérer les ustensiles d'une recette sous forme de tableau formaté en minuscules
function getUstensiles() {
  return formatStrings(ustensils);
}

// Retourne un objet contenant les différentes fonctions utiles pour afficher les cartes de recettes et les données de chaque recette
return {
  getRecipeCard,
  getIngredients,
  getAppliances,
  getUstensiles
};
}