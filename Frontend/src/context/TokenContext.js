
import {  createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const TokenContext = createContext();
const TokencontextProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', '');
    return (
        <TokenContext.Provider value={[token, setToken]}> {children} </TokenContext.Provider>
    );
};


export { TokencontextProvider, TokenContext };

