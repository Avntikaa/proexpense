import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import { useSelector } from 'react-redux';

function App() {
 
    const isLogin = useSelector((state) => state.auth.isLogin);
const rdx=useSelector((state)=>state.addexpense);
  return (
    <div className={rdx.darkTheme?'Apps':'App'}>
         {!isLogin &&  <SignUp/>}
          {!isLogin && <Login/>}
       {isLogin && <Home/>}

    </div>
  );
}

export default App;
