import { useContext, useState } from "react";
import { UserContext } from "../state/AppState";
import { BankForm } from "./bankform";


export function CreateAccount(){
  const {state, actions} = useContext(UserContext);

  const handleCreate = (data) => {
    return actions.addUser({name:data.Name, email:data.Email, password:data.Password, balance:100})
  }

  let formFields = [
    {name: 'Name', value:'', placeholder: 'Enter name', type: 'input'},
    {name: 'Email', value:'', placeholder: 'Enter email', type: 'email'},
    {name: 'Password', value:'', placeholder: 'Enter password', type: 'password'},
  ]

  return (
    <BankForm 
      bgcolor="primary"
      label="Create Account"
      handle = {handleCreate}
      fields = {formFields}
      hideAmount={true}
      successButton="Add another account" 
    />
  )

  /*return (
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
  )*/
}