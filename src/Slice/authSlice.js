import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("loggeduser") ?  JSON.parse(localStorage.getItem("loggeduser")) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
//    logedinuser: " ami login"
   logedinuser: (state, action) => {
     state.value += action.payload
   },
  },
})

export const {  } = authSlice.actions

export default authSlice.reducer