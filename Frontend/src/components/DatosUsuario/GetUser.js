
import React, { useState, useEffect, useContext } from "react";
import decodeTokenData from "../../helpers/decodeTokenData";
import useUserProfile from "../../hooks/useUserProfile";
import { TokenContext } from "../../context/TokenContext";
import EditUser from "./EditUser";
import swal from 'sweetalert';


const GetUser = () => {
    const [token, setToken] = useContext(TokenContext);
    const [user] = useUserProfile(token);
    const decodedToken = decodeTokenData(token);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(
                `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}user/${decodedToken?.id}}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,

                    },
                }
            );
            console.log(res);

            if (res.ok) {
                const body = await res.json();



            } else {
                const error = await res.json();
                swal(error.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <EditUser />
        </div>

    )

}

export default GetUser;