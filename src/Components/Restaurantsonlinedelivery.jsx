import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Restaurantcard } from "./Restaurantcard";
import { Link } from "react-router-dom";

export const Restaurantsonlinedelivery=()=>{
    const [values,setvalues]=useState([])
    const[Filterrestaurants,setFilterrestaurants]= useState([])
    const[title,settitle]= useState("")
    const location=useSelector(store=>store.location.location)
    const lat=location.Latitude;
    const lng=location.Longitude;
  
    const[active,setactive]=useState(null)

    const Swiggy_api = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;   const Getdata=async()=>{
    try{
    const res=await axios.get(Swiggy_api)
    setvalues(res.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants)
    setFilterrestaurants(res.data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants)
    settitle(res.data.data.cards[2].card.card.title)}
    catch(error){
        console.log("error fetching data",error)
    }
 }

   useEffect(()=>{
     Getdata()
   },[lat,lng])

   const filterfcn=(filtertype)=>{

    if(active===filtertype){
        setvalues(Filterrestaurants)
        setactive(null)
        
    }
    else if(filtertype==="rating"){
        const Filtereddata= Filterrestaurants.filter((restaurant)=>restaurant.info.avgRating>4.2);
        setvalues( Filtereddata )
        setactive(filtertype)
        }

        else if(filtertype=== "fast delivery"){
            const Filtereddata= Filterrestaurants.filter((restaurant)=>restaurant.info.sla.deliveryTime<30);
         setvalues( Filtereddata)
         setactive(filtertype)
                }

         else if(filtertype==="less than 300"){
        const Filtereddata= Filterrestaurants.filter((restaurant)=>{
         const cost=(restaurant.info.costForTwo)
            const costvalue= parseInt( cost.split(" ")[0].replace("₹",""))
                return costvalue<300})
                setvalues( Filtereddata)
                setactive(filtertype)  }  
                
        else if(filtertype==="300 to 600"){
        const Filtereddata= Filterrestaurants.filter((restaurant)=>{ 
            const cost=(restaurant.info.costForTwo)
            const costvalue= parseInt( cost.split(" ")[0].replace("₹",""))
             return  costvalue>300 && costvalue<600})
                    setvalues( Filtereddata)
                    setactive(filtertype) 
                }
 }
 
return(<div style={{marginLeft:"60px",marginRight:"60px",marginTop:"40px"}}>
     <div>
        <h5 style={{fontWeight:"bold" }}>{title}</h5>
        <div >
            <div style={{marginTop:"20px"}}>
      <button onClick={()=>filterfcn("rating")}
      className={active==="rating"? "btnclass" :""}
       >Ratings 4+</button>

    <button onClick={()=>filterfcn( "fast delivery")}
     className={active=== "fast delivery"? "btnclass" :""}
   >Fast Delivery</button>

    <button  onClick={()=>filterfcn("less than 300")}
    className={active=== "less than 300"? "btnclass" :""}
    >Less than Rs300</button>

        <button  onClick={()=>filterfcn("300 to 600")}
         className={active==="300 to 600"? "btnclass" :""}
        > Rs300 to Rs600</button>
         </div>

        <div style={{display:"flex", flexWrap:"wrap", marginTop:"30px",gap:30}}>
            {values.map((restaurant)=>
            <Link className="Linkclass" to={"/restaurant/"+restaurant.info.id} key={restaurant.info.name}><Restaurantcard restaurant={restaurant} /></Link>)}
        </div>
        </div>
        
     </div>

</div>
    )
}