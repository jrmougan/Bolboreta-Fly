import Pasajero from "./Pasajeros";

const TodosPasajeros = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  const { travelers } = values;

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
              labels={1}
              travelers={travelers}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
            />
          );
        })}
      </section>
    </div>
  );
};

export default TodosPasajeros;
