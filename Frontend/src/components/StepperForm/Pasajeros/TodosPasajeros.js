import Pasajero from "./Pasajeros";

const TodosPasajeros = ({ travelers, setTravelers, numTravelers, labels }) => {
  const handleAddPassenger = () => {};
  return (
    <div className="FormularioPasajero">
      <section className="Titulo">
        <h3 className="sec-clr"> Información de los pasajeros </h3>
        <p className="ter-clr"> Introduce la información de los pasajeros </p>
        {travelers.map((traveler) => {
          return (
            <Pasajero
              key={traveler.id}
              id={traveler.id}
              traveler={travelers}
              setTraveler={setTravelers}
              handleAddPassenger={handleAddPassenger}
              numTravelers={numTravelers}
              labels={labels}
            />
          );
        })}
      </section>
    </div>
  );
};

export default TodosPasajeros;
