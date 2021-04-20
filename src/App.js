import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionPage';
import PageCategoriesForPeriod from './pages/pageCategoriesForPeriod';
import PageTransactionsList from './pages/pageTransactionsList';
import costsDb from './db/costs.json';
import incomesDb from './db/incomes.json';

class App extends Component {
  state = {
    activeCard: '',
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
                costsDb={costsDb}
                incomesDb={incomesDb}
                handleToggleCard={this.handleToggleCard}
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
