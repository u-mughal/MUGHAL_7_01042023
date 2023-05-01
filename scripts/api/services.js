// récupération des recettes
export async function getRecipes() {
  const response = await fetch("scripts/datas/recipes.json");
  return await response.json();
}
