import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Msgbox = () => {
  const data = useSelector((state) => state.logedinUserData.value)
  const activeChatdata = useSelector((state) => state.activeChatUser.value)
  //  console.log(activeChatdata);
  const[msgText,setMsgText] =  useState("")
  const handleSubmitMsg = ()=>{
    console.log(msgText);
  }
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

      { !activeChatdata ?
         <div style={{display:"flex",alignItems:"center" ,fontSize:"30px", justifyContent:"center" , width:"100%"}}>
          <h3>Please Select  User </h3>
         </div>
         :
          <div className='msgmain'>
              <div className="msgheading">
                <div style={{display:"flex",alignItems:"center", gap:"33px"}}>
                    <div>
                          <h3>
                            {
                              activeChatdata.receiverid == data.uid ?
                              activeChatdata.sendername
                              :
                              activeChatdata.recivername
                            
                            }
                            
                            </h3>
                          <p>active</p>
                    </div>
                </div>
                <div className='emoji'>🤢</div>
              
                    
              </div>
              <div className='msgbody'>
                <div style={{display:"flex", justifyContent:"end", padding:"5px"}} >
                  <p className='sendmsg'>hello</p>  
                </div>
                <div style={{padding:"5px"}}>
                  <p className='receivemsg'>hello</p>
                </div>
                <div style={{display:"flex", justifyContent:"end", padding:"5px"}} >
                  <p className='sendmsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint unde doloremque saepe qui, ducimus sequi ipsam dicta distinctio debitis reiciendis! Aspernatur, voluptas numquam a perspiciatis sint ipsa dolorem dignissimos saepe, temporibus impedit nulla ducimus? Omnis numquam tempora iusto, officiis nulla obcaecati, totam a dolorum tempore assumenda provident impedit voluptas autem. </p>  
                </div>

                <div style={{ padding:"5px"}}>
                  <p className='receivemsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dicta maxime dolore, corporis vel magnam debitis quia enim aliquid cumque aut dolores quaerat amet officia aliquam a neque sunt quidem repellendus.</p>
                </div>

                <div style={{display:"flex", justifyContent:"end", padding:"5px"}} >
                  <p className='sendmsg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint unde doloremque saepe qui, ducimus sequi ipsam dicta distinctio debitis reiciendis! Aspernatur, voluptas numquam a perspiciatis sint ipsa dolorem dignissimos saepe, temporibus impedit nulla ducimus? Omnis numquam tempora iusto, officiis nulla obcaecati, totam a dolorum tempore assumenda provident impedit voluptas autem. </p>  
                </div>
 
              </div>
              <div className='msgfooter'>
                <div style={{display:"flex", gap:"20px"}}>
                    <input onChange={ (e)=>setMsgText(e.target.value)} style={{fontSize:'20px',padding:'5px'}} type="text" className='msginput' placeholder='Enter Your Message' />
                    {
                      msgText.length > 0 &&
                      <button onClick={handleSubmitMsg} className='sendbtn'>Send</button>


                    }

                </div>
              </div>
          </div>

      }
    
    </>
    
  )
}

export default Msgbox