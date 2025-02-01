import { useState,useEffect } from "react";
import { useData } from "../Hooks/useData";
import { Restaurantcard } from "./Restaurantcard";
import { Link } from "react-router-dom";

export const Restaurantsonlinedelivery=()=>{
    const sData=useData()
    const[Filterrestaurants,setFilterrestaurants]= useState([])
    const[title,settitle]= useState("")
    const[active,setactive]=useState(null)
    const [values,setvalues]=useState([])
    console.log(title)

    useEffect(()=>{
        setFilterrestaurants(sData?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        settitle(sData?.data?.data?.cards[2]?.card?.card?.title)
        setvalues(sData?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
    },[sData])
   

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
             return  costvalue>=300 && costvalue<600})
                    setvalues( Filtereddata)
                    setactive(filtertype) 
                }
 }
 
return(<div className="Mheader">
     <div>
        
        <h5 style={{fontWeight:"bold" }}>{title}</h5>
        <div >
            <div style={{marginTop:"20px" }}>
      <button style={{marginBottom:window.innerWidth>768? "0px":"4px"}} onClick={()=>filterfcn("rating")}
      className={active==="rating"? "btnclass" :""}
       >Ratings 4+</button>

    <button  style={{marginLeft:window.innerWidth>768? "20px":"60px" }} onClick={()=>filterfcn( "fast delivery")}
     className={active=== "fast delivery"? "btnclass" :""}
   >Fast Delivery</button>

    <button   onClick={()=>filterfcn("less than 300")}
    className={active=== "less than 300"? "btnclass" :""}
    >Less than Rs300</button>

        <button  onClick={()=>filterfcn("300 to 600")}
         className={active==="300 to 600"? "btnclass" :""}
        > Rs300 to Rs600</button>
         </div>

        <div style={{display:"flex", flexWrap:"wrap", marginTop:"30px",gap:30}}>
            { values.length>0 ? values.map((restaurant)=>
            <Link className="Linkclass" to={"/restaurant/"+restaurant.info.id} key={restaurant.info.name}><Restaurantcard restaurant={restaurant} /></Link>) : "no items"}
        </div>
        </div>
        
     </div>

</div>
    )
}