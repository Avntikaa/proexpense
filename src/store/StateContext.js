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



  return (
    <Context.Provider
      value={{
        isLogin,setIsLogin,token,setToken,email,setEmail,sign,profile,setProfile,setSign,name,profileurl,setName,setProfileurl,profileupdated,
        setProfileupdated,idname
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);