import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/Auth/AuthContext';
import { SearchContext } from '../../../providers/SearchContext';
import Favorites from '../Favorites/Favorites';
import HomeLogged from './HomeLogged';
import './Home.css';

const Home = () => {
  const { Logged } = useContext(AuthContext);
  const { SetVideoId, Trending, SetTrending, SearchTrending } = useContext(SearchContext);
  useEffect(() => {
    // Update the document title using the browser API
    SetVideoId(null);
    const getTrendingVideos = async () => {
      const TrendingVids = await SearchTrending();
      SetTrending(TrendingVids);
    };

    getTrendingVideos();
  }, []);

      // {Logged() ? <HomeLogged /> : ''}

  return (
    <div className="trending">
      <h1>Trending</h1>
      <ul className="container">
        {Trending.map((item) => (
          <div className="video-card">
            <Link to={`/watch/${item.id}`} className="card-inside" style={{ textDecoration: 'none' }}>
              <li key={item.id} className="item" onClick={() => SetVideoId(item.id)}>
                <img className="center" src={item.snippet.thumbnails.default.url} />
                <p className="video-title">{item.snippet.title}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
      {Logged() ? <Favorites /> : ''}
    </div>
  );
};

export default Home;
