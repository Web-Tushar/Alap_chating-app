import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Images from '../../utilites/Images';
import LoginwithGoogle from '../../assets/images/Google(1).webp';
import programming from '../../assets/images/programming.webp';

import "./auth.css";
import InputBox from '../../utilites/InputBox';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import loginvalidation from '../../validation/LoginValidation';
import Modal from '@mui/material/Modal';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import { FaSleigh } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { logedinUser } from '../../Slice/authSlice';


const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '20px',
  padding: '26px 122.77px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  marginTop: '55px'
  

  


});




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Loginheading = styled(Typography)({
      Color:'#03014C',
      fontSize: '33px',
  
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Login = () => {

  const auth = getAuth();
  const navigate = useNavigate();

  const data = useSelector((state) => state.logedinUserData.value) 
// console.log(data);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  const [loader, setLoader] = useState  (false)
  const [forgetemail,setforgetEmail] = useState("")
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch()
  


  const initialValues ={
      email: '',
      password: '',
  }


  const formik = useFormik({
    initialValues: initialValues, 
    validationSchema: loginvalidation,
    
    onSubmit: (values,actions )=> {
      // console.log(values);
      setLoader(true)
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user.emailVerified){
            localStorage.setItem("loggedUser",JSON.stringify(user)) 
            dispatch(logedinUser(user))
            toast("email varified")
            // actions.resetForm();
            navigate("/home")
            setLoader(false)

          }else{
            toast("pleas your email varify")
            setLoader(false)
            signOut(auth).then(() => {
              
            }).catch((error) => {
              // An error happened.
            });
          }

          console.log(user.emailVerified);
          

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error);
            toast("invalide Credential!");
            setTimeout(() => {
              setLoader(false)
              
            }, 2000);

        });   
      // alert(JSON.stringify(values, null, 2));
    },

  });
  let handleForgetPass = ()=>{
      console.log(forgetemail);
      sendPasswordResetEmail(auth, forgetemail)
      .then(() => {
      toast("forget email sent hoyce")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  useEffect(()=>{
if(data){
  navigate("/home")
}else{
  navigate("/")
}
  },[])
  
  let handleGoogleLogin =()=>{

    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if(user.emailVerified){
        localStorage.setItem("loggedUser",JSON.stringify(user)) 
        dispatch(logedinUser(user))
        toast("email varified")
        // actions.resetForm();
        navigate("/home")
        setLoader(false)

      }else{
        toast("pleas your email varify")
        setLoader(false)
        signOut(auth).then(() => {
          
        }).catch((error) => {
          // An error happened.
        });
      }
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />
    <Grid container spacing={0}>
      <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div>
            <Loginheading variant="h4">
                Login to your account!
            </Loginheading> 
            <Images onClick={handleGoogleLogin} source={LoginwithGoogle} alt="google" className="LoginwithGoogle"/>
            
            <form onSubmit={formik.handleSubmit} action="">
                <div className='inputbox'>
                  <div>
                      <InputBox 
                          type='email' 
                          name='email' 
                          value={formik.values.email} 
                          id='email' 
                          onChange={formik.handleChange} 
                          variant="standard" 
                          placeholder="enter your email"/>
                          {formik.touched.email && formik.errors.email ? (
                          <div style={{color:"red"}}>{formik.errors.email}</div>
                        ) : null}
                  </div>
                        <div>
                          <InputBox 
                          type="password"
                          name="password" 
                          value={formik.values.password} 
                          id="password" 
                          onChange={formik.handleChange}  
                          variant="standard" 
                          placeholder="Enter your password"/>
                          {formik.touched.password && formik.errors.password ? (
                          <div style={{color:"red"}}>{formik.errors.password}</div>
                        ) : null}
                        </div>
                </div>
                <BootstrapButton disabled={loader} type='submit' variant="contained" disableRipple>
                    
                    { 
                    
                      loader ?
                        <ThreeDots
                         visible={true}
                         height="40"
                         width="80"
                         color="#fff"
                         radius="9"
                         ariaLabel="three-dots-loading"
                         wrapperStyle={{}}
                         wrapperClass=""
                         />
                         :
                      "Login to Continue"
                    }
                       


                </BootstrapButton>

            </form> 
              <div style={{marginTop:"35px"}}>
                <span style={{color: "#03014C", 
                  fontSize:"13.338px", 
                  fontWeight: "400"}} >
                  Don’t have an account ?
                <Link to="/Registration" style={{color:"#EA6C00"}} >Sign up</Link>
                </span> 
                <p onClick={handleOpen} >forget password?</p>

              </div>
        </div>




      </Grid>
      <Grid item xs={6}>
         <div style={{width:"100%", height:"100vh"}}>
          <Images source={programming} alt="programming" className="Loginprogramming"/>
        
        </div> 
      </Grid>
    </Grid>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2 style={{textAlign:"center", marginBottom:"15px" }}>Forget your password</h2>
            <div>
                <InputBox 
                    type='email' 
                    name='forgetemail' 
                    // value={formik.values.email} 
                    id='forgetemail' 
                    // onChange={formik.handleChange} 
                    variant="outlined" 
                    placeholder="forget your email"
                    styleing="emailbox"
                    onChange={(e)=>setforgetEmail(e.target.value)}

                    />
                    
              </div>
              <BootstrapButton  onClick={handleForgetPass} style={{textAlign:"center"}} type='submit' variant="contained" disableRipple>
                
                   Reset password
                </BootstrapButton>
                <button onClick={()=>setOpen(false)}>close</button>
        </Box>
      </Modal>
  </Box>
  )
}

export default Login

      

        