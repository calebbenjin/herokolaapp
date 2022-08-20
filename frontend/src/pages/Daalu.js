import React, { useEffect } from 'react'
import daaluimg from '../images/daalu.png'
import writerupimg from '../images/writerup.png'
import { shootFireworks } from '../lib'
import Bottle from '../components/Bottle'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

const Daalu = () => {

  useEffect(() => {
    shootFireworks()
  },[])


  return (
    <div className='heroConrainer'>
      <div className="container">
        <Logo />
      </div>
      <div className="daalutitleContainer">
        <h1 className="title">DAALU</h1>
        <h2 className="subTitle">(Thank you)</h2>
      </div>

      <div className='heroContent'>
        <img src={writerupimg} alt='Logo' className='wright-up' />
        <div className='daaluContainer'>
          <div className='daaluimgContainer'>
            <img src={daaluimg} alt="daaluimg" />
          </div>
          <div className="noticeCard">
            <h2>Ensure to share downloaded image, and tagging us on any social media platform and tagging the influencer too to get your prices.</h2>
          </div>
          <Bottle bottleContainer="signupBottleContainer" className="signup-bottle"  />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Daalu