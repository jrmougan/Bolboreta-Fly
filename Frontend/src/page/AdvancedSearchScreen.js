import { useParams } from 'react-router-dom';

const AdvancedSearchScreen = () => {
  let params = useParams();
  let origen = params.origin;
  let destino = params.destination;
  let diaSalida = params.departureDate;
  let diaLlegada = params.returnDate;
  let adultos = params.adults;

  return (
    <div>
      <h1> Los parámetros son:</h1>
      <p>Origen : {origen} </p>
      <p>Destino : {destino} </p>
      <p>Día de Salida : {diaSalida} </p>
      <p>Día de llegada : {diaLlegada}</p>
      <p>adultos : {adultos} </p>
    </div>
  );
};

export default AdvancedSearchScreen;
