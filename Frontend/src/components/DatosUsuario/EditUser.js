import "./style.css";

import React, { useState, useContext, useEffect } from "react";
import { useFetch } from "use-http";
import decodeTokenData from "../../helpers/decodeTokenData";
import useGetUser from "../../hooks/user/useUser";
import { TokenContext } from "../../context/TokenContext";
import swal from "sweetalert";
import EditAvatar from "../EditAvatar/EditAvatar";
import avataranonimo from "../../logos/photo.svg";
import DeleteUsuario from "../DeleteUsuariio/DeleteUsuario";

import { format } from "date-fns";

const EditUser = () => {
  const [token, setToken] = useContext(TokenContext);
  //Se obtiene usuario
  const [user, editUser, editAvatar] = useGetUser(token);

  const [newname, setNewname] = useState(user.userInfo?.name_user);
  const [newlastname, setLastname] = useState(user.userInfo?.lastname);
  const [newemail, setNewemail] = useState(user.userInfo?.email);

  const [newbirthdate, setNewbirthdate] = useState(
    user.userInfo?.birthdate || format(new Date(), "yyyy-MM-dd")
  );
  const [newaddress, setNewaddress] = useState(user.userInfo?.address || "");
  const [newbio, setNewbio] = useState(user.userInfo?.bio);

  //console.log("birthdate " + newbirthdate);

  //FUNCIONES MANEJADORAS DE EVENTOS

  const updateUser = (e) => {
    e.preventDefault();

    const updatedUser = {
      newname: newname || user.userInfo?.name_user,
      newlastname: newlastname || user.userInfo?.lastname,
      newemail: newemail || user.userInfo?.email,
      newbirthdate: newbirthdate || user.userInfo?.birthdate,
      newaddress: newaddress || user.userInfo?.address,
      newbio: newbio || user.userInfo?.bio,
    };
    editUser(updatedUser);
  };

  const handleBirthdate = (e) => {
    setNewbirthdate(format(new Date(e.target.value), "yyyy-MM-dd"));
    //console.log(e.target.value);
  };

  //COMUNICACIÓN CON EL BACKEND

  return (
    <div>
      <form type="submit" id="getuser" onSubmit={updateUser}>
        {" "}
        <div className="fotocontainer">
          <img
            className="fotousuario"
            src={
              user.userInfo?.avatar
                ? `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/uploads/${user.userInfo?.avatar}`
                : avataranonimo
            }
            alt={`Avatar de ${user.userInfo?.name_user}`}
          />
        </div>
        <EditAvatar
          user={user}
          avatar={user.userInfo?.avatar || "default"}
          editAvatar={editAvatar}
        />
        <h2> Datos de Usuario </h2>
        <label htmlFor="name"> Nombre </label>
        <input
          id="name"
          name="name"
          type="text"
          value={newname}
          onChange={(e) => {
            setNewname(e.target.value);
          }}
          placeholder={user.userInfo?.name_user}
        />
        <label htmlFor="lastname"> Apellido </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={newlastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder={user.userInfo?.lastname}
        />
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          value={newemail}
          onChange={(e) => {
            setNewemail(e.target.value);
          }}
          placeholder={user.userInfo?.email}
        />
        <label htmlFor="birthdate"> Fecha de Nacimiento </label>
        <input placeholder={user.userInfo?.birthdate} />
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          value={newbirthdate}
          onChange={handleBirthdate}
        />
        <label htmlFor="address"> Dirección </label>
        <input
          id="address"
          name="address"
          type="text"
          value={newaddress}
          onChange={(e) => {
            setNewaddress(e.target.value);
          }}
          placeholder={
            user.userInfo?.address ? user.userInfo?.address : "dirección"
          }
        />
        <label htmlFor="bio"> Biografía </label>
        <textarea
          id="bio"
          name="bio"
          type="text"
          value={newbio}
          onChange={(e) => {
            setNewbio(e.target.value);
          }}
          placeholder={
            user.userInfo?.bio ? user.userInfo?.bio : "Cuentanos algo de ti"
          }
        />
        <button type="submit" className="guardarcambios">
          {" "}
          Guardar Cambios{" "}
        </button>
      </form>
      <DeleteUsuario />
    </div>
  );
};

export default EditUser;
