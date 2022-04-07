import { React, useContext } from 'react';
import './style.css';
import swal from 'sweetalert';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { Navigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const DeleteUsuario = () => {
  const [token, setToken] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);

  const fetchDeleteuser = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.ok) {
      const body = await res.json();
      setToken('');
      swal(body.message, '', 'success');
    } else {
      const error = await res.json();
      swal(error.message, '', 'warning');
    }
  };

  if (!token) {
    return <Navigate to='/' />;
  }

  return (
    <div className='deleteUsuarioContainer'>
      <button className='delete' onClick={fetchDeleteuser}>
        <FaTrash /> Eliminar Usuario{' '}
      </button>
    </div>
  );
};

export default DeleteUsuario;
