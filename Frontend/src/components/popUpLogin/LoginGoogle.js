import React, { useContext } from "react";
import { useGoogleLogin } from "react-google-login";
import logogoogle from "../../logos/google.svg";
import { TokenContext } from "../../context/TokenContext";



import "./style.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";


const clientId =
    "646466836206-mk4v45mvhmb00c0mhupsnqki749ch5kg.apps.googleusercontent.com";

function GoogleLoginButton() {

    // const [token, setToken] = useContext(TokenContext);



    const onSuccess = async (googleRes) => {

        console.log(googleRes)
        console.log(googleRes.tokenId);

        const res = await fetch(
            `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}login_google`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: googleRes.tokenId }),

            }
        );
        if (res.ok) {
            console.log(res)
        }



    };

    const onFailure = (res) => {
        swal(res, '', 'error');
    };



    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: "offline",
    });




    return (
        <Link to="/">
            <button onClick={signIn} className="googleboton">
                <img src={logogoogle} alt="google login" className="icon"></img>
                <span className="googleboton"> Google</span>
            </button>
        </Link>
    );
}

export default GoogleLoginButton;
