import { useContext } from "react";
import { UsersContext } from "../state/AppState";

export function AllData() {
  const { usersState } = useContext(UsersContext);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Password</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>
        {usersState.users.map((element) => {
          return (
            <tr>
              <td>{element.email}</td>
              <td>{element.name}</td>
              <td>{element.password}</td>
              <td>{element.balance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
