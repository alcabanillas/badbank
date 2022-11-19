import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import  BankForm  from "../components/bankform";
import { BankCard } from "../components/bankcard";
import { validateEmail } from "../services/validator";
import { CustomToast } from "../components/customtoast";
import * as yup from "yup";

export function Login() {
  const { usersState, actions } = useContext(UsersContext);
  const [ toastProps, setToastProps ] = useState({showToast : false, text: '', background: '',  })

  const toggleShowToast = () => {
    setToastProps({...toastProps, showToast : false});
  }

  let formFields = [
    { id: "Email", placeholder: "Enter email", type: "email" },
    { id: "Password", placeholder: "Enter password", type: "password" },
  ];

  let initialValues = {
    Email: "",
    Password: "",
  };

  const schema = yup.object().shape({
    Email: yup.string().email('User must be a valid email').required(),
    Password: yup.string().required()
  });

  function handleLogin(data) {
    const {result, errorMessage} = actions.login({ email: data.Email, password: data.Password });

    if (result) {
      setToastProps({showToast: true, text: 'User logged in', type: 'success'})
    }
    else {
      setToastProps({showToast: true, text: errorMessage, type: 'error'})      
    }
  }

  const renderLoginForm = () => {
    return (
      <BankForm
        buttonSubmit="Login"
        handle={handleLogin}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  const renderLogoutForm = () => {
    return (
      <div className="card-container logout">
        <h5>User logged in</h5>
        <div>Welcome {usersState.currentUser}</div>
      </div>
    );
  };

  return (
    <div className="card-container login">
      <CustomToast show={toastProps.showToast} header={`Bad bank`} text={toastProps.text} type={toastProps.type} toggleShow={toggleShowToast}/>      
      <BankCard
        width="20rem"
        txtcolor="black"
        header="Login"
        body={!usersState.currentUser ? 
            renderLoginForm() : 
            renderLogoutForm()
        }/>
    </div>
  );
}
