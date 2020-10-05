const { REACT_APP_MY_ENV } = process.env;

export const searchTrending = async () => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&chart=mostPopular&regionCode=MX&maxResults=25&key=${REACT_APP_MY_ENV}&maxResults=10`
  );
  const results = await res.json();
  return results;
};

export const searchAPI = async (wordToSearch) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${wordToSearch}&part=snippet&key=${REACT_APP_MY_ENV}&maxResults=10`
  );
  const results = await res.json();
  return results;
};

export const getRelatedVideos = async (relatedId) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${relatedId}&type=video&key=${REACT_APP_MY_ENV}`
  );
  const results = await res.json();
  return results;
};

export const getVideoDetails = async (DetailsId) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${DetailsId}&key=${REACT_APP_MY_ENV}`
  );
  const results = await res.json();
  return results;
};

export const getFavoritesVideos = async () => {
  const ids = JSON.parse(localStorage.getItem('favs') || []);
  const list = ids.join(',');

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=id,snippet&id=${list}&key=${REACT_APP_MY_ENV}`
  );
  const results = await res.json();
  return results;
};
