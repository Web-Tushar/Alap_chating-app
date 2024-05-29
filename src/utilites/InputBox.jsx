import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({variant,placeholder,className,id, name,type,value,onChange}) => {
  return (
     <TextField fullWidth className={className} name={name} type={type} id={id} label={placeholder} variant={variant}value={value} onChange={onChange}  />
  )
}

export default InputBox