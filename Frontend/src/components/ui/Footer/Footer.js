import "./style.css";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <footer id="App-footer">
      <div>
        <a href="/privacidad"> Politica de Privacidad </a>
      </div>
      <div>
        2022 <AiOutlineCopyrightCircle /> Bolboreta Flight. Todos los derechos
        reservados
      </div>
      <div>
        <a href="/terminosycondiciones"> Términos y Condiciones </a>
      </div>
    </footer>
  );
}

export default Footer;
