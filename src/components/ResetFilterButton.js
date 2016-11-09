import React, { PropTypes } from 'react'
import './Header.css'

const ResetFilterButton = ({ filter: { categories, query }, onResetFilter }) =>
  <button
    className="ResetFilterButton btn btn-default"
    disabled={query === '' && !categories.length}
    onClick={() => onResetFilter()}
  >Rensa filter</button>

ResetFilterButton.propTypes = {
  onResetFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default ResetFilterButton
