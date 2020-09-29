import React, { createContext, useState } from 'react';

const { REACT_APP_MY_ENV } = process.env;

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [MenuClick, SetMenuClick] = useState(false);
  const [ClickSearch, SetClickSearch] = useState(false);
  const [SubmitSearch, SetSubmitSearch] = useState(false);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [word, SetWord] = useState('bruno');

  const [FavoritesInfo, SetFavoritesInfo] = useState([]);

  const [VideoId, SetVideoId] = useState(null);
  const [Trending, SetTrending] = useState([]);

  const [Related, SetRelated] = useState([]);

  const [Details, SetDetails] = useState({});

  const SearchTrending = async () => {
    console.log('hello');
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&chart=mostPopular&regionCode=MX&maxResults=25&key=${REACT_APP_MY_ENV}&maxResults=10`
    );
    const results = await res.json();
    return results.items;
  };

  const SearchAPI = async (WordToSearch) => {
    console.log('search api');
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${WordToSearch}&part=snippet&key=${REACT_APP_MY_ENV}&maxResults=10`)
    const results = await res.json();
    console.log(results);
    return results;
  };

  const getRelatedVideos = async (RelatedId) => {
    console.log('getting related');
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${RelatedId}&type=video&key=${REACT_APP_MY_ENV}`);
    const results = await res.json();
    console.log(results);
    return results;
  };

  const getVideoDetails = async (DetailsId) => {
    console.log('getting details');
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${DetailsId}&key=${REACT_APP_MY_ENV}`);
    const results = await res.json();
    console.log('details',results);
    return results;
  };

  const getFavorites = () => {
    const ids = JSON.parse(localStorage.getItem('favs') || []);
    const list = ids.join(',');
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id,snippet&id=${list}&key=${REACT_APP_MY_ENV}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          SetFavoritesInfo(result);
        },
        (error) => {
          setError(error);
        }
      );
  };

  const ClickedVideo = (id) => {
    SetVideoId(id);
  };

  return (
    <SearchContext.Provider
      value={{
        MenuClick,
        SetMenuClick,
        ClickSearch,
        SetClickSearch,
        SubmitSearch,
        SetSubmitSearch,
        word,
        SetWord,
        ClickedVideo,
        error,
        setError,
        SetVideoId,
        VideoId,
        isLoaded,
        setIsLoaded,
        items,
        setItems,
        SearchAPI,
        getFavorites,
        FavoritesInfo,
        SearchTrending,
        SetTrending,
        Trending,
        getRelatedVideos,
        SetRelated,
        Related,
        Details,
        SetDetails,
        getVideoDetails,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
