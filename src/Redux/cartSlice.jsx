import { createSlice } from "@reduxjs/toolkit";

const localstoragedata=()=>{
    const saveddata=localStorage.getItem("cart");
   return saveddata? JSON.parse(saveddata):{}
}

export const cartSlice= createSlice({
    name:"cart",
    initialState:{
    items:localstoragedata()
    },
    reducers:{
        addProduct:(state,action)=>{
            const item= action.payload
            const id=item.card.info.id
            if(state.items[id]){
              state.items[id].quantity += 1
            }
            else{
                state.items[id]={...item,quantity:1}
            }
            localStorage.setItem("cart",JSON.stringify(state.items))
        },
        removeItems:(state,action)=>{
            const id=action.payload
            if(state.items[id]){
                if(state.items[id].quantity>1){
                    state.items[id].quantity-=1
                }
                else{
                    delete state.items[id]
                }
                localStorage.setItem("cart",JSON.stringify(state.items))
            }
        },
        clearCart:(state,action)=>{
            state.items={}
            localStorage.removeItem("cart")
        }

    }
}) 
export const {addProduct,removeItems,clearCart} = cartSlice.actions
export default cartSlice.reducer;