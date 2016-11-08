// Returns an array of category names.
export const getCategoriesFilter = (currentCategories, categoryToAdd) => {
  // Check if the new category already is in the array, and
  // then remove it.
  if (currentCategories.includes(categoryToAdd)) {
    const index = currentCategories.indexOf(categoryToAdd)
    return [
      ...currentCategories.slice(0, index),
      ...currentCategories.slice(index + 1)
    ]
  } else {
    // Else just return a shallow copy of the
    // array with new category.
    return [
      ...currentCategories,
      categoryToAdd
    ]
  }
}

export const getProductsByFilter = ({ all: products, ids, filter: { categories, query } }) => {
  let filteredProductIds = []

  // Just return all product ids if categories array is empty
  // and query is blank.
  if (!categories.length && !query) {
    console.log('Return right awys');
    return ids
  }

  // Else return ids of products that match values
  // in categories array.
  ids.forEach(id => {
    const { kategori_namn, produkt_namn } = products[id]

    if (categories.includes(kategori_namn)) {
      console.log('Match');
      filteredProductIds = [...filteredProductIds, id]
    }

    const productName = produkt_namn.toLowerCase()

    if (productName.includes(query.toLowerCase())) {
      filteredProductIds = [...filteredProductIds, id]
    }
  })
  console.log('filter prod ids', filteredProductIds);
  return filteredProductIds

}
