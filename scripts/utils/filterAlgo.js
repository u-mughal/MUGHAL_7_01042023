import { format } from '../index.js'

let filteredRecipes = []

/**
 * Filtre les recettes en fonction d'une valeur.
 *
 * @param {string} value - La valeur à utiliser pour filtrer les recettes.
 * @param {Array} recipes - Le tableau de recettes à filtrer.
 * @returns {Array} - Le tableau des recettes filtrées.
 */
export function filterRecipes(value, recipes) {
  // Formate la valeur d'entrée
  const inputFormated = format(value)

  filteredRecipes = recipes.filter(
    (recipe) =>
      format(recipe.name).includes(inputFormated) ||
      format(recipe.description).includes(inputFormated) ||
      format(
        recipe.ingredients.map((ingredients) => ingredients.ingredient).toString()
      ).includes(inputFormated) ||
      format(recipe.appliance).includes(inputFormated) ||
      format(recipe.ustensils.toString()).includes(inputFormated)
  )

  sortRecipes(filteredRecipes)

  return filteredRecipes
}

/**
 * Trie les recettes par ordre alphabétique.
 *
 * @param {Array} filteredRecipes - Le tableau des recettes filtrées à trier.
 * @returns {Array} - Le tableau des recettes triées.
 */
export function sortRecipes(filteredRecipes) {
  filteredRecipes.sort(function (a, b) {
    let x = a.name.toLowerCase()
    let y = b.name.toLowerCase()

    if (x > y) {
      return 1
    }

    if (x < y) {
      return -1
    }

    return 0
  })

  return filteredRecipes
}
