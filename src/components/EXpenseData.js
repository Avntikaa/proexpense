import React from 'react'
import { useStateContext } from '../store/StateContext'
import Product from './Product';
import {
  Table,
  Button,
  Thead,
  Tr,
  Th,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
const EXpenseData = () => {
        const rdx = useSelector((state) => state.addexpense);

  return (
    <>
    <h3>Total : $ {rdx.total}</h3>
    {rdx.total>10000 && 
    <Button colorScheme='green' size='lg'>Activate Premium</Button>
}
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