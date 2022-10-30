import { useContext, useState } from "react";
import { UserContext } from "../state/context";

export function WithDraw(){
  const ctx = useContext(UserContext);
  return (
    <div>
    <h1>WithDraw</h1>
    <span>{JSON.stringify(ctx.users)}</span>
    </div>
  )
}