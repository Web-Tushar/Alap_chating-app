import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';


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
        <Loginheading variant="h4">
            Login to your account!
         </Loginheading> 
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <TextField id="standard-basic" label="Standard" variant="standard" />
      </Grid>
      <Grid item xs={6}>
        <div style={{backgroundColor:"red", width:"100%", height:"100vh"}}></div>
      </Grid>
    </Grid>
  </Box>
  )
}

export default Login

      

        