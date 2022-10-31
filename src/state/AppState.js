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


/*function reducer(state, action) {
  console.log(action.type)
  switch (action.type) {
    case actions.ADD_USER: {
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
    case actions.LOGIN:
      
    case actions.LOGOUT:
      return {
        ...state,
        userLoggedIn: null,
        userAuthenticated : false
      };
    case actions.WITHDRAW:
      return {};
    case actions.DEPOSIT:
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
}*/

const useActions = (state, dispatch) => {
  const addUser = (userInfo) => {
    let currentUser = state.users.find( elem => elem.email === userInfo.email)
    if (currentUser) {
      alert("User already exists")
      return;
    }
    dispatch({ type: actions.UPDATE_USERS, payload: [...state.users, userInfo] });
  }

  const loginUser = (credentials) => {
    let currentUser = state.users.find( elem => elem.email === credentials.email && elem.password === credentials.password)

    if (!currentUser) {
      alert("Invalid credentials")
      return;
    }

    dispatch({ type: actions.LOGIN, payload: credentials.email })
  }

  const logoutUser = () => {
    dispatch({ type: actions.LOGOUT})
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




export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  const value = {
    state,
    actions
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};