// Formatage des éléments
export function format(e) {
	const formattedElement = e
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
	return formattedElement
}