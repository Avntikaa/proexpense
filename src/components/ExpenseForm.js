import React, { useState} from 'react'
import { createContext } from 'react';
import { useStateContext } from '../store/StateContext';
import {useToast,FormControl,
  FormLabel,Input,Button,Form
} from '@chakra-ui/react'
const ExpenseForm = (props) => {
  const toast=useToast();
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const[cat,setCat]=useState();
    const cxt=useStateContext();
    const addtitle=(e)=>{
        setTitle(e.target.value);
    }
    const addPrice=(e)=>{
        setPrice(e.target.value);
    }
    
    const addCategory=(e)=>{
setCat(e.target.value);
    }

    const onSubmitFormDeatils=async(e)=>{
        console.log('kfnkj');
        e.preventDefault();
        const newexpense={
            title:title,
            price:price,
            category:cat
        }
        const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense.json`,{
  method:'POST',
  body:JSON.stringify({
title:title,
            price:price,
            category:cat  }),
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
    cxt.setIsAdded((prev)=>!prev);
        cxt.setExpenselist((prev)=>[...prev,newexpense]);

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

    const onCancel=()=>{
        props.openFormDiv();
    }

  return (
<div className="form-style-6" id='formdiv'>
<form>
      <h1>Add Expense</h1>

<input type="text"  onChange={addtitle} placeholder="Enter item" />
<input type="number" onChange={addPrice} placeholder="Enter Price" />
<label>Country</label>
  <select placeholder='Select country' onChange={addCategory}>
    <option>Foods</option>
    <option>Entertainment</option>
<option>Clothing</option>
    <option>Education</option>

  </select>
<button  type="submit" onClick={onSubmitFormDeatils}>SUBMIT</button>
<button type="submit" id='cancelbtn' onClick={onCancel}>CANCEL</button>

</form>
</div>
  )
  }

export default ExpenseForm