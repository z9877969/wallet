import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './pages/HomePage';
import Nav from './components/Nav';
import ContactsPage from './pages/ContactsPage';
import ContactCard from './components/ContactCard';

const App = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/contacts/:contactId" component={ContactCard} />
        <Route path="/contacts" component={ContactsPage} />
      </Switch>
    </>
  );
};

export default App;
