import React , { useEffect, useState } from 'react';
import CardHeading from '../../utilites/CardHeading';
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue, set, push,remove } from "firebase/database";

import { useSelector } from 'react-redux'

const Friends = () => {  
     const db = getDatabase();
     const [friendsList,setfriendsList] = useState([])
     const data = useSelector((state) => state.logedinUserData.value) 

     
     useEffect(()=>{
          const usersRef = ref(db, 'Friends');
          onValue(usersRef, (snapshot) => {   
          let arr= []
          snapshot.forEach((item)=>{
            
               if(item.val().senderid == data.uid || item.val().receiverid == data.uid){
                 arr.push({...item.val(), id: item.key})
      
            }
          }) 
          setfriendsList(arr);
            
        });
      
      },[])


     //  useEffect(()=>{
     //      const friendRequestRef = ref(db, 'Friends');
     //      onValue(friendRequestRef, (snapshot) => {
     //      let arr = []
     //      snapshot.forEach((item)=>{
     //      //   if(item.key != data.uid){
     //           // if(item.val().senderid == data.uid || item.val().receiverid == data.uid){
     //                 arr.push({...item.val(),id:item.key})
     
     //           // }
               
     //      //   }
     //      }) 
     //      setfriendsList(arr);
            
     //    });
      
     //  },[])
      console.log(friendsList);

  return (
     <div className="box">
     <CardHeading text="Friend List "/>
          <div  className='useritembox'>
               {  friendsList.length > 0  ?
               
                friendsList.map((item,index)=>(
                    <div key={index} className="useritem">
                         <div className='userinfo'>
                              <div>
                                   <h4>jhgkjgkjg</h4>
                                   <p>mern stack 2306</p>
                              </div>
                              <div>
                                   <button>Block</button>
                              </div>
                         </div>
                    </div>

               ))
               :
                 <Alert severity="info">No Friends Found</Alert>

               }
          

          </div>
    </div>
  )
}

export default Friends