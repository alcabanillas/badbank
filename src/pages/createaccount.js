import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { BankForm } from "../components/bankform";
import { BankCard } from "../components/bankcard";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export function CreateAccount() {
  const { actions } = useContext(UsersContext);
  const [show, setShow ] = useState(true)
  const [ toastProps, setToastProps ] = useState({showToast : false, text: '', background: '',  })

  const toggleShowToast = () => {
    setToastProps({...toastProps, showToast : false});
  }

  console.log(JSON.stringify(toastProps));

  const handleCreate = (data) => {
    console.log(`Handle create`)

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

  const validateEmail = (email) => {
    if (!email) return { Email: "Field required" };
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return { Email: "Username should be and email" };
    return {};
  };

  const validatePassword = (password) => {
    if (!password) return { Password: "Field required" };
    if (password.length < 8) return { Password: "Password must have at least 8 chars"}
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

  function CustomToast({show, toggleShow, header, text, type}) {

    let background = 'Secondary';
    let icon = 'bi bi-info-circle';

    switch (type) {
      case 'success':
        background = 'success';
        icon = 'bi bi-check-circle';
        break;
      case 'error':
        background = 'danger';
        icon = 'bi bi-exclamation-circle';
        break
      case 'info':
        background = 'Warning';
        icon = 'bi bi-exclamation-triangle';
        break
      default:
        break;
    }

    return (
      <ToastContainer className="p-3" position="top-end">
      <Toast className="d-inline-block m-1" bg={background.toLowerCase()} show={show} role="alert" onClose={toggleShow} delay={3000} autohide>
        <Toast.Header>
          <i className={icon}></i>
          &nbsp;
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
  }
  

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
