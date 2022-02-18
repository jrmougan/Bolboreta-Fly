import { useState, useEffect } from "react";
import decodeTokenData from "../helpers/decodeTokenData";


const useUserProfile = (token) => {
    const [user, setUser] = useState({});
    console.log('user:', user)
    const decodedToken = decodeTokenData(token);


    useEffect(() => {
        if (token) {
            console.log(decodedToken.id)

            const fetchUserProfile = async () => {
                const res = await fetch(`http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken.id}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (res.ok) {
                    const body = await res.json();
                    setUser(body.data);
                    console.log('data'+ body.data)


                }
            };

            fetchUserProfile();
        }

    }, [decodedToken?.id, token]);

    return [user, setUser];
};

export default useUserProfile;