const FinalAcounting = ({ flight }) => {
  const priceOptions = flight.price;

  const { base, currency, grandTotal } = priceOptions;

  const taxes = grandTotal - base;

  return (
    <section className='finalCounting'>
      <p>Base {base} €</p>
      <p>Impuestos {taxes.toFixed(2)} €</p>
      <p style={{ margin: '2rem', fontSize: '1.5rem' }}>
        Total {grandTotal} {currency}
      </p>
    </section>
  );
};

export default FinalAcounting;
