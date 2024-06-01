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
import { useSelector, useDispatch } from 'react-redux'
import { CgEnter } from 'react-icons/cg';
// import { logEvent } from 'firebase/analytics';


const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const data = useSelector((state) => state.logedinUserData.value)
  console.log(data.displayName);
 
  // signOut(auth).then(() => {
  //   // Sign-out successful.
  // }).catch((error) => {
  //   // An error happened.
  // });

  const handleloginbtn =()=>{
        signOut(auth).then(() => {
        navigate("/")
        localStorage.removeItem("")
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
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
        </div>
        <div style={{}} className='navlinkbar'>
          <p style={{
            textAlign:'center',
            color:"white", 
            padding:"10px 0"}}>{data.displayName}</p>

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