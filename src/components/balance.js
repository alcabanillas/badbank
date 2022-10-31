import { useContext } from "react";
import { UserContext } from "../state/AppState";

export function Balance(){
  //Check the balance of any one user by their given email
  const ctx = useContext(UserContext);
  return (
    <div>
    <h1>Balance</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}