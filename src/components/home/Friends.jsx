import React, { useEffect, useState } from 'react';
import CardHeading from '../../utilites/CardHeading';
import { Alert } from '@mui/material';
import { getDatabase, ref, onValue,} from "firebase/database";
import { useSelector } from 'react-redux'; 

const Friends = () => {

  const [friendsList, setFriendsList] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.logedinUserData.value) 

  useEffect(()=>{
    const usersRef = ref(db, 'friends');
    onValue(usersRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      
      arr.push({...item.val(), id: item.key})
      // if(item.key != data.uid){

      // }
    }) 
     setFriendsList(arr);
    });
    },[])
    console.log(friendsList);

  return (
    
     <div className="box">
     <CardHeading text="Friend List "/>
          <div className='useritembox'>
                <div className="useritem">
                    <div className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>.khlouho</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <div>
                         <button>block</button>
                         
                      </div>
                    </div>
                </div>  
                <Alert severity="info"> Friends Found</Alert>                 
          </div>
    </div>
  )
}

export default Friends