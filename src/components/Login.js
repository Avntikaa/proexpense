import React,{useState,useRef} from 'react'
import './SignUp.css'
import { useStateContext } from '../store/StateContext';
import {Link, useToast
} from '@chakra-ui/react'
import ForgetPass from './ForgetPass';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/reduxdemo';
const Login = () => {
  const cxt=useStateContext();
const toast = useToast();
const email=useRef();
const password=useRef();

  const dispatch=useDispatch();
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
dispatch(authActions.login(data.idToken,enteredEmail));
localStorage.setItem('id',data.idToken);
localStorage.setItem('email',enteredEmail);
toast({
          title: 'Successfully Login',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
  });
}
else{
  toast({
          title: "Invalid",
          description: 'Wrong Password or email',
          status: "warning",
          duration: 9000,
          isClosable: true,
        })
}
}
catch(error){
    toast({
          title: "Invalid",
          description: 'Netwrok error',
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

<button type='submit'>Login</button>
                  <p onClick={()=>{cxt.SetForgetPage(true)}}>Forget Password</p>

        </div>
      </form>
      {cxt.forgetPage && <ForgetPass/>}
      </section>
      
   </>
  );
};



export default Login