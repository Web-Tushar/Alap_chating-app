import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("loggedUser") ?  JSON.parse(localStorage.getItem("loggedUser")) : null,
  // value: "helo"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
//    logedinuser: " ami login"
   logedinUser: (state, action) => {
     state.value = action.payload
   },
  },
})

export const { logedinUser } = authSlice.actions

export default authSlice.reducer