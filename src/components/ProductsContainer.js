import React, { Component, PropTypes } from 'react'
import { fetchProducts } from '../actions'
import { connect } from 'react-redux'
import './ProductsContainer.css'
import ProductList from './ProductList'
import { getArrayOfCategories } from '../reducers/products'
import CategoriesSidebar from './CategoriesSidebar'

class ProductsContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchProducts())
  }

  render() {
    const { isFetching, products, ids, categories } = this.props

    return (
      <div className="ProductsContainer">
        <div className="panel">
          <div className="row">
            <div className="col-md-3">
              <CategoriesSidebar categories={categories} />
            </div>
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
  categories: PropTypes.array,
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.all,
    isFetching: products.isFetching,
    ids: products.ids,
    categories: getArrayOfCategories(products)
  }
}

export default connect(mapStateToProps)(ProductsContainer)
