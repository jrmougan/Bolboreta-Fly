import "./style.css";

import React, { useState, useContext } from "react";
import decodeTokenData from "../../helpers/decodeTokenData";
import useUserProfile from "../../hooks/useUserProfile";
import { TokenContext } from "../../context/TokenContext";
import swal from "sweetalert";


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
    const updateUser = async (e) => {
        e.preventDefault();

        const newUser = new FormData();
        newUser.append('name_user', newname || user.userInfo?.name_user);
        newUser.append('lastname', newlastname || user.userInfo?.lastname);
        newUser.append('newemail', newemail || user.userInfo?.email);
        newUser.append('newbirthdate', newbirthdate || user.userInfo?.birthdate);
        newUser.append('newaddres', newaddress || user.userInfo?.address);
        newUser.append('newbio', newbio || user.userInfo?.bio);





        const res = await fetch(
            `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}user/${decodedToken?.id}/edit`,
            {
                method: "PUT",
                headers: {
                    Authorization: token,

                },
                body: newUser,

            }
        );


        if (res.ok) {


            const body = await res.json();
            swal(body.message);




        } else {
            const error = await res.json();
            swal(error.message);

        }
    };


    return (
        <div>
            <form type="submit" id="getuser" onSubmit={updateUser}>
                {" "}
                <img
                    className="fotousuario"
                    src={user.userInfo?.avatar}
                    alt={`Avatar de ${user.userInfo?.name_user}`}
                />

                <label htmlFor="name"> Nombre </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={newname}
                    onChange={(e) => {
                        setNewname(e.target.value);
                    }}
                    placeholder={user.userInfo?.name_user}
                />


                <label htmlFor="lastname"> Apellido </label>
                <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={newlastname}
                    onChange={(e) => {
                        setLastname(e.target.value);
                    }}
                    placeholder={user.userInfo?.lastname}
                />


                <label htmlFor="email"> Email </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={newemail}
                    onChange={(e) => {
                        setNewemail(e.target.value);
                    }}
                    placeholder={user.userInfo?.email}
                />


                <label htmlFor="birthdate"> Fecha de Nacimiento </label>
                <input placeholder={user.userInfo?.birthdate} />
                <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={newbirthdate}
                    onChange={(e) => {
                        setNewbirthdate(e.target.value);
                    }}
                />


                <label htmlFor="address"> Dirección </label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    value={newaddress}
                    onChange={(e) => {
                        setNewaddress(e.target.value);
                    }}
                    placeholder={
                        user.userInfo?.address ? user.userInfo?.address : "dirección"
                    }
                />


                <label htmlFor="bio"> Biografía </label>
                <textarea
                    id="bio"
                    name="bio"
                    type="text"
                    value={newbio}
                    onChange={(e) => {
                        setNewbio(e.target.value);

                    }}
                    placeholder={
                        user.userInfo?.bio ? user.userInfo?.bio : "Cuentanos algo de ti"
                    }
                />

                <input type='submit' value='Guardar Cambios' />
            </form>
        </div>
    );
};

export default EditUser;
