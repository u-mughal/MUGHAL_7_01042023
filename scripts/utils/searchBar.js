let filteredDatas = [];

export function filterDatas(value, datas) {
  filteredDatas.innerHTML = "";
  const inputFormated = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  filteredDatas = datas.filter(
    (data) =>
      data.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputFormated) ||
      data.appliance
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputFormated) ||
      data.description
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputFormated) ||
      data.ustensils.forEach((ustensil) =>
        ustensil
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputFormated)
      ) ||
      data.ingredients.forEach((ingredient) =>
        ingredient.ingredient
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputFormated)
      )
  );
  sortDatas(filteredDatas);
  return filteredDatas;
}

export function sortDatas(filteredDatas) {
  filteredDatas.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });
  return filteredDatas;
}