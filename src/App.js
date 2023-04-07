import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import { useStateContext } from './store/StateContext';

function App() {
  const cxt=useStateContext();
  return (
    <div className="App">
         {!cxt.isLogin &&  <SignUp/>}
          {!cxt.isLogin && <Login/>}
       {cxt.isLogin && <Home/>}
    </div>
  );
}

export default App;
