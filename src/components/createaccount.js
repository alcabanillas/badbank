import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { BankForm } from "./bankform";
import { BankCard } from "./bankcard";

export function CreateAccount() {
  const { actions } = useContext(UsersContext);
  const [show, setShow ] = useState(true)

  const handleCreate = (data) => {
    console.log(`Handle create`)

    const {result, errorMessage} = actions.addUser({
      name: data.Name,
      email: data.Email,
      password: data.Password,
      balance: 100,
    });

    if (result) setShow(false)
    return {result, errorMessage};
  };

  let formFields = [
    { id: "Name", placeholder: "Enter name", type: "input" },
    { id: "Email", placeholder: "Enter email", type: "email" },
    { id: "Password", placeholder: "Enter password", type: "password" },
  ];

  let initialValues = {
    Name: "",
    Password: "",
    Email: "",
  };

  const validateName = (data) => {
    if (!data) return { Name: "Field required" };
    return {};
  };

  const validateEmail = (email) => {
    if (!email) return { Email: "Field required" };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return { Email: "Username should be and email" };
    return {};
  };

  const validatePassword = (password) => {
    if (!password) return { Password: "Field required" };
    return {};
  };

  const validateFields = (values) => {
    let errors = {};

    errors = { ...validateName(values.Name) };
    errors = { ...errors, ...validateEmail(values.Email) };
    errors = { ...errors, ...validatePassword(values.Password) };

    return errors;
  };

  const clearForm = () => {
    setShow(true)
  }

  const renderCreateAccountForm = () => {
    console.log('renderCreateAccountForm');
    return (
      <BankForm
        bgcolor="primary"
        label="Create Account"
        handle={handleCreate}
        validateFields={validateFields}
        fields={formFields}
        initialValues={initialValues}
        hideAmount={true}
      />
    );
  };

  const renderNewAccount = () => {
    return (
      <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={ () => clearForm()}>
        Add another account
        </button>
      </>
    );
  };

  console.log(`Status: ${show}`)

  return (
    <BankCard
      bgcolor="primary"
      header="Create account"
      body={show ? renderCreateAccountForm() : renderNewAccount()}
    />
  );
}
