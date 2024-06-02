import React from 'react'
import "./layout.css"
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {logedinUser} from '../../Slice/authSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const data = useSelector((state) => state?.logedinUserData?.value) 
  // console.log(data);
  const dispatch = useDispatch()
  const handleloginbtn =()=>{
        signOut(auth).then(() => {
        navigate("/")
        localStorage.removeItem("loggedUser");
        dispatch(logedinUser(null));
      }).catch((error) => {
        // An error happened.
      });
  }

  return (
    
    <div className='sidebarmain'>
      <div className='sideinner'>
        <div className='profileimg'>
            <Avatar
              alt={data.displayName}
              // alt="tushar"

              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
            
            
                 
            <Skeleton style={{width:"70px", margin:"0 auto", height: "10px" , color:"red"}}/>
                 
                <p style={{
                  textAlign:'center',
                  color:"white", 
                  padding:"10px 0"}}>
                    {data?.displayName}
                  </p>
                
                  
            
            
        
        </div>
        <div style={{width:"100%"}} className='navlinkbar'>
          
          

          <ul className='nsidebarlist'>

            <li>
                <NavLink  to= "/home">
                  <IoMdHome />
                </NavLink>
            </li>
            <li>
                <NavLink to= "/message">
                  <AiFillMessage />
                </NavLink>
            </li>
            <li>
                <NavLink to= "/notification">
                  <FaRegBell />
                </NavLink>
            </li>
            <li>
                <NavLink to= "/setting">
                  <IoSettingsOutline />
                </NavLink>
            </li>
          </ul>

        </div>
        <div style={{}} className='logout'>
            <button onClick={handleloginbtn} className='logbtn'>Log-out</button>
        </div>
      </div>

       
    </div>
  )
}

export default Sidebar