import { format } from '../index.js'

// déclaration variable
let filteredRecipes = []

// algorithme boucles natives
export function filterRecipes(value, recipes) {
	filteredRecipes = []
	const inputFormated = format(value)

	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		const recipeName = format(recipe.name)
		const recipeDescription = format(recipe.description)
		const recipeAppliance = format(recipe.appliance)

		if (recipeName.includes(inputFormated)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else if (recipeDescription.includes(inputFormated)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else if (recipeAppliance.includes(inputFormated)) {
			const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
			if (!checkId) {
				filteredRecipes.push(recipe)
			}
		} else {
			const ingredientsArray = recipe.ingredients
			for (let j = 0; j < ingredientsArray.length; j++) {
				const recipeIngredients = format(ingredientsArray[j].ingredient)
				if (recipeIngredients.includes(inputFormated)) {
					const checkId = filteredRecipes.some((filteredRecipe) => filteredRecipe.id === recipe.id)
					if (!checkId) {
						filteredRecipes.push(recipe)
					}
				}
			}

			const ustensilsArray = recipe.ustensils
			for (let i = 0; i < ustensilsArray.length; i++) {
				const recipeUstensils = format(ustensilsArray[i])
				if (recipeUstensils.includes(inputFormated)) {
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

// Algo verion sameId not dry
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
	sortRecipes(recipes, `name`)
	return filteredRecipes
}

// Algo version isIdSame refacto
export function filterRecipes(value, recipes) {
	filteredRecipes = []
	const inputFormated = format(value)

	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i]
		const recipeName = format(recipe.name)
		const recipeDescription = format(recipe.description)
		const recipeAppliance = format(recipe.appliance)

		if (recipeName.includes(inputFormated)) {
			isIdSame(recipe)
		} else if (recipeDescription.includes(inputFormated)) {
			isIdSame(recipe)
		} else if (recipeAppliance.includes(inputFormated)) {
			isIdSame(recipe)
		} else {
			const ingredientsArray = recipe.ingredients
			for (let j = 0; j < ingredientsArray.length; j++) {
				const recipeIngredients = format(ingredientsArray[j].ingredient)
				if (recipeIngredients.includes(inputFormated)) {
					isIdSame(recipe)
				}
			}

			const ustensilsArray = recipe.ustensils
			for (let i = 0; i < ustensilsArray.length; i++) {
				const recipeUstensils = format(ustensilsArray[i])
				if (recipeUstensils.includes(inputFormated)) {
					isIdSame(recipe)
				}
			}
		}
	}
	sortRecipes(recipes, `name`)
	return filteredRecipes
}

// function isIdSame(recipe) {
// 	if (filteredRecipes.length !== 0) {
// 		let sameRecipeId = false
// 		for (let i = 0; i < filteredRecipes.length; i++) {
// 			if (filteredRecipes[i].id === recipe.id) {
// 				sameRecipeId = true
// 				break
// 			}
// 		}
// 		if (!sameRecipeId) {
// 			filteredRecipes.push(recipe)
// 		}
// 	} else {
// 		filteredRecipes.push(recipe)
// 	}
// }