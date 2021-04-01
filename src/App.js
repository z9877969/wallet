import React from "react"
import MainPage from "./components/MainPage/MainPage"
import costsDb from "./db/costs.json"
import incomesDb from "./db/incomes.json"

const App = () => <MainPage costsDb={costsDb} incomesDb={incomesDb} />

export default App
