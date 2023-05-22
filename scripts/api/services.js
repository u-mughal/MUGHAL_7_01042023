/**
 * Récupère les recettes à partir du fichier JSON.
 * @returns {Promise<Array>} Une promesse résolue avec un tableau de recettes.
 */
export async function getRecipes() {
  try {
    const response = await fetch('scripts/datas/recipes.json');
    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.error(err);
  }
}
