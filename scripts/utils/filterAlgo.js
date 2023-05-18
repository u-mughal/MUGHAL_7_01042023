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
		// pour chaque recette, on va comparer le nom à l'input
		if (recipeName.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
			// pour chaque recette, on va comparer la description à l'input
		} else if (recipeDescription.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
			// pour chaque recette, on va comparer les appareils à l'input
		} else if (recipeAppliance.includes(keyword)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else {
			// pour chaque recette, on va comparer les ingrédients à l'input
			const ingredientsArr = recipe.ingredients
			for (let j = 0; j < ingredientsArr.length; j++) {
				const recipeIngredients = format(ingredientsArr[j].ingredient)
				if (recipeIngredients.includes(keyword)) {
					const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
					if (!checkId) {
						filteredRecipes.push(recipe)
					}
				}
			}
			// pour chaque recette, on va comparer les ustensils à l'input
			const ustensilsArr = recipe.ustensils
			for (let i = 0; i < ustensilsArr.length; i++) {
				const recipeUstensils = format(ustensilsArr[i])
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