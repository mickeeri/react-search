
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middlewares = [thunk]

const configureStore = (initialState) => {
  // Dont't want the redux form actions in redux dev tools.
  const blacklist = ['redux-form*']


  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && window.devToolsExtension({
      actionsBlacklist: blacklist
    })
  ))

  return store
}

export default configureStore
