import React from 'react'
import * as Yup from 'yup';


const emailregex =     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const loginvalidation = Yup.object({

     email: Yup.string()
           .email('Invalid email address')
           .matches(emailregex, 'regex check korlam')
           .required('pleas enter your email'), 
    password: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .min(8, 'Must be 8 characters deta hobe ')
            .required('pleas enter your password'), 

   })


export default loginvalidation