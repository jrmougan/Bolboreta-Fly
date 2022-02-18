
import React, { useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './style.css'

const ActiveUser = () => {

    const registration_code = useParams();



    useEffect(() => {

        const fetchActive = async (e) => {



            const res = await fetch(`http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/register/validate/${registration_code.registration_code}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            );
            if (res.ok) {

                const body = await res.json();
                swal(body.message, '', 'success')

            } else {
                const error = await res.json();

                swal(error.message, '', 'error')
            }

        }
        fetchActive();
    })

    return (
        <div className="activeuser">

            <Link to='/'>
                <button className="active" > Ir a inicio </button>
            </Link>


        </div>)

}

export default ActiveUser;