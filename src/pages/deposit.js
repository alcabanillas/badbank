import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { ATMDeposit } from "../components/ATMDeposit";
import { BankCard } from "../components/bankcard";

export const Deposit = () => {
  const [amount, setAmount] = useState(0); // state of this transaction
  const [validTransaction, setValidTransaction] = useState(false);

  const { usersState, actions } = useContext(UsersContext);
  const user = usersState.users.find(
    (elem) => elem.email === usersState.currentUser
  );

  const handleChange = (event) => {
    if (Number(event.target.value) < 0) {
      setValidTransaction(false);
      return;
    }

    setValidTransaction(true);
    setAmount(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    actions.deposit(amount);
    setAmount(0);
    setValidTransaction(false);    
    event.preventDefault();
  };

  return usersState.currentUser ? (
    <BankCard
      txtcolor="black"
      header="Deposit"
      body={
        <form onSubmit={handleSubmit} className="container overflow-hidden">
          <div className="row text-center">
            <h3 className="col" id="total">
              Balance ${user.balance}
            </h3>

            <ATMDeposit onChange={handleChange} isValid={validTransaction} />
          </div>
        </form>
      }
    ></BankCard>
  ) : (
    <div>You must be logged in to use this function</div>
  );
};
