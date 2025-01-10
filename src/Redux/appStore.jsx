import  userReducer  from "../Redux/userSlice";
import locationReducer  from "../Redux/LocationSlice"
import { configureStore } from "@reduxjs/toolkit";

const appStore=configureStore({
 reducer:{   location:locationReducer,
            user:userReducer
             
 }
})

export default appStore;