import { useState } from 'react';
import { TextField, Autocomplete, MenuItem } from '@mui/material';
import '../style.css';
import MuiPhoneNumber from 'material-ui-phone-number';
import PassengerInfo from './PassengerInfo';
import offerprice from '../InfoFlights/offerpriceExample.json';
import {
  emergencyInputStyle,
  gender,
  countries,
  documentation,
  typePhone,
} from '../InfoFlights/constantInfo';

const FormPassenger = ({
  passenger,
  setPassenger,
  emergencyData,
  setEmergencyData,
}) => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [lastname2, setLastname2] = useState();

  const [birthdate, setBirthday] = useState('');
  const [birthPlace, setBirthplace] = useState();
  const [documentFlight, setDocumentFlight] = useState('');
  const [inssuanceDate, setInssuancedate] = useState('');
  const [issuanceCountry, setIssuanceCountry] = useState('ES');
  const [issuanceLocation, setIssuanceLocation] = useState('Madrid');
  const [expiredate, setExpiredate] = useState('2025-04-14');
  const [email, setEmail] = useState('');
  const [TypePhone, setTypePhone] = useState('');
  const [typedocument, setTypeDocument] = useState('');
  const [number, setNumber] = useState('');
  const [genero, setGenero] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const [counter, setCounter] = useState(1);

  // Datos de todos los pasajeros
  const [allPassengerData, setAllPassengerData] = useState([]);

  // Función para controlar los inputs
  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  // Información por pasajero

  const traveler = {
    firstName: name,
    lastname,
    lastname2,
    birthPlace,
    inssuanceDate,
    number,
    expiredate,
    issuanceCountry,
    validityCountry: 'ES',
    nacionality: 'ES',
    holder: true,
  };

  const autoValue = {
    gender,
    countries,
    documentation,
    typePhone,
    country,
    setCountry,
  };

  // Averiguamos el número de pasajeros

  // let travelers = offerprice.data.flightOffers[0].travelerPricings;

  return (
    <div className='FormularioPasajero'>
      <section className='Titulo'>
        <h3 className='sec-clr'> Información de los pasajeros </h3>
        <p className='ter-clr'> Introduce la información de los pasajeros </p>
      </section>

      {/*       {travelers.map((trav) => {
        return (
          <section key={trav.travelerId}>
            <h3>Pasajero {trav.travelerId}</h3>
            <PassengerInfo params={params} />
          </section>
        );
      })} */}
      <PassengerInfo
        passenger={passenger}
        setPassenger={setPassenger}
        emergencyData={emergencyData}
        setEmergencyData={setEmergencyData}
        autoValue={autoValue}
      />
      <EmergencyForm
        emergencyData={emergencyData}
        setEmergencyData={setEmergencyData}
      />
    </div>
  );
};

const EmergencyForm = ({ emergencyData, setEmergencyData }) => {
  return (
    <section>
      <form>
        <h3 className='ter-clr'>Información contacto de emergencia </h3>
        <div className='emergency-inputs'>
          <TextField
            value={emergencyData.name}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, name: e.target.value })
            }
            sx={emergencyInputStyle}
            placeholder='Nombre'
          ></TextField>
          <TextField
            value={emergencyData.lastname}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, lastname: e.target.value })
            }
            sx={emergencyInputStyle}
            placeholder='Apellidos'
          ></TextField>
          <TextField
            value={emergencyData.email}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, email: e.target.value })
            }
            sx={emergencyInputStyle}
            placeholder='Email'
          ></TextField>
          <TextField
            value={emergencyData.phone}
            onChange={(e) =>
              setEmergencyData({ ...emergencyData, phone: e.target.value })
            }
            sx={emergencyInputStyle}
            placeholder='Numero de teléfono'
          ></TextField>
        </div>
      </form>
    </section>
  );
};

export default FormPassenger;
