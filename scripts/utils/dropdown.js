export function toggleDropDown(e) {
	const allBtn = document.querySelectorAll('.filter_btn')
	allBtn.forEach((btn) => {
		btn.style.display = 'block'
	})
	const allForm = document.querySelectorAll('.filter_form')
	allForm.forEach((form) => {
		form.style.display = 'none'
	})
	const allInput = document.querySelectorAll('.filter_input')
	allInput.forEach((input) => {
		input.classList.remove('filter_input_active')
	})
	const allList = document.querySelectorAll('.filter_list')
	allList.forEach((list) => {
		list.style.display = 'none'
	})
	if (!e.currentTarget.className.includes('filter_close')) {
		const btnClicked = e.currentTarget
		btnClicked.style.display = 'none'
		const formSelected = e.currentTarget.nextElementSibling
		formSelected.style.display = 'block'
		const inputSelected = e.currentTarget.nextElementSibling[0]
		inputSelected.classList.add('filter_input_active')
		const listSelected = e.currentTarget.nextElementSibling.nextElementSibling
		listSelected.style.display = 'flex'
	}
}