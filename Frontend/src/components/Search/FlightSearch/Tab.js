const Tabs = ({ withReturn, setWithReturn }) => {
  const handleReturn = () => {
    setWithReturn(!withReturn);
  };
  return (
    <section className='searchTabs'>
      <button
        className={`tab tab-1  ${withReturn === false ? 'active' : ''} `}
        onClick={handleReturn}
      >
        Ida
      </button>
      <button
        className={`tab tab-2  ${withReturn === true ? 'active' : ''} `}
        onClick={handleReturn}
      >
        Ida y vuelta
      </button>
    </section>
  );
};

export default Tabs;
