import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { TokenContext } from "../../context/TokenContext";
import { UserContext } from "../../context/UserContext";
import "./style.css";

const clientId =
  "646466836206-mk4v45mvhmb00c0mhupsnqki749ch5kg.apps.googleusercontent.com";

function LogOut() {
  const [token, setToken] = useContext(TokenContext);
  const [user, setUser] = useContext(UserContext);

  const onSuccess = () => {
    setToken("");
    setUser({});
  };

  const onFailure = () => {
    swal("Hubo un error con el cierre de sesión", " ", "error");
  };

  return (
    <div className="logout">
      <Link to="/">
        <GoogleLogout
          className="googleout"
          clientId={clientId}
          buttonText="Cerrar sesion"
          onLogoutSuccess={onSuccess}
          onFailure={onFailure}
        ></GoogleLogout>
      </Link>
    </div>
  );
}

export default LogOut;
