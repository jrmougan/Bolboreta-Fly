import { React, useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import { TokenContext } from "../../context/TokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";

import "./style.css";

const EditAvatar = ({ user, avatar, editAvatar }) => {
  //const [token] = useContext(TokenContext);

  //const decodedToken = decodeTokenData(token);
  const [newAvatar, setNewAvatar] = useState();

  /*

*/
  const handleAvatar = (e) => {
    e.preventDefault();

    setNewAvatar(e.target.files[0]);
  };

  const submitAvatar = (e) => {
    e.preventDefault();
    const formFileUpload = new FormData();
    formFileUpload.append("avatar", newAvatar);
    editAvatar(formFileUpload);
  };

  return (
    <div className="editavatarcontainer">
      <label htmlFor="avatar"> Sube tu avatar</label>
      <input id="avatar" name="avatar" type="file" onChange={handleAvatar} />
      <button onClick={submitAvatar} className="guardaravatar">
        {" "}
        Subir Avatar{" "}
      </button>
    </div>
  );
};

export default EditAvatar;
