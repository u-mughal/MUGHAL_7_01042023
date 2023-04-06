export function recipeFactory(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  function getRecipeCardDOM() {
    let card = `<article class="recipe_card">
      <a href="#" class="recipe_link">
        <div class="recipe_img"></div>
        <div class="recipe_content">
          <header class="recipe_header">
            <h3>${name}</h3>
            <div class="recipe_time">
            <i class="far fa-clock"></i>
              <p class="recipe_minute">${time} min</p>
            </div>
          </header>
          <div class="recipe_details">
          <div class="recipe_ingredients"></div>
          <div class="recipe_description">
            <p class="recipe_description_text">${description}</p>
          </div>
          </div>
        </div>
      </a>
    </article>`;

    return card;
  }

  function getIngredientsList() {
    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("recipe_ingredients_list");

    ingredients.forEach((ingredient) => {
      const food = document.createElement("li");

      const foodIngd = document.createElement("p");
      foodIngd.classList.add("recipe_ingredient");
      foodIngd.textContent = `${ingredient["ingredient"]}`;
      food.appendChild(foodIngd);

      const foodQty = document.createElement("p");
      if (
        ("ingredient" in ingredient) &
        ("quantity" in ingredient) &
        ("unit" in ingredient)
      ) {
        foodQty.textContent = `: ${ingredient["quantity"]}${ingredient["unit"]}`;
      } else if (("ingredient" in ingredient) & ("quantity" in ingredient)) {
        foodQty.textContent = `: ${ingredient["quantity"]}`;
      }
      food.appendChild(foodQty);
      ingredientsList.appendChild(food);
    });

    return ingredientsList;
  }

  return { getRecipeCardDOM, getIngredientsList };
}