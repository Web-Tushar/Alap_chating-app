import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({variant,placeholder,className}) => {
  return (
     <TextField fullWidth className={className} id="standard-basic" label={placeholder} variant={variant} />
  )
}

export default InputBox