import React from "react";
import MainPage from "./components/MainPage/MainPage";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import costsDb from "./db/costs.json";
import incomesDb from "./db/incomes.json";

const App = () => (
  <>
    <MainPage costsDb={costsDb} incomesDb={incomesDb} />
    <TransactionPage title={"Расходы"} />
  </>
);

export default App;
