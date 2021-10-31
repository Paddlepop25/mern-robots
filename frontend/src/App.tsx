import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Favourites from './Pages/Robots';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';
import { PageBody } from './App.styles';
import RobotDetails from './components/RobotDetails/RobotDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <PageBody>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/form' component={Form} />
          <Route path='/my-favourites/:nickname' component={RobotDetails} />
          <Route path='/my-favourites' component={Favourites} />
          <Route component={PageNotFound} />
        </Switch>
      </PageBody>
    </Router>
  );
}

export default App;
