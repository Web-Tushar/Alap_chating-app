import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,RouterProvider,
} from "react-router-dom";
import Login from './pages/auth/Login';
import Error from './pages/Error';
import Rootlayout from './components/layouts/Rootlayout';
import Registration from './pages/auth/Registration';
import Home from './pages/home/Home';
import Notification from './pages/notification/Notification';
import Setting from './pages/setting/Setting';
import Message from './pages/message/Message';
import IsLogedinuser from './privatRoute/IsLogedinuser';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<IsLogedinuser/>}>
            <Route element={<Rootlayout/>}>
                < Route  path='/Home' element={<Home/>}/>                                        
                < Route  path='/Notification' element={<Notification/>}/>                                        
                < Route  path='/message' element={<Message/>}/>                                        
                < Route  path='/setting' element={<Setting/>}/>                                        
            </Route>

      </Route>
            {/* <Route path='/Registration' element={<Registration/>}   />  */}
            <Route path='*' element={<Error/>}/> 
            <Route path="/" element={<Login  />}/>
            <Route path="/Registration" element={<Registration/>}/>

      </Route>
    
    
  )
);
function App() {


  return (
    <>  <RouterProvider
            router={router}
  />
    </>
  )
}

export default App
