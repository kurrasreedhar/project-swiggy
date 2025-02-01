import  userReducer  from "../Redux/userSlice";
import locationReducer  from "../Redux/LocationSlice"
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/cartSlice"

const appStore=configureStore({
 reducer:{   location:locationReducer,
            user:userReducer,
            cart:cartReducer
             
 }
})

export default appStore;