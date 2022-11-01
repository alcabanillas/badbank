import { NavBar } from "../routes/navbar";
import { BankCard } from "./bankcard";

export function Home() {
  return (
    <div>
      <BankCard
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can use this bank."
        body={
          <img src="bank.png" className="img-fluid" alt="Responsive image" />
        }
      />
    </div>
  );
}
