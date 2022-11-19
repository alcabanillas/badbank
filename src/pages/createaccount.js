import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import  BankForm from "../components/bankform";
import { BankCard } from "../components/bankcard";
import { CustomToast } from "../components/customtoast";
import * as yup from "yup";


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

  const schema = yup.object().shape({
    Name: yup.string().required(),
    Email: yup.string().email('User must be a valid email').required(),
    Password: yup.string().min(8,'Password must have at least 8 chars').required()
  });

 
  const clearForm = () => {
    setShow(true)
  }

  const renderCreateAccountForm = () => {
    return (
      <BankForm
        buttonSubmit="Create Account"
        handle={handleCreate}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  const renderNewAccount = () => {
    return (
      <div className="create-account">
        <h5>Success</h5>
        <div className="">
        <button type="submit" className="btn btn-primary" onClick={ () => clearForm()}>
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
