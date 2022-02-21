
import { React, useState, useContext, useEffect } from "react";
import swal from "sweetalert";


import "./style.css";

const EditAvatar = () => {


    const [token] = useContext(TokenContext);
    const [user, avatar] = useUserProfile(token);
    const decodedToken = decodeTokenData(token);
    const [avatar, setAvatar] = useState(user.userInfo?.avatar);

    const newavatar = new FormData();
    newavatar.append("avatar", avatar || user.userInfo?.avatar);
    console.log(avatar);
    console.log(newavatar);



    const handleAvatar = (e) => {
        console.log(e);

        setAvatar(e.target.files[0]);
    };


    return (
        <div className="editavatarcontainer">
            <label htmlFor="avatar"> Sube tu avatar</label>
            <input id="avatar" name="avatar" type="file" onChange={handleAvatar} />
            <button onClick={fetchAvatar} className="guardaravatar">
                {" "}
                Subir Avatar{" "}
            </button>
        </div>
    );
};

export default EditAvatar;
