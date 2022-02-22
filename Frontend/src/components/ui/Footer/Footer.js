import "./style.css";

import { AiOutlineCopyrightCircle } from "react-icons/ai";


function Footer() {
    return (
        <footer id="App-footer">
            <div>
                <a href='/privacidad'> Politica de Privacidad </a>
            </div>
            <div>
                2022 <AiOutlineCopyrightCircle /> Bolboreta Flight. Todos los derechos
                reservados
            </div>
            <div>
                <p> Aviso legal </p>
            </div>

        </footer>
    );
}

export default Footer;
