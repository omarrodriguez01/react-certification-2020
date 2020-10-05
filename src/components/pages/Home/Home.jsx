import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/Auth/AuthContext';
import Favorites from '../Favorites/Favorites';
import { SearchContext } from '../../../providers/SearchProvider/SearchContext';
import Actions from '../../../reducers/SearchActions';
import { searchTrending } from '../../../api/YoutubeApi';
import './Home.css';

const Home = () => {
  const { Logged } = useContext(AuthContext);
  const { searchState, dispatchSearch } = useContext(SearchContext);
  useEffect(() => {
    const getTrendingVideos = async () => {
      const results = await searchTrending();
      dispatchSearch({ type: Actions.GET_TRENDING, trending_videos: results });
    };
    getTrendingVideos();
  }, []);
  return (
    <div className="trending">
      <h1>Trending</h1>
      <ul className="container">
        {searchState.trending_videos.items.map((item) => (
          <div className="video-card">
            <Link
              to={`/watch/${item.id}`}
              className="card-inside"
              style={{ textDecoration: 'none' }}
            >
              <li key={item.id} className="item">
                <img className="center" src={item.snippet.thumbnails.default.url} />
                <p className="video-title">{item.snippet.title}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
      {Logged() && <Favorites />}
    </div>
  );
};

export default Home;
