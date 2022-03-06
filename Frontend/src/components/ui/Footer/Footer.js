import './style.css';

import { AiOutlineCopyrightCircle } from 'react-icons/ai';

function Footer() {
  return (
    <footer id='App-footer'>
      <div>
        <a href='/privacidad'> Politica de Privacidad </a>
      </div>
      <div>
        <p>
          2022 <AiOutlineCopyrightCircle /> Bolboreta Flight
        </p>
        <p className='margin-top'>Todos los derechos reservados.</p>
      </div>
      <div>
        <a href='/terminosycondiciones'> Términos y Condiciones </a>
      </div>
    </footer>
  );
}

export default Footer;
