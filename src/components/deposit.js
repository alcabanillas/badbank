import { useContext, useState } from "react";
import { UserContext } from "../state/context";
import {ATMDeposit} from "./ATMDeposit"

export const Deposit = () => {
  const [deposit, setDeposit] = useState(0); // state of this transaction
  const [validTransaction, setValidTransaction] = useState(false);

  let ctx = useContext(UserContext);
  let user = ctx.users.find( elem => ctx.userLoggedIn === elem.email);

  const handleChange = (event) => {
    if (Number(event.target.value) < 0) {
      setValidTransaction(false);
      return;
    }

    setValidTransaction(true);
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = user.balance + deposit;

    console.log(`NewTotal = ${newTotal}`);

    event.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit} className="container overflow-hidden">
      <div className="row text-center">
        <h2 className="col" id="total">
          Balance ${user.balance}
        </h2>
      </div>
      
      <ATMDeposit onChange={handleChange} isValid={validTransaction} />
    </form>
  );
};