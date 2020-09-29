import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SearchContext } from '../../../providers/SearchContext';
import { FavsContext } from '../../../providers/FavsContext';
import RelatedVideos from './RelatedVideos';
import './Video.css';

const WatchVideo = () => {
  const { VideoId, Details, SetDetails, getVideoDetails } = useContext(SearchContext);
  const { ViewFavs, addFav, RemoveFav } = useContext(FavsContext);
  const [favoriteButton, SetFavoriteButton] = useState(false);
  const { id } = useParams();
  console.log('videoID:', VideoId);

  const HandleFavorite = (e, fid) => {
    console.log('fid', fid);
    if (favoriteButton === false) {
      addFav(e, fid);
      SetFavoriteButton(true);
    } else {
      RemoveFav(e, id);
      SetFavoriteButton(false);
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const VideoDetails = await getVideoDetails(id);
      SetDetails(VideoDetails.items[0].snippet);
      console.log('VideoDetails', VideoDetails);
    };
    getDetails();
  }, [id]);

  useEffect(() => {
    SetFavoriteButton(false);
    const CheckinFav = () => {
      const FavoritesList = JSON.parse(localStorage.getItem('favs'));
      console.log('FavId', id);
      SetFavoriteButton(false);
      FavoritesList.map((item, index) => {
        if (item === id) {
          console.log('favorito? true');
          SetFavoriteButton(true);
        }
      });
      console.log('favorito? false');
      // SetFavoriteButton(false);
    };
    CheckinFav();
  }, [id]);
  console.log('gotdetails', Details);
  return (
    <section>
      <div className="video">
        <iframe
          width="800"
          height="450"
          allowFullScreen
          frameBorder="0"
          title={Details.title}
          src={`https://www.youtube.com/embed/${id}?controls=2&autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="player"
        />
        <h1 className="video-title"> {Details.title}</h1>
        <div className="fav-icon" onClick={(event) => HandleFavorite(event, id)}>
          <i
            className="fas fa-star fa-3x"
            style={favoriteButton ? { color: '#EFE11A' } : { color: '#aab8c2' }}
          />
          <p className="fav-text">{favoriteButton ? 'Remove Favorite' : 'Add Favorite'}</p>
        </div>
 
        <br />
        <h3 className="channel-title"> {Details.channelTitle}</h3>
        <br />
        <p className="description">{Details.description}</p>
      </div>
      <RelatedVideos />
    </section>
  );
};

export default WatchVideo;
// <button type="button" onClick={(event) => addFav(event, id)}>
// Favs
// </button>
// <button type="button" onClick={(event) => RemoveFav(event, id)}>
// remove Fav
// </button>