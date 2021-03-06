import React, { createContext, useEffect, useState } from 'react';

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

  const addFavorite = (event, VideoId) => {
    const array = Favorites;
    let addArray = true;
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
    localStorage.setItem('favs', JSON.stringify(Favorites));
  };

  const RemoveFavorite = (event, id) => {
    const array = Favorites;
    const index = array.indexOf(id);
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
        addFavorite,
        favoriteButton,
        SetFavoriteButton,
        RemoveFavorite,
      }}
    >
      {props.children}
    </FavsContext.Provider>
  );
};

export default FavsContextProvider;
