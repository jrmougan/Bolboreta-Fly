import { useState, useEffect } from "react";
import decodeTokenData from "../../helpers/decodeTokenData";

const useUser = (token) => {
  const [user, setUser] = useState({});
  const decodedToken = decodeTokenData(token);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [decodedToken?.id, token, refetch]);

  // Métodos

  const fetchUser = async () => {
    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.ok) {
      const body = await res.json();
      setUser(body.data);
    }
  };

  const editUser = async (user) => {
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/edit`,
        options,
        []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setRefetch(!refetch);
    }
  };
  const editAvatar = async (avatar) => {
    const options = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: avatar,
    };

    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/avatar`,
        options,
        []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setRefetch(!refetch);
    }
  };

  return [user, editUser, editAvatar];
};

export default useUser;
