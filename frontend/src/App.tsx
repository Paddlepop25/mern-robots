import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageBody, PageContainerStyled, PageContentWrap } from './App.styles';
import CreateRobotForm from './components/Form/CreateRobotForm';
import Navbar from './components/Navbar/Navbar';
import Robots from './Pages/Robots';
import Adage from './Pages/Adage';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';
import RobotDetails from './components/RobotDetails/RobotDetails';
import EditRobotForm from './components/Form/EditRobotForm';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <PageContainerStyled>
        <PageContentWrap>
          <Navbar />
          <PageBody>
            <Switch>
              <Route path='/' component={HomePage} exact />
              <Route path='/adage' component={Adage} />
              <Route path='/create' component={CreateRobotForm} />
              <Route path='/editform/:nickname' component={EditRobotForm} />
              <Route path='/robots/:nickname' component={RobotDetails} />
              <Route path='/robots' component={Robots} />
              <Route component={PageNotFound} />
            </Switch>
          </PageBody>
          <Footer />
        </PageContentWrap>
      </PageContainerStyled>
    </Router>
  );
}

export default App;
