import "./App.css";
import { Route, HashRouter, Routes } from "react-router-dom";
import { NavBar } from "./navbar";
import { Home } from "./components/home";
import { CreateAccount } from "./components/createaccount";
import { Login } from "./components/login";
import { Deposit } from "./components/deposit";
import { WithDraw } from "./components/withdraw";
import { Balance } from "./components/balance";
import { AllData } from "./components/alldata";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";


function App() {

  return (
    <HashRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/createaccount" element={<CreateAccount />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/deposit" element={<Deposit />}></Route>
          <Route path="/withdraw" element={<WithDraw />}></Route>
          <Route path="/balance" element={<Balance />}></Route>
          <Route path="/alldata" element={<AllData />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
