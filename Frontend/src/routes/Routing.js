import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import routes from './routes';
import {
  AdvancedSearchScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
  PassengerScreen,
} from "../page";
import FormPassenger from "../components/FormaPassenger/FormPassenger";
import Header from "../components/ui/header/header";
import { TokencontextProvider } from "../context/TokenContext";

import Footer from "../components/ui/Footer/Footer";

const Routing = () => {
  return (
    <Router>
      <TokencontextProvider>
        <Header></Header>
        <main>
          <nav>
            <ul>
              {routes.map((route) => {
                return (
                  <li key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                ></Route>
              );
            })}

          </Routes>
        </main>
        <Footer />
      </TokencontextProvider>
    </Router>
  );
};

export default Routing;
