import React, { useEffect, useState } from 'react'
import CardHeading from '../../utilites/CardHeading';
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue,  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { activeUser } from '../../Slice/activeMsgSlice';

const Msgfriends = () => {
     const [friendsList, setFriendsList] = useState([]);
     const db = getDatabase();
     const data = useSelector((state) => state.logedinUserData.value)
     const activeChatdata = useSelector((state) => state.activeChatUser.value)
     const dispatch = useDispatch()

    //  console.log(activeChatdata);


     useEffect(()=>{
          const usersRef = ref(db, 'friends');
          onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            
            
            if(item.val().senderid == data.uid ||  item.val().receiverid == data.uid){
            arr.push({...item.val(), id: item.key})
      
            }
          }) 
           setFriendsList(arr);
           });
           },[])

           const handleChat = (chatinfo)=>{
              //  console.log(chatinfo);
               dispatch(activeUser(chatinfo))
           }

  return (
     <div className="box msg">
     <CardHeading text="Friend List "/>
          <div className='useritembox'>
            {
              friendsList.length > 0
              ?friendsList.map((item,index)=>(
                <div onClick={()=>handleChat(item)} key={index} className="useritem msg">
                      <div className='imgbox'></div>
                      <div className='userinfo'>
                      <div>
                        <h4>{item.receiverid == data.uid
                        ?
                        item.sendername
                        :
                        item.recivername
                          
                           }</h4>
                        <p>mern stack 2306</p>
                      </div>
                      {/* <div>
                         <button>unfriend</button>
                         <button onClick={()=>handleBlock(item)}>block</button>
                         
                      </div> */}
                    </div>
                </div>  

              ))
              :
                <Alert severity="info"> Friends Found</Alert>                 
            }
          </div>
    </div>
  )
}

export default Msgfriends