 
 export const Checkvalidatedata=(email,password,name,login)=>{
    console.log(email,password,name,login)
     const IsEmailValid= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      const IsNameValid=/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(name)
     const IsPasswordValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
     if( !login && !IsNameValid) return "enter valid name";
     if(!IsEmailValid) return "enter valid email";
     if(!IsPasswordValid) return "enter valid password"
    

     return null

 }