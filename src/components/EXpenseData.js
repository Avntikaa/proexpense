import React from 'react'
import Product from './Product';
import {
  Table,
  Button,
  Thead,
  Tr,
  Th,
} from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux';
import { addExActions } from '../store/reduxdemo';
import ActivatePremium from './ActivatePremium';

const EXpenseData = () => {
        const rdx = useSelector((state) => state.addexpense);
const dispatch=useDispatch();
console.log(rdx.openPremium)
  return (
    <>
    <h3>Total : $ {rdx.total}</h3>
    {rdx.total>10000 && 
    <Button colorScheme='green' size='lg' onClick={()=>
dispatch(addExActions.activatePremium())
    }>Activate Premium</Button>
}
{rdx.openPremium && <ActivatePremium/>}
  <Table  width={500} border={1} marginLeft={700} borderColor='green' >
      <Thead borderBottom='2px solid grey' >
        <Tr>
          <Th>Item</Th>
          <Th>Price</Th>
          <Th>category</Th>
        </Tr>
              </Thead>  
{
    rdx.expenselist.length>0 && rdx.expenselist.map((i)=>{
return <Product i={i} />
    })
}
        
        </Table>
       
       
        </>
      )

  
}

export default EXpenseData