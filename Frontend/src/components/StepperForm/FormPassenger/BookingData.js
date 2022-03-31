import React, { useState } from "react";
import { TextField } from "@mui/material";
import "../style.css";

const BookingData = () => {
  return (
    <div>
      <ContactData />
    </div>
  );
};

const ContactData = ({ handleChange, values }) => {
  const contactData = values;

  return (
    <div className="bookingData">
      <h3 className="ter-clr">
        {" "}
        Introduce los datos de contacto para la reserva
      </h3>

      <div className="identification_form">
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="name"
          placeholder=" Nombre"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />{" "}
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="lastname"
          placeholder=" Primer Apellido"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />{" "}
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="typeDoc"
          placeholder="DNI / NIF / CIF / NIE"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="doc"
          placeholder="Introduzca aquí el número del documento"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />
      </div>

      <div className="address_form">
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="address"
          placeholder="Dirección"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />{" "}
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="country"
          placeholder="País"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />{" "}
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="city"
          placeholder="Ciudad"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />{" "}
        <TextField
          sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
          id="phone"
          placeholder="Teléfono de contacto"
          value={0}
          onChange={handleChange}
          className="passenger-input"
          margin="dense"
        />
      </div>
    </div>
  );
};

export default BookingData;
