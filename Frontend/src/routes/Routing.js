import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../App.css";
import routes from "./routes";

import {
  AdvancedSearchScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  RegisterScreen,
} from "../page";
import StepperForm from "../components/StepperForm/StepperForm";
import RateChoice from "../components/StepperForm/RateChoice";
import StepForm from "../components/StepperForm/StepForm";
import Itinerary from "../components/StepperForm/Itinerary/Itinerary";
import SeatChoice from "../components/StepperForm/SeatChoice/SeatChoice";
import FormPassenger from "../components/FormaPassenger/FormPassenger";

import Header from "../components/ui/header/header";

import { TokencontextProvider } from "../context/TokenContext";
import { OfferPriceContextProvider } from "../context/OfferPriceContext";

import Footer from "../components/ui/Footer/Footer";

const Routing = () => {
  return (
    <Router>
      <TokencontextProvider>
        <OfferPriceContextProvider>
          <Header></Header>
          {
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
          }
          <Footer />
        </OfferPriceContextProvider>
      </TokencontextProvider>
    </Router>
  );
};

export default Routing;
