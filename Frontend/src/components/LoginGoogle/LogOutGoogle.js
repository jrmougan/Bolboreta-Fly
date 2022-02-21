
import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { TokenContext } from '../../context/TokenContext';


const clientId =
    "646466836206-mk4v45mvhmb00c0mhupsnqki749ch5kg.apps.googleusercontent.com";

function LogOut() {

    const [token, setToken] = useContext(TokenContext);
    const onSuccess = () => {
        setToken('');
    };
    return (
        < div >
            <GoogleLogout
                clientId={clientId}
                buttonText='LogOut'
                onLogoutSuccess={onSuccess}></GoogleLogout>
        </div >
    )



}

export default LogOut; 