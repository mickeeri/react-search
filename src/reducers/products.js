import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'

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
})

export const getIsFetching = (state) => state.isFetching
