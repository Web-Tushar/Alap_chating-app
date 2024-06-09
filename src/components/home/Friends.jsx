import React, { useEffect, useState } from 'react';
import CardHeading from '../../utilites/CardHeading';
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue,  } from "firebase/database";
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
                // blockkhaiceid: blockinfo.receiverid,
                // blockkhaiceemail: blockinfo
                // blockkhaicename: blockinfo
                // blockdecaid: blockinfo
                // blockdecaemail: blockinfo
                // blockdecaname: blockinfo
            })
        console.log(blockinfo);

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
                        item.receivername
                          
                           }</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <div>
                         <button>unfriend</button>
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