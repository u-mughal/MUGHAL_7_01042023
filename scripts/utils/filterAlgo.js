let filteredRecipes = []

export function filterRecipes(value, recipes) {
	filteredRecipes.innerHTML = ''
	const inputFormated = value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
	filteredRecipes = recipes.filter(
		(recipe) =>
			recipe.name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(inputFormated) ||
			recipe.ingredients
				.map((ingredients) => ingredients.ingredient)
				.toString()
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(inputFormated) ||
			recipe.description
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(inputFormated) ||
			recipe.appliance
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(inputFormated) ||
			recipe.ustensils
				.toString()
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.includes(inputFormated)
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