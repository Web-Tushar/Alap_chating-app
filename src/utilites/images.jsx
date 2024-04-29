import React from 'react'

const images = ({source,alt,className,onClick}) => {
  return (
    <img src={source} alt={alt} className={className} onClick={onclick} />
   
  )
}

export default images