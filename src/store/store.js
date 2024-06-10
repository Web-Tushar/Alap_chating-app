import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Slice/authSlice'
import activeMsgSlice from '../Slice/activeMsgSlice'

export const store = configureStore({
  reducer: {
       logedinUserData: authSlice,
       activeChatUser: activeMsgSlice,
  },
})