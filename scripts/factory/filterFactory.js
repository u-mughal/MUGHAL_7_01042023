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
  let btn;
  let filterList;

  function getFilterCardDOM() {
    const filter = document.createElement("div");
    filter.setAttribute("id", `filter_${optionWithoutAccent}`);
    filter.classList.add("filter");

    btn = document.createElement("button");
    btn.setAttribute("id", `filter_btn_${optionWithoutAccent}`);
    btn.classList.add("filter_btn");
    btn.style.display = "inline";
    // btn.classList.add("filter_btn", "trigger");
    btn.addEventListener("click", () => toggleDropDown(optionWithoutAccent));
    filter.appendChild(btn);

    const btnName = document.createElement("span");
    btnName.textContent = `${option}`;
    btn.appendChild(btnName);

    const btnChevron = document.createElement("span");
    btn.appendChild(btnChevron);

    const btnChevronIcon = document.createElement("i");
    btnChevronIcon.classList.add("fas", "fa-chevron-down");
    btnChevron.appendChild(btnChevronIcon);

    filterList = document.createElement("div");
    filterList.setAttribute("id", `filter_by_${optionWithoutAccent}`);
    filterList.classList.add("filter_list");
    filter.appendChild(filterList);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `input_${optionWithoutAccent}`);
    input.classList.add("filter_input");
    input.setAttribute("placeholder", `Rechercher un ${optionSingular}`);
    filterList.appendChild(input);

    const inputChevron = document.createElement("span");
    // inputChevron.classList.add("trigger");
    inputChevron.addEventListener("click", () =>
      toggleDropDown(optionWithoutAccent)
    );
    filterList.appendChild(inputChevron);

    const inputChevronIcon = document.createElement("i");
    inputChevronIcon.classList.add("fas", "fa-chevron-up");
    inputChevron.appendChild(inputChevronIcon);

    const filterUl = document.createElement("ul");
    filterUl.setAttribute("id", `filter_list_${optionWithoutAccent}`);
    filterUl.classList.add("list_option");
    filterList.appendChild(filterUl);

    return filter;
  }

  // ouverture/fermeture de la dropdown de tri
  function toggleDropDown(optionWithoutAccent) {
    const allList = document.querySelectorAll(".filter_list");
    allList.forEach((list) => {
      list.style.display = "none";
    });
    const allBtn = document.querySelectorAll(".filter_btn");
    allBtn.forEach((list) => {
      list.style.display = "block";
    });

    const btnClicked = document.getElementById(
      `filter_btn_${optionWithoutAccent}`
    );
    btnClicked.style.display = "none";
    const filterSelected = document.getElementById(
      `filter_by_${optionWithoutAccent}`
    );
    filterSelected.style.display = "block";
  }

  return { getFilterCardDOM };
}
