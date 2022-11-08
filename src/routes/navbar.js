import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export function NavBar() {
  const { usersState, actions } = useContext(UsersContext);

  const renderToolTip = (props) => (
    <Tooltip id={`tooltip-${props.tooltipId}`}>{props.text}</Tooltip>
  );

  const CustomTooltip = (props) => {
    return (
      <OverlayTrigger placement={props.placement || "bottom"} overlay={renderToolTip(props)}>
        {props.children}
      </OverlayTrigger>
    );
  };

  return (
    <nav
      className="navbar sticky-top navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <CustomTooltip text="Home" tooltipId="home">
          <NavLink className="navbar-brand" to="/">
            BadBank
          </NavLink>
        </CustomTooltip>
        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" 
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <CustomTooltip
                text="Create new account"
                tooltipId="createAccount"
              >
                <NavLink className="nav-link" to="/CreateAccount/">
                  Create Account
                </NavLink>
              </CustomTooltip>
            </li>
            {usersState.currentUser && (
              <li className="nav-item">
                <CustomTooltip text="Deposit" tooltipId="deposit">
                  <NavLink className="nav-link" to="/deposit">
                    Deposit
                  </NavLink>
                </CustomTooltip>
              </li>
            )}
            {usersState.currentUser && (
              <li className="nav-item">
                <CustomTooltip text="Withdraw" tooltipId="withDraw">
                  <NavLink className="nav-link" to="/withdraw">
                    WithDraw
                  </NavLink>
                </CustomTooltip>
              </li>
            )}

            <li className="nav-item">
              <CustomTooltip text="Balance" tooltipId="balance">
                <NavLink className="nav-link" to="/balance">
                  Balance
                </NavLink>
              </CustomTooltip>
            </li>

            <li className="nav-item">
              <CustomTooltip text="All data" tooltipId="allData">
                <NavLink className="nav-link" to="/allData">
                  AllData
                </NavLink>
              </CustomTooltip>
            </li>
            <li className="nav-item">
            {!usersState.currentUser ? (
                <CustomTooltip text="Log in" tooltipId="login">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </CustomTooltip>
            ) : ( 
              <CustomTooltip text="Log out" tooltipId="logout">
              <a className="nav-link" href="/#" onClick={(e) => { 
                  e.preventDefault();
                  actions.logout();}}>
                Logout
              </a>
              </CustomTooltip>
            )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
