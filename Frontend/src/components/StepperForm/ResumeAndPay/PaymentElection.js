const PaymentElection = ({ children }) => {
  return (
    <div className='paymentElection'>
      <h1 className='title_payment'>Método de Pago</h1>
      {children}
    </div>
  );
};

export default PaymentElection;
