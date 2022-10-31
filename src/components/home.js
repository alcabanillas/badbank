import { useContext, useState } from "react";
import { UserContext } from "../state/AppState";
import { BankCard } from "./bankcard";

export function Home() {
  const ctx = useContext(UserContext);

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
