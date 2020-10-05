import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FavsContext } from '../../../providers/FavsContext';

const FavoriteButton = () => {
  const { id } = useParams();
  const { addFav, RemoveFav } = useContext(FavsContext);
  const [favoriteButton, SetFavoriteButton] = useState(false);

  const HandleFavorite = (e, fid) => {
    if (favoriteButton === false) {
      addFav(e, fid);
      SetFavoriteButton(true);
    } else {
      RemoveFav(e, id);
      SetFavoriteButton(false);
    }
  };
  useEffect(() => {
    SetFavoriteButton(false);
    const CheckinFav = () => {
      const FavoritesList = JSON.parse(localStorage.getItem('favs'));
      SetFavoriteButton(false);
      FavoritesList.map((item, index) => {
        if (item === id) {
          SetFavoriteButton(true);
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
