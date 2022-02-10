import './style.css';
import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';
import { Link, Navigate } from 'react-router-dom';


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
        <div >
            <form className='form_recover_pass' >

                <label htmlFor='email'> ¿No recuerdas tu contraseña? Introduce tu correo electrónico y te indicaremos cómo conseguir una nueva </label>
                <input id='email' name='email' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />

                <button className='envioemail' onClick={fetchrecorpass} > Enviar email </button>




            </form>

        </div>
    )

}


export default RecoverPass;