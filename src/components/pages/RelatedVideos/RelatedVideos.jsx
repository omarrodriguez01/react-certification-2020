import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchContext } from '../../../providers/SearchProvider/SearchContext';
import Actions from '../../../reducers/SearchActions';
import { getRelatedVideos } from '../../../api/YoutubeApi';
import './RelatedVideos.css';

const RelatedVideos = () => {
  const { searchState, dispatchSearch } = useContext(SearchContext);
  const { id } = useParams();

  useEffect(() => {
    const getRelated = async () => {
      const results = await getRelatedVideos(id);
      dispatchSearch({ type: Actions.RELATED_VIDEOS, related_videos: results });
    };
    getRelated();
  }, [id]);
  return (
    <div className="related">
        <div className="related-title">
        <h1>Related Videos</h1>
        </div>
      <ul className="related-container">
        {searchState.related_videos.items.map((item) => (
          <div className="related-video-card">
            <Link to={`/watch/${item.id.videoId}`}>
              <li
                key={item.id.videoId}
                className="related-card-inside"
              >
                <img className="related-image" src={item.snippet.thumbnails.high.url} />
                <p className="related-video-title">{item.snippet.title}</p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default RelatedVideos;
