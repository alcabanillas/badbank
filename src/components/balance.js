import { useContext } from "react";
import { UserContext } from "../state/context";

export function Balance(){
  const ctx = useContext(UserContext);
  return (
    <div>
    <h1>Balance</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}