import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { BankCard } from "./bankcard";

export function Balance() {
  //Check the balance of any one user by their given email
  const [userName, setUserName] = useState("");
  const { usersState } = useContext(UsersContext);
  const [userFound, setUserFound] = useState(false);
  const [userBalance, setUserBalance] = useState(null);

  const handleSubmit = () => {
    let newUser = usersState.users.find((elem) => elem.email === userName);

    if (newUser) {
      setUserBalance(newUser);
      setUserFound(true);
    }
  };

  return (
    <BankCard
      txtcolor="black"
      header="Balance"
      body={
        <>
          Email
          <br />
          <input type="input" className="form-control"
            id="userName" placeholder="Enter UserName" value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <br />
          <button type="submit" className="btn btn-light" onClick={handleSubmit} > Search </button>
          {userFound && (
            <div id="balance">
              <h1>Balance</h1>
              <span>{JSON.stringify(userBalance)}</span>
            </div>
          )}
        </>
      }
    />
  );
}
