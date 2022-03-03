import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';

// Clave Api Unsplash
const ACCESS_KEY_UNSPLASH = process.env.REACT_APP_ACCESS_KEY_UNSPLASH;

// Creamos conexión api
const api = createApi({ accessKey: ACCESS_KEY_UNSPLASH });

const useUnsplashImage = (busqueda) => {
  const [data, setPhotosResponse] = useState(null);
  const [srcPhoto, setIndividualPhoto] = useState();

  useEffect(() => {
    api.search
      .getPhotos({ query: busqueda, orientation: 'landscape', per_page: '1' })
      .then((result) => {
        setPhotosResponse(result);
        setIndividualPhoto(result.response.results[0].urls.regular);
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  return { data, srcPhoto };
};

export default useUnsplashImage;
