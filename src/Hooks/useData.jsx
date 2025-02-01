import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const useData=()=>{
   const location=useSelector(store=>store?.location?.location)
   const [response,setresponse]=useState(null)
    const lat=location?.Latitude;
    const lng=location?.Longitude
  
    const Swiggy_api =`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    const Mobile_API= `https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`   
    const getData= async()=>{
        let API = window.innerWidth > 768 ? Swiggy_api : Mobile_API;
        try{
     const res= await axios.get(API)
        setresponse(res)}
        catch(error){
            console.log("Error while fetching data",error)} }
            
    useEffect(()=>{
        if(lat && lng)
        getData();
    },[lat,lng])
    return response;
}