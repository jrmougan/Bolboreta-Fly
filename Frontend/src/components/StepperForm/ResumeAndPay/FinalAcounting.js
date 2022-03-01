const FinalAcounting = ({ flight, rateCharge, orderFlight }) => {
  const priceOptions = flight.price;
  const { base, currency, grandTotal } = priceOptions;
  const precioTotal = Number(grandTotal);
  const totalPrice = precioTotal + rateCharge;
  const taxes = 0.21;

  return (
    <section className='finalCounting'>
      <p>Subtotal {base} €</p>
      <p>Elección de tarifa {rateCharge} €</p>
      <p>Impuestos {taxes} €</p>
      <p style={{ margin: '2rem', fontSize: '1.5rem' }}>
        Total {totalPrice} {currency}
      </p>
      <button onClick={orderFlight}>Confirmar y pagar</button>
    </section>
  );
};

export default FinalAcounting;
