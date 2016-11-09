import React from 'react'
import logo from '../logo.svg';
import './Loader.css'

const Loader = () =>
  <div className="Loader">
    <img className="Loader-img" src={logo} alt="logo" /> <span>Hämtar produkter</span>
  </div>

export default Loader
