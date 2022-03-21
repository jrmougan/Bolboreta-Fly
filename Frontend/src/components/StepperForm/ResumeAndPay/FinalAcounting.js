const FinalAcounting = ({ flight, orderFlight }) => {
  const priceOptions = flight.price;
  console.log('Flight', flight);
  const { base, currency, grandTotal } = priceOptions;

  const taxes = grandTotal - base;

  return (
    <section className='finalCounting'>
      <p>Base {base} €</p>
      <p>Impuestos {taxes} €</p>
      <p style={{ margin: '2rem', fontSize: '1.5rem' }}>
        Total {grandTotal} {currency}
      </p>
      <button onClick={orderFlight} className='order-btn btn'>
        Confirmar y pagar
      </button>
    </section>
  );
};

export default FinalAcounting;
