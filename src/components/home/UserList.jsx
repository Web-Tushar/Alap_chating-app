import React, { useEffect, useState } from 'react'
import './homepage.css'
import CardHeading from '../../utilites/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@mui/material';


  const UserList = () => {    
  const db = getDatabase();
  const [usersList,setUsersList] = useState([ ])
  const [freqaList,setfreqList] = useState([])
  const data = useSelector((state) => state.logedinUserData.value) 
  

//  ===all users list
  useEffect(()=>{
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
    let arr= []
    snapshot.forEach((item)=>{
      
      if(item.key != data.uid){
        arr.push({...item.val(), id: item.key})

      }
    }) 
    setUsersList(arr);
      
  });

},[])
console.log(usersList);

// ===friendrequestlist
  useEffect(()=>{
    const usersRef = ref(db, 'friendRequest');
    onValue(usersRef, (snapshot) => {
    let arr= []
    snapshot.forEach((item)=>{
      if(data.uid == item.val().whosendid || data.uid == item.val().whoreceivedid){
        arr.push(item.val().whosendid + item.val().whoreceivedid)

      }
    }) 
    setfreqList(arr);
      
  });

},[])


let handleFriendRequest = (frequest) =>{
  // console.log(frequest);
  set(push(ref(db, 'friendRequest')),{
      whosendid: data.uid,
      whosendemail: data.email,
      whosendName: data.displayName,
      whoreceivedid :frequest.id,
      whoreceivedemail :frequest.email,
      whoreceivedName :frequest.displayName,
  }).then(()=>{
    console.log("ok");
  })
  
}

  return (
    <div className="box">
      {

      }
     <CardHeading text="UserList"/>
          <div className='useritembox'>
              { usersList.length > 0 
                ? 
                  usersList.map((item,index)=>(
            
                <div key={index} className="useritem">
                    <div className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>{item.displayName}</h4>
                        <p>mern stack 2306</p>
                      </div>
                      { freqaList.includes(data.uid + item.id)  || freqaList.includes(item.id + data.uid)
                      ?
                       <button >Cancel</button>
                      :
                      <button onClick={()=>handleFriendRequest(item)}>Add</button>
                      
                      }
                    </div>
                </div>

              ))

              :
                <Alert severity="info">No suggest users found</Alert>
              
              }
               
               

          </div>
    </div>
  )
}

export default UserList