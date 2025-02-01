import { useState } from "react";
import { Locationdetails } from "./Locationdetails";
import {Inputlocationdetails} from "./Inputlocationdetails"

export const ModelLocation = ({ setActive }) => {
  const [getCurrentLocation ,setGetCurrentLocation]=useState(false)
 
  const handlerToggler=()=>{
    setGetCurrentLocation(true)
    
  }
  return (
    <div>
      <button style={{border:"none",outline:"none", background:"none", marginLeft:"90px",marginTop:"20px"}} onClick={() => setActive(false)}> <i  className="bi bi-x-lg icon"></i></button><br/>
       
     <button  onClick={handlerToggler}  className="locationhandler" > <i className="bi bi-crosshair"></i>  Get Current Location  </button>  
      { getCurrentLocation && <Locationdetails/>}
      <Inputlocationdetails/>
    </div>
  );            
};
