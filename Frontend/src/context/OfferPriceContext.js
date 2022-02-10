import React, { createContext, useState } from 'react';

const OfferPriceContext = createContext();

export function OfferPriceContextProvider({ children }) {
  const [flightOffers, setFlightOffers] = useState();

  return (
    <OfferPriceContext.Provider value={(flightOffers, setFlightOffers)}>
      {children}
    </OfferPriceContext.Provider>
  );
}
