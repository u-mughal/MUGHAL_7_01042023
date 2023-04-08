export function filterFactory() {
  function getFilterCardDOM() {
    const filter = document.createElement("div");
    filter.id("filter_ingredient");
    filter.classList.add("filter");

    return filter;
  }

  return { getFilterCardDOM };
}