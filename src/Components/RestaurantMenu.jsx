import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Accordian} from "./Accordian"

export const RestaurantMenu = () => {
  const location = useSelector((store) => store.location.location);
  const lat = location?.Latitude;
  const lng = location?.Longitude;
  const [accordiandata,setaccordiandata]=useState([])
  const [values, setValues] = useState({});
 
  const { resid } = useParams();
 const REID =  `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resid}&catalog_qa=undefined&submitAction=ENTER`
  const mobile_Api=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resid}&submitAction=ENTER`

  const Getdata = async () => {
    try {
     let api= window.innerWidth > 768 ? REID:mobile_Api;
     let val= window.innerWidth > 768 ? 4 : 5;
      const result = await axios.get(api);
      setValues(result?.data?.data?.cards[2]?.card?.card);
      const data = result?.data?.data?.cards[val]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      
        const filtereddata = Array.isArray(data)? data.filter((item) => {
          return (
            item.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
            item.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
          );} ):[]
          setaccordiandata(filtereddata)
          
} catch (error) {
      console.error("Error fetching data:", error);
    } 
  };

  useEffect(() => {
   Getdata()
  }, [lat, lng])

  // Destructure restaurant info
  const { areaName="", avgRating="", costForTwo=0, cuisines=[],sla={deliveryTime:"",maxDeliveryTime:"",minDeliveryTime:""} , name="",totalRatingsString=""} = values?.info ||{}
   let deliveryTime2=sla.minDeliveryTime +" - "+sla.maxDeliveryTime
  return (
    <div style={{paddingTop:"60px"}}>

  <h2 style={{color:"black",marginTop:"40px",textAlign:"center"}}>{name}</h2>

       <div  style={{width: window.innerWidth > 768? "625px":"400px",fontWeight:"bold",height:"140px",color:"grey",border:"1.5px solid grey",boxShadow:"0 10px 8px rgba(0, 0, 0, 0.1)",margin:"30px auto" ,borderRadius:"10px",paddingTop:"5px",paddingLeft:"25px"}}>
       
       <p style={{color:"black",margin:"5px"}}><i className="bi bi-star-half" style={{ fontsize: "2rem", color: "green" }}></i> {avgRating}({totalRatingsString})- ₹{costForTwo/100} for two</p>
     
       <p style={{color:"darkorange",margin:"4px",textDecoration:"underline"}}>{cuisines.join(",")}</p>
      
       <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", height: "60px",margin:"0px" }}>
 
          <div style={{ display: "flex", alignItems: "center"}}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "black", marginRight: "8px" }}></div>
           <span  style={{fontSize:"14px"}}>outlet: <span style={{ color: "black",fontSize:"14px" }}>{areaName}</span></span>
          </div>

        <div style={{ width: "2px", height: "15px", background: "black", marginLeft: "1.5px" }}></div>

     <div style={{ display: "flex", alignItems: "center", marginTop: "0px" }}>
       <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "black", marginRight: "8px" }}></div>
       <span style={{fontSize:"14px"}}>delivery time: <span style={{ color: "black",fontSize:"14px"  }}>{deliveryTime2 ? deliveryTime2 : sla.deliveryTime} mins</span></span>
     </div>

      </div>
      
</div>  

<div style={{marginRight:"50px"}}>
{accordiandata.map((data)=><Accordian info={data.card.card} key={data.card.card.title}/>)}
</div>

          
     </div>
  );
};
