// récupération des recettes
export async function getRecipes() {
  const response = await fetch("scripts/datas/recipes.json");
  if (!response.ok) {
    console.log(`Recettes: ${response.statusText}`);
  }
  const datas = await response.json();

  return datas;
}
