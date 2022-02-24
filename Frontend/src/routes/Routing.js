import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../App.css';
import routes from './routes';

import Header from '../components/ui/header/header';

import { TokencontextProvider } from '../context/TokenContext';
import { OfferPriceContextProvider } from '../context/OfferPriceContext';

import Footer from '../components/ui/Footer/Footer';

const Routing = () => {
  return (
    <Router>
      <TokencontextProvider>
        <OfferPriceContextProvider>
          <Header></Header>
          {
            <main>
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
