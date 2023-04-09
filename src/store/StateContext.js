import React, { useContext, useState, createContext,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExActions } from "./reduxdemo";
import { authActions } from "./reduxdemo";
const Context = createContext();
export const StateContext = ({ children }) => {
const[profile,setProfile]=useState(false);
const[forgetPage,SetForgetPage]=useState(false);


    const rdx = useSelector((state) => state.auth);
    const rdx2 = useSelector((state) => state.addexpense);
const dispatch=useDispatch();


useEffect(()=>{
  if(localStorage.getItem('email')!=='null')
  dispatch(authActions.isLogin());
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
const Idname=Object.keys(data);
dispatch(authActions.onLogin([Idname,data[Idname].name,data[Idname].profileurl]));
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
},[rdx.isLogin])


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
await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
  method:'POST',
  body:JSON.stringify({
"requestType":"VERIFY_EMAIL",
"idToken":rdx.token
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
}

useEffect(()=>{
(async()=>{
  const newArray=await getexpense();
  const data=newArray[1];
newArray[0].forEach((i)=>{
  dispatch(addExActions.loaddata(data[i]));
})
})()
},[])

const removeitemfromcart=async(item)=>{
const [newArray,data]=await getexpense();
let expenseid;
newArray.forEach((i)=>{
  if(data[i].id===item.id){
    expenseid=i;
  }
})
 await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense/${expenseid}.json`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
  }
})

const tempArray=rdx2.expenselist.filter((i)=>{
if(i.id!==item.id)
return i;
})
dispatch(addExActions.removeitem(tempArray));
}

const edititem=async(item)=>{
const [newArray,data]=await getexpense();
let expenseid;
newArray.forEach((i)=>{
  console.log(item.id);
    console.log(data[i].id)
  if(data[i].id===item.id){
    
    expenseid=i;
  }
})
return expenseid;
}

const editbox=(item)=>{
dispatch(addExActions.editbox(item));
}

  return (
    <Context.Provider
      value={{
       profile,setProfile,sendMail,forgetPage,SetForgetPage,removeitemfromcart,
        edititem,editbox
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);