import { useRef } from 'react';
import { CDNI } from '../Utils/Constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

export const Whatsonyourmind=()=>{
const[values,setvalues]=useState([])
const sliderRef = useRef(null);
const scrollAmount = 450
    const location=useSelector(store=>store.location)
let lat=location.location.Latitude;
let lng=location.location.Longitude
const Swiggy_api = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const getdata=async()=>{
        if(!lat && !lng) return
        try{
            const res= await axios.get(Swiggy_api)
            setvalues(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info)
        
        }
        catch(error){
            console.error("error fetching data through swiggy api",error) 
        }
     }
    useEffect(()=>{
        getdata()
    },[lat,lng])


    return(<div  >  
    <div className='whatsinyourmind'>
        <h5 style={{fontWeight:"bold"}}>What's on your mind?</h5>
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
        <div  ref={sliderRef} style={{scrollBehavior:"smooth", transition:"0.4s",overflow:'hidden', marginRight:'50px',  }}>
            <div className='whatsinyourmindd'>
    { values.length?  values.map((item)=>{
    return <img src={CDNI + item?.imageId} key={item.id} />}): <p>no items</p>}
    </div>
    </div>
 </div>)
}