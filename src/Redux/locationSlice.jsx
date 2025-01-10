
import { createSlice } from "@reduxjs/toolkit";

export const LocationSlice=createSlice({
    name:"location",
    initialState:{
        location:{
            Latitude:17.435081524922943,
            Longitude:78.4286281093955 
        },
        address:{
               mainadd:"krishnanagar",
               secondadd:"hyderabad ,Telangana "
             }

    },
    reducers:{
        addLocation:(state,action)=>{
          state.location.Latitude=action.payload.Latitude;
          state.location.Longitude=action.payload.Longitude
          },
          addAddress:(state,action)=>{
            state.address.mainadd=action.payload.mainadd;
            state.address.secondadd=action.payload.secondadd;
           },}
})
export const {addLocation,addAddress}=LocationSlice.actions;
export default LocationSlice.reducer;