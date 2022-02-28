import { useEffect, useState } from 'react';
import Pasajero from './Pasajeros';

const TodosPasajeros = ({ travelers, setTravelers }) => {
  const [traveler1, setTraveler1] = useState({
    id: 1,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });

  const [traveler2, setTraveler2] = useState({
    id: 2,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });

  const [traveler3, setTraveler3] = useState({
    id: 3,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });
  const [traveler4, setTraveler4] = useState({
    id: 4,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });
  const [traveler5, setTraveler5] = useState({
    id: 5,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });
  const [traveler6, setTraveler6] = useState({
    id: 3,
    name: {
      firstName: '',
      lastName: '',
    },
    dateOfBirth: '',
    gender: '',
    documents: [
      {
        documentType: '',
        number: '',
        inssuanceDate: '',
        expiryDate: '',
        birthPlace: '',
        issuanceCountry: 'ES',
        nacionality: 'ES',
      },
    ],
    contact: {
      purpose: 'STANDARD',
      phones: [
        {
          deviceType: '',
          countryCallingCode: '',
          number: '',
        },
      ],
      emailAddress: '',
    },
  });

  console.log({
    'traveler 1': traveler1,
    'traveler 2': traveler2,
    'traveler 3': traveler3,
  });

  let pasajero1 = traveler1?.name.firstName ? traveler1 : '';
  let pasajero2 = traveler2?.name.firstName ? traveler2 : null;
  let pasajero3 = traveler3?.name.firstName ? traveler2 : null;

  let allPassengers = { pasajero1, pasajero2, pasajero3 };

  const handleAddPassenger = (e) => {
    setTravelers([...travelers, allPassengers]);
  };

  return (
    <div className='FormularioPasajero'>
      <section className='Titulo'>
        <h3 className='sec-clr'> Información de los pasajeros </h3>
        <p className='ter-clr'> Introduce la información de los pasajeros </p>
      </section>
      <Pasajero
        traveler={traveler1}
        setTraveler={setTraveler1}
        handleAddPassenger={handleAddPassenger}
      />
      <Pasajero
        traveler={traveler2}
        setTraveler={setTraveler2}
        handleAddPassenger={handleAddPassenger}
      />
      <Pasajero
        traveler={traveler3}
        setTraveler={setTraveler3}
        handleAddPassenger={handleAddPassenger}
      />
      {/*       {
        <Pasajero
          traveler={traveler2}
          setTraveler={setTraveler2}
          handleAddPassenger={handleAddPassenger}
        />
      } */}
    </div>
  );
};

export default TodosPasajeros;
