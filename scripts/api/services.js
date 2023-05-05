// récupération des recettes
export async function getRecipes() {
	try {
		const response = await fetch('scripts/datas/recipes.json')
		const recipes = await response.json()
		return recipes
	} catch (err) {
		console.error(err)
	}
}