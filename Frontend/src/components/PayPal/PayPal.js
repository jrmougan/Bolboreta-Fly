import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import swal from "sweetalert";

// This values are the props in the UI

const currency = "EUR";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, totalPrice, orderFlight }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const amount = totalPrice;
  console.log(amount);
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            swal(
              "Su pago se ha realizado correctamente, pulse confirmar para ir a su reserva",
              "",
              "success"
            );

            orderFlight();
          });
        }}
      />
    </>
  );
};

export default function PayPal({ totalPrice, orderFlight }) {
  return (
    <div style={{ width: "90%", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "EUR",
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
          totalPrice={totalPrice}
          orderFlight={orderFlight}
        />
      </PayPalScriptProvider>
    </div>
  );
}
