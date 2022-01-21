import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import logogoogle from '../../logos/google.svg'
import refreshTokenSetup from '../Utilidades/refreshToken';
import './style.css';
import { Link } from 'react-router-dom';

const clientId = '646466836206-mk4v45mvhmb00c0mhupsnqki749ch5kg.apps.googleusercontent.com';

function LoginHooks() {
    const onSuccess = (res) => {

        alert(
            `Te has logueado correctamente ${res.profileObj.name} 😍. `
        );
        refreshTokenSetup(res);
        console.log(res)
    };

    const onFailure = (res) => {

        alert(
            `Fallo de Login`
        );
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',

    });

    return (
        <Link to='/user'>
            <button onClick={signIn} className="googleboton">

                <img src={logogoogle} alt="google login" className="icon"></img>

                <span className="googlboton">Incio sesión con Google</span>
            </button>
        </Link>


    );
}

export default LoginHooks;
