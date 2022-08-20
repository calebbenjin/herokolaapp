import React from 'react'
import writerupimg from '../images/writerup.png'
// import {data} from '../data'
import { Link } from 'react-router-dom'
import { IMG_URL } from '../config/index'
import Footer from './Footer'
import Header from './Header'
import Bottle from './Bottle'

const Hero = ({ data }) => {
  return (
    <div className='heroConrainer'>
      <Header text='Pick your Hero' />
      <div className='heroContent'>
        <img src={writerupimg} alt='Logo' className='wright-up' />
        <div className='userContainer'>
          <div className='imageContainer'>
            {data?.map((user) => (
              <Link to={`/pages/signup/${user && user?._id}`} key={user._id}>
                <div className='headimg-box' key={user?.id}>
                  <img
                    src={user && `${IMG_URL}${user?.image}`}
                    alt='Logo'
                    className='headimg'
                  />
                  <p>{user && user?.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className='hashTag'>#HeroKolaConnect</p>

          <Bottle bottleContainer="bottleContainer" className="home-bottle" isText isBanner />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Hero
