import { React, useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';

const ResetPass = () => {

    const [recovercode, setRecovercode] = useState('');
    const [newpassword, setNewpassword] = useState('');

    useEffect(() => {
        setRecovercode(recovercode);
        setNewpassword(newpassword);
    }, [recovercode, newpassword]);
    console.log(recovercode);

    const fetchresetpass = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}resetpass`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ newpassword, recovercode })
            });


        if (res.ok) {
            console.log(res)
            const body = await res.json();
            console.log(body)
            swal(body.message, '', 'success');
        } else {
            const error = await res.json();
            console.log(error)
            swal(error.message, '', 'error');
        }
    }
    return (
        <div>
            <form className='reset_pass' onSubmit={fetchresetpass}>
                <div className='input_conainer'>
                    <label htmlFor='recovercode'> Introduzca aqui el código que le hemos mandado a su email </label>
                    <input
                        id='recovercode'
                        name='recovercode'
                        type='text'
                        value={recovercode}
                        onChange={(e) => { setRecovercode(e.target.value); }}
                    />
                </div>
                <div className='input_container'>
                    <label htmlFor='newpassword'> Introduce aqui tu nueva contraseña </label>
                    <input
                        id='newpassword'
                        name='newpassword'
                        type='password'
                        value={newpassword}
                        onChange={(e) => { setNewpassword(e.target.value); }} />
                </div>
                <button className='resetpass' type='submit'> Resetear contraseña </button>
            </form>
        </div>
    )

}

export default ResetPass;
