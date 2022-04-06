import React, { useState } from "react";
import { TextField } from "@mui/material";
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
  console.log(bookingData);
  const [nameBooking, setNameBooking] = useState("");
  const [lastNameBooking, setLastNameBooking] = useState("");
  const [lastNameBooking2, setLastnameBooking2] = useState("");
  // const [birthdate, setBirhdate] = useState('');
  const [typedocumentBooking, setTypeDocumentBooking] = useState("");
  const [documentBooking, setDocumentBooking] = useState("");
  const [addressBooking, setAddressBooking] = useState("");
  const [countryBooking, setCountryBooking] = useState("");
  const [cityBooking, setCityBooking] = useState("");
  const [phoneBooking, setPhoneBooking] = useState("");

  // Función para controlar los inputs
  const handleSubmit = (setter) => (e) => {
    // e.preventDefault();
    setter(e.target.value);
  };

  return (
    <div className="bookingData">
      <h3 className="ter-clr">
        {" "}
        Introduce los datos de contacto para la reserva
      </h3>
      <form className="form_user">
        <div className="identification_form">
          <TextField
            sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
            required
            id="Apellido-required"
            placeholder="Nombre"
            value={bookingData.name}
            onChange={(e) => {
              const modData = { ...bookingData };
              modData.name = e.target.value;
              setBookingData(modData);
            }}
            className="passenger-input"
            margin="dense"
          />{" "}
          <TextField
            sx={{ marginInline: "1rem", width: "30%", marginTop: "2rem" }}
            required
            id="Apellido-required"
            placeholder=" Primer Apellido"
            value={bookingData.lastname}
            onChange={(e) => {
              const modData = { ...bookingData };
              modData.lastname = e.target.value;
              setBookingData(modData);
            }}
            className="passenger-input"
            margin="dense"
          />{" "}
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
            className="passenger-input"
            margin="dense"
          />
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
            className="passenger-input"
            margin="dense"
          />
        </div>

        <div className="address_form">
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
            className="passenger-input"
            margin="dense"
          />{" "}
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
            className="passenger-input"
            margin="dense"
          />{" "}
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
            className="passenger-input"
            margin="dense"
          />{" "}
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
            className="passenger-input"
            margin="dense"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingData;
