import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Images from '../../utilites/Images';
import InputBox from '../../utilites/InputBox';
import programming from '../../assets/images/programming.webp';
import Paragraph from '../../utilites/Paragraph';
import { Link } from 'react-router-dom';



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



const Loginheading = styled(Typography)({
  Color: '#03014C',
  fontSize: '33px',

})

const Registration = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
      <Grid item xs={6} style={{display:'flex',  alignItems:'center', justifyContent:'center'}}>
        <div>
            <Loginheading variant="h4">
                Get started with easily register
            </Loginheading> 
            
            <Paragraph styleing="subheading" text="Free register and you can enjoy it"/>
            
              <div className='inputbox'>
                  <InputBox variant="outlined" placeholder="enter 
                  your email"/>
                  <InputBox variant="outlined" placeholder="Full name"/>
                  <InputBox variant="outlined" placeholder="Enter your password"/>
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
                  

              <BootstrapButton variant="contained" disableRipple>
                Sign up
              </BootstrapButton>
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
  )
}

export default Registration