import { format } from '../index.js'

// déclaration variable
let filteredRecipes = []

// algorithme de tableau
export function filterRecipes(value, recipes) {
	const inputFormated = format(value)

	filteredRecipes = recipes.filter(
		(recipe) =>
			format(recipe.name).includes(inputFormated) ||
			format(recipe.description).includes(inputFormated) ||
			format(recipe.ingredients.map((ingredients) => ingredients.ingredient).toString()).includes(
				inputFormated
			) ||
			format(recipe.appliance).includes(inputFormated) ||
			format(recipe.ustensils.toString()).includes(inputFormated)
	)

	sortRecipes(filteredRecipes)

	return filteredRecipes
}

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