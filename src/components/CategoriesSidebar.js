import React, { PropTypes } from 'react'
import './CategoriesSidebar.css'

const CategoriesSidebar = ({ categories }) => {
  if (!categories.length) {
    return null
  }

  const handleCategoryClick = (category) => {

  }

  const getActiveState = (category) => {
    if (category === 'LCD') {
      return 'active'

    } else {
      return ''
    }
  }

  return (
    <div className="CategoriesSidebar">
      <h2>Kategorier</h2>
      <ul className="CategoriesSidebar-menu">
        {categories.map(category => {
          return (
            <li>
              <a
                key={category}
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
}

export default CategoriesSidebar
