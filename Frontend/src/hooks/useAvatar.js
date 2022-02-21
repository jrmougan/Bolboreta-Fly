import { useContext, useEffect, useState } from 'react';
import { TokenContext } from "../../context/TokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";
import useUserProfile from "../../hooks/useUserProfile";
import swal from "sweetalert";
const fetchAvatar = async (url) => {
   




    const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/avatar`,
        {
            method: "PUT",
            headers: {
                Authorization: token,
            },
            body: newavatar,
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







const fetch = async () => {
    setLoading(true);
    try {

      const response = await fetch(fetchUrl);

      const body = await response.json();

      if (response.ok) {
        setData(body.data);
        console.log(data);
        // setFlightOffers(body.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  

  useEffect(()=>{
    console.log('useFetch');
    search();
  }, [url, body]);

  return setBody 