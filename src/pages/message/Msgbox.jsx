import React from 'react'
import { useSelector } from 'react-redux'

const Msgbox = () => {
  const data = useSelector((state) => state.logedinUserData.value)
  const activeChatdata = useSelector((state) => state.activeChatUser.value)
   console.log(activeChatdata);
  return (
    <>
    {/* { activeChatdata ?
      <div className='msgmain'>
          <div className="msgheading">
            <div style={{display:"flex",alignItems:"center", gap:"33px"}}>
                <div className="imgbox"></div>
                <div>
                      <h3>
                        {activeChatdata.sendername
                        
                        }
                        
                        </h3>
                      <p>active</p>
                </div>
            </div>
            <div className='emoji'>🤢</div>
                
          </div>
      </div>
      :
      <h2>please select a user</h2>
    } */}

      <div className='msgmain'>
          <div className="msgheading">
            <div style={{display:"flex",alignItems:"center", gap:"33px"}}>
                <div>
                      <h3>
                        {/* {
                          activeChatdata.receiverid == data.uid ?
                          activeChatdata.sendername
                          :
                          activeChatdata.recivername
                        
                        } */}
                        
                        </h3>
                      <p>active</p>
                </div>
            </div>
            <div className='emoji'>🤢</div>
          
                
          </div>
          <div className='msgbody'></div>
          <div className='msgfooter'></div>
      </div>
    
    </>
    
  )
}

export default Msgbox