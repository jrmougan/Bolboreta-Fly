import { useState, useEffect } from "react";
import decodeTokenData from "../helpers/decodeTokenData";


const useUserProfile = (token) => {
    const [user, setUser] = useState({});
    const [refetch, setRefetch] = useState(false);
    console.log('user:', user)
    const decodedToken = decodeTokenData(token);


    useEffect(() => {
        if (token) {
            console.log(decodedToken)

            const fetchUserProfile = async () => {


                const res = await fetch(`http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken.id ? decodedToken.id : decodedToken.email}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (res.ok) {
                    const body = await res.json();
                    setUser(body.data);
                    console.log('data' + body.data)


                } else { console.log(res) }
            };

            fetchUserProfile();
        }

    }, [decodedToken?.id, token, refetch]);

    return [user, refetch, setRefetch];
};

export default useUserProfile;