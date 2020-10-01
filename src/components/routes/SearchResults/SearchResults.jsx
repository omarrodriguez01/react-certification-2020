import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SearchContext } from '../../../providers/SearchContext';
import './SearchResults.css';

function SearchResults() {
  const { items, setItems, SetVideoId, SearchAPI } = useContext(SearchContext);
  const {word} = useParams();
  useEffect(() => {
    // Update the document title using the browser API
    const getSearchResults = async () => {
      const Search = await SearchAPI(word);
      setItems(Search.items.filter((item) => item.id.kind === 'youtube#video'));
    };
    getSearchResults();
  },[word]);

  return (
    <div className="search">
      <ul className="search-container">
        {items.map((item) => (
          <div className="search-video-card">
            <Link to={`/watch/${item.id.videoId}`}>
              <li
                key={item.id.videoId}
                className="search-card-inside"
                onClick={() => SetVideoId(item.id.videoId)}
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

// return (
//   <div>
//     <ul className="container">
//         {items.map(item => (
//           <div className="video-card">
//           <li key={item.id.videoId} className="item">
//             <Link to="/watch" className="card-inside" style={{ textDecoration: 'none' }}>
//               <img
//                 className ="center"
//                 src={item.snippet.thumbnails.default.url}
//                 onClick={() => SetVideoId(item.id.videoId)}
//               />
//             <p className="video-title">{item.snippet.title}</p>
//             </Link>
//           </li>
//           </div>
//         ))}
//     </ul>
//   </div>
// );
