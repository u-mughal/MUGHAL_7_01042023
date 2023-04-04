/* eslint-disable no-unused-vars */
export function recipeFactory(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    ingredient,
    quantity,
    unit,
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
            <ul class="recipe_ingredients"></ul>
            <p class="recipe_description">${description}</p>
          </div>
        </div>
      </a>
    </article>`;

    return card;
  }

  function getIngredientsList() {
    // const ingredientsList =
    // document.getElementsByClassName("recipe_ingredients");
    let food;

    ingredients.forEach((ingredient) => {
      // const food = document.createElement("li");
      // food.textContent = ingredient["ingredient"];
      // ingredientsList.appendChild(food);
      food = `<li>${ingredient["ingredient"]}: ${ingredient["quantity"]} ${ingredient["unit"]}</li>`;
      // ingredientsList.insertAdjacentHTML("afterbegin", food);
      // ingredientsList.appendChild(food);
    });

    // console.log(ingredientsList);
    return food;
  }

  return { getRecipeCardDOM, getIngredientsList };
}
