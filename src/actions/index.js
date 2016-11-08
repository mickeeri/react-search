import { normalize } from 'normalizr'
import * as api from '../api'
import { getIsFetching } from '../reducers/products'
import * as types from '../constants/ActionTypes'
import * as schema from './schema'

// Fetch all products from api.
export const fetchProducts = (filter) => (dispatch, getState) => {
  // Resolve promise if already is fetching.
  if (getIsFetching(getState().products)) {
    return Promise.resolve()
  }

  dispatch({
    type: types.FETCH_PRODUCTS_REQUEST,
  })

  return api.fetchProducts(filter).then(
    response => {
      dispatch({
        type: types.FETCH_PRODUCTS_SUCCESS,
        // Using normalizr to create a products object that
        // is easier to handle with redux.
        response: normalize(response, schema.arrayOfProducts),
      })
    },
    error => {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        message: error.message || 'Något gick fel.',
      })
    }
  )
}

export const addCategoryToFilter = (categoryToAdd) => (dispatch) => {
  dispatch({
    type: types.ADD_CATEGORY_TO_FILTER,
    categoryToAdd,
  })
}

export const addSeachQueryToFilter = (queryToAdd) => (dispatch) => {
  dispatch({
    type: types.ADD_SEARCH_QUERY_TO_FILTER,
    queryToAdd,
  })
}
