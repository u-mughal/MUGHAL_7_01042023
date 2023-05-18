import { format } from '../index.js'

// déclaration variable
let filteredRecipes = []

// algorithme boucles natives
export function filterRecipes(value, recipes) {
	filteredRecipes = []
	const keyword = format(value)

	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		const recipeName = format(recipe.name)
		const recipeDescription = format(recipe.description)
		const recipeAppliance = format(recipe.appliance)

		if (recipeName.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else if (recipeDescription.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else if (recipeAppliance.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else {
			const ingredientsArray = recipe.ingredients
			for (let j = 0; j < ingredientsArray.length; j++) {
				const recipeIngredients = format(ingredientsArray[j].ingredient)
				if (recipeIngredients.includes(keyword)) {
					const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
					if (!checkId) {
						filteredRecipes.push(recipe)
					}
				}
			}

			const ustensilsArray = recipe.ustensils
			for (let i = 0; i < ustensilsArray.length; i++) {
				const recipeUstensils = format(ustensilsArray[i])
				if (recipeUstensils.includes(keyword)) {
					const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
					if (!checkId) {
						filteredRecipes.push(recipe)
					}
				}
			}
		}
	}
	sortRecipes(recipes, `name`)
	return filteredRecipes
}

export function sortRecipes(array, key) {
	for (let i = 0; i < array.length; i++) {
		const currVal = array[i][key]
		const currElem = array[i]
		let j = i - 1
		while (j >= 0 && array[j][key] > currVal) {
			array[j + 1] = array[j]
			j--
		}
		array[j + 1] = currElem
	}
}