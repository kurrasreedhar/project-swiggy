import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {addLocation} from "../Redux/LocationSlice";
import { addAddress } from "../Redux/LocationSlice";

 export const Locationdetails = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
 const dispatch=useDispatch()
  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
       async(position) => {
        
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude);
          const url=await fetch("https://nominatim.openstreetmap.org/reverse?lat=" +position.coords.latitude +"&lon="+ position.coords.longitude+"&format=json")
          const data=await url.json()
          const {city,state,country}=data.address
         dispatch(addAddress({mainadd:city,secondadd:""+state+","+country  }))
          console.log(data.address)
          dispatch(addLocation({Latitude:position.coords.latitude,Longitude:position.coords.longitude}))
          console.log("latitude",latitude , "longitude",longitude)
        },
        
        (err) => {
          setError(err.message);
          console.error('Error fetching location:', err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      console.error('Geolocation is not supported by this browser.');
  }
}, []); 

return (
  <div>
  </div>
);
};