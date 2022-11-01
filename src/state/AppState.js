import React, {useReducer, createContext} from "react";
//Context and Provider
export const UsersContext = createContext();

const actions = {
  ADD_USER: "ADD_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_USERS: "UPDATE_USERS",
  SET_ERROR: "SET_ERROR"
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
  showError: false,
  errorMessage: ""
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
    case actions.SET_ERROR:
      return {...state, showError: action.payload.showError, errorMessage: action.payload.errorMessage}
    default:
      throw new Error();
  }
}

const actionsDispatcher = (state, dispatch) => {
  const addUser = (userInfo) => {
    let currentUser = state.users.find( elem => elem.email === userInfo.email)
    if (currentUser) {
      return { result : false, errorMessage: 'User already exists'};
    }

    dispatch({ type: actions.UPDATE_USERS, payload: [...state.users, userInfo] });
    return {result : true};
  }

  const login = (credentials) => {
    let currentUser = state.users.find( elem => elem.email === credentials.email && elem.password === credentials.password)

    if (!currentUser) {
      return { result : false, errorMessage: 'Invalid credentials'};
    }

    dispatch({ type: actions.LOGIN, payload: credentials.email })
    return { result : true};
  }

  const logout = () => {
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

  const clearError = () => {
    dispatch({type: actions.SET_ERROR, payload : {showError:false, errorMessage: ''}})
  }

  return {
    addUser,
    login,
    logout,
    withDraw,
    deposit,
    clearError
  }

}

export const ContextProvider = ({ children }) => {
  const [usersState, dispatch] = useReducer(reducer, initialState);
  const actions = actionsDispatcher(usersState, dispatch);

  const value = { usersState, actions };
  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};