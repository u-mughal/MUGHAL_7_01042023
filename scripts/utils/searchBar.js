export function searchRecipe (value) {
  console.log("ok, value");
}

const searchBar = document.querySelector("#search_recipe");
searchBar.addEventListener("keyup", (e) => {
  const value = e.target.value;
  const regex = /[A-Za-z0-9]{3,}/;
  if (regex.test(value)) {
    searchRecipe(value);
  }
})