const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;

const UserContext = React.createContext();

const authContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
});


const initialState = {
  users: [
    {
      name: "Alvaro",
      email: "alvaro@gmail.com",
      password: "asecret",
      balance: 100,
    },
    {
      name: "Lorena",
      email: "lorena@gmail.com",
      password: "lsecret",
      balance: 200,
    },
  ],
};

function BankCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <div className="card-text">{props.text}</div>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
