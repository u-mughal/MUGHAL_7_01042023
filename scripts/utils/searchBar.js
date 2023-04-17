export function filterDatas(value, datas) {
  // Formate la valeur d'entrée en la convertissant
  const inputFormated = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Initialise un tableau vide pour stocker les données filtrées.
  const filteredDatas = [];
  // Filtre le tableau de données en vérifiant si la valeur d'entrée se trouve dans le nom, l'appareil, la description, les ustensiles ou les ingrédients de chaque élément du tableau.
  datas.forEach(data => {
    const name = data.name.toLowerCase();
    const appliance = data.appliance.toLowerCase();
    const description = data.description.toLowerCase();
    const ustensils = data.ustensils.map(ustensil => ustensil.toLowerCase());
    const ingredients = data.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    if (
      name.includes(inputFormated) ||
      appliance.includes(inputFormated) ||
      description.includes(inputFormated) ||
      ustensils.includes(inputFormated) ||
      ingredients.includes(inputFormated)
    ) {
      filteredDatas.push(data);
    }
  });
  // Retourne le tableau de données filtrées.
  return filteredDatas;
}
