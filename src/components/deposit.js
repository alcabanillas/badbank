import { useContext, useState } from "react";
import { UserContext } from "../state/context";

export function Deposit(){
  const ctx = useContext(UserContext);
  return (
    <div>
    <h1>Deposit</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}