import React, { PropTypes } from 'react'
import Loader from './Loader'
import ProductListItem from './ProductListItem'
import SearchBar from './SearchBar'
import ResetFilterButton from './ResetFilterButton'

const ProductList = ({ isFetching, products, onSearch, filter, errorMessage, retryFetch, onResetFilter }) => {

  // Show loader if fetching from api.
  if (isFetching && !products.length) {
    return <Loader />
  }

  // Show error message if there is one.
  if (!isFetching && errorMessage) {
    return (
      <div className="alert alert-danger">
        {errorMessage}
        <div className="text-right">
          <button
            className="btn btn-primary"
            onClick={() => retryFetch()}
          >Försök igen</button>
        </div>
      </div>
    )
  }

  return (
    <div className="ProductList">
      <div className="row">
        <div className="col-md-3">
          <h2>Produkter</h2>
        </div>
        <div className="col-md-7">
          <SearchBar
            onSearch={onSearch}
            filter={filter}
          />
        </div>
        <div className="col-md-2">
          <ResetFilterButton
            onResetFilter={onResetFilter}
            filter={filter}
          />
        </div>
      </div>
      {!isFetching && !products.length ?
        <div className="alert alert-info">Ingen träff</div> :
        <ul className="list-group">
          {products.map(product =>
            <ProductListItem key={product.produkt_id} product={product} />
          )}
        </ul>
      }
    </div>
    )
}

ProductList.propTypes = {
  products: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  retryFetch: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
}

export default ProductList
