
import { React, useState, useContext, useEffect } from "react";
import swal from "sweetalert";
import decodeTokenData from "../../helpers/decodeTokenData";
import useUserProfile from "../../hooks/useUserProfile";
import { TokenContext } from "../../context/TokenContext";
import "./style.css";

const EditAvatar = () => {


    const [token] = useContext(TokenContext);
    const [user] = useUserProfile(token);
    const decodedToken = decodeTokenData(token);
    const [avatar, setAvatar] = useState(user.userInfo?.avatar);


    useEffect(() => { setAvatar(avatar) }, [avatar]);


    const fetchAvatar = async (e) => {
        e.preventDefault();

        const newavatar = new FormData();
        newavatar.append("avatar", avatar || user.userInfo?.avatar);
        console.log(avatar);
        console.log(newavatar);
        const res = await fetch(
            `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/avatar`,
            {
                method: "PUT",
                headers: {
                    Authorization: token,
                },
                body: newavatar,
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
