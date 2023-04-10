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

  // renvoi l'élément HTML d'une recette
  function getRecipeCardDOM() {
    const card = document.createElement("article");
    card.classList.add("recipe_card");

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.classList.add("recipe_link");
    card.appendChild(link);

    const img = document.createElement("div");
    img.classList.add("recipe_img");
    link.appendChild(img);

    const content = document.createElement("div");
    content.classList.add("recipe_content");
    link.appendChild(content);

    const header = document.createElement("header");
    header.classList.add("recipe_header");
    content.appendChild(header);

    const h3 = document.createElement("h");
    h3.textContent = name;
    header.appendChild(h3);

    const timing = document.createElement("div");
    timing.classList.add("recipe_time");
    header.appendChild(timing);

    const clock = document.createElement("i");
    clock.classList.add("far", "fa-clock");
    timing.appendChild(clock);

    const minute = document.createElement("p");
    minute.classList.add("recipe_minute");
    minute.textContent = `${time} min`;
    timing.appendChild(minute);

    const details = document.createElement("div");
    details.classList.add("recipe_details");
    content.appendChild(details);

    const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("recipe_ingredients");
    details.appendChild(recipeIngredients);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("recipe_ingredients_list");
    recipeIngredients.appendChild(ingredientsList);

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

    const recipeDescription = document.createElement("div");
    recipeDescription.classList.add("recipe_description");
    details.appendChild(recipeDescription);

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("recipe_description_text");
    descriptionText.textContent = description;
    recipeDescription.appendChild(descriptionText);

    return card;
  }

  let ingredientsList = [];
  function getIngredientsList() {
    debugger;
    ingredients.forEach((ingredient) => {
      ingredientsList.push(ingredient["ingredient"]);
    });
  }
  getIngredientsList();

  // function getApplianceList() {
  //   let appliancesList = [];
  //   console.log(appliance);
  //   appliance.push(appliancesList);
  //   console.log(appliancesList);

  //   // appliance.forEach((appliance) => {
  //   //   appliancesList.push(appliance);
  //   // });

  //   return appliancesList;
  // }

  // getApplianceList();

  // function getList(option) {
  //   const list = [];
  //   if (option == ingredients) {
  //     ingredients.forEach((ingredient) => {
  //       console.log(ingredient["ingredient"]);
  //       list.push(ingredient["ingredient"]);
  //     });
  //   }
  // }

  return { getRecipeCardDOM, getIngredientsList };
}