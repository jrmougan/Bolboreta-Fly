import PayPal from "../../PayPal/PayPal";
import { CancellationPolicy } from "../InfoFlights/constantInfo";

const PaymentElection = ({ totalPrice }) => {
  return (
    <div className="paymentElection">
      <h1 className="title_payment">Método de Pago</h1>
      <PayPal totalPrice={totalPrice} />
      <CancellationPolicy />
    </div>
  );
};

export default PaymentElection;
