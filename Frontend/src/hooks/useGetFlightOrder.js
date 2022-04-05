import { useEffect, useState } from 'react';

const useGetFlightOrder = (bookingCode) => {
  const [loading, setLoading] = useState(true);
  const [flightOrder, setFlightOrder] = useState([]);

  const getFlightOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/retrieveBooking/${bookingCode}`
      );
      const body = await res.json();
      setFlightOrder(body);
      setLoading(false);
    } catch (error) {
      console.error('Ha ocurrido un error', error);
    }
  };

  useEffect(() => {
    getFlightOrder();
  }, []);
  return [flightOrder, loading];
};

export default useGetFlightOrder;
