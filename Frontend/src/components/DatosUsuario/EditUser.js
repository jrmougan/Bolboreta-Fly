import "./style.css";

import React, { useState, useContext } from "react";
import decodeTokenData from "../../helpers/decodeTokenData";
import { UserContext } from "../../context/UserContext";
import { TokenContext } from "../../context/TokenContext";
import swal from "sweetalert";
import EditAvatar from "../EditAvatar/EditAvatar";
import avataranonimo from "../../logos/photo.svg";
import DeleteUsuario from "../DeleteUsuariio/DeleteUsuario";

import { format } from "date-fns";
import { TextField } from "@mui/material";
const EditUser = () => {
  const [token] = useContext(TokenContext);
  const [user] = useContext(UserContext);
  const decodedToken = decodeTokenData(token);
  const [newname, setNewname] = useState(user.userInfo?.name_user);
  const [newlastname, setLastname] = useState(user.userInfo?.lastname);
  const [newemail, setNewemail] = useState(user.userInfo?.email);
  const [newbirthdate, setNewbirthdate] = useState(user.userInfo?.birthdate);
  const [newaddress, setNewaddress] = useState(user.userInfo?.address);
  const [newbio, setNewbio] = useState(user.userInfo?.bio);

  console.log(decodedToken.id);
  const updateUser = async (e) => {
    e.preventDefault();

    const newUser = {
      newname: newname || user.userInfo?.name_user,
      newlastname: newlastname || user.userInfo?.lastname,
      newemail: newemail || user.userInfo?.email,
      newbirthdate: newbirthdate || user.userInfo?.birthdate,
      newaddress: newaddress || user.userInfo?.address,
      newbio: newbio || user.userInfo?.bio,
    };

    console.log(JSON.stringify(newUser));

    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/edit`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (res.ok) {
      const body = await res.json();
      swal(body.message);
    } else {
      const error = await res.json();
      swal(error.message);
    }
  };
  const handleBirthdate = (e) => {
    setNewbirthdate(format(new Date(e.target.value), "yyyy-MM-dd"));
  };
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
        <EditAvatar />
        <h2> Datos de Usuario </h2>
        <label htmlFor="name"> Nombre </label>
        <TextField
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
        <TextField
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
        <TextField
          style={{ width: "252px" }}
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
        <TextField
          id="birthdate"
          name="birthdate"
          type="date"
          value={newbirthdate}
          onChange={handleBirthdate}
        />
        <label htmlFor="address"> Dirección </label>
        <TextField
          style={{ width: "252px" }}
          id="address"
          name="address"
          value={newaddress}
          onChange={(e) => {
            setNewaddress(e.target.value);
          }}
          placeholder={
            user.userInfo?.address ? user.userInfo?.address : "dirección"
          }
        />
        <label htmlFor="bio"> Biografía </label>
        <TextField
          style={{ width: "300px" }}
          id="bio"
          name="bio"
          type="textarea"
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
