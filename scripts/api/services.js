// récupération des recettes
export async function getRecipes() {
  try {
    const response = await fetch("scripts/datas/recipes.json");
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error(err);
  }
}