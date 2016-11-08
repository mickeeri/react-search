import React, { Component, PropTypes } from 'react'
import { fetchProducts } from '../actions'
import { connect } from 'react-redux'
import './ProductsContainer.css'
import ProductList from './ProductList'

class ProductsContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchProducts())
  }

  render() {
    const { isFetching, products, ids } = this.props

    return (
      <div className="ProductsContainer">
        <div className="panel">
          <div className="row">
            <div className="col-md-3">Sidebar</div>
            <div className="col-md-8">
              <ProductList
                isFetching={isFetching}
                products={products}
                ids={ids}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.object,
  ids: PropTypes.array,
  isFetching: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    products: state.products.all,
    isFetching: state.products.isFetching,
    ids: state.products.ids,
  }
}

export default connect(mapStateToProps)(ProductsContainer)
