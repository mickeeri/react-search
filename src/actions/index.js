import * as api from '../api'
import { getIsFetching } from '../reducers/products'
import * as types from '../constants/ActionTypes'

/**
 * Fetches all products from "API".
 */
export const fetchProducts = () => (dispatch, getState) => {
  // Resolve promise if already is fetching.
  if (getIsFetching(getState().products)) {
    return Promise.resolve()
  }

  dispatch({
    type: types.FETCH_PRODUCTS_REQUEST,
  })

  return api.fetchProducts().then(
    response => {
      dispatch({
        type: types.FETCH_PRODUCTS_SUCCESS,
        response,
      })
    },
    error => {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        message: error.message || 'Ett okänt fel uppstod. Försök igen senare.',
      })
    }
  )
}

/**
 * Dispatches action when new category is to be added to filter.
 * @param {string} categoryToAdd
 */
export const addCategoryToFilter = (categoryToAdd) => (dispatch) => {
  dispatch({
    type: types.ADD_CATEGORY_TO_FILTER,
    categoryToAdd,
  })
}

/**
 * Add user input from search field to the filter.
 * @param {string} queryToAdd
 */
export const addSeachQueryToFilter = (queryToAdd) => (dispatch) => {
  dispatch({
    type: types.ADD_SEARCH_QUERY_TO_FILTER,
    queryToAdd,
  })
}
