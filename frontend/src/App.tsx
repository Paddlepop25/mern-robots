import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Entries from './components/Pages/Entries';
import HomePage from './components/Pages/HomePage';
import PageNotFound from './components/Pages/PageNotFound';
import { PageBody } from './App.styles';

function App() {
  return (
    <Router>
      <Navbar />
      <PageBody>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/form' component={Form} />
          <Route path='/entries' component={Entries} />
          <Route component={PageNotFound} />
        </Switch>
      </PageBody>
    </Router>
  );
}

export default App;
