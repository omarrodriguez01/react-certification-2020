import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../../providers/SearchProvider/SearchContext';
import Actions from '../../../reducers/SearchActions';
import { getFavoritesVideos } from '../../../api/YoutubeApi';

import './Favorites.css';

const Favorites = () => {
  const { searchState, dispatchSearch } = useContext(SearchContext);
  useEffect(() => {
    const getFavorites = async () => {
      const results = await getFavoritesVideos();
      dispatchSearch({ type: Actions.FAVORITE_VIDEOS, favorite_videos: results });
    }
    getFavorites();
  }, []);

  return (
    <div className="favorites">
      <h1>Favorites</h1>
      <ul className="fav-container">
        {searchState.favorite_videos.items.map((item) => (
          <div className="fav-video-card">
            <Link to={`/watch/${item.id}`}>
              <li key={item.id} className="fav-card-inside">
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
