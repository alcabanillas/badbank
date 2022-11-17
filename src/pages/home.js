import { BankCard } from "../components/bankcard";

export function Home() {
  const setHomeText = () => <p>Welcome to the most unsafe bank in the world. Because not everything is about the money... <i className="bi bi-coin"></i></p>

  return (
    <div className="card-container home">
      <BankCard
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text= {setHomeText()}
        body={
          <img src="/images/home.png" className="card-img-top" alt="..." />
        }
      />
    </div>
  );
}

/*
const customStyles = {
  width: "20rem",
  padding: "10px",
  zIndex: "-1",
};

export function Home() {
  return (
    <div className="card-container home">
      <div className="card" style={customStyles}>
      <div className="card-body">
        <h5 className="card-title">Welcome to the bank</h5>
        <img src="/images/home.png" className="card-img-top" alt="..." />
          <p className="card-text">
            Welcome to the most unsafe bank in the world. Because not everything is about the money... <i class="bi bi-coin"></i>
          </p>
        </div>
      </div>
    </div>
  );
}
*/