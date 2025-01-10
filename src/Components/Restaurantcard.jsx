
import {CDNI} from "../Utils/Constants"

export const Restaurantcard=({restaurant})=>{

    const{cloudinaryImageId,name,sla:{slaString},avgRating,cuisines,locality,aggregatedDiscountInfoV3:{header="",subHeader=""}={}}=restaurant.info || {}
    const offers=header+" "+subHeader
    return(

<div   >
 <div className="card" style={{width: "12.5rem",height:"18rem"}}>
  <img src={CDNI+cloudinaryImageId} className="card-img-top" alt="" style={{width: "12.5rem",height:"10rem", position:"relative"}} /> 
  <span style={{position:"absolute",fontWeight:"bold",fontSize:"medium", paddingLeft:"10px",color:"white", top:"8.5rem"}}>{offers}</span> 
  <div className="card-body">
    <h6 className="card-title" style={{fontWeight:"bold", margin:"0px" ,overflow:"hidden" ,whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{name}</h6>
    <p  className="card-text" style={{overflow:"hidden" ,margin:"0px" ,whiteSpace:"nowrap",textOverflow:"ellipsis"}}><i className="bi bi-star-half" style={{ fontsize: "2rem", color: "green" }}></i> {avgRating}  <span className="card-text" style={{fontWeight:"bold"}}>{slaString}</span></p>
    <p className="card-text" style={{overflow:"hidden" ,margin:"0px" ,whiteSpace:"nowrap",textOverflow:"ellipsis"}} >{cuisines.length>3? cuisines.slice(0,2).join(","):cuisines } </p>
    <p className="card-text"  style={{ overflow:"hidden" , whiteSpace:"nowrap",textOverflow:"ellipsis",margin:"0px"  }}>{locality}</p>
  </div>
</div>
    </div>)
}