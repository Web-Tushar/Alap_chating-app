import React from 'react'
import Msgfriends from './Msgfriends'
import Msgbox from './Msgbox'

const Message = () => {
  return (
    <div style={{display:"flex", gap:"20px"}}>
      <Msgfriends/>
      <Msgbox/>
    </div>
  )
}

export default Message