import Actions from './SearchActions';

const SearchReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_TRENDING: {
      return {
        ...state,
        trending_videos: action.trending_videos,
      };
    }
    case Actions.SEARCH_VIDEO: {
      return {
        ...state,
        search_results: action.search_results,
      };
    }
    case Actions.RELATED_VIDEOS: {
      return {
        ...state,
        related_videos: action.related_videos,
      };
    }
    case Actions.FAVORITE_VIDEOS: {
      return {
        ...state,
        favorite_videos: action.favorite_videos,
      };
    }
    case Actions.VIDEO_DETAILS: {
      return {
        ...state,
        video_details: action.video_details,
      };
    }
    default: {
      return state;
    }
  }
};

export default SearchReducer;
