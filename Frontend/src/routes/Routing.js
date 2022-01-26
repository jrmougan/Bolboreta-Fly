import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import routes from './routes';
import {
  AdvancedSearchScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
} from '../page';
import HomeRound from '../page/HomeRound';
import HomeMultiple from '../page/HomeMultiple';

const Routing = () => {
  return (
    <Router>
      {/* <TokencontextProvider> */}
      {/* <Header></Header> */}

      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/return' element={<HomeRound />} />
        <Route path='/multiple' element={<HomeMultiple />} />
      </Routes>
      {/* </TokencontextProvider> */}
    </Router>
  );
};

export default Routing;
