import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FavoriteButton from './WatchVideo.FavoriteButton';
import { AuthContext } from '../../../providers/Auth/AuthContext';
import RelatedVideos from '../RelatedVideos/RelatedVideos';

import { SearchContext } from '../../../providers/SearchProvider/SearchContext';
import Actions from '../../../reducers/SearchActions';
import { getVideoDetails } from '../../../api/YoutubeApi';
import './Video.css';

const WatchVideo = () => {
  const { searchState, dispatchSearch } = useContext(SearchContext);
  const { Logged } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const videoDetails = await getVideoDetails(id);
      dispatchSearch({ type: Actions.VIDEO_DETAILS, video_details: videoDetails.items[0] });
    };
    getDetails();
  }, [id]);

  return (
    <section>
      <div className="video">
        <iframe
          allowFullScreen
          frameBorder="0"
          title={searchState.video_details.snippet.title}
          src={`https://www.youtube.com/embed/${id}?controls=2&autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="player"
        />
        <h1 className="video-title"> {searchState.video_details.snippet.title}</h1>
        {Logged() ? <FavoriteButton /> : ''}
        <br />
        <h3 className="channel-title"> {searchState.video_details.snippet.channelTitle}</h3>
        <br />
        <p className="description">{searchState.video_details.snippet.description}</p>
      </div>
      <RelatedVideos />
    </section>
  );
};

export default WatchVideo;
