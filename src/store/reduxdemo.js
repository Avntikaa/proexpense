import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialAuthState = {
  isLogin:false,
  email:'',
  token:'',
  profileUpdated:false,
  Ids:'',
  name:'',
  profileUrl:'',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isLogin = true;
      state.email=action.payload.two
      state.token=action.payload.one;
    },
    isLogin(state){
      state.isLogin=true;
    },
    logout(state) {
      state.isLogin = false;
      state.email=null;
      state.token=null;
    },
    onLogin(state,action){
state.profileUpdated=true;
state.Ids=action.payload[0];
state.name=action.payload[1];
state.profileUrl=action.payload[2];
    },
    onProfileComplete(state,action){
      state.profileUpdated=true;
    }
  },
});

const initialAddExpenseState={
pid:'',
isAdded:false,
expenselist:[],
title:'',
price:0,
category:'',
enableedit:false,
total:0,
darkTheme:false,
openPremium:false
}

const addExSlice = createSlice({
  name: 'addExpense',
  initialState: initialAddExpenseState,
  reducers: {
    addTitle(state,action){
state.title=action.payload;
    },
 addPrice(state,action){
state.price=action.payload;
    },
     addCategory(state,action){
state.category=action.payload;
    },
    adddata(state,action) {
      state.pid=action.payload[0];
      state.isAdded=true;
      state.expenselist=[...state.expenselist, action.payload[1]];
      state.total=state.total+parseInt(action.payload[2]);
    },
    logout(state) {
      state.isLogin = false;
    },
    loaddata(state,action){
            state.expenselist= [...state.expenselist, action.payload];
            state.total=state.total+parseInt(action.payload.price);

    },
    removeitem(state,action){
      console.log(action.payload);
      state.expenselist=action.payload;
    },
    editbox(state,action){
state.title=action.payload.title;
state.price=action.payload.price;
state.category=action.payload.category;
state.enableedit=true;
    },
    activatePremium(state){
state.openPremium=true;
    },
    enabledarktheme(state){
      state.darkTheme=!state.darkTheme;
    }
  },
});const store = configureStore({
  reducer: {  addexpense:addExSlice.reducer,auth: authSlice.reducer },
});

export const authActions = authSlice.actions;
export const addExActions=addExSlice.actions;

export default store;