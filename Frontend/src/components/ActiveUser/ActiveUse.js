import React, { useEffect } from 'react';
import swal from 'sweetalert';
import LoginUser from '../LoginUser/LoginUser';
import { useParams } from 'react-router-dom';
import './style.css';

const ActiveUser = () => {
  const registration_code = useParams();

  useEffect(() => {
    const fetchActive = async (e) => {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://localhost:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/register/validate/${registration_code.registration_code}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const body = await res.json();
        swal(body.message, '', 'success');
      } else {
        const error = await res.json();

        swal(error.message, '', 'error');
      }
    };
    fetchActive();
  });

  return (
    <div className='activeuser'>
      <LoginUser />
    </div>
  );
};

export default ActiveUser;
