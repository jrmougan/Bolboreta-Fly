import avataranonimo from "../../../logos/photo.svg";
import "./style.css";
import { useContext } from "react";
import useUser from "../../../hooks/user/useUser";
import { TokenContext } from "../../../context/TokenContext";
import { Link } from "react-router-dom";

const Avatar = () => {
  const [token] = useContext(TokenContext);

  const [user] = useUserProfile(token);

  console.log(token);
  console.log(user.userInfo);

  return (
    <section className="Avatar">
      <Link to="/user">
        <img
          className="user_avatar"
          src={
            user.userInfo?.avatar
              ? `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/uploads/${user.userInfo?.avatar}`
              : avataranonimo
          }
          alt={`Avatar de ${user.userInfo?.name_user} ${user.userInfo?.lastname}`}
        />
      </Link>

      <p className="nombreusuario">
        {" "}
        {`${user.userInfo?.name_user}  ${user.userInfo?.lastname}`}{" "}
      </p>
    </section>
  );
};

export default Avatar;
