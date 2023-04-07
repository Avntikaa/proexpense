import React, { useState} from 'react'
import { createContext } from 'react';
import { useStateContext } from '../store/StateContext';
import {useToast,FormControl,
  FormLabel,Input,Button,Form
} from '@chakra-ui/react'
const ExpenseForm = (props) => {
  const toast=useToast();
    
    const cxt=useStateContext();
    const addtitle=(e)=>{
        cxt.setTitle(e.target.value);
    }
    const addPrice=(e)=>{
        cxt.setPrice(e.target.value);
    }
    
    const addCategory=(e)=>{
cxt.setCat(e.target.value);
    }

    const onSubmitFormDeatils=async(e)=>{
        e.preventDefault();
                if(!cxt.enableEdit){
        const id=Math.random();
        cxt.setPid(id);
        const newexpense={
          id:id,
            title:cxt.title,
            price:cxt.price,
            category:cxt.cat
        }
        console.log(cxt.enableEdit);
          console.log('submit button')
        const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense.json`,{
  method:'POST',
  body:JSON.stringify({
    id:id,
title:cxt.title,
            price:cxt.price,
            category:cxt.cat  }),
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
        else{
          const newexpense={
          id:cxt.pid,
            title:cxt.title,
            price:cxt.price,
            category:cxt.cat
        }
              const expenseid=await cxt.edititem(newexpense);
console.log(expenseid);
           const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense/${expenseid}.json`,{
  method:'PUT',
  body:JSON.stringify({
    id:cxt.pid,
title:cxt.title,
            price:cxt.price,
            category:cxt.cat  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log(data);
toast({
          title: 'Successfully Edited',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
  });
    cxt.setIsAdded((prev)=>!prev);
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
    }

    const onCancel=()=>{
        props.openFormDiv();
    }

  return (
<div className="form-style-6" id='formdiv'>
<form>
      <h1>Add Expense</h1>

<input type="text"  onChange={addtitle} placeholder="Enter item" value={cxt.title}/>
<input type="number" onChange={addPrice} placeholder="Enter Price" value={cxt.price}/>
<label>Country</label>
  <select placeholder='Select country' onChange={addCategory} value={cxt.cat}>
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