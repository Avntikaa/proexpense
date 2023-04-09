import React,{useRef} from 'react'
import { useToast} from '@chakra-ui/react'

const ForgetPass = () => {
    const email=useRef();
const toast = useToast();

const submitdetail=async()=>{
const enteredEmail=email.current.value;
    const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
  method:'POST',
  body:JSON.stringify({
"requestType":"PASSWORD_RESET",
"email":enteredEmail
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
toast({
          title: ' Verification link was Successfully sent',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

  });
}
}
  return (
     <form onSubmit={()=>submitdetail()}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={email} id='email' required />
        </div>
        <button type='submit'>Send Link</button>
      </form>

  )
}

export default ForgetPass