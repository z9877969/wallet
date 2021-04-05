import React, { Component } from "react";
import MainPage from "./components/MainPage/MainPage";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import costsDb from "./db/costs.json";
import incomesDb from "./db/incomes.json";

class App extends Component {
    state = {
        activeCard: "",
    };

    handleToggleCard = (cardId = "") => {
        this.setState({ activeCard: cardId });
    };

    render() {
        return (
            <>
                {this.state.activeCard === "" && (
                    <MainPage
                        costsDb={costsDb}
                        incomesDb={incomesDb}
                        handleToggleCard={this.handleToggleCard}
                    />
                )}
                {this.state.activeCard === "costs" && (
                    <TransactionPage
                        title={"Расходы"}
                        handleToggleCard={this.handleToggleCard}
                        cardId="costs"
                    />
                )}
                {this.state.activeCard === "incomes" && (
                    <TransactionPage
                        title={"Доходы"}
                        handleToggleCard={this.handleToggleCard}
                        cardId="incomes"
                    />
                )}
            </>
        );
    }
}

export default App;
