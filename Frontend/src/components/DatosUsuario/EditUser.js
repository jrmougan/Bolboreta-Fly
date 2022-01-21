import "./style.css";

import React, { useState, useEffect, useContext } from "react";
import decodeTokenData from "../../helpers/decodeTokenData";
import useUserProfile from "../../hooks/useUserProfile";
import { TokenContext } from "../../context/TokenContext";
import swal from 'sweetalert';


const EditUser = () => {

    const [token, setToken] = useContext(TokenContext);
    const [user] = useUserProfile(token);
    const decodedToken = decodeTokenData(token);
    const [newname, setNewname] = useState(user.userInfo?.name_user);
    const [newlastname, setLastname] = useState(user.userInfo?.lastname);
    const [newemail, setNewemail] = useState(user.userInfo?.email);
    const [newbirthdate, setNewbirthdate] = useState(user.userInfo?.birthdate);
    const [newaddress, setNewaddress] = useState(user.userInfo?.address);

    const [newbio, setNewbio] = useState(user.userInfo?.bio);

    console.log(decodedToken.id);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}user/${decodedToken?.id}/edit}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token,
                        body: user,
                    },
                }
            );
            console.log(res);

            if (res.ok) {
                const body = await res.json();

                setNewname(body.data);
            } else {
                const error = await res.json();
                swal(error.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <form type='submit' id="getuser" >
                <img className="fotousuario" src={`${process.env.REACT_APP_PUBLIC_HOST_BACKEND}uploads/${user.userInfo?.avatar}`} alt={`Avatar de `} />
                <div className="input_container">
                    <label htmlFor='name'> Nombre </label>
                    <input
                        id='name'
                        name="name"
                        type='text'
                        value={newname}
                        onChange={(e) => { setNewname(e.target.value); }}
                        placeholder={user.userInfo?.name_user} />
                </div>
                <div className="input_container">
                    <label htmlFor='lastname'> Apellido </label>
                    <input
                        id='lastname'
                        name="lastname"
                        type='text'
                        value={newlastname}
                        onChange={(e) => { setLastname(e.target.value); }}
                        placeholder={user.userInfo?.lastname} />
                </div>

                <div className="input_container">
                    <label htmlFor='email'> Email </label>
                    <input
                        id='email'
                        name="email"
                        type='email'
                        value={newemail}
                        onChange={(e) => { setNewemail(e.target.value); }}
                        placeholder={user.userInfo?.email} />
                </div>
                <div className="input_container">
                    <label htmlFor='birthdate'> Fecha de Nacimiento </label>
                    <input placeholder={user.userInfo?.birthdate} />
                    <input
                        id='birthdate'
                        name="birthdate"
                        type='date'
                        value={newbirthdate}
                        onChange={(e) => { setNewbirthdate(e.target.value); }}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor='address'> Dirección </label>
                    <input
                        id='address'
                        name="address"
                        type='text'
                        value={newaddress}
                        onChange={(e) => { setNewaddress(e.target.value); }}
                        placeholder={user.userInfo?.address ? user.userInfo?.address : 'dirección'} />
                </div>

                <div className="input_container">
                    <label htmlFor='bio'> Biografía </label>
                    <textarea
                        id='bio'
                        name="bio"
                        type='text'
                        value={newbio}
                        onChange={(e) => { setNewbio(e.target.value); }}
                        placeholder={user.userInfo?.bio ? user.userInfo?.bio : 'Cuentanos algo de ti'}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor='avatar'> Cambiar Avatar </label>
                    <textarea
                        id='avatar'
                        name="avatar"
                        type='file'
                        value={newbio}
                        onChange={(e) => { setNewbio(e.target.value); }}
                        placeholder={user.userInfo?.bio ? user.userInfo?.bio : 'Cuentanos algo de ti'}
                    />
                </div>

                <button type="submit"> Guardar cambios</button>
            </form>
            <button className="cerrarsesion"> Cerrar Sesión </button>
        </div>
    );
};

export default EditUser;
