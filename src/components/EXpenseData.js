import React from 'react'
import { useStateContext } from '../store/StateContext'
import Product from './Product';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,Button
} from '@chakra-ui/react'

const EXpenseData = () => {
    const cxt=useStateContext();
    console.log(cxt.expenselist);
  return (
    <>
  <Table  width={500} border={1} marginLeft={700} borderColor='green' >
      <Thead borderBottom='2px solid grey' >
        <Tr>
          <Th>Item</Th>
          <Th>Price</Th>
          <Th>category</Th>
        </Tr>
              </Thead>  
{
    cxt.expenselist.length>0 && cxt.expenselist.map((i)=>{
return <Product i={i} />
    })
}
        
        </Table>
       
       
        </>
      )

  
}

export default EXpenseData