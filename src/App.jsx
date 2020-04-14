import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';

import Header from './components/Header';
import Back from './components/Back';

// page
import ReadPage from './pages/ReadPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <>
      <Header />
      <Route exact path="/read/:id" component={Back} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/read/:id" component={ReadPage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}
