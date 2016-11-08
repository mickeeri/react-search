import React, { PropTypes } from 'react'
import Loader from './Loader'
import ProductListItem from './ProductListItem'
import SearchBar from './SearchBar'

const ProductList = ({ isFetching, ids, products, onSearch, filter }) => {

  // Show loader if fetching from api.
  if (isFetching && !ids.length) {
    return (
      <div>
        <Loader /><small>Hämtar produkter</small>
      </div>
    )
  }

  return (
    <div className="ProductList">
      <div className="row">
        <div className="col-md-3">
          <h2>Produkter</h2>
        </div>
        <div className="col-md-9">
          <SearchBar
            onSearch={onSearch}
            filter={filter}
          />
        </div>
      </div>
      <ul className="list-group">
        {ids.map(key =>
          <ProductListItem key={key} product={products[key]} />
        )}
      </ul>
    </div>
    )
}

ProductList.propTypes = {
  products: PropTypes.object,
  ids: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default ProductList
