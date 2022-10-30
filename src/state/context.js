
import { createContext } from "react";

export const UserContext = createContext();

export const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
});


export const initialState = {
  users: [
    {
      name: "Alvaro",
      email: "alvaro@gmail.com",
      password: "asecret",
      balance: 100,
    },
    {
      name: "Lorena",
      email: "lorena@gmail.com",
      password: "lsecret",
      balance: 200,
    },
  ],
};


