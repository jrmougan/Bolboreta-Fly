import logo from "../../logos/logo2.svg";
import { TextField } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "./style.css";
import { useState, useContext } from "react";
import { TokenContext } from "../../context/TokenContext";

import swal from "sweetalert";
import GoogleLoginButton from "./LoginGoogle";

function PopUpLogin({ setShowPopUp }) {
    const [email, setEmail] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState("");
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
            swal(message, '', 'error')
        }
    };

    //Botón para mostrar contraseña
    const [shown, setShown] = useState(false);
    const switchShown = () => setShown(!shown);

    if (token) {
        return <Navigate to={`/`} />;
    }



    const handleregister = (e) => {
        setShowPopUp(false);
        return <Navigate to='/register' />;
    }

    const handlerecover = (e) => {
        setShowPopUp(false);
        console.log("envento", e);
        return <Navigate to='/recover' />;
    };

    return (
        <div className="formulario">
            <section className="logo">
                <img src={logo} className="logos" alt="logo2" />
                <h3> Bolboreta Flight </h3>
            </section>
            <section className="form">
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
                    <Link to='/recover'>
                        <button onClick={handlerecover} className="pregunta" type='button'>
                            ¿Has olvidado la contraseña?{" "}
                        </button>
                    </Link>

                </section>



                <section className="registro">
                    <Link to="/register">
                        <button onClick={handleregister} className="registerlogin" type="button">
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
