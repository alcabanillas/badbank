import { useContext } from "react";
import { UserContext } from "../state/context";

export function AllData(){
  const ctx = useContext(UserContext);
  return (
    <div>
    <h1>AllData</h1>
    <span>{JSON.stringify(ctx)}</span>
    </div>
  )
}