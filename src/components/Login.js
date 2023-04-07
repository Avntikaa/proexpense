import React,{useState,useRef} from 'react'
import './SignUp.css'
import { useStateContext } from '../store/StateContext';
import {useToast
} from '@chakra-ui/react'
const Login = () => {
  const cxt=useStateContext();
const toast = useToast();
const email=useRef();
const password=useRef();

  
  const submitlogindetail=async (e)=>{
e.preventDefault();
const enteredEmail=email.current.value;
const enteredPassword=password.current.value;
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
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
console.log('Logg in successfully');
cxt.setEmail(enteredEmail);
cxt.setToken(data.idToken);
localStorage.setItem('id',data.idToken);
localStorage.setItem('email',enteredEmail);
toast({
          title: 'Successfully Login',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
    cxt.setIsLogin((prevState) => !prevState);
    // cxt.setProfilePage(true);
  });
}

}
catch(error){
     toast({
          title: "Invalid",
          description: "Ntwork error",
          status: "warning",
          duration: 9000,
          isClosable: true,
        })
}
}
  return (
    <>
   <section className="form-style-6" >
      <h1>Login </h1>
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
{<button type='submit'>Login</button>}
        
        </div>
      </form>
      </section>
      
   </>
  );
};



export default Login