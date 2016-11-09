// This class is the only one component that has access to redux state and action creators.
// Inspired by pattern described in this article:
// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.p28lloz3l

import React, { Component, PropTypes } from 'react'
import { fetchProducts, addCategoryToFilter, addSeachQueryToFilter, resetFilter } from '../actions'
import { connect } from 'react-redux'
import './ProductsContainer.css'
import ProductList from './ProductList'
import { getArrayOfCategories, getIsFetching, getFilter, getProductsByFilter, getErrorMessage } from '../reducers/products'
import CategoriesSidebar from './CategoriesSidebar'

class ProductsContainer extends Component {
  constructor(props) {
    super(props)
    this.addCategoryToFilter = this.addCategoryToFilter.bind(this)
    this.addSeachQueryToFilter = this.addSeachQueryToFilter.bind(this)
    this.retryFetchProducts = this.retryFetchProducts.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(fetchProducts())
  }

  addCategoryToFilter(category) {
    this.props.dispatch(addCategoryToFilter(category))
  }

  addSeachQueryToFilter(query) {
    this.props.dispatch(addSeachQueryToFilter(query))
  }

  retryFetchProducts() {
    this.props.dispatch(fetchProducts())
  }

  resetFilter() {
    this.props.dispatch(resetFilter())
  }

  render() {
    const { isFetching, productsToShow, categories, filter, errorMessage } = this.props

    return (
      <div className="ProductsContainer">
        <div className="row">
          <div className="col-md-3">
            <CategoriesSidebar
              categories={categories}
              onSelectCategory={this.addCategoryToFilter}
              filter={filter}
            />
          </div>
          <div className="col-md-8">
            <ProductList
              isFetching={isFetching}
              errorMessage={errorMessage}
              products={productsToShow}
              filter={filter}
              onSearch={this.addSeachQueryToFilter}
              retryFetch={this.retryFetchProducts}
              onResetFilter={this.resetFilter}
            />
          </div>
        </div>
      </div>
    )
  }
}

ProductsContainer.propTypes = {
  productsToShow: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  categories: PropTypes.array,
  errorMessage: PropTypes.string,
  filter: PropTypes.shape({
    query: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
  })
}

const mapStateToProps = ({ products }) => ({
  productsToShow: getProductsByFilter(products),
  errorMessage: getErrorMessage(products),
  isFetching: getIsFetching(products),
  categories: getArrayOfCategories(products),
  filter: getFilter(products),
})

export default connect(mapStateToProps)(ProductsContainer)
