import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import moment from 'moment/moment';
import ScrollToBottom from 'react-scroll-to-bottom';
// import { logEvent } from 'firebase/analytics';
// import EmojiPicker from 'emoji-picker-react';
// import { useSelector, useDispatch } from 'react-redux';



const Msgbox = () => {
  const data = useSelector((state) => state.logedinUserData.value);
  const activeChatdata = useSelector((state) => state.activeChatUser.value)
  const db = getDatabase();
  const[msgText,setMsgText] =  useState("")
  const [allMsg, setAllMsg] = useState([])
  const [showemoji,setShowEmoji] = useState(false)
  
      
  // write message====
  const handleSubmitMsg = ()=>{
    set(push(ref(db, 'message')),{
      senderid:data.uid,
      sendername: data.displayName,
      senderemail:data.email,
      recivername: activeChatdata.sendername == data.uid ? activeChatdata.recivername: activeChatdata.sendername,
      receiveremail: activeChatdata.sendername == data.uid ? activeChatdata.receiveremail: activeChatdata.senderemail,
      receiverid: activeChatdata.sendername == data.uid ? activeChatdata.receiverid: activeChatdata.senderid,
      message: msgText,
      date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`, 
  }).then(()=>{
    setMsgText("")
  })
  }
  // read message====//

  useEffect(()=>{
    const usersRef = ref(db, 'message');
    onValue(usersRef, (snapshot) => {
    let arr = []
    let activeid = data.uid == activeChatdata?.senderid ? activeChatdata?.receiverid : activeChatdata?.senderid;
    snapshot.forEach((item)=>{
      
      if((item.val().senderid == data.uid && item.val().receiverid == activeid) ||(item.val().senderid == activeid && item.val().receiverid == data.uid)){
      arr.push({...item.val(), id: item.key})

      }
    }) 
     setAllMsg(arr);
     });
     },[activeChatdata]) 


    //   
    let handleEnterPress = (e)=>{
        if(e.key == "Enter")
          set(push(ref(db, 'message')),{
            senderid:data.uid,
            sendername: data.displayName,
            senderemail:data.email,
            recivername: activeChatdata.sendername == data.uid ? activeChatdata.recivername: activeChatdata.sendername,
            receiveremail: activeChatdata.sendername == data.uid ? activeChatdata.receiveremail: activeChatdata.senderemail,
            receiverid: activeChatdata.sendername == data.uid ? activeChatdata.receiverid: activeChatdata.senderid,
            message: msgText,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`, 
        }).then(()=>{
          setMsgText("")
        })
    }

  return (
    <>
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
              <ScrollToBottom className='msgbody'>
            
                  {
                  allMsg.map((item,index)=>(
                    item.senderid == data.uid ?
                      <div key={index} style={{display:"flex", flexDirection:"column", justifyContent:"end", padding:"5px",alignItems:"end"}} >
                        
                            <p className ='sendmsg'>{item.message}</p>  
                            <span className='date'>
                              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                            {/* <p style={{fontSize:"12px",color:"gray"}}>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p> */}

                      
                      </div>
                      :
                        <div style={{padding:"5px"}}>
                          <p className='receivemsg'>{item.message}</p>
                          <p style={{fontSize:"12px",color:"gray"}}>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                        </div> 
                  ))
                  }

              </ScrollToBottom>
          
              <div className='msgfooter'>
                <div style={{display:"flex", gap:"20px", position:"relative"}}>
                  <button onClick={()=>setShowEmoji(!showemoji)}>Emoji</button>

                  <div style={{position:"absolute", left:"0", bottom:"50px" }}>
                     {/* <EmojiPicker onEmojiClick={emojiHandle} open={showemoji}/> */}
                  </div>

                    <input  onKeyUp={handleEnterPress} onChange={ (e)=>setMsgText(e.target.value)} style={{fontSize:'20px',padding:'5px'}} type="text" value={msgText} className='msginput' placeholder='Enter Your Message' />
                    {
                      msgText.length > 0 &&
                      <button  onClick={handleSubmitMsg} className='sendbtn'>Send</button>
                    }
                </div>
              </div>
          </div>
      }
    </>
  )
}
export default Msgbox  