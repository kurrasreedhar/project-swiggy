import axios from "axios"
import {  useState} from "react"
import {addLocation} from "../Redux/LocationSlice"
import { useDispatch } from "react-redux";
import { addAddress } from "../Redux/LocationSlice";



export const Inputlocationdetails=()=>{
   const dispatch=useDispatch()
const[searchResult,setsearchResult]=useState({})

   const citydata=async(val)=>{
    if(!val) return
    const result= await axios.get("https://www.swiggy.com/dapi/misc/place-autocomplete?input="+val)
    setsearchResult(result.data)
    console.log(searchResult.data)
     }
     const Getlatlong=async(id,mainadd,secondadd)=>{
    if(!id) return
    const res= await axios.get("https://www.swiggy.com/dapi/misc/address-recommend?place_id="+id)
       let location=res.data.data[0].geometry.location
           dispatch(addLocation({Latitude:location.lat,Longitude:location.lng}))
           dispatch(addAddress({mainadd:mainadd,secondadd:secondadd}))
     }

    return(<div>
      <label style={{fontWeight:"bold",marginLeft:"30px"}}>Search </label>
 <input type="text" placeholder="Streetname , Area"
  style={{marginLeft:"10px",padding:"4px",borderRadius:"5px" ,border:"2px solid grey",outline:"none",marginTop:"30px"}} onChange={(e)=>citydata(e.target.value)}/>
 <ul> {searchResult?.data?.map((item,index)=>
   <li  onClick={
 ()=>Getlatlong(item.place_id,item.structured_formatting?.main_text,item.structured_formatting.secondary_text)}
    style={{cursor:"pointer",marginLeft:"80px",marginTop:"20px", listStyle:"none"}}
    
   key={index}> <i style={{marginRight:"5px"}} className="bi bi-geo-alt"></i>{item.structured_formatting?.main_text}<p>{item.structured_formatting.secondary_text}</p></li>
    )}</ul>
    </div>)
}