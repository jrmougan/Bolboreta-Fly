<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 84ebbddc9b3c83cc59ec6e36a6fadb9a8b6d2920
import { AdvancedSearch } from "../components/Search/AdvancedSearch/AdvancedSearch";
const AdvancedSearchScreen = (props) => {
  return (
    <main>
      <AdvancedSearch />
    </main>
<<<<<<< HEAD
>>>>>>> Buscador avanzado (Filtro)
=======
>>>>>>> 84ebbddc9b3c83cc59ec6e36a6fadb9a8b6d2920
  );
};

export default AdvancedSearchScreen;
