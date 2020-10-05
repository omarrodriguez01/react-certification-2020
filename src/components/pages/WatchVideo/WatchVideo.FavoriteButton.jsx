import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FavsContext } from '../../../providers/FavsContext';

const FavoriteButton = () => {
  const { id } = useParams();
  const { addFavorite, RemoveFavorite } = useContext(FavsContext);
  const [favoriteButton, setFavoriteButton] = useState(false);

  const HandleFavorite = (event, favoriteId) => {
    if (favoriteButton === false) {
      addFavorite(event, favoriteId);
      setFavoriteButton(true);
    } else {
      RemoveFavorite(event, favoriteId);
      setFavoriteButton(false);
    }
  };
  useEffect(() => {
    setFavoriteButton(false);
    const CheckinFav = () => {
      const FavoritesList = JSON.parse(localStorage.getItem('favs'));
      setFavoriteButton(false);
      FavoritesList.map((item) => {
        if (item === id) {
          setFavoriteButton(true);
        }
      });
    };
    CheckinFav();
  }, [id]);
  return (
    <div className="fav-icon" onClick={(event) => HandleFavorite(event, id)}>
      <i
        className="fas fa-star fa-3x"
        style={favoriteButton ? { color: '#EFE11A' } : { color: '#aab8c2' }}
      />

      <p className="fav-text">{favoriteButton ? 'Remove Favorite' : 'Add Favorite'}</p>
    </div>
  );
};

export default FavoriteButton;
