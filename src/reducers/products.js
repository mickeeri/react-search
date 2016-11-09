import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import Fuse from 'fuse.js'

/**
 * Returns new array of categories for the filter object.
 * Using slice to return shallow copy of array.
 * @param  {Array} currentCategories
 * @param  {string} categoryToAdd
 * @return {Array} new categories
 */
const getCategoriesFilter = (currentCategories, categoryToAdd) => {
  // If category is already in categories, remove it.
  if (currentCategories.indexOf(categoryToAdd) >= 0) {
    const index = currentCategories.indexOf(categoryToAdd)
    return [
      ...currentCategories.slice(0, index),
      ...currentCategories.slice(index + 1)
    ]
  } else {
    // Else just add the new category.
    return [
      ...currentCategories,
      categoryToAdd
    ]
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return action.response
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
    case types.RESET_PRODUCTS_FILTER:
      return {
        query: '',
        categories: [],
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
  products,
  isFetching,
  filter,
  errorMessage,
})

export const getIsFetching = (state) => state.isFetching

export const getFilter = (state) => state.filter

export const getErrorMessage = (state) => state.errorMessage

/**
 * Creates and retuns an array with product categories
 * @param  {Array} products
 * @return {Array} product categories
 */
export const getArrayOfCategories = ({ products }) => {
  // Create the array.
  const allCategories = products.map((product) => product['kategori_namn'])

  // Remove duplicates.
  const uniqueArray = allCategories.filter((value, i, arr) => arr.indexOf(value) === i)

  return uniqueArray.sort((a, b) => a < b ? -1 : 1)
}

/**
 * Match a single product by category name.
 * @param  {string} kategori_namn
 * @param  {Array} categories
 * @return {bool} true if match
 */
const byCategories = ({ kategori_namn }, categories) => {
  if (!Array.isArray(categories)) {
    throw new Error('Expected categories to be an array.')
  }

  return categories.indexOf(kategori_namn) >= 0
}

/**
 * Filter an array of products by search query, using
 * the Fuse fuzzy-search-library.
 * @param  {Array} products
 * @param  {string} query
 * @return {Array} Search result
 */
const filteredBySeachQuery = (products, query) => {
  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    tokenize: true,
    matchAllTokens: true,
    keys: ["produkt_namn", "kategori_namn"]
  };

  const fuse = new Fuse(products, options)
  return fuse.search(query.trim())
}

/**
 * Creates and returns an array of products after it has has been
 * passed through a number of filters.
 * @param  {Array} products
 * @param  {Object} filter
 * @return {Array}  Returns array of product objects.
 */
export const getProductsByFilter = ({ products, filter: { categories, query }}) => {
  // Return all products sorted by product name if filters are empty.
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
