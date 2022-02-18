
import avataranonimo from '../../../logos/photo.svg';
import './style.css';
import { useContext } from 'react';
import useUserProfile from '../../../hooks/useUserProfile';
import { TokenContext } from '../../../context/TokenContext';
import { Link } from 'react-router-dom';


const Avatar = () => {

    const [token] = useContext(TokenContext);

    const [user] = useUserProfile(token);




    return (<section className='Avatar'>
        <Link to='/user'>
            <img
                className="user_avatar"
                src={user.userInfo?.avatar ? `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}uploads/${user.userInfo?.avatar}` : avataranonimo}
                alt={`Avatar de ${user.userInfo?.name_user} ${user.userInfo?.lastname}`}
            />
        </Link>


        <p className='nombreusuario'> {`${user.userInfo?.name_user}  ${user.userInfo?.lastname}`} </p>
    </section>);

}

export default Avatar;