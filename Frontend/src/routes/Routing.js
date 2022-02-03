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
import Itinerary from '../components/StepperForm/Itinerary/Itinerary';
import SeatChoice from '../components/StepperForm/SeatChoice/SeatChoice';
const Routing = () => {
  return (
    <Router>
      <div>
        {/* <Itinerary /> */}
        {/* <SeatChoice /> */}
        <StepForm />
      </div>
    </Router>
  );
};

export default Routing;
