import { useContext } from "react";
import { UsersContext } from "../state/AppState";

export function NavBar() {
  const { usersState, actions } = useContext(UsersContext);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
            {usersState.currentUser && (
              <li className="nav-item">
                <a className="nav-link" href="#/deposit">
                  Deposit
                </a>
              </li>
            )}
            {usersState.currentUser && (
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw">
                  WithDraw
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#/balance">
                Balance
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#/allData">
                AllData
              </a>
            </li>
            {!usersState.currentUser ? (
              <li className="nav-item">
                <a className="nav-link" href="#/login">
                  Login
                </a>
              </li>
            ) : (
              <a className="nav-link" href="/#" onClick={ (e) => {e.preventDefault(); actions.logout()}}>
                Logout
              </a>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
