import { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const initialValue = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue;
  const [data, setData] = useState(initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);
  return [data, setData];
};
export default useLocalStorage;
