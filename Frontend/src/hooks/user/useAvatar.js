const options = {
  method: "PUT",
  headers: {
    Authorization: token,
    "Content-type": "application/json",
  },
  body: JSON.stringify(newUser),
};

const { put } = useFetch(
  `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/edit`,
  options,
  []
);
