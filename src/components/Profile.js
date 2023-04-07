import React,{useRef} from 'react'
import {useToast,FormControl,
  FormLabel,Input,Button,Form
} from '@chakra-ui/react'
import { useStateContext } from '../store/StateContext';

const Profile = () => {
    const toast=useToast();
const cxt=useStateContext();

    const submitlogindetail=async (e)=>{
        console.log('work');
e.preventDefault();
const enteredName=cxt.name;
const enteredUrl=cxt.profileurl;
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
  <Input type='text' onChange={(e)=>cxt.setName(e.target.value)} width='300px' marginRight={10} placeholder='Your Full Name' value={cxt.name}/>
    <Input type='url' onChange={(e)=>cxt.setProfileurl(e.target.value)} width='300px' marginRight={10} placeholder='Your Profile url' value={cxt.profileurl}/>

        <Button type='submit'>Update</Button>
</FormControl>
</form>
    </div>
  )
}

export default Profile