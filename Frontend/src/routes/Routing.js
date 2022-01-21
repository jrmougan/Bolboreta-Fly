import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import routes from "./routes";
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
import { ToastContainer } from "react-toastify";
import Footer from "../components/ui/Footer/Footer";

const Routing = () => {
  return (
    <Router>
      <TokencontextProvider>
        <Header></Header>
        <div>
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

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
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
        </div>

      </TokencontextProvider>

    </Router>
  );
};

export default Routing;
