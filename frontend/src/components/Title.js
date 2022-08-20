import React from 'react'

const Title = ({text}) => {
  return (
    <div className="titleContainer">
      <h1 className="title">Break Kola</h1>
      <h1 className="subTitle"><span>with</span> hero</h1>
      <div className="pick">
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Title
