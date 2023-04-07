 import React,{useState,useRef} from 'react'
import './SignUp.css'
import Toast from 'react-bootstrap/Toast';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

// import { useStateContext } from '../store/StateContext';
// import { NavLink } from 'react-router-dom';

const Signup = () => {
 
//   const cxt=useStateContext();
  const [isLoader, setIsLoader] = useState(false);
  const[isAlert,setIsAlert]=useState(false);

const email=useRef();
const password=useRef();
const confirmpassword=useRef();
  

  const submitlogindetail=async (e)=>{
e.preventDefault();
setIsLoader(true);
const enteredEmail=email.current.value;
const enteredPassword=password.current.value;
const enteredconfirmpassword=confirmpassword.current.value;
console.log(typeof(enteredconfirmpassword));
console.log(typeof(enteredPassword));
if(enteredconfirmpassword===enteredPassword){
try{
const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtkc8ao4DWu2Lwz2rK_mXBqzQDI6KnYbo',{
  method:'POST',
  body:JSON.stringify({
email:enteredEmail,
password:enteredPassword,
returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
if(res.ok){
  res.json().then((data)=>{
console.log('Sign in successfully');

setIsLoader(false);
    // cxt.setSignup((prevState) => !prevState);
    // cxt.setProfilePage(true);
  });
}

}
catch(error){
   setIsAlert(true);
   setIsLoader(false);
}
}
else{
    console.log('wrong password');
}
}
  return (
    <>
   <section className="form-style-6" >
    {isAlert && alert('Auhtentication failed')}
      <h1>Sign In</h1>
    <form onSubmit={submitlogindetail}>
        <div>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={email} id='email' required />
        </div>
        <div>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={password}
            required
          />
        </div>
         <div>
          <label htmlFor='Confrim password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={confirmpassword}
            required
          />
        </div>
        <div>
{!isLoader && <button type='submit'>Sign In</button>}
        
        </div>
        {isLoader && <p>sending request...</p>}
      </form>
      </section>
       {/* <NavLink to="/SignUp" style={({ isActive }) => 
                      (isActive ? {color: 'blue',fontSize:"25px",fontWeight:"bold"} : {color: 'black',textDecoration:'none'})}>Create an Account</NavLink> */}
  <Toast  className="d-inline-block m-1"
          bg='success'>
      <Toast.Header>
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
      <Tooltip id="overlay-example">
            My Tooltip
          </Tooltip>
            <Alert key='success' variant='success'>
          This is a  alert—check it out!
        </Alert>
   </>
  );
};



export default Signup