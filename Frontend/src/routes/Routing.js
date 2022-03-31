import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../App.css';
import routes from './routes';

import Header from '../components/ui/header/header';

import { TokencontextProvider } from '../context/TokenContext';
import { OfferPriceContextProvider } from '../context/OfferPriceContext';
import { UserContextProvider } from '../context/UserContext';

import Footer from '../components/ui/Footer/Footer';

const Routing = () => {
  return (
    <Router>
      <TokencontextProvider>
        <OfferPriceContextProvider>
          <UserContextProvider>
            <Header></Header>
            {
              <main id='generalMain'>
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
          </UserContextProvider>
        </OfferPriceContextProvider>
      </TokencontextProvider>
    </Router>
  );
};

export default Routing;
