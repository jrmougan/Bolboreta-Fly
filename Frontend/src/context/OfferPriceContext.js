import { createContext, useState } from "react";

const OfferPriceContext = createContext();
const OfferPriceContextProvider = ({ children }) => {
  const [flightOffer, setFlightOffer] = useState();

  return (
    <OfferPriceContext.Provider value={[flightOffer, setFlightOffer]}>
      {children}
    </OfferPriceContext.Provider>
  );
};

export { OfferPriceContextProvider, OfferPriceContext };
