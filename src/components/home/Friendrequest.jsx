import React, { useEffect, useState } from 'react'
import CardHeading from '../../utilites/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';


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
 
  return (
     <div className="box">
     <CardHeading text="Friend Request "/>
          <div className='useritembox'>
              {friendRequestList.map((item,index)=>(
                <div key={index} className="useritem">
                    <div className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>{item.whosendName }</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <div>
                         <button>Confirm</button>
                         <button>Delete</button>
                      </div>
                    </div>
                </div>
               ))
              }
          </div>
    </div>
  )
}

export default Friendrequest