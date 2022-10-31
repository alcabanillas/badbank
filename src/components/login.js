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

    //let user = state.users.find( element =>  element.email === email)

    //if (user && user.password === password){
    //  console.log(`${user.name} logged in`)
      
      
    //}
    actions.logIn({email, password});
  }

  return (
    
    <BankCard
      txtcolor="black"
      header = "Login"
      status={status}
      body =         
        { state.currentUser == null ? (
          <>
          Email<br/>
          <input type = "input" className="form-control" id="email" placeholder="Enter login" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
          Password <br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input><br/>
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
          </>
          ) : (<div>User logged in</div>)
        }
    />
  );
}
