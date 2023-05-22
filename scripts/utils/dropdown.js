/**
 * Active ou désactive le menu déroulant en fonction de l'événement fourni.
 * @param {Event} e - L'événement déclencheur.
 */
export function toggleDropDown(e) {
  const allBtn = document.querySelectorAll('.filter_btn');
  const allForm = document.querySelectorAll('.filter_form');
  const allInput = document.querySelectorAll('.filter_input');
  const allList = document.querySelectorAll('.filter_list');

  allBtn.forEach((btn) => {
    btn.style.display = 'block';
  });

  allForm.forEach((form) => {
    form.style.display = 'none';
  });

  allInput.forEach((input) => {
    input.classList.remove('filter_input_active');
  });

  allList.forEach((list) => {
    list.style.display = 'none';
  });

  if (!e.currentTarget.classList.contains('filter_close')) {
    const btnClicked = e.currentTarget;
    const formSelected = e.currentTarget.nextElementSibling;
    const inputSelected = e.currentTarget.nextElementSibling.querySelector('.filter_input');
    const listSelected = e.currentTarget.nextElementSibling.nextElementSibling;

    btnClicked.style.display = 'none';
    formSelected.style.display = 'block';
    inputSelected.classList.add('filter_input_active');
    listSelected.style.display = 'grid';
  }
}