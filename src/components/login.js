import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { BankForm } from "./bankform";
import { BankCard } from "./bankcard";

export function Login() {
  const { usersState, actions } = useContext(UsersContext);

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
    console.log(JSON.stringify(values));
    let errors = {};

    errors = { ...validateEmail(values.Email) };
    errors = { ...errors, ...validatePassword(values.Password) };

    return errors;
  };

  let formFields = [
    { id: "Email", placeholder: "Enter email", type: "email" },
    { id: "Password", placeholder: "Enter password", type: "password" },
  ];

  let initialValues = {
    Email: "",
    Password: "",
  };

  function handleCreate(data) {
    console.log(JSON.stringify(data));
    return actions.login({ email: data.Email, password: data.Password });
  }

  const renderLoginForm = () => {
    return (
      <BankForm
        bgcolor="primary"
        label="Login"
        handle={handleCreate}
        validateFields={validateFields}
        fields={formFields}
        initialValues={initialValues}
        hideAmount={true}
        successButton="Logout"
      />
    );
  };

  const renderLogoutForm = () => {
    return (
      <>
        <h5>User logged in</h5>
        <div>Welcome {usersState.currentUser}</div>
      </>
    );
  };

  return (
    <BankCard
      txtcolor="black"
      header="Login"
      body={!usersState.currentUser ? 
          renderLoginForm() : 
          renderLogoutForm()
      }
    />
  );
}
