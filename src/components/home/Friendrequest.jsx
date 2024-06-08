import React, { useEffect, useState } from 'react'
import CardHeading from '../../utilites/CardHeading'
import { getDatabase, ref, onValue, set, push,remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
// import { IoHandLeft } from 'react-icons/io5';
import { Alert } from '@mui/material';


const Friendrequest = () => {
  const db = getDatabase();

     const [friendRequestList,setfriendRequestList] = useState([])
     const data = useSelector((state) => state.logedinUserData.value)  

     
  useEffect(()=>{
     const friendRequestRef = ref(db, 'friendRequest');
     onValue(friendRequestRef, (snapshot) => {
     let arr= []
     snapshot.forEach((item)=>{
     //   if(item.key != data.uid){
          if(data.uid == item.val().whoreceivedid){
               arr.push({...item.val(), id: item.key}) 

          }
          
     //   }
     }) 
     setfriendRequestList(arr);
       
   });
 
 },[])


//  friend request delete
const HandlfRequest = (handleinfo)=>{
  // console.log(handleinfo);
  remove(ref(db,"friendRequest " + handleinfo.id)).then(()=>{
  
  })
}
  // confirm request====

const handleReqConfirm =(confirminfo)=>{
  console.log(confirminfo);
  // console.log(confirmrequest);
  set(push(ref(db, 'friends ')),{
    senderid: confirminfo.whosendid,
    senderemail: confirminfo.whosendemail,
    sendername: confirminfo.whosendName,
    receiverid: data.uid,
    receiveremail: data.email,
    recivername: data.displayName ,
}).then(()=>{
  remove(ref(db,"friendRequest/" + confirminfo.id)).then(()=>{
   console.log("confirm done");
  })
})

}
  return (
     <div className="box">
     <CardHeading text="Friend Request "/>
          <div className='useritembox'>
            
              {friendRequestList.length > 0 ?
              friendRequestList.map((item,index)=>(
                <div key={index} className="useritem">
                    <div className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>{item.whosendName }</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <div>
                         <button onClick={()=>handleReqConfirm(item)}>Confirm</button>
                         <button onClick={()=>HandlfRequest(item)}>Delete</button>
                      </div>
                    </div>
                </div>
               ))
               :
               <Alert severity="info">No Request Found</Alert>                  
              }
          </div>
    </div>
  )
}

export default Friendrequest