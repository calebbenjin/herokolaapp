import React from 'react'
import bottleImg from '../images/bottle.png'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <main className="landingPage">
      <div className="overlayContent">
        <div className="text">
          <h1>ARE YOU OLDER</h1>
          <h1>THAN 18?</h1>
          <Link to="/home">
            <button className="yes_btn">YES</button>
          </Link>
          <br />
          <Link to="">
            <button className="no_btn">NO</button>
          </Link>
          <h3>You must be over the age of 18 to visit this site</h3>
        </div>
      </div>
      <div className="landingOverlay">
        <img src={bottleImg} alt="bottleImage" className="overlayImg" />
      </div>
    </main>
  )
}

export default Landing