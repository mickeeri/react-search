import React, { PropTypes } from 'react'

const ProductListItem = ({ product: { produkt_id, produkt_namn, kategori_namn }}) => {
  return (
    <li className="list-group-item">
      {produkt_namn}
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
