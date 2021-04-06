import React, { Component } from 'react';
import MainPage from './components/MainPage';
import TransactionPage from './components/TransactionPage';
import costsDb from './db/costs.json';
import incomesDb from './db/incomes.json';

class App extends Component {
  state = {
    activeCard: '',
    costs: [],
    incomes: [],
  };

  componentDidMount() {
    console.log('cdu');

    const costs = JSON.parse(localStorage.getItem('costs'));

    const incomes = JSON.parse(localStorage.getItem('incomes'));
    this.setState({
      costs: costs ? costs : [],
      incomes: incomes ? incomes : [],
    });
  }

  handleSubmit = (data, cardId) => {
    console.log(data, cardId);

    if (cardId) {
      this.setState(prevState => {
        console.log(prevState[cardId]);
        return { [cardId]: [...prevState[cardId], data] };
      });
    }
  };

  handleToggleCard = (cardId = '') => {
    this.setState({ activeCard: cardId });
  };

  render() {
    console.log(this.state);
    return (
      <>
        {this.state.activeCard === '' && (
          <MainPage
            costsDb={costsDb}
            incomesDb={incomesDb}
            handleToggleCard={this.handleToggleCard}
          />
        )}
        {this.state.activeCard === 'costs' && (
          <TransactionPage
            title={'Расходы'}
            handleToggleCard={this.handleToggleCard}
            handleSubmit={this.handleSubmit}
            cardId="costs"
          />
        )}
        {this.state.activeCard === 'incomes' && (
          <TransactionPage
            title={'Доходы'}
            handleToggleCard={this.handleToggleCard}
            handleSubmit={this.handleSubmit}
            cardId="incomes"
          />
        )}
      </>
    );
  }
}

export default App;
