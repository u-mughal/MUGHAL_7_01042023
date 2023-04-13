export function filterFactory(data) {
  const option = data;
  const optionLowerCase = option.toLowerCase();
  let optionSingular;
  if (optionLowerCase.endsWith("s")) {
    optionSingular = optionLowerCase.slice(0, -1);
  }
  const optionWithoutAccent = optionSingular
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const selectedFilter = optionWithoutAccent;

  // renvoi l'élément HTML d'un filtre
  function getFilterCardDOM() {
    const filter = document.createElement("div");
    filter.setAttribute("id", `filter_${selectedFilter}`);
    filter.classList.add("filter");

    const btn = document.createElement("button");
    btn.setAttribute("id", `filter_btn_${selectedFilter}`);
    btn.classList.add("filter_btn");
    btn.addEventListener("click", (e) => {
      toggleDropDown(e);
      filledListFilter();
    });
    filter.appendChild(btn);

    const btnName = document.createElement("span");
    btnName.textContent = `${option}`;
    btn.appendChild(btnName);

    const btnChevron = document.createElement("span");
    btnChevron.classList.add("filter_chevron_up");
    btn.appendChild(btnChevron);

    const btnChevronIcon = document.createElement("i");
    btnChevronIcon.classList.add("fas", "fa-chevron-down");
    btnChevron.appendChild(btnChevronIcon);

    const filterList = document.createElement("div");
    filterList.setAttribute("id", `filter_by_${selectedFilter}`);
    filterList.classList.add("filter_list");
    filter.appendChild(filterList);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `input_${selectedFilter}`);
    input.classList.add("filter_input");
    input.setAttribute("placeholder", `Rechercher un ${optionSingular}`);
    input.addEventListener("keyup", (e) => {
      const value = e.target.value;
      const regex = /[A-Za-z0-9]{3,}/;
      if (regex.test(value)) {
        filledListFilter(e.target.value);
      }
    });
    filterList.appendChild(input);

    const inputChevron = document.createElement("span");
    inputChevron.classList.add("filter_close");
    inputChevron.addEventListener("click", (e) => toggleDropDown(e));
    filterList.appendChild(inputChevron);

    const inputChevronIcon = document.createElement("i");
    inputChevronIcon.classList.add("fas", "fa-chevron-up");
    inputChevron.appendChild(inputChevronIcon);

    const filterUl = document.createElement("ul");
    filterUl.setAttribute("id", `filter_list_${selectedFilter}`);
    filterUl.classList.add("list_option");
    filterList.appendChild(filterUl);

    return filter;
  }

  // gestion de la dropdown de filtre
  function toggleDropDown(e) {
    const allList = document.querySelectorAll(".filter_list");
    allList.forEach((list) => {
      list.style.display = "none";
    });
    const allBtn = document.querySelectorAll(".filter_btn");
    allBtn.forEach((list) => {
      list.style.display = "block";
    });
    if (e.currentTarget.className != "filter_close") {
      const btnClicked = document.getElementById(
        `filter_btn_${selectedFilter}`
      );
      btnClicked.style.display = "none";
      const filterSelected = document.getElementById(
        `filter_by_${selectedFilter}`
      );
      filterSelected.style.display = "block";
      const inputSelected = document.getElementById(`input_${selectedFilter}`);
      inputSelected.classList.add("filter_input_active");
    }
  }

  // rempli la liste des filtres selon option tri sélectionné
  // function pour remplir les li avec ou sans saisie
  // ici on a l'option filtre mais pas le tableau/liste
  function filledListFilter(keyword = null) {
    if (keyword) {
      console.log(keyword, selectedFilter);
    } else {
      console.log(selectedFilter);
    }
  }

  return { getFilterCardDOM };
}