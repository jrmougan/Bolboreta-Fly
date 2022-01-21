import { Link } from "react-router-dom";
import logo from "../../../logos/logo2.svg";
import "./style.css";
import { useContext, useState } from "react";
import PopUp from "../../popUpLogin/PopUp";
import PopUpLogin from "../../popUpLogin/PopUpLogin";


import { TokenContext } from "../../../context/TokenContext";
import Avatar from "../Avatar/Avatar";


function Header() {
    const [token, setToken] = useContext(TokenContext);
    const [showPopUp, setShowPopUp] = useState(false);



    if (token) {
        return (
            <header className="App-header">
                <section className="App-logo">
                    <Link to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <h2> Bolboreta Flight </h2>
                </section>

                <section className="avatar">
                    <Avatar />
                </section>
            </header>
        );
    } else {
        return (
            <header className="App-header">
                <section className="App-logo">
                    <Link to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <h2> Bolboreta Flight </h2>
                </section>

                <section className="avatar">
                    <Link to='/login'>
                        <button className='iniciosesion' onClick={(e) => setShowPopUp(true)} className="sesion">👤 Inicio de Sesión</button>
                    </Link>


                </section>

                {showPopUp && (<PopUp setShowPopUp={setShowPopUp}> <PopUpLogin /> </PopUp>)
                }
            </header>
        );
    }
}

export default Header;
