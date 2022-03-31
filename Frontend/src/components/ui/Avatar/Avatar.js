import avataranonimo from '../../../logos/photo.svg';
import './style.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

import { Link } from 'react-router-dom';

const Avatar = () => {
  const [user] = useContext(UserContext);
  console.log('user', user);
  return (
    <section className='Avatar'>
      <Link to='/user'>
        <img
          className='user_avatar'
          src={
            user.userInfo?.avatar
              ? `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/uploads/${user.userInfo?.avatar}`
              : avataranonimo
          }
          alt={`Avatar de ${user.userInfo?.name_user} ${user.userInfo?.lastname}`}
        />
      </Link>
      <div className='welcome'>
        <p>Bienvenid@,</p>{' '}
        <p className='nombreusuario'>
          {' '}
          {`${user.userInfo?.name_user}  ${user.userInfo?.lastname}`}{' '}
        </p>
      </div>
    </section>
  );
};

export default Avatar;
