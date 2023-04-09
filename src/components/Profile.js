import React,{useRef} from 'react'
import {useToast,FormControl,
  FormLabel,Input,Button,Form
} from '@chakra-ui/react'
import { useStateContext } from '../store/StateContext';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/reduxdemo';

const Profile = () => {
    const toast=useToast();
const cxt=useStateContext();
const dispatch=useDispatch();
    const rdx = useSelector((state) => state.auth);
    const submitlogindetail=async (e)=>{
e.preventDefault();
const enteredName=rdx.name;
const enteredUrl=rdx.profileurl;
if(!rdx.profileupdated){
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
    dispatch(authActions.onProfileComplete());
toast({
          title: 'Successfully Added',
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
else{
try{
   const id= rdx.ids;
const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/profile/${id}.json`,{
  method:'PUT',
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
    }
  return (
    <div>
        <h1>Contact Details</h1>
        <form onSubmit={submitlogindetail} marginTop={20}>
       <FormControl >
  <Input type='text' onChange={(e)=>cxt.setName(e.target.value)} width='300px' marginRight={10} placeholder='Your Full Name' value={rdx.name}/>
    <Input type='url' onChange={(e)=>cxt.setProfileurl(e.target.value)} width='300px' marginRight={10} placeholder='Your Profile url' value={rdx.profileUrl}/>

        <Button type='submit'>Update</Button>
</FormControl>
</form>
    </div>
  )
}

export default Profile