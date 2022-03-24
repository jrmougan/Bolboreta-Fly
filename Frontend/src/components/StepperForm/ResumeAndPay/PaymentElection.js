import PayPal from "../../PayPal/PayPal";
import { CancellationPolicy } from "../InfoFlights/constantInfo";

const PaymentElection = ({ totalPrice, orderFlight, travelers }) => {
  return (
    <div className="paymentElection">
      <h1 className="title_payment">Método de Pago</h1>
      <PayPal
        totalPrice={totalPrice}
        orderFlight={orderFlight}
        travelers={travelers}
      />
      <CancellationPolicy />
    </div>
  );
};

export default PaymentElection;
