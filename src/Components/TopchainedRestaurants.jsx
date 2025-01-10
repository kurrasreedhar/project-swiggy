import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {Restaurantcard} from "./Restaurantcard"
import { useRef } from 'react';
import { Link } from "react-router-dom";


export const TopchainedRestaurants=()=>{
    const location=useSelector(store=>store.location.location)
    const [values,setvalues]=useState([]);
    const [title,settitle]=useState("")
    const lat=location.Latitude;
    const lng=location.Longitude
    const sliderRef = useRef(null);
    const scrollAmount = 450
    const Swiggy_api = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;    const Getdata= async()=>{
        try{
     const res= await axios.get(Swiggy_api)
     setvalues(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
     settitle(res.data.data.cards[1].card.card.header.title)
    }
        catch(error){
            console.log("Error while fetching data",error)
        }
    }
    useEffect(()=>{
    Getdata()
    },[lat,lng])

    return(<div style={{marginLeft:"60px",marginRight:"60px",marginTop:"40px"}}>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
            <h5 style={{fontWeight:"bold"}}>{title}</h5>
            <div className='whatsinyourmindi'>
              <i className="bi bi-arrow-left-circle"  style={{ fontSize: '1.5rem', width: '50px', height: '50px' }}
              onClick={() => {
                const container = sliderRef.current;
                container.scrollLeft -= scrollAmount; // Scroll right by the specified amount
              }}></i>
               <i className="bi bi-arrow-right-circle"  style={{ fontSize: '1.5rem', width: '50px', height: '50px',marginLeft:'5px' }}
               onClick={() => {
                const container = sliderRef.current;
                container.scrollLeft += scrollAmount; // Scroll right by the specified amount
              }}></i>  
    </div>
        </div>
 <div  ref={sliderRef} style={{scrollBehavior:"smooth", transition:"0.4s",overflow:'hidden' }}>
<div style={{display:"flex",marginTop:"20px",gap:30}}>
{values.map((restaurant)=>
    <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.name} className="Linkclass"><Restaurantcard restaurant={restaurant} /></Link>)}
</div>
</div>   
 </div>)
}