import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

const getCategoriesFilter = (currentCategories, categoryToAdd) => {
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

const filter = (state = { query:'', categories: [] }, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY_TO_FILTER:
      return {
        ...state,
        categories: getCategoriesFilter(state.categories, action.categoryToAdd)
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

export default combineReducers({
  all,
  isFetching,
  ids,
  filter,
})

export const getIsFetching = (state) => state.isFetching

export const getFilter = (state) => state.filter

// Creates an array of product categories.
export const getArrayOfCategories = (state) => {
  const obj = state.all

  // Create the array.
  const allCategories = Object.keys(obj).map((key) => obj[key]['kategori_namn'])

  // Remove duplicates.
  const uniqueArray = allCategories.filter((value, i, arr) => arr.indexOf(value) === i)

  return uniqueArray
}

// TODO: use different file for this.
export const getProductsByFilter = (state) => {


  const products = state.all
  const ids = state.ids
  const filter = getFilter(state)
  let filteredProductIds = []

  if (!filter.categories.length) {
    return ids
  }

  ids.forEach(id => {
    if (filter.categories.includes(products[id].kategori_namn)) {
      filteredProductIds = [...filteredProductIds, id]
    }
  })

  return filteredProductIds
}
