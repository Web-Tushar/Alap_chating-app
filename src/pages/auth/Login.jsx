import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Images from '../../utilites/Images';
import LoginwithGoogle from '../../assets/images/Google(1).webp';
import programming from '../../assets/images/programming.webp';

import "./auth.css";
import InputBox from '../../utilites/InputBox';
import { Link } from 'react-router-dom';
// import { red } from '@mui/material/colors';


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



const Login = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
      <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div>
            <Loginheading variant="h4">
                Login to your account!
            </Loginheading> 
            <Images source={LoginwithGoogle} alt="google" className="LoginwithGoogle"/>
            
              <div className='inputbox'>
                  <InputBox variant="standard" placeholder="enter your email"/>
                  <InputBox variant="standard" placeholder="Enter your password"/>
              </div>
              <BootstrapButton variant="contained" disableRipple>
                  Login to Continue
              </BootstrapButton>
              <div style={{marginTop:"35px"}}>
                <span style={{color: "#03014C", 
                  fontSize:"13.338px", 
                  fontWeight: "400"}} >
                  Don’t have an account ?
                <Link to="/Registration" style={{color:"#EA6C00"}} >Sign up</Link>
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
  )
}

export default Login

      

        