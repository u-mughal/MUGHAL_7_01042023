export function filterFactory(data) {
	let liFilterArray = []

	// création de l'élément HTML d'une liste de filtre
	function getFilterListCardDOM() {
		data.forEach((elt) => {
			const liFilter = document.createElement('li')
			liFilter.classList.add('filter_li')
			const eltFormated = (elt + '').charAt(0).toUpperCase() + elt.substr(1)
			liFilter.textContent = eltFormated
			liFilterArray.push(liFilter)
		})
		return liFilterArray
	}

	return { getFilterListCardDOM }
}