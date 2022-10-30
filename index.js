function Spa() {
  const [authenticated, setAuthenticated] = React.useState(false);

  return (
    <HashRouter>
      <UserContext.Provider value={initialState}>
        <authContext.Provider value={{authenticated, setAuthenticated }}>
          <NavBar />
          <div className="container">
            <Route path="/" exact component={Home}></Route>
            <Route path="/createaccount" exact component={CreateAccount}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/deposit" exact component={Deposit}></Route>
            <Route path="/withdraw" exact component={WithDraw}></Route>
            <Route path="/balance" exact component={Balance}></Route>
            <Route path="/alldata" exact component={AllData}></Route>
          </div>
        </authContext.Provider>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
