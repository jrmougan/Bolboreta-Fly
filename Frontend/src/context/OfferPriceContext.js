import { createContext, useState } from 'react';
import example from '../context/contextExample.json';

const OfferPriceContext = createContext();
const OfferPriceContextProvider = ({ children }) => {
  const [flightOffer, setFlightOffer] = useState(example);

  return (
    <OfferPriceContext.Provider value={[flightOffer, setFlightOffer]}>
      {children}
    </OfferPriceContext.Provider>
  );
};

export { OfferPriceContextProvider, OfferPriceContext };
