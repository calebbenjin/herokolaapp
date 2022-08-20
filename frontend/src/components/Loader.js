import React from 'react'
import bottle from '../images/bottle.png'

const Loader = ({title}) => {
  return (
    <div className="loader">
      <div>
        <img src={bottle} alt="bottle" className="bottleLoader" />
        <h2 className="loaderTitle">{title && title}</h2>
      </div>
    </div>
  )
}

export default Loader
