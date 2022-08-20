import React from 'react'
import Logo from './Logo'
import Title from './Title'

const Header = ({text}) => {
  return (
    <header>
      <div className="container">
        <Logo />
        <Title text={text} />
      </div>
    </header>
  )
}

export default Header