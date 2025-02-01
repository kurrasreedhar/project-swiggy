import {Navbar} from "./Navbar"
import { useData } from "../Hooks/useData";
import {Restaurantcard} from "./Restaurantcard"
import { Link } from "react-router-dom";
import { useState } from "react";


export const Search=()=>{
    const [name,setName]=useState("")
     const values=useData();
     const listdata=values?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||[]
     const filterdata= listdata.filter(restaurant=>restaurant.info.name.toLowerCase().includes(name.toLowerCase()))
    return <div>
        <Navbar/>
        <div style={{paddingTop:"90px", display:"flex",justifyContent:"center"}}>
            <input type="text" placeholder="Search for restaurants" onChange={(e)=>setName(e.target.value)}
             style={{width:"800px",borderRadius:"10px" , padding:"10px 10px" ,margin:"10px" }}/>
            </div>
            <div style={{display:"flex", flexWrap:"wrap",gap:40 ,overflow:"hidden" ,margin:"40px 80px"}}>
            {filterdata.map((restaurant)=>
    <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id} className="Linkclass"><Restaurantcard restaurant={restaurant} /></Link>)}
            </div>
        
    </div>
}