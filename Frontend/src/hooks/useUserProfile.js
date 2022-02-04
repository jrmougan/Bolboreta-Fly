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
                const res = await fetch(`http://localhost:3000/user/${decodedToken.id}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                if (res.ok) {
                    const body = await res.json();
                    setUser(body.data);
                    console.log(body.data)


                }
            };

            fetchUserProfile();
        }

    }, [decodedToken?.id, token]);

    return [user, setUser];
};

export default useUserProfile;