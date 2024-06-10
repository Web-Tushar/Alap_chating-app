import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
  // value: "helo"
}

export const activeMsgSlice = createSlice({
  name: 'activeMsg',
  initialState,
  reducers: {
//    logedinuser: " ami login"
     activeUser: (state, action) => {
     state.value = action.payload
   },
  },
})

export const { activeUser } = activeMsgSlice.actions

export default activeMsgSlice.reducer