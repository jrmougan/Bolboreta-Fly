const InputButton = ({ children, handleSubmit }) => {
  return (
    <input
      type='button'
      onClick={handleSubmit}
      className='btn btnFlight'
      value={children}
    ></input>
  );
};

export default InputButton;
