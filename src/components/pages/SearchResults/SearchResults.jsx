import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SearchContext } from '../../../providers/SearchProvider/SearchContext';
import Actions from '../../../reducers/SearchActions';
import { searchAPI } from '../../../api/YoutubeApi';
import './SearchResults.css';

function SearchResults() {
  const { searchState, dispatchSearch } = useContext(SearchContext);
  const { word } = useParams();

  useEffect(() => {
    const searchVideos = async () => {
      const results = await searchAPI(word);
      dispatchSearch({ type: Actions.SEARCH_VIDEO, search_results: results });
    };
    searchVideos();
  }, [word]);
  return (
    <div className="search">
      <ul className="search-container">
        {searchState.search_results.items
          .filter((item) => item.id.kind === 'youtube#video')
          .map((item) => (
          <div className="search-video-card">
            <Link to={`/watch/${item.id.videoId}`}>
              <li
                key={item.id.videoId}
                className="search-card-inside"
              >
                <img className="search-image" src={item.snippet.thumbnails.high.url} />
                <p className="search-video-title">{item.snippet.title}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
