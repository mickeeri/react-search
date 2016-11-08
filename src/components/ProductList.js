import React, { PropTypes } from 'react'
import Loader from './Loader'
import ProductListItem from './ProductListItem'

const ProductList = ({ isFetching, ids, products }) => {

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
}

export default ProductList
