import { React, useContext, } from 'react';
import './style.css'
import swal from 'sweetalert';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { Link } from 'react-router-dom';

const DeleteUsuario = () => {

    const [token, setToken] = useContext(TokenContext);
    const decodedToken = decodeTokenData(token);

    const fetchDeleteuser = async (e) => {
        e.preventDefault();


        const res = await fetch(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}user/${decodedToken?.id}/delete`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                }
            }
        );

        if (res.ok) {
            const body = await res.json();
            setToken('');
            swal(body.message, '', 'success');

        } else {
            const error = await res.json();
            swal(error.message, '', 'warning');
        };
    };
    return (
        <div>
            <Link to='/'>
                <button className='delete' onClick={fetchDeleteuser}> Eliminar Usuario </button>
            </Link>


        </div>
    )





}

export default DeleteUsuario;