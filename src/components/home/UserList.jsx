import React, { useEffect, useState } from 'react'
import './homepage.css'
import CardHeading from '../../utilites/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';


const UserList = () => {
  const db = getDatabase();
  const [usersList,setUsersList] = useState([ ])
  const data = useSelector((state) => state?.logedinUserData?.value) 
  


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


let handleFriendRequest = (frequest) =>{
  // console.log(frequest);
  set(push(ref(db, 'friendRequest')),{
      whosendid: data.uid,
      whosendemail: data.email,
      whosendName: data.displayName,
      whoreceivedid :frequest.id,
      whoreceivedemail :frequest.email,
      whoreceivedNane :frequest.displayName,
  }).then(()=>{
    console.log("ok");
  })
  
}

  return (
    <div className="box">
     <CardHeading text="UserList"/>
          <div className='useritembox'>
              {usersList.map((item,index)=>(
                <div key={index} className="useritem">
                    <div className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>{item.displayName}</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <button onClick={()=>handleFriendRequest(item)}>Add</button>
                    </div>
                </div>

              ))
              
              }
               
               

          </div>
    </div>
  )
}

export default UserList