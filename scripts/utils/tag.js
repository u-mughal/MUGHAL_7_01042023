// import { searchBarKeyword } from '../index.js'
// import { filterRecipes } from './filterAlgo.js'

// let tagList = []
// let globalKeyword = []
// let filteredRecipesByTag = []

// export function filterByTag(e, selectedFilter, recipes) {
// 	createTag(e, selectedFilter)
// 	filterByKeyword(recipes, globalKeyword)
// }

// export function createTag(e, selectedFilter) {
// 	const filterTag = document.getElementById('filters_tags')
// 	filterTag.classList.add('filters_tags_active')

// 	const tagDiv = document.createElement('div')
// 	tagDiv.classList.add('filter_tag_div')
// 	tagDiv.classList.add(`color_tag_${selectedFilter}`)
// 	filterTag.appendChild(tagDiv)

// 	const tag = document.createElement('p')
// 	tag.classList.add('filter_tag_p')
// 	tag.textContent = e.target.innerText
// 	tagDiv.appendChild(tag)

// 	const tagIcon = document.createElement('i')
// 	tagIcon.classList.add('far', 'fa-times-circle')
// 	tagIcon.addEventListener('click', (e) => deleteTag(e))
// 	tagDiv.appendChild(tagIcon)

// 	const filterInput = document.getElementById(`input_${selectedFilter}`)
// 	filterInput.value = ''
// 	const filterListInput = document.getElementById(`filter_by_${selectedFilter}`)
// 	filterListInput.style.display = 'none'
// 	const filterList = document.getElementById(`filter_list_${selectedFilter}`)
// 	filterList.style.display = 'none'
// 	const filterButton = document.getElementById(`filter_btn_${selectedFilter}`)
// 	filterButton.style.display = 'block'

// 	// ajoute le tag dans tagList
// 	tagList.push(e.target.innerText)
// 	console.log('tagList', tagList)
// 	// concatene les 2 tableaux de keyword
// 	globalKeyword = searchBarKeyword.concat(tagList)
// 	console.log('globalKeyword', globalKeyword)

// 	return tagList
// }

// function deleteTag(e) {
// 	e.target.parentElement.remove()
// 	const tagDiv = document.getElementById('filters_tags')
// 	if (tagDiv.innerHTML === '') {
// 		tagDiv.classList.remove('filters_tags_active')
// 	}

// 	// supprime le tag de tagList
// 	const index = tagList.indexOf(e.target.previousSibling.innerHTML)
// 	if (index > -1) {
// 		tagList.splice(index, 1)
// 	}
// 	console.log(tagList)

// 	// supprime le tag de globalKeyword
// 	const index2 = globalKeyword.indexOf(e.target.previousSibling.innerHTML)
// 	if (index2 > -1) {
// 		globalKeyword.splice(index2, 1)
// 	}
// 	console.log(globalKeyword)

// 	return tagList
// }