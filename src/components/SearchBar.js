import React, { PropTypes } from 'react'
import './SearchBar.css'

const SearchBar = ({filter, onSearch}) => {

  const handleOnSearch = (inputValue) => {
    onSearch(inputValue)
  }

  return (
    <div className="SearchBar">
      <input
        className="form-control"
        type="text"
        placeholder="Sök på produkt"
        value={filter.query}
        onChange={(e) => handleOnSearch(e.target.value)}
      />
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default SearchBar
