import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import "../style.css";

const BookingData = (props) => {
  return (
    <div>
      <ContactData {...props} />
    </div>
  );
};

const ContactData = ({ state }) => {
  const [bookingData, setBookingData] = state;

  return (
    <div className="bookingData">
      <h3 className="ter-clr">
        {" "}
        Introduce los datos de contacto para la reserva
      </h3>
      <form className="form_user">
        <Grid container spacing={1} className="sectionForm">
          <Grid item xs={12}>
            <h1>Datos personales</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              label="Nombre"
              id="Apellido-required"
              placeholder="Nombre"
              value={bookingData.name}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.name = e.target.value;
                setBookingData(modData);
              }}
              className="input"
              margin="dense"
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              label="Apellido"
              className="input"
              id="Apellido-required"
              placeholder=" Primer Apellido"
              value={bookingData.lastname}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.lastname = e.target.value;
                setBookingData(modData);
              }}
              margin="dense"
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Apellido-required"
              placeholder="DNI / NIF / CIF / NIE"
              value={bookingData.typedoc}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.typedoc = e.target.value;
                setBookingData(modData);
              }}
              label="Tipo de documento"
              className="input"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Apellido-required"
              placeholder="Introduzca aquí el número del documento"
              value={bookingData.document}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.document = e.target.value;
                setBookingData(modData);
              }}
              label="Documento"
              className="input"
              margin="dense"
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className="sectionForm">
          <Grid item xs={12}>
            <h1>Datos de contacto</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Apellido-required"
              placeholder="Dirección"
              value={bookingData.address}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.address = e.target.value;
                setBookingData(modData);
              }}
              label="Dirección"
              className="input"
              margin="dense"
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Country-required"
              placeholder="País"
              value={bookingData.country}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.country = e.target.value;
                setBookingData(modData);
              }}
              label="País"
              className="input"
              margin="dense"
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Apellido-required"
              placeholder="Ciudad"
              value={bookingData.city}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.city = e.target.value;
                setBookingData(modData);
              }}
              label="Ciudad"
              className="input"
              margin="dense"
            />{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
              required
              id="Apellido-required"
              placeholder="Teléfono de contacto"
              value={bookingData.phone}
              onChange={(e) => {
                const modData = { ...bookingData };
                modData.phone = e.target.value;
                setBookingData(modData);
              }}
              label="Teléfono"
              className="input"
              margin="dense"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BookingData;
