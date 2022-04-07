import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

import decodeTokenData from "../helpers/decodeTokenData";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const [user, setUser] = useState({});

  const fetchUserProfile = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${
        process.env.REACT_APP_PUBLIC_HOST_BACKEND
      }:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${
        decodedToken.id ? decodedToken.id : decodedToken.email
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.ok) {
      const body = await res.json();
      setUser(body.data);
    } else {
    }
  };

  useEffect(() => {
    if (token && token !== "") {
      fetchUserProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, fetchUserProfile]}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
