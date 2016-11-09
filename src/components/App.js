import React, { Component } from 'react';
import ProductsContainer from './ProductsContainer'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <ProductsContainer />
        </div>
      </div>
    );
  }
}

export default App;
