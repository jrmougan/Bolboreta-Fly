import logo from "../../logos/logo2.svg";
import { TextField } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "./style.css";
import { useState, useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import GoogleLogin from "react-google-login";
import swal from 'sweetalert';




function PopUpLogin() {
    const [email, setEmail] = useState('');
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const [token, setToken] = useContext(TokenContext);
    console.log("token", token);




    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {

                const body = await res.json();

                setToken(body.data.token);


            } else {
                const error = await res.json();
                swal(error.message);
            }
        } catch (message) {
            console.error("algo fallo");
            console.error(message);
        }
    };

    //Botón para mostrar contraseña
    const [shown, setShown] = useState(false);
    const switchShown = () => setShown(!shown);

    //función login google
    const handleLogin = async (googleData) => {
        const res = await fetch("https://api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenid,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json;
    };

    if (token) {

        return <Navigate to={`/`} />;
    }

    const handlenavigate = (e) => {
        console.log('envento', e)
        return <Navigate to={"/recover"} />

    }

    return (
        <div className="formulario">
            <section className="logo">
                <img src={logo} className="logos" alt="logo2" />
                <h3> Bolboreta Flight </h3>
            </section>
            <section className="formulario">
                <form onSubmit={login} className="login">
                    <TextField
                        id="usuario"
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={handleEmail}
                    />

                    <TextField
                        id="password"
                        label="Contraseña"
                        type={shown ? "text" : "password"}
                        value={password}
                        onChange={handlePassword}
                    />

                    <button className="sesion"> Inicio de Sesión </button>


                </form>

                <section className="show">
                    <button className="passshow" onClick={switchShown}>
                        {" "}
                        {shown ? "Ocultar contraseña" : "Mostrar contraseña"}{" "}
                    </button>

                    <button onClick={handlenavigate} >¿Has olvidado la contraseña? </button>


                </section>
                <section className="registro">
                    <Link to="/register">
                        <button className="registerlogin" type="button">
                            {" "}
                            REGISTRATE{" "}
                        </button>
                    </Link>
                </section>

            </section>
        </div>
    );
}

export default PopUpLogin;
