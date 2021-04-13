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
    n: 0,
  };

  componentDidMount() {
    console.log('cdm');

    const costs = JSON.parse(localStorage.getItem('costs'));

    const incomes = JSON.parse(localStorage.getItem('incomes'));
    this.setState({
      costs: costs ? costs : [],
      incomes: incomes ? incomes : [],
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('cdu');
    if (prevState.costs !== this.state.costs) {
      localStorage.setItem('costs', JSON.stringify(this.state.costs));
    }
    if (prevState.incomes !== this.state.incomes) {
      localStorage.setItem('incomes', JSON.stringify(this.state.incomes));
    }
  }
  handleSubmit = (data, cardId) => {
    console.log(data, cardId);

    if (cardId) {
      this.setState(prevState => {
        console.log(prevState[cardId]);
        return { [cardId]: [...prevState[cardId], data] };
      });
      this.handleToggleCard();
    }
  };

  handleToggleCard = (cardId = '') => {
    this.setState({ activeCard: cardId });
  };

  render() {
    const { costs, incomes, n } = this.state;
    console.log('n', n);
    return (
      <>
        <button onClick={() => this.setState(({ n }) => ({ n: n + 1 }))}>
          click
        </button>
        {this.state.activeCard === '' && (
          <MainPage
            n={n}
            costs={costs}
            incomes={incomes}
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
