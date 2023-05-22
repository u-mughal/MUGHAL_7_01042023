import { format } from './format.js'

let filteredRecipes = []

/**
 * Trie les recettes en fonction d'une clé spécifiée.
 * @param {Array} filterRecipes - Les recettes à filtrer.
 * @param {string} key - La clé de tri.
 */
export function sortRecipes(filterRecipes, key) {
	for (let i = 0; i < filterRecipes.length; i++) {
		const currentKey = filterRecipes[i][key]
		const currentRecipe = filterRecipes[i]
		let j = i - 1
		while (j >= 0 && filterRecipes[j][key] > currentKey) {
			filterRecipes[j + 1] = filterRecipes[j]
			j--
		}
		filterRecipes[j + 1] = currentRecipe
	}
}

/**
 * Filtre les recettes en fonction de la valeur saisie et renvoie une liste de recettes filtrées.
 * @param {string} value - La valeur de filtrage saisie.
 * @param {Array} recipes - La liste complète des recettes.
 * @returns {Array} - Une liste de recettes filtrées.
 */
export function filterRecipes(value, recipes) {
	filteredRecipes = []
	const inputFormated = format(value)

	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		const recipeName = format(recipe.name)
		const recipeDescription = format(recipe.description)
		const recipeAppliance = format(recipe.appliance)

		if (recipeName.includes(inputFormated)) {
			if (filteredRecipes.length !== 0) {
				let sameRecipeId = false
				for (let i = 0; i < filteredRecipes.length; i++) {
					if (filteredRecipes[i].id === recipe.id) {
						sameRecipeId = true
						break
					}
				}
				if (!sameRecipeId) {
					filteredRecipes.push(recipe)
				}
			} else {
				filteredRecipes.push(recipe)
			}
		} else if (recipeDescription.includes(inputFormated)) {
			if (filteredRecipes.length !== 0) {
				let sameRecipeId = false
				for (let i = 0; i < filteredRecipes.length; i++) {
					if (filteredRecipes[i].id === recipe.id) {
						sameRecipeId = true
						break
					}
				}
				if (!sameRecipeId) {
					filteredRecipes.push(recipe)
				}
			} else {
				filteredRecipes.push(recipe)
			}
		} else if (recipeAppliance.includes(inputFormated)) {
			if (filteredRecipes.length !== 0) {
				let sameRecipeId = false
				for (let i = 0; i < filteredRecipes.length; i++) {
					if (filteredRecipes[i].id === recipe.id) {
						sameRecipeId = true
						break
					}
				}
				if (!sameRecipeId) {
					filteredRecipes.push(recipe)
				}
			} else {
				filteredRecipes.push(recipe)
			}
		} else {
			const ingredientsArray = recipe.ingredients
			for (let j = 0; j < ingredientsArray.length; j++) {
				const recipeIngredients = format(ingredientsArray[j].ingredient)
				if (recipeIngredients.includes(inputFormated)) {
					if (filteredRecipes.length !== 0) {
						let sameRecipeId = false
						for (let i = 0; i < filteredRecipes.length; i++) {
							if (filteredRecipes[i].id === recipe.id) {
								sameRecipeId = true
								break
							}
						}
						if (!sameRecipeId) {
							filteredRecipes.push(recipe)
						}
					} else {
						filteredRecipes.push(recipe)
					}
				}
			}

			const ustensilsArray = recipe.ustensils
			for (let i = 0; i < ustensilsArray.length; i++) {
				const recipeUstensils = format(ustensilsArray[i])
				if (recipeUstensils.includes(inputFormated)) {
					if (filteredRecipes.length !== 0) {
						let sameRecipeId = false
						for (let i = 0; i < filteredRecipes.length; i++) {
							if (filteredRecipes[i].id === recipe.id) {
								sameRecipeId = true
								break
							}
						}
						if (!sameRecipeId) {
							filteredRecipes.push(recipe)
						}
					} else {
						filteredRecipes.push(recipe)
					}
				}
			}
		}
	}
	sortRecipes(filteredRecipes, `name`)
	return filteredRecipes
}