import React from 'react'
import bottleimg from '../images/bottle.png'

const Bottle = ({ className, isText, bottleContainer, isBanner }) => {
  return (
    <div className={bottleContainer}>
      {isText ?  <div className='writeupsContainer'>
        <div className='card'>
        {isBanner ? (<p className='banner'>
            Follow instructions to stand a chance to get a shoutout from Hero Celebrities and an initation to the Hero Events.
          </p>) : null}
          

          <div className='noticeContainer'>
            <h4>
              THE BEER FOR <span>HEROES</span>
            </h4>
            <p>18+ Drink Responsibly</p>
          </div>
        </div>
      </div> :  null }
      <img src={bottleimg} alt='HeroBottle' className={className} />
    </div>
  )
}

export default Bottle
