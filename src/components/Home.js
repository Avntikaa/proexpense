import React from 'react'
import { useStateContext } from '../store/StateContext'
import Profile from './Profile';
import ExpenseForm from './ExpenseForm';
import EXpenseData from './EXpenseData';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text
} from '@chakra-ui/react'
const Home = () => {
  const cxt=useStateContext();
  return (
    <div>
       <Box as="nav" bg="bg-surface" boxShadow="md" borderBottom="1px solid grey">
        <Container py={{  lg: '2' }} marginLeft={200}>
          <HStack >
            <div>
            <Text marginRight={500}>Welcome to the Expense </Text>
            </div>
                <HStack spacing="3" marginLeft={100}>
                  <h3>Your profile is incomplete</h3>
                  <Button colorScheme='teal' size='lg' onClick={()=>cxt.setProfile(true)}>Complete Now</Button>
                <Button colorScheme='teal' size='lg' onClick={()=>cxt.sendMail()}>Verify Email</Button>
                <Button colorScheme='teal' size='lg' onClick={()=>{
                  localStorage.setItem('id',null);
                  cxt.setIsLogin(false)}}>Log Out</Button>
                </HStack>

          </HStack>
        </Container>
      </Box>
      {cxt.profile &&<Profile/>}
      <ExpenseForm/>
     <EXpenseData/>
    </div>
  )
}

export default Home