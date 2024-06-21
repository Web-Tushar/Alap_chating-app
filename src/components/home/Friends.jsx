import React, { useEffect, useState } from 'react';
import CardHeading from '../../utilites/CardHeading';
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue, remove, push, set,  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'; 

const Friends = () => {

  const [friendsList, setFriendsList] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.logedinUserData.value) 

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
      console.log(friendsList);

      const handleBlock = (blockinfo) =>{
        set(push(ref(db, 'block')),{
                blockkhaiceid: data.uid == blockinfo.senderid ? blockinfo.receiverid : blockinfo.senderid,
                blockkhaiceemail: data.uid == blockinfo.senderid ? blockinfo.receiveremail : blockinfo.senderemail,
                blockkhaicename: data.uid == blockinfo.senderid ? blockinfo.recivername : blockinfo.sendername,
                blockdecaid: data.uid == blockinfo.receiverid ? blockinfo.senderid : blockinfo.receiverid,
                blockdecaemail: data.uid == blockinfo.receiverid ? blockinfo.senderemail : blockinfo.receiveremail,
                blockdecaname: data.uid == blockinfo.receiverid ? blockinfo.sendername : blockinfo.recivername,
            }).then(()=>{
              console.log(blockinfo);

            })

      }

      const handleunfriend = (unfrd) =>{
        if(data.uid == unfrd.senderid || data.uid == unfrd.receiverid)
          remove(ref(db, "friends/", unfrd.id))
      }

  return (
    
     <div className="box">
     <CardHeading text="Friend List "/>
          <div className='useritembox'>
            {
              friendsList.length > 0
              ?friendsList.map((item,index)=>(
                <div key={index} className="useritem">
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
                      <div>
                         <button onClick={()=>handleunfriend(item)}>unfriend</button>
                         <button onClick={()=>handleBlock(item)}>block</button>
                         
                      </div>
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

export default Friends