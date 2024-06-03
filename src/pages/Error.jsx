import React from 'react'
import Images from '../utilites/Images'
import errorimg from '../../src/assets/images/405.png'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
     <div>
        <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
          <Images  source={errorimg}/>
        </div>
         <div style={{ display:"flex",alignItems:"center", justifyContent:"center" }} >

              <Link style={{background:"blue",color:"white", fontSize:"20px", fontWeight:"600", borderRadius:"15px", padding:"20px", textAlign:"center" }}  to="/">Back to Home</Link> 
         </div>

     </div>
  )
}

export default Error