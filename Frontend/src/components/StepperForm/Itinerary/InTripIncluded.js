import { FaCheck } from 'react-icons/fa';

const InTripIncluded = ({ tripIncludes }) => {
  return (
    <article className='info_container tripincludes'>
      <h1 className='title_include'> Tu viaje incluye</h1>
      {tripIncludes.map((includes) => {
        return (
          <p key={includes.id}>
            <FaCheck /> {includes.value}
          </p>
        );
      })}
    </article>
  );
};

export default InTripIncluded;
