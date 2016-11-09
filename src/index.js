import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import configureStore from './configureStore'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
