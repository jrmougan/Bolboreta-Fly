import { TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import swal from "sweetalert";
import "./style.css";

const ResetPass = () => {
  const [recovercode, setRecovercode] = useState("");
  const [newpassword, setNewpassword] = useState("");

  useEffect(() => {
    setRecovercode(recovercode);
    setNewpassword(newpassword);
  }, [recovercode, newpassword]);

  const fetchresetpass = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/resetpass`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newpassword, recovercode }),
      }
    );

    if (res.ok) {
      console.log(res);
      const body = await res.json();
      console.log(body);
      swal(body.message, "", "success");
    } else {
      const error = await res.json();
      console.log(error);
      swal(error.message, "", "error");
    }
  };

  //checkbox para mostrar contraseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);
  return (
    <div className="reser_pass">
      <form className="reset_pass" onSubmit={fetchresetpass}>
        <div className="input_container">
          <label htmlFor="recovercode">
            {" "}
            Introduzca aqui el código que le hemos mandado a su email{" "}
          </label>
          <TextField
            id="recovercode"
            name="recovercode"
            type="text"
            value={recovercode}
            onChange={(e) => {
              setRecovercode(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="newpassword">
            {" "}
            Introduce aqui tu nueva contraseña{" "}
          </label>
          <TextField
            id="newpassword"
            name="newpassword"
            type={shown ? "text" : "password"}
            value={newpassword}
            onChange={(e) => {
              setNewpassword(e.target.value);
            }}
          />
          <label className="showpass">
            {" "}
            <input
              type="checkbox"
              name="newpassword"
              onClick={switchShown}
            />{" "}
            Mostrar contraseña{" "}
          </label>
          <button className="resetpass" type="submit">
            {" "}
            Resetear contraseña{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
