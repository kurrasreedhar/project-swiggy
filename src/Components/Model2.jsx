import { useState } from "react";
import slogo from "../Images/login swiggy.avif" 
import { useRef } from "react";
import {Checkvalidatedata} from  "../Hooks/useValidatedata"
import { createUserWithEmailAndPassword ,updateProfile,signInWithEmailAndPassword} from "firebase/auth";
import {auth } from "../Utils/firebase";
import {   } from "firebase/auth";

export const Model2=({setactive2})=>{
    const name=useRef();
    const email=useRef();
    const password=useRef()
    const [login,setlogin]=useState(true)
    const [error,seterror]=useState("")
    const loginToggler=()=>{
        setlogin(!login)
    }
    const Validateform=(e)=>{
        e.preventDefault();
 const msg= Checkvalidatedata(email.current.value,password.current.value,name.current? name.current.value:"",login)
 seterror(msg)
                         //SIGNUP//
         if(!login){                
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    updateProfile(user, {
        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
      }).then(() => {
        const {uid,email,displayName,photoURL} = auth.currentUser;
dispatch(addUser({
  uid:uid,email:email,displayName:displayName,photoURL:photoURL,
}))
        
      }).catch((error) => {
      console.log(error)
      });
  
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterror(errorCode +" - "+errorMessage)
  });}

  else{             //signin//
signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    seterror(errorCode +" - "+errorMessage)
  });
  
}

    }
    return (<div style={{cursor:"pointer"}}>
        <button style={{border:"none",outline:"none", marginLeft:"40px",marginTop:"20px",background:"none",}} onClick={()=> setactive2(false)}> <i  className="bi bi-x-lg icon"></i></button><br/>
        <div style={{display:"flex",alignItems:"center"}}>
            <div style={{ flex: "0.75" }}>
        <h3 style={{marginLeft:"40px",marginTop:"10px", whiteSpace: "nowrap"}}>{login ? "Login" : "Sign Up"}</h3>
   <p style={{marginLeft:"40px",}}>or <span style={{color:"red"}} onClick={loginToggler}>{login ? "create an account" : "login to your account"}</span></p> 
       </div> 
       <div style={{marginLeft:"40px", }}>
       <img src={slogo} style={{width:"100px",height:"100px"}} alt="logo"/></div> 
       </div>
        <form onSubmit={Validateform} className="field" style={{marginTop:"20px"}}>
   {!login && <input type="text" ref={name}  placeholder="Name"/>}<br/>
        <input type="text" ref={email} placeholder="Email"/><br/>
        <input type="password" ref={password} placeholder="Password"/><br/>
        <button type="submit">{login? "Login": "Sign up"}</button>
        </form>
        <span style={{ fontSize: "12px", marginLeft: "40px",marginTop:"0px" }}>
  {login? "By clicking on Login, I accept the Terms & Conditions & Privacy Policy" : "By creating an account, I accept the Terms & Conditions & Privacy Policy"}
 </span>
 <p style={{color:"red"}}>{error}</p>
     
    </div>)
}
