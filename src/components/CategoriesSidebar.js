import React, { PropTypes } from 'react'
import './CategoriesSidebar.css'

const CategoriesSidebar = ({ categories, onSelectCategory, filter }) => {
  if (!categories.length) {
    return null
  }

  const handleCategoryClick = (category) => {
    onSelectCategory(category)
  }

  const getActiveState = (category) => {
    if (filter.categories.includes(category)) {
      return 'active'

    } else {
      return ''
    }
  }

  return (
    <div className="CategoriesSidebar">
      <h2>Kategorier</h2>
      <small className="text-muted">Klicka för att filtera på kategori</small>
      <ul className="CategoriesSidebar-menu">
        {categories.map(category => {
          return (
            <li key={category}>
              <a
                className={`btn btn-default btn-sm ${getActiveState(category)}`}
                onClick={() => handleCategoryClick(category)}
              >{category}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

CategoriesSidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
}

export default CategoriesSidebar
