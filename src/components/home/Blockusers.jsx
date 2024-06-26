import React, { useEffect, useState } from 'react'
import CardHeading from '../../utilites/CardHeading'
import { Alert } from '@mui/material'
import { getDatabase, onValue, ref,push, remove, set } from 'firebase/database'
import { useSelector, useDispatch } from 'react-redux'; 


const Blockusers = () => {
const [blocKList,setblocKList] = useState([])
const db = getDatabase();
const data = useSelector((state) => state.logedinUserData.value) 

console.log(blocKList);


  useEffect(()=>{
    const usersRef = ref(db, 'block');
    onValue(usersRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      
      
      if(item.val().blockdecaid == data.uid || data.uid == item.val().blockkhaiceid){
         arr.push({...item.val(), id: item.key})

      }
    }) 
    setblocKList(arr);
     });
     },[])
         // unblock here ..

    const handleUnblock = (blocklist) => {
      remove(ref(db, 'block/' + blocklist.id)).then(()=> {
          set(push(ref(db, 'friends')), {
                blockkhaiceid: data.uid == blockinfo.senderid ? blockinfo.receiverid : blockinfo.senderid,
                blockkhaiceemail: data.uid == blockinfo.senderid ? blockinfo.receiveremail : blockinfo.senderemail,
                blockkhaicename: data.uid == blockinfo.senderid ? blockinfo.recivername : blockinfo.sendername,
                blockdecaid: data.uid == blockinfo.receiverid ? blockinfo.senderid : blockinfo.receiverid,
                blockdecaemail: data.uid == blockinfo.receiverid ? blockinfo.senderemail : blockinfo.receiveremail,
                blockdecaname: data.uid == blockinfo.receiverid ? blockinfo.sendername : blockinfo.recivername,
          })
      })
  }

  return (
    <div className="box">
     <CardHeading text="Block List "/>
          <div className='useritembox'>
            {


                blocKList.length > 0
              ?blocKList.map((item,index)=>(
                <div key={index} className="useritem">
                    <div  className='imgbox'></div>
                    <div className='userinfo'>
                      <div>
                        <h4>{ item.blockkhaiceid == data.uid 
                        ?
                        item.blockdecaname
                        :
                        item.blockkhaicename
                        
                          
                           }</h4>
                        <p>mern stack 2306</p>
                      </div>
                      <div>
                         <button onClick={()=>handleUnblock(item)}>Unblock</button>
                         
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

export default Blockusers