import React, { Component, PropTypes } from 'react'
import { fetchProducts, addCategoryToFilter, addSeachQueryToFilter } from '../actions'
import { connect } from 'react-redux'
import './ProductsContainer.css'
import ProductList from './ProductList'
import { getArrayOfCategories, getIsFetching, getFilter, getProductsByFilter } from '../reducers/products'
import CategoriesSidebar from './CategoriesSidebar'

class ProductsContainer extends Component {
  constructor(props) {
    super(props)
    this.addCategoryToFilter = this.addCategoryToFilter.bind(this)
    this.addSeachQueryToFilter = this.addSeachQueryToFilter.bind(this)
  }

  componentWillMount() {
    // Fetch all product when componen mounts.
    const { dispatch } = this.props
    dispatch(fetchProducts())
  }

  addCategoryToFilter(category) {
    const { dispatch } = this.props
    dispatch(addCategoryToFilter(category))
  }

  addSeachQueryToFilter(query) {
    const { dispatch } = this.props
    dispatch(addSeachQueryToFilter(query))
  }

  render() {
    const { isFetching, products, ids, categories, filter } = this.props

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
              products={products}
              ids={ids}
              filter={filter}
              onSearch={this.addSeachQueryToFilter}
            />
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
  filter: PropTypes.shape({
    query: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
  })
}

const mapStateToProps = ({ products }) => {
  return {
    products: products.all,
    isFetching: getIsFetching(products),
    categories: getArrayOfCategories(products),
    filter: getFilter(products),
    ids: getProductsByFilter(products)
  }
}

export default connect(mapStateToProps)(ProductsContainer)
