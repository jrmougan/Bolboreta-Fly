import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {

    const [data, setData] = useState(JSON.parse(sessionStorage.getItem(key)) || defaultValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [data, key]);

    return [data, setData];
};

export default useLocalStorage;