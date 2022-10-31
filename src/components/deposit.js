import { useContext, useState } from "react";
import { UserContext } from "../state/AppState";
import { ATMDeposit } from "./ATMDeposit";

export const Deposit = () => {
  const [amount, setAmount] = useState(0); // state of this transaction
  const [validTransaction, setValidTransaction] = useState(false);

  let {state, actions} = useContext(UserContext);
  const user = state.users.find((elem) => elem.email === state.currentUser.email);

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
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="container overflow-hidden">
      {JSON.stringify(state)}
      <div className="row text-center">
        <h2 className="col" id="total">
          Balance ${user.balance}
        </h2>
      </div>

      <ATMDeposit onChange={handleChange} isValid={validTransaction} />
    </form>
  );
};
