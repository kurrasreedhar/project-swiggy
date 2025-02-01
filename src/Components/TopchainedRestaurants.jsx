import { useEffect, useState } from "react";
import { useData } from "../Hooks/useData";
import {Restaurantcard} from "./Restaurantcard"
import { useRef } from 'react';
import { Link } from "react-router-dom";


export const TopchainedRestaurants=()=>{
  const values=useData()
   const [title,settitle]=useState("") 
    const sliderRef = useRef(null);
    const scrollAmount = 450
    const listdata=values?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
    useEffect(()=>{
        settitle(values?.data?.data?.cards[1]?.card?.card?.header?.title||"")
    },[values])
    
    
    return(<div className="Mheader">
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
            <h5 style={{fontWeight: "bold"}}>{title}</h5>
            <div >
              <i className="bi bi-arrow-left-circle icons" style={{ fontSize: '1.5rem', width: '50px', height: '50px' }}
              onClick={() => sliderRef.current && (sliderRef.current.scrollLeft -= scrollAmount)}></i>
               <i className="bi bi-arrow-right-circle"  style={{ fontSize: '1.5rem', width: '50px', height: '50px',marginLeft:'5px' }}
                onClick={() => sliderRef.current && (sliderRef.current.scrollLeft += scrollAmount)}></i>  
    </div>
        </div>
 <div  ref={sliderRef} style={{scrollBehavior:"smooth", transition:"0.4s",overflow:'hidden' }}>
<div style={{display:"flex",marginTop:"20px",gap:30}}>
{listdata.length>0? listdata.map((restaurant)=>
    <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id} className="Linkclass"><Restaurantcard restaurant={restaurant} /></Link>):"no items"}
</div>
</div>   
 </div>)
}