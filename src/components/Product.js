import React from 'react'
import { useStateContext } from '../store/StateContext';
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
const Product = (props) => {
const cxt=useStateContext();
  return (
        <Tbody style={{backgroundColor:'white'}}>
            
        <Tr>
          <Td>{props.i.title}</Td>
          <Td>{props.i.price}</Td>
          <Td>{props.i.category}</Td>
          <Td>
           <Button style={{border:'none'}}><span style={{fontSize:"30px",color:'red'}}  onClick={()=>cxt.removeitemfromcart(props.i)}>Delete</span>
       </Button>
       </Td>
        </Tr>
        </Tbody>
  )
}

export default Product