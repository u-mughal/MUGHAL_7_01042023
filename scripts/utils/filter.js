import { initFilterList } from '../index.js'

export function handleFilterList(e) {
	const value = e.target.value
	const regexZeroCaracters = /^$/
	const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/
	const regexThreeCaracters = /[A-Za-z0-9]{3,}/
	if (regexThreeCaracters.test(value)) {
		filledListFilter(e.target.value)
	} else if (regexZeroCaracters.test(value)) {
		filledListFilter()
	} else if (regexOneOrTwoCaracters.test(value)) {
		null
	}
}

function filledListFilter(keyword = null) {
	const selectedFilter = document.querySelector('.filter_input_active')
	const liSection = document.getElementById(`filter_list_${selectedFilter}`)
	liSection.innerHTML = ''
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
		initFilterList(matchKeywords)
	} else {
		const inputSearchBar = document.getElementById('search_recipe')
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