import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import MainPage from './components/MainPage';
import TransactionPage from './components/TransactionPage';
import PageCategoriesForPeriod from './pages/pageCategoriesForPeriod';
import PageTransactionsList from './pages/pageTransactionsList';
import costsDb from './db/costs.json';
import incomesDb from './db/incomes.json';

class App extends Component {
  state = {
    activeCard: '',
    costs: [],
    incomes: [],
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
    const { costs, incomes } = this.state;
    return (
      <>
        <Switch>
          <Route
            path="/"
            exact
            render={roterProps => (
              <MainPage
                {...roterProps}
                costs={costs}
                incomes={incomes}
                costsDb={costsDb}
                incomesDb={incomesDb}
                handleToggleCard={this.handleToggleCard}
                costs={this.state.costs}
                incomes={this.state.incomes}
              />
            )}
          />
          <Route
            path="/costs"
            render={props => (
              <TransactionPage
                {...props}
                title={'Расходы'}
                handleToggleCard={this.handleToggleCard}
                handleSubmit={this.handleSubmit}
                cardId="costs"
              />
            )}
          />
          <Route
            path="/incomes"
            render={props => (
              <TransactionPage
                {...props}
                title={'Доходы'}
                handleToggleCard={this.handleToggleCard}
                handleSubmit={this.handleSubmit}
                cardId="incomes"
              />
            )}
          />
          <Route
            path="/categories/:category/list"
            render={() => (
              <PageTransactionsList costs={costs} incomes={incomes} />
            )}
          />
          {/* <Route path="/categories/:category" component={PageCategoriesForPeriod}/> */}
          <Route
            path="/categories/:category"
            render={() => (
              <PageCategoriesForPeriod costs={costs} incomes={incomes} />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default App;
