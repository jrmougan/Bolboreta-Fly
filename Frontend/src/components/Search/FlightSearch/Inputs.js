import { ADULTS } from "../../StepperForm/InfoFlights/constantInfo";

import { FaPlaneArrival, FaWpforms, FaUserFriends } from "react-icons/fa";
import React from "react";
import SearchRoot from "../../../page/SearchRoot";
import { DatePicker } from "@mui/lab";
import { Autocomplete, TextField } from "@mui/material";
import { format } from "date-fns";

export const InputOrigin = ({ origin, setOrigin }) => {
  return (
    <div className="inputDiv grow-2">
      <FaPlaneArrival className="faplane_icon" />
      <SearchRoot setState={setOrigin} isOrigin={true} />
    </div>
  );
};

export const InputDestination = ({ destination, setDestination }) => {
  return (
    <div className="inputDiv grow-2">
      <FaPlaneArrival className="faplane_icon" />
      <SearchRoot setState={setDestination} />
    </div>
  );
};

export const InputDepartureDate = ({ departureDate, setDepartureDate }) => {
  return (
    <div className="inputDiv grow-1">
      <FaWpforms className="faplane_icon" />
      {
        <DatePicker
          className="datePicker "
          minDate={Date.now()}
          label="Día de salida"
          inputFormat="dd/MM/yyyy"
          sx={{ backgroundColor: "white", width: "100%" }}
          value={departureDate}
          onChange={(newValue) => {
            if (newValue instanceof Date && !isNaN(newValue.valueOf())) {
              setDepartureDate(format(newValue, "yyyy-MM-dd"));
            }
          }}
          renderInput={(params) => (
            <TextField
              sx={{
                background: "white",
                width: "100%",
                marginLeft: " .5rem",
                marginTop: " .5rem",
                borderRadius: "4px",
              }}
              {...params}
            />
          )}
        ></DatePicker>
      }
    </div>
  );
};

export const InputReturnDate = ({
  returnDate,
  setReturndate,
  departureDate,
}) => {
  return (
    <div className="inputDiv grow-1">
      <FaWpforms className="faplane_icon" />
      <DatePicker
        inputFormat="dd/MM/yyyy"
        className="datePicker "
        minDate={new Date(departureDate)}
        label="Día de llegada"
        sx={{ backgroundColor: "white", width: "100%", borderRadius: "4px" }}
        value={returnDate}
        onChange={(newValue) => {
          if (newValue instanceof Date && !isNaN(newValue.valueOf())) {
            setReturndate(format(newValue, "yyyy-MM-dd"));
          }
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              background: "white",
              width: "100%",
              marginLeft: " .5rem",
              marginTop: " .5rem",
              borderRadius: "4px",
            }}
            {...params}
          />
        )}
      ></DatePicker>
    </div>
  );
};

export const InputAdults = ({ adults, setAdults }) => {
  return (
    <div className="inputDiv grow-1">
      <FaUserFriends className="faplane_icon" />
      <Autocomplete
        sx={{ width: "100%" }}
        options={ADULTS}
        onChange={(e, newInput) => setAdults(newInput.value)}
        value={ADULTS.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Seleccione adultos"
            sx={{
              backgroundColor: "white",
              marginLeft: " .5rem",
              marginTop: " .5rem",
              borderRadius: "4px",
            }}
          />
        )}
      />
    </div>
  );
};
