import "../App.css";
import dropdown from "../Images/arrow.png";
import lens from "../Images/lens.png";
import pro from "../Images/profile.png";
import cart from "../Images/cart.png";
import logout from "../Images/logout.png";
import slogo  from "../Images/slogo.png"
import { useState,useEffect } from "react";
import {Model1} from "./Model1"
import {Model2} from "./Model2"
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Utils/firebase"
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../Redux/userSlice";

export const Nbar=()=>{
  const [active,setactive]=useState(false)
  const [active2,setactive2]=useState(false)
  const dispatch=useDispatch()

  const address=useSelector(store=>store.location.address)
  const name= useSelector(store=>store?.user?.displayName)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName  } = user;
        dispatch(
          addUser({ uid: uid,email: email,displayName: displayName,}));
        
      } else {
        dispatch(removeUser()); }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);

 const  HandleSignout=()=>{

signOut(auth).then(() => {
 console.log("signout")
}).catch((error) => {
 console.log(error)
});
 }
  const Handler=()=>{
    setactive(!active)
  }
  const Handler2=()=>{
    setactive2(!active2)
  }
    return(<div style={{width:"100%"}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary second"   >
  <div className="container">
  <img src={slogo} alt="Bootstrap" width="90" height="45"/>
  <span className="navbar-brand mb-0 p overtext" style={{borderBottom:"1px solid black",marginTop:"0px" }}>{address.mainadd.length>2? address.mainadd.split(" ")[0] :address.mainadd}</span>
  <span className="navbar-brand mb-0 p overtext" >{address.secondadd.split(" ").length>2? address.secondadd.split(" ").slice(-3).join(" ") :address.secondadd}</span>
  <img src={dropdown} alt="Bootstrap" onClick={Handler} width="30" height="20"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
      <ul className="navbar-nav me-0 mb-1 ms-auto mb-lg-0" >
        <li className="nav-item px-3" style={{display:"flex", alignItems:"center"}}>
          <a className="nav-link active" aria-current="page" href="#"> <img src={lens} style={{margin:"0px"}} alt="Bootstrap" width="23" height="20"/>Search</a>
        </li>
        <li className="nav-item px-3 " style={{display:"flex",alignItems:"center"}}>
      <a className="nav-link active" onClick={Handler2} aria-current="page" >   <img src={pro} style={{margin:"0px"}} alt="Bootstrap" width="28" height="23"/>{name? name:"signin"}</a>
        </li>
        <li className="nav-item px-3 " style={{display:"flex",alignItems:"center"}}>
        <a className="nav-link active" aria-current="page" href="#"><img src={cart} style={{margin:"0px"}} alt="Bootstrap" width="24" height="22"/>Cart</a>
        </li>
        <li className="nav-item px-3 " style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
        <a className="nav-link active" aria-current="page" onClick={HandleSignout}><img src={logout} style={{margin:"0px"}} alt="Bootstrap" width="21" height="17"/>Logout</a>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
{active && <div className="Model1">
     <Model1 setactive={setactive}/>
     </div>}
     {active2 &&  <div className="Model2">
       <Model2 setactive2={setactive2} />
     </div>}
    </div>)
}