import React, { useContext, useState, createContext,useEffect} from "react";
import {useToast
} from '@chakra-ui/react'
const Context = createContext();

export const StateContext = ({ children }) => {
  const toast=useToast();
const[isLogin,setIsLogin]=useState(false);
const[sign,setSign]=useState(false);
const[email,setEmail]=useState();
const[token,setToken]=useState();
const[profile,setProfile]=useState(false);
const[name,setName]=useState('');
const[profileurl,setProfileurl]=useState();
const[profileupdated,setProfileupdated]=useState(false);
const[idname,setIdname]=useState();
const[forgetPage,SetForgetPage]=useState(false);
const[expenselist,setExpenselist]=useState([]);
useEffect(()=>{
  (async()=>{
try{
const res=await fetch('https://expenseapp-c536b-default-rtdb.firebaseio.com/profile.json',{
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
    setProfileupdated(true);
const Idname=Object.keys(data);
setIdname(Object.keys(data));
setName(data[Idname].name);
setProfileurl(data[Idname].profileurl);
  });
}
else{
  console.log('errror');
}
}
catch(error){
  console.log(error)
}
})()
},[isLogin])

const sendMail=async()=>{
  console.log('verified');
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
  method:'POST',
  body:JSON.stringify({
"requestType":"VERIFY_EMAIL",
"idToken":token
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log(data);
  });
}
}

  return (
    <Context.Provider
      value={{
        isLogin,setIsLogin,token,setToken,email,setEmail,sign,profile,setProfile,setSign,name,profileurl,setName,setProfileurl,profileupdated,
        setProfileupdated,idname,sendMail,forgetPage,SetForgetPage,expenselist,setExpenselist
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);