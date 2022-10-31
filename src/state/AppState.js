import React, {useReducer, createContext} from "react";
//Context and Provider
export const UserContext = createContext();

const actions = {
  ADD_USER: "ADD_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT"
};

const useActions = (state, dispatch) => {
  
  //CREATES A NEW USER
  const addUser = newUser => {
    let newUsers = [...state.users];
    newUsers.push(newUser);
    dispatch({
      type: "ADD_USER",
      payload: newUsers
    });
  };

  //TRIES TO LOGIN WITH THE PROVIDED CREDENTIALS
  const logIn = credentials => { 
    console.log('In logIn')
   let currentUser = state.users.find(element => element.password === credentials.password && element.email === credentials.email);
   if(currentUser) {
    dispatch({
      type: "LOGIN",
      payload: {...currentUser}
    });
   }
   else {
     alert("login error, check your credentials");
   }
  }

  const withdraw = amount => {
    let userIndex =  state.users.findIndex(element => element.email === state.currentUser.email)
    let newUsers = [...state.users];
    newUsers[userIndex].balance = newUsers[userIndex].balance - amount;
    dispatch({
      type:"UPDATE_USERS",
      payload: newUsers
    });

    dispatch({
      type:"UPDATE_USER",
      payload: {...state.currentUser, balance: state.currentUser.balance - amount}
    });
  }

  const deposit = amount => {
    let userIndex = state.users.findIndex(element => element.email === state.currentUser.email)
    let newUsers = [...state.users];
    newUsers[userIndex].balance = newUsers[userIndex].balance + amount;
    dispatch({
      type:"UPDATE_USERS",
      payload: newUsers
    });

    dispatch({
      type:"UPDATE_USER",
      payload: {...state.currentUser, balance: state.currentUser.balance + amount}
    });
  }

  const setSuccess = value => {
    dispatch({
      type:"SET_SUCCESS",
      payload: value
    });
  }

  const setError = value => {
    dispatch({
      type: "SET_ERROR",
      payload: value
    })
  }


  return {
    addUser,
    logIn,
    withdraw,
    deposit,
    setSuccess,
    setError
  };
};

const initialState = {
  users:[
    {
      name:'abel',
      email:'abel@mit.edu',
      password:'secret',
      balance:100
    },
    {
      name:'alvaro',
      email:'alvaro@gmail.com',
      password:'secret',
      balance:100
    }
  ],
  currentUser: null,
  success: false,
  showError: false
}

function reducer(state, action) {
  console.log('In reducer')
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: action.payload };
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERS":
      return {...state, users: action.payload}
    case "UPDATE_USER": 
      return {...state, currentUser: action.payload}
    case "SET_SUCCESS":
      return {...state, success: action.payload}
    case "SET_ERROR":
      return {...state, error: action.payload}
    default:
    break;
  }
}

/*
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER": {
      console.log(`New User: ${action}`)
      return {
        ...state,
        users : [
        ...state.users,
        {
          name: action.userInfo.name,
          email: action.userInfo.email,
          password: action.userInfo.password,
          balance: action.userInfo.balance,
        }]
      };
    }
    case "LOGIN":
      console.log(`Login: ${action.userEmail}`)
      return {
        ...state,
        userLoggedIn: action.userEmail,
        userAuthenticated : true
      };
    case "LOGOUT":
      return {
        ...state,
        userLoggedIn: null,
        userAuthenticated : false
      };
    case "WITHDRAW":
      return {};
    case "DEPOSIT":
      console.log(`New deposit: ${action.amount} ${state.userLoggedIn}`)
      let newUsers = state.users.map( element => {
        if (element.email === state.userLoggedIn) {
          element.balance += action.amount;
        }
        return element;
      })
      return {
        ...state,
        users: newUsers
      };
    default:
      return state;
  }
}
*/



export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);
  const value = { state, dispatch, actions };


  /*const value = {
    users: state.users,
    userLoggedIn: state.userLoggedIn,
    userAuthenticated: state.userAuthenticated,
    addUser: (userInfo) => {
      dispatch({ type: actions.ADD_USER, userInfo });
    },
    loginUser: (userEmail) => {
      dispatch({ type: actions.LOGIN, userEmail });
    },
    deposit: (amount) => {
      dispatch({ type: actions.DEPOSIT, amount})
    },
  };*/

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};