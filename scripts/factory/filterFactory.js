export function filterFactory(data) {
	const option = data
	const optionKey = Object.keys(option)
	const optionName = optionKey.toString()
	const optionLowerCase = optionName.toLowerCase()
	let optionSingular
	if (optionLowerCase.endsWith('s')) {
		optionSingular = optionLowerCase.slice(0, -1)
	}
	const optionWithoutAccent = optionSingular.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	const selectedFilter = optionWithoutAccent
	// const optionValue = Object.values(option)
	// const optionArray = optionValue[0]
	let liFilterArray = []

	// renvoi l'élément HTML d'un filtre
	function getFilterCardDOM() {
		const filter = document.createElement('div')
		filter.setAttribute('id', `filter_${selectedFilter}`)
		filter.classList.add('filter')

		const btn = document.createElement('button')
		btn.setAttribute('id', `filter_btn_${selectedFilter}`)
		btn.classList.add('filter_btn')
		btn.addEventListener('click', (e) => {
			toggleDropDown(e)
			// filledListFilter()
		})
		filter.appendChild(btn)

		const btnName = document.createElement('span')
		btnName.textContent = `${optionName}`
		btn.appendChild(btnName)

		const btnChevron = document.createElement('span')
		btnChevron.classList.add('filter_chevron_up')
		btn.appendChild(btnChevron)

		const btnChevronIcon = document.createElement('i')
		btnChevronIcon.classList.add('fas', 'fa-chevron-down')
		btnChevron.appendChild(btnChevronIcon)

		const filterList = document.createElement('div')
		filterList.setAttribute('id', `filter_by_${selectedFilter}`)
		filterList.classList.add('filter_list')
		filter.appendChild(filterList)

		const input = document.createElement('input')
		input.setAttribute('type', 'text')
		input.setAttribute('id', `input_${selectedFilter}`)
		input.classList.add('filter_input')
		input.dataset.property = selectedFilter
		input.setAttribute('placeholder', `Rechercher un ${optionSingular}`)
		// input.addEventListener('input', (e) => {
		// 	const value = e.target.value
		// 	const regexZeroCaracters = /^$/
		// 	const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/
		// 	const regexThreeCaracters = /[A-Za-z0-9]{3,}/
		// 	if (regexThreeCaracters.test(value)) {
		// 		filledListFilter(e.target.value)
		// 	} else if (regexZeroCaracters.test(value)) {
		// 		filledListFilter()
		// 	} else if (regexOneOrTwoCaracters.test(value)) {
		// 		null
		// 	}
		// })
		filterList.appendChild(input)

		const inputChevron = document.createElement('span')
		inputChevron.classList.add('filter_close')
		inputChevron.addEventListener('click', (e) => toggleDropDown(e))
		filterList.appendChild(inputChevron)

		const inputChevronIcon = document.createElement('i')
		inputChevronIcon.classList.add('fas', 'fa-chevron-up')
		inputChevron.appendChild(inputChevronIcon)

		// const filterUl = document.createElement('ul')
		// filterUl.setAttribute('id', `filter_list_${selectedFilter}`)
		// filterUl.classList.add('list_option')
		// filterUl.classList.add('::-webkit-scrollbar')
		// filterList.appendChild(filterUl)

		return { filter, input }
	}

	// gestion de la dropdown de filtre
	function toggleDropDown(e) {
		const allList = document.querySelectorAll('.filter_list')
		allList.forEach((list) => {
			list.style.display = 'none'
		})
		const allBtn = document.querySelectorAll('.filter_btn')
		allBtn.forEach((btn) => {
			btn.style.display = 'block'
		})
		const allInput = document.querySelectorAll('.filter_input')
		allInput.forEach((input) => {
			input.classList.remove('filter_input_active')
		})
		if (e.currentTarget.className != 'filter_close') {
			const btnClicked = document.getElementById(`filter_btn_${selectedFilter}`)
			btnClicked.style.display = 'none'
			const filterSelected = document.getElementById(`filter_by_${selectedFilter}`)
			filterSelected.style.display = 'block'
			const inputSelected = document.getElementById(`input_${selectedFilter}`)
			inputSelected.classList.add('filter_input_active')
		}
	}

	// création de l'élément HTML d'une liste de filtre
	function getFilterListCardDOM(optionArray) {
		const filterList = document.getElementById(`filter_by_${selectedFilter}`)

		const filterUl = document.createElement('ul')
		filterUl.setAttribute('id', `filter_list_${selectedFilter}`)
		filterUl.classList.add('list_option')
		filterUl.classList.add('::-webkit-scrollbar')
		filterUl.dataset.property = selectedFilter
		filterList.appendChild(filterUl)

		optionArray[0].forEach((elt) => {
			const liFilter = document.createElement('li')
			liFilter.classList.add('filter_li')
			const eltFormated = (elt + '').charAt(0).toUpperCase() + elt.substr(1)
			liFilter.textContent = eltFormated
			liFilterArray.push(liFilter)
			filterUl.appendChild(liFilter)
		})
		return filterUl
	}

	// rempli la liste des filtres selon avec ou sans saisie dans input
	// function filledListFilter(keyword = null) {
	// 	const liSection = document.getElementById(`filter_list_${selectedFilter}`)
	// 	liSection.innerHTML = ''
	// 	if (keyword) {
	// 		const keywordFormated = keyword
	// 			.toLowerCase()
	// 			.normalize('NFD')
	// 			.replace(/[\u0300-\u036f]/g, '')
	// 		const regex = new RegExp(keywordFormated)
	// 		const matchKeywords = optionArray.filter((o) => {
	// 			const oFormated = o.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	// 			return regex.test(oFormated)
	// 		})
	// 		getFilterListCardDOM(matchKeywords)
	// 	} else {
	// 		const inputSearchBar = document.getElementById('search_recipe')
	// 		if (inputSearchBar.className === 'active') {
	// 			const searchValue = inputSearchBar.value
	// 			const newOptionArray = optionArray.filter(
	// 				(option) => !option.toString().includes(searchValue)
	// 			)
	// 			getFilterListCardDOM(newOptionArray)
	// 		} else {
	// 			getFilterListCardDOM(optionArray)
	// 		}
	// 	}
	// }

	return { getFilterCardDOM, getFilterListCardDOM, selectedFilter, liFilterArray }
}