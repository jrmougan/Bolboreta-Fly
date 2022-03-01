import { React, useState, useContext, useEffect } from 'react';

import swal from 'sweetalert';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { Link } from 'react-router-dom';
import './style.css';

const EditPassForm = () => {

    const [oldpassword, setOldPass] = useState('');
    const [newpassword, setNewPass] = useState('');
    const [confirmnewpassword, setRepetPass] = useState('');
    const [token, setToken] = useContext(TokenContext);
    const decodedToken = decodeTokenData(token);
    const [doPassMatch, setDoPassMatch] = useState(false);

    //checkbox para mostrar contraseña
    const [shown, setShown] = useState(false);
    const switchShown = () => setShown(!shown);

    useEffect(() => {
        if (newpassword === confirmnewpassword) {
            setDoPassMatch(true);

        } else { setDoPassMatch(false) }
    }, [newpassword, confirmnewpassword]);


    const fetchEditPass = async (e) => {
        e.preventDefault();



        const res = await fetch(`http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/editpass`,
            {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldpassword, newpassword, confirmnewpassword }),
            }
        );
        if (res.ok) {
            const body = await res.json();
            swal(body.message, '', 'success');

        } else {
            const error = await res.json();
            console.log(error)
            swal(error.message, '', 'warning')
        }
    };
    if (!token) {
        return <Link to='/login' />
    }


    return (
        <div >
            <form className='edit_pass_form' onSubmit={fetchEditPass}>
                <div className='input_container'>
                    <label className='label_pass' htmlFor='oldpass'> Contraseña actual </label>
                    <input id='oldpass' name='olpass' type={shown ? 'text' : 'password'} value={oldpassword} onChange={(e) => { setOldPass(e.target.value); }} />
                </div>
                <div className='input_container'>
                    <label className='label_pass' htmlFor='newpass'> Escriba contraseña nueva </label>
                    <input id='newpass' name='newpass' type={shown ? 'text' : 'password'} value={newpassword} onChange={(e) => { setNewPass(e.target.value); }} />
                </div>
                <div className='input_container'>
                    <label className='label_pass' htmlFor='repetpass'> Repite contraseña nueva </label>
                    <input id='repetpass' name='repetpass' type={shown ? 'text' : 'password'} value={confirmnewpassword} onChange={(e) => { setRepetPass(e.target.value); }} />
                </div>
                <label className='showpass'> <input type='checkbox' name='newpassword' onClick={switchShown} /> Mostrar contraseña </label>
                <button type='submit' className='cambiarpass'> Cambiar contraseña </button>
            </form>
        </div>
    )



}


export default EditPassForm