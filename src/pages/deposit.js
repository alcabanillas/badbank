import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { BankCard } from "../components/bankcard";
import  BankForm from "../components/bankform";
import { CustomToast } from "../components/customtoast";
import * as yup from "yup";


export const Deposit = () => {
  const { usersState, actions } = useContext(UsersContext);
  const [ toastProps, setToastProps ] = useState({showToast : false, text: '', background: '',  })

  const user = usersState.users.find(
    (elem) => elem.email === usersState.currentUser
  );

  const toggleShowToast = () => {
    setToastProps({...toastProps, showToast : false});
  }

  const handleSubmit = (data) => {
    debugger
    const {result, errorMessage } = actions.deposit(Number(data.Amount));
    
    if (result) {
      setToastProps({showToast: true, text: 'Deposit successfully done', type: 'success'})
    }
    else {
      setToastProps({showToast: true, text: errorMessage, type: 'error'})
    }

    return {result, errorMessage: ''};
  };

  let formFields = [
    { id: "Amount", placeholder: "Enter amount", type: "input" },
  ];

  let initialValues = {
    Amount: "",
  };

  const schema = yup.object().shape({
    Amount: yup.number()
      .test('is-decimal','Amount must be a currency', 
        value => value.toString().match(/^-?\d+(\.\d{1,2})?$/g))
      .typeError('Amount must be a valid number')
      .min(0, 'Amount must be a positive number')
      .required()
  });
  

  const renderDepositForm = () => {
    return (
      <BankForm
        buttonSubmit="Deposit"
        handle={handleSubmit}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  }

  return (
    <div className="card-container Deposit">
      <CustomToast show={toastProps.showToast} header={`Bad bank`} text={toastProps.text} type={toastProps.type} toggleShow={toggleShowToast}/>
      <BankCard 
        txtcolor="black"
        header="Deposit"
        body={
          usersState.currentUser? (
          <div>
            <h3 className="col" id="total">
              Balance ${user.balance}
            </h3>
            {renderDepositForm()}
          </div>):(<div>You must be logged in to use this function</div>)}
      />
    </div>
  );  

};
