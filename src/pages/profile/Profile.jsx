import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./profile.css"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const { id } = useParams();
  const db = getDatabase();
  const [profileusers,setprofileusers] = useState([]);
  const data = useSelector((state) => state.logedinUserData.value) 


  useEffect(()=>{
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
    let arr= []
    snapshot.forEach((item)=>{
      
      if(item.key == id){
        arr.push({...item.val(), id: item.key})
        }
      }) 
      setprofileusers (arr);
      });
    },[]) 
    console.log(profileusers);
  return (
  <>
  <div>
     <div className='coverphoto'></div>
     <div style={{marginTop:"10px", display:"flex",gap:"30px", alignItems:"center",}}>
      <div className='profilephoto'></div>
      <div className='profileinfo'>
        <h2>{profileusers[0]?.displayName}</h2>
        <p>web-developer</p>
      </div>
     </div>
  </div>
  </>
    // <div>Profile id: {id}</div>
  )
}

export default Profile