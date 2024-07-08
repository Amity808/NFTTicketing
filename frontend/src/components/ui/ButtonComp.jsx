import React from 'react'

const ButtonComp = ({ name }) => {
  return (
    <div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">{name}</button>
    </div>
  )
}

export default ButtonComp