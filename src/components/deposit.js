import { useContext, useState } from "react";
import { UserContext } from "../state/context";

export const Deposit = () => {
  const [deposit, setDeposit] = useState(0); // state of this transaction
  const [validTransaction, setValidTransaction] = useState(false);

  let ctx = useContext(UserContext);
  let user = ctx.users.find( elem => ctx.userLoggedIn == elem.email);

  const handleChange = (event) => {
    if (Number(event.target.value) < 0) {
      setValidTransaction(false);
      return;
    }


    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = user.balance + deposit;

    ctx.users.map( (elem) => {})
    setTotalState(newTotal);
    console.log(`NewTotal = ${newTotal}`);

    event.preventDefault();
  };


  return (<div>{JSON.stringify(user)}</div>);
};