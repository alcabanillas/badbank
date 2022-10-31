import { useContext, useState } from "react";
import { UserContext } from "../state/AppState";
import {BankCard} from "./bankcard"


export function CreateAccount(){
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {addUser} = useContext(UserContext);

  function validate(field, label){
    if (!field) {
      setStatus(`Error: ${label}`)
      setTimeout( () => setStatus(''), 3000)
      return false;
    }
    return true;
  }

  const handleCreate = () => {
    console.log(name, email, password);
    if (!validate(name,'name')) return;
    if (!validate(email,'email')) return;
    if (!validate(password,'password')) return;

    addUser({name, email, password, balance:150})
    setShow(false)
  }

  function clearForm(){
    setName('')
    setEmail('')
    setPassword('')
    setShow(true)
  }

  return (
    <BankCard 
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <>
        Name <br />
        <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)}/><br />
        Email Address <br />
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br />
        Password <br />
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br />
        <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
        </>
      ) : (
        <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
        </>
      )}
    />
  )
}