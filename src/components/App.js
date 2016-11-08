import React, { Component } from 'react';

import './App.css';
import ProductsContainer from './ProductsContainer'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro container">
          <ProductsContainer />
        </div>
      </div>
    );
  }
}

export default App;
