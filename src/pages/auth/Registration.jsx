import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Images from '../../utilites/Images';
import InputBox from '../../utilites/InputBox';
import programming from '../../assets/images/programming.webp';
import Paragraph from '../../utilites/Paragraph';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import RegistrationValidation from '../../validation/RegistrationValidation';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile,signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";




const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '20px',
  padding: '26px 122.77px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  marginTop: '30px'
  
});





const Loginheading = styled(Typography)({
  Color: '#03014C',
  fontSize: '33px',

})
// function start here===========//

const Registration = () => {

  const db = getDatabase();
  const auth = getAuth();

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();




  const initialValues ={
    fullName: '',
    email: '',
    password: '',
  }


  
  const formik = useFormik({
  initialValues: initialValues, 
  validationSchema: RegistrationValidation,

  
  
  onSubmit: (values,actions )=> {
    // console.log(values);
    setLoading(true)
    actions.resetForm();
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: values.fullName,
          photoURL: "https://example.com/jane-q-user/profile.jpg" 
        }).then(() => {
           console.log("updateProfile");
            set(ref(db, 'users/' + userCredential.user.uid), {
              displayName: userCredential.user.displayName,
              email: userCredential.user.email,
              profile_picture : userCredential.user.photoURL,
            }).then(()=>{
              //  console.log("real time database creat hoyece");
              
                toast("reigistration Successfull");
                setLoading(false)
                setTimeout(() => {
                  navigate("/")
                }, 2000);
                  
            })
        }).catch((error) => {
          setLoading(false)
          console.log("profile a jhamela ace ");

        });
          // console.log("mail sent hoyce")
      });
      
    })
    .catch((error) => {
      setLoading(false)

      // console.log(error);
      toast(" email already in use");

      // const errorCode = error.code;
      // const errorMessage = error.message;
    });

    // alert(JSON.stringify(values, null, 2));
  },
  
  });

  


  
  return (
    
  <>
  { loading &&
      <div className='loading_wrapper'>
          <Puff
          visible={true}
          height="320" 
          width="320"
          color="#fff"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      </div>

  
  }

    <Box sx={{ flexGrow: 1 }}> 

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            // transition: Bounce,x`
         />

    <Grid container spacing={0}>
      <Grid item xs={6} style={{display:'flex',  alignItems:'center', justifyContent:'center'}}>
        <div>
            <Loginheading variant="h4">
                Get started with easily register
            </Loginheading> 
            
            <Paragraph styleing="subheading" text="Free register and you can enjoy it"/>

              <form action="" onSubmit={formik.handleSubmit}>
                  <div className='inputbox'>
                  <div>
                      
                      <InputBox 
                            type='text' 
                            name='fullName' 
                            id='fullName' 
                            value={formik.values.fullName} 
                            onChange={formik.handleChange} 
                            variant="outlined" 
                            placeholder="Full name"/>
                            {formik.touched.fullName && formik.errors.fullName ? (
                           <div style={{color:"red"}}>{formik.errors.fullName}</div>
                           ) : null}  
                  </div>
                    <div>
                        <InputBox 
                            type='email' 
                            name='email' 
                            value={formik.values.email} 
                            id='email' 
                            onChange={formik.handleChange} 
                            variant="outlined" 
                            placeholder="enter your email"/>
                            {formik.touched.email && formik.errors.email ? (
                          <div style={{color:"red"}}>{formik.errors.email}</div>
                        ) : null}
                    </div>
                  
                    <div>

                    </div>
                        
                        <InputBox 
                             type='password' 
                             name='password' 
                             id='password' 
                             value={formik.values.password} 
                             onChange={formik.handleChange} 
                             variant="outlined" 
                             placeholder="Enter your password"/> 
                             {formik.touched.password && formik.errors.password ? (
                             <div style={{color:"red"}}>{formik.errors.password}</div>
                             ) : null} 

                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                              
                          
                          </RadioGroup>
                      </FormControl>
                  </div>
                  <BootstrapButton type='submit' variant="contained" disableRipple>
                    Sign up
                  </BootstrapButton>

              </form>
              <div style={{marginTop:"35px"}}>
                <span 
                  style={{color: "#03014C", 
                  fontSize:"13.338px", 
                  fontWeight: "400"}}>
                    Already  have an account ? 
                    <Link to="/" style={{color:"#EA6C00"}} >Sign in</Link>
                </span> 

              </div>
        </div>




      </Grid>
      <Grid item xs={6}>
         <div style={{width:"100%", height:"100vh"}}>
          <Images source={programming} alt="programming" className="Loginprogramming"/>
        
        </div> 
      </Grid>
    </Grid>
    </Box>
  </>
  )
}

export default Registration