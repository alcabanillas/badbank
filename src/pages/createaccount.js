import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { BankForm } from "../components/bankform";
import { BankCard } from "../components/bankcard";
import { CustomToast } from "../components/customtoast";
import { validateEmail, validatePassword } from "../services/validator";


export function CreateAccount() {
  const { actions } = useContext(UsersContext);
  const [show, setShow ] = useState(true)
  const [ toastProps, setToastProps ] = useState({showToast : false, text: '', background: '',  })

  const toggleShowToast = () => {
    setToastProps({...toastProps, showToast : false});
  }

  const handleCreate = (data) => {

    const {result, errorMessage} = actions.addUser({
      name: data.Name,
      email: data.Email,
      password: data.Password,
      balance: 100,
    });

    if (result) {
      setShow(false)
      setToastProps({showToast: true, text: 'Account successfully created', type: 'success'})
    } else {
      setToastProps({showToast: true, text: errorMessage, type: 'error'})
    }

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

    return (
      <BankForm
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
      <div className="create-account">
        <h5>Success</h5>
        <div className="">
        <button type="submit" className="btn btn-light" onClick={ () => clearForm()}>
        Add another account
        </button>
        </div>
      </div>
    );
  };


  return (
    <div className="card-container create-account">
      <CustomToast show={toastProps.showToast} header={`Bad bank`} text={toastProps.text} type={toastProps.type} toggleShow={toggleShowToast}/>
      <BankCard 
        txtcolor="black"
        header="Create account"
        body={show ? renderCreateAccountForm() : renderNewAccount()}
      />
      
    </div>
  );
}
