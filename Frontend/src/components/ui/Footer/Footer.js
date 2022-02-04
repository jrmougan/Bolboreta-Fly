import "./style.css";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
    return (
        <footer id="App-footer">
            <div>
                <p> Política de privacidad </p>
            </div>
            <div>
                <p> Política de cookies </p>
            </div>
            <div>
                <p> Aviso legal </p>
            </div>
            <div>
                2022 <AiOutlineCopyrightCircle /> Bolboreta Flight. Todos los derechos
                reservados
            </div>
        </footer>
    );
}

export default Footer;
