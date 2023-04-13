export function filterFactory(data) {
  const option = data;
  const optionKey = Object.keys(option);
  const optionName = optionKey.toString();
  const optionLowerCase = optionName.toLowerCase();
  let optionSingular;
  if (optionLowerCase.endsWith("s")) {
    optionSingular = optionLowerCase.slice(0, -1);
  }
  const optionWithoutAccent = optionSingular
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const selectedFilter = optionWithoutAccent;
  const optionValue = Object.values(option);
  const optionArray = optionValue[0];

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
    btnName.textContent = `${optionName}`;
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
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      const regexZeroCaracters = /^$/;
      const regexOneOrTwoCaracters = /[A-Za-z0-9]{1,2}/;
      const regexThreeCaracters = /[A-Za-z0-9]{3,}/;
      if (regexThreeCaracters.test(value)) {
        filledListFilter(e.target.value);
      } else if (regexZeroCaracters.test(value)) {
        filledListFilter();
      } else if (regexOneOrTwoCaracters.test(value)) {
        null;
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
    filterUl.classList.add("::-webkit-scrollbar");
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

  function majFirstLetter(elt) {
    return (elt + "").charAt(0).toUpperCase() + elt.substr(1);
  }

  // rempli la liste des filtres selon avec ou sans saisie dans input
  function filledListFilter(keyword = null) {
    const liSection = document.getElementById(`filter_list_${selectedFilter}`);
    if (keyword) {
      const keywordFormated = keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const regex = new RegExp(keywordFormated);
      const matchKeywords = optionArray.filter((o) => {
        const oFormated = o.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return regex.test(oFormated);
      });
      liSection.innerHTML = "";
      matchKeywords.forEach((elt) => {
        const liFilter = document.createElement("li");
        liFilter.classList.add("filter_li");
        const eltFormated = majFirstLetter(elt);
        liFilter.textContent = eltFormated;
        liFilter.addEventListener("click", (e) => filterByKeyword(e));
        liSection.appendChild(liFilter);
      });
    } else {
      liSection.innerHTML = "";
      optionArray.forEach((elt) => {
        const liFilter = document.createElement("li");
        liFilter.classList.add("filter_li");
        const eltFormated = majFirstLetter(elt);
        liFilter.textContent = eltFormated;
        liFilter.addEventListener("click", (e) => filterByKeyword(e));
        liSection.appendChild(liFilter);
      });
    }
  }

  function createTag(e) {
    const filterTag = document.getElementById("filters_tags");
    filterTag.classList.add("filters_tags_active");

    const tagDiv = document.createElement("div");
    tagDiv.classList.add("filter_tag_div");
    tagDiv.classList.add(`color_tag_${selectedFilter}`);
    filterTag.appendChild(tagDiv);

    const tag = document.createElement("p");
    tag.classList.add("filter_tag_p");
    tag.textContent = e;
    tagDiv.appendChild(tag);

    const tagIcon = document.createElement("i");
    tagIcon.classList.add("far", "fa-times-circle");
    tagIcon.addEventListener("click", (e) => deleteTag(e));
    tagDiv.appendChild(tagIcon);

    const filterList = document.getElementById(`filter_by_${selectedFilter}`);
    filterList.style.display = "none";
    const filterButton = document.getElementById(
      `filter_btn_${selectedFilter}`
    );
    filterButton.style.display = "block";
  }

  function deleteTag(e) {
    e.target.parentElement.remove();
    const tagDiv = document.getElementById("filters_tags");
    if (tagDiv.innerHTML === "") {
      tagDiv.classList.remove("filters_tags_active");
    }
  }

  function filterByKeyword(e) {
    createTag(e.target.innerText);
  }

  return { getFilterCardDOM };
}