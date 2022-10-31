import { useContext, useState } from "react";
import { BankCard } from "./bankcard";
import { UserContext } from "../state/AppState";

export function Login() {
  const {state, actions} = useContext(UserContext)
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

    actions.loginUser({email, password});
  }

  function handleLogout(){
    actions.logoutUser();
  }

  return (
    
    <BankCard
      txtcolor="black"
      header = "Login"
      status={status}
      body =         
        { !state.currentUser ? (
          <>
          Email<br/>
          <input type = "input" className="form-control" id="email" placeholder="Enter login" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
          Password <br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
          </>
          ) : (<div>User logged in<br />
          <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button></div>)
        }
    />
  );
}
