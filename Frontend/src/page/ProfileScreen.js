import React from "react";
import { useContext } from "react";
import { TokenContext } from "../context/TokenContext";

import { Link } from "react-router-dom";
import PerfilUsuario from "../components/PerfilUsuario/PerfilUsuario";

const ProfileScreen = () => {
  const [token] = useContext(TokenContext);

  if (token) {
    return <PerfilUsuario />;
  } else {
    return (
      <div>
        <h3> No estás registrado!! </h3>
        <Link to="/register">
          <button className="sesion"> Registrate </button>
        </Link>
      </div>
    );
  }
};

export default ProfileScreen;
