import {Fragment} from 'react';
import { useParams } from 'react-router-dom';
import {AdvancedSearch} from '../components/Search/AdvancedSearch/AdvancedSearch';

const AdvancedSearchScreen = () => {
  let params = useParams();
  let origen = params.origin;
  let destino = params.destination;
  let diaSalida = params.departureDate;
  let diaLlegada = params.returnDate;
  let adultos = params.adults;

  const search = {
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
    returnDate: params.returnDate,
    adults: params.adults
  }

  return (
    <Fragment>
    <div>
      <h1> Los parámetros son:</h1>
      <p>Origen : {origen} </p>
      <p>Destino : {destino} </p>
      <p>Día de Salida : {diaSalida} </p>
      <p>Día de llegada : {diaLlegada}</p>
      <p>adultos : {adultos} </p>
    </div>
    <AdvancedSearch search={search} />
    </Fragment>
  );
};

export default AdvancedSearchScreen;
