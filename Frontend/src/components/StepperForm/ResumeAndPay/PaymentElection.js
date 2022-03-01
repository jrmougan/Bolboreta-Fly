import PayPal from '../../PayPal/PayPal';
import { CancellationPolicy } from '../InfoFlights/constantInfo';

const PaymentElection = () => {
  return (
    <div className='paymentElection'>
      <h1 className='title_payment'>Método de Pago</h1>
      <PayPal />
      <CancellationPolicy />
    </div>
  );
};

export default PaymentElection;
