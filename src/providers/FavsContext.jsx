import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FavsContext = createContext(null);

const FavsContextProvider = (props) => {
  const [Favorites, SetFavorites] = useState([]);
  const [favoriteButton, SetFavoriteButton] = useState(false);
  if (!localStorage.getItem('favs')) {
    localStorage.setItem('favs', JSON.stringify(Favorites));
  }
  const getArray = JSON.parse(localStorage.getItem('favs') || []);

  useEffect(() => {
    if (getArray !== '0') {
      SetFavorites([...getArray]);
    }
  }, []);

  const addFav = (event, VideoId) => {
    console.log(VideoId);
    const array = Favorites;
    let addArray = true;
    console.log(getArray);
    array.map((item, key) => {
      if (item === VideoId) {
        array.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(VideoId);
    }
    SetFavorites([...array]);
    console.log('add', Favorites);
    localStorage.setItem('favs', JSON.stringify(Favorites));
  };

  const ViewFavs = () => {
    console.log('pre', Favorites);
  };
  const RemoveFav = (e, fid) => {
    const array = Favorites; // make a separate copy of the array
    const index = array.indexOf(fid);
    console.log(`about to delete ${fid} in ${index}`);
    if (index !== -1) {
      array.splice(index, 1);
      SetFavorites([...array]);
      localStorage.setItem('favs', JSON.stringify(Favorites));
    }
  };
  return (
    <FavsContext.Provider
      value={{
        Favorites,
        SetFavorites,
        addFav,
        ViewFavs,
        favoriteButton,
        SetFavoriteButton,
        RemoveFav,
      }}
    >
      {props.children}
    </FavsContext.Provider>
  );
};

export default FavsContextProvider;
