import { createContext, useEffect, useState, useContext } from 'react';

export const UserTokenContext = createContext();

export const UserTokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token' || ''));

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
  return (
    <UserTokenContext.Provider value={[token, setToken]}>
      {children}
    </UserTokenContext.Provider>
  );
};
export const useUserTokenContext = () => {
  return useContext(UserTokenContext);
};
