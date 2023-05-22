/**
 * Formate un élément en le convertissant en minuscules et en supprimant les accents.
 * @param {string} e - Élément à formater.
 * @returns {string} - Élément formaté.
 */
export function format(e) {
  const formattedElement = e
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return formattedElement;
}
