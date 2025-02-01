import {CDNI} from "../Utils/Constants";
import { addProduct,removeItems } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const Itemlist=({data})=>{
  
  const cartitems=useSelector(store=>store.cart.items)
  
    const dispatch=useDispatch();
     const Additemtocart=(item)=>{
     dispatch(addProduct(item))
     }
     const removeItemsfromcart=(item)=>{
      dispatch(removeItems(item.card.info.id))
      }
     
    return(<div>
     {data.map((item)=>{
      const {id,name,defaultPrice,price,description,imageId,ratings }=item.card.info;
    const itemquantity= cartitems[id]?.quantity ||0;
        
        return <div key={id}>
           {imageId && ratings.aggregatedRating.rating && description && <div style={{display:"flex",justifyContent:"space-around",marginTop:"10px",marginBottom:"10px" ,borderBottom:"1px solid grey",marginLeft:window.innerWidth > 768?"30px":"0px",width:"100%"}}>
            <div style={{width:"75%"}}>
           <h5>{ name}</h5>
           <h6 style={{margin:"0px"}}>₹{ defaultPrice? defaultPrice/100: price/100}</h6>
           <i className="bi bi-star-half" style={{ fontsize: "1rem", color: "green" }}></i><span>{ratings.aggregatedRating.rating}({ratings.aggregatedRating.ratingCountV2})</span>
         <p style={{fontSize:"13px"}}>{ description}</p>
          </div> 
          <div style={{width:"25%"}}>
            <img style={{width:window.innerWidth > 768?"140px":"120px",height:window.innerWidth > 768?"120px":"110px"}} src={CDNI+imageId} />
       {  itemquantity ?  (<div style={{ display:"flex",borderRadius:"10px",alignItems:"center",border:"2px solid grey" ,background:"white",width:"80px",height:"30px", marginTop:"5px",marginRight:"00px" ,marginLeft:"25px",marginBottom:"5px"}}>
            <button style={{fontSize:"20px", color:"green",border:"none",outline:"none",background:"none",margin:"0px 5px",marginBottom:"3px"}} onClick={()=>Additemtocart(item)}>+</button>
       <span>{itemquantity}</span>
       <button style={{fontSize:"25px", color:"green",border:"none",outline:"none",margin:"0px 5px",marginBottom:"6px",background:"none"}} onClick={()=>removeItemsfromcart(item)}>-</button>
            </div>)
            : (<button style={{color:"green",background:"none",margin:"5px 40px",padding:"2px 14px"}} onClick={()=>Additemtocart(item)} >add</button>) }

            </div>
          </div>
           }
        </div>
     })}
    </div>)
}
 