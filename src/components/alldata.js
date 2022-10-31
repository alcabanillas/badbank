import { useContext } from "react";
import { UserContext } from "../state/AppState";

export function AllData(){
  const users = useContext(UserContext);
  return (
    <div>
    <h1>AllData</h1>
    <span>{JSON.stringify(users)}</span>
    </div>
  )
}