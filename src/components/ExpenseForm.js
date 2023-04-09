import React, { useState} from 'react'
import { useStateContext } from '../store/StateContext';
import {useToast} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { addExActions } from '../store/reduxdemo';
import { useSelector } from 'react-redux';
const ExpenseForm = (props) => {
  const toast=useToast();
      const dispatch=useDispatch();
    const rdx = useSelector((state) => state.addexpense);

    const cxt=useStateContext();
    const addtitle=(e)=>{
      dispatch(addExActions.addTitle(e.target.value));
    }
    const addPrice=(e)=>{
      dispatch(addExActions.addPrice(e.target.value));
    }
    
    const addCategory=(e)=>{
      dispatch(addExActions.addCategory(e.target.value));
    }

    const onSubmitFormDeatils=async(e)=>{
        e.preventDefault();
           if(!rdx.enableedit){
        const id=Math.random();
        const newexpense={
          id:id,
            title:rdx.title,
            price:rdx.price,
            category:rdx.category
        }
        const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense.json`,{
  method:'POST',
  body:JSON.stringify({
    id:id,
title:rdx.title,
            price:rdx.price,
            category:rdx.category  }),
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
  dispatch(addExActions.adddata([id,newexpense,rdx.price]));
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
          console.log(rdx.isAdded);
          const newexpense={
          id:rdx.pid,
            title:rdx.title,
            price:rdx.price,
            category:rdx.cat
        }
              const expenseid=await cxt.edititem(newexpense);
console.log(expenseid);
           const res=await fetch(`https://expenseapp-c536b-default-rtdb.firebaseio.com/expense/${expenseid}.json`,{
  method:'PUT',
  body:JSON.stringify({
    id:rdx.pid,
title:rdx.title,
            price:rdx.price,
            category:rdx.cat  }),
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

<input type="text"  onChange={addtitle} placeholder="Enter item" value={rdx.title}/>
<input type="number" onChange={addPrice} placeholder="Enter Price" value={rdx.price}/>
<label>Country</label>
  <select placeholder='Select country' onChange={addCategory} value={rdx.category}>
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