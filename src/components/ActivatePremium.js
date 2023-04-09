import React from 'react'
import { Switch ,Button} from '@chakra-ui/react'
import { useStateContext } from '../store/StateContext';
import { useDispatch, useSelector } from 'react-redux';
import { addExActions } from '../store/reduxdemo';
const ActivatePremium = () => {
    const cxt=useStateContext();
    const rdx=useSelector((state)=>state.addexpense);
    const dispatch=useDispatch();
    const downloadfile=async()=>{
const data=Object.entries(rdx.expenselist);

    console.log(data);
    const blob = new Blob(data, { type: "text"})

    console.log(blob);
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'expense.txt';
					a.click();
    }

   
  return (
    <div>
  <Switch colorScheme='red' margin='10' width='100' onChange={()=>dispatch(addExActions.enabledarktheme())}/>
  <Button colorScheme='blue' onClick={downloadfile}>Download file</Button>
    </div>
  )
}

export default ActivatePremium