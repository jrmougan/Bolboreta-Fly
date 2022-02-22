import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";
import useUser from "../../hooks/user/useUser";
import decodeTokenData from "../../helpers/decodeTokenData";
import "./style.css";

const PerfilUsuario = (e) => {
  const [token, setToken] = useContext(TokenContext);

  const [user] = useUser(token);

  const decodedToken = decodeTokenData(token);

  return (
    <div>
      <div id="perfilusuario">
        <h2 className="saludo">
          {" "}
          Bienvenido a casa{" "}
          {`${user.userInfo?.name_user} ${user.userInfo?.lastname}!!`}{" "}
        </h2>
        <Link to={`/user/${decodedToken?.id}/edit`}>
          <button className="datosusuario"> Datos de Usuario </button>
        </Link>
        <Link to={`/user/${decodedToken?.id}/editpass`}>
          <button className="datosusuario"> Cambiar contraseña </button>
        </Link>
        <Link to={`/booking/${decodedToken.id}/getBookings`}>
          <button className="ultimasreservas"> Últimas reservas </button>
        </Link>
      </div>

      <Link to="/">
        <button
          className="cerrar"
          onClick={() => {
            setToken("");
          }}
        >
          {" "}
          Cerrar Sesión{" "}
        </button>
      </Link>
    </div>
  );
};

export default PerfilUsuario;
