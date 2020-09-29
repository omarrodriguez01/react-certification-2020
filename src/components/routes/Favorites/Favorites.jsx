import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../../providers/SearchContext';

import './Favorites.css';


const Favorites = () => {
  const { FavoritesInfo, getFavorites, SetVideoId } = useContext(SearchContext);
  useEffect(() => {
    console.log('1');
    getFavorites();
  }, []);

  const favorites = FavoritesInfo.items || [];
  console.log('favs:', favorites);
  return (
    <div className="favorites">
      <h1>Favorites</h1>
      <ul className="fav-container">
        {favorites.map((item) => (
          <div className="fav-video-card">
            <Link to={`/watch/${item.id}`}>
              <li
                key={item.id}
                className="fav-card-inside"
                // onClick={() => SetVideoId(item.id)}
              >
                <img className="fav-center" src={item.snippet.thumbnails.high.url} />
                <p className="fav-video-title">{item.snippet.title}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
