import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import Fuse from 'fuse.js'
import 'array-includes'

const getCategoriesFilter = (currentCategories, categoryToAdd) => {
  // If category is already in categories, remove it.
  if (currentCategories.includes(categoryToAdd)) {
    const index = currentCategories.indexOf(categoryToAdd)
    return [
      ...currentCategories.slice(0, index),
      ...currentCategories.slice(index + 1)
    ]
  } else {
    // Else just return a shallow copy of the
    // array with the new category.
    return [
      ...currentCategories,
      categoryToAdd
    ]
  }
}

const all = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...action.response.entities.products,
      }
    default:
      return state
  }
}

const ids = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return [
        ...state,
        ...action.response.result,
      ]
    default:
      return state
  }
}

const filter = (state = { query: '', categories: [] }, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY_TO_FILTER:
      return {
        ...state,
        categories: getCategoriesFilter(state.categories, action.categoryToAdd)
      }
    case types.ADD_SEARCH_QUERY_TO_FILTER:
      return {
        ...state,
        query: action.queryToAdd,
      }
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return true
    case types.FETCH_PRODUCTS_FAILURE:
    case types.FETCH_PRODUCTS_SUCCESS:
      return false
    default:
      return state
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_FAILURE:
      return action.message
    case types.FETCH_PRODUCTS_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({
  all,
  isFetching,
  ids,
  filter,
  errorMessage,
})

export const getIsFetching = (state) => state.isFetching

export const getFilter = (state) => state.filter

export const getErrorMessage = (state) => state.errorMessage

// Creates an array of product categories.
export const getArrayOfCategories = ({ all }) => {
  const obj = all

  // Create the array.
  const allCategories = Object.keys(obj).map((key) => obj[key]['kategori_namn'])

  // Remove duplicates.
  const uniqueArray = allCategories.filter((value, i, arr) => arr.indexOf(value) === i)

  return uniqueArray
}

// Filter product with array of categories.
const byCategories = ({ kategori_namn }, categories) => {
  if (!Array.isArray(categories)) {
    throw new Error('Expected categories to be an array.')
  }

  return categories.includes(kategori_namn)
}

// Filter product by search query.
const bySearchQuery = ({ produkt_namn }, query) => {
  if (typeof query !== 'string') {
    throw new Error('Expected query to be a string.')
  }

}

const filteredBySeachQuery = (products, query) => {
  // Using fuse fuzzy-search library to filter by product name.
  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    tokenize: true,
    matchAllTokens: true,
    keys: ["produkt_namn"]
  };

  const fuse = new Fuse(products, options)
  return fuse.search(query.trim())
}

// Returns array of product objects after being filtered by query and category.
export const getProductsByFilter = ({ ids, all, filter: { categories, query }}) => {
  // Create an array of product objects.
  let products = ids.map(id => all[id])

  // Return all products if filters are empty.
  if (!categories.length && query === '') {
    return products.sort((a, b) => a.produkt_namn < b.produkt_namn ? -1 : 1)
  }

  // Filter the array of products by categories.
  if (categories.length) {
    products = products
      .filter((product) => byCategories(product, categories))
      .sort((a, b) => a.produkt_namn < b.produkt_namn ? -1 : 1)
  }

  // Filter by search query if query is not empty.
  if (query !== '') {
    products = filteredBySeachQuery(products, query.trim())
  }

  return products
}
