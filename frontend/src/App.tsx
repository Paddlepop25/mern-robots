import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageBody, PageContainerStyled, PageContentWrap } from './App.styles';
import CreateRobotForm from './components/Form/CreateRobotForm';
import Navbar from './components/Navbar/Navbar';
import Favourites from './Pages/Robots';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';
import RobotDetails from './components/RobotDetails/RobotDetails';
import RobotDelete from './components/RobotDelete/RobotDelete';
import EditRobotForm from './components/Form/EditRobotForm';
import Footer from './components/Footer/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <PageContainerStyled>
        <PageContentWrap>
          <Navbar />
          <PageBody>
            <Switch>
              <Route path='/' component={HomePage} exact />
              <Route path='/form' component={CreateRobotForm} />
              <Route path='/editform/:nickname' component={EditRobotForm} />
              <Route path='/robots/:nickname' component={RobotDetails} />
              <Route path='/robots/:nickname/delete' component={RobotDelete} />
              <Route path='/robots' component={Favourites} />
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
