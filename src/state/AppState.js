import React, {useReducer, createContext} from "react";
//Context and Provider
export const UserContext = createContext();

const actions = {
  ADD_USER: "ADD_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USERS: "UPDATE_USERS"
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
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, 
        currentUser: action.payload };
    case actions.LOGOUT:
      return { ...state, 
        currentUser: null };
    case actions.UPDATE_USERS:
      return {...state, users: action.payload}
    case "SET_SUCCESS":
      return {...state, success: action.payload}
    case "SET_ERROR":
      return {...state, error: action.payload}
    default:
      throw new Error();
  }
}

const actionsDispatcher = (state, dispatch) => {
  const addUser = (userInfo) => {
    let currentUser = state.users.find( elem => elem.email === userInfo.email)
    if (currentUser) {
      alert('User already exists')
      return false;
    }
    dispatch({ type: actions.UPDATE_USERS, payload: [...state.users, userInfo] });
    return true;
  }

  const loginUser = (credentials) => {
    let currentUser = state.users.find( elem => elem.email === credentials.email && elem.password === credentials.password)

    if (!currentUser) {
      alert('Invalid credentials')
      return false;
    }

    dispatch({ type: actions.LOGIN, payload: credentials.email })
    return true;
  }

  const logoutUser = () => {
    dispatch({ type: actions.LOGOUT})
    return true;
  }

  const deposit = (amount) => {
    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance += amount;
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })
  }

  const withDraw = (amount) => {
    let newUsers = state.users.map( element => {
      if (element.email === state.currentUser) {
        element.balance -= amount;
      }
      return element;
    })
    dispatch({ type: actions.UPDATE_USERS, payload: newUsers })
  }

  return {
    addUser,
    loginUser,
    logoutUser,
    withDraw,
    deposit
  }

}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = actionsDispatcher(state, dispatch);

  const value = { state, actions };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};