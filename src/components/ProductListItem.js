import React, { PropTypes } from 'react'

const ProductListItem = ({ product: { produkt_id: id, produkt_namn: name, kategori_namn: category }}) => {
  return (
    <li className="list-group-item">
      {name}
      <small className="label label-default pull-right">{category}</small>
    </li>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.shape({
    produkt_id: PropTypes.string.isRequired,
    produkt_namn: PropTypes.string.isRequired,
    kategori_namn: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductListItem
