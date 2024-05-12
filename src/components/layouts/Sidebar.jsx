import React from 'react'
import "./layout.css"
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className='sidebarmain'>
      <div className='sideinner'>
        <div className='profileimg'>
            <Avatar
              alt="Tushar"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
        </div>
        <div style={{}} className='navlinkbar'>
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
            <button className='logbtn'>Log-out</button>
        </div>
      </div>

       
    </div>
  )
}

export default Sidebar