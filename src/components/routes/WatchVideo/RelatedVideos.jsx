import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchContext } from '../../../providers/SearchContext';
import './RelatedVideos.css';


const RelatedVideos = () => {
  const { getRelatedVideos, SetRelated, Related, SetVideoId } = useContext(SearchContext);
  const {id} = useParams();

  useEffect(() => {
    const getRelated = async () => {
      const Search = await getRelatedVideos(id);
      SetRelated(Search.items);
    };
    getRelated();
  }, []);

  return (
    <div className="related">
        <div className="related-title">
        <h1>Related Videos</h1>
        </div>
      <ul className="related-container">
        {Related.map((item) => (
          <div className="related-video-card">
            <Link to={`/watch/${item.id.videoId}`}>
              <li
                key={item.id.videoId}
                className="related-card-inside"
                onClick={() => SetVideoId(item.id.videoId)}
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
