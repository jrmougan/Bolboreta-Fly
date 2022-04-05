import axios from 'axios';
const CancelToken = axios.CancelToken;

// This function allow you to make GET request to backend with params we need
export const getAmadeusData = (params) => {
  // Destructuring params
  const { keyword = '', page = 0, city = true, airport = true } = params;
  // Checking for proper subType
  const subTypeCheck =
    city && airport ? 'CITY,AIRPORT' : city ? 'CITY' : airport ? 'AIRPORT' : '';
  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  const searchQuery = keyword ? keyword : 'a';
  // This is extra tool for cancelation request, to avoid overload API
  const source = CancelToken.source();
  // GET request with all params we need
  const out = axios.get(
    `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/citySearch?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}`,
    {
      cancelToken: source.token,
    }
  );
  return { out, source };
};

export const getCityByID = (id) => {
  // Destructuring params

  const source = CancelToken.source();
  // GET request with all params we need
  const out = axios.get(
    `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/citySearch?id=${id}`,
    {
      cancelToken: source.token,
    }
  );
  return { out, source };
};
