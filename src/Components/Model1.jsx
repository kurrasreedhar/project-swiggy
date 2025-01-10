import { useState } from "react";
import { Locationdetails } from "./Locationdetails";
import {Inputlocationdetails} from "./Inputlocationdetails"

// Model1 Component
export const Model1 = ({ setactive }) => {
  const [getcurrentlocation ,setgetcurrentlocation]=useState(false)
 
  const handler=()=>{
    setgetcurrentlocation(true)
    
  }
  return (
    <div>
      <button style={{border:"none",outline:"none", background:"none", marginLeft:"90px",marginTop:"20px"}} onClick={() => setactive(false)}> <i  className="bi bi-x-lg icon"></i></button><br/>
       
     <button  onClick={handler}  className="locationhandler" > <i className="bi bi-crosshair"></i>  Get Current Location  </button>  
      { getcurrentlocation && <Locationdetails/>}
      <Inputlocationdetails/>
    </div>
  );            
};
