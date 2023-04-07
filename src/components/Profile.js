import React,{useRef} from 'react'
import {useToast,FormControl,
  FormLabel,Input,Button,Form
} from '@chakra-ui/react'

const Profile = () => {
    const toast=useToast();
    const name=useRef();
   const url=useRef();

    const submitlogindetail=async (e)=>{
        console.log('work');
e.preventDefault();
const enteredName=name.current.value;
const enteredUrl=url.current.value;
try{
const res=await fetch('https://expenseapp-c536b-default-rtdb.firebaseio.com/profile.json',{
  method:'POST',
  body:JSON.stringify({
name:enteredName,
profileurl:enteredUrl
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log(data);
toast({
          title: 'Successfully Updated',
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
    <div>
        <h1>Contact Details</h1>
        <form onSubmit={submitlogindetail} marginTop={20}>
       <FormControl >
  <Input type='text' ref={name} width='300px' marginRight={10} placeholder='Your Full Name' />
    <Input type='url' ref={url} width='300px' marginRight={10} placeholder='Your Profile url' />

        <Button type='submit'>Update</Button>
</FormControl>
</form>
    </div>
  )
}

export default Profile