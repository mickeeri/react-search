import React, { Component, PropTypes } from 'react'
import { fetchProducts } from '../actions'
import { connect } from 'react-redux'

class ProductsContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchProducts())
  }

  render() {
    return (
      <div className="ProductsContainer">
        hejsan
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
    all: state.products.all,
  }
}

export default connect(mapStateToProps)(ProductsContainer)
