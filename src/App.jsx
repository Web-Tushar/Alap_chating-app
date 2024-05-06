import Button from '@mui/material/Button';
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
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route element={<Rootlayout/>}>
            < Route  path='/Home' element={<Home/>}/>                                        
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
