import React from 'react'
import UserList from '../../components/home/UserList'
import Friendrequest from '../../components/home/Friendrequest'
import Friends from '../../components/home/Friends'

const Home = () => {
  return (
    <>
    <div style={{display:"flex",alignItems:"center",marginTop:"30px",flexWrap:"wrap", gap:"25px"}}>
        <div style={{}}>
          <UserList/>
        </div>
        <div>
          <Friendrequest/>
        </div>
        <div>
          <Friends/>
        </div>

    </div>
    </>
  )
}

export default Home