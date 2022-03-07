import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./style.css";
import swal from "sweetalert";

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [birthdate, setBirthdate] = useState("birthdate", "1995/10/31");
  const [bio, setBio] = useState("");

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/register`,
        {
          method: "POST",
          body: JSON.stringify({
            name_user: nombre,
            lastname: primerApellido,
            email,
            password,
            confirmpassword: passwordRepeat,
            bio,
            birthdate: birthdate,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        const bodyReponse = await response.json();

        swal(bodyReponse.message, "", "success");
      } else {
        const error = await response.json();
        swal(error.message, "", "error");
      }
    } catch (error) {
      swal(error, "", "error");
    }
  };
  //checkbox para mostrar contraseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  //checkbox para aceptar politica de privacidad y poder registrarte
  const [checked, setChecked] = useState(false);
  const switchChecked = () => setChecked(!checked);

  return (
    <main className="flex-column register-form-container">
      <div className="form-title-container">
        <h1 className="form-title">
          Formulario de registro en Bolboreta Flight
        </h1>
      </div>
      <div className="mainForm">
        <form onSubmit={register} className="form flex-column">
          <div className="input_container">
            <label htmlFor="nombre_input" className="label-input">
              Nombre
            </label>
            <TextField
              id="nombre_input"
              value={nombre}
              className="inputForm"
              onChange={handleSubmit(setNombre)}
            >
              Nombre
            </TextField>
          </div>

          <div className="input_container">
            <label htmlFor="primerApellido" className="label-input">
              Primer Apellido
            </label>
            <TextField
              id="primerApellido"
              value={primerApellido}
              className="inputForm"
              onChange={handleSubmit(setPrimerApellido)}
              margin="dense"
            ></TextField>
          </div>

          <div className="input_container">
            <label htmlFor="email" className="label-input">
              {" "}
              E-mail
            </label>
            <TextField
              type="text"
              id="email"
              value={email}
              className="inputForm"
              onChange={handleSubmit(setEmail)}
              margin="dense"
            ></TextField>
          </div>
          <div className="input_container">
            <label htmlFor="password" className="label-input">
              {" "}
              Contraseña
            </label>
            <TextField
              type={shown ? "text" : "password"}
              id="password"
              value={password}
              className="inputForm"
              onChange={handleSubmit(setPassword)}
              margin="dense"
            ></TextField>
          </div>
          <div className="input_container">
            <label className="label-input" htmlFor="passwordRepeat">
              {" "}
              Confirmar contraseña
            </label>
            <TextField
              type={shown ? "text" : "password"}
              id="passwordRepeat"
              value={passwordRepeat}
              className="inputForm"
              onChange={handleSubmit(setPasswordRepeat)}
              margin="dense"
            ></TextField>
          </div>
          <label className="showpass">
            {" "}
            <input
              type="checkbox"
              name="newpassword"
              onClick={switchShown}
            />{" "}
            Mostrar contraseña{" "}
          </label>
          <div className="input_container">
            <label htmlFor="birthday" className="label-input">
              {" "}
              Cumpleaños
            </label>
            <TextField
              type="date"
              id="birthday"
              value={birthdate}
              className="inputForm input_birthday"
              onChange={handleSubmit(setBirthdate)}
              margin="dense"
            ></TextField>
          </div>
          <div className="input_container">
            <label htmlFor="bio" className="label-input">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={handleSubmit(setBio)}
              id="bio"
              className="inputForm textarea"
            ></textarea>
          </div>
          <label className="condicionesgenerales">
            <input
              type="checkbox"
              className="politica"
              onChange={switchChecked}
            />
            Estoy de acuerdo con la{" "}
            <a href="/privacidad"> Política de Privacidad </a> y{" "}
            <a href="/terminosycondiciones"> Términos y condiciones </a>
          </label>

          <button type="submit" className="register-btn" disabled={!checked}>
            Enviar datos de Registro
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
