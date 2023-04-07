 import React,{useState,useRef} from 'react'
import './SignUp.css'
import {useToast
} from '@chakra-ui/react'
import { useStateContext } from '../store/StateContext';


const Signup = () => {
   const toast = useToast();
const cxt=useStateContext();
const email=useRef();
const password=useRef();
const confirmpassword=useRef();
  

  const submitlogindetail=async (e)=>{
e.preventDefault();
const enteredEmail=email.current.value;
const enteredPassword=password.current.value;
const enteredconfirmpassword=confirmpassword.current.value;
console.log(typeof(enteredconfirmpassword));
console.log(typeof(enteredPassword));
if(enteredconfirmpassword===enteredPassword){
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
  method:'POST',
  body:JSON.stringify({
email:enteredEmail,
password:enteredPassword,
returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log('Sign in successfully');

   toast({
          title: 'Successfully signup',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
  });
  cxt.setSign(true);
}
}
catch{
   toast({
          title: "Invalid",
          description: "Ntwork error",
          status: "warning",
          duration: 9000,
          isClosable: true,
        })
}
}
else{
     toast({
          title: "Invalid",
          description: "Wrong Password",
          status: "warning",
          duration: 9000,
          isClosable: true,
        })
}
}
  return (
    <>
   <section className="form-style-6" >
      <h1>Sign In</h1>
    <form onSubmit={submitlogindetail}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={email} id='email' required />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={password}
            required
          />
        </div>
         <div>
          <label htmlFor='Confrim password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={confirmpassword}
            required
          />
        </div>
        <div>
{<button type='submit'>Sign In</button>}
        
        </div>
      </form>
      </section>

   </>
  );
};



export default Signup