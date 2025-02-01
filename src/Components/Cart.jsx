import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../Redux/cartSlice";
import { Itemlist } from "./Itemlist";
import {Navbar} from "./Navbar"

export const Cart=()=>{
const dispatch=useDispatch();
const storeItems= useSelector(store=>store.cart.items)
const arrayItems= Object.values(storeItems)

    const removeCart=()=>{
       dispatch(clearCart())
    }
    return(<div>
      <Navbar/>
      <div style={{paddingTop:"90px"}}>
      <button style={{color:"red",marginBottom:"30px"}} onClick={removeCart}>clearCart</button>
      <div style={{width:"65%",margin:"5px auto"}}>
      <Itemlist data={arrayItems}/>
      </div>
     
      </div>
    </div>)
}