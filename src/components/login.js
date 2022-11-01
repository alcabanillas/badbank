import { useContext, useState } from "react";
import { BankCard } from "./bankcard";
import { UsersContext } from "../state/AppState";
import { Navigate } from "react-router-dom";


export function Login() {
  const {usersState, actions} = useContext(UsersContext)
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validate(field, label){
    if (!field) {
      setStatus(`Error: ${label}`)
      setTimeout( () => setStatus(''), 3000)
      return false;
    }
    return true;
  }

  function handleLogin(){
    if (!validate(email,'email')) return;
    if (!validate(password,'password')) return;

    const {result, errorMessage} = actions.login({email, password});

    if (!result) alert(errorMessage)
  }

  function handleLogout(){
    actions.logout();
  }

  return (
    
    <BankCard
      txtcolor="black"
      header = "Login"
      status={status}
      body =         
        { !usersState.currentUser ? (
          <>
          Email<br/>
          <input type = "input" className="form-control" id="email" placeholder="Enter login" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
          Password <br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
          </>
          ) : (<Navigate to="/" replace={true} />)
        }
    />
  );
}
