import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Confirmation = ({ children }) => {
  return (
    <span className='flight_confirmed'>
      {' '}
      <CheckCircleOutlineIcon /> {children}
    </span>
  );
};

export default Confirmation;
