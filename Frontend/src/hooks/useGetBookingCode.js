import { useState } from 'react';

const useGetBookingCode = async (bookingId) => {
  const [flightId, setFlightId] = useState();
  const [loading, setLoading] = useState(true);

  const getBookingCode = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${bookingId}/getIdFlightOrder`
      );
      if (res.ok) {
        const body = await res.json();
        setFlightId(body.data[0][0].booking_code);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [flightId];
};

export default useGetBookingCode;
