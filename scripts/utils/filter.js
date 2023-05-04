// import { filterFactory } from '../factory/filterFactory.js'

// export function initFilterList(e, optionArray, list) {
// 	const value = e.target.value
// 	const regexZeroCaracters = /^$/
// 	const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/
// 	const regexThreeCaracters = /[A-Za-z0-9]{3,}/
// 	// console.log(typeof optionArray, optionArray)
// 	// console.log(typeof optionArray[0], optionArray[0])
// 	// console.log(typeof optionArray['0'], optionArray['0'])
// 	// console.log(typeof Object.values(optionArray), Object.values(optionArray))
// 	if (regexThreeCaracters.test(value)) {
// 		updateListFilter(e.target.value, optionArray[0], list)
// 	} else if (regexZeroCaracters.test(value)) {
// 		updateListFilter(optionArray[0], list)
// 	} else if (regexOneOrTwoCaracters.test(value)) {
// 		null
// 	}
// }

function updateListFilter(keyword = null, optionArray, list) {
	const selectedFilter = document.querySelector('.filter_input_active').dataset.property
	const liSection = document.getElementById(`filter_list_${selectedFilter}`)
	liSection.remove()
	console.log(optionArray)
	// vérifier searchbar pour  toutes les options
	if (keyword) {
		const keywordFormated = keyword
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
		const regex = new RegExp(keywordFormated)
		const matchKeywords = optionArray.filter((o) => {
			const oFormated = o.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			return regex.test(oFormated)
		})
		console.log(typeof matchKeywords, matchKeywords)
		initFilterList(matchKeywords, list)
	} else {
		const inputSearchBar = document.getElementById('search_recipe')
		// vérifier value
		if (inputSearchBar.className === 'active') {
			const searchValue = inputSearchBar.value
			const newOptionArray = optionArray.filter(
				(option) => !option.toString().includes(searchValue)
			)
			initFilterList(newOptionArray)
		} else {
			initFilterList(optionArray)
		}
	}
}

// function initFilterList(optionArray, list) {
// 	debugger
// 	console.log(optionArray)
// 	let filterListModel = filterFactory(list)
// 	const filterListCardDOM = filterListModel.getFilterListCardDOM(optionArray)
// 	const selectedFilter = filterListModel.selectedFilter
// 	const liSection = document.getElementById(`filter_by_${selectedFilter}`)
// 	const liFilter = filterListModel.liFilterArray
// 	liFilter.forEach((li) => {
// 		li.addEventListener('click', (e) => handleTag(e, selectedFilter))
// 	})
// 	liSection.appendChild(filterListCardDOM)
// }