import { useContext, useState } from "react";
import { UserContext, authContext } from "../state/context";
import { BankCard } from "./bankcard";

export function Login() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ctx = useContext(UserContext);
  const {authenticated, setAuthenticated} = useContext(authContext);

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

    let user = ctx.users.find( element =>  element.email == email)

    if (user && user.password == password){
      console.log(`${user.name} logged in`)
      setAuthenticated(true);
      ctx.userLoggedIn = user.email;
    }
  }

  return (
    <BankCard
      txtcolor="black"
      header = "Login"
      status={status}
      body =         
        { authenticated == false ? (
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
