import { useEffect, useState } from 'react';

const useGetBookings = (idUser) => {
  const [allBookings, setAllBookings] = useState([]);

  const searchBookings = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${idUser}/getBookings`
    );
    if (res.ok) {
      const body = await res.json();
      const bookings = body.data;
      setAllBookings(bookings);
    }
  };
  useEffect(() => {
    searchBookings();
  }, []);
  // Recogemos las reservas

  return [allBookings];
};

export default useGetBookings;
