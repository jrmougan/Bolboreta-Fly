import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../App.css';
import routes from './routes';
import {
  AdvancedSearchScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
} from '../page';
import StepperForm from '../components/StepperForm/StepperForm';
import StepForm from '../components/StepForm/StepForm';
import Itinerary from '../components/StepperForm/Itinerary';
const Routing = () => {
  return (
    <Router>
      <div>
        {/* <Itinerary /> */}
        <StepForm />
        {/*         {<StepperForm />} */}
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        {/*         <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              ></Route>
            );
          })}
          <Route path=''></Route>
        </Routes> */}
      </div>
    </Router>
  );
};

export default Routing;
