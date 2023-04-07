import React, { useState} from 'react'
import { createContext } from 'react';
import { useStateContext } from '../store/StateContext';
const ExpenseForm = (props) => {
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

    const onSubmitFormDeatils=(e)=>{
        console.log('kfnkj');
        e.preventDefault();
        const newexpense={
            title:title,
            price:price,
            category:cat
        }
        cxt.setExpenselist((prev)=>[...prev,newexpense]);
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