import "../App.css";
import dropdown from "../Images/arrow.png";
import lens from "../Images/lens.png";
import pro from "../Images/profile.png";
import cart from "../Images/cart.png";
import logout from "../Images/logout.png";
import slogo  from "../Images/slogo.png"
import { useState,useEffect } from "react";
import {ModelLocation} from "./ModelLocation"
import {ModelLogin} from "./ModelLogin"
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Utils/firebase"
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../Redux/userSlice";
import { Link } from "react-router-dom";

export const Navbar=()=>{
  const [active,setActive]=useState(false)
  const [active2,setActive2]=useState(false)
  const dispatch=useDispatch()
  const storeItems= useSelector(store=>store.cart.items)
const arrayItems= Object.values(storeItems)
const totalItems=   arrayItems.reduce((total,item)=> total + item?.quantity||0 ,0)

  const address=useSelector(store=>store.location.address)
  const name= useSelector(store=>store?.user?.displayName)
  const users=useSelector(store=>store?.user)
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

 const handleSignOut=()=>{
signOut(auth).then(() => {
 console.log("signout")
}).catch((error) => {
 console.log(error)
});
 }
  const Handler1=()=>{
    setActive(!active)
  }
  const Handler2=()=>{
    setActive2(!active2)
  }
    return(<div style={{width:"100%"}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary second"   >
  <div className="container-fluid ">
<Link to={"/"}> <img src={slogo} alt="Bootstrap" width="90" height="45"/></Link> 
  <span className="navbar-brand mb-0 p overtext" style={{borderBottom:"1px solid black",marginTop:"0px" }}>{address.mainadd.length>2? address.mainadd.split(" ")[0] :address.mainadd}</span>
  <span className="navbar-brand mb-0 p overtext" >{address.secondadd.split(" ").length>2? address.secondadd.split(" ").slice(-3).join(" ") :address.secondadd}</span>
  <img src={dropdown} alt="Bootstrap" onClick={Handler1} width="30" height="20"/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
      <ul className="navbar-nav me-0 mb-1 ms-auto mb-lg-0" >
        <li className="nav-item px-3" style={{display:"flex", alignItems:"center",cursor:"pointer"}}>
        <Link className="nav-link active" aria-current="page" to={"/search"} > <img src={lens} style={{margin:"0px"}} alt="Bootstrap" width="23" height="20"/>Search</Link>
        </li>
        <li className="nav-item px-3 " style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
      <a className="nav-link active" onClick={Handler2} aria-current="page" >   <img src={pro} style={{margin:"0px"}} alt="Bootstrap" width="28" height="23"/>{name? name:"signin"}</a>
        </li>
        <li className="nav-item px-3 " style={{display:"flex",alignItems:"center"}}>
        <Link className="nav-link active" aria-current="page" to={"/cart"}><img src={cart} style={{margin:"0px"}} alt="Bootstrap" width="24" height="22"/>Cart({totalItems})</Link>
        </li>
       { users && <li className="nav-item px-3 " style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
        <a className="nav-link active" aria-current="page" onClick={handleSignOut}><img src={logout} style={{margin:"0px"}} alt="Bootstrap" width="21" height="17"/>Logout</a>
        </li>}
        
       
      </ul>
      
    </div>
  </div>
</nav>
{active && <div className="ModelLocation">
     <ModelLocation setActive={setActive}/>
     </div>}
     {active2 &&  <div className="ModelLogin">
       <ModelLogin setActive2={setActive2} />
     </div>}
    </div>)
}