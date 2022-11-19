import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { useToastContext} from "../state/CustomToast";
import { BankCard } from "../components/bankcard";
import  BankForm from "../components/bankform";
import * as yup from "yup";


export const Deposit = () => {
  const { usersState, actions } = useContext(UsersContext);
  const addToast = useToastContext();

  const user = usersState.users.find(
    (elem) => elem.email === usersState.currentUser
  );

  const handleSubmit = (data) => {
    const {result, errorMessage } = actions.deposit(Number(data.Amount));
    
    if (result) {
      addToast({text: 'Deposit successfully done', type: 'success'})
    }
    else {
      addToast({text: errorMessage, type: 'error'})
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
