import React, { useContext, useState, createContext,useEffect} from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
const[isLogin,setIsLogin]=useState(false);
const[sign,setSign]=useState(false);
const[email,setEmail]=useState();
const[token,setToken]=useState();
const[profile,setProfile]=useState(false);
  return (
    <Context.Provider
      value={{
        isLogin,setIsLogin,token,setToken,email,setEmail,sign,profile,setProfile,setSign
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);