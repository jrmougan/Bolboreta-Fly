import './style.css';
import React, { useEffect, useState } from 'react';
import useUserProfile from '../../hooks/useUserProfile';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


const RecoverPass = () => {

    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(email)
    }, [email]);


    const fetchrecorpass = async (e) => {


        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}recover`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email }),
            }
        );


        if (res.ok) {
            const body = await res.json();

            swal(body.message, '', 'success')
            setEmail(email);
        } else {
            const error = await res.json();
            swal(error.message)
        }


    };




    return (
        <div className='form_recover_pass'>
            <form onSubmit={fetchrecorpass}>

                <label htmlFor='email'> ¿No recuerdas tu contraseña? Introduce tu correo electrónico y te indicaremos cómo conseguir una nueva </label>
                <input id='email' name='email' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <Link to='/resetpass'>
                    <button type='submit' className='envioemail'> Enviar email </button>
                </Link>




            </form>

        </div>
    )

}


export default RecoverPass;