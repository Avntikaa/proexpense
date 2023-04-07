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
const[isAdded,setIsAdded]=useState(false);
const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const[cat,setCat]=useState();
    const[enableEdit,setEnableEdit]=useState(false);
    const[pid,setPid]=useState();
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


const getexpense=async()=>{
        return new Promise((resolve, reject) => {
(async()=>{
  const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense.json`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log(data);
        const newArray=Object.keys(data);
        resolve([newArray,data]);
      })
    }
})()
        })
}

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

useEffect(()=>{
(async()=>{
  const newArray=await getexpense();
  const data=newArray[1];
newArray[0].forEach((i)=>{
            setExpenselist((prev)=>[...prev,data[i]]); 
})
})()
},[])

const removeitemfromcart=async(item)=>{
const [newArray,data]=await getexpense();
let expenseid;
newArray.forEach((i)=>{
  if(data[i].title==item.title){
    expenseid=i;
  }
})
 const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense/${expenseid}.json`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  console.log(res.json());
}
const tempArray=expenselist.filter((i)=>{
if(i.title!=item.title)
return i;
})
console.log(tempArray);
setExpenselist(tempArray);
}

const edititem=async(item)=>{
const [newArray,data]=await getexpense();
let expenseid;
console.log(newArray);
newArray.forEach((i)=>{
  console.log(item.id);
    console.log(data[i].id)
  if(data[i].id===item.id){
    
    expenseid=i;
  }
})
console.log(expenseid);
return expenseid;
}

const editbox=(item)=>{
setTitle(item.title);
setCat(item.category);
setPrice(item.price);
setEnableEdit(true);
}
  return (
    <Context.Provider
      value={{
        isLogin,setIsLogin,token,setToken,email,setEmail,sign,profile,setProfile,setSign,name,profileurl,setName,setProfileurl,profileupdated,
        setProfileupdated,idname,sendMail,forgetPage,SetForgetPage,expenselist,setExpenselist,removeitemfromcart,
        isAdded,setIsAdded,edititem,editbox,title,setTitle,price,setPrice,setCat,cat,enableEdit,pid,setPid
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);